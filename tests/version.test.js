/* ===================================================================
   version.test.js — build identity, tooling-parsed literals, integer
   version comparison, and build-id staleness.

   Run with:  node tests/version.test.js
   Or via:    npm test
   =================================================================== */

'use strict';

const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log('  PASS: ' + name);
    passed++;
  } catch (err) {
    console.error('  FAIL: ' + name);
    console.error('        ' + err.message);
    failed++;
  }
}

function assert(condition, msg) {
  if (!condition) throw new Error(msg || 'Assertion failed');
}

function assertEqual(actual, expected, label) {
  if (actual !== expected) {
    throw new Error((label || 'Value') + ': expected "' + expected + '" but got "' + actual + '"');
  }
}

const ROOT = path.join(__dirname, '..');

const versionJsCode = fs.readFileSync(path.join(ROOT, 'version.js'), 'utf8');
const versionFn = new Function('window', versionJsCode + '; return window.HRL_VERSION');
const HRL_VERSION = versionFn({});

const appUpdatesCode = fs.readFileSync(path.join(ROOT, 'appUpdates.js'), 'utf8');
const appUpdatesFn = new Function('window', appUpdatesCode + '; return window.HRL_APP_UPDATES');
const appUpdates = appUpdatesFn({});

const versionJson = JSON.parse(fs.readFileSync(path.join(ROOT, 'version.json'), 'utf8'));

