# Implementer Brief — Chunk 1b — `styles.css` only

## HARD CONSTRAINT: NO SHELL ACCESS

Read, Write, Edit, and directory listing only. Do **not** run any command —
not `ls`, not `node --check`, not `git`, nothing. A shell call silently cancels
this turn. The reviewer runs all checks.

## Situation

A previous turn was interrupted after it created `index.html`, `manifest.json`,
`package.json`, and `version.json`. **Those four files are done — do not touch
them.** Only `styles.css` is missing.

## What to do

1. **Read `.claude/build-runs/2026-08-20T03-09-55/implementer-brief.md`** — the
   original Chunk 1 brief. Section "### 1. `styles.css`" is your complete spec:
   the exact `:root` token block, the six tier accent tokens, the font stack,
   the contrast rules, the full list of required class names grouped by
   component, and the required global rules (box-sizing, focus-visible,
   44px targets, reduced-motion, responsive breakpoints, print, texture).
2. **Read `index.html`** in this repo — the file that already exists. Your CSS
   must style the markup that is actually there: match its real class names and
   ids exactly, and add the forward-looking classes the brief lists for markup
   that later chunks will generate.
3. **Read `/Users/jschasse/Documents/JS Chassé/Projects/homerun-practice-app/styles.css`**
   for house style — the token-block opening, the section comment banners, the
   overall organisation. Follow that discipline.
4. **Write `styles.css`** — complete, real CSS. Every class named in the brief
   gets real rules. No TODO comments, no `/* add rules here */` placeholders,
   no empty rule bodies.

## Reminders that matter

- The five brand hex values (`#062448`, `#14294d`, `#a3301f`, `#8d2418`,
  `#f6f3ec`) appear verbatim and are never altered.
- Teaching colours (`#dc2626`, `#facc15`, `#16a34a`, `#0d9488`, `#ea580c`,
  `#374151`) are defined as tokens but used only for field-diagram styling.
- White text only on navy or red; navy text only on cream or white. Never red
  text on navy at body size. Never cream paragraphs on red.
- Font stack exactly:
  `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`.
  No `@font-face`, no external font URL.
- No external URLs of any kind. Images referenced only from `brand/`, and only
  these filenames exist: `crest.png`, `wordmark.png`, `mark.png`, `icon-32.png`,
  `icon-180.png`, `icon-512.png`, `crest-mono-cream.jpg`, `mark-filled.jpg`,
  `lockup-horizontal.jpg`, `diamond-golden-hour.jpg`, `pattern-brand-tile.jpg`,
  `slide-navy-backdrop.jpg`, `values-triad.jpg`, `roots-diagram.jpg`,
  `icon-effort.jpg`, `icon-respect.jpg`, `icon-team.jpg`.
- The hero uses `brand/diamond-golden-hour.jpg` behind a navy scrim strong
  enough that cream text on it stays at least 4.5:1.
- No horizontal body scroll at 360px wide.
- Honour both `@media (prefers-reduced-motion: reduce)` and a `body.reduced-motion`
  class.

Write the whole file in one Write call. Aim for a thorough, production-quality
stylesheet — this is the visual envelope for the entire app.

## Report back (required)

End your turn by listing:

1. Every custom property defined in `:root`, with the six tier accent token
   names and their hex values spelled out.
2. Every class selector you defined, grouped by component area, flagging any
   class you added that was not requested and any requested class you did not
   define (with the reason).
3. The breakpoint values you used.
4. Any deviation from the brief and why.
