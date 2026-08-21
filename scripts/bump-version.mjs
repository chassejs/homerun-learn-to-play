#!/usr/bin/env node
/* ===================================================================
   Homerun Learn to Play — scripts/bump-version.mjs
   One-command version bump for a deploy. Increments APP_VERSION (minor
   by default, major with --major), stamps a new BUILD_ID / BUILD_TIME,
   and keeps package.json and version.json in agreement.

   Usage:
     node scripts/bump-version.mjs            # 1.0 → 1.1
     node scripts/bump-version.mjs --major    # 1.4 → 2.0
     node scripts/bump-version.mjs --dry-run  # print, write nothing

   Edits version.js by regex-replacing the three tooling-parsed literal
   lines rather than regenerating the file, so comments survive and the
   diff stays readable. Those lines are also parsed by .githooks/pre-push;
   do not change their shape without updating the hook and
   tests/version.test.js.
   =================================================================== */

import { randomBytes } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const versionJsPath = join(root, 'version.js');
const packageJsonPath = join(root, 'package.json');
const versionJsonPath = join(root, 'version.json');
const changelogPath = join(root, 'changelog.js');
const swPath = join(root, 'sw.js');

// Load-bearing shapes — tests/version.test.js and .githooks/pre-push
// parse the same literals. Keep these in lockstep with both.
const APP_VERSION_RE = /^(  var APP_VERSION = ')(\d+)\.(\d+)(';)$/m;
const BUILD_ID_RE = /^(  var BUILD_ID = ')([^']+)(';)$/m;
const BUILD_TIME_RE = /^(  var BUILD_TIME = ')([^']+)(';)$/m;

const APP_VERSION_SHAPE = "  var APP_VERSION = '<major>.<minor>';";
const BUILD_ID_SHAPE = "  var BUILD_ID = '<id>';";
const BUILD_TIME_SHAPE = "  var BUILD_TIME = '<ISO-8601>';";

// The service worker is cache-first with a fixed cache name, so a deploy that
// does not change sw.js leaves returning visitors on the old precache
// indefinitely. Stamping BUILD_ID into the cache name changes sw.js on every
// bump, which forces a fresh install and lets the activate handler drop the
// stale cache. This is what makes a deploy self-invalidating.
const SW_CACHE_RE = /^(const CACHE = 'homerun-learn-)([^']+)(';)$/m;
const SW_CACHE_SHAPE = "const CACHE = 'homerun-learn-<build id>';";

const args = process.argv.slice(2);
const majorBump = args.indexOf('--major') !== -1;
const dryRun = args.indexOf('--dry-run') !== -1;

function fail(message) {
  console.error(message);
  process.exit(1);
}

function generateBuildId(previous) {
  var id;
  do {
    id = randomBytes(5).toString('hex');
  } while (id === previous);
  return id;
}

function localCalendarDate(now) {
  // Local calendar date, not UTC: a late-evening bump must not be
  // stamped with tomorrow's date.
  var y = now.getFullYear();
  var m = String(now.getMonth() + 1).padStart(2, '0');
  var d = String(now.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + d;
}

function toIso8601(now) {
  return now.toISOString().replace(/\.\d{3}Z$/, 'Z');
}

function changelogHas(version) {
  var code;
  try {
    code = readFileSync(changelogPath, 'utf8');
  } catch (err) {
    return false;
  }
  var list;
  try {
    list = new Function('window', code + '\nreturn window.HRL_CHANGELOG;')({});
  } catch (err) {
    return false;
  }
  if (!Array.isArray(list)) return false;
  for (var i = 0; i < list.length; i++) {
    if (list[i] && list[i].version === version) return true;
  }
  return false;
}

function missingNotesMessage(next, released) {
  return [
    'bump-version: changelog.js has no entry whose version is ' + next + '.',
    'tests/versionCompat.test.js will fail until that entry exists.',
    '',
    'Prepend a newest-first object to the array in changelog.js:',
    '',
    '  {',
    "    version: '" + next + "',",
    "    date: '" + released + "',",
    "    type: 'minor',",
    "    title: '<short title>',",
    "    highlights: ['<what changed>']",
    '  }',
    '',
    'The version files stay bumped; only this exit code signals the missing notes.',
    'Add the entry, then re-run the tests — do not run bump again.'
  ].join('\n');
}

var versionJs;
var pkg;
var versionJson;

try {
  versionJs = readFileSync(versionJsPath, 'utf8');
} catch (err) {
  fail('bump-version: cannot read version.js. Changing nothing.');
}

try {
  pkg = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
} catch (err) {
  fail('bump-version: cannot read or parse package.json. Changing nothing.');
}

try {
  versionJson = JSON.parse(readFileSync(versionJsonPath, 'utf8'));
} catch (err) {
  fail('bump-version: cannot read or parse version.json. Changing nothing.');
}

var versionMatch = versionJs.match(APP_VERSION_RE);
if (!versionMatch) {
  fail(
    'bump-version: could not find `' + APP_VERSION_SHAPE + '` in version.js.\n' +
      'The bump script and the pre-push hook parse that exact line — restore it before bumping.\n' +
      'Changing nothing.'
  );
}

if (!BUILD_ID_RE.test(versionJs)) {
  fail(
    'bump-version: could not find `' + BUILD_ID_SHAPE + '` in version.js.\n' +
      'Restore that exact single-quoted, one-per-line assignment. Changing nothing.'
  );
}

if (!BUILD_TIME_RE.test(versionJs)) {
  fail(
    'bump-version: could not find `' + BUILD_TIME_SHAPE + '` in version.js.\n' +
      'Restore that exact single-quoted, one-per-line assignment. Changing nothing.'
  );
}

if (typeof pkg.version !== 'string') {
  fail('bump-version: package.json has no string "version" field. Changing nothing.');
}

if (!versionJson || typeof versionJson !== 'object' || typeof versionJson.version !== 'string') {
  fail('bump-version: version.json is missing a string "version" field. Changing nothing.');
}

var previousIdMatch = versionJs.match(BUILD_ID_RE);
var previousBuildId = previousIdMatch ? previousIdMatch[2] : '';

var major = Number(versionMatch[2]);
var minor = Number(versionMatch[3]);
var previous = major + '.' + minor;
var nextMajor = majorBump ? major + 1 : major;
var nextMinor = majorBump ? 0 : minor + 1;
var next = nextMajor + '.' + nextMinor;

var now = new Date();
var released = localCalendarDate(now);
var buildTime = toIso8601(now);
var buildId = generateBuildId(previousBuildId);
var pkgVersion = next + '.0';

var nextVersionJs = versionJs.replace(APP_VERSION_RE, function (_m, prefix, _maj, _min, suffix) {
  return prefix + next + suffix;
});
nextVersionJs = nextVersionJs.replace(BUILD_ID_RE, function (_m, prefix, _old, suffix) {
  return prefix + buildId + suffix;
});
nextVersionJs = nextVersionJs.replace(BUILD_TIME_RE, function (_m, prefix, _old, suffix) {
  return prefix + buildTime + suffix;
});

if (nextVersionJs === versionJs) {
  fail('bump-version: version.js replacements did not change the file. Changing nothing.');
}

var nextPkg = Object.assign({}, pkg);
nextPkg.version = pkgVersion;

var nextVersionJson = Object.assign({}, versionJson);
nextVersionJson.version = next;
nextVersionJson.released = released;
nextVersionJson.buildId = buildId;
nextVersionJson.buildTime = buildTime;

let swSource;
try {
  swSource = readFileSync(swPath, 'utf8');
} catch {
  fail('bump-version: cannot read sw.js. Changing nothing.');
}
if (!SW_CACHE_RE.test(swSource)) {
  fail(
    'bump-version: could not find the cache-name line in sw.js.\n' +
      'Expected exactly:\n\n  ' + SW_CACHE_SHAPE + '\n\n' +
      'That line is rewritten on every bump so a deploy invalidates the old\n' +
      'precache. Restore its shape before bumping. Changing nothing.',
  );
}
const nextSw = swSource.replace(SW_CACHE_RE, `$1${buildId}$3`);

var transition = 'bump-version: ' + previous + ' → ' + next +
  ' (build ' + buildId + ', released ' + released + ')';
if (dryRun) transition += ' [dry-run]';

console.log(transition);

if (dryRun) {
  console.log('bump-version: would update version.js APP_VERSION, BUILD_ID, BUILD_TIME');
  console.log('bump-version: would update package.json version → ' + pkgVersion);
  console.log('bump-version: would update version.json version, released, buildId, buildTime');
  console.log('bump-version: would update sw.js cache name → homerun-learn-' + buildId);
  if (!changelogHas(next)) {
    console.error(missingNotesMessage(next, released));
    console.error('No files were written (--dry-run).');
    process.exit(1);
  }
  console.log('bump-version: changelog.js already has an entry for ' + next + '.');
  process.exit(0);
}

writeFileSync(versionJsPath, nextVersionJs);
writeFileSync(packageJsonPath, JSON.stringify(nextPkg, null, 2) + '\n');
writeFileSync(versionJsonPath, JSON.stringify(nextVersionJson, null, 2) + '\n');
writeFileSync(swPath, nextSw);

if (!changelogHas(next)) {
  console.error(missingNotesMessage(next, released));
  process.exit(1);
}

process.exit(0);
