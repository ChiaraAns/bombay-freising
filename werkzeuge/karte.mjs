// Schreibt die Speisekarte aus daten/speisekarte.json in die Seiten.
// Aufruf: node werkzeuge/karte.mjs   (der Deploy-Workflow ruft es auch auf)
// Bricht ab, wenn ein Posten nicht sauber zugeordnet ist.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const wurzel = join(dirname(fileURLToPath(import.meta.url)), '..');
// Freigestellte Schalen von der bisherigen Restaurant-Website (Herkunft: img/*.json)
const SCHALEN = [[57, 'butter-chicken'], [109, 'karahi-paneer'], [108, 'dal-makhni'], [92, 'jheenga-curry']];
const GRUPPEN_BILD = { 'huehnerfleisch-spezialitaeten': 'mango-chicken', 'lamm-spezialitaeten': 'rogan-josh', 'fisch-spezialitaeten': 'fisch-chili', 'vegetarische-spezialitaeten': 'karahi-paneer' };
// Gruppen ohne Schärfegrad auf dem Bestellzettel (Brot, Beilagen, Süßes, Getränke)
const OHNE_SCHAERFE = new Set(['salate', 'tandoori-brot', 'beilagen', 'nachspeisen', 'getraenke', 'wein']);
const KENNZEICHEN = {
  v: ['vegetarisch', 'veg'],
  n: ['vegan möglich', 'vegan'],
  s: ['üblich scharf', 'scharf'],
  S: ['üblich sehr scharf', 'sehr-scharf'],
  t: null, // beliebt: Auswahl des Restaurants, steht auf der Startseite
  a: ['ab 18', 'ab18'],
};

const fehler = [];
const daten = JSON.parse(readFileSync(join(wurzel, 'daten/speisekarte.json'), 'utf8'));
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const nummern = new Set();
const ids = new Set();

for (const g of daten.gruppen) {
  if (!g.id || !/^[a-z0-9-]+$/.test(g.id)) fehler.push(`Gruppe ohne gültige id: ${g.name}`);
  if (ids.has(g.id)) fehler.push(`Gruppe doppelt: ${g.id}`);
  ids.add(g.id);
  if (!g.name) fehler.push(`Gruppe ohne Namen: ${g.id}`);
  if (!Array.isArray(g.posten) || !g.posten.length) fehler.push(`Gruppe ohne Posten: ${g.id}`);
  for (const p of g.posten || []) {
    const wo = `${g.id} / ${p.nr ?? '-'} ${p.name}`;
    if (!p.name) fehler.push(`Posten ohne Namen in ${g.id}`);
    if (!/^\d{1,3},\d\d$/.test(p.preis || '')) fehler.push(`Preis unlesbar: ${wo} (${p.preis})`);
    if (p.nr != null) {
      if (!Number.isInteger(p.nr)) fehler.push(`Nummer unlesbar: ${wo}`);
      if (nummern.has(p.nr)) fehler.push(`Nummer doppelt: ${p.nr}`);
      nummern.add(p.nr);
    }
    for (const k of p.kennzeichen || '') if (!(k in KENNZEICHEN)) fehler.push(`Unbekanntes Kennzeichen „${k}“: ${wo}`);
  }
}
if (fehler.length) {
  console.error('Speisekarte NICHT geschrieben:\n- ' + fehler.join('\n- '));
  process.exit(1);
}

function marken(k) {
  return [...k].filter((x) => KENNZEICHEN[x]).map((x) => `<span class="marke-${KENNZEICHEN[x][1]}">${KENNZEICHEN[x][0]}</span>`).join('');
}
function attribute(p, g, i) {
  const k = p.kennzeichen || '';
  let a = ` data-id="${p.nr ?? `${g.id}-${i + 1}`}" data-preis="${p.preis}"`;
  if (!OHNE_SCHAERFE.has(g.id)) a += ' data-schaerfe';
  if (k.includes('v')) a += ' data-v';
  if (k.includes('n')) a += ' data-n';
  if (/[sS]/.test(k)) a += ' data-s';
  const such = [p.nr ?? '', p.name, p.beschreibung].join(' ').toLowerCase();
  return a + ` data-such="${esc(such)}"`;
}
function zeile(p, g, i) {
  const m = marken(p.kennzeichen || '');
  return `      <li class="posten"${attribute(p, g, i)}>` +
    (p.nr != null ? `<span class="nr">${p.nr}</span>` : '') +
    `<span class="name">${esc(p.name)}</span>` +
    `<span class="preis">${p.preis} €</span>` +
    (p.beschreibung || m ? `<span class="text">${esc(p.beschreibung || '')}${m ? `<span class="marken">${m}</span>` : ''}</span>` : '') +
    // Ohne Skript bleibt der Knopf verborgen; dann gilt das Telefon
    `<button class="dazu" type="button" hidden aria-label="${esc(p.name)} auf den Bestellzettel"><svg aria-hidden="true"><use href="#i-plus"/></svg><span class="dazu-zahl"></span></button>` +
    `</li>`;
}

const karte = daten.gruppen.map((g) => {
  const n = g.posten.length;
  return `    <details class="gruppe" id="${g.id}" open>\n` +
    `      <summary>${GRUPPEN_BILD[g.id] ? `<img class="gruppe-bild" src="img/schale-${GRUPPEN_BILD[g.id]}-168.webp" width="56" height="56" loading="lazy" alt="">` : ''}<h2>${esc(g.name)}</h2><span class="anzahl">${n} Posten</span></summary>\n` +
    (g.hinweis ? `      <p class="gruppe-hinweis">${esc(g.hinweis)}</p>\n` : '') +
    `      <ul class="posten-liste">\n${g.posten.map((p, i) => zeile(p, g, i)).join('\n')}\n      </ul>\n` +
    `    </details>`;
}).join('\n');

