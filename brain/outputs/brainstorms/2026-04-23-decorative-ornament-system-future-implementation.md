# Decorative Ornament System Future Implementation

Date: 2026-04-23
Status: brainstorm
Tags: future implementation, decorative system, SVG, postal stamp, dashboard, trip cards, Twilight Postcards

## Summary

Vacky should treat the new dashboard ornaments and trip-card postal marks as a small decorative illustration system, not as pasted AI screenshots.

The clean implementation direction is vector-first, layout-anchored, and reusable: SVG masters stored in the repo, attached to sections and cards through CSS positioning, with AI-generated images used only as style reference boards.

## Current Context

The current design direction already makes room for this idea.

- `DESIGN.md` explicitly allows quiet travel drawings such as postal marks, route lines, contour lines, compass ticks, and corner ornaments as subordinate decorative cues
- `DESIGN.md` also explicitly allows destination-aware postage stamps as small commemorative accents on memory-led surfaces
- the current dashboard/trip-card visual direction is image-first and paper-led, which makes low-density line-art decoration a plausible extension instead of a visual reset

This brainstorm operationalizes that direction into a production-friendly asset strategy.

## Recommended Product Shape

Treat these decorations as a reusable ornament layer with a consistent visual grammar:

- thin, consistent line weight
- monochrome or near-monochrome plum/lavender treatment
- low density
- commemorative, editorial travel tone
- always secondary to content, photography, and actions

The decorative system should appear first on memory-led or overview surfaces:

- dashboard stat cards
- trip cards
- hero/footer edge treatments
- selected empty states or recap panels

It should not spill into dense planner, map, form, or utility-heavy surfaces where ornament would reduce scan speed.

## Best Asset Format

Use SVG for both ornament drawings and postal stamps.

Why SVG is the right default:

- scales cleanly across desktop and mobile
- stays editable after the initial design pass
- supports token-driven recolor through `currentColor` or shared stroke values
- keeps files small for simple line art
- can be positioned responsively inside sections without baking layout into the asset itself

Use PNG or WebP only when the desired effect depends on texture, grain, painterly noise, or other intentional raster qualities. That is not the primary shape of the current decorative idea.

The ornaments should feel fixed to a section through component layout and CSS, not because they are embedded in a large flattened image.

## Recommended Implementation Shape

The clean repo shape is:

- editable production assets in `public/design/ornaments/*.svg`
- postal stamp masters in `public/design/stamps/*.svg`
- optional reusable wrappers in `components/decorative/*` only when placement and sizing variants start repeating

Implementation rules:

- mount ornaments in a dedicated decorative layer inside the host component
- use `position: absolute`
- use `pointer-events: none`
- use `aria-hidden="true"`
- keep opacity low enough that the UI still works with the ornament mentally removed
- keep decoration out of interactive hit areas and away from critical text

If the SVGs need product-token recoloring, prefer `stroke="currentColor"` and let the component wrapper control color through classes.

## Asset Generation Workflow

The three AI-generated images should be treated as baseline references, not production assets.

Recommended workflow:

1. import the AI references into Figma, Illustrator, or Inkscape
2. manually trace or cleanly re-draw the motifs into SVG
3. normalize them into one system:
   - same stroke weight
   - similar corner softness
   - same color token family
   - similar visual density
4. split the result into reusable motif pieces instead of saving page-specific composites
5. compose those motifs into section-specific ornament placements in code

Acceptable shortcut:

- auto-vectorize first, then clean the result by hand

Do not ship raw auto-trace output. It usually creates noisy paths, uneven curves, and inconsistent stroke character.

If more motifs are needed, AI can still help as a reference generator with a tight prompt such as:

`minimal travel line art, monochrome lavender ink, editorial postcard motif, thin consistent stroke, transparent background, no shading, no filled shapes`

## Initial Motif Library

Build a small shared library before wiring screen-specific decorations.

Strong first candidates:

- wave-postmark
- balloon
- signpost
- mountain-stamp
- compass
- route-line
- cloud

The system will stay cleaner if new screen treatments are composed from this shared set rather than generated as one-off assets every time.

## Postal Stamp Pattern

