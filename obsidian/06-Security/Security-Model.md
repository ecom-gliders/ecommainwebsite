# Security Model

Status: Draft for planning phase.

## Threat areas for agency website

- Contact form spam and abuse
- File upload vulnerabilities (if admin panel added)
- XSS in blog content rendering
- CSRF on forms
- Secrets in repository
- Dependency vulnerabilities
- Admin authentication (when CMS is built)

## Principles

See `.cursor/rules/03-security.mdc`

## Contact form security

- Server-side validation
- Rate limiting
- CAPTCHA or honeypot
- No PII in logs
- HTTPS only

## Blog content rendering

- Sanitize HTML if accepting rich content
- CSP headers
- No inline scripts from user content

## Admin access (future)

- Strong authentication
- Role-based access
- Audit logging
- Session timeout

## Related notes

- [[System-Architecture]]
