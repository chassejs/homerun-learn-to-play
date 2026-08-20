/* ===================================================================
   syntax.test.js — parse check over every .js file, plus the ES5-safe
   syntax ban on app files (acceptance criterion 1).

   Run with:  node tests/syntax.test.js
   Or via:    npm test
   =================================================================== */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');

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

function listJsFiles(dir, recursive) {
  const out = [];
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (e) {
    return out;
  }
  for (let i = 0; i < entries.length; i++) {
    const ent = entries[i];
    if (ent.name === 'node_modules' || ent.name === '.claude' || ent.name === '.git') continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (recursive) {
        const nested = listJsFiles(full, true);
        for (let j = 0; j < nested.length; j++) out.push(nested[j]);
      }
    } else if (ent.isFile() && ent.name.slice(-3) === '.js') {
      out.push(full);
    }
  }
  return out;
}

function rel(full) {
  return path.relative(ROOT, full).split(path.sep).join('/');
}

function lineAt(source, index) {
  let line = 1;
  for (let i = 0; i < index && i < source.length; i++) {
    if (source[i] === '\n') line++;
  }
  return line;
}

// Strip comments and string literals so the ES6 scan does not fire on
// lesson copy that happens to contain the words "let" or "const".
function codeMask(source) {
  const n = source.length;
  let out = '';
  let i = 0;
  let state = 'code';
  while (i < n) {
    const c = source[i];
    const next = i + 1 < n ? source[i + 1] : '';
    if (state === 'code') {
      if (c === '/' && next === '/') {
        state = 'line';
        out += '  ';
        i += 2;
        continue;
      }
      if (c === '/' && next === '*') {
        state = 'block';
        out += '  ';
        i += 2;
        continue;
      }
      if (c === "'") {
        state = 'sq';
        out += ' ';
        i += 1;
        continue;
      }
      if (c === '"') {
        state = 'dq';
        out += ' ';
        i += 1;
        continue;
      }
      out += c;
      i += 1;
      continue;
    }
    if (state === 'line') {
      if (c === '\n') {
        state = 'code';
        out += '\n';
      } else {
        out += ' ';
      }
      i += 1;
      continue;
    }
    if (state === 'block') {
      if (c === '*' && next === '/') {
        state = 'code';
        out += '  ';
        i += 2;
        continue;
      }
      out += c === '\n' ? '\n' : ' ';
      i += 1;
      continue;
    }
    if (state === 'sq') {
      if (c === '\\') {
        out += '  ';
        i += 2;
        continue;
      }
      if (c === "'") {
        state = 'code';
        out += ' ';
        i += 1;
        continue;
      }
      out += c === '\n' ? '\n' : ' ';
      i += 1;
      continue;
    }
    if (state === 'dq') {
      if (c === '\\') {
        out += '  ';
        i += 2;
        continue;
      }
      if (c === '"') {
        state = 'code';
        out += ' ';
        i += 1;
        continue;
      }
      out += c === '\n' ? '\n' : ' ';
      i += 1;
      continue;
    }
    i += 1;
  }
  return out;
}

function findBanned(source) {
  const masked = codeMask(source);
  const hits = [];
  const patterns = [
    { kind: 'let declaration', re: /\blet\s+[A-Za-z_$]/g },
    { kind: 'const declaration', re: /\bconst\s+[A-Za-z_$]/g },
    { kind: 'arrow function', re: /=>/g },
    { kind: 'template literal', re: /`/g }
  ];
  for (let p = 0; p < patterns.length; p++) {
    const re = patterns[p].re;
    let m;
    while ((m = re.exec(masked)) !== null) {
      hits.push({ kind: patterns[p].kind, line: lineAt(source, m.index) });
    }
  }
  return hits;
}

const files = []
  .concat(listJsFiles(ROOT, false))
  .concat(listJsFiles(path.join(ROOT, 'src'), true))
  .concat(listJsFiles(path.join(ROOT, 'tests'), true));

files.sort();

console.log('\nparse check');

test('finds at least one .js file to parse', function () {
  assert(files.length > 0, 'Expected .js files under repo root, src/, and tests/');
});

for (let i = 0; i < files.length; i++) {
  const full = files[i];
  const name = rel(full);
  test('parses ' + name, function () {
    const source = fs.readFileSync(full, 'utf8');
    try {
      // eslint-disable-next-line no-new
      new vm.Script(source, { filename: full });
    } catch (err) {
      throw new Error(name + ': ' + (err && err.message ? err.message : err));
    }
  });
}

console.log('\nES5-safe syntax ban (app files)');

const appFiles = files.filter(function (full) {
  const name = rel(full);
  if (name === 'sw.js') return false;
  if (name.indexOf('tests/') === 0) return false;
  return true;
});

test('scans every app file under root and src/ (excluding sw.js and tests/)', function () {
  assert(appFiles.length > 0, 'Expected app .js files to scan');
});

for (let i = 0; i < appFiles.length; i++) {
  const full = appFiles[i];
  const name = rel(full);
  test('no banned ES6+ syntax in ' + name, function () {
    const source = fs.readFileSync(full, 'utf8');
    const hits = findBanned(source);
    if (!hits.length) return;
    const parts = [];
    for (let h = 0; h < hits.length; h++) {
      parts.push(name + ':' + hits[h].line + ' (' + hits[h].kind + ')');
    }
    throw new Error('Banned syntax:\n        ' + parts.join('\n        '));
  });
}

console.log('\n----------------------------------------');
console.log('Results: ' + passed + ' passed, ' + failed + ' failed');
if (global.__HRL_TEST_RUNNER && typeof global.__HRL_TEST_RUNNER.record === 'function') {
  global.__HRL_TEST_RUNNER.record(path.basename(__filename), passed, failed);
} else if (failed > 0) {
  process.exit(1);
} else {
  console.log('All tests passed.');
}
