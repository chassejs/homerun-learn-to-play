# Implementer Brief — Chunk 8b — `interactive.js` core + the first eight widgets

## HARD CONSTRAINT: NO SHELL ACCESS

Read, Write, Edit, and directory listing only. Do **not** run any command. A
shell call silently cancels this turn. The reviewer runs every check.

## Context

**Homerun Learn to Play.** Spec: `docs/BUILD-PLAN.md` §9 (Interactive widgets).

Already on disk — **read these before writing**:
- `learn.js` — **read `HRL_LEARN`'s call into the widget registry and match its
  signature exactly.** It mounts widgets from `interactive` sections.
- `styles.css` — the widget classes: `.widget`, `.widget-head`, `.widget-body`,
  `.widget-actions`, `.widget-status`, `.token` (+`.selected`/`.placed`),
  `.dropzone` (+`.over`/`.correct`/`.wrong`), plus `.btn`, `.btn-primary`,
  `.btn-accent`, `.btn-ghost`, `.btn-sm`, `.empty-state`, `.hint`,
  `.progress-bar`, `.progress-bar-fill`. Use these.
- `svg.js` (`HRL_SVG`) — the diagram builders and the `[data-hotspot]` markup
  they emit. Widgets attach behaviour to those hotspot groups.
- The curriculum tier files — **read the `interactive` sections that use the
  widgets you are building**, so your `opts` handling matches the real data.
- `progress.js`, `shell.js` — for `toast` and settings (`reducedMotion`).

## Coding standards

- One IIFE assigning `window.HRL_INTERACTIVE`. `'use strict';`. House banner comment.
- **ES5-safe only:** `var`, `function` expressions, string concatenation. No
  `let`/`const`, arrow functions, template literals, `class`, destructuring,
  default parameters, optional chaining, `Array.prototype.includes`, `Object.assign`.
- Browser-only; guard `document` access.
- **Escape all data-derived text** with a local `esc()` before inserting as HTML.
- Never leave `undefined`/`null`/`[object Object]` in the DOM.

---

## The registry core

```js
HRL_INTERACTIVE = {
  widgets: { /* name -> { mount: function (container, opts, onComplete) {} } */ },
  register: function (name, def),
  has: function (name),
  names: function (),                       // sorted list, used by the integrity test
  mount: function (name, container, opts, onComplete)
};
```

`mount()` must:
- Return `false` and render a `.empty-state` (not throw) when the name is unknown.
- Clear the container before mounting.
- Pass a `ctx` helper object to each widget's `mount` giving it shared utilities:
  `ctx.el(tag, attrs, children)`, `ctx.esc(s)`, `ctx.shuffle(arr)`,
  `ctx.status(container, message, kind)` (writes `.widget-status` with
  `aria-live="polite"`), `ctx.actions(container, buttons)`, and
  `ctx.reducedMotion()`.
- Call `onComplete(result)` when the learner finishes the widget, where `result`
  is `{ completed: true, correct: n, total: m }`. `onComplete` may be undefined —
  guard it.

### Shared requirements for every widget

1. **Mouse, touch, and keyboard all work.** Anywhere a widget uses drag-and-drop,
   there must be an equivalent click-to-select-then-click-to-place path **and** a
   keyboard path (Tab to a token, Enter/Space to pick it up, arrow keys or Tab to
   a target, Enter/Space to drop). Drag-only is a failure.
2. Every control is a real `<button>` with an accessible name. Hotspot groups
   emitted by `HRL_SVG` already carry `role="button"` and `tabindex="0"` — wire
   both `click` and `keydown` (Enter/Space) on them.
3. Each widget has a **Check** action and a **Reset** action in `.widget-actions`,
   and a `.widget-status` region announcing results via `aria-live="polite"`.
4. After a check, show **per-item feedback** (`.dropzone.correct` / `.wrong`) and a
   one-line explanation from the case data. Reveal the correct answer on a second
   failed attempt rather than letting the learner get stuck.
5. Respect `ctx.reducedMotion()` — no transitions or motion when it is true.
6. Widgets are self-contained: no global state, no writes to `HRL_PROGRESS`.
   Report through `onComplete` only.
7. A widget given empty or malformed `opts` renders a `.empty-state` explaining
   that the exercise is unavailable — never throws, never renders blank.

---

## The eight widgets in this chunk

Each entry below gives the `opts` shape. **Read the curriculum files for the
actual data being passed** and make sure your handling matches it.

