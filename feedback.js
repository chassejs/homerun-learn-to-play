/* ===================================================================
   Homerun Learn to Play — feedback.js
   In-app feedback form that drafts a mailto: message. No network.
   =================================================================== */

window.HRL_FEEDBACK = (function () {
  'use strict';

  var FEEDBACK_EMAIL = 'feedback-learn@homerunbaseballottawa.ca';
  var DETAILS_MAX = 2000;
  var MAIL_BODY_LIMIT = 1800;
  var TRUNCATE_NOTE = '[report truncated — use "Copy report" for the full text]';

  var CATEGORIES = [
    { value: '', label: 'Choose one…' },
    { value: 'lesson', label: 'Lesson content — wrong, unclear, or missing' },
    { value: 'quiz', label: 'A quiz question is wrong or unclear' },
    { value: 'iq', label: 'Baseball IQ test' },
    { value: 'diagrams', label: 'Diagrams and interactive exercises' },
    { value: 'progress', label: 'Progress, export, or import' },
    { value: 'design', label: 'Design & layout' },
    { value: 'feature', label: 'Feature request' },
    { value: 'question', label: 'Question / need help' },
    { value: 'other', label: 'Other' }
  ];

  var CONTEXTS = [
    { value: 'home', label: 'Home' },
    { value: 'path', label: 'My Path' },
    { value: 'chapter', label: 'A chapter' },
    { value: 'quiz', label: 'A chapter quiz' },
    { value: 'iq', label: 'Baseball IQ test' },
    { value: 'review', label: 'Review deck' },
    { value: 'glossary', label: 'Glossary' },
    { value: 'help', label: 'Help & Guide' },
    { value: 'other', label: 'Somewhere else' }
  ];

  function trim(s) {
    return String(s == null ? '' : s).replace(/^\s+|\s+$/g, '');
  }

  function appVersion() {
    var ver;
    try {
      ver = window.HRL_VERSION && window.HRL_VERSION.APP_VERSION;
    } catch (err) {
      ver = null;
    }
    return ver ? String(ver) : 'unknown';
  }

  function buildId() {
    var id;
    try {
      id = window.HRL_VERSION && window.HRL_VERSION.BUILD_ID;
    } catch (err) {
      id = null;
    }
    return id ? String(id) : 'unknown';
  }

  function contextLabelFor(value) {
    var i;
    for (i = 0; i < CONTEXTS.length; i++) {
      if (CONTEXTS[i].value === value) return CONTEXTS[i].label;
    }
    return 'Somewhere else';
  }

  function contextValueFromView(viewName) {
    var i;
    if (!viewName) return 'other';
    for (i = 0; i < CONTEXTS.length; i++) {
      if (CONTEXTS[i].value === viewName) return CONTEXTS[i].value;
    }
    return 'other';
  }

  function currentContextValue() {
    var view = '';
    try {
      if (window.HRL_SHELL && typeof window.HRL_SHELL.current === 'function') {
        view = window.HRL_SHELL.current();
      }
    } catch (err) {
      view = '';
    }
    return contextValueFromView(view);
  }

  function currentChapterTitle(contextValue) {
    var rootId;
    var root;
    var heading;
    var text;
    if (typeof document === 'undefined') return '';
    if (contextValue === 'chapter') rootId = 'view-chapter';
    else if (contextValue === 'quiz') rootId = 'view-quiz';
    else return '';
    root = document.getElementById(rootId);
    if (!root) return '';
    heading = root.querySelector('h2');
    if (!heading) return '';
    text = trim(heading.textContent || heading.innerText || '');
    if (!text) return '';
    if (contextValue === 'chapter' && text === 'Chapter') return '';
    if (contextValue === 'quiz' && text === 'Chapter quiz') return '';
    return text;
  }

  function whereLine(contextLabel, chapterTitle) {
    if (chapterTitle) return contextLabel + ', ' + chapterTitle;
    return contextLabel;
  }

  function categoryLabel(value) {
    var i;
    for (i = 0; i < CATEGORIES.length; i++) {
      if (CATEGORIES[i].value === value) return CATEGORIES[i].label;
    }
    return value;
  }

  function ratingStars(rating) {
    var out = '';
    var i;
    for (i = 1; i <= 5; i++) {
      out += i <= rating ? '★' : '☆';
    }
    return out;
  }

  function starAriaLabel(n) {
    return n === 1 ? '1 star' : n + ' stars';
  }

  function pageLine() {
    if (typeof location === 'undefined') return 'unknown';
    if (location.protocol === 'file:') return 'offline file';
    return location.href;
  }

  function deviceLine() {
    return (typeof navigator !== 'undefined' && navigator.userAgent) ? navigator.userAgent : 'unknown';
  }

  function screenLine() {
    if (typeof window === 'undefined' || !window.screen) return 'unknown';
    return window.screen.width + 'x' + window.screen.height;
  }

  function buildBody(rating, catLabel, details, contextLabel, chapterTitle) {
    var ratingLine;
    var footer;
    if (!rating) {
      ratingLine = 'Rating: not rated';
    } else {
      ratingLine = 'Rating: ' + ratingStars(rating) + ' (' + rating + ' out of 5)';
    }
    footer =
      '---\n' +
      'App version: ' + appVersion() + '\n' +
      'Build: ' + buildId() + '\n' +
      'Where: ' + whereLine(contextLabel, chapterTitle) + '\n' +
      'Page: ' + pageLine() + '\n' +
      'Device: ' + deviceLine() + '\n' +
      'Screen: ' + screenLine() + '\n' +
      'Sent: ' + new Date().toISOString();
    return (
      ratingLine + '\n' +
      'Category: ' + catLabel + '\n' +
      '\n' +
      footer + '\n' +
      '\n' +
      'What happened:\n' +
      details
    );
  }

  function buildSubject(catLabel, rating, contextLabel) {
    var subject = 'Homerun Learn to Play feedback — ' + catLabel + ' — ' + contextLabel;
    if (rating > 0) subject += ' — ' + rating + '/5';
    return subject;
  }

  function copyText(text, button, host) {
    function markCopied() {
      var prev = button.textContent;
      button.textContent = 'Copied ✓';
      setTimeout(function () {
        button.textContent = prev;
      }, 2000);
    }

    function fallbackExec() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', 'readonly');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      ta.style.top = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      var ok = false;
      try {
        ok = document.execCommand('copy');
      } catch (err) {
        ok = false;
      }
      if (ta.parentNode) ta.parentNode.removeChild(ta);
      return ok;
    }

    function showManual() {
      var existing = host.querySelector('.feedback-fallback-text');
      if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
      var ta = document.createElement('textarea');
      ta.className = 'feedback-fallback-text';
      ta.readOnly = true;
      ta.value = text;
      host.appendChild(ta);
      ta.focus();
      ta.select();
    }

    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard.writeText(text).then(markCopied).catch(function () {
        if (fallbackExec()) markCopied();
        else showManual();
      });
      return;
    }
    if (fallbackExec()) markCopied();
    else showManual();
  }

  function clearKeepTitle(box) {
    var heading = box.querySelector('.modal-title');
    while (box.lastChild && box.lastChild !== heading) {
      box.removeChild(box.lastChild);
    }
  }

  function showConfirmation(box, api, subject, fullBody, truncated) {
    api.setTitle('Feedback ready to send');
    clearKeepTitle(box);

    box.appendChild(api.el('p', {
      class: 'feedback-confirm',
      text: 'Your email app should have opened with the message ready. You still need to press Send there.'
    }));
    box.appendChild(api.el('p', {
      class: 'feedback-confirm-note',
      text: 'If nothing opened, copy the report and email it to this address:'
    }));
    box.appendChild(api.el('p', { class: 'feedback-address-line' }, [
      api.el('code', { class: 'feedback-email', text: FEEDBACK_EMAIL })
    ]));
    if (truncated) {
      box.appendChild(api.el('p', {
        class: 'feedback-truncated-note',
        text: 'The emailed copy was shortened. The copied version is complete.'
      }));
    }

    var copyBtn = api.el('button', { type: 'button', class: 'btn-secondary', text: 'Copy report' });
    var closeBtn = api.el('button', { type: 'button', text: 'Close' });
    var actions = api.el('div', { class: 'modal-actions' }, [copyBtn, closeBtn]);
    var reportText = subject + '\n\n' + fullBody;

    copyBtn.addEventListener('click', function () {
      copyText(reportText, copyBtn, box);
    });
    closeBtn.addEventListener('click', function () {
      api.close();
    });

    box.appendChild(actions);
  }

  function open() {
    if (!window.HRL_MODAL || typeof window.HRL_MODAL.open !== 'function') return;

    window.HRL_MODAL.open({
      title: 'Send feedback',
      titleId: 'feedback-modal-title',
      build: function (box, api) {
        var rating = 0;
        var lastErrorOn = null;
        var starButtons = [];
        var i;
        var openedContext = currentContextValue();
        var openedTitle = currentChapterTitle(openedContext);

        box.appendChild(api.el('p', {
          class: 'feedback-intro',
          text: 'Feedback goes to the Homerun Baseball Ottawa team. Pressing Send opens your email app with the message already written, ready to send.'
        }));

        var group = api.el('div', {
          class: 'star-rating',
          role: 'radiogroup',
          'aria-label': 'Overall rating'
        });
        for (i = 1; i <= 5; i++) {
          (function (value) {
            var btn = api.el('button', {
              type: 'button',
              class: 'star-btn',
              role: 'radio',
              'aria-checked': 'false',
              'aria-label': starAriaLabel(value),
              'data-value': String(value),
              text: '★'
            });
            btn.tabIndex = value === 1 ? 0 : -1;
            btn.addEventListener('click', function () {
              setRating(value);
            });
            starButtons.push(btn);
            group.appendChild(btn);
          }(i));
        }

        var ratingLabel = api.el('span', { class: 'star-rating-label', text: 'Not rated' });

        function setRating(next) {
          var n;
          rating = next;
          for (n = 0; n < starButtons.length; n++) {
            var val = n + 1;
            var selected = rating === val;
            if (rating > 0 && val <= rating) {
              starButtons[n].classList.add('star-on');
            } else {
              starButtons[n].classList.remove('star-on');
            }
            starButtons[n].setAttribute('aria-checked', selected ? 'true' : 'false');
            starButtons[n].tabIndex = (rating > 0 ? selected : val === 1) ? 0 : -1;
          }
          if (rating === 0) {
            ratingLabel.textContent = 'Not rated';
          } else {
            ratingLabel.textContent = rating + ' out of 5';
          }
        }

        group.addEventListener('keydown', function (e) {
          var key = e.key;
          var next = rating;
          if (key === 'ArrowRight' || key === 'ArrowUp') {
            next = rating < 1 ? 1 : Math.min(5, rating + 1);
          } else if (key === 'ArrowLeft' || key === 'ArrowDown') {
            next = rating < 1 ? 1 : Math.max(1, rating - 1);
          } else if (key === 'Home') {
            next = 1;
          } else if (key === 'End') {
            next = 5;
          } else if (key === ' ' || key === 'Spacebar' || key === 'Enter') {
            var focused = document.activeElement;
            var raw = focused && focused.getAttribute('data-value');
            if (raw) next = parseInt(raw, 10);
          } else {
            return;
          }
          e.preventDefault();
          if (!next || isNaN(next)) next = 1;
          setRating(next);
          if (starButtons[next - 1]) starButtons[next - 1].focus();
        });

        box.appendChild(api.el('div', { class: 'feedback-rating' }, [group, ratingLabel]));

        var contextLabelEl = api.el('label', { for: 'feedback-context', text: 'Where in the app?' });
        var contextEl = api.el('select', { id: 'feedback-context' });
        for (i = 0; i < CONTEXTS.length; i++) {
          var ctxAttrs = {
            value: CONTEXTS[i].value,
            text: CONTEXTS[i].label
          };
          if (CONTEXTS[i].value === openedContext) {
            ctxAttrs.selected = true;
          }
          contextEl.appendChild(api.el('option', ctxAttrs));
        }

        var catLabelEl = api.el('label', { for: 'feedback-category', text: 'What is this about?' });
        var categoryEl = api.el('select', { id: 'feedback-category' });
        for (i = 0; i < CATEGORIES.length; i++) {
          var optAttrs = {
            value: CATEGORIES[i].value,
            text: CATEGORIES[i].label
          };
          if (i === 0) {
            optAttrs.disabled = true;
            optAttrs.selected = true;
          }
          categoryEl.appendChild(api.el('option', optAttrs));
        }

        var detailsLabel = api.el('label', { for: 'feedback-details', text: 'Describe the issue or idea' });
        var detailsEl = api.el('textarea', {
          id: 'feedback-details',
          rows: 6,
          maxLength: DETAILS_MAX,
          placeholder: 'What you were doing, what you expected, and what happened instead.'
        });
        var counterEl = api.el('span', { class: 'feedback-counter', text: '0 / ' + DETAILS_MAX });
        detailsEl.addEventListener('input', function () {
          var len = detailsEl.value.length;
          counterEl.textContent = len + ' / ' + DETAILS_MAX;
          maybeClearError();
        });

        var errorEl = api.el('p', { class: 'feedback-error hidden', role: 'alert' });

        function showError(msg, field) {
          errorEl.textContent = msg;
          errorEl.classList.remove('hidden');
          lastErrorOn = field;
          if (field === 'category') categoryEl.focus();
          else detailsEl.focus();
        }

        function maybeClearError() {
          if (lastErrorOn === 'category' && categoryEl.value) {
            errorEl.textContent = '';
            errorEl.classList.add('hidden');
            lastErrorOn = null;
          } else if (lastErrorOn === 'details' && trim(detailsEl.value)) {
            errorEl.textContent = '';
            errorEl.classList.add('hidden');
            lastErrorOn = null;
          }
        }

        categoryEl.addEventListener('change', maybeClearError);

        var cancelBtn = api.el('button', { type: 'button', class: 'btn-secondary', text: 'Cancel' });
        var sendBtn = api.el('button', { type: 'submit', text: 'Send feedback' });
        cancelBtn.addEventListener('click', function () {
          api.close();
        });

        var form = api.el('form', { class: 'feedback-form' }, [
          api.el('div', { class: 'feedback-field' }, [contextLabelEl, contextEl]),
          api.el('div', { class: 'feedback-field' }, [catLabelEl, categoryEl]),
          api.el('div', { class: 'feedback-field' }, [detailsLabel, detailsEl, counterEl]),
          errorEl,
          api.el('div', { class: 'modal-actions' }, [cancelBtn, sendBtn])
        ]);

        form.addEventListener('submit', function (e) {
          e.preventDefault();
          if (!categoryEl.value) {
            showError('Please choose what your feedback is about.', 'category');
            return;
          }
          var details = trim(detailsEl.value);
          if (!details) {
            showError('Please describe the issue or idea so we can act on it.', 'details');
            return;
          }

          var catLabel = categoryLabel(categoryEl.value);
          var contextValue = contextEl.value || 'other';
          var contextLabel = contextLabelFor(contextValue);
          var chapterTitle = '';
          if ((contextValue === 'chapter' || contextValue === 'quiz') && contextValue === openedContext) {
            chapterTitle = openedTitle;
          }
          var subject = buildSubject(catLabel, rating, contextLabel);
          var fullBody = buildBody(rating, catLabel, details, contextLabel, chapterTitle);
          var mailBody = fullBody;
          var truncated = false;
          if (fullBody.length > MAIL_BODY_LIMIT) {
            truncated = true;
            mailBody = fullBody.substring(0, MAIL_BODY_LIMIT) + '\n' + TRUNCATE_NOTE;
          }
          var mailtoUrl = 'mailto:' + FEEDBACK_EMAIL +
            '?subject=' + encodeURIComponent(subject) +
            '&body=' + encodeURIComponent(mailBody);
          try {
            window.location.href = mailtoUrl;
          } catch (err) {}

          showConfirmation(box, api, subject, fullBody, truncated);
        });

        box.appendChild(form);
      }
    });
  }

  function fabIcon() {
    var svg;
    var path;
    if (typeof document === 'undefined') return null;
    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '20');
    svg.setAttribute('height', '20');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.setAttribute('class', 'feedback-fab-icon');
    path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('fill', 'currentColor');
    path.setAttribute('d', 'M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67zM22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908z');
    svg.appendChild(path);
    return svg;
  }

  function mount() {
    var root;
    var btn;
    var label;
    var icon;
    if (typeof document === 'undefined') return;
    if (document.querySelector('.feedback-fab')) return;
    root = document.getElementById('feedback-fab-root');
    if (!root) root = document.body;
    if (!root) return;

    btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'feedback-fab no-print';
    btn.setAttribute('aria-label', 'Send feedback');

    icon = fabIcon();
    if (icon) btn.appendChild(icon);

    label = document.createElement('span');
    label.className = 'feedback-fab-label';
    label.textContent = 'Send feedback';
    btn.appendChild(label);

    btn.addEventListener('click', function () {
      open();
    });

    root.appendChild(btn);
  }

  return {
    open: open,
    mount: mount
  };
}());
