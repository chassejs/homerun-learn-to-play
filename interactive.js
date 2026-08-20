/* ===================================================================
   Homerun Learn to Play — interactive.js
   Widget registry and the first eight interactive exercises.
   ES5-safe (var, function, string concatenation). Browser-only.
   =================================================================== */

window.HRL_INTERACTIVE = (function () {
  'use strict';

  var widgets = {};
  var INFIELD_IDS = ['p', 'c', '1b', '2b', '3b', 'ss'];
  var OUTFIELD_IDS = ['lf', 'cf', 'rf'];
  var ALL_POSITIONS = ['p', 'c', '1b', '2b', '3b', 'ss', 'lf', 'cf', 'rf'];

  /* ------------------------------------------------------------------ */
  /* Helpers                                                             */
  /* ------------------------------------------------------------------ */

  function hasOwn(obj, key) {
    return !!(obj && Object.prototype.hasOwnProperty.call(obj, key));
  }

  function isArray(x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  }

  function hasDoc() {
    return typeof document !== 'undefined' && !!document && typeof document.createElement === 'function';
  }

  function safeText(v) {
    var s;
    if (v == null) return '';
    if (typeof v === 'object') return '';
    s = String(v);
    if (s === 'undefined' || s === 'null' || s === '[object Object]') return '';
    return s;
  }

  function esc(v) {
    return safeText(v)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function trimStr(s) {
    return safeText(s).replace(/^\s+|\s+$/g, '');
  }

  function norm(s) {
    return trimStr(s).toLowerCase();
  }

  function asList(v) {
    if (v == null || v === '') return [];
    if (isArray(v)) return v;
    return [v];
  }

  function indexOf(arr, value) {
    var i;
    if (!arr) return -1;
    for (i = 0; i < arr.length; i++) {
      if (arr[i] === value) return i;
    }
    return -1;
  }

  function copyObj(src) {
    var out = {}, k;
    if (!src || typeof src !== 'object') return out;
    for (k in src) {
      if (hasOwn(src, k)) out[k] = src[k];
    }
    return out;
  }

  function shuffle(arr) {
    var a = [], i, j, t;
    if (!arr || !arr.length) return [];
    for (i = 0; i < arr.length; i++) a[i] = arr[i];
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function classStr(node) {
    if (!node) return '';
    if (node.className && node.className.baseVal !== undefined) return node.className.baseVal;
    return node.className || '';
  }

  function setClass(node, value) {
    if (!node) return;
    if (node.className && node.className.baseVal !== undefined) node.className.baseVal = value;
    else node.className = value;
  }

  function hasClass(node, name) {
    return (' ' + classStr(node) + ' ').indexOf(' ' + name + ' ') !== -1;
  }

  function addClass(node, name) {
    var cur;
    if (!node || !name || hasClass(node, name)) return;
    cur = trimStr(classStr(node));
    setClass(node, cur ? cur + ' ' + name : name);
  }

  function removeClass(node, name) {
    var parts, i, out;
    if (!node || !name) return;
    parts = trimStr(classStr(node)).split(/\s+/);
    out = [];
    for (i = 0; i < parts.length; i++) {
      if (parts[i] && parts[i] !== name) out.push(parts[i]);
    }
    setClass(node, out.join(' '));
  }

  function el(tag, attrs, children) {
    var node, k, val, i;
    if (!hasDoc()) return null;
    node = document.createElement(tag);
    if (attrs) {
      for (k in attrs) {
        if (!hasOwn(attrs, k)) continue;
        val = attrs[k];
        if (val == null) continue;
        if (k === 'class') node.className = val;
        else if (k === 'text') node.innerHTML = esc(val);
        else if (k === 'html') node.innerHTML = val;
        else if (k === 'for') node.setAttribute('for', val);
        else if (
          k.indexOf('data-') === 0 ||
          k.indexOf('aria-') === 0 ||
          k === 'role' ||
          k === 'id' ||
          k === 'type' ||
          k === 'name' ||
          k === 'title' ||
          k === 'tabindex' ||
          k === 'draggable' ||
          k === 'disabled'
        ) {
          node.setAttribute(k, val);
        } else if (k === 'disabledFlag') {
          node.disabled = !!val;
        } else if (k in node) {
          node[k] = val;
        } else {
          node.setAttribute(k, val);
        }
      }
    }
    if (children) {
      for (i = 0; i < children.length; i++) {
        if (children[i]) node.appendChild(children[i]);
      }
    }
    return node;
  }

  function emptyNode(title, blurb) {
    var wrap = el('div', { class: 'empty-state' });
    if (title) wrap.appendChild(el('p', {}, [el('strong', { text: title })]));
    if (blurb) wrap.appendChild(el('p', { text: blurb }));
    return wrap;
  }

  function setEmpty(container, title, blurb) {
    if (!container) return;
    container.innerHTML = '';
    container.appendChild(emptyNode(
      title || 'This exercise is unavailable.',
      blurb || 'The activity data is missing or could not be read.'
    ));
  }

  function casePrompt(c) {
    if (!c || typeof c !== 'object') return '';
    return trimStr(c.question || c.prompt || c.text || c.description || '');
  }

  function resolveAnswerIndex(answer, choices) {
    var i, n, s;
    if (!isArray(choices) || !choices.length) return -1;
    if (typeof answer === 'number' && answer === answer) {
      n = answer;
      if (n >= 0 && n < choices.length) return n;
    }
    s = safeText(answer);
    for (i = 0; i < choices.length; i++) {
      if (safeText(choices[i]) === s) return i;
    }
    for (i = 0; i < choices.length; i++) {
      if (norm(choices[i]) === norm(s)) return i;
    }
    if (s && /^[0-9]+$/.test(s)) {
      n = parseInt(s, 10);
      if (n >= 0 && n < choices.length) return n;
    }
    return -1;
  }

  function choiceIsCorrect(answer, choices, picked) {
    var idx, pickedIdx;
    if (picked == null || picked === '') return false;
    if (!isArray(choices) || !choices.length) {
      return norm(answer) === norm(picked);
    }
    idx = resolveAnswerIndex(answer, choices);
    if (typeof picked === 'number' && picked === picked) pickedIdx = picked;
    else pickedIdx = resolveAnswerIndex(picked, choices);
    if (idx >= 0 && pickedIdx >= 0) return idx === pickedIdx;
    return norm(answer) === norm(picked);
  }

  function svgApi() {
    return (typeof window !== 'undefined' && window.HRL_SVG) ? window.HRL_SVG : null;
  }

  function hotspotName(id) {
    var SVG = svgApi();
    if (SVG && typeof SVG.hotspotLabel === 'function') return SVG.hotspotLabel(id) || safeText(id);
    return safeText(id);
  }

  function positionName(id) {
    var SVG = svgApi();
    if (SVG && typeof SVG.positionName === 'function') return SVG.positionName(id) || safeText(id);
    return safeText(id);
  }

  function positionNumber(id) {
    var SVG = svgApi();
    var n;
    if (SVG && typeof SVG.positionNumber === 'function') {
      n = SVG.positionNumber(id);
      if (typeof n === 'number') return n;
    }
    return null;
  }

  function renderSvg(host, name, opts) {
    var SVG = svgApi();
    var html, wrap;
    if (!host) return null;
    host.innerHTML = '';
    if (!SVG || typeof SVG[name] !== 'function') {
      host.appendChild(emptyNode('Diagram unavailable.', 'This picture could not be drawn.'));
      return null;
    }
    try {
      html = SVG[name](opts || {});
    } catch (e) {
      host.appendChild(emptyNode('Diagram unavailable.', 'This picture could not be drawn.'));
      return null;
    }
    if (!html || typeof html !== 'string') {
      host.appendChild(emptyNode('Diagram unavailable.', 'This picture could not be drawn.'));
      return null;
    }
    wrap = el('div');
    wrap.innerHTML = html;
    host.appendChild(wrap);
    return wrap.querySelector('svg');
  }

  function isActivateKey(e) {
    var k = e.key || e.keyCode;
    return k === 'Enter' || k === ' ' || k === 'Spacebar' || k === 13 || k === 32;
  }

  function bindActivate(node, fn) {
    if (!node || typeof fn !== 'function') return;
    node.addEventListener('click', function (e) {
      e.preventDefault();
      fn(e);
    });
    node.addEventListener('keydown', function (e) {
      if (!isActivateKey(e)) return;
      e.preventDefault();
      fn(e);
    });
  }

  function bindHotspots(root, fn) {
    var list, i, g;
    if (!root) return;
    list = root.querySelectorAll('[data-hotspot]');
    for (i = 0; i < list.length; i++) {
      g = list[i];
      (function (node) {
        bindActivate(node, function (e) {
          fn(node.getAttribute('data-hotspot'), node, e);
        });
      }(g));
    }
  }

  function nearestHotspot(root, clientX, clientY, ids) {
    var best = null, bestD = 1e15, i, g, r, cx, cy, dx, dy, d, id;
    if (!root) return null;
    for (i = 0; i < ids.length; i++) {
      id = ids[i];
      g = root.querySelector('[data-hotspot="' + id + '"]');
      if (!g || typeof g.getBoundingClientRect !== 'function') continue;
      r = g.getBoundingClientRect();
      if (!r.width && !r.height) continue;
      cx = r.left + r.width / 2;
      cy = r.top + r.height / 2;
      dx = cx - clientX;
      dy = cy - clientY;
      d = dx * dx + dy * dy;
      if (d < bestD) {
        bestD = d;
        best = id;
      }
    }
    return best;
  }

  function reducedMotionNow() {
    var P, body;
    if (typeof window === 'undefined') return false;
    try {
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return true;
      }
    } catch (e1) {}
    if (hasDoc()) {
      body = document.body;
      if (body && hasClass(body, 'reduced-motion')) return true;
    }
    P = window.HRL_PROGRESS;
    if (P && typeof P.getSetting === 'function') {
      try {
        if (P.getSetting('reducedMotion')) return true;
      } catch (e2) {}
    }
    return false;
  }

  function fireComplete(onComplete, correct, total) {
    if (typeof onComplete !== 'function') return;
    onComplete({
      completed: true,
      correct: typeof correct === 'number' ? correct : 0,
      total: typeof total === 'number' ? total : 0
    });
  }

  function findOrMake(container, className, tag) {
    var node;
    if (!container) return null;
    node = container.querySelector('.' + className);
    if (node) return node;
    node = el(tag || 'div', { class: className });
    container.appendChild(node);
    return node;
  }

  function ctxStatus(container, message, kind) {
    var node;
    if (!container) return null;
    node = findOrMake(container, 'widget-status', 'div');
    node.setAttribute('aria-live', 'polite');
    node.setAttribute('role', 'status');
    if (kind) node.setAttribute('data-kind', safeText(kind));
    else node.removeAttribute('data-kind');
    node.innerHTML = '';
    node.appendChild(document.createTextNode(safeText(message)));
    return node;
  }

  function ctxActions(container, buttons) {
    var bar, i, b, btn, cls;
    if (!container) return null;
    bar = findOrMake(container, 'widget-actions', 'div');
    bar.innerHTML = '';
    if (!buttons) return bar;
    for (i = 0; i < buttons.length; i++) {
      b = buttons[i];
      if (!b) continue;
      cls = 'btn btn-sm';
      if (b.kind === 'primary' || b.primary) cls += ' btn-primary';
      else if (b.kind === 'accent') cls += ' btn-accent';
      else cls += ' btn-ghost';
      btn = el('button', { type: 'button', class: cls, text: b.label || 'OK' });
      if (b.disabled) btn.disabled = true;
      if (typeof b.onClick === 'function') btn.addEventListener('click', b.onClick);
      bar.appendChild(btn);
    }
    return bar;
  }

  function makeCtx() {
    return {
      el: el,
      esc: esc,
      shuffle: shuffle,
      status: ctxStatus,
      actions: ctxActions,
      reducedMotion: reducedMotionNow
    };
  }

  function flex(node) {
    if (!node) return node;
    node.style.display = 'flex';
    node.style.flexWrap = 'wrap';
    node.style.gap = '0.5rem';
    node.style.alignItems = 'center';
    return node;
  }

  function fullWidth(node) {
    if (!node) return node;
    node.style.width = '100%';
    node.style.minWidth = '0';
    node.style.flex = '1 1 100%';
    return node;
  }

  function validCases(opts, key) {
    var list, i, out;
    if (!opts || typeof opts !== 'object') return [];
    list = asList(opts[key || 'cases']);
    out = [];
    for (i = 0; i < list.length; i++) {
      if (list[i] && typeof list[i] === 'object') out.push(list[i]);
    }
    return out;
  }

  function progressRow(pct, label) {
    var n, bar, fill;
    n = Number(pct) || 0;
    if (n < 0) n = 0;
    if (n > 100) n = 100;
    n = Math.round(n);
    bar = el('div', { class: 'progress-bar', role: 'progressbar' });
    bar.setAttribute('aria-valuemin', '0');
    bar.setAttribute('aria-valuemax', '100');
    bar.setAttribute('aria-valuenow', String(n));
    if (label) bar.setAttribute('aria-label', label);
    fill = el('span', { class: 'progress-bar-fill' });
    fill.style.width = n + '%';
    bar.appendChild(fill);
    return bar;
  }

  function bindTokenDrag(btn, getId, onDragId) {
    if (!btn) return;
    btn.setAttribute('draggable', 'true');
    btn.addEventListener('dragstart', function (e) {
      var id = getId();
      if (onDragId) onDragId(id);
      addClass(btn, 'selected');
      if (e.dataTransfer) {
        try {
          e.dataTransfer.setData('text/plain', id);
          e.dataTransfer.setData('text', id);
          e.dataTransfer.effectAllowed = 'move';
        } catch (err) {}
      }
    });
    btn.addEventListener('dragend', function () {
      removeClass(btn, 'selected');
    });
  }

  function bindDropTarget(node, onDrop) {
    if (!node) return;
    node.addEventListener('dragover', function (e) {
      e.preventDefault();
      addClass(node, 'over');
      if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
    });
    node.addEventListener('dragleave', function () {
      removeClass(node, 'over');
    });
    node.addEventListener('drop', function (e) {
      var id;
      e.preventDefault();
      removeClass(node, 'over');
      id = '';
      if (e.dataTransfer) {
        try {
          id = e.dataTransfer.getData('text/plain') || e.dataTransfer.getData('text') || '';
        } catch (err) {
          id = '';
        }
      }
      onDrop(id, e);
    });
  }

  function layoutOverlays(wrap, overlayMap, ids) {
    var svg, wrapR, i, id, g, node, r, w, h, left, top;
    if (!wrap || !overlayMap) return;
    svg = wrap.querySelector('svg');
    if (!svg || typeof wrap.getBoundingClientRect !== 'function') return;
    wrapR = wrap.getBoundingClientRect();
    if (!wrapR.width) return;
    for (i = 0; i < ids.length; i++) {
      id = ids[i];
      g = svg.querySelector('[data-hotspot="' + id + '"]');
      node = overlayMap[id];
      if (!g || !node || typeof g.getBoundingClientRect !== 'function') continue;
      r = g.getBoundingClientRect();
      if (!r.width && !r.height) continue;
      w = r.width;
      h = r.height;
      if (w > 160) w = 140;
      if (h > 64) h = 48;
      if (w < 44) w = 44;
      if (h < 44) h = 44;
      left = r.left - wrapR.left + (r.width - w) / 2;
      top = r.top - wrapR.top + (r.height - h) / 2;
      if (r.width > 180 || r.height > 120) {
        left = left + (i % 3) * 18 - 18;
        top = top + (i % 4) * 22 - 22;
      }
      if (left < 0) left = 0;
      if (top < 0) top = 0;
      node.style.position = 'absolute';
      node.style.left = left + 'px';
      node.style.top = top + 'px';
      node.style.width = w + 'px';
      node.style.height = h + 'px';
      node.style.zIndex = '2';
    }
  }

  /* ------------------------------------------------------------------ */
  /* Registry                                                            */
  /* ------------------------------------------------------------------ */

  function register(name, def) {
    if (!name) return;
    if (typeof def === 'function') {
      widgets[name] = { mount: def };
      return;
    }
    if (def && typeof def.mount === 'function') {
      widgets[name] = def;
    }
  }

  function has(name) {
    return !!(name && widgets[name] && typeof widgets[name].mount === 'function');
  }

  function names() {
    var out = [], k, i, j, t;
    for (k in widgets) {
      if (hasOwn(widgets, k) && widgets[k] && typeof widgets[k].mount === 'function') {
        out.push(k);
      }
    }
    for (i = 0; i < out.length; i++) {
      for (j = i + 1; j < out.length; j++) {
        if (out[j] < out[i]) {
          t = out[i];
          out[i] = out[j];
          out[j] = t;
        }
      }
    }
    return out;
  }

  function mount(name, container, opts, onComplete) {
    var ctx;
    if (!hasDoc() || !container) return false;
    container.innerHTML = '';
    if (!has(name)) {
      setEmpty(
        container,
        'This activity is not available yet.',
        name ? 'No exercise named “' + safeText(name) + '” is loaded.' : 'This exercise is unavailable.'
      );
      return false;
    }
    ctx = makeCtx();
    try {
      widgets[name].mount(container, opts || {}, onComplete, ctx);
      return true;
    } catch (e) {
      container.innerHTML = '';
      setEmpty(
        container,
        'This exercise is unavailable.',
        'The activity could not be started.'
      );
      return false;
    }
  }

  /* ------------------------------------------------------------------ */
  /* Shared: place tokens onto a diagram                                 */
  /* ------------------------------------------------------------------ */

  function mountPlaceOnDiagram(container, opts, onComplete, ctx, spec) {
    var items = spec.items;
    var ids = [];
    var i;
    var root, diagramWrap, tray, hint, layer;
    var state;
    var svgEl;
    var overlay = {};

    for (i = 0; i < items.length; i++) ids.push(items[i].id);

    state = {
      map: {},
      selected: null,
      fails: 0,
      done: false,
      locked: false,
      marks: {}
    };

    root = el('div');
    fullWidth(root);
    container.appendChild(root);

    function itemById(id) {
      var j;
      for (j = 0; j < items.length; j++) if (items[j].id === id) return items[j];
      return null;
    }

    function targetOfToken(tokenId) {
      var k;
      for (k in state.map) {
        if (hasOwn(state.map, k) && state.map[k] === tokenId) return k;
      }
      return null;
    }

    function clearMarks() {
      var k, zone;
      state.marks = {};
      for (k in overlay) {
        if (!hasOwn(overlay, k)) continue;
        zone = overlay[k];
        removeClass(zone, 'correct');
        removeClass(zone, 'wrong');
        removeClass(zone, 'over');
      }
    }

    function place(tokenId, targetId) {
      var prev, occupant;
      if (state.locked || !tokenId || !targetId) return;
      if (indexOf(ids, targetId) === -1) return;
      if (!itemById(tokenId)) return;
      clearMarks();
      prev = targetOfToken(tokenId);
      if (prev) delete state.map[prev];
      occupant = state.map[targetId];
      if (occupant && occupant !== tokenId) delete state.map[targetId];
      state.map[targetId] = tokenId;
      state.selected = null;
      paint();
    }

    function pickToken(tokenId) {
      if (state.locked) return;
      if (state.selected === tokenId) {
        state.selected = null;
      } else {
        state.selected = tokenId;
      }
      paint();
    }

    function activateTarget(targetId) {
      var occupant;
      if (state.locked) return;
      if (state.selected) {
        place(state.selected, targetId);
        return;
      }
      occupant = state.map[targetId];
      if (occupant) {
        state.selected = occupant;
        paint();
      }
    }

    function paintTray() {
      var j, item, btn, at, label;
      tray.innerHTML = '';
      for (j = 0; j < items.length; j++) {
        item = items[j];
        at = targetOfToken(item.id);
        label = spec.tokenLabel ? spec.tokenLabel(item) : (item.label || item.name || item.id);
        btn = el('button', {
          type: 'button',
          class: 'token' + (state.selected === item.id ? ' selected' : '') + (at ? ' placed' : ''),
          text: label,
          title: item.hint ? safeText(item.hint) : label
        });
        btn.setAttribute('aria-pressed', state.selected === item.id ? 'true' : 'false');
        btn.setAttribute('aria-label', label + (at ? ' (placed)' : ''));
        (function (id) {
          bindActivate(btn, function () {
            if (state.locked) return;
            if (state.selected && state.selected !== id) {
              /* keep pick-up as select */
            }
            pickToken(id);
          });
          bindTokenDrag(btn, function () { return id; }, function (dragId) {
            state.selected = dragId;
          });
        }(item.id));
        tray.appendChild(btn);
      }
    }

    function paintZones() {
      var j, id, zone, tokenId, item, label;
      for (j = 0; j < ids.length; j++) {
        id = ids[j];
        zone = overlay[id];
        if (!zone) continue;
        tokenId = state.map[id];
        item = tokenId ? itemById(tokenId) : null;
        label = item ? (spec.tokenLabel ? spec.tokenLabel(item) : (item.label || item.name || item.id)) : '';
        zone.innerHTML = '';
        if (label) zone.appendChild(document.createTextNode(label));
        else zone.appendChild(document.createTextNode(''));
        zone.setAttribute(
          'aria-label',
          (label ? label + ' on ' : 'Place on ') + hotspotName(id)
        );
        removeClass(zone, 'correct');
        removeClass(zone, 'wrong');
        if (state.marks[id] === 'correct') addClass(zone, 'correct');
        if (state.marks[id] === 'wrong') addClass(zone, 'wrong');
      }
    }

    function tokenText(item) {
      if (!item) return '';
      if (spec.tokenLabel) return spec.tokenLabel(item);
      return item.label || item.name || item.id;
    }

    function paintStatus() {
      var placed = 0, k, msg, sel;
      for (k in state.map) if (hasOwn(state.map, k) && state.map[k]) placed += 1;
      if (state.done) return;
      msg = spec.idleStatus || 'Select a label, then place it on the matching spot.';
      if (state.selected) {
        sel = itemById(state.selected);
        msg = 'Selected: ' + (tokenText(sel) || state.selected) +
          '. Activate a spot to place it.';
      } else if (placed) {
        msg = placed + ' of ' + items.length + ' placed. Check when you are ready.';
      }
      ctx.status(container, msg, 'info');
    }

    function paint() {
      paintTray();
      paintZones();
      layoutOverlays(diagramWrap, overlay, ids);
      paintStatus();
    }

    function scorePlacements() {
      var j, id, got, correct, wrong;
      correct = 0;
      wrong = 0;
      for (j = 0; j < ids.length; j++) {
        id = ids[j];
        got = state.map[id];
        if (got && got === id) {
          state.marks[id] = 'correct';
          correct += 1;
        } else if (got) {
          state.marks[id] = 'wrong';
          wrong += 1;
        } else {
          state.marks[id] = '';
        }
      }
      return { correct: correct, wrong: wrong, total: ids.length };
    }

    function returnWrongs() {
      var j, id;
      for (j = 0; j < ids.length; j++) {
        id = ids[j];
        if (state.marks[id] === 'wrong') delete state.map[id];
      }
    }

    function revealAll() {
      var j, id;
      state.locked = true;
      state.map = {};
      for (j = 0; j < ids.length; j++) {
        id = ids[j];
        state.map[id] = id;
        state.marks[id] = 'correct';
      }
    }

    function finish(correctCount) {
      if (state.done) return;
      state.done = true;
      state.locked = true;
      fireComplete(onComplete, correctCount, items.length);
    }

    function doCheck() {
      var result, msg, explain;
      var j, firstWrong;
      if (state.done) return;
      clearMarks();
      result = scorePlacements();
      if (result.correct === result.total && result.total > 0) {
        paint();
        ctx.status(container, 'All ' + result.total + ' placed correctly.', 'ok');
        finish(result.correct);
        return;
      }
      state.fails += 1;
      firstWrong = null;
      for (j = 0; j < ids.length; j++) {
        if (state.marks[ids[j]] === 'wrong' || (!state.map[ids[j]] && !firstWrong)) {
          if (state.marks[ids[j]] === 'wrong' && !firstWrong) firstWrong = ids[j];
        }
      }
      explain = '';
      if (firstWrong) {
        explain = spec.explainWrong ? spec.explainWrong(itemById(state.map[firstWrong]), firstWrong) : '';
        if (!explain) {
          explain = hotspotName(firstWrong) + ' is not the right match.';
        }
      }
      if (state.fails >= 2) {
        msg = 'Second miss — here is the correct layout. ' + explain;
        revealAll();
        paint();
        ctx.status(container, trimStr(msg), 'ok');
        finish(result.correct);
        return;
      }
      paint();
      returnWrongs();
      msg = result.correct + ' correct, ' + result.wrong + ' to retry.';
      if (explain) msg += ' ' + explain;
      ctx.status(container, msg, 'wrong');
      paintTray();
      paintZones();
    }

    function doReset() {
      state.map = {};
      state.selected = null;
      state.fails = 0;
      state.done = false;
      state.locked = false;
      state.marks = {};
      paint();
      ctx.status(container, spec.idleStatus || 'Select a label, then place it on the matching spot.', 'info');
    }

    function doShow() {
      var already = 0, k;
      if (state.done) return;
      for (k in state.map) {
        if (hasOwn(state.map, k) && state.map[k] === k) already += 1;
      }
      revealAll();
      paint();
      ctx.status(container, 'Showing the correct placement.', 'ok');
      finish(already);
    }

    hint = el('p', { class: 'hint', text: spec.hint || 'Select a label, then tap the matching spot. You can also drag.' });
    root.appendChild(hint);

    diagramWrap = el('div');
    diagramWrap.style.position = 'relative';
    diagramWrap.style.width = '100%';
    root.appendChild(diagramWrap);

    svgEl = renderSvg(diagramWrap, spec.svgName, spec.svgOpts);
    layer = el('div');
    layer.style.position = 'absolute';
    layer.style.left = '0';
    layer.style.top = '0';
    layer.style.right = '0';
    layer.style.bottom = '0';
    layer.style.pointerEvents = 'none';
    diagramWrap.appendChild(layer);

    for (i = 0; i < ids.length; i++) {
      (function (id) {
        var zone = el('button', {
          type: 'button',
          class: 'dropzone',
          title: hotspotName(id)
        });
        zone.style.pointerEvents = 'auto';
        zone.setAttribute('data-drop', id);
        overlay[id] = zone;
        layer.appendChild(zone);
        bindActivate(zone, function () {
          activateTarget(id);
        });
        bindDropTarget(zone, function (tokenId) {
          if (tokenId) place(tokenId, id);
        });
      }(ids[i]));
    }

    if (svgEl) {
      bindHotspots(diagramWrap, function (id) {
        activateTarget(id);
      });
      bindDropTarget(svgEl, function (tokenId, e) {
        var snap;
        if (!tokenId) return;
        snap = nearestHotspot(diagramWrap, e.clientX, e.clientY, ids);
        if (snap) place(tokenId, snap);
      });
    }

    tray = el('div');
    flex(tray);
    tray.style.marginTop = '0.5rem';
    root.appendChild(tray);

    ctx.status(container, spec.idleStatus || 'Select a label, then place it on the matching spot.', 'info');
    ctx.actions(container, [
      { label: 'Check', kind: 'primary', onClick: doCheck },
      { label: 'Reset', kind: 'ghost', onClick: doReset },
      { label: 'Show me', kind: 'accent', onClick: doShow }
    ]);

    if (diagramWrap._hrlLayout) {
      window.removeEventListener('resize', diagramWrap._hrlLayout);
    }
    diagramWrap._hrlLayout = function () {
      if (!diagramWrap.parentNode) {
        window.removeEventListener('resize', diagramWrap._hrlLayout);
        return;
      }
      layoutOverlays(diagramWrap, overlay, ids);
    };
    window.addEventListener('resize', diagramWrap._hrlLayout);

    paint();
    if (typeof window.requestAnimationFrame === 'function') {
      window.requestAnimationFrame(function () {
        layoutOverlays(diagramWrap, overlay, ids);
      });
    } else {
      layoutOverlays(diagramWrap, overlay, ids);
    }
  }

  /* ------------------------------------------------------------------ */
  /* 1. labelTheField                                                    */
  /* ------------------------------------------------------------------ */

  function itemsFromLabelOpts(opts) {
    var raw, i, it, out, id, label;
    raw = [];
    if (opts && isArray(opts.items) && opts.items.length) raw = opts.items;
    else if (opts && isArray(opts.parts) && opts.parts.length) raw = opts.parts;
    out = [];
    for (i = 0; i < raw.length; i++) {
      it = raw[i];
      if (!it || typeof it !== 'object') continue;
      id = trimStr(it.id);
      label = trimStr(it.label || it.name);
      if (!id || !label) continue;
      out.push({ id: id, label: label, hint: trimStr(it.hint) });
    }
    return out;
  }

  function mountLabelTheField(container, opts, onComplete, ctx) {
    var items, diagram, svgName, svgOpts, ids, i;
    opts = opts && typeof opts === 'object' ? opts : {};
    items = itemsFromLabelOpts(opts);
    if (!items.length) {
      setEmpty(container, 'This exercise is unavailable.', 'No field parts were provided to label.');
      return;
    }
    diagram = opts.diagram && typeof opts.diagram === 'object' ? opts.diagram : null;
    svgName = (diagram && diagram.svg) ? diagram.svg : 'field';
    svgOpts = diagram && diagram.opts ? copyObj(diagram.opts) : {};
    ids = [];
    for (i = 0; i < items.length; i++) ids.push(items[i].id);
    svgOpts.hotspots = ids;
    if (!svgOpts.title) svgOpts.title = 'Label the field';
    mountPlaceOnDiagram(container, opts, onComplete, ctx, {
      items: ctx.shuffle(items),
      svgName: svgName,
      svgOpts: svgOpts,
      hint: 'Tap a label, then tap the matching part of the field. Drag works too.',
      idleStatus: 'Place every field label on its matching hotspot.',
      tokenLabel: function (item) { return item.label; },
      explainWrong: function (item, targetId) {
        if (!item) return 'That spot is ' + hotspotName(targetId) + '.';
        return item.label + ' does not belong on ' + hotspotName(targetId) + '.';
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* 2. placeThePositions                                                */
  /* ------------------------------------------------------------------ */

  function itemsFromPositionOpts(opts) {
    var raw, i, it, out, id, name, number, allow, mode, posList, j;
    raw = [];
    allow = null;
    opts = opts || {};
    mode = trimStr(opts.mode);
    posList = isArray(opts.positions) ? opts.positions : [];
    if (posList.length) {
      allow = {};
      for (j = 0; j < posList.length; j++) allow[posList[j]] = true;
    } else if (mode === 'infield') {
      allow = {};
      for (j = 0; j < INFIELD_IDS.length; j++) allow[INFIELD_IDS[j]] = true;
    } else if (mode === 'outfield') {
      allow = {};
      for (j = 0; j < OUTFIELD_IDS.length; j++) allow[OUTFIELD_IDS[j]] = true;
    }
    if (isArray(opts.items) && opts.items.length) raw = opts.items;
    else if (posList.length) {
      for (j = 0; j < posList.length; j++) raw.push({ id: posList[j] });
    } else {
      for (j = 0; j < ALL_POSITIONS.length; j++) raw.push({ id: ALL_POSITIONS[j] });
    }
    out = [];
    for (i = 0; i < raw.length; i++) {
      it = raw[i];
      if (typeof it === 'string') it = { id: it };
      if (!it || typeof it !== 'object') continue;
      id = trimStr(it.id);
      if (!id) continue;
      if (allow && !allow[id]) continue;
      number = it.number;
      if (typeof number !== 'number') number = positionNumber(id);
      name = trimStr(it.name || it.label) || positionName(id);
      out.push({
        id: id,
        number: number,
        name: name,
        hint: trimStr(it.hint),
        label: (number != null ? String(number) + ' ' : '') + String(id).toUpperCase()
      });
    }
    return out;
  }

  function mountPlaceThePositions(container, opts, onComplete, ctx) {
    var items, diagram, svgName, svgOpts, ids, i;
    opts = opts && typeof opts === 'object' ? opts : {};
    items = itemsFromPositionOpts(opts);
    if (!items.length) {
      setEmpty(container, 'This exercise is unavailable.', 'No positions were provided to place.');
      return;
    }
    diagram = opts.diagram && typeof opts.diagram === 'object' ? opts.diagram : null;
    svgName = (diagram && diagram.svg) ? diagram.svg : 'field';
    svgOpts = diagram && diagram.opts ? copyObj(diagram.opts) : {};
    ids = [];
    for (i = 0; i < items.length; i++) ids.push(items[i].id);
    svgOpts.hotspots = ids;
    if (svgOpts.positions === undefined && !diagram) svgOpts.positions = false;
    if (!svgOpts.title) svgOpts.title = 'Place the positions';
    mountPlaceOnDiagram(container, opts, onComplete, ctx, {
      items: ctx.shuffle(items),
      svgName: svgName,
      svgOpts: svgOpts,
      hint: 'Each token shows the scorekeeping number and abbreviation. Drop it on that position.',
      idleStatus: 'Place every position token on its spot.',
      tokenLabel: function (item) { return item.label; },
      explainWrong: function (item, targetId) {
        if (!item) return 'That spot is ' + hotspotName(targetId) + '.';
        return item.label + ' (' + item.name + ') does not play at ' + hotspotName(targetId) + '.';
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* 3. strikeZoneTrainer                                                */
  /* ------------------------------------------------------------------ */

  function mountStrikeZoneTrainer(container, opts, onComplete, ctx) {
    var cases, mode, root, diagramHost, choiceBar, hint, progressHost;
    var state, i, callA, callB;

    opts = opts && typeof opts === 'object' ? opts : {};
    cases = validCases(opts, 'cases');
    if (!cases.length) {
      setEmpty(container, 'This exercise is unavailable.', 'No pitches were provided to call.');
      return;
    }
    mode = trimStr(opts.mode) || 'ball-strike';
    if (mode === 'swing-decision') {
      callA = { id: 'swing', label: 'Swing' };
      callB = { id: 'take', label: 'Take' };
    } else {
      callA = { id: 'ball', label: 'Ball' };
      callB = { id: 'strike', label: 'Strike' };
    }

    state = {
      index: 0,
      picked: null,
      fails: 0,
      correct: 0,
      resolved: false,
      done: false
    };

    root = el('div');
    fullWidth(root);
    container.appendChild(root);
    progressHost = el('div');
    root.appendChild(progressHost);
    hint = el('p', { class: 'hint' });
    root.appendChild(hint);
    diagramHost = el('div');
    root.appendChild(diagramHost);
    choiceBar = flex(el('div'));
    root.appendChild(choiceBar);

    function expectedCall(c) {
      var v;
      if (!c) return '';
      if (mode === 'swing-decision') {
        v = c.decision || c.answer || c.call;
      } else {
        v = c.call || c.answer;
      }
      v = norm(v);
      if (v === 'called-strike' || v === 'swinging-strike' || v === 'strike') return 'strike';
      if (v === 'swing' || v === 'go') return 'swing';
      if (v === 'take' || v === 'hold') return 'take';
      if (v === 'ball') return 'ball';
      return v;
    }

    function drawPitch(reveal) {
      var c = cases[state.index];
      var pitchCall, n;
      diagramHost.innerHTML = '';
      if (!c) return;
      n = state.index + 1;
      if (reveal) {
        pitchCall = expectedCall(c) === 'strike' ? 'called-strike' : (c.call || 'ball');
        if (mode === 'swing-decision') pitchCall = 'in-play';
      } else {
        pitchCall = 'in-play';
      }
      renderSvg(diagramHost, 'strikeZone', {
        title: 'Pitch ' + n + ' of ' + cases.length,
        grid: 3,
        pitches: [{ x: Number(c.x) || 0, y: Number(c.y) || 0, call: pitchCall, n: n }]
      });
    }

    function paintChoices() {
      var btnA, btnB;
      choiceBar.innerHTML = '';
      btnA = el('button', {
        type: 'button',
        class: 'btn btn-sm ' + (state.picked === callA.id ? 'btn-primary' : 'btn-ghost'),
        text: callA.label
      });
      btnB = el('button', {
        type: 'button',
        class: 'btn btn-sm ' + (state.picked === callB.id ? 'btn-primary' : 'btn-ghost'),
        text: callB.label
      });
      btnA.setAttribute('aria-pressed', state.picked === callA.id ? 'true' : 'false');
      btnB.setAttribute('aria-pressed', state.picked === callB.id ? 'true' : 'false');
      if (state.resolved || state.done) {
        btnA.disabled = true;
        btnB.disabled = true;
      }
      bindActivate(btnA, function () {
        if (state.resolved || state.done) return;
        state.picked = callA.id;
        paintChoices();
      });
      bindActivate(btnB, function () {
        if (state.resolved || state.done) return;
        state.picked = callB.id;
        paintChoices();
      });
      choiceBar.appendChild(btnA);
      choiceBar.appendChild(btnB);
    }

    function paintProgress() {
      var pct = Math.round((state.index / cases.length) * 100);
      progressHost.innerHTML = '';
      progressHost.appendChild(progressRow(pct, 'Pitch progress'));
    }

    function summary() {
      return 'Accuracy: ' + state.correct + ' / ' + cases.length +
        ' (' + Math.round((state.correct / cases.length) * 100) + '%).';
    }

    function goNext() {
      state.index += 1;
      state.picked = null;
      state.fails = 0;
      state.resolved = false;
      if (state.index >= cases.length) {
        state.done = true;
        hint.innerHTML = esc('Done. ' + summary());
        paintProgress();
        progressHost.innerHTML = '';
        progressHost.appendChild(progressRow(100, 'Pitch progress'));
        ctx.status(container, summary(), 'ok');
        ctx.actions(container, [
          { label: 'Check', kind: 'primary', disabled: true, onClick: function () {} },
          { label: 'Reset', kind: 'ghost', onClick: doReset }
        ]);
        fireComplete(onComplete, state.correct, cases.length);
        return;
      }
      paintAll();
    }

    function doCheck() {
      var c, expect, expl;
      if (state.done) return;
      c = cases[state.index];
      if (state.resolved) {
        goNext();
        return;
      }
      if (!state.picked) {
        ctx.status(container, 'Choose ' + callA.label + ' or ' + callB.label + ' first.', 'info');
        return;
      }
      expect = expectedCall(c);
      expl = trimStr(c.explain);
      if (state.picked === expect) {
        state.correct += 1;
        state.resolved = true;
        drawPitch(true);
        ctx.status(
          container,
          'Correct. ' + (expl ? expl + ' ' : '') + summary(),
          'ok'
        );
        ctx.actions(container, [
          { label: state.index === cases.length - 1 ? 'Finish' : 'Next', kind: 'primary', onClick: doCheck },
          { label: 'Reset', kind: 'ghost', onClick: doReset }
        ]);
        return;
      }
      state.fails += 1;
      if (state.fails >= 2) {
        state.resolved = true;
        drawPitch(true);
        ctx.status(
          container,
          'The call is ' + expect + '. ' + (expl ? expl + ' ' : '') + summary(),
          'wrong'
        );
        ctx.actions(container, [
          { label: state.index === cases.length - 1 ? 'Finish' : 'Next', kind: 'primary', onClick: doCheck },
          { label: 'Reset', kind: 'ghost', onClick: doReset }
        ]);
        return;
      }
      ctx.status(
        container,
        'Not that call. ' + (expl ? expl : 'Look at the zone edges and try once more.'),
        'wrong'
      );
    }

    function doReset() {
      state.index = 0;
      state.picked = null;
      state.fails = 0;
      state.correct = 0;
      state.resolved = false;
      state.done = false;
      paintAll();
    }

    function paintAll() {
      var c = cases[state.index];
      var extra = '';
      paintProgress();
      if (mode === 'swing-decision' && c && c.count) extra = ' Count: ' + safeText(c.count) + '.';
      hint.innerHTML = esc(
        'Pitch ' + (state.index + 1) + ' of ' + cases.length + '.' + extra +
        (mode === 'swing-decision' ? ' Swing or take?' : ' Ball or strike?')
      );
      drawPitch(false);
      paintChoices();
      ctx.status(container, summary() + ' Make a call, then Check.', 'info');
      ctx.actions(container, [
        { label: 'Check', kind: 'primary', onClick: doCheck },
        { label: 'Reset', kind: 'ghost', onClick: doReset }
      ]);
    }

    paintAll();
  }

  /* ------------------------------------------------------------------ */
  /* 4. countBuilder                                                     */
  /* ------------------------------------------------------------------ */

  function pitchKind(p) {
    var s = norm(p);
    if (s === 'ball' || s === 'b' || s === 'bb') return 'ball';
    if (s === 'foul' || s === 'f') return 'foul';
    if (s === 'in-play' || s === 'in play' || s === 'inplay' || s === 'play' || s === 'ip') return 'in-play';
    if (s.indexOf('strike') !== -1 || s === 'k' || s === 's') return 'strike';
    return s;
  }

  function parseCountResult(result) {
    var s = trimStr(result).toUpperCase();
    var parts;
    if (s === 'K' || s === 'SO' || s === 'STRIKEOUT') return { balls: 0, strikes: 3, end: 'K' };
    if (s === 'BB' || s === 'WALK') return { balls: 4, strikes: 0, end: 'BB' };
    if (s === 'IP' || s === 'IN-PLAY' || s === 'IN PLAY') return { balls: 0, strikes: 0, end: 'IP' };
    s = trimStr(result);
    parts = s.split(/[-–]/);
    if (parts.length >= 2) {
      return {
        balls: parseInt(parts[0], 10) || 0,
        strikes: parseInt(parts[1], 10) || 0,
        end: ''
      };
    }
    return null;
  }

  function applyPitch(balls, strikes, kind) {
    var b = balls, s = strikes, end = '';
    if (kind === 'ball') {
      b += 1;
      if (b >= 4) end = 'BB';
    } else if (kind === 'strike') {
      s += 1;
      if (s >= 3) end = 'K';
    } else if (kind === 'foul') {
      if (s < 2) s += 1;
    } else if (kind === 'in-play') {
      end = 'IP';
    }
    return { balls: b, strikes: s, end: end };
  }

  function countLabel(balls, strikes, end) {
    if (end === 'K') return 'K (strikeout)';
    if (end === 'BB') return 'BB (walk)';
    if (end === 'IP') return 'In play';
    return String(balls) + '\u2013' + String(strikes);
  }

  function mountCountBuilder(container, opts, onComplete, ctx) {
    var steps, freeplay, root, matrixHost, btnBar, noteEl;
    var state;
    var buttons = [
      { id: 'ball', label: 'Ball' },
      { id: 'strike', label: 'Strike' },
      { id: 'foul', label: 'Foul' },
      { id: 'in-play', label: 'In play' }
    ];

    opts = opts && typeof opts === 'object' ? opts : {};
    steps = validCases(opts, 'steps');
    if (!steps.length) steps = validCases(opts, 'cases');
    freeplay = !!opts.freeplay;
    if (!steps.length && !freeplay) {
      setEmpty(container, 'This exercise is unavailable.', 'No count steps were provided.');
      return;
    }
    if (!steps.length) freeplay = true;

    state = {
      step: 0,
      balls: 0,
      strikes: 0,
      end: '',
      fails: 0,
      correct: 0,
      done: false,
      note: '',
      picked: null
    };

    root = el('div');
    fullWidth(root);
    container.appendChild(root);
    root.appendChild(el('p', {
      class: 'hint',
      text: freeplay
        ? 'Free play: Ball, Strike, Foul, or In play. A foul with two strikes is not strike three.'
        : 'Walk this at-bat. Choose the pitch that matches each step. Balls are first in the count.'
    }));
    matrixHost = el('div');
    root.appendChild(matrixHost);
    noteEl = el('p', { class: 'hint' });
    root.appendChild(noteEl);
    btnBar = flex(el('div'));
    root.appendChild(btnBar);

    function highlightKey() {
      if (state.end === 'K' || state.end === 'BB' || state.end === 'IP') return '';
      return String(state.balls) + '-' + String(state.strikes);
    }

    function drawMatrix() {
      renderSvg(matrixHost, 'countMatrix', {
        title: 'The count',
        highlight: highlightKey()
      });
    }

    function paintButtons() {
      var i, b, btn;
      btnBar.innerHTML = '';
      for (i = 0; i < buttons.length; i++) {
        b = buttons[i];
        btn = el('button', {
          type: 'button',
          class: 'btn btn-sm ' + (state.picked === b.id ? 'btn-primary' : 'btn-ghost'),
          text: b.label
        });
        btn.setAttribute('aria-pressed', state.picked === b.id ? 'true' : 'false');
        if (state.done && !freeplay) btn.disabled = true;
        if (state.end && freeplay) btn.disabled = true;
        (function (id) {
          bindActivate(btn, function () { onPitch(id); });
        }(b.id));
        btnBar.appendChild(btn);
      }
    }

    function pitchLabel(kind) {
      var i;
      for (i = 0; i < buttons.length; i++) {
        if (buttons[i].id === kind) return buttons[i].label;
      }
      return kind;
    }

    function setNote(text) {
      state.note = safeText(text);
      noteEl.innerHTML = esc(state.note);
    }

    function finishIfNeeded() {
      if (state.done) return;
      if (!freeplay && state.step >= steps.length) {
        state.done = true;
        ctx.status(container, 'At-bat complete. ' + state.correct + ' of ' + steps.length + ' pitches matched.', 'ok');
        fireComplete(onComplete, state.correct, steps.length);
      }
    }

    function onPitch(kind) {
      var prevStrikes, applied;
      if (state.done) return;
      if (freeplay) {
        if (state.end) return;
        prevStrikes = state.strikes;
        applied = applyPitch(state.balls, state.strikes, kind);
        state.balls = applied.balls;
        state.strikes = applied.strikes;
        state.end = applied.end;
        if (kind === 'foul' && prevStrikes >= 2) {
          setNote('Foul with two strikes is not strike three. The count stays ' +
            countLabel(state.balls, state.strikes, '') + '. The at-bat continues.');
        } else if (kind === 'foul') {
          setNote('Foul with fewer than two strikes is a strike. Count is ' +
            countLabel(state.balls, state.strikes, '') + '.');
        } else if (applied.end === 'BB') {
          setNote('Ball four. Walk. The batter is awarded first.');
        } else if (applied.end === 'K') {
          setNote('Strike three. Strikeout. The at-bat is over.');
        } else if (applied.end === 'IP') {
          setNote('In play. The at-bat ends with a ball in play.');
        } else if (kind === 'ball') {
          setNote('Ball. Count is ' + countLabel(state.balls, state.strikes, '') + ', balls first.');
        } else {
          setNote('Strike. Count is ' + countLabel(state.balls, state.strikes, '') + '.');
        }
        drawMatrix();
        paintButtons();
        ctx.status(container, 'Count: ' + countLabel(state.balls, state.strikes, state.end), 'info');
        if (state.end) {
          state.done = true;
          fireComplete(onComplete, 1, 1);
        }
        return;
      }
      state.picked = kind;
      paintButtons();
      ctx.status(container, 'Selected ' + pitchLabel(kind) + '. Press Check.', 'info');
    }

    function applyGuided(kind) {
      var expect, next, applied, stepObj;
      if (state.step >= steps.length) return;
      stepObj = steps[state.step];
      expect = pitchKind(stepObj.pitch);
      if (kind !== expect) {
        state.fails += 1;
        if (state.fails >= 2) {
          applied = parseCountResult(stepObj.result);
          if (applied) {
            state.balls = applied.balls;
            state.strikes = applied.strikes;
            state.end = applied.end;
          }
          setNote('The pitch was ' + pitchLabel(expect) + '. ' + trimStr(stepObj.note));
          state.fails = 0;
          state.picked = null;
          state.step += 1;
          drawMatrix();
          paintButtons();
          ctx.status(container, 'Revealed. Count: ' + countLabel(state.balls, state.strikes, state.end), 'wrong');
          finishIfNeeded();
          return;
        }
        ctx.status(
          container,
          'Not that pitch. A foul with two strikes is not strike three. Try again.',
          'wrong'
        );
        return;
      }
      state.correct += 1;
      state.fails = 0;
      state.picked = null;
      applied = parseCountResult(stepObj.result);
      if (applied) {
        state.balls = applied.balls;
        state.strikes = applied.strikes;
        state.end = applied.end;
      } else {
        next = applyPitch(state.balls, state.strikes, kind);
        state.balls = next.balls;
        state.strikes = next.strikes;
        state.end = next.end;
      }
      setNote(trimStr(stepObj.note));
      state.step += 1;
      drawMatrix();
      paintButtons();
      ctx.status(
        container,
        'Count: ' + countLabel(state.balls, state.strikes, state.end) +
          ' — step ' + Math.min(state.step, steps.length) + ' of ' + steps.length + '.',
        'ok'
      );
      finishIfNeeded();
    }

    function doCheck() {
      if (freeplay) {
        ctx.status(
          container,
          state.end
            ? ('At-bat ended: ' + countLabel(state.balls, state.strikes, state.end))
            : ('Still live at ' + countLabel(state.balls, state.strikes, '') + '. Keep pitching, or Reset.'),
          state.end ? 'ok' : 'info'
        );
        return;
      }
      if (state.done) {
        ctx.status(container, 'At-bat complete. ' + state.correct + ' of ' + steps.length + ' pitches matched.', 'ok');
        return;
      }
      if (!state.picked) {
        ctx.status(container, 'Choose Ball, Strike, Foul, or In play, then Check.', 'info');
        return;
      }
      applyGuided(state.picked);
    }

    function doReset() {
      state.step = 0;
      state.balls = 0;
      state.strikes = 0;
      state.end = '';
      state.fails = 0;
      state.correct = 0;
      state.done = false;
      state.picked = null;
      setNote('Count starts at 0–0.');
      drawMatrix();
      paintButtons();
      ctx.status(container, 'Count: 0–0. Balls first.', 'info');
    }

    setNote('Count starts at 0–0.');
    drawMatrix();
    paintButtons();
    ctx.status(container, 'Count: 0–0. Balls first.', 'info');
    ctx.actions(container, [
      { label: 'Check', kind: 'primary', onClick: doCheck },
      { label: 'Reset', kind: 'ghost', onClick: doReset }
    ]);
  }

  /* ------------------------------------------------------------------ */
  /* 5. safeOrOut                                                        */
  /* ------------------------------------------------------------------ */

  function bucketsFor(mode, c) {
    var ch, i, out;
    if (mode === 'run-scored') {
      return [
        { id: 'yes', label: 'Run scores' },
        { id: 'no', label: 'No run' }
      ];
    }
    if (mode === 'game-state') {
      ch = c && isArray(c.choices) ? c.choices : [];
      out = [];
      for (i = 0; i < ch.length && i < 2; i++) {
        out.push({ id: trimStr(ch[i]), label: trimStr(ch[i]) });
      }
      if (out.length === 2) return out;
    }
    return [
      { id: 'safe', label: 'Safe' },
      { id: 'out', label: 'Out' }
    ];
  }

  function normalizeBucketAnswer(answer, buckets) {
    var s = norm(answer);
    var i;
    if (s === 'yes' || s === 'run' || s === 'scores' || s === 'run scores' || s === 'run-scored') return 'yes';
    if (s === 'no' || s === 'no run' || s === 'no-run') return 'no';
    if (s === 'safe') return 'safe';
    if (s === 'out') return 'out';
    for (i = 0; i < buckets.length; i++) {
      if (norm(buckets[i].id) === s || norm(buckets[i].label) === s) return buckets[i].id;
    }
    if (typeof answer === 'number' && buckets[answer]) return buckets[answer].id;
    return trimStr(answer);
  }

  function mountSafeOrOut(container, opts, onComplete, ctx) {
    var cases, mode, root, card, promptEl, flipEl, bucketBar;
    var state;

    opts = opts && typeof opts === 'object' ? opts : {};
    cases = validCases(opts, 'cases');
    if (!cases.length) {
      setEmpty(container, 'This exercise is unavailable.', 'No scenarios were provided.');
      return;
    }
    mode = trimStr(opts.mode) || 'safe-out';

    state = {
      index: 0,
      picked: null,
      fails: 0,
      correct: 0,
      flipped: false,
      done: false
    };

    root = el('div');
    fullWidth(root);
    container.appendChild(root);
    root.appendChild(el('p', {
      class: 'hint',
      text: 'Read the play. Sort it with the two buttons, the left/right arrows, or drag the card onto a bucket.'
    }));
    card = el('div', { class: 'dropzone', tabindex: '0' });
    card.style.minHeight = '5.5rem';
    card.style.width = '100%';
    card.style.flexDirection = 'column';
    card.style.alignItems = 'stretch';
    card.style.cursor = 'grab';
    card.setAttribute('draggable', 'true');
    promptEl = el('p');
    promptEl.style.margin = '0.25rem 0';
    flipEl = el('p', { class: 'hint' });
    flipEl.style.margin = '0.4rem 0 0';
    card.appendChild(promptEl);
    card.appendChild(flipEl);
    root.appendChild(card);
    bucketBar = flex(el('div'));
    bucketBar.style.marginTop = '0.5rem';
    root.appendChild(bucketBar);

    function currentBuckets() {
      return bucketsFor(mode, cases[state.index]);
    }

    function expectedId() {
      var c = cases[state.index];
      var buckets = currentBuckets();
      var idx;
      if (isArray(c.choices) && c.choices.length) {
        idx = resolveAnswerIndex(c.answer, c.choices);
        if (idx >= 0) return buckets[idx] ? buckets[idx].id : trimStr(c.choices[idx]);
      }
      return normalizeBucketAnswer(c.answer, buckets);
    }

    function paintBuckets() {
      var buckets = currentBuckets();
      var i, b, btn;
      bucketBar.innerHTML = '';
      for (i = 0; i < buckets.length; i++) {
        b = buckets[i];
        btn = el('button', {
          type: 'button',
          class: 'btn btn-sm ' + (state.picked === b.id ? 'btn-primary' : 'btn-ghost') +
            (state.flipped && expectedId() === b.id ? ' dropzone correct' : '') +
            (state.flipped && state.picked === b.id && state.picked !== expectedId() ? ' dropzone wrong' : ''),
          text: b.label
        });
        btn.setAttribute('aria-pressed', state.picked === b.id ? 'true' : 'false');
        if (state.flipped || state.done) btn.disabled = true;
        (function (id) {
          bindActivate(btn, function () {
            if (state.flipped || state.done) return;
            state.picked = id;
            paintBuckets();
          });
          bindDropTarget(btn, function () {
            if (state.flipped || state.done) return;
            state.picked = id;
            paintBuckets();
          });
        }(b.id));
        bucketBar.appendChild(btn);
      }
    }

    function paintCard() {
      var c = cases[state.index];
      var text = casePrompt(c);
      promptEl.innerHTML = esc('Play ' + (state.index + 1) + ' of ' + cases.length + '. ' + text);
      if (state.flipped) {
        flipEl.innerHTML = esc(trimStr(c.explain));
        addClass(card, state.picked === expectedId() ? 'correct' : 'wrong');
        removeClass(card, state.picked === expectedId() ? 'wrong' : 'correct');
      } else {
        flipEl.innerHTML = '';
        removeClass(card, 'correct');
        removeClass(card, 'wrong');
      }
      card.setAttribute('aria-label', 'Scenario card. ' + text);
    }

    function goNext() {
      state.index += 1;
      state.picked = null;
      state.fails = 0;
      state.flipped = false;
      if (state.index >= cases.length) {
        state.done = true;
        ctx.status(container, 'Done. ' + state.correct + ' of ' + cases.length + ' correct.', 'ok');
        fireComplete(onComplete, state.correct, cases.length);
        paintCard();
        paintBuckets();
        ctx.actions(container, [
          { label: 'Check', kind: 'primary', disabled: true, onClick: function () {} },
          { label: 'Reset', kind: 'ghost', onClick: doReset }
        ]);
        return;
      }
      paintAll();
    }

    function doCheck() {
      var expl, expect;
      if (state.done) return;
      if (state.flipped) {
        goNext();
        return;
      }
      if (!state.picked) {
        ctx.status(container, 'Choose a bucket first.', 'info');
        return;
      }
      expect = expectedId();
      expl = trimStr(cases[state.index].explain);
      if (state.picked === expect) {
        state.correct += 1;
        state.flipped = true;
        paintCard();
        paintBuckets();
        ctx.status(container, 'Correct. ' + expl, 'ok');
        ctx.actions(container, [
          { label: state.index === cases.length - 1 ? 'Finish' : 'Next', kind: 'primary', onClick: doCheck },
          { label: 'Reset', kind: 'ghost', onClick: doReset }
        ]);
        return;
      }
      state.fails += 1;
      if (state.fails >= 2) {
        state.flipped = true;
        paintCard();
        paintBuckets();
        ctx.status(container, 'The answer is ' + expect + '. ' + expl, 'wrong');
        ctx.actions(container, [
          { label: state.index === cases.length - 1 ? 'Finish' : 'Next', kind: 'primary', onClick: doCheck },
          { label: 'Reset', kind: 'ghost', onClick: doReset }
        ]);
        return;
      }
      ctx.status(container, 'Not that bucket. ' + expl, 'wrong');
    }

    function doReset() {
      state.index = 0;
      state.picked = null;
      state.fails = 0;
      state.correct = 0;
      state.flipped = false;
      state.done = false;
      paintAll();
    }

    function paintAll() {
      paintCard();
      paintBuckets();
      ctx.status(container, 'Play ' + (state.index + 1) + ' of ' + cases.length + '. Sort the card.', 'info');
      ctx.actions(container, [
        { label: 'Check', kind: 'primary', onClick: doCheck },
        { label: 'Reset', kind: 'ghost', onClick: doReset }
      ]);
    }

    card.addEventListener('keydown', function (e) {
      var buckets, k;
      if (state.flipped || state.done) return;
      k = e.key || e.keyCode;
      buckets = currentBuckets();
      if (k === 'ArrowLeft' || k === 'Left' || k === 37) {
        e.preventDefault();
        state.picked = buckets[0] ? buckets[0].id : null;
        paintBuckets();
      } else if (k === 'ArrowRight' || k === 'Right' || k === 39) {
        e.preventDefault();
        state.picked = buckets[1] ? buckets[1].id : buckets[0] ? buckets[0].id : null;
        paintBuckets();
      } else if (isActivateKey(e)) {
        e.preventDefault();
        doCheck();
      }
    });
    card.addEventListener('dragstart', function (e) {
      if (e.dataTransfer) {
        try {
          e.dataTransfer.setData('text/plain', 'card');
          e.dataTransfer.setData('text', 'card');
        } catch (err) {}
      }
    });

    paintAll();
  }

  /* ------------------------------------------------------------------ */
  /* 6. runnerAdvance                                                    */
  /* ------------------------------------------------------------------ */

  function runnerActors(c) {
    var out = [{ id: 'batter', label: 'Batter', from: 'home' }];
    var start = (c && c.start) || {};
    if (start.first) out.push({ id: 'first', label: 'Runner on first', from: 'first' });
    if (start.second) out.push({ id: 'second', label: 'Runner on second', from: 'second' });
    if (start.third) out.push({ id: 'third', label: 'Runner on third', from: 'third' });
    return out;
  }

  function destLabel(d) {
    if (d === 'out') return 'Out';
    if (d === 'home') return 'Home';
    if (d === 'first') return 'First';
    if (d === 'second') return 'Second';
    if (d === 'third') return 'Third';
    return '';
  }

  function mountRunnerAdvance(container, opts, onComplete, ctx) {
    var cases, root, promptEl, diagramHost, tokenBar, destBar;
    var state, dests;
    var animTimer = null;

    opts = opts && typeof opts === 'object' ? opts : {};
    cases = validCases(opts, 'cases');
    if (!cases.length) {
      setEmpty(container, 'This exercise is unavailable.', 'No baserunning cases were provided.');
      return;
    }

    dests = [
      { id: 'first', label: 'First' },
      { id: 'second', label: 'Second' },
      { id: 'third', label: 'Third' },
      { id: 'home', label: 'Home' },
      { id: 'out', label: 'Out' }
    ];

    state = {
      index: 0,
      selected: null,
      assign: {},
      fails: 0,
      correct: 0,
      resolved: false,
      done: false
    };

    root = el('div');
    fullWidth(root);
    container.appendChild(root);
    promptEl = el('p', { class: 'hint' });
    root.appendChild(promptEl);
    diagramHost = el('div');
    diagramHost.style.position = 'relative';
    root.appendChild(diagramHost);
    tokenBar = flex(el('div'));
    tokenBar.style.marginTop = '0.5rem';
    root.appendChild(tokenBar);
    destBar = flex(el('div'));
    destBar.style.marginTop = '0.35rem';
    root.appendChild(destBar);

    function clearAnim() {
      if (animTimer) {
        clearTimeout(animTimer);
        animTimer = null;
      }
    }

    function currentCase() {
      return cases[state.index];
    }

    function startRunnersOpts(c, arrows) {
      return {
        title: 'Where does each runner end up?',
        labels: true,
        hotspots: ['home', 'first', 'second', 'third'],
        runners: arrows || [],
        outs: c && typeof c.outs === 'number' ? c.outs : undefined
      };
    }

    function arrowsFromAssign(c, assign) {
      var actors = runnerActors(c);
      var i, act, dest, out;
      out = [];
      for (i = 0; i < actors.length; i++) {
        act = actors[i];
        dest = assign[act.id];
        if (!dest || dest === 'out') continue;
        out.push({
          from: act.from,
          to: dest,
          style: 'advance',
          label: act.label
        });
      }
      return out;
    }

    function arrowsFromCorrect(c) {
      var assign = {};
      var k, correct;
      correct = c.correct || {};
      for (k in correct) {
        if (hasOwn(correct, k) && correct[k]) assign[k] = correct[k];
      }
      return arrowsFromAssign(c, assign);
    }

    function drawDiamond(arrows) {
      var c = currentCase();
      var svg;
      svg = renderSvg(diagramHost, 'basePaths', startRunnersOpts(c, arrows || []));
      bindHotspots(diagramHost, function (id) {
        if (state.resolved || state.done) return;
        if (id === 'plate') id = 'home';
        placeSelected(id);
      });
      if (svg) {
        bindDropTarget(svg, function (tokenId, e) {
          var snap;
          if (state.resolved || state.done) return;
          if (tokenId) state.selected = tokenId;
          snap = nearestHotspot(diagramHost, e.clientX, e.clientY, ['home', 'first', 'second', 'third']);
          if (snap) placeSelected(snap);
        });
      }
    }

    function placeSelected(destId) {
      if (!state.selected || state.resolved) return;
      state.assign[state.selected] = destId;
      state.selected = null;
      paintTokens();
      paintDests();
    }

    function paintTokens() {
      var actors = runnerActors(currentCase());
      var i, act, btn, dest;
      tokenBar.innerHTML = '';
      for (i = 0; i < actors.length; i++) {
        act = actors[i];
        dest = state.assign[act.id];
        btn = el('button', {
          type: 'button',
          class: 'token' + (state.selected === act.id ? ' selected' : '') + (dest ? ' placed' : ''),
          text: act.label + (dest ? ' → ' + destLabel(dest) : '')
        });
        btn.setAttribute('aria-pressed', state.selected === act.id ? 'true' : 'false');
        if (state.resolved) btn.disabled = true;
        (function (id) {
          bindActivate(btn, function () {
            if (state.resolved || state.done) return;
            state.selected = state.selected === id ? null : id;
            paintTokens();
          });
          bindTokenDrag(btn, function () { return id; }, function (dragId) {
            state.selected = dragId;
          });
        }(act.id));
        tokenBar.appendChild(btn);
      }
    }

    function paintDests() {
      var i, d, zone, mark, correct, actor;
      destBar.innerHTML = '';
      correct = (currentCase() && currentCase().correct) || {};
      for (i = 0; i < dests.length; i++) {
        d = dests[i];
        zone = el('button', { type: 'button', class: 'dropzone', text: d.label });
        zone.setAttribute('aria-label', 'Place runner at ' + d.label);
        mark = '';
        if (state.resolved && state.selected) {
          /* no-op */
        }
        if (state.resolved) {
          actor = state.selected;
          /* colour zone if any assignment targets it */
        }
        if (state.resolved) {
          (function () {
            var actors = runnerActors(currentCase());
            var j, a, got, exp;
            for (j = 0; j < actors.length; j++) {
              a = actors[j];
              got = state.assign[a.id];
              exp = correct[a.id];
              if (got === d.id && exp === d.id) mark = 'correct';
              else if (got === d.id && exp !== d.id) mark = 'wrong';
            }
          }());
          if (mark) addClass(zone, mark);
        }
        if (state.resolved) zone.disabled = true;
        (function (id) {
          bindActivate(zone, function () {
            placeSelected(id);
          });
          bindDropTarget(zone, function (tokenId) {
            if (tokenId) {
              state.selected = tokenId;
              placeSelected(id);
            }
          });
        }(d.id));
        destBar.appendChild(zone);
      }
    }

    function allAssigned() {
      var actors = runnerActors(currentCase());
      var i;
      for (i = 0; i < actors.length; i++) {
        if (!state.assign[actors[i].id]) return false;
      }
      return true;
    }

    function scoreCase() {
      var c = currentCase();
      var actors = runnerActors(c);
      var correct = c.correct || {};
      var i, ok, a, exp, got;
      ok = 0;
      for (i = 0; i < actors.length; i++) {
        a = actors[i];
        exp = correct[a.id] == null ? '' : String(correct[a.id]);
        got = state.assign[a.id] == null ? '' : String(state.assign[a.id]);
        if (got && got === exp) ok += 1;
      }
      return { ok: ok, total: actors.length };
    }

    function playResolution(useCorrect) {
      var c = currentCase();
      var steps, n;
      clearAnim();
      steps = useCorrect ? arrowsFromCorrect(c) : arrowsFromAssign(c, state.assign);
      if (ctx.reducedMotion() || !steps.length) {
        drawDiamond(steps);
        return;
      }
      n = 0;
      function tick() {
        var slice = [], j;
        for (j = 0; j <= n && j < steps.length; j++) slice.push(steps[j]);
        drawDiamond(slice);
        n += 1;
        if (n < steps.length) {
          animTimer = setTimeout(tick, 420);
        }
      }
      tick();
    }

    function goNext() {
      clearAnim();
      state.index += 1;
      state.selected = null;
      state.assign = {};
      state.fails = 0;
      state.resolved = false;
      if (state.index >= cases.length) {
        state.done = true;
        ctx.status(container, 'Done. ' + state.correct + ' of ' + cases.length + ' cases correct.', 'ok');
        fireComplete(onComplete, state.correct, cases.length);
        ctx.actions(container, [
          { label: 'Check', kind: 'primary', disabled: true, onClick: function () {} },
          { label: 'Reset', kind: 'ghost', onClick: doReset }
        ]);
        return;
      }
      paintAll();
    }

    function doCheck() {
      var scored, expl, c;
      if (state.done) return;
      if (state.resolved) {
        goNext();
        return;
      }
      if (!allAssigned()) {
        ctx.status(container, 'Place every runner (including the batter), then Check.', 'info');
        return;
      }
      c = currentCase();
      scored = scoreCase();
      expl = trimStr(c.explain);
      if (scored.ok === scored.total) {
        state.correct += 1;
        state.resolved = true;
        paintTokens();
        paintDests();
        playResolution(true);
        ctx.status(container, 'Correct. ' + expl, 'ok');
        ctx.actions(container, [
          { label: state.index === cases.length - 1 ? 'Finish' : 'Next', kind: 'primary', onClick: doCheck },
          { label: 'Reset', kind: 'ghost', onClick: doReset }
        ]);
        return;
      }
      state.fails += 1;
      if (state.fails >= 2) {
        state.resolved = true;
        paintTokens();
        paintDests();
        playResolution(true);
        ctx.status(container, 'Here is the resolution. ' + expl, 'wrong');
        ctx.actions(container, [
          { label: state.index === cases.length - 1 ? 'Finish' : 'Next', kind: 'primary', onClick: doCheck },
          { label: 'Reset', kind: 'ghost', onClick: doReset }
        ]);
        return;
      }
      ctx.status(container, 'Not quite. ' + expl + ' Adjust and Check again.', 'wrong');
    }

    function doReset() {
      clearAnim();
      state.index = 0;
      state.selected = null;
      state.assign = {};
      state.fails = 0;
      state.correct = 0;
      state.resolved = false;
      state.done = false;
      paintAll();
    }

    function paintAll() {
      var c = currentCase();
      promptEl.innerHTML = esc(
        'Case ' + (state.index + 1) + ' of ' + cases.length + '. ' + casePrompt(c)
      );
      drawDiamond([]);
      paintTokens();
      paintDests();
      ctx.status(container, 'Select a runner, then a base or Out.', 'info');
      ctx.actions(container, [
        { label: 'Check', kind: 'primary', onClick: doCheck },
        { label: 'Reset', kind: 'ghost', onClick: doReset }
      ]);
    }

    paintAll();
  }

  /* ------------------------------------------------------------------ */
  /* 7. swingOrder                                                       */
  /* ------------------------------------------------------------------ */

  function framesFromOpts(opts) {
    var raw, cues, items, i, id, out, it, cue, label;
    raw = [];
    cues = (opts && opts.cues && typeof opts.cues === 'object') ? opts.cues : {};
    items = (opts && isArray(opts.items)) ? opts.items : [];
    if (opts && isArray(opts.frames) && opts.frames.length) raw = opts.frames;
    else {
      for (i = 0; i < items.length; i++) {
        if (items[i] && items[i].id) raw.push(items[i].id);
      }
    }
    out = [];
    for (i = 0; i < raw.length; i++) {
      id = typeof raw[i] === 'string' ? raw[i] : (raw[i] && raw[i].id);
      id = trimStr(id);
      if (!id) continue;
      label = '';
      cue = trimStr(cues[id]);
      for (it = 0; it < items.length; it++) {
        if (items[it] && items[it].id === id) {
          label = trimStr(items[it].label);
          if (!cue) cue = trimStr(items[it].cue);
        }
      }
      if (!label) {
        label = id.replace(/^frame-/, '');
        label = label.charAt(0).toUpperCase() + label.slice(1);
      }
      out.push({ id: id, label: label, cue: cue });
    }
    return out;
  }

  function mountSwingOrder(container, opts, onComplete, ctx) {
    var canonical, root, diagramHost, listHost, cueHost;
    var state;

    opts = opts && typeof opts === 'object' ? opts : {};
    canonical = framesFromOpts(opts);
    if (canonical.length < 2) {
      setEmpty(container, 'This exercise is unavailable.', 'No swing frames were provided to order.');
      return;
    }

    function shuffledOrder() {
      var ids = [], i, s, same, guard;
      for (i = 0; i < canonical.length; i++) ids.push(canonical[i].id);
      guard = 0;
      do {
        s = ctx.shuffle(ids);
        same = true;
        for (i = 0; i < s.length; i++) if (s[i] !== ids[i]) same = false;
        guard += 1;
      } while (same && guard < 12);
      return s;
    }

    state = {
      order: shuffledOrder(),
      fails: 0,
      resolved: false,
      done: false,
      dragId: null
    };

    root = el('div');
    fullWidth(root);
    container.appendChild(root);
    root.appendChild(el('p', {
      class: 'hint',
      text: 'Put the swing in order. Use Move left / Move right, or drag a frame onto another slot.'
    }));
    diagramHost = el('div');
    root.appendChild(diagramHost);
    listHost = el('div');
    root.appendChild(listHost);
    cueHost = el('div');
    root.appendChild(cueHost);

    function frameById(id) {
      var i;
      for (i = 0; i < canonical.length; i++) if (canonical[i].id === id) return canonical[i];
      return null;
    }

    function drawStrip() {
      renderSvg(diagramHost, 'swingSequence', {
        order: state.order,
        showLabels: true,
        title: 'Swing sequence'
      });
    }

    function move(ix, dir) {
      var t, nx;
      if (state.resolved) return;
      nx = ix + dir;
      if (nx < 0 || nx >= state.order.length) return;
      t = state.order[ix];
      state.order[ix] = state.order[nx];
      state.order[nx] = t;
      paintList();
      drawStrip();
    }

    function swap(aId, bIndex) {
      var from, t;
      if (state.resolved) return;
      from = indexOf(state.order, aId);
      if (from < 0 || bIndex < 0 || bIndex >= state.order.length) return;
      t = state.order[from];
      state.order[from] = state.order[bIndex];
      state.order[bIndex] = t;
      paintList();
      drawStrip();
    }

    function paintList() {
      var i, row, lab, left, right, token, fr;
      listHost.innerHTML = '';
      for (i = 0; i < state.order.length; i++) {
        fr = frameById(state.order[i]) || { id: state.order[i], label: state.order[i], cue: '' };
        row = flex(el('div', { class: 'dropzone' }));
        row.style.justifyContent = 'space-between';
        row.style.width = '100%';
        row.style.marginTop = '0.35rem';
        if (state.resolved) {
          addClass(row, state.order[i] === canonical[i].id ? 'correct' : 'wrong');
        }
        left = el('button', { type: 'button', class: 'btn btn-sm btn-ghost', text: 'Move left' });
        left.setAttribute('aria-label', 'Move ' + fr.label + ' left');
        right = el('button', { type: 'button', class: 'btn btn-sm btn-ghost', text: 'Move right' });
        right.setAttribute('aria-label', 'Move ' + fr.label + ' right');
        if (i === 0 || state.resolved) left.disabled = true;
        if (i === state.order.length - 1 || state.resolved) right.disabled = true;
        token = el('button', {
          type: 'button',
          class: 'token',
          text: String(i + 1) + '. ' + fr.label
        });
        token.setAttribute('draggable', 'true');
        (function (ix, id) {
          bindActivate(left, function () { move(ix, -1); });
          bindActivate(right, function () { move(ix, 1); });
          bindTokenDrag(token, function () { return id; }, function (dragId) {
            state.dragId = dragId;
          });
          bindDropTarget(row, function (dragId) {
            if (dragId) swap(dragId, ix);
          });
          token.addEventListener('keydown', function (e) {
            var k = e.key || e.keyCode;
            if (k === 'ArrowLeft' || k === 'Left' || k === 37) {
              e.preventDefault();
              move(ix, -1);
            } else if (k === 'ArrowRight' || k === 'Right' || k === 39) {
              e.preventDefault();
              move(ix, 1);
            }
          });
        }(i, state.order[i]));
        row.appendChild(left);
        row.appendChild(token);
        row.appendChild(right);
        listHost.appendChild(row);
      }
    }

    function paintCues(show) {
      var i, fr, p;
      cueHost.innerHTML = '';
      if (!show) return;
      for (i = 0; i < canonical.length; i++) {
        fr = canonical[i];
        p = el('p', { class: 'hint', text: (i + 1) + '. ' + fr.label + (fr.cue ? ' — ' + fr.cue : '') });
        cueHost.appendChild(p);
      }
    }

    function isCorrect() {
      var i;
      for (i = 0; i < canonical.length; i++) {
        if (state.order[i] !== canonical[i].id) return false;
      }
      return true;
    }

    function revealOrder() {
      var i, ids = [];
      for (i = 0; i < canonical.length; i++) ids.push(canonical[i].id);
      state.order = ids;
      state.resolved = true;
    }

    function doCheck() {
      var i, nOk;
      if (state.done) return;
      if (state.resolved) return;
      if (isCorrect()) {
        state.resolved = true;
        state.done = true;
        paintList();
        drawStrip();
        paintCues(true);
        ctx.status(container, 'Correct order. Read each coaching cue.', 'ok');
        fireComplete(onComplete, canonical.length, canonical.length);
        return;
      }
      state.fails += 1;
      nOk = 0;
      for (i = 0; i < canonical.length; i++) if (state.order[i] === canonical[i].id) nOk += 1;
      if (state.fails >= 2) {
        revealOrder();
        paintList();
        drawStrip();
        paintCues(true);
        ctx.status(container, 'Here is the sequence, with each cue.', 'wrong');
        state.done = true;
        fireComplete(onComplete, nOk, canonical.length);
        return;
      }
      paintList();
      ctx.status(container, nOk + ' frame' + (nOk === 1 ? '' : 's') + ' already in the right slot. Try again.', 'wrong');
    }

    function doReset() {
      state.order = shuffledOrder();
      state.fails = 0;
      state.resolved = false;
      state.done = false;
      paintList();
      drawStrip();
      paintCues(false);
      ctx.status(container, 'Reorder the five frames into the swing.', 'info');
    }

    paintList();
    drawStrip();
    paintCues(false);
    ctx.status(container, 'Reorder the five frames into the swing.', 'info');
    ctx.actions(container, [
      { label: 'Check', kind: 'primary', onClick: doCheck },
      { label: 'Reset', kind: 'ghost', onClick: doReset }
    ]);
  }

  /* ------------------------------------------------------------------ */
  /* 8. armCareCheck                                                     */
  /* ------------------------------------------------------------------ */

  function mountArmCareCheck(container, opts, onComplete, ctx) {
    var cases, root, metaEl, qEl, choiceBar, sourceEl;
    var state;

    opts = opts && typeof opts === 'object' ? opts : {};
    cases = validCases(opts, 'cases');
    if (!cases.length) {
      setEmpty(container, 'This exercise is unavailable.', 'No arm-care cases were provided.');
      return;
    }

    state = {
      index: 0,
      picked: null,
      fails: 0,
      correct: 0,
      resolved: false,
      done: false
    };

    root = el('div');
    fullWidth(root);
    container.appendChild(root);
    metaEl = el('p', { class: 'hint' });
    root.appendChild(metaEl);
    qEl = el('p');
    root.appendChild(qEl);
    choiceBar = el('div');
    choiceBar.style.display = 'flex';
    choiceBar.style.flexDirection = 'column';
    choiceBar.style.gap = '0.4rem';
    root.appendChild(choiceBar);
    sourceEl = el('p', { class: 'hint' });
    root.appendChild(sourceEl);

    function current() {
      return cases[state.index];
    }

    function choicesOf(c) {
      return isArray(c.choices) ? c.choices : [];
    }

    function paintMeta() {
      var c = current();
      var bits = [];
      bits.push('Case ' + (state.index + 1) + ' of ' + cases.length + '.');
      if (c.age != null && c.age !== '') bits.push('Age ' + safeText(c.age) + '.');
      if (c.division) bits.push(safeText(c.division) + '.');
      if (c.pitches != null && c.pitches !== '') bits.push(safeText(c.pitches) + ' pitches.');
      if (c.daysRest != null && c.daysRest !== '') bits.push(safeText(c.daysRest) + ' days rest recorded.');
      metaEl.innerHTML = esc(bits.join(' '));
    }

    function paintQuestion() {
      qEl.innerHTML = esc(casePrompt(current()));
    }

    function paintChoices() {
      var c = current();
      var ch = choicesOf(c);
      var i, btn, correctIdx, isRight, isPicked;
      choiceBar.innerHTML = '';
      correctIdx = resolveAnswerIndex(c.answer, ch);
      for (i = 0; i < ch.length; i++) {
        isPicked = state.picked === i || (typeof state.picked === 'string' && norm(state.picked) === norm(ch[i]));
        isRight = i === correctIdx;
        btn = el('button', {
          type: 'button',
          class: 'btn btn-sm ' + (isPicked ? 'btn-primary' : 'btn-ghost'),
          text: safeText(ch[i])
        });
        btn.style.justifyContent = 'flex-start';
        btn.style.width = '100%';
        btn.setAttribute('aria-pressed', isPicked ? 'true' : 'false');
        if (state.resolved) {
          if (isRight) {
            addClass(btn, 'dropzone');
            addClass(btn, 'correct');
          } else if (isPicked) {
            addClass(btn, 'dropzone');
            addClass(btn, 'wrong');
          }
          btn.disabled = true;
        }
        (function (idx) {
          bindActivate(btn, function () {
            if (state.resolved || state.done) return;
            state.picked = idx;
            paintChoices();
          });
        }(i));
        choiceBar.appendChild(btn);
      }
    }

    function paintSource(force) {
      var c = current();
      if (force && c.source) {
        sourceEl.innerHTML = esc('Governing rule: ' + trimStr(c.explain) +
          (c.source ? ' (source: ' + trimStr(c.source) + ')' : ''));
      } else if (force) {
        sourceEl.innerHTML = esc(trimStr(c.explain));
      } else {
        sourceEl.innerHTML = '';
      }
    }

    function goNext() {
      state.index += 1;
      state.picked = null;
      state.fails = 0;
      state.resolved = false;
      if (state.index >= cases.length) {
        state.done = true;
        ctx.status(container, 'Done. ' + state.correct + ' of ' + cases.length + ' correct.', 'ok');
        fireComplete(onComplete, state.correct, cases.length);
        ctx.actions(container, [
          { label: 'Check', kind: 'primary', disabled: true, onClick: function () {} },
          { label: 'Reset', kind: 'ghost', onClick: doReset }
        ]);
        return;
      }
      paintAll();
    }

    function doCheck() {
      var c, ch, expl;
      if (state.done) return;
      if (state.resolved) {
        goNext();
        return;
      }
      c = current();
      ch = choicesOf(c);
      if (state.picked == null) {
        ctx.status(container, 'Choose an answer first.', 'info');
        return;
      }
      expl = trimStr(c.explain);
      if (choiceIsCorrect(c.answer, ch, state.picked)) {
        state.correct += 1;
        state.resolved = true;
        paintChoices();
        paintSource(true);
        ctx.status(container, 'Correct. ' + expl, 'ok');
        ctx.actions(container, [
          { label: state.index === cases.length - 1 ? 'Finish' : 'Next', kind: 'primary', onClick: doCheck },
          { label: 'Reset', kind: 'ghost', onClick: doReset }
        ]);
        return;
      }
      state.fails += 1;
      if (state.fails >= 2) {
        state.resolved = true;
        paintChoices();
        paintSource(true);
        ctx.status(container, 'The correct call: ' + safeText(typeof c.answer === 'number' && ch[c.answer] ? ch[c.answer] : c.answer) + '. ' + expl, 'wrong');
        ctx.actions(container, [
          { label: state.index === cases.length - 1 ? 'Finish' : 'Next', kind: 'primary', onClick: doCheck },
          { label: 'Reset', kind: 'ghost', onClick: doReset }
        ]);
        return;
      }
      ctx.status(container, 'Not that call. ' + expl, 'wrong');
    }

    function doReset() {
      state.index = 0;
      state.picked = null;
      state.fails = 0;
      state.correct = 0;
      state.resolved = false;
      state.done = false;
      paintAll();
    }

    function paintAll() {
      paintMeta();
      paintQuestion();
      paintChoices();
      paintSource(false);
      ctx.status(container, 'Use the facts on the card. Limits come from the case, not a guess.', 'info');
      ctx.actions(container, [
        { label: 'Check', kind: 'primary', onClick: doCheck },
        { label: 'Reset', kind: 'ghost', onClick: doReset }
      ]);
    }

    paintAll();
  }

  /* ------------------------------------------------------------------ */
  /* Register the eight widgets                                          */
  /* ------------------------------------------------------------------ */

  register('labelTheField', { mount: mountLabelTheField });
  register('placeThePositions', { mount: mountPlaceThePositions });
  register('strikeZoneTrainer', { mount: mountStrikeZoneTrainer });
  register('countBuilder', { mount: mountCountBuilder });
  register('safeOrOut', { mount: mountSafeOrOut });
  register('runnerAdvance', { mount: mountRunnerAdvance });
  register('swingOrder', { mount: mountSwingOrder });
  register('armCareCheck', { mount: mountArmCareCheck });

  return {
    widgets: widgets,
    register: register,
    has: has,
    names: names,
    mount: mount
  };
}());
