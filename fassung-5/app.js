(function () {
  'use strict';

  /* ---------- Öffnungszeiten (hier ändern) ---------- */
  // Wochentag: 0 = Sonntag … 6 = Samstag. Zeitfenster als [von, bis]; null = Ruhetag
  var MITTAG = ['11:30', '14:00'], ABEND = ['17:30', '22:00'];
  var ZEITEN = { 0: [MITTAG, ABEND], 1: [MITTAG, ABEND], 2: null, 3: [MITTAG, ABEND], 4: [MITTAG, ABEND], 5: [MITTAG, ABEND], 6: [MITTAG, ABEND] };
  var TAGE = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  var VORLAUF = { abholen: 30, liefern: 60 }; // Richtwerte des Restaurants in Minuten
  var TEL = 'tel:+4981614965102';
  // WhatsApp-Nummer des Restaurants, international ohne + und Leerzeichen.
  // Vorerst die Festnetznummer (Wunsch der Betreiberin, 07.10.2026); ob sie WhatsApp hat, ist offen (ABNAHME.md).
  // Leer lassen schaltet WhatsApp ab: Dann gibt es nur „Anrufen“ und „Kopieren“.
  var WHATSAPP = '4981614965102';

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
    if (!heute) return { satz: 'Heute Ruhetag, ' + naechsteOeffnung(n), zusatz: 'Den Bestellzettel können Sie schon zusammenstellen.' };
    for (var i = 0; i < heute.length; i++) {
      var von = minuten(heute[i][0]), bis = minuten(heute[i][1]);
      if (n.min >= von && n.min < bis) {
        return { offen: true, satz: 'Heute geöffnet bis <b>' + heute[i][1] + '</b>',
          zusatz: i === 0 ? 'Mittagspause 14:00–17:30, abends bis 22:00' : 'Wieder ' + naechsteOeffnung(n).replace(/<\/?b>/g, '') };
      }
      if (n.min < von) {
        return i === 0
          ? { satz: 'Heute geöffnet ab <b>' + heute[0][0] + '</b>', zusatz: heute[0].join('–') + ' und ' + heute[1].join('–') }
          : { satz: 'Mittagspause, ab <b>' + heute[i][0] + '</b> wieder geöffnet', zusatz: 'Den Bestellzettel können Sie schon zusammenstellen.' };
      }
    }
    return { satz: 'Heute geschlossen, ' + naechsteOeffnung(n), zusatz: 'Den Bestellzettel können Sie schon zusammenstellen.' };
  }

  var satz = document.querySelector('[data-heute-satz]');
  if (satz) {
    var z = zustand();
    satz.innerHTML = z.satz;
    document.querySelector('[data-heute-zusatz]').textContent = z.zusatz;
    document.querySelector('[data-heute]').classList.toggle('ist-offen', !!z.offen);
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

  /* ---------- Lichterkette: Laternen antippen, im Scrollwind wiegen ---------- */
  var girlande = document.querySelector('[data-girlande]');
  if (girlande) {
    var still = matchMedia('(prefers-reduced-motion: reduce)');
    girlande.addEventListener('click', function (e) {
      var teil = e.target.closest('.anhaenger');
      if (!teil || still.matches) return;
      teil.classList.remove('angestossen'); void teil.offsetWidth; teil.classList.add('angestossen');
    });
    girlande.addEventListener('animationend', function (e) {
      if (e.animationName === 'schwingen' || e.animationName === 'drehen') e.target.closest('.anhaenger').classList.remove('angestossen');
    });
    // Beim Scrollen neigen sich die Laternen gegen die Bewegung und pendeln zurück
    var vorher = window.scrollY, ruhe = null;
    window.addEventListener('scroll', function () {
      if (still.matches) return;
      var y = window.scrollY, w = Math.max(-7, Math.min(7, (vorher - y) * .35));
      vorher = y;
      if (y > innerHeight) return;
      girlande.style.setProperty('--wind', w.toFixed(1) + 'deg');
      clearTimeout(ruhe);
      ruhe = setTimeout(function () { girlande.style.setProperty('--wind', '0deg'); }, 140);
    }, { passive: true });
  }

  /* ---------- Bühne: Gerichte wechseln; Kulisse, Gang, Name und Merkmale ziehen mit ---------- */
  var wahlen = Array.prototype.slice.call(document.querySelectorAll('.wahl'));
  if (wahlen.length) {
    var kulissen = document.querySelectorAll('.kulisse'), gaenge = document.querySelectorAll('.gang');
    var name = document.querySelector('[data-lust-name]'), text = document.querySelector('[data-lust-text]');
    var preis = document.querySelector('[data-lust-preis]'), dazu = document.querySelector('[data-lust-dazu]');
    var merkmale = document.querySelector('[data-lust-merkmale]'), sticker = document.querySelector('[data-sticker]');
    var pause = document.querySelector('[data-pause]'), lustBox = document.querySelector('[data-lust]');
    var aktiv = 0, takt = null, angehalten = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var zeige = function (i, vomGast) {
      i = (i + wahlen.length) % wahlen.length;
      if (i === aktiv) return;
      var alt = aktiv; aktiv = i;
      // Kulisse: die neue blendet über der alten ein, danach geht die alte
      kulissen[alt].classList.remove('ist-da'); kulissen[alt].classList.add('war-da');
      kulissen[i].classList.add('kommt'); void kulissen[i].offsetWidth; kulissen[i].classList.remove('kommt'); kulissen[i].classList.add('ist-da');
      setTimeout(function () { if (aktiv !== alt) kulissen[alt].classList.remove('war-da'); }, 850);
      // Gang: Teller und Schale werden hereingeschoben, wie serviert
      gaenge[alt].classList.remove('ist-da'); void gaenge[i].offsetWidth; gaenge[i].classList.add('ist-da');
      var w = wahlen[i];
      name.firstElementChild.textContent = w.dataset.name;
      name.classList.remove('rein'); void name.offsetWidth; name.classList.add('rein');
      merkmale.innerHTML = '';
      w.dataset.merkmale.split('|').forEach(function (m) { var el = document.createElement('span'); el.textContent = m; merkmale.appendChild(el); });
      text.textContent = w.dataset.text; preis.textContent = w.dataset.preis; sticker.textContent = w.dataset.preis;
      dazu.href = 'speisekarte.html?dazu=' + w.dataset.nr;
      wahlen.forEach(function (x, k) { x.setAttribute('aria-pressed', k === i ? 'true' : 'false'); });
      if (vomGast) lustBox.setAttribute('aria-live', 'polite');
    };
    var halt = function () { clearInterval(takt); takt = null; angehalten = true; pause.setAttribute('aria-pressed', 'true'); pause.setAttribute('aria-label', 'Wechsel fortsetzen'); };
    var los = function () {
      angehalten = false; pause.setAttribute('aria-pressed', 'false'); pause.setAttribute('aria-label', 'Wechsel anhalten');
      clearInterval(takt); takt = setInterval(function () { if (!document.hidden) zeige(aktiv + 1); }, 5200);
    };
    wahlen.forEach(function (w, i) { w.addEventListener('click', function () { halt(); zeige(i, true); }); });
    pause.addEventListener('click', function () { if (angehalten) los(); else halt(); });
    // Pfeiltasten in der Reihe der kleinen Schalen
    document.querySelector('.gerichtwahl').addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault(); halt(); zeige(aktiv + (e.key === 'ArrowRight' ? 1 : -1), true); wahlen[aktiv].focus();
    });
    // Wischen über den Teller
    var teller = document.querySelector('.teller'), startX = null;
    teller.addEventListener('pointerdown', function (e) { startX = e.clientX; });
    teller.addEventListener('pointerup', function (e) {
      if (startX === null) return;
      var dx = e.clientX - startX; startX = null;
      if (Math.abs(dx) > 40) { halt(); zeige(aktiv + (dx < 0 ? 1 : -1), true); }
    });
    teller.style.touchAction = 'pan-y';
    // Wechselt von selbst, solange die Bühne zu sehen ist; mit „Anhalten“ und bei reduzierter Bewegung nicht
    if (!angehalten) los(); else halt();
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { if (!e[0].isIntersecting && takt) { clearInterval(takt); takt = null; } else if (e[0].isIntersecting && !angehalten && !takt) los(); }).observe(document.querySelector('.buehne'));
    }
  }

  /* ---------- Beliebt: Plus zum Bestellen, Filter „Vegetarisch“ ---------- */
  var tafel = document.querySelector('.beliebt-liste');
  if (tafel) {
    tafel.querySelectorAll('li[data-nr]').forEach(function (li) {
      var a = document.createElement('a');
      a.className = 'tafel-dazu'; a.href = 'speisekarte.html?dazu=' + li.dataset.nr;
      a.setAttribute('aria-label', li.querySelector('.name').textContent + ' auf den Bestellzettel');
      a.innerHTML = '<svg aria-hidden="true"><use href="#i-plus"/></svg>';
      li.appendChild(a);
    });
    var filter = document.querySelector('[data-tafel-filter]');
    if (filter) {
      filter.hidden = false;
      filter.addEventListener('click', function (e) {
        var knopf = e.target.closest('button'); if (!knopf) return;
        filter.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', b === knopf ? 'true' : 'false'); });
        var nurVeg = knopf.dataset.filterWert === 'v';
        tafel.querySelectorAll('li').forEach(function (li) { li.hidden = nurVeg && !li.hasAttribute('data-v'); });
      });
    }
  }

  /* ---------- Überschriften und Bilder gleiten beim Scrollen herein ---------- */
  var zeigen = Array.prototype.slice.call(document.querySelectorAll('main section:not(.buehne) h2, main section:not(.buehne) h2 + .hand, .raum-bild, .kueche-bilder'));
  // Alles, was im Bild ist oder schon darüber liegt, wird gezeigt; so bleibt auch bei schnellem Wischen nichts unsichtbar
  var pruefen = function () {
    var grenze = innerHeight * .94;
    zeigen = zeigen.filter(function (el) {
      if (el.getBoundingClientRect().top < grenze) { el.classList.add('ist-sichtbar'); return false; }
      return true;
    });
    if (!zeigen.length) window.removeEventListener('scroll', planen);
  };
  var geplant = false;
  var planen = function () { if (!geplant) { geplant = true; requestAnimationFrame(function () { geplant = false; pruefen(); }); } };
  zeigen.forEach(function (el) { el.classList.add('zeigen'); });
  pruefen();
  window.addEventListener('scroll', planen, { passive: true });
  window.addEventListener('resize', planen);

  /* ---------- Essensuhr: bis wann bestellen, damit es zur Wunschzeit schmeckt ---------- */
  var uhr = document.getElementById('uhr');
  if (uhr) {
    var satz2 = document.getElementById('uhr-satz'), zusatz2 = document.getElementById('uhr-zusatz');
    var handeln = document.getElementById('uhr-handeln'), datum = document.getElementById('uhr-datum');
    var bon = document.querySelector('.bon');
    var hhmm = function (m) { m = ((m % 1440) + 1440) % 1440; return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); };
    var gewaehlt = function (name) { var el = uhr.querySelector('input[name="' + name + '"]:checked'); return el ? el.value : null; };
    var heuteNr = jetzt().tag;
    var tagKurz = function (plus) { return TAGE[(heuteNr + plus) % 7].slice(0, 2) + '.'; };

    document.querySelectorAll('[data-tag-name]').forEach(function (el) {
      el.textContent = (+el.dataset.tagName === 0 ? 'Heute' : 'Morgen') + ', ' + tagKurz(+el.dataset.tagName);
    });

    // Reservierungsbuch: halbstündlich, mittags und abends
    [MITTAG, ABEND].forEach(function (slot, i) {
      var h = '';
      for (var m = minuten(slot[0]); m <= minuten(slot[1]); m += 30) {
        h += '<label class="zeit"><input type="radio" name="zeit" value="' + m + '" aria-label="' + hhmm(m) + ' Uhr"><span aria-hidden="true">' + hhmm(m) + '</span></label>';
      }
      uhr.querySelector('[data-buch="' + i + '"]').innerHTML = h;
    });
    var zeitFelder = Array.prototype.slice.call(uhr.querySelectorAll('input[name="zeit"]'));

    // Was heute schon vorbei ist, wird durchgestrichen; am Ruhetag alles
    function buchStellen() {
      var plus = +gewaehlt('tag'), offen = !!ZEITEN[(heuteNr + plus) % 7], n = jetzt().min;
      zeitFelder.forEach(function (f) { f.disabled = !offen || (plus === 0 && +f.value <= n); });
      var wahl = uhr.querySelector('input[name="zeit"]:checked');
      if (wahl && wahl.disabled) { wahl.checked = false; wahl = null; }
      if (!wahl) {
        // Vorschlag: die erste Zeit, die zum Abholen sicher klappt (Bestellung erst ab Öffnung, heute mit etwas Luft)
        var klappt = function (f) {
          var m = +f.value, start = minuten(m >= minuten(ABEND[0]) ? ABEND[0] : MITTAG[0]);
          return !f.disabled && m - VORLAUF.abholen >= start && (plus > 0 || m >= n + 45);
        };
        var erste = zeitFelder.filter(klappt)[0] || zeitFelder.filter(function (f) { return !f.disabled; })[0];
        if (erste) erste.checked = true;
      }
    }

    // Startwert: heute Ruhetag oder schon Schluss, dann gleich morgen
    (function () {
      var n = jetzt(), slots = ZEITEN[n.tag] || [];
      if (!slots.length || n.min + 30 > minuten(slots[slots.length - 1][1])) uhr.querySelector('input[name="tag"][value="1"]').checked = true;
      buchStellen();
    })();

    function zeile(name, wert, gross) {
      return '<p class="bon-zeile' + (gross ? ' bon-zeile--gross' : '') + '"><span>' + name + '</span><i aria-hidden="true"></i><b>' + wert + '</b></p>';
    }

    function rechnen() {
      var weg = gewaehlt('weg'), plus = +gewaehlt('tag'), tag = (heuteNr + plus) % 7, wert = gewaehlt('zeit');
      var essen = wert === null ? null : +wert, t = essen === null ? '' : hhmm(essen);
      var slots = ZEITEN[tag], s = '', z = '';
      datum.textContent = (plus === 0 ? 'Heute, ' : 'Morgen, ') + TAGE[tag];
      handeln.href = weg === 'lokal' ? TEL : 'speisekarte.html?weg=' + weg + (essen === null ? '' : '&wann=' + plus + '-' + essen);
      handeln.textContent = weg === 'lokal' ? 'Tisch reservieren' : 'Zum Bestellzettel';
      if (!slots) {
        var naechster = (tag + 1) % 7;
        s = '<p class="bon-satz">' + TAGE[tag] + ' ist Ruhetag.</p>'; z = 'Ab ' + TAGE[naechster] + ' 11:30 sind wir wieder da.';
      } else if (essen === null) {
        s = '<p class="bon-satz">Heute ist die Küche zu.</p>'; z = 'Wählen Sie oben „Morgen“.';
      } else if (weg === 'lokal') {
        s = zeile('Tisch für', t, true); z = 'Rufen Sie uns an: 08161 4965102, während der Öffnungszeiten.';
      } else {
        var slot = slots.filter(function (x) { return essen >= minuten(x[0]) && essen <= minuten(x[1]); })[0];
        var bestellen = essen - VORLAUF[weg], n = jetzt(), heute = plus === 0;
        var essenWort = weg === 'abholen' ? 'Abholen um' : 'Lieferung gegen';
        if (heute && bestellen < n.min) {
          var frueh = Math.ceil((n.min + VORLAUF[weg]) / 5) * 5;
          var offen = slots.some(function (x) { return frueh >= minuten(x[0]) && frueh <= minuten(x[1]); });
          var weiter = slots.filter(function (x) { return minuten(x[0]) > n.min; })[0];
          s = '<p class="bon-satz">Für ' + t + ' ist es zu knapp.</p>';
          z = offen ? 'Frühestens um ' + hhmm(frueh) + ' Uhr, wenn Sie jetzt bestellen.'
            : weiter ? 'Bestellungen nehmen wir ab ' + weiter[0] + ' Uhr wieder an.'
            : 'Heute ist die Küche zu. Wählen Sie oben „Morgen“.';
        } else if (bestellen < minuten(slot[0])) {
          // Vor der Öffnung nimmt niemand Bestellungen an
          s = '<p class="bon-satz">Für ' + t + ' ist es zu knapp.</p>';
          z = 'Bestellungen nehmen wir ab ' + slot[0] + ' Uhr an, fertig frühestens um ' + hhmm(minuten(slot[0]) + VORLAUF[weg]) + ' Uhr.';
        } else {
          s = zeile('Bestellen bis', hhmm(bestellen), true) + zeile(essenWort, t);
          z = heute && bestellen - n.min <= 60 ? 'Noch ' + (bestellen - n.min) + ' Minuten Zeit zum Aussuchen.' : 'Den Bestellzettel können Sie schon zusammenstellen.';
        }
      }
      satz2.innerHTML = s; zusatz2.textContent = z;
      bon.classList.remove('neu'); void bon.offsetWidth; bon.classList.add('neu');
    }
    uhr.addEventListener('change', function (e) { if (e.target.name === 'tag') buchStellen(); rechnen(); });
    uhr.addEventListener('submit', function (e) { e.preventDefault(); });
    rechnen();
  }

  /* ---------- Bestellzettel: Gerichte sammeln, als fertigen Text per WhatsApp oder Telefon schicken ---------- */
  var zettel = document.getElementById('zettel');
  if (zettel && zettel.showModal) {
    var SCHAERFE = ['mild', 'pikant', 'scharf', 'sehr scharf'], ABLAGE = 'bombay-zettel';
    var liste = document.getElementById('zettel-liste'), leerHinweis = document.getElementById('zettel-leer');
    var summeAus = document.getElementById('zettel-summe'), wann = document.getElementById('zettel-wann');
    var feldName = document.getElementById('zettel-name'), feldTel = document.getElementById('zettel-tel');
    var feldAdresse = document.getElementById('zettel-adresse'), adresseFeld = document.getElementById('zettel-adresse-feld');
    var feldNotiz = document.getElementById('zettel-notiz'), vorschau = document.getElementById('zettel-vorschau');
    var meldung = document.getElementById('zettel-meldung'), hinweis = document.getElementById('zettel-hinweis');
    var knopfWa = document.getElementById('zettel-whatsapp'), knopfAnruf = document.getElementById('zettel-anruf');
    var knopfKopie = document.getElementById('zettel-kopieren');
    var aufKnoepfe = document.querySelectorAll('[data-zettel-auf]'), staende = document.querySelectorAll('[data-zettel-stand]');
    var posten = {}, auswahl = [];

    // Karte einlesen: ein Eintrag je Gericht
    document.querySelectorAll('.posten[data-id]').forEach(function (li) {
      var nr = li.querySelector('.nr');
      posten[li.dataset.id] = { li: li, name: li.querySelector('.name').textContent, nr: nr ? nr.textContent : '', cent: Math.round(parseFloat(li.dataset.preis.replace(',', '.')) * 100), schaerfe: li.hasAttribute('data-schaerfe') };
      var b = li.querySelector('.dazu');
      b.hidden = false;
      b.addEventListener('click', function () { dazu(li.dataset.id); });
    });
    var euro = function (c) { return (c / 100).toFixed(2).replace('.', ',') + ' €'; };

    try {
      auswahl = (JSON.parse(localStorage.getItem(ABLAGE) || '[]') || []).filter(function (z) { return posten[z.id] && z.n > 0; });
    } catch (e) { auswahl = []; }
    function sichern() { try { localStorage.setItem(ABLAGE, JSON.stringify(auswahl)); } catch (e) { /* ohne Speicher geht es auch */ } }

    function dazu(id) {
      var z = auswahl.filter(function (x) { return x.id === id; })[0];
      if (z) z.n++;
      else auswahl.push({ id: id, n: 1, s: posten[id].schaerfe ? 'mild' : '' });
      sichern(); zeichnen();
      aufKnoepfe.forEach(function (k) { k.classList.remove('stups'); void k.offsetWidth; k.classList.add('stups'); });
      if (daumen) daumen.classList.remove('weg');
      meldeKarte(posten[id].name + ' ist auf dem Bestellzettel.');
    }
    // Ansage für Screenreader, ohne den Dialog zu öffnen
    var ansage = document.createElement('p');
    ansage.className = 'sr'; ansage.setAttribute('role', 'status');
    document.body.appendChild(ansage);
    function meldeKarte(t) { ansage.textContent = ''; setTimeout(function () { ansage.textContent = t; }, 30); }

    // Zeitauswahl: bald möglichst, sonst Viertelstunden in den Öffnungszeiten von heute und dem nächsten offenen Tag
    function zeiten() {
      var weg = gewaehltZ(), n = jetzt(), alt = wann.value, html = '', tage = 0;
      for (var plus = 0; plus < 7 && tage < 2; plus++) {
        var tag = (n.tag + plus) % 7, slots = ZEITEN[tag], opts = '';
        if (!slots) continue;
        slots.forEach(function (sl) {
          var von = minuten(sl[0]) + VORLAUF[weg], bis = minuten(sl[1]);
          if (plus === 0) von = Math.max(von, Math.ceil((n.min + VORLAUF[weg]) / 15) * 15);
          for (var m = Math.ceil(von / 15) * 15; m <= bis; m += 15) opts += '<option value="' + plus + '-' + m + '">' + hhmmZ(m) + ' Uhr</option>';
        });
        if (!opts) continue;
        var name = plus === 0 ? 'Heute' : plus === 1 ? 'Morgen, ' + TAGE[tag] : TAGE[tag];
        html += '<optgroup label="' + name + '">' + opts + '</optgroup>';
        tage++;
      }
      var offen = (ZEITEN[n.tag] || []).some(function (sl) { return n.min >= minuten(sl[0]) && n.min + VORLAUF[weg] <= minuten(sl[1]); });
      wann.innerHTML = (offen ? '<option value="bald">So bald wie möglich (ca. ' + VORLAUF[weg] + ' min)</option>' : '') + html;
      if (alt && wann.querySelector('option[value="' + alt + '"]')) wann.value = alt;
    }
    function hhmmZ(m) { return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); }
    function gewaehltZ() { return zettel.querySelector('input[name="zettel-weg"]:checked').value; }
    function wannText() {
      var o = wann.selectedOptions[0];
      if (!o) return '';
      if (o.value === 'bald') return 'so bald wie möglich';
      return o.parentNode.label.replace(/^Morgen, /, 'morgen, ').replace(/^Heute/, 'heute') + ', ' + o.textContent;
    }

    function zeichnen() {
      var summe = 0, stueck = 0;
      liste.innerHTML = '';
      auswahl.forEach(function (z, i) {
        var p = posten[z.id], li = document.createElement('li');
        summe += p.cent * z.n; stueck += z.n;
        li.className = 'zeile';
        li.innerHTML =
          '<p class="zeile-name">' + (p.nr ? '<span class="nr">' + p.nr + '</span>' : '') + '<span></span></p>' +
          '<p class="zeile-preis preis">' + euro(p.cent * z.n) + '</p>' +
          '<div class="zeile-wahl">' +
            '<div class="menge"><button type="button" data-schritt="-1"><svg aria-hidden="true"><use href="#i-minus"/></svg></button>' +
            '<output>' + z.n + '</output>' +
            '<button type="button" data-schritt="1"><svg aria-hidden="true"><use href="#i-plus"/></svg></button></div>' +
            (p.schaerfe ? '<select>' + SCHAERFE.map(function (s) { return '<option' + (s === z.s ? ' selected' : '') + '>' + s + '</option>'; }).join('') + '</select>' : '') +
          '</div>';
        li.querySelector('.zeile-name span:last-child').textContent = p.name;
        var minus = li.querySelector('[data-schritt="-1"]'), plusK = li.querySelector('[data-schritt="1"]');
        minus.setAttribute('aria-label', (z.n === 1 ? 'Entfernen: ' : 'Eins weniger: ') + p.name);
        plusK.setAttribute('aria-label', 'Eins mehr: ' + p.name);
        li.querySelector('output').setAttribute('aria-label', z.n + ' Stück');
        li.querySelectorAll('[data-schritt]').forEach(function (b) {
          b.addEventListener('click', function () {
            z.n += +b.dataset.schritt;
            if (z.n < 1) auswahl.splice(auswahl.indexOf(z), 1);
            sichern(); zeichnen();
            var naechster = liste.querySelectorAll('.zeile')[Math.min(i, auswahl.length - 1)];
            (naechster ? naechster.querySelector('[data-schritt="' + b.dataset.schritt + '"]') || naechster.querySelector('button') : feldName).focus();
          });
        });
        var sel = li.querySelector('select');
        if (sel) {
          sel.setAttribute('aria-label', 'Schärfe für ' + p.name);
          sel.addEventListener('change', function () { z.s = sel.value; sichern(); text(); });
        }
        liste.appendChild(li);
      });
      leerHinweis.hidden = auswahl.length > 0;
      summeAus.textContent = euro(summe);
      summeAus.parentNode.hidden = !auswahl.length;
      staende.forEach(function (st) { st.textContent = stueck ? euro(summe) : ''; });
      aufKnoepfe.forEach(function (k) { k.setAttribute('aria-label', 'Bestellzettel öffnen' + (stueck ? ', ' + stueck + (stueck === 1 ? ' Gericht, ' : ' Gerichte, ') + euro(summe) : ', noch leer')); });
      // Zahl am Plus in der Karte
      Object.keys(posten).forEach(function (id) {
        var n = auswahl.reduce(function (a, z) { return a + (z.id === id ? z.n : 0); }, 0), b = posten[id].li.querySelector('.dazu');
        b.querySelector('.dazu-zahl').textContent = n || '';
        b.classList.toggle('drauf', n > 0);
        b.setAttribute('aria-label', posten[id].name + (n ? ' noch einmal auf den Bestellzettel (' + n + ' drauf)' : ' auf den Bestellzettel'));
      });
      text();
    }

    function text() {
      var weg = gewaehltZ(), summe = 0, zeilen = [];
      auswahl.forEach(function (z) {
        var p = posten[z.id]; summe += p.cent * z.n;
        zeilen.push(z.n + '× ' + (p.nr ? p.nr + ' ' : '') + p.name + (z.s ? ' (' + z.s + ')' : '') + ' – ' + euro(p.cent * z.n));
      });
      var t = ['Bestellung für Restaurant Bombay', (weg === 'liefern' ? 'Liefern' : 'Abholen') + ': ' + wannText(), ''].concat(zeilen, ['', 'Summe laut Karte: ' + euro(summe), '']);
      t.push('Name: ' + (feldName.value.trim() || '–'));
      if (feldTel.value.trim()) t.push('Telefon: ' + feldTel.value.trim());
      if (weg === 'liefern') t.push('Adresse: ' + (feldAdresse.value.trim().replace(/\s*\n\s*/g, ', ') || '–'));
      if (feldNotiz.value.trim()) t.push('Anmerkung: ' + feldNotiz.value.trim());
      var s = t.join('\n');
      vorschau.textContent = s;
      if (WHATSAPP) knopfWa.href = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(s);
      return s;
    }

    // Fehlt etwas Wichtiges? Dann sagen, was, und dorthin springen
    function fehlt() {
      if (!auswahl.length) return { t: 'Der Bestellzettel ist noch leer.' };
      if (!wann.value) return { t: 'Heute und morgen ist keine Zeit mehr frei. Rufen Sie uns gern an.' };
      if (!feldName.value.trim()) return { t: 'Bitte noch Ihren Namen eintragen.', f: feldName };
      if (gewaehltZ() === 'liefern' && !feldAdresse.value.trim()) return { t: 'Bitte noch die Lieferadresse eintragen.', f: feldAdresse };
      return null;
    }
    function pruefen(e) {
      var f = fehlt();
      meldung.textContent = f ? f.t : '';
      meldung.classList.toggle('ist-fehler', !!f);
      if (f) { e.preventDefault(); if (f.f) { f.f.setAttribute('aria-invalid', 'true'); f.f.focus(); } }
      return !f;
    }
    [feldName, feldAdresse].forEach(function (f) { f.addEventListener('input', function () { f.removeAttribute('aria-invalid'); }); });

    // Ein Lampenknopf: WhatsApp, wenn die Nummer bestätigt ist, sonst der Anruf
    if (WHATSAPP) {
      knopfWa.hidden = false;
      knopfAnruf.classList.replace('knopf--lampe', 'knopf--linie');
      knopfWa.addEventListener('click', function (e) { if (pruefen(e)) meldung.textContent = 'WhatsApp öffnet sich mit Ihrer Bestellung. Bitte dort noch auf Senden tippen.'; });
    }
    knopfAnruf.addEventListener('click', function () {
      // Beim Anruf bleibt der Zettel offen zum Vorlesen
      meldung.classList.remove('ist-fehler');
      meldung.textContent = auswahl.length ? 'Lesen Sie uns den Zettel einfach vor.' : '';
    });
    knopfKopie.addEventListener('click', function (e) {
      if (!pruefen(e)) return;
      var s = text(), fertig = function () { meldung.textContent = 'Text kopiert. Sie können ihn jetzt einfügen und schicken.'; };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(s).then(fertig, function () { zeigeText(); });
      else zeigeText();
    });
    function zeigeText() {
      var d = zettel.querySelector('.zettel-text'); d.open = true;
      var r = document.createRange(); r.selectNodeContents(vorschau);
      var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
      meldung.textContent = 'Der Text ist markiert. Bitte selbst kopieren.';
    }

    function hinweisSetzen() {
      var n = jetzt(), offen = (ZEITEN[n.tag] || []).some(function (sl) { return n.min >= minuten(sl[0]) && n.min < minuten(sl[1]); });
      hinweis.textContent = (offen ? '' : 'Gerade ist geschlossen; telefonisch erreichen Sie uns zu den Öffnungszeiten. ') +
        'Die Bestellung gilt, sobald das Restaurant sie bestätigt hat. Preise laut Karte' + (gewaehltZ() === 'liefern' ? '; ob wir zu Ihnen liefern, klären wir dabei.' : '.');
    }

    zettel.querySelectorAll('input[name="zettel-weg"]').forEach(function (r) {
      r.addEventListener('change', function () { adresseFeld.hidden = gewaehltZ() !== 'liefern'; zeiten(); hinweisSetzen(); text(); });
    });
    [wann, feldName, feldTel, feldAdresse, feldNotiz].forEach(function (f) { f.addEventListener('input', text); f.addEventListener('change', text); });
    zettel.querySelector('form').addEventListener('submit', function (e) { e.preventDefault(); });

    var ausloeserZ = null;
    function oeffnen() {
      ausloeserZ = document.activeElement;
      zeiten(); hinweisSetzen(); text();
      meldung.textContent = ''; meldung.classList.remove('ist-fehler');
      zettel.showModal();
      document.documentElement.classList.add('zettel-offen');
    }
    zettel.querySelector('.zettel-zu').addEventListener('click', function () { zettel.close(); });
    zettel.addEventListener('click', function (e) { if (e.target === zettel) zettel.close(); });
    zettel.addEventListener('close', function () { document.documentElement.classList.remove('zettel-offen'); if (ausloeserZ) ausloeserZ.focus(); });
    aufKnoepfe.forEach(function (k) { k.hidden = false; k.addEventListener('click', oeffnen); });

    // Aus der Essensuhr: ?weg=liefern&wann=0-750
    var par = new URLSearchParams(location.search);
    if (par.get('weg') === 'liefern') { zettel.querySelector('input[value="liefern"]').checked = true; adresseFeld.hidden = false; }
    zeiten();
    if (par.get('wann') && wann.querySelector('option[value="' + par.get('wann') + '"]')) wann.value = par.get('wann');
    zeichnen();
    // Von der Startseite: ?dazu=57 legt das Gericht auf den Zettel und zeigt ihn
    if (par.get('dazu') && posten[par.get('dazu')]) {
      dazu(par.get('dazu'));
      par.delete('dazu');
      history.replaceState(null, '', location.pathname + (par.toString() ? '?' + par : '') + location.hash);
      oeffnen();
    }
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
