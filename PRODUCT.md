# Product

<!-- impeccable:product-schema 1 -->

> Zielgruppe und Spielraum vom Betreiber bestätigt (Abstimmung vom 06.10.2026). Mit „[abgeleitet]“ markierte Punkte stammen aus dem Repository.

## Platform

web

## Users

- Studierende (u. a. TUM Weihenstephan, Hochschule Weihenstephan-Triesdorf) und Stammgäste aus Freising. **Alle nutzen die Seite am Handy.** (bestätigt)
- Typische Lage [abgeleitet]: unterwegs oder zu Hause kurz vor dem Essen; sie wollen schnell wissen, ob offen ist, was sie essen wollen und wie sie bestellen oder anrufen.

## Product Purpose

Website des indischen Restaurants Bombay, Obere Hauptstraße 67, 85354 Freising. Sie soll Gäste zum Besuch, zur telefonischen Reservierung oder zur Online-Bestellung (Abholen/Liefern) führen. Erfolg heißt: Besucher finden in Sekunden ein passendes Gericht, die Öffnungszeiten und den Weg zur Bestellung oder zum Telefon.

## Positioning

- Tandoori aus dem Holzkohlelehmofen, Currys aus der Pfanne.
- Rund zwanzig vegetarische Spezialitäten, mehrere auch vegan.
- Thalis auf original indischen Platten, auch für zwei Personen, als Spezialität des Chefkochs.
- Schärfe-Finder auf der Startseite: Gäste wählen Schärfe, Ernährung und Hunger und bekommen drei Gerichte aus der echten Karte.

## Operating Context

- Reservierung nur telefonisch: 08161 4965102, während der Öffnungszeiten.
- Online-Bestellung über ein externes Bestellportal: https://restaurant-bombayfreising.de/bombay-freising/delivery
- Öffnungszeiten: täglich 11:30–14:00 und 17:30–22:00, Dienstag Ruhetag (gepflegt in `app.js`).
- Speisekarte mit Nummern, Preisen und Kennzeichnungen (vegetarisch, vegan erhältlich, scharf, sehr scharf, beliebt, ab 18), gepflegt in `menu.js`.

## Capabilities and Constraints

- Statische Website aus HTML, CSS und Vanilla-JavaScript ohne Build-Schritt; der Betreiber pflegt Preise und Zeiten direkt in `menu.js` und `app.js`.
- Keine Cookies, keine Tracker, keine Schriften oder Skripte von Drittanbietern (so in der Datenschutzerklärung zugesagt). Schriften werden selbst gehostet.
- Allergene und Zusatzstoffe: nur Hinweis auf Auskunft durch den Service; keine Angaben erfinden.
- Impressum und Datenschutz enthalten gelb markierte Platzhalter, die der Betreiber vor dem Livegang ausfüllt.

## Brand Commitments

- Name „Bombay“ und vorhandenes Logo (`logo-gold.png`, goldener Schriftzug mit Kuppelbogen) als Asset.
- Keine weiteren Vorgaben: Farben, Schriften und Gestaltung dürfen komplett neu sein (bestätigt: kompletter Redesign).
- Ansprache: höflich mit „Sie“, kurz und konkret.

## Evidence on Hand

- Echte Speisekarte mit Preisen (`menu.js`), echte Öffnungszeiten, Adresse und Telefonnummer.
- Keine Fotos von Gerichten oder Räumen im Repository; keine Bewertungen, Auszeichnungen oder Presse. Nichts davon erfinden.

## Product Principles

1. Der Weg zum Essen ist das Produkt: Bestellen, Anrufen und Route sind nie mehr als einen Daumen entfernt.
2. Nur echte Fakten aus Karte und Betrieb; keine erfundenen Versprechen, Bewertungen oder Bilder.
3. Der Betreiber muss Inhalte ohne Entwicklerwissen pflegen können.
4. Ehrliche Orientierung zur Schärfe und Ernährung, damit Gäste sicher wählen.

## Accessibility & Inclusion

- Deutschsprachig, **mobil zuerst** (bestätigt), vollständig per Tastatur bedienbar, WCAG-2.2-AA-Kontraste, reduzierte Bewegung respektieren.
