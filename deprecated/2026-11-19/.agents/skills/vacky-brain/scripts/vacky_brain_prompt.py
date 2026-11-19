#!/usr/bin/env python3
"""Print copy-ready Vacky brain skill prompts."""

from __future__ import annotations

import argparse
import textwrap


COMMANDS = {
    "idea": {
        "title": "Idea capture",
        "invocation": 'Run $vacky-brain idea with prompt: "{prompt}"',
        "checklist": [
            "Read brain/wiki/now.md, brain/wiki/index.md, brain/wiki/log.md, and relevant wiki pages.",
            "Use brain/Operator/query/experiment-session-template.md.",
            "Create an output only if requested; keep it under brain/outputs/brainstorms or brain/outputs/briefs.",
            "Do not promote the idea into brain/wiki unless it becomes accepted durable truth.",
            "Suggest graphify refresh only if brain, skill, architecture, or workflow files changed.",
        ],
    },
    "plan": {
        "title": "Implementation plan",
        "invocation": 'Run $vacky-brain plan with prompt: "{prompt}"',
        "checklist": [
            "Read brain/wiki/now.md, brain/wiki/index.md, brain/wiki/risks.md, brain/wiki/log.md, and relevant wiki pages.",
            "Use brain/Operator/query/implementation-plan-template.md.",
            "Produce scope, non-goals, touched areas, risks, verification, brain impact, and a Codex-ready prompt.",
            "Do not edit application files during plan-only work.",
        ],
    },
    "raw": {
        "title": "Raw evidence capture",
        "invocation": 'Run $vacky-brain raw with prompt: "{prompt}"',
        "checklist": [
            "Use brain/raw/ only when evidence has future value.",
            "Choose sessions, verification, references, or commits based on the evidence type.",
            "Keep raw notes factual and dated; label uncertainty.",
            "Do not treat raw evidence as canonical without an ingest pass.",
        ],
    },
    "sync": {
        "title": "Branch or feature brain sync",
        "invocation": 'Run $vacky-brain sync with prompt: "{prompt}"',
        "checklist": [
            "Inspect the branch diff against master.",
            "Classify brain impact: none, small, material, or decision.",
            "Use brain/Operator/ingest/pr-sync-template.md.",
            "Update only affected brain/wiki pages; append brain/wiki/log.md if durable knowledge changed.",
            "Refresh brain/wiki/now.md only if current state, risks, or next actions changed.",
            "After brain or skill docs change, suggest $graphify . --update.",
        ],
    },
    "post-merge": {
        "title": "Post-merge drift check",
        "invocation": 'Run $vacky-brain post-merge with prompt: "{prompt}"',
        "checklist": [
            "Use brain/Operator/ingest/merge-sync-template.md.",
            "Compare final master state with existing branch-level brain updates.",
            "Repair only real drift; do not rewrite the brain.",
            "Create raw commit evidence only when final-state uncertainty or missing rationale matters.",
        ],
    },
    "lint": {
        "title": "Brain lint",
        "invocation": 'Run $vacky-brain lint with prompt: "{prompt}"',
        "checklist": [
            "Use brain/Operator/lint/prompt-template.md.",
            "Find stale claims, duplication, weak provenance, bloat, and missing links.",
            "Prefer consolidation and deletion over adding new pages.",
            "Append brain/wiki/log.md only when the lint pass changes durable knowledge.",
        ],
    },
    "graph": {
        "title": "Graphify refresh or query",
        "invocation": 'Run $vacky-brain graph with prompt: "{prompt}"',
        "checklist": [
            "For ordinary refreshes after brain, skill, or code changes, suggest $graphify . --update.",
            "For deeper rebuilds or wiki export, suggest $graphify . --mode deep --wiki.",
            'For questions when graphify-out/graph.json exists, use graphify query "the question".',
            "Treat graphify as generated navigation; keep canonical truth in brain/wiki.",
        ],
    },
}


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Print copy-ready prompts for the Vacky brain skill."
    )
    parser.add_argument(
        "command",
        choices=sorted(COMMANDS),
        help="Brain command to suggest.",
    )
    parser.add_argument(
        "--prompt",
        default="Describe the Vacky context and desired artifact here.",
        help="Prompt text to embed in the suggested invocation.",
    )
    args = parser.parse_args()

    spec = COMMANDS[args.command]
    print(spec["title"])
    print("=" * len(spec["title"]))
    print()
    print(spec["invocation"].format(prompt=args.prompt.replace('"', '\\"')))
    print()
    print("Checklist:")
    for item in spec["checklist"]:
        print(f"- {item}")
    print()
    print(
        textwrap.fill(
            "This helper does not edit files. It gives an agent a concrete command "
            "to run at the right point in the Vacky brain workflow.",
            width=88,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
