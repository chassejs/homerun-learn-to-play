# Implementer Brief — Chunk 13 — stop widgets repeating their section heading

## HARD CONSTRAINT: NO SHELL ACCESS

Read, Write, Edit, and directory listing only. Do **not** run any command. A
shell call silently cancels this turn. The reviewer runs every check.

## The defect (found by auditing all 24 chapters in a browser)

Every `interactive` section renders its heading **twice**: once as the section's
own `.section-heading` (from `learn.js`) and again as the widget's `.widget-head`
(from `interactive.js`). This happens in **all 25 interactive sections across all
24 chapters** — it is systemic, not a one-off.

Observed, chapter by chapter:

```
ch01 "Did that score a run?"        ch13 "Spot the alignment"
ch02 "Label the field"              ch14 "Assign the nine"
ch03 "Place the nine"               ch15 "Pitcher's move: go, hold, or balk"
ch04 "Make the safety call"         ch16 "Small ball — make the call"
ch05 "Call the pitch"               ch17 "Make the call"
ch05 "Build the count"              ch18 "Build the sequence"
ch06 "Safe or out?"                 ch19 "Swing or take"
ch07 "Where does each runner end up?"  ch20 "Manage the game"
ch08 "Does this game keep going?"   ch21 "Score the play"
ch09 "Put the swing in order"       ch22 "Match the question, then read what it hides"
ch10 "Arm-care check: rest, limits, and pain"  ch23 "Grade the tool"
ch11 "Place the infield"            ch24 "Make the call"
ch12 "Pitching days: max, rest, and crossing over"
```

On screen the learner sees the same phrase on two consecutive lines, the second
one inside the widget's navy header bar.

This is the same class of defect as the view-heading duplication fixed in the
previous chunk, one level further down.

## The rule

**The section owns the heading. The widget does not repeat it.**

`learn.js` already renders `.section-heading` from `section.heading` for every
section type. The widget is mounted *inside* that section, so its own
`.widget-head` is redundant whenever it would carry the same text.

## The fix

In **`interactive.js`**, in the shared mount path (not in each of the sixteen
widgets — fix it once in the registry/`ctx` layer):

1. When building a widget's `.widget-head`, compare the title the widget is about
   to render against the heading text already present on the **enclosing
   `.section`** (`container.closest('.section')`, then its
   `.section-heading`, falling back to its first `h3`).
2. If the two match after trimming and collapsing whitespace (compare
   case-insensitively), **do not render the `.widget-head` at all.** Render the
   widget body directly.
3. If they differ, render the `.widget-head` as it does now — a widget with a
   genuinely different title still gets its header bar.
4. If there is no enclosing `.section` or no section heading (a widget mounted
   somewhere else), render the `.widget-head` as now.

Guard every DOM lookup — `closest` may return `null`, and the widget must never
throw because of this check.

Keep the widget's **intro/instruction paragraph** — that is different text and
carries real information. Only the duplicated title goes.

## Heading levels

With the `.widget-head` gone, make sure any heading the widget renders inside its
body (a per-case title, a "Situation 3 of 9" label) is an `h4` or a non-heading
element, so the document outline stays `h1` (app bar) → `h2` (view) → `h3`
(section) → `h4` (within section). Do not introduce an `h3` inside a section that
already has one.

## Do not change

- `learn.js` — the section heading is correct and stays where it is.
- `styles.css` — `.widget-head` keeps its styling for the cases that still use it.
- `index.html` and any data file.
- The behaviour of any individual widget.

## Acceptance

- Rendering every one of the 24 chapters produces **zero** cases where a
  `.widget-head`'s text equals its enclosing section's heading text.
- A widget whose title genuinely differs from its section heading still shows its
  `.widget-head`.
- No widget throws when mounted outside a `.section`.
- Every widget still mounts, and Check/Reset/status still work.
- Exactly one `h3` per section; no heading level is skipped.
- `interactive.js` still parses and stays ES5-safe.

## Report back

1. Where in `interactive.js` you put the comparison, and the exact matching rule
   (trimming, whitespace collapsing, case handling).
2. Which widgets, if any, still render a `.widget-head` after the change, and why
   their title legitimately differs.
3. What heading level widgets now use inside their bodies.
4. Any deviation from this brief, and why.