The trip-card postal stamp is the strongest motif in the reference because it feels place-specific, commemorative, and clearly secondary to the card's main image and content.

The best production shape is a reusable stamp template SVG with:

- outer ring
- optional postmark waves
- central icon or scene
- optional destination label
- optional ring text

Generate variants by swapping only:

- center icon
- destination name
- minor ring text

Recommended constraints:

- keep the rendered size around `44px` to `64px`
- place it in the lower-right of the card body or image corner
- avoid covering the subject of the trip photo
- do not use it as a status badge or CTA container
- avoid stacking multiple stamps on one card

## Staged Scope

Stage 1:

- create `6-10` reusable SVG motifs
- build one postal stamp template plus a few destination variants
- wire ornaments into dashboard stat cards
- wire one postal stamp treatment into trip cards

Stage 2:

- extend ornament usage to footer, hero edges, and selected empty states
- add a small placement vocabulary so the same assets can be reused without manual per-screen tuning

Stage 3:

- explore whether destination-aware stamp variants should be manually curated or semi-generated from trip metadata
- only add automation if the visual quality remains noticeably better than generic templating

## Non-Goals

- do not paste AI-generated raster slices directly into the UI
- do not build dense decorative clusters that compete with the page hierarchy
- do not force ornament into itinerary planner, map, or form-heavy surfaces
- do not create a separate asset style for every page before the shared motif language exists

## Likely Repo Areas

If this moves into implementation, the most likely touchpoints are:

- `public/design/ornaments/`
- `public/design/stamps/`
- `components/decorative/`
- `app/globals.css`
- `app/trips/page.tsx`
- trip-card rendering in the dashboard surface
- selected shared card or panel wrappers only if a reusable decorative overlay pattern proves necessary

## Open Questions

- Should stamp variants stay manually curated at first, or derive from destination metadata once the visual system is stable?
- Should the decorative color stay single-plum/lavender only, or can commemorative stamp moments borrow restrained mauve/gold accents from `DESIGN.md`?
- Should source-of-truth editable files live only as SVG in-repo, or should the repo also track external design-source handoff expectations?

## Recommendation

Use SVG masters, build a small reusable motif library, and treat AI outputs as reference boards only.

That is the cleanest path technically, the most consistent with `Twilight Postcards`, and the lowest-risk way to keep the ornament system extensible across future dashboard and trip-memory surfaces.

## Codex Implementation Prompt

```text
Use the Vacky implementation workflow. Start by inspecting the current dashboard and trip-card surfaces plus DESIGN.md before editing.

Feature:
Introduce a reusable decorative ornament system for Vacky's memory-led surfaces.

Goal:
Add SVG-based corner ornaments to dashboard cards and a destination-aware postal stamp treatment to trip cards without weakening clarity, accessibility, or image-first hierarchy.

Implementation direction:
- Treat ornaments and stamps as a shared illustration system, not pasted screenshots.
- Store editable assets under public/design/ornaments and public/design/stamps.
- Use SVG for production assets.
- Mount them as decorative layers with absolute positioning, pointer-events none, and aria-hidden true.
- Keep them out of planner, form, and dense map surfaces.
- Prefer stroke=currentColor when token-driven recolor is useful.

Initial scope:
- Create a small library of reusable travel motifs.
- Add dashboard stat-card ornaments.
- Add one postal stamp template plus a few trip-card variants.
- Keep ornament density low and subordinate to photography and content.

Non-goals:
- No raw AI raster slices in production UI.
- No dense decorative collage treatment.
- No system-wide ornament rollout before the dashboard and trip-card pattern proves out.

Inspect first:
- DESIGN.md
- app/trips/page.tsx
- the trip-card/dashboard component boundary
- app/globals.css
- shared card primitives if placement or overflow rules matter

Verification:
- Run npm lint.
- Run npm build if shared primitives, layout boundaries, or font/image behavior changes materially.
- Manually verify desktop and mobile card layouts, text readability, and that decorative layers never block interaction.

Brain impact:
If the feature ships materially, update current-surface and design/experiment notes, plus log.md and now.md if the visual system becomes durable product truth.
```
