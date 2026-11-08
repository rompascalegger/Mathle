# Mathle

Höhere Mathematik spielerisch lernen – Definitionen pauken, Formeln festigen, Bosse besiegen.

| Fach | Grundlage | Inhalt |
| --- | --- | --- |
| ▦ **Lineare Algebra I** | Skript (Stand 2. November 2026), Serien 1–8 | 204 Fragen, 100 Karten, 6 Bosse |
| ∫ **Analysis I** | Skript Analysis I & II (Crippa), Serien 1–8 inkl. Lösungen | 158 Fragen, 78 Karten, 6 Bosse |
| ⚄ **EiS – Stochastik** | Skript (4. September 2026), Blätter 1–8 | 157 Fragen, 68 Karten, 8 Bosse |

Jede Frage und jede Karte nennt die **Skriptseite** (gedruckte Seitenzahl, wie im Inhaltsverzeichnis) und, wo sie aus einer Übung stammt, die **Serienaufgabe**, z.B. `Skript S. 63, Quotientenkriterium · Serie 6, Aufgabe 6.2`.

## Spielmodi

| Modus | Was passiert |
| --- | --- |
| 🗂️ Karteikarten | Definitionen & Formeln aufdecken, ehrlich bewerten (Nochmal / Schwer / Gewusst), Wiederholung nach Leitner-System |
| 🧠 Definitions-Drill | Begriff ↔ Definition zuordnen, Combo-Multiplikator |
| 📆 Tages-Challenge | 10 Fragen pro Tag und Fach, mit Bonus-XP |
| ⚡ Blitzrunde | 60 Sekunden Wahr/Falsch und „Passt die Definition?“, +1/−1 pro Antwort, +3 s alle 5 Treffer |
| ⚔️ Boss-Kämpfe | Ein Boss pro Kapitel, 3 Herzen, Combos und kritische Treffer machen Schaden |
| 🔤 Mathle | Fachbegriff des Tages erraten (Wordle-Prinzip), pro Fach |
| 🩹 Fehler ausbügeln | Falsch beantwortete Fragen erneut üben |

Belohnungen: XP, Level und Ränge, Combo-Multiplikator (bis ×3), zufällige kritische Treffer, Tages-Streak, 3 Tagesquests, Erfolge, Konfetti und Sounds (abschaltbar). XP, Quests und Erfolge gelten fächerübergreifend.

## Starten

Statische Seite ohne Build-Schritt. `index.html` direkt öffnen oder einen lokalen Server starten:

```bash
python -m http.server 8123
```

Dann <http://localhost:8123> öffnen. Formeln werden mit KaTeX (CDN) gesetzt. Der Fortschritt liegt im `localStorage` des Browsers.

## Inhalte erweitern

- `js/data/subjects.js` – Fächer-Register (Titel, Grundlage, Bosse, Verweis auf die Rohdaten)
- `js/data/la.js`, `an.js`, `eis.js` – Fragen (`Q tf | mc | multi | input`) und Mathle-Wörter; Format im Kopf von `la.js`
- `js/data/la-defs.js`, sowie `anDefs`/`eisDefs` in `an.js`/`eis.js` – Karteikarten (`D Begriff :: Definition @ Quelle`, `F Name :: Formel @ Quelle`)
- `MATHLE.similar.<fach>` – Gruppen fast gleichbedeutender Karten, die nie als Falsch-Option füreinander auftauchen

Quellen bitte im Format `Skript S. <Seite>, <Stelle> · Serie <n>, <Aufgabe>` angeben.
Neue Fragen und Karten **am Ende des jeweiligen Kapitels** einfügen: Die IDs ergeben sich aus der Position, sonst geht gespeicherter Lernfortschritt verloren. Kapitel-IDs müssen über alle Fächer eindeutig sein.
