/* ===================================================================
   tests/run-all.js — load every tests/*.test.js in a stable order,
   print a per-file and overall summary, exit 1 on any failure.

   Run with:  node tests/run-all.js
   Or via:    npm test
   =================================================================== */

'use strict';

const path = require('path');

const FILES = [
  'syntax.test.js',
  'curriculum.test.js',
  'questions.test.js',
  'quiz.test.js',
  'placement.test.js',
  'iq.test.js',
  'progress.test.js',
  'versionCompat.test.js'
];

const stats = {
  files: [],
  passed: 0,
  failed: 0,
  record: function (name, passed, failed) {
    this.files.push({ name: name, passed: passed, failed: failed });
    this.passed += passed;
    this.failed += failed;
  }
};

global.__HRL_TEST_RUNNER = stats;

let loadErrors = 0;

for (let i = 0; i < FILES.length; i++) {
  const file = FILES[i];
  console.log('\n======== ' + file + ' ========');
  try {
    require(path.join(__dirname, file));
  } catch (err) {
    loadErrors += 1;
    stats.failed += 1;
    stats.files.push({ name: file, passed: 0, failed: 1 });
    console.error('  FAIL: failed to load ' + file);
    console.error('        ' + (err && err.stack ? err.stack : err));
  }
}

console.log('\n========================================');
console.log('Per-file summary');
for (let i = 0; i < stats.files.length; i++) {
  const f = stats.files[i];
  const status = f.failed ? 'FAIL' : 'PASS';
  console.log('  ' + status + '  ' + f.name + '  (' + f.passed + ' passed, ' + f.failed + ' failed)');
}
console.log('----------------------------------------');
console.log('Total: ' + stats.passed + ' passed, ' + stats.failed + ' failed' +
  (loadErrors ? ', ' + loadErrors + ' load errors' : ''));

if (stats.failed > 0 || loadErrors > 0) {
  process.exit(1);
}
console.log('All tests passed.');
