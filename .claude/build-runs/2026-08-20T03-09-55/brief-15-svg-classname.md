# Implementer Brief — Chunk 15 — class manipulation silently fails on SVG elements

## HARD CONSTRAINT: NO SHELL ACCESS

Read, Write, Edit, and directory listing only. Do **not** run any command. The
reviewer runs every check.

## The defect (measured on the deployed site)

`HRL_SVG` emits hotspots as SVG group elements:

```html
<g class="hrl-hotspot" data-hotspot="ss" tabindex="0" role="button" aria-label="…">
```

On an **SVG** element, `node.className` is a read-only `SVGAnimatedString`
object — **not** a writable string. Assigning a string to it is silently
ignored: no exception, no effect. Measured directly in the browser:

```
node.tagName                  -> "g"
typeof node.className         -> "object"
toString(node.className)      -> "[object SVGAnimatedString]"
node.className = (node.className || '') + ' selected correct'
  -> no error thrown
node.getAttribute('class')    -> "hrl-hotspot"     // UNCHANGED
```

### What this breaks

`quiz.js` `markHotspots()` (lines ~616 and ~618) uses exactly that pattern to
mark a hotspot answer as `selected correct` / `selected wrong` / `correct`. Since
the assignment does nothing, **answering a hotspot question gives the learner no
visual feedback at all** — they click a fielder on the diagram and the diagram
never shows whether they were right, nor which one was correct.

There are **15 hotspot questions** in the bank, and **4 of them sit in chapter
quizzes** (`q1106`/ch11, `q1203`/ch12, `q1305`/ch13, `q1403`/ch14), so ordinary
learners hit this.

Note the pattern also produces a corrupted value where it *does* apply to an HTML
element that had no class: `(node.className || '')` on an SVG node yields the
object, so string concatenation would render
`"[object SVGAnimatedString] selected correct"`.

### Scope — this is a codebase-wide pattern, not one line

`grep` finds **zero** uses of `classList` anywhere in `quiz.js`, `iq.js`, or
`interactive.js`, and several raw `className =` assignments:

- `quiz.js:72` — `if (k === 'class') node.className = val;` (element-builder helper)
- `quiz.js:616`, `quiz.js:618` — the broken hotspot marking
- `iq.js:112` — same element-builder helper
- `interactive.js:103` — `else node.className = value;`
- `interactive.js:137` — same element-builder helper
- `interactive.js:4995`, `interactive.js:2915` — direct assignments

The element-builder helpers and `interactive.js:103` matter because widgets
(`labelTheField`, `placeThePositions`, `assignTheNine`, `spotTheAlignment`, and
any other widget that marks hotspots correct/wrong on a diagram) set classes on
SVG nodes through them. **Check each widget that touches `[data-hotspot]` nodes
and confirm its feedback actually lands.**

## The fix

Introduce **one shared, SVG-safe class helper** and route every class read and
write through it. Put it wherever each file keeps its small DOM utilities, and
define it identically in `quiz.js`, `iq.js`, and `interactive.js` (these files do
not share a module, so a small duplicated helper is correct here — do not invent
a new global just for this).

```js
function getClass(node) {
  if (!node) return '';
  if (typeof node.className === 'string') return node.className;
  return node.getAttribute('class') || '';
}

function setClass(node, value) {
  if (!node) return;
  if (typeof node.className === 'string') { node.className = value; return; }
  node.setAttribute('class', value);      // SVG path
}

function addClass(node, cls) { … }        // no-op if already present
function removeClass(node, cls) { … }
```

`classList` works on SVG in every browser this app targets, so
`node.classList.add(...)` is also acceptable — but whichever you choose, use it
**consistently** and make sure `getClass` never returns an `SVGAnimatedString`.

Then:

1. Replace **every** `className =` assignment in `quiz.js`, `iq.js`, and
   `interactive.js` with `setClass` / `addClass` / `removeClass`, including the
   `k === 'class'` branch of each element-builder helper.
2. Replace every **read** of `.className` used in string context with `getClass`.
3. Fix `markHotspots` specifically so that after a hotspot answer the diagram
   shows: the chosen hotspot marked correct or wrong, and — when the answer was
   wrong — the correct hotspot marked so the learner learns the right answer.
4. Add the matching CSS if it is missing. Check `styles.css` for rules targeting
   `.hrl-hotspot.correct`, `.hrl-hotspot.wrong`, and `.hrl-hotspot.selected`. If
   they are absent, add them near the existing `.section-diagram` rules using the
   teaching tokens (correct → `--teach-backup` green, wrong → `--teach-ball` red),
   with a visible stroke or fill change **plus** a non-colour cue (a thicker
   stroke) so the feedback is not colour-only. Keep the additions minimal.

## Do not change

- `svg.js`'s emitted markup — the `class="hrl-hotspot" data-hotspot="…"` shape is correct.
- Scoring, shuffling, Leitner logic, or the advancement guards added in the last chunk.
- The data files, `learn.js`, `shell.js`, `progress.js`, or `index.html`.

## Tests to add

Add to `tests/quiz.test.js` a DOM-free assertion set for the new helpers, since
they are pure string logic:

1. `getClass` returns a string for an object-valued `className` stub
   (simulate with `{ className: { baseVal: 'a' }, getAttribute: fn }`).
2. `addClass` does not duplicate an existing class.
3. `removeClass` removes only the exact token, not a substring
   (`removeClass(node, 'correct')` must not corrupt `'incorrect'`).
4. `setClass` routes to `setAttribute` when `className` is not a string.

Export the helpers from `quiz.js` so the tests can reach them. Keep every
existing export intact — `npm test` currently reports 176 passed, 0 failed and
must not regress.

## Acceptance

- No raw `className =` assignment remains in `quiz.js`, `iq.js`, or `interactive.js`.
- No `.className` is read into a string context without going through `getClass`.
- Answering a hotspot question visibly marks the chosen hotspot correct or wrong,
  and reveals the correct one when the answer was wrong.
- Every widget that marks `[data-hotspot]` nodes shows its feedback.
- Feedback carries a non-colour cue as well as colour.
- `npm test` passes with the new assertions added.
- All three files remain ES5-safe and still parse.

## Report back

1. The helper implementation you settled on and which files it lives in.
2. Every call site you changed, grouped by file.
3. Which widgets were affected by the broken SVG class writes, and confirmation
   that each now shows feedback.
4. Any CSS you added, and why it was or was not already present.
5. The new test cases and what each asserts.
6. Any deviation from this brief, and why.
