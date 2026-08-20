/* ===================================================================
   Homerun Learn to Play — svg.js
   Deterministic SVG diagram library. Every public builder returns an
   SVG string. No DOM access, no global state, no animation.
   ES5-safe (var, function, string concatenation) so the file loads as
   a browser script (root.HRL_SVG) and via Node require() for tests.
   =================================================================== */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;

  var svgSeq = 0;

  /* Colour: CSS custom properties with literal fallbacks. Field turf/dirt
     are teaching-surface neutrals, not brand chrome. */
  var COL = {
    grass: '#e8efe4',
    grassFoul: '#d5e0d0',
    grassIn: '#dce8d6',
    dirt: '#e6d9c3',
    dirtDark: '#cbb99a',
    warning: '#d9cbb0',
    line: '#ffffff',
    ink: 'var(--brand-navy, #062448)',
    cream: 'var(--brand-cream, #f6f3ec)',
    white: 'var(--brand-white, #ffffff)',
    muted: 'var(--ink-muted, #4a5568)',
    border: 'var(--color-border, #d8d3c6)',
    ball: 'var(--teach-ball, #dc2626)',
    base: 'var(--teach-base, #facc15)',
    backup: 'var(--teach-backup, #16a34a)',
    unitIf: 'var(--teach-unit-if, #0d9488)',
    unitOf: 'var(--teach-unit-of, #ea580c)',
    battery: 'var(--teach-battery, #374151)'
  };

  /* ------------------------------------------------------------------ */
  /* Vocabulary                                                          */
  /* ------------------------------------------------------------------ */

  var POSITIONS = ['p', 'c', '1b', '2b', '3b', 'ss', 'lf', 'cf', 'rf'];

  var FIELD_PARTS = [
    'home', 'first', 'second', 'third', 'mound', 'plate', 'infield', 'outfield',
    'foul-left', 'foul-right', 'fair-territory', 'warning-track', 'backstop',
    'batter-box-left', 'batter-box-right', 'catcher-box', 'on-deck-left',
    'on-deck-right', 'coach-box-first', 'coach-box-third', 'dugout-home',
    'dugout-away', 'baseline-first', 'baseline-second', 'baseline-third',
    'baseline-home', 'foul-pole-left', 'foul-pole-right', 'outfield-fence'
  ];

  var ZONE_CELLS = [
    'zone-1', 'zone-2', 'zone-3',
    'zone-4', 'zone-5', 'zone-6',
    'zone-7', 'zone-8', 'zone-9',
    'zone-out-high', 'zone-out-low', 'zone-out-in', 'zone-out-away'
  ];

  var SWING_FRAMES = [
    'frame-stance', 'frame-load', 'frame-stride', 'frame-contact', 'frame-finish'
  ];

  var THROW_FRAMES = [
    'frame-grip', 'frame-separation', 'frame-stride', 'frame-release', 'frame-follow-through'
  ];

  var COUNT_CELLS = [
    'count-0-0', 'count-1-0', 'count-2-0', 'count-3-0',
    'count-0-1', 'count-1-1', 'count-2-1', 'count-3-1',
    'count-0-2', 'count-1-2', 'count-2-2', 'count-3-2'
  ];

  var BUILDERS = [
    'field', 'strikeZone', 'basePaths', 'positionGrid', 'swingSequence',
    'throwSequence', 'countMatrix', 'sprayChart', 'scaleGauge', 'radar', 'bar', 'timeline'
  ];

  var POSITION_NAMES = {
    p: 'Pitcher',
    c: 'Catcher',
    '1b': 'First Base',
    '2b': 'Second Base',
    '3b': 'Third Base',
    ss: 'Shortstop',
    lf: 'Left Field',
    cf: 'Center Field',
    rf: 'Right Field'
  };

  var POSITION_NUMBERS = {
    p: 1, c: 2, '1b': 3, '2b': 4, '3b': 5, ss: 6, lf: 7, cf: 8, rf: 9
  };

  var HOTSPOT_LABELS = {
    p: 'Pitcher',
    c: 'Catcher',
    '1b': 'First base',
    '2b': 'Second base',
    '3b': 'Third base',
    ss: 'Shortstop',
    lf: 'Left field',
    cf: 'Center field',
    rf: 'Right field',
    home: 'Home plate',
    first: 'First base',
    second: 'Second base',
    third: 'Third base',
    mound: "Pitcher's mound",
    plate: 'Home plate',
    infield: 'Infield',
    outfield: 'Outfield',
    'foul-left': 'Left foul territory',
    'foul-right': 'Right foul territory',
    'fair-territory': 'Fair territory',
    'warning-track': 'Warning track',
    backstop: 'Backstop',
    'batter-box-left': "Left batter's box (third-base side)",
    'batter-box-right': "Right batter's box (first-base side)",
    'catcher-box': "Catcher's box",
    'on-deck-left': 'Left on-deck circle',
    'on-deck-right': 'Right on-deck circle',
    'coach-box-first': "First-base coach's box",
    'coach-box-third': "Third-base coach's box",
    'dugout-home': 'Home dugout',
    'dugout-away': 'Away dugout',
    'baseline-first': 'First-base line (home to first)',
    'baseline-second': 'Second-base line (first to second)',
    'baseline-third': 'Third-base line (second to third)',
    'baseline-home': 'Home-base line (third to home)',
    'foul-pole-left': 'Left-field foul pole',
    'foul-pole-right': 'Right-field foul pole',
    'outfield-fence': 'Outfield fence',
    'zone-1': 'Strike zone 1 (high inside for a right-handed batter)',
    'zone-2': 'Strike zone 2 (high middle)',
    'zone-3': 'Strike zone 3 (high away for a right-handed batter)',
    'zone-4': 'Strike zone 4 (middle inside for a right-handed batter)',
    'zone-5': 'Strike zone 5 (middle middle)',
    'zone-6': 'Strike zone 6 (middle away for a right-handed batter)',
    'zone-7': 'Strike zone 7 (low inside for a right-handed batter)',
    'zone-8': 'Strike zone 8 (low middle)',
    'zone-9': 'Strike zone 9 (low away for a right-handed batter)',
    'zone-out-high': 'Ball high (above the zone)',
    'zone-out-low': 'Ball low (below the zone)',
    'zone-out-in': 'Ball inside (catcher\'s left)',
    'zone-out-away': 'Ball away (catcher\'s right)',
    'frame-stance': 'Stance',
    'frame-load': 'Load',
    'frame-stride': 'Stride',
    'frame-contact': 'Contact',
    'frame-finish': 'Finish',
    'frame-grip': 'Grip',
    'frame-separation': 'Separation',
    'frame-release': 'Release',
    'frame-follow-through': 'Follow-through',
    'count-0-0': 'Count 0-0',
    'count-1-0': 'Count 1-0',
    'count-2-0': 'Count 2-0',
    'count-3-0': 'Count 3-0',
    'count-0-1': 'Count 0-1',
    'count-1-1': 'Count 1-1',
    'count-2-1': 'Count 2-1',
    'count-3-1': 'Count 3-1',
    'count-0-2': 'Count 0-2',
    'count-1-2': 'Count 1-2',
    'count-2-2': 'Count 2-2',
    'count-3-2': 'Count 3-2'
  };

  /* Field-dimension presets. Keys are the API contract; distances come
     from youth-baseball-canada wiki/concepts/field-dimensions-by-division.md.

     t-ball        → rec T-ball teaching diamond. 60 ft bases (LL Tee Ball).
                     40 ft pitching is Baseball Québec 11U Class B — the only
                     40-ft mound on that page (LL Tee Ball pitching is 46 ft).
     minor         → Little League Minor: 60 ft / 46 ft, 6 in mound, OF min 200.
     major-ll      → Little League Major: 60 ft / 46 ft (same grid as Minor /
                     Tee Ball “and below”). Brief listed 50; the KB says 46.
     intermediate  → Little League Intermediate (50-70): 70 ft / 50 ft, 8 in.
     junior        → Little League Junior option: 80 ft / 54 ft (default Junior
                     is the full 90 / 60 ft 6 in diamond).
     full          → LL Junior/Senior default and BC 18U / 22U / Men’s:
                     90 ft / 60 ft 6 in. */
  var PRESETS = {
    't-ball': { bases: 60, mound: 40, fence: 200, moundH: 6, label: 'T-ball' },
    minor: { bases: 60, mound: 46, fence: 200, moundH: 6, label: 'LL Minor' },
    'major-ll': { bases: 60, mound: 46, fence: 200, moundH: 6, label: 'LL Major' },
    intermediate: { bases: 70, mound: 50, fence: 200, moundH: 8, label: 'LL Intermediate' },
    junior: { bases: 80, mound: 54, fence: 300, moundH: 10, label: 'LL Junior (option)' },
    full: { bases: 90, mound: 60.5, fence: 300, moundH: 10, label: 'Full / 90-foot' }
  };

  var BALL_SPOTS = {
    'ss-hole': { x: -22, y: 92, scale: 'if' },
    'up-the-middle': { x: 0, y: 105, scale: 'if' },
    'right-center-gap': { x: 70, y: 250, scale: 'of' },
    'left-center-gap': { x: -70, y: 250, scale: 'of' },
    'down-the-line-left': { x: -78, y: 155, scale: 'if' },
    'down-the-line-right': { x: 78, y: 155, scale: 'if' },
    'shallow-center': { x: 0, y: 185, scale: 'of' },
    'deep-center': { x: 0, y: 305, scale: 'of' },
    'in-front-of-plate': { x: 0, y: 9, scale: 'if' }
  };

  var SWING_META = [
    { id: 'frame-stance', name: 'stance', title: 'Stance', cue: 'Athletic, eyes on the pitcher' },
    { id: 'frame-load', name: 'load', title: 'Load', cue: 'Weight back, hands back' },
    { id: 'frame-stride', name: 'stride', title: 'Stride', cue: 'Step to the pitcher, stay closed' },
    { id: 'frame-contact', name: 'contact', title: 'Contact', cue: 'Short to the ball, firm front side' },
    { id: 'frame-finish', name: 'finish', title: 'Finish', cue: 'High finish, stay balanced' }
  ];

  var THROW_META = [
    { id: 'frame-grip', name: 'grip', title: 'Grip', cue: 'Four-seam across the horseshoe' },
    { id: 'frame-separation', name: 'separation', title: 'Separation', cue: 'Hands break, down, back, up' },
    { id: 'frame-stride', name: 'stride', title: 'Stride', cue: 'Long step, glove side to the target' },
    { id: 'frame-release', name: 'release', title: 'Release', cue: 'Out front, fingers behind the ball' },
    { id: 'frame-follow-through', name: 'follow-through', title: 'Follow-through', cue: 'Chest to glove, decelerate' }
  ];

  var PITCH_CALLS = {
    ball: { color: 'var(--ink-muted, #4a5568)', glyph: 'O', word: 'Ball' },
    'called-strike': { color: 'var(--teach-base, #facc15)', glyph: 'C', word: 'Called strike' },
    'swinging-strike': { color: 'var(--teach-ball, #dc2626)', glyph: 'S', word: 'Swinging strike' },
    foul: { color: 'var(--teach-unit-of, #ea580c)', glyph: 'F', word: 'Foul' },
    'in-play': { color: 'var(--teach-backup, #16a34a)', glyph: 'P', word: 'In play' }
  };

  var HITTER_COUNTS = { '1-0': 1, '2-0': 1, '3-0': 1, '2-1': 1, '3-1': 1 };
  var PITCHER_COUNTS = { '0-1': 1, '0-2': 1, '1-2': 1 };

  /* ------------------------------------------------------------------ */
  /* Utilities                                                           */
  /* ------------------------------------------------------------------ */

  function uid() {
    svgSeq += 1;
    return 'hrl-svg-' + svgSeq;
  }

  function extend(a, b) {
    var out = {}, k;
    if (a) {
      for (k in a) {
        if (Object.prototype.hasOwnProperty.call(a, k)) out[k] = a[k];
      }
    }
    if (b) {
      for (k in b) {
        if (Object.prototype.hasOwnProperty.call(b, k)) out[k] = b[k];
      }
    }
    return out;
  }

  function esc(s) {
    if (s === null || s === undefined) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function optsOf(opts) {
    if (!opts || typeof opts !== 'object') return {};
    return extend({}, opts);
  }

  function isArr(v) {
    return Object.prototype.toString.call(v) === '[object Array]';
  }

  function asArr(v) {
    return isArr(v) ? v : [];
  }

  function nr(v) {
    if (typeof v !== 'number' || isNaN(v)) return 0;
    return Math.round(v * 100) / 100;
  }

  function hasHot(opts, id) {
    var h = opts && opts.hotspots;
    if (!h || !h.length) return false;
    return h.indexOf(id) !== -1;
  }

  function anyHot(opts) {
    return !!(opts && opts.hotspots && opts.hotspots.length);
  }

  function hotspotLabel(id) {
    if (id === null || id === undefined) return '';
    if (HOTSPOT_LABELS[id]) return HOTSPOT_LABELS[id];
    return String(id);
  }

  function positionName(id) {
    return POSITION_NAMES[id] || String(id || '');
  }

  function positionNumber(id) {
    if (POSITION_NUMBERS[id] === undefined) return null;
    return POSITION_NUMBERS[id];
  }

  function unitOf(id) {
    if (id === 'p' || id === 'c') return 'battery';
    if (id === 'lf' || id === 'cf' || id === 'rf') return 'of';
    return 'if';
  }

  function unitColor(id) {
    var u = unitOf(id);
    if (u === 'battery') return COL.battery;
    if (u === 'of') return COL.unitOf;
    return COL.unitIf;
  }

  function unitTeach(id) {
    var u = unitOf(id);
    if (u === 'battery') return 'battery';
    if (u === 'of') return 'unit-of';
    return 'unit-if';
  }

  function fmtFt(v) {
    var whole, frac;
    if (typeof v !== 'number') return String(v);
    whole = Math.floor(v + 0.0001);
    frac = v - whole;
    if (Math.abs(frac - 0.5) < 0.02) return whole + ' ft 6 in';
    if (frac < 0.05) return whole + ' ft';
    return (Math.round(v * 10) / 10) + ' ft';
  }

  function wrapWords(text, maxChars) {
    var words, i, cur, lines;
    text = String(text || '');
    if (!text) return [''];
    words = text.split(/\s+/);
    lines = [];
    cur = '';
    for (i = 0; i < words.length; i++) {
      if (cur.length && (cur.length + 1 + words[i].length) > maxChars) {
        lines.push(cur);
        cur = words[i];
      } else {
        cur = cur ? (cur + ' ' + words[i]) : words[i];
      }
    }
    if (cur) lines.push(cur);
    return lines.length ? lines : [''];
  }

  function dist(a, b) {
    var dx = b.x - a.x, dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function lerpPt(a, b, t) {
    return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
  }

  function offsetPt(a, b, px) {
    var dx = b.x - a.x, dy = b.y - a.y;
    var len = Math.sqrt(dx * dx + dy * dy) || 1;
    return { x: a.x - (dy / len) * px, y: a.y + (dx / len) * px };
  }

  /* ------------------------------------------------------------------ */
  /* SVG primitives                                                      */
  /* ------------------------------------------------------------------ */

  function wrapSvg(builderName, opts, defW, defH, title, desc, inner) {
    var sid = uid();
    var tid = sid + '-t';
    var did = sid + '-d';
    var vw = defW;
    var vh = defH;
    var cls = 'hrl-svg hrl-svg-' + builderName;
    var scale;
    opts = optsOf(opts);
    if (opts.width && isFinite(opts.width) && Number(opts.width) > 0) {
      vw = Number(opts.width);
      vh = Math.round(defH * (vw / defW));
      scale = vw / defW;
      inner = '<g transform="scale(' + scale + ')">' + inner + '</g>';
    }
    if (opts.className) cls += ' ' + String(opts.className);
    return '<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="' +
      tid + ' ' + did + '" viewBox="0 0 ' + vw + ' ' + vh +
      '" preserveAspectRatio="xMidYMid meet" width="100%" height="auto" class="' +
      esc(cls) + '">' +
      '<title id="' + tid + '">' + esc(title) + '</title>' +
      '<desc id="' + did + '">' + esc(desc) + '</desc>' +
      inner + '</svg>';
  }

  function hotspotG(id, inner) {
    return '<g class="hrl-hotspot" data-hotspot="' + esc(id) +
      '" tabindex="0" role="button" aria-label="' + esc(hotspotLabel(id)) + '">' +
      inner + '</g>';
  }

  function hitCircle(x, y, r) {
    if (r < 22) r = 22;
    return '<circle class="hrl-hotspot-hit" cx="' + nr(x) + '" cy="' + nr(y) +
      '" r="' + nr(r) + '" fill="rgba(0,0,0,0)" stroke="none" pointer-events="all"/>';
  }

  function hitRect(x, y, w, h) {
    if (w < 44) {
      x = x - (44 - w) / 2;
      w = 44;
    }
    if (h < 44) {
      y = y - (44 - h) / 2;
      h = 44;
    }
    return '<rect class="hrl-hotspot-hit" x="' + nr(x) + '" y="' + nr(y) +
      '" width="' + nr(w) + '" height="' + nr(h) +
      '" fill="rgba(0,0,0,0)" stroke="none" pointer-events="all"/>';
  }

  function hitPath(d) {
    return '<path class="hrl-hotspot-hit" d="' + d +
      '" fill="rgba(0,0,0,0)" stroke="none" pointer-events="all"/>';
  }

  function maybeHot(opts, id, inner) {
    if (hasHot(opts, id)) return hotspotG(id, inner);
    return inner;
  }

  function textEl(x, y, str, o) {
    var s;
    o = o || {};
    s = '<text x="' + nr(x) + '" y="' + nr(y) + '" font-family="inherit" font-size="' +
      (o.size || 12) + '" fill="' + (o.fill || COL.ink) + '" text-anchor="' +
      (o.anchor || 'middle') + '"';
    if (o.weight) s += ' font-weight="' + o.weight + '"';
    if (o.cls) s += ' class="' + o.cls + '"';
    if (o.baseline) s += ' dominant-baseline="' + o.baseline + '"';
    s += '>' + esc(str) + '</text>';
    return s;
  }

  function textLines(x, y, lines, o, lineH) {
    var i, s;
    o = o || {};
    lineH = lineH || Math.round((o.size || 12) * 1.25);
    s = '<text x="' + nr(x) + '" y="' + nr(y) + '" font-family="inherit" font-size="' +
      (o.size || 12) + '" fill="' + (o.fill || COL.ink) + '" text-anchor="' +
      (o.anchor || 'middle') + '"';
    if (o.weight) s += ' font-weight="' + o.weight + '"';
    if (o.cls) s += ' class="' + o.cls + '"';
    s += '>';
    for (i = 0; i < lines.length; i++) {
      s += '<tspan x="' + nr(x) + '" dy="' + (i === 0 ? 0 : lineH) + '">' +
        esc(lines[i]) + '</tspan>';
    }
    return s + '</text>';
  }

  function platePath(cx, cy, w) {
    var half = w / 2;
    var topY = cy - w * 0.22;
    var midY = cy + w * 0.12;
    var botY = cy + w * 0.55;
    return 'M' + nr(cx - half) + ',' + nr(topY) +
      ' L' + nr(cx + half) + ',' + nr(topY) +
      ' L' + nr(cx + half) + ',' + nr(midY) +
      ' L' + nr(cx) + ',' + nr(botY) +
      ' L' + nr(cx - half) + ',' + nr(midY) + ' Z';
  }

  function roundedDiamond(pts, r) {
    var i, n, prev, cur, next, v1x, v1y, v2x, v2y, l1, l2, a, b, d;
    n = pts.length;
    d = '';
    for (i = 0; i < n; i++) {
      prev = pts[(i + n - 1) % n];
      cur = pts[i];
      next = pts[(i + 1) % n];
      v1x = cur.x - prev.x;
      v1y = cur.y - prev.y;
      v2x = next.x - cur.x;
      v2y = next.y - cur.y;
      l1 = Math.sqrt(v1x * v1x + v1y * v1y) || 1;
      l2 = Math.sqrt(v2x * v2x + v2y * v2y) || 1;
      a = { x: cur.x - (v1x / l1) * r, y: cur.y - (v1y / l1) * r };
      b = { x: cur.x + (v2x / l2) * r, y: cur.y + (v2y / l2) * r };
      d += (i === 0 ? 'M' : 'L') + nr(a.x) + ',' + nr(a.y);
      d += 'A' + nr(r) + ',' + nr(r) + ' 0 0 1 ' + nr(b.x) + ',' + nr(b.y);
    }
    return d + 'Z';
  }

  function baseballMark(x, y, r, cls) {
    var s;
    r = r || 7;
    s = '<g class="' + (cls || 'hrl-ball') + '">';
    s += '<circle cx="' + nr(x) + '" cy="' + nr(y) + '" r="' + nr(r) +
      '" fill="' + COL.white + '" stroke="' + COL.ball + '" stroke-width="1.4"/>';
    s += '<path d="M' + nr(x - r * 0.55) + ',' + nr(y - r * 0.35) +
      ' C' + nr(x - r * 0.1) + ',' + nr(y) + ' ' + nr(x - r * 0.1) + ',' + nr(y) +
      ' ' + nr(x - r * 0.55) + ',' + nr(y + r * 0.35) + '" fill="none" stroke="' +
      COL.ball + '" stroke-width="1"/>';
    s += '<path d="M' + nr(x + r * 0.55) + ',' + nr(y - r * 0.35) +
      ' C' + nr(x + r * 0.1) + ',' + nr(y) + ' ' + nr(x + r * 0.1) + ',' + nr(y) +
      ' ' + nr(x + r * 0.55) + ',' + nr(y + r * 0.35) + '" fill="none" stroke="' +
      COL.ball + '" stroke-width="1"/>';
    return s + '</g>';
  }

  function arrowPath(a, b, style, cls) {
    var dx, dy, len, ux, uy, x2, y2, dash, color, sw, head, tick, mx, my, px, py;
    dx = b.x - a.x;
    dy = b.y - a.y;
    len = Math.sqrt(dx * dx + dy * dy) || 1;
    ux = dx / len;
    uy = dy / len;
    x2 = b.x - ux * 10;
    y2 = b.y - uy * 10;
    color = COL.ink;
    sw = 2.2;
    dash = '';
    if (style === 'run') {
      dash = ' stroke-dasharray="8 6"';
      color = COL.unitOf;
    } else if (style === 'route') {
      dash = ' stroke-dasharray="2 5"';
      color = COL.unitIf;
    } else if (style === 'cut') {
      color = COL.battery;
    } else if (style === 'force') {
      color = COL.ball;
    } else if (style === 'tag' || style === 'tag-up') {
      dash = ' stroke-dasharray="7 5"';
      color = COL.base;
    } else if (style === 'steal') {
      color = COL.unitOf;
      sw = 2.6;
    } else if (style === 'advance') {
      color = COL.backup;
    } else {
      color = COL.ink;
    }
    head = '<polygon class="hrl-arrow-head" points="' +
      nr(b.x) + ',' + nr(b.y) + ' ' +
      nr(x2 - uy * 5) + ',' + nr(y2 + ux * 5) + ' ' +
      nr(x2 + uy * 5) + ',' + nr(y2 - ux * 5) + '" fill="' + color + '"/>';
    tick = '';
    if (style === 'cut') {
      mx = (a.x + b.x) / 2;
      my = (a.y + b.y) / 2;
      px = -uy * 7;
      py = ux * 7;
      tick = '<line class="hrl-arrow-tick" x1="' + nr(mx + px) + '" y1="' + nr(my + py) +
        '" x2="' + nr(mx - px) + '" y2="' + nr(my - py) + '" stroke="' + color +
        '" stroke-width="2.4" stroke-linecap="round"/>';
    }
    return '<g class="hrl-arrow hrl-arrow-' + esc(style || 'throw') + (cls ? ' ' + cls : '') + '">' +
      '<line x1="' + nr(a.x) + '" y1="' + nr(a.y) + '" x2="' + nr(x2) + '" y2="' + nr(y2) +
      '" fill="none" stroke="' + color + '" stroke-width="' + sw +
      '" stroke-linecap="round"' + dash + '/>' + tick + head + '</g>';
  }

  function roleLegend(x, y) {
    var items = [
      { glyph: 'B', color: COL.ball, word: 'Ball', teach: 'ball' },
      { glyph: '\u25B2', color: COL.base, word: 'Base', teach: 'base' },
      { glyph: '\u2302', color: COL.backup, word: 'Backup', teach: 'backup' }
    ];
    var i, s, xx;
    s = '<g class="hrl-legend hrl-legend-roles">';
    xx = x;
    for (i = 0; i < items.length; i++) {
      s += '<g class="hrl-legend-item" data-teach="' + items[i].teach + '">';
      s += '<circle cx="' + nr(xx + 9) + '" cy="' + nr(y) + '" r="9" fill="' +
        items[i].color + '" stroke="' + COL.ink + '" stroke-width="1"/>';
      s += textEl(xx + 9, y + 4, items[i].glyph, {
        size: 11, fill: items[i].teach === 'base' ? COL.ink : COL.white, weight: 700
      });
      s += textEl(xx + 22, y + 4, items[i].word, { size: 11, anchor: 'start' });
      s += '</g>';
      xx += 92;
    }
    return s + '</g>';
  }

  /* ------------------------------------------------------------------ */
  /* Field geometry                                                      */
  /* ------------------------------------------------------------------ */

  function makeGeom(presetKey, W, H) {
    var spec = PRESETS[presetKey] || PRESETS['major-ll'];
    var home, basePx, px, b, first, third, second, mound, fenceR;
    var foulL, foulR, cf, warnR;
    W = W || 800;
    H = H || 720;
    home = { x: W / 2, y: H * 0.89 };
    basePx = Math.min(W, H) * 0.26;
    px = basePx / spec.bases;
    b = spec.bases;
    function xy(xFt, yFt) {
      return { x: home.x + xFt * px, y: home.y - yFt * px };
    }
    first = xy(b / Math.SQRT2, b / Math.SQRT2);
    third = xy(-b / Math.SQRT2, b / Math.SQRT2);
    second = xy(0, b * Math.SQRT2);
    mound = xy(0, spec.mound);
    fenceR = spec.fence * px;
    if (home.y - fenceR < 32) fenceR = home.y - 32;
    foulL = {
      x: home.x + Math.sin(-Math.PI / 4) * fenceR,
      y: home.y - Math.cos(-Math.PI / 4) * fenceR
    };
    foulR = {
      x: home.x + Math.sin(Math.PI / 4) * fenceR,
      y: home.y - Math.cos(Math.PI / 4) * fenceR
    };
    cf = { x: home.x, y: home.y - fenceR };
    warnR = fenceR - Math.max(9, 14 * px);
    if (warnR < fenceR * 0.84) warnR = fenceR * 0.9;
    return {
      spec: spec,
      W: W,
      H: H,
      home: home,
      first: first,
      second: second,
      third: third,
      mound: mound,
      px: px,
      basePx: basePx,
      fenceR: fenceR,
      warnR: warnR,
      foulL: foulL,
      foulR: foulR,
      cf: cf,
      xy: xy
    };
  }

  function arcPts(g, a0, a1, steps, r) {
    var i, t, pts = [];
    r = r === undefined ? g.fenceR : r;
    for (i = 0; i <= steps; i++) {
      t = a0 + (a1 - a0) * (i / steps);
      pts.push({
        x: g.home.x + Math.sin(t) * r,
        y: g.home.y - Math.cos(t) * r
      });
    }
    return pts;
  }

  function pathPts(pts, close) {
    var i, d = '';
    for (i = 0; i < pts.length; i++) {
      d += (i === 0 ? 'M' : 'L') + nr(pts[i].x) + ',' + nr(pts[i].y);
    }
    if (close) d += 'Z';
    return d;
  }

  function fairPath(g) {
    var pts = [{ x: g.home.x, y: g.home.y }];
    var arc = arcPts(g, -Math.PI / 4, Math.PI / 4, 20, g.fenceR);
    var i;
    for (i = 0; i < arc.length; i++) pts.push(arc[i]);
    return pathPts(pts, true);
  }

  function warningPath(g) {
    var outer = arcPts(g, -Math.PI / 4, Math.PI / 4, 20, g.fenceR);
    var inner = arcPts(g, Math.PI / 4, -Math.PI / 4, 20, g.warnR);
    var pts = [], i;
    for (i = 0; i < outer.length; i++) pts.push(outer[i]);
    for (i = 0; i < inner.length; i++) pts.push(inner[i]);
    return pathPts(pts, true);
  }

  function positionCoords(g, alignment) {
    var bases = g.spec.bases;
    var fence = g.spec.fence;
    var sIF = bases / 90;
    var sOF = fence / 300;
    var spots, k, out;
    spots = {
      p: { x: 0, y: g.spec.mound },
      c: { x: 0, y: -8 },
      '1b': { x: 70 * sIF, y: 80 * sIF },
      '2b': { x: 50 * sIF, y: 128 * sIF },
      ss: { x: -40 * sIF, y: 128 * sIF },
      '3b': { x: -66 * sIF, y: 80 * sIF },
      lf: { x: -115 * sOF, y: 248 * sOF },
      cf: { x: 0, y: 282 * sOF },
      rf: { x: 115 * sOF, y: 248 * sOF }
    };
    alignment = alignment || 'standard';
    if (alignment === 'infield-in') {
      spots['1b'] = { x: 52 * sIF, y: 52 * sIF };
      spots['2b'] = { x: 38 * sIF, y: 78 * sIF };
      spots.ss = { x: -32 * sIF, y: 78 * sIF };
      spots['3b'] = { x: -50 * sIF, y: 52 * sIF };
    } else if (alignment === 'dp-depth') {
      spots['2b'] = { x: 32 * sIF, y: 140 * sIF };
      spots.ss = { x: -28 * sIF, y: 140 * sIF };
    } else if (alignment === 'bunt-defense') {
      spots['1b'] = { x: 40 * sIF, y: 40 * sIF };
      spots['3b'] = { x: -38 * sIF, y: 40 * sIF };
      spots['2b'] = { x: 42 * sIF, y: 90 * sIF };
      spots.ss = { x: -36 * sIF, y: 90 * sIF };
      spots.c = { x: 0, y: -3 };
    } else if (alignment === 'no-doubles') {
      spots.lf = { x: -145 * sOF, y: 270 * sOF };
      spots.cf = { x: 0, y: 310 * sOF };
      spots.rf = { x: 145 * sOF, y: 270 * sOF };
      spots['1b'] = { x: 82 * sIF, y: 78 * sIF };
      spots['3b'] = { x: -80 * sIF, y: 78 * sIF };
    } else if (alignment === 'of-shallow') {
      spots.lf.y *= 0.72;
      spots.cf.y *= 0.70;
      spots.rf.y *= 0.72;
    } else if (alignment === 'of-deep') {
      spots.lf.y *= 1.16;
      spots.cf.y *= 1.14;
      spots.rf.y *= 1.16;
    } else if (alignment === 'corners-in') {
      spots['1b'] = { x: 48 * sIF, y: 48 * sIF };
      spots['3b'] = { x: -46 * sIF, y: 48 * sIF };
    }
    out = {};
    for (k in spots) {
      if (Object.prototype.hasOwnProperty.call(spots, k)) {
        out[k] = g.xy(spots[k].x, spots[k].y);
      }
    }
    return out;
  }

  function namedBallPt(g, name) {
    var sp = BALL_SPOTS[name];
    var sIF, sOF;
    if (!sp) return null;
    sIF = g.spec.bases / 90;
    sOF = g.spec.fence / 300;
    if (sp.scale === 'of') return g.xy(sp.x * sOF, sp.y * sOF);
    return g.xy(sp.x * sIF, sp.y * sIF);
  }

  function normToSvg(g, nx, ny) {
    var yFt, xFt;
    nx = Math.max(0, Math.min(1, Number(nx)));
    ny = Math.max(0, Math.min(1, Number(ny)));
    yFt = ny * (g.fenceR / g.px);
    xFt = (nx - 0.5) * 2 * Math.max(yFt, 18);
    return g.xy(xFt, yFt);
  }

  function resolvePt(g, posMap, ref) {
    if (ref === null || ref === undefined) return null;
    if (typeof ref === 'string') {
      if (posMap && posMap[ref]) return posMap[ref];
      if (ref === 'home' || ref === 'plate') return g.home;
      if (ref === 'first') return g.first;
      if (ref === 'second') return g.second;
      if (ref === 'third') return g.third;
      if (ref === 'mound') return g.mound;
      return namedBallPt(g, ref);
    }
    if (typeof ref === 'object' && typeof ref.x === 'number' && typeof ref.y === 'number') {
      return normToSvg(g, ref.x, ref.y);
    }
    return null;
  }

  function boxPoly(g, side /* 'L' | 'R' */) {
    var w = 4 * g.px;
    var d = 6 * g.px;
    var gap = 0.6 * g.px;
    var dir = side === 'L' ? -1 : 1;
    var x0 = g.home.x + dir * (2.2 * g.px + gap);
    var y0 = g.home.y - 0.4 * g.px;
    return {
      x: dir === -1 ? x0 - w : x0,
      y: y0 - d,
      w: w,
      h: d
    };
  }

  function coachBox(g, side) {
    var a = side === 'first' ? g.home : g.home;
    var b = side === 'first' ? g.first : g.third;
    var mid = lerpPt(a, b, 0.62);
    var foul = offsetPt(a, b, side === 'first' ? 18 : -18);
    var origin = { x: mid.x + (foul.x - a.x), y: mid.y + (foul.y - a.y) };
    var w = 12 * g.px, h = 8 * g.px;
    if (w < 28) w = 36;
    if (h < 20) h = 24;
    return {
      x: origin.x - w / 2,
      y: origin.y - h / 2,
      w: w,
      h: h
    };
  }

  /* ------------------------------------------------------------------ */
  /* field()                                                             */
  /* ------------------------------------------------------------------ */

  function tokenLabel(id, style) {
    var abbr = String(id).toUpperCase();
    var num = POSITION_NUMBERS[id];
    if (style === 'number') return String(num);
    if (style === 'both') return num + ' ' + abbr;
    return abbr;
  }

  function drawPosToken(id, pt, opts) {
    var r = 18;
    var roles = opts.roles || {};
    var role = roles[id];
    var fill = COL.ink;
    var teach = unitTeach(id);
    var glyph = '';
    var label, tFill, s, below;
    var unitColors = opts.unitColors;
    if (unitColors === undefined) unitColors = !!opts.positions;
    if (role === 'ball') {
      fill = COL.ball;
      teach = 'ball';
      glyph = 'B';
    } else if (role === 'base') {
      fill = COL.base;
      teach = 'base';
      glyph = '\u25B2';
    } else if (role === 'backup') {
      fill = COL.backup;
      teach = 'backup';
      glyph = '\u2302';
    } else if (unitColors) {
      fill = unitColor(id);
    }
    tFill = (role === 'base') ? COL.ink : COL.white;
    label = tokenLabel(id, opts.positionStyle || 'abbr');
    s = '<g class="hrl-pos hrl-pos-' + id + '" data-pos="' + id + '" data-role="' +
      (role || teach) + '" data-teach="' + teach + '">';
    s += '<circle class="hrl-pos-token" cx="' + nr(pt.x) + '" cy="' + nr(pt.y) +
      '" r="' + r + '" fill="' + fill + '" stroke="' + COL.ink + '" stroke-width="1.4"/>';
    if (glyph) {
      s += textEl(pt.x, pt.y + 4, glyph, {
        size: 12, fill: tFill, weight: 700, cls: 'hrl-pos-glyph'
      });
      below = (opts.positionStyle === 'number') ? String(POSITION_NUMBERS[id]) : String(id).toUpperCase();
      if (opts.positionStyle === 'both') below = POSITION_NUMBERS[id] + ' ' + String(id).toUpperCase();
      s += textEl(pt.x, pt.y + r + 13, below, { size: 11, weight: 700, cls: 'hrl-pos-label' });
    } else if (opts.positionStyle === 'both') {
      s += textEl(pt.x, pt.y + 4, String(POSITION_NUMBERS[id]), {
        size: 12, fill: tFill, weight: 700, cls: 'hrl-pos-label'
      });
      s += textEl(pt.x, pt.y + r + 13, String(id).toUpperCase(), {
        size: 11, weight: 700, cls: 'hrl-pos-label'
      });
    } else {
      s += textEl(pt.x, pt.y + 4, label, {
        size: 12, fill: tFill, weight: 700, cls: 'hrl-pos-label'
      });
    }
    s += '</g>';
    return s;
  }

  function fieldDesc(opts, spec) {
    var bits;
    if (opts.desc) return opts.desc;
    bits = ['A baseball diamond viewed from behind home plate, ' +
      spec.bases + ' ft bases and a ' + fmtFt(spec.mound) + ' mound'];
    if (opts.positions) {
      bits.push('all nine fielders shown at their ' + (opts.alignment || 'standard') + ' positions');
    }
    if (opts.roles) bits.push('with ball, base, and backup roles marked');
    if (isArr(opts.runners) && opts.runners.length) bits.push('runners on ' + opts.runners.join(' and '));
    if (opts.batter === 'R') bits.push('a right-handed batter in the box');
    if (opts.batter === 'L') bits.push('a left-handed batter in the box');
    return bits.join(', ') + '.';
  }

  function field(opts) {
    var g, posMap, parts, defs, clipFair, i, k;
    var fairD, warnD, dirtD, grassD;
    var bbL, bbR, cb, c1, c3;
    var showPos, unitColors, roles, hasRoles;
    var dugH, dugA, odL, odR, bsR;
    var title, desc;
    var inner, hx, addCirc, addBox;
    opts = optsOf(opts);
    g = makeGeom(opts.preset || 'major-ll', 800, 720);
    posMap = positionCoords(g, opts.alignment || 'standard');
    showPos = !!opts.positions;
    unitColors = opts.unitColors;
    if (unitColors === undefined) unitColors = showPos;
    opts.unitColors = unitColors;
    roles = opts.roles || {};
    hasRoles = false;
    for (k in roles) {
      if (Object.prototype.hasOwnProperty.call(roles, k) && roles[k]) hasRoles = true;
    }

    clipFair = uid() + '-fair';
    fairD = fairPath(g);
    warnD = warningPath(g);
    dirtD = roundedDiamond([
      { x: g.home.x, y: g.home.y + 10 },
      g.first, g.second, g.third
    ], 36);
    grassD = roundedDiamond([
      lerpPt(g.home, g.second, 0.22),
      lerpPt(g.first, g.third, 0.38),
      lerpPt(g.second, g.home, 0.22),
      lerpPt(g.third, g.first, 0.38)
    ], 22);

    bbL = boxPoly(g, 'L');
    bbR = boxPoly(g, 'R');
    cb = {
      x: g.home.x - 3.2 * g.px,
      y: g.home.y + 0.8 * g.px,
      w: 6.4 * g.px,
      h: 8 * g.px
    };
    if (cb.w < 28) {
      cb.w = 32;
      cb.x = g.home.x - 16;
    }
    if (cb.h < 28) cb.h = 32;
    c1 = coachBox(g, 'first');
    c3 = coachBox(g, 'third');

    dugA = { x: 42, y: g.third.y + 28, w: 88, h: 26 };
    dugH = { x: g.W - 130, y: g.first.y + 28, w: 88, h: 26 };
    odL = { x: g.home.x - 118, y: g.home.y + 8 };
    odR = { x: g.home.x + 118, y: g.home.y + 8 };
    bsR = Math.max(52, 30 * g.px);

    defs = '<defs>';
    defs += '<clipPath id="' + clipFair + '"><path d="' + fairD + '"/></clipPath>';
    defs += '</defs>';

    parts = [];
    /* Foul grass (the park) */
    parts.push('<rect class="hrl-field-park" x="16" y="16" width="' + (g.W - 32) +
      '" height="' + (g.H - 32) + '" rx="18" fill="' + COL.grassFoul + '" stroke="' +
      COL.dirtDark + '" stroke-width="2"/>');

    /* Fair turf */
    parts.push('<path class="hrl-field-fair" d="' + fairD + '" fill="' + COL.grass +
      '" stroke="none"/>');

    if (opts.zones) {
      parts.push('<path class="hrl-zone-foul hrl-field-foul" d="M16,16 H' + (g.W - 16) +
        ' V' + (g.H - 16) + ' H16 Z" fill="' + COL.battery + '" fill-opacity="0.06"/>');
      parts.push('<path class="hrl-zone-of" d="' + fairD + '" fill="' + COL.unitOf +
        '" fill-opacity="0.10"/>');
      parts.push('<path class="hrl-zone-if" d="' + dirtD + '" fill="' + COL.unitIf +
        '" fill-opacity="0.16"/>');
    }

    /* Warning track */
    parts.push('<path class="hrl-field-warning" d="' + warnD + '" fill="' + COL.warning +
      '" clip-path="url(#' + clipFair + ')"/>');

    /* Infield dirt + inner grass + mound */
    parts.push('<g clip-path="url(#' + clipFair + ')">');
    parts.push('<path class="hrl-field-dirt" d="' + dirtD + '" fill="' + COL.dirt + '"/>');
    parts.push('<circle class="hrl-field-dirt" cx="' + nr(g.home.x) + '" cy="' + nr(g.home.y) +
      '" r="' + nr(Math.max(22, 13 * g.px)) + '" fill="' + COL.dirt + '"/>');
    parts.push('<circle class="hrl-field-mound-dirt" cx="' + nr(g.mound.x) + '" cy="' +
      nr(g.mound.y) + '" r="' + nr(Math.max(16, 10 * g.px)) + '" fill="' + COL.dirt + '"/>');
    parts.push('<path class="hrl-field-infield-grass" d="' + grassD + '" fill="' + COL.grassIn + '"/>');
    parts.push('</g>');

    /* Mound circle + rubber */
    parts.push('<circle class="hrl-field-mound" cx="' + nr(g.mound.x) + '" cy="' +
      nr(g.mound.y) + '" r="' + nr(Math.max(11, 9 * g.px)) + '" fill="' + COL.dirtDark +
      '" stroke="' + COL.dirtDark + '" stroke-width="1"/>');
    parts.push('<rect class="hrl-field-rubber" x="' + nr(g.mound.x - 8) + '" y="' +
      nr(g.mound.y - 2) + '" width="16" height="4" rx="0.5" fill="' + COL.white +
      '" stroke="' + COL.ink + '" stroke-width="0.6"/>');

    /* Backstop */
    parts.push('<path class="hrl-field-backstop" d="M' + nr(g.home.x - bsR * 0.9) + ',' +
      nr(g.home.y + 8) + ' Q' + nr(g.home.x) + ',' + nr(g.home.y + bsR) + ' ' +
      nr(g.home.x + bsR * 0.9) + ',' + nr(g.home.y + 8) + '" fill="none" stroke="' +
      COL.ink + '" stroke-width="3" stroke-linecap="round"/>');

    /* Dugouts */
    parts.push('<rect class="hrl-field-dugout hrl-field-dugout-away" x="' + dugA.x +
      '" y="' + dugA.y + '" width="' + dugA.w + '" height="' + dugA.h +
      '" rx="3" fill="' + COL.cream + '" stroke="' + COL.ink + '" stroke-width="1.2"/>');
    parts.push('<rect class="hrl-field-dugout hrl-field-dugout-home" x="' + dugH.x +
      '" y="' + dugH.y + '" width="' + dugH.w + '" height="' + dugH.h +
      '" rx="3" fill="' + COL.cream + '" stroke="' + COL.ink + '" stroke-width="1.2"/>');

    /* On-deck circles */
    parts.push('<circle class="hrl-field-ondeck" cx="' + odL.x + '" cy="' + odL.y +
      '" r="12" fill="none" stroke="' + COL.line + '" stroke-width="2"/>');
    parts.push('<circle class="hrl-field-ondeck" cx="' + odR.x + '" cy="' + odR.y +
      '" r="12" fill="none" stroke="' + COL.line + '" stroke-width="2"/>');

    /* Coach boxes */
    parts.push('<rect class="hrl-field-box hrl-field-coach-box" x="' + nr(c3.x) + '" y="' +
      nr(c3.y) + '" width="' + nr(c3.w) + '" height="' + nr(c3.h) +
      '" fill="none" stroke="' + COL.line + '" stroke-width="1.4"/>');
    parts.push('<rect class="hrl-field-box hrl-field-coach-box" x="' + nr(c1.x) + '" y="' +
      nr(c1.y) + '" width="' + nr(c1.w) + '" height="' + nr(c1.h) +
      '" fill="none" stroke="' + COL.line + '" stroke-width="1.4"/>');

    /* Batter / catcher boxes */
    parts.push('<rect class="hrl-field-box hrl-field-batter-box" x="' + nr(bbL.x) + '" y="' +
      nr(bbL.y) + '" width="' + nr(bbL.w) + '" height="' + nr(bbL.h) +
      '" fill="none" stroke="' + COL.line + '" stroke-width="1.5"/>');
    parts.push('<rect class="hrl-field-box hrl-field-batter-box" x="' + nr(bbR.x) + '" y="' +
      nr(bbR.y) + '" width="' + nr(bbR.w) + '" height="' + nr(bbR.h) +
      '" fill="none" stroke="' + COL.line + '" stroke-width="1.5"/>');
    parts.push('<rect class="hrl-field-box hrl-field-catcher-box" x="' + nr(cb.x) + '" y="' +
      nr(cb.y) + '" width="' + nr(cb.w) + '" height="' + nr(cb.h) +
      '" fill="none" stroke="' + COL.line + '" stroke-width="1.4"/>');

    /* Foul lines + infield diamond */
    parts.push('<path class="hrl-field-line" d="M' + nr(g.home.x) + ',' + nr(g.home.y) +
      ' L' + nr(g.foulL.x) + ',' + nr(g.foulL.y) + '" stroke="' + COL.line +
      '" stroke-width="2.2" fill="none"/>');
    parts.push('<path class="hrl-field-line" d="M' + nr(g.home.x) + ',' + nr(g.home.y) +
      ' L' + nr(g.foulR.x) + ',' + nr(g.foulR.y) + '" stroke="' + COL.line +
      '" stroke-width="2.2" fill="none"/>');
    parts.push('<path class="hrl-field-line" d="M' + nr(g.home.x) + ',' + nr(g.home.y) +
      ' L' + nr(g.first.x) + ',' + nr(g.first.y) +
      ' L' + nr(g.second.x) + ',' + nr(g.second.y) +
      ' L' + nr(g.third.x) + ',' + nr(g.third.y) + ' Z" fill="none" stroke="' +
      COL.line + '" stroke-width="2"/>');

    /* Fence + poles */
    parts.push('<path class="hrl-field-fence" d="' + pathPts(arcPts(g, -Math.PI / 4, Math.PI / 4, 20, g.fenceR), false) +
      '" fill="none" stroke="' + COL.ink + '" stroke-width="2.4"/>');
    parts.push('<line class="hrl-field-pole" x1="' + nr(g.foulL.x) + '" y1="' + nr(g.foulL.y) +
      '" x2="' + nr(g.foulL.x) + '" y2="' + nr(g.foulL.y - 22) + '" stroke="' + COL.ball +
      '" stroke-width="3" stroke-linecap="round"/>');
    parts.push('<line class="hrl-field-pole" x1="' + nr(g.foulR.x) + '" y1="' + nr(g.foulR.y) +
      '" x2="' + nr(g.foulR.x) + '" y2="' + nr(g.foulR.y - 22) + '" stroke="' + COL.ball +
      '" stroke-width="3" stroke-linecap="round"/>');

    /* Bases + plate */
    var baseSq = function (pt, ang) {
      var s = 9, c = Math.cos(ang), si = Math.sin(ang);
      var pts = [[-s, -s], [s, -s], [s, s], [-s, s]], bi, p, d = '';
      for (bi = 0; bi < 4; bi++) {
        p = { x: pt.x + pts[bi][0] * c - pts[bi][1] * si, y: pt.y + pts[bi][0] * si + pts[bi][1] * c };
        d += (bi === 0 ? 'M' : 'L') + nr(p.x) + ',' + nr(p.y);
      }
      return d + 'Z';
    };
    parts.push('<path class="hrl-field-base" d="' + baseSq(g.first, Math.PI / 4) +
      '" fill="' + COL.white + '" stroke="' + COL.ink + '" stroke-width="1"/>');
    parts.push('<path class="hrl-field-base" d="' + baseSq(g.second, Math.PI / 4) +
      '" fill="' + COL.white + '" stroke="' + COL.ink + '" stroke-width="1"/>');
    parts.push('<path class="hrl-field-base" d="' + baseSq(g.third, Math.PI / 4) +
      '" fill="' + COL.white + '" stroke="' + COL.ink + '" stroke-width="1"/>');
    parts.push('<path class="hrl-field-plate" d="' + platePath(g.home.x, g.home.y, 16) +
      '" fill="' + COL.white + '" stroke="' + COL.ink + '" stroke-width="1"/>');

    /* Labels */
    if (opts.labels) {
      parts.push('<g class="hrl-label-set">');
      parts.push(textEl(g.home.x, g.home.y + 36, 'Home', { size: 12, weight: 700, cls: 'hrl-label' }));
      parts.push(textEl(g.first.x + 28, g.first.y + 4, '1B', { size: 12, weight: 700, cls: 'hrl-label' }));
      parts.push(textEl(g.second.x, g.second.y - 20, '2B', { size: 12, weight: 700, cls: 'hrl-label' }));
      parts.push(textEl(g.third.x - 28, g.third.y + 4, '3B', { size: 12, weight: 700, cls: 'hrl-label' }));
      parts.push(textEl(g.mound.x + 28, g.mound.y + 4, 'Mound', { size: 11, cls: 'hrl-label', anchor: 'start' }));
      parts.push(textEl(lerpPt(g.home, g.foulL, 0.55).x - 18, lerpPt(g.home, g.foulL, 0.55).y, 'Foul line', {
        size: 11, cls: 'hrl-label'
      }));
      parts.push(textEl(lerpPt(g.home, g.foulR, 0.55).x + 18, lerpPt(g.home, g.foulR, 0.55).y, 'Foul line', {
        size: 11, cls: 'hrl-label'
      }));
      parts.push(textEl((g.home.x + g.second.x) / 2, (g.home.y + g.second.y) / 2 - 8, 'Infield', {
        size: 11, cls: 'hrl-label', fill: COL.muted
      }));
      parts.push(textEl(g.cf.x, g.cf.y + 36, 'Outfield', { size: 12, cls: 'hrl-label', fill: COL.muted }));
      if (opts.zones) {
        parts.push(textEl(70, 80, 'Foul', { size: 11, fill: COL.muted, cls: 'hrl-label' }));
        parts.push(textEl(g.W - 70, 80, 'Foul', { size: 11, fill: COL.muted, cls: 'hrl-label' }));
      }
      parts.push('</g>');
    }

    /* Dimensions */
    if (opts.showDimensions) {
      (function () {
        var a = offsetPt(g.home, g.first, 22);
        var b = offsetPt(g.first, g.home, -22);
        var mid = lerpPt(a, b, 0.5);
        var m1 = offsetPt(g.home, g.mound, -16);
        var m2 = offsetPt(g.mound, g.home, 16);
        var mm = lerpPt(m1, m2, 0.5);
        parts.push('<g class="hrl-dim">');
        parts.push('<line class="hrl-dim-line" x1="' + nr(a.x) + '" y1="' + nr(a.y) +
          '" x2="' + nr(b.x) + '" y2="' + nr(b.y) + '" stroke="' + COL.ink +
          '" stroke-width="1.2"/>');
        parts.push(textEl(mid.x + 10, mid.y + 4, fmtFt(g.spec.bases), {
          size: 11, weight: 700, cls: 'hrl-dim-label', anchor: 'start'
        }));
        parts.push('<line class="hrl-dim-line" x1="' + nr(m1.x) + '" y1="' + nr(m1.y) +
          '" x2="' + nr(m2.x) + '" y2="' + nr(m2.y) + '" stroke="' + COL.ink +
          '" stroke-width="1.2"/>');
        parts.push(textEl(mm.x - 8, mm.y, fmtFt(g.spec.mound), {
          size: 11, weight: 700, cls: 'hrl-dim-label', anchor: 'end'
        }));
        parts.push('</g>');
      }());
    }

    /* Positions */
    if (showPos) {
      for (i = 0; i < POSITIONS.length; i++) {
        parts.push(drawPosToken(POSITIONS[i], posMap[POSITIONS[i]], opts));
      }
    }

    /* Runners */
    (function () {
      var rs = asArr(opts.runners);
      var map = { first: g.first, second: g.second, third: g.third };
      var j, pt;
      for (j = 0; j < rs.length; j++) {
        pt = map[rs[j]];
        if (!pt) continue;
        parts.push('<g class="hrl-runner">');
        parts.push('<circle cx="' + nr(pt.x - 14) + '" cy="' + nr(pt.y - 16) +
          '" r="8" fill="' + COL.ink + '" stroke="' + COL.white + '" stroke-width="1.5"/>');
        parts.push(textEl(pt.x - 14, pt.y - 12, 'R', { size: 11, fill: COL.white, weight: 700 }));
        parts.push('</g>');
      }
    }());

    /* Batter */
    if (opts.batter === 'R' || opts.batter === 'L') {
      (function () {
        var box = opts.batter === 'R' ? bbL : bbR;
        var bx = box.x + box.w / 2;
        var by = box.y + box.h / 2;
        parts.push('<g class="hrl-batter">');
        parts.push('<circle cx="' + nr(bx) + '" cy="' + nr(by - 10) + '" r="5" fill="' +
          COL.cream + '" stroke="' + COL.ink + '" stroke-width="1.5"/>');
        parts.push('<line x1="' + nr(bx) + '" y1="' + nr(by - 5) + '" x2="' + nr(bx) +
          '" y2="' + nr(by + 8) + '" stroke="' + COL.ink + '" stroke-width="1.6"/>');
        parts.push(textEl(bx, by + 22, opts.batter === 'R' ? 'RHB' : 'LHB', { size: 11, weight: 700 }));
        parts.push('</g>');
      }());
    }

    /* Ball */
    if (opts.ball) {
      (function () {
        var pt = null;
        if (typeof opts.ball === 'string') pt = namedBallPt(g, opts.ball);
        else if (opts.ball && typeof opts.ball.x === 'number') pt = normToSvg(g, opts.ball.x, opts.ball.y);
        if (pt) parts.push(baseballMark(pt.x, pt.y, 8, 'hrl-ball'));
      }());
    }

    /* Arrows */
    (function () {
      var arr = asArr(opts.arrows);
      var j, a, b, st;
      for (j = 0; j < arr.length; j++) {
        a = resolvePt(g, posMap, arr[j].from);
        b = resolvePt(g, posMap, arr[j].to);
        st = arr[j].style || 'throw';
        if (a && b) parts.push(arrowPath(a, b, st));
      }
    }());

    /* Covering callouts */
    if (opts.covering) {
      (function () {
        var map = { home: g.home, first: g.first, second: g.second, third: g.third, plate: g.home };
        var base, pid, pt, lab;
        for (base in opts.covering) {
          if (!Object.prototype.hasOwnProperty.call(opts.covering, base)) continue;
          pid = opts.covering[base];
          pt = map[base];
          if (!pt) continue;
          lab = String(pid).toUpperCase();
          parts.push('<g class="hrl-cover">');
          parts.push('<rect x="' + nr(pt.x + 12) + '" y="' + nr(pt.y - 28) +
            '" width="46" height="20" rx="3" fill="' + COL.white + '" stroke="' +
            COL.ink + '" stroke-width="1"/>');
          parts.push(textEl(pt.x + 35, pt.y - 14, lab, { size: 11, weight: 700, cls: 'hrl-cover-label' }));
          parts.push('</g>');
        }
      }());
    }

    if (hasRoles) {
      parts.push(roleLegend(24, g.H - 22));
    }

    /* Hotspots — always emitted when requested, even if the visual is off */
    if (anyHot(opts)) {
      hx = '';
      addCirc = function (id, pt, r) {
        if (hasHot(opts, id) && pt) hx += hotspotG(id, hitCircle(pt.x, pt.y, r || 22));
      };
      addBox = function (id, box) {
        if (hasHot(opts, id) && box) hx += hotspotG(id, hitRect(box.x, box.y, box.w, box.h));
      };
      if (hasHot(opts, 'fair-territory')) hx += hotspotG('fair-territory', hitPath(fairD));
      if (hasHot(opts, 'outfield')) hx += hotspotG('outfield', hitPath(fairD));
      if (hasHot(opts, 'infield')) hx += hotspotG('infield', hitPath(dirtD));
      addCirc('home', g.home, 24);
      addCirc('plate', g.home, 22);
      addCirc('first', g.first, 24);
      addCirc('second', g.second, 24);
      addCirc('third', g.third, 24);
      addCirc('mound', g.mound, 24);
      if (hasHot(opts, 'warning-track')) hx += hotspotG('warning-track', hitPath(warnD));
      if (hasHot(opts, 'foul-left')) {
        hx += hotspotG('foul-left', hitRect(16, 16, g.home.x - 16, g.H - 32));
      }
      if (hasHot(opts, 'foul-right')) {
        hx += hotspotG('foul-right', hitRect(g.home.x, 16, g.W / 2 - 16, g.H - 32));
      }
      if (hasHot(opts, 'backstop')) {
        hx += hotspotG('backstop', hitRect(g.home.x - bsR, g.home.y + 4, bsR * 2, Math.max(44, bsR)));
      }
      addBox('batter-box-left', bbL);
      addBox('batter-box-right', bbR);
      addBox('catcher-box', cb);
      addCirc('on-deck-left', odL, 22);
      addCirc('on-deck-right', odR, 22);
      addBox('coach-box-first', c1);
      addBox('coach-box-third', c3);
      addBox('dugout-home', dugH);
      addBox('dugout-away', dugA);
      if (hasHot(opts, 'baseline-first')) {
        hx += hotspotG('baseline-first', hitCircle((g.home.x + g.first.x) / 2, (g.home.y + g.first.y) / 2, 22));
      }
      if (hasHot(opts, 'baseline-second')) {
        hx += hotspotG('baseline-second', hitCircle((g.first.x + g.second.x) / 2, (g.first.y + g.second.y) / 2, 22));
      }
      if (hasHot(opts, 'baseline-third')) {
        hx += hotspotG('baseline-third', hitCircle((g.second.x + g.third.x) / 2, (g.second.y + g.third.y) / 2, 22));
      }
      if (hasHot(opts, 'baseline-home')) {
        hx += hotspotG('baseline-home', hitCircle((g.third.x + g.home.x) / 2, (g.third.y + g.home.y) / 2, 22));
      }
      addCirc('foul-pole-left', g.foulL, 22);
      addCirc('foul-pole-right', g.foulR, 22);
      if (hasHot(opts, 'outfield-fence')) {
        hx += hotspotG('outfield-fence', hitCircle(g.cf.x, g.cf.y, 24));
      }
      for (i = 0; i < POSITIONS.length; i++) {
        addCirc(POSITIONS[i], posMap[POSITIONS[i]], 22);
      }
      parts.push(hx);
    }

    title = opts.title || ('Baseball field \u2014 ' + g.spec.label);
    desc = fieldDesc(opts, g.spec);
    inner = defs + parts.join('');
    return wrapSvg('field', opts, 800, 720, title, desc, inner);
  }

  /* ------------------------------------------------------------------ */
  /* strikeZone()                                                        */
  /* ------------------------------------------------------------------ */

  function strikeZoneDesc(opts) {
    var bits;
    if (opts.desc) return opts.desc;
    if (opts.zoneRef === 'youth') {
      bits = 'Little League strike zone from the catcher\'s view: the space over home plate between the batter\'s armpits and the top of the knees in a natural stance';
    } else if (opts.zoneRef === 'adult') {
      bits = 'OBR / Baseball Canada strike zone from the catcher\'s view: the space over home plate between the bottom of the kneecap and the midpoint of the shoulders and the top of the pants (the letters)';
    } else {
      bits = 'A strike-zone diagram from the catcher\'s view, with the zone sitting over home plate';
    }
    if (opts.grid === 0) bits += ', shown as a single box';
    else bits += ', divided into nine cells numbered left to right, top to bottom';
    if (opts.showBatter === 'R') bits += ', with a right-handed batter silhouette for scale';
    if (opts.showBatter === 'L') bits += ', with a left-handed batter silhouette for scale';
    if (opts.pitches && opts.pitches.length) bits += '. Pitches are plotted as numbered dots';
    return bits + '.';
  }

  function batterSilhouette(x, y, handed, h) {
    var flip = handed === 'L' ? -1 : 1;
    var s = '<g class="hrl-sz-batter" transform="translate(' + nr(x) + ' ' + nr(y) + ') scale(' + flip + ' 1)">';
    s += '<ellipse cx="0" cy="' + nr(-h * 0.42) + '" rx="10" ry="12" fill="none" stroke="' +
      COL.ink + '" stroke-width="1.8"/>';
    s += '<path d="M0,' + nr(-h * 0.30) + ' L0,' + nr(h * 0.02) +
      ' M0,' + nr(-h * 0.18) + ' L-16,' + nr(-h * 0.02) +
      ' M0,' + nr(-h * 0.18) + ' L14,' + nr(-h * 0.22) +
      ' M0,' + nr(h * 0.02) + ' L-10,' + nr(h * 0.48) +
      ' M0,' + nr(h * 0.02) + ' L12,' + nr(h * 0.48) +
      '" fill="none" stroke="' + COL.ink + '" stroke-width="1.8" stroke-linecap="round"/>';
    s += '<line x1="12" y1="' + nr(-h * 0.24) + '" x2="28" y2="' + nr(-h * 0.50) +
      '" stroke="' + COL.unitOf + '" stroke-width="2.4" stroke-linecap="round"/>';
    s += '</g>';
    return s;
  }

  function strikeZone(opts) {
    var W = 420, H = 520;
    var grid, showBox, zx, zy, zw, zh, cellW, cellH, i, r, c, id;
    var plotX, plotY, plotW, plotH, parts, title, desc;
    var pitches, call, cx, cy, info, nLab, legendY, keys, k;
    var hiLab, loLab;
    opts = optsOf(opts);
    grid = opts.grid;
    if (grid === undefined || grid === null) grid = 3;
    showBox = opts.showZoneBox;
    if (showBox === undefined) showBox = true;

    plotX = 70;
    plotY = 36;
    plotW = 280;
    plotH = 340;
    zx = plotX + plotW * 0.22;
    zy = plotY + plotH * 0.18;
    zw = plotW * 0.56;
    zh = plotH * 0.52;
    cellW = zw / 3;
    cellH = zh / 3;

    parts = [];
    parts.push('<rect class="hrl-sz-bg" x="8" y="8" width="' + (W - 16) + '" height="' +
      (H - 16) + '" rx="10" fill="' + COL.cream + '" stroke="' + COL.border + '" stroke-width="1"/>');

    if (opts.showBatter === 'R') parts.push(batterSilhouette(48, zy + zh * 0.55, 'R', zh));
    if (opts.showBatter === 'L') parts.push(batterSilhouette(W - 48, zy + zh * 0.55, 'L', zh));

    /* Outer ball regions (behind the zone so cells sit on top) */
    parts.push('<rect class="hrl-sz-out" x="' + plotX + '" y="' + plotY + '" width="' +
      plotW + '" height="' + plotH + '" fill="' + COL.white + '" stroke="' + COL.border +
      '" stroke-width="1"/>');

    if (showBox) {
      parts.push('<rect class="hrl-sz-box" x="' + nr(zx) + '" y="' + nr(zy) + '" width="' +
        nr(zw) + '" height="' + nr(zh) + '" fill="' + COL.white + '" stroke="' + COL.ink +
        '" stroke-width="2.4"/>');
    }

    if (grid === 3) {
      for (r = 0; r < 3; r++) {
        for (c = 0; c < 3; c++) {
          id = 'zone-' + (r * 3 + c + 1);
          parts.push('<g class="hrl-sz-cell">');
          parts.push('<rect x="' + nr(zx + c * cellW) + '" y="' + nr(zy + r * cellH) +
            '" width="' + nr(cellW) + '" height="' + nr(cellH) + '" fill="' + COL.white +
            '" stroke="' + COL.ink + '" stroke-width="1"/>');
          parts.push(textEl(zx + c * cellW + cellW / 2, zy + r * cellH + cellH / 2 + 5,
            String(r * 3 + c + 1), { size: 14, fill: COL.muted, weight: 700 }));
          parts.push('</g>');
        }
      }
    }

    hiLab = opts.zoneRef === 'youth' ? 'Armpits' : (opts.zoneRef === 'adult' ? 'Letters' : 'Top');
    loLab = opts.zoneRef === 'youth' ? 'Top of knees' : (opts.zoneRef === 'adult' ? 'Bottom of kneecap' : 'Bottom');
    if (opts.zoneRef === 'youth') {
      parts.push(textEl(zx + zw / 2, zy - 8, 'Armpits (Little League upper bound)', { size: 11, cls: 'hrl-sz-ref' }));
      parts.push(textEl(zx + zw / 2, zy + zh + 16, 'Top of the knees', { size: 11, cls: 'hrl-sz-ref' }));
    } else if (opts.zoneRef === 'adult') {
      parts.push(textEl(zx + zw / 2, zy - 8, 'Letters (OBR upper bound)', { size: 11, cls: 'hrl-sz-ref' }));
      parts.push(textEl(zx + zw / 2, zy + zh + 16, 'Bottom of the kneecap', { size: 11, cls: 'hrl-sz-ref' }));
    } else {
      parts.push(textEl(zx + zw / 2, zy - 8, hiLab, { size: 11, cls: 'hrl-sz-ref' }));
      parts.push(textEl(zx + zw / 2, zy + zh + 16, loLab, { size: 11, cls: 'hrl-sz-ref' }));
    }
    parts.push(textEl(zx - 8, zy + zh / 2, 'In', { size: 11, anchor: 'end', cls: 'hrl-sz-ref' }));
    parts.push(textEl(zx + zw + 8, zy + zh / 2, 'Away', { size: 11, anchor: 'start', cls: 'hrl-sz-ref' }));

    /* Plate under the zone */
    parts.push('<path class="hrl-sz-plate" d="' + platePath(zx + zw / 2, zy + zh + 48, 36) +
      '" fill="' + COL.white + '" stroke="' + COL.ink + '" stroke-width="1.4"/>');
    parts.push(textEl(zx + zw / 2, zy + zh + 78, 'Home plate (17 in)', { size: 11, fill: COL.muted }));

    pitches = asArr(opts.pitches);
    for (i = 0; i < pitches.length; i++) {
      info = PITCH_CALLS[pitches[i].call] || PITCH_CALLS.ball;
      cx = plotX + (Number(pitches[i].x) || 0) * plotW;
      cy = plotY + (Number(pitches[i].y) || 0) * plotH;
      nLab = pitches[i].n;
      parts.push('<g class="hrl-sz-pitch" data-call="' + esc(pitches[i].call || 'ball') + '">');
      parts.push('<circle cx="' + nr(cx) + '" cy="' + nr(cy) + '" r="9" fill="' +
        info.color + '" stroke="' + COL.ink + '" stroke-width="1"/>');
      parts.push(textEl(cx, cy + 4, nLab !== undefined && nLab !== null ? String(nLab) : info.glyph, {
        size: 11, fill: pitches[i].call === 'called-strike' ? COL.ink : COL.white, weight: 700
      }));
      parts.push('</g>');
    }

    /* Legend */
    legendY = H - 36;
    keys = ['ball', 'called-strike', 'swinging-strike', 'foul', 'in-play'];
    parts.push('<g class="hrl-sz-legend hrl-legend">');
    for (i = 0; i < keys.length; i++) {
      k = keys[i];
      info = PITCH_CALLS[k];
      parts.push('<g class="hrl-legend-item">');
      parts.push('<circle cx="' + (18 + i * 80) + '" cy="' + legendY + '" r="8" fill="' +
        info.color + '" stroke="' + COL.ink + '" stroke-width="1"/>');
      parts.push(textEl(18 + i * 80, legendY + 4, info.glyph, {
        size: 11, fill: k === 'called-strike' ? COL.ink : COL.white, weight: 700
      }));
      parts.push(textEl(30 + i * 80, legendY + 4, info.word, { size: 11, anchor: 'start' }));
      parts.push('</g>');
    }
    parts.push('</g>');

    /* Hotspots — zone cells stay targetable even when grid is 0 (box only) */
    if (anyHot(opts)) {
      for (r = 0; r < 3; r++) {
        for (c = 0; c < 3; c++) {
          id = 'zone-' + (r * 3 + c + 1);
          if (hasHot(opts, id)) {
            parts.push(hotspotG(id, hitRect(zx + c * cellW, zy + r * cellH, cellW, cellH)));
          }
        }
      }
      if (hasHot(opts, 'zone-out-high')) {
        parts.push(hotspotG('zone-out-high', hitRect(zx, plotY, zw, zy - plotY)));
      }
      if (hasHot(opts, 'zone-out-low')) {
        parts.push(hotspotG('zone-out-low', hitRect(zx, zy + zh, zw, (plotY + plotH) - (zy + zh))));
      }
      if (hasHot(opts, 'zone-out-in')) {
        parts.push(hotspotG('zone-out-in', hitRect(plotX, zy, zx - plotX, zh)));
      }
      if (hasHot(opts, 'zone-out-away')) {
        parts.push(hotspotG('zone-out-away', hitRect(zx + zw, zy, (plotX + plotW) - (zx + zw), zh)));
      }
    }

    title = opts.title || 'Strike zone (catcher\'s view)';
    desc = strikeZoneDesc(opts);
    return wrapSvg('strikeZone', opts, W, H, title, desc, parts.join(''));
  }

  /* ------------------------------------------------------------------ */
  /* basePaths()                                                         */
  /* ------------------------------------------------------------------ */

  function basePaths(opts) {
    var W = 600, H = 560;
    var g, parts, dirtD, i, rs, shade, leads, outs;
    var title, desc, bits, fromPt, toPt, lab, leadPt, next;
    var basePts, name, hx;
    opts = optsOf(opts);
    g = makeGeom('major-ll', W, H);
    /* Enlarge the diamond: rebuild with a bigger base path. */
    g = makeGeom('major-ll', W, H);
    g.basePx = Math.min(W, H) * 0.42;
    g.px = g.basePx / g.spec.bases;
    g.home = { x: W / 2, y: H * 0.82 };
    g.first = g.xy(g.spec.bases / Math.SQRT2, g.spec.bases / Math.SQRT2);
    g.third = g.xy(-g.spec.bases / Math.SQRT2, g.spec.bases / Math.SQRT2);
    g.second = g.xy(0, g.spec.bases * Math.SQRT2);
    g.mound = g.xy(0, g.spec.mound);

    basePts = { home: g.home, first: g.first, second: g.second, third: g.third };

    dirtD = roundedDiamond([g.home, g.first, g.second, g.third], 28);
    parts = [];
    parts.push('<rect class="hrl-bp-bg" x="10" y="10" width="' + (W - 20) + '" height="' +
      (H - 20) + '" rx="12" fill="' + COL.grass + '"/>');
    parts.push('<path class="hrl-bp-diamond hrl-field-dirt" d="' + dirtD + '" fill="' +
      COL.dirt + '" stroke="' + COL.line + '" stroke-width="3"/>');
    parts.push('<path class="hrl-field-infield-grass" d="' +
      roundedDiamond([
        lerpPt(g.home, g.second, 0.2),
        lerpPt(g.first, g.third, 0.36),
        lerpPt(g.second, g.home, 0.2),
        lerpPt(g.third, g.first, 0.36)
      ], 18) + '" fill="' + COL.grassIn + '"/>');
    parts.push('<circle class="hrl-field-mound" cx="' + nr(g.mound.x) + '" cy="' +
      nr(g.mound.y) + '" r="14" fill="' + COL.dirtDark + '"/>');

    shade = opts.shade;
    if (shade === 'force' || shade === 'tag') {
      for (name in basePts) {
        if (!Object.prototype.hasOwnProperty.call(basePts, name)) continue;
        if (shade === 'force') {
          parts.push('<circle class="hrl-bp-shade hrl-bp-shade-force" cx="' +
            nr(basePts[name].x) + '" cy="' + nr(basePts[name].y) +
            '" r="22" fill="' + COL.ball + '" fill-opacity="0.28"/>');
        } else {
          parts.push('<circle class="hrl-bp-shade hrl-bp-shade-tag" cx="' +
            nr(basePts[name].x) + '" cy="' + nr(basePts[name].y) +
            '" r="26" fill="none" stroke="' + COL.base + '" stroke-width="4"/>');
        }
      }
      parts.push(textEl(24, 36, shade === 'force' ? 'Force out: touch the bag' : 'Tag out: tag the runner', {
        size: 12, weight: 700, anchor: 'start', cls: 'hrl-bp-shade-label'
      }));
    }

    var drawBag = function (pt, lab) {
      parts.push('<rect class="hrl-field-base" x="' + nr(pt.x - 9) + '" y="' + nr(pt.y - 9) +
        '" width="18" height="18" transform="rotate(45 ' + nr(pt.x) + ' ' + nr(pt.y) +
        ')" fill="' + COL.white + '" stroke="' + COL.ink + '" stroke-width="1"/>');
      if (opts.labels) {
        parts.push(textEl(pt.x, pt.y + 28, lab, { size: 12, weight: 700, cls: 'hrl-label' }));
      }
    };
    parts.push('<path class="hrl-field-plate" d="' + platePath(g.home.x, g.home.y, 18) +
      '" fill="' + COL.white + '" stroke="' + COL.ink + '" stroke-width="1"/>');
    drawBag(g.first, '1B');
    drawBag(g.second, '2B');
    drawBag(g.third, '3B');
    if (opts.labels) parts.push(textEl(g.home.x, g.home.y + 34, 'Home', { size: 12, weight: 700 }));

    rs = asArr(opts.runners);
    for (i = 0; i < rs.length; i++) {
      fromPt = basePts[rs[i].from];
      toPt = basePts[rs[i].to];
      if (!fromPt || !toPt) continue;
      parts.push(arrowPath(lerpPt(fromPt, toPt, 0.12), lerpPt(fromPt, toPt, 0.88), rs[i].style || 'advance', 'hrl-bp-runner'));
      if (rs[i].label) {
        lab = lerpPt(fromPt, toPt, 0.5);
        parts.push(textEl(lab.x, lab.y - 10, rs[i].label, { size: 11, weight: 700, cls: 'hrl-bp-runner-label' }));
      }
    }

    leads = asArr(opts.leads);
    for (i = 0; i < leads.length; i++) {
      fromPt = basePts[leads[i].base];
      if (!fromPt) continue;
      next = leads[i].base === 'first' ? g.second : (leads[i].base === 'second' ? g.third : g.home);
      leadPt = lerpPt(fromPt, next, leads[i].type === 'secondary' ? 0.22 : 0.12);
      parts.push('<g class="hrl-bp-lead">');
      parts.push('<circle cx="' + nr(leadPt.x) + '" cy="' + nr(leadPt.y) + '" r="7" fill="' +
        COL.unitOf + '" stroke="' + COL.ink + '" stroke-width="1"/>');
      parts.push(textEl(leadPt.x, leadPt.y - 12, leads[i].type === 'secondary' ? '2nd lead' : '1st lead', {
        size: 11, cls: 'hrl-bp-lead-label'
      }));
      parts.push('</g>');
    }

    outs = opts.outs;
    if (typeof outs === 'number') {
      parts.push('<g class="hrl-bp-outs">');
      parts.push(textEl(W - 88, 32, 'Outs', { size: 11, anchor: 'start' }));
      parts.push('<circle cx="' + (W - 50) + '" cy="44" r="7" fill="' +
        (outs >= 1 ? COL.ink : COL.white) + '" stroke="' + COL.ink + '" stroke-width="1.4"/>');
      parts.push('<circle cx="' + (W - 30) + '" cy="44" r="7" fill="' +
        (outs >= 2 ? COL.ink : COL.white) + '" stroke="' + COL.ink + '" stroke-width="1.4"/>');
      parts.push('</g>');
    }

    if (anyHot(opts)) {
      hx = '';
      if (hasHot(opts, 'home') || hasHot(opts, 'plate')) {
        if (hasHot(opts, 'home')) hx += hotspotG('home', hitCircle(g.home.x, g.home.y, 24));
        if (hasHot(opts, 'plate')) hx += hotspotG('plate', hitCircle(g.home.x, g.home.y, 22));
      }
      if (hasHot(opts, 'first')) hx += hotspotG('first', hitCircle(g.first.x, g.first.y, 24));
      if (hasHot(opts, 'second')) hx += hotspotG('second', hitCircle(g.second.x, g.second.y, 24));
      if (hasHot(opts, 'third')) hx += hotspotG('third', hitCircle(g.third.x, g.third.y, 24));
      if (hasHot(opts, 'mound')) hx += hotspotG('mound', hitCircle(g.mound.x, g.mound.y, 22));
      parts.push(hx);
    }

    bits = ['A base-path diamond used to teach baserunning'];
    if (shade) bits.push(shade === 'force' ? 'with force-out bases shaded' : 'with tag-out bases marked');
    if (rs.length) bits.push('and runner routes drawn');
    title = opts.title || 'Base paths';
    desc = opts.desc || (bits.join(', ') + '.');
    return wrapSvg('basePaths', opts, W, H, title, desc, parts.join(''));
  }

  /* ------------------------------------------------------------------ */
  /* positionGrid()                                                      */
  /* ------------------------------------------------------------------ */

  function positionGrid(opts) {
    var W = 720, H = 260;
    var parts = [], i, id, x, y, w, h, fill, tFill, hi;
    var names = POSITION_NAMES;
    opts = optsOf(opts);
    hi = opts.highlight;
    w = 72;
    h = 180;
    parts.push('<rect class="hrl-pg-bg" x="8" y="8" width="' + (W - 16) + '" height="' +
      (H - 16) + '" rx="10" fill="' + COL.cream + '"/>');
    for (i = 0; i < POSITIONS.length; i++) {
      id = POSITIONS[i];
      x = 18 + i * 77;
      y = 28;
      fill = unitColor(id);
      tFill = COL.white;
      parts.push('<g class="hrl-pg-cell' + (hi === id ? ' hrl-pg-highlight' : '') +
        '" data-pos="' + id + '" data-teach="' + unitTeach(id) + '">');
      parts.push('<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h +
        '" rx="8" fill="' + fill + '" stroke="' + (hi === id ? COL.base : COL.ink) +
        '" stroke-width="' + (hi === id ? 4 : 1.2) + '"/>');
      parts.push(textEl(x + w / 2, y + 42, String(POSITION_NUMBERS[id]), {
        size: 28, fill: tFill, weight: 700, cls: 'hrl-pg-num'
      }));
      parts.push(textEl(x + w / 2, y + 72, String(id).toUpperCase(), {
        size: 14, fill: tFill, weight: 700, cls: 'hrl-pg-abbr'
      }));
      parts.push(textLines(x + w / 2, y + 108, wrapWords(names[id], 8), {
        size: 11, fill: tFill, cls: 'hrl-pg-name'
      }, 14));
      parts.push('</g>');
      if (hasHot(opts, id)) {
        parts.push(hotspotG(id, hitRect(x, y, w, h)));
      }
    }
    parts.push(textEl(W / 2, H - 18, 'Battery  \u00b7  Infield  \u00b7  Outfield', {
      size: 11, fill: COL.muted, cls: 'hrl-pg-caption'
    }));
    return wrapSvg('positionGrid', opts, W, H,
      opts.title || 'The nine fielding positions',
      opts.desc || 'A reference card of the nine fielding positions: number, abbreviation, full name, and unit colour (battery, infield, outfield).',
      parts.join(''));
  }

  /* ------------------------------------------------------------------ */
  /* Stick figures                                                       */
  /* ------------------------------------------------------------------ */

  function fig(ox, oy, spec) {
    var s = '<g class="hrl-seq-figure">';
    var sw = 2.4;
    function poly(pts) {
      var d = '', i;
      for (i = 0; i < pts.length; i += 2) {
        d += (i === 0 ? 'M' : 'L') + nr(ox + pts[i]) + ',' + nr(oy + pts[i + 1]);
      }
      return '<path d="' + d + '" fill="none" stroke="' + COL.ink + '" stroke-width="' +
        sw + '" stroke-linecap="round" stroke-linejoin="round"/>';
    }
    s += '<line x1="' + nr(ox + 20) + '" y1="' + nr(oy + 148) + '" x2="' + nr(ox + 140) +
      '" y2="' + nr(oy + 148) + '" stroke="' + COL.border + '" stroke-width="2"/>';
    s += '<circle cx="' + nr(ox + spec.head[0]) + '" cy="' + nr(oy + spec.head[1]) +
      '" r="' + (spec.head[2] || 8) + '" fill="' + COL.cream + '" stroke="' + COL.ink +
      '" stroke-width="' + sw + '"/>';
    s += poly(spec.torso);
    s += poly(spec.legL);
    s += poly(spec.legR);
    s += poly(spec.armL);
    s += poly(spec.armR);
    if (spec.bat) {
      s += '<line class="hrl-seq-bat" x1="' + nr(ox + spec.bat[0]) + '" y1="' + nr(oy + spec.bat[1]) +
        '" x2="' + nr(ox + spec.bat[2]) + '" y2="' + nr(oy + spec.bat[3]) + '" stroke="' +
        COL.unitOf + '" stroke-width="3.2" stroke-linecap="round"/>';
    }
    if (spec.glove) {
      s += '<ellipse cx="' + nr(ox + spec.glove[0]) + '" cy="' + nr(oy + spec.glove[1]) +
        '" rx="7" ry="5" fill="' + COL.unitIf + '" stroke="' + COL.ink + '" stroke-width="1"/>';
    }
    if (spec.ball) {
      s += baseballMark(ox + spec.ball[0], oy + spec.ball[1], 5);
    }
    return s + '</g>';
  }

  var SWING_POSES = [
    { /* stance: even feet, bat on the back shoulder */
      head: [86, 36, 8],
      torso: [86, 46, 88, 92],
      legL: [88, 92, 70, 114, 58, 146],
      legR: [88, 92, 104, 116, 112, 146],
      armL: [86, 58, 70, 78],
      armR: [86, 58, 104, 50, 114, 40],
      bat: [110, 38, 132, 16]
    },
    { /* load: weight back, hands back, front toe */
      head: [98, 38, 8],
      torso: [98, 48, 108, 94],
      legL: [108, 94, 86, 118, 64, 144],
      legR: [108, 94, 122, 116, 128, 146],
      armL: [100, 60, 92, 74],
      armR: [100, 58, 124, 48, 132, 34],
      bat: [128, 30, 138, 8]
    },
    { /* stride: long front step, hands still back */
      head: [74, 38, 8],
      torso: [76, 48, 90, 92],
      legL: [90, 92, 52, 116, 32, 146],
      legR: [90, 92, 112, 118, 120, 146],
      armL: [80, 60, 70, 74],
      armR: [80, 58, 112, 50, 122, 36],
      bat: [118, 32, 130, 10]
    },
    { /* contact: bat through the zone, firm front side */
      head: [58, 40, 8],
      torso: [58, 50, 72, 90],
      legL: [72, 90, 44, 116, 34, 146],
      legR: [72, 90, 98, 118, 92, 146],
      armL: [60, 60, 28, 70],
      armR: [60, 60, 40, 66, 18, 72],
      bat: [4, 76, 78, 62]
    },
    { /* finish: high two-handed finish, back heel up */
      head: [48, 32, 8],
      torso: [50, 42, 64, 88],
      legL: [64, 88, 52, 116, 46, 146],
      legR: [64, 88, 96, 108, 108, 128],
      armL: [52, 54, 34, 24],
      armR: [52, 54, 48, 20],
      bat: [44, 16, 22, 6]
    }
  ];

  var THROW_POSES = [
    { /* grip: two hands at the chest, ball showing */
      head: [80, 32, 8],
      torso: [80, 42, 80, 92],
      legL: [80, 92, 62, 118, 54, 146],
      legR: [80, 92, 100, 118, 108, 146],
      armL: [80, 56, 64, 70, 70, 58],
      armR: [80, 56, 96, 70, 90, 58],
      glove: [62, 68],
      ball: [88, 56]
    },
    { /* separation: hands break, throw arm down and back */
      head: [74, 34, 8],
      torso: [76, 44, 84, 92],
      legL: [84, 92, 70, 118, 60, 146],
      legR: [84, 92, 108, 116, 118, 146],
      armL: [78, 58, 52, 44],
      armR: [78, 58, 108, 96, 122, 114],
      glove: [48, 40],
      ball: [124, 118]
    },
    { /* stride: long front step, throwing arm in a high L */
      head: [70, 30, 8],
      torso: [72, 40, 82, 88],
      legL: [82, 88, 58, 116, 50, 146],
      legR: [82, 88, 118, 114, 132, 146],
      armL: [74, 54, 48, 48],
      armR: [74, 54, 50, 36, 38, 18],
      glove: [44, 46],
      ball: [36, 12]
    },
    { /* release: arm out front, ball leaving */
      head: [78, 32, 8],
      torso: [78, 42, 86, 90],
      legL: [86, 90, 70, 118, 64, 146],
      legR: [86, 90, 120, 112, 136, 146],
      armL: [80, 56, 64, 70],
      armR: [80, 56, 118, 48, 142, 40],
      glove: [58, 72],
      ball: [152, 36]
    },
    { /* follow-through: bent over, arm across, back foot coming through */
      head: [96, 48, 8],
      torso: [94, 58, 88, 100],
      legL: [88, 100, 70, 124, 64, 146],
      legR: [88, 100, 118, 118, 132, 132],
      armL: [92, 70, 110, 86],
      armR: [92, 70, 60, 96, 48, 118],
      glove: [116, 90]
    }
  ];

  function fourSeamGrip(x, y) {
    var s = '<g class="hrl-grip-inset">';
    s += '<rect x="' + x + '" y="' + y + '" width="86" height="96" rx="8" fill="' +
      COL.white + '" stroke="' + COL.ink + '" stroke-width="1.2"/>';
    s += '<circle cx="' + (x + 43) + '" cy="' + (y + 44) + '" r="28" fill="' + COL.cream +
      '" stroke="' + COL.ink + '" stroke-width="1.4"/>';
    s += '<path d="M' + (x + 24) + ',' + (y + 30) + ' Q' + (x + 43) + ',' + (y + 18) +
      ' ' + (x + 62) + ',' + (y + 30) + '" fill="none" stroke="' + COL.ball + '" stroke-width="2"/>';
    s += '<path d="M' + (x + 24) + ',' + (y + 58) + ' Q' + (x + 43) + ',' + (y + 70) +
      ' ' + (x + 62) + ',' + (y + 58) + '" fill="none" stroke="' + COL.ball + '" stroke-width="2"/>';
    s += '<rect x="' + (x + 34) + '" y="' + (y + 22) + '" width="7" height="22" rx="3" fill="' +
      COL.ink + '" fill-opacity="0.35"/>';
    s += '<rect x="' + (x + 45) + '" y="' + (y + 22) + '" width="7" height="22" rx="3" fill="' +
      COL.ink + '" fill-opacity="0.35"/>';
    s += textEl(x + 43, y + 88, '4-seam', { size: 11, weight: 700 });
    return s + '</g>';
  }

  function sequenceStrip(kind, opts, meta, poses, defW, defH, extra) {
    var order, i, idx, frames, fw, x, y, hi, hiIdx, showLabels, parts, fid;
    var title, desc;
    opts = optsOf(opts);
    order = asArr(opts.order);
    frames = [];
    if (order.length) {
      for (i = 0; i < order.length; i++) {
        for (idx = 0; idx < meta.length; idx++) {
          if (meta[idx].name === order[i] || meta[idx].id === order[i] || meta[idx].id === 'frame-' + order[i]) {
            frames.push(idx);
            break;
          }
        }
      }
    }
    if (!frames.length) {
      for (i = 0; i < meta.length; i++) frames.push(i);
    }
    showLabels = opts.showLabels;
    if (showLabels === undefined) showLabels = true;
    hi = opts.highlight;
    hiIdx = -1;
    if (typeof hi === 'number') hiIdx = hi;
    else if (typeof hi === 'string') {
      for (i = 0; i < meta.length; i++) {
        if (meta[i].name === hi || meta[i].id === hi || meta[i].id === 'frame-' + hi) hiIdx = i;
      }
    }
    fw = 168;
    y = 18;
    parts = [];
    parts.push('<rect class="hrl-seq-bg" x="8" y="8" width="' + (defW - 16) + '" height="' +
      (defH - 16) + '" rx="10" fill="' + COL.cream + '"/>');
    for (i = 0; i < frames.length; i++) {
      idx = frames[i];
      x = 16 + i * fw;
      fid = meta[idx].id;
      parts.push('<g class="hrl-seq-frame' + (idx === hiIdx ? ' hrl-seq-highlight' : '') +
        '" data-frame="' + fid + '">');
      parts.push('<rect x="' + x + '" y="' + y + '" width="160" height="230" rx="8" fill="' +
        COL.white + '" stroke="' + (idx === hiIdx ? COL.base : COL.border) +
        '" stroke-width="' + (idx === hiIdx ? 3 : 1) + '"/>');
      parts.push(fig(x, y + 28, poses[idx]));
      if (showLabels) {
        parts.push(textEl(x + 80, y + 22, meta[idx].title, {
          size: 13, weight: 700, cls: 'hrl-seq-caption'
        }));
        parts.push(textLines(x + 80, y + 204, wrapWords(meta[idx].cue, 18), {
          size: 11, cls: 'hrl-seq-cue', fill: COL.muted
        }, 13));
      }
      parts.push('</g>');
      if (hasHot(opts, fid)) {
        parts.push(hotspotG(fid, hitRect(x, y, 160, 230)));
      }
    }
    if (extra) parts.push(extra(opts, frames, fw, y));
    title = opts.title || (kind === 'swing' ? 'Swing sequence' : 'Throw sequence');
    desc = opts.desc || (kind === 'swing'
      ? 'Five side-by-side frames of a swing: stance, load, stride, contact, and finish.'
      : 'Five side-by-side frames of a throw: grip, separation, stride, release, and follow-through.');
    return wrapSvg(kind === 'swing' ? 'swingSequence' : 'throwSequence', opts, defW, defH, title, desc, parts.join(''));
  }

  function swingSequence(opts) {
    return sequenceStrip('swing', opts, SWING_META, SWING_POSES, 900, 260, null);
  }

  function throwSequence(opts) {
    return sequenceStrip('throw', opts, THROW_META, THROW_POSES, 900, 260, function (o, frames, fw, y) {
      var i, x;
      if (!o.showGrip) return '';
      for (i = 0; i < frames.length; i++) {
        if (THROW_META[frames[i]].name === 'grip') {
          x = 16 + i * fw;
          return fourSeamGrip(x + 72, y + 30);
        }
      }
      return fourSeamGrip(20, 48);
    });
  }

  /* ------------------------------------------------------------------ */
  /* countMatrix()                                                       */
  /* ------------------------------------------------------------------ */

  function countMatrix(opts) {
    var W = 560, H = 420;
    var parts = [], b, s, x0, y0, cw, ch, x, y, key, fill, hi, hiB, hiS;
    var cls, lab, walkX, kY;
    opts = optsOf(opts);
    hi = opts.highlight ? String(opts.highlight) : '';
    hiB = -1;
    hiS = -1;
    if (hi.indexOf('-') !== -1) {
      hiB = parseInt(hi.split('-')[0], 10);
      hiS = parseInt(hi.split('-')[1], 10);
    }
    x0 = 70;
    y0 = 56;
    cw = 90;
    ch = 72;
    parts.push('<rect class="hrl-count-bg" x="8" y="8" width="' + (W - 16) + '" height="' +
      (H - 16) + '" rx="10" fill="' + COL.cream + '"/>');
    parts.push(textEl(x0 + cw * 2, 32, 'Balls \u2192', { size: 12, weight: 700, cls: 'hrl-count-axis' }));
    parts.push(textEl(28, y0 + ch * 1.5, 'Strikes', { size: 12, weight: 700, cls: 'hrl-count-axis' }));

    for (b = 0; b < 4; b++) {
      parts.push(textEl(x0 + b * (cw + 8) + cw / 2, y0 - 8, String(b), { size: 12, weight: 700 }));
    }
    for (s = 0; s < 3; s++) {
      parts.push(textEl(x0 - 16, y0 + s * (ch + 8) + ch / 2 + 4, String(s), { size: 12, weight: 700 }));
    }

    for (s = 0; s < 3; s++) {
      for (b = 0; b < 4; b++) {
        x = x0 + b * (cw + 8);
        y = y0 + s * (ch + 8);
        key = b + '-' + s;
        fill = COL.white;
        cls = 'hrl-count-cell hrl-count-neutral';
        if (opts.shade === 'leverage') {
          if (HITTER_COUNTS[key]) {
            fill = COL.backup;
            cls = 'hrl-count-cell hrl-count-hitter';
          } else if (PITCHER_COUNTS[key]) {
            fill = COL.ball;
            cls = 'hrl-count-cell hrl-count-pitcher';
          }
        }
        lab = b + '\u2013' + s;
        parts.push('<g class="' + cls + (hiB === b && hiS === s ? ' hrl-count-highlight' : '') +
          '" data-count="' + key + '">');
        parts.push('<rect x="' + x + '" y="' + y + '" width="' + cw + '" height="' + ch +
          '" rx="6" fill="' + fill + '" stroke="' +
          (hiB === b && hiS === s ? COL.base : COL.ink) + '" stroke-width="' +
          (hiB === b && hiS === s ? 3 : 1.2) + '"/>');
        parts.push(textEl(x + cw / 2, y + ch / 2 + 5, lab, {
          size: 18, weight: 700,
          fill: (opts.shade === 'leverage' && (HITTER_COUNTS[key] || PITCHER_COUNTS[key])) ? COL.white : COL.ink
        }));
        parts.push('</g>');
        if (hasHot(opts, 'count-' + b + '-' + s)) {
          parts.push(hotspotG('count-' + b + '-' + s, hitRect(x, y, cw, ch)));
        }
      }
    }

    walkX = x0 + 4 * (cw + 8) + 4;
    parts.push('<g class="hrl-count-walk">');
    parts.push('<rect x="' + walkX + '" y="' + y0 + '" width="72" height="' + (ch * 3 + 16) +
      '" rx="6" fill="' + COL.white + '" stroke="' + COL.backup + '" stroke-width="2"/>');
    parts.push(textLines(walkX + 36, y0 + 40, ['Walk', '(BB)', '4 balls'], { size: 12, weight: 700, fill: COL.backup }, 16));
    parts.push('</g>');

    kY = y0 + 3 * (ch + 8) + 4;
    parts.push('<g class="hrl-count-k">');
    parts.push('<rect x="' + x0 + '" y="' + kY + '" width="' + (4 * (cw + 8) - 8) +
      '" height="44" rx="6" fill="' + COL.white + '" stroke="' + COL.ball + '" stroke-width="2"/>');
    parts.push(textEl(x0 + (4 * (cw + 8) - 8) / 2, kY + 28, 'Strikeout (K) \u2014 3 strikes', {
      size: 13, weight: 700, fill: COL.ball
    }));
    parts.push('</g>');

    if (opts.shade === 'leverage') {
      parts.push('<g class="hrl-legend hrl-count-legend">');
      parts.push('<rect x="24" y="' + (H - 28) + '" width="12" height="12" fill="' + COL.backup + '"/>');
      parts.push(textEl(40, H - 18, "Hitter's count", { size: 11, anchor: 'start' }));
      parts.push('<rect x="160" y="' + (H - 28) + '" width="12" height="12" fill="' + COL.ball + '"/>');
      parts.push(textEl(176, H - 18, "Pitcher's count", { size: 11, anchor: 'start' }));
      parts.push('<rect x="310" y="' + (H - 28) + '" width="12" height="12" fill="' + COL.white +
        '" stroke="' + COL.ink + '"/>');
      parts.push(textEl(326, H - 18, 'Neutral', { size: 11, anchor: 'start' }));
      parts.push('</g>');
    }

    return wrapSvg('countMatrix', opts, W, H,
      opts.title || 'The twelve counts',
      opts.desc || 'A grid of the twelve ball-strike counts (balls 0\u20133 across, strikes 0\u20132 down), with walk and strikeout shown as terminal callouts.',
      parts.join(''));
  }

  /* ------------------------------------------------------------------ */
  /* sprayChart()                                                        */
  /* ------------------------------------------------------------------ */

  function sprayShape(x, y, type, color, hollow) {
    var s = '', fill = hollow ? COL.cream : color;
    if (type === 'line') {
      s = '<rect class="hrl-spray-point" x="' + nr(x - 6) + '" y="' + nr(y - 6) +
        '" width="12" height="12" fill="' + fill + '" stroke="' + color + '" stroke-width="1.6"/>';
    } else if (type === 'fly') {
      s = '<polygon class="hrl-spray-point" points="' + nr(x) + ',' + nr(y - 8) + ' ' +
        nr(x + 8) + ',' + nr(y + 6) + ' ' + nr(x - 8) + ',' + nr(y + 6) + '" fill="' +
        fill + '" stroke="' + color + '" stroke-width="1.6"/>';
    } else if (type === 'pop') {
      s = '<polygon class="hrl-spray-point" points="' + nr(x) + ',' + nr(y - 8) + ' ' +
        nr(x + 7) + ',' + nr(y) + ' ' + nr(x) + ',' + nr(y + 8) + ' ' + nr(x - 7) + ',' +
        nr(y) + '" fill="' + fill + '" stroke="' + color + '" stroke-width="1.6"/>';
    } else {
      s = '<circle class="hrl-spray-point" cx="' + nr(x) + '" cy="' + nr(y) +
        '" r="6.5" fill="' + fill + '" stroke="' + color + '" stroke-width="1.6"/>';
    }
    return s;
  }

  function sprayChart(opts) {
    var W = 700, H = 620;
    var g, parts, pts, i, pt, type, color, hollow, fairD;
    var typeColor = {
      ground: COL.battery,
      line: COL.unitIf,
      fly: COL.unitOf,
      pop: COL.ball
    };
    opts = optsOf(opts);
    g = makeGeom('full', W, H);
    fairD = fairPath(g);
    parts = [];
    parts.push('<rect x="10" y="10" width="' + (W - 20) + '" height="' + (H - 20) +
      '" rx="12" fill="' + COL.grassFoul + '"/>');
    parts.push('<path class="hrl-field-fair" d="' + fairD + '" fill="' + COL.grass +
      '" stroke="' + COL.ink + '" stroke-width="1.4"/>');
    parts.push('<path class="hrl-field-dirt" d="' +
      roundedDiamond([g.home, g.first, g.second, g.third], 28) + '" fill="' + COL.dirt + '"/>');
    parts.push('<path class="hrl-field-line" d="M' + nr(g.home.x) + ',' + nr(g.home.y) +
      ' L' + nr(g.foulL.x) + ',' + nr(g.foulL.y) + ' M' + nr(g.home.x) + ',' + nr(g.home.y) +
      ' L' + nr(g.foulR.x) + ',' + nr(g.foulR.y) + '" stroke="' + COL.line + '" stroke-width="2"/>');
    parts.push('<path class="hrl-field-plate" d="' + platePath(g.home.x, g.home.y, 14) +
      '" fill="' + COL.white + '" stroke="' + COL.ink + '" stroke-width="1"/>');

    if (opts.showZones) {
      parts.push('<path class="hrl-spray-wedge" d="M' + nr(g.home.x) + ',' + nr(g.home.y) +
        ' L' + nr(g.foulL.x) + ',' + nr(g.foulL.y) + ' A' + nr(g.fenceR) + ',' + nr(g.fenceR) +
        ' 0 0 1 ' + nr(g.home.x + Math.sin(-Math.PI / 12) * g.fenceR) + ',' +
        nr(g.home.y - Math.cos(-Math.PI / 12) * g.fenceR) + ' Z" fill="' + COL.unitOf +
        '" fill-opacity="0.12"/>');
      parts.push('<path class="hrl-spray-wedge" d="M' + nr(g.home.x) + ',' + nr(g.home.y) +
        ' L' + nr(g.home.x + Math.sin(-Math.PI / 12) * g.fenceR) + ',' +
        nr(g.home.y - Math.cos(-Math.PI / 12) * g.fenceR) +
        ' A' + nr(g.fenceR) + ',' + nr(g.fenceR) + ' 0 0 1 ' +
        nr(g.home.x + Math.sin(Math.PI / 12) * g.fenceR) + ',' +
        nr(g.home.y - Math.cos(Math.PI / 12) * g.fenceR) + ' Z" fill="' + COL.unitIf +
        '" fill-opacity="0.12"/>');
      parts.push('<path class="hrl-spray-wedge" d="M' + nr(g.home.x) + ',' + nr(g.home.y) +
        ' L' + nr(g.home.x + Math.sin(Math.PI / 12) * g.fenceR) + ',' +
        nr(g.home.y - Math.cos(Math.PI / 12) * g.fenceR) +
        ' A' + nr(g.fenceR) + ',' + nr(g.fenceR) + ' 0 0 1 ' + nr(g.foulR.x) + ',' +
        nr(g.foulR.y) + ' Z" fill="' + COL.battery + '" fill-opacity="0.10"/>');
      parts.push(textEl(g.foulL.x + 50, g.foulL.y + 30, 'Pull', { size: 12, weight: 700, fill: COL.muted }));
      parts.push(textEl(g.cf.x, g.cf.y + 28, 'Centre', { size: 12, weight: 700, fill: COL.muted }));
      parts.push(textEl(g.foulR.x - 50, g.foulR.y + 30, 'Oppo', { size: 12, weight: 700, fill: COL.muted }));
    }

    pts = asArr(opts.points);
    if (!pts.length) {
      parts.push(textEl(W / 2, H / 2, 'No batted balls plotted', { size: 13, fill: COL.muted }));
    }
    for (i = 0; i < pts.length; i++) {
      if (typeof pts[i].x === 'number' && typeof pts[i].y === 'number') {
        pt = normToSvg(g, pts[i].x, pts[i].y);
      } else {
        continue;
      }
      type = pts[i].type || 'ground';
      color = typeColor[type] || COL.ink;
      hollow = pts[i].outcome === 'out';
      parts.push('<g class="hrl-spray-hit" data-type="' + esc(type) + '" data-outcome="' +
        esc(pts[i].outcome || '') + '">');
      parts.push(sprayShape(pt.x, pt.y, type, color, hollow));
      if (pts[i].outcome === 'error') {
        parts.push(textEl(pt.x + 10, pt.y - 8, 'E', { size: 11, weight: 700, fill: COL.base, anchor: 'start' }));
      }
      if (pts[i].label) {
        parts.push(textEl(pt.x, pt.y + 16, pts[i].label, { size: 11 }));
      }
      parts.push('</g>');
    }

    parts.push('<g class="hrl-legend hrl-spray-legend">');
    parts.push(sprayShape(28, H - 24, 'ground', typeColor.ground, false));
    parts.push(textEl(42, H - 20, 'Ground', { size: 11, anchor: 'start' }));
    parts.push(sprayShape(118, H - 24, 'line', typeColor.line, false));
    parts.push(textEl(132, H - 20, 'Line', { size: 11, anchor: 'start' }));
    parts.push(sprayShape(198, H - 24, 'fly', typeColor.fly, false));
    parts.push(textEl(212, H - 20, 'Fly', { size: 11, anchor: 'start' }));
    parts.push(sprayShape(278, H - 24, 'pop', typeColor.pop, false));
    parts.push(textEl(292, H - 20, 'Pop', { size: 11, anchor: 'start' }));
    parts.push(sprayShape(368, H - 24, 'ground', COL.ink, true));
    parts.push(textEl(382, H - 20, 'Out (hollow)', { size: 11, anchor: 'start' }));
    parts.push(textEl(500, H - 20, 'E = error', { size: 11, anchor: 'start', fill: COL.muted }));
    parts.push('</g>');

    return wrapSvg('sprayChart', opts, W, H,
      opts.title || 'Spray chart',
      opts.desc || 'A field outline with batted balls plotted by type (ground, line, fly, pop) and outcome (hit, out, error).',
      parts.join(''));
  }

  /* ------------------------------------------------------------------ */
  /* scaleGauge()                                                        */
  /* ------------------------------------------------------------------ */

  function scaleGauge(opts) {
    var W = 640, H = 220;
    var parts, x0, x1, y, i, v, t, cx, value, compare, bands;
    opts = optsOf(opts);
    x0 = 50;
    x1 = W - 50;
    y = 110;
    value = opts.value;
    if (typeof value !== 'number' || isNaN(value)) value = 50;
    compare = opts.compare;
    bands = [
      { at: 25, lab: 'Well below' },
      { at: 35, lab: 'Below avg' },
      { at: 45, lab: 'Fringe avg' },
      { at: 50, lab: 'MLB average' },
      { at: 55, lab: 'Above avg' },
      { at: 65, lab: 'Plus' },
      { at: 75, lab: 'Well above' }
    ];
    function xOf(val) {
      return x0 + ((val - 20) / 60) * (x1 - x0);
    }
    parts = [];
    parts.push('<rect x="8" y="8" width="' + (W - 16) + '" height="' + (H - 16) +
      '" rx="10" fill="' + COL.cream + '"/>');
    if (opts.label) {
      parts.push(textEl(W / 2, 36, opts.label, { size: 16, weight: 700, cls: 'hrl-gauge-label' }));
    }
    parts.push('<line class="hrl-gauge-track" x1="' + x0 + '" y1="' + y + '" x2="' + x1 +
      '" y2="' + y + '" stroke="' + COL.ink + '" stroke-width="4" stroke-linecap="round"/>');
    for (i = 20; i <= 80; i += 10) {
      t = xOf(i);
      parts.push('<line class="hrl-gauge-tick" x1="' + t + '" y1="' + (y - 12) + '" x2="' +
        t + '" y2="' + (y + 12) + '" stroke="' + COL.ink + '" stroke-width="2"/>');
      parts.push(textEl(t, y + 28, String(i), { size: 12, weight: 700, cls: 'hrl-gauge-tick-label' }));
    }
    for (i = 0; i < bands.length; i++) {
      if (bands[i].at === 50) {
        parts.push(textEl(xOf(50), y - 44, 'MLB average', { size: 11, fill: COL.muted, cls: 'hrl-gauge-band' }));
      }
    }
    parts.push(textEl(xOf(25), H - 28, 'Well below average', { size: 11, fill: COL.muted }));
    parts.push(textEl(xOf(75), H - 28, 'Well above average', { size: 11, fill: COL.muted }));

    v = Math.max(20, Math.min(80, value));
    cx = xOf(v);
    parts.push('<g class="hrl-gauge-marker">');
    parts.push('<polygon points="' + cx + ',' + (y - 22) + ' ' + (cx - 8) + ',' + (y - 38) +
      ' ' + (cx + 8) + ',' + (y - 38) + '" fill="' + COL.ball + '" stroke="' + COL.ink +
      '" stroke-width="1"/>');
    parts.push('<circle cx="' + cx + '" cy="' + y + '" r="7" fill="' + COL.ball +
      '" stroke="' + COL.ink + '" stroke-width="1.2"/>');
    parts.push(textEl(cx, y - 48, String(Math.round(v)), { size: 13, weight: 700 }));
    parts.push('</g>');

    if (typeof compare === 'number' && !isNaN(compare)) {
      t = xOf(Math.max(20, Math.min(80, compare)));
      parts.push('<g class="hrl-gauge-compare">');
      parts.push('<circle cx="' + t + '" cy="' + y + '" r="9" fill="none" stroke="' +
        COL.unitIf + '" stroke-width="2.4"/>');
      parts.push(textEl(t, y + 48, String(Math.round(compare)), { size: 11, fill: COL.unitIf, weight: 700 }));
      parts.push('</g>');
    }

    return wrapSvg('scaleGauge', opts, W, H,
      opts.title || '20\u201380 scouting scale',
      opts.desc || 'The 20 to 80 scouting scale as a horizontal dial, with 50 marked as MLB average and a marker for the graded tool.',
      parts.join(''));
  }

  /* ------------------------------------------------------------------ */
  /* radar()                                                             */
  /* ------------------------------------------------------------------ */

  function radar(opts) {
    var W = 520, H = 520;
    var topics, rings, showValues, n, cx, cy, maxR, parts, i, j, a, r, v, x, y;
    var poly, lab, lines, lr;
    opts = optsOf(opts);
    topics = asArr(opts.topics);
    rings = opts.rings;
    if (rings === undefined || rings === null) rings = 4;
    if (rings < 1) rings = 1;
    showValues = !!opts.showValues;
    n = topics.length;
    cx = W / 2;
    cy = H / 2 + 6;
    maxR = 150;
    parts = [];
    parts.push('<rect x="8" y="8" width="' + (W - 16) + '" height="' + (H - 16) +
      '" rx="10" fill="' + COL.cream + '"/>');
    for (i = rings; i >= 1; i--) {
      r = maxR * (i / rings);
      parts.push('<circle class="hrl-radar-ring" cx="' + cx + '" cy="' + cy + '" r="' + r +
        '" fill="' + (i % 2 ? COL.white : COL.grass) + '" stroke="' + COL.border +
        '" stroke-width="1"/>');
    }
    if (!n) {
      parts.push(textEl(cx, cy, 'No topics yet', { size: 13, fill: COL.muted }));
    } else {
      poly = '';
      for (i = 0; i < n; i++) {
        a = -Math.PI / 2 + i * (Math.PI * 2 / n);
        parts.push('<line class="hrl-radar-axis" x1="' + cx + '" y1="' + cy + '" x2="' +
          nr(cx + Math.cos(a) * maxR) + '" y2="' + nr(cy + Math.sin(a) * maxR) +
          '" stroke="' + COL.border + '" stroke-width="1"/>');
        v = Number(topics[i].value);
        if (isNaN(v)) v = 0;
        if (v < 0) v = 0;
        if (v > 1) v = 1;
        x = cx + Math.cos(a) * maxR * v;
        y = cy + Math.sin(a) * maxR * v;
        poly += (i === 0 ? '' : ' ') + nr(x) + ',' + nr(y);
      }
      if (n >= 3) {
        parts.push('<polygon class="hrl-radar-poly" points="' + poly + '" fill="' +
          COL.unitIf + '" fill-opacity="0.28" stroke="' + COL.unitIf + '" stroke-width="2"/>');
      } else if (n === 2) {
        parts.push('<line class="hrl-radar-poly" x1="' + poly.split(' ')[0].split(',')[0] +
          '" y1="' + poly.split(' ')[0].split(',')[1] + '" x2="' + poly.split(' ')[1].split(',')[0] +
          '" y2="' + poly.split(' ')[1].split(',')[1] + '" stroke="' + COL.unitIf + '" stroke-width="2"/>');
      }
      for (i = 0; i < n; i++) {
        a = -Math.PI / 2 + i * (Math.PI * 2 / n);
        v = Number(topics[i].value);
        if (isNaN(v)) v = 0;
        if (v < 0) v = 0;
        if (v > 1) v = 1;
        x = cx + Math.cos(a) * maxR * v;
        y = cy + Math.sin(a) * maxR * v;
        parts.push('<circle class="hrl-radar-dot" cx="' + nr(x) + '" cy="' + nr(y) +
          '" r="4" fill="' + COL.unitIf + '" stroke="' + COL.ink + '" stroke-width="1"/>');
        lr = maxR + 28;
        lab = String(topics[i].label || '');
        if (lab.length > 16) {
          lines = wrapWords(lab, 12);
        } else {
          lines = [lab];
        }
        parts.push(textLines(
          cx + Math.cos(a) * lr,
          cy + Math.sin(a) * lr - (lines.length - 1) * 6,
          lines,
          { size: 11, cls: 'hrl-radar-label', weight: 700 },
          13
        ));
        if (showValues) {
          parts.push(textEl(x, y - 10, Math.round(v * 100) + '%', { size: 11, fill: COL.muted, cls: 'hrl-radar-value' }));
        }
      }
    }
    return wrapSvg('radar', opts, W, H,
      opts.title || 'Topic breakdown',
      opts.desc || 'A radar chart of Baseball IQ topics, with each spoke a topic scored from 0 to 1.',
      parts.join(''));
  }

  /* ------------------------------------------------------------------ */
  /* bar()                                                               */
  /* ------------------------------------------------------------------ */

  function bar(opts) {
    var W = 640, H = 360;
    var series, max, unit, i, y, h, val, len, fill, labelW, trackX, trackW, parts;
    var note;
    opts = optsOf(opts);
    series = asArr(opts.series).slice(0);
    if (opts.sort) {
      series.sort(function (a, b) {
        return (Number(b.value) || 0) - (Number(a.value) || 0);
      });
    }
    max = opts.max;
    if (typeof max !== 'number' || !(max > 0)) {
      max = 0;
      for (i = 0; i < series.length; i++) {
        val = Number(series[i].value) || 0;
        if (val > max) max = val;
      }
      if (max <= 0) max = 1;
    }
    unit = opts.unit ? String(opts.unit) : '';
    H = Math.max(360, 80 + series.length * 44);
    labelW = 150;
    trackX = 24 + labelW;
    trackW = W - trackX - 90;
    parts = [];
    parts.push('<rect x="8" y="8" width="' + (W - 16) + '" height="' + (H - 16) +
      '" rx="10" fill="' + COL.cream + '"/>');
    if (!series.length) {
      parts.push(textEl(W / 2, H / 2, 'No data', { size: 13, fill: COL.muted }));
    }
    for (i = 0; i < series.length; i++) {
      y = 28 + i * 44;
      h = 22;
      val = Number(series[i].value) || 0;
      len = Math.max(2, (val / max) * trackW);
      fill = series[i].color ? esc(String(series[i].color)) : [COL.unitIf, COL.unitOf, COL.battery, COL.ball, COL.backup, COL.base][i % 6];
      parts.push('<g class="hrl-bar-row">');
      parts.push(textEl(labelW + 16, y + 16, series[i].label || '', {
        size: 12, anchor: 'end', cls: 'hrl-bar-label', weight: 700
      }));
      parts.push('<rect class="hrl-bar-track" x="' + trackX + '" y="' + y + '" width="' +
        trackW + '" height="' + h + '" rx="4" fill="' + COL.white + '" stroke="' +
        COL.border + '"/>');
      parts.push('<rect class="hrl-bar-fill" x="' + trackX + '" y="' + y + '" width="' +
        nr(len) + '" height="' + h + '" rx="4" fill="' + fill + '"/>');
      parts.push(textEl(trackX + trackW + 8, y + 16, (Math.round(val * 10) / 10) + unit, {
        size: 12, anchor: 'start', cls: 'hrl-bar-value', weight: 700
      }));
      note = series[i].note;
      if (note) {
        parts.push(textEl(trackX + 6, y + 38, note, {
          size: 11, anchor: 'start', fill: COL.muted, cls: 'hrl-bar-note'
        }));
      }
      parts.push('</g>');
    }
    return wrapSvg('bar', opts, W, Math.max(360, H),
      opts.title || 'Bar chart',
      opts.desc || 'A horizontal bar chart of labelled values.',
      parts.join(''));
  }

  /* ------------------------------------------------------------------ */
  /* timeline()                                                          */
  /* ------------------------------------------------------------------ */

  function timeline(opts) {
    var W = 800, H = 280;
    var items, i, n, x0, x1, y, x, hi, hiIdx, parts, lab, sub, marker;
    opts = optsOf(opts);
    items = asArr(opts.items);
    n = items.length || 1;
    x0 = 50;
    x1 = W - 50;
    y = 130;
    hi = opts.highlight;
    hiIdx = -1;
    if (typeof hi === 'number') hiIdx = hi;
    else if (typeof hi === 'string') {
      for (i = 0; i < items.length; i++) {
        if (items[i].label === hi) hiIdx = i;
      }
    }
    parts = [];
    parts.push('<rect x="8" y="8" width="' + (W - 16) + '" height="' + (H - 16) +
      '" rx="10" fill="' + COL.cream + '"/>');
    parts.push('<line class="hrl-tl-line" x1="' + x0 + '" y1="' + y + '" x2="' + x1 +
      '" y2="' + y + '" stroke="' + COL.ink + '" stroke-width="3" stroke-linecap="round"/>');
    if (!items.length) {
      parts.push(textEl(W / 2, y + 40, 'No stages', { size: 13, fill: COL.muted }));
    }
    for (i = 0; i < items.length; i++) {
      x = n === 1 ? (x0 + x1) / 2 : x0 + (i / (n - 1)) * (x1 - x0);
      lab = items[i].label || '';
      sub = items[i].sub || '';
      marker = items[i].marker || String(i + 1);
      parts.push('<g class="hrl-tl-item' + (i === hiIdx ? ' hrl-tl-highlight' : '') + '">');
      parts.push('<circle class="hrl-tl-marker" cx="' + nr(x) + '" cy="' + y + '" r="' +
        (i === hiIdx ? 16 : 12) + '" fill="' + (i === hiIdx ? COL.base : COL.ink) +
        '" stroke="' + COL.ink + '" stroke-width="1.4"/>');
      parts.push(textEl(x, y + 4, marker, {
        size: 11, fill: i === hiIdx ? COL.ink : COL.white, weight: 700
      }));
      parts.push(textLines(x, y + 36, wrapWords(lab, 14), { size: 12, weight: 700, cls: 'hrl-tl-label' }, 14));
      if (sub) {
        parts.push(textLines(x, y - 48, wrapWords(sub, 16), {
          size: 11, fill: COL.muted, cls: 'hrl-tl-sub'
        }, 13));
      }
      parts.push('</g>');
    }
    return wrapSvg('timeline', opts, W, H,
      opts.title || 'Timeline',
      opts.desc || 'A horizontal progression timeline of age bands or long-term athlete development stages.',
      parts.join(''));
  }

  /* ------------------------------------------------------------------ */
  /* Export                                                              */
  /* ------------------------------------------------------------------ */

  var api = {
    POSITIONS: POSITIONS,
    FIELD_PARTS: FIELD_PARTS,
    ZONE_CELLS: ZONE_CELLS,
    SWING_FRAMES: SWING_FRAMES,
    THROW_FRAMES: THROW_FRAMES,
    COUNT_CELLS: COUNT_CELLS,
    BUILDERS: BUILDERS,
    hotspotLabel: hotspotLabel,
    positionName: positionName,
    positionNumber: positionNumber,
    field: field,
    strikeZone: strikeZone,
    basePaths: basePaths,
    positionGrid: positionGrid,
    swingSequence: swingSequence,
    throwSequence: throwSequence,
    countMatrix: countMatrix,
    sprayChart: sprayChart,
    scaleGauge: scaleGauge,
    radar: radar,
    bar: bar,
    timeline: timeline
  };

  root.HRL_SVG = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = root.HRL_SVG;
  }
}).call(typeof window !== 'undefined' ? window : this);
