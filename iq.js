/* ===================================================================
   Homerun Learn to Play — iq.js
   Adaptive Baseball IQ test (BBIQ 40–160) with optional timer.
   ES5-safe (var, function, string concatenation). Loads as a browser
   script (root.HRL_IQ) and via Node require() for tests.
   =================================================================== */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;

  var TEST_LENGTH = 20;
  var START_DIFFICULTY = 5;
  var STEP_UP = 1.5;
  var STEP_DOWN = 2;
  var TIMER_SECONDS = 45;
  var TOPIC_DIVERSITY_UNTIL = 8;

  var BANDS = [
    { name: 'Rookie', min: 40, max: 69 },
    { name: 'Sandlot', min: 70, max: 89 },
    { name: 'Diamond', min: 90, max: 109 },
    { name: 'Select', min: 110, max: 124 },
    { name: 'Elite', min: 125, max: 139 },
    { name: 'Pro Mind', min: 140, max: 160 }
  ];

  var BAND_BLURB = {
    'Rookie': 'You are just getting started with the language of the game.',
    'Sandlot': 'You know the shape of a game and the basic rules.',
    'Diamond': 'You can follow plays and the job of each position.',
    'Select': 'You read situations the way a regular player does.',
    'Elite': 'You manage the hard rules and the close calls.',
    'Pro Mind': 'You think about the game the way a scout or analyst does.'
  };

  var TOPIC_LABELS = {
    rules: 'Rules',
    field: 'The field',
    positions: 'Positions',
    hitting: 'Hitting',
    pitching: 'Pitching',
    fielding: 'Fielding',
    baserunning: 'Baserunning',
    strategy: 'Strategy',
    safety: 'Safety',
    scoring: 'Scoring',
    analytics: 'Analytics',
    scouting: 'Scouting'
  };

  var test = null;
  var timerId = null;
  var viewListenerBound = false;

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

  function clamp(n, lo, hi) {
    if (n < lo) return lo;
    if (n > hi) return hi;
    return n;
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
          k === 'checked' ||
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

  function topicLabel(topic) {
    if (!topic) return 'Topic';
    if (TOPIC_LABELS[topic]) return TOPIC_LABELS[topic];
    return String(topic).charAt(0).toUpperCase() + String(topic).slice(1);
  }

  function formatDate(iso) {
    var d;
    var months;
    if (!iso) return '';
    d = new Date(iso);
    if (isNaN(d.getTime())) return String(iso);
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }

  /* ------------------------------------------------------------------ */
  /* Pure logic                                                          */
  /* ------------------------------------------------------------------ */

  function nextDifficulty(current, correct) {
    var n = Number(current);
    if (isNaN(n)) n = START_DIFFICULTY;
    n = n + (correct ? STEP_UP : -STEP_DOWN);
    return clamp(n, 1, 10);
  }

  function distinctCount(arr) {
    var seen;
    var i;
    var n;
    seen = {};
    n = 0;
    arr = arr || [];
    for (i = 0; i < arr.length; i++) {
      if (arr[i] == null || seen[arr[i]]) continue;
      seen[arr[i]] = true;
      n += 1;
    }
    return n;
  }

  function usedMap(arr) {
    var m;
    var i;
    m = {};
    arr = arr || [];
    for (i = 0; i < arr.length; i++) {
      if (arr[i] != null) m[arr[i]] = true;
    }
    return m;
  }

  function pickQuestion(pool, targetDifficulty, usedIds, usedTopics) {
    var i;
    var q;
    var best;
    var bestDist;
    var dist;
    var preferNewTopic;
    var topicUnused;
    var bestTopicUnused;
    var idMap;
    var topicMap;
    var target;
    var idCmp;
    pool = pool || [];
    target = Number(targetDifficulty);
    if (isNaN(target)) target = START_DIFFICULTY;
    idMap = usedMap(usedIds);
    topicMap = usedMap(usedTopics);
    preferNewTopic = distinctCount(usedTopics) < TOPIC_DIVERSITY_UNTIL;
    best = null;
    bestDist = Infinity;
    bestTopicUnused = false;
    for (i = 0; i < pool.length; i++) {
      q = pool[i];
      if (!q || q.id == null || idMap[q.id]) continue;
      dist = Math.abs((typeof q.difficulty === 'number' && !isNaN(q.difficulty) ? q.difficulty : 0) - target);
      topicUnused = !!(preferNewTopic && q.topic && !topicMap[q.topic]);
      if (!best) {
        best = q;
        bestDist = dist;
        bestTopicUnused = topicUnused;
        continue;
      }
      if (preferNewTopic) {
        if (topicUnused && !bestTopicUnused) {
          best = q;
          bestDist = dist;
          bestTopicUnused = true;
          continue;
        }
        if (!topicUnused && bestTopicUnused) continue;
      }
      if (dist < bestDist) {
        best = q;
        bestDist = dist;
        bestTopicUnused = topicUnused;
      } else if (dist === bestDist) {
        idCmp = String(q.id) < String(best.id) ? -1 : String(q.id) > String(best.id) ? 1 : 0;
        if (idCmp < 0) {
          best = q;
          bestTopicUnused = topicUnused;
        }
      }
    }
    return best;
  }

  function computeBbiq(presented) {
    var i;
    var totalD;
    var correctD;
    var d;
    var raw;
    var bbiq;
    var item;
    presented = presented || [];
    totalD = 0;
    correctD = 0;
    for (i = 0; i < presented.length; i++) {
      item = presented[i];
      d = item && typeof item.difficulty === 'number' ? item.difficulty : 0;
      if (isNaN(d)) d = 0;
      totalD += d;
      if (item && item.correct) correctD += d;
    }
    raw = totalD > 0 ? correctD / totalD : 0;
    if (raw < 0) raw = 0;
    if (raw > 1) raw = 1;
    bbiq = Math.round(40 + 120 * raw);
    if (isNaN(bbiq) || bbiq < 40) bbiq = 40;
    if (bbiq > 160) bbiq = 160;
    return bbiq;
  }

  function bandFor(bbiq) {
    var n = Number(bbiq);
    if (isNaN(n)) n = 40;
    if (n < 70) return 'Rookie';
    if (n < 90) return 'Sandlot';
    if (n < 110) return 'Diamond';
    if (n < 125) return 'Select';
    if (n < 140) return 'Elite';
    return 'Pro Mind';
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

  function topicBreakdown(presented) {
    var out;
    var i;
    var item;
    var topic;
    var rec;
    out = {};
    presented = presented || [];
    for (i = 0; i < presented.length; i++) {
      item = presented[i];
      if (!item) continue;
      topic = item.topic || 'other';
      if (!out[topic]) out[topic] = { correct: 0, total: 0, pct: 0 };
      rec = out[topic];
      rec.total += 1;
      if (item.correct) rec.correct += 1;
    }
    for (topic in out) {
      if (!hasOwn(out, topic)) continue;
      rec = out[topic];
      rec.pct = rec.total > 0 ? Math.round((rec.correct / rec.total) * 100) : 0;
    }
    return out;
  }

  /* ------------------------------------------------------------------ */
  /* Timer / motion                                                      */
  /* ------------------------------------------------------------------ */

  function prefersReducedMotion() {
    var P = getNs('HRL_PROGRESS');
    if (P && typeof P.getSetting === 'function' && P.getSetting('reducedMotion')) return true;
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      try {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
      } catch (e) {}
    }
    return false;
  }

  function timerEnabled() {
    var P = getNs('HRL_PROGRESS');
    if (P && typeof P.getSetting === 'function') return P.getSetting('timerEnabled') !== false;
    return true;
  }

  function clearTimer() {
    if (timerId != null) {
      clearInterval(timerId);
      timerId = null;
    }
    if (test) test.remaining = null;
  }

  function bindViewListener() {
    var sh = getNs('HRL_SHELL');
    if (viewListenerBound || !sh || typeof sh.on !== 'function') return;
    viewListenerBound = true;
    sh.on('viewchange', function (payload) {
      if (!payload || payload.view !== 'iq') clearTimer();
    });
  }

  function startTimer() {
    var token;
    clearTimer();
    if (!test || !test.timerOn || test.finished) return;
    token = test.renderToken;
    test.remaining = TIMER_SECONDS;
    test.reducedMotion = prefersReducedMotion();
    updateTimerLabel();
    timerId = setInterval(function () {
      if (!test || test.finished || isStale(test, token)) {
        clearTimer();
        return;
      }
      test.remaining -= 1;
      updateTimerLabel();
      if (test.remaining <= 0) {
        clearTimer();
        submitAnswer(null, true);
      }
    }, 1000);
  }

  function updateTimerLabel() {
    var node;
    if (!hasDocument()) return;
    node = document.getElementById('iq-countdown');
    if (!node || !test) return;
    if (!test.timerOn) {
      node.textContent = 'Relaxed mode — there is no clock on these questions.';
      return;
    }
    node.textContent = test.remaining + (test.remaining === 1 ? ' second left' : ' seconds left');
  }

  /* ------------------------------------------------------------------ */
  /* Question presentation                                               */
  /* ------------------------------------------------------------------ */

  function questionPool() {
    var Q = getNs('HRL_QUESTIONS');
    if (Q && isArray(Q.items)) return Q.items;
    return [];
  }

  function presentQuestion(q) {
    var quiz = getNs('HRL_QUIZ');
    if (quiz && typeof quiz.shuffleQuestion === 'function') return quiz.shuffleQuestion(q);
    return q;
  }

  function pickNext() {
    var q;
    q = pickQuestion(questionPool(), test.difficulty, test.usedIds, test.usedTopics);
    if (!q) return null;
    return presentQuestion(q);
  }

  function isCorrect(question, response) {
    var quiz = getNs('HRL_QUIZ');
    var i;
    var items;
    if (quiz && typeof quiz.isCorrect === 'function') return quiz.isCorrect(question, response);
    if (!question) return false;
    if (question.type === 'hotspot') return indexOf(question.targets || [], response) !== -1;
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

  function hotspotLabel(id) {
    var svg = getNs('HRL_SVG');
    if (svg && typeof svg.hotspotLabel === 'function') return svg.hotspotLabel(id);
    return String(id == null ? '' : id);
  }

  function formatResponse(question, response) {
    var parts;
    var i;
    if (!question) return '';
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
    if (!question) return '';
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
    if (question.choices && typeof question.answer === 'number') return String(question.choices[question.answer]);
    return '';
  }

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

  function hostEl() {
    if (!hasDocument()) return null;
    return document.getElementById('iq-root');
  }

  function setViewHeading(hideHint) {
    var sh = getNs('HRL_SHELL');
    if (sh && typeof sh.setViewHeading === 'function') {
      sh.setViewHeading('iq', null, hideHint);
    }
  }

  function moveOrder(idx, dir) {
    var arr;
    var j;
    var tmp;
    if (!test || test.finished || test.locked) return;
    arr = test.orderWorking;
    j = idx + dir;
    if (j < 0 || j >= arr.length) return;
    tmp = arr[idx];
    arr[idx] = arr[j];
    arr[j] = tmp;
    renderQuestion();
  }

  function bindHotspots(container, token) {
    var nodes;
    var i;
    function onActivate(ev) {
      var id;
      var key;
      if (!test || test.finished || isStale(test, token)) return;
      if (test.locked) return;
      if (ev.type === 'keydown') {
        key = ev.key || ev.keyCode;
        if (key !== 'Enter' && key !== ' ' && key !== 'Spacebar' && key !== 13 && key !== 32) return;
        if (ev.preventDefault) ev.preventDefault();
      }
      id = ev.currentTarget.getAttribute('data-hotspot');
      submitAnswer(id, false);
    }
    nodes = container.querySelectorAll('[data-hotspot]');
    for (i = 0; i < nodes.length; i++) {
      nodes[i].addEventListener('click', onActivate);
      nodes[i].addEventListener('keydown', onActivate);
    }
  }

  function renderDots(shell) {
    var list;
    var i;
    var cls;
    list = el('div', {
      class: 'quiz-progress-dots',
      role: 'img',
      'aria-label': 'Question ' + (test.presented.length + 1) + ' of ' + TEST_LENGTH
    });
    for (i = 0; i < TEST_LENGTH; i++) {
      cls = 'quiz-dot';
      if (i < test.presented.length) cls += ' answered';
      if (i === test.presented.length) cls += ' current';
      list.appendChild(el('span', { class: cls, 'aria-hidden': 'true' }));
    }
    shell.appendChild(list);
  }

  function renderQuestion() {
    var host;
    var shell;
    var q;
    var list;
    var i;
    var btn;
    var row;
    var text;
    var btns;
    var up;
    var down;
    var itemText;
    var diagramWrap;
    var timerNote;
    var token;
    if (!test) return;
    host = hostEl();
    if (!host) return;
    setViewHeading(true);
    if (test.finished) {
      if (!host.firstChild) finishTest();
      else ensureHostNotEmpty(host);
      return;
    }
    q = test.current;
    if (!q) {
      finishTest();
      return;
    }
    token = nextRenderToken(test);
    host.innerHTML = '';
    shell = el('div', { class: 'quiz-shell' });
    shell.appendChild(el('p', { class: 'hint', text: 'Baseball IQ — no feedback until the end.' }));
    renderDots(shell);
    shell.appendChild(el('p', { class: 'quiz-prompt', text: q.prompt || '' }));

    timerNote = el('p', {
      class: 'hint',
      id: 'iq-countdown'
    });
    if (test.timerOn) {
      timerNote.textContent = (test.remaining != null ? test.remaining : TIMER_SECONDS) + ' seconds left';
    } else {
      timerNote.textContent = 'Relaxed mode — there is no clock on these questions.';
    }
    shell.appendChild(timerNote);

    if (q.type === 'hotspot') {
      diagramWrap = el('div', { class: 'quiz-hotspot', html: renderDiagramHtml(q) });
      shell.appendChild(diagramWrap);
      bindHotspots(diagramWrap, token);
    } else if (q.type === 'order') {
      if (!test.orderWorking || !test.orderWorking.length) {
        test.orderWorking = (q.presentedItems && q.presentedItems.length)
          ? q.presentedItems.slice()
          : (q.items || []).slice();
      }
      list = el('div', { class: 'choice-list', role: 'list' });
      for (i = 0; i < test.orderWorking.length; i++) {
        itemText = String(test.orderWorking[i]);
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
        if (i === 0) up.disabled = true;
        if (i === test.orderWorking.length - 1) down.disabled = true;
        (function (idx) {
          up.addEventListener('click', function () {
            if (!test || test.finished || isStale(test, token)) return;
            moveOrder(idx, -1);
          });
          down.addEventListener('click', function () {
            if (!test || test.finished || isStale(test, token)) return;
            moveOrder(idx, 1);
          });
        }(i));
        btns.appendChild(up);
        btns.appendChild(down);
        row.appendChild(text);
        row.appendChild(btns);
        list.appendChild(row);
      }
      shell.appendChild(list);
      btn = el('button', { type: 'button', class: 'btn btn-primary', text: 'Confirm order' });
      btn.addEventListener('click', function () {
        if (!test || test.finished || isStale(test, token)) return;
        btn.disabled = true;
        submitAnswer(test.orderWorking.slice(), false);
      });
      shell.appendChild(btn);
    } else {
      list = el('div', { class: 'choice-list', role: 'list' });
      for (i = 0; i < (q.choices || []).length; i++) {
        btn = el('button', {
          type: 'button',
          class: 'choice-btn',
          text: String(q.choices[i]),
          role: 'listitem'
        });
        (function (idx, choiceBtn) {
          choiceBtn.addEventListener('click', function () {
            if (!test || test.finished || isStale(test, token)) return;
            if (test.locked) return;
            choiceBtn.disabled = true;
            submitAnswer(idx, false);
          });
        }(i, btn));
        list.appendChild(btn);
      }
      shell.appendChild(list);
    }
    host.appendChild(shell);
    ensureHostNotEmpty(host);
  }

  function submitAnswer(response, timedOut) {
    var q;
    var correct;
    var row;
    var P;
    var step;
    if (!test || test.finished || test.locked) return;
    q = test.current;
    if (!q) {
      finishTest();
      return;
    }
    test.locked = true;
    clearTimer();
    correct = timedOut ? false : isCorrect(q, response);
    row = {
      id: q.id,
      topic: q.topic,
      difficulty: typeof q.difficulty === 'number' ? q.difficulty : 0,
      correct: correct,
      response: timedOut ? null : response,
      question: q,
      timedOut: !!timedOut
    };
    test.presented.push(row);
    test.usedIds.push(q.id);
    if (q.topic) test.usedTopics.push(q.topic);
    test.difficulty = nextDifficulty(test.difficulty, correct);
    P = getNs('HRL_PROGRESS');
    if (!correct && P && typeof P.addMiss === 'function' && q.id) {
      P.addMiss(q.id, Date.now());
    }
    step = advanceIndex(test, TEST_LENGTH);
    if (step.finished) {
      finishTest();
      return;
    }
    test.current = pickNext();
    test.locked = false;
    test.orderWorking = [];
    if (!test.current) {
      finishTest();
      return;
    }
    renderQuestion();
    if (test.timerOn) startTimer();
  }

  function sortTopics(breakdown, strong) {
    var keys;
    var k;
    keys = [];
    for (k in breakdown) {
      if (hasOwn(breakdown, k)) keys.push(k);
    }
    keys.sort(function (a, b) {
      var pa = breakdown[a].pct;
      var pb = breakdown[b].pct;
      if (pa !== pb) return strong ? (pb - pa) : (pa - pb);
      if (breakdown[a].total !== breakdown[b].total) {
        return strong ? (breakdown[b].total - breakdown[a].total) : (breakdown[a].total - breakdown[b].total);
      }
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    return keys;
  }

  function chaptersForTopic(topic) {
    var seen;
    var out;
    var i;
    var q;
    var Q;
    var list;
    var cur;
    var ch;
    seen = {};
    out = [];
    if (test) {
      for (i = 0; i < test.presented.length; i++) {
        q = test.presented[i].question;
        if (q && q.topic === topic && q.chapter && !seen[q.chapter]) {
          seen[q.chapter] = true;
          out.push(q.chapter);
        }
      }
    }
    Q = getNs('HRL_QUESTIONS');
    if (Q && typeof Q.byTopic === 'function') {
      list = Q.byTopic(topic) || [];
      for (i = 0; i < list.length; i++) {
        if (list[i] && list[i].chapter && !seen[list[i].chapter]) {
          seen[list[i].chapter] = true;
          out.push(list[i].chapter);
        }
      }
    }
    cur = getNs('HRL_CURRICULUM');
    for (i = 0; i < out.length; i++) {
      ch = cur && typeof cur.getChapter === 'function' ? cur.getChapter(out[i]) : null;
      out[i] = {
        id: out[i],
        title: ch && ch.title ? ch.title : out[i]
      };
    }
    return out;
  }

  function renderTopicLinks(host, title, topics, breakdown) {
    var wrap;
    var i;
    var t;
    var row;
    var rec;
    var chs;
    var j;
    var btn;
    var sh;
    wrap = el('div', { class: 'topic-breakdown' });
    wrap.appendChild(el('p', {}, [el('strong', { text: title })]));
    for (i = 0; i < topics.length; i++) {
      t = topics[i];
      rec = breakdown[t];
      row = el('p');
      row.appendChild(el('strong', { text: topicLabel(t) }));
      row.appendChild(document.createTextNode(
        ' — ' + (rec ? rec.pct : 0) + '% (' + (rec ? rec.correct : 0) + '/' + (rec ? rec.total : 0) + '). '
      ));
      chs = chaptersForTopic(t);
      for (j = 0; j < chs.length && j < 4; j++) {
        btn = el('button', {
          type: 'button',
          class: 'term-btn',
          text: chs[j].title
        });
        (function (chapterId) {
          btn.addEventListener('click', function () {
            sh = getNs('HRL_SHELL');
            if (sh && typeof sh.openChapter === 'function') sh.openChapter(chapterId);
          });
        }(chs[j].id));
        if (j > 0) row.appendChild(document.createTextNode(', '));
        row.appendChild(btn);
      }
      wrap.appendChild(row);
    }
    host.appendChild(wrap);
  }

  function finishTest() {
    var host;
    var shell;
    var bbiq;
    var band;
    var byTopic;
    var P;
    var svgNs;
    var radarOpts;
    var topics;
    var k;
    var rec;
    var strong;
    var weak;
    var used;
    var i;
    var review;
    var card;
    var q;
    var item;
    var actions;
    var retake;
    var home;
    var sh;
    var answers;
    clearTimer();
    if (!test) return;
    host = hostEl();
    if (test.resultShown) {
      ensureHostNotEmpty(host);
      return;
    }
    test.finished = true;
    test.resultShown = true;
    nextRenderToken(test);
    setViewHeading(true);
    bbiq = computeBbiq(test.presented);
    band = bandFor(bbiq);
    byTopic = topicBreakdown(test.presented);
    answers = [];
    for (i = 0; i < test.presented.length; i++) {
      item = test.presented[i];
      if (!item) continue;
      answers.push({
        id: item.id,
        topic: item.topic,
        difficulty: item.difficulty,
        correct: item.correct,
        response: item.response
      });
    }
    P = getNs('HRL_PROGRESS');
    if (!test.recorded && P && typeof P.recordIq === 'function') {
      P.recordIq({
        takenAt: new Date().toISOString(),
        bbiq: bbiq,
        band: band,
        byTopic: byTopic,
        answers: answers
      });
      test.recorded = true;
    }

    if (!host) return;
    shell = el('div', { class: 'quiz-shell' });
    shell.appendChild(el('div', { class: 'quiz-result' }, [
      el('p', { class: 'bbiq-score', text: String(bbiq) }),
      el('p', { class: 'bbiq-band', text: band }),
      el('p', { class: 'hint', text: BAND_BLURB[band] || '' })
    ]));

    svgNs = getNs('HRL_SVG');
    topics = [];
    for (k in byTopic) {
      if (!hasOwn(byTopic, k)) continue;
      rec = byTopic[k];
      topics.push({ label: topicLabel(k), value: rec.pct / 100 });
    }
    if (svgNs && typeof svgNs.radar === 'function') {
      radarOpts = {
        title: 'Topic breakdown',
        desc: 'Radar chart of Baseball IQ accuracy by topic, from 0 to 100 percent.',
        topics: topics,
        showValues: true
      };
      shell.appendChild(el('div', { class: 'topic-breakdown', html: svgNs.radar(radarOpts) }));
    }

    strong = sortTopics(byTopic, true).slice(0, 3);
    used = {};
    for (i = 0; i < strong.length; i++) used[strong[i]] = true;
    weak = [];
    rec = sortTopics(byTopic, false);
    for (i = 0; i < rec.length && weak.length < 3; i++) {
      if (used[rec[i]] && rec.length > 3) continue;
      weak.push(rec[i]);
    }
    if (strong.length) renderTopicLinks(shell, 'Strongest topics', strong, byTopic);
    if (weak.length) renderTopicLinks(shell, 'Weakest topics', weak, byTopic);

    review = el('div', { class: 'answer-review' });
    review.appendChild(el('p', {}, [el('strong', { text: 'Answer review' })]));
    for (i = 0; i < test.presented.length; i++) {
      item = test.presented[i];
      if (!item) continue;
      q = item.question;
      card = el('div');
      card.appendChild(el('p', {}, [el('strong', { text: q && q.prompt ? q.prompt : '' })]));
      card.appendChild(el('p', {
        text: item.timedOut
          ? 'Your answer: (time expired)'
          : 'Your answer: ' + formatResponse(q, item.response)
      }));
      card.appendChild(el('p', { text: 'Correct answer: ' + formatCorrect(q) }));
      if (q && q.explain) card.appendChild(el('p', { text: q.explain }));
      review.appendChild(card);
    }
    shell.appendChild(review);

    actions = el('div', { class: 'chapter-cta' });
    retake = el('button', { type: 'button', class: 'btn btn-primary', text: 'Retake' });
    retake.addEventListener('click', function () { start(); });
    home = el('button', { type: 'button', class: 'btn btn-ghost', text: 'Back to home' });
    home.addEventListener('click', function () {
      sh = getNs('HRL_SHELL');
      if (sh && typeof sh.showView === 'function') sh.showView('home');
    });
    actions.appendChild(retake);
    actions.appendChild(home);
    shell.appendChild(actions);
    host.innerHTML = '';
    host.appendChild(shell);
    ensureHostNotEmpty(host);
  }

  /* ------------------------------------------------------------------ */
  /* Intro / start                                                       */
  /* ------------------------------------------------------------------ */

  function emptyState(title, blurb) {
    var wrap = el('div', { class: 'empty-state' });
    wrap.appendChild(el('p', {}, [el('strong', { text: title })]));
    if (blurb) wrap.appendChild(el('p', { text: blurb }));
    return wrap;
  }

  function leaveIqHost() {
    var sh = getNs('HRL_SHELL');
    if (sh && typeof sh.showView === 'function') sh.showView('path');
  }

  function renderEscapableEmpty(host) {
    var wrap;
    var btn;
    if (!host) return;
    host.innerHTML = '';
    wrap = emptyState(
      'Nothing to show here.',
      'This Baseball IQ test could not display the next screen. You can go back to My Path and try again.'
    );
    btn = el('button', {
      type: 'button',
      class: 'btn btn-primary',
      text: 'Back to My Path'
    });
    btn.addEventListener('click', leaveIqHost);
    wrap.appendChild(btn);
    host.appendChild(wrap);
  }

  function ensureHostNotEmpty(host) {
    if (!host) return;
    if (host.firstChild) return;
    renderEscapableEmpty(host);
  }

  function renderIntro() {
    var host;
    var shell;
    var P;
    var best;
    var history;
    var svgNs;
    var series;
    var i;
    var a;
    var list;
    var row;
    var toggle;
    var label;
    var startBtn;
    var timerOn;
    var oldest;
    bindViewListener();
    clearTimer();
    if (!hasDocument()) return;
    host = hostEl();
    if (!host) return;
    setViewHeading(true);
    host.innerHTML = '';
    P = getNs('HRL_PROGRESS');
    timerOn = timerEnabled();
    shell = el('div', { class: 'quiz-shell' });
    shell.appendChild(el('p', { class: 'quiz-prompt', text: 'A 20-question adaptive Baseball IQ test.' }));
    shell.appendChild(el('p', {
      class: 'hint',
      text: 'Questions get a little harder when you are right and a little easier when you are not. There is no right/wrong feedback until the end — this is a snapshot, not a lesson.'
    }));
    shell.appendChild(el('p', {
      class: 'hint',
      text: 'Your score is Baseball IQ on a 40–160 scale, with a band from Rookie to Pro Mind and a breakdown by topic.'
    }));

    toggle = el('input', { type: 'checkbox', id: 'iq-timer-toggle' });
    toggle.checked = timerOn;
    toggle.addEventListener('change', function () {
      if (P && typeof P.setSetting === 'function') P.setSetting('timerEnabled', !!toggle.checked);
    });
    label = el('label', { 'for': 'iq-timer-toggle' });
    label.appendChild(toggle);
    label.appendChild(document.createTextNode(' 45-second timer per question'));
    shell.appendChild(el('p', {}, [label]));
    shell.appendChild(el('p', {
      class: 'hint',
      text: 'Turn the timer off for relaxed mode — no clock, no rush. The countdown never uses a spinning animation when you have asked for reduced motion.'
    }));

    startBtn = el('button', { type: 'button', class: 'btn btn-primary', text: 'Start' });
    startBtn.addEventListener('click', function () { start(); });
    shell.appendChild(startBtn);

    best = P && typeof P.bestIq === 'function' ? P.bestIq() : null;
    history = P && typeof P.iqHistory === 'function' ? P.iqHistory() : [];
    if (best && best.bbiq != null) {
      shell.appendChild(el('p', {
        class: 'hint',
        text: 'Best BBIQ: ' + best.bbiq + (best.band ? ' (' + best.band + ')' : '')
      }));
    } else {
      shell.appendChild(emptyState(
        'No attempts yet.',
        'Take the test once and your score will land here, with a chart of later attempts.'
      ));
    }

    svgNs = getNs('HRL_SVG');
    if (history.length && svgNs && typeof svgNs.bar === 'function') {
      oldest = history.slice().reverse();
      if (oldest.length > 12) oldest = oldest.slice(oldest.length - 12);
      series = [];
      for (i = 0; i < oldest.length; i++) {
        a = oldest[i];
        series.push({
          label: formatDate(a.takenAt) || ('Attempt ' + (i + 1)),
          value: typeof a.bbiq === 'number' ? a.bbiq : 0
        });
      }
      shell.appendChild(el('div', {
        class: 'topic-breakdown',
        html: svgNs.bar({
          title: 'Past Baseball IQ scores',
          desc: 'Horizontal bars of previous Baseball IQ scores on the 40 to 160 scale.',
          series: series,
          max: 160
        })
      }));
    }

    if (history.length) {
      list = el('div', { class: 'answer-review' });
      list.appendChild(el('p', {}, [el('strong', { text: 'Past attempts' })]));
      for (i = 0; i < history.length; i++) {
        a = history[i];
        row = el('div');
        row.appendChild(el('p', {
          text: formatDate(a.takenAt) + ' — BBIQ ' + a.bbiq + (a.band ? ' · ' + a.band : '')
        }));
        list.appendChild(row);
      }
      shell.appendChild(list);
    }

    host.appendChild(shell);
  }

  function start() {
    var host;
    var first;
    bindViewListener();
    clearTimer();
    if (!hasDocument()) return;
    host = hostEl();
    if (!host) return;
    setViewHeading(true);
    test = {
      difficulty: START_DIFFICULTY,
      usedIds: [],
      usedTopics: [],
      presented: [],
      current: null,
      index: 0,
      locked: false,
      orderWorking: [],
      timerOn: timerEnabled(),
      remaining: TIMER_SECONDS,
      recorded: false,
      finished: false,
      renderToken: 0,
      resultShown: false
    };
    first = pickNext();
    if (!first) {
      host.innerHTML = '';
      host.appendChild(emptyState(
        'The question bank is empty.',
        'The Baseball IQ test needs questions loaded before it can start.'
      ));
      test = null;
      ensureHostNotEmpty(host);
      return;
    }
    test.current = first;
    renderQuestion();
    if (test.timerOn) startTimer();
  }

  /* ------------------------------------------------------------------ */
  /* Export                                                              */
  /* ------------------------------------------------------------------ */

  var api = {
    TEST_LENGTH: TEST_LENGTH,
    START_DIFFICULTY: START_DIFFICULTY,
    STEP_UP: STEP_UP,
    STEP_DOWN: STEP_DOWN,
    BANDS: BANDS,
    nextDifficulty: nextDifficulty,
    pickQuestion: pickQuestion,
    computeBbiq: computeBbiq,
    bandFor: bandFor,
    topicBreakdown: topicBreakdown,
    advanceIndex: advanceIndex,
    isStale: isStale,
    renderIntro: renderIntro,
    start: start
  };

  root.HRL_IQ = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = root.HRL_IQ;
  }
}).call(typeof window !== 'undefined' ? window : this);
