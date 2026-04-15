# Itinerary Planner StopCard Performance Follow-Up

Date: 2026-04-15

## Context

The itinerary planner currently renders the row list inline in `components/itinerary-planner.tsx`. Row state updates preserve object identity for unchanged rows, but the parent still maps every row and creates VDOM for every stop whenever any row changes.

This is acceptable for short itineraries, but a five-day trip can realistically reach 20+ stops. Longer trips can exceed that, making row-level render isolation worth implementing before the planner grows more complex.

## Proposed Future Refactor

Extract the repeated stop-card JSX into a module-scope `StopCard` child component and wrap it in `React.memo`.

Use default shallow comparison first. It should be enough if the parent keeps props stable:

- pass the row object, not copied row fields
- pass `startDateKey` and `endDateKey` primitives instead of the whole trip object
- pass only `suggestionsByRow[row.clientId]`, not the entire suggestions map
- use a hoisted `EMPTY_SUGGESTIONS` array for rows without suggestions
- memoize row update handlers with `useCallback`
- avoid inline parent callbacks in the `.map()`
- keep ref setters stable, for example `setStopCardRef(clientId, node)` and `setLocationInputRef(clientId, node)`

The existing row update pattern already returns the original object for unchanged rows, so unchanged `StopCard` instances should skip rendering after this split.

## Tradeoffs

- This refactor is larger than the current render-churn cleanup because most planner row JSX and event plumbing moves into a child component.
- It only pays off clearly when itineraries reach roughly 20+ rows or when profiling shows row rendering as a typing bottleneck.
- Passing `index` remains correct even though insertions/deletions will re-render rows whose visible stop number changes.
- A custom memo comparator should not be the first step; stable props plus default `React.memo` are simpler and less fragile.

## Status

Not implemented. Keep as the preferred future approach if long-itinerary typing, notes editing, or expand/collapse interactions begin to feel heavy.
