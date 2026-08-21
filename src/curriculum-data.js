/* ===================================================================
   Homerun Learn to Play — curriculum-data.js
   Curriculum skeleton: six tiers, chapter registry, and lookup helpers.
   ES5-safe (var, function, string concatenation). Loads as a browser
   script (root.HRL_CURRICULUM) and via Node require() for tests.
   Tier files (curriculum-t1.js … t6.js) call register() after this.
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

  function sortChapters(list) {
    list.sort(function (a, b) {
      var ao = (a && typeof a.order === 'number') ? a.order : 0;
      var bo = (b && typeof b.order === 'number') ? b.order : 0;
      var aid;
      var bid;
      if (ao !== bo) return ao - bo;
      aid = a && a.id ? String(a.id) : '';
      bid = b && b.id ? String(b.id) : '';
      if (aid < bid) return -1;
      if (aid > bid) return 1;
      return 0;
    });
  }

  var api = {
    tiers: [
      {
        order: 1,
        key: 'rookie',
        name: 'Rookie',
        blurb: 'For someone who has never watched a game.',
        colorVar: '--tier-rookie',
        heroImage: 'brand/hero-tier-1.jpg',
        heroFallback: { svg: 'tierHero', opts: { tier: 'rookie' } }
      },
      {
        order: 2,
        key: 'sandlot',
        name: 'Sandlot',
        blurb: 'The rules of play, for a first-season player or parent.',
        colorVar: '--tier-sandlot',
        heroImage: 'brand/hero-tier-2.jpg',
        heroFallback: { svg: 'tierHero', opts: { tier: 'sandlot' } }
      },
      {
        order: 3,
        key: 'diamond',
        name: 'Diamond',
        blurb: 'How to actually play each position.',
        colorVar: '--tier-diamond',
        heroImage: 'brand/hero-tier-3.jpg',
        heroFallback: { svg: 'tierHero', opts: { tier: 'diamond' } }
      },
      {
        order: 4,
        key: 'select',
        name: 'Select',
        blurb: 'Situations, systems, and team defence.',
        colorVar: '--tier-select',
        heroImage: 'brand/hero-tier-4.jpg',
        heroFallback: { svg: 'tierHero', opts: { tier: 'select' } }
      },
      {
        order: 5,
        key: 'elite',
        name: 'Elite',
        blurb: 'The rulebook’s hard parts and game management.',
        colorVar: '--tier-elite',
        heroImage: 'brand/hero-tier-5.jpg',
        heroFallback: { svg: 'tierHero', opts: { tier: 'elite' } }
      },
      {
        order: 6,
        key: 'promind',
        name: 'Pro Mind',
        blurb: 'Scoring, analytics, scouting, and the rulebook’s edges.',
        colorVar: '--tier-promind',
        heroImage: 'brand/hero-tier-6.jpg',
        heroFallback: { svg: 'tierHero', opts: { tier: 'promind' } }
      }
    ],
    chapters: [],

    register: function (arr) {
      var list;
      var i;
      var ch;
      var idx;
      if (!arr) return;
      list = isArray(arr) ? arr : [arr];
      for (i = 0; i < list.length; i++) {
        ch = list[i];
        if (!ch || !ch.id) continue;
        idx = indexOfId(api.chapters, ch.id);
        if (idx === -1) {
          api.chapters.push(ch);
        } else {
          api.chapters[idx] = ch;
        }
      }
      sortChapters(api.chapters);
    },

    getChapter: function (id) {
      var i;
      if (id == null) return null;
      for (i = 0; i < api.chapters.length; i++) {
        if (api.chapters[i] && api.chapters[i].id === id) return api.chapters[i];
      }
      return null;
    },

    getTier: function (key) {
      var i;
      var t;
      if (key == null) return null;
      for (i = 0; i < api.tiers.length; i++) {
        t = api.tiers[i];
        if (t && t.key === key) return t;
      }
      return null;
    },

    chaptersInTier: function (key) {
      var out = [];
      var i;
      var ch;
      for (i = 0; i < api.chapters.length; i++) {
        ch = api.chapters[i];
        if (ch && ch.tier === key) out.push(ch);
      }
      return out;
    },

    firstChapterOfTier: function (key) {
      var list = api.chaptersInTier(key);
      return list.length ? list[0] : null;
    },

    chapterIndex: function (id) {
      var i;
      if (id == null) return -1;
      for (i = 0; i < api.chapters.length; i++) {
        if (api.chapters[i] && api.chapters[i].id === id) return i;
      }
      return -1;
    },

    totalChapters: function () {
      return api.chapters.length;
    }
  };

  root.HRL_CURRICULUM = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = root.HRL_CURRICULUM;
  }
}).call(typeof window !== 'undefined' ? window : this);
