# Product

<!-- impeccable:product-schema 1 -->

> Quellen: Startpaket des Betreibers (`CLAUDE.md`, `recherche/vision.md`, `recherche/bombay.md`, `recherche/speisekarte.md`, Stand 06.10.2026) und Abstimmungen mit dem Betreiber vom 06.10.2026. Offene Punkte stehen in `ABNAHME.md`.

## Platform

web

## Stack

Statisch: HTML, CSS, Vanilla JS. Kein Build, keine Abhängigkeiten, keine CDNs. Die Speisekarte wird aus `daten/speisekarte.json` per `node werkzeuge/karte.mjs` in die Seiten geschrieben. Auslieferung über GitHub Pages (`.github/workflows/deploy-pages.yml`), nur Seitendateien.

## Users

- Studierende (TU-Campus Weihenstephan) und Stammgäste aus Freising, **alle am Handy** (bestätigt). Dazu Büro- und Altstadt-Publikum zum Mittagstisch.
- Mittags zählen Tempo und Preis, abends der farbige Raum (Bewertungen, Öffnungszeiten).
- Sie wollen wissen: Ist heute offen, bis wann? Was kostet es? Wie bestelle ich oder reserviere?

## Product Purpose

Die Website ersetzt das Durcheinander aus zwei Bestellseiten. Sie zeigt das Lokal, wie es ist, und lässt direkt auf der Seite bestellen: Gerichte auf den Bestellzettel, dann per Anruf oder WhatsApp ans Restaurant (Wunsch der Betreiberin, 07.10.2026; keine Weiterleitung zu Karvi). Die Bombay-App bleibt als zweiter Weg hervorgehoben. Erfolg: eine Adresse, eine Preisliste; mehr direkte Bestellungen; weniger Anrufe mit „Habt ihr heute offen?“.

## Positioning

- Restaurant Bombay, Indische Spezialitäten, Obere Hauptstraße 67, 85354 Freising (Altstadt).
- Laut Google-Profil: „farbenfrohe Inneneinrichtung, Terrasse und WLAN“, indische Currys und Tandoori-Gerichte; Lehmofen (Tandoor).
- Gäste loben wiederholt: reichlich, günstig, schnell, freundlich (Google-Bewertungen, 4,5 von 5 aus 417, Stand 06.10.2026).
- Jedes Gericht in vier Schärfegraden bestellbar: mild, pikant, scharf, sehr scharf (laut Restaurant, Karvi-Seite).

## Operating Context

- Öffnungszeiten: Mo, Mi–So 11:30–14:00 und 17:30–22:00; **Dienstag Ruhetag**; Mittagspause 14:00–17:30. Lieferzeiten folgen den Öffnungszeiten.
- Bestellen: Bestellzettel auf der Speisekarte → Anruf (+49 8161 4965102) oder WhatsApp (Nummer offen, siehe `ABNAHME.md`). Richtwerte: Lieferung ca. 60 min, Abholung ca. 30 min. Apps: iOS `id6504758170`, Android `com.de.bombay.resto`. Die Karvi-Seite wird nicht mehr verlinkt.
- Reservieren: telefonisch, +49 8161 4965102.
- Die ältere order-smart-Seite und Lieferando werden nicht verlinkt (Vision: ein Weg).

## Capabilities and Constraints

- Kein Server, keine Zahlung: Der Bestellzettel stellt nur einen Text zusammen; der Gast schickt ihn selbst (Anruf, WhatsApp, Kopieren). Die Bestellung gilt erst mit Bestätigung des Restaurants.
- Keine Cookies, keine Tracker, keine Schriften, Skripte oder Karten von Drittanbietern. `localStorage` nur für die gemerkten Filter und die Gerichte auf dem Bestellzettel (keine Personendaten).
- Preise: 7 Preise von der neueren Karvi-Seite bestätigt, die übrigen vorläufig (siehe `ABNAHME.md`).
- Allergene/Zusatzstoffe: nur die Legende und der Wortlaut des Restaurants; Kennzeichnung je Gericht liegt nicht vor.
- Barrierefreiheit des Lokals laut Google-Profil: kein rollstuhlgerechter Eingang, kein rollstuhlgerechter Parkplatz.

## Brand Commitments

- Name „Bombay“, Logo: Schriftzug unter einem Kuppelbogen (Werbegrafik des Inhabers in Magenta; im Repo als Freisteller `logo-gold.png`, auf der Seite einfarbig eingefärbt).
- **Gestaltung nach der Vorlage der Betreiberin (07.10.2026):** ruhig und fließend, gesperrte Versalien, eine Handschriftzeile, feine Metalllinien. Ocker/Rot hat sie abgelehnt; auf ihren Wunsch hell (07.10.2026): heller Grund, weiße Tafeln, dunkle Tinte, nur die Stimmen als ein dunkles Band. Das Material bleibt das des Lokals: Kupfer und Messing der Handi-Schalen und Laternen, Kielbogen nach dem Taj-Mahal-Wandbild, Kuppel aus dem Logo.
- Ansprache: höflich mit „Sie“, kurz und konkret, Deutsch.

## Evidence on Hand

- Sieben ausgewählte Gästefotos (`bilder/auswahl/`, EXIF/GPS entfernt) — für den Entwurf; für die Live-Seite Einwilligung oder eigene Aufnahmen nötig.
- Einziges Raumfoto: `04-gastraum-wandbild` (Taj-Mahal-Wandbild, rote Bänke, Sternlaternen).
- Echte Speisekarte (`daten/speisekarte.json`, 17 Gruppen, 141 Posten), Allergenlegende, Bewertungsauszüge ohne Namen.
- Nicht vorhanden und nicht zu erfinden: Mittagstisch-/Buffetpreis und -zeiten, Fotos von Inhaber/Küche, Liefergebiet, Rabatte, „frisch“/„hausgemacht“-Aussagen über die Karte hinaus.

## Product Principles

1. Ein Weg zum Essen: genau ein Hauptknopf „Jetzt bestellen“ (Bestellzettel); Telefon gleich daneben, die App als feine Tafel darunter.
2. Der erste Bildschirm beantwortet: Was gibt es, heute offen bis wann, Lieferung/Abholung, Telefon.
3. Das Lokal zeigen, wie es ist: echte Fotos, echte Farben, nichts Geliehenes.
4. Nur echte Fakten. Unklares weglassen und in `ABNAHME.md` fragen.
5. Mittags Tempo, abends Atmosphäre.

## Accessibility & Inclusion

- Deutschsprachig, mobil zuerst, vollständig per Tastatur bedienbar, sichtbarer Fokus, WCAG-2.2-AA-Kontraste, `prefers-reduced-motion` bedient, jede klickbare Fläche mit Namen.
