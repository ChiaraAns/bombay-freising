---
name: laden-website
description: Norm für Websites inhabergeführter Läden — Restaurant, Imbiss, Café, Salon, Studio. Statisch (HTML/CSS/Vanilla JS), ohne Build, auf GitHub Pages. Ablauf von der Recherche bis zur Live-Abnahme, wie man Laden und Gäste liest, Gestaltungsregeln aus dem echten Ort, Wahrheitsregeln für Preise und Aussagen, Prüfskripte und die Fallen, die schon zugeschlagen haben. Benutzen bei „Website für Restaurant/Salon X“, „neue Fassung“, „Redesign“, „Speisekarte/Preisliste online“. Zusammen mit dem Skill impeccable einsetzen, nicht statt seiner.
---

# Laden-Website — die Norm

> **Kurzfassung in sieben Sätzen**
> 1. Erst den Laden und seine Gäste verstehen, dann gestalten.
> 2. Farbe, Schrift und Material kommen aus dem echten Ort, nie aus einer Vorlage.
> 3. Der erste Bildschirm beantwortet: Was gibt es hier, wann ist offen, wie komme ich dran?
> 4. Nur echte Inhalte — keine erfundene Zahl, kein Platzhalter, kein geratenes Gericht.
> 5. Das Handy ist eine eigene Komposition, keine gestapelte Desktop-Seite.
> 6. Jede Behauptung über die Seite wird gemessen, nicht vermutet.
> 7. Fertig ist erst, was live ausgeliefert und dort geprüft ist.

| § | Inhalt | Wann lesen |
|---|---|---|
| 1 | Laden und Gäste verstehen | vor allem anderen |
| 2 | Ablauf | einmal am Anfang |
| 3 | Gestaltung | beim Festlegen der Welt |
| 4 | Fotos | bei jeder Bildentscheidung |
| 5 | Struktur für Restaurant und Salon | beim Gliedern |
| 6 | Wahrheit | bei jedem Text mit Zahl |
| 7 | Technik | beim Bauen |
| 8 | Bewegung | bei jeder Animation |
| 9 | Prüfen statt behaupten | vor jeder Fertigmeldung |
| 10 | Fallen | wenn etwas seltsam aussieht |
| 11 | Recht | vor dem Livegang |

---

## 1. Laden und Gäste verstehen

Die Website verkauft nicht „Design“, sondern den nächsten Besuch. Bevor
eine Farbe feststeht, sind diese Fragen beantwortet — schriftlich, in
`recherche/`:

| Frage | Woher | Was daraus folgt |
|---|---|---|
| **Wer kommt?** (Mittagsgäste aus Büros, Familien, Studierende, Touristen, Stammgäste) | Bewertungen, Lage, Öffnungszeiten, Preise | Tonfall, Reihenfolge, was oben steht |
| **Wann kommen sie?** | Öffnungszeiten, „Mittagstisch“, „Buffet“ in Bewertungen | Mittags zählt Tempo (Tageskarte, Preis, Weg), abends Atmosphäre |
| **Wie kommen sie?** (vor Ort, Abholung, Lieferung) | Kategorien im Google-Profil, Lieferdienst-Links | Drei Wege gleichwertig erreichbar, aber nur **ein** Hauptknopf |
| **Was loben sie wiederholt?** | Bewertungen: wiederkehrende Wörter zählen | Das ist die Botschaft. Nicht erfinden, verdichten. |
| **Was bemängeln sie?** | schwache Bewertungen | Seite beantwortet es vorab (Wartezeit, Parken, Barrierefreiheit) |
| **Was ist das Eigene?** | Fotos vom Raum, Material, Geschirr, Wandbild, Logo | Leitfarbe und eigene Idee |
| **Was steht dem Gast im Weg?** | Ruhetag, Mittagspause, Zugang, Zahlungsarten | gehört sichtbar nach oben, nicht ins Kleingedruckte |

**Prüftest für die Botschaft:** Würde ein Stammgast den Satz auf der
Startseite wiedererkennen? Wenn er nach Werbeagentur klingt, ist er falsch.

