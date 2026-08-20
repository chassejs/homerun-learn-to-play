# Implementer Brief — Chunk 7 — `quiz.js`, `iq.js`, `placement.js`

## HARD CONSTRAINT: NO SHELL ACCESS

Read, Write, Edit, and directory listing only. Do **not** run any command. A
shell call silently cancels this turn. The reviewer runs every check.

## Context

**Homerun Learn to Play.** Spec: `docs/BUILD-PLAN.md` §6 (Assessment). Read it.

Already on disk — **read these before writing**:
- `index.html` — the render roots `#quiz-root`, `#iq-root`, `#review-root`.
- `styles.css` — the quiz/IQ classes: `.quiz-shell`, `.quiz-progress-dots`,
  `.quiz-dot` (+ `.correct`/`.wrong`/`.current`), `.quiz-prompt`, `.choice-list`,
  `.choice-btn` (+ `.selected`/`.correct`/`.wrong`), `.quiz-explain`,
  `.quiz-result`, `.score-ring`, `.bbiq-score`, `.bbiq-band`, `.topic-breakdown`,
  `.answer-review`. Use these; do not invent a parallel set.
- `progress.js` (`HRL_PROGRESS`) — **read its actual exported API** and use it for
  all persistence. In particular `recordQuiz`, `addMiss`, `recordReview`,
  `dueReviews`, `reviewCounts`, `BOX_INTERVALS`, `recordIq`, `setPlacement`.
- `shell.js` (`HRL_SHELL`) — `showView`, `openChapter`, `toast`, `on('viewchange')`.
- `svg.js` (`HRL_SVG`) — for `hotspot` questions and the IQ result radar.
- `src/curriculum-data.js` + the tier files (`HRL_CURRICULUM`).
- `src/questions-data.js` + the tier files (`HRL_QUESTIONS`).
- `uiModal.js` (`HRL_MODAL`).

## Coding standards

- One IIFE per file assigning exactly one `window.HRL_*` global. `'use strict';`.
- **ES5-safe only:** `var`, `function` expressions, string concatenation. No
  `let`/`const`, arrow functions, template literals, `class`, destructuring,
  default parameters, optional chaining, `Array.prototype.includes`, `Object.assign`.
- House banner comment at the top of each file.
- **The pure logic in all three files must be Node-testable.** Use the
  `var root = typeof window !== 'undefined' ? window : this;` shim, assign to
  `root.HRL_X`, guard every `document` access behind
  `typeof document !== 'undefined'`, and end each file with the
  `module.exports` shim. A test must be able to `require('./quiz.js')` and call
  `shuffleQuestion`, `scoreQuiz`, and the Leitner helpers with no DOM present.

---

## `quiz.js` — `HRL_QUIZ`

Runs chapter quizzes and the spaced-repetition review deck.

### Pure logic (must be exported and DOM-free)

- `shuffleQuestion(question, rng)` → returns a **new** object (never mutates the
  input) with `choices` reordered and `answer` updated to the index that now
  holds the originally-correct choice. For `order` questions it returns a
  `presentedItems` array (shuffled) plus the `correctOrder`. For `hotspot`
  questions it returns the question unchanged. `rng` is an optional
  `function() -> [0,1)` so tests can seed it; default `Math.random`.
  **This function is the single most likely source of a correctness bug in the
  whole app. The invariant is: `result.choices[result.answer] === question.choices[question.answer]`.**
- `shuffleArray(arr, rng)` → new shuffled array, Fisher–Yates, no mutation.
- `isCorrect(question, response)` → bool. Handles all five types:
  `mc`/`tf`/`scenario` compare an index; `hotspot` checks `response` is in
  `targets`; `order` compares the submitted array to `items` element-wise.
- `scoreQuiz(results)` → `{ correct, total, pct, passed }` where `results` is an
  array of booleans or `{correct:bool}` objects, `pct` is
  `Math.round(correct / total * 100)`, and `passed` is `pct >= PASS_PCT`.
- `PASS_PCT = 75` exported. **A score of exactly 75 passes.**
- `nextBox(box, correct)` → correct: `Math.min(box + 1, 5)`; wrong: `1`.
- `dueDateFor(box, nowMs)` → `nowMs + BOX_INTERVALS[box - 1] * 86400000`, reading
  `BOX_INTERVALS` from `HRL_PROGRESS` when available and falling back to the
  literal `[1, 3, 7, 16, 35]`.

### Quiz runner (DOM)

- `start(chapterId)` → builds the question set from the chapter's `quizIds`
  (resolved through `HRL_QUESTIONS.byId`), shuffles question order **and** each
  question's choices via `shuffleQuestion`, resets state, renders into
  `#quiz-root`. Missing ids are skipped with a `console.warn`, never a crash;
  if fewer than 3 questions resolve, render a friendly `.empty-state` instead.
