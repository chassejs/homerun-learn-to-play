# Build Summary (build-grok)

**Task:** Build **Homerun Learn to Play** — a progressive, interactive baseball curriculum app for Homerun Baseball Ottawa, specified in `docs/BUILD-PLAN.md`. Deploy to Netlify via GitHub.
**Run:** `.claude/build-runs/2026-08-20T03-09-55`
**Date:** 2026-08-20
**Implementer:** Grok CLI (`grok-4.5`, grok-cli 1.0.5), shell-free mode — 16 chunks
**Status:** READY

## Plan

A vanilla, build-step-free single-page app matching the three sibling projects (`lineup-app`, `homerun-practice-app`, `baseball-app`): classic `<script>` tags, one `window.HRL_*` global per file, ES5-safe syntax, `localStorage` state, zero runtime dependencies, and a Netlify deploy that publishes the repo root with no build command. The learner is placed by an adaptive quiz, works through 24 chapters across 6 tiers authored from the Youth Baseball Canada knowledge base, is tested after each chapter with misses feeding a spaced-repetition deck, and can measure a 40–160 Baseball IQ against a 361-question bank. The whole visual envelope follows the Homerun Baseball Ottawa brand guidelines.

Work was split into sixteen sequential and parallel Grok turns — shell, diagram library, state/navigation, six curriculum tiers, glossary, six question tiers, assessment engines, chapter reader, two widget passes, tests and docs, plus four corrective chunks. Grok ran shell-free (Read/Write/Edit only), so every syntax check, test run, browser audit, and git operation was performed by the reviewer.

## Implementation

Roughly 32,400 lines of application JavaScript and a 2,190-line stylesheet:

- **Shell and design system** — `index.html` (eight views), `styles.css` (brand tokens, responsive, print, accessibility)
- **`svg.js`** — 13 pure SVG-string builders including `tierHero`, which draws six distinct illustrated banner scenes so the app is attractive without any raster art
- **`progress.js` / `shell.js`** — storage, Leitner review, badges, streaks, export/import merge, navigation
- **Curriculum** — 24 chapters, 300 sections, 278 minutes of reading, across seven `src/curriculum-*.js` files
- **`src/questions-*.js`** — 361 questions; **`src/glossary-data.js`** — 205 terms
- **`quiz.js` / `iq.js` / `placement.js`** — assessment engines
- **`learn.js` / `interactive.js`** — chapter reader and all 16 interactive widgets
- **`tests/`** — 181 assertions across 8 files

## Review

**READY.** All 17 acceptance criteria pass with cited evidence. `npm test` reports **181 passed, 0 failed**, and the suite was negative-tested — injecting an out-of-range answer index makes it exit 1 with a precise failure.

Nine defects were found and fixed, none deferred. Two were mine rather than the implementer's (an invalid `height="auto"` specified in my chunk-2 brief; a scaffold copy loop that skipped `tests/versionCompat.test.js`). The two most consequential were found **only by driving the deployed site**, not the local build:

- **[CRITICAL]** Hotspot questions gave no feedback at all. `className` on an SVG `<g>` is a read-only `SVGAnimatedString`, so the class writes in `markHotspots()` were silently ignored — clicking a fielder never marked it right or wrong and never revealed the correct answer. 4 of the 15 hotspot questions sit in chapter quizzes. The pattern was codebase-wide (zero `classList` usage, several raw `className =` writes including the element-builder helpers the widgets use).
- **[MAJOR]** A stale, detached "Next" button still advanced the quiz, and overshooting the last question cleared `#quiz-root` and rendered nothing — a blank page with no way out and the attempt never recorded. Reachable by a fast double-click on the final question.

Both are fixed and re-verified in a browser.

## Key Takeaways

- **Content accuracy held up under spot-checking.** Chapter 17 states all four infield-fly conditions correctly and flags where the knowledge base is uncertain ("not confirmed as universal — verify with the provincial association") rather than inventing an answer. Chapter 22 defines each statistic by what it answers *and* what it hides, and avoids asserting current league constants.
- **Testing the deployed artifact caught what tests and local checks did not.** 181 green assertions and a clean 24-chapter DOM audit both passed while hotspot feedback was completely dead, because the failure mode was a silent no-op rather than an exception. Exercising the real site is not a formality.
- **No image generation was available in this environment.** The visual system was therefore built to be complete without it: `tierHero` draws six illustrated SVG banners, tier `heroImage` values are `null` so nothing 404s, and `design/hero-image-prompts.md` carries six Grok Imagine prompts if raster art is wanted later. Adding art means dropping the file in and setting that tier's `heroImage`.
- **Deployment note:** the Netlify site is linked to the GitHub repo for continuous deployment (provider `github`, branch `main`, build command empty, publish directory `.`), so pushes to `main` deploy automatically.

## Artifacts

- `.claude/build-runs/2026-08-20T03-09-55/01-plan.md`
- `.claude/build-runs/2026-08-20T03-09-55/implementer-brief.md` and `brief-01b` … `brief-15` (16 chunk briefs)
- `.claude/build-runs/2026-08-20T03-09-55/log-brief-*.json`, `02-chunk*.log` (Grok run logs)
- `.claude/build-runs/2026-08-20T03-09-55/reviewer-fixes.md` (anchored corrections applied during review)
- `.claude/build-runs/2026-08-20T03-09-55/03-review.md`
- `.claude/build-runs/2026-08-20T03-09-55/00-summary.md`
- `docs/BUILD-PLAN.md` (the authoritative specification)

**Live:** https://homerun-learn-to-play.netlify.app
**Repo:** https://github.com/chassejs/homerun-learn-to-play
