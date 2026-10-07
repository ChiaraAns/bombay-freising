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

  /* ---------- Tischrunde: ein Tisch zum Teilen aus der echten Karte ---------- */
  var runde = document.getElementById('runde');
  if (runde && window.BOMBAY_KARTE) {
    var KARTE = window.BOMBAY_KARTE.posten;
    var BESTELLEN = 'https://bombayrestaurant-freising.de/order_type';
    var FLEISCH_GRUPPEN = ['huehnerfleisch-spezialitaeten', 'lamm-spezialitaeten', 'tandoori-khajana', 'enten-spezialitaeten', 'fisch-spezialitaeten', 'reis-spezialitaeten'];
    var VEG_GRUPPEN = ['vegetarische-spezialitaeten', 'tandoori-khajana', 'reis-spezialitaeten'];
    var zweier = function (x) { return !!x.zwei; };
    var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
    var zustand = { personen: 4, veg: 1 };
    var ausgabe = { personen: document.getElementById('personen'), veg: document.getElementById('veg') };
    var platte = document.getElementById('platte'), liste = document.getElementById('runde-liste');
    var summeEl = document.getElementById('runde-summe'), meldung = document.getElementById('runde-meldung');
    var mitVorspeisen = document.getElementById('r-vorspeisen'), mitThali = document.getElementById('r-thali');
    var ruhig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var aktuell = [];

    var cent = function (p) { return Math.round(parseFloat(p.replace(',', '.')) * 100); };
    var euro = function (c) { return (c / 100).toFixed(2).replace('.', ',') + ' €'; };
    var mischen = function (l) { l = l.slice(); for (var i = l.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = l[i]; l[i] = l[j]; l[j] = t; } return l; };
    // Beliebte (Auswahl des Restaurants) leicht bevorzugen, ohne die Mischung zu verlieren
    var gewichtet = function (l) { return mischen(l).sort(function (x, y) { return (y.k.indexOf('t') > -1 && Math.random() < .6) - (x.k.indexOf('t') > -1 && Math.random() < .6); }); };
    var istVeg = function (p) { return p.k.indexOf('v') > -1; };

    function zusammenstellen() {
      var p = zustand.personen, veg = zustand.veg, fleisch = p - veg, gewaehlt = [], vergeben = {};
      var nimm = function (posten, art) { vergeben[posten.name] = 1; gewaehlt.push({ p: posten, art: art }); };
      var frei = function (l) { return l.filter(function (x) { return !vergeben[x.name]; }); };

      if (mitThali.checked && p >= 2) {
        var thalis = KARTE.filter(function (x) { return x.g === 'thalis' && zweier(x); });
        var thali = veg >= 2 ? thalis.filter(istVeg)[0] : fleisch >= 2 ? thalis.filter(function (x) { return !istVeg(x); })[0] : null;
        if (thali) { nimm(thali, 'haupt'); if (istVeg(thali)) veg -= 2; else fleisch -= 2; }
      }
      // Fleisch und Fisch: reihum aus verschiedenen Gruppen
      var gruppen = mischen(FLEISCH_GRUPPEN), i = 0, versuche = 0;
      while (fleisch > 0 && versuche < 40) {
        var g = gruppen[i++ % gruppen.length]; versuche++;
        var kandidat = gewichtet(frei(KARTE.filter(function (x) { return x.g === g && !istVeg(x) && !zweier(x); })))[0];
        if (kandidat) { nimm(kandidat, 'haupt'); fleisch--; }
      }
      var vegPool = gewichtet(frei(KARTE.filter(function (x) { return VEG_GRUPPEN.indexOf(x.g) > -1 && istVeg(x); })));
      while (veg > 0 && vegPool.length) { nimm(vegPool.shift(), 'haupt'); veg--; }

      var vorspeisen = [];
      if (mitVorspeisen.checked) {
        var alleVeg = zustand.veg === zustand.personen;
        var pool = gewichtet(KARTE.filter(function (x) { return x.g === 'warme-vorspeisen' && (!alleVeg || istVeg(x)) && (zustand.personen >= 2 || !zweier(x)); }));
        var anzahl = Math.ceil(zustand.personen / 2);
        while (anzahl > 0 && pool.length) { var v = pool.shift(); vorspeisen.push({ p: v, art: 'vor' }); anzahl -= zweier(v) ? 2 : 1; }
      }
      aktuell = vorspeisen.concat(gewaehlt);
      zeigen();
    }

    function zeigen() {
      var summe = 0;
      liste.innerHTML = aktuell.map(function (e, n) {
        summe += cent(e.p.preis);
        var hinweis = zweier(e.p) ? '' : e.art === 'vor' ? 'zum Teilen' : istVeg(e.p) ? 'vegetarisch' : '';
        return '<li class="' + (e.art === 'vor' ? 'ist-vor' : '') + '"><span class="schale">' + (n + 1) + '</span><span class="name">' + esc(e.p.name) +
          (hinweis ? ' <small>' + hinweis + '</small>' : '') + '</span><span class="preis">' + esc(e.p.preis) + ' €</span></li>';
      }).join('');
      summeEl.textContent = euro(summe);
      zeichnen();
      meldung.textContent = '';
    }

    // Thali-Platte: Hauptgerichte im äußeren Ring, Vorspeisen innen
    function zeichnen() {
      var ns = 'http://www.w3.org/2000/svg', titel = platte.querySelector('title');
      platte.innerHTML = ''; platte.appendChild(titel);
      var kreis = function (cx, cy, r, cls) { var c = document.createElementNS(ns, 'circle'); c.setAttribute('cx', cx); c.setAttribute('cy', cy); c.setAttribute('r', r); c.setAttribute('class', cls); return c; };
      platte.appendChild(kreis(160, 160, 154, 'platte-rand'));
      platte.appendChild(kreis(160, 160, 144, 'platte-innen'));
      var haupt = [], vor = [];
      aktuell.forEach(function (e, n) { (e.art === 'vor' ? vor : haupt).push(n); });
      var ring = function (nummern, radius, maxR) {
        var n = nummern.length; if (!n) return;
        var r = n === 1 ? maxR : Math.min(maxR, radius * Math.sin(Math.PI / n) - 5);
        nummern.forEach(function (nr, j) {
          var w = -Math.PI / 2 + j * 2 * Math.PI / n, x = 160 + (n === 1 ? 0 : radius * Math.cos(w)), y = 160 + (n === 1 ? 0 : radius * Math.sin(w));
          var gr = document.createElementNS(ns, 'g'); gr.setAttribute('class', 'schale-g');
          if (!ruhig) gr.style.animationDelay = (j * 90) + 'ms';
          gr.appendChild(kreis(x, y, r, 'schale-kreis'));
          gr.appendChild(kreis(x, y, Math.max(r - 5, 4), 'schale-fuellung'));
          var t = document.createElementNS(ns, 'text'); t.setAttribute('x', x); t.setAttribute('y', y + 5); t.setAttribute('class', 'schale-zahl'); t.textContent = nr + 1;
          gr.appendChild(t); platte.appendChild(gr);
        });
      };
      var mitte = haupt.length && vor.length;
      ring(haupt, mitte ? 108 : 96, 34);
      ring(vor, mitte ? 46 : 70, mitte ? 20 : 30);
      if (!vor.length) {
        var t = document.createElementNS(ns, 'text'); t.setAttribute('x', 160); t.setAttribute('y', 168); t.setAttribute('class', 'platte-mitte');
        t.textContent = zustand.personen === 1 ? '1 Person' : zustand.personen + ' Personen'; platte.appendChild(t);
      }
    }

    function aendern(was, d) {
      if (was === 'personen') zustand.personen = Math.min(12, Math.max(1, zustand.personen + d));
      else zustand.veg = Math.min(zustand.personen, Math.max(0, zustand.veg + d));
      zustand.veg = Math.min(zustand.veg, zustand.personen);
      ausgabe.personen.textContent = zustand.personen; ausgabe.veg.textContent = zustand.veg;
      runde.querySelectorAll('[data-schritt]').forEach(function (b) {
        var w = +b.dataset.wert, ziel = b.dataset.schritt;
        b.disabled = ziel === 'personen' ? (w < 0 ? zustand.personen <= 1 : zustand.personen >= 12) : (w < 0 ? zustand.veg <= 0 : zustand.veg >= zustand.personen);
      });
      zusammenstellen();
    }
    runde.querySelectorAll('[data-schritt]').forEach(function (b) { b.addEventListener('click', function () { aendern(b.dataset.schritt, +b.dataset.wert); }); });
    mitVorspeisen.addEventListener('change', zusammenstellen);
    mitThali.addEventListener('change', zusammenstellen);
    document.getElementById('runde-mischen').addEventListener('click', zusammenstellen);

    document.getElementById('runde-teilen').addEventListener('click', function () {
      var p = zustand.personen, zeilen = ['Unsere Tischrunde im Bombay Freising (' + p + (p === 1 ? ' Person' : ' Personen') + (zustand.veg ? ', davon ' + zustand.veg + ' vegetarisch' : '') + '):'];
      aktuell.forEach(function (e) { zeilen.push('• ' + e.p.name + (e.p.nr ? ' (Nr. ' + e.p.nr + ')' : '') + ' – ' + e.p.preis + ' €'); });
      zeilen.push('Summe laut Karte: ' + summeEl.textContent, 'Jedes Gericht gibt es mild, pikant, scharf oder sehr scharf.', 'Bestellen: ' + BESTELLEN);
      var text = zeilen.join('\n');
      if (navigator.share) {
        navigator.share({ title: 'Tischrunde im Bombay', text: text }).catch(function () {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function () { meldung.textContent = 'Liste kopiert. Jetzt einfach in den Gruppenchat einfügen.'; }, function () { meldung.textContent = 'Kopieren nicht möglich.'; });
      } else meldung.textContent = 'Teilen ist in diesem Browser nicht möglich.';
    });
    aendern('personen', 0);
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
        if (ist) { a.setAttribute('aria-current', 'true'); sprungLeiste.scrollTo({ left: a.offsetLeft - sprungLeiste.offsetLeft, behavior: 'smooth' }); }
        else a.removeAttribute('aria-current');
      });
      if (!aktuell) sprungLeiste.scrollTo({ left: 0 });
    };
    var io = new IntersectionObserver(markiere, { rootMargin: '0px 0px -50% 0px', threshold: [0, 1] });
    gruppen.forEach(function (g) { io.observe(g); });
    window.addEventListener('scroll', markiere, { passive: true });
  }
})();
