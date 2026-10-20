#!/usr/bin/env python3
"""
Full backup scraper for ecomgliders.com
Uses WordPress REST API + sitemaps + HTML download + asset download
"""

import json
import os
import re
import sys
import hashlib
import time
import urllib.parse
import urllib.request
from pathlib import Path
from xml.etree import ElementTree

# Force UTF-8 output on Windows
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

BASE_URL = "https://ecomgliders.com"
BACKUP_DIR = Path(__file__).resolve().parents[2] / "backup"
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
NS = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}

REQUEST_DELAY = 0.3


def safe_print(msg):
    try:
        print(msg, flush=True)
    except UnicodeEncodeError:
        print(str(msg).encode("ascii", errors="replace").decode("ascii"), flush=True)


def request(url, retries=3):
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
            with urllib.request.urlopen(req, timeout=60) as resp:
                headers = {k.lower(): v for k, v in resp.headers.items()}
                body = resp.read()
                return body, headers, resp.status
        except Exception as e:
            if attempt == retries - 1:
                return None, {}, str(e)
            time.sleep(2 ** attempt)
    return None, {}, "failed"


def save(path, data, binary=False):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    if binary:
        with open(path, "wb") as f:
            f.write(data)
    else:
        with open(path, "w", encoding="utf-8") as f:
            if isinstance(data, (dict, list)):
                json.dump(data, f, indent=2, ensure_ascii=False)
            else:
                f.write(data)


def slugify_url(url):
    parsed = urllib.parse.urlparse(url)
    path = parsed.path.strip("/") or "homepage"
    path = re.sub(r"[^\w\-/]", "_", path)
    return path.replace("/", "__")


def fetch_wp_paginated(endpoint, per_page=100):
    all_items = []
    page = 1
    total_pages = 1
    api_dir = BACKUP_DIR / "metadata" / "api"
    api_dir.mkdir(parents=True, exist_ok=True)

    while page <= total_pages:
        url = f"{BASE_URL}/wp-json/wp/v2/{endpoint}?per_page={per_page}&page={page}"
        safe_print(f"  API {endpoint} page {page}/{total_pages}...")
        body, headers, status = request(url)
        if body is None:
            safe_print(f"    FAILED page {page}: {status}")
            break

        page_data = json.loads(body)
        save(api_dir / f"{endpoint}-page-{page}.json", page_data)
        items = page_data

        if not items:
            break

        all_items.extend(items)
        total_pages = int(headers.get("x-wp-totalpages", page))
        page += 1
        time.sleep(REQUEST_DELAY)

    save(api_dir / f"{endpoint}-all.json", all_items)
    safe_print(f"  {endpoint}: {len(all_items)} items total")
    return all_items


def parse_sitemaps():
    urls = set()
    sitemap_dir = BACKUP_DIR / "raw"
    for sm_file in sitemap_dir.glob("*-sitemap.xml"):
        try:
            tree = ElementTree.parse(sm_file)
            root = tree.getroot()
            for loc in root.findall(".//sm:loc", NS):
                if loc.text:
                    urls.add(loc.text.strip())
        except Exception as e:
            safe_print(f"  sitemap parse error {sm_file.name}: {e}")

    for sm_file in ["sitemap.xml", "sitemap_index.xml"]:
        p = sitemap_dir / sm_file
        if p.exists():
            try:
                tree = ElementTree.parse(p)
                root = tree.getroot()
                for loc in root.findall(".//sm:loc", NS):
                    if loc.text and loc.text.endswith(".xml"):
                        sub_body, _, _ = request(loc.text.strip())
                        if sub_body:
                            sub_path = sitemap_dir / Path(urllib.parse.urlparse(loc.text).path).name
                            save(sub_path, sub_body.decode("utf-8", errors="replace"))
                            sub_root = ElementTree.fromstring(sub_body)
                            for sub_loc in sub_root.findall(".//sm:loc", NS):
                                if sub_loc.text:
                                    urls.add(sub_loc.text.strip())
            except Exception as e:
                safe_print(f"  index parse error: {e}")

    url_list = sorted(urls)
    save(BACKUP_DIR / "metadata" / "sitemap-urls.json", url_list)
    safe_print(f"  sitemap URLs: {len(url_list)}")
    return url_list


