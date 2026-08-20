/* ===================================================================
   Homerun Learn to Play — interactive.js
   Widget registry and sixteen interactive exercises.
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
  /* Shared helpers for the remaining eight widgets                      */
  /* ------------------------------------------------------------------ */

  var ROLE_ORDER = ['ball', 'base', 'backup'];
  var STEAL_CHOICES = ['go', 'hold', 'balk'];
  var BACKWARDS_K = '\uA4D8';

  function answerText(answer, choices) {
    var idx;
    if (isArray(choices) && choices.length) {
      idx = resolveAnswerIndex(answer, choices);
      if (idx >= 0) return safeText(choices[idx]);
    }
    return safeText(answer);
  }

  function promptOrSituation(c) {
    var t, sit;
    t = casePrompt(c);
    if (t) return t;
    if (!c || typeof c !== 'object') return '';
    sit = c.situation;
    if (typeof sit === 'string') return trimStr(sit);
    return '';
  }

  function nextCaseLabel(index, total) {
    return index >= total - 1 ? 'Finish' : 'Next';
  }

  function roleNorm(v) {
    var s = norm(v);
    if (s === 'ball' || s === 'b') return 'ball';
    if (s === 'base') return 'base';
    if (s === 'backup' || s === 'back-up' || s === 'back up' || s === 'bu') return 'backup';
    return s;
  }

  function roleInfo(role) {
    var r = roleNorm(role);
    if (r === 'ball') return { id: 'ball', word: 'Ball', glyph: 'B' };
    if (r === 'base') return { id: 'base', word: 'Base', glyph: '\u25B2' };
    if (r === 'backup') return { id: 'backup', word: 'Backup', glyph: '\u2302' };
    return { id: '', word: 'Unassigned', glyph: '\u00B7' };
  }

  function alignmentLabel(id) {
    var s = trimStr(id);
    var n = norm(s);
    if (n === 'standard') return 'Standard';
    if (n === 'infield-in') return 'Infield in';
    if (n === 'dp-depth' || n === 'double-play-depth' || n === 'double play depth') return 'Double-play depth';
    if (n === 'no-doubles' || n === 'no doubles') return 'No doubles';
    if (n === 'bunt-defense' || n === 'bunt-defence' || n === 'bunt defense' || n === 'bunt defence') return 'Bunt defence';
    if (n === 'of-shallow' || n === 'outfield-shallow') return 'Outfield shallow';
    if (n === 'of-deep' || n === 'outfield-deep') return 'Outfield deep';
    if (n === 'corners-in') return 'Corners in';
    return s || 'Alignment';
  }

  function alignmentId(v) {
    var s = norm(v);
    if (s === 'double-play-depth' || s === 'double play depth' || s === 'dp depth') return 'dp-depth';
    if (s === 'bunt defence' || s === 'bunt-defence' || s === 'bunt defense') return 'bunt-defense';
    if (s === 'no doubles') return 'no-doubles';
    if (s === 'outfield-shallow' || s === 'outfield shallow') return 'of-shallow';
    if (s === 'outfield-deep' || s === 'outfield deep') return 'of-deep';
    if (s === 'infield in') return 'infield-in';
    if (s === 'corners in') return 'corners-in';
    return trimStr(v);
  }

  function callModeHint(mode) {
    var m = norm(mode);
    if (m === 'safety') return 'Safety call. When two answers sound kind, take the more conservative one.';
    if (m === 'game-flow') return 'Game-flow call. Does the game keep going, and who bats?';
    if (m === 'small-ball') return 'Small-ball call. Score, inning, outs, and the next hitter decide.';
    if (m === 'approach') return 'Approach call. Hunt the zone, or protect it.';
    if (m === 'management') return 'Management call. Playing time, visits, protests, and who may talk.';
    if (m === 'rules') return 'Rules call. Read the conditions, then pick the ruling.';
    return 'Make the call. Read the situation, then pick the ruling.';
  }

  function stealMoveCaption(move) {
    var m = trimStr(move);
    if (m === 'rhp-home') return 'Right-hander: free foot steps toward home. That is a pitch.';
    if (m === 'rhp-pickoff-first') return 'Right-hander: free foot steps toward first. That is a pickoff.';
    if (m === 'rhp-fake-first-on-rubber') return 'Right-hander still on the rubber, feinting to first.';
    if (m === 'step-off-fake-first') return 'Pivot foot steps back off the rubber, then a feint to first.';
    if (m === 'lhp-crosses-45') return 'Left-hander: free foot crosses the 45-degree line toward the plate.';
    if (m === 'lhp-step-first') return 'Left-hander: free foot steps toward first. That is a pickoff.';
    if (m === 'fake-to-third') return 'Feint to third while still in contact with the rubber.';
    if (m === 'no-stop') return 'From the stretch: no complete stop before the delivery.';
    return m ? 'Move: ' + m + '.' : 'Watch the free foot.';
  }

  function stealChoiceLabel(id) {
    var s = norm(id);
    if (s === 'go') return 'Go';
    if (s === 'hold') return 'Hold';
    if (s === 'balk') return 'Balk';
    return safeText(id);
  }

  function paintExplain(host, text) {
    if (!host) return;
    host.innerHTML = '';
    if (!text) {
      host.style.display = 'none';
      return;
    }
    host.style.display = '';
    host.className = 'quiz-explain';
    host.appendChild(el('p', { text: text }));
  }

  function columnStack(node) {
    if (!node) return node;
    node.style.display = 'flex';
    node.style.flexDirection = 'column';
    node.style.gap = '0.4rem';
    return node;
  }

  function setPressed(btn, on) {
    if (!btn) return;
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  }

  /* ------------------------------------------------------------------ */
  /* 9. assignTheNine                                                    */
  /* ------------------------------------------------------------------ */

  function situationLine(c) {
    var s, bits, r, t;
    t = promptOrSituation(c);
    if (t) return t;
    s = c && c.situation && typeof c.situation === 'object' ? c.situation : null;
    if (!s) return '';
    bits = [];
    if (s.hitType) bits.push(safeText(s.hitType));
    if (s.location) bits.push('to ' + safeText(s.location));
    r = asList(s.runners);
    if (!r.length) bits.push('nobody on');
    else bits.push('runner' + (r.length === 1 ? '' : 's') + ' on ' + r.join(', '));
    if (s.outs != null && s.outs !== '') {
      bits.push(safeText(s.outs) + ' out' + (Number(s.outs) === 1 ? '' : 's'));
    }
    return bits.join('. ');
  }

  function assignCasesFrom(opts) {
    var list, i, c, out, k, n;
    list = validCases(opts, 'cases');
    out = [];
    for (i = 0; i < list.length; i++) {
      c = list[i];
      if (!c.correct || typeof c.correct !== 'object') continue;
      n = 0;
      for (k = 0; k < ALL_POSITIONS.length; k++) {
        if (roleNorm(c.correct[ALL_POSITIONS[k]])) n += 1;
      }
      if (n) out.push(c);
    }
    return out;
  }

  function mountAssignTheNine(container, opts, onComplete, ctx) {
    var cases, root, progressHost, sitEl, diagramHost, legendEl, gridEl, explainEl;
    var state;

    opts = opts && typeof opts === 'object' ? opts : {};
    cases = assignCasesFrom(opts);
    if (!cases.length) {
      setEmpty(container, 'This exercise is unavailable.', 'No ball-base-backup situations were provided.');
      return;
    }

    state = {
      index: 0,
      assign: {},
      selectedRole: null,
      fails: 0,
      resolved: false,
      done: false,
      marks: {},
      jobCorrect: 0,
      caseHits: 0
    };

    root = el('div');
    fullWidth(root);
    container.appendChild(root);
    progressHost = el('div');
    root.appendChild(progressHost);
    sitEl = el('p');
    root.appendChild(sitEl);
    root.appendChild(el('p', {
      class: 'hint',
      text: 'Every fielder gets one job: Ball (fields it), Base (covers a bag or the cutoff/relay), or Backup (behind a throw or a teammate). Pick a role, then tap a fielder — or use the three buttons on each row.'
    }));
    legendEl = flex(el('div'));
    legendEl.style.marginBottom = '0.35rem';
    root.appendChild(legendEl);
    diagramHost = el('div');
    diagramHost.style.position = 'relative';
    diagramHost.style.width = '100%';
    root.appendChild(diagramHost);
    gridEl = el('div');
    root.appendChild(gridEl);
    explainEl = el('div');
    root.appendChild(explainEl);

    function current() {
      return cases[state.index];
    }

    function expectedRole(id) {
      var c = current();
      if (!c || !c.correct) return '';
      return roleNorm(c.correct[id]);
    }

    function jobsTotal() {
      return cases.length * ALL_POSITIONS.length;
    }

    function scoreNow() {
      var i, id, n;
      n = 0;
      for (i = 0; i < ALL_POSITIONS.length; i++) {
        id = ALL_POSITIONS[i];
        if (roleNorm(state.assign[id]) && roleNorm(state.assign[id]) === expectedRole(id)) n += 1;
      }
      return n;
    }

    function assignedCount() {
      var i, n;
      n = 0;
      for (i = 0; i < ALL_POSITIONS.length; i++) {
        if (roleNorm(state.assign[ALL_POSITIONS[i]])) n += 1;
      }
      return n;
    }

    function rolesForDraw() {
      var out, i, id, r;
      out = {};
      for (i = 0; i < ALL_POSITIONS.length; i++) {
        id = ALL_POSITIONS[i];
        r = roleNorm(state.assign[id]);
        if (r) out[id] = r;
      }
      return out;
    }

    function drawField() {
      var c, diagram, svgName, svgOpts, sit;
      c = current();
      diagram = c.diagram && typeof c.diagram === 'object' ? c.diagram : null;
      svgName = (diagram && diagram.svg) ? diagram.svg : 'field';
      svgOpts = diagram && diagram.opts ? copyObj(diagram.opts) : {};
      svgOpts.positions = true;
      svgOpts.hotspots = ALL_POSITIONS;
      svgOpts.roles = rolesForDraw();
      sit = c.situation && typeof c.situation === 'object' ? c.situation : null;
      if (sit && sit.runners && svgOpts.runners === undefined) svgOpts.runners = sit.runners;
      if (!svgOpts.title) svgOpts.title = situationLine(c) || 'Assign the nine';
      renderSvg(diagramHost, svgName, svgOpts);
      bindHotspots(diagramHost, function (id) {
        if (indexOf(ALL_POSITIONS, id) === -1) return;
        applyRole(id, state.selectedRole);
      });
    }

    function applyRole(posId, role) {
      var r;
      if (state.resolved || state.done) return;
      r = roleNorm(role);
      if (!r) {
        ctx.status(container, 'Pick Ball, Base, or Backup, then tap a fielder.', 'info');
        return;
      }
      if (indexOf(ALL_POSITIONS, posId) === -1) return;
      state.assign[posId] = r;
      state.marks = {};
      paintGrid();
      drawField();
      paintStatus();
    }

    function paintLegend() {
      var i, info, btn, r;
      legendEl.innerHTML = '';
      for (i = 0; i < ROLE_ORDER.length; i++) {
        r = ROLE_ORDER[i];
        info = roleInfo(r);
        btn = el('button', {
          type: 'button',
          class: 'token' + (state.selectedRole === r ? ' selected' : ''),
          text: info.glyph + ' ' + info.word
        });
        btn.setAttribute('aria-label', 'Select role ' + info.word);
        setPressed(btn, state.selectedRole === r);
        if (state.resolved || state.done) btn.disabled = true;
        (function (id) {
          bindActivate(btn, function () {
            if (state.resolved || state.done) return;
            state.selectedRole = state.selectedRole === id ? null : id;
            paintLegend();
            paintStatus();
          });
        }(r));
        legendEl.appendChild(btn);
      }
    }

    function paintGrid() {
      var i, id, row, nameEl, btns, j, role, info, btn, got, exp, mark, lab;
      gridEl.innerHTML = '';
      for (i = 0; i < ALL_POSITIONS.length; i++) {
        id = ALL_POSITIONS[i];
        got = roleNorm(state.assign[id]);
        exp = expectedRole(id);
        mark = state.marks[id] || '';
        row = flex(el('div', {
          class: 'dropzone' + (mark ? ' ' + mark : ''),
          role: 'group'
        }));
        row.style.justifyContent = 'space-between';
        row.style.width = '100%';
        row.style.marginTop = '0.35rem';
        lab = (positionNumber(id) != null ? String(positionNumber(id)) + ' ' : '') +
          String(id).toUpperCase() + ' ' + positionName(id);
        row.setAttribute('aria-label', lab + (got ? ', ' + roleInfo(got).word : ', unassigned'));
        nameEl = el('span', { text: lab });
        nameEl.style.minWidth = '7rem';
        nameEl.style.fontWeight = '700';
        row.appendChild(nameEl);
        btns = flex(el('div'));
        for (j = 0; j < ROLE_ORDER.length; j++) {
          role = ROLE_ORDER[j];
          info = roleInfo(role);
          btn = el('button', {
            type: 'button',
            class: 'btn btn-sm ' + (got === role ? 'btn-primary' : 'btn-ghost'),
            text: info.glyph + ' ' + info.word
          });
          btn.setAttribute('aria-label', positionName(id) + ' ' + info.word);
          setPressed(btn, got === role);
          if (state.resolved || state.done) btn.disabled = true;
          (function (pos, r) {
            bindActivate(btn, function () {
              applyRole(pos, r);
            });
          }(id, role));
          btns.appendChild(btn);
        }
        row.appendChild(btns);
        gridEl.appendChild(row);
      }
    }

    function paintProgress() {
      var pct;
      progressHost.innerHTML = '';
      pct = Math.round((state.index / cases.length) * 100);
      if (state.done) pct = 100;
      progressHost.appendChild(progressRow(pct, 'Situation progress'));
    }

    function runningLine() {
      return 'Jobs correct so far: ' + state.jobCorrect + ' of ' + jobsTotal() +
        '. Perfect situations: ' + state.caseHits + ' of ' + cases.length + '.';
    }

    function paintStatus() {
      var n, msg, info;
      if (state.done) return;
      n = assignedCount();
      if (state.selectedRole) {
        info = roleInfo(state.selectedRole);
        msg = 'Role selected: ' + info.word + ' (' + info.glyph + '). Tap a fielder to assign it. ' +
          n + ' of 9 assigned.';
      } else if (n) {
        msg = n + ' of 9 assigned. Check when every fielder has a job.';
      } else {
        msg = 'Situation ' + (state.index + 1) + ' of ' + cases.length + '. Assign every position.';
      }
      ctx.status(container, msg + ' ' + runningLine(), 'info');
    }

    function revealCorrect() {
      var i, id;
      for (i = 0; i < ALL_POSITIONS.length; i++) {
        id = ALL_POSITIONS[i];
        state.assign[id] = expectedRole(id);
        state.marks[id] = 'correct';
      }
    }

    function markAgainstKey() {
      var i, id, got, exp;
      for (i = 0; i < ALL_POSITIONS.length; i++) {
        id = ALL_POSITIONS[i];
        got = roleNorm(state.assign[id]);
        exp = expectedRole(id);
        if (got && got === exp) state.marks[id] = 'correct';
        else state.marks[id] = 'wrong';
      }
    }

    function lockCase(nOk) {
      state.resolved = true;
      state.jobCorrect += nOk;
      if (nOk === ALL_POSITIONS.length) state.caseHits += 1;
    }

    function goNext() {
      state.index += 1;
      state.assign = {};
      state.selectedRole = null;
      state.fails = 0;
      state.resolved = false;
      state.marks = {};
      if (state.index >= cases.length) {
        state.done = true;
        paintProgress();
        sitEl.innerHTML = esc(
          'Done. You assigned ' + state.jobCorrect + ' of ' + jobsTotal() +
          ' jobs correctly. ' + state.caseHits + ' situation' +
          (state.caseHits === 1 ? '' : 's') + ' fully right.'
        );
        paintLegend();
        paintGrid();
        paintExplain(explainEl, runningLine());
        ctx.status(
          container,
          'All situations complete. ' + state.jobCorrect + ' of ' + jobsTotal() + ' jobs correct.',
          'ok'
        );
        ctx.actions(container, [
          { label: 'Check', kind: 'primary', disabled: true, onClick: function () {} },
          { label: 'Reset', kind: 'ghost', onClick: doReset }
        ]);
        fireComplete(onComplete, state.jobCorrect, jobsTotal());
        return;
      }
      paintAll();
    }

    function actionsFor() {
      var buttons;
      if (state.done) return;
      if (state.resolved) {
        ctx.actions(container, [
          { label: nextCaseLabel(state.index, cases.length), kind: 'primary', onClick: goNext },
          { label: 'Reset', kind: 'ghost', onClick: doReset }
        ]);
        return;
      }
      buttons = [
        { label: 'Check', kind: 'primary', onClick: doCheck },
        { label: 'Reset', kind: 'ghost', onClick: doReset }
      ];
      if (state.fails >= 1) {
        buttons.splice(1, 0, { label: 'Show the answer', kind: 'accent', onClick: doShow });
      }
      ctx.actions(container, buttons);
    }

    function doCheck() {
      var n, rationale, msg;
      if (state.done) return;
      if (state.resolved) {
        goNext();
        return;
      }
      n = scoreNow();
      markAgainstKey();
      rationale = trimStr(current().rationale || current().explain);
      if (n === ALL_POSITIONS.length) {
        lockCase(n);
        paintLegend();
        paintGrid();
        drawField();
        paintExplain(explainEl, rationale);
        ctx.status(container, 'All nine jobs right. ' + rationale + ' ' + runningLine(), 'ok');
        actionsFor();
        return;
      }
      state.fails += 1;
      if (state.fails >= 2) {
        lockCase(n);
        revealCorrect();
        paintLegend();
        paintGrid();
        drawField();
        paintExplain(explainEl, rationale);
        ctx.status(
          container,
          'Showing the nine jobs. You had ' + n + ' of 9. ' + rationale,
          'wrong'
        );
        actionsFor();
        return;
      }
      paintGrid();
      drawField();
      paintExplain(explainEl, rationale);
      msg = n + ' of 9 right. Fix the red rows and check again.';
      if (rationale) msg += ' ' + rationale;
      ctx.status(container, msg, 'wrong');
      actionsFor();
    }

    function doShow() {
      var n;
      if (state.done || state.resolved) return;
      n = scoreNow();
      lockCase(n);
      revealCorrect();
      paintLegend();
      paintGrid();
      drawField();
      paintExplain(explainEl, trimStr(current().rationale || current().explain));
      ctx.status(container, 'Showing the nine jobs. You had ' + n + ' of 9.', 'ok');
      actionsFor();
    }

    function doReset() {
      state.index = 0;
      state.assign = {};
      state.selectedRole = null;
      state.fails = 0;
      state.resolved = false;
      state.done = false;
      state.marks = {};
      state.jobCorrect = 0;
      state.caseHits = 0;
      paintAll();
    }

    function paintAll() {
      var c = current();
      paintProgress();
      sitEl.innerHTML = esc(
        'Situation ' + (state.index + 1) + ' of ' + cases.length + '. ' + situationLine(c)
      );
      paintLegend();
      paintGrid();
      drawField();
      paintExplain(explainEl, '');
      paintStatus();
      actionsFor();
    }

    paintAll();
  }

  /* ------------------------------------------------------------------ */
  /* 10. stealRead                                                       */
  /* ------------------------------------------------------------------ */

  function stealRunnersFor(move) {
    var m = trimStr(move);
    if (m === 'fake-to-third') return ['first', 'third'];
    return ['first'];
  }

  function drawStealMove(host, move, reduced) {
    var m, footX, footY, toX, toY, label, parts, hand;
    m = trimStr(move);
    footX = 180;
    footY = 112;
    toX = footX;
    toY = footY;
    label = stealMoveCaption(m);
    if (m === 'rhp-home' || m === 'no-stop') {
      toX = 180;
      toY = 168;
    } else if (
      m === 'rhp-pickoff-first' ||
      m === 'rhp-fake-first-on-rubber' ||
      m === 'lhp-step-first' ||
      m === 'step-off-fake-first'
    ) {
      toX = 268;
      toY = 100;
    } else if (m === 'lhp-crosses-45') {
      toX = 218;
      toY = 158;
    } else if (m === 'fake-to-third') {
      toX = 92;
      toY = 100;
    } else {
      toX = 180;
      toY = 158;
    }
    if (m === 'step-off-fake-first') {
      footX = 180;
      footY = 124;
    }
    parts = [];
    parts.push('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 220" width="100%" class="hrl-svg" role="img">');
    parts.push('<title>' + esc(label) + '</title>');
    parts.push('<desc>' + esc(label) + '</desc>');
    parts.push('<rect x="8" y="8" width="344" height="204" rx="10" fill="#f4efe4" stroke="#1e3a5f" stroke-width="1"/>');
    parts.push('<rect x="168" y="84" width="24" height="6" fill="#fff" stroke="#1e3a5f"/>');
    parts.push('<polygon points="180,192 166,176 194,176" fill="#fff" stroke="#1e3a5f"/>');
    parts.push('<rect x="292" y="86" width="12" height="12" transform="rotate(45 298 92)" fill="#fff" stroke="#1e3a5f"/>');
    parts.push('<rect x="50" y="86" width="12" height="12" transform="rotate(45 56 92)" fill="#fff" stroke="#1e3a5f"/>');
    parts.push('<text x="180" y="212" text-anchor="middle" font-size="11">Home</text>');
    parts.push('<text x="318" y="80" text-anchor="middle" font-size="11">1B</text>');
    parts.push('<text x="40" y="80" text-anchor="middle" font-size="11">3B</text>');
    parts.push('<circle cx="180" cy="70" r="8" fill="#1e3a5f"/>');
    parts.push('<line x1="180" y1="78" x2="180" y2="108" stroke="#1e3a5f" stroke-width="3"/>');
    parts.push('<circle cx="172" cy="112" r="5" fill="#1e3a5f"/>');
    hand = m.indexOf('lhp') === 0 ? 'LHP' : 'RHP';
    parts.push('<text x="20" y="28" font-size="12" font-weight="700">' + esc(hand) + '</text>');
    parts.push('<text x="180" y="36" text-anchor="middle" font-size="12">' + esc(label) + '</text>');
    parts.push('<line x1="180" y1="100" x2="' + toX + '" y2="' + toY +
      '" stroke="#dc2626" stroke-width="2" stroke-dasharray="4 3"/>');
    if (!reduced) {
      parts.push('<circle cx="' + footX + '" cy="' + footY + '" r="6" fill="#dc2626">');
      parts.push('<animate attributeName="cx" values="' + footX + ';' + toX + ';' + footX +
        '" dur="1.4s" repeatCount="indefinite"/>');
      parts.push('<animate attributeName="cy" values="' + footY + ';' + toY + ';' + footY +
        '" dur="1.4s" repeatCount="indefinite"/>');
      parts.push('</circle>');
    } else {
      parts.push('<circle cx="' + toX + '" cy="' + toY + '" r="6" fill="#dc2626"/>');
    }
    parts.push('</svg>');
    host.innerHTML = parts.join('');
  }

  function mountStealRead(container, opts, onComplete, ctx) {
    var cases, root, metaEl, descEl, pathHost, moveHost, choiceBar, explainEl, tellEl;
    var state;

    opts = opts && typeof opts === 'object' ? opts : {};
    cases = validCases(opts, 'cases');
    if (!cases.length) {
      setEmpty(container, 'This exercise is unavailable.', 'No pitcher-move cases were provided.');
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
    descEl = el('p');
    root.appendChild(descEl);
    pathHost = el('div');
    root.appendChild(pathHost);
    moveHost = el('div');
    root.appendChild(moveHost);
    tellEl = el('p', { class: 'hint' });
    root.appendChild(tellEl);
    choiceBar = columnStack(el('div'));
    root.appendChild(choiceBar);
    explainEl = el('div');
    root.appendChild(explainEl);

    function current() {
      return cases[state.index];
    }

    function expected() {
      var c = current();
      var idx;
      idx = resolveAnswerIndex(c.answer, STEAL_CHOICES);
      if (idx >= 0) return STEAL_CHOICES[idx];
      return norm(c.answer);
    }

    function paintChoices() {
      var i, id, btn, exp, isPicked, isRight;
      choiceBar.innerHTML = '';
      exp = expected();
      for (i = 0; i < STEAL_CHOICES.length; i++) {
        id = STEAL_CHOICES[i];
        isPicked = state.picked === id;
        isRight = id === exp;
        btn = el('button', {
          type: 'button',
          class: 'choice-btn' +
            (isPicked ? ' selected' : '') +
            (state.resolved && isRight ? ' correct' : '') +
            (isPicked && !isRight && state.fails ? ' wrong' : ''),
          text: stealChoiceLabel(id)
        });
        setPressed(btn, isPicked);
        if (id === 'go') btn.setAttribute('aria-label', 'Go — it is a pitch, steal');
        if (id === 'hold') btn.setAttribute('aria-label', 'Hold — pickoff or legal disengage, get back');
        if (id === 'balk') btn.setAttribute('aria-label', 'Balk — illegal move, you advance');
        if (state.resolved || state.done) btn.disabled = true;
        (function (choice) {
          bindActivate(btn, function () {
            if (state.resolved || state.done) return;
            state.picked = choice;
            paintChoices();
          });
        }(id));
        choiceBar.appendChild(btn);
      }
    }

    function drawCase() {
      var c = current();
      var reduced = ctx.reducedMotion();
      renderSvg(pathHost, 'basePaths', {
        runners: stealRunnersFor(c.move),
        title: 'Runner at first',
        desc: 'Diamond with the runner the steal read is about.'
      });
      drawStealMove(moveHost, c.move, reduced);
    }

    function goNext() {
      state.index += 1;
      state.picked = null;
      state.fails = 0;
      state.resolved = false;
      if (state.index >= cases.length) {
        state.done = true;
        ctx.status(container, 'Done. ' + state.correct + ' of ' + cases.length + ' reads correct.', 'ok');
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
      var c, expl, exp;
      if (state.done) return;
      if (state.resolved) {
        goNext();
        return;
      }
      c = current();
      if (!state.picked) {
        ctx.status(container, 'Pick Go, Hold, or Balk first.', 'info');
        return;
      }
      exp = expected();
      expl = trimStr(c.explain);
      if (state.picked === exp) {
        state.correct += 1;
        state.resolved = true;
        paintChoices();
        paintExplain(explainEl, expl);
        ctx.status(container, 'Correct. ' + expl, 'ok');
        ctx.actions(container, [
          { label: nextCaseLabel(state.index, cases.length), kind: 'primary', onClick: doCheck },
          { label: 'Reset', kind: 'ghost', onClick: doReset }
        ]);
        return;
      }
      state.fails += 1;
      paintChoices();
      if (state.fails >= 2) {
        state.resolved = true;
        paintChoices();
        paintExplain(explainEl, expl);
        ctx.status(container, 'The read is ' + stealChoiceLabel(exp) + '. ' + expl, 'wrong');
        ctx.actions(container, [
          { label: nextCaseLabel(state.index, cases.length), kind: 'primary', onClick: doCheck },
          { label: 'Reset', kind: 'ghost', onClick: doReset }
        ]);
        return;
      }
      ctx.status(container, 'Not that read. Watch the free foot and try once more.', 'wrong');
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
      var c = current();
      metaEl.innerHTML = esc('Move ' + (state.index + 1) + ' of ' + cases.length + '.');
      descEl.innerHTML = esc(promptOrSituation(c) || stealMoveCaption(c.move));
      tellEl.innerHTML = esc('Go = it is a pitch, steal. Hold = pickoff or legal disengage, get back. Balk = the move itself is illegal; you advance.');
      drawCase();
      paintChoices();
      paintExplain(explainEl, '');
      ctx.status(container, 'Read the free foot. Pick Go, Hold, or Balk, then Check.', 'info');
      ctx.actions(container, [
        { label: 'Check', kind: 'primary', onClick: doCheck },
        { label: 'Reset', kind: 'ghost', onClick: doReset }
      ]);
    }

    paintAll();
  }

  /* ------------------------------------------------------------------ */
  /* 11. makeTheCall                                                     */
  /* ------------------------------------------------------------------ */

  function mountMakeTheCall(container, opts, onComplete, ctx) {
    var cases, mode, root, modeEl, promptEl, choiceBar, metaEl, explainEl;
    var state;

    opts = opts && typeof opts === 'object' ? opts : {};
    cases = validCases(opts, 'cases');
    if (!cases.length) {
      setEmpty(container, 'This exercise is unavailable.', 'No rulings were provided.');
      return;
    }
    mode = trimStr(opts.mode);

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
    modeEl = el('p', { class: 'hint' });
    root.appendChild(modeEl);
    promptEl = el('p');
    root.appendChild(promptEl);
    choiceBar = columnStack(el('div'));
    root.appendChild(choiceBar);
    metaEl = el('p', { class: 'hint' });
    root.appendChild(metaEl);
    explainEl = el('div');
    root.appendChild(explainEl);

    function current() {
      return cases[state.index];
    }

    function choicesOf(c) {
      return c && isArray(c.choices) ? c.choices : [];
    }

    function rulingBits(c) {
      var bits = [];
      if (c.rule) bits.push('Rule: ' + trimStr(c.rule) + '.');
      if (c.division) bits.push('Applies: ' + trimStr(c.division) + '.');
      return bits.join(' ');
    }

    function paintChoices() {
      var c, ch, i, btn, correctIdx, isPicked, isRight;
      c = current();
      ch = choicesOf(c);
      correctIdx = resolveAnswerIndex(c.answer, ch);
      choiceBar.innerHTML = '';
      if (!ch.length) {
        choiceBar.appendChild(el('p', { class: 'hint', text: 'No choices were provided for this case.' }));
        return;
      }
      for (i = 0; i < ch.length; i++) {
        isPicked = state.picked === i;
        isRight = i === correctIdx;
        btn = el('button', {
          type: 'button',
          class: 'choice-btn' +
            (isPicked ? ' selected' : '') +
            (state.resolved && isRight ? ' correct' : '') +
            (isPicked && !isRight && state.fails ? ' wrong' : ''),
          text: safeText(ch[i])
        });
        setPressed(btn, isPicked);
        if (state.resolved || state.done) btn.disabled = true;
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

    function paintMeta(show) {
      var c = current();
      var bits = [];
      if (show) {
        if (c.rule) bits.push('Rule: ' + trimStr(c.rule));
        if (c.division) bits.push('Divisions: ' + trimStr(c.division));
      }
      metaEl.innerHTML = bits.length ? esc(bits.join('. ') + '.') : '';
    }

    function goNext() {
      state.index += 1;
      state.picked = null;
      state.fails = 0;
      state.resolved = false;
      if (state.index >= cases.length) {
        state.done = true;
        ctx.status(container, 'Done. ' + state.correct + ' of ' + cases.length + ' rulings correct.', 'ok');
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
      var c, ch, expl, extra;
      if (state.done) return;
      if (state.resolved) {
        goNext();
        return;
      }
      c = current();
      ch = choicesOf(c);
      if (state.picked == null) {
        ctx.status(container, 'Pick a ruling first.', 'info');
        return;
      }
      expl = trimStr(c.explain);
      extra = rulingBits(c);
      if (choiceIsCorrect(c.answer, ch, state.picked)) {
        state.correct += 1;
        state.resolved = true;
        paintChoices();
        paintMeta(true);
        paintExplain(explainEl, expl + (extra ? ' ' + extra : ''));
        ctx.status(container, 'Correct. ' + expl, 'ok');
        ctx.actions(container, [
          { label: nextCaseLabel(state.index, cases.length), kind: 'primary', onClick: doCheck },
          { label: 'Reset', kind: 'ghost', onClick: doReset }
        ]);
        return;
      }
      state.fails += 1;
      paintChoices();
      if (state.fails >= 2) {
        state.resolved = true;
        paintChoices();
        paintMeta(true);
        paintExplain(explainEl, expl + (extra ? ' ' + extra : ''));
        ctx.status(
          container,
          'The ruling is: ' + answerText(c.answer, ch) + '. ' + expl,
          'wrong'
        );
        ctx.actions(container, [
          { label: nextCaseLabel(state.index, cases.length), kind: 'primary', onClick: doCheck },
          { label: 'Reset', kind: 'ghost', onClick: doReset }
        ]);
        return;
      }
      ctx.status(container, 'Not that ruling. Read the conditions again.', 'wrong');
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
      var c = current();
      modeEl.innerHTML = esc(
        'Case ' + (state.index + 1) + ' of ' + cases.length + '. ' + callModeHint(mode)
      );
      promptEl.innerHTML = esc(promptOrSituation(c));
      paintChoices();
      paintMeta(false);
      paintExplain(explainEl, '');
      ctx.status(container, 'Read the situation. Pick a ruling, then Check.', 'info');
      ctx.actions(container, [
        { label: 'Check', kind: 'primary', onClick: doCheck },
        { label: 'Reset', kind: 'ghost', onClick: doReset }
      ]);
    }

    paintAll();
  }

  /* ------------------------------------------------------------------ */
  /* 12. sequencePitches                                                 */
  /* ------------------------------------------------------------------ */

  function pitchHeightBand(p) {
    var loc, y;
    if (!p || typeof p !== 'object') return 'mid';
    loc = norm(p.location);
    if (loc === 'elevated' || loc === 'high' || loc === 'up') return 'high';
    if (loc === 'dirt' || loc.indexOf('low') === 0 || loc === 'down') return 'low';
    y = Number(p.y);
    if (y === y) {
      if (y <= 0.22) return 'high';
      if (y >= 0.62) return 'low';
    }
    return 'mid';
  }

  function pitchSpeedBand(p) {
    var t = norm(p && p.type);
    if (!t) return 'other';
    if (t.indexOf('fast') === 0 || t === 'fb' || t === 'four-seam' || t === 'sinker' || t === 'cutter' || t === 'two-seam') {
      return 'fast';
    }
    return 'off';
  }

  function pitchLabel(p) {
    var type, loc;
    if (!p || typeof p !== 'object') return safeText(p);
    type = trimStr(p.type) || 'pitch';
    loc = trimStr(p.location);
    return loc ? type + ' · ' + loc : type;
  }

  function sequenceFlags(seq) {
    var i, heights, speeds, hN, sN, h, s, k;
    heights = {};
    speeds = {};
    hN = 0;
    sN = 0;
    for (i = 0; i < seq.length; i++) {
      h = pitchHeightBand(seq[i]);
      s = pitchSpeedBand(seq[i]);
      if (!heights[h]) {
        heights[h] = true;
        hN += 1;
      }
      if (!speeds[s]) {
        speeds[s] = true;
        sN += 1;
      }
    }
    return { changedLevel: hN > 1, changedSpeed: sN > 1 };
  }

  function sequencesMatch(a, b) {
    var i;
    if (!a || !b || a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (norm(a[i].type) !== norm(b[i].type)) return false;
      if (norm(a[i].location) !== norm(b[i].location)) return false;
    }
    return true;
  }

  function idealList(c) {
    return c && isArray(c.ideal) ? c.ideal : [];
  }

  function availablePitches(c) {
    var raw, i, out, p;
    raw = c && isArray(c.pitches) ? c.pitches : [];
    out = [];
    for (i = 0; i < raw.length; i++) {
      p = raw[i];
      if (p && typeof p === 'object' && (p.type || p.location)) out.push(p);
    }
    return out;
  }

  function mountSequencePitches(container, opts, onComplete, ctx) {
    var cases, root, headEl, countEl, zoneHost, availBar, seqBar, explainEl;
    var state;

    opts = opts && typeof opts === 'object' ? opts : {};
    cases = validCases(opts, 'cases');
    if (!cases.length) {
      setEmpty(container, 'This exercise is unavailable.', 'No pitch-sequence cases were provided.');
      return;
    }

    state = {
      index: 0,
      picked: [],
      fails: 0,
      correct: 0,
      resolved: false,
      done: false
    };

    root = el('div');
    fullWidth(root);
    container.appendChild(root);
    headEl = el('p');
    root.appendChild(headEl);
    countEl = el('p', { class: 'hint' });
    root.appendChild(countEl);
    zoneHost = el('div');
    root.appendChild(zoneHost);
    root.appendChild(el('p', {
      class: 'hint',
      text: 'Build a three-pitch sequence from the pitches on offer. More than one good sequence exists. Grade is whether you changed eye level and changed speeds the way this hitter asks — not an exact match.'
    }));
    availBar = flex(el('div'));
    root.appendChild(availBar);
    seqBar = el('div');
    root.appendChild(seqBar);
    explainEl = el('div');
    root.appendChild(explainEl);

    function current() {
      return cases[state.index];
    }

    function drawZone() {
      var i, p, plotted;
      plotted = [];
      for (i = 0; i < state.picked.length; i++) {
        p = state.picked[i];
        plotted.push({
          x: (p.x != null && Number(p.x) === Number(p.x)) ? Number(p.x) : 0.5,
          y: (p.y != null && Number(p.y) === Number(p.y)) ? Number(p.y) : 0.4,
          call: p.call || 'called-strike',
          n: i + 1
        });
      }
      renderSvg(zoneHost, 'strikeZone', {
        title: 'Sequence — catcher’s view',
        grid: 3,
        pitches: plotted
      });
    }

    function paintAvail() {
      var list, i, p, btn;
      list = availablePitches(current());
      availBar.innerHTML = '';
      for (i = 0; i < list.length; i++) {
        p = list[i];
        btn = el('button', {
          type: 'button',
          class: 'token',
          text: pitchLabel(p)
        });
        btn.setAttribute('aria-label', 'Add ' + pitchLabel(p));
        if (state.resolved || state.done || state.picked.length >= 3) btn.disabled = true;
        (function (pitch) {
          bindActivate(btn, function () {
            if (state.resolved || state.done) return;
            if (state.picked.length >= 3) return;
            state.picked.push(pitch);
            paintSeq();
            paintAvail();
            drawZone();
          });
        }(p));
        availBar.appendChild(btn);
      }
    }

    function paintSeq() {
      var i, row, lab, rm, p;
      seqBar.innerHTML = '';
      for (i = 0; i < 3; i++) {
        p = state.picked[i];
        row = flex(el('div', { class: 'dropzone' }));
        row.style.justifyContent = 'space-between';
        row.style.width = '100%';
        row.style.marginTop = '0.35rem';
        lab = el('span', {
          text: p ? String(i + 1) + '. ' + pitchLabel(p) : String(i + 1) + '. empty'
        });
        row.appendChild(lab);
        if (p && !state.resolved && !state.done) {
          rm = el('button', { type: 'button', class: 'btn btn-sm btn-ghost', text: 'Remove' });
          rm.setAttribute('aria-label', 'Remove pitch ' + (i + 1));
          (function (ix) {
            bindActivate(rm, function () {
              if (state.resolved || state.done) return;
              state.picked.splice(ix, 1);
              paintSeq();
              paintAvail();
              drawZone();
            });
          }(i));
          row.appendChild(rm);
        }
        seqBar.appendChild(row);
      }
    }

    function idealSentence(c) {
      var ideal, i, bits;
      ideal = idealList(c);
      if (!ideal.length) return '';
      bits = [];
      for (i = 0; i < ideal.length; i++) bits.push(pitchLabel(ideal[i]));
      return 'One good sequence is ' + bits.join(', then ') + '. More than one good sequence exists.';
    }

    function principlesOk(got, need) {
      if (need.changedLevel && !got.changedLevel) return false;
      if (need.changedSpeed && !got.changedSpeed) return false;
      return true;
    }

    function feedbackLine(got, need, matchedIdeal) {
      var bits = [];
      bits.push(got.changedLevel ? 'You changed eye level.' : 'The sequence stayed at one eye level.');
      bits.push(got.changedSpeed ? 'You changed speeds.' : 'The sequence stayed at one speed.');
      if (need.changedLevel && !got.changedLevel) bits.push('This hitter asked you to change eye level.');
      if (need.changedSpeed && !got.changedSpeed) bits.push('This hitter asked you to change speeds.');
      if (!need.changedSpeed) bits.push('Staying with one speed can still be right when the scouting note says so.');
      if (matchedIdeal) bits.push('That matches one ideal line.');
      else bits.push('It does not have to match the ideal line exactly.');
      return bits.join(' ');
    }

    function goNext() {
      state.index += 1;
      state.picked = [];
      state.fails = 0;
      state.resolved = false;
      if (state.index >= cases.length) {
        state.done = true;
        ctx.status(container, 'Done. ' + state.correct + ' of ' + cases.length + ' sequences held the principles.', 'ok');
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
      var c, got, need, ok, matched, expl, line;
      if (state.done) return;
      if (state.resolved) {
        goNext();
        return;
      }
      c = current();
      if (state.picked.length < 3) {
        ctx.status(container, 'Pick three pitches first.', 'info');
        return;
      }
      got = sequenceFlags(state.picked);
      need = sequenceFlags(idealList(c).length ? idealList(c) : state.picked);
      matched = sequencesMatch(state.picked, idealList(c));
      ok = matched || principlesOk(got, need);
      expl = trimStr(c.explain);
      line = feedbackLine(got, need, matched);
      if (ok) {
        state.correct += 1;
        state.resolved = true;
        paintSeq();
        paintAvail();
        paintExplain(explainEl, expl + ' ' + line);
        ctx.status(container, 'The principles hold. ' + expl, 'ok');
        ctx.actions(container, [
          { label: nextCaseLabel(state.index, cases.length), kind: 'primary', onClick: doCheck },
          { label: 'Reset', kind: 'ghost', onClick: doReset }
        ]);
        return;
      }
      state.fails += 1;
      if (state.fails >= 2) {
        state.resolved = true;
        paintSeq();
        paintAvail();
        paintExplain(explainEl, expl + ' ' + line + ' ' + idealSentence(c));
        ctx.status(container, 'Look at a good sequence. ' + expl, 'wrong');
        ctx.actions(container, [
          { label: nextCaseLabel(state.index, cases.length), kind: 'primary', onClick: doCheck },
          { label: 'Reset', kind: 'ghost', onClick: doReset }
        ]);
        return;
      }
      ctx.status(container, line + ' Adjust the sequence and check again.', 'wrong');
    }

    function doReset() {
      state.index = 0;
      state.picked = [];
      state.fails = 0;
      state.correct = 0;
      state.resolved = false;
      state.done = false;
      paintAll();
    }

    function paintAll() {
      var c = current();
      headEl.innerHTML = esc(
        'Hitter ' + (state.index + 1) + ' of ' + cases.length + '. ' + trimStr(c.hitter)
      );
      countEl.innerHTML = esc(c.count ? 'Count: ' + safeText(c.count) + '.' : '');
      paintSeq();
      paintAvail();
      drawZone();
      paintExplain(explainEl, '');
      ctx.status(container, 'Add three pitches, then Check. Principles first, not an exact copy.', 'info');
      ctx.actions(container, [
        { label: 'Check', kind: 'primary', onClick: doCheck },
        { label: 'Reset', kind: 'ghost', onClick: doReset }
      ]);
    }

    paintAll();
  }

  /* ------------------------------------------------------------------ */
  /* 13. scoreThePlay                                                    */
  /* ------------------------------------------------------------------ */

  function foldScore(s) {
    var t;
    t = trimStr(s);
    t = t.replace(/backward[s]?\s*-?\s*k/ig, BACKWARDS_K);
    t = t.replace(/k\s*-?\s*looking/ig, BACKWARDS_K);
    t = t.replace(/\s+/g, '');
    t = t.toUpperCase();
    return t;
  }

  function scoreMatches(got, answer, accept) {
    var g, i, list;
    g = foldScore(got);
    if (!g) return false;
    if (g === foldScore(answer)) return true;
    list = asList(accept);
    for (i = 0; i < list.length; i++) {
      if (g === foldScore(list[i])) return true;
    }
    return false;
  }

  function mountScoreThePlay(container, opts, onComplete, ctx) {
    var cases, root, descEl, builtEl, typeInput, keysBar, extraBar, explainEl;
    var state;
    var KEYS, i;

    opts = opts && typeof opts === 'object' ? opts : {};
    cases = validCases(opts, 'cases');
    if (!cases.length) {
      setEmpty(container, 'This exercise is unavailable.', 'No scoring cases were provided.');
      return;
    }

    KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'E', 'FC', 'K', BACKWARDS_K, 'F', 'U', '-'];

    state = {
      index: 0,
      value: '',
      fails: 0,
      correct: 0,
      resolved: false,
      done: false
    };

    root = el('div');
    fullWidth(root);
    container.appendChild(root);
    descEl = el('p');
    root.appendChild(descEl);
    root.appendChild(el('p', {
      class: 'hint',
      text: 'Build the notation with the keys, or type it. Case and spaces do not matter. ' +
        BACKWARDS_K + ' is a called third strike.'
    }));
    builtEl = el('p');
    builtEl.style.fontWeight = '700';
    builtEl.style.fontSize = '1.25rem';
    builtEl.setAttribute('aria-live', 'polite');
    root.appendChild(builtEl);
    typeInput = el('input', { type: 'text' });
    typeInput.setAttribute('aria-label', 'Scorekeeping notation');
    typeInput.setAttribute('autocomplete', 'off');
    typeInput.setAttribute('spellcheck', 'false');
    typeInput.style.width = '100%';
    typeInput.style.minHeight = '44px';
    typeInput.style.padding = '0.4rem 0.6rem';
    typeInput.style.fontSize = '1rem';
    root.appendChild(typeInput);
    keysBar = flex(el('div'));
    keysBar.style.marginTop = '0.5rem';
    root.appendChild(keysBar);
    extraBar = flex(el('div'));
    extraBar.style.marginTop = '0.35rem';
    root.appendChild(extraBar);
    explainEl = el('div');
    root.appendChild(explainEl);

    typeInput.addEventListener('input', function () {
      if (state.resolved || state.done) return;
      state.value = typeInput.value;
      paintBuilt();
    });
    typeInput.addEventListener('keydown', function (e) {
      var k = e.key || e.keyCode;
      if (k === 'Enter' || k === 13) {
        e.preventDefault();
        doCheck();
      }
    });

    function current() {
      return cases[state.index];
    }

    function paintBuilt() {
      var shown = trimStr(state.value);
      builtEl.innerHTML = esc(shown ? shown : '(empty)');
      if (typeInput.value !== state.value) typeInput.value = state.value;
    }

    function appendToken(t) {
      if (state.resolved || state.done) return;
      state.value = safeText(state.value) + t;
      paintBuilt();
      typeInput.focus();
    }

    function paintKeys() {
      var btn, lab;
      keysBar.innerHTML = '';
      extraBar.innerHTML = '';
      for (i = 0; i < KEYS.length; i++) {
        lab = KEYS[i] === BACKWARDS_K ? BACKWARDS_K + ' called K' : KEYS[i];
        btn = el('button', { type: 'button', class: 'token', text: KEYS[i] });
        btn.setAttribute('aria-label', 'Insert ' + lab);
        if (state.resolved || state.done) btn.disabled = true;
        (function (tok) {
          bindActivate(btn, function () {
            appendToken(tok);
          });
        }(KEYS[i]));
        keysBar.appendChild(btn);
      }
      btn = el('button', { type: 'button', class: 'btn btn-sm btn-ghost', text: 'Delete last' });
      btn.setAttribute('aria-label', 'Delete last token');
      if (state.resolved || state.done) btn.disabled = true;
      bindActivate(btn, function () {
        var s, tokens, j, tok;
        if (state.resolved || state.done) return;
        s = safeText(state.value);
        if (!s) return;
        tokens = ['FC', BACKWARDS_K];
        for (j = 0; j < tokens.length; j++) {
          tok = tokens[j];
          if (s.length >= tok.length && s.slice(s.length - tok.length) === tok) {
            state.value = s.slice(0, s.length - tok.length);
            paintBuilt();
            return;
          }
        }
        state.value = s.slice(0, s.length - 1);
        paintBuilt();
      });
      extraBar.appendChild(btn);
    }

    function goNext() {
      state.index += 1;
      state.value = '';
      state.fails = 0;
      state.resolved = false;
      if (state.index >= cases.length) {
        state.done = true;
        ctx.status(container, 'Done. ' + state.correct + ' of ' + cases.length + ' scored correctly.', 'ok');
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
      var c, expl, ok;
      if (state.done) return;
      if (state.resolved) {
        goNext();
        return;
      }
      c = current();
      if (!trimStr(state.value)) {
        ctx.status(container, 'Enter a notation first.', 'info');
        return;
      }
      expl = trimStr(c.explain);
      ok = scoreMatches(state.value, c.answer, c.accept);
      if (ok) {
        state.correct += 1;
        state.resolved = true;
        paintKeys();
        typeInput.disabled = true;
        paintExplain(explainEl, expl);
        ctx.status(container, 'Correct. ' + expl, 'ok');
        ctx.actions(container, [
          { label: nextCaseLabel(state.index, cases.length), kind: 'primary', onClick: doCheck },
          { label: 'Reset', kind: 'ghost', onClick: doReset }
        ]);
        return;
      }
      state.fails += 1;
      if (state.fails >= 2) {
        state.resolved = true;
        state.value = safeText(c.answer);
        paintBuilt();
        paintKeys();
        typeInput.disabled = true;
        paintExplain(explainEl, expl);
        ctx.status(container, 'The book is ' + safeText(c.answer) + '. ' + expl, 'wrong');
        ctx.actions(container, [
          { label: nextCaseLabel(state.index, cases.length), kind: 'primary', onClick: doCheck },
          { label: 'Reset', kind: 'ghost', onClick: doReset }
        ]);
        return;
      }
      ctx.status(container, 'Not that notation. Check the fielders in order, then try once more.', 'wrong');
    }

    function doReset() {
      state.index = 0;
      state.value = '';
      state.fails = 0;
      state.correct = 0;
      state.resolved = false;
      state.done = false;
      typeInput.disabled = false;
      paintAll();
    }

    function paintAll() {
      var c = current();
      descEl.innerHTML = esc(
        'Play ' + (state.index + 1) + ' of ' + cases.length + '. ' +
        trimStr(c.description || promptOrSituation(c))
      );
      typeInput.disabled = false;
      paintBuilt();
      paintKeys();
      paintExplain(explainEl, '');
      ctx.status(container, 'Build or type the notation, then Check.', 'info');
      ctx.actions(container, [
        { label: 'Check', kind: 'primary', onClick: doCheck },
        { label: 'Reset', kind: 'ghost', onClick: doReset }
      ]);
    }

    paintAll();
  }

  /* ------------------------------------------------------------------ */
  /* 14. statMatch                                                       */
  /* ------------------------------------------------------------------ */

  function mountStatMatch(container, opts, onComplete, ctx) {
    var pairs, traps, root, cols, leftCol, rightCol, hidesEl, explainEl;
    var state, i, p;

    opts = opts && typeof opts === 'object' ? opts : {};
    pairs = [];
    if (opts && isArray(opts.pairs)) {
      for (i = 0; i < opts.pairs.length; i++) {
        p = opts.pairs[i];
        if (p && typeof p === 'object' && trimStr(p.stat) && trimStr(p.question)) {
          pairs.push(p);
        }
      }
    }
    traps = [];
    if (opts && isArray(opts.traps)) {
      for (i = 0; i < opts.traps.length; i++) {
        p = opts.traps[i];
        if (p && typeof p === 'object' && trimStr(p.question)) traps.push(p);
      }
    }
    if (!pairs.length) {
      setEmpty(container, 'This exercise is unavailable.', 'No statistic pairs were provided.');
      return;
    }

    state = {
      selectedStat: null,
      selectedQuestion: null,
      matched: {},
      fails: 0,
      done: false,
      revealed: false
    };

    root = el('div');
    fullWidth(root);
    container.appendChild(root);
    root.appendChild(el('p', {
      class: 'hint',
      text: 'Select a statistic, then the question it actually answers. Wrong matches explain the misreading. After a correct match, read what the number hides — that is the point.'
    }));
    cols = flex(el('div'));
    cols.style.alignItems = 'flex-start';
    leftCol = columnStack(el('div'));
    leftCol.style.flex = '1 1 12rem';
    rightCol = columnStack(el('div'));
    rightCol.style.flex = '1 1 18rem';
    cols.appendChild(leftCol);
    cols.appendChild(rightCol);
    root.appendChild(cols);
    hidesEl = el('div');
    root.appendChild(hidesEl);
    explainEl = el('div');
    root.appendChild(explainEl);

    function pairForStat(stat) {
      var j;
      for (j = 0; j < pairs.length; j++) {
        if (pairs[j].stat === stat) return pairs[j];
      }
      return null;
    }

    function pairForQuestion(q) {
      var j;
      for (j = 0; j < pairs.length; j++) {
        if (pairs[j].question === q) return pairs[j];
      }
      return null;
    }

    function trapForQuestion(q) {
      var j;
      for (j = 0; j < traps.length; j++) {
        if (traps[j].question === q) return traps[j];
      }
      return null;
    }

    function matchedCount() {
      var j, n;
      n = 0;
      for (j = 0; j < pairs.length; j++) {
        if (state.matched[pairs[j].stat]) n += 1;
      }
      return n;
    }

    function questionUsed(q) {
      var k;
      for (k in state.matched) {
        if (hasOwn(state.matched, k) && state.matched[k] === q) return true;
      }
      return false;
    }

    function finishIfDone() {
      if (matchedCount() < pairs.length) return;
      if (state.done) return;
      state.done = true;
      ctx.status(
        container,
        'All ' + pairs.length + ' statistics matched. Read what each number hides.',
        'ok'
      );
      fireComplete(onComplete, pairs.length, pairs.length);
      ctx.actions(container, [
        { label: 'Check', kind: 'primary', disabled: true, onClick: function () {} },
        { label: 'Reset', kind: 'ghost', onClick: doReset }
      ]);
    }

    function tryPair() {
      var pair, trap, stat, q;
      stat = state.selectedStat;
      q = state.selectedQuestion;
      if (!stat || !q || state.done) return;
      pair = pairForStat(stat);
      if (pair && pair.question === q) {
        state.matched[stat] = q;
        state.selectedStat = null;
        state.selectedQuestion = null;
        paintExplain(hidesEl, pair.stat + ' hides: ' + trimStr(pair.hides));
        paintExplain(explainEl, '');
        paintCols();
        ctx.status(
          container,
          'Matched ' + pair.stat + '. ' + matchedCount() + ' of ' + pairs.length + '. What it hides is the point.',
          'ok'
        );
        finishIfDone();
        return;
      }
      trap = trapForQuestion(q);
      state.fails += 1;
      state.selectedStat = null;
      state.selectedQuestion = null;
      paintCols();
      if (trap) {
        paintExplain(explainEl, trimStr(trap.explain));
        ctx.status(container, 'Trap. ' + trimStr(trap.explain), 'wrong');
      } else {
        paintExplain(explainEl, safeText(stat) + ' does not answer that question.');
        ctx.status(container, 'Not that pairing. Read what the number actually counts.', 'wrong');
      }
    }

    function paintCols() {
      var stats, questions, j, qList, btn, st, q, used, matchedQ, pair;
      leftCol.innerHTML = '';
      rightCol.innerHTML = '';
      leftCol.appendChild(el('p', { class: 'hint', text: 'Statistics' }));
      rightCol.appendChild(el('p', { class: 'hint', text: 'Questions' }));
      stats = [];
      for (j = 0; j < pairs.length; j++) stats.push(pairs[j].stat);
      if (!state._statOrder) state._statOrder = ctx.shuffle(stats);
      else {
        /* keep order */
      }
      qList = [];
      for (j = 0; j < pairs.length; j++) qList.push(pairs[j].question);
      for (j = 0; j < traps.length; j++) qList.push(traps[j].question);
      if (!state._qOrder) state._qOrder = ctx.shuffle(qList);

      for (j = 0; j < state._statOrder.length; j++) {
        st = state._statOrder[j];
        used = !!state.matched[st];
        btn = el('button', {
          type: 'button',
          class: 'choice-btn' +
            (state.selectedStat === st ? ' selected' : '') +
            (used ? ' correct' : ''),
          text: st
        });
        setPressed(btn, state.selectedStat === st || used);
        if (used || state.done || state.revealed) btn.disabled = true;
        (function (id) {
          bindActivate(btn, function () {
            if (state.done || state.revealed || state.matched[id]) return;
            state.selectedStat = state.selectedStat === id ? null : id;
            paintCols();
            if (state.selectedStat && state.selectedQuestion) tryPair();
          });
        }(st));
        leftCol.appendChild(btn);
      }

      for (j = 0; j < state._qOrder.length; j++) {
        q = state._qOrder[j];
        used = questionUsed(q);
        pair = pairForQuestion(q);
        matchedQ = used;
        btn = el('button', {
          type: 'button',
          class: 'choice-btn' +
            (state.selectedQuestion === q ? ' selected' : '') +
            (matchedQ ? ' correct' : ''),
          text: q
        });
        setPressed(btn, state.selectedQuestion === q || matchedQ);
        if (used || state.done || state.revealed) btn.disabled = true;
        (function (text) {
          bindActivate(btn, function () {
            if (state.done || state.revealed || questionUsed(text)) return;
            state.selectedQuestion = state.selectedQuestion === text ? null : text;
            paintCols();
            if (state.selectedStat && state.selectedQuestion) tryPair();
          });
        }(q));
        rightCol.appendChild(btn);
      }
    }

    function revealRemaining() {
      var j, pair, n;
      n = matchedCount();
      for (j = 0; j < pairs.length; j++) {
        pair = pairs[j];
        if (!state.matched[pair.stat]) state.matched[pair.stat] = pair.question;
      }
      state.revealed = true;
      state.done = true;
      paintCols();
      paintExplain(hidesEl, 'Remaining matches shown. Each hide line is the point of the number.');
      ctx.status(
        container,
        'Revealed. You had matched ' + n + ' of ' + pairs.length + ' before the reveal.',
        'wrong'
      );
      fireComplete(onComplete, n, pairs.length);
      ctx.actions(container, [
        { label: 'Check', kind: 'primary', disabled: true, onClick: function () {} },
        { label: 'Reset', kind: 'ghost', onClick: doReset }
      ]);
    }

    function doCheck() {
      var n;
      if (state.done) return;
      n = matchedCount();
      if (n === pairs.length) {
        finishIfDone();
        return;
      }
      state.fails += 1;
      if (state.fails >= 2) {
        revealRemaining();
        return;
      }
      ctx.status(
        container,
        n + ' of ' + pairs.length + ' matched. Pair the rest, or Check again to see them.',
        'info'
      );
    }

    function doReset() {
      state.selectedStat = null;
      state.selectedQuestion = null;
      state.matched = {};
      state.fails = 0;
      state.done = false;
      state.revealed = false;
      state._statOrder = null;
      state._qOrder = null;
      paintExplain(hidesEl, '');
      paintExplain(explainEl, '');
      paintCols();
      ctx.status(container, 'Select a statistic, then the question it answers.', 'info');
      ctx.actions(container, [
        { label: 'Check', kind: 'primary', onClick: doCheck },
        { label: 'Reset', kind: 'ghost', onClick: doReset }
      ]);
    }

    paintCols();
    ctx.status(container, 'Select a statistic, then the question it answers.', 'info');
    ctx.actions(container, [
      { label: 'Check', kind: 'primary', onClick: doCheck },
      { label: 'Reset', kind: 'ghost', onClick: doReset }
    ]);
  }

  /* ------------------------------------------------------------------ */
  /* 15. gradeTheTool                                                    */
  /* ------------------------------------------------------------------ */

  function clampGrade(n) {
    var v = Number(n);
    if (v !== v) v = 50;
    v = Math.round(v / 5) * 5;
    if (v < 20) v = 20;
    if (v > 80) v = 80;
    return v;
  }

  function mountGradeTheTool(container, opts, onComplete, ctx) {
    var cases, root, toolEl, descEl, gaugeHost, ctrlBar, valueEl, explainEl, noteEl;
    var state, rangeEl;

    opts = opts && typeof opts === 'object' ? opts : {};
    cases = validCases(opts, 'cases');
    if (!cases.length) {
      setEmpty(container, 'This exercise is unavailable.', 'No tool grades were provided.');
      return;
    }

    state = {
      index: 0,
      value: 50,
      fails: 0,
      correct: 0,
      resolved: false,
      done: false
    };

    root = el('div');
    fullWidth(root);
    container.appendChild(root);
    toolEl = el('p');
    toolEl.style.fontWeight = '700';
    root.appendChild(toolEl);
    descEl = el('p');
    root.appendChild(descEl);
    noteEl = el('p', {
      class: 'hint',
      text: '50 is major-league average, not “average person” and not average for this age group. Each 10 points is about one standard deviation. Step by 5.'
    });
    root.appendChild(noteEl);
    gaugeHost = el('div');
    root.appendChild(gaugeHost);
    ctrlBar = flex(el('div'));
    root.appendChild(ctrlBar);
    valueEl = el('p', { class: 'hint' });
    root.appendChild(valueEl);
    explainEl = el('div');
    root.appendChild(explainEl);

    function current() {
      return cases[state.index];
    }

    function expectedGrade(c) {
      var g = Number(c && c.grade);
      if (g !== g) return 50;
      return g;
    }

    function toleranceOf(c) {
      var t = Number(c && c.tolerance);
      if (t !== t || t < 0) return 5;
      return t;
    }

    function drawGauge(compare) {
      var c = current();
      var optsG = {
        value: state.value,
        label: trimStr(c.tool) || 'Tool',
        title: '20–80 scouting scale'
      };
      if (typeof compare === 'number') optsG.compare = compare;
      renderSvg(gaugeHost, 'scaleGauge', optsG);
    }

    function paintControls() {
      var minus, plus, lab;
      ctrlBar.innerHTML = '';
      minus = el('button', { type: 'button', class: 'btn btn-sm btn-ghost', text: '−5' });
      minus.setAttribute('aria-label', 'Lower grade by 5');
      plus = el('button', { type: 'button', class: 'btn btn-sm btn-ghost', text: '+5' });
      plus.setAttribute('aria-label', 'Raise grade by 5');
      if (state.resolved || state.done) {
        minus.disabled = true;
        plus.disabled = true;
      }
      bindActivate(minus, function () {
        if (state.resolved || state.done) return;
        state.value = clampGrade(state.value - 5);
        syncRange();
        drawGauge();
        paintValue();
      });
      bindActivate(plus, function () {
        if (state.resolved || state.done) return;
        state.value = clampGrade(state.value + 5);
        syncRange();
        drawGauge();
        paintValue();
      });
      rangeEl = el('input', { type: 'range' });
      rangeEl.min = '20';
      rangeEl.max = '80';
      rangeEl.step = '5';
      rangeEl.value = String(state.value);
      rangeEl.setAttribute('aria-label', '20 to 80 scouting grade');
      rangeEl.style.flex = '1 1 12rem';
      rangeEl.style.minHeight = '44px';
      if (state.resolved || state.done) rangeEl.disabled = true;
      rangeEl.addEventListener('input', function () {
        if (state.resolved || state.done) return;
        state.value = clampGrade(rangeEl.value);
        drawGauge();
        paintValue();
      });
      lab = el('span', { text: String(state.value) });
      lab.style.fontWeight = '700';
      lab.style.minWidth = '2.5rem';
      ctrlBar.appendChild(minus);
      ctrlBar.appendChild(rangeEl);
      ctrlBar.appendChild(plus);
    }

    function syncRange() {
      if (rangeEl) rangeEl.value = String(state.value);
    }

    function paintValue() {
      valueEl.innerHTML = esc('Current grade: ' + state.value + '. 50 = MLB average.');
    }

    function goNext() {
      state.index += 1;
      state.value = 50;
      state.fails = 0;
      state.resolved = false;
      if (state.index >= cases.length) {
        state.done = true;
        ctx.status(container, 'Done. ' + state.correct + ' of ' + cases.length + ' grades within tolerance.', 'ok');
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
      var c, exp, tol, diff, expl;
      if (state.done) return;
      if (state.resolved) {
        goNext();
        return;
      }
      c = current();
      exp = expectedGrade(c);
      tol = toleranceOf(c);
      diff = Math.abs(state.value - exp);
      expl = trimStr(c.explain);
      if (diff <= tol) {
        state.correct += 1;
        state.resolved = true;
        paintControls();
        drawGauge(exp);
        paintExplain(explainEl, expl);
        ctx.status(
          container,
          'Within ' + tol + ' of ' + exp + '. ' + expl,
          'ok'
        );
        ctx.actions(container, [
          { label: nextCaseLabel(state.index, cases.length), kind: 'primary', onClick: doCheck },
          { label: 'Reset', kind: 'ghost', onClick: doReset }
        ]);
        return;
      }
      state.fails += 1;
      if (state.fails >= 2) {
        state.resolved = true;
        state.value = clampGrade(exp);
        paintControls();
        paintValue();
        drawGauge(exp);
        paintExplain(explainEl, expl);
        ctx.status(container, 'The grade is ' + exp + '. ' + expl, 'wrong');
        ctx.actions(container, [
          { label: nextCaseLabel(state.index, cases.length), kind: 'primary', onClick: doCheck },
          { label: 'Reset', kind: 'ghost', onClick: doReset }
        ]);
        return;
      }
      ctx.status(
        container,
        'Off by ' + diff + '. 50 is major-league average. Try a step of 5 either way.',
        'wrong'
      );
    }

    function doReset() {
      state.index = 0;
      state.value = 50;
      state.fails = 0;
      state.correct = 0;
      state.resolved = false;
      state.done = false;
      paintAll();
    }

    function paintAll() {
      var c = current();
      toolEl.innerHTML = esc(
        'Tool ' + (state.index + 1) + ' of ' + cases.length + '. ' + trimStr(c.tool)
      );
      descEl.innerHTML = esc(trimStr(c.description || promptOrSituation(c)));
      paintControls();
      paintValue();
      drawGauge();
      paintExplain(explainEl, '');
      ctx.status(container, 'Place the tool on the 20–80 scale, then Check.', 'info');
      ctx.actions(container, [
        { label: 'Check', kind: 'primary', onClick: doCheck },
        { label: 'Reset', kind: 'ghost', onClick: doReset }
      ]);
    }

    paintAll();
  }

  /* ------------------------------------------------------------------ */
  /* 16. spotTheAlignment                                                */
  /* ------------------------------------------------------------------ */

  function alignmentOptions(c) {
    var raw, i, out, id;
    raw = c && isArray(c.options) ? c.options : [];
    out = [];
    for (i = 0; i < raw.length; i++) {
      id = alignmentId(raw[i]);
      if (id) out.push(id);
    }
    return out;
  }

  function mountSpotTheAlignment(container, opts, onComplete, ctx) {
    var cases, root, sitEl, choiceBar, explainEl;
    var state;

    opts = opts && typeof opts === 'object' ? opts : {};
    cases = validCases(opts, 'cases');
    if (!cases.length) {
      setEmpty(container, 'This exercise is unavailable.', 'No alignment cases were provided.');
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
    sitEl = el('p');
    root.appendChild(sitEl);
    root.appendChild(el('p', {
      class: 'hint',
      text: 'Pick the alignment that matches the score, the inning, the outs, and the runners. The loudest shout from the dugout is sometimes wrong.'
    }));
    choiceBar = el('div');
    root.appendChild(choiceBar);
    explainEl = el('div');
    root.appendChild(explainEl);

    function current() {
      return cases[state.index];
    }

    function expected(c) {
      var optsA, idx;
      optsA = alignmentOptions(c);
      idx = resolveAnswerIndex(c.answer, c.options);
      if (idx >= 0 && c.options[idx] != null) return alignmentId(c.options[idx]);
      if (idx >= 0 && optsA[idx]) return optsA[idx];
      return alignmentId(c.answer);
    }

    function usePreview(c) {
      return !!(c && c.preview);
    }

    function paintChoices() {
      var c, optsA, i, id, btn, exp, isPicked, isRight, mini, preview;
      c = current();
      optsA = alignmentOptions(c);
      preview = usePreview(c);
      exp = expected(c);
      choiceBar.innerHTML = '';
      if (preview) {
        choiceBar.style.display = 'flex';
        choiceBar.style.flexWrap = 'wrap';
        choiceBar.style.gap = '0.5rem';
      } else {
        columnStack(choiceBar);
      }
      for (i = 0; i < optsA.length; i++) {
        id = optsA[i];
        isPicked = state.picked === id;
        isRight = id === exp;
        btn = el('button', { type: 'button' });
        btn.className = 'choice-btn' +
          (isPicked ? ' selected' : '') +
          (state.resolved && isRight ? ' correct' : '') +
          (isPicked && !isRight && state.fails ? ' wrong' : '');
        btn.setAttribute('aria-label', alignmentLabel(id));
        setPressed(btn, isPicked);
        if (preview) {
          btn.style.flex = '1 1 12rem';
          btn.style.flexDirection = 'column';
          btn.style.alignItems = 'stretch';
          mini = el('div');
          mini.style.pointerEvents = 'none';
          mini.style.width = '100%';
          btn.appendChild(el('span', { text: alignmentLabel(id) }));
          btn.appendChild(mini);
          renderSvg(mini, 'field', {
            positions: true,
            alignment: id,
            width: 220,
            title: alignmentLabel(id)
          });
        } else {
          btn.appendChild(document.createTextNode(alignmentLabel(id)));
        }
        if (state.resolved || state.done) btn.disabled = true;
        (function (choice) {
          bindActivate(btn, function () {
            if (state.resolved || state.done) return;
            state.picked = choice;
            paintChoices();
          });
        }(id));
        choiceBar.appendChild(btn);
      }
    }

    function goNext() {
      state.index += 1;
      state.picked = null;
      state.fails = 0;
      state.resolved = false;
      if (state.index >= cases.length) {
        state.done = true;
        ctx.status(container, 'Done. ' + state.correct + ' of ' + cases.length + ' alignments correct.', 'ok');
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
      var c, exp, expl;
      if (state.done) return;
      if (state.resolved) {
        goNext();
        return;
      }
      c = current();
      if (!state.picked) {
        ctx.status(container, 'Pick an alignment first.', 'info');
        return;
      }
      exp = expected(c);
      expl = trimStr(c.explain);
      if (state.picked === exp) {
        state.correct += 1;
        state.resolved = true;
        paintChoices();
        paintExplain(explainEl, expl);
        ctx.status(container, 'Correct. ' + expl, 'ok');
        ctx.actions(container, [
          { label: nextCaseLabel(state.index, cases.length), kind: 'primary', onClick: doCheck },
          { label: 'Reset', kind: 'ghost', onClick: doReset }
        ]);
        return;
      }
      state.fails += 1;
      paintChoices();
      if (state.fails >= 2) {
        state.resolved = true;
        paintChoices();
        paintExplain(explainEl, expl);
        ctx.status(container, 'The look is ' + alignmentLabel(exp) + '. ' + expl, 'wrong');
        ctx.actions(container, [
          { label: nextCaseLabel(state.index, cases.length), kind: 'primary', onClick: doCheck },
          { label: 'Reset', kind: 'ghost', onClick: doReset }
        ]);
        return;
      }
      ctx.status(container, 'Not that look. The obvious shout is sometimes the wrong one.', 'wrong');
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
      var c = current();
      sitEl.innerHTML = esc(
        'Situation ' + (state.index + 1) + ' of ' + cases.length + '. ' +
        trimStr(c.situation || promptOrSituation(c))
      );
      paintChoices();
      paintExplain(explainEl, '');
      ctx.status(container, 'Pick the alignment, then Check.', 'info');
      ctx.actions(container, [
        { label: 'Check', kind: 'primary', onClick: doCheck },
        { label: 'Reset', kind: 'ghost', onClick: doReset }
      ]);
    }

    paintAll();
  }

  /* ------------------------------------------------------------------ */
  /* Register sixteen widgets                                            */
  /* ------------------------------------------------------------------ */

  register('labelTheField', { mount: mountLabelTheField });
  register('placeThePositions', { mount: mountPlaceThePositions });
  register('strikeZoneTrainer', { mount: mountStrikeZoneTrainer });
  register('countBuilder', { mount: mountCountBuilder });
  register('safeOrOut', { mount: mountSafeOrOut });
  register('runnerAdvance', { mount: mountRunnerAdvance });
  register('swingOrder', { mount: mountSwingOrder });
  register('armCareCheck', { mount: mountArmCareCheck });
  register('assignTheNine', { mount: mountAssignTheNine });
  register('stealRead', { mount: mountStealRead });
  register('makeTheCall', { mount: mountMakeTheCall });
  register('sequencePitches', { mount: mountSequencePitches });
  register('scoreThePlay', { mount: mountScoreThePlay });
  register('statMatch', { mount: mountStatMatch });
  register('gradeTheTool', { mount: mountGradeTheTool });
  register('spotTheAlignment', { mount: mountSpotTheAlignment });

  return {
    widgets: widgets,
    register: register,
    has: has,
    names: names,
    mount: mount
  };
}());
