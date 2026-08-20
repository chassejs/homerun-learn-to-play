/* ===================================================================
   questions.test.js — question-bank distribution and answer validity
   (acceptance criterion 3).

   Run with:  node tests/questions.test.js
   Or via:    npm test
   =================================================================== */

'use strict';

const path = require('path');
const mods = require('./_load.js');

const Q = mods.HRL_QUESTIONS;
const cur = mods.HRL_CURRICULUM;
const svg = mods.HRL_SVG;

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

const TOPICS = {
  rules: true,
  field: true,
  positions: true,
  hitting: true,
  pitching: true,
  fielding: true,
  baserunning: true,
  strategy: true,
  safety: true,
  scoring: true,
  analytics: true,
  scouting: true
};

const TYPES = {
  mc: true,
  tf: true,
  scenario: true,
  hotspot: true,
  order: true
};

function vocabUnion() {
  const set = {};
  function add(arr) {
    if (!isArray(arr)) return;
    for (let i = 0; i < arr.length; i++) set[arr[i]] = true;
  }
  add(svg && svg.POSITIONS);
  add(svg && svg.FIELD_PARTS);
  add(svg && svg.ZONE_CELLS);
  add(svg && svg.SWING_FRAMES);
  add(svg && svg.THROW_FRAMES);
  add(svg && svg.COUNT_CELLS);
  return set;
}

function vocabFor(builder) {
  const union = vocabUnion();
  const map = {
    field: [].concat((svg && svg.POSITIONS) || [], (svg && svg.FIELD_PARTS) || []),
    positionGrid: (svg && svg.POSITIONS) || [],
    basePaths: (svg && svg.FIELD_PARTS) || [],
    strikeZone: (svg && svg.ZONE_CELLS) || [],
    swingSequence: (svg && svg.SWING_FRAMES) || [],
    throwSequence: (svg && svg.THROW_FRAMES) || [],
    countMatrix: (svg && svg.COUNT_CELLS) || []
  };
  const specific = map[builder];
  const set = {};
  const list = isArray(specific) && specific.length ? specific : [];
  for (let i = 0; i < list.length; i++) set[list[i]] = true;
  // A matching vocabulary still accepts any id the library publishes —
  // field diagrams expose both positions and field parts.
  const keys = Object.keys(union);
  for (let i = 0; i < keys.length; i++) set[keys[i]] = true;
  return set;
}

function chapterDigits(chapterId) {
  const m = String(chapterId || '').match(/^ch(\d+)$/);
  if (!m) return null;
  const n = parseInt(m[1], 10);
  return (n < 10 ? '0' : '') + n;
}

const items = Q && isArray(Q.items) ? Q.items : [];

console.log('\nbank size');

test('HRL_QUESTIONS.items is a non-empty array', function () {
  assert(items.length > 0, 'question bank is empty');
});

test('≥288 questions total', function () {
  assert(items.length >= 288, 'count is ' + items.length + ' (need ≥288)');
});

console.log('\nids and cross-references');

test('all ids unique and matching /^q\\d{4}$/', function () {
  const seen = {};
  const problems = [];
  for (let i = 0; i < items.length; i++) {
    const id = items[i] && items[i].id;
    if (!/^q\d{4}$/.test(id)) problems.push('bad id "' + id + '"');
    if (seen[id]) problems.push('duplicate id ' + id);
    seen[id] = true;
  }
  assert(problems.length === 0, problems.join('; '));
});

test('every chapter resolves to a real chapter, and the id’s chapter digits match that chapter’s number', function () {
  const problems = [];
  for (let i = 0; i < items.length; i++) {
    const q = items[i];
    const ch = cur.getChapter(q.chapter);
    if (!ch) {
      problems.push(q.id + ' chapter "' + q.chapter + '" does not resolve');
      continue;
    }
    const digits = chapterDigits(q.chapter);
    const fromId = String(q.id).slice(1, 3);
    if (digits !== fromId) {
      problems.push(q.id + ' chapter digits "' + fromId + '" !== ' + q.chapter + ' ("' + digits + '")');
    }
  }
  assert(problems.length === 0, problems.join('; '));
});

