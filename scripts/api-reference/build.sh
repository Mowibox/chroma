#!/usr/bin/env bash
# Chromapi SDK API reference: docstrings -> content/{en,fr}/chromapi/developing/api-documentation.md.
#   scripts/api-reference/build.sh [path of the chromapi repository, default ../chromapi]
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
SITE="$(cd "$HERE/../.." && pwd)"
SDK="$(cd "${1:-$SITE/../chromapi}" && pwd)"
OUT="$(mktemp -d)"
trap 'rm -rf "$OUT"' EXIT

cd "$SDK"
unset PYTHONPATH
export CHROMAPI_SDK="$SDK"
version="$(uv run -q python -c 'import importlib.metadata as m; print(m.version("chromapi"))')"
for lang in en fr; do  # Sphinx translates its labels (Parameters, Return type...), the docstrings stay in English
    uv run -q --with sphinx --with sphinx-markdown-builder \
        sphinx-build -q -E -D language=$lang -b markdown "$HERE" "$OUT/$lang"
    python3 "$HERE/render.py" "$OUT/$lang/index.md" "$SITE/content/$lang/chromapi/developing/api-documentation.md" \
        $lang "$version" "$(date +%F)"
    echo "Wrote content/$lang/chromapi/developing/api-documentation.md (chromapi $version)"
done
