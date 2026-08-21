# Implementer Brief — Chunk B of B — feedback reachable from anywhere

## HARD CONSTRAINT: NO SHELL ACCESS

Read, Write, Edit, and directory listing only. Do **not** run any command —
not `ls`, not `node --check`, not `git`, not `npm`. A shell call silently
cancels this turn. The reviewer runs every check.

## Context

**Homerun Learn to Play** — vanilla, build-step-free static web app for Homerun
Baseball Ottawa. Eight views switched by `shell.js`; no framework.

**Read before writing:**

- `feedback.js` — **already a good form.** It has a 1–5 star rating, a category
  dropdown, a details field, a copy-to-clipboard fallback, and it already builds
  a `mailto:` to `feedback-learn@homerunbaseballottawa.ca` stamping app version,
  page URL, user agent, screen size, and timestamp. Its only public method is
  `open()`. **You are adding to this, not rewriting it.**
- `shell.js` — owns navigation. `HRL_SHELL.current()` returns the active view
  name; `HRL_SHELL.on('viewchange', fn)` fires on every view change. Read both.
- `index.html` — the app shell. Note `#modal-root`, `#toast-root`, and the
  `#app-footer` with its existing `#footer-feedback` button.
- `styles.css` — the design system. Brand tokens are `--brand-navy #062448`,
  `--brand-red #a3301f`, `--brand-cream #f6f3ec`. Reuse existing classes and
  tokens; do not invent a parallel palette.
- `version.js` — chunk A added `BUILD_ID` and `BUILD_TIME` to this file. Read it
  to get the actual exported names before referencing them.

## What is missing

Feedback is currently reachable from exactly two places: a button in the Help
view and a link in the footer. A learner who hits a wrong quiz answer in
Chapter 17 has to scroll to the footer or navigate to Help to report it — so
they won't. The form also does not know which view they were on, which is the
single most useful piece of context for triage.

## Coding standards

- **ES5-safe only** in `feedback.js` and `shell.js`: `var`, `function`
  expressions, string concatenation. No `let`/`const`, arrow functions, template
  literals, `class`, destructuring, default parameters, optional chaining,
  `Array.prototype.includes`, `Object.assign`.
- Guard every `document` access behind `typeof document !== 'undefined'`.
- Escape all interpolated text. Every value that reaches the `mailto:` URL must
  be `encodeURIComponent`-ed so nothing user-typed can inject a mail header.
- No new dependencies, no network calls, no external URLs.

---

## 1. `feedback.js` — a floating button, mounted once

Add a `mount()` method to the returned object (keep `open()` exactly as it is).

`mount()` renders a **single** floating action button into the document, once:

- A real `<button type="button" class="feedback-fab">` with an accessible name
  ("Send feedback"), a visible text label at wider widths and an icon-only
  presentation on narrow screens (keep the accessible name either way).
- Fixed position, bottom-right, above page content but **below** any open modal.
- Clicking it calls `open()`.
- Idempotent: calling `mount()` twice must not produce two buttons.
- No-op when `document` is unavailable.
- Give it `class="... no-print"` so it never appears in printed chapters.

The icon should be a small inline SVG envelope or speech bubble — inline, not an
external file. `aria-hidden="true"` on the glyph, since the button already has a
text name.

## 2. `feedback.js` — a view-context field

Add a **"Where in the app?"** `<select>` to the form, *above* the existing
category dropdown, pre-selected to the view the user was on when they opened it.

Options (value → label):

| value | label |
|---|---|
| `home` | Home |
| `path` | My Path |
| `chapter` | A chapter |
| `quiz` | A chapter quiz |
| `iq` | Baseball IQ test |
| `review` | Review deck |
| `glossary` | Glossary |
| `help` | Help & Guide |
| `other` | Somewhere else |

Pre-fill by reading `HRL_SHELL.current()` when the form opens, mapping the view
name to the matching value and falling back to `other` for anything unrecognised.
Guard the call — `HRL_SHELL` may not be loaded, and must not throw.

**When the user is in a chapter or a quiz, also capture which one.** Read it
from the rendered view (the chapter title is the `#view-chapter` heading; the
quiz heading names its chapter) and include it in the email as a separate line.
If it cannot be determined, omit the line rather than writing "unknown".