- One question per screen. Show: chapter title, `.quiz-progress-dots` (one
  `.quiz-dot` per question, marked `.current`/`.correct`/`.wrong` as you go), the
  `.quiz-prompt`, and the answer UI for the question's type:
  - `mc`/`tf`/`scenario` → `.choice-list` of `.choice-btn` **`<button>` elements**
  - `hotspot` → the `HRL_SVG` diagram from `question.diagram`, with the
    `[data-hotspot]` groups made clickable and keyboard-activatable
  - `order` → a reorderable list operable by mouse **and** by keyboard
    (up/down buttons on each item, not drag-only)
- On answer: lock the controls, mark the chosen `.choice-btn` `.correct` or
  `.wrong`, always reveal the correct one, show `.quiz-explain` with the
  question's `explain`, and announce the result through the existing
  `aria-live` region. Then a "Next" button (auto-focused).
- On a wrong answer call `HRL_PROGRESS.addMiss(question.id, Date.now())`.
- At the end render `.quiz-result`: a `.score-ring` with the percentage,
  pass/fail messaging against 75%, any badges newly awarded, a full
  `.answer-review` list (every question with the learner's answer, the correct
  answer, and the explanation), and buttons for "Retake", "Back to chapter", and
  "Next chapter" when one exists. Call `HRL_PROGRESS.recordQuiz(chapterId, pct, passed)`
  exactly once per completed attempt. Award `perfect-quiz` at 100%.

### Review deck (DOM)

- `renderReviewDeck()` → renders `#review-root`: the due count from
  `HRL_PROGRESS.reviewCounts(Date.now())`, a "Start review" button, and, when
  nothing is due, a `.empty-state` explaining that missed questions return on a
  schedule and showing when the next one is due.
- `startReview()` → runs the due questions through the same single-question UI,
  calling `HRL_PROGRESS.recordReview(qid, correct, Date.now())` for each, and
  ends with a short summary (how many reviewed, how many promoted, how many
  retired). No pass/fail — review is not scored.

---

## `iq.js` — `HRL_IQ`

The adaptive Baseball IQ test.

### Pure logic (exported, DOM-free)

- `TEST_LENGTH = 20`, `START_DIFFICULTY = 5`, `STEP_UP = 1.5`, `STEP_DOWN = 2`
- `nextDifficulty(current, correct)` → `clamp(current + (correct ? STEP_UP : -STEP_DOWN), 1, 10)`
- `pickQuestion(pool, targetDifficulty, usedIds, usedTopics)` → the unused
  question nearest the target difficulty, **preferring one whose topic is not yet
  used** until at least 8 distinct topics have appeared, then purely by
  difficulty proximity. Ties break deterministically by id. Returns `null` when
  the pool is exhausted.
- `computeBbiq(presented)` → `presented` is an array of
  `{ difficulty, correct, topic }`.
  ```
  totalDifficulty   = sum of every presented question's difficulty
  correctDifficulty = sum of difficulty over the correct ones
  raw  = totalDifficulty > 0 ? correctDifficulty / totalDifficulty : 0
  bbiq = Math.round(40 + 120 * raw)
  ```
  **Must return a value in 40..160 inclusive for every input, including an empty
  array and an all-zero-difficulty array — no divide-by-zero, no NaN.**
- `bandFor(bbiq)` → exact boundaries:
  `< 70` → `'Rookie'`; `70–89` → `'Sandlot'`; `90–109` → `'Diamond'`;
  `110–124` → `'Select'`; `125–139` → `'Elite'`; `>= 140` → `'Pro Mind'`.
  Export `BANDS` as an array of `{ name, min, max }` so tests can iterate it.
- `topicBreakdown(presented)` → `{ topic: { correct, total, pct } }`.

### Test runner (DOM)

- `renderIntro()` → `#iq-root`: what the test is, that it adapts, that there is
  no feedback until the end, the timer toggle (reads
  `HRL_PROGRESS.getSetting('timerEnabled')`), a "Start" button, and the attempt
  history — best BBIQ, a `HRL_SVG.bar` or `timeline` of past scores, and a list
  of past attempts with dates.
- `start()` → 20 adaptive questions, one per screen, **no per-question feedback**.
  Progress dots show answered/unanswered only — never correct/wrong.
- Optional 45-second per-question timer when `timerEnabled`; on expiry the
  question is recorded incorrect and the test advances. A visible countdown and a
  "relaxed mode" note when the timer is off. The timer must respect
  `prefers-reduced-motion` (no spinning animation) and must be cleared on view change.
