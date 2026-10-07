# Restaurant Bombay Freising – Website

Indisches Restaurant, Obere Hauptstraße 67, 85354 Freising.
Statische Seite (HTML, CSS, Vanilla JS), ohne Build, ausgeliefert über GitHub Pages.

| Was ändern? | Wo |
|---|---|
| Preise, Gerichte, Kennzeichen | `daten/speisekarte.json`, danach `node werkzeuge/karte.mjs` (macht der Deploy-Workflow auch selbst) |
| Öffnungszeiten | `app.js` (oben) **und** die Tabelle in `index.html` |
| WhatsApp-Nummer für Bestellungen | `app.js` oben, `WHATSAPP` (leer = nur Anrufen/Kopieren); dann in `datenschutz.html` den WhatsApp-Absatz einblenden |
| Gestaltung | `style.css` (alle Werte als Token in `:root`) |
| Impressum, Datenschutz | `impressum.html`, `datenschutz.html` – gelb markierte Stellen vor dem Livegang ausfüllen |

Lokal ansehen: `python3 -m http.server 8099`, dann http://localhost:8099

Weitere Dokumente: `CLAUDE.md` (Arbeitsweise), `PRODUCT.md` (Produktfakten),
`DESIGN.md` (Gestaltungssystem), `ABNAHME.md` (offene Fragen ans Restaurant),
`UEBERGABE.md` (was gebaut und wie geprüft wurde), `recherche/` (Quellen).

**Auslieferung:** Einmalig in den Repo-Einstellungen unter *Pages* die Quelle
auf „GitHub Actions“ stellen. Danach liefert `.github/workflows/deploy-pages.yml`
bei jedem Push auf `main` nur die Seitendateien aus (keine Notizen, keine Recherche, keine Originalfotos).
