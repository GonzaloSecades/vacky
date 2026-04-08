---
applyTo: "app/**/*.tsx,components/**/*.tsx"
---

Focus reviews on UI correctness, accessibility, responsiveness, and consistency with the current design system.

- Reuse `components/ui/` primitives before suggesting new wrappers or libraries.
- Prefer theme tokens over hard-coded light-only classes.
- Flag text, surfaces, borders, overlays, dropdowns, and empty states that would become unreadable or visually broken in dark mode.
- Check responsive behavior on navbar, dropdown menus, cards, tabs, map/globe panels, and form layouts.
- Preserve existing user flow intent. Avoid opportunistic redesigns outside the requested scope.
- For interactive client components, verify pending state, focus handling, keyboard behavior, and layering issues such as menus rendering under page content.
- Prefer minimal Tailwind class changes that align with existing repository patterns.
