/* ===================================================================
   progress.test.js — import merge semantics and malformed-input
   rejection (acceptance criterion 7).

   Run with:  node tests/progress.test.js
   Or via:    npm test
   =================================================================== */

'use strict';

const path = require('path');
const mods = require('./_load.js');

const P = mods.HRL_PROGRESS;

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

function isArray(x) {
  return Object.prototype.toString.call(x) === '[object Array]';
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function findReview(list, qid) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] && list[i].qid === qid) return list[i];
  }
  return null;
}

function hasBadge(list, id) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === id) return true;
  }
  return false;
}

if (P && typeof P.reset === 'function') P.reset();

console.log('\nmergeState rules');

test('HRL_PROGRESS.mergeState / importPayload / importText exist', function () {
  assert(P && typeof P.mergeState === 'function', 'mergeState');
  assert(typeof P.importPayload === 'function', 'importPayload');
  assert(typeof P.importText === 'function', 'importText');
});

test('bestScore max', function () {
  const out = P.mergeState(
    { chapters: { ch01: { bestScore: 70, attempts: 0 } } },
    { chapters: { ch01: { bestScore: 90, attempts: 0 } } }
  );
  assertEqual(out.chapters.ch01.bestScore, 90, 'max bestScore');
});

test('attempts summed', function () {
  const out = P.mergeState(
    { chapters: { ch01: { attempts: 2 } } },
    { chapters: { ch01: { attempts: 5 } } }
  );
  assertEqual(out.chapters.ch01.attempts, 7, 'summed attempts');
});

test('completed sticky-true', function () {
  const a = P.mergeState(
    { chapters: { ch01: { completed: true } } },
    { chapters: { ch01: { completed: false } } }
  );
  const b = P.mergeState(
    { chapters: { ch01: { completed: false } } },
    { chapters: { ch01: { completed: true } } }
  );
  assertEqual(a.chapters.ch01.completed, true, 'true vs false');
  assertEqual(b.chapters.ch01.completed, true, 'false vs true');
});

test('completedAt earlier wins', function () {
  const out = P.mergeState(
    { chapters: { ch01: { completedAt: '2026-06-01T00:00:00.000Z' } } },
    { chapters: { ch01: { completedAt: '2026-01-01T00:00:00.000Z' } } }
  );
  assertEqual(out.chapters.ch01.completedAt, '2026-01-01T00:00:00.000Z', 'earlier completedAt');
});

test('badges set union', function () {
  const out = P.mergeState(
    { badges: ['chapter-ch01', 'streak-3'] },
    { badges: ['streak-3', 'iq-first'] }
  );
  assert(hasBadge(out.badges, 'chapter-ch01'), 'keeps chapter-ch01');
  assert(hasBadge(out.badges, 'streak-3'), 'keeps streak-3');
  assert(hasBadge(out.badges, 'iq-first'), 'adds iq-first');
  assertEqual(out.badges.length, 3, 'union length');
});

test('review union by qid keeping the later dueAt with misses max', function () {
  const out = P.mergeState(
    {
      review: [
        { qid: 'q0101', box: 2, dueAt: 100, lastResult: 'wrong', misses: 1 },
        { qid: 'q0102', box: 1, dueAt: 50, lastResult: 'wrong', misses: 1 }
      ]
    },
    {
      review: [
        { qid: 'q0101', box: 4, dueAt: 400, lastResult: 'correct', misses: 3 },
        { qid: 'q0199', box: 1, dueAt: 80, lastResult: 'wrong', misses: 2 }
      ]
    }
  );
  const a = findReview(out.review, 'q0101');
  assert(a, 'q0101 present');
  assertEqual(a.dueAt, 400, 'later dueAt');
  assertEqual(a.misses, 3, 'misses max');
  assert(findReview(out.review, 'q0102'), 'keeps q0102');
  assert(findReview(out.review, 'q0199'), 'adds q0199');
});

