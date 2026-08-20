# Implementer Brief — Chunk 2 of 9 — `svg.js` (the diagram library)

## HARD CONSTRAINT: NO SHELL ACCESS

Read, Write, Edit, and directory listing only. Do **not** run any command —
not `ls`, not `node --check`, not `git`, not `npm`. A shell call silently
cancels this turn and wastes the run. The reviewer runs every check afterward.

## Context

You are building **Homerun Learn to Play**, a progressive interactive baseball
curriculum app for Homerun Baseball Ottawa. The authoritative spec is
`docs/BUILD-PLAN.md` (read §3 Brand and §4 Visual strategy). Chunk 1 produced
`index.html` and `styles.css` — read both so your SVG output matches the app's
tokens and class conventions.

This chunk delivers **one file: `svg.js`**, exposing `window.HRL_SVG`.

Every later chunk depends on this API being exactly as specified below. The
curriculum data will name these builders by string; the question bank will name
these hotspot ids by string; the interactive widgets will mount these diagrams
and attach behaviour to the hotspot buttons. **Implement the contract exactly.**

## Coding standards

- One IIFE assigning `window.HRL_SVG`. `'use strict';` at the top.
- **ES5-safe only:** `var` (no `let`/`const`), `function` expressions (no arrow
  functions), string concatenation (no template literals), no `class`, no
  destructuring, no default parameters, no optional chaining, no
  `Array.prototype.includes` (use `indexOf`), no `Object.assign` (write a local
  `extend()`).
- **Pure string builders.** Every public builder returns an SVG **string**.
  No DOM access, no `document.*`, no global state, no side effects. The file
  must be loadable in Node (for tests) as well as the browser — guard the
  export as:
  ```js
  if (typeof module !== 'undefined' && module.exports) { module.exports = window.HRL_SVG; }
  ```
  and make the file work when `window` is undefined by starting with
  `var root = typeof window !== 'undefined' ? window : this;` and assigning to
  `root.HRL_SVG`.
- House banner comment at the top:
  ```
  /* ===================================================================
     Homerun Learn to Play — svg.js
     ...
     =================================================================== */
  ```
- **Escape all caller-supplied text** through a local `esc()` before
  interpolating it into markup (`&`, `<`, `>`, `"`, `'`). Labels and titles come
  from data files, but escape anyway.
- **No external URLs.** No `<image href>` to anything outside `brand/`.

## Universal requirements for every builder