**Prüftest für die Leitfarbe:** Verschwände sie, wenn der Laden den
Lieferanten wechselt (Getränkemarke, Haarpflegemarke, Lieferdienst-Orange)?
Dann gehört sie nicht dem Laden. Was bleibt: Wände, Möbel, Geschirr, Logo,
das Produkt selbst.

**Inhabergeführt heißt: Die Leute kaufen die Person.** Gibt es ein echtes
Foto von Inhaber/Küche/Team, gehört es in den ersten Bildschirm oder direkt
darunter. Gibt es keins, steht der Raum oder das Essen dort, und das
fehlende Porträt kommt als Frage in `ABNAHME.md`.

---

## 2. Ablauf

1. **Einrichten.** Repo-Wurzel = Seite. `vorlagen/deploy-pages.yml` nach
   `.github/workflows/` — deployt bei jedem Push nur die Seitendateien
   (keine Notizen, keine Recherche). Pages einmal von Hand auf „GitHub
   Actions“ stellen. Lokal: `python3 -m http.server 8099`.
2. **Recherche, bevor gestaltet wird** (§ 1). Rohdaten als JSON/MD unter
   `recherche/`. Mehrere Quellen; weichen sie ab, gilt die vom Laden selbst
   gepflegte, und die Abweichung kommt in `ABNAHME.md`.
3. **Welt festlegen** mit impeccable (`context.mjs` → `new-work.md` →
   `craft-floor.md`). Richtungsvertrag als Kommentar gleich nach `<body>`:
   THESE · EIGENE WELT · ERSTER BILDSCHIRM · FORM.
   Schickt der Inhaber Vorlagen oder Visionsbilder, **gewinnen die**.
4. **Bauen.** Token zuerst (`:root`), dann Seiten. Wiederkehrende
   Ornamente über einen Generator (§ 7).
5. **Prüfen** (§ 9), dann impeccable-Abschlussprüfer mit gültigen
   Aufnahmen — höchstens zwei Runden, dann aufhören zu polieren.
6. **Dokumentieren:** `DESIGN.md` aus dem gebauten Stand (impeccable
   documenter). Danach Detektor erneut — ab jetzt prüft er gegen das System.
7. **Übergabe:** `UEBERGABE.md` (was, warum, gemessen) und `ABNAHME.md`
   (was nur der Laden beantworten kann). Commit, Push, Live-URL abfragen,
   bis die Änderung wirklich ausgeliefert ist — erst dann „fertig“.

Neue Fassungen nie über die alte bauen: eigener Pfad, `noindex`, eigene
Kopie von CSS/JS/Bildern. Die Hauptadresse wechselt erst auf Zuruf.

---

## 3. Gestaltung

**Atmosphäre**
- Palette, Schrift, Material aus den echten Fotos messen (Quantisieren auf
  6–8 Farben, Anteile notieren). Erst schauen, dann festlegen.
- Kein Farbschema aus einem früheren Projekt. Gold auf Schwarz war einmal
  die Antwort für ein japanisches Lokal — nicht für jedes.
- **Zweite Farbe nur als Ornament**, nie als Textfarbe.
- **Eine eigene Idee pro Seite**, räumlich, aus dem Laden — und sie muss
  **auch klein funktionieren**. Was nur halbbildschirmgroß wirkt, ist ein
  Schaustück an der falschen Stelle.
- **Zurückhaltung beim Ornament.** Wenige Einsätze, dort, wo sie etwas
  bedeuten. Zurücknehmen ist schwerer als nachlegen.

**Fläche und Licht**
- **Vollflächige Fotohintergründe** tragen Abschnitte. Darüber ein
  mehrstufiger Schleier in der Grundfarbe: oben/unten in den Rand hinein,
  seitlich dichter, wo Text steht. Am Handy gleichmäßig statt seitlich.
- **Ein Schleier, der das Bild rettet, tötet es.** Bei einem Bild über den
  ganzen Schirm reicht ein Schatten hinter dem Textblock; vier Fünftel
  bleiben offen.
- **Dunkle Variante ist keine Umkehrung:** Leitfarbe von der anderen Seite
  neu messen; ein feines dunkles Muster auf dunklem Grund ist keines.
