/* ===================================================================
   Homerun Learn to Play — learn.js
   Path view, chapter reader, and glossary.
   ES5-safe (var, function, string concatenation). Browser-only.
   =================================================================== */

window.HRL_LEARN = (function () {
  'use strict';

  var LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var OBJ_PREFIXES = [
    'after this chapter you will be able to ',
    'after this chapter, you can ',
    'after this chapter you can '
  ];
  var PROPER_START = {
    little: 1,
    baseball: 1,
    canada: 1,
    homerun: 1,
    ottawa: 1,
    pitch: 1,
    major: 1,
    majors: 1,
    official: 1,
    world: 1,
    national: 1,
    american: 1,
    roots: 1,
    soll: 1,
    mlb: 1
  };

  var chapterFill = null;
  var chapterBar = null;
  var chapterSections = [];
  var chapterSeen = {};
  var chapterIO = null;
  var chapterScrollFn = null;
  var viewListenerBound = false;

  /* ------------------------------------------------------------------ */
  /* Helpers                                                             */
  /* ------------------------------------------------------------------ */

  function isArray(x) {
    return Object.prototype.toString.call(x) === '[object Array]';
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

  function asList(v) {
    if (v == null || v === '') return [];
    if (isArray(v)) return v;
    return [v];
  }

  function hasDoc() {
    return typeof document !== 'undefined' && document;
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    var k, val, i;
    if (attrs) {
      for (k in attrs) {
        if (!Object.prototype.hasOwnProperty.call(attrs, k)) continue;
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
          k === 'href' ||
          k === 'name' ||
          k === 'placeholder' ||
          k === 'tabindex' ||
          k === 'scope' ||
          k === 'alt' ||
          k === 'src' ||
          k === 'title'
        ) {
          node.setAttribute(k, val);
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

  function emptyStateEl(title, blurb) {
    var wrap = el('div', { class: 'empty-state' });
    if (title) {
      wrap.appendChild(el('p', {}, [el('strong', { text: safeText(title) })]));
    }
    if (blurb) wrap.appendChild(el('p', { text: safeText(blurb) }));
    return wrap;
  }

  function setEmpty(rootEl, title, blurb) {
    if (!rootEl) return;
    rootEl.innerHTML = '';
    rootEl.appendChild(emptyStateEl(title, blurb));
  }

  function curriculum() {
    return window.HRL_CURRICULUM || null;
  }

  function progressApi() {
    return window.HRL_PROGRESS || null;
  }

  function shell() {
    return window.HRL_SHELL || null;
  }

  function allTiers() {
    var cur = curriculum();
    if (!cur || !isArray(cur.tiers)) return [];
    return cur.tiers;
  }

  function getTier(key) {
    var cur = curriculum();
    var i, t, list;
    if (cur && typeof cur.getTier === 'function') return cur.getTier(key);
    list = allTiers();
    for (i = 0; i < list.length; i++) {
      t = list[i];
      if (t && t.key === key) return t;
    }
    return null;
  }

  function getChapter(id) {
    var cur = curriculum();
    var i, list;
    if (!cur) return null;
    if (typeof cur.getChapter === 'function') return cur.getChapter(id);
    list = isArray(cur.chapters) ? cur.chapters : [];
    for (i = 0; i < list.length; i++) {
      if (list[i] && list[i].id === id) return list[i];
    }
    return null;
  }

  function chaptersInTier(key) {
    var cur = curriculum();
    var out, i, list, ch;
    if (cur && typeof cur.chaptersInTier === 'function') return cur.chaptersInTier(key);
    out = [];
    list = cur && isArray(cur.chapters) ? cur.chapters : [];
    for (i = 0; i < list.length; i++) {
      ch = list[i];
      if (ch && ch.tier === key) out.push(ch);
    }
    return out;
  }

  function totalChapterCount() {
    var cur = curriculum();
    if (cur && typeof cur.totalChapters === 'function') return cur.totalChapters();
    if (cur && isArray(cur.chapters)) return cur.chapters.length;
    return 24;
  }

  function placementDone() {
    var P = progressApi();
    var p;
    if (!P || typeof P.getPlacement !== 'function') return false;
    p = P.getPlacement();
    return !!(p && p.done);
  }

  function recommendedTierOrder() {
    var P = progressApi();
    var p, n;
    if (!P || typeof P.getPlacement !== 'function') return 1;
    p = P.getPlacement();
    if (!p || !p.done) return 1;
    n = Number(p.recommendedTier);
    if (!n || n < 1) return 1;
    return n;
  }

  function nextChapterId() {
    var P = progressApi();
    if (!P || typeof P.nextChapter !== 'function') return null;
    return P.nextChapter();
  }

  function chapterRecord(id) {
    var P = progressApi();
    if (!P || typeof P.getChapter !== 'function') {
      return { visited: false, completed: false, bestScore: 0 };
    }
    return P.getChapter(id) || { visited: false, completed: false, bestScore: 0 };
  }

  function hasChapterBadge(id) {
    var P = progressApi();
    if (!P || typeof P.hasBadge !== 'function') return false;
    return !!P.hasBadge('chapter-' + id);
  }

  function badgeCount() {
    var P = progressApi();
    var list;
    if (!P || typeof P.badges !== 'function') return 0;
    list = P.badges();
    return isArray(list) ? list.length : 0;
  }

  function toast(message, kind) {
    var S = shell();
    if (S && typeof S.toast === 'function') S.toast(message, kind || 'info');
  }

  function prefersReducedMotion() {
    if (hasDoc() && document.body && document.body.classList.contains('reduced-motion')) {
      return true;
    }
    try {
      return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    } catch (e) {
      return false;
    }
  }

  function clampPct(n) {
    n = Math.round(Number(n) || 0);
    if (n !== n) n = 0;
    if (n < 0) n = 0;
    if (n > 100) n = 100;
    return n;
  }

  function makeProgressBar(pct, label) {
    var n = clampPct(pct);
    var bar = el('div', { class: 'progress-bar', role: 'progressbar' });
    var fill = el('span', { class: 'progress-bar-fill' });
    bar.setAttribute('aria-valuemin', '0');
    bar.setAttribute('aria-valuemax', '100');
    bar.setAttribute('aria-valuenow', String(n));
    if (label) bar.setAttribute('aria-label', label);
    fill.style.width = n + '%';
    if (prefersReducedMotion()) fill.style.transition = 'none';
    bar.appendChild(fill);
    return { bar: bar, fill: fill };
  }

  function ringSvg(pct) {
    var r = 18;
    var c = 2 * Math.PI * r;
    var n = clampPct(pct);
    var dash = (n / 100) * c;
    return '<svg viewBox="0 0 48 48" width="48" height="48" focusable="false">' +
      '<circle cx="24" cy="24" r="18" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="4"></circle>' +
      '<circle cx="24" cy="24" r="18" fill="none" stroke="#ffffff" stroke-width="4" stroke-dasharray="' +
      dash.toFixed(2) + ' ' + c.toFixed(2) + '" stroke-linecap="round"></circle></svg>';
  }

  function svgMarkup(name, opts) {
    var SVG = window.HRL_SVG;
    var fn, out;
    if (!name || !SVG) return '';
    fn = SVG[name];
    if (typeof fn !== 'function') return '';
    try {
      out = fn(opts || {});
    } catch (e) {
      return '';
    }
    if (typeof out !== 'string') return '';
    return out;
  }

  function knownSvg(name) {
    var SVG = window.HRL_SVG;
    var i, builders;
    if (!name || !SVG) return false;
    if (typeof SVG[name] === 'function') return true;
    builders = SVG.BUILDERS;
    if (isArray(builders)) {
      for (i = 0; i < builders.length; i++) {
        if (builders[i] === name) return typeof SVG[name] === 'function';
      }
    }
    return false;
  }

  function widgetAvailable(name) {
    var I = window.HRL_INTERACTIVE;
    var entry;
    if (!I || !name) return false;
    if (typeof I.has === 'function') {
      try {
        return !!I.has(name);
      } catch (e) {
        return false;
      }
    }
    if (I.widgets && I.widgets[name]) {
      entry = I.widgets[name];
      if (typeof entry === 'function') return true;
      if (entry && typeof entry.mount === 'function') return true;
    }
    return typeof I.mount === 'function';
  }

  function mountWidget(name, container, opts, onComplete) {
    var I = window.HRL_INTERACTIVE;
    var result;
    if (!widgetAvailable(name) || !I || typeof I.mount !== 'function') return false;
    try {
      result = I.mount(name, container, opts || {}, onComplete);
      if (result === false) return false;
      return true;
    } catch (e) {
      return false;
    }
  }

  function firstWord(s) {
    var i, c, out;
    out = '';
    for (i = 0; i < s.length; i++) {
      c = s.charAt(i);
      if (
        (c >= 'A' && c <= 'Z') ||
        (c >= 'a' && c <= 'z') ||
        (c >= '0' && c <= '9') ||
        c === '-' ||
        c === "'"
      ) {
        out += c;
      } else if (out) {
        break;
      }
    }
    return out;
  }

  function isAcronymOrProper(rest) {
    var word, i, c, letters, allCaps;
    word = firstWord(rest);
    if (!word) return false;
    if (PROPER_START[word.toLowerCase()]) return true;
    letters = 0;
    allCaps = true;
    for (i = 0; i < word.length; i++) {
      c = word.charAt(i);
      if (c >= 'a' && c <= 'z') allCaps = false;
      if ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z')) letters += 1;
    }
    return allCaps && letters >= 2;
  }

  function decapObjective(rest) {
    var first;
    rest = trimStr(rest);
    if (!rest) return rest;
    first = rest.charAt(0);
    if (first < 'A' || first > 'Z') return rest;
    if (isAcronymOrProper(rest)) return rest;
    return first.toLowerCase() + rest.substring(1);
  }

  function stripObjective(raw) {
    var s = safeText(raw);
    var lower = s.toLowerCase();
    var i, prefix;
    for (i = 0; i < OBJ_PREFIXES.length; i++) {
      prefix = OBJ_PREFIXES[i];
      if (lower.indexOf(prefix) === 0) {
        return decapObjective(s.substring(prefix.length));
      }
    }
    return s;
  }

  function letterOf(term) {
    var ch = safeText(term).charAt(0).toUpperCase();
    if (ch >= 'A' && ch <= 'Z') return ch;
    return '#';
  }

  function allGlossaryTerms() {
    var G = window.HRL_GLOSSARY;
    if (!G) return [];
    if (typeof G.all === 'function') return G.all() || [];
    if (isArray(G.terms)) return G.terms.slice();
    return [];
  }

  function termBySlug(slug) {
    var G = window.HRL_GLOSSARY;
    var i, list;
    if (!G || slug == null || slug === '') return null;
    if (typeof G.bySlug === 'function') return G.bySlug(String(slug)) || null;
    list = allGlossaryTerms();
    for (i = 0; i < list.length; i++) {
      if (list[i] && list[i].slug === slug) return list[i];
    }
    return null;
  }

  function termMatches(entry, q) {
    var i, aliases;
    if (!q) return true;
    if (!entry) return false;
    if (safeText(entry.term).toLowerCase().indexOf(q) !== -1) return true;
    if (safeText(entry.definition).toLowerCase().indexOf(q) !== -1) return true;
    aliases = isArray(entry.aliases) ? entry.aliases : [];
    for (i = 0; i < aliases.length; i++) {
      if (safeText(aliases[i]).toLowerCase().indexOf(q) !== -1) return true;
    }
    return false;
  }

  function uniqueIds(list) {
    var out = [];
    var seen = {};
    var i, id;
    for (i = 0; i < list.length; i++) {
      id = safeText(list[i]);
      if (!id || seen[id]) continue;
      seen[id] = true;
      out.push(id);
    }
    return out;
  }

  function termChapterIds(entry) {
    var out = [];
    var i;
    if (!entry) return out;
    if (isArray(entry.chapters)) {
      for (i = 0; i < entry.chapters.length; i++) {
        if (entry.chapters[i]) out.push(entry.chapters[i]);
      }
    }
    if (isArray(entry.chapter)) {
      for (i = 0; i < entry.chapter.length; i++) {
        if (entry.chapter[i]) out.push(entry.chapter[i]);
      }
    } else if (entry.chapter) {
      out.push(entry.chapter);
    }
    return uniqueIds(out);
  }

  function openChapter(id) {
    var S = shell();
    if (S && typeof S.openChapter === 'function') {
      S.openChapter(id);
      return;
    }
    renderChapter(id);
  }

  function openQuiz(id) {
    var S = shell();
    if (S && typeof S.openQuiz === 'function') {
      S.openQuiz(id);
      return;
    }
  }

  function showPath() {
    var S = shell();
    if (S && typeof S.showView === 'function') S.showView('path');
  }

  function rerunPlacement() {
    var P = window.HRL_PLACEMENT;
    var S = shell();
    if (P && typeof P.start === 'function') {
      P.start({
        skippable: true,
        onComplete: function () {
          renderPath();
          if (S && typeof S.renderHome === 'function') S.renderHome();
        }
      });
      return;
    }
    toast('Placement will be available once that module has loaded.', 'info');
  }

  function setTierOpen(accordion, head, open) {
    if (!accordion || !head) return;
    if (open) {
      accordion.classList.add('open');
      head.classList.add('open');
      head.setAttribute('aria-expanded', 'true');
    } else {
      accordion.classList.remove('open');
      head.classList.remove('open');
      head.setAttribute('aria-expanded', 'false');
    }
  }

  /* ------------------------------------------------------------------ */
  /* Path                                                                */
  /* ------------------------------------------------------------------ */

  function renderPath() {
    var rootEl;
    var tiers;
    var recId;
    var recCh;
    var recTierKey;
    var recOrder;
    var openKey;
    var ov;
    var P;
    var i, t, placed;
    var summary, bar, badgesEl, rosette, rerun, list;
    var completeText, badgeText;
    if (!hasDoc()) return;
    rootEl = document.getElementById('path-root');
    if (!rootEl) return;
    rootEl.innerHTML = '';

    tiers = allTiers();
    if (!tiers.length) {
      setEmpty(rootEl, 'My Path is not ready yet.', 'The chapter list will appear here once the curriculum has loaded.');
      return;
    }

    P = progressApi();
    recId = nextChapterId();
    recCh = recId ? getChapter(recId) : null;
    recTierKey = recCh && recCh.tier ? recCh.tier : 'rookie';
    recOrder = recommendedTierOrder();
    placed = placementDone();
    openKey = placed ? recTierKey : 'rookie';
    if (!placed) openKey = 'rookie';

    ov = P && typeof P.overallProgress === 'function'
      ? P.overallProgress()
      : { total: totalChapterCount(), complete: 0, pct: 0 };

    summary = el('div', { class: 'card path-summary' });
    completeText = ov.complete + ' of ' + ov.total + ' chapters complete';
    summary.appendChild(el('p', {}, [el('strong', { text: completeText })]));
    bar = makeProgressBar(ov.pct, completeText);
    summary.appendChild(bar.bar);

    badgesEl = el('p', { class: 'path-badges' });
    rosette = el('span', { class: 'badge-rosette', text: String(badgeCount()) });
    rosette.setAttribute('aria-hidden', 'true');
    badgeText = badgeCount() === 1 ? '1 badge earned' : badgeCount() + ' badges earned';
    badgesEl.appendChild(rosette);
    badgesEl.appendChild(el('span', { text: badgeText }));
    badgesEl.style.display = 'flex';
    badgesEl.style.alignItems = 'center';
    badgesEl.style.gap = '0.75rem';
    badgesEl.style.marginTop = '0.75rem';
    summary.appendChild(badgesEl);

    if (placed) {
      rerun = el('a', { href: '#view-path', text: 'Re-run placement' });
      rerun.addEventListener('click', function (e) {
        if (e.preventDefault) e.preventDefault();
        rerunPlacement();
      });
      summary.appendChild(el('p', {}, [rerun]));
    }

    rootEl.appendChild(summary);

    list = el('div', { class: 'path-tiers' });
    for (i = 0; i < tiers.length; i++) {
      t = tiers[i];
      if (!t || !t.key) continue;
      list.appendChild(renderTierAccordion(t, {
        openKey: openKey,
        recId: recId,
        recOrder: recOrder,
        placed: placed
      }));
    }
    rootEl.appendChild(list);
  }

  function renderTierAccordion(tier, ctx) {
    var accordion;
    var head;
    var body;
    var grid;
    var chapters;
    var prog;
    var P = progressApi();
    var i, ch, ahead, countText, ring, copy, nameEl, blurbEl, countEl, aheadEl;
    var bodyId, headId, tierOrder, open;

    chapters = chaptersInTier(tier.key);
    prog = P && typeof P.tierProgress === 'function'
      ? P.tierProgress(tier.key)
      : { total: chapters.length, complete: 0, pct: 0 };
    tierOrder = typeof tier.order === 'number' ? tier.order : 0;
    ahead = !!(ctx.placed && tierOrder && tierOrder > ctx.recOrder);
    open = tier.key === ctx.openKey;

    bodyId = 'tier-body-' + tier.key;
    headId = 'tier-head-' + tier.key;

    accordion = el('div', {
      class: 'tier-accordion' + (ahead ? ' tier-ahead' : ''),
      id: 'tier-' + tier.key,
      'data-tier': tier.key
    });
    if (ahead) accordion.style.opacity = '0.78';

    head = el('button', {
      type: 'button',
      class: 'tier-head tier-' + tier.key,
      id: headId
    });
    head.setAttribute('aria-expanded', open ? 'true' : 'false');
    head.setAttribute('aria-controls', bodyId);

    ring = el('span', { class: 'tier-ring', html: ringSvg(prog.pct) });
    ring.setAttribute('aria-hidden', 'true');
    head.appendChild(ring);

    copy = el('span', { class: 'tier-head-main' });
    copy.style.flex = '1 1 12rem';
    copy.style.minWidth = '0';
    copy.style.display = 'flex';
    copy.style.flexDirection = 'column';
    copy.style.alignItems = 'flex-start';
    copy.style.gap = '0.15rem';
    nameEl = el('span', { class: 'tier-head-name', text: safeText(tier.name || tier.key) });
    nameEl.style.fontWeight = '700';
    copy.appendChild(nameEl);
    if (safeText(tier.blurb)) {
      blurbEl = el('span', { class: 'tier-head-blurb', text: safeText(tier.blurb) });
      blurbEl.style.fontWeight = '400';
      blurbEl.style.fontSize = '0.82rem';
      blurbEl.style.opacity = '0.92';
      copy.appendChild(blurbEl);
    }
    countText = prog.complete + ' of ' + prog.total + ' chapters';
    countEl = el('span', { class: 'tier-head-count', text: countText });
    countEl.style.fontWeight = '400';
    countEl.style.fontSize = '0.82rem';
    copy.appendChild(countEl);
    if (ahead) {
      aheadEl = el('span', { class: 'tier-head-ahead', text: 'ahead of your starting point' });
      aheadEl.style.fontWeight = '400';
      aheadEl.style.fontSize = '0.75rem';
      aheadEl.style.opacity = '0.9';
      copy.appendChild(aheadEl);
    }
    head.appendChild(copy);

    body = el('div', { class: 'tier-body', id: bodyId });
    grid = el('div', { class: 'chapter-grid' });
    for (i = 0; i < chapters.length; i++) {
      ch = chapters[i];
      if (!ch || !ch.id) continue;
      grid.appendChild(renderChapterCard(ch, ctx.recId, tier.key));
    }
    body.appendChild(grid);

    setTierOpen(accordion, head, open);

    head.addEventListener('click', function () {
      var isOpen = head.getAttribute('aria-expanded') === 'true';
      setTierOpen(accordion, head, !isOpen);
    });
    head.addEventListener('keydown', function (e) {
      onTierHeadKey(e, head);
    });

    accordion.appendChild(head);
    accordion.appendChild(body);
    return accordion;
  }

  function onTierHeadKey(e, head) {
    var key = e.key || e.keyCode;
    var heads, idx, next;
    var rootEl = document.getElementById('path-root');
    if (!rootEl) return;
    heads = rootEl.querySelectorAll('.tier-head');
    idx = -1;
    for (var i = 0; i < heads.length; i++) {
      if (heads[i] === head) idx = i;
    }
    if (idx === -1) return;
    if (key === 'ArrowDown' || key === 'ArrowRight' || key === 40 || key === 39) {
      if (e.preventDefault) e.preventDefault();
      next = heads[idx + 1] || heads[0];
      if (next) next.focus();
    } else if (key === 'ArrowUp' || key === 'ArrowLeft' || key === 38 || key === 37) {
      if (e.preventDefault) e.preventDefault();
      next = heads[idx - 1] || heads[heads.length - 1];
      if (next) next.focus();
    } else if (key === 'Home' || key === 36) {
      if (e.preventDefault) e.preventDefault();
      if (heads[0]) heads[0].focus();
    } else if (key === 'End' || key === 35) {
      if (e.preventDefault) e.preventDefault();
      if (heads[heads.length - 1]) heads[heads.length - 1].focus();
    }
  }

  function renderChapterCard(ch, recId, tierKey) {
    var rec = chapterRecord(ch.id);
    var complete = !!(rec && rec.completed);
    var visited = !!(rec && rec.visited) && !complete;
    var recommended = recId && recId === ch.id;
    var cls = 'chapter-card';
    var btn, meta, num, title, sub, mins, pill, badge, score;
    var label;

    if (complete) cls += ' complete';
    if (visited) cls += ' visited';
    if (recommended) cls += ' recommended';

    btn = el('button', { type: 'button', class: cls });
    btn.setAttribute('data-chapter', ch.id);
    if (recommended) btn.setAttribute('aria-current', 'true');

    num = 'Chapter ' + (typeof ch.order === 'number' ? ch.order : '');
    title = safeText(ch.title) || ch.id;
    btn.appendChild(el('span', { class: 'chapter-card-num', text: trimStr(num) }));
    btn.appendChild(el('strong', { class: 'chapter-card-title', text: title }));
    if (safeText(ch.subtitle)) {
      sub = el('span', { class: 'chapter-card-sub', text: safeText(ch.subtitle) });
      sub.style.fontWeight = '400';
      sub.style.color = 'var(--color-muted)';
      sub.style.fontSize = '0.82rem';
      btn.appendChild(sub);
    }

    meta = el('span', { class: 'chapter-card-meta' });
    if (typeof ch.minutes === 'number' && ch.minutes > 0) {
      mins = ch.minutes === 1 ? '1 min' : ch.minutes + ' min';
      meta.appendChild(el('span', { text: mins }));
    }
    if (recommended) {
      meta.appendChild(el('span', { text: 'Up next' }));
    }
    if (complete) {
      score = clampPct(rec && rec.bestScore);
      pill = el('span', { class: 'score-pill', text: score + '%' });
      meta.appendChild(pill);
    }
    if (hasChapterBadge(ch.id)) {
      badge = el('span', {
        class: 'chapter-badge' + (tierKey ? ' tier-' + tierKey : ''),
        text: 'Badge'
      });
      meta.appendChild(badge);
    }
    btn.appendChild(meta);

    label = title;
    if (complete) label += ', complete, best score ' + clampPct(rec.bestScore) + ' percent';
    else if (visited) label += ', started';
    if (recommended) label += ', recommended next';
    btn.setAttribute('aria-label', label);

    btn.addEventListener('click', function () {
      openChapter(ch.id);
    });
    return btn;
  }

  function scrollToTier(tierKey) {
    var viewEl, target, head;
    if (!hasDoc() || !tierKey) return;
    if (!document.getElementById('path-root') || !document.querySelector('#path-root [data-tier]')) {
      renderPath();
    }
    viewEl = document.getElementById('view-path') || document.getElementById('path-root');
    if (!viewEl) return;
    target = viewEl.querySelector('[data-tier="' + String(tierKey).replace(/"/g, '') + '"]');
    if (!target) return;
    head = target.querySelector('.tier-head');
    setTierOpen(target, head, true);
    if (typeof target.scrollIntoView === 'function') target.scrollIntoView(true);
  }

  /* ------------------------------------------------------------------ */
  /* Chapter reader                                                      */
  /* ------------------------------------------------------------------ */

  function teardownChapterProgress() {
    if (chapterIO && typeof chapterIO.disconnect === 'function') {
      try { chapterIO.disconnect(); } catch (e) {}
    }
    chapterIO = null;
    if (chapterScrollFn && typeof window !== 'undefined') {
      window.removeEventListener('scroll', chapterScrollFn, false);
      if (hasDoc() && document.getElementById('app-main')) {
        document.getElementById('app-main').removeEventListener('scroll', chapterScrollFn, false);
      }
    }
    chapterScrollFn = null;
    chapterFill = null;
    chapterBar = null;
    chapterSections = [];
    chapterSeen = {};
  }

  function updateChapterBar() {
    var total = chapterSections.length;
    var n = 0;
    var i, pct;
    if (!chapterFill || !chapterBar) return;
    for (i = 0; i < total; i++) {
      if (chapterSeen[i]) n += 1;
    }
    pct = total ? clampPct((n / total) * 100) : 0;
    if (prefersReducedMotion()) chapterFill.style.transition = 'none';
    chapterFill.style.width = pct + '%';
    chapterBar.setAttribute('aria-valuenow', String(pct));
  }

  function markSectionSeen(idx) {
    chapterSeen[idx] = true;
    updateChapterBar();
  }

  function sectionInView(node) {
    var rect;
    if (!node || typeof node.getBoundingClientRect !== 'function') return false;
    rect = node.getBoundingClientRect();
    return rect.top < (window.innerHeight || 800) * 0.8 && rect.bottom > 80;
  }

  function syncSeenFromViewport() {
    var i, node;
    for (i = 0; i < chapterSections.length; i++) {
      node = chapterSections[i];
      if (sectionInView(node)) markSectionSeen(i);
    }
  }

  function setupChapterProgress(nodes) {
    var i;
    teardownChapterProgress();
    chapterSections = nodes || [];
    chapterSeen = {};
    if (!chapterSections.length) {
      updateChapterBar();
      return;
    }
    syncSeenFromViewport();
    if (typeof window !== 'undefined' && typeof window.IntersectionObserver === 'function') {
      chapterIO = new window.IntersectionObserver(function (entries) {
        var j, entry, idx, raw;
        for (j = 0; j < entries.length; j++) {
          entry = entries[j];
          if (!entry || !entry.isIntersecting || !entry.target) continue;
          raw = entry.target.getAttribute('data-sec');
          idx = parseInt(raw, 10);
          if (idx === idx) markSectionSeen(idx);
        }
      }, { threshold: 0.25, root: null });
      for (i = 0; i < chapterSections.length; i++) {
        chapterIO.observe(chapterSections[i]);
      }
    } else {
      chapterScrollFn = function () {
        syncSeenFromViewport();
      };
      window.addEventListener('scroll', chapterScrollFn, false);
      if (hasDoc() && document.getElementById('app-main')) {
        document.getElementById('app-main').addEventListener('scroll', chapterScrollFn, false);
      }
    }
  }

  function ensureViewListener() {
    var S = shell();
    if (viewListenerBound) return;
    if (!S || typeof S.on !== 'function') return;
    viewListenerBound = true;
    S.on('viewchange', function (payload) {
      if (payload && payload.view !== 'chapter') teardownChapterProgress();
    });
  }

  function mountHero(container, tier, chapter) {
    var img, fallback, markup, alt;
    if (!container || !tier) return;
    fallback = tier.heroFallback || null;
    alt = safeText((tier.name || '') + ' illustration');
    if (safeText(tier.heroImage)) {
      img = el('img', {
        class: 'chapter-hero-img',
        src: safeText(tier.heroImage),
        alt: alt || safeText(chapter && chapter.title)
      });
      img.style.width = '100%';
      img.style.height = 'auto';
      img.style.display = 'block';
      img.style.borderRadius = '10px';
      img.onerror = function () {
        var svg = fallback && fallback.svg
          ? svgMarkup(fallback.svg, fallback.opts || {})
          : '';
        container.innerHTML = '';
        if (svg) {
          container.className = 'chapter-hero section-diagram';
          container.innerHTML = svg;
        }
      };
      container.appendChild(img);
      return;
    }
    markup = fallback && fallback.svg ? svgMarkup(fallback.svg, fallback.opts || {}) : '';
    if (markup) {
      container.className = 'chapter-hero section-diagram';
      container.innerHTML = markup;
    }
  }

  function sectionWrap(idx, type) {
    var node = el('section', { class: 'section' });
    node.setAttribute('data-sec', String(idx));
    node.setAttribute('data-type', type);
    return node;
  }

  function appendHeading(parent, heading) {
    var t = safeText(heading);
    if (!t) return;
    parent.appendChild(el('h4', { class: 'section-heading', text: t }));
  }

  function appendParas(parent, body, pClass) {
    var list = asList(body);
    var i, t, p;
    for (i = 0; i < list.length; i++) {
      t = safeText(list[i]);
      if (!t) continue;
      p = el('p', { text: t });
      if (pClass) p.className = pClass;
      parent.appendChild(p);
    }
  }

  function renderProse(section, idx) {
    var wrap = sectionWrap(idx, 'prose');
    appendHeading(wrap, section.heading);
    appendParas(wrap, section.body, 'section-prose');
    return wrap.firstChild ? wrap : null;
  }

  function renderDiagram(section, idx) {
    var wrap = sectionWrap(idx, 'diagram');
    var box, caption, markup, name;
    appendHeading(wrap, section.heading);
    name = safeText(section.svg);
    box = el('div', { class: 'section-diagram' });
    if (!name || !knownSvg(name) || typeof (window.HRL_SVG && window.HRL_SVG[name]) !== 'function') {
      box.appendChild(emptyStateEl(
        'Diagram unavailable.',
        'This picture is missing from the drawing library.'
      ));
    } else {
      markup = svgMarkup(name, section.opts || {});
      if (!markup) {
        box.appendChild(emptyStateEl(
          'Diagram unavailable.',
          'This picture could not be drawn.'
        ));
      } else {
        box.innerHTML = markup;
      }
    }
    wrap.appendChild(box);
    caption = safeText(section.caption);
    if (caption) wrap.appendChild(el('p', { class: 'diagram-caption', text: caption }));
    return wrap;
  }

  function renderKeypoints(section, idx) {
    var wrap = sectionWrap(idx, 'keypoints');
    var list, items, i, t;
    appendHeading(wrap, section.heading);
    list = el('ul', { class: 'keypoints' });
    items = asList(section.items);
    for (i = 0; i < items.length; i++) {
      t = typeof items[i] === 'object' && items[i]
        ? safeText(items[i].text || items[i].title || items[i].body)
        : safeText(items[i]);
      if (!t) continue;
      list.appendChild(el('li', { text: t }));
    }
    wrap.appendChild(list);
    return wrap;
  }

  function renderInteractive(section, idx) {
    var wrap = sectionWrap(idx, 'interactive');
    var widget, head, body, intro, mount, ok, name;
    name = safeText(section.widget);
    appendHeading(wrap, section.heading);
    widget = el('div', { class: 'widget' });
    if (safeText(section.heading)) {
      head = el('div', { class: 'widget-head', text: safeText(section.heading) });
      widget.appendChild(head);
    }
    body = el('div', { class: 'widget-body' });
    intro = safeText(section.intro);
    if (intro) body.appendChild(el('p', { text: intro }));
    mount = el('div', { class: 'widget-mount' });
    body.appendChild(mount);
    widget.appendChild(body);
    wrap.appendChild(widget);

    ok = mountWidget(name, mount, section.opts || {}, function () {
      markSectionSeen(idx);
    });
    if (!ok) {
      mount.innerHTML = '';
      mount.appendChild(emptyStateEl(
        'This activity is not available yet.',
        'You can keep reading and come back to try it later.'
      ));
    }
    return wrap;
  }

  function renderExample(section, idx) {
    var wrap = sectionWrap(idx, 'example');
    var box = el('div', { class: 'example-box' });
    if (safeText(section.heading)) box.appendChild(el('h4', { text: safeText(section.heading) }));
    appendParas(box, section.body);
    wrap.appendChild(box);
    return wrap;
  }

  function renderCoachnote(section, idx) {
    var wrap = sectionWrap(idx, 'coachnote');
    var box = el('div', { class: 'coachnote' });
    if (safeText(section.heading)) box.appendChild(el('h4', { text: safeText(section.heading) }));
    appendParas(box, section.body);
    wrap.appendChild(box);
    return wrap;
  }

  function renderDivisionNote(section, idx) {
    var wrap = sectionWrap(idx, 'divisionnote');
    var box = el('div', { class: 'divisionnote' });
    var scroll, table, thead, tbody, tr, th, td, r, c, cols, rows, cell, n;
    appendHeading(wrap, section.heading);
    if (safeText(section.intro)) box.appendChild(el('p', { text: safeText(section.intro) }));
    cols = isArray(section.columns) ? section.columns : [];
    rows = isArray(section.rows) ? section.rows : [];
    if (cols.length || rows.length) {
      scroll = el('div', { class: 'divisionnote-scroll' });
      scroll.style.overflowX = 'auto';
      scroll.style.webkitOverflowScrolling = 'touch';
      scroll.style.maxWidth = '100%';
      table = el('table');
      if (cols.length) {
        thead = el('thead');
        tr = el('tr');
        for (c = 0; c < cols.length; c++) {
          th = el('th', { text: safeText(cols[c]), scope: 'col' });
          tr.appendChild(th);
        }
        thead.appendChild(tr);
        table.appendChild(thead);
      }
      tbody = el('tbody');
      for (r = 0; r < rows.length; r++) {
        tr = el('tr');
        cell = isArray(rows[r]) ? rows[r] : [];
        n = cols.length ? cols.length : cell.length;
        for (c = 0; c < n; c++) {
          td = el('td', { text: safeText(cell[c]) });
          tr.appendChild(td);
        }
        tbody.appendChild(tr);
      }
      table.appendChild(tbody);
      scroll.appendChild(table);
      box.appendChild(scroll);
    }
    wrap.appendChild(box);
    return wrap;
  }

  function renderTerms(section, idx) {
    var wrap = sectionWrap(idx, 'terms');
    var row, items, i, slug, entry, btn, span;
    appendHeading(wrap, section.heading);
    row = el('div', { class: 'terms-row' });
    items = asList(section.items || section.slugs);
    for (i = 0; i < items.length; i++) {
      slug = safeText(items[i]);
      if (!slug) continue;
      entry = termBySlug(slug);
      if (entry && safeText(entry.term)) {
        btn = el('button', {
          type: 'button',
          class: 'term-btn',
          text: safeText(entry.term)
        });
        btn.setAttribute('data-term', slug);
        (function (termSlug) {
          btn.addEventListener('click', function () {
            openTerm(termSlug);
          });
        }(slug));
        row.appendChild(btn);
      } else {
        span = el('span', { class: 'term-plain', text: slug });
        row.appendChild(span);
      }
    }
    wrap.appendChild(row);
    return wrap;
  }

  function renderCompareCol(col) {
    var box, list, items, i, t, title;
    if (!col || typeof col !== 'object') return null;
    box = el('div', { class: 'compare-col example-box' });
    title = safeText(col.title);
    if (title) box.appendChild(el('h4', { text: title }));
    items = asList(col.items);
    list = el('ul');
    for (i = 0; i < items.length; i++) {
      t = safeText(items[i]);
      if (!t) continue;
      list.appendChild(el('li', { text: t }));
    }
    box.appendChild(list);
    return box;
  }

  function renderCompare(section, idx) {
    var wrap = sectionWrap(idx, 'compare');
    var grid, left, right;
    appendHeading(wrap, section.heading);
    grid = el('div', { class: 'compare-grid' });
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(16rem, 1fr))';
    grid.style.gap = '1rem';
    left = renderCompareCol(section.left);
    right = renderCompareCol(section.right);
    if (left) grid.appendChild(left);
    if (right) grid.appendChild(right);
    wrap.appendChild(grid);
    return wrap;
  }

  function renderSteps(section, idx) {
    var wrap = sectionWrap(idx, 'steps');
    var list, items, i, item, li, title, bodies, b, t;
    appendHeading(wrap, section.heading);
    list = el('ol', { class: 'steps-list' });
    items = asList(section.items);
    for (i = 0; i < items.length; i++) {
      item = items[i];
      li = el('li');
      if (item && typeof item === 'object') {
        title = safeText(item.title);
        if (title) li.appendChild(el('strong', { text: title }));
        bodies = asList(item.body);
        for (b = 0; b < bodies.length; b++) {
          t = safeText(bodies[b]);
          if (t) li.appendChild(el('p', { text: t }));
        }
      } else {
        t = safeText(item);
        if (t) li.appendChild(el('p', { text: t }));
      }
      list.appendChild(li);
    }
    wrap.appendChild(list);
    return wrap;
  }

  function renderSection(section, idx) {
    var type;
    if (!section || !section.type) return null;
    type = section.type;
    if (type === 'prose') return renderProse(section, idx);
    if (type === 'diagram') return renderDiagram(section, idx);
    if (type === 'keypoints') return renderKeypoints(section, idx);
    if (type === 'interactive') return renderInteractive(section, idx);
    if (type === 'example') return renderExample(section, idx);
    if (type === 'coachnote') return renderCoachnote(section, idx);
    if (type === 'divisionnote') return renderDivisionNote(section, idx);
    if (type === 'terms') return renderTerms(section, idx);
    if (type === 'compare') return renderCompare(section, idx);
    if (type === 'steps') return renderSteps(section, idx);
    if (typeof console !== 'undefined' && console.warn) {
      console.warn('HRL_LEARN: unknown section type "' + type + '"');
    }
    return null;
  }

  function focusChapterTitle(titleEl) {
    function go() {
      if (!titleEl) return;
      try { titleEl.focus(); } catch (e) {}
      try {
        if (typeof window.scrollTo === 'function') window.scrollTo(0, 0);
        if (hasDoc()) {
          if (document.documentElement) document.documentElement.scrollTop = 0;
          if (document.body) document.body.scrollTop = 0;
        }
      } catch (e2) {}
    }
    titleEl.setAttribute('tabindex', '-1');
    if (typeof window.setTimeout === 'function') setTimeout(go, 0);
    else go();
  }

  function renderChapter(chapterId) {
    var rootEl, ch, tier, rec, P, S;
    var header, copy, hero, kicker, titleEl, subEl;
    var objWrap, objLead, objList, i, objText;
    var progressWrap, barObj, sectionsHost, node, rendered;
    var sections, cta, quizBtn, scorePill, nav, prevBtn, nextBtn, back;
    var prevCh, nextCh, total, kickerText, complete;
    if (!hasDoc()) return;
    rootEl = document.getElementById('chapter-root');
    if (!rootEl) return;
    teardownChapterProgress();
    rootEl.innerHTML = '';
    ensureViewListener();

    ch = getChapter(chapterId);
    if (!ch) {
      setEmpty(rootEl, 'This chapter is not ready yet.', 'That lesson could not be found in the curriculum.');
      return;
    }

    P = progressApi();
    if (P && typeof P.markVisited === 'function') {
      try { P.markVisited(ch.id); } catch (e) {}
    }

    tier = getTier(ch.tier) || {};
    rec = chapterRecord(ch.id);
    complete = !!(rec && rec.completed);
    total = totalChapterCount() || 24;

    header = el('header', { class: 'chapter-header' });
    copy = el('div', { class: 'chapter-header-copy' });
    kickerText = safeText(tier.name || ch.tier);
    if (typeof ch.order === 'number') {
      kickerText = (kickerText ? kickerText + ' · ' : '') + 'Chapter ' + ch.order + ' of ' + total;
    }
    if (typeof ch.minutes === 'number' && ch.minutes > 0) {
      kickerText += ' · ' + ch.minutes + (ch.minutes === 1 ? ' min' : ' min');
    }
    kicker = el('p', { class: 'hint', text: kickerText });
    titleEl = el('h3', {
      id: 'chapter-reading-title',
      class: 'chapter-title',
      text: safeText(ch.title) || ch.id
    });
    copy.appendChild(kicker);
    copy.appendChild(titleEl);
    if (safeText(ch.subtitle)) {
      subEl = el('p', { class: 'chapter-subtitle', text: safeText(ch.subtitle) });
      copy.appendChild(subEl);
    }
    header.appendChild(copy);
    hero = el('div', { class: 'chapter-hero' });
    hero.style.minWidth = '0';
    mountHero(hero, tier, ch);
    header.appendChild(hero);
    rootEl.appendChild(header);

    if (isArray(ch.objectives) && ch.objectives.length) {
      objWrap = el('div', { class: 'chapter-objectives-block' });
      objLead = el('p', { class: 'chapter-objectives-lead', text: 'After this chapter you can…' });
      objLead.style.fontWeight = '700';
      objLead.style.marginBottom = '0.35rem';
      objList = el('ul', { class: 'chapter-objectives' });
      for (i = 0; i < ch.objectives.length; i++) {
        objText = stripObjective(ch.objectives[i]);
        if (!objText) continue;
        objList.appendChild(el('li', { text: objText }));
      }
      objWrap.appendChild(objLead);
      objWrap.appendChild(objList);
      rootEl.appendChild(objWrap);
    }

    progressWrap = el('div', { class: 'chapter-progress' });
    progressWrap.appendChild(el('p', { class: 'hint', text: 'Chapter progress' }));
    barObj = makeProgressBar(0, 'Chapter reading progress');
    chapterBar = barObj.bar;
    chapterFill = barObj.fill;
    progressWrap.appendChild(barObj.bar);
    rootEl.appendChild(progressWrap);

    sectionsHost = el('div', { class: 'chapter-sections' });
    sections = isArray(ch.sections) ? ch.sections : [];
    rendered = [];
    for (i = 0; i < sections.length; i++) {
      node = renderSection(sections[i], rendered.length);
      if (node) {
        node.setAttribute('data-sec', String(rendered.length));
        sectionsHost.appendChild(node);
        rendered.push(node);
      }
    }
    rootEl.appendChild(sectionsHost);

    cta = el('div', { class: 'chapter-cta' });
    quizBtn = el('button', {
      type: 'button',
      class: 'btn btn-accent',
      text: complete ? 'Retake the quiz' : 'Take the chapter quiz'
    });
    quizBtn.addEventListener('click', function () {
      openQuiz(ch.id);
    });
    cta.appendChild(quizBtn);
    if (complete) {
      scorePill = el('span', {
        class: 'score-pill',
        text: 'Best ' + clampPct(rec.bestScore) + '%'
      });
      cta.appendChild(scorePill);
    }
    rootEl.appendChild(cta);

    nav = el('div', { class: 'chapter-nav' });
    if (ch.prev) {
      prevCh = getChapter(ch.prev);
      prevBtn = el('button', {
        type: 'button',
        class: 'btn btn-secondary',
        text: prevCh && prevCh.title ? 'Previous: ' + safeText(prevCh.title) : 'Previous chapter'
      });
      prevBtn.addEventListener('click', function () {
        openChapter(ch.prev);
      });
      nav.appendChild(prevBtn);
    }
    back = el('a', { href: '#view-path', text: 'Back to My Path' });
    back.addEventListener('click', function (e) {
      if (e.preventDefault) e.preventDefault();
      showPath();
    });
    nav.appendChild(back);
    if (ch.next) {
      nextCh = getChapter(ch.next);
      nextBtn = el('button', {
        type: 'button',
        class: 'btn btn-secondary',
        text: nextCh && nextCh.title ? 'Next: ' + safeText(nextCh.title) : 'Next chapter'
      });
      nextBtn.addEventListener('click', function () {
        openChapter(ch.next);
      });
      nav.appendChild(nextBtn);
    }
    rootEl.appendChild(nav);

    setupChapterProgress(rendered);
    focusChapterTitle(titleEl);

    S = shell();
    if (!S) {
      /* Direct API call: still scroll the reader to the top. */
      try {
        if (typeof window.scrollTo === 'function') window.scrollTo(0, 0);
      } catch (e3) {}
    }
  }

  /* ------------------------------------------------------------------ */
  /* Glossary                                                            */
  /* ------------------------------------------------------------------ */

  function fillDiagramBox(container, diagram) {
    var name, markup;
    if (!container || !diagram) return;
    name = safeText(diagram.svg);
    if (!name || !knownSvg(name)) {
      container.appendChild(emptyStateEl(
        'Diagram unavailable.',
        'This picture is missing from the drawing library.'
      ));
      return;
    }
    markup = svgMarkup(name, diagram.opts || {});
    if (!markup) {
      container.appendChild(emptyStateEl(
        'Diagram unavailable.',
        'This picture could not be drawn.'
      ));
      return;
    }
    container.innerHTML = markup;
  }

  function appendChapterLinks(parent, entry, asButtons) {
    var ids = termChapterIds(entry);
    var i, id, ch, label, control, wrap;
    if (!ids.length) return;
    wrap = el('p', { class: 'glossary-chapters' });
    wrap.appendChild(el('span', { text: 'Introduced in: ' }));
    for (i = 0; i < ids.length; i++) {
      id = ids[i];
      ch = getChapter(id);
      if (ch && typeof ch.order === 'number') {
        label = 'Chapter ' + ch.order;
        if (ch.title) label += ': ' + safeText(ch.title);
      } else {
        label = safeText(id);
      }
      if (!label) continue;
      if (asButtons) {
        control = el('button', { type: 'button', class: 'term-btn', text: label });
      } else {
        control = el('a', { href: '#view-chapter', text: label });
      }
      (function (chapterId) {
        control.addEventListener('click', function (e) {
          if (e.preventDefault) e.preventDefault();
          if (window.HRL_MODAL && typeof window.HRL_MODAL.close === 'function') {
            window.HRL_MODAL.close();
          }
          openChapter(chapterId);
        });
      }(id));
      if (i) wrap.appendChild(document.createTextNode(' · '));
      wrap.appendChild(control);
    }
    parent.appendChild(wrap);
  }

  function appendEntryBody(parent, entry, withSeeLink) {
    var aliases, i, bits, aliasLine, diag, see, ch, ids, label;
    parent.appendChild(el('p', { text: safeText(entry.definition) }));
    aliases = isArray(entry.aliases) ? entry.aliases : [];
    bits = [];
    for (i = 0; i < aliases.length; i++) {
      if (safeText(aliases[i])) bits.push(safeText(aliases[i]));
    }
    if (bits.length) {
      aliasLine = el('p', { class: 'hint', text: 'Also called: ' + bits.join(', ') });
      parent.appendChild(aliasLine);
    }
    appendChapterLinks(parent, entry, false);
    if (entry.diagram && entry.diagram.svg) {
      diag = el('div', { class: 'section-diagram' });
      fillDiagramBox(diag, entry.diagram);
      parent.appendChild(diag);
    }
    if (withSeeLink) {
      ids = termChapterIds(entry);
      if (ids.length) {
        ch = getChapter(ids[0]);
        label = ch && typeof ch.order === 'number'
          ? 'See it in Chapter ' + ch.order
          : 'See it in the chapter';
        see = el('button', { type: 'button', class: 'btn btn-primary', text: label });
        see.addEventListener('click', function () {
          if (window.HRL_MODAL && typeof window.HRL_MODAL.close === 'function') {
            window.HRL_MODAL.close();
          }
          openChapter(ids[0]);
        });
        parent.appendChild(el('p', {}, [see]));
      }
    }
  }

  function renderGlossaryEntry(entry) {
    var card, heading;
    card = el('article', { class: 'card glossary-entry' });
    card.setAttribute('data-slug', safeText(entry.slug));
    heading = el('h4', { text: safeText(entry.term) });
    card.appendChild(heading);
    appendEntryBody(card, entry, false);
    return card;
  }

  function paintGlossaryResults(azNav, resultsEl, query) {
    var q = trimStr(query).toLowerCase();
    var list = allGlossaryTerms();
    var matched = [];
    var groups = {};
    var i, entry, letter, groupEl, heading, link, span, ch, j, hasAny;

    resultsEl.innerHTML = '';
    azNav.innerHTML = '';

    for (i = 0; i < list.length; i++) {
      entry = list[i];
      if (entry && termMatches(entry, q)) matched.push(entry);
    }

    if (!matched.length) {
      resultsEl.appendChild(emptyStateEl(
        'No matching terms.',
        q ? 'Nothing in the glossary matches that search.' : 'The glossary is empty.'
      ));
      for (i = 0; i < LETTERS.length; i++) {
        span = el('span', { class: 'glossary-az-idle', text: LETTERS.charAt(i) });
        span.style.opacity = '0.4';
        azNav.appendChild(span);
      }
      return;
    }

    for (i = 0; i < matched.length; i++) {
      letter = letterOf(matched[i].term);
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(matched[i]);
    }

    for (i = 0; i < LETTERS.length; i++) {
      ch = LETTERS.charAt(i);
      if (groups[ch] && groups[ch].length) {
        link = el('a', {
          class: 'glossary-az-link',
          href: '#glossary-letter-' + ch,
          text: ch
        });
        azNav.appendChild(link);
      } else {
        span = el('span', { class: 'glossary-az-idle', text: ch });
        span.style.opacity = '0.4';
        azNav.appendChild(span);
      }
    }
    if (groups['#'] && groups['#'].length) {
      link = el('a', { class: 'glossary-az-link', href: '#glossary-letter-other', text: '#' });
      azNav.appendChild(link);
    }

    hasAny = false;
    for (i = 0; i < LETTERS.length; i++) {
      ch = LETTERS.charAt(i);
      if (!groups[ch]) continue;
      hasAny = true;
      groupEl = el('div', { class: 'glossary-letter-group' });
      heading = el('h3', {
        class: 'section-heading',
        id: 'glossary-letter-' + ch,
        text: ch
      });
      groupEl.appendChild(heading);
      for (j = 0; j < groups[ch].length; j++) {
        groupEl.appendChild(renderGlossaryEntry(groups[ch][j]));
      }
      resultsEl.appendChild(groupEl);
    }
    if (groups['#'] && groups['#'].length) {
      hasAny = true;
      groupEl = el('div', { class: 'glossary-letter-group' });
      heading = el('h3', {
        class: 'section-heading',
        id: 'glossary-letter-other',
        text: '#'
      });
      groupEl.appendChild(heading);
      for (i = 0; i < groups['#'].length; i++) {
        groupEl.appendChild(renderGlossaryEntry(groups['#'][i]));
      }
      resultsEl.appendChild(groupEl);
    }
    if (!hasAny) {
      resultsEl.appendChild(emptyStateEl('No matching terms.', 'Nothing in the glossary matches that search.'));
    }
  }

  function renderGlossary() {
    var rootEl, searchWrap, label, input, az, results, live;
    if (!hasDoc()) return;
    rootEl = document.getElementById('glossary-root');
    if (!rootEl) return;
    rootEl.innerHTML = '';

    if (!window.HRL_GLOSSARY) {
      setEmpty(rootEl, 'Glossary is not ready yet.', 'Terms will appear here once the glossary has loaded.');
      return;
    }

    searchWrap = el('div', { class: 'glossary-search', role: 'search' });
    label = el('label', {
      class: 'visually-hidden',
      'for': 'glossary-search',
      text: 'Search glossary'
    });
    input = el('input', {
      type: 'search',
      id: 'glossary-search',
      name: 'glossary-search',
      placeholder: 'Search terms, aliases, and definitions'
    });
    input.setAttribute('aria-label', 'Search glossary');
    searchWrap.appendChild(label);
    searchWrap.appendChild(input);
    live = el('p', { class: 'hint', id: 'glossary-live' });
    live.setAttribute('aria-live', 'polite');
    searchWrap.appendChild(live);
    rootEl.appendChild(searchWrap);

    az = el('nav', { class: 'glossary-az' });
    az.setAttribute('aria-label', 'Jump to letter');
    az.style.display = 'flex';
    az.style.flexWrap = 'wrap';
    az.style.gap = '0.35rem 0.55rem';
    az.style.margin = '0 0 1rem';
    rootEl.appendChild(az);

    results = el('div', { class: 'glossary-results', id: 'glossary-results' });
    rootEl.appendChild(results);

    function refresh() {
      var q = input.value || '';
      var n, list, i, count;
      paintGlossaryResults(az, results, q);
      list = allGlossaryTerms();
      count = 0;
      for (i = 0; i < list.length; i++) {
        if (termMatches(list[i], trimStr(q).toLowerCase())) count += 1;
      }
      n = trimStr(q)
        ? (count === 1 ? '1 matching term' : count + ' matching terms')
        : (count === 1 ? '1 term' : count + ' terms');
      live.textContent = n;
    }

    input.addEventListener('input', refresh);
    input.addEventListener('keyup', refresh);
    refresh();
  }

  function openTerm(slug) {
    var entry = termBySlug(slug);
    var modal = window.HRL_MODAL;
    var S;
    if (!entry) {
      toast('That term is not in the glossary.', 'info');
      return;
    }
    if (!modal || typeof modal.open !== 'function') {
      renderGlossary();
      S = shell();
      if (S && typeof S.showView === 'function') S.showView('glossary');
      return;
    }
    modal.open({
      title: safeText(entry.term) || 'Glossary',
      titleId: 'glossary-term-title',
      build: function (box, api) {
        var body = api && typeof api.el === 'function'
          ? api.el('div', { class: 'glossary-popover' })
          : el('div', { class: 'glossary-popover' });
        appendEntryBody(body, entry, true);
        box.appendChild(body);
      }
    });
  }

  return {
    renderPath: renderPath,
    renderChapter: renderChapter,
    renderGlossary: renderGlossary,
    openTerm: openTerm,
    scrollToTier: scrollToTier
  };
}());
