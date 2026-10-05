# Flask Security Skill References

> 26 nodes · cohesion 0.15

## Key Concepts

- **Flask (Python) Web Security Spec (Flask 3.1.x, Python 3.x)** (26 connections) — `.agents/skills/security-best-practices/references/python-flask-web-server-security.md`
- **.agents/skills/security-best-practices/references/python-flask-web-server-security.md** (25 connections) — `.agents/skills/security-best-practices/references/python-flask-web-server-security.md`
- **FLASK-HEADERS-001: Set essential security headers (in app or at the edge)** (3 connections) — `.agents/skills/security-best-practices/references/python-flask-web-server-security.md`
- **FLASK-SESS-001: Session cookies must use secure attributes in production** (3 connections) — `.agents/skills/security-best-practices/references/python-flask-web-server-security.md`
- **Active audit mode in python-flask-web-server** (2 connections) — `.agents/skills/security-best-practices/references/python-flask-web-server-security.md`
- **FLASK-CONFIG-001: SECRET_KEY must be strong, secret, and rotated safely** (2 connections) — `.agents/skills/security-best-practices/references/python-flask-web-server-security.md`
- **FLASK-CORS-001: CORS must be explicit and least-privilege** (2 connections) — `.agents/skills/security-best-practices/references/python-flask-web-server-security.md`
- **FLASK-CSRF-001: State-changing requests using cookie auth MUST be CSRF-protected** (2 connections) — `.agents/skills/security-best-practices/references/python-flask-web-server-security.md`
- **FLASK-DEPLOY-001: Do not use Flask’s development server in production** (2 connections) — `.agents/skills/security-best-practices/references/python-flask-web-server-security.md`
- **FLASK-DEPLOY-002: Debug mode MUST be disabled in production** (2 connections) — `.agents/skills/security-best-practices/references/python-flask-web-server-security.md`
- **FLASK-HOST-001: Host header must be validated in production** (2 connections) — `.agents/skills/security-best-practices/references/python-flask-web-server-security.md`
- **FLASK-HTTP-001: Use HTTP methods safely; do not change state via GET; avoid secrets in URLs** (2 connections) — `.agents/skills/security-best-practices/references/python-flask-web-server-security.md`
- **FLASK-INJECT-001: Prevent SQL injection (use parameterized queries / ORM)** (2 connections) — `.agents/skills/security-best-practices/references/python-flask-web-server-security.md`
- **FLASK-INJECT-002: Prevent OS command injection** (2 connections) — `.agents/skills/security-best-practices/references/python-flask-web-server-security.md`
- **FLASK-LIMITS-001: Request size and form parsing limits MUST be set appropriately** (2 connections) — `.agents/skills/security-best-practices/references/python-flask-web-server-security.md`
- **FLASK-PATH-001: Prevent path traversal and unsafe file serving** (2 connections) — `.agents/skills/security-best-practices/references/python-flask-web-server-security.md`
- **FLASK-PROXY-001: Reverse proxy trust must be configured correctly** (2 connections) — `.agents/skills/security-best-practices/references/python-flask-web-server-security.md`
- **FLASK-REDIRECT-001: Prevent open redirects** (2 connections) — `.agents/skills/security-best-practices/references/python-flask-web-server-security.md`
- **FLASK-SESS-002: Sessions must be bounded and resistant to fixation/replay** (2 connections) — `.agents/skills/security-best-practices/references/python-flask-web-server-security.md`
- **FLASK-SSRF-001: Prevent server-side request forgery (SSRF) in outbound HTTP** (2 connections) — `.agents/skills/security-best-practices/references/python-flask-web-server-security.md`
- **FLASK-SSTI-001: Never render untrusted templates (Server-Side Template Injection)** (2 connections) — `.agents/skills/security-best-practices/references/python-flask-web-server-security.md`
- **FLASK-SUPPLY-001: Dependency and patch hygiene (focus on security-relevant deps)** (2 connections) — `.agents/skills/security-best-practices/references/python-flask-web-server-security.md`
- **FLASK-UPLOAD-001: File uploads must be validated, stored safely, and served safely** (2 connections) — `.agents/skills/security-best-practices/references/python-flask-web-server-security.md`
- **FLASK-XSS-001: Prevent reflected/stored XSS in templates and HTML generation** (2 connections) — `.agents/skills/security-best-practices/references/python-flask-web-server-security.md`
- **Generation mode in python-flask-web-server** (2 connections) — `.agents/skills/security-best-practices/references/python-flask-web-server-security.md`
- *... and 1 more nodes in this community*

