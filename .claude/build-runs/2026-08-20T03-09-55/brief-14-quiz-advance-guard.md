# Implementer Brief — Chunk 14 — guard quiz/IQ advancement against overshoot and stale clicks

## HARD CONSTRAINT: NO SHELL ACCESS

Read, Write, Edit, and directory listing only. Do **not** run any command. The
reviewer runs every check.

## The defect (reproduced on the deployed site)

Two related bugs in the question-runner advancement path.

**1. A detached "Next" button still advances the quiz.**
After clicking "Next", the runner re-renders and the old button is removed from
the document — `document.body.contains(oldButton)` is `false`. But the click
handler closes over the runner state, so invoking it again on the **detached**
node still increments the question index and re-renders. Measured directly:

```
click Next  -> prompt becomes "Two different jobs get called "cut"..."   (Q2 -> Q3)
same detached button, click again
            -> prompt becomes "Put the cutoff or relay setup in order..." (Q3 -> Q4)
```

**2. Advancing past the last question renders nothing.**
Once the index runs past the end, the runner clears `#quiz-root` and renders no
result screen. Measured end state: `#quiz-root.innerHTML.length === 0`, zero
buttons, zero progress dots. The learner is left on a blank page inside the quiz
view with no control to escape, and the attempt is never recorded — the chapter
still shows `attempts: 0` even though answers were given and misses were pushed
to the review deck.

**This is reachable by an ordinary user.** A fast double-click on "Next" fires
twice: the first click re-renders, the second lands on the freshly-inserted
button at the same screen position and advances again. On the last question that
second advance overshoots the end and blanks the view.

## The fix

Apply both guards in **`quiz.js`**, and apply the same two guards to the
equivalent advancement path in **`iq.js`** (its runner has the same shape — check
it and fix it there too; the IQ test's "Next"/"Confirm" flow is vulnerable in the
same way).

### Guard A — bound the index, and always render an end state

Wherever the runner advances, clamp and branch explicitly:

- If the next index is within range, render that question.
- If the next index is at or past the end, **render the result screen** — never
  clear the root and return.
- The result screen must be rendered exactly once per attempt, and
  `HRL_PROGRESS.recordQuiz(...)` (or `recordIq(...)`) must be called exactly once
  per completed attempt, even if the finish path is reached more than once.

Add an explicit `finished` flag on the runner state. Once it is true, further
advance calls are no-ops that leave the result screen in place rather than
re-rendering it or re-recording the attempt.

### Guard B — ignore clicks from a stale render

Give each render pass a monotonically increasing token (a simple integer on the
runner state). When a handler fires, compare the token captured in its closure
against the current one; if they differ, **return immediately without changing
state**. This makes a click on a detached button — or a duplicate click that
lands between renders — inert.

Belt and braces on top of that: disable the "Next"/"Check"/"Confirm" button the
moment it is clicked, before the re-render, so a double-click cannot produce a
second live event.

### Also: never leave the root empty

As a final safety net, if the runner ever finds itself with nothing to render,
it must render a `.empty-state` with a short explanation and a control that
returns the learner to the chapter (or to My Path) — never an empty container.
An empty `#quiz-root` should be impossible after this change; the safety net is
there so that a future regression degrades to a visible, escapable state rather
than a blank page.

## Do not change

- The scoring maths, the pass threshold, the shuffling, or the Leitner logic —
  all of that is correct and covered by passing tests.
- `learn.js`, `shell.js`, `progress.js`, the data files, `index.html`, or `styles.css`.
- The look of the result screen.

## Tests to add

Extend **`tests/quiz.test.js`** (and add the parallel cases to
`tests/iq.test.js`) with DOM-free assertions against whatever pure/exported
helpers you introduce or already have:

1. Advancing from the last index yields the "finished" state rather than an
   out-of-range index.
2. Calling the advance function repeatedly after finishing does not increment
   past the end and does not report a second completion.
3. A handler carrying a stale render token is a no-op: state is unchanged.
4. The completion callback fires exactly once across repeated advance calls.

If the guards live in closures that are not reachable from Node, refactor the
minimum necessary into a small exported pure helper (for example
`advanceIndex(state, total)` returning `{ index, finished }` and
`isStale(state, token)`) so the behaviour is testable without a DOM. Keep the
existing exports intact — `tests/quiz.test.js` and `tests/iq.test.js` currently
pass and must continue to.

## Acceptance

- Clicking a detached "Next" reference does not change quiz or IQ state.
- Advancing past the last question renders the result screen, not an empty root.
- `recordQuiz` / `recordIq` fire exactly once per attempt regardless of how many
  times the finish path is reached.
- A double-click on the last question's "Next" ends on the result screen with the
  attempt recorded.
- `#quiz-root` and `#iq-root` are never left empty.
- `npm test` still passes, with the new assertions included.
- `quiz.js` and `iq.js` remain ES5-safe single IIFEs and still parse.

## Report back

1. Where you put the render token and the `finished` flag, and the exact guard conditions.
2. Any helper you extracted to make the guards testable, with its signature.
3. The new test cases you added and what each asserts.
4. Confirmation that scoring, thresholds, shuffling, and Leitner logic are untouched.
5. Any deviation from this brief, and why.
