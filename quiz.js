/* ===================================================================
   Homerun Learn to Play — quiz.js
   Chapter quizzes and the spaced-repetition review deck.
   ES5-safe (var, function, string concatenation). Loads as a browser
   script (root.HRL_QUIZ) and via Node require() for tests.
   =================================================================== */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;

  var PASS_PCT = 75;
  var FALLBACK_BOX_INTERVALS = [1, 3, 7, 16, 35];
  var MS_PER_DAY = 86400000;

  var session = null;

  /* ------------------------------------------------------------------ */
  /* Helpers                                                             */
  /* ------------------------------------------------------------------ */

  function hasOwn(obj, key) {
    return !!(obj && Object.prototype.hasOwnProperty.call(obj, key));
  }

  function isArray(x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  }

  function indexOf(arr, value) {
    var i;
    if (!arr) return -1;
    for (i = 0; i < arr.length; i++) {
      if (arr[i] === value) return i;
    }
    return -1;
  }

  function getNs(name) {
    if (root && root[name]) return root[name];
    if (typeof global !== 'undefined' && global[name]) return global[name];
    return null;
  }

  function hasDocument() {
    return typeof document !== 'undefined' && !!document && typeof document.getElementById === 'function';
  }

  function warn(msg) {
    if (typeof console !== 'undefined' && console.warn) console.warn(msg);
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getClass(node) {
    if (!node) return '';
    if (typeof node.className === 'string') return node.className;
    if (typeof node.getAttribute === 'function') return node.getAttribute('class') || '';
    return '';
  }

  function setClass(node, value) {
    if (!node) return;
    if (typeof node.className === 'string') {
      node.className = value;
      return;
    }
    if (typeof node.setAttribute === 'function') node.setAttribute('class', value);
  }

  function addClass(node, cls) {
    var cur;
    if (!node || !cls) return;
    cur = getClass(node).replace(/^\s+|\s+$/g, '');
    if ((' ' + cur + ' ').indexOf(' ' + cls + ' ') !== -1) return;
    setClass(node, cur ? cur + ' ' + cls : cls);
  }

  function removeClass(node, cls) {
    var parts;
    var i;
    var out;
    if (!node || !cls) return;
    parts = getClass(node).split(/\s+/);
    out = [];
    for (i = 0; i < parts.length; i++) {
      if (parts[i] && parts[i] !== cls) out.push(parts[i]);
    }
    setClass(node, out.join(' '));
  }

  function el(tag, attrs, children) {
    var node;
    var k;
    var val;
    var i;
    node = document.createElement(tag);
    if (attrs) {
      for (k in attrs) {
        if (!hasOwn(attrs, k)) continue;
        val = attrs[k];
        if (k === 'class') setClass(node, val);
        else if (k === 'text') node.textContent = val;
        else if (k === 'html') node.innerHTML = val;
        else if (k === 'for') node.setAttribute('for', val);
        else if (
          k.indexOf('data-') === 0 ||
          k.indexOf('aria-') === 0 ||
          k === 'role' ||
          k === 'id' ||
          k === 'type' ||
          k === 'disabled'
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

  function cloneQuestion(question) {
    var copy;
    var k;
    if (!question || typeof question !== 'object') return question;
    try {
      copy = JSON.parse(JSON.stringify(question));
    } catch (e) {
      copy = {};
      for (k in question) {
        if (hasOwn(question, k)) copy[k] = question[k];
      }
    }
    return copy;
  }

  function defaultRng() {
    return Math.random();
  }

  /* ------------------------------------------------------------------ */
  /* Pure logic                                                          */
  /* ------------------------------------------------------------------ */

  function shuffleArray(arr, rng) {
    var out;
    var i;
    var j;
    var tmp;
    rng = typeof rng === 'function' ? rng : defaultRng;
    out = arr ? arr.slice() : [];
    for (i = out.length - 1; i > 0; i--) {
      j = Math.floor(rng() * (i + 1));
      if (j < 0) j = 0;
      if (j > i) j = i;
      tmp = out[i];
      out[i] = out[j];
      out[j] = tmp;
    }
    return out;
  }

  function shuffleQuestion(question, rng) {
    var result;
    var indices;
    var i;
    var newChoices;
    var newAnswer;
    var origAnswer;
    rng = typeof rng === 'function' ? rng : defaultRng;
    if (!question) return question;
    result = cloneQuestion(question);
    if (question.type === 'hotspot') return result;
    if (question.type === 'order') {
      result.correctOrder = (question.items || []).slice();
      result.items = (question.items || []).slice();
      result.presentedItems = shuffleArray(question.items || [], rng);
      return result;
    }
    if (!question.choices || !question.choices.length) return result;
    origAnswer = question.answer;
    indices = [];
    for (i = 0; i < question.choices.length; i++) indices.push(i);
    indices = shuffleArray(indices, rng);
    newChoices = [];
    newAnswer = 0;
    for (i = 0; i < indices.length; i++) {
      newChoices.push(question.choices[indices[i]]);
      if (indices[i] === origAnswer) newAnswer = i;
    }
    result.choices = newChoices;
    result.answer = newAnswer;
    return result;
  }

  function isCorrect(question, response) {
    var i;
    var items;
    var targets;
    if (!question) return false;
    if (question.type === 'hotspot') {
      targets = question.targets || [];
      for (i = 0; i < targets.length; i++) {
        if (targets[i] === response) return true;
      }
      return false;
    }
    if (question.type === 'order') {
      items = question.items || [];
      if (!isArray(response) || response.length !== items.length) return false;
      for (i = 0; i < items.length; i++) {
        if (response[i] !== items[i]) return false;
      }
      return true;
    }
    return response === question.answer;
  }

  function scoreQuiz(results) {
    var i;
    var item;
    var correct;
    var total;
    var pct;
    results = results || [];
    total = results.length;
    correct = 0;
    for (i = 0; i < total; i++) {
      item = results[i];
      if (item === true) correct += 1;
      else if (item && typeof item === 'object' && item.correct === true) correct += 1;
    }
    pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    return {
      correct: correct,
      total: total,
      pct: pct,
      passed: pct >= PASS_PCT
    };
  }

  function nextBox(box, correct) {
    var n = Number(box);
    if (isNaN(n) || n < 1) n = 1;
    if (correct) return Math.min(n + 1, 5);
    return 1;
  }

  function dueDateFor(box, nowMs) {
    var intervals;
    var P;
    var idx;
    var days;
    var n;
    P = getNs('HRL_PROGRESS');
    intervals = FALLBACK_BOX_INTERVALS;
    if (P && isArray(P.BOX_INTERVALS) && P.BOX_INTERVALS.length) {
      intervals = P.BOX_INTERVALS;
    }
    if (nowMs == null) nowMs = Date.now();
    n = Number(box);
    if (isNaN(n) || n < 1) n = 1;
    idx = n - 1;
    if (idx < 0) idx = 0;
    if (idx >= intervals.length) idx = intervals.length - 1;
    days = Number(intervals[idx]);
    if (isNaN(days)) days = 1;
    return nowMs + days * MS_PER_DAY;
  }

  function isStale(state, token) {
    if (!state) return true;
    return token !== state.renderToken;
  }

  function advanceIndex(state, total, onComplete) {
    var n;
    var next;
    if (!state) {
      return { index: 0, finished: true };
    }
    if (state.finished) {
      return { index: state.index, finished: true };
    }
    n = Number(total);
    if (isNaN(n) || n < 0) n = 0;
    next = Number(state.index);
    if (isNaN(next)) next = 0;
    next = next + 1;
    if (next >= n) {
      state.finished = true;
      if (n > 0) {
        if (typeof state.index !== 'number' || isNaN(state.index) || state.index < 0 || state.index >= n) {
          state.index = n - 1;
        }
      } else {
        state.index = 0;
      }
      if (typeof onComplete === 'function') onComplete();
      return { index: state.index, finished: true };
    }
    state.index = next;
    return { index: state.index, finished: false };
  }

  function nextRenderToken(state) {
    if (!state) return 0;
    state.renderToken = (typeof state.renderToken === 'number' ? state.renderToken : 0) + 1;
    return state.renderToken;
  }

  /* ------------------------------------------------------------------ */
  /* Lookups                                                             */
  /* ------------------------------------------------------------------ */

  function getChapter(chapterId) {
    var cur = getNs('HRL_CURRICULUM');
    if (cur && typeof cur.getChapter === 'function') return cur.getChapter(chapterId);
    return null;
  }

  function getQuestion(id) {
    var Q = getNs('HRL_QUESTIONS');
    if (Q && typeof Q.byId === 'function') return Q.byId(id);
    return null;
  }

  function hotspotLabel(id) {
    var svg = getNs('HRL_SVG');
    if (svg && typeof svg.hotspotLabel === 'function') return svg.hotspotLabel(id);
    return String(id == null ? '' : id);
  }

  function toast(msg, kind) {
    var sh = getNs('HRL_SHELL');
    if (sh && typeof sh.toast === 'function') sh.toast(msg, kind || 'info');
  }

  function announce(msg) {
    var live;
    if (!hasDocument()) return;
    live = document.getElementById('hrl-quiz-live');
    if (live) {
      live.textContent = '';
      live.textContent = msg;
      return;
    }
    live = document.getElementById('toast-root');
    if (live) {
      live.setAttribute('aria-live', 'polite');
    }
    toast(msg, 'info');
  }

  function formatDate(ms) {
    var d;
    var months;
    if (ms == null) return '';
    d = new Date(ms);
    if (isNaN(d.getTime())) return '';
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }

  function formatResponse(question, response) {
    var parts;
    var i;
    if (question.type === 'hotspot') {
      if (response == null || response === '') return '(no selection)';
      return hotspotLabel(response);
    }
    if (question.type === 'order') {
      if (!isArray(response) || !response.length) return '(no order submitted)';
      parts = [];
      for (i = 0; i < response.length; i++) parts.push(String(response[i]));
      return parts.join(' → ');
    }
    if (question.choices && typeof response === 'number' && response >= 0 && response < question.choices.length) {
      return String(question.choices[response]);
    }
    if (response == null || response === '') return '(no answer)';
    return String(response);
  }

  function formatCorrect(question) {
    var i;
    var parts;
    var targets;
    if (question.type === 'hotspot') {
      targets = question.targets || [];
      parts = [];
      for (i = 0; i < targets.length; i++) parts.push(hotspotLabel(targets[i]));
      return parts.join(', ');
    }
    if (question.type === 'order') {
      parts = [];
      for (i = 0; i < (question.items || []).length; i++) parts.push(String(question.items[i]));
      return parts.join(' → ');
    }
    if (question.choices && typeof question.answer === 'number' && question.answer >= 0 && question.answer < question.choices.length) {
      return String(question.choices[question.answer]);
    }
    return '';
  }

  function badgeLabel(id) {
    if (id === 'perfect-quiz') return 'Perfect quiz';
    if (id === 'iq-first') return 'First Baseball IQ';
    if (id === 'iq-elite') return 'Elite Baseball IQ';
    if (id && id.indexOf('chapter-') === 0) return 'Chapter complete';
    if (id && id.indexOf('tier-') === 0) return 'Tier complete';
    return id || 'Badge';
  }

  function setViewHeading(viewName, headingText, hideHint) {
    var sh = getNs('HRL_SHELL');
    if (sh && typeof sh.setViewHeading === 'function') {
      sh.setViewHeading(viewName, headingText, hideHint);
    }
  }

  function emptyState(title, blurb) {
    var wrap = el('div', { class: 'empty-state' });
    wrap.appendChild(el('p', {}, [el('strong', { text: title })]));
    if (blurb) wrap.appendChild(el('p', { text: blurb }));
    return wrap;
  }

  function leaveQuizHost() {
    var sh;
    var chapterId;
    sh = getNs('HRL_SHELL');
    if (session && session.kind === 'review') {
      renderReviewDeck();
      return;
    }
    chapterId = session && session.chapterId ? session.chapterId : null;
    if (chapterId && sh && typeof sh.openChapter === 'function') {
      sh.openChapter(chapterId);
      return;
    }
    if (sh && typeof sh.showView === 'function') {
      sh.showView('path');
    }
  }

  function renderEscapableEmpty(host) {
    var wrap;
    var btn;
    var chapterId;
    var label;
    if (!host) return;
    chapterId = session && session.chapterId ? session.chapterId : null;
    if (session && session.kind === 'review') label = 'Back to review';
    else if (chapterId) label = 'Back to chapter';
    else label = 'Back to My Path';
    host.innerHTML = '';
    wrap = emptyState(
      'Nothing to show here.',
      'This quiz could not display the next screen. You can go back and try again.'
    );
    btn = el('button', {
      type: 'button',
      class: 'btn btn-primary',
      text: label
    });
    btn.addEventListener('click', leaveQuizHost);
    wrap.appendChild(btn);
    host.appendChild(wrap);
  }

  function ensureHostNotEmpty(host) {
    if (!host) return;
    if (host.firstChild) return;
    renderEscapableEmpty(host);
  }

  function hostEl(id) {
    if (!hasDocument()) return null;
    return document.getElementById(id);
  }

  /* ------------------------------------------------------------------ */
  /* Diagram                                                             */
  /* ------------------------------------------------------------------ */

  function renderDiagramHtml(question) {
    var svgNs = getNs('HRL_SVG');
    var diagram;
    var name;
    var opts;
    var src;
    var key;
    if (!svgNs || !question) return '';
    diagram = question.diagram || {};
    name = diagram.svg || 'field';
    opts = {};
    src = diagram.opts || {};
    for (key in src) {
      if (hasOwn(src, key)) opts[key] = src[key];
    }
    if (!opts.hotspots && question.targets) opts.hotspots = question.targets.slice();
    if (typeof svgNs[name] === 'function') return svgNs[name](opts);
    return '';
  }

  /* ------------------------------------------------------------------ */
  /* Session build                                                       */
  /* ------------------------------------------------------------------ */

  function resolveIds(ids) {
    var out;
    var i;
    var id;
    var q;
    var presented;
    out = [];
    ids = ids || [];
    for (i = 0; i < ids.length; i++) {
      id = ids[i];
      q = getQuestion(id);
      if (!q) {
        warn('HRL_QUIZ: missing question id ' + id);
        continue;
      }
      presented = shuffleQuestion(q);
      out.push(presented);
    }
    return out;
  }

  function newSession(kind, rootId, questions, meta) {
    return {
      kind: kind,
      rootId: rootId,
      chapterId: meta && meta.chapterId ? meta.chapterId : null,
      title: meta && meta.title ? meta.title : '',
      questions: questions || [],
      index: 0,
      outcomes: [],
      locked: false,
      orderWorking: [],
      recorded: false,
      finished: false,
      renderToken: 0,
      resultShown: false,
      reviewStats: { reviewed: 0, promoted: 0, retired: 0 },
      quizRecord: null
    };
  }

  /* ------------------------------------------------------------------ */
  /* Render                                                              */
  /* ------------------------------------------------------------------ */

  function renderDots(shell) {
    var list;
    var i;
    var q;
    var dot;
    var cls;
    var outcome;
    list = el('div', {
      class: 'quiz-progress-dots',
      role: 'img',
      'aria-label': 'Question ' + (session.index + 1) + ' of ' + session.questions.length
    });
    for (i = 0; i < session.questions.length; i++) {
      q = session.questions[i];
      cls = 'quiz-dot';
      if (i === session.index) cls += ' current';
      if (i < session.outcomes.length) {
        outcome = session.outcomes[i];
        if (session.kind !== 'iq') {
          cls += outcome && outcome.correct ? ' correct' : ' wrong';
        }
      }
      dot = el('span', {
        class: cls,
        'aria-hidden': 'true'
      });
      list.appendChild(dot);
    }
    shell.appendChild(list);
    shell.appendChild(el('p', {
      class: 'visually-hidden',
      text: 'Question ' + (session.index + 1) + ' of ' + session.questions.length
    }));
  }

  function moveOrder(idx, dir) {
    var arr;
    var j;
    var tmp;
    if (!session || session.locked) return;
    arr = session.orderWorking;
    j = idx + dir;
    if (j < 0 || j >= arr.length) return;
    tmp = arr[idx];
    arr[idx] = arr[j];
    arr[j] = tmp;
    renderCurrent();
  }

  function bindHotspots(container, token) {
    var nodes;
    var i;
    function onActivate(ev) {
      var id;
      var key;
      if (!session || session.finished || isStale(session, token)) return;
      if (session.locked) return;
      if (ev.type === 'keydown') {
        key = ev.key || ev.keyCode;
        if (key !== 'Enter' && key !== ' ' && key !== 'Spacebar' && key !== 13 && key !== 32) return;
        if (ev.preventDefault) ev.preventDefault();
      }
      id = ev.currentTarget.getAttribute('data-hotspot');
      submitAnswer(id);
    }
    nodes = container.querySelectorAll('[data-hotspot]');
    for (i = 0; i < nodes.length; i++) {
      nodes[i].addEventListener('click', onActivate);
      nodes[i].addEventListener('keydown', onActivate);
    }
  }

  function markHotspots(container, response, question) {
    var nodes;
    var i;
    var id;
    var correct;
    nodes = container.querySelectorAll('[data-hotspot]');
    for (i = 0; i < nodes.length; i++) {
      id = nodes[i].getAttribute('data-hotspot');
      correct = indexOf(question.targets || [], id) !== -1;
      if (id === response) {
        addClass(nodes[i], 'selected');
        addClass(nodes[i], correct ? 'correct' : 'wrong');
      } else if (correct) {
        addClass(nodes[i], 'correct');
      }
      nodes[i].setAttribute('tabindex', '-1');
    }
  }

  function renderOrderList(host, question, token) {
    var i;
    var row;
    var text;
    var btns;
    var up;
    var down;
    var itemText;
    var list;
    list = el('div', { class: 'choice-list', role: 'list' });
    for (i = 0; i < session.orderWorking.length; i++) {
      itemText = String(session.orderWorking[i]);
      row = el('div', { class: 'choice-btn order-row', role: 'listitem' });
      text = el('span', { text: itemText });
      btns = el('span', { class: 'order-move' });
      up = el('button', {
        type: 'button',
        class: 'btn btn-sm btn-ghost',
        text: 'Up',
        'aria-label': 'Move ' + itemText + ' up'
      });
      down = el('button', {
        type: 'button',
        class: 'btn btn-sm btn-ghost',
        text: 'Down',
        'aria-label': 'Move ' + itemText + ' down'
      });
      if (session.locked || i === 0) up.disabled = true;
      if (session.locked || i === session.orderWorking.length - 1) down.disabled = true;
      (function (idx) {
        up.addEventListener('click', function () {
          if (!session || session.finished || isStale(session, token)) return;
          moveOrder(idx, -1);
        });
        down.addEventListener('click', function () {
          if (!session || session.finished || isStale(session, token)) return;
          moveOrder(idx, 1);
        });
      }(i));
      btns.appendChild(up);
      btns.appendChild(down);
      row.appendChild(text);
      row.appendChild(btns);
      if (session.locked) {
        if (session.orderWorking[i] === (question.items || [])[i]) addClass(row, 'correct');
        else addClass(row, 'wrong');
      }
      list.appendChild(row);
    }
    host.appendChild(list);
    if (!session.locked) {
      host.appendChild(el('button', {
        type: 'button',
        class: 'btn btn-primary',
        text: 'Check order',
        id: 'quiz-check-order'
      }));
      host.querySelector('#quiz-check-order').addEventListener('click', function () {
        var checkBtn;
        if (!session || session.finished || isStale(session, token)) return;
        checkBtn = host.querySelector('#quiz-check-order');
        if (checkBtn) checkBtn.disabled = true;
        submitAnswer(session.orderWorking.slice());
      });
    }
  }

  function renderChoices(host, question, outcome, token) {
    var list;
    var i;
    var btn;
    var cls;
    var chosen;
    list = el('div', { class: 'choice-list', role: 'list' });
    for (i = 0; i < (question.choices || []).length; i++) {
      cls = 'choice-btn';
      chosen = outcome && outcome.response === i;
      if (session.locked) {
        if (i === question.answer) cls += ' correct';
        if (chosen && i !== question.answer) cls += ' selected wrong';
        else if (chosen) cls += ' selected';
      }
      btn = el('button', {
        type: 'button',
        class: cls,
        text: String(question.choices[i]),
        role: 'listitem'
      });
      if (session.locked) btn.disabled = true;
      (function (idx, choiceBtn) {
        choiceBtn.addEventListener('click', function () {
          if (!session || session.finished || isStale(session, token)) return;
          if (session.locked) return;
          choiceBtn.disabled = true;
          submitAnswer(idx);
        });
      }(i, btn));
      list.appendChild(btn);
    }
    host.appendChild(list);
  }

  function showFinish(host) {
    if (!host) host = session ? hostEl(session.rootId) : null;
    if (session && session.resultShown) {
      ensureHostNotEmpty(host);
      return;
    }
    if (session && session.kind === 'review') renderReviewSummary(host);
    else renderQuizResults(host);
    ensureHostNotEmpty(host);
  }

  function renderCurrent() {
    var host;
    var shell;
    var question;
    var outcome;
    var prompt;
    var explain;
    var nextBtn;
    var live;
    var diagramWrap;
    var token;
    var total;
    if (!session) return;
    host = hostEl(session.rootId);
    if (!host) return;
    total = session.questions ? session.questions.length : 0;
    if (session.finished) {
      if (!host.firstChild) showFinish(host);
      return;
    }
    question = session.questions ? session.questions[session.index] : null;
    if (!question) {
      session.finished = true;
      showFinish(host);
      return;
    }
    token = nextRenderToken(session);
    host.innerHTML = '';
    outcome = session.outcomes[session.index] || null;
    shell = el('div', { class: 'quiz-shell' });
    live = el('div', {
      id: 'hrl-quiz-live',
      class: 'visually-hidden',
      'aria-live': 'polite'
    });
    shell.appendChild(live);
    renderDots(shell);
    prompt = el('p', { class: 'quiz-prompt', id: 'quiz-prompt' });
    prompt.textContent = question.prompt || '';
    shell.appendChild(prompt);

    if (question.type === 'hotspot') {
      diagramWrap = el('div', { class: 'quiz-hotspot', html: renderDiagramHtml(question) });
      shell.appendChild(diagramWrap);
      if (session.locked) markHotspots(diagramWrap, outcome && outcome.response, question);
      else bindHotspots(diagramWrap, token);
    } else if (question.type === 'order') {
      if (!session.orderWorking || !session.orderWorking.length) {
        session.orderWorking = (question.presentedItems && question.presentedItems.length)
          ? question.presentedItems.slice()
          : (question.items || []).slice();
      }
      renderOrderList(shell, question, token);
    } else {
      renderChoices(shell, question, outcome, token);
    }

    if (session.locked && question.explain) {
      explain = el('div', { class: 'quiz-explain' });
      explain.appendChild(el('p', { text: question.explain }));
      shell.appendChild(explain);
    }

    if (session.locked) {
      nextBtn = el('button', {
        type: 'button',
        class: 'btn btn-primary',
        text: session.index >= total - 1 ? 'See results' : 'Next'
      });
      nextBtn.addEventListener('click', function () {
        if (!session || session.finished || isStale(session, token)) return;
        nextBtn.disabled = true;
        goNext();
      });
      shell.appendChild(nextBtn);
    }

    host.appendChild(shell);
    if (session.locked && nextBtn && typeof nextBtn.focus === 'function') {
      try { nextBtn.focus(); } catch (e) {}
    }
    ensureHostNotEmpty(host);
  }

  function submitAnswer(response) {
    var question;
    var correct;
    var P;
    var rec;
    if (!session || session.finished || session.locked) return;
    question = session.questions[session.index];
    if (!question) {
      session.finished = true;
      showFinish(hostEl(session.rootId));
      return;
    }
    correct = isCorrect(question, response);
    session.locked = true;
    session.outcomes[session.index] = {
      question: question,
      response: response,
      correct: correct
    };
    P = getNs('HRL_PROGRESS');
    if (session.kind === 'quiz') {
      if (!correct && P && typeof P.addMiss === 'function' && question.id) {
        P.addMiss(question.id, Date.now());
      }
    } else if (session.kind === 'review') {
      session.reviewStats.reviewed += 1;
      if (P && typeof P.recordReview === 'function' && question.id) {
        rec = P.recordReview(question.id, correct, Date.now());
        if (correct) {
          if (!rec) session.reviewStats.retired += 1;
          else session.reviewStats.promoted += 1;
        }
      }
    }
    renderCurrent();
    announce(correct ? 'Correct.' : 'Not quite.');
  }

  function goNext() {
    var step;
    var total;
    if (!session || session.finished) return;
    total = session.questions ? session.questions.length : 0;
    session.locked = false;
    session.orderWorking = [];
    step = advanceIndex(session, total);
    if (step.finished) {
      showFinish(hostEl(session.rootId));
      return;
    }
    renderCurrent();
  }

  function scoreRingEl(pct) {
    var wrap;
    var c;
    var offset;
    var label;
    c = 2 * Math.PI * 52;
    offset = c * (1 - (pct / 100));
    wrap = el('div', {
      class: 'score-ring',
      role: 'img',
      'aria-label': 'Score ' + pct + ' percent'
    });
    wrap.innerHTML = '<svg viewBox="0 0 120 120" aria-hidden="true">' +
      '<circle cx="60" cy="60" r="52" fill="none" stroke="#d8d3c6" stroke-width="10"></circle>' +
      '<circle cx="60" cy="60" r="52" fill="none" stroke="#062448" stroke-width="10" stroke-linecap="round" stroke-dasharray="' +
      c + '" stroke-dashoffset="' + offset + '"></circle></svg>';
    label = el('strong', { text: String(pct) + '%' });
    wrap.appendChild(label);
    return wrap;
  }

  function renderAnswerReview(host) {
    var wrap;
    var i;
    var item;
    var card;
    var q;
    wrap = el('div', { class: 'answer-review' });
    for (i = 0; i < session.outcomes.length; i++) {
      item = session.outcomes[i];
      if (!item || !item.question) continue;
      q = item.question;
      card = el('div');
      card.appendChild(el('p', {}, [el('strong', { text: q.prompt || '' })]));
      card.appendChild(el('p', { text: 'Your answer: ' + formatResponse(q, item.response) }));
      card.appendChild(el('p', { text: 'Correct answer: ' + formatCorrect(q) }));
      if (q.explain) card.appendChild(el('p', { text: q.explain }));
      wrap.appendChild(card);
    }
    host.appendChild(wrap);
  }

  function nextChapterId(chapterId) {
    var ch;
    var cur;
    var idx;
    ch = getChapter(chapterId);
    if (ch && ch.next) return ch.next;
    cur = getNs('HRL_CURRICULUM');
    if (cur && typeof cur.chapterIndex === 'function' && cur.chapters) {
      idx = cur.chapterIndex(chapterId);
      if (idx >= 0 && idx < cur.chapters.length - 1 && cur.chapters[idx + 1]) {
        return cur.chapters[idx + 1].id;
      }
    }
    return null;
  }

  function renderQuizResults(host) {
    var flags;
    var scored;
    var result;
    var P;
    var record;
    var i;
    var badgesWrap;
    var actions;
    var retake;
    var back;
    var next;
    var nextId;
    var sh;
    var msg;
    if (!session) {
      ensureHostNotEmpty(host);
      return;
    }
    if (session.resultShown) {
      ensureHostNotEmpty(host);
      return;
    }
    session.finished = true;
    nextRenderToken(session);
    flags = [];
    for (i = 0; i < session.outcomes.length; i++) flags.push(session.outcomes[i].correct);
    scored = scoreQuiz(flags);
    result = el('div', { class: 'quiz-shell' });
    result.appendChild(el('div', { class: 'quiz-result' }, [
      scoreRingEl(scored.pct),
      el('p', {
        class: 'quiz-prompt',
        text: scored.passed ? 'You passed.' : 'Not yet.'
      }),
      el('p', {
        class: 'hint',
        text: scored.passed
          ? '75% is the pass line — you scored ' + scored.pct + '% (' + scored.correct + ' of ' + scored.total + ').'
          : '75% is the pass line. You scored ' + scored.pct + '% (' + scored.correct + ' of ' + scored.total + '). Missed questions go to your review deck.'
      })
    ]));

    P = getNs('HRL_PROGRESS');
    if (!session.recorded && P && typeof P.recordQuiz === 'function' && session.chapterId) {
      record = P.recordQuiz(session.chapterId, scored.pct, scored.passed);
      session.recorded = true;
      session.quizRecord = record;
    } else {
      record = session.quizRecord;
    }

    if (record && record.badgesAwarded && record.badgesAwarded.length) {
      badgesWrap = el('div', { class: 'quiz-result' });
      badgesWrap.appendChild(el('p', { class: 'hint', text: 'Newly awarded' }));
      for (i = 0; i < record.badgesAwarded.length; i++) {
        badgesWrap.appendChild(el('span', {
          class: 'badge-rosette',
          title: badgeLabel(record.badgesAwarded[i]),
          text: '★'
        }));
        badgesWrap.appendChild(el('p', { text: badgeLabel(record.badgesAwarded[i]) }));
      }
      result.appendChild(badgesWrap);
    }

    renderAnswerReview(result);

    actions = el('div', { class: 'chapter-cta' });
    retake = el('button', { type: 'button', class: 'btn btn-secondary', text: 'Retake' });
    retake.addEventListener('click', function () {
      start(session.chapterId);
    });
    back = el('button', { type: 'button', class: 'btn btn-ghost', text: 'Back to chapter' });
    back.addEventListener('click', function () {
      sh = getNs('HRL_SHELL');
      if (sh && typeof sh.openChapter === 'function' && session.chapterId) sh.openChapter(session.chapterId);
    });
    actions.appendChild(retake);
    actions.appendChild(back);
    nextId = nextChapterId(session.chapterId);
    if (nextId) {
      next = el('button', { type: 'button', class: 'btn btn-primary', text: 'Next chapter' });
      next.addEventListener('click', function () {
        sh = getNs('HRL_SHELL');
        if (sh && typeof sh.openChapter === 'function') sh.openChapter(nextId);
      });
      actions.appendChild(next);
    }
    result.appendChild(actions);
    session.resultShown = true;
    if (host) {
      host.innerHTML = '';
      host.appendChild(result);
    }

    msg = scored.passed
      ? 'Quiz complete. You scored ' + scored.pct + ' percent and passed.'
      : 'Quiz complete. You scored ' + scored.pct + ' percent.';
    announce(msg);
    if (scored.passed) toast('Chapter quiz passed at ' + scored.pct + '%.', 'success');
    ensureHostNotEmpty(host);
  }

  function renderReviewSummary(host) {
    var shell;
    var stats;
    var actions;
    var again;
    var home;
    var sh;
    if (!session) {
      ensureHostNotEmpty(host);
      return;
    }
    if (session.resultShown) {
      ensureHostNotEmpty(host);
      return;
    }
    session.finished = true;
    nextRenderToken(session);
    stats = session.reviewStats;
    shell = el('div', { class: 'quiz-shell' });
    shell.appendChild(el('div', { class: 'quiz-result' }, [
      el('p', { class: 'quiz-prompt', text: 'Review complete' }),
      el('p', {
        class: 'hint',
        text: 'You reviewed ' + stats.reviewed + (stats.reviewed === 1 ? ' question' : ' questions') +
          '. ' + stats.promoted + (stats.promoted === 1 ? ' moved' : ' moved') + ' to a later box. ' +
          stats.retired + (stats.retired === 1 ? ' retired' : ' retired') + ' from the deck.'
      })
    ]));
    actions = el('div', { class: 'chapter-cta' });
    again = el('button', { type: 'button', class: 'btn btn-secondary', text: 'Back to review' });
    again.addEventListener('click', function () { renderReviewDeck(); });
    home = el('button', { type: 'button', class: 'btn btn-ghost', text: 'Back to home' });
    home.addEventListener('click', function () {
      sh = getNs('HRL_SHELL');
      if (sh && typeof sh.showView === 'function') sh.showView('home');
    });
    actions.appendChild(again);
    actions.appendChild(home);
    shell.appendChild(actions);
    if (host) {
      host.innerHTML = '';
      host.appendChild(shell);
    }
    session.resultShown = true;
    ensureHostNotEmpty(host);
  }

  /* ------------------------------------------------------------------ */
  /* Public DOM API                                                      */
  /* ------------------------------------------------------------------ */

  function start(chapterId) {
    var host;
    var chapter;
    var ids;
    var questions;
    if (!hasDocument()) return;
    host = hostEl('quiz-root');
    if (!host) return;
    chapter = getChapter(chapterId);
    setViewHeading(
      'quiz',
      chapter && chapter.title ? chapter.title + ' — quiz' : 'Chapter quiz',
      true
    );
    ids = chapter && isArray(chapter.quizIds) ? chapter.quizIds : [];
    questions = shuffleArray(resolveIds(ids));
    if (questions.length < 3) {
      host.innerHTML = '';
      host.appendChild(emptyState(
        'This quiz is not ready yet.',
        'A chapter quiz needs at least three questions. You can still read the chapter and come back later.'
      ));
      session = null;
      ensureHostNotEmpty(host);
      return;
    }
    session = newSession('quiz', 'quiz-root', questions, {
      chapterId: chapterId,
      title: chapter && chapter.title ? chapter.title : 'Chapter quiz'
    });
    renderCurrent();
  }

  function nextDueMs(nowMs) {
    var P;
    var state;
    var i;
    var rec;
    var min;
    P = getNs('HRL_PROGRESS');
    if (!P || typeof P.get !== 'function') return null;
    state = P.get();
    if (!state || !isArray(state.review) || !state.review.length) return null;
    min = null;
    for (i = 0; i < state.review.length; i++) {
      rec = state.review[i];
      if (!rec || rec.dueAt == null) continue;
      if (min == null || rec.dueAt < min) min = rec.dueAt;
    }
    if (min == null) return null;
    if (min <= nowMs) return nowMs;
    return min;
  }

  function renderReviewDeck() {
    var host;
    var P;
    var counts;
    var now;
    var shell;
    var startBtn;
    var dueAt;
    var blurb;
    if (!hasDocument()) return;
    host = hostEl('review-root');
    if (!host) return;
    setViewHeading('review', null, true);
    host.innerHTML = '';
    P = getNs('HRL_PROGRESS');
    now = Date.now();
    counts = P && typeof P.reviewCounts === 'function' ? P.reviewCounts(now) : { due: 0, total: 0 };
    shell = el('div', { class: 'quiz-shell' });
    shell.appendChild(el('p', {
      class: 'quiz-prompt',
      text: counts.due === 1 ? '1 question is due' : counts.due + ' questions are due'
    }));
    shell.appendChild(el('p', {
      class: 'hint',
      text: counts.total
        ? (counts.total === 1 ? '1 card is in your deck.' : counts.total + ' cards are in your deck.')
        : 'Missed questions from chapter quizzes and the Baseball IQ test land here.'
    }));
    if (counts.due > 0) {
      startBtn = el('button', { type: 'button', class: 'btn btn-primary', text: 'Start review' });
      startBtn.addEventListener('click', startReview);
      shell.appendChild(startBtn);
    } else {
      dueAt = nextDueMs(now);
      if (counts.total === 0) {
        blurb = 'Get one wrong in a chapter quiz and it will return here on a schedule — first tomorrow, then a few days later, then longer — until it sticks.';
      } else if (dueAt) {
        blurb = 'Nothing is due right now. The next one comes back ' +
          (dueAt <= now + MS_PER_DAY ? 'tomorrow (' + formatDate(dueAt) + ')' : formatDate(dueAt)) + '.';
      } else {
        blurb = 'Nothing is due right now. Missed questions return on a schedule.';
      }
      shell.appendChild(emptyState('You are caught up.', blurb));
    }
    host.appendChild(shell);
  }

  function startReview() {
    var host;
    var P;
    var ids;
    var questions;
    if (!hasDocument()) return;
    host = hostEl('review-root');
    if (!host) return;
    setViewHeading('review', null, true);
    P = getNs('HRL_PROGRESS');
    ids = P && typeof P.dueReviews === 'function' ? P.dueReviews(Date.now()) : [];
    questions = resolveIds(ids);
    if (!questions.length) {
      renderReviewDeck();
      return;
    }
    session = newSession('review', 'review-root', questions, { title: 'Review' });
    renderCurrent();
  }

  /* ------------------------------------------------------------------ */
  /* Export                                                              */
  /* ------------------------------------------------------------------ */

  var api = {
    PASS_PCT: PASS_PCT,
    shuffleArray: shuffleArray,
    shuffleQuestion: shuffleQuestion,
    isCorrect: isCorrect,
    scoreQuiz: scoreQuiz,
    nextBox: nextBox,
    dueDateFor: dueDateFor,
    advanceIndex: advanceIndex,
    isStale: isStale,
    getClass: getClass,
    setClass: setClass,
    addClass: addClass,
    removeClass: removeClass,
    start: start,
    renderReviewDeck: renderReviewDeck,
    startReview: startReview
  };

  root.HRL_QUIZ = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = root.HRL_QUIZ;
  }
}).call(typeof window !== 'undefined' ? window : this);
