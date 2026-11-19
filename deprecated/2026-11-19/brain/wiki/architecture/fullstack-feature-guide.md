# Fullstack Feature Guide

This guide describes how to implement a fullstack feature in Vacky across Next.js App Router, server actions, local SpacetimeDB, generated TypeScript bindings, and UI. It is intentionally general first, then uses deleting trips as the concrete example.

Use this when a feature changes persisted data, reads authenticated data, mutates user-owned records, or needs UI tied to server state.

## Current Stack Assumptions

- Vacky is a single Next.js `16.2.1` App Router app.
- React is `19.2.4` and Tailwind is v4.
- Persistence is local-only SpacetimeDB at `http://127.0.0.1:3000`.
- The local database/module name is `vacky-spacetimedb-local-dev`.
- Auth is app-owned email/password plus HTTP-only `vacky_session` cookies.
- Server code reads the current user with `getSession()` or `requireSession()` from `lib/auth/session.ts`.
- SpacetimeDB generated bindings live in `lib/spacetimedb/module_bindings/` and must not be hand-edited.
- Most persisted mutations should go through SpacetimeDB reducers.
- Most data reads should go through SpacetimeDB procedures or safe server helpers.

## Feature Implementation Shape

A normal fullstack feature has these layers:

- Product behavior: what the user can do, what changes, and what should be impossible.
- SpacetimeDB schema: tables, indexes, and persisted fields in `spacetimedb/src/schema/*.ts`.
- SpacetimeDB reducers and procedures: authoritative mutation and read logic in `spacetimedb/src/modules/*/`.
- Generated bindings: regenerated TypeScript API under `lib/spacetimedb/module_bindings/`.
- Server helper layer: app-facing helpers under `lib/spacetimedb/*.ts` that parse IDs, convert timestamps, call reducers/procedures, and map generated records to app types.
- Server action or route handler: authenticated Next.js entry point under `lib/actions/` or `app/api/**/route.ts`.
- UI route/page/component: App Router page under `app/` and reusable/client components under `components/`.
- Cache/navigation behavior: `redirect()`, `revalidatePath()`, or route reload behavior after the mutation.
- Verification: local SpacetimeDB publish, binding generation, lint, and browser/manual checks.
- Brain maintenance: update `brain/` when the feature changes durable architecture, current surface, workflow, risk, or product understanding.

## Step 1: Define Scope Before Code

Write down the smallest behavior that would make the feature complete.

Answer these questions:

- Who can use the feature?
- Which persisted records are read or changed?
- Which user ownership boundary protects those records?
- Does the mutation need to be transactional?
- What happens on success?
- What happens on validation failure?
- What happens when the record does not exist?
- Does the feature touch external services like UploadThing, Google Maps, Google Places, geocoding, or email?
- Does the feature need route-level auth behavior, data-level auth behavior, or both?
- Does it require a new URL, or can it live inside an existing page?

Good practice tips:

- Prefer the smallest feature surface that proves the behavior.
- Do not add compatibility code unless there is shipped behavior, persisted data, or an external consumer that requires it.
- Treat user IDs, trip IDs, location IDs, and form payloads as hostile input.
- Keep auth and ownership checks on the server, even if the UI hides controls from unauthenticated users.
- Decide whether destructive actions need confirmation before writing reducers.

Delete trips example:

- Feature: a signed-in user can delete one of their own trips from `/trips` or `/trips/[tripId]`.
- Non-goal: no bulk delete, no undo, no shared-trip permissions, no UploadThing file deletion unless explicitly scoped.
- Persisted records: delete one `trip` row and every `location` row whose `tripId` matches that trip.
- Ownership boundary: the trip must belong to the current session user.
- Success: redirect or return to `/trips` with the deleted trip gone from the dashboard.
- Failure: reject invalid IDs, missing trips, and other users' trips.
- UI: expose a clearly destructive `Delete trip` button with a confirmation step.

## Step 2: Inspect Existing Patterns

Before editing, inspect nearby code and reuse its patterns.

Important files for trip-backed features:

- `spacetimedb/src/schema/`
- `spacetimedb/src/modules/trips/`
- `spacetimedb/src/modules/itinerary/`
- `spacetimedb/src/shared/`
- `lib/spacetimedb/trips.ts`
- `lib/spacetimedb/types.ts`
- `lib/actions/create-trip.ts`
- `lib/actions/get-all-trips.ts`
- `lib/actions/get-trip-by-id.ts`
- `lib/actions/itinerary.ts`
- `app/trips/page.tsx`
- `app/trips/[tripId]/page.tsx`
- `components/tripDetail.tsx`
- `app/api/trips/route.ts` when globe/API behavior changes

