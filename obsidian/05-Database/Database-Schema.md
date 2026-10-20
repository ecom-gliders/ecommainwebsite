# Database Schema

Status: Draft. Not yet implemented.

## Purpose

Store pages, blog posts, and site configuration for the custom ecomgliders.com site.

## Design rules

See `.cursor/rules/04-database.mdc` for migration and schema rules.

## Tables (proposed)

### pages
- id (PK)
- slug (unique, indexed)
- title
- meta_title
- meta_description
- content (text)
- template
- status
- published_at
- updated_at
- created_at

### blog_posts
- id (PK)
- page_id (FK to pages)
- author
- excerpt
- featured_image_url
- canonical_url

### categories
- id (PK)
- name
- slug (unique)

### blog_post_categories
- blog_post_id (FK)
- category_id (FK)

### tags
- id (PK)
- name
- slug (unique)

### blog_post_tags
- blog_post_id (FK)
- tag_id (FK)

### redirects
- id (PK)
- from_path (unique)
- to_path
- status_code (301 default)
- created_at
- notes

## Migration notes

- Import existing blog slugs exactly into pages.slug
- Preserve published_at from original posts
- redirects table only for unavoidable path changes

## Related notes

- [[System-Architecture]]
- [[Blog-URL-Preservation]]