test('iq.attempts concatenated and deduped by takenAt', function () {
  const out = P.mergeState(
    {
      iq: {
        attempts: [
          { takenAt: '2026-01-01T00:00:00.000Z', bbiq: 80 },
          { takenAt: '2026-01-02T00:00:00.000Z', bbiq: 90 }
        ],
        best: { takenAt: '2026-01-02T00:00:00.000Z', bbiq: 90 }
      }
    },
    {
      iq: {
        attempts: [
          { takenAt: '2026-01-02T00:00:00.000Z', bbiq: 90 },
          { takenAt: '2026-01-03T00:00:00.000Z', bbiq: 100 }
        ],
        best: { takenAt: '2026-01-03T00:00:00.000Z', bbiq: 100 }
      }
    }
  );
  assertEqual(out.iq.attempts.length, 3, 'deduped length');
  const seen = {};
  for (let i = 0; i < out.iq.attempts.length; i++) {
    const key = out.iq.attempts[i].takenAt;
    assert(!seen[key], 'duplicate takenAt ' + key);
    seen[key] = true;
  }
});

test('iq.best higher wins', function () {
  const out = P.mergeState(
    { iq: { attempts: [], best: { takenAt: 'a', bbiq: 110 } } },
    { iq: { attempts: [], best: { takenAt: 'b', bbiq: 95 } } }
  );
  assertEqual(out.iq.best.bbiq, 110, 'higher best');
});

test('streak.longest max', function () {
  const out = P.mergeState(
    { streak: { longest: 4, current: 1, lastActiveDay: '2026-01-01' } },
    { streak: { longest: 9, current: 2, lastActiveDay: '2026-01-02' } }
  );
  assertEqual(out.streak.longest, 9, 'longest max');
});

test('placement later takenAt wins', function () {
  const out = P.mergeState(
    { placement: { done: true, recommendedTier: 2, takenAt: '2026-01-01T00:00:00.000Z' } },
    { placement: { done: true, recommendedTier: 5, takenAt: '2026-08-01T00:00:00.000Z' } }
  );
  assertEqual(out.placement.recommendedTier, 5, 'later placement');
  assertEqual(out.placement.takenAt, '2026-08-01T00:00:00.000Z', 'later takenAt');
});

test('settings incoming wins per key', function () {
  const out = P.mergeState(
    { settings: { timerEnabled: true, textSize: 'normal', reducedMotion: false } },
    { settings: { timerEnabled: false, reducedMotion: true } }
  );
  assertEqual(out.settings.timerEnabled, false, 'incoming timerEnabled');
  assertEqual(out.settings.reducedMotion, true, 'incoming reducedMotion');
  assertEqual(out.settings.textSize, 'normal', 'kept current textSize');
});

test('mergeState does not mutate either argument', function () {
  const current = {
    chapters: { ch01: { bestScore: 40, attempts: 1, completed: false } },
    badges: ['iq-first'],
    review: [{ qid: 'q0101', box: 1, dueAt: 10, misses: 1 }],
    iq: { attempts: [{ takenAt: 't1', bbiq: 80 }], best: { takenAt: 't1', bbiq: 80 } },
    streak: { longest: 2, current: 1, lastActiveDay: '2026-01-01' },
    placement: { done: true, recommendedTier: 2, takenAt: '2026-01-01T00:00:00.000Z' },
    settings: { timerEnabled: true }
  };
  const incoming = {
    chapters: { ch01: { bestScore: 95, attempts: 3, completed: true } },
    badges: ['streak-3'],
    review: [{ qid: 'q0101', box: 3, dueAt: 99, misses: 4 }],
    iq: { attempts: [{ takenAt: 't2', bbiq: 120 }], best: { takenAt: 't2', bbiq: 120 } },
    streak: { longest: 8, current: 8, lastActiveDay: '2026-02-01' },
    placement: { done: true, recommendedTier: 4, takenAt: '2026-02-01T00:00:00.000Z' },
    settings: { timerEnabled: false }
  };
  const currentSnap = clone(current);
  const incomingSnap = clone(incoming);
  P.mergeState(current, incoming);
  assertEqual(JSON.stringify(current), JSON.stringify(currentSnap), 'current mutated');
  assertEqual(JSON.stringify(incoming), JSON.stringify(incomingSnap), 'incoming mutated');
});