test('every tier matches its chapter’s tier', function () {
  const problems = [];
  for (let i = 0; i < items.length; i++) {
    const q = items[i];
    const ch = cur.getChapter(q.chapter);
    if (!ch) continue;
    if (q.tier !== ch.tier) {
      problems.push(q.id + ' tier "' + q.tier + '" !== chapter tier "' + ch.tier + '"');
    }
  }
  assert(problems.length === 0, problems.join('; '));
});

console.log('\nfields');

test('every topic is one of the twelve', function () {
  const problems = [];
  for (let i = 0; i < items.length; i++) {
    const q = items[i];
    if (!TOPICS[q.topic]) problems.push(q.id + ' topic "' + q.topic + '"');
  }
  assert(problems.length === 0, problems.join('; '));
});

test('every difficulty is an integer 1–10', function () {
  const problems = [];
  for (let i = 0; i < items.length; i++) {
    const d = items[i].difficulty;
    if (typeof d !== 'number' || d !== Math.floor(d) || d < 1 || d > 10) {
      problems.push(items[i].id + ' difficulty ' + d);
    }
  }
  assert(problems.length === 0, problems.join('; '));
});

test('every type is one of mc, tf, scenario, hotspot, order', function () {
  const problems = [];
  for (let i = 0; i < items.length; i++) {
    if (!TYPES[items[i].type]) problems.push(items[i].id + ' type "' + items[i].type + '"');
  }
  assert(problems.length === 0, problems.join('; '));
});

console.log('\nanswers by type');

test('mc/tf/scenario: choices is an array of ≥2 unique strings and answer is a valid index', function () {
  const problems = [];
  for (let i = 0; i < items.length; i++) {
    const q = items[i];
    if (q.type !== 'mc' && q.type !== 'tf' && q.type !== 'scenario') continue;
    if (!isArray(q.choices) || q.choices.length < 2) {
      problems.push(q.id + ' needs ≥2 choices');
      continue;
    }
    const seen = {};
    for (let c = 0; c < q.choices.length; c++) {
      if (typeof q.choices[c] !== 'string') {
        problems.push(q.id + ' choices[' + c + '] is not a string');
      }
      if (seen[q.choices[c]]) problems.push(q.id + ' duplicate choice "' + q.choices[c] + '"');
      seen[q.choices[c]] = true;
    }
    if (typeof q.answer !== 'number' || q.answer !== Math.floor(q.answer) ||
        q.answer < 0 || q.answer >= q.choices.length) {
      problems.push(q.id + ' answer index ' + q.answer + ' out of range for ' + q.choices.length + ' choices');
    }
  }
  assert(problems.length === 0, problems.join('; '));
});

test('tf choices are exactly [\'True\',\'False\']', function () {
  const problems = [];
  for (let i = 0; i < items.length; i++) {
    const q = items[i];
    if (q.type !== 'tf') continue;
    if (!isArray(q.choices) || q.choices.length !== 2 ||
        q.choices[0] !== 'True' || q.choices[1] !== 'False') {
      problems.push(q.id + ' choices=' + JSON.stringify(q.choices));
    }
  }
  assert(problems.length === 0, problems.join('; '));
});

test('hotspot: targets is non-empty and every target / diagram.opts.hotspots id is in the matching HRL_SVG vocabulary', function () {
  const problems = [];
  for (let i = 0; i < items.length; i++) {
    const q = items[i];
    if (q.type !== 'hotspot') continue;
    if (!isArray(q.targets) || q.targets.length === 0) {
      problems.push(q.id + ' empty targets');
      continue;
    }
    const builder = q.diagram && q.diagram.svg ? q.diagram.svg : 'field';
    const vocab = vocabFor(builder);
    for (let t = 0; t < q.targets.length; t++) {
      if (!vocab[q.targets[t]]) {
        problems.push(q.id + ' target "' + q.targets[t] + '" not in ' + builder + ' vocabulary');
      }
    }
    const spots = q.diagram && q.diagram.opts && q.diagram.opts.hotspots;
    if (isArray(spots)) {
      for (let h = 0; h < spots.length; h++) {
        if (!vocab[spots[h]]) {
          problems.push(q.id + ' hotspot "' + spots[h] + '" not in ' + builder + ' vocabulary');
        }
      }
    }
  }
  assert(problems.length === 0, problems.join('; '));
});

