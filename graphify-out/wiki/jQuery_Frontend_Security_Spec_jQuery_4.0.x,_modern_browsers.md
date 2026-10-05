# jQuery Frontend Security Spec (jQuery 4.0.x, modern browsers)

> God node · 47 connections · `.agents/skills/security-best-practices/references/javascript-jquery-web-frontend-security.md`

**Community:** [jQuery Security References](jQuery_Security_References.md)

## Connections by Relation

### cites
- jQuery 4.0.0 | Official jQuery Blog `EXTRACTED`
- Content Security Policy - OWASP Cheat Sheet Series `EXTRACTED`
- CVE-2019-11358 Detail - NVD `EXTRACTED`
- CVE-2020-11022 Detail - NVD `EXTRACTED`
- jQuery.parseHTML() `EXTRACTED`
- .load() | jQuery API Documentation `EXTRACTED`
- jQuery.getScript() `EXTRACTED`
- jQuery.ajax() `EXTRACTED`
- javascript: URLs - URIs - MDN Web Docs `EXTRACTED`
- Download jQuery | jQuery `EXTRACTED`
- Content-Security-Policy: require-trusted-types-for directive `EXTRACTED`
- .text() | jQuery API Documentation `EXTRACTED`
- .val() | jQuery API Documentation `EXTRACTED`
- Potential XSS vulnerability in jQuery.htmlPrefilter and related methods · Advisory · jquery/jquery · GitHub `EXTRACTED`
- DOMPurify - a DOM-only, super-fast, uber-tolerant XSS ... `EXTRACTED`
- HTML Sanitizer API - MDN Web Docs `EXTRACTED`
- Cross-Site Request Forgery Prevention Cheat Sheet `EXTRACTED`
- jQuery.escapeSelector() `EXTRACTED`
- Trusted Types `EXTRACTED`
- HTTP Security Response Headers Cheat Sheet `EXTRACTED`
- *…and 9 more `cites` connection(s) not listed (lowest-degree first to go)*

### contains
- .agents/skills/security-best-practices/references/javascript-jquery-web-frontend-security.md `EXTRACTED`

### references
- Select security references for both frontend and backend `INFERRED`
- JQ-XSS-002: If rendering user-controlled HTML is required, it MUST be sanitized with a proven HTML sanitizer `EXTRACTED`
- JQ-XSS-001: Untrusted data MUST NOT be inserted as HTML via jQuery DOM-manipulation methods `EXTRACTED`
- JQ-SUPPLY-001: jQuery MUST be patched; do not run known vulnerable versions `EXTRACTED`
- JQ-CSP-001: CSP and Trusted Types SHOULD be used to make DOM XSS harder to introduce and exploit `EXTRACTED`
- JQ-SUPPLY-002: Third-party script loading SHOULD use integrity and trusted origins `EXTRACTED`
- JQ-XSS-003: `$(untrustedString)` and `jQuery.parseHTML` MUST NOT process attacker-controlled markup `EXTRACTED`
- JQ-XSS-004: `.load()` MUST be treated as an HTML+script injection surface `EXTRACTED`
- JQ-EXEC-001: Dynamic script execution and script fetching MUST NOT be reachable from untrusted input `EXTRACTED`
- JQ-AJAX-001: JSONP MUST be disabled unless the endpoint is fully trusted (and even then, avoid) `EXTRACTED`
- JQ-AJAX-002: State-changing AJAX requests using cookie auth MUST be CSRF-protected `EXTRACTED`
- JQ-ATTR-001: Untrusted values MUST NOT be written into dangerous attributes without validation/allowlisting `EXTRACTED`
- JQ-SELECTOR-001: User-controlled selector fragments MUST be escaped with `jQuery.escapeSelector` `EXTRACTED`
- JQ-PROTOTYPE-001: Do not deep-merge untrusted objects; prevent prototype pollution `EXTRACTED`
- Generation mode in javascript-jquery-web-frontend `EXTRACTED`
- Passive review mode in javascript-jquery-web-frontend `EXTRACTED`
- Active audit mode in javascript-jquery-web-frontend `EXTRACTED`

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*