# Arbeitsweise für dieses Projekt

Website für ein inhabergeführtes Restaurant. Die ausführliche Norm steht im
Skill `.claude/skills/laden-website/` — **vor der ersten Zeile Code lesen**,
dazu `recherche/vision.md` (Ziel), `recherche/bombay.md` und `recherche/speisekarte.md`. Gestaltet wird mit dem Skill `impeccable`.

## Sprache

Alles auf Deutsch: Oberfläche, Kommentare, Commit-Nachrichten, Antworten.
Kein Modellname in Commits, PR-Texten oder Codekommentaren.

## Bauart

Statisch: HTML, CSS, Vanilla JS. **Kein Build, keine Abhängigkeiten.**
GitHub Pages über `.github/workflows/deploy-pages.yml` (Vorlage im Skill).
Nach dem Push die Live-URL abfragen, bis die Änderung wirklich drin ist —
erst dann „fertig“. Gestaltungswerte nur als Token in `:root`.

## Die zehn Regeln, die am meisten zählen

1. **Erst den Laden und seine Gäste verstehen** (Skill § 1), dann gestalten.
2. **Farbe aus dem Laden, nicht aus einer Vorlage.** Prüftest: Verschwände
   sie mit einem Lieferanten? Dann ist sie nicht seine.
3. **Erster Bildschirm:** was es gibt, heute offen bis wann, Telefon, ein
   Hauptknopf. Mittags zählt Tempo, abends Atmosphäre.
4. **Echte Inhalte.** Keine Platzhalter, keine erfundenen Zahlen, kein
   geratenes Gericht. Unklares weglassen und in `ABNAHME.md` fragen.
5. **Bildauswahl ist Gestaltung.** Lieber wenige scharfe Bilder; kein Bild
   über seine Vorlage gezogen; dasselbe Foto nie zweimal auf einer Seite.
6. **Das Handy ist eine eigene Komposition.** Desktop bleibt dabei
   pixelgleich — gemessen.
7. **Eine Lampe pro Knopfgruppe**; zweite Farbe nur als Ornament.
8. **Bewegung:** `ease-out`, 0,3–0,9 s, nur `transform`/`opacity`,
   höchstens drei gleichzeitig, `prefers-reduced-motion` bedienen.
9. **Prüfen statt behaupten:** Aufnahmen 1440 + 390 angesehen, Detektor
   `[]`, Konsole leer, Überbreite ok, Kontrast ok (Skill § 9).
10. **Ehrlich melden:** Was nicht geprüft ist, steht als „nicht geprüft“ da.

## Zugänglichkeit

Jede klickbare Fläche hat einen Namen. Sichtbarer Fokus über
`:focus-visible`. Dekoratives `aria-hidden="true"`.
