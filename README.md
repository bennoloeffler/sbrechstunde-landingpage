# sBrech-Stunde

**Abkotzen. Ausbrechen. Aufbrechen.**

Eine provokante Sprechstunde rund um ERP, KI, Digitalisierung und Wettbewerbsfähigkeit.
Jeden Freitag, 16:00 - 17:00 Uhr.

**Live:** [bennoloeffler.github.io/sbrechstunde-landingpage](https://bennoloeffler.github.io/sbrechstunde-landingpage/)

## Was ist das?

Den Ärger als Motor nutzen, um zu verstehen wie es wirklich gehen könnte.
Und dann anfangen. Etwas WIRKLICH und WIRKSAM anders machen.
Raus aus dem digitalen Käfig. Rein in echte Nützlichkeit.

## Features

- **Dark Mode Landing Page** mit drei Hero-Bildern im Cross-Fade
- **Interaktive Themen-Pills** (ERP, KI/AI, Digitalisierung, Wettbewerbsfähigkeit) mit Popup-Overlays
- **Automatische Terminliste** - zeigt die nächsten 4 Freitage, deutschlandweite Feiertage werden erkannt und als nicht wählbar markiert
- **Mailto-Anmeldung** - ein Klick öffnet den Mail-Client mit vorausgefülltem Betreff und Terminen
- **Hosted auf GitHub Pages** - kein Build-Schritt, kein Framework

## Tech Stack

- HTML / CSS / JavaScript (vanilla)
- [Tailwind CSS](https://tailwindcss.com/) via CDN
- [Bitter](https://fonts.google.com/specimen/Bitter) (Display Font) + [Inter](https://fonts.google.com/specimen/Inter) (Body Font)
- Bilder von [Unsplash](https://unsplash.com/) und [Pexels](https://www.pexels.com/) (frei nutzbar)

## Lokale Entwicklung

```bash
# Einfach index.html im Browser öffnen - kein Build nötig.
# Oder mit Live Server (VS Code Extension):
# Rechtsklick auf index.html -> "Open with Live Server"
```

## Struktur

```
.
├── index.html          # Single-Page Landing Page
├── css/style.css       # Hero Cross-Fade, Grain, Animationen
├── js/main.js          # Termin-Generator, Feiertags-Filter, Topic-Popups
├── img/                # Platzhalter für lokale Bilder
├── .nojekyll           # GitHub Pages: Jekyll deaktivieren
└── CLAUDE.md           # Kontext für Claude Code
```

## Kontakt

Florian Glöbl - [f.gloebl@g-u-p.de](mailto:f.gloebl@g-u-p.de)
