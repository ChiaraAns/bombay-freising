# Fassung 2 „Laternenlicht“ (Entwurf, 10.10.2026)

Live: https://chiaraans.github.io/bombay-freising/fassung-2/ · Vergleich: Fassung 1 (Stand 07.10.2026, eingefroren) unter `/fassung-1/`. Die Hauptadresse zeigt weiter Fassung 1, bis die Betreiberin entscheidet.

Wunsch der Betreiberin: mehr Wiedererkennungswert, das gewisse Etwas, ein einladenderes Startbild. Gewählt (Abfrage 10.10.2026): Richtung **Laternenlicht**, Startbild **gedeckter Tisch**.

## Was die Fassung ausmacht

- **Laternen** als Erkennungszeichen, gezeichnet nach den durchbrochenen Laternen im Gastraum (Foto `04-gastraum-wandbild`): runder Körper mit Lochmuster, farbige Glassteine (Rot, Blau, Grün, Türkis), gestufter Fuß; dazu der Deckenstern. Symbole `#laterne`, `#deckenstern`, `#stern8` im SVG-Kopf jeder Seite. Sie hängen auf der Startseite, im Kopf der Speisekarte und im dunklen Band der Stimmen, pendeln beim Laden einmal aus (0,9 s) und werfen einen Lichthof.
- **Sternlicht** (`--sternlicht`): Lichtpunkte, die durch die Löcher an die Wand fallen; nur in der Nähe der Laternen.
- **Gedeckter Tisch**: Thali-Tablett aus Messing von oben, darauf Butter Chicken, Karahi Paneer, Dal Makhni und Jheenga Curry mit Schild (Name, Preis, Plus). Ein Tipp legt das Gericht auf den Bestellzettel. Ersetzt den Abschnitt „Aus der Karte“; das Chicken-Tikka-Foto ist raus. Namen und Preise schreibt `werkzeuge/karte.mjs` aus `daten/speisekarte.json` (Marke `tisch`).
- **Gastraum durch den Kielbogen** (`--fenster-form`): das Raumfoto in einem breiten Bogen wie im Taj-Mahal-Wandbild.
- **Zier unter Überschriften** (`--zier`): Faden, Stern, Faden statt der glatten Linie. Bewertungssterne als Laternensterne.
- Neue Farben nur aus den Laternen: Licht `--licht`, Glut, Metall, Glassteine. Grund, Schrift, Kupfer, Lampe und Abendband wie in Fassung 1 (`DESIGN.md`).

## Geprüft (10.10.2026, lokal)

Detektor `[]` (390 und 1440, alle vier Seiten), Konsole leer, keine Überbreite bei 390/360, Kontrast über der Grenze (Tischtitel auf dem Lichthof zuerst 4,38:1, auf leise Tinte gehoben), Tipp auf eine Schale legt sie auf den Zettel, Tastaturreihenfolge.

Nicht geprüft: echte Handys, Live-Seite (aus der Arbeitsumgebung gesperrt), Bewegung nur als Endzustand gesehen.
