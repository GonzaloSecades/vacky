# Vue.js Web Security Spec (Vue 3.x, TypeScript/JavaScript, common tooling: Vite)

> God node · 40 connections · `.agents/skills/security-best-practices/references/javascript-typescript-vue-web-frontend-security.md`

**Community:** [Vue Security References](Vue_Security_References.md)

## Connections by Relation

### cites
- https://vuejs.org/guide/best-practices/security `EXTRACTED`
- https://vite.dev/guide/env-and-mode `EXTRACTED`
- https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html `EXTRACTED`
- https://vuejs.org/guide/best-practices/production-deployment `EXTRACTED`
- https://vite.dev/guide/cli `EXTRACTED`
- https://vite.dev/guide/build `EXTRACTED`
- Production Deployment `EXTRACTED`
- https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html `EXTRACTED`
- https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html `EXTRACTED`
- https://web.dev/articles/trusted-types `EXTRACTED`
- Subresource Integrity - Security - MDN Web Docs `EXTRACTED`
- https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/noopener `EXTRACTED`
- Template Syntax | Vue.js `EXTRACTED`
- https://vite.dev/config/server-options `EXTRACTED`

### contains
- .agents/skills/security-best-practices/references/javascript-typescript-vue-web-frontend-security.md `EXTRACTED`

### references
- Select security references for both frontend and backend `INFERRED`
- VUE-DEPLOY-001: Do not run dev/preview servers in production `EXTRACTED`
- VUE-DEPLOY-002: Use Vue production builds and keep devtools off in production `EXTRACTED`
- VUE-AUTH-001: Token storage must assume XSS is possible `EXTRACTED`
- VUE-CSRF-001: Coordinate with the backend for CSRF when using cookies `EXTRACTED`
- VUE-SSR-001: SSR adds additional trust boundaries; treat state injection as XSS-sensitive `EXTRACTED`
- VUE-SECRETS-001: Never ship secrets in frontend code or env variables `EXTRACTED`
- VUE-SECRETS-002: Do not broaden Vite env exposure `EXTRACTED`
- VUE-XSS-001: Prefer Vue’s default escaping; avoid raw HTML injection `EXTRACTED`
- VUE-XSS-002: Never use non-trusted templates (client-side template/code injection) `EXTRACTED`
- VUE-XSS-003: Do not mount Vue onto DOM that may contain user-provided server-rendered HTML `EXTRACTED`
- VUE-XSS-004: Prevent URL injection in bindings and navigations `EXTRACTED`
- VUE-XSS-005: Prevent style/CSS injection and UI redress `EXTRACTED`
- VUE-XSS-006: Never bind user-provided JavaScript into event handler attributes `EXTRACTED`
- VUE-ROUTER-001: Do not treat client-side route guards as authorization `EXTRACTED`
- VUE-ROUTER-002: Prevent open redirects and unsafe “return_to/next” handling `EXTRACTED`
- VUE-HEADERS-001: Require security headers at the deployment layer `EXTRACTED`
- VUE-CSP-001: Use Trusted Types and DOM XSS hardening when feasible `EXTRACTED`
- VUE-SRI-001: Use Subresource Integrity for CDN-hosted scripts/styles `EXTRACTED`
- VUE-SUPPLY-001: Dependency and patch hygiene is mandatory `EXTRACTED`
- *…and 5 more `references` connection(s) not listed (lowest-degree first to go)*

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*