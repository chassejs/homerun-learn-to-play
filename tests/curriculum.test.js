/* ===================================================================
   curriculum.test.js — structure and cross-reference integrity of the
   6-tier / 24-chapter curriculum (acceptance criterion 2).

   Run with:  node tests/curriculum.test.js
   Or via:    npm test
   =================================================================== */

'use strict';

const path = require('path');
const mods = require('./_load.js');

const cur = mods.HRL_CURRICULUM;
const svg = mods.HRL_SVG;
const glossary = mods.HRL_GLOSSARY;
const interactive = mods.HRL_INTERACTIVE;

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

const KNOWN_TYPES = {
  prose: true,
  diagram: true,
  keypoints: true,
  interactive: true,
  example: true,
  coachnote: true,
  divisionnote: true,
  terms: true,
  compare: true,
  steps: true
};

const TIER_KEYS = ['rookie', 'sandlot', 'diamond', 'select', 'elite', 'promind'];

const INTERACTIVE_ARRAY_KEYS = ['cases', 'items', 'parts', 'pairs', 'positions', 'frames', 'steps'];

function isArray(x) {
  return Object.prototype.toString.call(x) === '[object Array]';
}

function chapterId(n) {
  return 'ch' + (n < 10 ? '0' : '') + n;
}

function widgetNames() {
  if (!interactive || typeof interactive.names !== 'function') return [];
  return interactive.names();
}

function widgetSet() {
  const names = widgetNames();
  const set = {};
  for (let i = 0; i < names.length; i++) set[names[i]] = true;
  return set;
}

function hasNonEmptyArray(opts) {
  if (!opts || typeof opts !== 'object') return false;
  for (let i = 0; i < INTERACTIVE_ARRAY_KEYS.length; i++) {
    const key = INTERACTIVE_ARRAY_KEYS[i];
    if (isArray(opts[key]) && opts[key].length > 0) return true;
  }
  return false;
}

function builderName(name) {
  return svg && typeof svg[name] === 'function';
}

console.log('\nmodules loaded');

test('HRL_CURRICULUM is present with tiers and chapters', function () {
  assert(cur && isArray(cur.tiers) && isArray(cur.chapters), 'HRL_CURRICULUM.tiers/chapters');
});

test('HRL_SVG is present with builders', function () {
  assert(svg && isArray(svg.BUILDERS) && svg.BUILDERS.length > 0, 'HRL_SVG.BUILDERS');
});

test('HRL_GLOSSARY.bySlug is a function', function () {
  assert(glossary && typeof glossary.bySlug === 'function', 'HRL_GLOSSARY.bySlug');
});

test('HRL_INTERACTIVE.names is a function', function () {
  assert(interactive && typeof interactive.names === 'function', 'HRL_INTERACTIVE.names');
});

console.log('\ntiers');

test('exactly 6 tiers', function () {
  assertEqual(cur.tiers.length, 6, 'tiers.length');
});

test('tier keys are rookie, sandlot, diamond, select, elite, promind in order 1–6', function () {
  for (let i = 0; i < TIER_KEYS.length; i++) {
    const t = cur.tiers[i];
    assert(t, 'missing tier at index ' + i);
    assertEqual(t.key, TIER_KEYS[i], 'tiers[' + i + '].key');
    assertEqual(t.order, i + 1, 'tiers[' + i + '].order');
  }
});

console.log('\nchapters');

test('exactly 24 chapters', function () {
  assertEqual(cur.chapters.length, 24, 'chapters.length');
});

test('ids are ch01–ch24', function () {
  const seen = {};
  for (let i = 0; i < cur.chapters.length; i++) {
    const ch = cur.chapters[i];
    assert(ch && ch.id, 'chapter missing id at index ' + i);
    assert(/^ch\d{2}$/.test(ch.id), 'id format: ' + ch.id);
    assert(!seen[ch.id], 'duplicate chapter id ' + ch.id);
    seen[ch.id] = true;
  }
  for (let n = 1; n <= 24; n++) {
    const id = chapterId(n);
    assert(seen[id], 'missing chapter ' + id);
  }
});

