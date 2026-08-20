## Goal

Build **Homerun Learn to Play** — a progressive, interactive baseball curriculum app for Homerun Baseball Ottawa. It is a single-page, offline-capable static web app (vanilla HTML/CSS/JS, no build step) that takes a learner from "I have never seen a game" to "I can read a scouting report and grade a tool on the 20–80 scale." An adaptive placement quiz sets a recommended starting tier; 24 chapters across 6 tiers teach through prose, SVG diagrams, and interactive widgets; each chapter ends in a retention quiz whose misses feed a spaced-repetition review deck; a separate adaptive Baseball IQ test scores the learner on a 40–160 BBIQ scale with a per-topic radar breakdown. Progress lives in `localStorage` with export/import backup. The full authoritative specification is `docs/BUILD-PLAN.md` in this repo — this plan governs execution and acceptance; that document governs content and detail. The finished app deploys to Netlify from a GitHub repo with no build command.

## Constraints

- **No build step, no bundler, no framework, no npm runtime dependencies.** `npm run build` is a no-op echo; Netlify publishes the repo root.
- **No ES modules.** Classic `<script>` tags only; each file exposes exactly one `window.HRL_*` global via an IIFE. The app must load correctly from `file://` as well as over HTTP.
- **ES5-safe syntax in all app files** (`var`, `function`; no arrow functions, `let`/`const`, template literals, or class syntax). `sw.js` and any `scripts/*.mjs` may use modern syntax.
- **No network at runtime** except the existing `version.json` freshness probe in `appUpdates.js`. No CDNs, no Google Fonts, no analytics.
- **Brand envelope is fixed** by `/Users/jschasse/knowledge-base/homerun-ottawa/brand/brand-guidelines.md`, restated in `docs/BUILD-PLAN.md` §3. The five brand hex values (`#062448`, `#14294d`, `#a3301f`, `#8d2418`, `#f6f3ec`) must not be altered, and the six teaching colours must never be replaced by brand colours.
- **Do not recreate the already-present shared infrastructure**: `version.js`, `versionCompat.js`, `appUpdates.js`, `uiModal.js`, `feedback.js`, `changelog.js`, `changelog.html`, `sw.js`, `netlify.toml`, `_redirects`, `deploy.sh`, `.gitignore`, and `brand/`. These are copied from `homerun-practice-app` and already renamed to the `HRL_` namespace with storage key `homerun-learn/progress/v1`. Adapt them only where §8 of the spec says to.
- **Content accuracy:** all baseball rules, mechanics, and division-specific variations must be written from the Youth Baseball Canada knowledge base at `/Users/jschasse/knowledge-base/youth-baseball-canada/wiki/` (63 concept pages, 8 skill-roadmap syntheses). Do not invent rules, limits, or numbers. Where a rule differs between Little League and Baseball Canada pathways, state the split explicitly.
- **No image generation is available.** The visual system must be complete using programmatic SVG plus the existing brand assets in `brand/`. Optional raster hero art must degrade to an SVG fallback, never a broken image.
- **Grok has no shell access in this run** (headless `Execute` tool is unavailable on this CLI version). Grok uses Read, Write, Edit, and directory listing only, and must not attempt any command — including verification commands. The reviewer runs every syntax check and test.
- **Accessibility is gated, not optional:** semantic landmarks, real focusable controls, `aria-live` quiz announcements, `role="img"` + `<title>` + `<desc>` on every diagram, colour never the sole carrier of meaning, 44×44px touch targets, `prefers-reduced-motion` honoured.
- Youth imagery is limited to the approved brand assets; no identifiable child faces.

## Step-by-Step Implementation Plan

Implementation proceeds in nine sequential Grok turns (chained with `--continue`), each ending with Grok reporting the exact identifiers it defined so the next brief can reference them precisely. The reviewer runs `node --check` on every new file after each chunk before the next begins.

