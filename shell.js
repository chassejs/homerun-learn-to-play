/* ===================================================================
   Homerun Learn to Play — shell.js
   Navigation, toasts, home/settings plumbing, and first-run routing.
   Browser-only. Owns view switching and the cross-view event bus.
   =================================================================== */

window.HRL_SHELL = (function () {
  'use strict';

  var TOAST_MS = 4000;
  var currentView = 'home';
  var listeners = {};
  var inited = false;
  var storageNoticeShown = false;

  /* ------------------------------------------------------------------ */
  /* Helpers                                                             */
  /* ------------------------------------------------------------------ */

  function progress() {
    return window.HRL_PROGRESS || null;
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    var k, val, i;
    if (attrs) {
      for (k in attrs) {
        if (!Object.prototype.hasOwnProperty.call(attrs, k)) continue;
        val = attrs[k];
        if (k === 'class') node.className = val;
        else if (k === 'text') node.textContent = val;
        else if (k === 'html') node.innerHTML = val;
        else if (k === 'for') node.setAttribute('for', val);
        else if (k.indexOf('data-') === 0 || k.indexOf('aria-') === 0 || k === 'role' || k === 'id' || k === 'type' || k === 'href' || k === 'accept') {
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

  function emptyState(title, blurb) {
    return '<div class="empty-state"><p><strong>' + escapeHtml(title) +
      '</strong></p><p>' + escapeHtml(blurb) + '</p></div>';
  }

  function setEmpty(rootId, title, blurb) {
    var rootEl = document.getElementById(rootId);
    if (!rootEl) return;
    rootEl.innerHTML = emptyState(title, blurb);
  }

  function curriculum() {
    return window.HRL_CURRICULUM || null;
  }

  function allTiers() {
    var cur = curriculum();
    if (!cur || !cur.tiers || !cur.tiers.length) return [];
    return cur.tiers;
  }

  function allChapters() {
    var cur = curriculum();
    if (!cur || !cur.chapters || !cur.chapters.length) return [];
    return cur.chapters;
  }

  function findChapter(chapterId) {
    var list = allChapters();
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i] && list[i].id === chapterId) return list[i];
    }
    return null;
  }

  function findTier(tierKey) {
    var list = allTiers();
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i] && list[i].key === tierKey) return list[i];
    }
    return null;
  }

  function chaptersInTier(tierKey) {
    var list = allChapters();
    var out = [];
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i] && list[i].tier === tierKey) out.push(list[i]);
    }
    return out;
  }

  /* ------------------------------------------------------------------ */
  /* Event bus                                                           */
  /* ------------------------------------------------------------------ */

  function on(eventName, fn) {
    if (!eventName || typeof fn !== 'function') return;
    if (!listeners[eventName]) listeners[eventName] = [];
    listeners[eventName].push(fn);
  }

  function off(eventName, fn) {
    var list = listeners[eventName];
    var i;
    if (!list) return;
    for (i = list.length - 1; i >= 0; i--) {
      if (list[i] === fn) list.splice(i, 1);
    }
  }

  function emit(eventName, payload) {
    var list = listeners[eventName];
    var copy;
    var i;
    if (!list || !list.length) return;
    copy = list.slice();
    for (i = 0; i < copy.length; i++) {
      try {
        copy[i](payload);
      } catch (e) {}
    }
  }

  /* ------------------------------------------------------------------ */
  /* Toast                                                               */
  /* ------------------------------------------------------------------ */

  function toast(message, kind, opts) {
    var rootEl;
    var node;
    var label;
    var closeBtn;
    var timer;
    if (typeof document === 'undefined') return;
    opts = opts || {};
    kind = kind || 'info';
    rootEl = document.getElementById('toast-root');
    if (!rootEl) return;
    node = el('div', {
      class: 'toast toast-' + kind,
      role: 'status'
    });
    label = el('span', { text: message || '' });
    node.appendChild(label);
    function remove() {
      if (node.parentNode) node.parentNode.removeChild(node);
    }
    if (opts.dismissible) {
      closeBtn = el('button', { type: 'button', text: 'Dismiss' });
      closeBtn.setAttribute('aria-label', 'Dismiss');
      closeBtn.style.background = 'transparent';
      closeBtn.style.border = '1px solid rgba(255,255,255,0.55)';
      closeBtn.style.color = 'inherit';
      closeBtn.style.minHeight = '32px';
      closeBtn.style.marginLeft = '0.6rem';
      closeBtn.addEventListener('click', function () {
        if (timer) clearTimeout(timer);
        remove();
      });
      node.appendChild(closeBtn);
    }
    rootEl.appendChild(node);
    if (!opts.sticky) {
      timer = setTimeout(remove, opts.ms || TOAST_MS);
    }
  }

  /* ------------------------------------------------------------------ */
  /* View switching                                                      */
  /* ------------------------------------------------------------------ */

  function current() {
    return currentView;
  }

  function navTarget(name) {
    if (name === 'chapter' || name === 'quiz') return 'path';
    return name;
  }

  function focusViewHeading(viewEl) {
    var heading;
    if (!viewEl) return;
    heading = viewEl.querySelector('h1, h2');
    if (!heading) return;
    heading.setAttribute('tabindex', '-1');
    try {
      heading.focus();
    } catch (e) {}
  }

  function scrollTop() {
    try {
      if (typeof window.scrollTo === 'function') window.scrollTo(0, 0);
    } catch (e) {}
    try {
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    } catch (e2) {}
  }

  function scrollToTier(tierKey) {
    var viewEl;
    var target;
    if (!tierKey || typeof document === 'undefined') return;
    viewEl = document.getElementById('view-path');
    if (!viewEl) return;
    target = viewEl.querySelector('[data-tier="' + tierKey + '"]');
    if (target && typeof target.scrollIntoView === 'function') {
      target.scrollIntoView(true);
    }
  }

  function renderOwnedView(name, opts) {
    opts = opts || {};
    if (name === 'home') {
      renderHome();
      return;
    }
    if (name === 'path') {
      if (window.HRL_LEARN && typeof window.HRL_LEARN.renderPath === 'function') {
        try {
          window.HRL_LEARN.renderPath();
        } catch (e) {
          setEmpty('path-root', 'My Path is not ready yet.', 'The chapter list will appear here once the curriculum has loaded.');
        }
      } else {
        setEmpty('path-root', 'My Path is not ready yet.', 'The chapter list will appear here once the curriculum has loaded.');
      }
      if (opts.scrollToTier) scrollToTier(opts.scrollToTier);
      return;
    }
    if (name === 'iq') {
      if (window.HRL_IQ && typeof window.HRL_IQ.renderIntro === 'function') {
        try {
          window.HRL_IQ.renderIntro();
        } catch (e) {
          setEmpty('iq-root', 'Baseball IQ is not ready yet.', 'The adaptive test will appear here once that module has loaded.');
        }
      } else {
        setEmpty('iq-root', 'Baseball IQ is not ready yet.', 'The adaptive test will appear here once that module has loaded.');
      }
      return;
    }
    if (name === 'review') {
      if (window.HRL_QUIZ && typeof window.HRL_QUIZ.renderReviewDeck === 'function') {
        try {
          window.HRL_QUIZ.renderReviewDeck();
        } catch (e) {
          setEmpty('review-root', 'Review is not ready yet.', 'Missed questions will appear here once the quiz module has loaded.');
        }
      } else {
        setEmpty('review-root', 'Review is not ready yet.', 'Missed questions will appear here once the quiz module has loaded.');
      }
      return;
    }
    if (name === 'glossary') {
      if (window.HRL_LEARN && typeof window.HRL_LEARN.renderGlossary === 'function') {
        try {
          window.HRL_LEARN.renderGlossary();
        } catch (e) {
          setEmpty('glossary-root', 'Glossary is not ready yet.', 'Terms will appear here once the glossary has loaded.');
        }
      } else {
        setEmpty('glossary-root', 'Glossary is not ready yet.', 'Terms will appear here once the glossary has loaded.');
      }
    }
  }

  function showView(name, opts) {
    var views;
    var navs;
    var i;
    var viewEl;
    var previous;
    var dataView;
    var highlight;
    if (typeof document === 'undefined') return;
    opts = opts || {};
    if (!name) name = 'home';
    previous = currentView;
    currentView = name;
    highlight = navTarget(name);

    views = document.querySelectorAll('.view');
    for (i = 0; i < views.length; i++) {
      if (views[i].id === 'view-' + name) {
        views[i].classList.add('active');
      } else {
        views[i].classList.remove('active');
      }
    }

    navs = document.querySelectorAll('.nav-btn');
    for (i = 0; i < navs.length; i++) {
      dataView = navs[i].getAttribute('data-view');
      if (name === 'chapter' || name === 'quiz') {
        if (dataView === 'path') navs[i].classList.add('active');
        else navs[i].classList.remove('active');
      } else if (dataView === highlight) {
        navs[i].classList.add('active');
      } else {
        navs[i].classList.remove('active');
      }
    }

    viewEl = document.getElementById('view-' + name);
    renderOwnedView(name, opts);
    focusViewHeading(viewEl);
    scrollTop();
    if (opts.scrollToTier && name === 'path') scrollToTier(opts.scrollToTier);

    emit('viewchange', {
      view: name,
      previous: previous,
      opts: opts
    });
  }

  function openChapter(chapterId) {
    if (window.HRL_LEARN && typeof window.HRL_LEARN.renderChapter === 'function') {
      try {
        window.HRL_LEARN.renderChapter(chapterId);
      } catch (e) {
        setEmpty('chapter-root', 'This chapter is not ready yet.', 'The lesson will appear here once the reader has loaded.');
      }
    } else {
      setEmpty('chapter-root', 'This chapter is not ready yet.', 'The lesson will appear here once the reader has loaded.');
    }
    showView('chapter', { chapterId: chapterId });
    if (progress() && typeof progress().markVisited === 'function') {
      progress().markVisited(chapterId);
    }
  }

  function openQuiz(chapterId) {
    if (window.HRL_QUIZ && typeof window.HRL_QUIZ.start === 'function') {
      try {
        window.HRL_QUIZ.start(chapterId);
      } catch (e) {
        setEmpty('quiz-root', 'The chapter quiz is not ready yet.', 'The quiz will appear here once that module has loaded.');
      }
    } else {
      setEmpty('quiz-root', 'The chapter quiz is not ready yet.', 'The quiz will appear here once that module has loaded.');
    }
    showView('quiz', { chapterId: chapterId });
  }

  /* ------------------------------------------------------------------ */
  /* Placement                                                           */
  /* ------------------------------------------------------------------ */

  function startPlacement() {
    if (window.HRL_PLACEMENT && typeof window.HRL_PLACEMENT.start === 'function') {
      window.HRL_PLACEMENT.start({
        skippable: true,
        onSkip: skipPlacement,
        onComplete: function () {
          renderHome();
        }
      });
      return true;
    }
    return false;
  }

  function skipPlacement() {
    var P = progress();
    if (P && typeof P.setPlacement === 'function') {
      P.setPlacement({
        recommendedTier: 1,
        role: null,
        goal: null,
        experience: null,
        theta: 0
      });
    }
    renderHome();
    toast('Starting from the beginning, in the Rookie tier. Every chapter stays unlocked.', 'info');
  }

  /* ------------------------------------------------------------------ */
  /* Home                                                                */
  /* ------------------------------------------------------------------ */

  function progressBarHtml(pct) {
    var n = Math.round(Number(pct) || 0);
    if (n < 0) n = 0;
    if (n > 100) n = 100;
    return '<div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' +
      n + '"><span class="progress-bar-fill" style="width:' + n + '%"></span></div>';
  }

  function ringHtml(pct) {
    var r = 18;
    var c = 2 * Math.PI * r;
    var n = Math.round(Number(pct) || 0);
    var dash;
    if (n < 0) n = 0;
    if (n > 100) n = 100;
    dash = (n / 100) * c;
    return '<span class="tier-ring" aria-hidden="true">' +
      '<svg viewBox="0 0 48 48" width="48" height="48" focusable="false">' +
      '<circle cx="24" cy="24" r="18" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="4"></circle>' +
      '<circle cx="24" cy="24" r="18" fill="none" stroke="#ffffff" stroke-width="4" stroke-dasharray="' +
      dash.toFixed(2) + ' ' + c.toFixed(2) + '" stroke-linecap="round"></circle>' +
      '</svg></span>';
  }

  function renderContinue(host) {
    var P = progress();
    var nextId;
    var ch;
    var tier;
    var ov;
    var title;
    var tierName;
    var card;
    var copy;
    var btn;
    var skip;
    var firstRun = P && typeof P.isFirstRun === 'function' ? P.isFirstRun() : true;

    host.innerHTML = '';

    if (firstRun) {
      card = el('div', { class: 'continue-card' });
      copy = el('div', {}, [
        el('p', { html: '<strong>Find your starting point</strong>' }),
        el('p', { class: 'hint', text: 'A short placement quiz recommends a tier. You can skip it and start from the very beginning — every chapter stays unlocked.' })
      ]);
      btn = el('button', { type: 'button', class: 'btn btn-accent', text: 'Find my starting point' });
      btn.addEventListener('click', function () {
        if (!startPlacement()) {
          toast('Placement will be available once that module has loaded. You can browse chapters in the meantime.', 'info');
        }
      });
      skip = el('button', { type: 'button', class: 'btn btn-ghost', text: 'Start from the very beginning' });
      skip.addEventListener('click', skipPlacement);
      card.appendChild(copy);
      card.appendChild(btn);
      card.appendChild(skip);
      host.appendChild(card);
      return;
    }

    nextId = P && typeof P.nextChapter === 'function' ? P.nextChapter() : null;
    ov = P && typeof P.overallProgress === 'function'
      ? P.overallProgress()
      : { total: 0, complete: 0, pct: 0 };

    if (nextId) {
      ch = findChapter(nextId);
      title = ch && ch.title ? ch.title : nextId;
      tier = ch ? findTier(ch.tier) : null;
      tierName = (tier && tier.name) ? tier.name : (ch && ch.tier ? ch.tier : '');
      card = el('div', { class: 'continue-card' });
      copy = el('div');
      copy.innerHTML = '<p><strong>' + escapeHtml(title) + '</strong></p>' +
        (tierName ? '<p class="hint">' + escapeHtml(tierName) + '</p>' : '') +
        progressBarHtml(ov.pct) +
        '<p class="hint">' + ov.complete + ' of ' + ov.total + ' chapters complete</p>';
      btn = el('button', { type: 'button', class: 'btn btn-accent', text: 'Continue' });
      btn.addEventListener('click', function () {
        openChapter(nextId);
      });
      card.appendChild(copy);
      card.appendChild(btn);
      host.appendChild(card);
      return;
    }

    if (ov.total > 0 && ov.complete >= ov.total) {
      card = el('div', { class: 'continue-card' });
      copy = el('div', {}, [
        el('p', { html: '<strong>You have finished every chapter.</strong>' }),
        el('p', { class: 'hint', text: 'Measure yourself on the Baseball IQ test — 20 adaptive questions on the 40–160 BBIQ scale.' })
      ]);
      btn = el('button', { type: 'button', class: 'btn btn-accent', text: 'Take the Baseball IQ test' });
      btn.addEventListener('click', function () {
        showView('iq');
      });
      card.appendChild(copy);
      card.appendChild(btn);
      host.appendChild(card);
      return;
    }

    card = el('div', { class: 'continue-card' });
    copy = el('div', {}, [
      el('p', { html: '<strong>Browse the path</strong>' }),
      el('p', { class: 'hint', text: 'Open My Path to pick a chapter. Placement only highlights a starting point — nothing is locked.' })
    ]);
    btn = el('button', { type: 'button', class: 'btn btn-accent', text: 'Browse all chapters' });
    btn.addEventListener('click', function () {
      showView('path');
    });
    card.appendChild(copy);
    card.appendChild(btn);
    host.appendChild(card);
  }

  function renderTierRail(host) {
    var P = progress();
    var tiers = allTiers();
    var rail;
    var i, t, count, prog, btn, label, nameEl, metaEl;
    host.innerHTML = '';
    if (!tiers.length) {
      host.innerHTML = emptyState(
        'Tiers will appear here.',
        'The six-tier path shows up once the curriculum has loaded.'
      );
      return;
    }
    rail = el('div', { class: 'tier-rail' });
    for (i = 0; i < tiers.length; i++) {
      t = tiers[i];
      if (!t || !t.key) continue;
      count = chaptersInTier(t.key).length;
      prog = P && typeof P.tierProgress === 'function'
        ? P.tierProgress(t.key)
        : { total: count, complete: 0, pct: 0 };
      btn = el('button', {
        type: 'button',
        class: 'tier-rail-item tier-' + t.key,
        'data-tier': t.key
      });
      btn.innerHTML = ringHtml(prog.pct);
      label = el('span');
      nameEl = el('span', { text: t.name || t.key });
      metaEl = el('span', {
        text: count + (count === 1 ? ' chapter' : ' chapters') +
          (prog.total ? ' · ' + prog.complete + '/' + prog.total : '')
      });
      metaEl.style.display = 'block';
      metaEl.style.fontWeight = '400';
      metaEl.style.opacity = '0.9';
      metaEl.style.fontSize = '0.82rem';
      label.appendChild(nameEl);
      label.appendChild(metaEl);
      btn.appendChild(label);
      btn.setAttribute('aria-label', (t.name || t.key) + ', ' + prog.complete + ' of ' + (prog.total || count) + ' chapters complete');
      (function (tierKey) {
        btn.addEventListener('click', function () {
          showView('path', { scrollToTier: tierKey });
        });
      }(t.key));
      rail.appendChild(btn);
    }
    host.appendChild(rail);
  }

  function renderHome() {
    var cont;
    var rail;
    if (typeof document === 'undefined') return;
    cont = document.getElementById('home-continue');
    rail = document.getElementById('home-tier-rail');
    if (cont) renderContinue(cont);
    if (rail) renderTierRail(rail);
  }

  /* ------------------------------------------------------------------ */
  /* Settings (Help view)                                                */
  /* ------------------------------------------------------------------ */

  function applyReducedMotion(on) {
    if (typeof document === 'undefined' || !document.body) return;
    if (on) document.body.classList.add('reduced-motion');
    else document.body.classList.remove('reduced-motion');
  }

  function downloadExport() {
    var P = progress();
    var payload;
    var blob;
    var url;
    var a;
    var filename;
    if (!P || typeof P.exportPayload !== 'function') {
      toast('Export is not available.', 'error');
      return;
    }
    try {
      payload = P.exportPayload();
      filename = typeof P.exportFilename === 'function'
        ? P.exportFilename(new Date())
        : 'homerun-learn-progress.json';
      if (typeof Blob === 'undefined' || typeof URL === 'undefined' || typeof URL.createObjectURL !== 'function') {
        toast('This browser cannot download a backup file.', 'error');
        return;
      }
      blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      url = URL.createObjectURL(blob);
      a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      if (a.parentNode) a.parentNode.removeChild(a);
      setTimeout(function () {
        try { URL.revokeObjectURL(url); } catch (e) {}
      }, 0);
      toast('Progress exported.', 'success');
    } catch (e) {
      toast('Could not export progress.', 'error');
    }
  }

  function handleImportFile(file) {
    var reader;
    var P = progress();
    if (!file) return;
    if (!P || typeof P.importText !== 'function') {
      toast('Import is not available.', 'error');
      return;
    }
    reader = new FileReader();
    reader.onload = function () {
      var result;
      try {
        result = P.importText(String(reader.result || ''));
      } catch (e) {
        toast('Could not import that file.', 'error');
        return;
      }
      if (result && result.ok) {
        applyReducedMotion(!!P.getSetting('reducedMotion'));
        renderHome();
        renderSettings();
        toast(result.message || 'Progress imported.', 'success');
      } else {
        toast((result && result.message) || 'Could not import that file.', 'error');
      }
    };
    reader.onerror = function () {
      toast('Could not read that file.', 'error');
    };
    reader.readAsText(file);
  }

  function confirmReset() {
    var modal = window.HRL_MODAL;
    if (!modal || typeof modal.open !== 'function') {
      toast('Reset needs a confirmation dialog, which is not available.', 'error');
      return;
    }
    modal.open({
      title: 'Reset progress?',
      titleId: 'reset-progress-title',
      build: function (box, api) {
        var cancel;
        var ok;
        box.appendChild(api.el('p', {
          text: 'This clears your path, quiz scores, review deck, badges, streak, and Baseball IQ history on this device. Export a backup first if you want to keep them.'
        }));
        cancel = api.el('button', { type: 'button', class: 'btn btn-secondary', text: 'Cancel' });
        ok = api.el('button', { type: 'button', class: 'btn btn-accent', text: 'Reset progress' });
        cancel.addEventListener('click', function () { api.close(); });
        ok.addEventListener('click', function () {
          var P = progress();
          if (P && typeof P.reset === 'function') P.reset();
          applyReducedMotion(false);
          renderHome();
          renderSettings();
          api.close();
          toast('Progress has been reset.', 'info');
        });
        box.appendChild(api.el('div', { class: 'modal-actions' }, [cancel, ok]));
      }
    });
  }

  function renderSettings() {
    var help;
    var host;
    var panel;
    var existing;
    var P = progress();
    var reduced;
    var timerOn;
    var reducedBox;
    var timerBox;
    var exportBtn;
    var importBtn;
    var fileInput;
    var resetBtn;
    var placeBtn;
    var actions;
    var reducedLabel;
    var timerLabel;
    if (typeof document === 'undefined') return;
    help = document.getElementById('view-help');
    if (!help) return;
    host = help.querySelector('.readme-content') || help;
    existing = document.getElementById('help-progress-panel');
    if (existing && existing.parentNode) existing.parentNode.removeChild(existing);

    reduced = P && typeof P.getSetting === 'function' ? !!P.getSetting('reducedMotion') : false;
    timerOn = P && typeof P.getSetting === 'function' ? P.getSetting('timerEnabled') !== false : true;

    panel = el('section', { class: 'readme-section', id: 'help-progress-panel' });
    panel.appendChild(el('h3', { text: 'Your progress' }));
    panel.appendChild(el('p', {
      text: 'Progress lives in this browser on this device. Export a backup to keep it or move it. Import merges with what is already here: higher quiz scores win, completed chapters stay completed, and review items keep the later due date.'
    }));

    actions = el('p');
    exportBtn = el('button', { type: 'button', class: 'btn btn-primary', text: 'Export' });
    exportBtn.addEventListener('click', downloadExport);
    importBtn = el('button', { type: 'button', class: 'btn btn-secondary', text: 'Import' });
    fileInput = el('input', {
      type: 'file',
      accept: 'application/json,.json',
      class: 'visually-hidden',
      id: 'help-import-input'
    });
    fileInput.setAttribute('aria-label', 'Choose a progress backup file');
    importBtn.addEventListener('click', function () {
      fileInput.click();
    });
    fileInput.addEventListener('change', function () {
      var file = fileInput.files && fileInput.files[0];
      handleImportFile(file);
      fileInput.value = '';
    });
    resetBtn = el('button', { type: 'button', class: 'btn btn-ghost', text: 'Reset progress' });
    resetBtn.addEventListener('click', confirmReset);
    actions.appendChild(exportBtn);
    actions.appendChild(document.createTextNode(' '));
    actions.appendChild(importBtn);
    actions.appendChild(fileInput);
    actions.appendChild(document.createTextNode(' '));
    actions.appendChild(resetBtn);
    panel.appendChild(actions);

    reducedBox = el('input', { type: 'checkbox', id: 'setting-reduced-motion' });
    reducedBox.checked = reduced;
    reducedBox.addEventListener('change', function () {
      var on = !!reducedBox.checked;
      if (P && typeof P.setSetting === 'function') P.setSetting('reducedMotion', on);
      applyReducedMotion(on);
    });
    reducedLabel = el('label', { 'for': 'setting-reduced-motion' });
    reducedLabel.appendChild(reducedBox);
    reducedLabel.appendChild(document.createTextNode(' Reduce motion'));
    panel.appendChild(el('p', {}, [reducedLabel]));

    timerBox = el('input', { type: 'checkbox', id: 'setting-timer-enabled' });
    timerBox.checked = timerOn;
    timerBox.addEventListener('change', function () {
      if (P && typeof P.setSetting === 'function') P.setSetting('timerEnabled', !!timerBox.checked);
    });
    timerLabel = el('label', { 'for': 'setting-timer-enabled' });
    timerLabel.appendChild(timerBox);
    timerLabel.appendChild(document.createTextNode(' Quiz timer (45-second Baseball IQ questions)'));
    panel.appendChild(el('p', {}, [timerLabel]));

    placeBtn = el('button', { type: 'button', class: 'btn btn-secondary', text: 'Re-run placement' });
    placeBtn.addEventListener('click', function () {
      if (!startPlacement()) {
        toast('Placement will be available once that module has loaded.', 'info');
      }
    });
    panel.appendChild(el('p', {}, [placeBtn]));
    panel.appendChild(el('p', {
      class: 'hint',
      text: 'Re-running placement only changes the recommended starting tier. Every chapter stays unlocked.'
    }));

    host.appendChild(panel);
  }

  /* ------------------------------------------------------------------ */
  /* Init                                                                */
  /* ------------------------------------------------------------------ */

  function bindViewTriggers() {
    var nodes;
    var i;
    if (typeof document === 'undefined') return;
    nodes = document.querySelectorAll('[data-view]');
    for (i = 0; i < nodes.length; i++) {
      (function (node) {
        node.addEventListener('click', function () {
          var name = node.getAttribute('data-view');
          if (name) showView(name);
        });
      }(nodes[i]));
    }
  }

  function bindPlacementButton() {
    var btn;
    if (typeof document === 'undefined') return;
    btn = document.getElementById('home-placement-btn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      if (!startPlacement()) {
        toast('Placement will be available once that module has loaded. You can browse chapters in the meantime.', 'info');
      }
    });
  }

  function bindEscape() {
    if (typeof document === 'undefined') return;
    document.addEventListener('keydown', function (e) {
      var key = e.key || e.keyCode;
      if (key === 'Escape' || key === 'Esc' || key === 27) {
        if (window.HRL_MODAL && typeof window.HRL_MODAL.close === 'function') {
          window.HRL_MODAL.close();
        }
      }
    });
  }

  function announceStreak(result) {
    var i;
    var id;
    var label;
    if (!result || !result.badgesAwarded || !result.badgesAwarded.length) return;
    for (i = 0; i < result.badgesAwarded.length; i++) {
      id = result.badgesAwarded[i];
      if (id === 'streak-3') label = '3-day streak badge earned. Keep showing up.';
      else if (id === 'streak-7') label = '7-day streak badge earned. Effort over talent.';
      else if (id === 'streak-30') label = '30-day streak badge earned. That is real work.';
      else label = 'Badge earned: ' + id;
      toast(label, 'success');
    }
  }

  function showStorageNotice() {
    if (storageNoticeShown) return;
    storageNoticeShown = true;
    toast(
      'Progress cannot be saved on this device. It will disappear if you reload. Export will not persist either.',
      'warn',
      { dismissible: true, sticky: true }
    );
  }

  function init() {
    var P;
    var streakResult;
    var active;
    if (inited) return;
    inited = true;
    if (typeof document === 'undefined') return;

    P = progress();
    if (P && typeof P.load === 'function') P.load();
    applyReducedMotion(!!(P && typeof P.getSetting === 'function' && P.getSetting('reducedMotion')));

    active = document.querySelector('.view.active');
    if (active && active.id && active.id.indexOf('view-') === 0) {
      currentView = active.id.substring(5);
    }

    bindViewTriggers();
    bindPlacementButton();
    bindEscape();

    if (P && typeof P.touchStreak === 'function') {
      streakResult = P.touchStreak(Date.now());
      announceStreak(streakResult);
    }

    on('viewchange', function (payload) {
      if (payload && payload.view === 'home') renderHome();
    });

    renderHome();
    renderSettings();

    if (P && typeof P.isFirstRun === 'function' && P.isFirstRun()) {
      startPlacement();
    }

    if (P && typeof P.storageAvailable === 'function' && !P.storageAvailable()) {
      showStorageNotice();
    }
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

  return {
    init: init,
    showView: showView,
    openChapter: openChapter,
    openQuiz: openQuiz,
    current: current,
    toast: toast,
    on: on,
    off: off,
    renderHome: renderHome,
    renderSettings: renderSettings
  };
}());
