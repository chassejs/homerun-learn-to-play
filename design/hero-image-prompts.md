# Optional tier hero art — Grok Imagine prompts

These images are **optional**. The app never depends on them: each tier’s
`heroImage` is `null` until a file is added, and the chapter path renders an
SVG `tierHero` fallback with no broken-image state.

If you generate raster art, save it as 16:9 JPEG at:

- `brand/hero-tier-1.jpg` — Rookie
- `brand/hero-tier-2.jpg` — Sandlot
- `brand/hero-tier-3.jpg` — Diamond
- `brand/hero-tier-4.jpg` — Select
- `brand/hero-tier-5.jpg` — Elite
- `brand/hero-tier-6.jpg` — Pro Mind

Then set the matching `heroImage` on that tier in `src/curriculum-data.js`.

## Shared constraints (apply to every prompt)

- Palette: Homerun Baseball Ottawa — navy `#062448`, red `#a3301f`, cream
  `#f6f3ec`. Use those as the dominant colours in sky, dirt, fabric, and
  negative space. No neon, no team-colour rainbow.
- Light: golden-hour or soft natural light only. Never harsh floodlight,
  never stadium night with hard shadows under the brim of a cap.
- People: rear views or silhouettes of youth players only. **Never
  identifiable faces.** No close-ups of children. Empty diamonds and gear
  still-lifes are always acceptable alternatives.
- Composition: 16:9 landscape. Leave clear space in the upper third or
  along one side for a cream (`#f6f3ec`) or navy (`#062448`) type overlay.
- Photoreal, editorial sports photography. No text, no logos, no watermarks,
  no jersey numbers readable as a face substitute.

---

## 1 — Rookie (`brand/hero-tier-1.jpg`)

Photoreal 16:9 photograph, golden hour just after dawn. An empty youth
baseball diamond, dew still on the infield dirt, seen from behind home plate
looking out toward a quiet outfield. In the lower-left foreground, a
well-worn first glove and a cream-coloured baseball rest on the dirt —
still-life, no hands. Optional: a single small youth silhouette far off on
the outfield grass, back to camera, walking toward the fence; no face. Sky
washes from cream `#f6f3ec` at the horizon into navy `#062448` above. A
narrow stripe of Homerun red `#a3301f` on a windsock or foul-pole padding,
not on a person. Soft natural light, long gentle shadows, never floodlight.
Large empty cream-sky area in the upper-right third for a navy type overlay.
No faces, no logos, no text.

## 2 — Sandlot (`brand/hero-tier-2.jpg`)

Photoreal 16:9 photograph, late-afternoon golden hour on a neighbourhood
youth diamond. Rear view of two youth players on the infield dirt, backs to
camera, one holding a bat at rest, one with a glove on the hip — silhouettes
against the light, no identifiable faces. Alternatively: an empty batter’s
box and a scuffed home plate still-life, bat laid across the cream-coloured
chalk line. Infield dirt warm and dusty; outfield grass catching the sun.
Navy `#062448` in the far tree line and a deepening sky; cream `#f6f3ec`
dust and sky glow; a single red `#a3301f` accent on a catcher’s mask sitting
empty behind the plate. Soft natural light, never harsh floodlight. Clear
open sky in the upper third for a cream/navy type overlay. No faces, no
logos, no text.

## 3 — Diamond (`brand/hero-tier-3.jpg`)

Photoreal 16:9 photograph, golden hour. The nine-position diamond seen from
a high rear angle behind the catcher: empty bases, mound, and outfield,
ready for a game that has not started. Optional still-life in the foreground:
nine gloves in a loose arc on the dirt, empty, cream and navy leather, one
with a thin red `#a3301f` wrist strap. Optional distant silhouettes of youth
players jogging to positions, backs only, too far for faces. Light is low
and warm, not a night game, not floodlit. Navy `#062448` in the tree line
and sky, cream `#f6f3ec` in the infield dust. Leave the upper-left quadrant
open and quietly cream-toned for a navy type overlay. No identifiable faces,
no logos, no text.

## 4 — Select (`brand/hero-tier-4.jpg`)

Photoreal 16:9 photograph, soft late-day light. A youth infield at
double-play depth, seen from the outfield grass looking in — rear view of
four small silhouettes on the dirt (short, second, first, third), no faces,
bodies turned toward the plate. The geometry of the diamond and the cutoff
lanes should read clearly. Alternative: empty diamond with two cream
baseballs on the dirt between first and second, implying a feed, no people
at all. Palette: navy `#062448` sky and distant fence, cream `#f6f3ec` dirt
haze, a restrained red `#a3301f` on a coaching bucket sitting empty in foul
ground. Golden-hour, never floodlight. Clear open sky along the top edge
for a cream type overlay. No identifiable faces, no logos, no text.

## 5 — Elite (`brand/hero-tier-5.jpg`)

Photoreal 16:9 photograph, golden hour. A pitcher and catcher as distant
silhouettes on a youth mound, both with their backs or sides to camera —
battery only, no faces, no batter. Dust hanging in the light off the mound.
Alternative still-life: a catcher’s mask, a navy-and-cream baseball, and a
rulebook lying closed on the grass in foul territory, red `#a3301f` stitching
on the ball. Mood is concentration and game management, not celebration.
Navy `#062448` in the sky gradient, cream `#f6f3ec` in the dust and clouds,
red used once as an accent. Soft natural light, never harsh floodlight.
Leave a quiet cream band across the upper third for a navy type overlay.
No identifiable faces, no logos, no text.

## 6 — Pro Mind (`brand/hero-tier-6.jpg`)

Photoreal 16:9 photograph, dusk just after sunset, still natural light —
no stadium floodlights. An empty grandstand receding into navy `#062448`,
rows of cream `#f6f3ec` seats, a quiet diamond below. In the foreground
still-life, on a wooden rail: an open notebook with blank pages (no
handwriting that could be read as a name), a radar gun pointing toward the
mound, a pencil. No people, or at most a single adult-scale silhouette far
down the aisle, back to camera. A thin red `#a3301f` bookmark in the
notebook. Soft dusk, never floodlight. Keep the right third of the frame
open and dark-navy for a cream type overlay. No identifiable faces, no
logos, no readable notes, no text in the image.