// Must stay identical to scripts/bump-version.mjs.
const APP_VERSION_RE = /^(  var APP_VERSION = ')(\d+)\.(\d+)(';)$/m;
const BUILD_ID_RE = /^(  var BUILD_ID = ')([^']+)(';)$/m;
const BUILD_TIME_RE = /^(  var BUILD_TIME = ')([^']+)(';)$/m;
// Equivalent of the pre-push sed:
// s/^[[:space:]]*var APP_VERSION = '\([0-9][0-9]*\.[0-9][0-9]*\)';.*/\1/p
const HOOK_APP_VERSION_RE = /^  var APP_VERSION = '([0-9][0-9]*\.[0-9][0-9]*)';/;

console.log('\nHRL_VERSION exports');

test('exposes APP_VERSION', function () {
  assertEqual(typeof HRL_VERSION.APP_VERSION, 'string', 'APP_VERSION type');
  assert(HRL_VERSION.APP_VERSION.length > 0, 'APP_VERSION is non-empty');
});

test('exposes DATA_VERSION', function () {
  assertEqual(typeof HRL_VERSION.DATA_VERSION, 'string', 'DATA_VERSION type');
  assert(HRL_VERSION.DATA_VERSION.length > 0, 'DATA_VERSION is non-empty');
});

test('exposes MIN_COMPATIBLE_DATA_VERSION', function () {
  assertEqual(typeof HRL_VERSION.MIN_COMPATIBLE_DATA_VERSION, 'string', 'MIN_COMPATIBLE_DATA_VERSION type');
  assert(HRL_VERSION.MIN_COMPATIBLE_DATA_VERSION.length > 0, 'MIN_COMPATIBLE_DATA_VERSION is non-empty');
});

test('exposes BUILD_ID', function () {
  assertEqual(typeof HRL_VERSION.BUILD_ID, 'string', 'BUILD_ID type');
});

test('exposes BUILD_TIME', function () {
  assertEqual(typeof HRL_VERSION.BUILD_TIME, 'string', 'BUILD_TIME type');
});

test('BUILD_ID is a non-empty string', function () {
  assert(typeof HRL_VERSION.BUILD_ID === 'string' && HRL_VERSION.BUILD_ID.length > 0, 'BUILD_ID');
});

test('BUILD_TIME parses as a valid date', function () {
  assertEqual(Number.isNaN(Date.parse(HRL_VERSION.BUILD_TIME)), false, 'BUILD_TIME parseable (' + HRL_VERSION.BUILD_TIME + ')');
});

console.log('\ntooling-parsed literals');

test('version.js APP_VERSION matches the bump-script regex', function () {
  assertEqual(APP_VERSION_RE.test(versionJsCode), true, 'APP_VERSION_RE');
});

test('version.js BUILD_ID matches the bump-script regex', function () {
  assertEqual(BUILD_ID_RE.test(versionJsCode), true, 'BUILD_ID_RE');
});

test('version.js BUILD_TIME matches the bump-script regex', function () {
  assertEqual(BUILD_TIME_RE.test(versionJsCode), true, 'BUILD_TIME_RE');
});

test('version.js APP_VERSION matches the pre-push sed equivalent', function () {
  const lines = versionJsCode.split(/\n/);
  let matched = false;
  for (let i = 0; i < lines.length; i++) {
    if (HOOK_APP_VERSION_RE.test(lines[i])) {
      matched = true;
      break;
    }
  }
  assertEqual(matched, true, 'HOOK_APP_VERSION_RE');
});

test('literal APP_VERSION equals the exported value', function () {
  const m = versionJsCode.match(APP_VERSION_RE);
  assert(m, 'APP_VERSION literal present');
  assertEqual(m[2] + '.' + m[3], HRL_VERSION.APP_VERSION, 'APP_VERSION literal vs export');
});

test('literal BUILD_ID equals the exported value', function () {
  const m = versionJsCode.match(BUILD_ID_RE);
  assert(m, 'BUILD_ID literal present');
  assertEqual(m[2], HRL_VERSION.BUILD_ID, 'BUILD_ID literal vs export');
});

test('literal BUILD_TIME equals the exported value', function () {
  const m = versionJsCode.match(BUILD_TIME_RE);
  assert(m, 'BUILD_TIME literal present');
  assertEqual(m[2], HRL_VERSION.BUILD_TIME, 'BUILD_TIME literal vs export');
});

test('bump-version.mjs still uses the same three regexes', function () {
  const src = fs.readFileSync(path.join(ROOT, 'scripts', 'bump-version.mjs'), 'utf8');
  assert(src.indexOf("/^(  var APP_VERSION = ')(\\d+)\\.(\\d+)(';)$/m") !== -1, 'APP_VERSION_RE in bump script');
  assert(src.indexOf("/^(  var BUILD_ID = ')([^']+)(';)$/m") !== -1, 'BUILD_ID_RE in bump script');
  assert(src.indexOf("/^(  var BUILD_TIME = ')([^']+)(';)$/m") !== -1, 'BUILD_TIME_RE in bump script');
});

test('pre-push hook still uses the APP_VERSION sed', function () {
  const src = fs.readFileSync(path.join(ROOT, '.githooks', 'pre-push'), 'utf8');
  assert(
    src.indexOf("s/^  var APP_VERSION = '\\([0-9][0-9]*\\.[0-9][0-9]*\\)';.*/\\1/p") !== -1,
    'pre-push sed'
  );
});

console.log('\ninteger version comparison');

test('1.10 is newer than 1.9', function () {
  assertEqual(appUpdates.compareVersions('1.10', '1.9'), 1, '1.10 vs 1.9');
});

test('2.0 is newer than 1.99', function () {
  assertEqual(appUpdates.compareVersions('2.0', '1.99'), 1, '2.0 vs 1.99');
});

test('equal versions compare equal', function () {
  assertEqual(appUpdates.compareVersions('1.0', '1.0'), 0, '1.0 vs 1.0');
});

console.log('\nbuild-id staleness');

test('differing ids are stale', function () {
  assertEqual(appUpdates.isStaleBuild('aaa', 'bbb'), true, 'aaa vs bbb');
});

test('identical ids are not stale', function () {
  assertEqual(appUpdates.isStaleBuild('aaa', 'aaa'), false, 'aaa vs aaa');
});

test('null is never stale', function () {
  assertEqual(appUpdates.isStaleBuild(null, 'aaa'), false, 'null');
});

test('undefined is never stale', function () {
  assertEqual(appUpdates.isStaleBuild(undefined, 'aaa'), false, 'undefined');
});

test('empty string is never stale', function () {
  assertEqual(appUpdates.isStaleBuild('', 'aaa'), false, 'empty string');
});

test('non-string is never stale', function () {
  assertEqual(appUpdates.isStaleBuild(123, 'aaa'), false, 'number');
  assertEqual(appUpdates.isStaleBuild({ id: 'x' }, 'aaa'), false, 'object');
});

console.log('\nversion.json agrees with version.js');

test('version.json buildId matches version.js BUILD_ID', function () {
  assertEqual(versionJson.buildId, HRL_VERSION.BUILD_ID, 'buildId');
});

test('version.json buildTime matches version.js BUILD_TIME', function () {
  assertEqual(versionJson.buildTime, HRL_VERSION.BUILD_TIME, 'buildTime');
});

console.log('\n----------------------------------------');
console.log('Results: ' + passed + ' passed, ' + failed + ' failed');
if (global.__HRL_TEST_RUNNER && typeof global.__HRL_TEST_RUNNER.record === 'function') {
  global.__HRL_TEST_RUNNER.record(path.basename(__filename), passed, failed);
} else if (failed > 0) {
  process.exit(1);
} else {
  console.log('All tests passed.');
}