test('order values are 1..24 with no gaps or duplicates', function () {
  const seen = {};
  for (let i = 0; i < cur.chapters.length; i++) {
    const order = cur.chapters[i].order;
    assert(typeof order === 'number' && order === Math.floor(order), 'order not an integer: ' + order);
    assert(order >= 1 && order <= 24, 'order out of range: ' + order);
    assert(!seen[order], 'duplicate order ' + order);
    seen[order] = true;
  }
  for (let n = 1; n <= 24; n++) {
    assert(seen[n], 'missing order ' + n);
  }
});

test('every chapter.tier resolves to a real tier; each tier holds exactly 4 chapters', function () {
  const byTier = {};
  for (let i = 0; i < TIER_KEYS.length; i++) byTier[TIER_KEYS[i]] = 0;
  for (let i = 0; i < cur.chapters.length; i++) {
    const ch = cur.chapters[i];
    const tier = cur.getTier(ch.tier);
    assert(tier && tier.key === ch.tier, ch.id + ' tier "' + ch.tier + '" does not resolve');
    byTier[ch.tier] += 1;
  }
  for (let i = 0; i < TIER_KEYS.length; i++) {
    assertEqual(byTier[TIER_KEYS[i]], 4, TIER_KEYS[i] + ' chapter count');
  }
});

test('prev/next form one unbroken chain from ch01 to ch24', function () {
  const first = cur.getChapter('ch01');
  const last = cur.getChapter('ch24');
  assert(first, 'ch01 missing');
  assert(last, 'ch24 missing');
  assertEqual(first.prev, null, 'ch01.prev');
  assertEqual(last.next, null, 'ch24.next');
  for (let n = 1; n <= 24; n++) {
    const ch = cur.getChapter(chapterId(n));
    assert(ch, 'missing ' + chapterId(n));
    if (n === 1) {
      assertEqual(ch.prev, null, 'ch01.prev');
    } else {
      assertEqual(ch.prev, chapterId(n - 1), ch.id + '.prev');
    }
    if (n === 24) {
      assertEqual(ch.next, null, 'ch24.next');
    } else {
      assertEqual(ch.next, chapterId(n + 1), ch.id + '.next');
    }
  }
});

console.log('\nsections');

test('every section.type is one of the ten known types', function () {
  const unknown = [];
  for (let i = 0; i < cur.chapters.length; i++) {
    const ch = cur.chapters[i];
    const sections = ch.sections || [];
    for (let s = 0; s < sections.length; s++) {
      const type = sections[s] && sections[s].type;
      if (!KNOWN_TYPES[type]) {
        unknown.push(ch.id + ' section[' + s + '] type="' + type + '"');
      }
    }
  }
  assert(unknown.length === 0, 'unknown section types: ' + unknown.join('; '));
});

test('every section.svg names a real HRL_SVG builder and calling it returns an <svg> string', function () {
  const problems = [];
  for (let i = 0; i < cur.chapters.length; i++) {
    const ch = cur.chapters[i];
    const sections = ch.sections || [];
    for (let s = 0; s < sections.length; s++) {
      const sec = sections[s];
      if (!sec || sec.svg == null || sec.svg === '') continue;
      if (!builderName(sec.svg)) {
        problems.push(ch.id + ' section[' + s + '] unknown builder "' + sec.svg + '"');
        continue;
      }
      let markup;
      try {
        markup = svg[sec.svg](sec.opts || {});
      } catch (err) {
        problems.push(ch.id + ' section[' + s + '] builder "' + sec.svg + '" threw: ' + err.message);
        continue;
      }
      if (typeof markup !== 'string' || markup.indexOf('<svg') === -1) {
        problems.push(ch.id + ' section[' + s + '] builder "' + sec.svg + '" did not return an <svg> string');
      }
    }
  }
  assert(problems.length === 0, problems.join('; '));
});

test('every section.widget is in HRL_INTERACTIVE.names()', function () {
  const known = widgetSet();
  const problems = [];
  for (let i = 0; i < cur.chapters.length; i++) {
    const ch = cur.chapters[i];
    const sections = ch.sections || [];
    for (let s = 0; s < sections.length; s++) {
      const sec = sections[s];
      if (!sec || sec.widget == null || sec.widget === '') continue;
      if (!known[sec.widget]) {
        problems.push(ch.id + ' section[' + s + '] unknown widget "' + sec.widget + '"');
      }
    }
  }
  assert(problems.length === 0, problems.join('; '));
});

