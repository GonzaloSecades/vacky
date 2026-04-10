# PR Raw Bootstrap Template

```text
Create raw-source notes for the Vacky brain from merged pull requests.

Start by inspecting:
- `brain/raw/README.md`
- `brain/raw/commits/README.md`
- `brain/wiki/index.md`
- `brain/wiki/now.md`
- `git status --short --branch`

Goal:
Build the raw PR evidence layer for the brain so later ingest passes can compile accurate wiki pages from project history.

Scope:
- inspect all merged PRs into `master`
- use GitHub PR metadata when available
- fall back to local git history only where GitHub evidence is missing
- create raw notes under `brain/raw/commits/` only

For each merged PR, create one file named:
- `brain/raw/commits/YYYY-MM-DD-pr-<number>-<short-slug>.md`

Each raw PR note should include:
- PR number and title
- merge date
- branch name if useful
- problem or goal
- final merged behavior
- main files or areas touched
- important review-driven changes, if discoverable
- risks, follow-ups, and unresolved questions
- a short `What should be promoted into the wiki` section

Rules:
- prefer final merged state over PR description if they differ
- do not invent rationale that is not supported by PR or repo evidence
- preserve uncertainty explicitly
- keep these notes evidence-rich, not polished wiki pages

At the end:
- list the raw files created
- call out PRs with weak evidence
- note what should be ingested first into `brain/wiki/`
```
