#!/usr/bin/env bash

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
UPSTREAM_DIR="$ROOT/references/upstream"

mkdir -p "$UPSTREAM_DIR"

curl -sS https://spacetimedb.com/docs/ai-rules/spacetimedb-typescript.mdc > "$UPSTREAM_DIR/spacetimedb-typescript.mdc"
curl -sS https://spacetimedb.com/llms.txt > "$UPSTREAM_DIR/llms.txt"

echo "Refreshed SpacetimeDB upstream sources into $UPSTREAM_DIR"
