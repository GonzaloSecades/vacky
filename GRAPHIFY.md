# Graphify Commands And Vacky Maintenance

Updated: 2026-10-02

Upstream: [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify). Command reference targets `graphifyy` 0.9.73. Reviewed upstream source revision: `ef4450d9c28acb2b8cdc22d369c1777b77148eef`. Recheck help after upgrading; these commands are version-specific.

## Installation And Scope

Graphify is a Python tool, separate from Vacky's npm dependencies and Node 22 runtime. Its distribution name is `graphifyy`; its executable is `graphify`.

The Codex skill is installed globally at `~/.codex/skills/graphify/SKILL.md`, including the packaged reference files. It becomes available to Codex on the next turn. It does not require replacing Vacky's repo-local skills.

Reproducible installation with uv:

```bash
uv tool install --python 3.12 graphifyy==0.9.73
graphify install --platform codex
graphify --version
graphify --help
```

If `uv` is not on PATH, the uv installation used on this machine is `/Users/gonzalosecades/Library/Python/3.9/bin/uv`. Graphify's tool executable is `~/.local/bin/graphify`; add that directory to your shell PATH if needed. The isolated tool uses Python 3.12, not the system Python 3.9.

This setup installs the skill and CLI. Project integration (`graphify codex install`), Git hooks, watchers, provider configuration, optional dependencies, and graph rebuilding are separate actions.

## Assistant Commands Versus Terminal Commands

Run commands from the Vacky root:

```bash
cd /Users/gonzalosecades/Projects/vacky
```

`$graphify` is a Codex skill invocation, not a shell executable or shell variable. Upstream documents `/graphify` for assistants with slash-command interfaces. Use `$graphify` in Codex and `graphify` in the terminal.

| Context | Command | Effect |
| --- | --- | --- |
| Codex | `$graphify .` | Full assistant pipeline for code and supported project content |
| Codex | `$graphify . --update` | Incremental assistant pipeline for changed code and semantic content |
| Terminal | `graphify update .` | Local code refresh; does not perform the full docs/media semantic pass |
| Terminal | `graphify extract .` | Headless code + semantic extraction using a configured backend |
| Terminal | `graphify extract . --code-only` | Local AST extraction only; not complete brain coverage |
| Terminal | `graphify query "How does itinerary persistence work?"` | Traverse an existing graph; no extraction |

Treat `graphify update .` as a quick code-maintenance tool. For Vacky, where `brain/` and workflow documentation matter, `$graphify . --update` is the routine complete refresh.

## Common Commands

### Build And Maintain

```text
# In Codex
$graphify .
$graphify . --update
$graphify . --directed --update
$graphify . --mode deep --wiki
$graphify . --cluster-only
$graphify . --no-viz

# In a terminal
graphify update .
graphify extract . --code-only
graphify extract . --backend openai --model <model>
graphify extract . --backend ollama --model <model> --max-concurrency 1
graphify cluster-only . --no-label
graphify label . --missing-only
graphify check-update .
```

The backend examples require backend-specific extras/configuration. Do not use shell angle-bracket placeholders literally. `cluster-only` changes grouping/reporting rather than refreshing source extraction. `label` may call an LLM; `--no-label` avoids LLM naming when clustering. Preserve directed mode across updates if the graph was intentionally built directed.

### Explore Before Editing

```bash
graphify query "How do sessions authorize trip and itinerary writes?" --budget 2000
graphify query "What connects UploadThing to trip covers?" --dfs --budget 1500
graphify explain "withSpacetimeDbConnection()"
graphify path "requireSession()" "saveItinerary()"
graphify affected "saveItinerary()" --depth 2
graphify god-nodes --top 15
graphify diagnose multigraph --json
```

Use exact labels from the current graph for `explain`, `path`, and `affected`; labels may differ after extraction. Queries return graph context, not verified implementation conclusions. Inspect the linked source locations before making changes or asserting current behavior.

### Outputs And Exports

```bash
graphify export html
graphify export wiki
graphify export callflow-html --lang en
graphify tree --label Vacky
graphify export graphml
graphify benchmark graphify-out/graph.json
```

