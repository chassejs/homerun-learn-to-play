#!/usr/bin/env bash
# Launch one Grok chunk headlessly. Usage: run-chunk.sh <brief-basename-without-.md>
set -e
cd "$(dirname "$0")/../../.."
OUT=".claude/build-runs/2026-08-20T03-09-55"
NAME="$1"
~/.grok/bin/grok --cwd "$(pwd)" --permission-mode acceptEdits \
  --allow "Edit" --allow "Write" \
  --output-format json \
  --prompt-file "$OUT/${NAME}.md" \
  > "$OUT/log-${NAME}.json" 2>&1
echo "DONE ${NAME} exit=$?"
