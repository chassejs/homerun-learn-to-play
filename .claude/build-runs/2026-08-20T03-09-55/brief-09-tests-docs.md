# Implementer Brief — Chunk 9 — tests, docs, and infrastructure adaptation

## HARD CONSTRAINT: NO SHELL ACCESS

Read, Write, Edit, and directory listing only. Do **not** run any command —
including the tests you are writing. The reviewer runs them. Write them to be
correct on the first read, because you cannot iterate against real output.

## Context

**Homerun Learn to Play** is now feature-complete. This chunk adds the test
suite, the docs, and the last infrastructure edits.

**Read before writing** — the tests must assert against the *real* APIs, not the
ones you expect:
- `.claude/build-runs/2026-08-20T03-09-55/01-plan.md` — the numbered acceptance
  criteria. Criteria 1–8 are what this test suite verifies.
- `progress.js`, `quiz.js`, `iq.js`, `placement.js`, `svg.js` — the modules under
  test. **Read each one's actual exports and signatures.**
- `src/curriculum-data.js` + `src/curriculum-t1.js` … `t6.js`
- `src/questions-data.js` + `src/questions-t1.js` … `t6.js`
- `src/glossary-data.js`
- `interactive.js` — for `HRL_INTERACTIVE.names()`
- `tests/versionCompat.test.js` — the existing test, for the house test style.
  **Match its style**: plain Node, zero dependencies, a tiny local assert helper,
  a per-file pass/fail summary, and `process.exit(1)` on any failure.
- `package.json` — `npm test` runs `node tests/run-all.js`.

## Coding standards for tests

- Plain Node (CommonJS `require`), **zero dependencies**, no test framework.
- Modern JS is fine in `tests/*.js` (these run only under Node ≥18) — the ES5
  restriction applies to app files, not tests.
- Each test file exports nothing and, when run directly, prints one line per
  assertion group and a final summary. `tests/run-all.js` requires each file in
  turn, aggregates, prints a total, and exits non-zero if anything failed.
- Loading the app modules under Node: they use the
  `var root = typeof window !== 'undefined' ? window : this;` shim and
  `module.exports`. Some depend on other globals being present first (e.g. the
  curriculum tier files need the skeleton loaded). **Write a small
  `tests/_load.js` helper** that requires the modules in the correct order,
  sets up a shared fake global object, and returns
  `{ HRL_CURRICULUM, HRL_QUESTIONS, HRL_GLOSSARY, HRL_PROGRESS, HRL_QUIZ, HRL_IQ, HRL_PLACEMENT, HRL_SVG }`.
  If a module genuinely cannot load headless, load it by reading the file and
  evaluating it in a `vm` context with a stub `window`/`document` — but prefer
  plain `require` where the shim allows it.

---

## The test files

### `tests/run-all.js`
Runs every `tests/*.test.js` in a stable order, prints a per-file and overall
summary, exits 1 on any failure.

### `tests/syntax.test.js` — acceptance criterion 1
Walks the repo root, `src/`, and `tests/`, and for **every** `.js` file runs a
parse check (`new (require('vm').Script)(source, { filename })`, or
`require('module').wrap` + `vm.compileFunction`). Excludes `node_modules` and
`.claude/`. Fails with the filename and the parse error. Also assert that no app
file (root + `src/`, excluding `sw.js` and `tests/`) contains ES6+ syntax the
project bans: a standalone `let `/`const ` declaration, `=>`, or a backtick
template literal. Report any violation with file and line.

### `tests/curriculum.test.js` — acceptance criterion 2
Assert:
- exactly 6 tiers, with keys `rookie, sandlot, diamond, select, elite, promind` in order 1–6
- exactly 24 chapters; ids `ch01`–`ch24`; `order` values 1..24 with no gaps or duplicates
- every `chapter.tier` resolves to a real tier; each tier holds exactly 4 chapters
- `prev`/`next` form one unbroken chain: `ch01.prev === null`, `ch24.next === null`,
  and for every other chapter `next` of N is N+1 and `prev` of N is N−1
- every `section.type` is one of the ten known types
- every `section.svg` names a real `HRL_SVG` builder, and calling that builder
  with the section's `opts` returns a string containing `<svg`
- every `section.widget` is in `HRL_INTERACTIVE.names()`
- every `terms` slug resolves in `HRL_GLOSSARY`
- per chapter: ≥8 sections, ≥2 `diagram`, ≥1 `interactive`, 3–5 `objectives`,
  6–8 `quizIds`, and the **last** section is `keypoints`
