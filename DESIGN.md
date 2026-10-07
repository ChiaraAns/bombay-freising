---
name: Restaurant Bombay Freising
description: Der Gastraum in der Oberen Hauptstraße als Website – weiße Tischdecken, rote Bänke und Servietten, dunkles Holz, Kupferschalen.
colors:
  decke: "#fafaf8"
  decke-hell: "#ffffff"
  decke-schatten: "#efede8"
  decke-linie: "#dad5cc"
  holz: "#2a140c"
  rot: "#a3261a"
  rot-tief: "#7f1b11"
  kupfer: "#b0652e"
  kupfer-hell: "#d9995e"
  text-weich: "#5d3d28"
  text-hell: "#f3dfb6"
  text-hell-weich: "#d9c39b"
  gruen-marke: "#2a5427"
  tuerkis-marke: "#1a4f41"
  markiert: "#fff07a"
typography:
  display:
    fontFamily: "Rozha One, Bodoni 72, Georgia, serif"
    fontSize: "clamp(2.2rem, 9.4vw, 4.6rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.005em"
  headline:
    fontFamily: "Rozha One, Bodoni 72, Georgia, serif"
    fontSize: "clamp(2rem, 6.4vw, 3.2rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.005em"
  title:
    fontFamily: "Rozha One, Bodoni 72, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.05
  plakette:
    fontFamily: "Rozha One, Bodoni 72, Georgia, serif"
    fontSize: "1.55rem"
    fontWeight: 400
    lineHeight: 1.15
    fontFeature: "\"lnum\", \"tnum\""
  gericht:
    fontFamily: "Rozha One, Bodoni 72, Georgia, serif"
    fontSize: "1.35rem"
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: "Hind, Segoe UI, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  posten:
    fontFamily: "Hind, Segoe UI, system-ui, sans-serif"
    fontSize: "1.12rem"
    fontWeight: 700
    lineHeight: 1.3
  knopf:
    fontFamily: "Hind, Segoe UI, system-ui, sans-serif"
    fontSize: "1.08rem"
    fontWeight: 700
    lineHeight: 1.1
  label:
    fontFamily: "Hind, Segoe UI, system-ui, sans-serif"
    fontSize: "0.98rem"
    fontWeight: 600
    lineHeight: 1.2
  lead:
    fontFamily: "Hind, Segoe UI, system-ui, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 400
    lineHeight: 1.55
  klein:
    fontFamily: "Hind, Segoe UI, system-ui, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 400
    lineHeight: 1.5
  mini:
    fontFamily: "Hind, Segoe UI, system-ui, sans-serif"
    fontSize: "0.74rem"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "0.03em"
rounded:
  kachel: "2px"
  rund: "6px"
  pille: "99px"
  kreis: "50%"
  bogen: "30px"
  bogen-gross: "38px"
spacing:
  rand: "clamp(16px, 4vw, 40px)"
  luft: "clamp(56px, 9vw, 120px)"
  kopf-hoehe: "60px"
  kopf-hoehe-desktop: "68px"
  spalte: "1180px"
components:
  knopf-rot:
    backgroundColor: "{colors.rot}"
    textColor: "{colors.text-hell}"
    typography: "{typography.knopf}"
    rounded: "{rounded.rund}"
    padding: "12px 24px 10px"
    height: "52px"
  knopf-rot-hover:
    backgroundColor: "{colors.rot-tief}"
  knopf-putz:
    backgroundColor: "{colors.decke-hell}"
    textColor: "{colors.holz}"
    typography: "{typography.knopf}"
    rounded: "{rounded.rund}"
    padding: "12px 12px 10px"
    height: "52px"
  knopf-linie:
    backgroundColor: "transparent"
    textColor: "{colors.holz}"
    typography: "{typography.knopf}"
    rounded: "{rounded.rund}"
    padding: "12px 24px 10px"
    height: "52px"
  knopf-linie-hover:
    backgroundColor: "{colors.holz}"
    textColor: "{colors.text-hell}"
  menu-knopf:
    backgroundColor: "transparent"
    textColor: "{colors.text-hell}"
    rounded: "{rounded.rund}"
    padding: "8px 16px 6px"
    height: "44px"
  schalter:
    backgroundColor: "transparent"
    textColor: "{colors.text-hell}"
    typography: "{typography.label}"
    rounded: "{rounded.pille}"
    padding: "6px 14px 4px"
    height: "40px"
  schalter-an:
    backgroundColor: "{colors.text-hell}"
    textColor: "{colors.holz}"
  suchfeld:
    backgroundColor: "{colors.decke-hell}"
    textColor: "{colors.holz}"
    rounded: "{rounded.rund}"
    padding: "10px 14px 7px 44px"
    height: "46px"
  heute-marke:
    backgroundColor: "{colors.rot}"
    textColor: "{colors.text-hell}"
    rounded: "{rounded.pille}"
    padding: "2px 8px 0"
  fotoansicht-knopf:
    backgroundColor: "{colors.holz}"
    textColor: "{colors.text-hell}"
    rounded: "{rounded.kreis}"
    size: "52px"
