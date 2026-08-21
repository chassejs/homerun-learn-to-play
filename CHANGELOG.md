# Changelog

`changelog.js` is the source of truth for what the app displays. This file is a hand-maintained mirror and must be updated alongside it.

Numbering scheme: a minor update adds 0.1; a major update adds 1.0 and resets the minor to 0.

## 1.3 — 2026-08-20

- Chapter photographs load about three times faster. The tier heroes render at 256px wide but shipped at 1792px — 7x oversized, ~500 KB each to paint a thumbnail. Resized to 1200px (still ~4.7x the render size, so there is headroom if the layout ever goes full-width), cutting the set from 3.0 MB to 1.1 MB with no visible quality change.
- Full-resolution masters are preserved in `brand/source/hero-tier-N-master.jpg`.

## 1.2 — 2026-08-20

- Each of the six tiers now opens with its own photograph — an empty diamond at first light for Rookie, a dusk grandstand for Pro Mind — instead of a drawn placeholder.
- Updates now reach you reliably. `sw.js` is cache-first with a fixed cache name, so a deploy that left it byte-identical kept returning visitors on the old precache indefinitely. The cache name now carries `BUILD_ID`, which the bump script rewrites every release, forcing a fresh install and dropping the stale cache.
- The illustrated `tierHero` banners remain as the fallback, so a chapter still opens correctly if an image cannot load.

## 1.1 — 2026-08-20

- A feedback button now sits in the corner of every screen, so you can report a wrong answer or a confusing lesson without leaving the page you are on.
- The feedback form knows where you were — it pre-fills the screen you came from, and names the chapter when you are reading one.
- The app now checks for a newer version when you open it and after it has been sitting in the background, and offers to reload.
- A new version tells you what changed the first time you open it, and the full history stays available under Version history.
- Reports now carry the exact build you were running, so a problem can be traced to the version that had it.
- Releases are now version-stamped automatically: `npm run bump` updates every version file together, and a pre-push hook refuses a deploy that did not bump. See `docs/VERSIONING.md`.

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
