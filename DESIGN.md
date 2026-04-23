# Vacky DesignRefactor Experiment

## 1. Visual Theme & Atmosphere

Vacky should feel like a polished consumer travel product with Airbnb as the default reference and a restrained Uber influence only on dense planning and map-heavy surfaces.

- Default mood: warm, image-friendly, rounded, approachable, premium
- Travel surfaces should feel leisurely and discovery-oriented, not enterprise or dashboard-heavy
- Dense planning and map UI should become clearer and faster through stronger contrast, tighter controls, and cleaner utility chrome
- Keep the app coherent: one palette, one rhythm, one surface language

## 2. Color Palette & Roles

- Primary coral: `#FF5A5F`
- Primary hover: `#E14B50`
- Accent blush: `#FFF1F0`
- Background: `#FFFDFC`
- Surface: `#FFFFFF`
- Muted surface: `#F7F7F7`
- Border: `#E9E6E3`
- Text strong: `#1F1F1F`
- Text muted: `#6B6B6B`
- Success: `#2E8B57`
- Map/info blue: `#2F80ED`

Rules:

- Coral is the single branded CTA accent
- Blue exists only for map/location affordances and informational emphasis
- Large surfaces stay warm and light; avoid turning the app into a bright multicolor layout
- Dense utility controls may use black/near-black for contrast, but not as the dominant brand language

## 3. Typography

- Keep `Geist Sans` and `Geist Mono`
- Headings should feel warm and confident through weight and spacing, not font swapping
- Prefer weights `600` and `700` for section titles and trip names
- Keep body copy short and scan-friendly
- Use uppercase micro-labels sparingly for section kickers or metadata only

## 4. Components

### Buttons

- Primary actions: coral background, white text, rounded pill/soft-pill shape
- Secondary and outline actions: warm white surfaces with subtle borders
- Dense map/planner utility actions may use black background with white text

### Cards and Panels

- Use soft warm borders and airy shadows
- Prefer larger radii on travel-facing cards and content panels
- Image-first cards should give the image the dominant visual weight
- Avoid generic dashboard card grids where a cleaner layout will do

### Forms

- Inputs, textareas, and selects should share one warm treatment
- Use soft borders, generous rounding, and obvious focus rings
- Raw browser-looking fields should be normalized out of the touched surfaces

### Tabs

- Use clean segmented controls with a premium soft-surface feel
- Avoid tiny, sharp, or overly technical tab chrome

### Map and Planner Chrome

- Floating controls should be compact, high-contrast, and obviously interactive
- Sticky side panels should feel intentional and utility-oriented
- Stronger Uber-style contrast belongs here, not on the landing or discovery pages

## 5. Layout Principles

- Use an 8px-based spacing rhythm with generous section breathing room
- Landing and browse surfaces should feel editorial and image-aware
- Dense product surfaces should still breathe, but operate faster
- Favor reusable shells and shared utilities over repeated one-off styling
- Keep first impressions focused on destination, itinerary, and memory, not generic SaaS features

## 6. Do

- Use photography or image-like hierarchy wherever the product already has trip imagery
- Keep surfaces warm, friendly, and rounded
- Use coral as the clear CTA accent
- Make empty states feel premium instead of placeholder-like
- Tighten map/planner controls so they scan quickly

## 7. Don’t

- Don’t redesign every page in the app
- Don’t add a full theme engine or dark-mode redesign
- Don’t introduce more brand colors than this experiment needs
- Don’t make the whole app feel like an operations dashboard
- Don’t refactor unrelated business logic just to support the styling pass