1. **Chunk 1 — Shell and design system.** Write `styles.css` (brand tokens per spec §3, full component system, print stylesheet, reduced-motion and focus-visible rules), `index.html` (app bar with crest + wordmark, nav, and all eight view containers `view-home`, `view-path`, `view-chapter`, `view-quiz`, `view-iq`, `view-review`, `view-glossary`, `view-help`; script tags in dependency order), `manifest.json`, `package.json`, and `version.json`.
2. **Chunk 2 — Diagram library.** Write `svg.js` exposing `HRL_SVG` with the twelve builders in spec §4 (`field`, `strikeZone`, `basePaths`, `positionGrid`, `swingSequence`, `throwSequence`, `countMatrix`, `sprayChart`, `scaleGauge`, `radar`, `bar`, `timeline`). Every builder returns an SVG string, touches no DOM and no global state, and emits `role="img"`, `<title>`, and `<desc>`. Report the exported builder names, their options, and the hotspot ids `field` exposes.
3. **Chunk 3 — State and navigation.** Write `progress.js` (`HRL_PROGRESS`: the state shape in spec §7, all `localStorage` access try/caught with in-memory degradation, badges, streak, export/import merge semantics) and `shell.js` (`HRL_SHELL`: nav, view switching, first-run routing to placement, deep-link into a chapter).
4. **Chunk 4 — Curriculum tiers 1–3.** Write `src/curriculum-data.js` defining `HRL_CURRICULUM` with the six tiers and chapters 1–12, authored from the KB concept pages named in spec §5. Each chapter: 8–14 sections, ≥2 diagram sections, ≥1 interactive section, 3–5 objectives, a closing `keypoints` recap, and 6–8 `quizIds`.
5. **Chunk 5 — Curriculum tiers 4–6 and glossary.** Append chapters 13–24 (splitting into `src/curriculum-t4t6.js` if the single file would exceed ~3000 lines) and write `src/glossary-data.js` (`HRL_GLOSSARY`, ~120 terms) covering every term referenced by a `terms` section.
6. **Chunk 6 — Question bank.** Write `src/questions-data.js` (`HRL_QUESTIONS`): 300+ questions meeting the distribution rules in spec §6.1 — ≥12 per chapter, ≥45 per tier, ≥15 per topic, unique ids, every `answer` index valid, every question carrying a non-empty `explain` and a KB `source` slug.
7. **Chunk 7 — Assessment engines.** Write `quiz.js` (`HRL_QUIZ`: chapter quiz runner, choice shuffling that correctly relocates the answer index, 75% pass threshold, Leitner review scheduling at 1/3/7/16/35 days), `iq.js` (`HRL_IQ`: 20-question adaptive test, BBIQ formula and band mapping from spec §6.4, result card with radar and topic strengths/weaknesses, attempt history), and `placement.js` (`HRL_PLACEMENT`: 3 self-report + 8 adaptive questions, the blended tier formula, the coach floor at tier 3, skippable and re-runnable).
8. **Chunk 8 — Reader and widgets.** Write `learn.js` (`HRL_LEARN`: path view with tier accordions and progress rings, chapter reader rendering every section type, prev/next, quiz CTA) and `interactive.js` (`HRL_INTERACTIVE`: the sixteen widgets in spec §9, each mouse-, touch-, and keyboard-operable, each reporting completion).
9. **Chunk 9 — Tests, docs, and infra adaptation.** Write the eight `tests/*.test.js` files covering acceptance criteria 1–8 below; write `README.md`, `CHANGELOG.md`, and `design/hero-image-prompts.md`; update `sw.js`'s precache `ASSETS` list to the real file set (keeping `/version.json` out of it), replace `feedback.js`'s categories with the learn-app set, seed the 1.0 entry in `changelog.js`, and update the app-name strings in `tests/versionCompat.test.js`.
10. **Reviewer verification.** Run `npm test` and the manual browser checks (criteria 9–15). Fix or re-brief any failure; do not record failures as known issues.
11. **Deploy.** Commit, create `chassejs/homerun-learn-to-play` on GitHub and push, then create and link a Netlify site publishing from the repo root with an empty build command, and verify the live URL loads a chapter and a quiz with zero console errors.

## File List

**To create**

| Path | Responsibility |
|---|---|
| `index.html` | SPA shell: app bar, nav, all eight view containers, script tags in dependency order |
| `styles.css` | Brand tokens, full component system, responsive layout, print, accessibility rules |
| `manifest.json` | PWA manifest — name "Homerun Learn to Play", theme `#062448`, brand icons |
| `package.json` | Name, no-op build, `start`, `test` scripts; `engines.node >= 18` |
| `version.json` | `{ "version": "1.0", "released": "2026-08-19" }` — update-check freshness probe |
| `README.md` | What it is, how to run, how to deploy, content provenance |
| `CHANGELOG.md` | 1.0 release entry |
| `svg.js` | `HRL_SVG` — twelve pure SVG-string diagram builders |
| `progress.js` | `HRL_PROGRESS` — localStorage state, badges, streak, export/import merge |
| `shell.js` | `HRL_SHELL` — nav, view switching, first-run routing |
| `learn.js` | `HRL_LEARN` — path view and chapter reader / section renderer |
| `interactive.js` | `HRL_INTERACTIVE` — the sixteen interactive widgets |
| `quiz.js` | `HRL_QUIZ` — chapter quiz engine and spaced-repetition review deck |
| `iq.js` | `HRL_IQ` — adaptive Baseball IQ test and BBIQ scoring |
| `placement.js` | `HRL_PLACEMENT` — onboarding placement quiz and tier recommendation |
| `src/curriculum-data.js` | `HRL_CURRICULUM` — 6 tiers, chapters 1–12 (and 13–24 if not split) |
| `src/curriculum-t4t6.js` | Chapters 13–24, only if chunk 5 needs the split |
| `src/questions-data.js` | `HRL_QUESTIONS` — 300+ tagged questions |
| `src/glossary-data.js` | `HRL_GLOSSARY` — ~120 baseball terms |
| `design/hero-image-prompts.md` | Six Grok Imagine prompts for optional tier hero art |
| `tests/curriculum.test.js` | Structure and cross-reference integrity of the curriculum |
| `tests/questions.test.js` | Question-bank distribution and answer validity |
| `tests/quiz.test.js` | Shuffle-preserves-answer property test, scoring, Leitner scheduling |
| `tests/placement.test.js` | Adaptive stepping, tier mapping, coach floor |
| `tests/iq.test.js` | BBIQ bounds, band mapping, zero-difficulty guard |
| `tests/progress.test.js` | Import merge semantics and malformed-input rejection |
| `tests/syntax.test.js` | Parse check over every `.js` file in the repo |