test('every terms slug resolves in HRL_GLOSSARY', function () {
  const problems = [];
  for (let i = 0; i < cur.chapters.length; i++) {
    const ch = cur.chapters[i];
    const sections = ch.sections || [];
    for (let s = 0; s < sections.length; s++) {
      const sec = sections[s];
      if (!sec || sec.type !== 'terms') continue;
      const slugs = isArray(sec.items) ? sec.items : (isArray(sec.terms) ? sec.terms : []);
      for (let t = 0; t < slugs.length; t++) {
        const slug = slugs[t];
        if (!glossary.bySlug(slug)) {
          problems.push(ch.id + ' unknown term slug "' + slug + '"');
        }
      }
    }
  }
  assert(problems.length === 0, problems.join('; '));
});

console.log('\nper-chapter shape');

test('each chapter has ≥8 sections, ≥2 diagram, ≥1 interactive, 3–5 objectives, 6–8 quizIds, last section keypoints', function () {
  const problems = [];
  for (let i = 0; i < cur.chapters.length; i++) {
    const ch = cur.chapters[i];
    const id = ch.id;
    const sections = isArray(ch.sections) ? ch.sections : [];
    if (sections.length < 8) problems.push(id + ' has ' + sections.length + ' sections (need ≥8)');
    let diagrams = 0;
    let interactives = 0;
    for (let s = 0; s < sections.length; s++) {
      if (sections[s] && sections[s].type === 'diagram') diagrams += 1;
      if (sections[s] && sections[s].type === 'interactive') interactives += 1;
    }
    if (diagrams < 2) problems.push(id + ' has ' + diagrams + ' diagram sections (need ≥2)');
    if (interactives < 1) problems.push(id + ' has ' + interactives + ' interactive sections (need ≥1)');
    const objectives = isArray(ch.objectives) ? ch.objectives : [];
    if (objectives.length < 3 || objectives.length > 5) {
      problems.push(id + ' has ' + objectives.length + ' objectives (need 3–5)');
    }
    const quizIds = isArray(ch.quizIds) ? ch.quizIds : [];
    if (quizIds.length < 6 || quizIds.length > 8) {
      problems.push(id + ' has ' + quizIds.length + ' quizIds (need 6–8)');
    }
    const last = sections[sections.length - 1];
    if (!last || last.type !== 'keypoints') {
      problems.push(id + ' last section is ' + (last && last.type) + ' (need keypoints)');
    }
  }
  assert(problems.length === 0, problems.join('; '));
});

test('no chapter has an empty title, subtitle, or objectives entry', function () {
  const problems = [];
  for (let i = 0; i < cur.chapters.length; i++) {
    const ch = cur.chapters[i];
    if (!ch.title || !String(ch.title).replace(/^\s+|\s+$/g, '')) {
      problems.push(ch.id + ' empty title');
    }
    if (!ch.subtitle || !String(ch.subtitle).replace(/^\s+|\s+$/g, '')) {
      problems.push(ch.id + ' empty subtitle');
    }
    const objectives = isArray(ch.objectives) ? ch.objectives : [];
    for (let o = 0; o < objectives.length; o++) {
      if (!objectives[o] || !String(objectives[o]).replace(/^\s+|\s+$/g, '')) {
        problems.push(ch.id + ' empty objective[' + o + ']');
      }
    }
  }
  assert(problems.length === 0, problems.join('; '));
});

test('every interactive section opts contains a non-empty cases, items, parts, pairs, positions, frames, or steps array', function () {
  const problems = [];
  for (let i = 0; i < cur.chapters.length; i++) {
    const ch = cur.chapters[i];
    const sections = ch.sections || [];
    for (let s = 0; s < sections.length; s++) {
      const sec = sections[s];
      if (!sec || sec.type !== 'interactive') continue;
      if (!hasNonEmptyArray(sec.opts)) {
        problems.push(ch.id + ' interactive "' + sec.widget + '" has no cases/items/parts/pairs/positions/frames/steps array');
      }
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
