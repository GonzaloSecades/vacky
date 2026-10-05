# Vacky Deep Graph Rebuild Audit

Date: 2026-10-02. Graphify: 0.9.73. Mode: deep, undirected, generated wiki enabled. No commit was created.

## Result And Preservation

- Rebuilt from the current working tree, including the pre-existing uncommitted brain edits, GRAPHIFY.md, the October 2 experiment, and exampleImg/fitzRoy.jpeg.
- Corpus: 254 files, approximately 179,946 words: 99 code/data files, 147 documents, 8 images. No sensitive files were flagged by detection. No external provider key or remote extraction backend was used.
- Final graph: 2,061 nodes, 4,802 edges, 140 curated communities, 17 hyperedges. Wiki: 150 articles plus index.md.
- graph.json, GRAPH_REPORT.md, graph.html, manifest.json, labels, analysis, caches and generated wiki were regenerated. Generated wiki pages include complete community membership and extraction status; HTML preserves node status/location and edge evidence.
- SHA-256 readback confirms all 261 tracked or untracked non-output files match the pre-run baseline. Application, maintained brain, skills, workflow docs, existing changes and image assets were not edited. The historical graphify-out/2026-06-11 snapshot is preserved.
- Complete pre-rebuild backup: [backups/vacky-graphify-backup-20261002T134245Z](backups/vacky-graphify-backup-20261002T134245Z). A second copy remains in /private/tmp/vacky-graphify-backup-20261002T134245Z. The backup contains the original outputs/cache and preservation-baseline.json.
- Lint/build were not run: this task changes generated graph artifacts only. No application or runtime behavior was changed or claimed verified.

## Requested Coverage

| Source | Nodes | Manifest | Interpretation |
| --- | ---: | --- | --- |
| brain/outputs/plans/2026-06-12-travel-memory-traveler-profile-epic.md | 15 | present | Accepted design direction, pending Phase 0 decision record; not implemented |
| brain/outputs/plans/2026-06-12-travel-memory-profile-epic-planning-prompt.xml | 6 | present | Proposed phased-planning requirements |
| brain/raw/sessions/2026-06-12-travel-memory-epic-design-session.md | 21 | present | Design evidence, O1/O2/O3, compute-on-read, confidence, overrides, Phase 0 and Phases 1–3 |
| brain/wiki/experiments/2026-10-02-image-storage-and-delivery-optimization.md | 31 | present | Proposed, unimplemented, unbenchmarked image flow |
| GRAPHIFY.md | 5 | present | Command/workflow reference and installation-time graph migration condition |

The June 11 snapshot plan remains represented as superseded. June 12 excludes photos, AI calls, snapshots and graph JSON from v1. October 2 does not change that scope. Explicit source-reference edges connect the experiment to the epic, Trip schema and UploadThing. GRAPHIFY.md connects to the vacky-brain operational skill. Exact node paths and statuses are recorded in verification.json.

## Extraction And Export Corrections

- All 15 semantic chunks passed file coverage, ID, endpoint and confidence checks; no remaining semantic failures. The transient worker-capacity error was retried successfully.
- Stock AST extraction reported no failures but emitted zero nodes for .vscode/settings.json and brain/outputs/google-maps-vacky-focus-cbms-style.json. Deterministic JSON/JSONC structure extraction fills both omissions. Nested locations are honestly null; structural_key_path metadata records their identities.
- Six false AST self-call edges were removed after source inspection: Timestamp.toDate, four generated SpacetimeDB procedure/reducer receiver methods, and console.log had been mistaken for recursion in same-named wrappers. The removed records are retained in extraction-audit.json.
- One duplicate OurFileRouter node from stock AST extraction was consolidated. All 658 semantic IDs with leading/repeated underscores were normalized through Graphify's canonical formatter before cache/build; full repository-relative source stems remain intact. Global ref_* package nodes are intentional shared external references.
- node-id-migration.json records all 613 former nodes: 493 have exact source-and-label matches; 120 have no exact match because sources were removed/excluded or entities were re-extracted differently. This is a fresh canonical-ID rebuild, not a guaranteed one-to-one alias migration. The complete backup preserves the old identities; maintained source links were not rewritten.
- HTML's stock CLI reload reversed some undirected-edge endpoint orders. The final export aligns every arrow, relation, confidence and source location with graph.json; export-parity-repairs.json records the correction count. Proposal/historical statuses were also restored to HTML tooltips and wiki membership tables because stock exports omit them.
- Ten supported text sources omitted by stock detection were explicitly added: both planning XML files, the upstream SpacetimeDB MDC, app/globals.css, .codex/config.toml, .gitignore, .nvmrc, .prettierrc, .prettierignore and the placeholder-only .env.example. The exact list is in corpus.json.

## Verification

