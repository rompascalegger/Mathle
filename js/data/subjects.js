/*
 * Fächer-Register. Jedes Fach verweist auf seine Rohdaten in MATHLE.raw (Fragen, Karten, Mathle-Wörter)
 * und MATHLE.similar (Karten, die nicht als Falsch-Option füreinander dienen sollen).
 * Kapitel-IDs müssen über alle Fächer eindeutig sein (Lernfortschritt wird per ID gespeichert).
 */
window.MATHLE = window.MATHLE || {};
MATHLE.raw = MATHLE.raw || {};
MATHLE.similar = MATHLE.similar || {};

MATHLE.subjects = [
  {
    id: 'la', title: 'Lineare Algebra I', icon: '▦',
    sub: 'Logik · Mengen · Gruppen · Ringe · Matrizen · Gauss',
    basis: 'Skript Lineare Algebra I (Stand 2. November 2026) und Serien 1–8. Seitenangaben wie im Skript gedruckt.',
    raw: 'la', defs: 'laDefs', words: 'laWords',
    bosses: {
      logik: { name: 'Die Sphinx der Logik', icon: '🦁', taunt: 'Wer lügt, wenn alle die Wahrheit sagen?' },
      mengen: { name: 'Die Hydra der Mengen', icon: '🐉', taunt: 'Schlag mir einen Kopf ab – die Potenzmenge wächst nach!' },
      gruppen: { name: 'Die Monstergruppe', icon: '👾', taunt: '808017424794512875886459904961710757005754368000000000 Elemente gegen dich.' },
      ringe: { name: 'Der Nullring', icon: '💍', taunt: 'Bei mir ist 1 = 0. Viel Glück.' },
      matrizen: { name: 'Der Matrix-Golem', icon: '🗿', taunt: 'AB ≠ BA. Gewöhn dich dran.' },
      gauss: { name: 'Der Geist von Gauss', icon: '👻', taunt: 'Bring mich in Zeilenstufenform – wenn du kannst.' }
    }
  },
  {
    id: 'an', title: 'Analysis I', icon: '∫',
    sub: 'Induktion · reelle & komplexe Zahlen · Folgen · Reihen · Stetigkeit',
    basis: 'Skript Analysis I & II (Mitschrift Crippa) und Serien 1–8 mit Lösungen. Seitenangaben wie im Skript gedruckt.',
    raw: 'an', defs: 'anDefs', words: 'anWords',
    bosses: {
      'an-induktion': { name: 'Die Katzenarmee', icon: '🐈', taunt: 'Alle Katzen haben dieselbe Farbe. Beweis mir das Gegenteil!' },
      'an-reell': { name: 'Das unerreichbare Supremum', icon: '👑', taunt: 'Du kommst mir beliebig nahe – aber erreichst du mich?' },
      'an-komplex': { name: 'Die imaginäre Einheit', icon: '🌀', taunt: 'Mich gibt es gar nicht. Oder doch? i² = −1.' },
      'an-folgen': { name: 'Der Epsilon-Dämon', icon: '😈', taunt: 'Für jedes N finde ich ein ε, an dem du scheiterst.' },
      'an-reihen': { name: 'Die harmonische Hydra', icon: '🐍', taunt: 'Ich wachse langsam – aber unendlich.' },
      'an-stetig': { name: 'Die Thomae-Funktion', icon: '🦎', taunt: 'Stetig im Irrationalen, sprunghaft im Rationalen.' }
    }
  },
  {
    id: 'eis', title: 'EiS – Stochastik', icon: '⚄',
    sub: 'W-Räume · Kombinatorik · Bayes · Zufallsvariablen · Verteilungen · Erwartungswert',
    basis: 'Skript „Einführung in die (Wahrscheinlichkeitstheorie und) Statistik" (4. September 2026) und Blätter 1–8. Seitenangaben wie im Skript gedruckt.',
    raw: 'eis', defs: 'eisDefs', words: 'eisWords',
    bosses: {
      'eis-wraum': { name: 'Die σ-Algebra', icon: '🧬', taunt: 'Abgeschlossen unter allem, was du mir entgegenwirfst.' },
      'eis-diskret': { name: 'Der Urnenwächter', icon: '🏺', taunt: 'Mit oder ohne Zurücklegen? Entscheide weise.' },
      'eis-bedingt': { name: 'Reverend Bayes', icon: '🎩', taunt: 'Dein Test ist positiv. Bist du wirklich krank?' },
      'eis-zv': { name: 'Die rechtsstetige Treppe', icon: '📶', taunt: 'Ich springe, wo du es am wenigsten erwartest.' },
      'eis-unabh': { name: 'Die paarweise Täuschung', icon: '🎭', taunt: 'Paarweise unabhängig heisst noch lange nicht unabhängig.' },
      'eis-vert': { name: 'Der Poisson-Fisch', icon: '🐟', taunt: 'Selten, aber verlässlich: λ ist mein Name.' },
      'eis-erw': { name: 'Der Erwartungswert', icon: '⚖️', taunt: 'Im Mittel gewinne ich immer.' },
      'eis-allg': { name: 'Der Chebyshev-Wächter', icon: '🛡️', taunt: 'Weit weg vom Mittel? Höchstens Var/a².' }
    }
  }
];
