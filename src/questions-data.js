/* ===================================================================
   Homerun Learn to Play — questions-data.js
   Question-bank skeleton: item registry and lookup helpers.
   ES5-safe (var, function, string concatenation). Loads as a browser
   script (root.HRL_QUESTIONS) and via Node require() for tests.
   Tier files (questions-t1.js … t6.js) call register() after this.
   =================================================================== */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;

  function isArray(x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  }

  function indexOfId(list, id) {
    var i;
    if (!list) return -1;
    for (i = 0; i < list.length; i++) {
      if (list[i] && list[i].id === id) return i;
    }
    return -1;
  }

  function sortById(list) {
    list.sort(function (a, b) {
      var aid = a && a.id ? String(a.id) : '';
      var bid = b && b.id ? String(b.id) : '';
      if (aid < bid) return -1;
      if (aid > bid) return 1;
      return 0;
    });
  }

  var api = {
    items: [],

    register: function (arr) {
      var list;
      var i;
      var q;
      var idx;
      if (!arr) return;
      list = isArray(arr) ? arr : [arr];
      for (i = 0; i < list.length; i++) {
        q = list[i];
        if (!q || !q.id) continue;
        idx = indexOfId(api.items, q.id);
        if (idx === -1) {
          api.items.push(q);
        } else {
          api.items[idx] = q;
        }
      }
      sortById(api.items);
    },

    byId: function (id) {
      var i;
      if (id == null) return null;
      for (i = 0; i < api.items.length; i++) {
        if (api.items[i] && api.items[i].id === id) return api.items[i];
      }
      return null;
    },

    byChapter: function (chapterId) {
      var out = [];
      var i;
      var q;
      for (i = 0; i < api.items.length; i++) {
        q = api.items[i];
        if (q && q.chapter === chapterId) out.push(q);
      }
      return out;
    },

    byTier: function (tierKey) {
      var out = [];
      var i;
      var q;
      for (i = 0; i < api.items.length; i++) {
        q = api.items[i];
        if (q && q.tier === tierKey) out.push(q);
      }
      return out;
    },

    byTopic: function (topic) {
      var out = [];
      var i;
      var q;
      for (i = 0; i < api.items.length; i++) {
        q = api.items[i];
        if (q && q.topic === topic) out.push(q);
      }
      return out;
    },

    byDifficulty: function (min, max) {
      var out = [];
      var i;
      var q;
      var d;
      for (i = 0; i < api.items.length; i++) {
        q = api.items[i];
        if (!q) continue;
        d = q.difficulty;
        if (typeof d !== 'number' || isNaN(d)) continue;
        if (typeof min === 'number' && d < min) continue;
        if (typeof max === 'number' && d > max) continue;
        out.push(q);
      }
      return out;
    },

    topics: function () {
      var seen = {};
      var out = [];
      var i;
      var t;
      for (i = 0; i < api.items.length; i++) {
        t = api.items[i] && api.items[i].topic;
        if (!t || seen[t]) continue;
        seen[t] = true;
        out.push(t);
      }
      out.sort(function (a, b) {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      });
      return out;
    },

    count: function () {
      return api.items.length;
    }
  };

  root.HRL_QUESTIONS = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = root.HRL_QUESTIONS;
  }
}).call(typeof window !== 'undefined' ? window : this);
