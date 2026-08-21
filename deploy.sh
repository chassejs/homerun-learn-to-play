#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

# The normal path is `git push` (Netlify continuous deployment from main).
# This script is the manual fallback.

node -e '
var fs = require("fs");
var src = fs.readFileSync("version.js", "utf8");
var m = src.match(/^  var APP_VERSION = '\''(\d+\.\d+)'\'';$/m);
if (!m) {
  console.error("deploy: could not read APP_VERSION from version.js");
  console.error("deploy: restore  var APP_VERSION = '\''<major>.<minor>'\'';");
  process.exit(1);
}
var app = m[1];
var pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
var ver = JSON.parse(fs.readFileSync("version.json", "utf8"));
if (pkg.version !== app + ".0" || ver.version !== app) {
  console.error("deploy: version mismatch. Aborting.");
  console.error("  version.js APP_VERSION = " + app);
  console.error("  package.json version   = " + pkg.version);
  console.error("  version.json version   = " + ver.version);
  console.error("They must agree (package.json is <major>.<minor>.0).");
  process.exit(1);
}
'

# Preflight. Every check in here encodes a defect that previously cost a second
# deploy. Across this account deploys averaged 2.0 per work session; the second
# one is almost always something that could have been caught locally.
node scripts/preflight.mjs || {
  echo ""
  echo "deploy: preflight failed — not deploying."
  echo "        Fix the failures above. Deploying now would cost a second deploy."
  exit 1
}

echo ""
netlify deploy --prod --dir . \
  --message "$(git log -1 --pretty=%s 2>/dev/null || echo 'manual deploy')"
