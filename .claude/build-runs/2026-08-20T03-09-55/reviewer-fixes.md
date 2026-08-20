# Reviewer-applied corrections

Small, anchored corrections applied during the per-chunk review passes. Each was
verified by re-running the relevant check. Anything larger than a few lines went
back to Grok as a corrective brief instead.

| # | Chunk | File | Defect | Fix | Verified by |
|---|---|---|---|---|---|
| 1 | 1 | `index.html` | Feedback button used `id="help-feedback-btn"`, but `appUpdates.js` binds `readme-feedback-btn` — the Help view's Send feedback button would have been dead. | Renamed the id to `readme-feedback-btn`. | `grep` for the id in both files |
| 2 | 2 | `svg.js` | Root `<svg>` carried `height="auto"`, which is not a valid SVG length. Every diagram logged `Error: <svg> attribute height: Expected length, "auto"` in the browser console — 15 errors on a page with 15 diagrams. **This came from an error in the chunk-2 brief, not from Grok.** | Removed the `height="auto"` attribute from the root element builder (single anchored replacement, uniqueness asserted). | `node --check`, re-render, browser console clean of the error |
| 3 | 2 | `styles.css` | With the height attribute gone, nothing declared the diagram aspect behaviour explicitly. | Added a `.hrl-svg { display:block; width:100%; max-width:100%; height:auto; }` rule with a comment explaining why the attribute is absent. | Visual check of rendered diagrams |
| 4 | 5 | `src/glossary-data.js` | Missing comma after the `short:` property of the `courtesy-runner` entry (line 2141) — a hard `SyntaxError` that stopped the whole file, and with it the glossary, from loading. | Scanned every property line in the file for the same pattern (property line, no trailing comma, followed by another property) and added the one missing comma. | `node --check`, then full glossary integrity run: 205 entries, 0 unresolved slugs, 0 bad refs |
| 5 | 10 | `src/curriculum-data.js` | All six tiers pointed `heroImage` at `brand/hero-tier-N.jpg`. Those raster files do not exist and cannot be generated in this build, so every chapter load fired a 404 — six console errors, against an acceptance criterion of zero. The `onerror` fallback worked, but a handled 404 is still a logged error. | Set all six `heroImage` values to `null` with an inline comment naming the path to restore if raster art is ever added. `mountHero` in `learn.js` already renders the SVG hero directly when `heroImage` is empty, so nothing else changed. | `node --check`, tier dump, browser console clean of hero 404s |
| 6 | scaffold | `tests/versionCompat.test.js` | **My scaffolding error, not Grok's.** The initial scaffold copied the shared infrastructure from `homerun-practice-app` but iterated only over repo-root files, so the one file inside `tests/` was silently skipped. The chunk-9 brief then told the implementer to "update the app-name strings" in a file that did not exist. | Copied the file across with the same `HRP_` → `HRL_` and app-name rewrite as the other shared files. Its last two tests exercised `practice.js`'s `normalizePracticePlan`, which has no counterpart here — replaced that section with two equivalent tests against `progress.js` (`exportPayload` carries the fields the compatibility layer reads; `mergeState` keeps the higher best score and sticky completion without mutating its inputs). | `node tests/versionCompat.test.js` — 22 passed, 0 failed |
| 7 | scaffold | `changelog.js` | The copied file kept the Practice Planner's 1.0 release notes verbatim — "split out of Homerun Lineup v2.2", "368 drills", "Sequential drills or multi-station mode". The version and date happened to be right, so the version-consistency test passed and the wrong content would have shipped into the in-app What's-New modal and `changelog.html`. | Replaced the entry's title and all eight highlights with this app's actual 1.0 feature set. Structure and version metadata untouched. | `node --check`, `tests/versionCompat.test.js` still 22/22 |

## Post-deploy finding (chunk 14)

Found by driving the **deployed** site rather than the local build. Two related
bugs in the question-runner advancement path, sent back to the implementer:

1. **A detached "Next" button still advances the quiz.** After a click the runner
   re-renders and the old button leaves the document (`document.body.contains(btn)`
   is `false`), but its handler closes over runner state, so invoking it again on
   the stale node still increments the index. Measured: one detached button
   advanced Q2→Q3 and then Q3→Q4.
2. **Overshooting the last question renders nothing.** Past the end the runner
   clears `#quiz-root` and renders no result — measured `innerHTML.length === 0`,
   zero buttons, zero dots. The learner is stranded on a blank page inside the
   quiz view, and the attempt is never recorded (`attempts: 0`) even though
   answers were given and misses reached the review deck.

Reachable by an ordinary fast double-click on "Next": the first click re-renders,
the second lands on the freshly-inserted button at the same position; on the last
question that second advance overshoots.

Fix requested: a monotonic render token so stale handlers are inert, a `finished`
flag so the result screen renders exactly once and `recordQuiz`/`recordIq` fire
exactly once, an explicit bounds branch that renders the result rather than
clearing the root, and a never-empty safety net. Same guards applied to `iq.js`.

## Post-deploy finding (chunk 15)

`HRL_SVG` emits hotspots as SVG `<g>` elements. On an SVG element `className` is
a read-only `SVGAnimatedString`, not a writable string, so assigning to it is
**silently ignored** — no exception, no effect. Measured on the deployed site:

```
node.tagName               -> "g"
typeof node.className      -> "object"  ([object SVGAnimatedString])
node.className = (node.className || '') + ' selected correct'   // no error
node.getAttribute('class') -> "hrl-hotspot"                      // UNCHANGED
```

`quiz.js` `markHotspots()` used exactly that pattern, so **answering a hotspot
question produced no visual feedback at all** — no correct/wrong marking, and no
reveal of the right answer. 15 hotspot questions exist; 4 sit in chapter quizzes
(ch11, ch12, ch13, ch14), so ordinary learners hit it.

The pattern is codebase-wide: zero uses of `classList` in `quiz.js`, `iq.js`, or
`interactive.js`, and several raw `className =` assignments including the
`k === 'class'` branch of each file's element-builder helper — which widgets use
to mark hotspots too.

Fix requested: one SVG-safe `getClass`/`setClass`/`addClass`/`removeClass` helper
per file, every call site routed through it, hotspot feedback restored (including
revealing the correct hotspot on a wrong answer), matching CSS with a non-colour
cue, and pure-logic tests for the helpers.