## 3. `feedback.js` — richer email body

Extend `buildBody` (do not restructure it) so the `---` footer block carries:

```
App version: <APP_VERSION>
Build: <BUILD_ID>
Where: <context label><, chapter title if known>
Page: <existing pageLine()>
Device: <existing deviceLine()>
Screen: <existing screenLine()>
Sent: <existing ISO timestamp>
```

Read `BUILD_ID` from `window.HRL_VERSION`. Guard it: if the constant is missing
(an older cached build), print `unknown` rather than throwing.

Add the context label to `buildSubject` too, so triage can be done from the
subject line alone:
`Homerun Learn to Play feedback — <category> — <where>` (keep the existing
`— n/5` rating suffix when a rating was given).

Keep the existing `MAIL_BODY_LIMIT` truncation and the copy-to-clipboard
fallback working — the new lines must be inside the part that survives
truncation, so re-check the ordering.

## 4. `index.html` — mount point

Add an empty container for the floating button next to `#modal-root` and
`#toast-root`:

```html
<div id="feedback-fab-root"></div>
```

Change nothing else. Keep the existing `#footer-feedback` button — the footer
link and the floating button are both fine.

## 5. `shell.js` — wire it up

In `init()`, after the rest of the wiring, call
`window.HRL_FEEDBACK.mount()` — guarded, so a missing module degrades to a
friendly no-op rather than a thrown error, consistent with how `init()` already
guards its other module calls.

## 6. `styles.css` — style the button

Add rules near the existing `.toast` / overlay rules:

- `.feedback-fab` — fixed bottom-right, brand red background (`--brand-red`)
  with white text (white-on-red is an approved brand pairing; navy-on-red is
  not), rounded, `--shadow-pop`, `z-index` **below** the modal layer and above
  page content.
- Minimum **44×44** hit area.
- `:hover` uses `--brand-red-2`; `:focus-visible` gets the standard 2px focus
  ring, offset so it is visible against the red.
- Below 768px: icon-only, circular, smaller footprint. At/above 768px: icon plus
  the text label.
- It must **not** overlap the footer's controls at 360px — give the footer
  enough bottom padding, or shift the button up by the footer height. Check the
  existing footer rules and pick whichever fits that layout.
- `@media print { .feedback-fab { display: none !important; } }` — or rely on
  the existing `.no-print` rule if there is one; check before duplicating.
- Honour reduced motion: no transition under
  `@media (prefers-reduced-motion: reduce)` and under `body.reduced-motion`.

## 7. `sw.js`

No new runtime files are introduced by this chunk, so `ASSETS` should not need a
change. Verify that, and say so in your report. If chunk A left something out,
note it rather than fixing it here.

## Acceptance for this chunk

- `HRL_FEEDBACK.mount()` exists, is idempotent, and renders one keyboard-
  reachable floating button that opens the existing form.
- The button is present on all eight views, does not obscure the footer at
  360px, and is hidden in print.
- The form shows a pre-filled "Where in the app?" selector, correct for the view
  it was opened from, falling back to `other`.
- The generated `mailto:` targets `feedback-learn@homerunbaseballottawa.ca` and
  its body carries app version, build id, context, page, device, screen, and
  timestamp, with every value percent-encoded.
- The subject line carries the category and the context.
- `open()`'s existing behaviour — rating, category, details, validation, copy
  fallback, truncation — is unchanged.
- `feedback.js` and `shell.js` remain ES5-safe and parse.
- Nothing throws when `HRL_SHELL` or `HRL_VERSION` is unavailable, and the app
  still works from `file://`.

## Report back (required)

1. The full public API of `HRL_FEEDBACK` after your change.
2. The exact option list and the view-name → value mapping you used.
3. The final `buildBody` footer block and the final subject format, verbatim.
4. Every CSS class and `z-index` value you added, and how you kept the button
   clear of the footer at 360px.
5. How you read the chapter/quiz title, and what happens when it is not found.
6. Confirmation that `sw.js` needed no change (or what is missing).
7. Anything in this brief that conflicted with what you found on disk.
