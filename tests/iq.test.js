/* ===================================================================
   iq.test.js — BBIQ bounds, band mapping, pickQuestion behaviour
   (acceptance criterion 6).

   Run with:  node tests/iq.test.js
   Or via:    npm test
   =================================================================== */

'use strict';

const path = require('path');
const mods = require('./_load.js');

const IQ = mods.HRL_IQ;
const Q = mods.HRL_QUESTIONS;

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

function inRange(n) {
  return typeof n === 'number' && !isNaN(n) && n >= 40 && n <= 160;
}

console.log('\ncomputeBbiq');

test('HRL_IQ.computeBbiq / bandFor / pickQuestion / nextDifficulty exist', function () {
  assert(IQ && typeof IQ.computeBbiq === 'function', 'computeBbiq');
  assert(typeof IQ.bandFor === 'function', 'bandFor');
  assert(typeof IQ.pickQuestion === 'function', 'pickQuestion');
  assert(typeof IQ.nextDifficulty === 'function', 'nextDifficulty');
});

test('computeBbiq stays in 40..160 for empty, all-correct, all-wrong, mixed, and all-zero difficulty (no NaN, no throw)', function () {
  let empty;
  let allCorrect;
  let allWrong;
  let mixed;
  let zeros;
  try {
    empty = IQ.computeBbiq([]);
    allCorrect = IQ.computeBbiq([
      { difficulty: 4, correct: true },
      { difficulty: 7, correct: true },
      { difficulty: 10, correct: true }
    ]);
    allWrong = IQ.computeBbiq([
      { difficulty: 4, correct: false },
      { difficulty: 7, correct: false },
      { difficulty: 10, correct: false }
    ]);
    mixed = IQ.computeBbiq([
      { difficulty: 8, correct: true },
      { difficulty: 4, correct: false },
      { difficulty: 6, correct: true }
    ]);
    zeros = IQ.computeBbiq([
      { difficulty: 0, correct: true },
      { difficulty: 0, correct: false },
      { difficulty: 0, correct: true }
    ]);
  } catch (err) {
    throw new Error('computeBbiq threw: ' + err.message);
  }
  assert(inRange(empty), 'empty → ' + empty);
  assert(inRange(allCorrect), 'all-correct → ' + allCorrect);
  assert(inRange(allWrong), 'all-wrong → ' + allWrong);
  assert(inRange(mixed), 'mixed → ' + mixed);
  assert(inRange(zeros), 'zeros → ' + zeros);
  assert(empty === empty, 'empty is not NaN');
  assert(zeros === zeros, 'zeros is not NaN');
});

test('all-wrong yields exactly 40; all-correct yields exactly 160', function () {
  assertEqual(
    IQ.computeBbiq([
      { difficulty: 5, correct: false },
      { difficulty: 9, correct: false }
    ]),
    40,
    'all-wrong'
  );
  assertEqual(
    IQ.computeBbiq([
      { difficulty: 5, correct: true },
      { difficulty: 9, correct: true }
    ]),
    160,
    'all-correct'
  );
});

console.log('\nbandFor');

test('bandFor at the exact band boundaries', function () {
  assertEqual(IQ.bandFor(69), 'Rookie', '69');
  assertEqual(IQ.bandFor(70), 'Sandlot', '70');
  assertEqual(IQ.bandFor(89), 'Sandlot', '89');
  assertEqual(IQ.bandFor(90), 'Diamond', '90');
  assertEqual(IQ.bandFor(109), 'Diamond', '109');
  assertEqual(IQ.bandFor(110), 'Select', '110');
  assertEqual(IQ.bandFor(124), 'Select', '124');
  assertEqual(IQ.bandFor(125), 'Elite', '125');
  assertEqual(IQ.bandFor(139), 'Elite', '139');
  assertEqual(IQ.bandFor(140), 'Pro Mind', '140');
  assertEqual(IQ.bandFor(160), 'Pro Mind', '160');
});

console.log('\nnextDifficulty');

test('nextDifficulty clamps at 1 and 10', function () {
  assertEqual(IQ.nextDifficulty(1, false), 1, '1 wrong');
  assertEqual(IQ.nextDifficulty(2, false), 1, '2 wrong → clamp 1');
  assertEqual(IQ.nextDifficulty(10, true), 10, '10 correct');
  assertEqual(IQ.nextDifficulty(9, true), 10, '9 correct → clamp 10');
});

console.log('\npickQuestion');