- **Eine Lampe pro Knopfgruppe.** Nur der Hauptknopf ist gefüllt oder
  leuchtet; leuchten zwei, führt keiner.
- **Eine Leiste, die dauerhaft über dem Bild steht, versperrt die Sicht.**
  Runterscrollen: weicht aus. Hochscrollen: kommt zurück (6 px Hysterese).

**Handy**
- Eigene Komposition: erster Bildschirm als Bild mit genau einem Knopf,
  Kapitel mit Nummer, das Anschauliche vor dem Text, Wischreihen statt
  Säulen, Vorschauen statt Listen.
- Telefonnummer und „Heute geöffnet bis …“ schon im ersten Bildschirm.
- Desktop und Tablet bleiben bei Handy-Änderungen **pixelgleich** —
  gemessen (`ImageChops.difference`), nicht angenommen.

**Verbesserung belegen:** Vor einem Umbau vermessen, danach dieselben
Werte: Wörter im ersten Bildschirm · Höhe je Abschnitt · Abstand bis zum
ersten Bild · Anzahl Kästen · Verhältnis Überschrift : Text. Wird eine Zahl
schlechter, wird nachgebessert, bevor es „fertig“ heißt.

---

## 4. Fotos

- **Bildauswahl ist Gestaltung.** Beim Restaurant ist das Foto das Gericht.
  Ein Bild, auf dem das Essen fahl, braun-in-braun oder farbstichig
  aussieht, macht die Küche schlechter, als sie ist. Lieber sieben saubere
  als zwölf, von denen vier schaden.
- **Auswahl messen:** Originalgröße prüfen (≥ 2000 px lange Seite für
  Flächen), Kantenenergie bei gleicher Breite vergleichen, 100-%-Ausschnitt
  der Bildmitte ansehen. Liegt die Schärfe bei einem Drittel der übrigen,
  gehört das Bild an eine kleine Stelle.
- **Kein Bild über seine Vorlage hinaus ziehen.** Ein Standbild aus einem
  Video ist kein Foto.
- **Der Rahmen gibt nicht das Format vor, die Aufnahme tut es.** Ein
  erzwungenes `aspect-ratio` + `object-fit: cover` schneidet das Gericht ab.
- **Dasselbe Foto nie zweimal auf einer Seite.** Nach jedem Tausch alle
  `src` vergleichen.
- **Galerie:** Handy zwei nebeneinander, Desktop drei; Kachel ohne Symbol,
  ohne Text; Klick öffnet eine Ansicht mit Blättern, Esc, Rückkehr an
  dieselbe Stelle.
- **Nie raten, was auf dem Teller liegt.** Ein falsch beschriftetes Gericht
  ist schlimmer als ein unbeschriftetes — beschriften erst nach Auskunft
  der Küche.
- **Bildrechte:** Fotos von Gästen (Google, Tripadvisor) gehören den
  Fotografierenden. Für Entwürfe in Ordnung, für die Live-Seite nur mit
  Einwilligung — oder durch eigene Aufnahmen des Ladens ersetzen. Vor dem
  Einsetzen EXIF/GPS entfernen. Keine Gesichter von Gästen.
- **Ein Film gehört nur dorthin, wo sein Format passt**, und was beim Laden
  steht, muss auch stehen, wenn er nie kommt.

---

## 5. Struktur für Restaurant und Salon

| Restaurant | Salon/Studio | Regel |
|---|---|---|
| **Speisekarte** | Leistungen mit Preisen | eigene Seite, nach Ablauf gegliedert (Vorspeise → Hauptgang → Dessert / Waschen → Schnitt → Farbe), nicht alphabetisch |
| Gruppen aufklappbar | Gruppen aufklappbar | eine Zeile pro Posten, Preis rechts, am Gruppenende der Bestell-/Buchungsweg |
| Kennzeichen (vegetarisch, scharf, Allergene) | Haarlänge, Dauer | als Filter oben, gemerkt (`localStorage`), funktioniert per `:has()` auch ohne Skript |
| **Bestellen / Reservieren** | Termin | Auswahl sammeln → fertiger Text → per WhatsApp/Telefon selbst schicken. Kein Server, keine Zahlung |
| Mittagstisch / Buffet | — | eigener Block mit Zeiten und Preis, mittags ganz oben |
| Gerichte-Galerie | Arbeiten / Vorher-Nachher | anklickbar, ohne Beschriftung auf der Kachel |
| Küche / Familie | Team | mit Gesichtern — Leute kaufen Personen |
| Öffnungszeiten + Ruhetag | Öffnungszeiten je Salon | „Heute“ hervorgehoben, Mittagspause sichtbar |
| Impressum, Datenschutz | dto. | eigene Seiten, Copyright im Fuß |