---

# Design System: Restaurant Bombay Freising

## Overview

**Creative North Star: "Der Gastraum in der Oberen Hauptstraße"**

Die Seite ist das Lokal selbst: Grund aus dem Weiß der Tischdecken, Text und Abendflächen aus dunklem Holz, das Rot der Polsterbänke als einzige Lampe, gehämmertes Kupfer nur als Linie. Alle Farben stammen aus den Gästefotos des Gastraums (Messung „Laden lesen“ in `recherche/bombay.md`) und sind am Bildschirm angenähert; keine davon verschwände mit einem Lieferanten. Die eigene Idee ist die Kuppelbogen-Plakette: die Kuppel aus dem Logo und ein Bogen, der den Live-Satz „Heute geöffnet bis …“ überspannt.

Die Richtung ist vom Betreiber gepinnt, nicht gewürfelt: Das Startpaket (`CLAUDE.md`, `recherche/vision.md`) verlangt Farbe aus dem Raum, die Abstimmung vom 06.10.2026 legt die Leitfarbe auf das Rot der Bänke fest. Es gab keinen Seed-Roll. Die vorherige Streichholz-Richtung (Seed 36bb5d45) ist verworfen und gilt nicht mehr. Abgelehnt sind ausdrücklich die Lieferportal-Maske (Gold auf dunklem Gewürzfoto) und die Vorlage Creme–Serife–Terrakotta.

Die Dichte folgt der Tageszeit: mittags zuerst die Auswahl mit Preisen, abends zuerst der Raum. Kanten sind 1–2 px Linien, keine Karten-Raster, keine Schatten. Bewegung ist knapp und bremst aus.

**Key Characteristics:**
- Weiß der Tischdecken als Grund, dunkles Holz als Anker- und Abendfläche, abgesetztes Schattenband für „Besuch“.
- Bankrot leuchtet nur im Hauptknopf „Online bestellen“ (Bühne und Daumenleiste) und im Heute-Signal.
- Kupfer erscheint nur als Linie: Bogen, Kuppel, Trenner, Unterstriche, Leistenkanten.
- Rozha One für Titel und Gerichtnamen, Hind für Text, beide lokal (OFL).
- Echte Gästefotos im eigenen Format, mittags und abends getauscht.
- Mobil zuerst; Leisten weichen beim Runterscrollen aus.

## Colors

Das Weiß der Tischdecken und dunkles Holz, ein gesättigtes Bankrot als einzige Lampe, Kupfer als Ornamentlinie.

### Primary
- **Bankrot** (`rot`): Füllung des einen Hauptknopfs „Online bestellen“ in Bühne und Daumenleiste, die Heute-Marke in der Öffnungszeiten-Tabelle und das Favicon. Funktional außerdem Fokusring, Textauswahl und Schreibmarke auf hellem Grund.
- **Tiefes Bankrot** (`rot-tief`): Hover des Hauptknopfs; Text der heutigen Zeile in der Zeiten-Tabelle, Kennzeichen „scharf“, Links in den Rechtstexten.

### Secondary
- **Kupfer** (`kupfer`): nur Linie auf hellem Grund: Gruppenrand der Speisekarte (2 px), Unterstrich der „Mehr“-Links, Trenner über Zwischentiteln, Kanten der Leisten.
- **Helles Kupfer** (`kupfer-hell`): Kupfer auf Holz: Kuppel und Bogen der Plakette, Punkte zwischen „Lieferung“ und „Abholung“, Rahmen von Menü-, Telefon- und Fotoansicht-Knopf, Markierung der aktuellen Gruppe im Lotsen, Fokusring auf dunklem Grund.

