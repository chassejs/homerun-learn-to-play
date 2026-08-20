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

---

# AUTHORITATIVE: the REAL `opts` shapes the curriculum actually passes

The section below is **generated from the finished curriculum files**, not
guessed. Where it disagrees with the widget descriptions above, **the shapes
below win** — they are what your code will actually receive at runtime.

Two things to notice, because they differ from what you might assume:

- Several widgets carry `answer` as the **choice text string**, not an index.
  Handle both: if `answer` is a number treat it as an index into `choices`; if it
  is a string, match it against the choice text. Do this in one shared helper.
- Case objects carry extra fields beyond what any one widget needs (`id`,
  `source`, `prompt` vs `question` vs `text`, `diagram`). Read defensively:
  prefer `question`, fall back to `prompt`, fall back to `text`, and never render
  `undefined`.


### `armCareCheck` — used in ch10, ch12
Real `opts` shape (from ch10):
```
{ cases: [{ id: string("pain-stop"), age: number, division: string("Any pathway"), pitches: number, daysRest: number, question: string, choices: [string ×4], answer: string, explain: string, source: string } ×8] }
```
First case verbatim:
```json
{
  "id": "pain-stop",
  "age": 11,
  "division": "Any pathway",
  "pitches": 12,
  "daysRest": 0,
  "question": "An 11-year-old has thrown 12 pitches and reports inner-elbow pain. The count is well under the daily max. What do you do?",
  "choices": [
    "Finish the inning — the count is low",
    "Switch to changeups and continue",
    "Remove immediately; no more throwing today",
    "Ice for five minutes and send them back out"
  ],
  "answer": "Remove immediately; no more throwing today",
  "explain": "Pain during or after throwing is always a signal to stop. Inner-elbow pain is a UCL / medial-apophysis warning. Count does not override pain. Do not pitch through it.",
  "source": "arm-care-and-injury-prevention"
}
```

### `assignTheNine` — used in ch14
Real `opts` shape (from ch14):
```
{ cases: [{ id: string("gb-ss-empty"), situation: {…}, prompt: string, correct: {…}, rationale: string, diagram: {…} } ×9] }
```
First case verbatim:
```json
{
  "id": "gb-ss-empty",
  "situation": {
    "hitType": "ground",
    "location": "shortstop",
    "runners": [],
    "outs": 0
  },
  "prompt": "Ground ball to shortstop. Nobody on. Zero outs.",
  "correct": {
    "p": "backup",
    "c": "backup",
    "1b": "base",
    "2b": "base",
    "3b": "base",
    "ss": "ball",
    "lf": "backup",
    "cf": "backup",
    "rf": "backup"
  },
  "rationale": "SS fields and throws to first. 1B/2B/3B cover bags. With nobody on, the catcher trails the batter-runner and backs up first. Pitcher toward the first-base line; RF backs first; CF second; LF third.",
  "diagram": {
    "svg": "field",
    "opts": {
      "positions": true,
      "alignment": "standard",
      "ball": "ss-hole",
      "title": "Ground ball to short — nobody on"
    }
  }
}
```

### `countBuilder` — used in ch05
Real `opts` shape (from ch05):
```
{ steps: [{ pitch: string("ball"), result: string("1-0"), note: string } ×7], cases: [{ pitch: string("ball"), result: string("1-0"), note: string } ×7] }
```
First case verbatim:
```json
{
  "pitch": "ball",
  "result": "1-0",
  "note": "First pitch misses. Count is 1–0, balls first. The hitter is a step ahead."
}
```

### `gradeTheTool` — used in ch23
Real `opts` shape (from ch23):
```
{ cases: [{ tool: string("Hit (present)"), description: string, grade: number, tolerance: number, explain: string } ×8] }
```
First case verbatim:
```json
{
  "tool": "Hit (present)",
  "description": "Makes consistent contact against average professional velocity, sprays to all fields, takes a walk when the pitcher nibble. Occasional empty swings against plus velocity. Not a plus hit tool; not a below-average one either. This is what “major-league average contact skill” looks like on a good day.",
  "grade": 50,
  "tolerance": 5,
  "explain": "50 is major-league average. Consistent contact and all-fields spray against average velocity, with some empty swings against plus pitching, is the 50 hit tool. 60 would miss bats less often against good pitching and produce a clearly plus on-base/average skill. 40 would not hold average velocity."
}
```

