# Django (Python) Web Security Spec (Django 6.0.x, Python 3.x)

> God node · 37 connections · `.agents/skills/security-best-practices/references/python-django-web-server-security.md`

**Community:** [Django Security References](Django_Security_References.md)

## Connections by Relation

### cites
- Settings | Django documentation | Django `EXTRACTED`
- https://docs.djangoproject.com/en/6.0/howto/deployment/checklist/ `EXTRACTED`
- Security in Django | Django documentation | Django `EXTRACTED`
- How to use Django’s CSRF protection | Django documentation | Django `EXTRACTED`
- https://docs.djangoproject.com/en/6.0/ref/templates/builtins/ `EXTRACTED`
- https://docs.djangoproject.com/en/6.0/ref/utils/ `EXTRACTED`
- https://docs.djangoproject.com/en/6.0/topics/db/sql/ `EXTRACTED`
- https://docs.djangoproject.com/en/6.0/ref/models/querysets/ `EXTRACTED`
- Download Django | Django `EXTRACTED`

### contains
- .agents/skills/security-best-practices/references/python-django-web-server-security.md `EXTRACTED`

### references
- Select security references for both frontend and backend `INFERRED`
- DJANGO-HTTPS-001: If TLS is used cookie transport must be secured `EXTRACTED`
- DJANGO-XSS-001: Prevent reflected/stored XSS in templates and HTML generation `EXTRACTED`
- DJANGO-HOST-001: Host header must be validated (`ALLOWED_HOSTS` must be strict) `EXTRACTED`
- DJANGO-SQL-001: Prevent SQL injection (use ORM or parameterized raw SQL) `EXTRACTED`
- DJANGO-HEADERS-001: Enable essential security headers (SecurityMiddleware + clickjacking protection) `EXTRACTED`
- DJANGO-CSP-001: Deploy a Content Security Policy (CSP) as defense-in-depth `EXTRACTED`
- DJANGO-SESS-002: CSRF cookie settings must be deliberate (HttpOnly has tradeoffs) `EXTRACTED`
- DJANGO-CSRF-001: Cookie-authenticated state-changing requests MUST be CSRF-protected `EXTRACTED`
- DJANGO-UPLOAD-001: File uploads must be validated, stored safely, and served safely `EXTRACTED`
- DJANGO-REDIRECT-001: Prevent open redirects (`next`, `return_to`, `redirect`) `EXTRACTED`
- DJANGO-ADMIN-001: Django admin must be treated as a high-value target `EXTRACTED`
- DJANGO-DEPLOY-001: Do not use Django’s development server in production `EXTRACTED`
- DJANGO-DEPLOY-002: `DEBUG` MUST be disabled in production `EXTRACTED`
- DJANGO-CONFIG-001: `SECRET_KEY` must be strong, secret, and rotated safely `EXTRACTED`
- DJANGO-PROXY-001: Reverse proxy trust must be configured correctly (`SECURE_PROXY_SSL_HEADER`) `EXTRACTED`
- DJANGO-SESS-001: Session cookies must use secure attributes in production `EXTRACTED`
- DJANGO-PATH-001: Prevent path traversal and unsafe file serving (static/media separation) `EXTRACTED`
- DJANGO-AUTH-001: Password storage must use Django’s secure hashers; password policy must be configured `EXTRACTED`
- DJANGO-LOG-001: Logging and error reporting must not leak secrets `EXTRACTED`
- *…and 7 more `references` connection(s) not listed (lowest-degree first to go)*

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*