**Bestell- und Buchungsdienste erst prüfen, dann verlinken.** In einem
früheren Projekt entpuppte sich der vermeintlich eigene Bestellshop als
Ableger eines großen Lieferportals (andere Preise, Provision). Klären: Wem
gehört der Shop? Gleiche Preise wie im Laden? Welcher Weg ist dem Inhaber
am liebsten? Nur dieser wird Hauptknopf.

**Navigator über langen Karten**, der beim Runterscrollen ausweicht und
beim Hochscrollen zurückkommt.

---

## 6. Wahrheit

- Nur echte Preise, Zeiten, Fotos, Gerichte. **Nie Platzhalter, nie
  Blindtext.**
- **Aussagen aus Werbung und Visionsbildern sind keine Belege.** Rabatte,
  „frisch“, „hausgemacht“, „bio“, „original“, „Nr. 1“ erst nach
  schriftlicher Bestätigung; bis dahin weglassen und in `ABNAHME.md` fragen.
- **Stückpreise sind kein Einstieg.** „ab 2,50 €“ für eine Beilage ist kein
  „ab“-Preis der Hauptgerichte. Beim Minimum `pro …`, Beilagen, Extras
  ausschließen.
- Karten und Preislisten werden **generiert** (Skript schreibt zwischen
  `<!-- karte:… -->`-Marken) und brechen ab, wenn ein Posten nicht
  zugeordnet ist.
- Bewertungen nur mit Quelle und Hinweis nach § 5b Abs. 3 UWG, ob und wie
  ihre Echtheit geprüft wird. Keine Namen von Bewertenden.
- Allergene und Zusatzstoffe: nur die Angaben der Küche, wörtlich.
- Illustratives (Farbproben, Symbole) kennzeichnen: „Beispiel, am
  Bildschirm angenähert“.

---

## 7. Technik

- HTML, CSS, Vanilla JS. **Kein Build, keine Abhängigkeiten, keine CDNs.**
  Schriften lokal (OFL), `font-display: swap`, Preload der zwei wichtigsten.
- **Jeder Gestaltungswert ist ein Token in `:root`** — Farben, Abstände,
  Kurven, Muster (als SVG-Daten-URI). Alpha-Stufen aus dem Token:
  `color-mix(in oklch, var(--x) 35%, transparent)`.
- Ein Farbtoken, dessen Name sich mit „auf X“ ergänzen lässt, trägt zwei
  Aufgaben — vor der dunklen Variante entzweien.
- Kanten als `border`, nicht `box-shadow: inset 0 0 0 1px` (Detektor:
  Glühen).
- Bestellzettel: Auswahl → fertiger Satz zum Kopieren → `wa.me`/`tel:`.
- **Ornamente aus einer Vorlage nachbauen** (Logo, Bogen, Muster):
  Ausschnitt aus dem Foto nehmen, im **Koordinatenraum des Ausschnitts**
  zeichnen (viewBox = Ausschnittgröße), Teile von hinten nach vorn,
  Licht nur dort, wo es im Foto steht. **Ein Generator, mehrere Einsätze**
  über Marken (`<!-- zeichen:gross -->`): Auftakt, Ladebildschirm, Logo,
  Favicon — jede Kopie mit eigenem ID-Präfix. Im 40-px-Logo nur der
  erkennbare Ausschnitt, keine Verkleinerung des Ganzen.
- Zugänglichkeit: jede klickbare Fläche hat einen Namen, `:focus-visible`
  sichtbar, Dekoratives `aria-hidden="true"`.

---

## 8. Bewegung

