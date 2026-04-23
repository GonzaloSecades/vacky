# SpacetimeDB Guide For Vacky

Use this guide when Vacky is being implemented on the SpacetimeDB migration branch described in `docs/superpowers/plans/2026-04-23-spacetimedb-adoption-for-vacky.md`.

This is a coding guide, not a product spec. Its job is to show where code belongs and how to implement normal app behavior once SpacetimeDB replaces Prisma/Postgres/NextAuth as the main persisted backend.

## Purpose

Vacky’s SpacetimeDB architecture should be:

- SpacetimeDB for persistent tables, constraints, reducers, and safe views
- Next.js for pages, forms, route handlers, secure cookies, password hashing, and email sending
- generated SpacetimeDB bindings for typed reads/writes from the app

Do not rebuild the old Prisma mental model one file at a time. The point of the migration branch is to shape the app around SpacetimeDB’s model:

- writes go through reducers
- reads come from safe tables, views, or server helpers
- auth state is application-owned
- external side effects such as email stay in Next.js server code

## Why Vacky Still Keeps Some Logic In Next.js

SpacetimeDB reducers are the normal transactional write path, but they cannot perform external network I/O. That means these concerns still belong in Next.js:

- sending verification emails
- issuing and clearing HTTP-only cookies
- parsing form submissions and HTTP semantics
- redirecting after successful form actions
- password hashing before persistence

SpacetimeDB can still be the main backend even if Next.js remains the web/auth shell.

## Canonical File Layout

Use this file layout on the migration branch.

### SpacetimeDB module

- `spacetimedb/src/index.ts`
  Purpose: schema, tables, indexes, reducers, views, and module-level auth rules

### Generated bindings

- `src/module_bindings/` or `lib/spacetimedb/module_bindings/`
  Purpose: generated typed bindings from the SpacetimeDB module

Pick one location and keep it stable. Do not hand-edit generated files.

### App-side Spacetime helpers

- `lib/spacetimedb/server.ts`
  Purpose: server-only helpers for querying current-user-safe data
- `lib/spacetimedb/client.ts`
  Purpose: browser/client connection helpers and live subscriptions
- `lib/spacetimedb/types.ts`
  Purpose: app-local mapped types if the generated bindings need adaptation
- `lib/spacetimedb/errors.ts`
  Purpose: map SpacetimeDB or reducer errors to app-friendly errors
- `lib/spacetimedb/auth.ts`
  Purpose: current-user/session resolution helpers shared by pages and route handlers

### First-party auth

- `lib/auth/password.ts`
  Purpose: `Argon2id` hash + verify helpers
- `lib/auth/session.ts`
  Purpose: session creation, cookie writing, cookie clearing, session lookup
- `lib/auth/email-verification.ts`
  Purpose: verification token generation, hashing, validation, redemption
- `lib/email/send-verification-email.ts`
  Purpose: actual email delivery

### UI and route handlers

- `app/(auth)/sign-up/page.tsx`
- `app/(auth)/sign-in/page.tsx`
- `app/(auth)/verify-email/page.tsx`
- `app/api/auth/sign-up/route.ts`
- `app/api/auth/sign-in/route.ts`
- `app/api/auth/sign-out/route.ts`
- `app/api/auth/verify-email/route.ts`
- `app/trips/page.tsx`
- `app/trips/[tripId]/page.tsx`
- `app/trips/[tripId]/itinerary/new/page.tsx`
- `app/trips/[tripId]/itinerary/edit/page.tsx`
- `app/globe/page.tsx`

## What Goes Where

Use this rule of thumb:

- If the logic changes persisted state, prefer a reducer in `spacetimedb/src/index.ts`.
- If the logic reads persisted state for a page or API response, prefer a safe view or a server helper in `lib/spacetimedb/server.ts`.
- If the logic is about HTTP, cookies, redirects, or email delivery, keep it in Next.js.
- If the logic is about password hashing or token hashing, keep it in Next.js server code before storing the result in SpacetimeDB.

## Vacky Coding Workflow