## Relationships

- [Go Security References](Go_Security_References.md) (1 shared connections)

## Source Files

- `.agents/skills/security-best-practices/references/python-flask-web-server-security.md`

## Audit Trail

- EXTRACTED: 50 (98%)
- INFERRED: 1 (2%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
## Verified Node Membership

Generated source inventory, including historical evidence and proposals. Status is preserved from extraction; it is not an implementation or runtime verification claim. See `../BUILD_AUDIT.md` for unresolved source contradictions.

| Node ID | Concept | Source | Status |
| --- | --- | --- | --- |
| `agents_skills_security_best_practices_references_python_flask_web_server_security` | .agents/skills/security-best-practices/references/python-flask-web-server-security.md | `.agents/skills/security-best-practices/references/python-flask-web-server-security.md` | not_tagged |
| `agents_skills_security_best_practices_references_python_flask_web_server_security_active_audit_mode` | Active audit mode in python-flask-web-server | `.agents/skills/security-best-practices/references/python-flask-web-server-security.md` | reference_workflow |
| `agents_skills_security_best_practices_references_python_flask_web_server_security_document` | Flask (Python) Web Security Spec (Flask 3.1.x, Python 3.x) | `.agents/skills/security-best-practices/references/python-flask-web-server-security.md` | reference_guidance_not_verified_project_implementation |
| `agents_skills_security_best_practices_references_python_flask_web_server_security_flask_config_001` | FLASK-CONFIG-001: SECRET_KEY must be strong, secret, and rotated safely | `.agents/skills/security-best-practices/references/python-flask-web-server-security.md` | reference_guidance_not_verified_project_implementation |
| `agents_skills_security_best_practices_references_python_flask_web_server_security_flask_cors_001` | FLASK-CORS-001: CORS must be explicit and least-privilege | `.agents/skills/security-best-practices/references/python-flask-web-server-security.md` | reference_guidance_not_verified_project_implementation |
| `agents_skills_security_best_practices_references_python_flask_web_server_security_flask_csrf_001` | FLASK-CSRF-001: State-changing requests using cookie auth MUST be CSRF-protected | `.agents/skills/security-best-practices/references/python-flask-web-server-security.md` | reference_guidance_not_verified_project_implementation |
| `agents_skills_security_best_practices_references_python_flask_web_server_security_flask_deploy_001` | FLASK-DEPLOY-001: Do not use Flask’s development server in production | `.agents/skills/security-best-practices/references/python-flask-web-server-security.md` | reference_guidance_not_verified_project_implementation |
| `agents_skills_security_best_practices_references_python_flask_web_server_security_flask_deploy_002` | FLASK-DEPLOY-002: Debug mode MUST be disabled in production | `.agents/skills/security-best-practices/references/python-flask-web-server-security.md` | reference_guidance_not_verified_project_implementation |
| `agents_skills_security_best_practices_references_python_flask_web_server_security_flask_headers_001` | FLASK-HEADERS-001: Set essential security headers (in app or at the edge) | `.agents/skills/security-best-practices/references/python-flask-web-server-security.md` | reference_guidance_not_verified_project_implementation |
| `agents_skills_security_best_practices_references_python_flask_web_server_security_flask_host_001` | FLASK-HOST-001: Host header must be validated in production | `.agents/skills/security-best-practices/references/python-flask-web-server-security.md` | reference_guidance_not_verified_project_implementation |
| `agents_skills_security_best_practices_references_python_flask_web_server_security_flask_http_001` | FLASK-HTTP-001: Use HTTP methods safely; do not change state via GET; avoid secrets in URLs | `.agents/skills/security-best-practices/references/python-flask-web-server-security.md` | reference_guidance_not_verified_project_implementation |
| `agents_skills_security_best_practices_references_python_flask_web_server_security_flask_inject_001` | FLASK-INJECT-001: Prevent SQL injection (use parameterized queries / ORM) | `.agents/skills/security-best-practices/references/python-flask-web-server-security.md` | reference_guidance_not_verified_project_implementation |
| `agents_skills_security_best_practices_references_python_flask_web_server_security_flask_inject_002` | FLASK-INJECT-002: Prevent OS command injection | `.agents/skills/security-best-practices/references/python-flask-web-server-security.md` | reference_guidance_not_verified_project_implementation |
| `agents_skills_security_best_practices_references_python_flask_web_server_security_flask_limits_001` | FLASK-LIMITS-001: Request size and form parsing limits MUST be set appropriately | `.agents/skills/security-best-practices/references/python-flask-web-server-security.md` | reference_guidance_not_verified_project_implementation |
| `agents_skills_security_best_practices_references_python_flask_web_server_security_flask_path_001` | FLASK-PATH-001: Prevent path traversal and unsafe file serving | `.agents/skills/security-best-practices/references/python-flask-web-server-security.md` | reference_guidance_not_verified_project_implementation |
| `agents_skills_security_best_practices_references_python_flask_web_server_security_flask_proxy_001` | FLASK-PROXY-001: Reverse proxy trust must be configured correctly | `.agents/skills/security-best-practices/references/python-flask-web-server-security.md` | reference_guidance_not_verified_project_implementation |
| `agents_skills_security_best_practices_references_python_flask_web_server_security_flask_redirect_001` | FLASK-REDIRECT-001: Prevent open redirects | `.agents/skills/security-best-practices/references/python-flask-web-server-security.md` | reference_guidance_not_verified_project_implementation |
| `agents_skills_security_best_practices_references_python_flask_web_server_security_flask_sess_001` | FLASK-SESS-001: Session cookies must use secure attributes in production | `.agents/skills/security-best-practices/references/python-flask-web-server-security.md` | reference_guidance_not_verified_project_implementation |
| `agents_skills_security_best_practices_references_python_flask_web_server_security_flask_sess_002` | FLASK-SESS-002: Sessions must be bounded and resistant to fixation/replay | `.agents/skills/security-best-practices/references/python-flask-web-server-security.md` | reference_guidance_not_verified_project_implementation |
| `agents_skills_security_best_practices_references_python_flask_web_server_security_flask_ssrf_001` | FLASK-SSRF-001: Prevent server-side request forgery (SSRF) in outbound HTTP | `.agents/skills/security-best-practices/references/python-flask-web-server-security.md` | reference_guidance_not_verified_project_implementation |
| `agents_skills_security_best_practices_references_python_flask_web_server_security_flask_ssti_001` | FLASK-SSTI-001: Never render untrusted templates (Server-Side Template Injection) | `.agents/skills/security-best-practices/references/python-flask-web-server-security.md` | reference_guidance_not_verified_project_implementation |
| `agents_skills_security_best_practices_references_python_flask_web_server_security_flask_supply_001` | FLASK-SUPPLY-001: Dependency and patch hygiene (focus on security-relevant deps) | `.agents/skills/security-best-practices/references/python-flask-web-server-security.md` | reference_guidance_not_verified_project_implementation |
| `agents_skills_security_best_practices_references_python_flask_web_server_security_flask_upload_001` | FLASK-UPLOAD-001: File uploads must be validated, stored safely, and served safely | `.agents/skills/security-best-practices/references/python-flask-web-server-security.md` | reference_guidance_not_verified_project_implementation |
| `agents_skills_security_best_practices_references_python_flask_web_server_security_flask_xss_001` | FLASK-XSS-001: Prevent reflected/stored XSS in templates and HTML generation | `.agents/skills/security-best-practices/references/python-flask-web-server-security.md` | reference_guidance_not_verified_project_implementation |
| `agents_skills_security_best_practices_references_python_flask_web_server_security_generation_mode` | Generation mode in python-flask-web-server | `.agents/skills/security-best-practices/references/python-flask-web-server-security.md` | reference_workflow |
| `agents_skills_security_best_practices_references_python_flask_web_server_security_passive_review_mode` | Passive review mode in python-flask-web-server | `.agents/skills/security-best-practices/references/python-flask-web-server-security.md` | reference_workflow |
