# React (JavaScript/TypeScript) Web Security Spec (React 19.x, TypeScript 5.x)

> God node · 48 connections · `.agents/skills/security-best-practices/references/javascript-typescript-react-web-frontend-security.md`

**Community:** [React Security References](React_Security_References.md)

## Connections by Relation

### cites
- Content Security Policy - OWASP Cheat Sheet Series `EXTRACTED`
- HTML5 Security - OWASP Cheat Sheet Series `EXTRACTED`
- Cross Site Scripting Prevention - OWASP Cheat Sheet Series `EXTRACTED`
- Trusted Types API - Web APIs | MDN `EXTRACTED`
- Adding Custom Environment Variables | Create React App `EXTRACTED`
- Third Party Javascript Management - OWASP Cheat Sheet Series `EXTRACTED`
- Cross-Site Request Forgery Prevention - OWASP Cheat Sheet Series `EXTRACTED`
- Subresource Integrity - Security | MDN `EXTRACTED`
- Clickjacking - Security | MDN `EXTRACTED`
- Using Service Workers - Web APIs | MDN `EXTRACTED`
- Env Variables and Modes | Vite `EXTRACTED`
- Common components (e.g. <div>) – React `EXTRACTED`
- GitHub - cure53/DOMPurify: DOMPurify - a DOM-only, super-fast, uber-tolerant XSS sanitizer for HTML, MathML and SVG. DOMPurify works with a secure default, but offers a lot of configurability and hooks. Demo: `EXTRACTED`
- Introducing JSX – React `EXTRACTED`
- Trusted Types `EXTRACTED`
- https://datatracker.ietf.org/doc/html/draft-ietf-oauth-browser-based-apps `EXTRACTED`
- Secure contexts - Security | MDN `EXTRACTED`
- File Upload - OWASP Cheat Sheet Series `EXTRACTED`
- npm-audit | npm Docs `EXTRACTED`
- npm-ci | npm Docs `EXTRACTED`
- *…and 3 more `cites` connection(s) not listed (lowest-degree first to go)*

### contains
- .agents/skills/security-best-practices/references/javascript-typescript-react-web-frontend-security.md `EXTRACTED`

### references
- Select security references for both frontend and backend `INFERRED`
- REACT-XSS-001: Do not use `dangerouslySetInnerHTML` with untrusted content (sanitize or avoid) `EXTRACTED`
- REACT-TT-001: Use Trusted Types (with CSP) to harden DOM XSS sinks where feasible `EXTRACTED`
- REACT-AUTH-001: Token and session handling must be resilient to XSS (avoid sensitive storage in Web Storage) `EXTRACTED`
- REACT-XSS-002: Rely on React’s escaping-by-default behavior; do not bypass it `EXTRACTED`
- REACT-DOM-001: Avoid DOM XSS injection sinks in React code (use safe alternatives) `EXTRACTED`
- REACT-SRI-001: Use Subresource Integrity (SRI) for third-party scripts and styles (or self-host) `EXTRACTED`
- REACT-SUPPLY-001: Dependency and supply-chain hygiene (frontend + build tooling) `EXTRACTED`
- REACT-CONFIG-001: Never embed secrets in the client bundle (env vars are public) `EXTRACTED`
- REACT-URL-001: Validate and constrain untrusted URLs used in `href`, `src`, navigation, and redirects `EXTRACTED`
- REACT-MARKUP-001: Markdown / rich text rendering must be configured safely `EXTRACTED`
- REACT-3P-001: Third-party JavaScript and tag managers must be minimized and governed `EXTRACTED`
- REACT-CSRF-001: Cookie-authenticated, state-changing requests MUST be CSRF-protected `EXTRACTED`
- REACT-SW-001: Service workers are high-privilege; require HTTPS and safe caching/update rules `EXTRACTED`
- REACT-HEADERS-001: Ensure essential security headers are set for the React app shell (app or edge) `EXTRACTED`
- REACT-FILE-001: File uploads and previews must not create client-side active content vulnerabilities `EXTRACTED`
- REACT-CSP-001: Deploy and maintain a CSP as defense-in-depth (especially when rendering untrusted content) `EXTRACTED`
- REACT-AUTHZ-001: Do not rely on frontend-only authorization `EXTRACTED`
- REACT-REDIRECT-001: Prevent open redirects and untrusted navigation `EXTRACTED`
- REACT-POSTMSG-001: `postMessage` must validate origin and treat payload as untrusted data `EXTRACTED`
- *…and 4 more `references` connection(s) not listed (lowest-degree first to go)*

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*