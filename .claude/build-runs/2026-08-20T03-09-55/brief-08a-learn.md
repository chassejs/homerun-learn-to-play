# Implementer Brief — Chunk 8a — `learn.js` (path view, chapter reader, glossary)

## HARD CONSTRAINT: NO SHELL ACCESS

Read, Write, Edit, and directory listing only. Do **not** run any command. A
shell call silently cancels this turn. The reviewer runs every check.

## Context

**Homerun Learn to Play.** Spec: `docs/BUILD-PLAN.md` §8 (Views). Read it.

Already on disk — **read these before writing**:
- `index.html` — render roots `#path-root`, `#chapter-root`, `#glossary-root`.
- `styles.css` — the path and chapter-reader classes. Use them; do not invent a
  parallel set: `.tier-accordion`, `.tier-head` (+`.open`), `.tier-body`,
  `.tier-ring`, `.chapter-grid`, `.chapter-card` (+`.complete`/`.recommended`/`.visited`),
  `.chapter-card-meta`, `.chapter-badge`, `.score-pill`, `.chapter-header`,
  `.chapter-objectives`, `.chapter-progress`, `.section`, `.section-heading`,
  `.section-prose`, `.section-diagram`, `.diagram-caption`, `.keypoints`,
  `.coachnote`, `.example-box`, `.divisionnote`, `.terms-row`, `.term-btn`,
  `.chapter-nav`, `.chapter-cta`, `.progress-bar`, `.progress-bar-fill`,
  `.empty-state`, `.badge-rosette`.
- `src/curriculum-data.js` + `src/curriculum-t1.js` … `t6.js` (`HRL_CURRICULUM`)
  — **read at least two tier files** so you handle every section type that is
  actually used, with the real option shapes.
- `src/glossary-data.js` (`HRL_GLOSSARY`).
- `progress.js` (`HRL_PROGRESS`) — read its real API.
- `shell.js` (`HRL_SHELL`) — `showView`, `openChapter`, `openQuiz`, `toast`, `on`.
- `svg.js` (`HRL_SVG`) — builders and their real option names.
- `interactive.js` (`HRL_INTERACTIVE`) — the widget registry. It may not exist
  yet when you write this; call it defensively (see below).
- `uiModal.js` (`HRL_MODAL`) — for the glossary popover.

## Coding standards

- One IIFE assigning `window.HRL_LEARN`. `'use strict';`. House banner comment.
- **ES5-safe only:** `var`, `function` expressions, string concatenation. No
  `let`/`const`, arrow functions, template literals, `class`, destructuring,
  default parameters, optional chaining, `Array.prototype.includes`, `Object.assign`.
- Browser-only (no Node export needed), but guard `document` access anyway.
- **Escape every string that comes from the data files** before inserting it as
  HTML. Write a local `esc()` and use it on all prose, headings, captions, labels,
  and glossary text. The data files contain plain text, not markup — treat it as
  text. The only exception is SVG returned by `HRL_SVG`, which is already markup.
- Never produce the literal text `undefined`, `null`, or `[object Object]` in the
  DOM. Every optional field is guarded before it is rendered.

---

## API — `HRL_LEARN`

- `renderPath()` → fills `#path-root`
- `renderChapter(chapterId)` → fills `#chapter-root`
- `renderGlossary()` → fills `#glossary-root`
- `openTerm(slug)` → opens the glossary popover for one term
- `scrollToTier(tierKey)` → opens that tier's accordion and scrolls to it

---

## 1. `renderPath()` — the My Path view

One `.tier-accordion` per tier, in tier order. Each has:

- A `.tier-head` **`<button>`** (real button, `aria-expanded`, `aria-controls`)
  showing the tier name, its blurb, a `.tier-ring` progress ring built with
  inline SVG or `HRL_SVG`, and an "N of M chapters" count from
  `HRL_PROGRESS.tierProgress(tierKey)`.
- A `.tier-body` containing a `.chapter-grid` of `.chapter-card` buttons, one per
  chapter in order. Each card shows the chapter number, title, subtitle, estimated
  minutes, and its state:
  - `.complete` + a `.score-pill` with the best score, when complete
  - `.visited` when started but not passed
  - `.recommended` on the single chapter `HRL_PROGRESS.nextChapter()` returns
  - a `.chapter-badge` when the chapter's badge has been earned
- Clicking a card calls `HRL_SHELL.openChapter(id)`.

Behaviour:
- The tier containing the recommended chapter starts **open**; the others start
  closed. If placement has not been done, Tier 1 starts open.
