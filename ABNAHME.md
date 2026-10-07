# Abnahme – was nur das Restaurant beantworten kann

Stand 06.10.2026. Bis zur Antwort steht auf der Seite nichts Geratenes; unklare Angaben sind weggelassen oder im Impressum gelb markiert.

## Vor dem Livegang nötig

1. **Speisekarte bestätigen** (`daten/speisekarte.json`): Nur 7 Preise stammen von der neueren Karvi-Seite (`"karvi": true`), alle übrigen von der älteren order-smart-Seite und sind vorläufig. Bitte die ganze Karvi-Karte abgleichen (am besten Mittwoch ab 11:30, wenn die Bestellstrecke lädt) oder die Preise einmal bestätigen.
2. **Fotos:** Alle sieben Fotos haben Gäste aufgenommen. Einwilligung der Fotografierenden einholen oder einen Fototermin im Lokal machen.
3. **Impressum:** Rechtsform (Einzelunternehmen?), USt-IdNr. (falls vorhanden), aktuelle E-Mail-Adresse bestätigen. Handelsregister prüfen.
4. **Bestellweg (geändert 07.10.2026):** Auf Wunsch der Betreiberin bestellt man jetzt direkt auf der Seite: Gerichte auf den Bestellzettel, dann Anruf oder WhatsApp. Die Seite leitet nicht mehr zu Karvi weiter; nur die Bombay-App (App Store, Google Play) bleibt verlinkt. Offen:
   - **WhatsApp-Nummer** des Restaurants. Bis sie in `app.js` (`WHATSAPP`) steht, gibt es nur „Anrufen“ und „Kopieren“. Danach den WhatsApp-Absatz in `datenschutz.html` sichtbar machen (`hidden` entfernen).
   - Wer im Laden liest WhatsApp-Bestellungen, und wie bestätigt das Restaurant sie?
   - **Bezahlung** bei Abholung und Lieferung (bar, Karte?). Die Seite sagt dazu bisher nichts.
   - Das ältere order-smart-System kündigen oder abschalten. Lieferando wird nicht verlinkt.
5. **Domain:** Unter welcher Adresse soll die neue Seite laufen (restaurant-bombayfreising.de oder bombayrestaurant-freising.de)? Die andere leitet um. Danach den Link im Google-Profil umstellen.
6. **Schärfegrade:** Auf der Seite steht, dass jedes Gericht mild, pikant, scharf oder sehr scharf bestellt werden kann (laut Karvi-Seite). Der Bestellzettel bietet die Wahl bei allen Gruppen außer Salate, Tandoori-Brot, Beilagen, Nachspeisen, Getränke und Wein (`OHNE_SCHAERFE` in `werkzeuge/karte.mjs`). Stimmt das so?

## Fragen, deren Antwort die Seite verbessert

7. **Mittagstisch / Buffet:** Gibt es ihn noch? Preis und Zeiten? Dann kommt er mittags ganz nach oben.
8. **Allergene:** Gibt es eine Kennzeichnung je Gericht? Bisher steht nur die Legende und der Hinweis aufs Personal da.
9. **Liefergebiet**, Mindestbestellwert, Liefergebühr. Der Bestellzettel sagt bisher nur: „ob wir zu Ihnen liefern, klären wir dabei“.
10. **Reservierung:** nur telefonisch oder auch per WhatsApp?
11. **Terrasse:** Saison und Zahl der Plätze.
12. **Porträt:** Gibt es ein Foto von Inhaber, Küche oder Familie, das gezeigt werden darf? Es gehört direkt unter den ersten Bildschirm.
13. **„Feiern und größere Anlässe auf Anfrage“** (Karvi-Seite): gilt das? Dann bekommt es einen eigenen kleinen Abschnitt.
14. **App-Rabatt** aus der Werbegrafik (10 %): gilt er noch? Bis dahin nicht erwähnt.
15. **Leitfarbe:** Gewählt ist das Rot der Polsterbänke (Betreiber-Entscheidung 06.10.2026). Das Logo-Magenta der Werbegrafik kommt auf der Seite nicht vor; das Logo erscheint einfarbig. Passt das?
16. **Vegetarische Gerichte:** Auf der Seite steht „Zwanzig vegetarische Gerichte“ (Zahl der Gruppe „Vegetarische Spezialitäten“). Stimmt das nach dem Kartenabgleich noch?
