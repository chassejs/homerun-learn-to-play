# Implementer Brief — Chunk 12 — fix duplicated view headings and intros

## HARD CONSTRAINT: NO SHELL ACCESS

Read, Write, Edit, and directory listing only. Do **not** run any command. A
shell call silently cancels this turn. The reviewer runs every check.

## The defect (found by walking the app in a browser)

`index.html` gives every view a static `<h2>` and a static `<p class="hint">`
intro. Those were meant as placeholders for the modules that render into each
view's root. The modules never took ownership of them, so the app now shows the
placeholder **and** the module's own header at the same time.

Two concrete cases observed:

**1. Chapter reader.** The page shows, top to bottom:

```
Chapter                                           ← static h2 from index.html
Read the lesson, try the diagrams, then take the chapter quiz.   ← static hint
Diamond · Chapter 9 of 24 · 12 min                ← learn.js's real header
Hitting Fundamentals
Stance to finish, and what to work on first
```

"Chapter" and the generic hint are noise sitting above the real title.

**2. Placement, first screen.** The page shows:

```
Find your starting point                          ← h2 (placement rewrote it)
There are no wrong answers here — this just finds your starting point.  ← static hint
[ Start from the very beginning ]
Find your starting point                          ← placement's own panel heading
There are no wrong answers here — this just finds your starting point.  ← repeated again
```

The heading and the intro sentence each appear twice on the same screen.

## The rule to implement

**The static `<h2>` in each view is the view's accessible heading. The module
that renders into that view owns its text. The module must not print a second
copy of that heading, and must not repeat the intro sentence.**

Concretely, for every view a module renders into:

1. The module **sets the static `h2`'s `textContent`** to the right heading for
   what it is currently showing.
2. The module **hides the static `.hint`** (`hidden = true`, or
   `style.display = 'none'`) whenever it renders its own intro copy, and shows it
   again only if it renders nothing of its own.
3. The module **removes its own duplicate `<h2>`/`<h3>` title and duplicate intro
   paragraph** from the content it injects, keeping the richer detail line
   (kicker, progress, subtitle) that the static heading does not carry.

Keep exactly **one visible `<h1>`** (the app bar) and **one `<h2>`** per view.
Heading levels must not skip: content inside a view starts at `<h3>`.

## Files and changes

### `learn.js`
- `renderChapter(chapterId)`: set `#view-chapter`'s `h2` to the **chapter title**.
  Hide that view's static `.hint`. In the injected header, drop the duplicated
  title but **keep** the kicker (`Diamond · Chapter 9 of 24 · 12 min`), the
  subtitle, and the hero. Demote any heading the injected header used for the
  title so nothing competes with the `h2`.
- `renderPath()` and `renderGlossary()`: these views' static headings ("My Path",
  "Glossary") are already correct and are not duplicated — leave their `h2`
  text alone. Still hide the static `.hint` if you render your own intro line;
  otherwise leave it visible.

### `placement.js`
- Set the heading once (it already sets `#view-quiz`'s `h2` to "Find your
  starting point"). **Remove the panel's own repeated heading and the repeated
  intro sentence** from the injected markup. The intro sentence should appear
  exactly once on the first screen — either as the static hint or in the panel,
  not both. Pick the panel copy and hide the static hint, so the sentence sits
  with the content it belongs to.
- Keep the "Start from the very beginning" skip control visible on every screen.
- On the result screen, set the `h2` to something that fits the result (for
  example "Your starting point") rather than leaving the question-phase heading.

### `quiz.js`
- `start(chapterId)`: set `#view-quiz`'s `h2` to the chapter's title plus
  " — quiz" (or similar), so the learner knows which quiz they are in, and hide
  the static hint. Do not print a second copy of that title in the injected markup.
- `renderReviewDeck()` / `startReview()`: `#view-review`'s static heading
  ("Review") is correct — leave it. Hide the static hint if you render your own.

### `iq.js`
- `renderIntro()` and the test runner: `#view-iq`'s static heading ("Baseball IQ")
  is correct — leave the text. Hide the static hint if you render your own intro.
  On the result screen, do not print a duplicate "Baseball IQ" heading above the
  score; the score card is the content.

### A shared helper
All four modules need the same two operations. Add **one** small helper and use
it from all of them rather than repeating the DOM lookups. Put it in `shell.js`
and expose it on `HRL_SHELL`:

```js
HRL_SHELL.setViewHeading(viewName, headingText, hideHint)
```

- Finds `#view-<viewName>`, sets its first `h2`'s `textContent` to
  `headingText` when `headingText` is a non-empty string (leaves it alone when
  null/undefined), and hides or shows that view's first `p.hint` according to
  `hideHint`.
- Guards everything — a missing view, missing `h2`, or missing hint must not throw.
- Escaping is not needed since it sets `textContent`, but never pass markup.

Then call it from `learn.js`, `quiz.js`, `iq.js`, and `placement.js` as described
above. **Read `shell.js` first** so the helper matches that file's existing style
and export block.

## Do not change

- `index.html` — the static headings and hints stay in the markup; the modules
  drive them. This keeps the app readable with JavaScript disabled and keeps one
  `h2` per view for assistive technology.
- `styles.css` — no new rules needed.
- Any content data file.

## Acceptance

- Opening any chapter shows the chapter title **once**, as the view's `h2`, with
  the kicker/subtitle/hero beneath it and no leftover "Chapter" placeholder or
  generic hint.
- The placement first screen shows its heading **once** and its intro sentence
  **once**.
- Starting a chapter quiz shows a heading naming that chapter's quiz, once.
- The IQ result screen shows no duplicate "Baseball IQ" heading.
- Every view still has exactly one `h2`; no heading level is skipped; the app bar
  keeps the only `h1`.
- `HRL_SHELL.setViewHeading` exists, is guarded, and is the single implementation
  used by all four modules.
- All five touched files still parse and remain ES5-safe.

## Report back

1. The `setViewHeading` signature and its guard behaviour.
2. For each of the four modules: which heading text it now sets per screen, and
   what duplicated markup you removed.
3. Confirmation that `index.html`, `styles.css`, and the data files are untouched.
4. Any deviation from this brief, and why.