def download_html_pages(urls):
    pages_dir = BACKUP_DIR / "pages"
    blog_dir = BACKUP_DIR / "blog"
    results = []

    for i, url in enumerate(urls):
        slug = slugify_url(url)
        is_blog = "/blog/" in url or re.search(r"/\d{4}/\d{2}/", url)
        out_dir = blog_dir if is_blog else pages_dir
        html_path = out_dir / f"{slug}.html"
        meta_path = out_dir / f"{slug}.meta.json"

        if html_path.exists() and meta_path.exists():
            results.append({"url": url, "status": "cached", "path": str(html_path.relative_to(BACKUP_DIR))})
            continue

        safe_print(f"  HTML [{i+1}/{len(urls)}] {url}")
        body, headers, status = request(url)

        if body is None:
            results.append({"url": url, "status": "failed", "error": str(status)})
            continue

        html = body.decode("utf-8", errors="replace")
        save(html_path, html)

        title_match = re.search(r"<title[^>]*>([^<]+)</title>", html, re.IGNORECASE)
        desc_match = re.search(r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']*)', html, re.IGNORECASE)
        if not desc_match:
            desc_match = re.search(r'<meta[^>]+content=["\']([^"\']*)["\'][^>]+name=["\']description', html, re.IGNORECASE)
        canonical_match = re.search(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\']([^"\']*)', html, re.IGNORECASE)
        h1_match = re.search(r"<h1[^>]*>([^<]+)</h1>", html, re.IGNORECASE)

        meta = {
            "url": url,
            "status_code": status if isinstance(status, int) else 200,
            "title": title_match.group(1).strip() if title_match else "",
            "meta_description": desc_match.group(1).strip() if desc_match else "",
            "canonical": canonical_match.group(1).strip() if canonical_match else url,
            "h1": h1_match.group(1).strip() if h1_match else "",
            "content_type": headers.get("content-type", ""),
            "scraped_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        }
        save(meta_path, meta)
        results.append({"url": url, "status": "ok", "path": str(html_path.relative_to(BACKUP_DIR)), "meta": meta})
        time.sleep(REQUEST_DELAY)

    save(BACKUP_DIR / "metadata" / "html-scrape-log.json", results)
    return results


def extract_assets_from_html():
    asset_urls = set()
    html_dirs = [BACKUP_DIR / "pages", BACKUP_DIR / "blog"]

    patterns = [
        r'src=["\']([^"\']+)["\']',
        r'href=["\']([^"\']+\.(?:css|js|woff2?|ttf|eot|svg|png|jpe?g|gif|webp|avif|ico))["\']',
        r'url\(["\']?([^"\')\s]+\.(?:woff2?|ttf|eot|svg|png|jpe?g|gif|webp))["\']?\)',
        r'content=["\']([^"\']+\.(?:png|jpe?g|gif|webp))["\']',
    ]

    for html_dir in html_dirs:
        if not html_dir.exists():
            continue
        for html_file in html_dir.glob("*.html"):
            content = html_file.read_text(encoding="utf-8", errors="replace")
            for pattern in patterns:
                for match in re.findall(pattern, content, re.IGNORECASE):
                    if match.startswith("data:") or match.startswith("#"):
                        continue
                    full_url = urllib.parse.urljoin(BASE_URL, match)
                    if "ecomgliders.com" in full_url or full_url.startswith("/"):
                        if full_url.startswith("/"):
                            full_url = BASE_URL + full_url
                        asset_urls.add(full_url.split("?")[0])

    save(BACKUP_DIR / "metadata" / "extracted-asset-urls.json", sorted(asset_urls))
    safe_print(f"  extracted asset URLs from HTML: {len(asset_urls)}")
    return asset_urls


def download_assets(urls):
    assets_dir = BACKUP_DIR / "assets"
    log = []

    for i, url in enumerate(sorted(urls)):
        parsed = urllib.parse.urlparse(url)
        rel_path = parsed.path.lstrip("/")
        if not rel_path:
            continue

        ext = Path(rel_path).suffix.lower()
        if ext in [".css"]:
            dest = assets_dir / "css" / rel_path.replace("wp-content/", "")
        elif ext in [".js"]:
            dest = assets_dir / "js" / rel_path.replace("wp-content/", "")
        elif ext in [".woff", ".woff2", ".ttf", ".eot"]:
            dest = assets_dir / "fonts" / rel_path.replace("wp-content/", "")
        elif ext in [".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif", ".svg", ".ico"]:
            dest = assets_dir / "images" / rel_path.replace("wp-content/", "")
        else:
            dest = assets_dir / "other" / rel_path.replace("wp-content/", "")

        if dest.exists() and dest.stat().st_size > 0:
            log.append({"url": url, "status": "cached", "path": str(dest.relative_to(BACKUP_DIR))})
            continue

        safe_print(f"  Asset [{i+1}/{len(urls)}] {url[:80]}...")
        body, _, status = request(url)
        if body is None:
            log.append({"url": url, "status": "failed"})
            continue

        save(dest, body, binary=True)
        log.append({"url": url, "status": "ok", "path": str(dest.relative_to(BACKUP_DIR)), "size": len(body)})
        time.sleep(REQUEST_DELAY * 0.5)

    save(BACKUP_DIR / "metadata" / "asset-download-log.json", log)
    return log


def download_wp_media(media_items):
    assets_dir = BACKUP_DIR / "assets" / "images" / "wp-media"
    log = []

    for i, item in enumerate(media_items):
        source_url = item.get("source_url", "")
        if not source_url:
            continue

        media_id = item.get("id", i)
        filename = Path(urllib.parse.urlparse(source_url).path).name
        dest = assets_dir / f"{media_id}_{filename}"

        if dest.exists() and dest.stat().st_size > 0:
            log.append({"id": media_id, "url": source_url, "status": "cached"})
            continue

        safe_print(f"  Media [{i+1}/{len(media_items)}] {source_url[:80]}...")
        body, _, status = request(source_url)
        if body is None:
            log.append({"id": media_id, "url": source_url, "status": "failed"})
            continue

        save(dest, body, binary=True)
        log.append({
            "id": media_id,
            "url": source_url,
            "status": "ok",
            "path": str(dest.relative_to(BACKUP_DIR)),
            "title": item.get("title", {}).get("rendered", ""),
            "alt_text": item.get("alt_text", ""),
        })
        time.sleep(REQUEST_DELAY * 0.5)

    save(BACKUP_DIR / "metadata" / "media-download-log.json", log)
    return log


def build_blog_inventory(posts):
    inventory = []
    for post in posts:
        link = post.get("link", "")
        slug = post.get("slug", "")
        inventory.append({
            "id": post.get("id"),
            "url": link,
            "slug": slug,
            "title": post.get("title", {}).get("rendered", ""),
            "excerpt": post.get("excerpt", {}).get("rendered", ""),
            "date": post.get("date", ""),
            "modified": post.get("modified", ""),
            "status": post.get("status", ""),
            "categories": post.get("categories", []),
            "tags": post.get("tags", []),
            "featured_media": post.get("featured_media", 0),
            "yoast_head_json": post.get("yoast_head_json", {}),
        })

    save(BACKUP_DIR / "metadata" / "blog-inventory.json", inventory)

    md_lines = ["# Blog URL Inventory (scraped)\n", "| URL | Slug | Title | Date |", "|-----|------|-------|------|"]
    for item in inventory:
        md_lines.append(f"| {item['url']} | {item['slug']} | {item['title'][:60]} | {item['date'][:10]} |")

    blog_md = Path(__file__).resolve().parents[2] / "docs" / "seo" / "URL-INVENTORY.md"
    existing = blog_md.read_text(encoding="utf-8") if blog_md.exists() else ""
    if "## Blog posts (scraped)" not in existing:
        blog_md.write_text(existing + "\n\n## Blog posts (scraped)\n\n" + "\n".join(md_lines[3:]), encoding="utf-8")

    safe_print(f"  blog inventory: {len(inventory)} posts")
    return inventory


def build_page_inventory(pages):
    inventory = []
    for page in pages:
        inventory.append({
            "id": page.get("id"),
            "url": page.get("link", ""),
            "slug": page.get("slug", ""),
            "title": page.get("title", {}).get("rendered", ""),
            "date": page.get("date", ""),
            "modified": page.get("modified", ""),
            "status": page.get("status", ""),
            "parent": page.get("parent", 0),
            "yoast_head_json": page.get("yoast_head_json", {}),
        })
    save(BACKUP_DIR / "metadata" / "page-inventory.json", inventory)
    safe_print(f"  page inventory: {len(inventory)} pages")
    return inventory


def build_manifest(posts, pages, media, sitemap_urls, html_results):
    manifest = {
        "scraped_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "source": BASE_URL,
        "platform": "WordPress",
        "totals": {
            "posts": len(posts),
            "pages": len(pages),
            "media": len(media),
            "sitemap_urls": len(sitemap_urls),
            "html_downloaded": len([r for r in html_results if r.get("status") in ("ok", "cached")]),
            "html_failed": len([r for r in html_results if r.get("status") == "failed"]),
        },
        "backup_structure": {
            "backup/pages/": "HTML of non-blog pages",
            "backup/blog/": "HTML of blog posts",
            "backup/assets/": "Downloaded images, CSS, JS, fonts",
            "backup/metadata/": "JSON inventories and API dumps",
            "backup/raw/": "Raw sitemaps, robots.txt, API responses",
        },
    }
    save(BACKUP_DIR / "metadata" / "manifest.json", manifest)
    save(BACKUP_DIR / "README.md", f"""# ecomgliders.com Full Backup

Scraped: {manifest['scraped_at']}
Source: {BASE_URL}

## Totals

- Blog posts: {manifest['totals']['posts']}
- Pages: {manifest['totals']['pages']}
- Media items: {manifest['totals']['media']}
- Sitemap URLs: {manifest['totals']['sitemap_urls']}
- HTML downloaded: {manifest['totals']['html_downloaded']}
- HTML failed: {manifest['totals']['html_failed']}

## Structure

- `pages/` - HTML snapshots of site pages
- `blog/` - HTML snapshots of blog posts
- `assets/images/` - Downloaded images and WP media
- `assets/css/` - Stylesheets
- `assets/js/` - JavaScript files
- `assets/fonts/` - Font files
- `metadata/` - JSON inventories, API data, scrape logs
- `raw/` - Raw sitemaps and initial API dumps

## Key files

- `metadata/manifest.json` - Summary
- `metadata/blog-inventory.json` - All blog posts with URLs and SEO meta
- `metadata/page-inventory.json` - All pages
- `metadata/sitemap-urls.json` - All URLs from sitemaps
- `metadata/api/posts-all.json` - Full WordPress posts API dump
- `metadata/api/pages-all.json` - Full WordPress pages API dump
""")
    return manifest


def main():
    safe_print("=" * 60)
    safe_print("ecomgliders.com Full Site Backup Scraper")
    safe_print("=" * 60)

    BACKUP_DIR.mkdir(parents=True, exist_ok=True)

    safe_print("\n[1/7] Fetching WordPress API data...")
    posts = fetch_wp_paginated("posts", per_page=100)
    pages = fetch_wp_paginated("pages", per_page=100)
    media = fetch_wp_paginated("media", per_page=100)

    safe_print("\n[2/7] Fetching categories and tags...")
    for endpoint in ["categories", "tags", "users"]:
        fetch_wp_paginated(endpoint, per_page=100)

    safe_print("\n[3/7] Parsing sitemaps...")
    sitemap_urls = parse_sitemaps()

    api_urls = set()
    for item in posts + pages:
        link = item.get("link", "")
        if link:
            api_urls.add(link)
    all_urls = sorted(set(sitemap_urls) | api_urls)
    save(BACKUP_DIR / "metadata" / "all-urls.json", all_urls)
    safe_print(f"  total unique URLs to scrape: {len(all_urls)}")

    safe_print("\n[4/7] Downloading HTML for all URLs...")
    html_results = download_html_pages(all_urls)

    safe_print("\n[5/7] Building inventories...")
    build_blog_inventory(posts)
    build_page_inventory(pages)

    safe_print("\n[6/7] Downloading WordPress media...")
    download_wp_media(media)

    safe_print("\n[7/7] Extracting and downloading assets from HTML...")
    asset_urls = extract_assets_from_html()
    download_assets(asset_urls)

    manifest = build_manifest(posts, pages, media, sitemap_urls, html_results)

    safe_print("\n" + "=" * 60)
    safe_print("BACKUP COMPLETE")
    safe_print(json.dumps(manifest["totals"], indent=2))
    safe_print(f"Backup location: {BACKUP_DIR}")
    safe_print("=" * 60)


if __name__ == "__main__":
    main()