- Tiers above the recommended tier are visually de-emphasised but **fully
  clickable** — nothing is ever locked. Label them clearly (e.g. "ahead of your
  starting point"), never "locked".
- Above the accordions, show an overall `.progress-bar` from
  `HRL_PROGRESS.overallProgress()`, the earned-badge count, and a "Re-run
  placement" link when placement is done.
- Keyboard: each `.tier-head` toggles on Enter/Space; arrow keys move between
  tier heads.

## 2. `renderChapter(chapterId)` — the chapter reader

**Header** (`.chapter-header`): tier name, "Chapter N of 24", the title, the
subtitle, the estimated minutes, and the tier hero. The hero uses the tier's
`heroImage`; attach an `onerror` handler that **replaces the `<img>` with the
tier's `heroFallback` SVG** (`HRL_SVG[fallback.svg](fallback.opts)`). A missing
hero image must never show a broken-image icon.

**Objectives** (`.chapter-objectives`): the chapter's `objectives` as a list,
introduced by a single "After this chapter you can…" lead-in.

**Important:** the authored objective strings themselves mostly begin with the
literal words "After this chapter you can " — rendering the lead-in *and* the
raw string produces "After this chapter you can… After this chapter you can say
what each team is trying to do." **Strip that prefix (case-insensitive, and also
the variants "After this chapter, you can " and "After this chapter you will be
able to ") from each objective before rendering, then lower-case the first letter
of what remains** unless it is a proper noun or an acronym. An objective that
does not carry the prefix renders as authored.

**Sections**: render each section by `type`. Handle **all ten** types:

| `type` | Rendering |
|---|---|
| `prose` | Optional `.section-heading`, then one `<p class="section-prose">` per `body` entry |
| `diagram` | `.section-diagram` containing `HRL_SVG[section.svg](section.opts)`, then a `.diagram-caption`. If the builder name is unknown, render a `.empty-state` noting the missing diagram — never throw |
| `keypoints` | `.keypoints` list |
| `interactive` | `.widget` shell with the heading and optional `intro`, then mount via `HRL_INTERACTIVE.mount(section.widget, container, section.opts, onComplete)`. **If `HRL_INTERACTIVE` or the named widget is unavailable, render a friendly `.empty-state` — never throw.** `onComplete` marks the section done and updates the chapter progress bar |
| `example` | `.example-box` with heading and paragraphs |
| `coachnote` | `.coachnote` with heading and paragraphs |
| `divisionnote` | `.divisionnote` with heading, optional `intro`, and a real `<table>` built from `columns` and `rows`, with `<th scope="col">` headers. Wrap it in an `overflow-x:auto` container so it never causes horizontal body scroll on a phone |
| `terms` | `.terms-row` of `.term-btn` **`<button>`** elements, one per slug, each opening the glossary popover. A slug missing from `HRL_GLOSSARY` renders as plain text, not a dead button |
| `compare` | Two columns (`left`/`right`), each with its title and items; stacks on narrow screens |
| `steps` | An ordered list of `{title, body}` |

Any unknown `type` renders nothing and logs one `console.warn` — never throws.

**Chapter progress** (`.chapter-progress`): a `.progress-bar` that fills as the
learner scrolls through the sections (use `IntersectionObserver` when available,
falling back to a scroll listener; skip the animation under reduced motion).

**Footer** (`.chapter-nav` + `.chapter-cta`):
- "Take the chapter quiz" → `HRL_SHELL.openQuiz(chapterId)`, styled as the
  primary action. When the chapter is already passed, label it "Retake the quiz"
  and show the best score beside it.
- Previous / Next chapter buttons from `prev`/`next`, omitted when `null`.
- A "Back to My Path" link.

Call `HRL_PROGRESS.markVisited(chapterId)` on render. Move focus to the chapter
title and scroll the reader to the top on every render.

## 3. `renderGlossary()` — the glossary view

- A search `<input type="search">` filtering as you type (match the term, its
  aliases, and its definition text).
- A–Z jump links, and terms grouped under letter headings.
- Each entry: the term, its definition, any aliases, the chapters that introduce
  it (link to them), and its diagram when the glossary entry names one.
- `openTerm(slug)` opens a popover/modal via `HRL_MODAL` with the same content
  plus a "See it in Chapter N" link. Called from every `.term-btn` in the reader.
- Empty search results render a `.empty-state`, not a blank list.

---

## Acceptance for this chunk

- `learn.js` exists, is an ES5-safe single IIFE, and defines all five API functions.
- Every one of the ten section types renders correctly; an unknown type, an
  unknown SVG builder name, an unknown widget name, and an unknown glossary slug
  each degrade gracefully with no thrown error.
- The tier hero falls back to an SVG when the image is missing.
- Every clickable element is a real `<button>` or `<a>`; the accordion is
  keyboard-operable with correct `aria-expanded`.
- `divisionnote` tables scroll inside their own container and never widen the page.
- All data-derived text passes through `esc()`.
- No `undefined`/`null`/`[object Object]` can reach the DOM.
- No TODOs, no `...` placeholders.

## Report back (required)

1. The exported API of `HRL_LEARN` with signatures.
2. The exact call signature you used for `HRL_INTERACTIVE.mount(...)` — Chunk 8b
   must match it precisely.
3. The exact shape you expect from `HRL_GLOSSARY` (every field you read).
4. Every CSS class you emit that is **not** already in `styles.css`.
5. Every function you call on `HRL_PROGRESS`, `HRL_SHELL`, `HRL_SVG`, and
   `HRL_MODAL`, with the signature you assumed.
6. Any deviation from this brief, and why.

---

## CONTRACT ADDENDUM — what `shell.js` already calls (match these exactly)

`shell.js` is written and on disk. **Read it** and conform to these:

- `HRL_LEARN.renderPath()`
- `HRL_LEARN.renderChapter(chapterId)`
- `HRL_LEARN.renderGlossary()`
- `HRL_SHELL.showView('path', { scrollToTier: 'rookie' })` scrolls to a tier by
  looking for **`[data-tier="<tierKey>"]` inside `#view-path`**. Your
  `renderPath()` **must put a `data-tier="<tierKey>"` attribute on each tier
  block** or that navigation silently does nothing.
- `HRL_SHELL.toast(message, kind, opts)` — the third argument is optional.