- Result card: `.bbiq-score` with the number, `.bbiq-band` with the band name and
  a one-line description, a `HRL_SVG.radar` of `topicBreakdown`, the three
  strongest and three weakest topics **each linking to the chapters that cover
  that topic** (resolve via `HRL_CURRICULUM` + the questions' `chapter` fields),
  a full `.answer-review`, and "Retake" / "Back to home" buttons.
- Call `HRL_PROGRESS.recordIq({ takenAt, bbiq, band, byTopic, answers })` once
  per completed test. Missed questions here also go to the review deck via
  `HRL_PROGRESS.addMiss`.

---

## `placement.js` — `HRL_PLACEMENT`

Onboarding placement.

### Pure logic (exported, DOM-free)

- `SELF_REPORT` — the three questions as data:
  1. **Role** — `player`, `parent`, `coach`, `fan` ("I want to follow a game I'm watching")
  2. **Experience** — `never`, `one-season`, `few-years`, `many-years`, `high-level`
  3. **Goal** — `follow-a-game`, `play-better`, `coach-a-team`, `strategy-and-analytics`
  Each option carries a `tierHint` (1–6).
- `selfReportTier(answers)` → a 1–6 number blending the three hints
  (experience weighted highest).
- `PROBE_LENGTH = 8`, `START_DIFFICULTY = 4`, `STEP_UP = 1.5`, `STEP_DOWN = 2`
- `nextDifficulty(current, correct)` → same clamped step as `iq.js`.
- `theta(results)` → the mean difficulty of the **hardest three correctly
  answered** questions; `0` when none were correct.
- `recommendTier(thetaValue, selfTier, role)` →
  ```
  tierScore = 0.65 * (thetaValue / 1.6) + 0.35 * selfTier
  tier      = clamp(Math.round(tierScore), 1, 6)
  if (role === 'coach') tier = Math.max(tier, 3)   // coaches need the mechanics chapters
  return tier
  ```
  **Must return an integer 1..6 for every input combination**, including
  `theta = 0`, `theta = 10`, and every role.
- `SKIP_TIER = 1` — skipping placement recommends tier 1.

### Runner (DOM)

- `start()` → opens placement. Render it in `#quiz-root` and show that view (or
  in an `HRL_MODAL` — pick one and be consistent), with a **visible skip control
  on every screen** reading "Start from the very beginning".
- Three self-report screens, then eight adaptive probe questions drawn from the
  whole bank via the same `pickQuestion` logic. **No right/wrong feedback during
  the probe** — this is placement, not a test, and telling a newcomer they were
  wrong eight times is the wrong first experience. Say so in the intro copy:
  "There are no wrong answers here — this just finds your starting point."
- Result screen: the recommended tier with its name and blurb, a plain-language
  reason ("you're comfortable with the rules, so we'll start you at Diamond"),
  the explicit reassurance that **every chapter stays unlocked and they can start
  anywhere**, and two buttons — "Start at <tier name>" (opens that tier's first
  chapter) and "Show me all the chapters" (opens My Path).
- Persist with `HRL_PROGRESS.setPlacement({...})`, then `HRL_SHELL.renderHome()`.
- `restart()` → re-runs placement (bound from the Help view's "Re-run placement").
- `skip()` → records `recommendedTier: SKIP_TIER`, `done: true`, closes.

---

## Acceptance for this chunk

- All three files exist, are ES5-safe single IIFEs, and each `require()`s cleanly
  under Node with no `window`, no `document`, and no `localStorage`.
- `HRL_QUIZ.shuffleQuestion` satisfies
  `result.choices[result.answer] === input.choices[input.answer]` and does not
  mutate its input.
- `HRL_QUIZ.scoreQuiz` passes at exactly 75%.
- `HRL_IQ.computeBbiq` returns 40..160 for every input including the empty array.
- `HRL_IQ.bandFor` matches the boundaries exactly at 69/70, 89/90, 109/110,
  124/125, 139/140.
- `HRL_PLACEMENT.recommendTier` returns an integer 1..6 for every combination,
  and never below 3 for `role === 'coach'`.
- Every DOM control is a real `<button>`/`<input>`; `order` and `hotspot`
  questions are fully operable by keyboard alone.
- No TODOs, no `...` placeholders, no stubbed function bodies.

## Report back (required)

1. The complete exported API of each of the three modules, with signatures and
   return shapes — separating the DOM-free pure functions from the DOM ones.
2. The exact `SELF_REPORT` data structure including every option's `tierHint`.
3. Every function you call on `HRL_PROGRESS`, `HRL_SHELL`, `HRL_CURRICULUM`,
   `HRL_QUESTIONS`, `HRL_SVG`, and `HRL_MODAL`, with the signature you assumed.
4. Every CSS class you emit that is **not** already in `styles.css`.
5. Any deviation from this brief, and why.
