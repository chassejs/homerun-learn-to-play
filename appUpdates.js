/* ===================================================================
   Homerun Learn to Play — appUpdates.js
   Version footer, What's-New, and update self-check.
   =================================================================== */

window.HRL_APP_UPDATES = (function () {
  'use strict';

  var STATE_KEY = 'homerun-learn/progress/v1';
  var PRE_UPDATE_BACKUP_KEY = 'homerun-learn/progress/v1.backup-pre-update';
  var LAST_SEEN_KEY = 'homerun-learn/lastSeenVersion';
  var DEFER_KEY = 'homerun-learn/updateDeferred';
  var DEFER_BUILD_KEY = 'homerun-learn/updateDeferredBuild';
  var CHECK_INTERVAL_MS = 30 * 60 * 1000;
  var FIRST_CHECK_DELAY_MS = 2000;
  var RELOAD_SAFETY_MS = 4000;

  var lastCheckAt = 0;
  var updateCheckInfoLogged = false;

  function getAppVersion() {
    return (window.HRL_VERSION && window.HRL_VERSION.APP_VERSION) || 'unknown';
  }

  function getBuildId() {
    return (window.HRL_VERSION && window.HRL_VERSION.BUILD_ID) || '';
  }

  function lsGet(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function lsSet(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      return false;
    }
  }

  function parseVersion(v) {
    if (v == null) return null;
    var s = String(v).replace(/^\s+|\s+$/g, '');
    if (!s) return null;
    if (s.charAt(0) === 'v' || s.charAt(0) === 'V') s = s.slice(1);
    var parts = s.split('.');
    var major = parseInt(parts[0], 10);
    var minor = parseInt(parts[1], 10);
    if (isNaN(major) || isNaN(minor)) return null;
    return { major: major, minor: minor };
  }

  function compareVersions(a, b) {
    var av = parseVersion(a);
    var bv = parseVersion(b);
    if (!av || !bv) return 0;
    if (av.major !== bv.major) return av.major > bv.major ? 1 : -1;
    if (av.minor !== bv.minor) return av.minor > bv.minor ? 1 : -1;
    return 0;
  }

  // True when the deployed build differs from the running one.
  //
  // Identity comparison, never ordering: build ids are opaque stamps, not
  // sortable versions, and a rollback is as much a mismatch as a
  // roll-forward. Absent, empty, or non-string values are "no information"
  // and never report staleness, so a failed or malformed check stays silent
  // rather than a spurious "update available".
  function isStaleBuild(deployedBuildId, runningBuildId) {
    if (typeof deployedBuildId !== 'string' || deployedBuildId === '') return false;
    if (typeof runningBuildId !== 'string' || runningBuildId === '') return false;
    return deployedBuildId !== runningBuildId;
  }

  function findChangelogEntry(version) {
    var list = window.HRL_CHANGELOG;
    var i;
    if (!list || !list.length) return null;
    for (i = 0; i < list.length; i++) {
      if (list[i] && list[i].version === version) return list[i];
    }
    return list[0];
  }

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function formatReleaseDate(iso) {
    var parts = String(iso || '').split('-');
    var year;
    var month;
    var day;
    if (parts.length < 3) return '';
    year = parts[0];
    month = parseInt(parts[1], 10);
    day = parseInt(parts[2], 10);
    if (!year || year.length !== 4) return '';
    if (!month || month < 1 || month > 12) return '';
    if (!day || day < 1 || day > 31) return '';
    return String(day) + ' ' + MONTHS[month - 1] + ' ' + year;
  }

  // The date the running release was last updated. Prefer the changelog
  // entry for this APP_VERSION, then the newest note, then the build stamp.
  function releaseDateIso() {
    var version = getAppVersion();
    var list = window.HRL_CHANGELOG;
    var i;
    var entry;
    var formatted;
    var built;
    if (list && list.length) {
      for (i = 0; i < list.length; i++) {
        entry = list[i];
        if (entry && entry.version === version && formatReleaseDate(entry.date)) {
          return String(entry.date).slice(0, 10);
        }
      }
      if (list[0] && formatReleaseDate(list[0].date)) return String(list[0].date).slice(0, 10);
    }
    built = window.HRL_VERSION && window.HRL_VERSION.BUILD_TIME;
    if (typeof built === 'string' && built.length >= 10) {
      formatted = formatReleaseDate(built.slice(0, 10));
      if (formatted) return built.slice(0, 10);
    }
    return '';
  }

  function lastUpdatedText() {
    var iso = releaseDateIso();
    var label = formatReleaseDate(iso);
    if (!label) return '';
    return 'Last updated ' + label;
  }

  function fillUpdatedTime(node, iso, label) {
    if (!node) return;
    if (!iso || !label) {
      node.hidden = true;
      node.textContent = '';
      node.removeAttribute('datetime');
      return;
    }
    node.hidden = false;
    node.setAttribute('datetime', iso);
    node.textContent = label;
  }

  function fillVersionFooter(version, iso) {
    var host;
    var versionLine;
    var dateLine;
    var time;
    var label;
    if (typeof document === 'undefined') return;
    host = document.getElementById('version-footer');
    if (!host) return;
    while (host.firstChild) host.removeChild(host.firstChild);
    versionLine = document.createElement('p');
    versionLine.textContent = 'You are running version ' + version + '.';
    host.appendChild(versionLine);
    label = formatReleaseDate(iso);
    if (!label) return;
    dateLine = document.createElement('p');
    dateLine.appendChild(document.createTextNode('Last updated '));
    time = document.createElement('time');
    time.id = 'help-updated-label';
    time.setAttribute('datetime', iso);
    time.textContent = label;
    dateLine.appendChild(time);
    dateLine.appendChild(document.createTextNode('.'));
    host.appendChild(dateLine);
  }

  function initFooter() {
    if (typeof document === 'undefined') return;
    var version = getAppVersion();
    var iso = releaseDateIso();
    var label = document.getElementById('app-version-label');
    var updated = document.getElementById('app-updated-label');
    if (label) label.textContent = version;
    fillUpdatedTime(updated, iso, lastUpdatedText());
    fillVersionFooter(version, iso);

    var whatsNew = document.getElementById('footer-whats-new');
    if (whatsNew) {
      whatsNew.addEventListener('click', function (e) {
        e.preventDefault();
        showWhatsNew({ force: true });
      });
    }

    function bindFeedback(id) {
      var node = document.getElementById(id);
      if (!node) return;
      node.addEventListener('click', function (e) {
        e.preventDefault();
        if (window.HRL_FEEDBACK && typeof window.HRL_FEEDBACK.open === 'function') {
          window.HRL_FEEDBACK.open();
        }
      });
    }
    bindFeedback('footer-feedback');
    bindFeedback('readme-feedback-btn');
  }

  function shouldAutoShow(version) {
    var lastSeen = lsGet(LAST_SEEN_KEY);
    var state = lsGet(STATE_KEY);
    if (lastSeen == null || lastSeen === '') {
      if (state == null) {
        lsSet(LAST_SEEN_KEY, version);
        return false;
      }
      return true;
    }
    return compareVersions(version, lastSeen) === 1;
  }

  function showWhatsNew(options) {
    options = options || {};
    var force = options.force === true;
    var version = getAppVersion();
    var entry = findChangelogEntry(version);

    if (!force) {
      if (!shouldAutoShow(version)) return;
      // Record last-seen when the automatic modal is opened, not on
      // dismiss, so Got it / Escape / backdrop cannot skip the write.
      if (entry) lsSet(LAST_SEEN_KEY, version);
    }

    if (!entry) return;
    if (!window.HRL_MODAL || typeof window.HRL_MODAL.open !== 'function') return;

    window.HRL_MODAL.open({
      title: 'What\'s new in v' + version,
      titleId: 'whatsnew-modal-title',
      build: function (box, api) {
        var highlights = entry.highlights || [];
        var items = [];
        var i;
        for (i = 0; i < highlights.length; i++) {
          items.push(api.el('li', { text: highlights[i] }));
        }
        box.appendChild(api.el('p', { class: 'whatsnew-subtitle', text: entry.title || '' }));
        box.appendChild(api.el('ul', { class: 'whatsnew-list' }, items));
        box.appendChild(api.el('a', {
          href: 'changelog.html',
          class: 'whatsnew-history-link',
          text: 'View full version history'
        }));
        var gotIt = api.el('button', { type: 'button', text: 'Got it' });
        gotIt.addEventListener('click', function () {
          api.close();
        });
        box.appendChild(api.el('div', { class: 'modal-actions' }, [gotIt]));
      }
    });
  }

  function getDeferredVersion() {
    try {
      return sessionStorage.getItem(DEFER_KEY);
    } catch (e) {
      return null;
    }
  }

  function setDeferredVersion(version) {
    try {
      sessionStorage.setItem(DEFER_KEY, version);
    } catch (e) {}
  }

  function getDeferredBuildId() {
    try {
      return sessionStorage.getItem(DEFER_BUILD_KEY);
    } catch (e) {
      return null;
    }
  }

  function setDeferredBuildId(buildId) {
    try {
      sessionStorage.setItem(DEFER_BUILD_KEY, buildId);
    } catch (e) {}
  }

  function logCheckSkip() {
    if (updateCheckInfoLogged) return;
    updateCheckInfoLogged = true;
    if (typeof console !== 'undefined' && typeof console.info === 'function') {
      console.info('Homerun Learn to Play: update check skipped.');
    }
  }

  // User data in localStorage (including saved practice plans) is deliberately
  // left untouched. Never call localStorage.clear(),
  // localStorage.removeItem(STATE_KEY), or sessionStorage.clear().
  function applyUpdate() {
    var box = typeof document !== 'undefined' ? document.getElementById('util-modal-box') : null;
    if (box) {
      var actions = box.querySelector('.modal-actions');
      if (actions) {
        while (actions.firstChild) actions.removeChild(actions.firstChild);
        actions.appendChild((window.HRL_MODAL && window.HRL_MODAL.el) ?
          window.HRL_MODAL.el('p', { class: 'update-status', text: 'Updating…' }) :
          (function () {
            var p = document.createElement('p');
            p.className = 'update-status';
            p.textContent = 'Updating…';
            return p;
          }()));
      }
    }

    try {
      var state = localStorage.getItem(STATE_KEY);
      if (state !== null) {
        localStorage.setItem(PRE_UPDATE_BACKUP_KEY, state);
      }
    } catch (e) {}

    var reloaded = false;
    function reload() {
      if (reloaded) return;
      reloaded = true;
      window.location.reload();
    }

    setTimeout(reload, RELOAD_SAFETY_MS);

    if (typeof Promise === 'undefined') {
      reload();
      return;
    }

    var cachePromise = Promise.resolve();
    try {
      if (window.caches && typeof window.caches.keys === 'function') {
        cachePromise = window.caches.keys().then(function (keys) {
          var deletes = [];
          var i;
          for (i = 0; i < keys.length; i++) {
            deletes.push(window.caches.delete(keys[i]));
          }
          return Promise.all(deletes);
        }).catch(function () {});
      }
    } catch (e) {
      cachePromise = Promise.resolve();
    }

    var swPromise = Promise.resolve();
    try {
      if (navigator.serviceWorker && typeof navigator.serviceWorker.getRegistrations === 'function') {
        swPromise = navigator.serviceWorker.getRegistrations().then(function (regs) {
          var jobs = [];
          var i;
          for (i = 0; i < regs.length; i++) {
            jobs.push(regs[i].unregister());
          }
          return Promise.all(jobs);
        }).catch(function () {});
      }
    } catch (e) {
      swPromise = Promise.resolve();
    }

    Promise.all([cachePromise, swPromise]).then(reload).catch(reload);
  }

  function showUpdateModal(remote, local, remoteBuildId) {
    if (!window.HRL_MODAL || typeof window.HRL_MODAL.open !== 'function') return;
    window.HRL_MODAL.open({
      title: 'Update available',
      titleId: 'update-modal-title',
      build: function (box, api) {
        box.appendChild(api.el('p', {
          class: 'update-lead',
          text: 'Version ' + remote + ' is available. This device is running ' + local + '.'
        }));
        box.appendChild(api.el('p', {
          class: 'update-reassure',
          text: 'Your saved practice plans are stored on this device and are not affected by updating.'
        }));
        var later = api.el('button', { type: 'button', class: 'btn-secondary', text: 'Later' });
        var now = api.el('button', { type: 'button', text: 'Update now' });
        later.addEventListener('click', function () {
          setDeferredVersion(remote);
          if (typeof remoteBuildId === 'string' && remoteBuildId) {
            setDeferredBuildId(remoteBuildId);
          }
          api.close();
        });
        now.addEventListener('click', function () {
          applyUpdate();
        });
        box.appendChild(api.el('div', { class: 'modal-actions' }, [later, now]));
      }
    });
  }

  function checkForUpdate(options) {
    options = options || {};
    if (typeof location === 'undefined') return;
    if (location.protocol !== 'http:' && location.protocol !== 'https:') return;
    if (typeof navigator !== 'undefined' && navigator.onLine === false) return;
    if (typeof window.fetch !== 'function') return;

    var now = Date.now();
    if (!options.force && lastCheckAt && (now - lastCheckAt) < CHECK_INTERVAL_MS) return;
    lastCheckAt = now;

    window.fetch('version.json?_=' + Date.now(), { cache: 'no-store' }).then(function (response) {
      if (!response || !response.ok) return null;
      return response.json();
    }).then(function (data) {
      if (!data || typeof data !== 'object') return;
      if (!data.version) return;
      var remote = data.version;
      var local = getAppVersion();
      var versionNewer = compareVersions(remote, local) === 1;
      var staleBuild = isStaleBuild(data.buildId, getBuildId());
      if (!versionNewer && !staleBuild) return;
      if (versionNewer && getDeferredVersion() === remote) return;
      if (!versionNewer && staleBuild && getDeferredBuildId() === data.buildId) return;
      showUpdateModal(remote, local, data.buildId);
    }).catch(function () {
      logCheckSkip();
    });
  }

  function start() {
    initFooter();
    showWhatsNew();
    setTimeout(function () {
      checkForUpdate();
    }, FIRST_CHECK_DELAY_MS);
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', function () {
        if (!document.hidden) checkForUpdate();
      });
    }
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', start);
    } else {
      start();
    }
  }

  return {
    checkForUpdate: checkForUpdate,
    showWhatsNew: showWhatsNew,
    compareVersions: compareVersions,
    isStaleBuild: isStaleBuild,
    formatReleaseDate: formatReleaseDate,
    releaseDateIso: releaseDateIso,
    lastUpdatedText: lastUpdatedText
  };
}());
