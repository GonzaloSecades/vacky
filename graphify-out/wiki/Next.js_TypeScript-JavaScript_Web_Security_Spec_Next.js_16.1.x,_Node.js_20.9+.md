# Next.js (TypeScript/JavaScript) Web Security Spec (Next.js 16.1.x, Node.js 20.9+)

> God node · 47 connections · `.agents/skills/security-best-practices/references/javascript-typescript-nextjs-web-server-security.md`

**Community:** [Next.js Security References](Next.js_Security_References.md)

## Connections by Relation

### cites
- How to Think About Security in Next.js | Next.js `EXTRACTED`
- Routing: API Routes | Next.js `EXTRACTED`
- next.config.js: serverActions | Next.js `EXTRACTED`
- Guides: Environment Variables | Next.js `EXTRACTED`
- Getting Started: Route Handlers | Next.js `EXTRACTED`
- Functions: cookies | Next.js `EXTRACTED`
- Functions: headers | Next.js `EXTRACTED`
- Guides: Self-Hosting `EXTRACTED`
- Next.js 16 `EXTRACTED`
- Denial of Service in Image Optimizer · Advisory `EXTRACTED`
- Guides: Authentication | Next.js `EXTRACTED`
- Getting Started: Deploying `EXTRACTED`

### contains
- .agents/skills/security-best-practices/references/javascript-typescript-nextjs-web-server-security.md `EXTRACTED`

### references
- Select security references for both frontend and backend `INFERRED`
- NEXT-HEADERS-001: Essential security headers MUST be set (in app or at the edge) `EXTRACTED`
- NEXT-AUTH-001: Authentication/authorization MUST be enforced server-side for every protected action `EXTRACTED`
- NEXT-CACHE-001: Prevent data leaks via static rendering and shared caching `EXTRACTED`
- NEXT-SUPPLY-001: Stay on supported Next.js releases; patch quickly for security advisories `EXTRACTED`
- NEXT-SECRETS-002: Avoid server-only → client bundling mistakes (server/client boundary is a security boundary) `EXTRACTED`
- NEXT-CSRF-001: Cookie-authenticated state-changing endpoints MUST be CSRF-protected `EXTRACTED`
- NEXT-SESS-001: Session cookies MUST use secure attributes in production `EXTRACTED`
- NEXT-INPUT-001: Runtime input validation is mandatory (TypeScript is not validation) `EXTRACTED`
- NEXT-CSP-001: Use a CSP to reduce XSS impact; prefer nonces for scripts `EXTRACTED`
- NEXT-ACTION-001: Server Actions MUST be treated like public endpoints `EXTRACTED`
- NEXT-WEBHOOK-001: Webhook endpoints MUST verify authenticity using the raw body `EXTRACTED`
- NEXT-DOS-001: Rate limiting and resource controls MUST exist for abuse-prone endpoints `EXTRACTED`
- NEXT-DEPLOY-001: Do not run `next dev` in production; ensure production mode behavior `EXTRACTED`
- NEXT-SECRETS-001: Secrets MUST NOT be committed or exposed to the browser `EXTRACTED`
- NEXT-AUTH-002: Proxy/Middleware-based auth MUST NOT create route coverage gaps `EXTRACTED`
- NEXT-ACTION-002: Do not accidentally leak secrets through Server Action closure/binding patterns `EXTRACTED`
- NEXT-FILES-001: User uploads MUST be validated, stored safely, and served safely `EXTRACTED`
- NEXT-SSRF-001: Outbound requests using user-influenced URLs MUST be restricted `EXTRACTED`
- NEXT-REDIRECT-001: Prevent open redirects (including auth flows) `EXTRACTED`
- *…and 14 more `references` connection(s) not listed (lowest-degree first to go)*

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*