Good practice tips:

- Copy the current layering instead of inventing a new architecture.
- Keep SpacetimeDB-only logic in `spacetimedb/src/schema/`, `spacetimedb/src/modules/`, and `spacetimedb/src/shared/`.
- Keep Next.js auth/session logic in `lib/auth/` and server actions.
- Keep generated-binding normalization and ID parsing in `lib/spacetimedb/*.ts`.
- Keep interactive browser state in a client component only when it is actually needed.

Delete trips example:

- Trip creation already uses `create_trip` in `spacetimedb/src/modules/trips/reducers.ts`.
- The app helper `createTripForUser()` in `lib/spacetimedb/trips.ts` converts string IDs and dates before calling the generated reducer.
- `getAllTrips()` and `getTripById()` are server actions that call `requireSession()` and then helper reads.
- `/trips` is a server page that loads user-owned trips.
- `components/tripDetail.tsx` is currently a client component because it owns tab state.

## Step 3: Decide Whether The Schema Changes

Only edit `spacetimedb/src/schema/*.ts` when the feature needs new persisted fields, tables, or indexes.

Common schema changes:

- Add a field to an existing table.
- Add a new table.
- Add an index for lookup performance.
- Add a uniqueness rule.
- Preserve a reserved field that already exists, such as `Trip.imagesJson`.

Good practice tips:

- Do not put secrets, password hashes, token hashes, or private auth data in public read procedures.
- Add indexes when reducers/procedures need repeated lookup by a non-primary-key field.
- Keep table names and field names aligned with existing SpacetimeDB naming style.
- Remember that schema changes require local publish and binding regeneration.

Delete trips example:

- No schema change is required.
- The `Trip` table already has `id` and `userId`.
- The `Location` table already has `tripId` and a `location_trip_id` index.
- Deleting a trip can filter locations by `tripId` before deleting the trip.

## Step 4: Implement The SpacetimeDB Reducer

Reducers are the authoritative write boundary for persisted data.

Reducer responsibilities:

- Accept only the fields needed for the mutation.
- Validate ownership and existence inside the module.
- Validate invariants that must always hold, even if a buggy client or server action calls the reducer incorrectly.
- Mutate all affected rows in one reducer when the change must be atomic.
- Throw generic errors for unauthorized or missing user-owned resources where revealing existence would be risky.

Good practice tips:

- Do not rely only on Next.js server actions for ownership enforcement.
- Reuse local helper functions such as `requireOwnedTrip()` when available.
- Delete child rows before parent rows when there is no database cascade.
- Keep reducer names clear and action-oriented, such as `delete_trip`.
- Avoid returning UI-specific shapes from reducers; use procedures for reads.

Delete trips example reducer:

```ts
export const delete_trip = spacetimedb.reducer(
  { userId: t.u64(), tripId: t.u64() },
  (ctx, { userId, tripId }) => {
    requireOwnedTrip(ctx.db, userId, tripId);

    for (const location of ctx.db.location.location_trip_id.filter(tripId)) {
      ctx.db.location.id.delete(location.id);
    }

    ctx.db.trip.id.delete(tripId);
  }
);
```

Why this shape:

- `userId` comes from the authenticated session, not from a trusted browser identity.
- `tripId` identifies the target record.
- `requireOwnedTrip()` prevents deleting someone else's trip.
- Locations are deleted first because the module does not currently use a foreign-key cascade.
- The reducer performs the complete mutation in one SpacetimeDB reducer call.

## Step 5: Add Or Update Procedures For Reads

Procedures are the safe read boundary for generated records.

Add or update a procedure when the feature needs a new read shape, a new list, or a post-mutation verification path.

Good practice tips:

- Return explicit records like `TripRecord` or `TripWithLocationsRecord`, not raw auth-sensitive rows.
- Filter by `userId` inside the procedure for user-owned reads.
- Keep sorting near the data source when multiple callers need the same ordering.
- Do not add a procedure just because a mutation exists; add one only if the UI or server needs a new read.

Delete trips example:

- No new read procedure is required.
- Existing `list_trips_by_user` already powers the dashboard after deletion.
- Existing `get_trip_with_locations` already returns `undefined` if the deleted trip no longer exists or does not belong to the user.

