# Übergabe – Website Restaurant Bombay Freising

Stand 06.10.2026, live auf `main` (PR #1 und #2): https://chiaraans.github.io/bombay-freising/

## Fassungen (10.10.2026)

| Pfad | Inhalt |
|---|---|
| `/` (Repo-Wurzel) | aktuelle Seite = Fassung 1, wird weiter aus `daten/speisekarte.json` geschrieben |
| `fassung-1/` | eingefrorene, eigenständige Kopie vom 07.10.2026 (eigene Bilder und Schriften, `noindex`); wird nicht mehr generiert |
| `fassung-2/` | Entwurf „Laternenlicht“ (`fassung-2/LIESMICH.md`), eigenständig, `noindex`; `karte.mjs` schreibt Speisekarte, „Beliebt“ und den Tisch mit |
| `fassung-3/` | Entwurf „Farbe“ auf Basis von Fassung 2 (`fassung-3/LIESMICH.md`), eigenständig, `noindex`; ebenfalls von `karte.mjs` beschrieben |
| `fassung-5/` | Entwurf „Masala“, ganze Seite neu (`fassung-5/LIESMICH.md`), eigene Schriften Shrikhand und Baloo 2, `noindex`; `karte.mjs` schreibt Karte, „Beliebt“ und die Bühne |

Der Auslieferungs-Workflow kopiert alle `fassung-*`-Ordner mit. Wird eine der Fassungen 2, 3 oder 5 gewählt: ihre Dateien in die Wurzel übernehmen, `noindex` dort entfernen, `DESIGN.md` neu schreiben.

## Was gebaut wurde

| Seite | Inhalt |
|---|---|
| `index.html` | Erster Bildschirm: Chicken-Tikka-Foto der bisherigen Restaurant-Website im Kielbogen (enger Ausschnitt, wärmer; zweiter Bogen in Kupferton dahinter, Preisschild „frisch aus dem Lehmofen · Chicken Tikka · 16,90 € · + Auf den Zettel“), „Heute geöffnet bis …“ in der Kuppelbogen-Plakette, Lieferung ca. 60 min · Abholung ca. 30 min, **ein** Knopf „Jetzt bestellen“ (zur Speisekarte mit Bestellzettel), Telefon zum Reservieren, darunter hervorgehoben die Bombay-App (App Store, Google Play). Danach mittags zuerst „Beliebt im Bombay“, abends zuerst der Gastraum. **Aus der Karte**: vier freigestellte Schalen mit Name und Preis aus `daten/speisekarte.json`, ein Tipp legt das Gericht auf den Bestellzettel. **Essensuhr** als Karte mit Reservierungsbuch: Abholen/Liefern/bei uns essen, heute/morgen, halbstündliche Zeiten (Vergangenes durchgestrichen, Wahl umkringelt); das Ergebnis steht auf einem Bon („Bestellen bis …“), Richtwerte 30/60 min, Öffnungszeiten aus `app.js`, rechnet nur im Browser. Lehmofen mit zwei Gästefotos nebeneinander, Google-Bewertungen mit 4,5 Sternen, „Selbst bewerten“ (Google Maps) und Hinweis nach § 5b UWG, Öffnungszeiten mit Mittagspause und „heute“, Anfahrt, Barrierefreiheit. |
| `speisekarte.html` | 17 Gruppen, 141 Posten, generiert aus `daten/speisekarte.json`. Suche, Filter (vegetarisch, vegan möglich, üblich scharf; gemerkt, funktionieren auch ohne Skript), Gruppen aufklappbar (am Handy zu), „+“ neben jedem Gericht und ein **Bestellzettel** (Menge, Schärfe, Abholen/Liefern, Zeit aus den Öffnungszeiten, Name, Telefon, Adresse, Anmerkung) → fertiger Text per Anruf, Kopieren oder WhatsApp (sobald die Nummer eingetragen ist), Hinweis auf die vier Schärfegrade, Allergenlegende im Wortlaut. |
| `impressum.html`, `datenschutz.html` | Mit den Angaben aus dem Paket; Offenes gelb markiert. |

Warum so: `PRODUCT.md` (Fakten), `DESIGN.md` (Gestaltungssystem), `.impeccable/surfaces/index-html.md` (Richtungsvertrag).

## Gemessen (lokal, Chromium, 06.10.2026)

| Prüfung | Ergebnis |
|---|---|
| Aufnahmen 1440 und 390, mittags und abends, angesehen | ja, `.impeccable/review/` (nicht im Repo) |
| Überbreite 390 und 360 (`breite.mjs`) | `"ok": true` für Startseite und Speisekarte |
| Kontrast (`kontrast.mjs`) | alle geprüften Textstellen über der Grenze. Zwei Meldungen bei 390 px (Uhrzeit in der Plakette, ©) entstehen, weil das Skript dort misst, wo die feste Daumenleiste liegt; Gegenprobe mit ausgeblendeter Leiste: beide auf Holz `#2a140c`, 9,9:1 bzw. 10,2:1 |
| Konsole | leer |
| Verhalten | Filter + Merken, Suche, Leerzustand + Zurücksetzen, Fotoansicht (Pfeile, Esc, Fokus zurück), Menü (Esc), ohne Skript: Gruppen offen, Filter per `:has()` |
| Kein Foto doppelt | geprüft mittags und abends |
| Bildherkunft | alle Raster mit eingebetteter Herkunft (`embed-prompt --scan`: 0 fehlend) |
| Unabhängiger Abschlussprüfer (impeccable) | Urteil „fix“ mit acht Nachbesserungen; Punkte 1–7 als behoben bewertet, Punkt 8 (Begründungen in `DESIGN.md`) danach erledigt, aber nicht erneut vom Prüfer bewertet |
| `DESIGN.md` + `.impeccable/design.json` | vom impeccable-Documenter aus dem gebauten Stand; drei dabei gemeldete Abweichungen behoben (Kupfer als Textfarbe, Übergänge nur noch `transform`/`opacity`, Lotse per `transform`), Schriftgrößen und Bogenradien als Token |

### Detektor gegen die gerenderten Seiten (07.10.2026)

Der Detektor findet in dieser Umgebung von selbst keinen Browser und gibt dann trotzdem `[]` aus (Fehler nur auf stderr). Ältere `[]`-Angaben für URL-Prüfungen sind deshalb nicht belastbar. Richtig so:

```sh
printf '#!/bin/sh\nexec /opt/pw-browsers/chromium-1194/chrome-linux/chrome --no-sandbox "$@"\n' > /tmp/chrome-ns.sh && chmod +x /tmp/chrome-ns.sh
IMPECCABLE_BROWSER=/tmp/chrome-ns.sh .claude/skills/impeccable/scripts/impeccable detect --json --viewport 390x844 http://localhost:8099/index.html …
```

Ergebnis am 07.10.2026 nach den Korrekturen (Versalien-Länge, Zeilenlängen, Markierungs-Abstände, Zeilenhöhe, Grund `#f7f5f2`): `[]` bei 390 × 844 und 1440 × 900 für alle vier Seiten.

Nach dem Umbau am Nachmittag (Bühne mit Preisschild, Essensuhr als Reservierungsbuch und Bon, Lehmofen-Fotos, Sterne): erst zwei Meldungen auf der Startseite (Preisschild mit Haarlinie *und* weitem Schatten; Quellenhinweis der Stimmen ~97 Zeichen je Zeile), beide behoben (Haarlinie weg, `max-width: 36em`), danach wieder `[]` bei 390 × 844 und 1440 × 900 für alle vier Seiten. Überbreite 390/360 und Konsole: sauber (mittags und abends). Kontrast: alles über der Grenze; eine Einzelmessung am Preisschild (Handy) traf wegen der −3°-Drehung einen Punkt neben dem Schild, im Bild liegt die Schrift auf Weiß (17,6:1). Essensuhr in elf Fällen durchgespielt (heute/morgen, Ruhetag Dienstag, nach Küchenschluss, zu knapp, vor Öffnung, Pfeiltasten im Buch), Übergabe an den Bestellzettel (`?wann=1-720`) und Preisschild → `?dazu=39` geprüft.

### Detektor-Meldungen, die früher blieben (begründet)

- `cramped-padding` auf `.buehne`, `.bei-uns`, `.besuch`, `.lotse`: Das sind randlose Bänder; Fotos laufen absichtlich bis an den Rand, die Texte sitzen in `.wrap` mit Seitenrand (16–40 px).

## Nicht geprüft

- **Live-Seite angesehen:** Ausgeliefert ist sie laut GitHub Actions (Lauf „Website auf GitHub Pages ausliefern“, deploy-pages erfolgreich, Pages-Quelle auf „GitHub Actions“ umgestellt). Aus der Arbeitsumgebung ist `chiaraans.github.io` gesperrt; die Live-URL selbst wurde deshalb nicht abgerufen.
- Echte Geräte (iPhone/Android), WhatsApp-/Instagram-WebView, Safari.
- Die Bewegung der Plakette, des Bühnenbilds, des Preisschilds und des Bons (nur Endzustand in Standbildern gesehen).
- Ob „Selbst bewerten“ (Google-Maps-Suche) auf echten Handys direkt im Profil des Bombay landet; google.com ist aus der Arbeitsumgebung nicht abrufbar.
- Ob die App-Links zum richtigen Ziel führen.
- Der WhatsApp-Weg mit echter Nummer: getestet nur mit einer Testnummer im Browser (Link und Text stimmen), nicht auf einem Handy mit WhatsApp.
- „Kopieren“ in der Zwischenablage auf echten Handys.

## Abweichungen von der Norm

- **Bühnenfoto beschnitten und gestimmt:** Für den ersten Bildschirm ist das Chicken-Tikka-Foto enger auf 3:4 zugeschnitten und leicht wärmer gestimmt (Werte in `img/09-chicken-tikka-warm-*.json`). Am Handy rutscht die App-Tafel dadurch unter den ersten Bildschirm; Status, Lieferzeiten, „Jetzt bestellen“ und Telefon bleiben drin (Regel 3). Besser wäre ein eigenes, im Lokal aufgenommenes Foto.
- **Butter Chicken entzerrt:** Das Foto war schräg aufgenommen; es ist für die Reihe „Aus der Karte“ auf eine runde Draufsicht entzerrt und an kleinen Randstellen gespiegelt ergänzt (siehe `img/schale-butter-chicken-*.json`, Frage in `ABNAHME.md`).

- Richtungsvertrag steht nicht als Kommentar im HTML, sondern in `.impeccable/surfaces/index-html.md`: impeccable verbietet, ihn in ausgelieferte Dateien zu schreiben.
- Die alte Streichholz-Fassung wurde ersetzt, nicht unter eigenem Pfad parallel gebaut; der Betreiber hat die Veröffentlichung am 06.10.2026 freigegeben.
- `_config.yml` begrenzt eine Branch-Auslieferung auf die Seitendateien (Sicherheitsnetz, falls die Pages-Quelle je wieder auf „Branch“ steht).

## Offen beim Restaurant

Siehe `ABNAHME.md` (Preise bestätigen, Fotorechte, Impressum, Domain, Mittagstisch, Allergene u. a.).
