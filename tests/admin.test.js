/* ===================================================================
   admin.test.js — local admin password and the last-updated date.

   Run with:  node tests/admin.test.js
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

const admin = require(path.join(ROOT, 'admin.js'));

const versionJsCode = fs.readFileSync(path.join(ROOT, 'version.js'), 'utf8');
const changelogJsCode = fs.readFileSync(path.join(ROOT, 'changelog.js'), 'utf8');
const appUpdatesCode = fs.readFileSync(path.join(ROOT, 'appUpdates.js'), 'utf8');
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const changelogHtml = fs.readFileSync(path.join(ROOT, 'changelog.html'), 'utf8');
const swSource = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');

const win = {};
new Function('window', versionJsCode)(win);
new Function('window', changelogJsCode)(win);
const updates = new Function('window', appUpdatesCode + '; return window.HRL_APP_UPDATES;')(win);

function changelogDateFor(version) {
  const list = win.HRL_CHANGELOG;
  for (let i = 0; i < list.length; i++) {
    if (list[i] && list[i].version === version) return list[i].date;
  }
  return '';
}

const feedbackWin = {};
new Function('window', fs.readFileSync(path.join(ROOT, 'feedback.js'), 'utf8'))(feedbackWin);
const feedback = feedbackWin.HRL_FEEDBACK;

console.log('\nAdmin sign-in');

test('sha256 matches known vectors', function () {
  assertEqual(
    admin.sha256Hex(''),
    'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    'empty'
  );
  assertEqual(
    admin.sha256Hex('abc'),
    'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
    'abc'
  );
  assertEqual(
    admin.sha256Hex('abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq'),
    '248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1',
    'long'
  );
});

test('starting sign-in is admin / admin', function () {
  assertEqual(admin.DEFAULT_USERNAME, 'admin', 'DEFAULT_USERNAME');
  assertEqual(admin.DEFAULT_PASSWORD, 'admin', 'DEFAULT_PASSWORD');
  admin.resetForTests();
  const result = admin.signIn('admin', 'admin');
  assertEqual(result.ok, true, 'signIn ok');
  assertEqual(admin.currentUser(), 'admin', 'current user');
  assertEqual(admin.storedUsersJsonForTests(), null, 'bootstrap is not stored until a change');
});

test('a wrong username or password is refused', function () {
  admin.resetForTests();
  assertEqual(admin.signIn('admin', 'roster-key').ok, false, 'bad password');
  assertEqual(admin.signIn('coach', 'admin').ok, false, 'bad username');
  assertEqual(admin.signIn('', '').ok, false, 'empty');
  assertEqual(admin.isSignedIn(), false, 'session');
});

test('the admin list starts with admin, and a new admin can sign in', function () {
  admin.resetForTests();
  assertEqual(admin.createUser('coach', 'roster-key', 'roster-key').ok, false, 'signed out');
  assertEqual(admin.signIn('admin', 'admin').ok, true, 'bootstrap');
  assertEqual(admin.listUsers().length, 1, 'one admin before create');
  assertEqual(admin.listUsers()[0].username, 'admin', 'listed name');
  const created = admin.createUser('Coach', 'roster-key', 'roster-key');
  assertEqual(created.ok, true, 'create ok');
  const names = admin.listUsers().map(function (user) { return user.username; });
  assertEqual(names.join(','), 'admin,coach', 'both listed, stored lowercase');
  assertEqual(admin.createUser('coach', 'other-key', 'other-key').ok, false, 'duplicate');
  admin.signOut();
  assertEqual(admin.signIn('coach', 'roster-key').ok, true, 'new admin signs in');
  assertEqual(admin.signIn('admin', 'admin').ok, true, 'bootstrap password still works');
});

test('any listed admin password can be changed and is stored only as a hash', function () {
  admin.resetForTests();
  admin.signIn('admin', 'admin');
  admin.createUser('coach', 'roster-key', 'roster-key');
  admin.signOut();
  assertEqual(admin.signIn('coach', 'roster-key').ok, true, 'coach');
  const changed = admin.changePassword('admin', 'outfield-key', 'outfield-key');
  assertEqual(changed.ok, true, 'changed another user');
  const own = admin.changePassword('coach', 'dugout-key', 'dugout-key');
  assertEqual(own.ok, true, 'changed own password');
  const raw = admin.storedUsersJsonForTests();
  assert(raw.indexOf('roster-key') === -1, 'old coach password not stored');
  assert(raw.indexOf('outfield-key') === -1, 'new admin password not stored');
  assert(raw.indexOf('dugout-key') === -1, 'new coach password not stored');
  const users = JSON.parse(raw);
  users.forEach(function (user) {
    assertEqual(user.hash, admin.hashPassword(user.salt, user.username === 'admin' ? 'outfield-key' : 'dugout-key'), user.username + ' hash');
    assert(user.hash !== user.salt, 'hash is not the salt');
  });
  admin.signOut();
  assertEqual(admin.signIn('admin', 'admin').ok, false, 'old admin password');
  assertEqual(admin.signIn('admin', 'outfield-key').ok, true, 'new admin password');
  assertEqual(admin.signIn('coach', 'roster-key').ok, false, 'old coach password');
  assertEqual(admin.signIn('coach', 'dugout-key').ok, true, 'new coach password');
});

test('password changes reject a mismatch, a blank, and a missing admin', function () {
  admin.resetForTests();
  assertEqual(admin.changePassword('admin', 'outfield-key', 'outfield-key').ok, false, 'signed out');
  admin.signIn('admin', 'admin');
  assertEqual(admin.changePassword('admin', 'outfield-key', 'other-key').ok, false, 'confirm');
  assertEqual(admin.changePassword('admin', '  outfield-key', '  outfield-key').ok, false, 'leading space');
  assertEqual(admin.changePassword('missing', 'outfield-key', 'outfield-key').ok, false, 'unknown user');
  assertEqual(admin.signIn('admin', 'admin').ok, true, 'unchanged password still works');
});

test('clearing saved admins brings back admin / admin', function () {
  admin.resetForTests();
  admin.signIn('admin', 'admin');
  assertEqual(admin.changePassword('admin', 'outfield-key', 'outfield-key').ok, true, 'changed');
  admin.resetForTests();
  assertEqual(admin.isSignedIn(), false, 'session cleared');
  assertEqual(admin.signIn('admin', 'admin').ok, true, 'default restored');
});

console.log('\nFeedback queue');

test('a feedback comment is saved and can be triaged', function () {
  feedback.resetStore();
  const entry = feedback.record({
    details: 'The cutoff diagram is mirrored.',
    category: 'diagrams',
    categoryLabel: 'Diagrams and interactive exercises',
    context: 'chapter',
    contextLabel: 'A chapter',
    chapterTitle: 'Cutoffs, Relays & Backups',
    rating: 2
  });
  assert(entry && entry.id, 'id');
  assertEqual(entry.status, 'new', 'starts new');
  const listed = feedback.list();
  assertEqual(listed.length, 1, 'one comment');
  assertEqual(listed[0].details, 'The cutoff diagram is mirrored.', 'details');
  assertEqual(listed[0].chapterTitle, 'Cutoffs, Relays & Backups', 'chapter');
  assertEqual(feedback.setStatus(entry.id, 'reviewing').ok, true, 'start review');
  assertEqual(feedback.list()[0].status, 'reviewing', 'in review');
  assertEqual(feedback.setStatus(entry.id, 'resolved').ok, true, 'resolve');
  assertEqual(feedback.list()[0].status, 'resolved', 'resolved');
  assertEqual(feedback.setStatus(entry.id, 'nope').ok, false, 'bad status');
  assertEqual(feedback.setStatus('missing', 'new').ok, false, 'missing id');
  assertEqual(feedback.setStatus(entry.id, 'new').ok, true, 'reopen');
  feedback.resetStore();
  assertEqual(feedback.list().length, 0, 'cleared');
});

console.log('\nLast updated');

test('formats a release date as day month year', function () {
  assertEqual(updates.formatReleaseDate('2026-11-02'), '2 Nov 2026', 'november');
  assertEqual(updates.formatReleaseDate('2026-08-20'), '20 Aug 2026', 'august');
  assertEqual(updates.formatReleaseDate(''), '', 'empty');
  assertEqual(updates.formatReleaseDate('2026-13-01'), '', 'bad month');
  assertEqual(updates.formatReleaseDate('nope'), '', 'not a date');
});

test('last updated text uses the changelog date for this version', function () {
  const iso = changelogDateFor(win.HRL_VERSION.APP_VERSION);
  const pretty = updates.formatReleaseDate(iso);
  assert(pretty.length > 0, 'changelog date for ' + win.HRL_VERSION.APP_VERSION);
  assertEqual(updates.releaseDateIso(), iso, 'releaseDateIso');
  assertEqual(updates.lastUpdatedText(), 'Last updated ' + pretty, 'lastUpdatedText');
});

console.log('\nMarkup');

test('the app footer has a last-updated date and an Admin entry', function () {
  assert(indexHtml.indexOf('id="app-updated-label"') !== -1, 'updated label');
  assert(indexHtml.indexOf('Last updated') !== -1, 'Last updated copy');
  assert(indexHtml.indexOf('id="view-admin"') !== -1, 'admin view');
  assert(indexHtml.indexOf('id="footer-admin"') !== -1, 'footer admin');
  assert(indexHtml.indexOf('src="admin.js"') !== -1, 'admin script');
  assert(indexHtml.indexOf('username admin and password admin') !== -1, 'starting sign-in named in help');
  assert(indexHtml.indexOf('Review feedback sent from this browser') !== -1, 'admin purpose');
});

test('the version history page shows last updated', function () {
  assert(changelogHtml.indexOf('Last updated') !== -1, 'changelog copy');
  assert(changelogHtml.indexOf('id="changelog-updated"') !== -1, 'changelog time');
});

test('the service worker precaches admin.js and not version.json', function () {
  assert(swSource.indexOf("'/admin.js'") !== -1, 'admin.js precached');
  const list = swSource.match(/const ASSETS = \[([\s\S]*?)\];/)[1];
  assertEqual(list.indexOf('/version.json') === -1, true, 'version.json excluded');
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
