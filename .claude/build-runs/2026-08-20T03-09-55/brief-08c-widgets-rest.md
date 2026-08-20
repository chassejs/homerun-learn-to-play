# Implementer Brief — Chunk 8c — the remaining eight widgets in `interactive.js`

## HARD CONSTRAINT: NO SHELL ACCESS

Read, Write, Edit, and directory listing only. Do **not** run any command. A
shell call silently cancels this turn. The reviewer runs every check.

## Context

`interactive.js` already exists with the registry core and the first eight
widgets (`labelTheField`, `placeThePositions`, `strikeZoneTrainer`,
`countBuilder`, `safeOrOut`, `runnerAdvance`, `swingOrder`, `armCareCheck`).

**Read `interactive.js` first.** Extend it with the eight widgets below using the
**same registry API, the same `ctx` helpers, and the same conventions** already
established there. Do not restructure what is there and do not rewrite the file
from scratch — use Edit to add to it.

Also read:
- **`.claude/build-runs/2026-08-20T03-09-55/brief-08b-widgets-core.md`** — the
  "Shared requirements for every widget" section applies to all eight of these
  unchanged (mouse + keyboard, real buttons, Check/Reset, `aria-live` status,
  per-item feedback, reduced-motion, no global state, graceful empty `opts`).
- `svg.js` (`HRL_SVG`) — the builders these widgets render.
- The curriculum tier files `src/curriculum-t4.js`, `t5.js`, `t6.js` — **read the
  actual `interactive` sections that use these widgets** so your `opts` handling
  matches the real authored data. Where the data differs from this brief, follow
  the data and say so in your report.

## Coding standards

Unchanged from `interactive.js`: ES5-safe only (`var`, `function` expressions,
string concatenation; no `let`/`const`, arrow functions, template literals,
`class`, destructuring, default parameters, optional chaining,
`Array.prototype.includes`, `Object.assign`). Escape all data-derived text.

---

## The eight widgets

### 9. `assignTheNine` (Chapter 14) — **the app's signature widget**
`opts: { cases: [{ id, situation: { hitType, location, runners, outs },
                   correct: { p:'ball'|'base'|'backup', c:…, '1b':…, '2b':…,
                              '3b':…, ss:…, lf:…, cf:…, rf:… },
                   rationale, diagram? }] }`

For each case: render the situation in words, then a `field` diagram showing the
nine fielders and the ball's location. The learner assigns **every** position one
of three roles — Ball, Base, or Backup. Provide three role buttons per position
(or select-a-role-then-click-a-fielder; either is fine, but keyboard must work).

On Check: colour each position with the teaching tokens and its glyph
(ball = `B` red, base = `▲` yellow, backup = `⌂` green — matching `HRL_SVG`'s
convention), mark each assignment right or wrong, show the score out of nine, and
display the case's `rationale`. Offer "Show the answer" after a second attempt.

This is the most important widget in the app — make it feel good. A running score
across the case set, a "next situation" flow, and a final summary.

### 10. `stealRead` (Chapter 15)
`opts: { cases: [{ description, move, answer: 'go'|'hold'|'balk', explain }] }`
Show the pitcher's move — as text plus a `basePaths` or `field` diagram, with a
short CSS/SVG animation of the move where it helps (skipped under reduced
motion). The learner picks Go, Hold, or Balk. Explain each with the tell that
decided it.

### 11. `makeTheCall` (Chapters 4, 8, 16, 17, 20, 24)
`opts: { mode, cases: [{ situation, choices: [...], answer, explain, rule?, division? }] }`
The most reused widget — it must handle every `mode` the curriculum passes
(`'safety'`, `'game-flow'`, `'small-ball'`, `'approach'`, `'management'`, and the
default rules mode) by treating `mode` only as a labelling hint. The mechanics are
the same: present the situation, offer the choices as `.choice-btn`-style buttons,
reveal the correct ruling with the `explain`, and — when the case carries `rule`
or `division` — show which rule governs and which divisions it applies in.
An unknown `mode` must behave like the default, never break.

### 12. `sequencePitches` (Chapter 18)
`opts: { cases: [{ hitter, count, pitches: [...available], ideal: [...], explain }] }`
Given a hitter profile and a count, the learner builds a three-pitch sequence by
picking from the available pitch types and locations. Render the chosen sequence
on a `strikeZone` diagram with numbered pitches. Feedback scores the sequence on
whether it changed eye level and changed speeds, and compares it to the case's
`ideal` — note explicitly that more than one good sequence exists, so grade the
principles rather than demanding an exact match.

### 13. `scoreThePlay` (Chapter 21)
`opts: { cases: [{ description, answer, accept: [...], explain }] }`
Given a play in words, the learner produces the scorekeeping notation. Offer a
notation builder (position-number buttons 1–9 plus E, FC, K, ꓘ, F, U, and a
hyphen) rather than free text, so the input is unambiguous — but also accept
typed input, normalising case and whitespace, and check it against `answer` plus
the `accept` alternates.

### 14. `statMatch` (Chapter 22)
`opts: { pairs: [{ stat, question, hides }], traps?: [...] }`
Match each statistic to the question it answers. Two columns; select a stat, then
select a question. Wrong matches explain the misconception. After a correct match,
surface the stat's `hides` line — the point of the exercise is what each number
does *not* tell you.

### 15. `gradeTheTool` (Chapter 23)
`opts: { cases: [{ tool, description, grade, tolerance, explain }] }`
Given a described tool, the learner places a grade on the 20–80 scale using
`HRL_SVG.scaleGauge` — a slider or +/- buttons stepping by 5. Correct within
`tolerance` (default 5). Explain what separates, say, a 50 from a 60 for that
tool. Reinforce that 50 is major-league average, not "average person".

### 16. `spotTheAlignment` (Chapters 13, 16)
`opts: { cases: [{ situation, options: [...alignment names], answer, explain,
                   preview?: true }] }`
Given a game situation, pick the right defensive alignment. When `preview` is
true, render each option as a small `field` diagram with that `alignment` so the
learner chooses visually rather than by name. Explain what the correct alignment
buys and what it gives up — and, where the curriculum case says so, that the
obvious answer is wrong.

---

## Acceptance for this chunk

- `interactive.js` now registers **all sixteen** widget names:
  `labelTheField`, `placeThePositions`, `strikeZoneTrainer`, `countBuilder`,
  `safeOrOut`, `runnerAdvance`, `swingOrder`, `armCareCheck`, `assignTheNine`,
  `stealRead`, `makeTheCall`, `sequencePitches`, `scoreThePlay`, `statMatch`,
  `gradeTheTool`, `spotTheAlignment`.
- The existing registry core and first eight widgets are unchanged in behaviour.
- Every new widget works with mouse **and** with keyboard alone, has Check and
  Reset, and announces through `.widget-status`.
- `makeTheCall` handles every `mode` the curriculum passes plus unknown modes.
- `assignTheNine` scores all nine positions per case and shows the rationale.
- Every widget handles empty/malformed `opts` with a `.empty-state`, never a throw.
- No TODOs, no `...` placeholders, no stubbed `mount`.

## Report back (required)

1. Confirmation that `HRL_INTERACTIVE.names()` returns all sixteen, listed.
2. For each new widget: the `opts` fields read, the missing-field behaviour, and
   the keyboard path.
3. Every place the curriculum's actual `opts` differed from this brief and how
   you reconciled it — **this is the most likely source of a runtime break, so be
   thorough.**
4. Every CSS class you emit that is not already in `styles.css`.
5. Any deviation from this brief, and why.
