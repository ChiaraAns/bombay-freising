# Übergabe – Website Restaurant Bombay Freising

Stand 06.10.2026, Branch `claude/add-impeccable-skill` (PR #1).

## Was gebaut wurde

| Seite | Inhalt |
|---|---|
| `index.html` | Erster Bildschirm: Foto (mittags Thali, abends Thali am dunklen Tisch), „Heute geöffnet bis …“ in der Kuppelbogen-Plakette, Lieferung ca. 60 min · Abholung ca. 30 min, **ein** Knopf „Online bestellen“ (Karvi), Telefon zum Reservieren, App-Links. Danach mittags zuerst „Beliebt im Bombay“, abends zuerst der Gastraum. Lehmofen, Fotos, Google-Bewertungen mit Hinweis nach § 5b UWG, Öffnungszeiten mit Mittagspause und „heute“, Anfahrt, Barrierefreiheit. |
| `speisekarte.html` | 17 Gruppen, 141 Posten, generiert aus `daten/speisekarte.json`. Suche, Filter (vegetarisch, vegan möglich, üblich scharf; gemerkt, funktionieren auch ohne Skript), Gruppen aufklappbar (am Handy zu), „… online bestellen“ am Ende jeder Gruppe, Hinweis auf die vier Schärfegrade, Allergenlegende im Wortlaut. |
| `impressum.html`, `datenschutz.html` | Mit den Angaben aus dem Paket; Offenes gelb markiert. |

Warum so: `PRODUCT.md` (Fakten), `DESIGN.md` (Gestaltungssystem), `.impeccable/surfaces/index-html.md` (Richtungsvertrag).

## Gemessen (lokal, Chromium, 06.10.2026)

| Prüfung | Ergebnis |
|---|---|
| Aufnahmen 1440 und 390, mittags und abends, angesehen | ja, `.impeccable/review/` (nicht im Repo) |
| Überbreite 390 und 360 (`breite.mjs`) | `"ok": true` für Startseite und Speisekarte |
| Kontrast (`kontrast.mjs`) | alle geprüften Textstellen über der Grenze; eine Meldung am © bei 390 px war die feste Daumenleiste während der Messung (der Fuß hält 112 px Abstand) |
| Konsole | leer |
| Verhalten | Filter + Merken, Suche, Leerzustand + Zurücksetzen, Fotoansicht (Pfeile, Esc, Fokus zurück), Menü (Esc), ohne Skript: Gruppen offen, Filter per `:has()` |
| Kein Foto doppelt | geprüft mittags und abends |
| Bildherkunft | alle Raster mit eingebetteter Herkunft (`embed-prompt --scan`: 0 fehlend) |
| Unabhängiger Abschlussprüfer (impeccable) | zwei Runden; acht Nachbesserungen umgesetzt, sieben bewertet als behoben, die achte ist `DESIGN.md` |

### Detektor-Meldungen, die bleiben (begründet)

- `cramped-padding` auf `.buehne`, `.bei-uns`, `.besuch`, `.lotse`: Das sind randlose Bänder; Fotos laufen absichtlich bis an den Rand, die Texte sitzen in `.wrap` mit Seitenrand (16–40 px).

## Nicht geprüft

- **Live-Auslieferung:** Der Stand liegt auf dem PR-Branch. Live ist er erst nach dem Zusammenführen in `main` **und** nachdem unter *Settings → Pages* die Quelle auf „GitHub Actions“ steht. Danach die Live-URL abrufen.
- Echte Geräte (iPhone/Android), WhatsApp-/Instagram-WebView, Safari.
- Die Bewegung der Plakette (nur Endzustand in Standbildern gesehen).
- Ob die Karvi- und App-Links zum richtigen Ziel führen (am Ruhetag lud die Bestellstrecke nicht).

## Abweichungen von der Norm

- Richtungsvertrag steht nicht als Kommentar im HTML, sondern in `.impeccable/surfaces/index-html.md`: impeccable verbietet, ihn in ausgelieferte Dateien zu schreiben.
- Die alte Streichholz-Fassung wurde ersetzt, nicht unter eigenem Pfad parallel gebaut: Der neue Stand lebt bis zur Abnahme auf dem PR-Branch und ist nicht live.

## Offen beim Restaurant

Siehe `ABNAHME.md` (Preise bestätigen, Fotorechte, Impressum, Domain, Mittagstisch, Allergene u. a.).
