# REA: ecomglider.com/tools inventory

**Source:** https://ecomglider.com/tools  
**Observed:** 2026-10-28 via Playwright (browser REA path; REA MCP engines not registered in this session)  
**Confidence:** Verified for public UI surface; Assumed for internal parse algorithms where JS was not decompiled

## Live tools (11)

| Source path | Purpose | Primary inputs | Client-side claim |
|-------------|---------|----------------|-------------------|
| `/tools/label-cropper` | Split bulk label+invoice PDF; crop single label | PDF / image upload | Browser-only processing |
| `/tools/dispatch-check` | Pack scan against combined PDF labels | PDF + barcode/scan input | Browser-only |
| `/tools/pnl-calculator` | Amazon P&L | MUTR CSV upload, manual entry, product P&L + optional returns XML | Browser-only |
| `/tools/gst-calculator` | Add/remove GST; optional GSTR-1 | Amount, rate, mode, supply type; XLSX upload | Browser-only |
| `/tools/sku-profitability` | SKU profitability leaderboard | Net Proceeds XLSX/CSV | Browser-only |
| `/tools/returns-diagnostic` | Returns & RTO diagnostic | Returns Report XML | Browser-only |
| `/tools/invoice-generator` | GST tax invoice PDF | Seller/buyer/line items | Download PDF |
| `/tools/product-catalog` | Local SKU/HSN/GST catalog | Form + CSV import/export | localStorage |
| `/tools/monthly-closeout` | Monthly close-out report | MUTR + GSTR-1 + Returns | Browser-only |
| `/tools/tcs-tds-reconciliation` | TCS/TDS credits from MUTR | MUTR CSV | Browser-only |
| `/tools/ppc-dashboard` | PPC performance | Search Term + Advertised Product CSVs | Browser-only |

## Coming soon (not implemented)

Reimbursement Finder, Keyword Rank Tracker, Smart Repricer, Listing Health Auditor

## Reconstruction target (eCom Gliders)

- Directory: `/free-amazon-tools/`
- Tool pages: `/free-amazon-tools/{slug}/`
- Original professional copy (not a brand clone of EcomGlider)
- Scalable: `content/config/tools/{slug}.json` + `toolKind` switch
- Keep existing PPC conversion cost calculator

## Notes

- Source tools are India-marketplace oriented (GST, MUTR, ₹). Port retains that context where the tool requires it.
- File parsers use documented Amazon report shapes; fragile against Amazon column renames.
