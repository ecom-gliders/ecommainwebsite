---
name: asset-management
description: Download validate and record provenance for images icons fonts and brand assets for eCom Gliders migration. Use when obtaining assets from current site, stock libraries, or design resources.
---

# Asset Management Skill

## Download workflow

1. Identify asset URL and purpose
2. Verify licensing and usage rights
3. Download to `assets/source/` with descriptive filename
4. Validate file type, dimensions, and integrity
5. Process and move to `assets/approved/` if production-ready
6. Record in `docs/research/DOWNLOAD-LOG.md`:

```
Date:
Source URL:
Asset name:
Type: image | icon | font | video
License:
Used on page:
Checksum (optional):
Validated: yes | no
```

## Icon policy

Never substitute Unicode symbols for icons.
Download SVG or PNG icons to `assets/icons/`.
Prefer SVG for scalability.

## Brand assets from ecomgliders.com

Priority assets to inventory:
- eCom Gliders logo (all variants)
- Partner badges (Amazon, eLEEVATE, SPP verified)
- Client logos in testimonials section
- Service page images
- Blog featured images
- Favicon and app icons

## Image optimization

After download, note original dimensions and file size.
Plan WebP conversion during implementation phase.

## License folder

Store license files and attribution text in `assets/licenses/`.