### Neutral
- **Tischdecke** (`decke`): Seitengrund, das Weiß der gedeckten Tische.
- **Reines Weiß** (`decke-hell`): nur Suchfeld, Daumenknopf „Anrufen“ und Sprunglink.
- **Tischdecke im Schatten** (`decke-schatten`): das abgesetzte Band „Öffnungszeiten / So finden Sie uns“.
- **Tischdeckenfalte** (`decke-linie`): 1-px-Zeilenlinien auf hellem Grund (Gerichtlisten, Zeiten-Tabelle).
- **Dunkles Holz** (`holz`): Text auf hellem Grund, Kopfleiste, Bühne, Abschnitt „Bei uns“, Lotse, Daumenleiste, Fuß, Fotoansicht, `theme-color`.
- **Gedämpftes Holz** (`text-weich`): Beschreibungen, Nummern, Hinweise auf hellem Grund (9,4:1).
- **Heller Putz-Text** (`text-hell`): Text auf Holz und Rot; Logo-Einfärbung.
- **Gedämpfter Putz-Text** (`text-hell-weich`): Nebentext auf Holz.
- **Kennzeichen-Grün / -Türkis** (`gruen-marke`, `tuerkis-marke`): ausschließlich Text und Rand der Kennzeichen „vegetarisch“ und „vegan möglich“.
- **Markierung** (`markiert`): Arbeitsmarke für offene Angaben in den Rechtstexten, kein Gestaltungswert; fällt weg, sobald `ABNAHME.md` geklärt ist.

### Named Rules
**The Eine-Lampe Rule.** Gefüllt mit Bankrot wird pro Knopfgruppe genau ein Element: „Online bestellen“. Alle anderen Knöpfe sind Linie, Weiß oder Text. Leuchten zwei, führt keiner.

**The Kupfer-ist-Linie Rule.** Kupfer ist Ornament der Handi-Schalen: Bogen, Kuppel, Trenner, Rahmen, Unterstrich. Nie Fläche, nie Knopffüllung.

**The Raum-Probe Rule.** Eine neue Farbe muss im Gastraum oder auf seinem Geschirr nachgemessen sein. Lieferdienst-Orange, Gold und Karvi-Pink gehören nicht dazu.

## Typography

**Display Font:** Rozha One (mit Bodoni 72, Georgia, serif)
**Body Font:** Hind 400/600/700 (mit Segoe UI, system-ui, sans-serif)

**Character:** Beide Schriften stammen aus der Indian Type Foundry: Rozha One bringt den kräftigen Kontrast der Ladenschilder, Hind bleibt im Lauftext ruhig und gut lesbar. Selbst gehostet als WOFF2, `font-display: swap`, Rozha One und Hind 400 vorgeladen.

### Hierarchy
- **Display** (400, clamp(2.2rem, 9.4vw, 4.6rem), 1): Titel der Bühne; die Speisekarte nutzt clamp(2.8rem, 12vw, 5rem), die Rechtstexte clamp(2.4rem, 9vw, 3.4rem).
- **Headline** (400, clamp(2rem, 6.4vw, 3.2rem), 1,05): Abschnittstitel; Gruppentitel der Karte clamp(1.8rem, 6.6vw, 2.7rem).
- **Title** (400, 1,5rem): Zwischentitel, z. B. „Auch ohne Fleisch“ über einer Kupferlinie.
- **Plakette** (Rozha One, 1,55rem / Desktop 2rem, 1,15): der Live-Satz in der Kuppelbogen-Plakette; die Uhrzeit hebt sich ab.
- **Gericht** (Rozha One, 1,35rem, 1,2): Gerichtnamen in „Beliebt“, Zitate (1,4rem / 1,3), Leer-Meldung der Suche.
- **Body** (400, 1,125rem, 1,55): Lauftext; Zeilenlänge 28–34em in Einleitungen, 44–46rem in Hinweisen und Rechtstexten.
- **Posten** (700, 1,12rem, 1,3): Gerichtnamen in der Speisekarte, Hind statt Rozha für schnelles Überfliegen langer Listen.
- **Knopf** (700, 1,08rem, 1,1): Knöpfe; in der Bühne 1,15rem.
- **Lead** (400, 1,2rem): Führungssatz im Lehmofen-Abschnitt, Adresse.
- **Klein** (400, 0,92rem): Quellenangaben, Bildhinweis, Copyright.
- **Mini** (700, 0,74rem, Sperrung 0,03em): Kennzeichen-Pillen der Speisekarte und die HEUTE-Marke.
- **Label** (600, 0,98rem): Filter, Gruppensprung, Navigation (1rem), Wege-Zeile.

### Named Rules
**The Preis-steht-gerade Rule.** Preise, Uhrzeiten, Nummern und der Plakettensatz setzen `lining-nums tabular-nums`, damit Spalten bündig stehen.

