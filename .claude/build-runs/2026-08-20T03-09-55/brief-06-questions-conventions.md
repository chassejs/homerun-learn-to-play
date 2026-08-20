# Question-Bank Conventions — read before any `brief-06x` chunk

## HARD CONSTRAINT: NO SHELL ACCESS

Read, Write, Edit, and directory listing only. Do **not** run any command. A
shell call silently cancels the turn. The reviewer runs every check.

## What the question bank is for

`HRL_QUESTIONS` feeds three consumers:

1. **Chapter quizzes** — the 6–8 questions each chapter lists in its `quizIds`.
   These test the chapter the learner just read. Pass mark is 75%.
2. **The adaptive Baseball IQ test** — 20 questions drawn across all tiers by
   difficulty, covering ≥8 topics. This is why the bank needs far more questions
   than the chapter quizzes consume, and why `difficulty` must be honest.
3. **The spaced-repetition review deck** — every missed question returns later,
   so every `explain` has to teach, not just confirm.

## Coding standards

- One IIFE per file. `'use strict';`. House banner comment.
- **ES5-safe only:** `var`, `function` expressions, string concatenation. No
  `let`/`const`, arrow functions, template literals, `class`, destructuring,
  default parameters, optional chaining, `Array.prototype.includes`, `Object.assign`.
- Node-loadable:
  ```js
  var root = typeof window !== 'undefined' ? window : this;
  ```
  assign to `root.HRL_QUESTIONS`; end with
  ```js
  if (typeof module !== 'undefined' && module.exports) { module.exports = root.HRL_QUESTIONS; }
  ```

## Skeleton — `src/questions-data.js`

```js
root.HRL_QUESTIONS = {
  items: [],                          // filled by the tier files
  register: function (arr) { … },     // idempotent by id; keeps items sorted by id
  byId: function (id),
  byChapter: function (chapterId),    // array, in id order
  byTier: function (tierKey),
  byTopic: function (topic),
  byDifficulty: function (min, max),
  topics: function (),                // sorted unique topic list
  count: function ()
};
```

`register()` replaces rather than duplicates on a repeated id.

## Question object shape (exact)

```js
{
  id: 'q1701',            // q + 2-digit chapter number + 2-digit index, from 01
  chapter: 'ch17',
  tier: 'elite',
  topic: 'rules',
  difficulty: 7,          // 1–10 integer
  type: 'mc',             // mc | tf | scenario | hotspot | order
  prompt: 'A fair fly ball …',
  choices: ['…', '…', '…', '…'],   // mc: 3–5; tf: exactly ['True','False']; scenario: 3–5
  answer: 2,              // index into choices (mc/tf/scenario)
  explain: '…',           // 1–3 sentences: WHY, teaching the idea, not restating the answer
  source: 'infield-fly-rule'       // KB page slug the fact came from, or '' if foundational
}
```

**Type-specific extra fields**

- `hotspot` — replaces `choices`/`answer` with:
  ```js
  diagram: { svg: 'field', opts: { positions: true, hotspots: [...] } },
  targets: ['ss'],        // one or more acceptable hotspot ids
  ```
  Every id in `targets` and in `opts.hotspots` must exist in the corresponding
  `HRL_SVG` vocabulary (`POSITIONS`, `FIELD_PARTS`, `ZONE_CELLS`, `COUNT_CELLS`,
  `SWING_FRAMES`, `THROW_FRAMES`). **Read `svg.js` to confirm.**
- `order` — replaces `choices`/`answer` with:
  ```js
  items: ['first', 'second', 'third', 'fourth']   // authored in CORRECT order
  ```
  The quiz engine shuffles them for presentation. 3–6 items.

## Topics (use only these twelve strings)

`rules`, `field`, `positions`, `hitting`, `pitching`, `fielding`,
`baserunning`, `strategy`, `safety`, `scoring`, `analytics`, `scouting`

## Difficulty calibration

Difficulty is **absolute across the whole app**, not relative to the chapter —
the adaptive engines depend on this. Rough anchors:

| Difficulty | Means |
|---|---|
| 1–2 | A total newcomer could answer after Chapter 1–2 |
| 3–4 | Anyone who has played or watched a season |
| 5–6 | A competent rec-league player or engaged parent |
| 7–8 | A serious travel/high-school player or coach |
| 9–10 | A rules-savvy coach, umpire, scout, or analyst |

Target mean per tier ≈ `1.6 × tier order` (Tier 1 ≈ 1.6, Tier 6 ≈ 9.6), with real
spread inside each tier — a Tier 5 chapter should contain a difficulty-4 question
and a difficulty-9 question, not four 7s.

## Quality rules — these are what make the bank worth having

1. **Distractors must be plausible.** Every wrong choice should be something a
   real learner would actually believe. No joke options, no obviously-absurd
   filler, no "all of the above" as a lazy fourth.
2. **Build distractors from real misconceptions.** The best wrong answer to an
   infield-fly question is "the runners are forced to advance" — because people
   believe that. Mine the KB pages for the misconceptions they correct.
3. **`explain` teaches.** State the governing principle and why the wrong answer
   is tempting. One to three sentences. Never "Because option B is correct."
4. **Vary the answer index.** Correct answers must be spread roughly evenly
   across the available indices — do not park them at index 0 or 2.
5. **`scenario` type** = a described game situation the learner must rule on or
   act in ("Runners on first and second, one out, a pop-up drifts toward the
   shortstop…"). Use it for judgment, not recall. Every tier from 3 up should
   have several.
6. **No question depends on content from a later chapter.** A Chapter 6 question
   may not require Chapter 17 knowledge.
7. **No trick questions and no ambiguity.** Exactly one choice must be defensibly
   correct. If a rule varies by division, either say which division the question
   is about in the prompt, or make the division difference the point of the question.
8. **Source every factual question.** `source` names the KB page slug you read.
   Foundational questions (what a run is, how many outs in an inning) may use `''`.

## Per-tier requirements (enforced by an automated test)

- **≥12 questions per chapter** — so ≥48 per tier file (4 chapters).
- The chapter's `quizIds` must **all exist**, with exactly the ids the chapter
  file lists. Read the chapter file and match them exactly.
- Questions beyond the `quizIds` set use the next indices in sequence
  (`q1709`, `q1710`, `q1711`, `q1712`, …). These extras are the IQ-test and
  review-deck depth.
- Every tier file should contain at least one `hotspot` and one `order` question,
  and (from Tier 3 up) at least three `scenario` questions.
- Across the whole bank each of the twelve topics needs ≥15 questions — so give
  each tier file a spread of topics, not just the obvious one.

## Report back (every question chunk)

1. The exact count of questions written, and the per-chapter counts.
2. The topic distribution and the difficulty distribution (mean and range per chapter).
3. The `quizIds` you matched, confirming they equal the chapter files' lists exactly.
4. Every `hotspot` question's `targets` and `opts.hotspots`, so the reviewer can
   check them against `svg.js`'s vocabularies.
5. The KB pages you read.
6. Any deviation, and why.
