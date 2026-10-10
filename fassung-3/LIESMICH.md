# Fassung 3 „Farbe“ (Entwurf, 10.10.2026)

Live: https://chiaraans.github.io/bombay-freising/fassung-3/ · baut auf Fassung 2 „Laternenlicht“ auf (`/fassung-2/`, unverändert zum Vergleich).

Wunsch der Betreiberin: Die Startseite soll richtig Lust aufs Essen machen; bunte indische Farben (Pink, Orange …), aber nur auf der Bühne, stimmig statt chaotisch; Schrift und Seite weniger statisch.

## Festfarben nur auf der Bühne

- **Pink aus dem Logo** (Magenta der Werbegrafik des Inhabers): Lampe „Jetzt bestellen“, Plus auf den Schildern, Notizen. `--rani`, `--rani-tief`.
- **Rangoli** unter dem Messingtablett: Blütenkranz in Pink, Ringelblumen-Orange, Kurkuma-Gelb, Pfauentürkis mit weißen Punkten. In Indien legt man sie als Willkommen vor die Tür. Dreht sich beim Laden ins Bild und beim Scrollen leicht mit.
- **Ringelblumen-Girlanden** (Genda Phool) zwischen den Laternen der Lichterkette, orange, gelb, einzelne pinke Blüten, unten ein Blatt; wiegen sich mit im Scrollwind.
- **„Heute Lust auf …?“** statt „Willkommen in der Altstadt.“: die vier Gerichte vom Tablett wechseln in ihren Farben (Pink, Orange, Türkis, Chilirot). Von selbst nur zweimal (unter fünf Sekunden), danach mit jedem Stups an eine Laterne. Für Screenreader steht der ganze Satz einmal da.
- Notizen auf kleinen Papierschildchen, damit sie auf der Rangoli lesbar bleiben.

Unterhalb der Bühne bleiben die Farben von Fassung 2.

## Weniger statisch

- Überschriften, Handschriftzeilen und die Bilder von Gastraum und Lehmofen gleiten beim Scrollen herein (0,7 s, aus). Gezeigt wird alles, was im Bild ist oder schon darüber liegt, damit auch bei schnellem Wischen nichts unsichtbar bleibt. Ohne Skript ist alles sofort sichtbar.
- „Beliebt“: beim Darüberfahren rückt der Name ein Stück und färbt sich Kupferbraun.
- Ablauf beim Laden, höchstens drei Bewegungen gleichzeitig: Lichterkette und Titel (0–0,9 s), Tablett und Rangoli (ab 0,9 s), Glanz der App-Tafeln (ab 1,8 s), erster Wortwechsel (2,4 s).

## Geprüft (10.10.2026, lokal)

Detektor `[]` (390 und 1440, alle vier Seiten), keine Überbreite 390/360, Konsole leer, Kontrast über der Grenze (Orange als Wort 4,01:1 bei großer Handschrift, Pink-Lampe 6,65:1, Notizen 6,11:1), Wortwechsel und Stups, Tablett → Bestellzettel, Einblendungen beim Scrollen (alle sichtbar).

Falle beim Prüfen: Playwright mit `clock.setFixedTime` hält auch `requestAnimationFrame` und CSS-Übergänge an; Einblendungen bleiben dann in Aufnahmen unsichtbar. Für Aufnahmen der Bewegung ohne angehaltene Uhr prüfen.

Nicht geprüft: echte Handys, Live-Seite.
