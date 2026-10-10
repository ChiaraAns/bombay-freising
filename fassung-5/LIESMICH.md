# Fassung 5 „Masala“ (Entwurf, 10.10.2026)

Live: https://chiaraans.github.io/bombay-freising/fassung-5/

Wunsch der Betreiberin: die ganze Seite komplett neu, hochwertig und catchy; die Startseite soll Lust machen, dort essen zu gehen; Farben an den richtigen Stellen, nicht chaotisch; Schrift nicht statisch. Inhalte und Funktionen bleiben (Speisekarte, Bestellzettel, Essensuhr, Zeiten).

## Neuer Look

- **Schriften** (lokal, OFL, beide von indischen Schriftgestaltern): *Shrikhand* für die großen Momente (Schriftzug „Bombay“, Gerichtname, Überschriften, Preise), *Baloo 2* für alles andere. Keine Versalien mit Sperrung, keine Handschrift mehr.
- **Farben:** tiefes Pink aus dem Logo (`--buehne`, `--rani`) als Hauptfarbe, Kurkuma-Gelb (`--haldi`) für Gerichtnamen, Aufkleber und das Band der Stimmen, Safran (`--kesar`) für Punkte und Flächen, Pfauentürkis (`--mor`); Schrift in dunkler Pflaume (`--tinte`), Grund fast weiß.
- **Signatur:** gebogte Kanten (`--welle`) unter der Bühne, am Kopf der Speisekarte und um das gelbe Band; Wellenstrich unter jeder Überschrift; auf der Bühne ein Jali-Gitter (Steinfenster der Mogul-Bauten) Ton in Ton.
- Formen rund (Tafeln 22 px, Bilder 28 px), Fotos mit weichem Schatten und leicht gekippt bzw. mit Safranfläche dahinter.

## Bühne

Tiefes Pink, „Bombay“ groß als Schriftzug, darunter Indische Küche in der Altstadt Freising und der Öffnungsstatus als Plakette (grüner Punkt, wenn offen). Daneben ein Gericht groß auf einem Farbteller (Butter Chicken auf Türkis, Karahi Paneer auf Pflaume, Dal Makhni auf Kurkuma, Jheenga Curry auf Creme), Dampf darüber, Preis als gelber Aufkleber. „Heute Lust auf …“: der Gerichtname gleitet aus einer Kante herein, Teller und Schale wechseln mit (alle 4,8 s, solange die Bühne zu sehen ist). Kleine Schalen zum Wählen, Knopf zum Anhalten (WCAG 2.2.2); Antippen hält den Wechsel an. „Auf den Zettel“ legt das gezeigte Gericht auf den Bestellzettel. Namen, Beschreibungen und Preise schreibt `werkzeuge/karte.mjs` aus `daten/speisekarte.json` (Marken `schau`, `lust`, `wahl`).

## Geprüft (10.10.2026, lokal)

Detektor `[]` (390 und 1440, alle vier Seiten), keine Überbreite 390/360, Konsole leer, Kontrast über der Grenze (Gelb auf Pink nur für große Schrift, 3,8–4,0:1; kleine Schrift ≥ 4,97:1), Wechsel von selbst / Antippen / Anhalten / Fortsetzen, „Auf den Zettel“ → Bestellzettel, Essensuhr unverändert.

Behoben beim Prüfen: Der Wechsel lief nach dem Antippen weiter, weil die Essensuhr dieselbe Variable `uhr` benutzte (jetzt `takt`).

Nicht geprüft: echte Handys, Live-Seite.
