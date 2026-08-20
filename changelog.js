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
      title: 'First release — Homerun Learn to Play',
      highlights: [
        'A short placement quiz recommends a starting tier. Skip it to begin at Rookie; every chapter stays unlocked.',
        'Twenty-four chapters across six tiers — Rookie, Sandlot, Diamond, Select, Elite, and Pro Mind.',
        'A 300+ question bank behind chapter quizzes. Pass at 75%; your best score is kept, and you can retake.',
        'Missed questions feed a spaced-repetition review deck on a 1 / 3 / 7 / 16 / 35 day schedule.',
        'A 20-question adaptive Baseball IQ test scored on a 40–160 BBIQ scale, with bands from Rookie to Pro Mind.',
        'A programmatic SVG diagram library and sixteen interactive widgets — mouse, touch, and keyboard.',
        'Works offline after the first load. Progress lives in this browser only, with export/import backup.'
      ]
    }
  ];
}());