Primary outputs are `graphify-out/graph.json`, `GRAPH_REPORT.md`, and `graph.html`. Depending on the workflow, manifest/cache/cost files support incremental extraction. Generated wiki exports belong under generated output, not in `brain/wiki/` as accepted truth. Obsidian export is optional; do not write generated notes into the maintained brain vault or commit local workspace/graph state.

## Complete Command Inventory

The captured CLI help later in this document lists public commands and their advertised flags. Additional implementation-level entry points are listed separately below because top-level help does not advertise them all.

| Command family | Available commands |
| --- | --- |
| Help/version | `graphify --help`, `graphify -h`, `graphify --version`, `graphify -v`, `graphify version` |
| Skill lifecycle | `install`, `uninstall`; install supports `--platform`, `--project`, `--strict`; uninstall supports `--platform`, `--project`, `--purge` |
| Extraction/maintenance | `extract`, `update`, `watch`, `cluster-only`, `label`, `check-update` |
| Navigation | `query`, `path`, `explain`, `affected`, `god-nodes` (alias `god_nodes`) |
| Diagnostics | `diagnose multigraph`, `benchmark` |
| Feedback | `save-result`, `reflect` |
| External content/repos | `add`, `clone`, `merge-graphs`, `merge-driver` |
| Provider configuration | `provider list`, `provider show <name>`, `provider add <name> --base-url <url> --default-model <model> --env-key <environment-variable-name>`, `provider remove <name>` |
| Cross-project graph | `global add <graph.json> --as <tag>`, `global remove <tag>`, `global list`, `global path` |
| Exports | `export html`, `export callflow-html`, `export obsidian`, `export wiki`, `export svg`, `export graphml`, `export neo4j`, `export falkordb`, `tree` |
| Git/PR support | `hook install`, `hook uninstall`, `hook status`, `prs` |
| Project integrations | `codex`, `claude`, `codebuddy`, `gemini`, `cursor`, `opencode`, `kilo`, `aider`, `amp`, `agents` (alias `skills`), `copilot`, `vscode`, `claw`, `droid`, `trae`, `trae-cn`, `antigravity`, `hermes`, `kiro`, `pi`, `devin`: each exposes install/uninstall flows |
| MCP executable | `graphify-mcp --help`; requires the `mcp` extra; separate from the main CLI |

Additional internal pipeline commands, verified against upstream CLI dispatch:

```text
graphify hook-check
graphify hook-guard read [--strict]
graphify cache-check <files_from> [--root <dir>] [--mode <mode> | --deep] [--prompt-file <path>]
graphify merge-chunks <chunk_files...> --out <path>
graphify merge-semantic --cached <path> --new <path> --out <path>
```

These are plumbing for assistant extraction/hooks, not the normal Vacky maintenance entry points. The CLI also accepts a path as a convenience dispatch; use explicit `extract` or the assistant pipeline to make intended extraction scope clear.

Other parser-supported flags not included in the top-level help snapshot: `extract --no-dedup`, `extract --timing`, `extract --allow-partial`, and `cluster-only --timing`. Use `--allow-partial` only when deliberately accepting incomplete extraction; it can allow replacement of a more complete existing graph. `--no-dedup` disables extraction deduplication. `--timing` reports stage timing.

The separate MCP executable accepts a positional graph path or `--graph`, `--transport stdio|http`, `--host`, `--port`, `--api-key`, `--path`, `--json-response`, `--stateless`, and `--session-timeout`. These are optional server features, not configured for Vacky by this install.

## Optional Features And Dependencies

Base installation supports the core CLI and local code extraction. Features with extra dependencies are not necessarily usable just because they appear in help.

| Feature | Distribution extra |
| --- | --- |
| File watching | `watch` |
| MCP server | `mcp` |
| PDF extraction | `pdf` |
| SVG export | `svg` |
| Office files | `office` |
| LLM backend | `openai`, `ollama`, `anthropic`, `gemini`, `kimi`, or `bedrock`, as appropriate |
| Graph database push | `neo4j` or `falkordb` |
| Additional community detection implementation | `leiden` |

Example when intentionally adding watching:

```bash
uv tool install --reinstall --python 3.12 'graphifyy[watch]==0.9.73'
graphify watch .
```

Install the combined extras you need in one package specification when replacing the tool environment; reinstalling with a narrower list can remove extras. Do not install `all` by default. Keep API keys in environment/provider configuration, never in this guide or graph output. Watchers refresh code and flag semantic work; they are not a substitute for the assistant's brain refresh.