When adding a feature on the migration branch, work in this order:

1. Define or update the SpacetimeDB schema in `spacetimedb/src/index.ts`.
2. Add reducers for state-changing operations.
3. Add views or indexed read helpers for the required reads.
4. Regenerate typed bindings.
5. Add or update `lib/spacetimedb/server.ts` and `lib/spacetimedb/client.ts`.
6. Add or update Next.js route handlers/pages that call those helpers.
7. Verify auth/ownership checks at the page boundary and route boundary.
8. Update the relevant brain files if the data/auth architecture changed.

## Common Mapping: CRUD Vs SpacetimeDB

Classic CRUD HTTP names still help describe user flows, but in Vacky’s SpacetimeDB branch they map like this:

- `POST` usually means:
  - Next.js route handler receives input
  - validates input
  - calls a reducer that creates state
- `GET` usually means:
  - Server Component or route handler loads current-user-safe rows through a view or server helper
- `PATCH` usually means:
  - Next.js validates payload and ownership context
  - calls a reducer that updates state
- `DELETE` usually means:
  - Next.js validates ownership context
  - calls a reducer that deletes or soft-deletes state

The HTTP method belongs to Next.js. The actual persisted write belongs to a reducer.

## Simple Example: Trips CRUD In Vacky

This example shows how a normal app feature should be organized once the migration branch exists.

### 1. Schema and reducers

File: `spacetimedb/src/index.ts`

Conceptually:

```ts
// Pseudocode shape only. Adjust to the actual SpacetimeDB TypeScript API.

type TripRow = {
  id: string;
  userId: string;
  title: string;
  description: string;
  coverImageUrl: string | null;
  startDate: string;
  endDate: string;
  createdAt: number;
  updatedAt: number;
};

export const trip = defineTable<TripRow>('trip', {
  primaryKey: ['id'],
  indexes: [['userId'], ['userId', 'startDate']],
});

export const create_trip = reducer('create_trip', (ctx, input) => {
  // require authenticated user
  // validate dates/title
  // insert row with ctx.identity.userId
});

export const update_trip = reducer('update_trip', (ctx, input) => {
  // require owner
  // patch allowed fields
});

export const delete_trip = reducer('delete_trip', (ctx, input) => {
  // require owner
  // delete trip and its locations or perform explicit cascade behavior
});
```

The reducer names should describe business actions, not ORM verbs pasted everywhere. `create_trip`, `update_trip`, and `delete_trip` are fine because they are direct product actions.

### 2. Server read helpers

File: `lib/spacetimedb/server.ts`

Purpose:

- centralize current-user-safe reads
- keep page components small
- avoid scattering low-level bindings across App Router files

Shape:

```ts
// Pseudocode shape only.

export async function getCurrentUserTrips(session: AppSession) {
  // load rows through a safe view or scoped query helper
}

export async function getTripForCurrentUser(
  session: AppSession,
  tripId: string
) {
  // return one trip only if it belongs to the current user
}
```

### 3. Create / POST

File: `app/api/trips/route.ts`

Purpose:

- accept form or JSON input
- validate request shape
- resolve current session
- call the `create_trip` reducer
- return JSON or redirect

Shape:

```ts
// Pseudocode shape only.

export async function POST(request: Request) {
  const session = await requireSession();
  const body = await request.json();

  const input = normalizeCreateTripInput(body);

  await spacetime.tripReducers.create_trip({
    userId: session.userId,
    title: input.title,
    description: input.description,
    coverImageUrl: input.coverImageUrl,
    startDate: input.startDate,
    endDate: input.endDate,
  });

  return Response.json({ ok: true });
}
```

### 4. Read / GET

File: `app/trips/page.tsx`

Purpose:

- load authenticated user session
- call `getCurrentUserTrips`
- render trips

Shape:

```ts
export default async function TripsPage() {
  const session = await requireSession();
  const trips = await getCurrentUserTrips(session);

  return <TripsView trips={trips} />;
}
```

