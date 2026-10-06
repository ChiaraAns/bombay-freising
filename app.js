(function () {
  'use strict';

  /* ---------- Öffnungszeiten (hier ändern) ---------- */
  // Wochentag: 0 = Sonntag … 6 = Samstag. Zeitfenster als [von, bis]; null = Ruhetag
  var MITTAG = ['11:30', '14:00'], ABEND = ['17:30', '22:00'];
  var ZEITEN = { 0: [MITTAG, ABEND], 1: [MITTAG, ABEND], 2: null, 3: [MITTAG, ABEND], 4: [MITTAG, ABEND], 5: [MITTAG, ABEND], 6: [MITTAG, ABEND] };
  var TAGE = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

  function minuten(t) { var p = t.split(':'); return +p[0] * 60 + +p[1]; }
  function jetzt() {
    var teile = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Berlin', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
    var o = {};
    teile.forEach(function (t) { o[t.type] = t.value; });
    return { tag: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(o.weekday), min: +o.hour * 60 + +o.minute };
  }
  function naechsteOeffnung(n) {
    for (var s = 1; s < 8; s++) {
      var d = (n.tag + s) % 7;
      if (ZEITEN[d]) return (s === 1 ? 'morgen' : TAGE[d]) + ' ab <b>' + ZEITEN[d][0][0] + '</b>';
    }
    return '';
  }
  function zustand() {
    var n = jetzt(), heute = ZEITEN[n.tag];
    if (!heute) return { satz: 'Heute Ruhetag, ' + naechsteOeffnung(n), zusatz: 'Online vorbestellen ist möglich.' };
    for (var i = 0; i < heute.length; i++) {
      var von = minuten(heute[i][0]), bis = minuten(heute[i][1]);
      if (n.min >= von && n.min < bis) {
        return { offen: true, satz: 'Heute geöffnet bis <b>' + heute[i][1] + '</b>',
          zusatz: i === 0 ? 'Mittagspause 14:00–17:30, abends bis 22:00' : 'Wieder ' + naechsteOeffnung(n).replace(/<\/?b>/g, '') };
      }
      if (n.min < von) {
        return i === 0
          ? { satz: 'Heute geöffnet ab <b>' + heute[0][0] + '</b>', zusatz: heute[0].join('–') + ' und ' + heute[1].join('–') }
          : { satz: 'Mittagspause, ab <b>' + heute[i][0] + '</b> wieder geöffnet', zusatz: 'Online vorbestellen ist möglich.' };
      }
    }
    return { satz: 'Heute geschlossen, ' + naechsteOeffnung(n), zusatz: 'Online vorbestellen ist möglich.' };
  }

  var satz = document.querySelector('[data-heute-satz]');
  if (satz) {
    var z = zustand();
    satz.innerHTML = z.satz;
    document.querySelector('[data-heute-zusatz]').textContent = z.zusatz;
  }
  var zeile = document.querySelector('.zeiten tr[data-tag="' + jetzt().tag + '"]');
  if (zeile) zeile.classList.add('ist-heute');

  /* ---------- Menü (Handy) ---------- */
  var knopf = document.querySelector('.menu-knopf'), nav = document.getElementById('nav');
  if (knopf && nav) {
    var setze = function (offen) { nav.classList.toggle('offen', offen); knopf.setAttribute('aria-expanded', offen); };
    knopf.addEventListener('click', function () { setze(!nav.classList.contains('offen')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setze(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('offen')) { setze(false); knopf.focus(); } });
    document.addEventListener('click', function (e) { if (nav.classList.contains('offen') && !nav.contains(e.target) && e.target !== knopf) setze(false); });
  }

  /* ---------- Leisten weichen beim Runterscrollen aus, kommen beim Hochscrollen zurück ---------- */
  var weichen = document.querySelectorAll('[data-weicht]'), lotse = document.querySelector('.lotse');
  var letzte = window.scrollY, HYSTERESE = 6;
  function scrollen() {
    var y = window.scrollY, d = y - letzte;
    if (Math.abs(d) < HYSTERESE) return;
    var weg = d > 0 && y > 120 && !(nav && nav.classList.contains('offen'));
    weichen.forEach(function (el) { if (el !== lotse) el.classList.toggle('weg', weg); });
    if (lotse) lotse.classList.toggle('oben', weg);
    letzte = y;
  }
  window.addEventListener('scroll', scrollen, { passive: true });

  /* Daumenleiste erst, wenn der Hauptknopf der Bühne aus dem Bild ist */
  var daumen = document.querySelector('[data-daumen]'), haupt = document.querySelector('[data-bestellen]');
  if (daumen) {
    if (haupt && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { daumen.classList.toggle('da', !e[0].isIntersecting); }).observe(haupt);
    } else daumen.classList.add('da');
  }

  /* ---------- Fotoansicht ---------- */
  var ansicht = document.querySelector('.ansicht');
  var kacheln = Array.prototype.slice.call(document.querySelectorAll('.kachel'));
  if (ansicht && kacheln.length && ansicht.showModal) {
    var bild = document.createElement('img'), stelle = 0, ausloeser = null;
    ansicht.prepend(bild);
    var zeige = function (i) {
      stelle = (i + kacheln.length) % kacheln.length;
      var k = kacheln[stelle];
      bild.src = k.dataset.gross; bild.width = k.dataset.w; bild.height = k.dataset.h;
      bild.alt = k.querySelector('img').alt;
    };
    kacheln.forEach(function (k, i) {
      k.addEventListener('click', function () { ausloeser = k; zeige(i); ansicht.showModal(); });
    });
    ansicht.querySelector('.ansicht-zu').addEventListener('click', function () { ansicht.close(); });
    ansicht.querySelector('.ansicht-vor').addEventListener('click', function () { zeige(stelle - 1); });
    ansicht.querySelector('.ansicht-nach').addEventListener('click', function () { zeige(stelle + 1); });
    ansicht.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') zeige(stelle - 1);
      if (e.key === 'ArrowRight') zeige(stelle + 1);
    });
    ansicht.addEventListener('click', function (e) { if (e.target === ansicht) ansicht.close(); });
    ansicht.addEventListener('close', function () { if (ausloeser) ausloeser.focus(); });
  }

  /* ---------- Speisekarte ---------- */
  var q = document.getElementById('q');
  if (!q) return;
  var gruppen = Array.prototype.slice.call(document.querySelectorAll('.gruppe'));
  var schalter = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));
  var zaehler = document.getElementById('zaehler'), leer = document.getElementById('leer');
  var schmal = window.matchMedia('(max-width: 699px)');
  var SPEICHER = 'bombay-filter';

  // Am Handy erst die Übersicht der Gruppen; ohne Skript bleibt alles offen
  if (schmal.matches) gruppen.forEach(function (g) { g.open = false; });

  try {
    var gemerkt = JSON.parse(localStorage.getItem(SPEICHER) || '[]');
    schalter.forEach(function (s) { s.checked = gemerkt.indexOf(s.dataset.filter) > -1; });
  } catch (e) { /* ohne Speicher geht es auch */ }

  function anwenden() {
    var wort = q.value.trim().toLowerCase(), an = {}, gesamt = 0, aktiv = !!wort;
    schalter.forEach(function (s) { an[s.dataset.filter] = s.checked; if (s.checked) aktiv = true; });
    gruppen.forEach(function (g) {
      var sichtbar = 0;
      g.querySelectorAll('.posten').forEach(function (p) {
        var ok = (!wort || p.dataset.such.indexOf(wort) > -1) &&
          (!an.v || p.hasAttribute('data-v')) && (!an.n || p.hasAttribute('data-n')) && (!an.s || p.hasAttribute('data-s'));
        p.hidden = !ok;
        if (ok) sichtbar++;
      });
      g.hidden = sichtbar === 0;
      if (aktiv && sichtbar) g.open = true;
      gesamt += sichtbar;
      var sprung = document.querySelector('.gruppen-sprung a[href="#' + g.id + '"]');
      if (sprung) sprung.hidden = sichtbar === 0;
    });
    zaehler.textContent = aktiv ? gesamt + (gesamt === 1 ? ' Posten' : ' Posten') : '';
    leer.hidden = gesamt > 0;
  }
  function merken() {
    try { localStorage.setItem(SPEICHER, JSON.stringify(schalter.filter(function (s) { return s.checked; }).map(function (s) { return s.dataset.filter; }))); } catch (e) { /* egal */ }
  }
  function nachOben() {
    var lotseUnten = lotse.getBoundingClientRect().bottom, start = document.querySelector('.gruppen').getBoundingClientRect().top;
    if (start < lotseUnten) window.scrollBy({ top: start - lotseUnten, behavior: 'instant' });
  }
  q.addEventListener('input', function () { anwenden(); nachOben(); });
  schalter.forEach(function (s) { s.addEventListener('change', function () { merken(); anwenden(); nachOben(); }); });
  document.getElementById('zuruecksetzen').addEventListener('click', function () {
    q.value = ''; schalter.forEach(function (s) { s.checked = false; }); merken(); anwenden(); q.focus();
  });
  anwenden();

  // Sprungmarken öffnen ihre Gruppe
  document.querySelectorAll('.gruppen-sprung a').forEach(function (a) {
    a.addEventListener('click', function () { var g = document.getElementById(a.getAttribute('href').slice(1)); if (g) g.open = true; });
  });
  if (location.hash) { var ziel = document.getElementById(location.hash.slice(1)); if (ziel && ziel.tagName === 'DETAILS') ziel.open = true; }

  // Aktuelle Gruppe im Lotsen markieren
  var sprungLeiste = document.querySelector('.gruppen-sprung'), aktuell = null;
  if ('IntersectionObserver' in window) {
    // Markiert wird die oberste Gruppe im Lesebereich unter dem Lotsen
    var markiere = function () {
      var grenze = lotse.getBoundingClientRect().bottom + 40, treffer = null;
      for (var i = 0; i < gruppen.length; i++) {
        if (gruppen[i].hidden) continue;
        if (gruppen[i].getBoundingClientRect().top <= grenze) treffer = gruppen[i].id; else break;
      }
      if (treffer === aktuell) return;
      aktuell = treffer;
      sprungLeiste.querySelectorAll('a').forEach(function (a) {
        var ist = a.getAttribute('href') === '#' + aktuell;
        if (ist) { a.setAttribute('aria-current', 'true'); sprungLeiste.scrollTo({ left: a.offsetLeft - sprungLeiste.offsetLeft - 24, behavior: 'smooth' }); }
        else a.removeAttribute('aria-current');
      });
      if (!aktuell) sprungLeiste.scrollTo({ left: 0 });
    };
    var io = new IntersectionObserver(markiere, { rootMargin: '0px 0px -50% 0px', threshold: [0, 1] });
    gruppen.forEach(function (g) { io.observe(g); });
    window.addEventListener('scroll', markiere, { passive: true });
  }
})();