## Recommended Vacky Maintenance Workflow

1. **Inspect checkout and freshness before work.** Run `git status --short --branch` and `graphify --version`. Compare graph provenance/manifest and source changes; read `brain/wiki/now.md` and `brain/wiki/risks.md`. A build date alone does not establish freshness. `check-update` inspects pending semantic flags; a quiet result alone does not prove all sources were indexed.
2. **Navigate the existing graph.** Query the relevant area, inspect exact labels, and trace paths/affected nodes. Verify results in source and relevant brain pages. Respect `EXTRACTED` versus `INFERRED` evidence and identify contradictions.
3. **Implement under Vacky guardrails.** Use repo skills, the bundled Next.js docs, and appropriate backend/frontend/reviewer slices. Graphify does not replace auth checks, local SpacetimeDB publish/codegen, lint/build, or manual verification.
4. **Sync the brain on the same feature branch.** Classify impact. Update affected wiki pages and append the log; update `now.md` when current state changes. Preserve experiment/proposal status until accepted. Use `Run $vacky-brain sync with prompt: "Sync the affected wiki pages for this branch, record verification, and check graph freshness."`
5. **Refresh after code and documentation are settled.** In Codex, run `$graphify . --update`. Use `graphify update .` only for an interim code refresh and explicitly retain pending semantic work. Run one writer per graph output; avoid simultaneous watch, extraction, and assistant rebuilds.
6. **Validate coverage and outputs.** Check expected changed/new/deleted source coverage, semantic failures, pending flags, and cost records. Query representative affected concepts. Confirm graph/report/HTML describe the same final run. A successful CLI exit or increased node count is not proof of complete documentation coverage.
7. **Review generated changes before PR.** Inspect `git diff --stat`, `git diff --check`, and graph/report/manifest changes. Investigate unexpected shrinkage or huge generated churn. Keep secrets, local absolute-path/runtime markers, duplicate historical snapshots, and editor state out of the intended diff. Preserve useful checked-in graph artifacts according to repo practice.
8. **Refresh again after material review edits.** Sync durable brain changes first, then rerun the incremental graph workflow. Document failures/partial coverage rather than marking the graph fully current.
9. **After merge, do a lightweight drift check.** Compare final merged source, wiki, and graph. Run `Run $vacky-brain post-merge with prompt: "Check the final merged branch against the wiki and graph provenance; repair actual drift only."` A second brain/graph PR is a repair path, not routine duplicate work.
10. **Periodically audit knowledge structure.** Run brain lint to catch stale decisions and weak provenance. Use `$graphify . --mode deep --wiki` when architecture/knowledge structure materially changes or incremental coverage cannot explain the current structure. Deep extraction can consume more model tokens; avoid rebuilding on every small edit.

## Initial Catch-Up For This Checkout

At the preceding inspection, recorded graph generation was from June 11, 2026. The root graph included the superseded June 11 memory plan but missed the June 12 travel-memory/profile epic. Its report and graph counts also differed. The new October 2 image optimization experiment and this guide add further sources needing extraction.

Installation verification on 2026-10-02 confirmed `graphify 0.9.73`, the global Codex skill and eight reference files, and a successful query for `withSpacetimeDbConnection`. The CLI additionally reports that this graph uses the pre-#1504 node-ID scheme, which can have same-name-file collisions.

For this old-format graph, schedule a controlled full assistant build (`$graphify .`) after preserving the existing generated artifacts through the normal Git diff/review process, and verify the new path-qualified IDs and complete brain coverage. The CLI's corresponding migration advice is `graphify extract . --force`, which requires a configured semantic backend to include docs; code-only extraction does not close the brain gap. After migration, return to `$graphify . --update` for routine maintenance. Query the newer epic, image experiment, and workflow guide after the rebuild.

This installation task does not refresh or migrate the graph. Reconcile the wiki's memory-first acceptance wording using brain lint rather than automatically promoting an output plan.

## Recovery And Optional Automation

