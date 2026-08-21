#!/usr/bin/env node
/**
 * Pre-deploy preflight.
 *
 * Why this exists: across six Netlify sites the account averaged 2.0 deploys
 * per work session — 100 deploys for 51 sessions. The second deploy is almost
 * always "deployed, noticed something, deployed again", which means the thing
 * that was noticed could have been caught locally. Every check below encodes a
 * defect that actually caused a redeploy on this project:
 *
 *   - version records disagreeing            (would ship an unidentifiable build)
 *   - sw.js cache name not carrying BUILD_ID (shipped 1.1; returning visitors
 *                                             kept the old precache forever)
 *   - oversized images                       (shipped 1.2; heroes were 7x the
 *                                             size they render at, 3.0 MB)
 *   - a referenced file that does not exist  (404s on a fresh load)
 *   - release notes missing for the version  (What's-New modal silently no-ops)
 *
 * Run it before deploying: `npm run preflight`. deploy.sh runs it too and
 * refuses to deploy on failure.
 *
 * Exit 0 = safe to deploy. Exit 1 = fix it first; deploying now buys a second
 * deploy later.
 */

import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Largest an image may be before it is worth resizing, in KB. */
const IMAGE_BUDGET_KB = 320;
/** Largest the whole deployed payload should be, in MB (soft warning). */
const TOTAL_BUDGET_MB = 6;

let failures = 0;
let warnings = 0;

function pass(msg) {
  console.log('  ok    ' + msg);
}
function fail(msg) {
  console.log('  FAIL  ' + msg);
  failures++;
}
function warn(msg) {
  console.log('  warn  ' + msg);
  warnings++;
}
function section(name) {
  console.log('\n' + name);
}

function read(rel) {
  return readFileSync(join(root, rel), 'utf8');
}

// ---------------------------------------------------------------------------
// 1. The test suite. Everything else assumes it passes.
// ---------------------------------------------------------------------------
section('test suite');
try {
  const out = execFileSync('npm', ['test'], { cwd: root, encoding: 'utf8' });
  const m = out.match(/Total: (\d+) passed, (\d+) failed/);
  if (m && m[2] === '0') pass('npm test — ' + m[1] + ' passed, 0 failed');
  else fail('npm test reported failures: ' + (m ? m[0] : 'unparseable output'));
} catch {
  fail('npm test exited non-zero — run it directly to see why');
}

// ---------------------------------------------------------------------------
// 2. Version identity. A build that cannot be told apart from the last one
//    makes the in-app update check useless.
// ---------------------------------------------------------------------------
section('version identity');
const versionJs = read('version.js');
const appVersion = (versionJs.match(/^  var APP_VERSION = '(\d+\.\d+)';$/m) || [])[1];
const buildId = (versionJs.match(/^  var BUILD_ID = '([^']+)';$/m) || [])[1];

if (!appVersion) fail('cannot read APP_VERSION from version.js');
if (!buildId) fail('cannot read BUILD_ID from version.js');

if (appVersion && buildId) {
  const pkg = JSON.parse(read('package.json'));
  const vjson = JSON.parse(read('version.json'));
  if (pkg.version === appVersion + '.0') pass('package.json ' + pkg.version);
  else fail('package.json is ' + pkg.version + ', expected ' + appVersion + '.0');

  if (vjson.version === appVersion) pass('version.json version ' + vjson.version);
  else fail('version.json is ' + vjson.version + ', expected ' + appVersion);

  if (vjson.buildId === buildId) pass('version.json buildId matches (' + buildId + ')');
  else fail('version.json buildId ' + vjson.buildId + ' != version.js ' + buildId);

  // Release notes must exist, or the What's-New modal silently does nothing.
  const changelog = read('changelog.js');
  if (new RegExp("version: '" + appVersion.replace('.', '\\.') + "'").test(changelog)) {
    pass('changelog.js has an entry for ' + appVersion);
  } else {
    fail('changelog.js has no entry for ' + appVersion + " — the What's-New modal will not fire");
  }

  // The service worker is cache-first; if its cache name does not move, a
  // returning visitor keeps the old precache no matter what you deploy.
  const sw = read('sw.js');
  const swCache = (sw.match(/^const CACHE = 'homerun-learn-([^']+)';$/m) || [])[1];
  if (swCache === buildId) pass('sw.js cache name carries BUILD_ID');
  else fail('sw.js cache is "' + swCache + '" but BUILD_ID is "' + buildId + '" — this deploy would NOT invalidate');
}

