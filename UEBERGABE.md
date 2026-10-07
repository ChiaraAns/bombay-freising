# Übergabe – Website Restaurant Bombay Freising

Stand 06.10.2026, live auf `main` (PR #1 und #2): https://chiaraans.github.io/bombay-freising/

## Was gebaut wurde

| Seite | Inhalt |
|---|---|
| `index.html` | Erster Bildschirm: Foto (mittags Thali, abends Thali am dunklen Tisch), „Heute geöffnet bis …“ in der Kuppelbogen-Plakette, Lieferung ca. 60 min · Abholung ca. 30 min, **ein** Knopf „Jetzt bestellen“ (zur Speisekarte mit Bestellzettel), Telefon zum Reservieren, darunter hervorgehoben die Bombay-App (App Store, Google Play). Danach mittags zuerst „Beliebt im Bombay“, abends zuerst der Gastraum. **Essensuhr**: Abholen/Liefern/bei uns essen, heute/morgen, Wunschzeit am Regler; sagt, bis wann man bestellen muss (Richtwerte 30/60 min, Öffnungszeiten aus `app.js`), rechnet nur im Browser. Lehmofen, Fotos, Google-Bewertungen mit Hinweis nach § 5b UWG, Öffnungszeiten mit Mittagspause und „heute“, Anfahrt, Barrierefreiheit. |
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

### Detektor-Meldungen, die bleiben (begründet)

- `cramped-padding` auf `.buehne`, `.bei-uns`, `.besuch`, `.lotse`: Das sind randlose Bänder; Fotos laufen absichtlich bis an den Rand, die Texte sitzen in `.wrap` mit Seitenrand (16–40 px).

## Nicht geprüft

- **Live-Seite angesehen:** Ausgeliefert ist sie laut GitHub Actions (Lauf „Website auf GitHub Pages ausliefern“, deploy-pages erfolgreich, Pages-Quelle auf „GitHub Actions“ umgestellt). Aus der Arbeitsumgebung ist `chiaraans.github.io` gesperrt; die Live-URL selbst wurde deshalb nicht abgerufen.
- Echte Geräte (iPhone/Android), WhatsApp-/Instagram-WebView, Safari.
- Die Bewegung der Plakette (nur Endzustand in Standbildern gesehen).
- Ob die App-Links zum richtigen Ziel führen.
- Der WhatsApp-Weg mit echter Nummer: getestet nur mit einer Testnummer im Browser (Link und Text stimmen), nicht auf einem Handy mit WhatsApp.
- „Kopieren“ in der Zwischenablage auf echten Handys.

## Abweichungen von der Norm

- **Bühnenfoto beschnitten:** Das Hochformat-Foto im ersten Bildschirm wird per `object-fit: cover` beschnitten (ca. 28 % bei 390 px, ca. 17 % am Desktop). Sonst passten Status, Lieferzeiten, Knopf und Telefon nicht in den ersten Bildschirm (Regel 3 der `CLAUDE.md` hat hier Vorrang). Der Teller bleibt sichtbar; besser wäre ein eigenes, im Lokal aufgenommenes Querformat.

- Richtungsvertrag steht nicht als Kommentar im HTML, sondern in `.impeccable/surfaces/index-html.md`: impeccable verbietet, ihn in ausgelieferte Dateien zu schreiben.
- Die alte Streichholz-Fassung wurde ersetzt, nicht unter eigenem Pfad parallel gebaut; der Betreiber hat die Veröffentlichung am 06.10.2026 freigegeben.
- `_config.yml` begrenzt eine Branch-Auslieferung auf die Seitendateien (Sicherheitsnetz, falls die Pages-Quelle je wieder auf „Branch“ steht).

## Offen beim Restaurant

Siehe `ABNAHME.md` (Preise bestätigen, Fotorechte, Impressum, Domain, Mittagstisch, Allergene u. a.).