## Step 6: Publish SpacetimeDB And Regenerate Bindings

Any SpacetimeDB schema, reducer, procedure, object type, or view change must be published locally and bindings must be regenerated.

Commands:

```bash
PATH=/Users/gonzalo.secades/.local/bin:/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run stdb:publish:local
PATH=/Users/gonzalo.secades/.local/bin:/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run stdb:generate
```

Good practice tips:

- Start the local SpacetimeDB server first with `npm run stdb:start` if it is not running.
- Use `npm run stdb:publish:reset` only when intentionally deleting local module data.
- Never hand-edit `lib/spacetimedb/module_bindings/`.
- Expect generated reducer names to be camel-cased in the TypeScript client, such as `delete_trip` becoming `deleteTrip`.

Delete trips example:

- After adding `delete_trip`, publish the module.
- Regenerate bindings so `connection.reducers.deleteTrip(...)` exists.
- Commit generated binding changes together with the module change.

## Step 7: Add The Server Helper

The app helper layer lives under `lib/spacetimedb/` and should hide generated-binding details from server actions and route handlers.

Helper responsibilities:

- Parse string IDs into SpacetimeDB `u64` values.
- Normalize optional strings.
- Convert dates to `Timestamp` or records to app types.
- Call generated reducers and procedures through `withSpacetimeDbConnection()`.
- Keep server actions from importing generated module code directly.

Good practice tips:

- Reuse existing parsing helpers where possible.
- Keep helper function names app-oriented, such as `deleteTripForUser()`.
- Let invalid IDs fail before reducer calls.
- Do not accept `userId` from form data; pass it from the session-owned server action.

Delete trips example helper in `lib/spacetimedb/trips.ts`:

```ts
export async function deleteTripForUser(userId: string, tripId: string) {
  await withSpacetimeDbConnection(async (connection) => {
    await connection.reducers.deleteTrip({
      userId: parseU64Id(userId, 'user id'),
      tripId: parseU64Id(tripId, 'trip id'),
    });
  });
}
```

Why this belongs in `lib/spacetimedb/trips.ts`:

- The action is trip-domain persistence logic.
- Existing trip helpers already parse IDs and call trip reducers.
- Server actions can stay focused on auth, form parsing, and navigation.

## Step 8: Add The Next.js Server Action

Server actions are the authenticated Next.js mutation boundary for forms and client components.

Server action responsibilities:

- Keep `'use server'` at the top of the file.
- Call `requireSession()` for authenticated mutations.
- Parse and validate `FormData` or typed arguments.
- Call the SpacetimeDB helper with `session.user.id`.
- Choose `redirect()` or `revalidatePath()` after success.
- Return structured state for recoverable form errors when the UI should stay on the same page.

Good practice tips:

- Use `redirect()` for simple navigation after successful mutations.
- Use `revalidatePath()` when the user should stay on the same page and see refreshed data.
- For destructive actions, prefer a confirmation UI before the action posts.
- Do not trust hidden form fields beyond IDs; every real authorization check belongs server-side.
- Keep route handlers for API clients and server actions for form/user mutations unless there is a clear reason to expose an API.

Delete trips example action in a new `lib/actions/delete-trip.ts`:

```ts
'use server';

import { requireSession } from '@/lib/auth/session';
import { deleteTripForUser } from '@/lib/spacetimedb/trips';
import { redirect } from 'next/navigation';

export async function deleteTrip(formData: FormData) {
  const session = await requireSession();
  const tripId = formData.get('tripId')?.toString();

  if (!tripId) {
    throw new Error('Trip id is required');
  }

  await deleteTripForUser(session.user.id, tripId);

  redirect('/trips');
}
```

Alternative for inline dashboard deletion:

```ts
import { revalidatePath } from 'next/cache';

export async function deleteTrip(formData: FormData) {
  const session = await requireSession();
  const tripId = formData.get('tripId')?.toString();

  if (!tripId) {
    throw new Error('Trip id is required');
  }

  await deleteTripForUser(session.user.id, tripId);
  revalidatePath('/trips');
}
```

Choose one behavior intentionally:

- Use `redirect('/trips')` if the action can run from a trip detail page.
- Use `revalidatePath('/trips')` if the action only runs inside the dashboard and should remove the card in place.
- If the same action is used from both places, redirecting to `/trips` is simpler and consistent.

## Step 9: Design The UI Entry Point

