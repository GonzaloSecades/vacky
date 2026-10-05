# Current Fullstack Architecture Guides

> 17 nodes · cohesion 0.26

## Key Concepts

- **brain/wiki/architecture/data-and-auth.md** (52 connections) — `brain/wiki/architecture/data-and-auth.md`
- **brain/wiki/architecture/fullstack-feature-guide.md** (27 connections) — `brain/wiki/architecture/fullstack-feature-guide.md`
- **brain/wiki/architecture/spacetimedb-nextjs-flow.md** (14 connections) — `brain/wiki/architecture/spacetimedb-nextjs-flow.md`
- **Current SpacetimeDB first party auth architecture** (9 connections) — `brain/wiki/architecture/data-and-auth.md`
- **Fullstack data invariant implementation guide** (9 connections) — `brain/wiki/architecture/fullstack-feature-guide.md`
- **Six layer Next.js SpacetimeDB flow** (7 connections) — `brain/wiki/architecture/spacetimedb-nextjs-flow.md`
- **Server and reducer ownership boundary** (4 connections) — `brain/wiki/architecture/data-and-auth.md`
- **App session cookie and email verification flow** (3 connections) — `brain/wiki/architecture/data-and-auth.md`
- **Globe reverse geocoding fanout** (3 connections) — `brain/wiki/architecture/data-and-auth.md`
- **Private tables safe procedure projections** (3 connections) — `brain/wiki/architecture/data-and-auth.md`
- **Delete trip atomic child cleanup example** (3 connections) — `brain/wiki/architecture/fullstack-feature-guide.md`
- **Email verification procedure performs persisted mutations** (3 connections) — `brain/wiki/architecture/spacetimedb-nextjs-flow.md`
- **HTTP session concerns separate from database wrappers** (3 connections) — `brain/wiki/architecture/spacetimedb-nextjs-flow.md`
- **Read before write plus reducer revalidation** (3 connections) — `brain/wiki/architecture/spacetimedb-nextjs-flow.md`
- **Destructive confirmation pending state and link boundaries** (2 connections) — `brain/wiki/architecture/fullstack-feature-guide.md`
- **Generated binding commit instruction** (2 connections) — `brain/wiki/architecture/fullstack-feature-guide.md`
- **Trip deletion excludes UploadThing cleanup** (2 connections) — `brain/wiki/architecture/fullstack-feature-guide.md`

## Relationships

- [Recalibrated History And Checks](Recalibrated_History_And_Checks.md) (7 shared connections)
- [Sessions And Email Verification](Sessions_And_Email_Verification.md) (6 shared connections)
- [Authentication Forms And Cards](Authentication_Forms_And_Cards.md) (4 shared connections)
- [Authenticated Trip Dashboard](Authenticated_Trip_Dashboard.md) (4 shared connections)
- [SpacetimeDB Schema Assembly](SpacetimeDB_Schema_Assembly.md) (4 shared connections)
- [Brain Evidence Indexes](Brain_Evidence_Indexes.md) (3 shared connections)
- [Migration Readiness Evidence](Migration_Readiness_Evidence.md) (3 shared connections)
- [Itinerary Routes And Planning](Itinerary_Routes_And_Planning.md) (3 shared connections)
- [Workflow And Historical Templates](Workflow_And_Historical_Templates.md) (3 shared connections)
- [Local SpacetimeDB Connection Boundary](Local_SpacetimeDB_Connection_Boundary.md) (3 shared connections)
- [Server Trip Data Helpers](Server_Trip_Data_Helpers.md) (3 shared connections)
- [Password Login And Auth Migration](Password_Login_And_Auth_Migration.md) (2 shared connections)

## Source Files

- `brain/wiki/architecture/data-and-auth.md`
- `brain/wiki/architecture/fullstack-feature-guide.md`
- `brain/wiki/architecture/spacetimedb-nextjs-flow.md`

## Audit Trail