### `labelTheField` — used in ch02
Real `opts` shape (from ch02):
```
{ items: [{ id: string("home"), label: string("Home plate") } ×14] }
```
First case verbatim:
```json
{
  "id": "home",
  "label": "Home plate"
}
```

### `makeTheCall` — used in ch04, ch08, ch16, ch17, ch19, ch20, ch24
Real `opts` shape (from ch04):
```
{ mode: string("safety"), cases: [{ id: string("helmet-off"), prompt: string, choices: [string ×3], answer: number, explain: string } ×6] }
```
First case verbatim:
```json
{
  "id": "helmet-off",
  "prompt": "A runner takes their helmet off between second and third to cool down. What happens?",
  "choices": [
    "Nothing — helmets are only required in the batter’s box.",
    "Play is stopped and the helmet goes back on. Runners wear a double-earflap helmet the whole time they are on the bases.",
    "The runner is automatically out under a national rule that names this exact act."
  ],
  "answer": 1,
  "explain": "Double-earflap helmets are required for batters, on-deck (where on-deck is allowed), and base runners. Taking it off on the paths is a safety problem. Put it back on. Do not invent an “automatic out” that the rulebook does not state."
}
```
Modes passed: `safety`, `game-flow`, `small-ball`, `rules`, `approach`, `management`

### `placeThePositions` — used in ch03, ch11
Real `opts` shape (from ch03):
```
{ items: [{ id: string("p"), number: number, name: string("Pitcher"), hint: string } ×9] }
```
First case verbatim:
```json
{
  "id": "p",
  "number": 1,
  "name": "Pitcher",
  "hint": "Stands on the mound. Starts every pitch. Battery, with the catcher."
}
```
Modes passed: `infield`

### `runnerAdvance` — used in ch07
Real `opts` shape (from ch07):
```
{ cases: [{ id: string("through-first"), text: string, prompt: string, start: {…}, hit: string, correct: {…}, explain: string } ×8] }
```
First case verbatim:
```json
{
  "id": "through-first",
  "text": "Nobody on, nobody out. Ground ball to shortstop. The throw to first is late. The batter runs through the bag and veers foul.",
  "prompt": "Nobody on, nobody out. Ground ball to shortstop. The throw to first is late. The batter runs through the bag and veers foul.",
  "start": {
    "first": false,
    "second": false,
    "third": false
  },
  "hit": "ground-to-ss-late-throw",
  "correct": {
    "batter": "first",
    "first": null,
    "second": null,
    "third": null
  },
  "explain": "The batter beat a force throw to first and overran legally into foul ground. They stay at first. No one else was on."
}
```

### `safeOrOut` — used in ch01, ch06
Real `opts` shape (from ch01):
```
{ mode: string("run-scored"), cases: [{ id: string("touch-all-four"), prompt: string, answer: string("yes"), explain: string } ×6] }
```
First case verbatim:
```json
{
  "id": "touch-all-four",
  "prompt": "A batter hits the ball and runs to first, then second, then third, then home, touching each base. Did a run score?",
  "answer": "yes",
  "explain": "A run scores when a runner touches all four bases in order, ending at home plate."
}
```
Modes passed: `run-scored`, `safe-out`

### `scoreThePlay` — used in ch21
Real `opts` shape (from ch21):
```
{ cases: [{ id: string("dp-643"), description: string, answer: string("6-4-3"), accept: [string("6-4-3") ×5], explain: string } ×10] }
```
First case verbatim:
```json
{
  "id": "dp-643",
  "description": "Runner on first, fewer than two outs. Ground ball to the shortstop. Shortstop throws to the second baseman covering the bag for the force; the second baseman throws to first in time to retire the batter-runner. Double play.",
  "answer": "6-4-3",
  "accept": [
    "6-4-3",
    "643",
    "6-4-3 DP",
    "DP 6-4-3",
    "DP6-4-3"
  ],
  "explain": "6 is the shortstop, 4 is the second baseman, 3 is the first baseman. Write the fielders who handled the ball, in order. The double-play label is optional; 6-4-3 already tells the story."
}
```

