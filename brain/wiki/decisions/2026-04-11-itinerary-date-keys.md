# Itinerary Date Keys

Date: 2026-04-11

Status: accepted in merged PR #8

## What Was Decided

Scheduled itinerary days are stored on `Location.scheduledDate` as nullable `YYYY-MM-DD` strings.

`order` is interpreted within a scheduled day, not as a global trip order. New itinerary create/edit flows require a scheduled date, while legacy locations may remain unscheduled for migration safety.

## Options Considered

The raw itinerary brainstorm explicitly rejected UTC-normalization behavior for this feature. The accepted product rule is date-only semantics: a selected itinerary day should remain the selected calendar day when saved, grouped, and rendered.

No separate `Itinerary` model was added in this version. The itinerary remains the trip's `Location[]`.

## Why This Option Won

The source-backed rationale is that itinerary scheduling is a calendar-day concept, not a timestamp concept. Storing a date key avoids UTC-midnight conversions that could shift the displayed day for users.

The implementation also keeps the existing data model small: adding `Location.scheduledDate` was enough to support grouped trip days and same-day ordering.

## Accepted Downside

The downside is inferred from the final schema and helper layer: string date keys need disciplined validation, parsing, grouping, and sorting outside the database type system.

Current code accepts that tradeoff by centralizing date-key behavior in `lib/itinerary-dates.ts` and validating date ranges in server actions.

## Revisit When

Revisit this if Vacky adds time-of-day scheduling, route-duration calculations, timezone-aware reminders, cross-day drag-and-drop, imported reservations, or calendar sync.

## Evidence

- [itinerary planner brainstorm raw note](../../raw/sessions/2026-04-11-itinerary-planner-brainstorm.md)
- [itinerary planner MVP brainstorm output](../../outputs/brainstorms/2026-04-11-itinerary-planner-mvp.md)
- [itinerary planner diff summary](../../raw/2026-04-11-itinerary-planner/diff-summary.md)
- [PR #8 post-merge raw note](../../raw/commits/2026-04-11-pr-8-itinerary-planner.md)