UI work should preserve the existing visual system and only add client state when needed.

UI questions:

- Where does the user naturally perform the action?
- Does the action need confirmation?
- Should the button be visible on cards, detail pages, settings, or all of them?
- Is the action available on mobile and desktop?
- What pending state prevents double-submit?
- How is destructive styling communicated accessibly?
- What happens after success?
- What happens if the action fails?

Good practice tips:

- Prefer a plain server-action form when no interactivity is needed.
- Add a small client component when you need confirmation, modal state, optimistic UI, or pending UI.
- Use existing `components/ui/` primitives before adding one-off markup.
- Use clear destructive copy such as `Delete trip`, not vague copy such as `Remove`.
- Do not put destructive controls inside a clickable card without stopping accidental navigation.
- Keep keyboard access and focus behavior usable.

Delete trips example UI options:

- Dashboard card control in `app/trips/page.tsx` so users can delete from the list.
- Detail page control in `components/tripDetail.tsx` so users can delete while viewing the trip.
- A reusable `components/delete-trip-button.tsx` client component if both pages need the same confirmation and pending behavior.

Simple server-only form option:

```tsx
import { deleteTrip } from '@/lib/actions/delete-trip';

<form action={deleteTrip}>
  <input type="hidden" name="tripId" value={trip.id} />
  <Button type="submit" variant="destructive">
    Delete trip
  </Button>
</form>
```

Client confirmation component option:

```tsx
'use client';

import { deleteTrip } from '@/lib/actions/delete-trip';
import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';

function DeleteSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="destructive" disabled={pending}>
      {pending ? 'Deleting...' : 'Delete trip'}
    </Button>
  );
}

export function DeleteTripButton({ tripId }: { tripId: string }) {
  return (
    <form
      action={deleteTrip}
      onSubmit={(event) => {
        if (!window.confirm('Delete this trip and all of its locations?')) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="tripId" value={tripId} />
      <DeleteSubmitButton />
    </form>
  );
}
```

Notes for this example:

- `window.confirm()` is the smallest confirmation path, but a designed dialog may fit the product better.
- If adding a dialog, check existing `components/ui/` primitives before adding a new dependency.
- The destructive action should mention that itinerary locations are also deleted.
- If the card itself is a `Link`, avoid placing a nested form inside the link. Restructure the card so the image/title area is the link and the actions are outside the link.

## Step 10: Update Pages And Components

Page and component changes should be minimal and local.

Good practice tips:

- Server pages should load data and pass app-shaped records down.
- Client components should own only browser state and interaction state.
- Do not move a server page to a client component just to add a button.
- If a page already uses a client component, add the control there only if it needs that component's state.
- Keep import direction clean: UI imports server actions, server actions import helpers, helpers import generated bindings.

Delete trips example touch points:

- `app/trips/page.tsx`: add a delete control per trip card if dashboard deletion is in scope.
- `components/tripDetail.tsx`: add a delete control near the trip actions if detail-page deletion is in scope.
- `components/delete-trip-button.tsx`: optional reusable client component for confirmation and pending state.
- `lib/actions/delete-trip.ts`: new server action imported by the UI.
- `lib/spacetimedb/trips.ts`: new `deleteTripForUser()` helper.
- `spacetimedb/src/modules/trips/reducers.ts`: new `delete_trip` reducer.
- `lib/spacetimedb/module_bindings/`: generated output after `npm run stdb:generate`.

Potential dashboard card adjustment:

- Current trip cards are wrapped in a single `Link` in `app/trips/page.tsx`.
- A delete form should not be nested inside that `Link`.
- Change the card so only the openable content is a `Link`, and the card footer or action row contains the delete form outside the link.

Potential detail page adjustment:

- `components/tripDetail.tsx` already has a top summary and action section.
- Add `DeleteTripButton` near the itinerary action or in a separate danger area.
- Keep the button visually destructive and avoid placing it as the primary action.

## Step 11: Handle Cache, Redirects, And Stale Screens

After mutation, decide how the user sees fresh data.

Options:

- `redirect('/trips')` after success.
- `revalidatePath('/trips')` when staying on the dashboard.
- `revalidatePath('/globe')` or `revalidatePath('/api/trips')` only if a changed feature relies on cached route data.

Good practice tips:

