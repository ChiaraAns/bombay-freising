// Schreibt die Speisekarte aus daten/speisekarte.json in die Seiten.
// Aufruf: node werkzeuge/karte.mjs   (der Deploy-Workflow ruft es auch auf)
// Bricht ab, wenn ein Posten nicht sauber zugeordnet ist.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const wurzel = join(dirname(fileURLToPath(import.meta.url)), '..');
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
    `      <summary><h2>${esc(g.name)}</h2><span class="anzahl">${n} Posten</span></summary>\n` +
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
  const alt = readFileSync(pfad, 'utf8');
  const re = new RegExp(`(<!-- ${marke}:anfang -->)[\\s\\S]*?(\\s*<!-- ${marke}:ende -->)`);
  if (!re.test(alt)) { console.error(`Marke ${marke} fehlt in ${datei}`); process.exit(1); }
  writeFileSync(pfad, alt.replace(re, `$1\n${inhalt}$2`));
}

einsetzen('speisekarte.html', 'karte', karte);
einsetzen('speisekarte.html', 'sprung', sprung);
einsetzen('index.html', 'beliebt', beliebtHtml);
const alle = daten.gruppen.reduce((s, g) => s + g.posten.length, 0);
console.log(`Speisekarte geschrieben: ${daten.gruppen.length} Gruppen, ${alle} Posten, ${beliebt.length} beliebt.`);