**The Zwei-Schriften Rule.** Rozha One nur in Gewicht 400 und nur für Titel, Plakette, Gerichtnamen der Auswahl und Zitate; alles Bedienbare ist Hind.

## Layout

Mobil zuerst, eine Spalte innerhalb `rand`; Inhalt in einer Spalte von höchstens 1180 px. Abschnittsabstand `luft` (oben voll, unten 0,6–0,7-fach). Umbrüche bei 700 px (Gerichtlisten und Galerie mehrspaltig, Küche 5fr : 6fr, Besuch 1,1fr : 1fr, Zitate dreispaltig) und 900 px (feste Navigation, Bühne geteilt, Daumenleiste aus).

**Bühne, Handy (390 px):** schmale Holzleiste mit Logo und „Menü“, darunter das Foto über die volle Breite, unten in den Holz-Schleier verlaufend; der Textblock greift 54 px ins Bild: Titel, Plakette, Wege-Zeile, roter Knopf über die volle Breite, Telefon, App-Links.

**Bühne, Desktop – bewusste Abweichung vom Vertrag.** Der Richtungsvertrag nennt „Foto füllt die Bühne“. Gebaut ist eine geteilte Bühne: Foto rechts in einer Spalte von 52vw, Textblock links auf dunklem Holz, ein seitlicher Holz-Verlauf über 22 % der Bildbreite verbindet beide. Grund ist die Norm (Regel 5, Skill § 4): „Kein Bild über seine Vorlage hinaus ziehen; der Rahmen gibt nicht das Format vor, die Aufnahme tut es.“ Die Bühnenfotos sind Gästefotos im Hochformat, als Webfassung 1300 px breit; als Querformat über die volle Breite müssten sie gestreckt und beschnitten werden. Diese Teilung ist die gültige Desktop-Form.

**Tageszeit-Wechsel.** Ein Inline-Skript setzt `data-zeit` nach Freisinger Uhrzeit (ab 16 Uhr „abend“). Mittags: Bühnenfoto Thali-Platte (01), danach zuerst „Beliebt im Bombay“. Abends: Thali am dunklen Tisch (03), und der Abschnitt „Bei uns“ rückt vor die Auswahl.

**Flächenfolge Startseite:** Holz (Bühne) → Tischdecke (Auswahl) / Holz (Bei uns) → Tischdecke (Küche, Galerie, Stimmen) → Schattenband (Besuch) → Holz (Fuß).

## Elevation & Depth

Flach, ohne einen einzigen Schatten. Tiefe entsteht aus Tonstufen des Raums (Tischdecke → Schattenband → Holz) und aus dem Holz-Schleier über dem Bühnenfoto (`--schleier`: transparent → 55 % Holz bei 55 % → Holz). Leisten über Inhalt (Kopf, Lotse, Daumenleiste) setzen sich mit Holzfläche und einer 1-px-Kupferkante ab, nicht mit Schatten.

### Named Rules
**The Kein-Schatten Rule.** Keine `box-shadow`, kein Leuchten. Was vorne liegt, ist dunkler oder durch eine Kupferlinie getrennt.

**The Schleier-schützt-nur-Text Rule.** Der Schleier deckt nur die Zone hinter dem Text (Handy unten 38 %, Desktop seitlich 22 %); das Gericht bleibt offen.

## Shapes

Gerade Kanten mit leicht gerundeten Ecken (`rund`) für Knöpfe, Suchfeld und Telefonrahmen; Pillen (`pille`) nur für Filter-Schalter, Kennzeichen und Heute-Marke; Kreise (`kreis`) nur für die Knöpfe der Fotoansicht; Galeriekacheln fast eckig (`kachel`). Trennung erfolgt durch Linien von 1 px (Zeilen, Leistenkanten) und 2 px (Gruppenrand, Zwischentitel, Unterstriche), nie durch Kästen. Die einzige gebogene Silhouette ist der Kuppelbogen: ein oben offener Halbbogen (`border-radius: 50% 50% 0 0 / 30px 30px 0 0`, Desktop 38px), unten offen, der auf den Enden des Satzes aufsetzt.

## Components