test('pickQuestion never returns an already-used id, prefers unused topics until 8 distinct topics have appeared, and returns null on an exhausted pool', function () {
  const pool = [
    { id: 'a1', topic: 'rules', difficulty: 5 },
    { id: 'a2', topic: 'rules', difficulty: 5 },
    { id: 'b1', topic: 'field', difficulty: 9 },
    { id: 'c1', topic: 'positions', difficulty: 5 }
  ];

  const first = IQ.pickQuestion(pool, 5, [], []);
  assert(first && first.id, 'first pick');
  const second = IQ.pickQuestion(pool, 5, [first.id], [first.topic]);
  assert(second && second.id !== first.id, 'must not reuse id ' + first.id);

  // Unused topic is preferred even when farther from the target difficulty.
  const prefer = IQ.pickQuestion(
    [
      { id: 'near-used', topic: 'rules', difficulty: 5 },
      { id: 'far-new', topic: 'scouting', difficulty: 10 }
    ],
    5,
    [],
    ['rules']
  );
  assertEqual(prefer && prefer.id, 'far-new', 'prefer unused topic');

  const small = [
    { id: 'only-1', topic: 'rules', difficulty: 3 },
    { id: 'only-2', topic: 'field', difficulty: 3 }
  ];
  assertEqual(
    IQ.pickQuestion(small, 3, ['only-1', 'only-2'], ['rules', 'field']),
    null,
    'exhausted pool'
  );
});

test('end-to-end simulated 20-question run over the real bank produces 20 distinct questions covering ≥8 topics', function () {
  const pool = Q && isArray(Q.items) ? Q.items : [];
  assert(pool.length >= 20, 'bank too small for a 20-question run');
  const usedIds = [];
  const usedTopics = [];
  let difficulty = IQ.START_DIFFICULTY || 5;
  const topics = {};
  for (let i = 0; i < 20; i++) {
    const q = IQ.pickQuestion(pool, difficulty, usedIds, usedTopics);
    assert(q && q.id, 'pick ' + (i + 1) + ' returned nothing');
    assert(usedIds.indexOf(q.id) === -1, 'duplicate id ' + q.id + ' at pick ' + (i + 1));
    usedIds.push(q.id);
    if (q.topic) {
      usedTopics.push(q.topic);
      topics[q.topic] = true;
    }
    difficulty = IQ.nextDifficulty(difficulty, i % 3 !== 0);
  }
  assertEqual(usedIds.length, 20, 'run length');
  const topicCount = Object.keys(topics).length;
  assert(topicCount >= 8, 'covered ' + topicCount + ' topics (need ≥8)');
});

console.log('\nadvanceIndex / isStale');

test('advanceIndex and isStale are exported functions', function () {
  assert(typeof IQ.advanceIndex === 'function', 'advanceIndex');
  assert(typeof IQ.isStale === 'function', 'isStale');
});

test('advancing from the last index yields the finished state rather than an out-of-range index', function () {
  const state = { index: 19, finished: false, renderToken: 1 };
  const result = IQ.advanceIndex(state, 20);
  assertEqual(result.finished, true, 'finished');
  assertEqual(state.finished, true, 'state.finished');
  assertEqual(result.index, 19, 'returned index');
  assertEqual(state.index, 19, 'state.index stays on the last in-range question');
  assert(state.index < 20, 'index must not run past the end');
  assert(state.index >= 0, 'index must stay non-negative');
});

test('calling advanceIndex repeatedly after finishing does not increment past the end and does not report a second completion', function () {
  const state = { index: 19, finished: false };
  let completions = 0;
  const onComplete = function () { completions += 1; };
  const first = IQ.advanceIndex(state, 20, onComplete);
  assertEqual(first.finished, true, 'first call finishes');
  assertEqual(completions, 1, 'first completion');
  assertEqual(state.index, 19, 'index after first finish');

  const second = IQ.advanceIndex(state, 20, onComplete);
  assertEqual(second.finished, true, 'still finished');
  assertEqual(second.index, 19, 'returned index after repeat');
  assertEqual(state.index, 19, 'state.index after repeat');
  assertEqual(completions, 1, 'no second completion');

  IQ.advanceIndex(state, 20, onComplete);
  IQ.advanceIndex(state, 20, onComplete);
  assertEqual(state.index, 19, 'index unchanged after more repeats');
  assertEqual(completions, 1, 'still a single completion');
});

test('a handler carrying a stale render token is a no-op: state is unchanged', function () {
  const state = { index: 4, finished: false, renderToken: 3 };
  const snapshot = JSON.stringify(state);
  const staleToken = 2;
  assert(IQ.isStale(state, staleToken) === true, 'old token is stale');
  assertEqual(JSON.stringify(state), snapshot, 'isStale must not mutate state');
  if (!IQ.isStale(state, staleToken)) {
    IQ.advanceIndex(state, 20);
  }
  assertEqual(state.index, 4, 'stale handler must not advance index');
  assertEqual(state.finished, false, 'stale handler must not finish');
  assertEqual(state.renderToken, 3, 'stale handler must not bump token');
  assert(IQ.isStale(state, 3) === false, 'current token is live');
  assert(IQ.isStale(null, 3) === true, 'missing state is stale');
});

test('the completion callback fires exactly once across repeated advance calls', function () {
  const state = { index: 17, finished: false };
  let completions = 0;
  const onComplete = function () { completions += 1; };
  let i;
  for (i = 0; i < 10; i++) {
    IQ.advanceIndex(state, 20, onComplete);
  }
  assertEqual(state.finished, true, 'walked to finished');
  assert(state.index < 20, 'index stays in range');
  assertEqual(state.index, 19, 'lands on the last in-range index');
  assertEqual(completions, 1, 'onComplete fires exactly once');
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