test('order: items has 3–6 distinct entries', function () {
  const problems = [];
  for (let i = 0; i < items.length; i++) {
    const q = items[i];
    if (q.type !== 'order') continue;
    if (!isArray(q.items) || q.items.length < 3 || q.items.length > 6) {
      problems.push(q.id + ' items length ' + (q.items && q.items.length));
      continue;
    }
    const seen = {};
    for (let n = 0; n < q.items.length; n++) {
      if (seen[q.items[n]]) problems.push(q.id + ' duplicate item "' + q.items[n] + '"');
      seen[q.items[n]] = true;
    }
  }
  assert(problems.length === 0, problems.join('; '));
});

test('every explain is a non-empty string of ≥20 characters', function () {
  const problems = [];
  for (let i = 0; i < items.length; i++) {
    const q = items[i];
    if (typeof q.explain !== 'string' || q.explain.replace(/^\s+|\s+$/g, '').length < 20) {
      problems.push(q.id + ' explain is missing or shorter than 20 characters');
    }
  }
  assert(problems.length === 0, problems.join('; '));
});

console.log('\ndistribution');

test('≥12 questions per chapter', function () {
  const problems = [];
  const chapters = cur.chapters || [];
  for (let i = 0; i < chapters.length; i++) {
    const id = chapters[i].id;
    const n = Q.byChapter(id).length;
    if (n < 12) problems.push(id + ' has ' + n);
  }
  assert(problems.length === 0, problems.join('; '));
});

test('≥45 questions per tier', function () {
  const problems = [];
  const tiers = cur.tiers || [];
  for (let i = 0; i < tiers.length; i++) {
    const key = tiers[i].key;
    const n = Q.byTier(key).length;
    if (n < 45) problems.push(key + ' has ' + n);
  }
  assert(problems.length === 0, problems.join('; '));
});

test('≥15 questions per topic', function () {
  const problems = [];
  const names = Object.keys(TOPICS);
  for (let i = 0; i < names.length; i++) {
    const n = Q.byTopic(names[i]).length;
    if (n < 15) problems.push(names[i] + ' has ' + n);
  }
  assert(problems.length === 0, problems.join('; '));
});

test('every chapter quizIds exists in the bank', function () {
  const problems = [];
  const chapters = cur.chapters || [];
  for (let i = 0; i < chapters.length; i++) {
    const ch = chapters[i];
    const ids = isArray(ch.quizIds) ? ch.quizIds : [];
    for (let q = 0; q < ids.length; q++) {
      if (!Q.byId(ids[q])) problems.push(ch.id + ' quizId "' + ids[q] + '" missing');
    }
  }
  assert(problems.length === 0, problems.join('; '));
});

console.log('\nanswer-index balance');

test('across all 4-choice mc questions, no single index holds more than 45% of correct answers', function () {
  const counts = [0, 0, 0, 0];
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    const q = items[i];
    if (q.type !== 'mc') continue;
    if (!isArray(q.choices) || q.choices.length !== 4) continue;
    if (typeof q.answer !== 'number' || q.answer < 0 || q.answer > 3) continue;
    counts[q.answer] += 1;
    total += 1;
  }
  assert(total > 0, 'no 4-choice mc questions found');
  const problems = [];
  for (let i = 0; i < 4; i++) {
    const share = counts[i] / total;
    if (share > 0.45) {
      problems.push('index ' + i + ' holds ' + (share * 100).toFixed(1) + '% (' + counts[i] + '/' + total + ')');
    }
  }
  assert(problems.length === 0, problems.join('; '));
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