### Buttons
Ruhig und handfest, Mindesthöhe 52 px (Bühne 56 px), Symbol 22 px links.
- **Shape:** leicht gerundet (`rund`), 2-px-Rand.
- **Hauptknopf (`knopf-rot`):** Bankrot mit hellem Putz-Text, nur „Online bestellen“. Hover (nur Zeigegeräte): tiefes Bankrot. Druck: `scale(.97)`.
- **Linienknopf (`knopf-linie`):** Rand in Textfarbe, transparent; Hover füllt mit Holz. Für „Route planen“ und „Anrufen“ im Besuch-Band.
- **Weißer Knopf (`knopf-putz`):** Weiß mit Holztext, nur „Anrufen“ in der Daumenleiste neben dem roten Knopf.
- **Textlinks mit Pfeil („mehr“, Gruppe bestellen):** Hind 700, 2-px-Kupferunterstrich, Pfeil rückt beim Hover 4 px vor.
- **Telefonzeile:** kein Knopf, sondern Hörer-Symbol in hellem Kupfer plus Nummer in 700, 44 px hoch.

### Kuppelbogen-Plakette (Signatur)
Die eigene Idee der Seite. Kuppel-Symbol aus dem Logo (46 × 31 px, Desktop 56 × 38 px, helles Kupfer) sitzt auf dem Scheitel eines 2-px-Kupferbogens, der den ganzen Statussatz überspannt. Der Satz wird von `app.js` live aus den Öffnungszeiten gesetzt („Heute geöffnet bis 22:00“, „Mittagspause, ab 17:30 wieder geöffnet“, „Heute Ruhetag, morgen ab 11:30“), darunter eine Zusatzzeile. Ohne Skript steht der vollständige Wochenplan darin. Einzige Ladebewegung der Seite: der Bogen öffnet sich aus `scaleX(.55)` (0,8 s), die Kuppel senkt sich 8 px ein (0,7 s, 0,15 s später). Klein funktioniert die Form als Favicon (Kuppel und Bogen hell auf Bankrot).

### Menülisten-Zeilen
Wie die Karte am Tisch: Name links, Preis rechts bündig (700, tabellarische Ziffern), Beschreibung darunter in gedämpftem Holz, 1-px-Tischdeckenlinie als Zeilenende. In „Beliebt“ steht der Name in Rozha One, in der Speisekarte in Hind 700 mit Nummernspalte (2,6em). Ab 700 px zwei Spalten mit 56 px Abstand.
- **Kennzeichen:** Pillen mit 1-px-Rand in der Textfarbe (vegetarisch grün, vegan türkis, scharf tiefes Bankrot, ab 18 gedämpft), 0,74rem, 700.

### Lotse (Suche und Filter der Speisekarte)
Klebt unter der Kopfleiste auf Holz mit Kupferkante; rückt nach oben, wenn die Kopfleiste ausweicht.
- **Suchfeld:** Weiß, ohne Rand, Lupe links, 46 px hoch.
- **Filter-Schalter:** Pillen mit 1,5-px-Rand in hellem Putz-Text (40 %), aktiv hell gefüllt mit Holztext; „Vegetarisch“, „Vegan möglich“, „Üblich scharf“. Wirken ohne Skript über `:has()`, gemerkt in `localStorage`.
- **Zähler:** Trefferzahl rechts, `aria-live`.
- **Gruppensprung:** waagerecht wischbare Leiste; die Gruppe im Lesebereich bekommt einen 2-px-Unterstrich in hellem Kupfer und scrollt mit.

### Aufklappbare Gruppen
Jede Gruppe ist ein `details` mit 2-px-Kupferkante unten; Titel links, „N Posten“ und ein Winkel rechts, der sich beim Öffnen dreht. Am Handy starten die Gruppen geschlossen (Übersicht), ohne Skript und ab 700 px offen. Jede Gruppe endet mit „[Gruppe] online bestellen“. Das HTML der Karte (Gruppen, Sprungleiste, Auswahl „Beliebt“) wird von `werkzeuge/karte.mjs` aus `daten/speisekarte.json` erzeugt und zwischen Kommentarmarken geschrieben; es wird nie von Hand bearbeitet.

### Öffnungszeiten-Tabelle
Zeilen mit 1-px-Tischdeckenlinie, Zeiten rechts bündig. Die heutige Zeile wird per Skript in tiefem Bankrot hervorgehoben und erhält die Heute-Marke: Pille in Bankrot, „HEUTE“ in Versalien (0,72rem, +0,06em).

