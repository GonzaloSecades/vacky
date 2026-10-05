# Frontend JavaScript/TypeScript Web Security Spec (Vanilla Browser JS/TS, Modern Browsers)

> God node · 39 connections · `.agents/skills/security-best-practices/references/javascript-general-web-frontend-security.md`

**Community:** [Browser JavaScript Security References](Browser_JavaScript_Security_References.md)

## Connections by Relation

### cites
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP `EXTRACTED`
- https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html `EXTRACTED`
- https://cheatsheetseries.owasp.org/cheatsheets/DOM_Clobbering_Prevention_Cheat_Sheet.html `EXTRACTED`
- javascript: URLs - URIs | MDN `EXTRACTED`
- https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html `EXTRACTED`
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/require-trusted-types-for `EXTRACTED`
- https://www.w3.org/TR/trusted-types/ `EXTRACTED`
- https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/http-equiv `EXTRACTED`
- Content Security Policy Level 2 `EXTRACTED`
- https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage `EXTRACTED`
- https://cheatsheetseries.owasp.org/cheatsheets/Third_Party_Javascript_Management_Cheat_Sheet.html `EXTRACTED`
- https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Subresource_Integrity `EXTRACTED`
- https://developer.mozilla.org/en-US/docs/Web/API/Document/write `EXTRACTED`
- https://developer.mozilla.org/en-US/docs/Web/API/Document/writeln `EXTRACTED`
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/trusted-types `EXTRACTED`
- https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/noopener `EXTRACTED`
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors `EXTRACTED`
- https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML `EXTRACTED`
- https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML `EXTRACTED`
- https://www.w3.org/TR/sri-2/ `EXTRACTED`

### contains
- .agents/skills/security-best-practices/references/javascript-general-web-frontend-security.md `EXTRACTED`

### references
- Select security references for both frontend and backend `INFERRED`
- JS-XSS-002: Avoid `document.write` / `document.writeln` (XSS + document clobbering hazards) `EXTRACTED`
- JS-MSG-001: `postMessage` must use strict origin validation and explicit targetOrigin `EXTRACTED`
- JS-XSS-001: Do not inject untrusted HTML into the DOM (avoid `innerHTML` and friends) `EXTRACTED`
- JS-XSS-003: Do not use string-to-code execution (`eval`, `new Function`, string timeouts) `EXTRACTED`
- JS-URL-001: Sanitize and allowlist URLs before navigation (especially `window.location` / `location.replace`) `EXTRACTED`
- JS-CSP-001: Use CSP; meta delivery is allowed `EXTRACTED`
- JS-TT-001: Use Trusted Types to reduce DOM XSS attack surface (where supported) `EXTRACTED`
- JS-SUPPLY-001: Third-party JavaScript is a major supply-chain risk; minimize and control it `EXTRACTED`
- JS-URL-002: Sanitize URLs before inserting into DOM URL contexts (`href`, `src`, etc.) `EXTRACTED`
- JS-CSP-002: Prefer strict CSP (nonces/hashes); avoid inline/eval patterns in code `EXTRACTED`
- JS-STORAGE-001: Web Storage is not a safe place for secrets (and is attacker-influencable) `EXTRACTED`
- JS-XSS-004: Do not set event handler attributes from strings (e.g., `setAttribute("onclick", "...")`) `EXTRACTED`
- JS-SRI-001: Use Subresource Integrity (SRI) for third-party scripts/styles `EXTRACTED`
- FS-DOMC-001: Prevent DOM clobbering (avoid relying on `window`/`document` named properties) `EXTRACTED`
- Generation mode in javascript-general-web-frontend `EXTRACTED`
- Passive review mode in javascript-general-web-frontend `EXTRACTED`
- Active audit mode in javascript-general-web-frontend `EXTRACTED`

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*