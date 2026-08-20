# Implementer Brief — Chunk 10 — illustrated tier hero art in `svg.js`

## HARD CONSTRAINT: NO SHELL ACCESS

Read, Write, Edit, and directory listing only. Do **not** run any command. A
shell call silently cancels this turn. The reviewer runs every check.

## Why this chunk exists

Each of the six tiers declares a `heroImage` (`brand/hero-tier-1.jpg` …
`hero-tier-6.jpg`) and a `heroFallback`. **Those raster files do not exist and
will not exist in this build** — no image generation is available here. So the
fallback is not a fallback in practice: it is what every learner actually sees at
the top of every chapter.

Right now the fallbacks are plain teaching diagrams (a labelled field, a count
matrix). A teaching diagram is the wrong thing at the top of a chapter — it is
information, not invitation, and the same diagram often repeats a few hundred
pixels further down the page.

This chunk replaces them with **six purpose-drawn illustrated banner scenes**, so
the app is genuinely attractive without any raster art.

## What to build

### 1. A new builder in `svg.js`: `tierHero(opts)`

- Add it to `HRL_SVG` and to the `BUILDERS` array.
- `opts: { tier: 'rookie'|'sandlot'|'diamond'|'select'|'elite'|'promind',
           title: string, subtitle: string }`
- Default viewBox **1200×420** (a 20:7 banner). Same universal requirements as
  every other builder: `role="img"`, unique `<title>`/`<desc>` id pair, viewBox,
  `preserveAspectRatio`, `class="hrl-svg hrl-svg-tierHero"`, no `height`
  attribute, no DOM access, pure string return, ES5-safe code, all text escaped.
- Calling it with no arguments returns a valid banner (default to `rookie`).

### 2. Six distinct scenes

Each tier gets its **own composition** — not one scene recoloured six times. A
learner moving from Rookie to Pro Mind should see the artwork change with them.

Shared visual language, drawn from the Homerun Baseball Ottawa brand:
- A **golden-hour sky gradient** as the ground of every scene: warm at the
  horizon, deepening to brand navy `#062448` at the top. Vary the warmth by tier
  (Rookie = early morning, Pro Mind = dusk).
- **Silhouettes only.** Any human figure is a solid dark silhouette in rear or
  profile view — **never a face, never facial features.** This is a youth-sport
  brand rule, not a stylistic preference.
- A restrained accent in brand red `#a3301f` — one element per scene, not a wash.
- Room in the composition for a **cream/navy type overlay** on the left third:
  keep that area visually quiet.
- Subtle depth: a horizon line, a treeline or fence silhouette, a few grass or
  dirt marks. No photorealism — flat, confident shapes.

Suggested subjects (adjust if a better composition presents itself, and say so):

| Tier | Scene |
|---|---|
| `rookie` | An empty diamond at first light. A glove and a ball resting on home plate. Nobody there yet. |
| `sandlot` | A backstop and a single batter silhouette in the box, bat back, waiting on a pitch. |
| `diamond` | Three fielder silhouettes at their positions across a wide infield, mid-ready-position. |
| `select` | A wider field with throw arcs traced across it in the teaching colours — the ball/base/backup idea rendered as pure geometry. |
| `elite` | A dugout rail in the foreground, a field beyond, a lineup card and a pencil on the rail. |
| `promind` | A grandstand at dusk, a radar gun and a notebook on a seat, the field small and distant below. |

### 3. Text handling

- Render `opts.title` large in cream `#f6f3ec`, and `opts.subtitle` smaller
  beneath it, both in the left third over the quiet area.
- Add a soft navy scrim behind the text block so contrast holds at **≥4.5:1**
  against every part of the gradient it can overlap. Do not rely on the gradient
  alone.
- Both are optional — with neither supplied, render the scene alone, cleanly
  composed with no empty gap where the text would have been.
- Escape both through the existing `esc()`.

### 4. Rewire the tiers to use it

Edit **`src/curriculum-data.js`** only. For each of the six tiers, change
`heroFallback` to:

```js
heroFallback: { svg: 'tierHero', opts: { tier: '<tierKey>' } }
```

Leave `heroImage` exactly as it is — if someone later drops real raster art at
those paths, it should still take precedence. Change nothing else in the file.

### 5. One CSS rule

Add to `styles.css`, near the existing `.hrl-svg` rule:

```css
.hrl-svg-tierHero { border-radius: var(--radius-lg); }
```

Nothing else in `styles.css`.

## Acceptance

- `HRL_SVG.tierHero` exists, is in `BUILDERS`, and returns valid SVG for all six
  tier keys, for an unknown key (falls back to `rookie`), and for no arguments.
- Six visibly **different** compositions — not one scene with six palettes.
- No human face or facial feature anywhere in any scene.
- Title/subtitle text sits at ≥4.5:1 contrast against whatever is behind it.
- All six tiers in `src/curriculum-data.js` point `heroFallback` at `tierHero`
  with their own key; `heroImage` values are untouched.
- No `document` access, no DOM API, pure string return, ES5-safe.
- `svg.js` and `src/curriculum-data.js` still parse; no other file is modified
  beyond the single `styles.css` rule.

## Report back

1. The `tierHero` option list and default viewBox.
2. A one-line description of each of the six compositions as you actually drew
   them, and any place you departed from the suggested subject.
3. The contrast approach you used behind the title text.
4. Confirmation that all six `heroFallback` values were rewired and that
   `heroImage` was left alone.
5. Any deviation from this brief, and why.
