# SpacetimeDB Deployment And Identity References

> 8 nodes · cohesion 0.25

## Key Concepts

- **SpacetimeDB** (16 connections) — `.agents/skills/spacetimedb-typescript-vacky/references/upstream/llms.txt`
- **Vendored client example stores auth tokens in localStorage** (3 connections) — `.agents/skills/spacetimedb-typescript-vacky/references/upstream/llms.txt`
- **Standalone, Maincloud, and Enterprise deployment variants** (3 connections) — `.agents/skills/spacetimedb-typescript-vacky/references/upstream/llms.txt`
- **Vendored LLM examples use direct table.filter callbacks** (3 connections) — `.agents/skills/spacetimedb-typescript-vacky/references/upstream/llms.txt`
- **OIDC issuer/subject pair derives a SpacetimeDB Identity** (3 connections) — `.agents/skills/spacetimedb-typescript-vacky/references/upstream/llms.txt`
- **Vendored LLM view examples omit explicit return-type arguments** (3 connections) — `.agents/skills/spacetimedb-typescript-vacky/references/upstream/llms.txt`
- **Basic Project Workflow** (2 connections) — `.agents/skills/spacetimedb-typescript-vacky/references/upstream/llms.txt`
- **In-memory tables persist through a Commitlog write-ahead log** (2 connections) — `.agents/skills/spacetimedb-typescript-vacky/references/upstream/llms.txt`

## Relationships

- [SpacetimeDB Client SDK References](SpacetimeDB_Client_SDK_References.md) (8 shared connections)
- [Historical Migration Context](Historical_Migration_Context.md) (2 shared connections)
- [SpacetimeDB TypeScript Rules](SpacetimeDB_TypeScript_Rules.md) (2 shared connections)
- [Subscription Cache Semantics Reference](Subscription_Cache_Semantics_Reference.md) (2 shared connections)
- [Browser JavaScript Security References](Browser_JavaScript_Security_References.md) (1 shared connections)
- [Index Access Reference Conflicts](Index_Access_Reference_Conflicts.md) (1 shared connections)
- [SpacetimeDB TypeScript Module Reference](SpacetimeDB_TypeScript_Module_Reference.md) (1 shared connections)
- [Reducer Syntax Reference Conflicts](Reducer_Syntax_Reference_Conflicts.md) (1 shared connections)
- [Upstream Documentation Directory](Upstream_Documentation_Directory.md) (1 shared connections)
- [Vacky SpacetimeDB Integration Skill](Vacky_SpacetimeDB_Integration_Skill.md) (1 shared connections)
- [SpacetimeDB Official Source Index](SpacetimeDB_Official_Source_Index.md) (1 shared connections)

## Source Files

- `.agents/skills/spacetimedb-typescript-vacky/references/upstream/llms.txt`

## Audit Trail

- EXTRACTED: 22 (79%)
- INFERRED: 4 (14%)
- AMBIGUOUS: 2 (7%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
## Verified Node Membership

Generated source inventory, including historical evidence and proposals. Status is preserved from extraction; it is not an implementation or runtime verification claim. See `../BUILD_AUDIT.md` for unresolved source contradictions.

| Node ID | Concept | Source | Status |
| --- | --- | --- | --- |
| `agents_skills_spacetimedb_typescript_vacky_references_upstream_llms_basic_project_workflow` | Basic Project Workflow | `.agents/skills/spacetimedb-typescript-vacky/references/upstream/llms.txt` | vendored_upstream_reference |
| `agents_skills_spacetimedb_typescript_vacky_references_upstream_llms_browser_localstorage_auth_token_example` | Vendored client example stores auth tokens in localStorage | `.agents/skills/spacetimedb-typescript-vacky/references/upstream/llms.txt` | vendored_example_not_vacky_auth_architecture |
| `agents_skills_spacetimedb_typescript_vacky_references_upstream_llms_commitlog_persistence` | In-memory tables persist through a Commitlog write-ahead log | `.agents/skills/spacetimedb-typescript-vacky/references/upstream/llms.txt` | vendored_upstream_reference |
| `agents_skills_spacetimedb_typescript_vacky_references_upstream_llms_deployment_product_variants` | Standalone, Maincloud, and Enterprise deployment variants | `.agents/skills/spacetimedb-typescript-vacky/references/upstream/llms.txt` | vendored_upstream_reference |
| `agents_skills_spacetimedb_typescript_vacky_references_upstream_llms_direct_table_filter_example_inconsistent` | Vendored LLM examples use direct table.filter callbacks | `.agents/skills/spacetimedb-typescript-vacky/references/upstream/llms.txt` | vendored_example_conflicts_with_mandatory_mdc |
| `agents_skills_spacetimedb_typescript_vacky_references_upstream_llms_document` | SpacetimeDB | `.agents/skills/spacetimedb-typescript-vacky/references/upstream/llms.txt` | vendored_upstream_reference |
| `agents_skills_spacetimedb_typescript_vacky_references_upstream_llms_oidc_identity_derivation` | OIDC issuer/subject pair derives a SpacetimeDB Identity | `.agents/skills/spacetimedb-typescript-vacky/references/upstream/llms.txt` | vendored_upstream_reference |
| `agents_skills_spacetimedb_typescript_vacky_references_upstream_llms_two_argument_view_example_inconsistent` | Vendored LLM view examples omit explicit return-type arguments | `.agents/skills/spacetimedb-typescript-vacky/references/upstream/llms.txt` | vendored_example_conflicts_with_mandatory_mdc |
