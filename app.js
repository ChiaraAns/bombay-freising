(function () {
  'use strict';

  var ORDER_URL = 'https://restaurant-bombayfreising.de/bombay-freising/delivery';

  /* ---------- Öffnungszeiten (hier ändern) ---------- */
  // Wochentag: 0 = Sonntag … 6 = Samstag. Zeiten als [von, bis]
  var LUNCH = ['11:30', '14:00'], DINNER = ['17:30', '22:00'];
  var HOURS = { 0: [LUNCH, DINNER], 1: [LUNCH, DINNER], 2: null, 3: [LUNCH, DINNER], 4: [LUNCH, DINNER], 5: [LUNCH, DINNER], 6: [LUNCH, DINNER] };
  var DAYNAMES = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

  function toMin(t) { var p = t.split(':'); return +p[0] * 60 + +p[1]; }

  function berlinNow() {
    var parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Berlin', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
    var o = {};
    parts.forEach(function (p) { o[p.type] = p.value; });
    return { day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(o.weekday), min: +o.hour * 60 + +o.minute };
  }

  function status() {
    var n = berlinNow(), today = HOURS[n.day] || [];
    for (var i = 0; i < today.length; i++) {
      if (n.min >= toMin(today[i][0]) && n.min < toMin(today[i][1])) return { open: true, text: 'Geöffnet bis ' + today[i][1] };
    }
    for (var s = 0; s < 8; s++) {
      var d = (n.day + s) % 7, slots = HOURS[d] || [];
      for (var j = 0; j < slots.length; j++) {
        if (s === 0 && toMin(slots[j][0]) <= n.min) continue;
        var when = s === 0 ? 'heute' : s === 1 ? 'morgen' : DAYNAMES[d].slice(0, 2) + '.';
        var lead = HOURS[n.day] === null ? 'Ruhetag · ' : 'Zu · ';
        return { open: false, text: lead + when + ' ' + slots[j][0] };
      }
    }
    return { open: false, text: 'Geschlossen' };
  }

  var badge = document.querySelector('[data-open-badge]');
  if (badge) {
    var st = status();
    badge.classList.add(st.open ? 'is-open' : 'is-closed');
    badge.querySelector('span:last-child').textContent = st.text;
    badge.setAttribute('title', st.text);
  }
  var row = document.querySelector('.hours tr[data-day="' + berlinNow().day + '"]');
  if (row) row.classList.add('today');

  /* ---------- Navigation (mobil) ---------- */
  var toggle = document.querySelector('.menu-toggle'), nav = document.querySelector('.nav');
  if (toggle && nav) {
    function setNav(open) {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
    }
    toggle.addEventListener('click', function () { setNav(!nav.classList.contains('open')); });
    nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') setNav(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { setNav(false); toggle.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('open') && !nav.contains(e.target) && e.target !== toggle) setNav(false);
    });
  }

  if (typeof MENU === 'undefined') return;

  /* ---------- Hilfsfunktionen ---------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function tagsHtml(t) {
    var h = '';
    if (t.indexOf('t') > -1) h += '<span class="tag tag-t">Beliebt</span>';
    if (t.indexOf('n') > -1) h += '<span class="tag tag-n">auch vegan</span>';
    else if (t.indexOf('v') > -1) h += '<span class="tag tag-v">vegetarisch</span>';
    if (t.indexOf('S') > -1) h += '<span class="tag tag-S">sehr scharf</span>';
    else if (t.indexOf('s') > -1) h += '<span class="tag tag-s">scharf</span>';
    if (t.indexOf('a') > -1) h += '<span class="tag tag-a">ab 18</span>';
    return h;
  }
  var POOL = [];
  MENU.forEach(function (c) {
    c.items.forEach(function (d) { POOL.push({ nr: d[0], name: d[1], desc: d[2], price: d[3], tags: d[4], cat: c.id }); });
  });
  function byNr(nr) { return POOL.filter(function (d) { return d.nr === nr; })[0]; }

  document.querySelectorAll('[data-menu-count]').forEach(function (el) {
    el.textContent = 'Inhalt: ' + POOL.length + ' Gerichte & Getränke';
  });

  /* ---------- Startseite: beliebte Gerichte ---------- */
  var favBox = document.getElementById('fav-rows');
  if (favBox) {
    favBox.innerHTML = [57, 58, 51, 104, 107, 159].map(function (nr) {
      var d = byNr(nr); if (!d) return '';
      return '<li class="row"><b>' + esc(d.name) + '</b><span class="pr">' + esc(d.price) + ' €</span><small>' + esc(d.desc) + '</small></li>';
    }).join('');
  }

  /* ---------- Schärfe-Finder ---------- */
  var finder = document.getElementById('finder');
  if (finder) {
    var MEAT_CATS = ['huhn', 'lamm', 'ente'];
    var MEAT_NR = [37, 38, 39, 41, 47, 48, 119, 120, 121, 128, 31, 19, 4, 10, 160];
    var FISH_NR = [18, 20, 44, 45, 122, 123, 129];
    var SMALL = ['warme-vorspeisen', 'kalte-vorspeisen', 'suppen', 'salate', 'brot'];
    var BIG = ['fisch', 'ente', 'huhn', 'lamm', 'vegetarisch', 'reis', 'tandoori', 'thali'];

    function val(name) { return finder.querySelector('input[name="' + name + '"]:checked').value; }

    function matches() {
      var heat = +val('heat'), diet = val('diet'), hunger = val('hunger');
      return POOL.filter(function (d) {
        if ((hunger === 'klein' ? SMALL : BIG).indexOf(d.cat) < 0) return false;
        var h = d.tags.indexOf('S') > -1 ? 2 : d.tags.indexOf('s') > -1 ? 1 : 0;
        if (heat === 0 ? h !== 0 : heat === 1 ? h < 1 : h !== 2) return false;
        var veg = d.tags.indexOf('v') > -1, vegan = d.tags.indexOf('n') > -1;
        var fish = d.cat === 'fisch' || FISH_NR.indexOf(d.nr) > -1;
        var meat = MEAT_CATS.indexOf(d.cat) > -1 || MEAT_NR.indexOf(d.nr) > -1;
        if (diet === 'veg') return veg;
        if (diet === 'vegan') return vegan;
        if (diet === 'fisch') return fish;
        if (diet === 'fleisch') return meat;
        return true;
      });
    }

    function shuffle(a) {
      a = a.slice();
      for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
      return a;
    }
    // möglichst drei verschiedene Kategorien
    function pick3(list) {
      var s = shuffle(list), out = [], seen = {};
      s.forEach(function (d) { if (out.length < 3 && !seen[d.cat]) { seen[d.cat] = 1; out.push(d); } });
      s.forEach(function (d) { if (out.length < 3 && out.indexOf(d) < 0) out.push(d); });
      return out;
    }

    var picksEl = document.getElementById('picks'), countEl = document.getElementById('finder-count'), rerollEl = document.getElementById('reroll');
    function render() {
      var list = matches(), picks = pick3(list);
      rerollEl.hidden = list.length <= 3;
      if (!picks.length) {
        countEl.textContent = 'Keine Treffer';
        picksEl.innerHTML = '<p class="nothing">' + (+val('heat') > 0
          ? 'Dazu ist auf der Karte nichts als scharf markiert. Probieren Sie „Mild“ oder eine andere Auswahl.'
          : 'Dazu haben wir nichts auf der Karte. Probieren Sie eine andere Auswahl.') + '</p>';
        return;
      }
      countEl.textContent = list.length + (list.length === 1 ? ' passendes Gericht' : ' passende Gerichte') + ' auf der Karte';
      picksEl.innerHTML = picks.map(function (d) {
        var tags = tagsHtml(d.tags.replace('t', ''));
        return '<article class="pick">' + (d.nr ? '<span class="nr">No. ' + d.nr + '</span>' : '') +
          '<h3>' + esc(d.name) + '</h3>' + (tags ? '<div class="tags">' + tags + '</div>' : '') +
          '<p>' + esc(d.desc) + '</p>' +
          '<div class="pick-foot"><span class="seal price" aria-label="Preis ' + esc(d.price) + ' Euro">' + esc(d.price) + '<br>€</span>' +
          '<a class="btn btn--indigo" href="' + ORDER_URL + '" rel="noopener" aria-label="' + esc(d.name) + ' bestellen">Bestellen</a></div></article>';
      }).join('');
      picksEl.scrollLeft = 0;
    }
    finder.addEventListener('submit', function (e) { e.preventDefault(); });
    finder.addEventListener('change', render);
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    rerollEl.addEventListener('click', function () {
      if (reduce) { render(); return; }
      // Signatur: Schublade raus, neue Schachtel rein
      picksEl.classList.remove('is-sliding'); void picksEl.offsetWidth;
      picksEl.classList.add('is-sliding');
      setTimeout(render, 240);
    });
    picksEl.addEventListener('animationend', function () { picksEl.classList.remove('is-sliding'); });
    render();
  }

  /* ---------- Speisekarte-Seite ---------- */
  var list = document.getElementById('menu-list');
  if (list) {
    list.innerHTML = MENU.map(function (c) {
      return '<section class="cat" id="' + c.id + '" data-cat><div class="cat-head"><h2>' + esc(c.name) + '</h2>' +
        (c.note ? '<p class="cat-note">' + esc(c.note) + '</p>' : '') + '</div>' +
        '<ul class="dishes">' + c.items.map(function (d) {
          var hay = ((d[0] || '') + ' ' + d[1] + ' ' + d[2]).toLowerCase();
          return '<li class="dish' + (d[0] ? '' : ' no-nr') + '" data-hay="' + esc(hay) + '" data-tags="' + d[4] + '">' +
            (d[0] ? '<span class="nr">' + d[0] + '</span>' : '') + '<h3>' + esc(d[1]) + tagsHtml(d[4]) + '</h3>' +
            '<span class="price">' + esc(d[3]) + ' €</span>' + (d[2] ? '<p>' + esc(d[2]) + '</p>' : '') + '</li>';
        }).join('') + '</ul></section>';
    }).join('');

    document.getElementById('cat-chips').innerHTML = MENU.map(function (c) { return '<a class="chip" href="#' + c.id + '">' + esc(c.name) + '</a>'; }).join('');

    var q = document.getElementById('q'), state = { v: false, n: false, s: false }, empty = document.getElementById('empty');
    var countEl2 = document.getElementById('count');
    function apply() {
      var term = q.value.trim().toLowerCase(), any = false, total = 0;
      document.querySelectorAll('[data-cat]').forEach(function (sec) {
        var shown = 0;
        sec.querySelectorAll('.dish').forEach(function (li) {
          var t = li.dataset.tags, ok = li.dataset.hay.indexOf(term) > -1;
          if (state.v && t.indexOf('v') < 0) ok = false;
          if (state.n && t.indexOf('n') < 0) ok = false;
          if (state.s && !/[sS]/.test(t)) ok = false;
          li.hidden = !ok; if (ok) shown++;
        });
        sec.hidden = shown === 0; if (shown) any = true;
        total += shown;
      });
      empty.style.display = any ? 'none' : 'block';
      var filtered = term || state.v || state.n || state.s;
      if (countEl2) countEl2.textContent = filtered ? total + (total === 1 ? ' Gericht' : ' Gerichte') : '';
      document.querySelectorAll('#cat-chips a').forEach(function (a) {
        a.hidden = document.getElementById(a.getAttribute('href').slice(1)).hidden;
      });
    }
    document.getElementById('reset').addEventListener('click', function () {
      q.value = '';
      Object.keys(state).forEach(function (k) { state[k] = false; });
      document.querySelectorAll('[data-filter]').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
      apply(); q.focus();
    });

    /* aktuelle Kategorie in der Leiste markieren */
    var chipBox = document.getElementById('cat-chips'), current = null;
    function markChip(id) {
      if (id === current) return;
      current = id;
      chipBox.querySelectorAll('a').forEach(function (a) {
        var on = a.getAttribute('href') === '#' + id;
        if (on) {
          a.setAttribute('aria-current', 'true');
          chipBox.scrollTo({ left: a.offsetLeft - chipBox.offsetLeft - 40, behavior: 'smooth' });
        } else a.removeAttribute('aria-current');
      });
    }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) markChip(en.target.id); });
      }, { rootMargin: '-40% 0px -55% 0px' });
      document.querySelectorAll('[data-cat]').forEach(function (sec) { io.observe(sec); });
    }
    // nach Suche/Filter an den Anfang der Karte springen, falls schon weiter unten
    function toTop() {
      var bar = document.querySelector('.toolbar').getBoundingClientRect().bottom;
      var top = list.getBoundingClientRect().top;
      if (top < bar) window.scrollBy({ top: top - bar, behavior: 'instant' });
    }
    q.addEventListener('input', function () { apply(); toTop(); });
    document.querySelectorAll('[data-filter]').forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.dataset.filter; state[k] = !state[k];
        b.setAttribute('aria-pressed', state[k]); apply(); toTop();
      });
    });
  }
})();
