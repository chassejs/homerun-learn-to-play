/* ===================================================================
   Homerun Learn to Play — placement.js
   First-run onboarding: self-report plus a short adaptive probe.
   ES5-safe (var, function, string concatenation). Loads as a browser
   script (root.HRL_PLACEMENT) and via Node require() for tests.
   =================================================================== */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;

  var PROBE_LENGTH = 8;
  var START_DIFFICULTY = 4;
  var STEP_UP = 1.5;
  var STEP_DOWN = 2;
  var SKIP_TIER = 1;
  var TOPIC_DIVERSITY_UNTIL = 8;

  var SELF_REPORT = [
    {
      id: 'role',
      prompt: 'What brings you here?',
      options: [
        { value: 'player', label: 'I play, or I am learning to play', tierHint: 3 },
        { value: 'parent', label: 'I am a parent or caregiver of a player', tierHint: 2 },
        { value: 'coach', label: 'I coach a team', tierHint: 4 },
        { value: 'fan', label: 'I want to follow a game I\'m watching', tierHint: 1 }
      ]
    },
    {
      id: 'experience',
      prompt: 'How much baseball have you played or been around?',
      options: [
        { value: 'never', label: 'I have never really been around the game', tierHint: 1 },
        { value: 'one-season', label: 'About one season', tierHint: 2 },
        { value: 'few-years', label: 'A few years', tierHint: 4 },
        { value: 'many-years', label: 'Many years', tierHint: 5 },
        { value: 'high-level', label: 'I played at a high level', tierHint: 6 }
      ]
    },
    {
      id: 'goal',
      prompt: 'What do you want from this?',
      options: [
        { value: 'follow-a-game', label: 'Understand a game I\'m watching', tierHint: 1 },
        { value: 'play-better', label: 'Play better', tierHint: 3 },
        { value: 'coach-a-team', label: 'Coach a team', tierHint: 4 },
        { value: 'strategy-and-analytics', label: 'Go deeper on strategy and analytics', tierHint: 6 }
      ]
    }
  ];

  var place = null;

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
    if (typeof n !== 'number' || isNaN(n)) return lo;
    if (n < lo) return lo;
    if (n > hi) return hi;
    return n;
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
        if (k === 'class') node.className = val;
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

  function hostEl() {
    if (!hasDocument()) return null;
    return document.getElementById('quiz-root');
  }

  function setViewHeading(headingText, hideHint) {
    var S = getNs('HRL_SHELL');
    if (S && typeof S.setViewHeading === 'function') {
      S.setViewHeading('quiz', headingText, hideHint);
    }
  }

  function restoreQuizChrome() {
    setViewHeading('Chapter quiz', false);
  }

  /* ------------------------------------------------------------------ */
  /* Pure logic                                                          */
  /* ------------------------------------------------------------------ */

  function hintFor(question, value) {
    var i;
    var opt;
    if (!question || !question.options) return 1;
    for (i = 0; i < question.options.length; i++) {
      opt = question.options[i];
      if (opt && opt.value === value) {
        return typeof opt.tierHint === 'number' ? opt.tierHint : 1;
      }
    }
    return 1;
  }

  function selfReportTier(answers) {
    var roleH;
    var expH;
    var goalH;
    var raw;
    answers = answers || {};
    roleH = hintFor(SELF_REPORT[0], answers.role);
    expH = hintFor(SELF_REPORT[1], answers.experience);
    goalH = hintFor(SELF_REPORT[2], answers.goal);
    raw = 0.20 * roleH + 0.55 * expH + 0.25 * goalH;
    raw = Math.round(raw);
    if (isNaN(raw) || raw < 1) raw = 1;
    if (raw > 6) raw = 6;
    return raw;
  }

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
    var IQ;
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
    IQ = getNs('HRL_IQ');
    if (IQ && typeof IQ.pickQuestion === 'function') {
      return IQ.pickQuestion(pool, targetDifficulty, usedIds, usedTopics);
    }
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

  function theta(results) {
    var diffs;
    var i;
    var n;
    var sum;
    var d;
    diffs = [];
    results = results || [];
    for (i = 0; i < results.length; i++) {
      if (results[i] && results[i].correct) {
        d = results[i].difficulty;
        if (typeof d !== 'number' || isNaN(d)) d = 0;
        diffs.push(d);
      }
    }
    if (!diffs.length) return 0;
    diffs.sort(function (a, b) { return b - a; });
    n = Math.min(3, diffs.length);
    sum = 0;
    for (i = 0; i < n; i++) sum += diffs[i];
    return sum / n;
  }

  function recommendTier(thetaValue, selfTier, role) {
    var tierScore;
    var tier;
    thetaValue = Number(thetaValue);
    if (isNaN(thetaValue)) thetaValue = 0;
    selfTier = Number(selfTier);
    if (isNaN(selfTier)) selfTier = 1;
    tierScore = 0.65 * (thetaValue / 1.6) + 0.35 * selfTier;
    tier = Math.round(tierScore);
    if (isNaN(tier)) tier = 1;
    tier = clamp(tier, 1, 6);
    if (role === 'coach') tier = Math.max(tier, 3);
    return tier;
  }

  /* ------------------------------------------------------------------ */
  /* Probe helpers                                                       */
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

  function tierByNumber(n) {
    var cur = getNs('HRL_CURRICULUM');
    var i;
    var t;
    if (!cur || !isArray(cur.tiers)) return null;
    for (i = 0; i < cur.tiers.length; i++) {
      t = cur.tiers[i];
      if (t && t.order === n) return t;
    }
    if (n >= 1 && n <= cur.tiers.length) return cur.tiers[n - 1];
    return null;
  }

  function firstChapterOfTier(tierObj) {
    var cur = getNs('HRL_CURRICULUM');
    if (!tierObj) return null;
    if (cur && typeof cur.firstChapterOfTier === 'function') {
      return cur.firstChapterOfTier(tierObj.key);
    }
    return null;
  }

  function reasonFor(tier, role, selfTier, thetaValue, tierObj) {
    var name = tierObj && tierObj.name ? tierObj.name : ('tier ' + tier);
    if (role === 'coach') {
      return 'You coach, so we start you at ' + name + ' — the mechanics chapters live there. You can still open any earlier chapter whenever you want.';
    }
    if (thetaValue >= 7) {
      return 'You handled the harder questions comfortably, so we will start you at ' + name + '.';
    }
    if (thetaValue === 0 && selfTier <= 2) {
      return 'We will start you at ' + name + ' so you can build from the ground up.';
    }
    if (tier >= 3) {
      return 'You\'re comfortable with the rules, so we\'ll start you at ' + name + '.';
    }
    return 'We will start you at ' + name + '. Every chapter stays unlocked.';
  }

  /* ------------------------------------------------------------------ */
  /* Render                                                              */
  /* ------------------------------------------------------------------ */

  function skipControl() {
    var btn;
    if (place && place.opts && place.opts.skippable === false) return null;
    btn = el('button', {
      type: 'button',
      class: 'btn btn-ghost',
      text: 'Start from the very beginning'
    });
    btn.addEventListener('click', skip);
    return btn;
  }

  function wrapShell(children) {
    var shell = el('div', { class: 'quiz-shell' });
    var skipBtn = skipControl();
    var i;
    if (skipBtn) shell.appendChild(skipBtn);
    if (children) {
      for (i = 0; i < children.length; i++) {
        if (children[i]) shell.appendChild(children[i]);
      }
    }
    return shell;
  }

  function renderSelf() {
    var host;
    var q;
    var list;
    var i;
    var btn;
    var intro;
    host = hostEl();
    if (!host || !place) return;
    q = SELF_REPORT[place.selfIndex];
    if (!q) {
      beginProbe();
      return;
    }
    host.innerHTML = '';
    intro = [];
    if (place.selfIndex === 0) {
      intro.push(el('p', {
        class: 'hint',
        text: 'There are no wrong answers here — this just finds your starting point. Every chapter stays unlocked, and you can start anywhere.'
      }));
    }
    intro.push(el('p', {
      class: 'hint',
      text: 'Question ' + (place.selfIndex + 1) + ' of ' + SELF_REPORT.length
    }));
    intro.push(el('p', { class: 'quiz-prompt', text: q.prompt }));
    list = el('div', { class: 'choice-list', role: 'list' });
    for (i = 0; i < q.options.length; i++) {
      btn = el('button', {
        type: 'button',
        class: 'choice-btn',
        text: q.options[i].label,
        role: 'listitem'
      });
      (function (opt) {
        btn.addEventListener('click', function () {
          place.answers[q.id] = opt.value;
          place.selfIndex += 1;
          if (place.selfIndex >= SELF_REPORT.length) beginProbe();
          else renderSelf();
        });
      }(q.options[i]));
      list.appendChild(btn);
    }
    intro.push(list);
    host.appendChild(wrapShell(intro));
  }

  function renderDots(shell) {
    var list;
    var i;
    var cls;
    list = el('div', {
      class: 'quiz-progress-dots',
      role: 'img',
      'aria-label': 'Question ' + (place.probe.length + 1) + ' of ' + PROBE_LENGTH
    });
    for (i = 0; i < PROBE_LENGTH; i++) {
      cls = 'quiz-dot';
      if (i < place.probe.length) cls += ' answered';
      if (i === place.probe.length) cls += ' current';
      list.appendChild(el('span', { class: cls, 'aria-hidden': 'true' }));
    }
    shell.appendChild(list);
  }

  function moveOrder(idx, dir) {
    var arr;
    var j;
    var tmp;
    if (!place) return;
    arr = place.orderWorking;
    j = idx + dir;
    if (j < 0 || j >= arr.length) return;
    tmp = arr[idx];
    arr[idx] = arr[j];
    arr[j] = tmp;
    renderProbe();
  }

  function bindHotspots(container) {
    var nodes;
    var i;
    function onActivate(ev) {
      var id;
      var key;
      if (!place) return;
      if (ev.type === 'keydown') {
        key = ev.key || ev.keyCode;
        if (key !== 'Enter' && key !== ' ' && key !== 'Spacebar' && key !== 13 && key !== 32) return;
        if (ev.preventDefault) ev.preventDefault();
      }
      id = ev.currentTarget.getAttribute('data-hotspot');
      submitProbe(id);
    }
    nodes = container.querySelectorAll('[data-hotspot]');
    for (i = 0; i < nodes.length; i++) {
      nodes[i].addEventListener('click', onActivate);
      nodes[i].addEventListener('keydown', onActivate);
    }
  }

  function renderProbe() {
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
    host = hostEl();
    if (!host || !place) return;
    q = place.current;
    if (!q) {
      finishPlacement();
      return;
    }
    host.innerHTML = '';
    shell = wrapShell();
    renderDots(shell);
    shell.appendChild(el('p', { class: 'quiz-prompt', text: q.prompt || '' }));

    if (q.type === 'hotspot') {
      diagramWrap = el('div', { class: 'quiz-hotspot', html: renderDiagramHtml(q) });
      shell.appendChild(diagramWrap);
      bindHotspots(diagramWrap);
    } else if (q.type === 'order') {
      if (!place.orderWorking || !place.orderWorking.length) {
        place.orderWorking = (q.presentedItems && q.presentedItems.length)
          ? q.presentedItems.slice()
          : (q.items || []).slice();
      }
      list = el('div', { class: 'choice-list', role: 'list' });
      for (i = 0; i < place.orderWorking.length; i++) {
        itemText = String(place.orderWorking[i]);
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
        if (i === place.orderWorking.length - 1) down.disabled = true;
        (function (idx) {
          up.addEventListener('click', function () { moveOrder(idx, -1); });
          down.addEventListener('click', function () { moveOrder(idx, 1); });
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
        submitProbe(place.orderWorking.slice());
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
        (function (idx) {
          btn.addEventListener('click', function () { submitProbe(idx); });
        }(i));
        list.appendChild(btn);
      }
      shell.appendChild(list);
    }
    host.appendChild(shell);
  }

  function pickNextProbe() {
    var raw;
    raw = pickQuestion(questionPool(), place.difficulty, place.usedIds, place.usedTopics);
    if (!raw) return null;
    return presentQuestion(raw);
  }

  function beginProbe() {
    var q;
    place.phase = 'probe';
    place.difficulty = START_DIFFICULTY;
    place.usedIds = [];
    place.usedTopics = [];
    place.probe = [];
    place.orderWorking = [];
    q = pickNextProbe();
    if (!q) {
      finishPlacement();
      return;
    }
    place.current = q;
    renderProbe();
  }

  function submitProbe(response) {
    var q;
    var correct;
    if (!place || !place.current) return;
    q = place.current;
    correct = isCorrect(q, response);
    place.probe.push({
      id: q.id,
      topic: q.topic,
      difficulty: typeof q.difficulty === 'number' ? q.difficulty : 0,
      correct: correct
    });
    place.usedIds.push(q.id);
    if (q.topic) place.usedTopics.push(q.topic);
    place.difficulty = nextDifficulty(place.difficulty, correct);
    place.orderWorking = [];
    if (place.probe.length >= PROBE_LENGTH) {
      finishPlacement();
      return;
    }
    place.current = pickNextProbe();
    if (!place.current) {
      finishPlacement();
      return;
    }
    renderProbe();
  }

  function persist(result) {
    var P = getNs('HRL_PROGRESS');
    if (place && place.recorded) return result;
    if (P && typeof P.setPlacement === 'function') {
      P.setPlacement({
        recommendedTier: result.recommendedTier,
        role: result.role,
        goal: result.goal,
        experience: result.experience,
        theta: result.theta
      });
    }
    if (place) {
      place.recorded = true;
      place.result = result;
    }
    return result;
  }

  function finishPlacement() {
    var selfTier;
    var thetaValue;
    var tier;
    var result;
    if (!place) return;
    place.phase = 'result';
    selfTier = selfReportTier(place.answers);
    thetaValue = theta(place.probe);
    tier = recommendTier(thetaValue, selfTier, place.answers.role);
    result = {
      recommendedTier: tier,
      role: place.answers.role,
      goal: place.answers.goal,
      experience: place.answers.experience,
      theta: thetaValue,
      selfTier: selfTier,
      done: true
    };
    persist(result);
    renderResult(result);
  }

  function renderResult(result) {
    var host;
    var shell;
    var tierObj;
    var name;
    var blurb;
    var startBtn;
    var allBtn;
    var sh;
    var first;
    host = hostEl();
    if (!host || !result) return;
    setViewHeading('Your starting point', true);
    tierObj = tierByNumber(result.recommendedTier);
    name = tierObj && tierObj.name ? tierObj.name : ('Tier ' + result.recommendedTier);
    blurb = tierObj && tierObj.blurb ? tierObj.blurb : '';
    host.innerHTML = '';
    shell = wrapShell([
      el('p', { class: 'quiz-prompt', text: 'Start at ' + name }),
      el('p', { class: 'bbiq-band', text: name }),
      el('p', { class: 'hint', text: blurb }),
      el('p', { text: reasonFor(result.recommendedTier, result.role, result.selfTier, result.theta, tierObj) }),
      el('p', {
        class: 'hint',
        text: 'Every chapter stays unlocked. Placement only highlights a starting point — you can open any chapter from My Path whenever you want.'
      })
    ]);
    startBtn = el('button', {
      type: 'button',
      class: 'btn btn-primary',
      text: 'Start at ' + name
    });
    startBtn.addEventListener('click', function () {
      first = firstChapterOfTier(tierObj);
      restoreQuizChrome();
      if (place && place.opts && typeof place.opts.onComplete === 'function') {
        try { place.opts.onComplete(result); } catch (e) {}
      }
      sh = getNs('HRL_SHELL');
      if (first && sh && typeof sh.openChapter === 'function') {
        sh.openChapter(first.id);
      } else if (sh && typeof sh.showView === 'function') {
        sh.showView('path');
      }
    });
    allBtn = el('button', {
      type: 'button',
      class: 'btn btn-secondary',
      text: 'Show me all the chapters'
    });
    allBtn.addEventListener('click', function () {
      restoreQuizChrome();
      if (place && place.opts && typeof place.opts.onComplete === 'function') {
        try { place.opts.onComplete(result); } catch (e2) {}
      }
      sh = getNs('HRL_SHELL');
      if (sh && typeof sh.showView === 'function') sh.showView('path');
      else if (sh && typeof sh.renderHome === 'function') sh.renderHome();
    });
    shell.appendChild(el('div', { class: 'chapter-cta' }, [startBtn, allBtn]));
    host.appendChild(shell);
  }

  /* ------------------------------------------------------------------ */
  /* Public DOM API                                                      */
  /* ------------------------------------------------------------------ */

  function start(opts) {
    var sh;
    if (!hasDocument()) return;
    opts = opts || {};
    place = {
      opts: opts,
      phase: 'self',
      selfIndex: 0,
      answers: { role: null, experience: null, goal: null },
      difficulty: START_DIFFICULTY,
      usedIds: [],
      usedTopics: [],
      probe: [],
      current: null,
      orderWorking: [],
      recorded: false,
      result: null
    };
    setViewHeading('Find your starting point', true);
    sh = getNs('HRL_SHELL');
    if (sh && typeof sh.showView === 'function') sh.showView('quiz');
    renderSelf();
  }

  function restart() {
    start({ skippable: true });
  }

  function skip() {
    var P;
    var sh;
    var onSkip;
    var result;
    result = {
      recommendedTier: SKIP_TIER,
      done: true,
      role: place && place.answers ? place.answers.role : null,
      goal: place && place.answers ? place.answers.goal : null,
      experience: place && place.answers ? place.answers.experience : null,
      theta: 0
    };
    P = getNs('HRL_PROGRESS');
    if (P && typeof P.setPlacement === 'function') {
      P.setPlacement({
        recommendedTier: SKIP_TIER,
        role: result.role,
        goal: result.goal,
        experience: result.experience,
        theta: 0
      });
    }
    restoreQuizChrome();
    onSkip = place && place.opts ? place.opts.onSkip : null;
    if (typeof onSkip === 'function') {
      onSkip();
      return;
    }
    sh = getNs('HRL_SHELL');
    if (sh && typeof sh.renderHome === 'function') sh.renderHome();
    else if (sh && typeof sh.showView === 'function') sh.showView('home');
  }

  /* ------------------------------------------------------------------ */
  /* Export                                                              */
  /* ------------------------------------------------------------------ */

  var api = {
    SELF_REPORT: SELF_REPORT,
    selfReportTier: selfReportTier,
    PROBE_LENGTH: PROBE_LENGTH,
    START_DIFFICULTY: START_DIFFICULTY,
    STEP_UP: STEP_UP,
    STEP_DOWN: STEP_DOWN,
    SKIP_TIER: SKIP_TIER,
    nextDifficulty: nextDifficulty,
    pickQuestion: pickQuestion,
    theta: theta,
    recommendTier: recommendTier,
    start: start,
    restart: restart,
    skip: skip
  };

  root.HRL_PLACEMENT = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = root.HRL_PLACEMENT;
  }
}).call(typeof window !== 'undefined' ? window : this);
