#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/../../.."
OUT=".claude/build-runs/2026-08-21T01-38-53"
NAME="$1"
~/.grok/bin/grok --cwd "$(pwd)" --permission-mode acceptEdits \
  --allow "Edit" --allow "Write" \
  --output-format json \
  --prompt-file "$OUT/${NAME}.md" \
  > "$OUT/log-${NAME}.json" 2>&1
echo "DONE ${NAME} exit=$?"