1. Every returned root `<svg>` element carries:
   - `role="img"`
   - `aria-labelledby` pointing at a `<title>` and `<desc>` whose ids are unique
     per call (use an internal monotonically increasing counter, e.g. `hrl-svg-7-t`).
   - a `viewBox`, `preserveAspectRatio="xMidYMid meet"`, `width="100%"`,
     `height="auto"`, and `class="hrl-svg hrl-svg-<builderName>"`.
   - `<title>` = `opts.title` or a sensible default; `<desc>` = `opts.desc` or a
     generated plain-language description of what the diagram shows (this is what
     a screen-reader user hears, so make the defaults genuinely descriptive —
     e.g. for `field` with positions on: "A baseball diamond with all nine
     fielders shown at their standard positions.").
2. **Colour** comes from CSS custom properties with literal fallbacks, so the
   diagram is correct even in a context where the stylesheet has not loaded:
   `fill="var(--teach-ball, #dc2626)"`. Never hardcode a brand or teaching colour
   without its `var()` wrapper.
   - Field turf/dirt/lines: use neutral diagram tones defined as literals
     (grass `#e8efe4`, dirt `#e6d9c3`, line `#ffffff`, ink `var(--brand-navy, #062448)`).
     Do **not** paint the field in brand navy/red — brand colours are chrome, the
     field is a teaching surface.
   - Position/role colouring uses the teaching tokens only:
     `--teach-ball #dc2626`, `--teach-base #facc15`, `--teach-backup #16a34a`,
     `--teach-unit-if #0d9488`, `--teach-unit-of #ea580c`, `--teach-battery #374151`.
3. **Colour is never the only signal.** Wherever a role is colour-coded, also
   render a glyph and keep the position abbreviation legible: ball = `B`,
   base = `▲`, backup = `⌂`. Legends must show glyph + colour + word.
4. **Hotspots.** When `opts.hotspots` is a non-empty array of ids, render, for
   each id, a transparent `<rect>`/`<circle>` hit area of at least 44×44 user
   units wrapped so the widget layer can find it:
   `<g class="hrl-hotspot" data-hotspot="<id>" tabindex="0" role="button" aria-label="<human label>">…</g>`
   The widget layer attaches listeners by `[data-hotspot]`; you only emit the
   markup. Hotspot ids must come from the fixed vocabulary in the next section.
5. Text must stay legible at small sizes: minimum font-size 11 user units on an
   800-unit-wide viewBox; use `font-family="inherit"` so it picks up the app stack.
6. No animation in this file. Motion lives in CSS/widgets.

## Hotspot id vocabulary (fixed — do not invent others)

**Positions** (also valid as `roles` keys and `arrows` endpoints):
`p`, `c`, `1b`, `2b`, `3b`, `ss`, `lf`, `cf`, `rf`

**Field parts** (valid hotspot ids on `field`):
`home`, `first`, `second`, `third`, `mound`, `plate`, `infield`, `outfield`,
`foul-left`, `foul-right`, `fair-territory`, `warning-track`, `backstop`,
`batter-box-left`, `batter-box-right`, `catcher-box`, `on-deck-left`,
`on-deck-right`, `coach-box-first`, `coach-box-third`, `dugout-home`,
`dugout-away`, `baseline-first`, `baseline-second`, `baseline-third`,
`baseline-home`, `foul-pole-left`, `foul-pole-right`, `outfield-fence`

**Strike-zone cells** (valid hotspot ids on `strikeZone`):
`zone-1` … `zone-9` (reading left-to-right, top-to-bottom from the catcher's
view), plus `zone-out-high`, `zone-out-low`, `zone-out-in`, `zone-out-away`.

Expose the vocabulary as data so tests and widgets can validate against it:

```js
HRL_SVG.POSITIONS   // ['p','c','1b','2b','3b','ss','lf','cf','rf']
HRL_SVG.FIELD_PARTS // the field-part id array above
HRL_SVG.ZONE_CELLS  // the strike-zone id array above
HRL_SVG.BUILDERS    // ['field','strikeZone','basePaths','positionGrid','swingSequence',
                    //  'throwSequence','countMatrix','sprayChart','scaleGauge','radar','bar','timeline']
HRL_SVG.hotspotLabel(id)  // human-readable label for any id in the vocabulary
HRL_SVG.positionName(id)  // 'ss' -> 'Shortstop'; also positionNumber('ss') -> 6
```

## The twelve builders

Each takes a single `opts` object (always optional — every builder must return
valid SVG when called with no arguments at all). Unknown options are ignored.
All accept the common options `title`, `desc`, `className`, `width` (viewBox
width, defaults below), and `hotspots`.

### `field(opts)` — default viewBox 800×720

The workhorse. Options:

- `preset` — base-path distance preset controlling geometry and the dimension
  labels: `'t-ball'` (60ft bases, 40ft mound), `'minor'` (60/46),
  `'major-ll'` (60/50), `'intermediate'` (70/50), `'junior'` (80/54),
  `'full'` (90/60.5), default `'major-ll'`. **Read
  `/Users/jschasse/knowledge-base/youth-baseball-canada/wiki/concepts/field-dimensions-by-division.md`
  and use the real distances from that page** — do not invent numbers. If that
  page's division names differ from the preset keys above, keep these keys and
  map them to the real divisions in a comment.
- `showDimensions` (bool) — draw base-path and mound-distance callouts.
- `labels` (bool) — label home/1B/2B/3B, mound, foul lines, infield, outfield.
- `positions` (bool) — draw the nine fielder tokens.
- `positionStyle` — `'number'` | `'abbr'` | `'both'` (default `'abbr'`).
- `alignment` — `'standard'` (default), `'infield-in'`, `'dp-depth'`,
  `'bunt-defense'`, `'no-doubles'`, `'of-shallow'`, `'of-deep'`, `'corners-in'`.
  Each shifts the relevant fielders to real, defensible spots.
- `unitColors` (bool, default true when `positions`) — infield teal, outfield
  orange, battery dark grey.
- `roles` — object mapping position id to `'ball'|'base'|'backup'|null`. When
  present, role colours and glyphs override unit colours for those positions,
  and a role legend is drawn.
- `runners` — array of `'first'|'second'|'third'` drawing runner markers on those bases.
- `batter` — `'R'|'L'|null`, draws a batter in the corresponding box.
- `ball` — `{ x: 0..1, y: 0..1 }` in normalized field space, or a named spot
  (`'ss-hole'`, `'up-the-middle'`, `'right-center-gap'`, `'left-center-gap'`,
  `'down-the-line-left'`, `'down-the-line-right'`, `'shallow-center'`,
  `'deep-center'`, `'in-front-of-plate'`), drawing a ball marker.
- `arrows` — array of `{ from, to, style }` where `from`/`to` are position ids,
  base names, or normalized points, and `style` is `'throw'` (solid with
  arrowhead), `'run'` (dashed), `'route'` (dotted), `'cut'` (solid + short cross tick).
- `zones` (bool) — lightly shade infield / outfield / foul territory.
- `covering` — object mapping base name to position id, drawing a small "who
  covers" callout (used by the steal-coverage lesson).
- `hotspots` — ids from `POSITIONS` and/or `FIELD_PARTS`.

The field must look like a real diamond viewed from behind home plate: home at
bottom centre, the outfield fence an arc at the top, foul lines running up-left
and up-right, the infield dirt as a proper 90° arc-cornered diamond, grass
inside and beyond, a pitcher's circle, batter's boxes, coach's boxes, and a
backstop. Proportions should be recognisable, not schematic squares.

### `strikeZone(opts)` — default viewBox 420×520

- `grid` — `3` (3×3 cells, default) or `0` (box only, no cells).
- `showBatter` — `'R'|'L'|null`, silhouette outline beside the zone for scale.
- `showZoneBox` (bool, default true).
- `pitches` — array of `{ x, y, call, n }` where `x`/`y` are normalized 0..1
  across a region wider and taller than the zone itself (so balls plot outside
  it), `call` is `'ball'|'called-strike'|'swinging-strike'|'foul'|'in-play'`,
  and `n` is an optional sequence number drawn inside the dot.
- `zoneRef` — `'youth'|'adult'` label describing the top/bottom reference
  (letters/knees). Read
  `/Users/jschasse/knowledge-base/youth-baseball-canada/wiki/concepts/strike-zone-and-ball-strike-calls.md`
  and use its real description of the zone's boundaries.
- `hotspots` — `ZONE_CELLS` ids.
- Legend maps each `call` value to colour **and** glyph.

### `basePaths(opts)` — default viewBox 600×560

A base-path-focused diamond (no outfield) for baserunning teaching.

- `runners` — array of `{ from, to, style, label }` where `from`/`to` are
  `'home'|'first'|'second'|'third'` and `style` is `'force'|'tag'|'tag-up'|'steal'|'advance'`.
- `shade` — `'force'|'tag'|null`, shading the bases where that kind of out applies.
- `leads` — array of `{ base, type }` with `type` `'primary'|'secondary'`,
  drawing the leadoff marker off that base.
- `labels` (bool), `outs` (0–2, drawn as a small indicator), `hotspots`.

### `positionGrid(opts)` — default viewBox 720×260

A reference card: nine cells, each with the position number, abbreviation, full
name, and unit colour. `highlight` — a position id to emphasise.

### `swingSequence(opts)` — default viewBox 900×260

Five side-by-side stick-figure frames: `stance`, `load`, `stride`, `contact`,
`finish`, each labelled and captioned with one cue. Options: `highlight` (frame
index or name), `order` (array of frame names in a custom order — used by the
`swingOrder` widget to render a shuffled strip), `showLabels` (bool),
`hotspots` (frame ids `frame-stance` … `frame-finish` — add these to your
exported vocabulary as `SWING_FRAMES`).

Draw genuinely different postures per frame — the frames must be visually
distinguishable enough that a learner can order them.

### `throwSequence(opts)` — default viewBox 900×260

Same treatment for throwing: `grip`, `separation`, `stride`, `release`,
`follow-through`, plus an inset four-seam grip detail when `showGrip` is true.
Frame ids `frame-grip` … `frame-follow-through`, exported as `THROW_FRAMES`.

### `countMatrix(opts)` — default viewBox 560×420

The twelve counts as a 4-wide (balls 0–3) × 3-tall (strikes 0–2) grid.
- `highlight` — `'2-1'` style string.
- `shade` — `'leverage'` shades hitter's counts one way and pitcher's counts the
  other, with a legend; `null` leaves it plain.
- Terminal states (`4-x` walk, `x-3` strikeout) shown as edge callouts, not cells.
- `hotspots` — `count-0-0` … `count-3-2` (export as `COUNT_CELLS`).

### `sprayChart(opts)` — default viewBox 700×620

Field outline with plotted batted balls.
- `points` — `{ x, y, type, outcome, label }`, `type` in
  `'ground'|'line'|'fly'|'pop'`, `outcome` in `'hit'|'out'|'error'`.
- `showZones` (bool) — pull/centre/oppo wedges.
- Legend with shape **and** colour per type (circle/square/triangle/diamond).

### `scaleGauge(opts)` — default viewBox 640×220

The 20–80 scouting scale as a horizontal dial: ticks at 20/30/40/50/60/70/80,
band labels (well below average → well above average, 50 = MLB average),
a `value` marker, and an optional `label` naming the tool being graded.
`compare` — an optional second value drawn as a hollow marker.

### `radar(opts)` — default viewBox 520×520

Polygon radar for the BBIQ topic breakdown.
- `topics` — array of `{ label, value }` with `value` 0..1 (3–12 topics).
- `rings` (default 4), `showValues` (bool).
- Must stay legible with long labels — wrap or abbreviate rather than overlap.

### `bar(opts)` — default viewBox 640×360

Horizontal bar chart. `series` — `{ label, value, color?, note? }`; `max`
(auto from data when absent); `unit` (suffix on value labels); `sort` bool.

### `timeline(opts)` — default viewBox 800×280

Horizontal progression timeline for age-band / LTAD-stage content.
`items` — `{ label, sub, marker }`; `highlight` — index or label.

## Acceptance for this chunk

- `svg.js` exists, is a single IIFE, is ES5-safe, and defines every name in the
  `HRL_SVG` API listed above (twelve builders plus the five vocabulary exports
  plus `hotspotLabel`, `positionName`, `positionNumber`, `SWING_FRAMES`,
  `THROW_FRAMES`, `COUNT_CELLS`).
- Every builder returns a valid, well-formed SVG string when called with **no
  arguments**, and when called with every documented option set.
- Every returned SVG has `role="img"`, a `<title>`, a `<desc>`, a `viewBox`, and
  a unique `aria-labelledby` id pair.
- No `document`, `window.document`, or DOM API is referenced anywhere in the file
  (other than the `root` shim at the top).
- No TODOs, no `...` placeholders, no builder that returns an empty or
  stub diagram. Every one draws real, complete artwork.
- File is loadable under Node with `require` and under the browser as a script tag.

## Report back (required)

End your turn with:

1. The complete list of names exported on `HRL_SVG` (builders, vocabularies, helpers).
2. For each of the twelve builders: its exact option names, their accepted values,
   and its default viewBox.
3. The final contents of `HRL_SVG.FIELD_PARTS`, `ZONE_CELLS`, `SWING_FRAMES`,
   `THROW_FRAMES`, and `COUNT_CELLS` as literal arrays.
4. Every CSS class you emit inside the SVG markup (so `styles.css` can be
   extended to style them).
5. The field-dimension values you took from the knowledge base, with the division
   each preset maps to.
6. Any deviation from this brief, and why.
