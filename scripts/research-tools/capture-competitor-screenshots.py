#!/usr/bin/env python3
"""Capture competitor homepage screenshots for design reference."""

from pathlib import Path
from playwright.sync_api import sync_playwright

OUTPUT_DIR = Path(__file__).resolve().parents[2] / "backup" / "research" / "competitors"

SITES = [
    ("myamazonguy-homepage.png", "https://myamazonguy.com/"),
    ("amzdudes-homepage.png", "https://amzdudes.com/"),
    ("canopymanagement-homepage.png", "https://canopymanagement.com/"),
    ("amzonestep-homepage.png", "https://www.amzonestep.com/"),
    ("olifantdigital-homepage.png", "https://olifantdigital.com/"),
    ("sequencecommerce-homepage.png", "https://sequencecommerce.com/"),
    ("salesduo-homepage.png", "https://salesduo.com/"),
    ("incrementumdigital-homepage.png", "https://incrementumdigital.com/"),
    ("evolveamz-homepage.png", "https://evolveamz.com/"),
    ("ecomgliders-homepage.png", "https://ecomgliders.com/"),
]


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    results: list[str] = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        for filename, url in SITES:
            out_path = OUTPUT_DIR / filename
            try:
                page.goto(url, wait_until="networkidle", timeout=60000)
                page.wait_for_timeout(2000)
                page.screenshot(path=str(out_path), full_page=True)
                results.append(f"OK  {filename} <- {url}")
            except Exception as exc:
                results.append(f"FAIL {filename} <- {url}: {exc}")

        browser.close()

    log_path = OUTPUT_DIR / "capture-log.txt"
    log_path.write_text("\n".join(results) + "\n", encoding="utf-8")
    print("\n".join(results))


if __name__ == "__main__":
    main()