- Nur `ease-out`, kein Federn. Nur `transform` und `opacity`.
- Dauern 0,3–0,9 s; Endlosschleifen deutlich langsamer.
- **Höchstens drei Bewegungen gleichzeitig**, der Rest ~90 ms später.
- **Auftritt bremst aus, Abgang beschleunigt.**
- **Kamerafahrt fährt heran, nicht heraus** — am Rand stehen
  Steckdosen, Kabel, Spülmaschine.
- Hover nur hinter `@media (hover: hover) and (pointer: fine)`.
- `prefers-reduced-motion`: Sinnloses (Partikel, Dampf) ganz abschalten,
  nicht einfrieren.
- Tempo aus gemessenen Werten rechnen, sobald die Strecke vom Inhalt
  abhängt (Laufschrift: Dauer aus Breite).
- Ladebildschirm frühestens 0,9 s, spätestens 1,8 s; ohne Skript nach 4 s
  weg.

---

## 9. Prüfen statt behaupten

Vor **jeder** Fertigmeldung. Skripte in `scripts/` (Playwright; Pfad über
`PLAYWRIGHT_PFAD`):

| Prüfung | Aufruf | Soll |
|---|---|---|
| Aufnahmen 1440 **und** 390, angesehen | `node scripts/aufnahme.mjs <url> 1440 900 pruef/desktop.png` | jeder Auftritt fertig, Leiste ganz da/weg |
| Überbreite 390 + 360 | `node scripts/breite.mjs <url> 360` | `"ok":true` |
| Kontrast gegen gerenderten Grund | `node scripts/kontrast.mjs 390x844 seite.html '.klasse,…'` | alles über der Grenze |
| Detektor | `node .claude/skills/impeccable/scripts/detect.mjs --json .` | `[]` oder nur in `UEBERGABE.md` begründete Meldungen |
| Konsole | `pageerror` + `console.error` abfangen | leer |
| Verhalten | Kurztest: Filter, Auswahl, Ansicht, Tastatur, ohne Skript | alles grün |
| Live | Live-URL abfragen, bis der neue Stand ausgeliefert ist | Änderung sichtbar |

**Messen, nicht vermuten:** Geschwindigkeit, Richtung, Position, Abstand.
Mehrfach war die Vermutung falsch und erst die Messung zeigte den echten
Fehler. Die kleinste Zeile über einem Bild scheitert zuerst am Kontrast —
sie wird an eine dichtere Stelle des Schleiers gesetzt, nicht der Schleier
gedreht.

**Ehrlich melden:** Was nicht geprüft wurde, steht als „nicht geprüft“ da.
Was fehlschlägt, steht mit Ausgabe da.

---

## 10. Fallen

