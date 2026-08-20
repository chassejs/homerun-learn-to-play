# Implementer Brief — Question bank, Tier 4 (Select) → `src/questions-t4.js`

## HARD CONSTRAINT: NO SHELL ACCESS

Read, Write, Edit, and directory listing only. Do **not** run any command. A
shell call silently cancels this turn. The reviewer runs every check.

## Read first — all of these

1. **`.claude/build-runs/2026-08-20T03-09-55/brief-06-questions-conventions.md`**
   — the full conventions: coding standards, the question object shape, the
   twelve topics, difficulty calibration, the eight quality rules, the per-tier
   requirements, and the report-back format. **Everything there applies here.**
2. **`src/curriculum-t4.js`** — the four chapters you are writing questions for.
   Read every section of every chapter. Your questions test *this* content, and
   your `quizIds` must match the ids those chapters list, exactly.
3. **`src/questions-data.js`** — the skeleton, for the `register()` call shape.
4. **`svg.js`** — for any `hotspot` question, to confirm the hotspot ids exist.
5. The KB pages that `src/curriculum-t4.js` cites in its chapters, under
   `/Users/jschasse/knowledge-base/youth-baseball-canada/wiki/`.

## Deliverable

**One file: `src/questions-t4.js`**, calling `HRL_QUESTIONS.register([...])`
with questions for chapters **ch13, ch14, ch15, ch16**, all `tier: 'select'`.

- **≥12 questions per chapter → ≥48 in this file.** More is welcome; aim for 13–15
  per chapter so the IQ test and review deck have depth.
- Ids: `q1301`, `q1302`, … per chapter, contiguous from 01.
- The first 6–8 ids of each chapter **must be exactly that chapter's `quizIds`**
  as written in `src/curriculum-t4.js`. Read them; do not assume.
- Mean difficulty for this tier ≈ **6.4**, with genuine spread inside it.
- At least one `hotspot` question and one `order` question in this file.
- Topics skew `strategy`, `fielding`, `baserunning`, and `positions`.
- Include **≥4 `scenario` questions**.
- Include at least two `hotspot` questions on the `field` diagram — cutoff
  responsibility and steal coverage are natural fits.

## Acceptance

- File exists, is an ES5-safe IIFE, loads in Node, registers ≥48 questions.
- Every id is unique and follows the `q<CC><NN>` pattern.
- Every `chapter` value is one of ch13, ch14, ch15, ch16; every `tier` is `'select'`.
- Every `answer` is a valid index into its `choices`; correct answers are spread
  across indices rather than clustered.
- Every question has a non-empty, genuinely explanatory `explain`.
- Every `topic` is one of the twelve; every `difficulty` is an integer 1–10.
- Every `hotspot` `targets` id and `opts.hotspots` id exists in `svg.js`.
- Every chapter's `quizIds` all exist in this file with matching ids.
- Distractors are plausible misconceptions, not filler. No trick questions.
- No question requires knowledge from a chapter after its own.
- No TODOs, no `...` placeholders.

## Report back

Use the report-back format in the conventions brief.