### `sequencePitches` — used in ch18
Real `opts` shape (from ch18):
```
{ cases: [{ id: string("crowd-the-plate-00"), hitter: string, count: string("0-0"), pitches: [{…} ×4], ideal: [{…} ×3], explain: string } ×8] }
```
First case verbatim:
```json
{
  "id": "crowd-the-plate-00",
  "hitter": "Right-handed hitter who crowds the plate. No scouting note. Count 0–0.",
  "count": "0-0",
  "pitches": [
    {
      "type": "fastball",
      "location": "inner-half",
      "x": 0.32,
      "y": 0.38,
      "call": "called-strike"
    },
    {
      "type": "fastball",
      "location": "outer-half",
      "x": 0.7,
      "y": 0.42,
      "call": "foul"
    },
    {
      "type": "fastball",
      "location": "elevated",
      "x": 0.5,
      "y": 0.12,
      "call": "ball"
    },
    {
      "type": "changeup",
      "location": "low-away",
      "x": 0.68,
      "y": 0.66,
      "call": "swinging-strike"
    }
  ],
  "ideal": [
    {
      "type": "fastball",
      "location": "inner-half"
    },
    {
      "type": "fastball",
      "location": "outer-half"
    },
    {
      "type": "changeup",
      "location": "low-away"
    }
  ],
  
```

### `spotTheAlignment` — used in ch13
Real `opts` shape (from ch13):
```
{ cases: [{ id: string("empty-unknown"), situation: string, options: [string("standard") ×4], answer: string("standard"), preview: boolean, explain: string } ×8] }
```
First case verbatim:
```json
{
  "id": "empty-unknown",
  "situation": "First inning, 0–0. Nobody on. Unknown hitter. Zero outs.",
  "options": [
    "standard",
    "infield-in",
    "dp-depth",
    "no-doubles"
  ],
  "answer": "standard",
  "preview": true,
  "explain": "Nothing special is on. Standard is the default. Infield-in and no-doubles are specialised looks you have not earned yet."
}
```

### `statMatch` — used in ch22
Real `opts` shape (from ch22):
```
{ pairs: [{ stat: string("AVG"), question: string, hides: string } ×12], traps: [{ question: string, lure: string("BABIP"), explain: string } ×8] }
```
First case verbatim:
```json
{
  "stat": "AVG",
  "question": "When this batter was charged with an at-bat, how often did they get a hit?",
  "hides": "Walks, hit-by-pitches, and sacrifices never enter. A single and a home run count the same. A few dozen at-bats are weather."
}
```

### `stealRead` — used in ch15
Real `opts` shape (from ch15):
```
{ cases: [{ id: string("rhp-to-home"), description: string, move: string("rhp-home"), answer: string("go"), explain: string } ×8] }
```
First case verbatim:
```json
{
  "id": "rhp-to-home",
  "description": "Right-hander from the set, runner at first, one out, 1–1 count. Free (front) foot lifts and steps toward home plate.",
  "move": "rhp-home",
  "answer": "go",
  "explain": "Free foot toward home is a pitch. That is the steal jump. You are stealing on the pitcher."
}
```

### `strikeZoneTrainer` — used in ch05
Real `opts` shape (from ch05):
```
{ mode: string("ball-strike"), cases: [{ id: string("mid-mid"), x: number, y: number, call: string("strike"), explain: string } ×12] }
```
First case verbatim:
```json
{
  "id": "mid-mid",
  "x": 0.5,
  "y": 0.44,
  "call": "strike",
  "explain": "Middle of the zone, over the plate. Called strike if the batter takes it."
}
```
Modes passed: `ball-strike`

### `swingOrder` — used in ch09
Real `opts` shape (from ch09):
```
{ frames: [string("frame-stance") ×5], cues: { frame-stance: string, frame-load: string, frame-stride: string, frame-contact: string, frame-finish: string }, items: [{ id: string("frame-stance"), label: string("Stance"), cue: string } ×5] }
```
First case verbatim:
```json
"frame-stance"
```


Widgets referenced by the curriculum: armCareCheck, assignTheNine, countBuilder, gradeTheTool, labelTheField, makeTheCall, placeThePositions, runnerAdvance, safeOrOut, scoreThePlay, sequencePitches, spotTheAlignment, statMatch, stealRead, strikeZoneTrainer, swingOrder