| Falle | Auflösung |
|---|---|
| `position: sticky` meldet beim Scrollen die Klebeposition — auch über `offsetTop` | Festen Anker davor setzen, dessen `offsetTop` nehmen |
| `setPointerCapture` lenkt das spätere `click` auf das Capture-Ziel um | Gedrücktes Element bei `pointerdown` merken |
| `[hidden]` verliert gegen Klassen, die `display` setzen | `[hidden] { display: none !important; }` |
| Grid mit zwei Kindern erzeugt zwei Zeilen | `grid-area: 1 / 1` zum Stapeln |
| Scroll-Umschalter flackert beim Auslaufen | 6 px Hysterese |
| Viele DOM-Zeilen einzeln einfügen ruckelt | `DocumentFragment` + `replaceChildren` |
| Android-WebViews (WhatsApp, Instagram) blasen Text auf | `text-size-adjust: 100%` + Dauer aus gemessener Breite |
| Spezifischere Nachbarregel (`.nav a`) hebelt Ein-Klassen-Regel aus | Elternselektor davor schreiben, nicht `!important` |
| Zwei Regeln mit demselben Selektor — die zweite gewinnt still | Nach dem Einfügen `grep -c` auf den Selektor |
| Neue Klasse mit schon vergebenem Namen zerlegt eine andere Seite | Vor dem Benennen `grep` über alle Seiten |
| `position: relative` für `::before` überschreibt `sticky` | `sticky` ist schon Bezugsrahmen — Zeile streichen |
| `:nth-of-type` zählt Elementtypen, nicht Klassen | `:not(.klasse):nth-of-type(n)` |
| Verlauf mit letztem Halt vor 100 % → harte Linie am Kastenrand | Ellipse innerhalb ihres Kastens auf null auslaufen lassen |
| Radialer Verlauf hinter breitem Textblock — Enden schon bei 82 % | Senkrechtes Band statt Ellipse |
| Schleierfenster liegt komplett hinter einer Karte | Kanten von Text und Karte messen, Stufen daraus rechnen |
| `#` in einer SVG-Daten-URI → Bild bleibt still leer | `%23` |
| Prüfaufnahmen mitten im Auftritt | `auftritt-da` setzen, 1,2 s warten, letzte Kachel an `scrollHeight − h` |
| Nach `DESIGN.md` meldet der Detektor jede Rohfarbe | Rohwerte als Token, Alpha über `color-mix` |
| CSS-`stroke` überschreibt `stroke`-Attribut im SVG | Farbe am Element, Breite/Animation in CSS |
| Inline-Kopien desselben SVG teilen IDs | ID-Präfix je Einsatz |
| Helle Hover-Flächen / `theme-color` aus heller Vorgängerfassung | Nach hohen Hellwerten suchen |
| `z-index: -1` verschwindet hinter dem `body`-Hintergrund | Elternteil `isolation: isolate` |
| Wischreihe in Flex-Spalte mit `align-items: start` → Seite 879 px breit | `align-items: stretch` |
| `pathLength` + `vector-effect: non-scaling-stroke` strichelt falsch | Gerade Kanten als Elemente per `transform: scale` |
| CSS-Animation mit `forwards` überschreibt Inline-Stile | `backwards` oder andere Eigenschaft animieren |
| `<details name>` schließt beim Messen alle anderen | Zum Messen `name` entfernen; `checkVisibility()` |
| `padding: x 0 y` löscht seitlichen Rand einer Mittelspalte | Nur `padding-top`/`-bottom` |
| Element folgt dem Scrollen und ruckelt am Handy | Exponentiell per rAF nachführen, Schein als Verlauf, Variable am Element statt an `<html>` |
| Video am Scrollrad spulen kostet so viel wie der Schlüsselbildabstand | Schlüsselbilder zählen; sonst linear abspielen, nur Kamera scrollen |
| Zwei GSAP-`set` an derselben Stelle laufen rückwärts vertauscht | Ausgangszustand außerhalb der Zeitleiste |
| Mehrere Anbieter liefern die Seite aus (Netlify + GitHub) — einer zeigt den alten Stand | Nur einen Anbieter; den anderen löschen |
| Notizen, Recherche, Design-Ordner (`.impeccable`) landen im Netz | Workflow baut `_site/` nur aus Seitendateien, löscht `*.md` und versteckte Ordner |

---

## 11. Recht (Deutschland, Stand 2026 — keine Rechtsberatung)

- **Impressum** (§ 5 DDG): Betreiber mit Rechtsform, Anschrift, Telefon,
  E-Mail, Vertretungsberechtigte, Registergericht + Nummer (Handelsregister
  prüfen), USt-IdNr. falls vorhanden.
- **Verbraucherschlichtung** (§ 36 VSBG): Erklärung, ob teilgenommen wird.
  Die EU-OS-Plattform ist seit 20.07.2025 abgeschaltet — kein Link mehr.
- **Datenschutz** (DSGVO/TDDDG): Hoster, Server-Logs, jeder eingebundene
  Dienst (Karten, Lieferportal, WhatsApp, Bestell-App), `localStorage`,
  Rechte, zuständige Aufsichtsbehörde des Bundeslands. Keine externen
  Schriften/Karten ohne Einwilligung — Karte als statisches Bild mit Link.
- **Bewertungen:** Hinweis nach § 5b Abs. 3 UWG.
- **Preise:** Endpreise inkl. MwSt. (PAngV); Hinweis „Änderungen und
  Irrtümer vorbehalten“ ersetzt keine richtige Karte.
- **Allergene** (LMIV): online nur, was die Küche angibt; sonst Hinweis,
  dass Auskunft vor Ort erteilt wird.