- Prefer simple redirect after destructive deletion.
- If a deleted trip affects other pages, consider revalidating those paths.
- Do not add revalidation blindly; understand whether the page uses static caching, dynamic auth cookies, or API fetch caching.
- For App Router behavior changes, read the relevant bundled Next.js docs under `node_modules/next/dist/docs/` before changing routing, rendering, or data-fetching semantics.

Delete trips example:

- `redirect('/trips')` is enough for detail-page deletion.
- Dashboard server render will no longer list the deleted trip after navigation.
- `/api/trips` globe data may change because locations were deleted, but the current authenticated route should be checked for caching behavior before adding broad revalidation.

## Step 12: Consider External Side Effects

Some features delete or orphan external resources.

Common side effects:

- UploadThing images.
- Google geocoding or Places data.
- Email delivery.
- Session cookies.
- Browser local state or cookies.

Good practice tips:

- Do not silently add destructive external cleanup unless it is part of the feature scope.
- If cleanup can fail, decide whether persistence should still change.
- If external cleanup must be best-effort, log failures and keep user-visible state consistent.
- Document orphaned-resource tradeoffs when they matter.

Delete trips example:

- Deleting the trip row removes the stored `coverImageUrl`, but it does not delete the UploadThing file.
- If image cleanup is required, add an explicit UploadThing cleanup step and decide failure behavior.
- A safe first version can leave UploadThing cleanup out of scope and document that deletion removes Vacky records only.

## Step 13: Verification Checklist

Run command verification with Node `22.20.0`.

Standard commands:

```bash
PATH=/Users/gonzalo.secades/.local/bin:/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run stdb:publish:local
PATH=/Users/gonzalo.secades/.local/bin:/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run stdb:generate
PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run lint
PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run build
```

When to run each command:

- Run `stdb:publish:local` after any SpacetimeDB module change.
- Run `stdb:generate` after any SpacetimeDB schema, reducer, procedure, object type, or view change.
- Run `lint` for most code changes.
- Run `build` for route, rendering, config, SpacetimeDB, or production-sensitive changes.

Manual checks:

- Sign in as a user with at least two trips.
- Delete one owned trip from the UI.
- Confirm the trip disappears from `/trips`.
- Confirm opening `/trips/[deletedTripId]` no longer shows the trip.
- Confirm unrelated trips remain visible.
- Confirm locations for the deleted trip no longer appear in itinerary, map, or globe data.
- Try tampering with the hidden `tripId` to another user's trip and confirm deletion fails.
- Try invalid IDs such as empty strings, letters, negative values, and huge integers.
- Try double-submit behavior and confirm pending state prevents accidental repeated actions.

Good practice tips:

- Record hostile-client checks for auth/ownership mutations when possible.
- If browser verification is done manually by a human, say that clearly in the PR.
- Do not claim `npm test` because this repo does not currently have a dedicated test script.
- Ask Reviewer/QA for a final pass when auth, SpacetimeDB reducers, route handlers, or server/client boundaries changed.

## Step 14: Brain And PR Maintenance

Update `brain/` when a feature changes durable understanding.

Brain impact levels:

- `none`: tiny bug fix or internal refactor with no lasting knowledge change.
- `small`: concise log, risk, or single-page update.
- `material`: update the relevant wiki page, `brain/wiki/log.md`, and `brain/wiki/now.md` if current state changed.
- `decision`: add or update a decision note and link it from the relevant wiki page.

Good practice tips:

- Update `brain/wiki/features/current-surface.md` when visible product behavior changes.
- Update `brain/wiki/architecture/data-and-auth.md` when auth, tables, reducers, procedures, or ownership boundaries change.
- Update `brain/wiki/risks.md` when a new risk appears, an old risk is resolved, or verification status materially changes.
- Append a concise log note in `brain/wiki/log.md` for meaningful feature work.
- Keep raw notes for non-obvious rationale, failed paths, or verification evidence that future developers will need.

Delete trips example brain impact:

- Update `features/current-surface.md` because trip deletion changes the visible feature surface.
- Update `architecture/data-and-auth.md` because a new trip deletion reducer and cascade-like location deletion behavior exists.
- Update `log.md` with a short note after implementation.
- Update `now.md` if delete trips becomes part of the current strongest feature set or changes recommended next actions.
- Consider `risks.md` if UploadThing orphan images remain an accepted or open cleanup risk.

## End-To-End Delete Trips Implementation Plan

Use this checklist when implementing the exact delete trips feature.

1. Confirm scope.

