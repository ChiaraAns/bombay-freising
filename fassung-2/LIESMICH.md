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

## Zweite Runde (10.10.2026): verspielter Startbereich

Wunsch: Startseite verspielter und einladender, weißer Grund bleibt, keine neuen Farben; mit den Laternen spielen; alle Schalen gleich groß; „Beliebt“ weniger schlicht.

- **Lichterkette** quer über die Bühne (wie die Lichter im Fenster des Gastraums): Seil mit Lichtpunkten, daran Laternen und Deckensterne (Handy 6, Desktop 9). Hängt beim Laden einmal ein (0,9 s).
- **Antippen:** Laterne schwingt aus, ihr Lichthof leuchtet auf, Sterne sprühen heraus; Deckensterne drehen sich. Beim Scrollen neigen sich alle gegen die Bewegung und pendeln zurück (`--wind`, app.js). Mit `prefers-reduced-motion` alles aus. Hinweis „Stupsen Sie die Laternen an!“ (Desktop).
- **Tisch:** vier gleich große Schalen zwei mal zwei, Messingtablett mit eingravierten Punktringen, Schilder am Handy zweizeilig, **handschriftliche Notizen mit Pfeil** aus den Daten (`karte.mjs`: Empfohlen vom Haus / auf Wunsch vegan / vegetarisch / sonst erstes Wort der Beschreibung).
- **Beliebt als Tafel:** Gerichtnamen in Handschrift, Pünktchen bis zum Preis (Kupferbraun), Stern davor (dreht sich beim Darüberfahren).

## Geprüft (10.10.2026, lokal)

Detektor `[]` (390 und 1440, alle vier Seiten), Konsole leer, keine Überbreite bei 390/360, Kontrast über der Grenze (Tischtitel auf dem Lichthof zuerst 4,38:1, auf leise Tinte gehoben), Tipp auf eine Schale legt sie auf den Zettel, Tastaturreihenfolge.

Zweite Runde: Detektor `[]`, keine Überbreite, Konsole leer, Antippen und Scrollwind per Playwright ausgelöst (Klassen gesetzt und wieder entfernt). Kontrast: eine Messung trifft am Handy einen Lichtpunkt neben der Notiz „Empfohlen vom Haus“; die Schrift steht auf hellem Grund (5,98:1).

Nicht geprüft: echte Handys (Tippen mit dem Finger), Live-Seite (aus der Arbeitsumgebung gesperrt), Bewegung nur als Endzustand gesehen.
