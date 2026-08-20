/* ===================================================================
   Homerun Learn to Play — changelog.js
   Single source of truth for the What's-New modal and changelog.html.
   CHANGELOG.md is a hand-maintained mirror that must be updated
   alongside this array.
   =================================================================== */

window.HRL_CHANGELOG = (function () {
  'use strict';

  return [
    {
      version: '1.0',
      date: '2026-08-19',
      type: 'major',
      title: 'First release',
      highlights: [
        'Twenty-four chapters across six tiers, from never-watched-a-game to scouting and analytics.',
        'A short placement quiz recommends where to start — and every chapter stays unlocked either way.',
        'Diagrams and sixteen hands-on exercises built into the lessons, all keyboard-operable.',
        'A quiz after every chapter, with a 75% pass mark and best-score tracking.',
        'Missed questions return automatically on a spaced-repetition schedule until they stick.',
        'An adaptive Baseball IQ test scored on a 40–160 scale, with a per-topic breakdown.',
        'A 205-term glossary, searchable and linked from the lessons.',
        'Everything works offline and stays in this browser; export and import your progress as a JSON file.'
      ]
    }
  ];
}());