**To modify**

| Path | Change |
|---|---|
| `sw.js` | Replace the precache `ASSETS` list with the real file set; keep `/version.json` excluded |
| `feedback.js` | Replace drill/plan feedback categories with the learn-app set |
| `changelog.js` | Seed the 1.0 release entry |
| `tests/versionCompat.test.js` | Update app-name strings to "Homerun Learn to Play" |

**Do not touch:** `version.js`, `versionCompat.js`, `appUpdates.js`, `uiModal.js`, `changelog.html`, `netlify.toml`, `_redirects`, `deploy.sh`, `.gitignore`, `brand/*`, `docs/BUILD-PLAN.md`.

## Acceptance Criteria

1. **Syntax.** `node --check` passes on every `.js` file in the repo root, `src/`, and `tests/`, with zero failures.
2. **Curriculum integrity.** `tests/curriculum.test.js` passes: exactly 6 tiers and 24 chapters; every `chapter.tier` resolves to a real tier; `order` is 1..24 with no gaps or duplicates; `prev`/`next` form one unbroken chain from chapter 1 to chapter 24; every `section.type` is a known type; every `section.svg` names a real `HRL_SVG` builder; every `section.widget` names a registered `HRL_INTERACTIVE` widget; every `terms` entry resolves in `HRL_GLOSSARY`; every chapter has ≥8 sections, ≥2 diagram sections, ≥1 interactive section, ≥3 objectives, and 6–8 `quizIds`.
3. **Question bank.** `tests/questions.test.js` passes: ≥288 questions; all ids unique; every `chapter` field resolves to a real chapter; every `answer` is a valid index into `choices`; every question has a non-empty `explain`; ≥12 questions per chapter; ≥45 per tier; ≥15 per topic; every `difficulty` within 1–10; every `type` is one the quiz renderer handles.
4. **Quiz engine.** `tests/quiz.test.js` passes: over 200 randomized runs, shuffling a question's choices always relocates `answer` to the index actually holding the correct choice; scoring is exact; a score of exactly 75% passes; Leitner scheduling yields due intervals of 1, 3, 7, 16, and 35 days on successive correct answers and resets to box 1 on a miss.
5. **Placement.** `tests/placement.test.js` passes: the adaptive step clamps difficulty to 1..10 at both ends; the blended tier formula returns an integer 1..6 for every input combination including all-wrong and all-right; the coach floor holds at tier 3; a skipped placement yields tier 1.
6. **IQ scoring.** `tests/iq.test.js` passes: BBIQ is always within 40..160 inclusive including the all-wrong, all-right, and zero-total-difficulty edges (no divide-by-zero); band boundaries map exactly as specified (<70 Rookie, 70–89 Sandlot, 90–109 Diamond, 110–124 Select, 125–139 Elite, ≥140 Pro Mind).
7. **Progress merge.** `tests/progress.test.js` passes: importing merges rather than replaces — higher `bestScore` wins, `completed` is sticky-true, review entries merge by `qid` keeping the later `dueAt`, IQ attempts concatenate and dedupe by `takenAt`; malformed or foreign JSON is rejected with a clear message and never throws.
8. **Version compat.** The existing `tests/versionCompat.test.js` passes, and `npm test` runs all eight test files and exits 0.
9. **Zero console errors.** Serving the app and exercising it in a browser produces no console errors or warnings on first load, after placement, on each of the 24 chapters, through a complete chapter quiz, through a complete IQ test, and after an export followed by an import.
10. **Every chapter renders.** All 24 chapters render end to end with no missing diagram, no broken image, and no `undefined`, `null`, or `[object Object]` text visible in the DOM.
11. **Widgets work.** Each of the sixteen interactive widgets can be completed with the mouse and, independently, with the keyboard alone.
12. **File protocol.** Opening `index.html` directly via `file://` loads and runs the app with no module or CORS errors.
13. **Persistence round-trip.** Progress survives a reload; exporting, clearing storage, and importing restores chapter completion, best scores, review deck, and IQ history exactly.
14. **Responsive.** At 360px, 768px, and 1440px viewport widths the layout has no horizontal body scroll and no overlapping or clipped controls.
15. **Offline.** The service worker registers, and a second load succeeds with the network disabled.
16. **Brand compliance.** The five brand hex values appear unaltered in `styles.css`; teaching colours are used only in field diagrams; no external font or asset URL appears anywhere in the codebase.
17. **Deployment.** The repo is pushed to `chassejs/homerun-learn-to-play` on GitHub, a Netlify site is created and linked publishing from the repo root with an empty build command, and the live URL loads the home view, one chapter, and one quiz with zero console errors.
