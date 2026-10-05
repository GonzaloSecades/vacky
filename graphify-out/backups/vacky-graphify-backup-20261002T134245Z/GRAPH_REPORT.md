# Graph Report - .  (2026-06-11)

## Corpus Check
- 15 files · ~163,537 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 610 nodes · 1151 edges · 35 communities (27 shown, 8 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 14 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_App Shell & Landing|App Shell & Landing]]
- [[_COMMUNITY_Auth Reducers & Procedures|Auth Reducers & Procedures]]
- [[_COMMUNITY_Theme & Shared UI|Theme & Shared UI]]
- [[_COMMUNITY_Trip Reads & Itinerary Logic|Trip Reads & Itinerary Logic]]
- [[_COMMUNITY_Trip Mutation Actions|Trip Mutation Actions]]
- [[_COMMUNITY_Root Package Manifest|Root Package Manifest]]
- [[_COMMUNITY_System Architecture Concepts|System Architecture Concepts]]
- [[_COMMUNITY_Agent & Skill Layer|Agent & Skill Layer]]
- [[_COMMUNITY_Map Marker Rendering|Map Marker Rendering]]
- [[_COMMUNITY_Place Icons & Metadata|Place Icons & Metadata]]
- [[_COMMUNITY_Root TypeScript Config|Root TypeScript Config]]
- [[_COMMUNITY_Planner Map Utilities|Planner Map Utilities]]
- [[_COMMUNITY_Itinerary Planner State|Itinerary Planner State]]
- [[_COMMUNITY_Itinerary Planner Map|Itinerary Planner Map]]
- [[_COMMUNITY_Local Dev Runtime|Local Dev Runtime]]
- [[_COMMUNITY_Shared Planner Types|Shared Planner Types]]
- [[_COMMUNITY_Trip Creation Upload Flow|Trip Creation Upload Flow]]
- [[_COMMUNITY_SpacetimeDB TSConfig|SpacetimeDB TSConfig]]
- [[_COMMUNITY_Data & Auth Architecture|Data & Auth Architecture]]
- [[_COMMUNITY_SpacetimeDB Package|SpacetimeDB Package]]
- [[_COMMUNITY_SpacetimeDB Mappers & Types|SpacetimeDB Mappers & Types]]
- [[_COMMUNITY_Three Clock Shim|Three Clock Shim]]
- [[_COMMUNITY_Design System Futures|Design System Futures]]
- [[_COMMUNITY_Globe Page|Globe Page]]
- [[_COMMUNITY_Brain Memory Model|Brain Memory Model]]
- [[_COMMUNITY_Globe Client|Globe Client]]
- [[_COMMUNITY_Next Config|Next Config]]
- [[_COMMUNITY_Opencode Plugin|Opencode Plugin]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Source Refresh Script|Source Refresh Script]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]
- [[_COMMUNITY_Three Timer Types|Three Timer Types]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 23 edges
2. `requireSession()` - 19 edges
3. `withSpacetimeDbConnection()` - 19 edges
4. `compilerOptions` - 16 edges
5. `Button()` - 14 edges
6. `LocationPlaceCategory` - 14 edges
7. `getSession()` - 13 edges
8. `getTripDateRange()` - 13 edges
9. `saveItinerary()` - 12 edges
10. `LocationPriceSentiment` - 12 edges

## Surprising Connections (you probably didn't know these)
- `Local SpacetimeDB Commands` --semantically_similar_to--> `Local SpacetimeDB Persistence`  [INFERRED] [semantically similar]
  README.md → AGENTS.md
- `RISK-001 API Trips Reverse Geocoding` --semantically_similar_to--> `Geocoding Latency and Rate Limit Risk`  [INFERRED] [semantically similar]
  brain/wiki/risks.md → futureproblems.md
- `ItineraryPlaceTypeIconProps` --references--> `LocationPlaceCategory`  [EXTRACTED]
  components/itinerary-place-type-icon.tsx → lib/location-metadata.ts
- `UserMenu()` --calls--> `cn()`  [EXTRACTED]
  components/user-menu.tsx → lib/utils.ts
- `June 11 Workflow Rollout Log` --references--> `Vacky Brain Prompt Helper Script`  [EXTRACTED]
  brain/wiki/log.md → .agents/skills/vacky-brain/scripts/vacky_brain_prompt.py

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Graphify Refresh Policy** — agents_vacky_agent_guide, claude_claude_notes, workflows_implementation_checklist_vacky_changes, workflows_review_checklist_qa_passes, workflows_wiki_maintenance_brain_sync, vacky_brain_skill_operational_skill, scripts_vacky_brain_prompt_helper [INFERRED 0.85]
- **Phase 1 Agent Model** — agents_vacky_agent_guide, workflows_task_planning_non_trivial_work, vacky_implementation_workflow_skill_repo_guardrails, vacky_review_workflow_skill_readiness_path, agents_workflow_operating_model, agents_workflow_phase_one_roles [EXTRACTED 1.00]
- **June 11 Workflow Rollout** — wiki_log_june_11_update, wiki_now_current_state, agents_vacky_agent_guide, codex_skills_repo_skill_index, agents_workflow_operating_model, vacky_brain_skill_operational_skill [EXTRACTED 1.00]

## Communities (35 total, 8 thin omitted)

### Community 0 - "App Shell & Landing"
Cohesion: 0.06
Nodes (52): dmSerifDisplay, geistMono, manrope, metadata, RootLayout(), featureBlocks, LandingPage(), createEmailVerificationToken() (+44 more)

### Community 1 - "Auth Reducers & Procedures"
Cohesion: 0.05
Nodes (44): get_session_user_by_token_hash, get_user_auth_by_email, verify_email_token, create_session, create_user_account, revoke_session_by_token_hash, init, insertLocation() (+36 more)

### Community 2 - "Theme & Shared UI"
Cohesion: 0.09
Nodes (40): setTheme(), AuthButton(), AuthButtonProps, CanvasLoader(), CanvasLoaderProps, DeleteConfirmDialog(), DeleteConfirmDialogProps, TripDetailComponent() (+32 more)

### Community 3 - "Trip Reads & Itinerary Logic"
Cohesion: 0.08
Nodes (40): getTripById(), applySameDayOrder(), createItinerary(), ensureCreateRowsHaveSelectedPlaces(), ExistingLocation, isExistingLocationUnchanged(), ItineraryActionState, parseDeletedLocationIds() (+32 more)

### Community 4 - "Trip Mutation Actions"
Cohesion: 0.07
Nodes (34): addLocation(), geoCodeAddress(), createTrip(), deleteTrip(), GeocodeResult, GoogleAddressComponent, GoogleGeocodeResponse, getAllTrips() (+26 more)

### Community 5 - "Root Package Manifest"
Cohesion: 0.04
Nodes (45): dependencies, argon2, class-variance-authority, clsx, @dnd-kit/core, @dnd-kit/sortable, effect, lucide-react (+37 more)

### Community 6 - "System Architecture Concepts"
Cohesion: 0.06
Nodes (40): App-Owned Email Password Auth, Brain Maintenance Workflow, Google Maps and Places Integration, Local SpacetimeDB Persistence, Next.js 16 Bundled Docs, Phase 1 Team Roles, UploadThing Integration, Vacky Next.js App Stack (+32 more)

### Community 7 - "Agent & Skill Layer"
Cohesion: 0.30
Nodes (21): Local-Only SpacetimeDB Branch, Vacky Brain Default Prompt, Vacky Agent Guide, Agent Workflow Wiki, Phase 1 Agent Roles, Claude Notes, Repo-Scoped Skill Strategy, Vacky Skills Index (+13 more)

### Community 8 - "Map Marker Rendering"
Cohesion: 0.16
Nodes (18): applyStyles(), areAdvancedMarkerPropsEqual(), arePlaceTypesEqual(), buildGoogleMapsUrl(), CATEGORY_MARKER_PALETTE, createInfoRow(), createInfoWindowContent(), EMPTY_PLACE_TYPES (+10 more)

### Community 9 - "Place Icons & Metadata"
Cohesion: 0.12
Nodes (18): createMarkerContent(), ItineraryPlaceTypeIcon(), ItineraryPlaceTypeIconProps, MAKI_ICON_PATHS, CATEGORY_ICON_KEY_MAP, getLocationPlaceIconKey(), getPlaceCategoryNotesPlaceholder(), LOCATION_PLACE_CATEGORIES (+10 more)

### Community 10 - "Root TypeScript Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 11 - "Planner Map Utilities"
Cohesion: 0.23
Nodes (13): normalizeOptionalPlaceCategory(), createInitialRows(), ItineraryPlanner(), DEFAULT_CENTER, getLocationMapCategory(), Map(), getGoogleMapsBrowserApiKey(), getGoogleMapsMapId() (+5 more)

### Community 12 - "Itinerary Planner State"
Cohesion: 0.16
Nodes (9): getDisplayCategory(), getMarkerFingerprint(), initialActionState, isCompleteRow(), isExistingLocationUnchanged(), ItineraryPlannerProps, ItineraryPlannerTrip, PlaceSuggestion (+1 more)

### Community 13 - "Itinerary Planner Map"
Cohesion: 0.19
Nodes (9): EMPTY_MAP_CENTER, getInitialMapView(), ItineraryPlannerMapProps, MAP_CONTAINER_STYLE, MAP_OPTIONS, fitMapToPoints(), FitMapToPointsOptions, getMapCenterFromPoints() (+1 more)

### Community 14 - "Local Dev Runtime"
Cohesion: 0.33
Nodes (12): buildEnv(), canAccess(), forwardSignal(), isSpacetimeReady(), log(), main(), managedChildren, resolveSpacetimePath() (+4 more)

### Community 15 - "Shared Planner Types"
Cohesion: 0.31
Nodes (10): ItineraryRow, GoogleMapAdvancedMarkerProps, ItineraryPlannerInitialLocation, ItineraryPlannerMarker, PlannerRow, MapProps, SortableItineraryProps, LocationPlaceCategory (+2 more)

### Community 16 - "Trip Creation Upload Flow"
Cohesion: 0.27
Nodes (5): UploadButton, UploadDropzone, f, OurFileRouter, { GET, POST }

### Community 17 - "SpacetimeDB TSConfig"
Cohesion: 0.22
Nodes (8): compilerOptions, module, moduleResolution, skipLibCheck, strict, target, types, include

### Community 18 - "Data & Auth Architecture"
Cohesion: 0.29
Nodes (8): First Party Auth, Local SpacetimeDB Backend, Ownership Model, SpacetimeDB Tables, Procedures Read Path, Reducers Write Path, Session Cookie Layer, SpacetimeDB Wrapper Layer

### Community 19 - "SpacetimeDB Package"
Cohesion: 0.25
Nodes (7): dependencies, spacetimedb, devDependencies, typescript, name, private, type

### Community 20 - "SpacetimeDB Mappers & Types"
Cohesion: 0.48
Nodes (6): normalizeOptionalPriceSentiment(), isLocationPriceSentiment(), parseStringArrayJson(), toAppLocation(), toAppTrip(), toAppTripWithLocations()

### Community 22 - "Design System Futures"
Cohesion: 0.33
Nodes (6): Decorative Ornament System Future Implementation, Memory Planning Balance, Photography First Storytelling, Twilight Postcards Design System, Ornament Accessibility Constraints, SVG-First Ornament Strategy

### Community 23 - "Globe Page"
Cohesion: 0.40
Nodes (3): GlobeClient, GlobeDimensions, TransformedLocation

### Community 24 - "Brain Memory Model"
Cohesion: 0.67
Nodes (3): Brain Folder Model, Raw Evidence Policy, Source-Backed Memory Rule

## Knowledge Gaps
- **183 isolated node(s):** `refresh_sources.sh script`, `@opencode-ai/plugin`, `f`, `{ GET, POST }`, `TransformedLocation` (+178 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Theme & Shared UI` to `App Shell & Landing`, `Itinerary Planner State`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `Button()` connect `Theme & Shared UI` to `Trip Creation Upload Flow`, `App Shell & Landing`, `Itinerary Planner State`, `Trip Mutation Actions`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `LocationPlaceCategory` connect `Shared Planner Types` to `Trip Reads & Itinerary Logic`, `Map Marker Rendering`, `Place Icons & Metadata`, `Itinerary Planner State`, `Itinerary Planner Map`, `SpacetimeDB Mappers & Types`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **What connects `refresh_sources.sh script`, `@opencode-ai/plugin`, `f` to the rest of the system?**
  _186 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App Shell & Landing` be split into smaller, more focused modules?**
  _Cohesion score 0.05662862159789289 - nodes in this community are weakly interconnected._
- **Should `Auth Reducers & Procedures` be split into smaller, more focused modules?**
  _Cohesion score 0.05446853516657853 - nodes in this community are weakly interconnected._
- **Should `Theme & Shared UI` be split into smaller, more focused modules?**
  _Cohesion score 0.08521303258145363 - nodes in this community are weakly interconnected._