console.log('\nimportPayload / importText rejection');

function expectRejected(label, fn) {
  let result;
  try {
    result = fn();
  } catch (err) {
    throw new Error(label + ' threw: ' + err.message);
  }
  assert(result && result.ok === false, label + ' ok should be false, got ' + JSON.stringify(result));
  assert(typeof result.message === 'string' && result.message.length > 0, label + ' empty message');
}

test('importPayload rejects null, undefined, a string, [], {}, a foreign app, and a far-future dataVersion without throwing', function () {
  expectRejected('null', function () { return P.importPayload(null); });
  expectRejected('undefined', function () { return P.importPayload(undefined); });
  expectRejected("'not json'", function () { return P.importPayload('not json'); });
  expectRejected('[]', function () { return P.importPayload([]); });
  expectRejected('{}', function () { return P.importPayload({}); });
  expectRejected('foreign app', function () {
    return P.importPayload({ app: 'something-else', data: {} });
  });
  expectRejected('future dataVersion', function () {
    return P.importPayload({
      app: 'homerun-learn-to-play',
      dataVersion: '99.0',
      data: { version: '99.0' }
    });
  });
});

test('importText rejects malformed JSON text the same way, without throwing', function () {
  expectRejected("importText('not json')", function () { return P.importText('not json'); });
  expectRejected("importText('')", function () { return P.importText(''); });
});

console.log('\nLeitner helpers');

test('Leitner helpers on HRL_PROGRESS produce the documented intervals 1/3/7/16/35 days', function () {
  assert(isArray(P.BOX_INTERVALS), 'BOX_INTERVALS');
  assertEqual(P.BOX_INTERVALS.join(','), '1,3,7,16,35', 'BOX_INTERVALS values');
  const now = 1800000000000;
  const MS = 86400000;
  P.reset();
  const miss = P.addMiss('q0101', now);
  assertEqual(miss.box, 1, 'addMiss box');
  assertEqual(miss.dueAt, now + 1 * MS, 'addMiss dueAt (1 day)');

  const step2 = P.recordReview('q0101', true, now);
  assert(step2, 'promoted from box 1');
  assertEqual(step2.box, 2, 'box 2');
  assertEqual(step2.dueAt, now + 3 * MS, 'box 2 dueAt (3 days)');

  const step3 = P.recordReview('q0101', true, now);
  assertEqual(step3.box, 3, 'box 3');
  assertEqual(step3.dueAt, now + 7 * MS, 'box 3 dueAt (7 days)');

  const step4 = P.recordReview('q0101', true, now);
  assertEqual(step4.box, 4, 'box 4');
  assertEqual(step4.dueAt, now + 16 * MS, 'box 4 dueAt (16 days)');

  const step5 = P.recordReview('q0101', true, now);
  assertEqual(step5.box, 5, 'box 5');
  assertEqual(step5.dueAt, now + 35 * MS, 'box 5 dueAt (35 days)');
});

console.log('\nexport');

test('exportFilename returns homerun-learn-progress-YYYY-MM-DD.json for a fixed date', function () {
  const name = P.exportFilename(new Date(2026, 7, 19));
  assertEqual(name, 'homerun-learn-progress-2026-08-19.json', 'local Date');
  assertEqual(
    P.exportFilename('2026-08-19T15:00:00.000Z'),
    'homerun-learn-progress-2026-08-19.json',
    'ISO string'
  );
});

test('exportPayload has app, appVersion, dataVersion, exportedAt, data', function () {
  const payload = P.exportPayload();
  assertEqual(typeof payload.app, 'string', 'app');
  assert(payload.app.length > 0, 'app non-empty');
  assertEqual(typeof payload.appVersion, 'string', 'appVersion');
  assertEqual(typeof payload.dataVersion, 'string', 'dataVersion');
  assertEqual(typeof payload.exportedAt, 'string', 'exportedAt');
  assert(payload.data && typeof payload.data === 'object', 'data');
  assert('app' in payload && 'appVersion' in payload && 'dataVersion' in payload &&
    'exportedAt' in payload && 'data' in payload, 'required keys');
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
