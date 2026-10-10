# Abnahme – was nur das Restaurant beantworten kann

Stand 06.10.2026. Bis zur Antwort steht auf der Seite nichts Geratenes; unklare Angaben sind weggelassen oder im Impressum gelb markiert.

## Fassungen zur Auswahl (10.10.2026)

- **Fassung 1** (bisher, eingefroren): https://chiaraans.github.io/bombay-freising/fassung-1/
- **Fassung 2 „Laternenlicht“**: https://chiaraans.github.io/bombay-freising/fassung-2/ — Laternen aus dem Gastraum als Erkennungszeichen, gedeckter Tisch mit vier Schalen als Startbild (Beschreibung in `fassung-2/LIESMICH.md`).
- **Fassung 3 „Farbe“**: https://chiaraans.github.io/bombay-freising/fassung-3/ — wie Fassung 2, die Startseite mit Rangoli, Ringelblumen und Pink aus dem Logo, „Heute Lust auf …?“, Einblendungen beim Scrollen (`fassung-3/LIESMICH.md`).
- **Fassung 5 „Masala“** (neu, ganze Seite neu gestaltet): https://chiaraans.github.io/bombay-freising/fassung-5/ — Pink aus dem Logo, Kurkuma-Gelb, gebogte Kanten, Plakatschrift Shrikhand; ein Gericht groß auf dem Farbteller, wechselt mit „Heute Lust auf …“ (`fassung-5/LIESMICH.md`).
- Die Hauptadresse zeigt weiter Fassung 1. **Bitte entscheiden, welche Fassung dorthin soll.** Beide Unterseiten sind für Suchmaschinen gesperrt (`noindex`).

## Vor dem Livegang nötig

1. **Speisekarte bestätigen** (`daten/speisekarte.json`): Nur 7 Preise stammen von der neueren Karvi-Seite (`"karvi": true`), alle übrigen von der älteren order-smart-Seite und sind vorläufig. Bitte die ganze Karvi-Karte abgleichen (am besten Mittwoch ab 11:30, wenn die Bestellstrecke lädt) oder die Preise einmal bestätigen.
2. **Fotos:** Die Gästefotos (Gastraum, Kupferschalen, gedeckter Tisch) brauchen die Einwilligung der Fotografierenden oder eigene Aufnahmen. **Neu (07.10.2026):** Bühnenbild (Chicken Tikka) und die freigestellten Schalen stammen von der bisherigen Website bombayrestaurant-freising.de (Wunsch der Betreiberin, übernommen über das Projekt kebronkg-cmyk/inder). Bitte klären, ob diese Fotos dem Restaurant gehören oder Bilder des Bestellanbieters (Karvi) sind; im zweiten Fall dürfen sie ohne dessen Erlaubnis nicht auf eine Seite ohne Karvi. Herkunft steht in `img/*.json`. **Neu (07.10.2026, Nachmittag):** Das Butter-Chicken-Foto war schräg aufgenommen; für die Startseite wurde es auf eine runde Draufsicht entzerrt und der Schalenrand an kleinen Stellen ergänzt. Das Bühnenbild ist wärmer gestimmt und enger beschnitten. Bitte ansehen, ob das so passt. Die Dreierreihe der Gästefotos (drei Soßen, Teller auf Paisleydecke) ist auf Wunsch entfernt.
3. **Impressum:** Rechtsform (Einzelunternehmen?), USt-IdNr. (falls vorhanden), aktuelle E-Mail-Adresse bestätigen. Handelsregister prüfen.
4. **Bestellweg (geändert 07.10.2026):** Auf Wunsch der Betreiberin bestellt man jetzt direkt auf der Seite: Gerichte auf den Bestellzettel, dann Anruf oder WhatsApp. Die Seite leitet nicht mehr zu Karvi weiter; nur die Bombay-App (App Store, Google Play) bleibt verlinkt. Offen:
   - **WhatsApp-Nummer:** Eingetragen ist vorerst die Festnetznummer 08161 4965102 (`WHATSAPP` in `app.js`), weil keine andere bekannt ist. **Bitte prüfen, ob diese Nummer bei WhatsApp (Business) eingerichtet ist.** Sonst meldet WhatsApp „Nummer ungültig“ und die Bestellung kommt nicht an. Dann die richtige Handynummer eintragen oder den Wert leeren (dann nur Anrufen/Kopieren) und den WhatsApp-Absatz in `datenschutz.html` wieder verbergen.
   - Wer im Laden liest WhatsApp-Bestellungen, und wie bestätigt das Restaurant sie?
   - **Bezahlung** bei Abholung und Lieferung (bar, Karte?). Die Seite sagt dazu bisher nichts.
   - Das ältere order-smart-System kündigen oder abschalten. Lieferando wird nicht verlinkt.
5. **Domain:** Unter welcher Adresse soll die neue Seite laufen (restaurant-bombayfreising.de oder bombayrestaurant-freising.de)? Die andere leitet um. Danach den Link im Google-Profil umstellen.
6. **Google-Bewertungen:** „Selbst bewerten“ öffnet bisher die Google-Maps-Suche nach „Restaurant Bombay, Obere Hauptstraße 67, Freising“; dort steht „Rezension schreiben“. Besser ist der direkte Bewertungslink: im Google-Unternehmensprofil unter „Rezensionen anfordern“ / „Profil teilen“ kopieren und in `index.html` (Abschnitt Stimmen) eintragen. Die Zahlen 4,5 und 417 sind vom 06.10.2026 und müssen von Zeit zu Zeit nachgetragen werden.
7. **Schärfegrade:** Auf der Seite steht, dass jedes Gericht mild, pikant, scharf oder sehr scharf bestellt werden kann (laut Karvi-Seite). Der Bestellzettel bietet die Wahl bei allen Gruppen außer Salate, Tandoori-Brot, Beilagen, Nachspeisen, Getränke und Wein (`OHNE_SCHAERFE` in `werkzeuge/karte.mjs`). Stimmt das so?

## Fragen, deren Antwort die Seite verbessert

8. **Mittagstisch / Buffet:** Gibt es ihn noch? Preis und Zeiten? Dann kommt er mittags ganz nach oben.
9. **Allergene:** Gibt es eine Kennzeichnung je Gericht? Bisher steht nur die Legende und der Hinweis aufs Personal da.
10. **Liefergebiet**, Mindestbestellwert, Liefergebühr. Der Bestellzettel sagt bisher nur: „ob wir zu Ihnen liefern, klären wir dabei“.
11. **Reservierung:** nur telefonisch oder auch per WhatsApp?
12. **Terrasse:** Saison und Zahl der Plätze.
13. **Porträt:** Gibt es ein Foto von Inhaber, Küche oder Familie, das gezeigt werden darf? Es gehört direkt unter den ersten Bildschirm.
14. **„Feiern und größere Anlässe auf Anfrage“** (Karvi-Seite): gilt das? Dann bekommt es einen eigenen kleinen Abschnitt.
15. **App-Rabatt** aus der Werbegrafik (10 %): gilt er noch? Bis dahin nicht erwähnt.
16. **Leitfarbe:** Gewählt ist das Rot der Polsterbänke (Betreiber-Entscheidung 06.10.2026). Das Logo-Magenta der Werbegrafik kommt auf der Seite nicht vor; das Logo erscheint einfarbig. Passt das?
17. **Vegetarische Gerichte:** Auf der Seite steht „Zwanzig vegetarische Gerichte“ (Zahl der Gruppe „Vegetarische Spezialitäten“). Stimmt das nach dem Kartenabgleich noch?
