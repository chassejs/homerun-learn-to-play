/* ===================================================================
   Homerun Learn to Play — progress.js
   Progress, badges, streak, Leitner review, and export/import backup.
   ES5-safe (var, function, string concatenation). Loads as a browser
   script (root.HRL_PROGRESS) and via Node require() for tests.
   =================================================================== */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;

  var STORAGE_KEY = 'homerun-learn/progress/v1';
  var MS_PER_DAY = 86400000;
  var BOX_INTERVALS = [1, 3, 7, 16, 35];
  var APP_ID = 'homerun-learn-to-play';

  var TIER_ORDER_FALLBACK = {
    rookie: 1,
    sandlot: 2,
    diamond: 3,
    select: 4,
    elite: 5,
    promind: 6
  };

  var storageAvailableFlag = false;
  var memoryRaw = null;
  var state = null;

  /* ------------------------------------------------------------------ */
  /* Helpers                                                             */
  /* ------------------------------------------------------------------ */

  function hasOwn(obj, key) {
    return !!(obj && Object.prototype.hasOwnProperty.call(obj, key));
  }

  function isArray(x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  }

  function isPlainObject(x) {
    return !!x && typeof x === 'object' && !isArray(x);
  }

  function extend(target, source) {
    var key;
    if (!target) target = {};
    if (!source) return target;
    for (key in source) {
      if (hasOwn(source, key)) target[key] = source[key];
    }
    return target;
  }

  function clonePlain(obj) {
    if (obj == null) return obj;
    try {
      return JSON.parse(JSON.stringify(obj));
    } catch (e) {
      return null;
    }
  }

  function pad2(n) {
    return (n < 10 ? '0' : '') + n;
  }

  function num(x, fallback) {
    if (typeof x === 'number' && !isNaN(x)) return x;
    return fallback == null ? 0 : fallback;
  }

  function indexOf(arr, value) {
    var i;
    if (!arr) return -1;
    for (i = 0; i < arr.length; i++) {
      if (arr[i] === value) return i;
    }
    return -1;
  }

  function dataVersion() {
    var v = root.HRL_VERSION;
    return (v && v.DATA_VERSION) ? v.DATA_VERSION : '1.0';
  }

  function appVersion() {
    var v = root.HRL_VERSION;
    return (v && v.APP_VERSION) ? v.APP_VERSION : '1.0';
  }

  function minCompatibleVersion() {
    var v = root.HRL_VERSION;
    return (v && v.MIN_COMPATIBLE_DATA_VERSION) ? v.MIN_COMPATIBLE_DATA_VERSION : '1.0';
  }

  function compareVersions(a, b) {
    var compat = root.HRL_VERSION_COMPAT;
    var ap, bp;
    if (compat && typeof compat.compareVersions === 'function') {
      return compat.compareVersions(a, b);
    }
    ap = String(a || '0.0').split('.');
    bp = String(b || '0.0').split('.');
    ap = { major: parseInt(ap[0], 10) || 0, minor: parseInt(ap[1], 10) || 0 };
    bp = { major: parseInt(bp[0], 10) || 0, minor: parseInt(bp[1], 10) || 0 };
    if (ap.major !== bp.major) return ap.major < bp.major ? -1 : 1;
    if (ap.minor !== bp.minor) return ap.minor < bp.minor ? -1 : 1;
    return 0;
  }

  /* ------------------------------------------------------------------ */
  /* Default state                                                       */
  /* ------------------------------------------------------------------ */

  function defaultPlacement() {
    return {
      done: false,
      recommendedTier: 1,
      role: null,
      goal: null,
      experience: null,
      theta: 0,
      takenAt: null
    };
  }

  function defaultChapter() {
    return {
      visited: false,
      completed: false,
      bestScore: 0,
      attempts: 0,
      completedAt: null,
      lastSeenAt: null
    };
  }

  function defaultIq() {
    return { attempts: [], best: null };
  }

  function defaultStreak() {
    return { current: 0, longest: 0, lastActiveDay: null };
  }

  function defaultSettings() {
    return { timerEnabled: true, reducedMotion: false, textSize: 'normal' };
  }

  function defaultState() {
    return {
      version: dataVersion(),
      placement: defaultPlacement(),
      chapters: {},
      badges: [],
      review: [],
      iq: defaultIq(),
      streak: defaultStreak(),
      settings: defaultSettings()
    };
  }

  function fillPlacement(raw) {
    var out = defaultPlacement();
    if (!isPlainObject(raw)) return out;
    if (typeof raw.done === 'boolean') out.done = raw.done;
    if (raw.recommendedTier != null) out.recommendedTier = raw.recommendedTier;
    if (hasOwn(raw, 'role')) out.role = raw.role;
    if (hasOwn(raw, 'goal')) out.goal = raw.goal;
    if (hasOwn(raw, 'experience')) out.experience = raw.experience;
    if (raw.theta != null) out.theta = raw.theta;
    if (hasOwn(raw, 'takenAt')) out.takenAt = raw.takenAt;
    return out;
  }

  function fillChapter(raw) {
    var out = defaultChapter();
    if (!isPlainObject(raw)) return out;
    if (typeof raw.visited === 'boolean') out.visited = raw.visited;
    if (typeof raw.completed === 'boolean') out.completed = raw.completed;
    if (typeof raw.bestScore === 'number' && !isNaN(raw.bestScore)) out.bestScore = raw.bestScore;
    if (typeof raw.attempts === 'number' && !isNaN(raw.attempts)) out.attempts = raw.attempts;
    if (hasOwn(raw, 'completedAt')) out.completedAt = raw.completedAt;
    if (hasOwn(raw, 'lastSeenAt')) out.lastSeenAt = raw.lastSeenAt;
    return out;
  }

  function fillChapters(raw) {
    var out = {};
    var id;
    if (!isPlainObject(raw)) return out;
    for (id in raw) {
      if (hasOwn(raw, id)) out[id] = fillChapter(raw[id]);
    }
    return out;
  }

  function fillReviewEntry(raw) {
    var out = {
      qid: '',
      box: 1,
      dueAt: 0,
      lastResult: null,
      misses: 0
    };
    if (!isPlainObject(raw)) return out;
    if (raw.qid != null) out.qid = raw.qid;
    if (typeof raw.box === 'number' && !isNaN(raw.box)) out.box = raw.box;
    if (raw.dueAt != null) out.dueAt = raw.dueAt;
    if (hasOwn(raw, 'lastResult')) out.lastResult = raw.lastResult;
    if (typeof raw.misses === 'number' && !isNaN(raw.misses)) out.misses = raw.misses;
    return out;
  }

  function fillReviewList(raw) {
    var out = [];
    var i;
    if (!isArray(raw)) return out;
    for (i = 0; i < raw.length; i++) out.push(fillReviewEntry(raw[i]));
    return out;
  }

  function fillIqAttempt(raw) {
    var out = {
      takenAt: null,
      bbiq: null,
      band: null,
      byTopic: null,
      answers: null
    };
    if (!isPlainObject(raw)) return out;
    if (hasOwn(raw, 'takenAt')) out.takenAt = raw.takenAt;
    if (hasOwn(raw, 'bbiq')) out.bbiq = raw.bbiq;
    if (hasOwn(raw, 'band')) out.band = raw.band;
    if (hasOwn(raw, 'byTopic')) out.byTopic = raw.byTopic;
    if (hasOwn(raw, 'answers')) out.answers = raw.answers;
    return out;
  }

  function fillIq(raw) {
    var out = defaultIq();
    var i;
    if (!isPlainObject(raw)) return out;
    if (isArray(raw.attempts)) {
      out.attempts = [];
      for (i = 0; i < raw.attempts.length; i++) {
        out.attempts.push(fillIqAttempt(raw.attempts[i]));
      }
    }
    if (hasOwn(raw, 'best')) {
      out.best = raw.best == null ? null : fillIqAttempt(raw.best);
    }
    return out;
  }

  function fillStreak(raw) {
    var out = defaultStreak();
    if (!isPlainObject(raw)) return out;
    if (typeof raw.current === 'number' && !isNaN(raw.current)) out.current = raw.current;
    if (typeof raw.longest === 'number' && !isNaN(raw.longest)) out.longest = raw.longest;
    if (hasOwn(raw, 'lastActiveDay')) out.lastActiveDay = raw.lastActiveDay;
    return out;
  }

  function fillSettings(raw) {
    var out = defaultSettings();
    var key;
    if (!isPlainObject(raw)) return out;
    for (key in raw) {
      if (hasOwn(raw, key)) out[key] = raw[key];
    }
    if (typeof raw.timerEnabled !== 'boolean') out.timerEnabled = defaultSettings().timerEnabled;
    if (typeof raw.reducedMotion !== 'boolean') out.reducedMotion = defaultSettings().reducedMotion;
    if (typeof raw.textSize !== 'string') out.textSize = defaultSettings().textSize;
    return out;
  }

  function fillDefaults(raw) {
    var def = defaultState();
    var out;
    if (!isPlainObject(raw)) return def;
    out = def;
    if (typeof raw.version === 'string' && raw.version) out.version = raw.version;
    out.placement = fillPlacement(raw.placement);
    out.chapters = fillChapters(raw.chapters);
    out.badges = isArray(raw.badges) ? raw.badges.slice() : [];
    out.review = fillReviewList(raw.review);
    out.iq = fillIq(raw.iq);
    out.streak = fillStreak(raw.streak);
    out.settings = fillSettings(raw.settings);
    return out;
  }

  /* ------------------------------------------------------------------ */
  /* Storage                                                             */
  /* ------------------------------------------------------------------ */

  function probeStorage() {
    var probeKey;
    if (typeof localStorage === 'undefined') return false;
    probeKey = STORAGE_KEY + '.__probe';
    try {
      localStorage.setItem(probeKey, '1');
      localStorage.removeItem(probeKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  storageAvailableFlag = probeStorage();

  function storageGet() {
    if (storageAvailableFlag) {
      try {
        return localStorage.getItem(STORAGE_KEY);
      } catch (e) {
        storageAvailableFlag = false;
      }
    }
    return memoryRaw;
  }

  function storageSet(str) {
    memoryRaw = str;
    if (storageAvailableFlag) {
      try {
        localStorage.setItem(STORAGE_KEY, str);
        return true;
      } catch (e) {
        storageAvailableFlag = false;
        return false;
      }
    }
    return false;
  }

  function ensureState() {
    if (!state) load();
    return state;
  }

  function load() {
    var raw = storageGet();
    var parsed;
    if (raw == null || raw === '') {
      if (!state) state = defaultState();
      else state = fillDefaults(state);
      return state;
    }
    try {
      parsed = JSON.parse(raw);
      state = fillDefaults(parsed);
    } catch (e) {
      if (!state) state = defaultState();
    }
    return state;
  }

  function get() {
    return ensureState();
  }

  function save() {
    var str;
    try {
      ensureState();
      str = JSON.stringify(state);
    } catch (e) {
      return false;
    }
    return storageSet(str);
  }

  function reset() {
    state = defaultState();
    save();
    return state;
  }

  function storageAvailable() {
    return storageAvailableFlag === true;
  }

  /* ------------------------------------------------------------------ */
  /* Curriculum lookups (optional — degrade to zeros under Node)         */
  /* ------------------------------------------------------------------ */

  function getCurriculum() {
    var cur = root.HRL_CURRICULUM;
    return isPlainObject(cur) ? cur : null;
  }

  function allChapters() {
    var cur = getCurriculum();
    if (!cur || !isArray(cur.chapters)) return [];
    return cur.chapters;
  }

  function sortedChapters() {
    var list = allChapters().slice();
    list.sort(function (a, b) {
      var ao = num(a && a.order, 0);
      var bo = num(b && b.order, 0);
      if (ao !== bo) return ao - bo;
      var aid = a && a.id ? String(a.id) : '';
      var bid = b && b.id ? String(b.id) : '';
      if (aid < bid) return -1;
      if (aid > bid) return 1;
      return 0;
    });
    return list;
  }

  function allTiers() {
    var cur = getCurriculum();
    if (!cur || !isArray(cur.tiers)) return [];
    return cur.tiers;
  }

  function tierOrder(tierKey) {
    var tiers = allTiers();
    var i, t;
    for (i = 0; i < tiers.length; i++) {
      t = tiers[i];
      if (t && t.key === tierKey) return num(t.order, 0);
    }
    if (hasOwn(TIER_ORDER_FALLBACK, tierKey)) return TIER_ORDER_FALLBACK[tierKey];
    return 0;
  }

  function chaptersForTier(tierKey) {
    var list = sortedChapters();
    var out = [];
    var i, ch;
    for (i = 0; i < list.length; i++) {
      ch = list[i];
      if (ch && ch.tier === tierKey) out.push(ch);
    }
    return out;
  }

  /* ------------------------------------------------------------------ */
  /* Placement                                                           */
  /* ------------------------------------------------------------------ */

  function isFirstRun() {
    var s = ensureState();
    var id, rec;
    if (s.placement && s.placement.done) return false;
    for (id in s.chapters) {
      if (!hasOwn(s.chapters, id)) continue;
      rec = s.chapters[id];
      if (rec && rec.visited) return false;
    }
    return true;
  }

  function setPlacement(obj) {
    var s = ensureState();
    var p = s.placement || defaultPlacement();
    obj = obj || {};
    if (hasOwn(obj, 'recommendedTier')) p.recommendedTier = obj.recommendedTier;
    if (hasOwn(obj, 'role')) p.role = obj.role;
    if (hasOwn(obj, 'goal')) p.goal = obj.goal;
    if (hasOwn(obj, 'experience')) p.experience = obj.experience;
    if (hasOwn(obj, 'theta')) p.theta = obj.theta;
    p.done = true;
    p.takenAt = new Date().toISOString();
    s.placement = p;
    save();
    return p;
  }

  function getPlacement() {
    return ensureState().placement;
  }

  /* ------------------------------------------------------------------ */
  /* Chapters                                                            */
  /* ------------------------------------------------------------------ */

  function ensureChapterStored(chapterId) {
    var s = ensureState();
    if (!s.chapters) s.chapters = {};
    s.chapters[chapterId] = fillChapter(s.chapters[chapterId]);
    return s.chapters[chapterId];
  }

  function markVisited(chapterId) {
    var rec = ensureChapterStored(chapterId);
    rec.visited = true;
    rec.lastSeenAt = new Date().toISOString();
    save();
    return rec;
  }

  function awardBadge(id) {
    var s = ensureState();
    if (!id) return false;
    if (!isArray(s.badges)) s.badges = [];
    if (indexOf(s.badges, id) !== -1) return false;
    s.badges.push(id);
    save();
    return true;
  }

  function hasBadge(id) {
    var s = ensureState();
    return indexOf(s.badges, id) !== -1;
  }

  function badges() {
    var s = ensureState();
    return isArray(s.badges) ? s.badges.slice() : [];
  }

  function checkTierBadges() {
    var awarded = [];
    var tiers = allTiers().slice();
    var i, t, chs, j, allDone, badgeId;
    var seen, list, k, key;
    if (!tiers.length) {
      seen = {};
      list = allChapters();
      for (k = 0; k < list.length; k++) {
        key = list[k] && list[k].tier;
        if (key && !seen[key]) {
          seen[key] = true;
          tiers.push({ key: key });
        }
      }
    }
    for (i = 0; i < tiers.length; i++) {
      t = tiers[i];
      if (!t || !t.key) continue;
      chs = chaptersForTier(t.key);
      if (!chs.length) continue;
      allDone = true;
      for (j = 0; j < chs.length; j++) {
        if (!chs[j] || !isComplete(chs[j].id)) {
          allDone = false;
          break;
        }
      }
      if (!allDone) continue;
      badgeId = 'tier-' + t.key;
      if (awardBadge(badgeId)) awarded.push(badgeId);
    }
    return awarded;
  }

  function recordQuiz(chapterId, scorePct, passed) {
    var rec = ensureChapterStored(chapterId);
    var newlyCompleted = false;
    var awarded = [];
    var n = num(scorePct, 0);
    rec.attempts = num(rec.attempts, 0) + 1;
    if (n > num(rec.bestScore, 0)) rec.bestScore = n;
    if (passed) {
      if (!rec.completed) {
        rec.completed = true;
        rec.completedAt = new Date().toISOString();
        newlyCompleted = true;
      } else {
        rec.completed = true;
      }
      if (awardBadge('chapter-' + chapterId)) awarded.push('chapter-' + chapterId);
    }
    if (n >= 100) {
      if (awardBadge('perfect-quiz')) awarded.push('perfect-quiz');
    }
    awarded = awarded.concat(checkTierBadges());
    save();
    return {
      bestScore: rec.bestScore,
      completed: !!rec.completed,
      newlyCompleted: newlyCompleted,
      badgesAwarded: awarded
    };
  }

  function getChapter(chapterId) {
    var s = ensureState();
    if (s.chapters && hasOwn(s.chapters, chapterId)) {
      return fillChapter(s.chapters[chapterId]);
    }
    return defaultChapter();
  }

  function isComplete(chapterId) {
    var s = ensureState();
    var rec = s.chapters && s.chapters[chapterId];
    return !!(rec && rec.completed);
  }

  function pctInt(complete, total) {
    if (!total) return 0;
    return Math.round((complete / total) * 100);
  }

  function tierProgress(tierKey) {
    var chs = chaptersForTier(tierKey);
    var total = chs.length;
    var complete = 0;
    var i;
    for (i = 0; i < chs.length; i++) {
      if (chs[i] && isComplete(chs[i].id)) complete++;
    }
    return { total: total, complete: complete, pct: pctInt(complete, total) };
  }

  function overallProgress() {
    var chs = sortedChapters();
    var total = chs.length;
    var complete = 0;
    var i;
    for (i = 0; i < chs.length; i++) {
      if (chs[i] && isComplete(chs[i].id)) complete++;
    }
    return { total: total, complete: complete, pct: pctInt(complete, total) };
  }

  function nextChapter() {
    var chs = sortedChapters();
    var i, ch, startIndex, tOrder;
    var recTier;
    if (!chs.length) return null;
    recTier = num(ensureState().placement && ensureState().placement.recommendedTier, 1);
    if (recTier < 1) recTier = 1;
    startIndex = 0;
    for (i = 0; i < chs.length; i++) {
      ch = chs[i];
      tOrder = ch ? tierOrder(ch.tier) : 0;
      if (tOrder >= recTier) {
        startIndex = i;
        break;
      }
      /* If no tier metadata, fall back to chapter.order groups of 4. */
      if (!tOrder && ch && num(ch.order, 0) >= (recTier - 1) * 4 + 1) {
        startIndex = i;
        break;
      }
    }
    for (i = startIndex; i < chs.length; i++) {
      ch = chs[i];
      if (ch && ch.id && !isComplete(ch.id)) return ch.id;
    }
    for (i = 0; i < chs.length; i++) {
      ch = chs[i];
      if (ch && ch.id && !isComplete(ch.id)) return ch.id;
    }
    return null;
  }

  /* ------------------------------------------------------------------ */
  /* Review deck (Leitner)                                               */
  /* ------------------------------------------------------------------ */

  function findReviewIndex(qid) {
    var s = ensureState();
    var i;
    if (!isArray(s.review)) s.review = [];
    for (i = 0; i < s.review.length; i++) {
      if (s.review[i] && s.review[i].qid === qid) return i;
    }
    return -1;
  }

  function findReview(qid) {
    var s = ensureState();
    var idx = findReviewIndex(qid);
    return idx === -1 ? null : s.review[idx];
  }

  function addMiss(qid, nowMs) {
    var s = ensureState();
    var entry;
    if (nowMs == null) nowMs = Date.now();
    if (!isArray(s.review)) s.review = [];
    entry = findReview(qid);
    if (entry) {
      entry.box = 1;
      entry.dueAt = nowMs + MS_PER_DAY;
      entry.lastResult = 'wrong';
      entry.misses = num(entry.misses, 0) + 1;
    } else {
      entry = {
        qid: qid,
        box: 1,
        dueAt: nowMs + MS_PER_DAY,
        lastResult: 'wrong',
        misses: 1
      };
      s.review.push(entry);
    }
    save();
    return entry;
  }

  function recordReview(qid, correct, nowMs) {
    var s = ensureState();
    var entry;
    var idx;
    var nextBox;
    if (nowMs == null) nowMs = Date.now();
    if (!isArray(s.review)) s.review = [];
    entry = findReview(qid);
    if (!entry) {
      if (correct) return null;
      return addMiss(qid, nowMs);
    }
    if (correct) {
      if (num(entry.box, 1) >= 5) {
        idx = findReviewIndex(qid);
        if (idx !== -1) s.review.splice(idx, 1);
        save();
        return null;
      }
      nextBox = num(entry.box, 1) + 1;
      if (nextBox > 5) nextBox = 5;
      entry.box = nextBox;
      entry.dueAt = nowMs + BOX_INTERVALS[entry.box - 1] * MS_PER_DAY;
      entry.lastResult = 'correct';
      save();
      return entry;
    }
    entry.box = 1;
    entry.dueAt = nowMs + MS_PER_DAY;
    entry.lastResult = 'wrong';
    entry.misses = num(entry.misses, 0) + 1;
    save();
    return entry;
  }

  function dueReviews(nowMs) {
    var s = ensureState();
    var list = [];
    var i, rec;
    if (nowMs == null) nowMs = Date.now();
    if (!isArray(s.review)) return [];
    for (i = 0; i < s.review.length; i++) {
      rec = s.review[i];
      if (rec && rec.qid != null && num(rec.dueAt, 0) <= nowMs) {
        list.push(rec);
      }
    }
    list.sort(function (a, b) {
      var da = num(a.dueAt, 0);
      var db = num(b.dueAt, 0);
      if (da !== db) return da - db;
      var qa = a.qid != null ? String(a.qid) : '';
      var qb = b.qid != null ? String(b.qid) : '';
      if (qa < qb) return -1;
      if (qa > qb) return 1;
      return 0;
    });
    for (i = 0; i < list.length; i++) list[i] = list[i].qid;
    return list;
  }

  function reviewCounts(nowMs) {
    var s = ensureState();
    var total = isArray(s.review) ? s.review.length : 0;
    var due = dueReviews(nowMs).length;
    return { due: due, total: total };
  }

  /* ------------------------------------------------------------------ */
  /* Baseball IQ                                                         */
  /* ------------------------------------------------------------------ */

  function recordIq(attempt) {
    var s = ensureState();
    var rec;
    attempt = attempt || {};
    if (!s.iq) s.iq = defaultIq();
    if (!isArray(s.iq.attempts)) s.iq.attempts = [];
    rec = {
      takenAt: attempt.takenAt || new Date().toISOString(),
      bbiq: attempt.bbiq,
      band: attempt.band,
      byTopic: attempt.byTopic,
      answers: attempt.answers
    };
    s.iq.attempts.push(rec);
    if (!s.iq.best || num(rec.bbiq, -1) > num(s.iq.best.bbiq, -1)) {
      s.iq.best = clonePlain(rec);
    }
    awardBadge('iq-first');
    if (num(rec.bbiq, 0) >= 125) awardBadge('iq-elite');
    save();
    return rec;
  }

  function iqHistory() {
    var s = ensureState();
    var list;
    if (!s.iq || !isArray(s.iq.attempts)) return [];
    list = s.iq.attempts.slice();
    list.sort(function (a, b) {
      var at = a && a.takenAt ? String(a.takenAt) : '';
      var bt = b && b.takenAt ? String(b.takenAt) : '';
      if (at === bt) return 0;
      return at < bt ? 1 : -1;
    });
    return list;
  }

  function bestIq() {
    var s = ensureState();
    if (!s.iq) return null;
    return s.iq.best == null ? null : s.iq.best;
  }

  /* ------------------------------------------------------------------ */
  /* Streak                                                              */
  /* ------------------------------------------------------------------ */

  function localYmd(nowMs) {
    var d = new Date(nowMs);
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }

  function parseYmdLocal(ymd) {
    var parts, y, m, d;
    if (!ymd || typeof ymd !== 'string') return null;
    parts = ymd.split('-');
    y = parseInt(parts[0], 10);
    m = parseInt(parts[1], 10);
    d = parseInt(parts[2], 10);
    if (isNaN(y) || isNaN(m) || isNaN(d)) return null;
    return new Date(y, m - 1, d);
  }

  function calendarDaysBetween(fromYmd, toYmd) {
    var a = parseYmdLocal(fromYmd);
    var b = parseYmdLocal(toYmd);
    if (!a || !b) return null;
    return Math.round((b.getTime() - a.getTime()) / MS_PER_DAY);
  }

  function touchStreak(nowMs) {
    var s = ensureState();
    var today;
    var gap;
    var awarded = [];
    if (nowMs == null) nowMs = Date.now();
    if (!s.streak) s.streak = defaultStreak();
    today = localYmd(nowMs);
    if (s.streak.lastActiveDay === today) {
      return {
        current: s.streak.current,
        longest: s.streak.longest,
        changed: false,
        badgesAwarded: []
      };
    }
    if (s.streak.lastActiveDay) {
      gap = calendarDaysBetween(s.streak.lastActiveDay, today);
      if (gap === 1) {
        s.streak.current = num(s.streak.current, 0) + 1;
      } else {
        s.streak.current = 1;
      }
    } else {
      s.streak.current = 1;
    }
    s.streak.lastActiveDay = today;
    if (s.streak.current > num(s.streak.longest, 0)) {
      s.streak.longest = s.streak.current;
    }
    if (s.streak.current >= 3 && awardBadge('streak-3')) awarded.push('streak-3');
    if (s.streak.current >= 7 && awardBadge('streak-7')) awarded.push('streak-7');
    if (s.streak.current >= 30 && awardBadge('streak-30')) awarded.push('streak-30');
    save();
    return {
      current: s.streak.current,
      longest: s.streak.longest,
      changed: true,
      badgesAwarded: awarded
    };
  }

  /* ------------------------------------------------------------------ */
  /* Settings                                                            */
  /* ------------------------------------------------------------------ */

  function getSetting(key) {
    var s = ensureState();
    if (!s.settings) s.settings = defaultSettings();
    return s.settings[key];
  }

  function setSetting(key, value) {
    var s = ensureState();
    if (!s.settings) s.settings = defaultSettings();
    s.settings[key] = value;
    save();
    return value;
  }

  /* ------------------------------------------------------------------ */
  /* Backup — export / merge / import                                    */
  /* ------------------------------------------------------------------ */

  function isoDateLocal(date) {
    var d;
    if (typeof date === 'string' && date.length >= 10 &&
        date.charAt(4) === '-' && date.charAt(7) === '-') {
      return date.substring(0, 10);
    }
    d = date instanceof Date ? date : (date ? new Date(date) : new Date());
    if (isNaN(d.getTime())) d = new Date();
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }

  function exportFilename(date) {
    return 'homerun-learn-progress-' + isoDateLocal(date) + '.json';
  }

  function exportPayload() {
    var s = ensureState();
    return {
      app: APP_ID,
      appVersion: appVersion(),
      dataVersion: dataVersion(),
      exportedAt: new Date().toISOString(),
      data: clonePlain(s)
    };
  }

  function earlierIso(a, b) {
    if (a == null || a === '') return b == null || b === '' ? null : b;
    if (b == null || b === '') return a;
    return String(a) <= String(b) ? a : b;
  }

  function laterIso(a, b) {
    if (a == null || a === '') return b == null || b === '' ? null : b;
    if (b == null || b === '') return a;
    return String(a) >= String(b) ? a : b;
  }

  function mergeChapterRecords(a, b) {
    var left = isPlainObject(a) ? a : {};
    var right = isPlainObject(b) ? b : {};
    var bestA = num(left.bestScore, 0);
    var bestB = num(right.bestScore, 0);
    return {
      visited: !!(left.visited || right.visited),
      completed: !!(left.completed || right.completed),
      bestScore: bestA >= bestB ? bestA : bestB,
      attempts: num(left.attempts, 0) + num(right.attempts, 0),
      completedAt: earlierIso(left.completedAt, right.completedAt),
      lastSeenAt: laterIso(left.lastSeenAt, right.lastSeenAt)
    };
  }

  function mergeChaptersMap(a, b) {
    var out = {};
    var id;
    var left = isPlainObject(a) ? a : {};
    var right = isPlainObject(b) ? b : {};
    for (id in left) {
      if (hasOwn(left, id)) {
        out[id] = hasOwn(right, id)
          ? mergeChapterRecords(left[id], right[id])
          : mergeChapterRecords(left[id], null);
      }
    }
    for (id in right) {
      if (hasOwn(right, id) && !hasOwn(out, id)) {
        out[id] = mergeChapterRecords(null, right[id]);
      }
    }
    return out;
  }

  function unionBadges(a, b) {
    var out = [];
    var seen = {};
    function addAll(list) {
      var i, id;
      if (!isArray(list)) return;
      for (i = 0; i < list.length; i++) {
        id = list[i];
        if (id == null || seen[id]) continue;
        seen[id] = true;
        out.push(id);
      }
    }
    addAll(a);
    addAll(b);
    return out;
  }

  function mergeReviewLists(a, b) {
    var map = {};
    var order = [];
    var out = [];
    var i, rec, existing, keep, other;
    function ingest(list) {
      if (!isArray(list)) return;
      for (i = 0; i < list.length; i++) {
        rec = list[i];
        if (!rec || rec.qid == null) continue;
        if (!hasOwn(map, rec.qid)) {
          map[rec.qid] = rec;
          order.push(rec.qid);
        } else {
          existing = map[rec.qid];
          if (num(rec.dueAt, 0) > num(existing.dueAt, 0)) {
            keep = rec;
            other = existing;
          } else {
            keep = existing;
            other = rec;
          }
          map[rec.qid] = {
            qid: keep.qid,
            box: keep.box,
            dueAt: keep.dueAt,
            lastResult: hasOwn(keep, 'lastResult') ? keep.lastResult : null,
            misses: (function () {
              var ma = num(keep.misses, 0);
              var mb = num(other.misses, 0);
              return ma >= mb ? ma : mb;
            }())
          };
        }
      }
    }
    ingest(a);
    ingest(b);
    for (i = 0; i < order.length; i++) out.push(map[order[i]]);
    return out;
  }

  function mergeIq(a, b) {
    var left = isPlainObject(a) ? a : {};
    var right = isPlainObject(b) ? b : {};
    var attempts = [];
    var seen = {};
    var i, rec, key, best, bestVal, cand, consider;
    if (isArray(left.attempts)) {
      for (i = 0; i < left.attempts.length; i++) attempts.push(left.attempts[i]);
    }
    if (isArray(right.attempts)) {
      for (i = 0; i < right.attempts.length; i++) attempts.push(right.attempts[i]);
    }
    attempts.sort(function (x, y) {
      var xt = x && x.takenAt ? String(x.takenAt) : '';
      var yt = y && y.takenAt ? String(y.takenAt) : '';
      if (xt === yt) return 0;
      return xt < yt ? 1 : -1;
    });
    rec = [];
    for (i = 0; i < attempts.length; i++) {
      cand = attempts[i];
      key = cand && cand.takenAt != null ? String(cand.takenAt) : '';
      if (key) {
        if (seen[key]) continue;
        seen[key] = true;
      }
      rec.push(cand);
    }
    best = null;
    bestVal = -1;
    consider = function (item) {
      if (item && num(item.bbiq, -1) > bestVal) {
        best = item;
        bestVal = num(item.bbiq, -1);
      }
    };
    consider(left.best);
    consider(right.best);
    for (i = 0; i < rec.length; i++) consider(rec[i]);
    return { attempts: rec, best: best };
  }

  function mergeStreak(a, b) {
    var left = isPlainObject(a) ? a : {};
    var right = isPlainObject(b) ? b : {};
    var longestA = num(left.longest, 0);
    var longestB = num(right.longest, 0);
    var laterDay = laterIso(left.lastActiveDay, right.lastActiveDay);
    var source;
    if (laterDay && laterDay === right.lastActiveDay && laterDay !== left.lastActiveDay) {
      source = right;
    } else if (laterDay && laterDay === left.lastActiveDay && laterDay !== right.lastActiveDay) {
      source = left;
    } else if (laterDay && laterDay === right.lastActiveDay && laterDay === left.lastActiveDay) {
      source = left;
    } else if (right.lastActiveDay && !left.lastActiveDay) {
      source = right;
    } else {
      source = left.lastActiveDay || !right.lastActiveDay ? left : right;
    }
    return {
      longest: longestA >= longestB ? longestA : longestB,
      current: num(source.current, 0),
      lastActiveDay: source.lastActiveDay == null ? laterDay : source.lastActiveDay
    };
  }

  function mergePlacementObjs(a, b) {
    var left = isPlainObject(a) ? a : null;
    var right = isPlainObject(b) ? b : null;
    var aDone = !!(left && left.done);
    var bDone = !!(right && right.done);
    if (aDone && !bDone) return extend({}, left);
    if (bDone && !aDone) return extend({}, right);
    if (left && right) {
      if (laterIso(left.takenAt, right.takenAt) === right.takenAt && left.takenAt !== right.takenAt) {
        return extend({}, right);
      }
      if (left.takenAt) return extend({}, left);
      if (right.takenAt) return extend({}, right);
      return extend({}, left);
    }
    if (left) return extend({}, left);
    if (right) return extend({}, right);
    return {};
  }

  function mergeSettingsObjs(a, b) {
    var out = {};
    var key;
    if (isPlainObject(a)) {
      for (key in a) {
        if (hasOwn(a, key)) out[key] = a[key];
      }
    }
    if (isPlainObject(b)) {
      for (key in b) {
        if (hasOwn(b, key)) out[key] = b[key];
      }
    }
    return out;
  }

  function mergeState(current, incoming) {
    var a = clonePlain(current);
    var b = clonePlain(incoming);
    var out = {};
    if (!isPlainObject(a)) a = {};
    if (!isPlainObject(b)) b = {};
    out.version = (typeof b.version === 'string' && b.version)
      ? b.version
      : (typeof a.version === 'string' && a.version ? a.version : '1.0');
    out.placement = mergePlacementObjs(a.placement, b.placement);
    out.chapters = mergeChaptersMap(a.chapters, b.chapters);
    out.badges = unionBadges(a.badges, b.badges);
    out.review = mergeReviewLists(a.review, b.review);
    out.iq = mergeIq(a.iq, b.iq);
    out.streak = mergeStreak(a.streak, b.streak);
    out.settings = mergeSettingsObjs(a.settings, b.settings);
    return out;
  }

  function failImport(message) {
    return { ok: false, message: message };
  }

  function describeMerged(merged) {
    var chapterCount = 0;
    var id;
    var badgeCount;
    var reviewCount;
    var iqCount;
    if (merged && isPlainObject(merged.chapters)) {
      for (id in merged.chapters) {
        if (hasOwn(merged.chapters, id)) chapterCount++;
      }
    }
    badgeCount = merged && isArray(merged.badges) ? merged.badges.length : 0;
    reviewCount = merged && isArray(merged.review) ? merged.review.length : 0;
    iqCount = merged && merged.iq && isArray(merged.iq.attempts) ? merged.iq.attempts.length : 0;
    return 'Progress imported and merged: ' +
      chapterCount + (chapterCount === 1 ? ' chapter' : ' chapters') + ', ' +
      badgeCount + (badgeCount === 1 ? ' badge' : ' badges') + ', ' +
      reviewCount + (reviewCount === 1 ? ' review item' : ' review items') + ', ' +
      iqCount + (iqCount === 1 ? ' Baseball IQ attempt' : ' Baseball IQ attempts') + '.';
  }

  function checkImportedVersion(importedVersion) {
    var compat = root.HRL_VERSION_COMPAT;
    var current;
    var min;
    var cmp;
    if (compat && typeof compat.isImportCompatible === 'function') {
      return compat.isImportCompatible(importedVersion);
    }
    current = dataVersion();
    min = minCompatibleVersion();
    cmp = compareVersions(importedVersion, current);
    if (cmp === 0) return { status: 'compatible', message: null };
    if (cmp > 0) {
      return {
        status: 'incompatible',
        message: 'The backup you\'re trying to import is from version ' + importedVersion +
          ', which is not compatible with version ' + current + ' of this app. ' +
          'Please update the app to the latest version and try again.'
      };
    }
    if (compareVersions(importedVersion, min) < 0) {
      return {
        status: 'incompatible',
        message: 'The backup you\'re trying to import is from version ' + importedVersion +
          ', which is older than this app can restore.'
      };
    }
    return { status: 'compatible', message: null };
  }

  function importPayload(obj) {
    var importedVersion;
    var check;
    var incomingData;
    var currentState;
    var merged;
    var compat;
    try {
      if (obj == null) {
        return failImport('Nothing to import — the backup is empty.');
      }
      if (typeof obj !== 'object' || isArray(obj)) {
        return failImport('That file is not a Homerun Learn to Play backup.');
      }
      if (obj.app !== APP_ID) {
        if (!obj.app) {
          return failImport('That file is not a Homerun Learn to Play backup.');
        }
        return failImport('That file is from a different app and cannot be imported here.');
      }
      if (!hasOwn(obj, 'data') || obj.data == null) {
        return failImport('That backup does not contain any progress data.');
      }
      if (typeof obj.data !== 'object' || isArray(obj.data)) {
        return failImport('That backup does not contain any progress data.');
      }
      importedVersion = obj.dataVersion;
      if (importedVersion == null || importedVersion === '') importedVersion = '1.0';
      if (compareVersions(importedVersion, minCompatibleVersion()) < 0) {
        return failImport(
          'The backup you\'re trying to import is from version ' + importedVersion +
          ', which is older than this app can restore.'
        );
      }
      check = checkImportedVersion(importedVersion);
      if (!check || check.status === 'incompatible') {
        return failImport(
          (check && check.message) ||
          'That backup is not compatible with this version of the app.'
        );
      }
      incomingData = clonePlain(obj.data);
      if (check.status === 'migratable' && check.migrationPath) {
        compat = root.HRL_VERSION_COMPAT;
        if (compat && typeof compat.applyMigrations === 'function') {
          incomingData = compat.applyMigrations(incomingData, check.migrationPath);
        }
      }
      currentState = ensureState();
      merged = mergeState(currentState, incomingData);
      state = fillDefaults(merged);
      save();
      return { ok: true, message: describeMerged(state) };
    } catch (e) {
      return failImport('Could not import that backup.');
    }
  }

  function importText(jsonString) {
    var obj;
    try {
      obj = JSON.parse(jsonString);
    } catch (e) {
      return failImport('That file is not valid JSON and cannot be imported.');
    }
    return importPayload(obj);
  }

  /* ------------------------------------------------------------------ */
  /* Export                                                              */
  /* ------------------------------------------------------------------ */

  var api = {
    load: load,
    get: get,
    save: save,
    reset: reset,
    storageAvailable: storageAvailable,
    isFirstRun: isFirstRun,
    setPlacement: setPlacement,
    getPlacement: getPlacement,
    markVisited: markVisited,
    recordQuiz: recordQuiz,
    getChapter: getChapter,
    isComplete: isComplete,
    tierProgress: tierProgress,
    overallProgress: overallProgress,
    nextChapter: nextChapter,
    BOX_INTERVALS: BOX_INTERVALS,
    addMiss: addMiss,
    recordReview: recordReview,
    dueReviews: dueReviews,
    reviewCounts: reviewCounts,
    recordIq: recordIq,
    iqHistory: iqHistory,
    bestIq: bestIq,
    awardBadge: awardBadge,
    hasBadge: hasBadge,
    badges: badges,
    checkTierBadges: checkTierBadges,
    touchStreak: touchStreak,
    getSetting: getSetting,
    setSetting: setSetting,
    exportPayload: exportPayload,
    exportFilename: exportFilename,
    mergeState: mergeState,
    importPayload: importPayload,
    importText: importText
  };

  root.HRL_PROGRESS = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = root.HRL_PROGRESS;
  }
}).call(typeof window !== 'undefined' ? window : this);