const sprung = daten.gruppen.map((g) => `        <a href="#${g.id}">${esc(g.name)}</a>`).join('\n');

const beliebt = daten.gruppen.flatMap((g) => g.posten.filter((p) => (p.kennzeichen || '').includes('t')));
if (!beliebt.length) { console.error('Keine beliebten Gerichte (Kennzeichen t) gefunden.'); process.exit(1); }
const beliebtHtml = `      <ol class="beliebt-liste">\n` + beliebt.map((p) =>
  `        <li><span class="name">${esc(p.name)}</span><span class="preis">${p.preis} €</span><span class="text">${esc(p.beschreibung)}</span></li>`
).join('\n') + `\n      </ol>`;

function einsetzen(datei, marke, inhalt) {
  const pfad = join(wurzel, datei);
  if (!existsSync(pfad)) return;
  const alt = readFileSync(pfad, 'utf8');
  const re = new RegExp(`(<!-- ${marke}:anfang -->)[\\s\\S]*?(\\s*<!-- ${marke}:ende -->)`);
  if (!re.test(alt)) { console.error(`Marke ${marke} fehlt in ${datei}`); process.exit(1); }
  writeFileSync(pfad, alt.replace(re, `$1\n${inhalt}$2`));
}

// Die Hauptseite und die Entwurfsfassung 2 (fassung-2/) bekommen dieselbe Karte;
// fassung-1/ ist eingefroren und wird nicht angefasst.
const FASSUNGEN = ['', 'fassung-2/'];
for (const f of FASSUNGEN) {
  einsetzen(f + 'speisekarte.html', 'karte', karte);
  einsetzen(f + 'speisekarte.html', 'sprung', sprung);
  einsetzen(f + 'index.html', 'beliebt', beliebtHtml);
}

const alleposten = new Map(daten.gruppen.flatMap((g) => g.posten.filter((p) => p.nr != null).map((p) => [p.nr, p])));
const schalenHtml = `      <ul class="schalen-liste">\n` + SCHALEN.map(([nr, bild]) => {
  const p = alleposten.get(nr);
  if (!p) { console.error(`Schale ${bild}: Nummer ${nr} fehlt in der Karte.`); process.exit(1); }
  return `        <li><a class="schale" href="speisekarte.html?dazu=${nr}">` +
    `<span class="schale-bild"><img src="img/schale-${bild}-360.webp" srcset="img/schale-${bild}-360.webp 360w, img/schale-${bild}-640.webp 640w" sizes="(min-width: 900px) 300px, 50vw" width="360" height="360" loading="lazy" alt=""></span>` +
    `<span class="schale-name">${esc(p.name)}</span><span class="schale-preis">${p.preis} €</span>` +
    `<span class="schale-dazu"><svg aria-hidden="true"><use href="#i-plus"/></svg>Auf den Zettel</span></a></li>`;
}).join('\n') + `\n      </ul>`;
einsetzen('index.html', 'schalen', schalenHtml);

// Fassung 2: dieselben Schalen als gedeckter Tisch auf der Bühne, mit einer Notiz
// aus den Daten (Empfehlung des Hauses, vegan/vegetarisch, sonst das erste Wort der Beschreibung)
const notiz = (p) => {
  const k = p.kennzeichen || '';
  if (k.includes('t')) return 'Empfohlen vom Haus';
  if (k.includes('n')) return 'auf Wunsch vegan';
  if (k.includes('v')) return 'vegetarisch';
  return p.beschreibung.split(/[ ,]/)[0];
};
const tischHtml = SCHALEN.map(([nr, bild], i) => {
  const p = alleposten.get(nr);
  return `      <a class="gericht gericht--${i + 1}" href="speisekarte.html?dazu=${nr}" aria-label="${esc(p.name)}, ${p.preis} Euro: auf den Bestellzettel legen">` +
    `<img src="img/schale-${bild}-640.webp" srcset="img/schale-${bild}-640.webp 640w, img/schale-${bild}-900.webp 900w" sizes="(min-width: 900px) 300px, 45vw" width="640" height="640" alt="">` +
    `<span class="gericht-schild" aria-hidden="true"><span class="gericht-name">${esc(p.name)}</span><span class="gericht-preis">${p.preis} €</span><svg><use href="#i-plus"/></svg></span>` +
    `<span class="gericht-notiz" aria-hidden="true">${esc(notiz(p))}<svg viewBox="0 0 60 40"><path d="M4 6c18 2 34 10 46 28m0 0-1-11m1 11-10-3"/></svg></span></a>`;
}).join('\n');
if (existsSync(join(wurzel, 'fassung-2/index.html'))) {
  const v2 = readFileSync(join(wurzel, 'fassung-2/index.html'), 'utf8');
  if (v2.includes('<!-- tisch:anfang -->')) einsetzen('fassung-2/index.html', 'tisch', tischHtml);
}
const alle = daten.gruppen.reduce((s, g) => s + g.posten.length, 0);
console.log(`Speisekarte geschrieben: ${daten.gruppen.length} Gruppen, ${alle} Posten, ${beliebt.length} beliebt.`);