// ---------------------------------------------------------------------------
// 3. Has anything actually changed since the last deploy? A deploy that ships
//    nothing is pure cost.
// ---------------------------------------------------------------------------
section('is a deploy warranted');
try {
  const status = execFileSync('git', ['status', '--porcelain'], { cwd: root, encoding: 'utf8' }).trim();
  if (status) warn('uncommitted changes present — deploy ships the working tree, not HEAD:\n' + status.split('\n').map(l => '          ' + l).join('\n'));
  else pass('working tree clean');

  const lastTag = execFileSync('git', ['log', '-1', '--pretty=%s'], { cwd: root, encoding: 'utf8' }).trim();
  pass('HEAD: ' + lastTag.slice(0, 72));
} catch {
  warn('not a git repo, or git unavailable — skipping change check');
}

// ---------------------------------------------------------------------------
// 4. Every file index.html references must exist. This is what produces 404s
//    on a fresh load, and it is invisible until you deploy.
// ---------------------------------------------------------------------------
section('referenced files exist');
const html = read('index.html');
const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
  .map((m) => m[1])
  .filter((s) => !/^(https?:|data:|mailto:|#)/.test(s));
const missing = refs.filter((r) => !existsSync(join(root, r.replace(/^\.\//, ''))));
if (missing.length) missing.forEach((m) => fail('index.html references a missing file: ' + m));
else pass(refs.length + ' referenced files all exist');

// The precache list must not name anything that does not exist, and must not
// include the freshness probe.
const swSrc = read('sw.js');
const assetsBlock = (swSrc.match(/const ASSETS = \[([\s\S]*?)\];/) || [])[1] || '';
const assets = assetsBlock
  .split(',')
  .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
  .filter(Boolean);
const badAssets = assets.filter((p) => p !== '/' && !existsSync(join(root, p)));
if (badAssets.length) badAssets.forEach((p) => fail('sw.js precaches a missing file: ' + p));
else pass(assets.length + ' precached assets all exist');

if (assets.includes('/version.json')) fail('sw.js precaches /version.json — it is the freshness probe and must come from the network');
else pass('/version.json correctly excluded from the precache');

// ---------------------------------------------------------------------------
// 5. Asset weight. The heroes shipped at 7x the size they render at; nobody
//    noticed until the site was live and slow.
// ---------------------------------------------------------------------------
section('asset budget');
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']);
const SKIP_DIRS = new Set(['node_modules', '.git', '.netlify', '.claude', 'source']);

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(join(dir, entry.name), out);
    } else {
      out.push(join(dir, entry.name));
    }
  }
  return out;
}

const files = walk(root);
let totalBytes = 0;
const heavy = [];
for (const f of files) {
  const size = statSync(f).size;
  totalBytes += size;
  if (IMAGE_EXT.has(extname(f).toLowerCase()) && size > IMAGE_BUDGET_KB * 1024) {
    heavy.push({ f: f.replace(root + '/', ''), kb: Math.round(size / 1024) });
  }
}
if (heavy.length) {
  heavy.forEach((h) => warn('image over ' + IMAGE_BUDGET_KB + ' KB: ' + h.f + ' (' + h.kb + ' KB) — check it is not larger than it renders'));
} else {
  pass('no image over ' + IMAGE_BUDGET_KB + ' KB (excluding brand/source masters)');
}
const totalMb = totalBytes / 1024 / 1024;
if (totalMb > TOTAL_BUDGET_MB) warn('deployed payload ' + totalMb.toFixed(1) + ' MB exceeds the ' + TOTAL_BUDGET_MB + ' MB soft budget');
else pass('deployed payload ' + totalMb.toFixed(1) + ' MB (budget ' + TOTAL_BUDGET_MB + ' MB)');

// ---------------------------------------------------------------------------
// Verdict
// ---------------------------------------------------------------------------
console.log('\n' + '-'.repeat(60));
if (failures) {
  console.log(failures + ' failure(s), ' + warnings + ' warning(s). DO NOT DEPLOY.');
  console.log('Fixing these now costs one deploy. Shipping them costs two.');
  process.exit(1);
}
console.log('0 failures, ' + warnings + ' warning(s). Safe to deploy.');
if (warnings) console.log('Warnings do not block, but read them — each one has caused a redeploy before.');
process.exit(0);
