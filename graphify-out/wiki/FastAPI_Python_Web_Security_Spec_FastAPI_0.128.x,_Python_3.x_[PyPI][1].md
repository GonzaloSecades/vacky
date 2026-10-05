# FastAPI (Python) Web Security Spec (FastAPI 0.128.x, Python 3.x) ([PyPI][1])

> God node · 63 connections · `.agents/skills/security-best-practices/references/python-fastapi-web-server-security.md`

**Community:** [FastAPI Security References](FastAPI_Security_References.md)

## Connections by Relation

### cites
- https://pypi.org/project/starlette/ `EXTRACTED`
- https://pypi.org/project/uvicorn/ `EXTRACTED`
- HTTP Security Response Headers Cheat Sheet `EXTRACTED`
- https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html `EXTRACTED`
- Starlette Denial of service (DoS) via multipart/form-data | GitLab Advisory Database `EXTRACTED`
- Starlette has Path Traversal vulnerability in StaticFiles | GitLab Advisory Database `EXTRACTED`
- Security - First Steps - FastAPI `EXTRACTED`
- Starlette vulnerable to O(n^2) DoS via Range header merging in ``starlette.responses.FileResponse`` | GitLab Advisory Database `EXTRACTED`
- https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html `EXTRACTED`
- Dependencies - Depends() and Security() - FastAPI `EXTRACTED`
- https://fastapi.tiangolo.com/tutorial/response-model/ `EXTRACTED`
- https://owasp.org/API-Security/editions/2023/en/0x11-t10/ `EXTRACTED`
- https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html `EXTRACTED`
- https://fastapi.tiangolo.com/tutorial/extra-models/ `EXTRACTED`
- https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html `EXTRACTED`
- Testing for Server Side Template Injection `EXTRACTED`
- Sandbox — Jinja Documentation (3.1.x) `EXTRACTED`
- https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html `EXTRACTED`
- https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html `EXTRACTED`
- https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html `EXTRACTED`
- *…and 9 more `cites` connection(s) not listed (lowest-degree first to go)*

### contains
- .agents/skills/security-best-practices/references/python-fastapi-web-server-security.md `EXTRACTED`

### references
- Select security references for both frontend and backend `INFERRED`
- FASTAPI-SUPPLY-001: Dependency and patch hygiene (focus on security-relevant deps) `EXTRACTED`
- FASTAPI-SESS-001: If using cookie-based sessions and TLS, cookie attributes MUST be secure in production `EXTRACTED`
- FASTAPI-CSRF-001: Cookie-authenticated state-changing requests MUST be CSRF-protected `EXTRACTED`
- FASTAPI-RESP-001: Prevent excessive data exposure via response models and explicit serialization `EXTRACTED`
- FASTAPI-SSTI-001: Never render untrusted templates (Server-Side Template Injection) `EXTRACTED`
- FASTAPI-WS-001: WebSocket endpoints MUST be authenticated and protected against cross-site abuse `EXTRACTED`
- FASTAPI-DEPLOY-001: Do not use auto-reload / dev-only server modes in production `EXTRACTED`
- FASTAPI-DEPLOY-002: Debug mode MUST be disabled in production `EXTRACTED`
- FASTAPI-AUTH-001: Authentication MUST be explicit and consistently enforced via dependencies `EXTRACTED`
- FASTAPI-AUTH-002: Use standard auth transports; avoid secrets in URLs `EXTRACTED`
- FASTAPI-AUTH-004: JWT validation MUST be strict; JWTs MUST NOT carry secrets `EXTRACTED`
- FASTAPI-AUTHZ-001: Authorization MUST be enforced per-object and per-property `EXTRACTED`
- FASTAPI-SESS-002: Do not store sensitive secrets in signed session cookies `EXTRACTED`
- FASTAPI-VALID-001: Request parsing and validation MUST be schema-driven; prevent mass assignment `EXTRACTED`
- FASTAPI-XSS-001: Prevent reflected/stored XSS in HTML responses and templates `EXTRACTED`
- FASTAPI-HEADERS-001: Set essential security headers (in app or at the edge) `EXTRACTED`
- FASTAPI-CORS-001: CORS MUST be explicit and least-privilege `EXTRACTED`
- FASTAPI-HOST-001: Host header MUST be validated in production `EXTRACTED`
- FASTAPI-PROXY-001: Reverse proxy trust MUST be configured correctly `EXTRACTED`
- *…and 13 more `references` connection(s) not listed (lowest-degree first to go)*

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*