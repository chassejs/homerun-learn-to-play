# Changelog

`changelog.js` is the source of truth for what the app displays. This file is a hand-maintained mirror and must be updated alongside it.

Numbering scheme: a minor update adds 0.1; a major update adds 1.0 and resets the minor to 0.

## 1.0 — 2026-08-19

Initial release of Homerun Learn to Play.

- A short placement quiz (self-report plus a handful of baseball questions) recommends a starting tier. Skip it to begin at Rookie; every chapter stays unlocked.
- Twenty-four chapters across six tiers — Rookie, Sandlot, Diamond, Select, Elite, and Pro Mind — from first pitch to reading a scouting report.
- A 300+ question bank behind the chapter quizzes.
- Chapter quizzes with a 75% pass mark. Best score is kept; retakes are unlimited. Misses go to the review deck.
- Spaced-repetition review on a 1 / 3 / 7 / 16 / 35 day schedule, resetting to box 1 on a miss.
- A 20-question adaptive Baseball IQ test scored on a 40–160 BBIQ scale, with bands from Rookie to Pro Mind and a per-topic breakdown.
- A programmatic SVG diagram library and sixteen interactive widgets, all mouse-, touch-, and keyboard-operable.
- Offline support after the first load (service worker). Progress lives in this browser only — no account, no cloud — with export/import backup.