- 254/254 corpus files have graph representation and portable relative manifest entries; no missing sources.
- No final dangling endpoints, missing endpoints, self-loops or legacy source-owned IDs. Node IDs satisfy the canonical formatter and full source-path checks; external package IDs are intentionally global.
- Graph, report and wiki index counts agree. Analysis partitions exactly cover graph nodes, with unique curated labels carried into graph.json and HTML.
- HTML node IDs, source/type/community/status/location metadata and edge endpoints/relations/confidence/source evidence agree with graph.json.
- Every generated community article's complete membership matches the analysis partition; tagged proposal/historical statuses are retained. Generated wiki local links resolve; source-document local links have no broken targets in this corpus.
- Three CLI query smoke checks succeeded for the traveler-profile epic, proposed image experiment and GRAPHIFY.md, without legacy-ID warnings. Their 600-token budgets deliberately truncate traversal; broad keyword queries also retrieve vendored reference concepts, so traversal success is not an answer-completeness or relevance guarantee.
- These are structural artifact checks. Browser execution of graph.html was not replayed; it depends on the pinned vis-network asset from unpkg.com. No application browser, provider capability, performance, auth or database behavior is newly verified.
- Detailed checks: [verification.json](verification.json), [graph-health.json](graph-health.json), [extraction-audit.json](extraction-audit.json), [export-parity-repairs.json](export-parity-repairs.json). Full pre-build relationship records remain in [extraction.json](extraction.json).
- Independent read-only Reviewer/QA pass found no additional blockers. It rechecked counts, canonical IDs/endpoints, all 254 manifest sources, HTML parity, all 150 wiki articles and community status tables, requested topic coverage, and all 261 preservation hashes. Readiness remains qualified by the documented limits below.

## Remaining Graph Gaps

- The undirected simple graph collapses parallel/reverse relationships. Diagnostics flag 239 same-endpoint candidate collapses; the 5,043 raw records become 4,802 final edges overall. Repeated citation locations and some distinct relationship variants are therefore not independently traversable in graph.json. extraction.json retains all records. This limitation is visible, not described as a lossless graph.
- Nine raw unresolved references plus ordinary external import references are resolved to external placeholders by the builder. Generated SpacetimeDB bindings, dependencies and build products remain excluded under stock ignore rules; placeholders do not establish those implementation details.
- Old-only sources are .opencode/package.json (no longer present) and brain/.obsidian/app.json (local vault configuration excluded). Application/config files were preserved; these old graph entries were not recycled into the rebuild.
- Future stock CLI rebuild/export alone will not reproduce the supplemental text coverage, JSON fallbacks, HTML orientation repair or status-rich wiki. Preserve corpus.json and the checked raw extraction, and apply equivalent coverage/parity checks when refreshing. Ordinary terminal graphify update . is code-only.
- Vendored security/framework references contribute many concepts and hubs. Their presence does not mean Vacky implements those technologies or requirements. Vendored SDK examples were not revalidated against live upstream APIs in this task.
- Coverage means every selected source is represented, not that every possible relationship was discovered. The report flags 295 symbol nodes with at most one connection (339 nodes across all types) and omits 15 thin communities from its summary; those communities remain in graph.json and the generated wiki.
- Semantic token usage is unavailable from the host-agent tools. Report and cost.json mark it unavailable; legacy numerical totals are retained as historical recorded values and exclude this unmeasured run. Zero placeholders in extraction intermediates are not cost measurements.
- Graphify's token-reduction benchmark reported a 5.0x heuristic reduction using a 103,050-word graph-size proxy, not the detected 179,946-word corpus. This is an estimate, not measured host token usage, query latency or application performance.

## Stale Maintained Claims Left Unchanged

| Location | Gap | Evidence / interpretation |
| --- | --- | --- |
| brain/wiki/decisions/README.md:8; decisions/2026-04-16-local-dev-docker-postgres.md:4 | Docker Postgres/Neon decision still presented as current/implemented | now.md and current runtime use local-only SpacetimeDB; the old decision needs an explicit superseded status |
| brain/wiki/product/direction.md:28,45,49,56; risks.md RISK-010 | Direction and photo-first candidate framing predates June 12 design evidence | Reconcile accepted-direction versus missing Phase 0 record; do not mark the gate closed or the epic shipped |
| brain/outputs/plans/README.md | Index still prefers June 11 snapshot plan | June 12 epic explicitly supersedes it with compute-on-read and no snapshots |
| brain/wiki/product/direction.md:17 | Broad editing/deletion exclusion obscures implemented full-trip deletion | Clarify the narrower shipped behavior; broad trip editing is still separate |
| .agents/skills/vacky-review-workflow/SKILL.md:27; .github/copilot-instructions.md:3,11; .github/instructions/server-data.instructions.md:10 | Active review guidance still prescribes Prisma/NextAuth/Neon and auth() | Current AGENTS and review checklist prescribe first-party sessions and SpacetimeDB publish/codegen |
| brain/Operator/query/implementation-plan-template.md:27,43 | Planning template retains active Prisma checks | Reconcile with current SpacetimeDB workflows |
| brain/wiki/architecture/fullstack-feature-guide.md:218 versus .gitignore:45 | Guide says commit generated bindings, ignore policy excludes them | Choose an intentional versioning policy; extraction did not force-add bindings |
| brain/wiki/now.md:54; brain/wiki/agents/workflow.md:122; GRAPHIFY.md:174 | Installation-time statements still say migration/catch-up is pending | This audit and verification.json supersede that graph freshness condition for this rebuilt snapshot; source wording remains preserved |

Source-backed detail is retained in audit-brain.json, audit-history.json and audit-skills.json. Historical raw evidence was not rewritten. Canonical brain pages were not updated because this task explicitly preserves existing source changes and requests an audit/rebuild rather than promotion of new project truth.

Suggested follow-up: `Run $vacky-brain sync with prompt: "Reconcile the source-backed stale claims in graphify-out/BUILD_AUDIT.md, preserve historical evidence and pending Phase 0/product decisions, update only affected wiki/workflow guidance and log/now, then refresh and verify the full graph corpus."`