- If `graphify` is not found, use `~/.local/bin/graphify` and repair PATH. If the tool environment is broken, reinstall the pinned package before updating the skill.
- If no graph exists, run `$graphify .`; query cannot establish coverage without a graph.
- If docs were skipped or semantic extraction failed, rerun the semantic assistant pipeline and report the gap. Code-only updates are partial project coverage.
- `--force` can bypass shrink safeguards or trigger full extraction. Inspect why counts fell and preserve useful prior artifacts before deliberately using it; fewer nodes may reflect valid deletions, but not every shrink is legitimate.
- `graphify hook install` changes Git hooks/merge integration. `graphify codex install` changes project instructions and Codex hook wiring. Neither is needed for basic skill usage or enabled by this setup.
- `graphify uninstall --purge` can delete graph output. It is a destructive cleanup operation, not an update command.
- Re-read local help and the installed skill/reference files after upgrades. Refresh this document's version/help snapshot alongside any deliberate tool upgrade.

## Reference Sources

- [Upstream repository](https://github.com/Graphify-Labs/graphify)
- [Codex skill](https://github.com/Graphify-Labs/graphify/blob/ef4450d9c28acb2b8cdc22d369c1777b77148eef/graphify/skill-codex.md)
- [CLI help source](https://github.com/Graphify-Labs/graphify/blob/ef4450d9c28acb2b8cdc22d369c1777b77148eef/graphify/__main__.py)
- [CLI dispatch](https://github.com/Graphify-Labs/graphify/blob/ef4450d9c28acb2b8cdc22d369c1777b77148eef/graphify/cli.py)
- [Vacky brain skill](.agents/skills/vacky-brain/SKILL.md)
- [Wiki maintenance](.codex/workflows/wiki-maintenance.md)
- [Agent workflow](brain/wiki/agents/workflow.md)

## Captured CLI Help

Captured from the installed package on 2026-10-02. Run local help again after any upgrade.

### Terminal help

```text
Usage: graphify <command>

Commands:
  install [--platform P]  copy skill to platform config dir (claude|windows|codebuddy|codex|opencode|aider|amp|agents|claw|droid|trae|trae-cn|gemini|cursor|antigravity|hermes|kiro|pi|devin)
  uninstall               remove graphify from all detected platforms in one shot
    --purge                 also delete graphify-out/ directory
  path "A" "B"            shortest path between two nodes in graph.json
    --graph <path>          path to graph.json (default graphify-out/graph.json)
  explain "X"             plain-language explanation of a node and its neighbors
    --graph <path>          path to graph.json (default graphify-out/graph.json)
  diagnose multigraph    report same-endpoint edge collapse risk in graph.json
    --graph <path>          path to graph/extraction JSON
                            (default graphify-out/graph.json)
    --json                  emit machine-readable JSON
    --max-examples N        max same-endpoint examples to print (default 5)
    --directed              force directed post-build simulation
    --undirected            force undirected post-build simulation
                            (default follows JSON directed flag;
                             raw extraction with no flag defaults directed)
    --extract-path PATH     extractor source for suppression scan
  clone <github-url>      clone a GitHub repo locally and print its path for /graphify
  merge-driver <base> <current> <other>  git merge driver: union-merge two graph.json files (set up via hook install)
  merge-graphs <g1> <g2>  merge two or more graph.json files into one cross-repo graph
    --out <path>            output path (default: graphify-out/merged-graph.json)
    --branch <branch>       checkout a specific branch (default: repo default)
    --out <dir>             clone to a custom directory (default: ~/.graphify/repos/<owner>/<repo>)
  add <url>               fetch a URL and save it to ./raw, then update the graph
    --author "Name"         tag the author of the content
    --contributor "Name"    tag who added it to the corpus
    --dir <path>            target directory (default: ./raw)
  watch <path>            watch a folder and rebuild the graph on code changes
  update <path>           re-extract code files and update the graph (no LLM needed)
    --force                 overwrite graph.json even if the rebuild has fewer nodes
                            (also: GRAPHIFY_FORCE=1 env var; use after refactors that delete code)
    --no-cluster            skip clustering, write raw extraction only
  cluster-only <path>     rerun clustering on an existing graph.json and regenerate report
    --no-viz                skip graph.html generation (useful for >5000 node graphs / CI)
    --graph <path>          path to graph.json (default <path>/graphify-out/graph.json)
    --no-label              keep 'Community N' placeholders (skip LLM community naming)
    --backend=<name>        backend to use for community naming (default: auto-detect)
    --model=<name>          model to use for community naming
    --max-concurrency=N     parallel community-labeling LLM calls (default 4; forced to 1 for ollama/claude-cli)
    --batch-size=N          communities per labeling LLM call (default 100)
  label <path>            (re)name communities with the configured LLM backend, regenerate report
    --missing-only         keep existing labels and only name missing/placeholder communities
    --backend=<name>        backend to use (default: auto-detect from API keys)
    --model=<name>          model to use for community naming
    --max-concurrency=N     parallel labeling LLM calls (default 4; forced to 1 for ollama/claude-cli)
    --batch-size=N          communities per labeling LLM call (default 100)
  query "<question>"       BFS traversal of graph.json for a question
    --dfs                   use depth-first instead of breadth-first
    --context C             explicit edge-context filter (repeatable)
    --budget N              cap output at N tokens (default 2000)
    --graph <path>          path to graph.json (default graphify-out/graph.json)
  affected "X"             reverse traversal to find nodes impacted by X
    --relation R            edge relation to traverse in reverse (repeatable)
    --depth N               reverse traversal depth (default 2)
    --graph <path>          path to graph.json (default graphify-out/graph.json)
  god-nodes               list the most connected nodes (architectural hubs)
    --top N                 how many to show (default 10)
    --graph <path>          path to graph.json (default graphify-out/graph.json)
    --json                  emit JSON instead of text
  prs                     PR dashboard: CI state, review status, worktree mapping
  save-result             save a Q&A result to graphify-out/memory/ for graph feedback loop
    --question Q            the question asked
    --answer A              the answer to save
    --type T                query type: query|path_query|explain (default: query)
    --nodes N1 N2 ...       source node labels cited in the answer
    --outcome O             work-memory signal: useful|dead_end|corrected
    --correction TEXT       what the right answer was (pairs with --outcome corrected)
    --memory-dir DIR        memory directory (default: graphify-out/memory)
  reflect                 aggregate graphify-out/memory/ outcomes into a deterministic lessons doc
    --memory-dir DIR        memory directory (default: graphify-out/memory)
    --out FILE              output path (default: graphify-out/reflections/LESSONS.md)
    --graph PATH            graph.json, for community grouping + dropping stale nodes (optional)
    --analysis PATH         .graphify_analysis.json (optional, auto-detected next to --graph)
    --labels PATH           .graphify_labels.json (optional, auto-detected next to --graph)
    --half-life-days N      signal weight halves every N days (default 30)
    --min-corroboration N   distinct useful results to prefer a node (default 2)
  check-update <path>     check needs_update flag and notify if semantic re-extraction is pending (cron-safe)
  tree                    emit a D3 v7 collapsible-tree HTML for graph.json
    --graph PATH            path to graph.json (default graphify-out/graph.json)
    --output HTML           output path (default graphify-out/GRAPH_TREE.html)
    --root PATH             filesystem root for the hierarchy
    --max-children N        cap children per node (default 200)
    --top-k-edges N         per-symbol outbound edges in inspector (default 12)
    --label NAME            project label in header
  extract <path>          headless full extraction (AST + semantic LLM) for CI/scripts
    --backend B             gemini|kimi|claude|openai|deepseek|ollama (default: whichever API key is set)
                            openai also reaches self-hosted OpenAI-compatible servers (llama.cpp,
                            vLLM, LM Studio): set OPENAI_BASE_URL (e.g. http://localhost:8080/v1)
                            and OPENAI_MODEL to the model name your server serves
                            claude also reaches custom Anthropic-compatible endpoints (LiteLLM
                            proxy, gateways): set ANTHROPIC_BASE_URL and ANTHROPIC_MODEL
    --model M               override backend default model
    --mode deep             aggressive INFERRED-edge semantic extraction
    --force                 full re-scan and re-dispatch: skip the incremental
                            manifest gate and semantic cache reads (env: GRAPHIFY_FORCE=1)
    --max-workers N         AST extraction subprocess count (default: cpu_count)
    --token-budget N        per-chunk token cap for semantic extraction (default: 60000)
    --max-concurrency N     parallel semantic chunks in flight (default: 4; set 1 for local LLMs)
    --api-timeout S         per-request timeout in seconds for the LLM client (default: 600)
    --out DIR, --output DIR output dir (default: <path>); writes <DIR>/graphify-out/
    --google-workspace      export .gdoc/.gsheet/.gslides shortcuts via gws before extraction
    --no-gitignore         ignore .gitignore and .git/info/exclude (prioritizes .graphifyignore)
    --no-cluster            skip clustering, write raw extraction only
    --code-only             index code (local AST, no API key) and skip doc/paper/image files
    --postgres DSN          extract schema from a live PostgreSQL database
                            maps tables, views, functions + FK relationships;
                            column-level detail is not represented in the graph
    --cargo                 extract crate→crate deps from Cargo.toml
    --global                also merge the resulting graph into the global graph
    --as <tag>              repo tag for --global (default: target directory name)
  provider [list|show|add|remove]  manage custom LLM providers
  global add <graph.json>  add/update a project graph in the global graph (~/.graphify/global-graph.json)
    --as <tag>               repo tag (default: parent directory name)
  global remove <tag>      remove a repo's nodes from the global graph
  global list              list repos in the global graph
  global path              print path to the global graph file
  benchmark [graph.json]  measure token reduction vs naive full-corpus approach
  export html             emit interactive graph.html [--graph PATH] [--labels PATH] [--node-limit N] [--no-viz]
  export callflow-html    emit Mermaid-based architecture/call-flow HTML
                          [GRAPH|DIR] [--graph PATH] [--labels PATH] [--report PATH] [--sections PATH] [--output HTML]
                          [--lang auto|zh-CN|en] [--max-sections N] [--diagram-scale N]
  export obsidian         emit Obsidian vault notes + canvas [--graph PATH] [--labels PATH] [--dir PATH]
  export wiki             emit wiki markdown articles [--graph PATH] [--labels PATH]
  export svg              emit graph.svg [--graph PATH] [--labels PATH]
  export graphml          emit GraphML [--graph PATH]
  export neo4j            emit Cypher or push to Neo4j [--graph PATH] [--push URI] [--user U] [--password P]
                          (or set NEO4J_PASSWORD instead of --password to keep it off argv)
  export falkordb         emit Cypher or push to FalkorDB [--graph PATH] [--push URI] [--user U] [--password P]
                          (or set FALKORDB_PASSWORD instead of --password to keep it off argv)
  hook install            install post-commit/post-checkout git hooks (all platforms)
  hook uninstall          remove git hooks
  hook status             check if git hooks are installed
  gemini install          write GEMINI.md section + BeforeTool hook (Gemini CLI)
  gemini uninstall        remove GEMINI.md section + BeforeTool hook
  cursor install          write .cursor/rules/graphify.mdc (Cursor)
  cursor uninstall        remove .cursor/rules/graphify.mdc
  claude install          write graphify section to CLAUDE.md + PreToolUse hook (Claude Code)
  claude uninstall        remove graphify section from CLAUDE.md + PreToolUse hook
  codebuddy install       write graphify section to CODEBUDDY.md + PreToolUse hook (CodeBuddy)
  codebuddy uninstall     remove graphify section from CODEBUDDY.md + PreToolUse hook
  codex install           write graphify section to AGENTS.md (Codex)
  codex uninstall         remove graphify section from AGENTS.md
  opencode install        write graphify section to AGENTS.md + tool.execute.before plugin (OpenCode)
  opencode uninstall      remove graphify section from AGENTS.md + plugin
  kilo install            install native Kilo skill + command + AGENTS.md + .kilo plugin
  kilo uninstall          remove native Kilo skill + command + AGENTS.md + .kilo plugin
  aider install           write graphify section to AGENTS.md (Aider)
  aider uninstall         remove graphify section from AGENTS.md
  copilot install         copy graphify skill to ~/.copilot/skills (GitHub Copilot CLI)
  copilot uninstall       remove graphify skill from ~/.copilot/skills
  vscode install          configure VS Code Copilot Chat (skill + .github/copilot-instructions.md)
  vscode uninstall        remove VS Code Copilot Chat configuration
  claw install            write graphify section to AGENTS.md (OpenClaw)
  claw uninstall          remove graphify section from AGENTS.md
  droid install           write graphify section to AGENTS.md (Factory Droid)
  droid uninstall        remove graphify section from AGENTS.md
  trae install            write graphify section to AGENTS.md (Trae)
  trae uninstall         remove graphify section from AGENTS.md
  trae-cn install         write graphify section to AGENTS.md (Trae CN)
  trae-cn uninstall      remove graphify section from AGENTS.md
  antigravity install     write .agents/rules + .agents/workflows + skill (Google Antigravity)
  antigravity uninstall   remove .agents/rules, .agents/workflows, and skill
  hermes install          write skill to ~/.hermes/skills/graphify/ (Hermes)
  hermes uninstall        remove skill from ~/.hermes/skills/graphify/
  kiro install            write skill to .kiro/skills/graphify/ + steering file (Kiro IDE/CLI)
  kiro uninstall          remove skill + steering file
  pi install              write skill to ~/.pi/agent/skills/graphify/ (Pi coding agent)
  pi uninstall            remove skill from ~/.pi/agent/skills/graphify/
  devin install           write skill to ~/.config/devin/skills/graphify/ (Devin CLI)
  devin uninstall         remove skill from ~/.config/devin/skills/graphify/

Prefer a hosted version? Try the graphify platform free for 14 days:
https://app.graphify.com
```

### Skill installation options

```text
Usage: graphify install [--project] [--strict] [--platform P|P]
Platforms: claude, codex, opencode, kilo, aider, copilot, claw, droid, trae, trae-cn, hermes, kiro, pi, codebuddy, antigravity, antigravity-windows, windows, kimi, amp, agents, devin, gemini, cursor
  --strict  block the first raw file read per session until one `graphify query` runs (Claude Code project hook only; needs --project)
```

### Assistant skill usage

The upstream examples below use `/graphify`; in Codex invoke `$graphify`.

```
/graphify                                             # full pipeline on current directory (HTML viz; add --obsidian for a vault)
/graphify <path>                                      # full pipeline on specific path
/graphify https://github.com/<owner>/<repo>           # clone repo then run full pipeline on it
/graphify https://github.com/<owner>/<repo> --branch <branch>  # clone a specific branch
/graphify <url1> <url2> ...                           # clone multiple repos, build each, merge into one cross-repo graph
/graphify <path> --mode deep                          # thorough extraction, richer INFERRED edges
/graphify <path> --update                             # incremental - re-extract only new/changed files
/graphify <path> --directed                            # build directed graph (preserves edge direction: source→target)
/graphify <path> --whisper-model medium                # use a larger Whisper model for better transcription accuracy
/graphify <path> --cluster-only                       # rerun clustering on existing graph
/graphify <path> --no-viz                             # skip visualization, just report + JSON
/graphify <path> --html                               # (HTML is generated by default - this flag is a no-op)
/graphify <path> --svg                                # also export graph.svg (embeds in Notion, GitHub)
/graphify <path> --graphml                            # export graph.graphml (Gephi, yEd)
/graphify <path> --neo4j                              # generate graphify-out/cypher.txt for Neo4j
/graphify <path> --neo4j-push bolt://localhost:7687   # push directly to Neo4j
/graphify <path> --falkordb                           # generate graphify-out/cypher.txt for FalkorDB
/graphify <path> --falkordb-push falkordb://localhost:6379   # push directly to FalkorDB
/graphify <path> --mcp                                # start MCP stdio server for agent access
/graphify <path> --watch                              # watch folder, auto-rebuild on code changes (no LLM needed)
/graphify <path> --wiki                               # build agent-crawlable wiki (index.md + one article per community)
/graphify <path> --obsidian --obsidian-dir ~/vaults/my-project  # write vault to custom path (e.g. existing vault)
/graphify add <url>                                   # fetch URL, save to ./raw, update graph
/graphify add <url> --author "Name"                   # tag who wrote it
/graphify add <url> --contributor "Name"              # tag who added it to the corpus
/graphify query "<question>"                          # BFS traversal - broad context
/graphify query "<question>" --dfs                    # DFS - trace a specific path
/graphify query "<question>" --budget 1500            # cap answer at N tokens
/graphify path "AuthModule" "Database"                # shortest path between two concepts
/graphify explain "SwinTransformer"                   # plain-language explanation of a node
```