If the page later becomes live, keep the same server-first boundary and add client subscriptions after the initial SSR data.

### 5. Update / PATCH

File: `app/api/trips/[tripId]/route.ts`

Purpose:

- resolve session
- validate ownership context
- validate input
- call `update_trip`

Shape:

```ts
export async function PATCH(
  request: Request,
  context: { params: Promise<{ tripId: string }> }
) {
  const session = await requireSession();
  const { tripId } = await context.params;
  const body = await request.json();

  await spacetime.tripReducers.update_trip({
    tripId,
    userId: session.userId,
    title: body.title,
    description: body.description,
  });

  return Response.json({ ok: true });
}
```

### 6. Delete / DELETE

File: `app/api/trips/[tripId]/route.ts`

Purpose:

- resolve session
- enforce ownership
- call `delete_trip`

Shape:

```ts
export async function DELETE(
  _request: Request,
  context: { params: Promise<{ tripId: string }> }
) {
  const session = await requireSession();
  const { tripId } = await context.params;

  await spacetime.tripReducers.delete_trip({
    tripId,
    userId: session.userId,
  });

  return Response.json({ ok: true });
}
```

## Example: Sign Up Flow In Vacky

Use this pattern for Stage 2 first-party auth.

### Input

File: `app/api/auth/sign-up/route.ts`

Responsibilities:

- parse `fullName`, `country`, `email`, `password`
- validate them
- hash password with `Argon2id` via `lib/auth/password.ts`
- create verification token via `lib/auth/email-verification.ts`
- call SpacetimeDB reducers to insert user and verification token rows
- send the email with `lib/email/send-verification-email.ts`

This is intentionally split:

- Next.js handles security-sensitive web concerns and email delivery
- SpacetimeDB stores the durable auth rows

### Verification

File: `app/api/auth/verify-email/route.ts`

Responsibilities:

- parse the raw token from the link
- hash it
- load matching token row
- reject missing, expired, or already-consumed tokens
- call reducer to mark the user verified
- call reducer or helper to mark token consumed
- redirect to sign-in or auto-login flow

## Example: Itinerary Mutation In Vacky

Use the same pattern for itinerary features.

- `spacetimedb/src/index.ts`
  - reducers such as `create_trip_location`, `update_trip_location`, `reorder_trip_day`, `delete_trip_location`
- `lib/spacetimedb/server.ts`
  - `getTripForCurrentUserWithLocations`
- `components/itinerary-planner.tsx`
  - submits to a route handler or server action that validates payload shape and calls reducers
- `components/sortable-itinerary.tsx`
  - can remain optimistic in UI, but persisted order still comes from the reducer result

Keep Vacky’s current ownership and date-range validation rules. The backend technology is changing; the user contract should not change accidentally.

## Dos And Don’ts

Do:

- keep reducer logic close to the schema
- keep ownership checks explicit
- keep password hashing outside the database
- keep token/email/cookie handling in Next.js
- use server helpers to centralize reads
- preserve Vacky’s current trip and itinerary semantics unless intentionally changing them

Do not:

- reintroduce ORM-shaped persistence helpers that hide reducer usage
- expose auth-sensitive tables directly
- store plaintext passwords, raw long-lived session tokens, or raw verification tokens
- scatter low-level SpacetimeDB calls across many page components
- rely on SpacetimeDB procedures for core auth correctness while they remain beta

## Verification Checklist

When adding a SpacetimeDB-backed feature in Vacky, verify:

- schema/bindings regenerated successfully
- reducer path works for valid inputs
- invalid input fails cleanly
- unauthorized access fails cleanly
- user ownership is enforced
- `npm run lint` passes
- `npm run build` passes for production-sensitive changes

## Brain Follow-Through

If the feature changes durable project truth, update:

- `brain/wiki/architecture/data-and-auth.md`
- `brain/wiki/log.md`
- `brain/wiki/now.md` when current state changed
- `brain/wiki/risks.md` if new auth/data/verification risks were introduced

Use this guide as the default operating model for SpacetimeDB-native Vacky work.
