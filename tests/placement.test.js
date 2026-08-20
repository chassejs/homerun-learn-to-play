/* ===================================================================
   placement.test.js — adaptive stepping, blended tier mapping, coach
   floor, self-report combinations, skip (acceptance criterion 5).

   Run with:  node tests/placement.test.js
   Or via:    npm test
   =================================================================== */

'use strict';

const path = require('path');
const mods = require('./_load.js');

const P = mods.HRL_PLACEMENT;
const progress = mods.HRL_PROGRESS;

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

function optionValues(question) {
  const out = [];
  const opts = question && question.options ? question.options : [];
  for (let i = 0; i < opts.length; i++) out.push(opts[i].value);
  return out;
}

console.log('\nnextDifficulty');

test('HRL_PLACEMENT.nextDifficulty is a function', function () {
  assert(P && typeof P.nextDifficulty === 'function', 'nextDifficulty');
});

test('nextDifficulty clamps at 1 and 10 from both directions', function () {
  assertEqual(P.nextDifficulty(1, false), 1, '1 wrong clamps at 1');
  assertEqual(P.nextDifficulty(1.5, false), 1, '1.5 wrong clamps at 1');
  assertEqual(P.nextDifficulty(2, false), 1, '2 wrong → 1 after −2, clamped if needed');
  assertEqual(P.nextDifficulty(10, true), 10, '10 correct clamps at 10');
  assertEqual(P.nextDifficulty(9, true), 10, '9 correct → 10.5 clamps at 10');
  const up = P.nextDifficulty(4, true);
  assert(up > 4 && up <= 10, 'correct from 4 should step up, got ' + up);
  const down = P.nextDifficulty(4, false);
  assert(down < 4 && down >= 1, 'wrong from 4 should step down, got ' + down);
});

console.log('\ntheta');

test('theta returns 0 with no correct answers, otherwise the mean of the hardest three correct', function () {
  assertEqual(P.theta([]), 0, 'empty');
  assertEqual(P.theta([{ correct: false, difficulty: 9 }]), 0, 'all wrong');
  assertEqual(P.theta([{ correct: true, difficulty: 6 }]), 6, 'single correct');
  const mean = P.theta([
    { correct: true, difficulty: 2 },
    { correct: true, difficulty: 8 },
    { correct: true, difficulty: 6 },
    { correct: true, difficulty: 4 },
    { correct: false, difficulty: 10 }
  ]);
  assertEqual(mean, (8 + 6 + 4) / 3, 'hardest three of 8,6,4,2');
});

console.log('\nrecommendTier');

test('recommendTier returns an integer 1..6 for the full theta × selfTier × role grid', function () {
  const roles = optionValues(P.SELF_REPORT[0]);
  assert(roles.length > 0, 'SELF_REPORT role options');
  const problems = [];
  for (let theta = 0; theta <= 10; theta += 0.5) {
    for (let self = 1; self <= 6; self++) {
      for (let r = 0; r < roles.length; r++) {
        const role = roles[r];
        const tier = P.recommendTier(theta, self, role);
        if (typeof tier !== 'number' || tier !== Math.floor(tier) || tier < 1 || tier > 6) {
          problems.push('theta=' + theta + ' self=' + self + ' role=' + role + ' → ' + tier);
        }
      }
    }
  }
  assert(problems.length === 0, problems.slice(0, 6).join('; '));
});

test('role === "coach" never yields below 3', function () {
  const problems = [];
  for (let theta = 0; theta <= 10; theta += 0.5) {
    for (let self = 1; self <= 6; self++) {
      const tier = P.recommendTier(theta, self, 'coach');
      if (tier < 3) problems.push('theta=' + theta + ' self=' + self + ' → ' + tier);
    }
  }
  assert(problems.length === 0, problems.join('; '));
});

console.log('\nselfReportTier');

test('selfReportTier returns 1..6 for every combination of the SELF_REPORT options', function () {
  const self = P.SELF_REPORT;
  assert(isArray(self) && self.length === 3, 'SELF_REPORT length');
  const roles = optionValues(self[0]);
  const experiences = optionValues(self[1]);
  const goals = optionValues(self[2]);
  const problems = [];
  let count = 0;
  for (let r = 0; r < roles.length; r++) {
    for (let e = 0; e < experiences.length; e++) {
      for (let g = 0; g < goals.length; g++) {
        count += 1;
        const tier = P.selfReportTier({
          role: roles[r],
          experience: experiences[e],
          goal: goals[g]
        });
        if (typeof tier !== 'number' || tier !== Math.floor(tier) || tier < 1 || tier > 6) {
          problems.push(roles[r] + '/' + experiences[e] + '/' + goals[g] + ' → ' + tier);
        }
      }
    }
  }
  assert(count === roles.length * experiences.length * goals.length, 'combination count');
  assert(count > 0, 'no combinations');
  assert(problems.length === 0, problems.join('; '));
});

console.log('\nskip');

test('a skipped placement yields tier 1', function () {
  assertEqual(P.SKIP_TIER, 1, 'SKIP_TIER');
  if (progress && typeof progress.reset === 'function') progress.reset();
  P.skip();
  const rec = progress && typeof progress.getPlacement === 'function'
    ? progress.getPlacement()
    : null;
  assert(rec, 'placement record after skip');
  assertEqual(rec.recommendedTier, 1, 'recommendedTier after skip');
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
