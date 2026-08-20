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