### Galerie und Fotoansicht
Drei Querformate; Handy erste Kachel über die volle Breite, darunter zwei; ab 700 px drei nebeneinander, 14 px Abstand. Kacheln ohne Symbol und Text, 4:3 wie ihre Vorlagen (1200 × 900). Hover: Bild skaliert auf 1,03 (0,6 s). Klick öffnet einen `dialog` auf 96 % Holz mit Bild im eigenen Format, runden Knöpfen (Schließen, Zurück, Weiter; Rahmen helles Kupfer), Pfeiltasten, Esc und Fokus-Rückkehr zur Kachel. Darunter der Nachweis „Fotos: Gäste des Bombay.“

### Navigation und Leisten
- **Kopfleiste:** Holz, 60 px (Desktop 68 px), Logo als einfarbige Maske in hellem Putz-Text, 1-px-Kupferkante. Handy: „Menü“-Knopf mit Kupferrand, darunter klappt eine Holzliste auf (Esc und Außenklick schließen). Desktop: Textlinks (Hover helles Kupfer) und die Telefonnummer im Kupferrahmen.
- **Daumenleiste (Handy):** fest am unteren Rand, roter Hauptknopf (1,5fr) und Weißer Knopf „Anrufen“ (1fr); erscheint erst, wenn der Hauptknopf der Bühne aus dem Bild ist.
- **Ausweichen:** Kopfleiste und Daumenleiste weichen beim Runterscrollen (ab 120 px) aus und kommen beim Hochscrollen zurück, mit 6 px Hysterese. Bei offenem Menü bleibt alles stehen.

### Bewegung
- Auftritt mit `aus` (`cubic-bezier(.16, 1, .3, 1)`, 0,3–0,35 s), Abgang mit `ein` (`cubic-bezier(.55, 0, 1, .45)`, 0,25 s): Auftritt bremst aus, Abgang beschleunigt.
- Bewegt werden nur `transform` und `opacity`; Dauern 0,3–0,9 s; höchstens drei Bewegungen gleichzeitig.
- Hover nur hinter `(hover: hover) and (pointer: fine)`.
- `prefers-reduced-motion: reduce` schaltet alle Animationen, Übergänge und weiches Scrollen ab.

### Fotos
- Nur echte Fotos aus dem Lokal, jedes mit Herkunfts-Datei (`img/*.webp.json`); Gästefotos für den Entwurf, live nur mit Einwilligung.
- Jedes Foto im eigenen Seitenverhältnis; kein Bild über seine Webfassung hinaus vergrößert.
- Dasselbe Foto nie zweimal auf einer Seite. Bühne mittags 01, abends 03; Raum 04; Küche 02; Galerie 05–07.

## Do's and Don'ts

### Do:
- **Do** Bankrot (`rot`) nur für „Online bestellen“ und das Heute-Signal einsetzen; jede andere Aktion ist Linie, Weiß oder Text.
- **Do** Kupfer als 1–2-px-Linie führen: Bogen, Trenner, Unterstrich, Leistenkante, Rahmen.
- **Do** die Kuppelbogen-Plakette als einzige Signatur und einzige Ladebewegung behalten; sie muss auch als Favicon lesbar bleiben.
- **Do** Fotos im eigenen Format zeigen; auf Desktop die Bühne teilen (Foto 52vw rechts, Text links auf Holz), statt ein Hochformat quer zu ziehen.
- **Do** mittags die Auswahl und abends den Raum zuerst zeigen, mit getauschtem Bühnenfoto.
- **Do** Leisten beim Runterscrollen ausweichen lassen (6 px Hysterese) und beim Hochscrollen zurückholen.
- **Do** Speisekarten-HTML nur über `node werkzeuge/karte.mjs` aus `daten/speisekarte.json` erzeugen.
- **Do** neue Werte nur als Token in `:root` anlegen.

### Don't:
- **Don't** einen zweiten Knopf in Bankrot füllen.
- **Don't** Kupfer als Fläche, Knopffüllung oder Hintergrund einsetzen.
- **Don't** Gold auf dunklem Gewürzfoto (Lieferportal-Maske) oder Creme–Serife–Terrakotta verwenden.
- **Don't** Schatten, Karten-Raster oder Kästen um Gerichte setzen; Zeilen trennen sich durch Linien.
- **Don't** ein Foto mit erzwungenem `aspect-ratio` und `object-fit: cover` auf ein fremdes Format beschneiden oder über seine Vorlage strecken.
- **Don't** dasselbe Foto zweimal auf einer Seite zeigen.
- **Don't** Breite, Höhe, Ränder oder Farben animieren; nur `transform` und `opacity`.
- **Don't** auf die verworfene Streichholz-Richtung (Seed 36bb5d45) zurückgreifen.