- Signed-in users can delete their own trips.
- Deletion removes the trip row and all location rows for that trip.
- UploadThing file cleanup is out of scope unless explicitly added.
- Success navigates to `/trips`.

2. Add SpacetimeDB reducer.

- Edit `spacetimedb/src/modules/trips/reducers.ts`.
- Add `delete_trip` near other trip reducers.
- Use `requireOwnedTrip(ctx.db, userId, tripId)`.
- Delete matching locations through `ctx.db.location.location_trip_id.filter(tripId)`.
- Delete the trip through `ctx.db.trip.id.delete(tripId)`.

3. Publish and generate.

- Run `npm run stdb:publish:local` with the Node/SpacetimeDB PATH prefix.
- Run `npm run stdb:generate` with the Node/SpacetimeDB PATH prefix.
- Verify generated bindings include the new reducer.

4. Add app helper.

- Edit `lib/spacetimedb/trips.ts`.
- Add `deleteTripForUser(userId: string, tripId: string)`.
- Parse both IDs with `parseU64Id()`.
- Call `connection.reducers.deleteTrip(...)`.

5. Add server action.

- Create `lib/actions/delete-trip.ts`.
- Add `'use server'`.
- Call `requireSession()`.
- Read `tripId` from `FormData`.
- Call `deleteTripForUser(session.user.id, tripId)`.
- Redirect to `/trips`.

6. Add UI.

- Create `components/delete-trip-button.tsx` if confirmation/pending UI is desired.
- Use a form with hidden `tripId`.
- Add a confirmation prompt or dialog.
- Disable the submit button while pending.
- Add the button to `components/tripDetail.tsx`.
- Optionally add the button to `app/trips/page.tsx`, but avoid nesting forms inside trip-card links.

7. Verify behavior.

- Run `npm run lint`.
- Run `npm run build` because SpacetimeDB and route behavior changed.
- Manually delete a trip with no locations.
- Manually delete a trip with locations.
- Confirm `/trips` refreshes correctly.
- Confirm `/trips/[deletedTripId]` is not accessible as an owned trip anymore.
- Confirm hostile-client deletion of another user's trip fails.

8. Update brain.

- Update `features/current-surface.md` to remove the current `no evidence of trip editing or deletion` gap.
- Update `architecture/data-and-auth.md` to mention trip deletion and location cleanup.
- Add a log entry.
- Add or update a risk if external image cleanup remains important.

## Common Mistakes To Avoid

- Do not delete generated bindings by hand.
- Do not call SpacetimeDB generated reducers directly from UI components.
- Do not accept `userId` from `FormData`.
- Do not rely on the dashboard hiding someone else's trips as the only protection.
- Do not forget child rows when deleting parent records.
- Do not nest forms or buttons inside a full-card `Link`.
- Do not add new route handlers when a server action is enough.
- Do not add broad client components just to use one button.
- Do not skip `stdb:generate` after adding a reducer.
- Do not claim production deployment support; this branch is local-only SpacetimeDB unless scope changes.

## Quick File Touch Matrix

For a typical persisted feature:

| Layer | Usually touched | Delete trips example |
| --- | --- | --- |
| Product docs | `brain/wiki/features/current-surface.md` | Update current surface to include trip deletion |
| Schema | `spacetimedb/src/schema/*.ts` | No change |
| Reducer/procedure | `spacetimedb/src/modules/trips/reducers.ts` | Add `delete_trip` reducer |
| Generated bindings | `lib/spacetimedb/module_bindings/` | Regenerate after reducer change |
| App helper | `lib/spacetimedb/trips.ts` | Add `deleteTripForUser()` |
| Server action | `lib/actions/*.ts` | Add `lib/actions/delete-trip.ts` |
| Server page | `app/trips/page.tsx`, `app/trips/[tripId]/page.tsx` | Optional dashboard button, detail route continues to read existing data |
| Client UI | `components/*.tsx` | Add optional `DeleteTripButton` and detail-page danger action |
| API route | `app/api/**/route.ts` | No new API route needed |
| External services | UploadThing, Google APIs, email | UploadThing cleanup is optional and should be explicit |
| Verification | npm scripts and browser/manual checks | Publish, generate, lint, build, manual deletion, hostile-client checks |

## Final Rule

For fullstack features in Vacky, implement from the data invariant outward.

Start with the ownership and persistence rule in SpacetimeDB, expose it through a small app helper, wrap it in an authenticated Next.js server action, then add the smallest UI that makes the behavior clear and safe.