- no chapter has an empty `title`, `subtitle`, or `objectives` entry
- every `interactive` section's `opts` contains a non-empty `cases`, `items`,
  `parts`, `pairs`, `positions`, `frames`, or `steps` array

### `tests/questions.test.js` — acceptance criterion 3
Assert:
- ≥288 questions total
- all ids unique and matching `/^q\d{4}$/`
- every `chapter` resolves to a real chapter, and the id's chapter digits match
  that chapter's number
- every `tier` matches its chapter's tier
- every `topic` is one of the twelve
- every `difficulty` is an integer 1–10
- every `type` is one of `mc, tf, scenario, hotspot, order`
- for `mc`/`tf`/`scenario`: `choices` is an array of ≥2 strings with no
  duplicates, and `answer` is an integer index within it
- for `tf`: `choices` is exactly `['True','False']`
- for `hotspot`: `targets` is non-empty and every target id and every
  `diagram.opts.hotspots` id exists in the matching `HRL_SVG` vocabulary
- for `order`: `items` has 3–6 entries, all distinct
- every `explain` is a non-empty string of ≥20 characters
- ≥12 questions per chapter; ≥45 per tier; ≥15 per topic
- every chapter's `quizIds` all exist in the bank
- **answer-index balance**: across all `mc` questions with 4 choices, no single
  index holds more than 45% of the correct answers (catches a lazily-authored bank)

### `tests/quiz.test.js` — acceptance criterion 4
- **Property test, 200 randomized runs**: for a question with 4–5 choices,
  `shuffleQuestion` returns an object where
  `result.choices[result.answer] === input.choices[input.answer]`, the choice
  multiset is unchanged, and the input object is **not mutated**.
- `shuffleArray` preserves the multiset and does not mutate.
- `isCorrect` for all five types, including a wrong `order` submission that has
  the right elements in the wrong sequence.
- `scoreQuiz`: exact percentages; **exactly 75% passes**; 74% fails; 0 and 100 edges.
- `nextBox`: correct promotes, caps at 5; wrong resets to 1 from every box.
- `dueDateFor`: boxes 1–5 produce `now + [1,3,7,16,35] * 86400000`.

### `tests/placement.test.js` — acceptance criterion 5
- `nextDifficulty` clamps at 1 and 10 from both directions.
- `theta` returns 0 with no correct answers, and otherwise the mean of the
  hardest three correct.
- `recommendTier` returns an **integer 1..6** for a swept grid of
  `theta` × `selfTier` × every role — assert over the full cross-product.
- `role === 'coach'` never yields below 3.
- `selfReportTier` returns 1..6 for every combination of the `SELF_REPORT` options.
- A skipped placement yields tier 1.

### `tests/iq.test.js` — acceptance criterion 6
- `computeBbiq` is within 40..160 inclusive for: the empty array; all-correct;
  all-wrong; a mixed set; and an array whose difficulties are all 0 (assert no
  `NaN` and no throw).
- All-wrong yields exactly 40; all-correct yields exactly 160.
- `bandFor` at the exact boundaries: 69→Rookie, 70→Sandlot, 89→Sandlot,
  90→Diamond, 109→Diamond, 110→Select, 124→Select, 125→Elite, 139→Elite,
  140→Pro Mind, 160→Pro Mind.
- `nextDifficulty` clamps at 1 and 10.
- `pickQuestion` never returns an already-used id, prefers unused topics until 8
  distinct topics have appeared, and returns `null` on an exhausted pool.
- An end-to-end simulated 20-question run over the real bank produces 20 distinct
  questions covering ≥8 topics.

### `tests/progress.test.js` — acceptance criterion 7
- `mergeState` rules, each asserted individually: `bestScore` max; `attempts`
  summed; `completed` sticky-true; `completedAt` earlier wins; `badges` set union;
  `review` union by `qid` keeping the later `dueAt` with `misses` max;
  `iq.attempts` concatenated and deduped by `takenAt`; `iq.best` higher wins;
  `streak.longest` max; `placement` later `takenAt` wins; `settings` incoming wins
  per key.
- `mergeState` **does not mutate either argument** (deep-compare a structured
  clone taken before the call).
- `importPayload` returns `{ ok: false }` with a non-empty message and **does not
  throw** for: `null`, `undefined`, `'not json'`, `[]`, `{}`,
  `{ app: 'something-else', data: {} }`, and a payload with a `dataVersion` far
  in the future. `importText` behaves the same for malformed JSON text.
