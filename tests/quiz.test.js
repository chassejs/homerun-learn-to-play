/* ===================================================================
   quiz.test.js — shuffle-preserves-answer property test, scoring,
   and Leitner scheduling (acceptance criterion 4).

   Run with:  node tests/quiz.test.js
   Or via:    npm test
   =================================================================== */

'use strict';

const path = require('path');
const mods = require('./_load.js');

const quiz = mods.HRL_QUIZ;

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

function sortedCopy(arr) {
  return arr.slice().sort();
}

function sameMultiset(a, b) {
  if (!isArray(a) || !isArray(b) || a.length !== b.length) return false;
  const as = sortedCopy(a);
  const bs = sortedCopy(b);
  for (let i = 0; i < as.length; i++) {
    if (as[i] !== bs[i]) return false;
  }
  return true;
}

function lcg(seed) {
  let s = seed;
  return function () {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

console.log('\nshuffleQuestion property (200 randomized runs)');

test('HRL_QUIZ.shuffleQuestion and shuffleArray are functions', function () {
  assert(quiz && typeof quiz.shuffleQuestion === 'function', 'shuffleQuestion');
  assert(typeof quiz.shuffleArray === 'function', 'shuffleArray');
});

test('200 runs: shuffled 4–5 choice questions keep the correct choice under result.answer, preserve the multiset, and do not mutate the input', function () {
  const problems = [];
  for (let n = 0; n < 200; n++) {
    const rng = lcg(n * 997 + 13);
    const four = n % 2 === 0;
    const choices = four
      ? ['alpha', 'bravo', 'charlie', 'delta']
      : ['alpha', 'bravo', 'charlie', 'delta', 'echo'];
    const answer = n % choices.length;
    const input = {
      id: 'q-prop-' + n,
      type: 'mc',
      prompt: 'Property ' + n,
      choices: choices.slice(),
      answer: answer,
      explain: 'The correct choice must travel with the relocated index.'
    };
    const snapshot = JSON.stringify(input);
    const result = quiz.shuffleQuestion(input, rng);
    if (JSON.stringify(input) !== snapshot) {
      problems.push('run ' + n + ' mutated the input');
      continue;
    }
    if (!result || !isArray(result.choices)) {
      problems.push('run ' + n + ' did not return choices');
      continue;
    }
    if (result.choices[result.answer] !== input.choices[input.answer]) {
      problems.push(
        'run ' + n + ': result.choices[' + result.answer + '] is "' +
        result.choices[result.answer] + '" but the original correct choice is "' +
        input.choices[input.answer] + '"'
      );
    }
    if (!sameMultiset(result.choices, input.choices)) {
      problems.push('run ' + n + ' changed the choice multiset');
    }
  }
  assert(problems.length === 0, problems.slice(0, 8).join('; '));
});

console.log('\nshuffleArray');

test('shuffleArray preserves the multiset and does not mutate', function () {
  const input = [1, 2, 2, 3, 3, 3, 'x'];
  const snapshot = JSON.stringify(input);
  const rng = lcg(42);
  const out = quiz.shuffleArray(input, rng);
  assertEqual(JSON.stringify(input), snapshot, 'input mutated');
  assert(sameMultiset(out, input), 'multiset changed: ' + JSON.stringify(out));
  const identity = quiz.shuffleArray([10], lcg(1));
  assert(sameMultiset(identity, [10]), 'single-element shuffle');
});

console.log('\nisCorrect');

test('isCorrect for mc, tf, scenario, hotspot, and order (including a wrong-sequence order)', function () {
  const mc = { type: 'mc', choices: ['A', 'B', 'C', 'D'], answer: 2 };
  assert(quiz.isCorrect(mc, 2) === true, 'mc correct');
  assert(quiz.isCorrect(mc, 0) === false, 'mc wrong');

  const tf = { type: 'tf', choices: ['True', 'False'], answer: 1 };
  assert(quiz.isCorrect(tf, 1) === true, 'tf correct');
  assert(quiz.isCorrect(tf, 0) === false, 'tf wrong');

  const scenario = { type: 'scenario', choices: ['stay', 'bunt', 'steal'], answer: 0 };
  assert(quiz.isCorrect(scenario, 0) === true, 'scenario correct');
  assert(quiz.isCorrect(scenario, 2) === false, 'scenario wrong');

  const hotspot = { type: 'hotspot', targets: ['ss', '2b'] };
  assert(quiz.isCorrect(hotspot, 'ss') === true, 'hotspot ss');
  assert(quiz.isCorrect(hotspot, '2b') === true, 'hotspot 2b');
  assert(quiz.isCorrect(hotspot, 'p') === false, 'hotspot miss');

  const order = { type: 'order', items: ['stance', 'load', 'stride', 'contact'] };
  assert(quiz.isCorrect(order, ['stance', 'load', 'stride', 'contact']) === true, 'order correct');
  assert(
    quiz.isCorrect(order, ['load', 'stance', 'stride', 'contact']) === false,
    'order with the right elements in the wrong sequence must be incorrect'
  );
});

console.log('\nscoreQuiz');

test('scoreQuiz exact percentages; exactly 75% passes; 74% fails; 0 and 100 edges', function () {
  const empty = quiz.scoreQuiz([]);
  assertEqual(empty.pct, 0, 'empty pct');
  assertEqual(empty.passed, false, 'empty passed');
  assertEqual(empty.correct, 0, 'empty correct');
  assertEqual(empty.total, 0, 'empty total');

  const zero = quiz.scoreQuiz([false, false, false, false]);
  assertEqual(zero.pct, 0, '0% pct');
  assertEqual(zero.passed, false, '0% passed');
  assertEqual(zero.correct, 0, '0% correct');

  const full = quiz.scoreQuiz([true, true, true, true]);
  assertEqual(full.pct, 100, '100% pct');
  assertEqual(full.passed, true, '100% passed');
  assertEqual(full.correct, 4, '100% correct');

  const pass75 = quiz.scoreQuiz([true, true, true, false]);
  assertEqual(pass75.pct, 75, '75% pct');
  assertEqual(pass75.passed, true, 'exactly 75% must pass');
  assertEqual(pass75.correct, 3, '75% correct');
  assertEqual(pass75.total, 4, '75% total');

  const fifty = [];
  for (let i = 0; i < 37; i++) fifty.push(true);
  for (let j = 0; j < 13; j++) fifty.push(false);
  const fail74 = quiz.scoreQuiz(fifty);
  assertEqual(fail74.pct, 74, '74% pct');
  assertEqual(fail74.passed, false, '74% must fail');

  const objects = quiz.scoreQuiz([
    { correct: true },
    { correct: true },
    { correct: true },
    { correct: false }
  ]);
  assertEqual(objects.pct, 75, 'object-form 75% pct');
  assertEqual(objects.passed, true, 'object-form 75% passed');
});

console.log('\nnextBox');

test('nextBox: correct promotes and caps at 5; wrong resets to 1 from every box', function () {
  assertEqual(quiz.nextBox(1, true), 2, '1 correct');
  assertEqual(quiz.nextBox(2, true), 3, '2 correct');
  assertEqual(quiz.nextBox(3, true), 4, '3 correct');
  assertEqual(quiz.nextBox(4, true), 5, '4 correct');
  assertEqual(quiz.nextBox(5, true), 5, '5 correct caps');
  for (let box = 1; box <= 5; box++) {
    assertEqual(quiz.nextBox(box, false), 1, box + ' wrong');
  }
});

console.log('\ndueDateFor');

test('dueDateFor: boxes 1–5 produce now + [1,3,7,16,35] * 86400000', function () {
  const now = 1700000000000;
  const days = [1, 3, 7, 16, 35];
  const MS = 86400000;
  for (let box = 1; box <= 5; box++) {
    const due = quiz.dueDateFor(box, now);
    assertEqual(due, now + days[box - 1] * MS, 'box ' + box);
  }
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
