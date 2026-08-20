/* ===================================================================
   tests/_load.js — load app modules under Node in dependency order.
   Sets a shared fake `window` pointing at `global` so the
   `var root = typeof window !== 'undefined' ? window : this;` shim
   (and the few files that assign `window.HRL_*` directly) resolve.
   Document is deliberately not stubbed so DOM-gated code stays inert.
   =================================================================== */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');

if (typeof global.window === 'undefined' || global.window === null) {
  global.window = global;
}
if (typeof global.self === 'undefined') {
  global.self = global;
}

function req(rel) {
  return require(path.join(ROOT, rel));
}

function loadViaVm(rel) {
  const filename = path.join(ROOT, rel);
  const code = fs.readFileSync(filename, 'utf8');
  vm.runInThisContext(code, { filename: filename });
}

req('version.js');
req('versionCompat.js');
req('src/glossary-data.js');
req('src/curriculum-data.js');
req('src/curriculum-t1.js');
req('src/curriculum-t2.js');
req('src/curriculum-t3.js');
req('src/curriculum-t4.js');
req('src/curriculum-t5.js');
req('src/curriculum-t6.js');
req('src/questions-data.js');
req('src/questions-t1.js');
req('src/questions-t2.js');
req('src/questions-t3.js');
req('src/questions-t4.js');
req('src/questions-t5.js');
req('src/questions-t6.js');
req('svg.js');
req('progress.js');

// interactive.js assigns window.HRL_INTERACTIVE and has no module.exports.
// Prefer a plain require (the file is a single IIFE). Fall back to vm if
// that throws — e.g. if a future edit touches `document` at load time.
try {
  req('interactive.js');
} catch (err) {
  loadViaVm('interactive.js');
}
if (!global.HRL_INTERACTIVE || typeof global.HRL_INTERACTIVE.names !== 'function') {
  loadViaVm('interactive.js');
}

req('quiz.js');
req('iq.js');
req('placement.js');

module.exports = {
  HRL_CURRICULUM: global.HRL_CURRICULUM,
  HRL_QUESTIONS: global.HRL_QUESTIONS,
  HRL_GLOSSARY: global.HRL_GLOSSARY,
  HRL_PROGRESS: global.HRL_PROGRESS,
  HRL_QUIZ: global.HRL_QUIZ,
  HRL_IQ: global.HRL_IQ,
  HRL_PLACEMENT: global.HRL_PLACEMENT,
  HRL_SVG: global.HRL_SVG,
  HRL_INTERACTIVE: global.HRL_INTERACTIVE
};