- Leitner helpers on `HRL_PROGRESS` produce the documented intervals.
- `exportFilename` returns `homerun-learn-progress-YYYY-MM-DD.json` for a fixed date.
- `exportPayload` has `app`, `appVersion`, `dataVersion`, `exportedAt`, `data`.

### `tests/versionCompat.test.js` — acceptance criterion 8
Already present. **Edit only the app-name strings** so they read "Homerun Learn
to Play" instead of the practice app's name. Do not change its logic.

---

## Docs and infrastructure edits

### `README.md`
Follow the house style of
`/Users/jschasse/Documents/JS Chassé/Projects/homerun-practice-app/README.md`.
Cover: what the app is; how to open it (double-click `index.html`, or
`npm start`); the placement quiz; the six tiers and 24 chapters (list them); how
chapter quizzes and the 75% pass mark work; the review deck and its schedule; the
Baseball IQ test and the BBIQ scale with its bands; that progress is stored in
this browser only, with no account and no cloud; export/import; accessibility
notes (keyboard operation, reduced motion); content provenance — that the
baseball content is written from the Youth Baseball Canada knowledge base and the
visual identity follows the Homerun Baseball Ottawa brand guidelines; how to run
the tests; and how to deploy to Netlify from GitHub (no build command, publish
directory `.`).

### `CHANGELOG.md`
A single `## 1.0 — 2026-08-19` entry describing the initial release: placement
quiz, 24 chapters across 6 tiers, 300+ question bank, chapter quizzes, spaced
repetition review, adaptive Baseball IQ test, SVG diagram library, 16 interactive
widgets, offline support, export/import.

### `changelog.js`
Seed the 1.0 entry so the in-app version history renders. **Read the file's
existing data shape and match it** — do not change its structure.

### `design/hero-image-prompts.md`
Six Grok Imagine prompts, one per tier, for optional raster hero art
(`brand/hero-tier-1.jpg` … `hero-tier-6.jpg`, 16:9). Each prompt must specify:
the Homerun Baseball Ottawa palette (navy `#062448`, red `#a3301f`, cream
`#f6f3ec`); golden-hour or soft natural light, never harsh floodlight; **rear
views or silhouettes of youth players, never identifiable faces**; empty diamonds
and gear still-lifes as alternatives; and clear space in the frame for a
cream/navy type overlay. Match each prompt's subject to its tier's theme (Rookie:
first glove, empty diamond at dawn → Pro Mind: notebook, radar gun, dusk
grandstand). Head the file with a note that these images are optional and the app
renders SVG fallbacks without them.

### `sw.js`
Replace the precache `ASSETS` array with the **real** current file list — read
the actual `<script>` and `<link>` tags in `index.html` and list every one, plus
`/`, `/index.html`, `/changelog.html`, `/styles.css`, `/manifest.json`, and the
brand assets the app actually references. **`/version.json` must NOT be in the
list** — it is the freshness probe and must always come from the network. Keep
the cache name `homerun-learn-v1` and the existing install/activate/fetch logic.

### `feedback.js`
Replace the `CATEGORIES` array with the learn-app set, keeping the same object
shape (`{ value, label }`) and the leading `{ value: '', label: 'Choose one…' }`:
`lesson` (Lesson content — wrong, unclear, or missing), `quiz` (A quiz question
is wrong or unclear), `iq` (Baseball IQ test), `diagrams` (Diagrams and
interactive exercises), `progress` (Progress, export, or import), `design`
(Design & layout), `feature` (Feature request), `question` (Question / need
help), `other` (Other). Change nothing else in the file.

---

## Acceptance for this chunk

- All eight test files plus `tests/run-all.js` and `tests/_load.js` exist and
  assert against the modules' **real** APIs.
- Every assertion listed above is present.
- `README.md`, `CHANGELOG.md`, and `design/hero-image-prompts.md` exist and are complete.
- `sw.js`'s `ASSETS` matches the real file set and excludes `/version.json`.
- `feedback.js` has the new categories and is otherwise unchanged.
- `tests/versionCompat.test.js` has only its app-name strings changed.
- No TODOs, no `...` placeholders, no skipped or commented-out assertions.

## Report back (required)

1. Every test file with the count and a one-line description of each assertion group.
2. The exact module-loading approach `tests/_load.js` uses, and any module that
   needed the `vm` fallback rather than plain `require`.
3. The final `ASSETS` array you wrote into `sw.js`.
4. Any API mismatch you found between this brief and the real modules, and how
   you resolved it — **report these even where you worked around them**, because
   a mismatch usually means a real bug in one side or the other.
5. Any assertion you could not write, and why.