### 1. `labelTheField` (Chapter 2)
`opts: { parts: [{ id, label, hint }], diagram: { svg: 'field', opts: {...} } }`
Render the field diagram with hotspots. Present the labels as `.token` buttons in
a tray. The learner places each label on the matching field part. Check marks each
placement correct/wrong; wrong ones return to the tray. Includes a "Show me" reveal.

### 2. `placeThePositions` (Chapters 3, 11)
`opts: { positions: ['p','c',...], mode: 'all'|'infield'|'outfield', diagram: {...} }`
Nine (or a subset of) position tokens to drag/place onto the field. Snap to the
nearest valid spot. Check validates each against its correct hotspot id. Show the
position number and abbreviation on each token.

### 3. `strikeZoneTrainer` (Chapters 5, 19)
`opts: { cases: [{ x, y, call, explain }], mode: 'ball-strike'|'swing-decision' }`
Show one pitch at a time on a `strikeZone` diagram. In `ball-strike` mode the
learner calls Ball or Strike; in `swing-decision` mode, Swing or Take (the case
then also carries `count` and the correct decision). Running accuracy in
`.widget-status`; per-pitch explanation after each call; a summary at the end.

### 4. `countBuilder` (Chapter 5)
`opts: { steps: [{ pitch, result, note }] }` or `{ freeplay: true }`
Interactive count walker: buttons for Ball, Strike, Foul, In play. The count
updates and the widget narrates what each outcome means (including that a foul is
a strike but not the third strike). In guided mode it walks the authored `steps`;
in free play the learner explores until the at-bat ends. Uses `HRL_SVG.countMatrix`
with the current count highlighted.

### 5. `safeOrOut` (Chapters 1, 6, 8)
`opts: { cases: [{ text, answer, explain, diagram? }], mode: 'safe-out'|'run-scored'|'game-state' }`
Scenario cards sorted into two buckets. `mode` changes the two bucket labels:
`safe-out` → Safe / Out; `run-scored` → Run scores / No run; `game-state` → the
case's own two `choices`. Card flip reveals the explanation. Keyboard: left/right
arrows or two labelled buttons per card.

### 6. `runnerAdvance` (Chapter 7)
`opts: { cases: [{ text, start: {...}, hit, correct: {...}, explain }] }`
Given a situation, the learner predicts where each runner ends up by clicking
bases on a `basePaths` diagram. Check compares against `correct`. Animate the
resolution afterward (skip the animation under reduced motion).

### 7. `swingOrder` (Chapter 9)
`opts: { frames: ['frame-stance', ...], cues: { frameId: 'cue text' } }`
The five swing frames rendered shuffled via
`HRL_SVG.swingSequence({ order: shuffledOrder })`. The learner reorders them into
the correct sequence. **Must be operable without dragging** — give every frame
"move left"/"move right" buttons as well as drag. Check reveals the correct order
with each frame's coaching cue.

### 8. `armCareCheck` (Chapters 10, 12)
`opts: { cases: [{ age, division, pitches, daysRest, question, answer, explain, source }] }`
A pitch-count and rest calculator/quiz. Given a pitcher's age/division, pitch
count, and days of rest, the learner answers whether the pitcher may pitch (or how
many days of rest are required). **The limits must come from the case data
authored in the curriculum, which came from the knowledge base — do not hardcode
pitch-count limits in this file.** Show the governing rule in the explanation.

---

## Acceptance for this chunk

- `interactive.js` exists, is an ES5-safe single IIFE, defines the registry core
  exactly as specified, and registers these eight widget names.
- `mount()` with an unknown name returns `false` and renders `.empty-state`.
- Every widget works with mouse **and** with keyboard alone, and every one has
  Check, Reset, and an `aria-live` status region.
- Every widget handles empty/malformed `opts` with a `.empty-state`, never a throw.
- No widget hardcodes rules content that should come from `opts`.
- `mount`'s signature matches the call in `learn.js` exactly.
- No TODOs, no `...` placeholders, no widget whose `mount` is a stub.

## Report back (required)

1. The exact registry API and the `ctx` helper object's methods with signatures.
2. For each of the eight widgets: the `opts` fields it reads, what it does when a
   field is missing, and how its keyboard path works.
3. Every CSS class you emit that is **not** already in `styles.css`.
4. Any place the curriculum data's actual `opts` shape differed from this brief,
   and how you reconciled it.
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
