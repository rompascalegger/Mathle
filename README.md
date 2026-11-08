# Mathle

Höhere Mathematik spielerisch lernen – Definitionen pauken, Formeln festigen, Bosse besiegen.

Aktuell: **Lineare Algebra I** (HS 2026, Skript-Stand 2. November 2026, Serien 1–8).
Bald: **Analysis I** und **EiS** (Einführung in die Stochastik).

## Spielmodi

| Modus | Was passiert |
| --- | --- |
| 🗂️ Karteikarten | 100 Definitionen & Formeln: aufdecken, ehrlich bewerten (Nochmal / Schwer / Gewusst), Wiederholung nach Leitner-System |
| 🧠 Definitions-Drill | Begriff ↔ Definition zuordnen, Combo-Multiplikator |
| 📆 Tages-Challenge | 10 Fragen pro Tag, für alle gleich, mit Bonus-XP |
| ⚡ Blitzrunde | 60 Sekunden Wahr/Falsch und „Passt die Definition?“, +1/−1 wie in Serie 1, +3 s alle 5 Treffer |
| ⚔️ Boss-Kämpfe | Ein Boss pro Kapitel, 3 Herzen, Combos und kritische Treffer machen Schaden |
| 🔤 Mathle | Fachbegriff des Tages erraten (Wordle-Prinzip) |
| 🩹 Fehler ausbügeln | Falsch beantwortete Fragen erneut üben |

Belohnungen: XP, Level und Ränge, Combo-Multiplikator (bis ×3), zufällige kritische Treffer, Tages-Streak, 3 Tagesquests, 22 Erfolge, Konfetti und Sounds (abschaltbar).

## Starten

Statische Seite ohne Build-Schritt. `index.html` direkt öffnen oder einen lokalen Server starten:

```bash
python -m http.server 8123
```

Dann <http://localhost:8123> öffnen. Formeln werden mit KaTeX (CDN) gesetzt. Der Fortschritt liegt im `localStorage` des Browsers.

## Inhalte erweitern

- `js/data/la.js` – Fragen (`Q tf | mc | multi | input`) und Mathle-Wörter, das Format ist im Dateikopf beschrieben
- `js/data/la-defs.js` – Karteikarten (`D Begriff :: Definition @ Quelle`, `F Name :: Formel @ Quelle`)

Neue Fragen und Karten bitte **am Ende des jeweiligen Kapitels** einfügen: Die IDs ergeben sich aus der Position, sonst geht gespeicherter Lernfortschritt verloren.
Für ein neues Fach legt man eine eigene Datendatei an und schaltet den Eintrag in `SUBJECTS` (`js/app.js`) auf `active: true`.
