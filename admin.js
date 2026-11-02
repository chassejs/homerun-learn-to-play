/* ===================================================================
   Homerun Learn to Play — admin.js
   Review feedback sent from this browser, and manage admin sign-ins.
   The starting sign-in is username "admin", password "admin".
   Saved passwords are salted SHA-256 hashes, on this browser only.
   =================================================================== */

(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : this;

  var DEFAULT_USERNAME = 'admin';
  var DEFAULT_PASSWORD = 'admin';
  var USERS_KEY = 'homerun-learn/admin-users';
  var SESSION_KEY = 'homerun-learn/admin-session';
  var PASSWORD_MAX = 200;

  var memoryLocal = {};
  var memorySession = {};
  var started = false;
  var queueFilter = 'new';

  var SHA_K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];

  function rotr(n, x) {
    return (x >>> n) | (x << (32 - n));
  }

  function utf8Bytes(str) {
    var out = [];
    var i;
    var c;
    var c2;
    for (i = 0; i < str.length; i++) {
      c = str.charCodeAt(i);
      if (c < 0x80) {
        out.push(c);
      } else if (c < 0x800) {
        out.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f));
      } else if (c >= 0xd800 && c <= 0xdbff && i + 1 < str.length) {
        c2 = str.charCodeAt(i + 1);
        if (c2 >= 0xdc00 && c2 <= 0xdfff) {
          c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
          i += 1;
          out.push(
            0xf0 | (c >> 18),
            0x80 | ((c >> 12) & 0x3f),
            0x80 | ((c >> 6) & 0x3f),
            0x80 | (c & 0x3f)
          );
          continue;
        }
        out.push(0xef, 0xbf, 0xbd);
      } else {
        out.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
      }
    }
    return out;
  }

  function sha256Hex(str) {
    var bytes = utf8Bytes(String(str));
    var bitLen = bytes.length * 8;
    var H = [
      0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
      0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
    ];
    var offset;
    var t;
    var W;
    var a;
    var b;
    var c;
    var d;
    var e;
    var f;
    var g;
    var h;
    var s0;
    var s1;
    var ch;
    var maj;
    var t1;
    var t2;
    var hex;
    var n;
    bytes.push(0x80);
    while ((bytes.length % 64) !== 56) bytes.push(0);
    bytes.push(0, 0, 0, 0);
    bytes.push((bitLen >>> 24) & 255, (bitLen >>> 16) & 255, (bitLen >>> 8) & 255, bitLen & 255);
    for (offset = 0; offset < bytes.length; offset += 64) {
      W = [];
      for (t = 0; t < 16; t++) {
        W[t] = (
          (bytes[offset + t * 4] << 24) |
          (bytes[offset + t * 4 + 1] << 16) |
          (bytes[offset + t * 4 + 2] << 8) |
          bytes[offset + t * 4 + 3]
        ) | 0;
      }
      for (t = 16; t < 64; t++) {
        s0 = rotr(7, W[t - 15]) ^ rotr(18, W[t - 15]) ^ (W[t - 15] >>> 3);
        s1 = rotr(17, W[t - 2]) ^ rotr(19, W[t - 2]) ^ (W[t - 2] >>> 10);
        W[t] = (W[t - 16] + s0 + W[t - 7] + s1) | 0;
      }
      a = H[0];
      b = H[1];
      c = H[2];
      d = H[3];
      e = H[4];
      f = H[5];
      g = H[6];
      h = H[7];
      for (t = 0; t < 64; t++) {
        s1 = rotr(6, e) ^ rotr(11, e) ^ rotr(25, e);
        ch = (e & f) ^ ((~e) & g);
        t1 = (h + s1 + ch + SHA_K[t] + W[t]) | 0;
        s0 = rotr(2, a) ^ rotr(13, a) ^ rotr(22, a);
        maj = (a & b) ^ (a & c) ^ (b & c);
        t2 = (s0 + maj) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
      }
      H[0] = (H[0] + a) | 0;
      H[1] = (H[1] + b) | 0;
      H[2] = (H[2] + c) | 0;
      H[3] = (H[3] + d) | 0;
      H[4] = (H[4] + e) | 0;
      H[5] = (H[5] + f) | 0;
      H[6] = (H[6] + g) | 0;
      H[7] = (H[7] + h) | 0;
    }
    hex = '';
    for (t = 0; t < H.length; t++) {
      n = (H[t] >>> 0).toString(16);
      while (n.length < 8) n = '0' + n;
      hex += n;
    }
    return hex;
  }

  function bytesToHex(bytes) {
    var out = '';
    var i;
    var h;
    for (i = 0; i < bytes.length; i++) {
      h = bytes[i].toString(16);
      if (h.length < 2) h = '0' + h;
      out += h;
    }
    return out;
  }

  function randomSalt() {
    var bytes = [];
    var i;
    var buf;
    var cryptoObj;
    try {
      cryptoObj = root.crypto || (typeof crypto !== 'undefined' ? crypto : null);
      if (cryptoObj && typeof cryptoObj.getRandomValues === 'function' && typeof Uint8Array === 'function') {
        buf = new Uint8Array(16);
        cryptoObj.getRandomValues(buf);
        for (i = 0; i < buf.length; i++) bytes.push(buf[i]);
        return bytesToHex(bytes);
      }
    } catch (err) {}
    for (i = 0; i < 16; i++) bytes.push(Math.floor(Math.random() * 256));
    return bytesToHex(bytes);
  }

  function hashPassword(salt, password) {
    return sha256Hex(String(salt) + ':' + String(password));
  }

  function hashesEqual(a, b) {
    var i;
    var diff = 0;
    if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return diff === 0;
  }

  function memoryBag(bag) {
    return {
      getItem: function (key) {
        return Object.prototype.hasOwnProperty.call(bag, key) ? bag[key] : null;
      },
      setItem: function (key, value) {
        bag[key] = String(value);
      },
      removeItem: function (key) {
        delete bag[key];
      }
    };
  }

  function clearBag(bag) {
    var key;
    for (key in bag) {
      if (Object.prototype.hasOwnProperty.call(bag, key)) delete bag[key];
    }
  }

  function liveStore(kind) {
    var store;
    try {
      store = kind === 'session' ? root.sessionStorage : root.localStorage;
      if (store && typeof store.getItem === 'function' && typeof store.setItem === 'function') {
        store.getItem(USERS_KEY);
        return store;
      }
    } catch (err) {}
    return null;
  }

  function localStore() {
    return liveStore('local') || memoryBag(memoryLocal);
  }

  function sessionStore() {
    return liveStore('session') || memoryBag(memorySession);
  }

  function readUsers() {
    var raw;
    var parsed;
    var i;
    try {
      raw = localStore().getItem(USERS_KEY);
    } catch (err) {
      raw = null;
    }
    if (!raw) return null;
    try {
      parsed = JSON.parse(raw);
    } catch (err2) {
      return null;
    }
    if (Object.prototype.toString.call(parsed) !== '[object Array]' || !parsed.length) return null;
    for (i = 0; i < parsed.length; i++) {
      if (!parsed[i] || !parsed[i].username || !parsed[i].salt || !parsed[i].hash) return null;
    }
    return parsed;
  }

  function writeUsers(users) {
    try {
      localStore().setItem(USERS_KEY, JSON.stringify(users));
      return true;
    } catch (err) {
      return false;
    }
  }

  function normalizeUsername(name) {
    return String(name == null ? '' : name).replace(/^\s+|\s+$/g, '').toLowerCase();
  }

  function usernameProblem(name) {
    if (!name) return 'Enter a username.';
    if (name.length > 32) return 'That username is too long.';
    if (!/^[a-z0-9][a-z0-9._-]*$/.test(name)) {
      return 'Use letters, numbers, dots, hyphens, or underscores, and start with a letter or number.';
    }
    return '';
  }

  function passwordProblem(nxt) {
    if (!nxt || nxt.replace(/^\s+|\s+$/g, '') !== nxt || nxt.replace(/\s/g, '') === '') {
      return 'Enter a password without leading or trailing spaces.';
    }
    if (nxt.length > PASSWORD_MAX) return 'That password is too long.';
    return '';
  }

  function findUser(users, name) {
    var i;
    if (!users) return null;
    for (i = 0; i < users.length; i++) {
      if (users[i] && users[i].username === name) return users[i];
    }
    return null;
  }

  function passwordMatches(user, password) {
    if (!user) return false;
    return hashesEqual(user.hash, hashPassword(user.salt, password));
  }

  function currentUser() {
    var name;
    try {
      name = sessionStore().getItem(SESSION_KEY);
    } catch (err) {
      name = null;
    }
    return name ? String(name) : '';
  }

  function isSignedIn() {
    return currentUser() !== '';
  }

  function setSession(name) {
    try {
      if (name) sessionStore().setItem(SESSION_KEY, name);
      else sessionStore().removeItem(SESSION_KEY);
    } catch (err) {}
  }

  function signIn(username, password) {
    var name = normalizeUsername(username);
    var pass = password == null ? '' : String(password);
    var users;
    var user;
    if (!name || !pass) {
      return { ok: false, message: 'Enter the username and password.' };
    }
    users = readUsers();
    if (!users) {
      if (name === DEFAULT_USERNAME && pass === DEFAULT_PASSWORD) {
        setSession(DEFAULT_USERNAME);
        return { ok: true, message: '' };
      }
      return { ok: false, message: 'That username or password is not right.' };
    }
    user = findUser(users, name);
    if (!user || !passwordMatches(user, pass)) {
      return { ok: false, message: 'That username or password is not right.' };
    }
    setSession(user.username);
    return { ok: true, message: '' };
  }

  function signOut() {
    setSession('');
    return { ok: true, message: '' };
  }

  function listUsers() {
    var users = readUsers();
    var out = [];
    var i;
    if (!users) return [{ username: DEFAULT_USERNAME }];
    for (i = 0; i < users.length; i++) out.push({ username: users[i].username });
    return out;
  }

  function changePassword(username, next, confirmNext) {
    var name = normalizeUsername(username);
    var nxt = next == null ? '' : String(next);
    var conf = confirmNext == null ? '' : String(confirmNext);
    var problem;
    var users;
    var user;
    var salt;
    if (!isSignedIn()) return { ok: false, message: 'Sign in first.' };
    problem = usernameProblem(name);
    if (problem) return { ok: false, message: problem };
    problem = passwordProblem(nxt);
    if (problem) return { ok: false, message: problem };
    if (nxt !== conf) return { ok: false, message: 'The new passwords do not match.' };
    users = readUsers();
    if (!users) {
      if (name !== DEFAULT_USERNAME) return { ok: false, message: 'That admin is not on the list.' };
      users = [];
      user = null;
    } else {
      user = findUser(users, name);
      if (!user) return { ok: false, message: 'That admin is not on the list.' };
    }
    if (user && passwordMatches(user, nxt)) {
      return { ok: false, message: 'That is already the password for this admin.' };
    }
    salt = randomSalt();
    if (!user) {
      users.push({ username: name, salt: salt, hash: hashPassword(salt, nxt) });
    } else {
      user.salt = salt;
      user.hash = hashPassword(salt, nxt);
    }
    if (!writeUsers(users)) return { ok: false, message: 'Could not save the new password on this browser.' };
    return { ok: true, message: 'Password updated for ' + name + '.' };
  }

  function createUser(username, password, confirmPassword) {
    var name = normalizeUsername(username);
    var pass = password == null ? '' : String(password);
    var conf = confirmPassword == null ? '' : String(confirmPassword);
    var problem;
    var users;
    var salt;
    if (!isSignedIn()) return { ok: false, message: 'Sign in first.' };
    problem = usernameProblem(name);
    if (problem) return { ok: false, message: problem };
    problem = passwordProblem(pass);
    if (problem) return { ok: false, message: problem };
    if (pass !== conf) return { ok: false, message: 'The new passwords do not match.' };
    users = readUsers();
    if (!users) {
      salt = randomSalt();
      users = [{
        username: DEFAULT_USERNAME,
        salt: salt,
        hash: hashPassword(salt, DEFAULT_PASSWORD)
      }];
    }
    if (findUser(users, name)) return { ok: false, message: 'That username is already an admin.' };
    salt = randomSalt();
    users.push({ username: name, salt: salt, hash: hashPassword(salt, pass) });
    if (!writeUsers(users)) return { ok: false, message: 'Could not save that admin on this browser.' };
    return { ok: true, message: name + ' can sign in now.' };
  }

  function resetForTests() {
    clearBag(memoryLocal);
    clearBag(memorySession);
    queueFilter = 'new';
    try {
      if (liveStore('local')) liveStore('local').removeItem(USERS_KEY);
    } catch (err) {}
    try {
      if (liveStore('session')) liveStore('session').removeItem(SESSION_KEY);
    } catch (err2) {}
  }

  function storedUsersJsonForTests() {
    try {
      return localStore().getItem(USERS_KEY);
    } catch (err) {
      return null;
    }
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    var key;
    var val;
    var i;
    if (attrs) {
      for (key in attrs) {
        if (!Object.prototype.hasOwnProperty.call(attrs, key)) continue;
        val = attrs[key];
        if (key === 'class') node.className = val;
        else if (key === 'text') node.textContent = val;
        else if (key === 'for') node.setAttribute('for', val);
        else node.setAttribute(key, val);
      }
    }
    if (children) {
      for (i = 0; i < children.length; i++) {
        if (children[i]) node.appendChild(children[i]);
      }
    }
    return node;
  }

  function field(id, labelText, input) {
    return el('div', { class: 'admin-field' }, [
      el('label', { 'for': id, text: labelText }),
      input
    ]);
  }

  function focusNode(node) {
    if (!node) return;
    try {
      if (!node.hasAttribute('tabindex')) node.setAttribute('tabindex', '-1');
      node.focus();
    } catch (err) {}
  }

  function formatWhen(iso) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var parts = String(iso || '').split('T')[0].split('-');
    var month;
    var day;
    if (parts.length < 3) return iso || '';
    month = parseInt(parts[1], 10);
    day = parseInt(parts[2], 10);
    if (!month || !day || month < 1 || month > 12) return iso || '';
    return String(day) + ' ' + months[month - 1] + ' ' + parts[0];
  }

  function statusLabel(status) {
    if (status === 'reviewing') return 'In review';
    if (status === 'resolved') return 'Resolved';
    return 'New';
  }

  function comments() {
    if (!root.HRL_FEEDBACK || typeof root.HRL_FEEDBACK.list !== 'function') return null;
    try {
      return root.HRL_FEEDBACK.list();
    } catch (err) {
      return null;
    }
  }

  function countStatus(items, status) {
    var n = 0;
    var i;
    for (i = 0; i < items.length; i++) {
      if (items[i] && items[i].status === status) n += 1;
    }
    return n;
  }

  function versionLine() {
    var ver = root.HRL_VERSION || {};
    var updated = '';
    if (root.HRL_APP_UPDATES && typeof root.HRL_APP_UPDATES.lastUpdatedText === 'function') {
      updated = root.HRL_APP_UPDATES.lastUpdatedText();
    }
    return 'Version ' + (ver.APP_VERSION || 'unknown') + (updated ? ' · ' + updated : '');
  }

  function renderSignedOut(host) {
    var username;
    var password;
    var error;
    var form;
    username = el('input', {
      id: 'admin-username',
      type: 'text',
      autocomplete: 'username',
      spellcheck: 'false',
      required: 'required',
      value: DEFAULT_USERNAME
    });
    password = el('input', {
      id: 'admin-password',
      type: 'password',
      autocomplete: 'current-password',
      spellcheck: 'false',
      required: 'required'
    });
    error = el('p', { id: 'admin-error', class: 'admin-error', role: 'alert' });
    error.hidden = true;
    form = el('form', { class: 'admin-form', id: 'admin-sign-in' }, [
      el('p', {
        class: 'admin-note',
        text: 'The starting sign-in is username admin, password admin. This lock only covers the admin screen on this browser — lessons stay open.'
      }),
      field('admin-username', 'Username', username),
      field('admin-password', 'Password', password),
      error,
      el('div', { class: 'admin-actions' }, [
        el('button', { type: 'submit', class: 'btn btn-primary', text: 'Sign in' })
      ])
    ]);
    form.addEventListener('submit', function (event) {
      var result;
      event.preventDefault();
      result = signIn(username.value, password.value);
      if (!result.ok) {
        error.hidden = false;
        error.textContent = result.message;
        password.setAttribute('aria-invalid', 'true');
        focusNode(password);
        return;
      }
      queueFilter = 'new';
      render();
      focusNode(document.getElementById('admin-queue-title'));
    });
    host.appendChild(form);
  }

  function renderQueue(host, notice) {
    var items = comments();
    var shown = [];
    var i;
    var counts;
    var filters;
    var list;
    var empty;
    function addFilter(id, label, count) {
      var btn = el('button', {
        type: 'button',
        class: 'btn ' + (queueFilter === id ? 'btn-primary' : 'btn-secondary'),
        text: label + ' (' + count + ')',
        'aria-pressed': queueFilter === id ? 'true' : 'false'
      });
      btn.addEventListener('click', function () {
        queueFilter = id;
        render();
        focusNode(document.getElementById('admin-filter-' + id));
      });
      btn.id = 'admin-filter-' + id;
      filters.appendChild(btn);
    }
    host.appendChild(el('h3', { id: 'admin-queue-title', text: 'Feedback' }));
    host.appendChild(el('p', {
      class: 'admin-note',
      text: 'Comments sent from the feedback form on this browser. The email still opens in the mail app.'
    }));
    if (notice) host.appendChild(notice);
    if (!items) {
      host.appendChild(el('p', { text: 'Feedback is not loaded.' }));
      return;
    }
    counts = {
      new: countStatus(items, 'new'),
      reviewing: countStatus(items, 'reviewing'),
      resolved: countStatus(items, 'resolved'),
      all: items.length
    };
    filters = el('div', { class: 'admin-actions', role: 'group', 'aria-label': 'Filter feedback' });
    addFilter('new', 'New', counts.new);
    addFilter('reviewing', 'In review', counts.reviewing);
    addFilter('resolved', 'Resolved', counts.resolved);
    addFilter('all', 'All', counts.all);
    host.appendChild(filters);
    for (i = 0; i < items.length; i++) {
      if (queueFilter === 'all' || (items[i] && items[i].status === queueFilter)) shown.push(items[i]);
    }
    if (!shown.length) {
      empty = queueFilter === 'new'
        ? 'Nothing new to review.'
        : 'No comments in this group.';
      host.appendChild(el('p', { class: 'admin-note', text: empty }));
      return;
    }
    list = el('div', { class: 'admin-queue' });
    for (i = 0; i < shown.length; i++) list.appendChild(renderComment(shown[i]));
    host.appendChild(list);
  }

  function renderComment(item) {
    var meta;
    var ratingText = item.rating ? (item.rating + ' out of 5') : 'Not rated';
    var where = item.contextLabel || 'Somewhere else';
    var card;
    var actions;
    if (item.chapterTitle) where += ' — ' + item.chapterTitle;
    meta = statusLabel(item.status) + ' · ' + (item.categoryLabel || 'Feedback') + ' · ' + where + ' · ' + ratingText + ' · ' + formatWhen(item.createdAt);
    card = el('article', { class: 'admin-comment' }, [
      el('p', { class: 'admin-comment-meta', text: meta }),
      el('p', { class: 'admin-comment-body', text: item.details || '' }),
      el('p', { class: 'admin-note', text: 'v' + (item.version || 'unknown') + ' · build ' + (item.buildId || 'unknown') })
    ]);
    actions = el('div', { class: 'admin-actions' });
    function act(label, status) {
      var btn = el('button', { type: 'button', class: 'btn btn-secondary', text: label });
      btn.addEventListener('click', function () {
        var result;
        var note;
        if (!root.HRL_FEEDBACK || typeof root.HRL_FEEDBACK.setStatus !== 'function') return;
        result = root.HRL_FEEDBACK.setStatus(item.id, status);
        note = el('p', {
          id: 'admin-queue-status',
          class: result.ok ? 'admin-status admin-status-ok' : 'admin-status admin-error',
          role: 'status',
          text: result.ok ? (label + '.') : result.message
        });
        render();
        var title = document.getElementById('admin-queue-title');
        if (title && title.parentNode) title.parentNode.insertBefore(note, title.nextSibling);
        focusNode(note);
      });
      actions.appendChild(btn);
    }
    if (item.status === 'new') {
      act('Start review', 'reviewing');
      act('Resolve', 'resolved');
    } else if (item.status === 'reviewing') {
      act('Resolve', 'resolved');
      act('Back to new', 'new');
    } else {
      act('Reopen', 'new');
    }
    card.appendChild(actions);
    return card;
  }

  function renderAdmins(host, notice) {
    var users = listUsers();
    var me = currentUser();
    var i;
    var list;
    var createName;
    var createPass;
    var createConfirm;
    var createForm;
    host.appendChild(el('h3', { id: 'admin-users-title', text: 'Admins' }));
    host.appendChild(el('p', {
      class: 'admin-note',
      text: 'Passwords are stored as a hash on this browser. Clearing site data brings back username admin, password admin.'
    }));
    if (notice) host.appendChild(notice);
    list = el('ul', { class: 'admin-user-list' });
    for (i = 0; i < users.length; i++) list.appendChild(renderUserRow(users[i].username, me));
    host.appendChild(list);
    createName = el('input', {
      id: 'admin-new-username',
      type: 'text',
      autocomplete: 'off',
      spellcheck: 'false'
    });
    createPass = el('input', {
      id: 'admin-new-user-password',
      type: 'password',
      autocomplete: 'new-password',
      spellcheck: 'false'
    });
    createConfirm = el('input', {
      id: 'admin-new-user-confirm',
      type: 'password',
      autocomplete: 'new-password',
      spellcheck: 'false'
    });
    createForm = el('form', { class: 'admin-form', id: 'admin-create-form' }, [
      el('h3', { text: 'Add an admin' }),
      field('admin-new-username', 'Username', createName),
      field('admin-new-user-password', 'Password', createPass),
      field('admin-new-user-confirm', 'Confirm password', createConfirm),
      el('div', { class: 'admin-actions' }, [
        el('button', { type: 'submit', class: 'btn btn-primary', text: 'Create admin' })
      ])
    ]);
    createForm.addEventListener('submit', function (event) {
      var result;
      var note;
      event.preventDefault();
      result = createUser(createName.value, createPass.value, createConfirm.value);
      note = el('p', {
        id: 'admin-users-status',
        class: result.ok ? 'admin-status admin-status-ok' : 'admin-status admin-error',
        role: 'status',
        text: result.message
      });
      render();
      var title = document.getElementById('admin-users-title');
      if (title && title.parentNode) title.parentNode.insertBefore(note, title.nextSibling);
      focusNode(note);
    });
    host.appendChild(createForm);
  }

  function renderUserRow(username, me) {
    var pass;
    var confirmPass;
    var form;
    var item = el('li', { class: 'admin-user' });
    var who = username + (username === me ? ' (you)' : '');
    pass = el('input', {
      id: 'admin-pass-' + username,
      type: 'password',
      autocomplete: 'new-password',
      spellcheck: 'false',
      'aria-label': 'New password for ' + username
    });
    confirmPass = el('input', {
      id: 'admin-confirm-' + username,
      type: 'password',
      autocomplete: 'new-password',
      spellcheck: 'false',
      'aria-label': 'Confirm new password for ' + username
    });
    form = el('form', { class: 'admin-user-form' }, [
      el('p', { class: 'admin-user-name', text: who }),
      field('admin-pass-' + username, 'New password', pass),
      field('admin-confirm-' + username, 'Confirm new password', confirmPass),
      el('div', { class: 'admin-actions' }, [
        el('button', { type: 'submit', class: 'btn btn-secondary', text: 'Set password' })
      ])
    ]);
    form.addEventListener('submit', function (event) {
      var result;
      var note;
      event.preventDefault();
      result = changePassword(username, pass.value, confirmPass.value);
      note = el('p', {
        id: 'admin-users-status',
        class: result.ok ? 'admin-status admin-status-ok' : 'admin-status admin-error',
        role: 'status',
        text: result.message
      });
      render();
      var title = document.getElementById('admin-users-title');
      if (title && title.parentNode) title.parentNode.insertBefore(note, title.nextSibling);
      focusNode(note);
    });
    item.appendChild(form);
    return item;
  }

  function renderDashboard(host) {
    var signOutBtn = el('button', { type: 'button', class: 'btn btn-secondary', text: 'Sign out' });
    signOutBtn.addEventListener('click', function () {
      signOut();
      render();
      focusNode(document.getElementById('admin-username'));
    });
    host.appendChild(el('div', { class: 'admin-panel' }, [
      el('p', { class: 'admin-signed-in', text: 'Signed in as ' + currentUser() + '.' }),
      el('p', { class: 'admin-note', text: versionLine() }),
      el('div', { class: 'admin-actions' }, [signOutBtn])
    ]));
    renderQueue(host);
    renderAdmins(host);
  }

  function render() {
    var host;
    if (typeof document === 'undefined') return;
    host = document.getElementById('admin-root');
    if (!host) return;
    while (host.firstChild) host.removeChild(host.firstChild);
    if (isSignedIn()) renderDashboard(host);
    else renderSignedOut(host);
  }

  function hashIsAdmin() {
    var hash = '';
    try {
      hash = String(root.location && root.location.hash || '');
    } catch (err) {
      hash = '';
    }
    return hash === '#admin' || hash === '#/admin';
  }

  function syncHash(view) {
    var loc;
    try {
      loc = root.location;
      if (!loc) return;
      if (view === 'admin') {
        if (loc.hash !== '#admin') loc.hash = 'admin';
        return;
      }
      if (loc.hash === '#admin' || loc.hash === '#/admin') {
        if (root.history && typeof root.history.replaceState === 'function') {
          root.history.replaceState(null, '', loc.pathname + loc.search);
        }
      }
    } catch (err) {}
  }

  function alreadyOnAdmin() {
    return !!(root.HRL_SHELL &&
      typeof root.HRL_SHELL.current === 'function' &&
      root.HRL_SHELL.current() === 'admin');
  }

  function openAdmin() {
    if (alreadyOnAdmin()) return;
    if (root.HRL_SHELL && typeof root.HRL_SHELL.showView === 'function') {
      root.HRL_SHELL.showView('admin');
    }
  }

  function start() {
    if (started) return;
    started = true;
    if (typeof document === 'undefined') return;
    if (root.HRL_SHELL && typeof root.HRL_SHELL.on === 'function') {
      root.HRL_SHELL.on('viewchange', function (payload) {
        if (!payload) return;
        if (payload.view === 'admin') render();
        syncHash(payload.view);
      });
    }
    if (typeof root.addEventListener === 'function') {
      root.addEventListener('hashchange', function () {
        if (hashIsAdmin()) openAdmin();
      });
    }
    if (hashIsAdmin()) openAdmin();
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', start);
    } else {
      start();
    }
  }

  var api = {
    DEFAULT_USERNAME: DEFAULT_USERNAME,
    DEFAULT_PASSWORD: DEFAULT_PASSWORD,
    sha256Hex: sha256Hex,
    hashPassword: hashPassword,
    signIn: signIn,
    signOut: signOut,
    isSignedIn: isSignedIn,
    currentUser: currentUser,
    listUsers: listUsers,
    createUser: createUser,
    changePassword: changePassword,
    resetForTests: resetForTests,
    storedUsersJsonForTests: storedUsersJsonForTests,
    render: render,
    mount: start
  };

  root.HRL_ADMIN = api;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
}).call(typeof window !== 'undefined' ? window : this);