- EXTRACTED: 108 (95%)
- INFERRED: 6 (5%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
## Verified Node Membership

Generated source inventory, including historical evidence and proposals. Status is preserved from extraction; it is not an implementation or runtime verification claim. See `../BUILD_AUDIT.md` for unresolved source contradictions.

| Node ID | Concept | Source | Status |
| --- | --- | --- | --- |
| `brain_wiki_architecture_data_and_auth` | brain/wiki/architecture/data-and-auth.md | `brain/wiki/architecture/data-and-auth.md` | not_tagged |
| `brain_wiki_architecture_data_and_auth_app_session_cookie_and_email_verification_flow` | App session cookie and email verification flow | `brain/wiki/architecture/data-and-auth.md` | current_architecture |
| `brain_wiki_architecture_data_and_auth_current_spacetimedb_first_party_auth_architecture` | Current SpacetimeDB first party auth architecture | `brain/wiki/architecture/data-and-auth.md` | current |
| `brain_wiki_architecture_data_and_auth_globe_reverse_geocoding_fanout` | Globe reverse geocoding fanout | `brain/wiki/architecture/data-and-auth.md` | open_risk |
| `brain_wiki_architecture_data_and_auth_private_tables_safe_procedure_projections` | Private tables safe procedure projections | `brain/wiki/architecture/data-and-auth.md` | current_architecture |
| `brain_wiki_architecture_data_and_auth_server_and_reducer_ownership_boundary` | Server and reducer ownership boundary | `brain/wiki/architecture/data-and-auth.md` | current_architecture |
| `brain_wiki_architecture_fullstack_feature_guide` | brain/wiki/architecture/fullstack-feature-guide.md | `brain/wiki/architecture/fullstack-feature-guide.md` | not_tagged |
| `brain_wiki_architecture_fullstack_feature_guide_delete_trip_atomic_child_cleanup_example` | Delete trip atomic child cleanup example | `brain/wiki/architecture/fullstack-feature-guide.md` | documentation_example |
| `brain_wiki_architecture_fullstack_feature_guide_destructive_confirmation_pending_state_and_link_boundaries` | Destructive confirmation pending state and link boundaries | `brain/wiki/architecture/fullstack-feature-guide.md` | guidance |
| `brain_wiki_architecture_fullstack_feature_guide_fullstack_data_invariant_implementation_guide` | Fullstack data invariant implementation guide | `brain/wiki/architecture/fullstack-feature-guide.md` | current_guide_mixed_historical_examples |
| `brain_wiki_architecture_fullstack_feature_guide_generated_binding_commit_instruction` | Generated binding commit instruction | `brain/wiki/architecture/fullstack-feature-guide.md` | potential_instruction_conflict |
| `brain_wiki_architecture_fullstack_feature_guide_trip_deletion_excludes_uploadthing_cleanup` | Trip deletion excludes UploadThing cleanup | `brain/wiki/architecture/fullstack-feature-guide.md` | documented_tradeoff |
| `brain_wiki_architecture_spacetimedb_nextjs_flow` | brain/wiki/architecture/spacetimedb-nextjs-flow.md | `brain/wiki/architecture/spacetimedb-nextjs-flow.md` | not_tagged |
| `brain_wiki_architecture_spacetimedb_nextjs_flow_email_verification_procedure_performs_persisted_mutations` | Email verification procedure performs persisted mutations | `brain/wiki/architecture/spacetimedb-nextjs-flow.md` | documented_write_exception |
| `brain_wiki_architecture_spacetimedb_nextjs_flow_http_session_concerns_separate_from_database_wrappers` | HTTP session concerns separate from database wrappers | `brain/wiki/architecture/spacetimedb-nextjs-flow.md` | not_tagged |
| `brain_wiki_architecture_spacetimedb_nextjs_flow_read_before_write_plus_reducer_revalidation` | Read before write plus reducer revalidation | `brain/wiki/architecture/spacetimedb-nextjs-flow.md` | not_tagged |
| `brain_wiki_architecture_spacetimedb_nextjs_flow_six_layer_next_js_spacetimedb_flow` | Six layer Next.js SpacetimeDB flow | `brain/wiki/architecture/spacetimedb-nextjs-flow.md` | current |
