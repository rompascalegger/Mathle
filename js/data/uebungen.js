/*
 * Katalog aller Übungsaufgaben (Lineare Algebra I, Analysis I, EiS), kategorisiert.
 * Die Aufgaben sind in eigenen Worten zusammengefasst (keine Kopie der Blätter).
 *
 * Format:
 *   # fach serie                       (fach: la | an | eis)
 *   A Nr | Titel | typ1,typ2 | kapitel-id | Stufe | generator
 *   ? Kurzbeschreibung der Aufgabe
 *   L Ergebnis bzw. Lösungsidee
 *   S Skriptstelle
 */
window.MATHLE = window.MATHLE || {};
MATHLE.raw = MATHLE.raw || {};

/* Aufgabentypen: id, Name, Symbol, Beschreibung, typisches Vorgehen */
MATHLE.aufgabenTypen = [
  { id: 'tf', name: 'Aussagen beurteilen', icon: '⚖️', desc: 'Mehrere Aussagen sind als wahr oder falsch zu entscheiden und kurz zu begründen.', how: 'Definition genau lesen; wahr ⇒ kurzer Beweis, falsch ⇒ ein konkretes Gegenbeispiel.' },
  { id: 'logik', name: 'Logik & Negation', icon: '🔀', desc: 'Aussagen verneinen, Quantoren und Implikationen verstehen, Logikrätsel.', how: '$\\forall \\leftrightarrow \\exists$ tauschen, De Morgan, $\\neg(P \\Rightarrow Q) = P \\land \\neg Q$.' },
  { id: 'induktion', name: 'Induktionsbeweis', icon: '🪜', desc: 'Summen-, Produkt-, Ungleichungs- oder Teilbarkeitsaussagen für alle natürlichen Zahlen.', how: 'Verankerung prüfen (Startwert beachten!), dann aus $A(n)$ auf $A(n+1)$ schliessen.' },
  { id: 'beweis', name: 'Beweis einer Aussage', icon: '✍️', desc: 'Allgemeine Aussage aus Definitionen herleiten (direkt, per Widerspruch oder Kontraposition).', how: 'Voraussetzungen und Ziel formal aufschreiben, Definitionen einsetzen, Schritt für Schritt umformen.' },
  { id: 'gegenbsp', name: 'Beispiel / Gegenbeispiel', icon: '🎯', desc: 'Ein Objekt mit (oder ohne) einer bestimmten Eigenschaft konstruieren.', how: 'Mit kleinen, einfachen Beispielen beginnen (Nullmatrix, konstante Abbildung, $(-1)^n$ …).' },
  { id: 'mengen', name: 'Mengen & Ereignisse beschreiben', icon: '🧩', desc: 'Mengenoperationen, Elementanzahlen, Ereignisse in Mengenschreibweise, Mengen in $\\mathbb{C}$.', how: 'Elementweise argumentieren; Gleichungen wie $|z - a| = |z - b|$ quadrieren.' },
  { id: 'abbildung', name: 'Abbildungen & Mächtigkeit', icon: '🗺️', desc: 'Injektivität, Surjektivität, Bilder/Urbilder, Verkettungen, Abzählbarkeit.', how: 'Definitionen von injektiv/surjektiv anwenden; für Abzählbarkeit Bijektionen oder Diagonalargument.' },
  { id: 'axiome', name: 'Axiome & Strukturen prüfen', icon: '🏛️', desc: 'Gruppe, Untergruppe, Homomorphismus, Ring, Körper, $\\sigma$-Algebra, W-Mass, Verteilungsfunktion, Dichte.', how: 'Jedes Axiom einzeln prüfen; für „nein" genügt ein verletztes Axiom mit Beispiel.' },
  { id: 'kombinatorik', name: 'Abzählen & Kombinatorik', icon: '🎲', desc: 'Anzahlen von Anordnungen, Teilmengen, Abbildungen; Schubfachprinzip; Identitäten für Binomialkoeffizienten.', how: 'Geordnet/ungeordnet, mit/ohne Wiederholung unterscheiden; Schubfächer geschickt wählen.' },
  { id: 'rechnen', name: 'Konkrete Rechnung', icon: '🧮', desc: 'Polynome, Matrizen, Determinanten, komplexe Zahlen, Gruppentafeln explizit ausrechnen.', how: 'Sauber nach Definition rechnen und das Ergebnis mit einer Probe kontrollieren.' },
  { id: 'lgs', name: 'Gleichungssysteme & Gauss', icon: '📐', desc: 'Zeilenstufenform, Lösungsmengen, Lösbarkeit mit Parameter, Inverse per Zeilenumformungen.', how: 'Gauss-Verfahren; Lösbarkeit über Nullzeilen; Lösung = spezielle Lösung + homogene Lösungen.' },
  { id: 'schranken', name: 'Supremum & Infimum', icon: '📏', desc: 'Schranken, Sup/Inf, Max/Min, Intervallschachtelungen.', how: 'Menge vereinfachen (Ungleichungen lösen), dann Kandidaten prüfen: Schranke? kleinste? angenommen?' },
  { id: 'grenzwert', name: 'Grenzwerte von Folgen', icon: '📉', desc: 'Grenzwerte berechnen, Konvergenz in Abhängigkeit eines Parameters, rekursive Folgen.', how: 'Dominanten Term ausklammern, erweitern, Sandwich, Standardgrenzwerte $\\sqrt[n]{n} \\to 1$.' },
  { id: 'reihen', name: 'Reihen: Konvergenz & Summe', icon: '➕', desc: 'Konvergenz von Reihen entscheiden oder ihre Summe berechnen.', how: 'Nullfolge? Dann Majorante/Minorante, Quotienten-, Wurzel-, Leibniz-Kriterium; Summen per Teleskop oder geometrisch.' },
  { id: 'potenzreihe', name: 'Potenzreihen', icon: '⭕', desc: 'Konvergenzradius und Verhalten auf dem Rand.', how: 'Cauchy-Hadamard oder Quotientenformel; Rand separat untersuchen.' },
  { id: 'stetigkeit', name: 'Funktionen & Stetigkeit', icon: '〰️', desc: 'Bild, Umkehrfunktion, Verkettung, Stetigkeit, Zwischenwertsatz, punktweise Grenzwerte.', how: '$\\varepsilon$-$\\delta$ oder Folgenkriterium; Zwischenwertsatz für Existenz von Nullstellen.' },
  { id: 'modell', name: 'W-Raum modellieren', icon: '🏗️', desc: 'Zu einem Zufallsexperiment Grundraum, Ereignisse und Wahrscheinlichkeitsmass angeben.', how: 'Ergebnisse als Tupel/Mengen beschreiben; prüfen, ob Laplace-Annahme gerechtfertigt ist.' },
  { id: 'wkeit', name: 'Wahrscheinlichkeiten berechnen', icon: '🎰', desc: 'Laplace, Urnen, Rechenregeln für $P$, Binomial-/hypergeometrische Rechnungen.', how: 'Günstige durch mögliche Fälle; Gegenereignis; Additionssatz.' },
  { id: 'bedingt', name: 'Bedingte Wahrscheinlichkeit & Bayes', icon: '🔁', desc: 'Bedingte Wahrscheinlichkeiten, totale Wahrscheinlichkeit, Bayessche Regel.', how: 'Baumdiagramm / Zerlegung aufschreiben, dann Bayes: $P(B \\mid A) = \\frac{P(A \\mid B)P(B)}{P(A)}$.' },
  { id: 'verteilung', name: 'Verteilungen, Verteilungsfunktion, Dichte', icon: '📊', desc: 'Verteilung einer Zufallsvariable bestimmen, Verteilungsfunktion/Dichte prüfen oder berechnen.', how: '$F_X(x) = P(X \\le x)$ ausrechnen; Dichte: $f \\ge 0$, $\\int f = 1$, $f = F\'$.' },
  { id: 'unabh', name: 'Unabhängigkeit', icon: '🔗', desc: 'Unabhängigkeit von Ereignissen oder Zufallsvariablen prüfen; Zuverlässigkeit von Schaltungen.', how: 'Produktformel für alle Teilmengen prüfen (bei drei Ereignissen vier Gleichungen).' },
  { id: 'kennzahl', name: 'Erwartungswert, Varianz, Kovarianz', icon: '📐', desc: 'Kennzahlen konkreter Verteilungen und Summen berechnen.', how: 'Linearität von $E$; $\\mathrm{Var} = E(X^2) - (EX)^2$; Varianzen unabhängiger Summanden addieren.' },
  { id: 'ungleichung', name: 'Abschätzungen', icon: '🛡️', desc: 'Markov- und Chebyshev-Ungleichung, Stichprobengrösse.', how: 'Voraussetzungen prüfen ($X \\ge 0$ bei Markov); Abweichung als $|X - EX| \\ge a$ schreiben.' }
];

MATHLE.raw.uebungen = String.raw`
# la 1
A S1 | Wahr oder falsch: Grundlagen und Implikationen | tf,logik | logik | Basis | bank:logik
? Sechs Aussagen beurteilen: binomische Formel für $(a+b)^3$, Existenz von $a, b$ mit $(a+b)^2 = a^2 + b^2$, Wert von $0!$, eine Aussage über die Anzahl wahrer Aussagen und zwei Implikationen.
L (i) wahr, (ii) wahr ($a = 0$), (iii) falsch ($0! = 1$), (iv) wahr (genau zwei der ersten drei sind wahr), (v) wahr (falsche Prämisse), (vi) wahr (wahre Konklusion).
S Skript S. 4–5, Abschnitt 1.1

A S2 | Teilmengen und verschachtelte Mengen | mengen,kombinatorik | mengen | Basis | sets-count
? Alle Teilmengen einer 4-elementigen Menge auflisten; die Anzahl der Elemente verschachtelter Mengen mit $\emptyset$ bestimmen.
L 16 Teilmengen. Anzahlen: $\emptyset$: 0, $\{\emptyset\}$: 1, $\{\emptyset, \emptyset\}$: 1, $\{\emptyset, \{\emptyset\}\}$: 2, $\{\{\emptyset\}\}$: 1, $\{\{\emptyset\}, \mathbb{R}\}$: 2.
S Skript S. 9, Bsp. 1.6

A S3 | Schubfachprinzip: gemeinsamer Geburtstag | beweis,kombinatorik | logik | Basis | pigeon
? Bei 13 263 Studierenden zeigen, dass mindestens 37 am selben Tag Geburtstag haben.
L $366 \cdot 36 = 13176 \lt 13263$: Ein Tag muss mindestens 37 Personen haben.
S Skript S. 14, Bsp. 1.24(iii)

A S4 | De Morgan an einem Beispiel | logik | logik | Basis | negation
? Mit zwei konkreten Aussagen $P, Q$ erklären, warum $\neg(P \land Q)$ dasselbe ist wie $(\neg P) \lor (\neg Q)$.
L „Nicht (beides)" heisst: mindestens eine der beiden Aussagen ist falsch.
S Skript S. 5, Abschnitt 1.1

A E1 | Komplement eines Schnitts | beweis,mengen | mengen | Ergänzung | proof:sets
? Für $A, B \subseteq M$ beweisen: $M \setminus (A \cap B) = (M \setminus A) \cup (M \setminus B)$; Bezug zu S4 erkennen.
L Beide Inklusionen elementweise; es ist die Mengenversion von De Morgan.
S Skript S. 10, Def. 1.9

A E2 | Schubfachprinzip: Paar mit Summe 9 | beweis,kombinatorik | logik | Ergänzung | pigeon
? Unter fünf verschiedenen Zahlen aus $\{1, \dots, 8\}$ gibt es zwei mit Summe 9.
L Vier Schubfächer $\{1,8\}, \{2,7\}, \{3,6\}, \{4,5\}$ für fünf Zahlen.
S Skript S. 14, Bsp. 1.24(iii)

A E3 | Drei Personen: gleiche oder lauter verschiedene Schulen | beweis,kombinatorik | logik | Ergänzung | pigeon
? Unter sechs Personen gibt es drei, die alle dieselbe Schule besucht haben oder alle verschiedene.
L Hat eine Schule mindestens drei, fertig. Sonst höchstens zwei pro Schule, also mindestens drei Schulen – je eine Person daraus wählen.
S Skript S. 14, Bsp. 1.24(iii)

A E4 | Induktion: Summe der Kuben | induktion | logik | Ergänzung | induktion
? Per Induktion ab $n = 0$: $\sum_{k=1}^n k^3 = \frac{n^2(n+1)^2}{4}$ und $1^3 + \dots + n^3 = (1 + \dots + n)^2$.
L Verankerung: leere Summe $= 0$. Schritt: $\frac{n^2(n+1)^2}{4} + (n+1)^3 = \frac{(n+1)^2(n+2)^2}{4}$.
S Skript S. 5–6, Lemma 1.1 (leere Summe)

# la 2
A S1 | Negationen formulieren | logik | logik | Basis | negation
? Vier Aussagen mit „jede", „es gibt" und „oder" verneinen.
L Quantoren tauschen, „oder" wird „und"; z.B. „Es gibt eine rationale Zahl, die nicht reell ist."
S Skript S. 5, Abschnitt 1.1

A S2 | Mengenoperationen und injektive Abbildungen | mengen,abbildung,kombinatorik | mengen | Basis | maps-count
? Zwei 6-elementige Mengen: Vereinigung, Schnitt, kartesisches Produkt; Anzahl injektiver Abbildungen; jede injektive Abbildung ist surjektiv.
L Schnitt leer, $\#(M \times N) = 36$, $6! = 720$ Injektionen; das Bild hat 6 Elemente, also ganz $N$.
S Skript S. 10–13, Def. 1.9, 1.11, 1.19

A S3 | Folge ganzer Zahlen per Induktion bestimmen | induktion,beweis | logik | Basis | induktion
? Für ganze $a_n \ge 0$ mit $n \le \sum_{k=1}^n a_k^2 \le n + 1 + (-1)^n$ zeigen, dass alle $a_n = 1$.
L Starke Induktion: Aus $a_1 = \dots = a_{n-1} = 1$ folgt $1 \le a_n^2 \le 2 + (-1)^n \le 3$, also $a_n = 1$.
S Skript S. 5, Lemma 1.1

A E1 | Induktionsschritt ohne Verankerung | induktion,logik | logik | Ergänzung | bank:logik
? $P(n)$: „$n^2 + 5n + 1$ ist gerade". $P(n) \Leftrightarrow P(n+1)$ zeigen; gibt es ein $n$ mit $P(n)$?
L Die Differenz $2n + 6$ ist gerade, also gilt die Äquivalenz. Aber $n(n+5)$ ist stets gerade, also $P(n)$ nie wahr.
S Skript S. 7, Def. 1.3, Lemma 1.4

A E2 | Bilder von Vereinigung und Schnitt | beweis,abbildung,gegenbsp | mengen | Ergänzung | proof:images
? $f(A \cup B) = f(A) \cup f(B)$, $f(A \cap B) \subseteq f(A) \cap f(B)$, Gleichheit für injektives $f$, und ein Beispiel mit echter Inklusion.
L Gegenbeispiel: $f$ konstant, $A = \{1\}$, $B = \{2\}$.
S Skript S. 12–13, Def. 1.16, 1.19

A E3 | Anzahl aller Abbildungen | beweis,kombinatorik,abbildung | mengen | Ergänzung | maps-count
? Es gibt genau $n^m$ Abbildungen von einer $m$- in eine $n$-elementige Menge (mit $0^0 = 1$).
L Induktion nach $m$: jedes neue Element hat $n$ mögliche Bilder.
S Skript S. 14, nach Def. 1.23

# la 3
A S1 | Injektivität und Surjektivität konkreter Abbildungen | abbildung | mengen | Basis | maps-table
? Drei Abbildungen zwischen einer 4- und einer 5-elementigen Menge (als Wertetabellen) und drei Verkettungen untersuchen.
L $f$: weder noch; $g$: injektiv, nicht surjektiv; $h$: surjektiv, nicht injektiv; die drei Verkettungen sind weder injektiv noch surjektiv.
S Skript S. 13, Def. 1.19

A S2 | Gruppenaxiome für $d(a, b) = b - a$ | axiome | gruppen | Basis | group-axioms
? Auf $\mathbb{Q}$ mit $e = 0$ und $d(a, b) = b - a$ prüfen, welche Gruppenaxiome gelten.
L (N) und (I) gelten, (A) nicht: $d(d(a,b),c) = c - b + a$, $d(a, d(b,c)) = c - b - a$.
S Skript S. 16, Def. 1.26

A S3 | Surjektive Selbstabbildung endlicher Mengen | beweis,abbildung | mengen | Basis | proof:maps
? Ist $M$ endlich und $f: M \to M$ surjektiv, so ist $f$ injektiv.
L Zwei gleiche Werte würden das Bild auf weniger als $\#M$ Elemente verkleinern.
S Skript S. 15, Def. 1.25

A E1 | Verkettung injektiver bzw. surjektiver Abbildungen | beweis,abbildung | mengen | Ergänzung | proof:maps
? $g \circ f$ ist injektiv (surjektiv), wenn $f$ und $g$ es sind.
L Definition zweimal anwenden.
S Skript S. 13–14, Bem. 1.20

A E2 | Symmetrische Differenz als Gruppe | beweis,axiome,mengen | mengen | Ergänzung | proof:sets
? Assoziativität von $\triangle$, $\emptyset \triangle A = A$, $A \triangle A = \emptyset$; daraus $(\mathcal{P}(M), \emptyset, \triangle)$ abelsche Gruppe.
L $x$ liegt in $(A \triangle B) \triangle C$ genau dann, wenn es in ungerade vielen der drei Mengen liegt.
S Skript S. 16, Def. 1.26

A E3 | Gruppentafel mit drei Elementen | axiome,rechnen | gruppen | Ergänzung | group3
? In einer Gruppe $\{x, y, z\}$ ist nur $m(y, z) = z$ bekannt. Neutrales Element bestimmen, Tafel vervollständigen.
L Kürzen: $y$ ist neutral. Dann $xx = z$, $xz = zx = y$, $zz = x$.
S Skript S. 20, Lemma 1.30; S. 25, Bem. 1.43

A F1 | Gruppe mit $n$ Elementen | gegenbsp,axiome | gruppen | Freiwillig | table-mod
? Für jedes $n \in \mathbb{N}$ eine Gruppe mit genau $n$ Elementen angeben.
L $\{0, \dots, n - 1\}$ mit Addition modulo $n$.
S Skript S. 25, Bem. 1.43

A F2 | Abelsche Struktur auf beliebiger Menge | beweis | gruppen | Freiwillig | proof:groups
? Auf jeder Menge $G$ mit gegebenem $e \in G$ gibt es eine Verknüpfung, die eine abelsche Gruppe ergibt.
L Endlich: Struktur von $\{0, \dots, n-1\}$ (Addition modulo $n$, $e \mapsto 0$) übertragen; unendliche Mengen brauchen mehr Mengenlehre.
S Skript S. 16, Def. 1.26

A F3 | Gespiegelte Verknüpfung | beweis,axiome | gruppen | Freiwillig | proof:groups
? Mit $a \circ b := b * a$ ist $(G, e, \circ)$ wieder eine Gruppe.
L Assoziativität überträgt sich; $e$ und Inverse sind beidseitig (Lemma 1.30).
S Skript S. 20, Lemma 1.30

A F4 | Kleine Gruppen sind abelsch | beweis | gruppen | Freiwillig | proof:groups
? Jede Gruppe mit höchstens fünf Elementen ist abelsch.
L Fallunterscheidung über die möglichen Tafeln (Tabelle in Bem. 1.43: erste nicht-abelsche Gruppe hat 6 Elemente).
S Skript S. 25–26, Bem. 1.43

A F5 | Tafel aus E3 prüfen | axiome | gruppen | Freiwillig | group3
? Nachweisen, dass die Tafel aus E3 eine abelsche Gruppe definiert.
L Sie entspricht der Addition modulo 3 ($y \mapsto 0$, $x \mapsto 1$, $z \mapsto 2$).
S Skript S. 18, Bsp. 1.29

A F6 | Bijektion $\mathbb{Z} \to \mathbb{Q}$ | beweis,abbildung | mengen | Freiwillig | proof:countable
? Eine bijektive Abbildung $\mathbb{Z} \to \mathbb{Q}$ konstruieren.
L Brüche diagonal ohne Doppelte abzählen und mit einer Bijektion $\mathbb{Z} \to \mathbb{N}$ verketten.
S Skript S. 14, Bsp. 1.24(iv)

A F7 | Bijektion $\mathbb{R}^m \to \mathbb{R}^n$ | beweis,abbildung | mengen | Freiwillig | proof:countable
? Es gibt Bijektionen $\mathbb{R}^m \to \mathbb{R}^n$ für alle $m, n \ge 1$.
L Ziffern verschränken bzw. Injektionen in beide Richtungen und F10 benutzen.
S Skript S. 14, Bsp. 1.24(iv)

A F8 | Keine Injektion $\mathcal{P}(M) \to M$ | beweis | mengen | Freiwillig | proof:countable
? Es gibt keine injektive Abbildung von der Potenzmenge in $M$.
L Diagonalargument mit der Menge $\{x : x \notin g(x)\}$.
S Skript S. 14, Bsp. 1.24

A F9 | Keine Injektion $\mathbb{R} \to \mathbb{Z}$ | beweis | mengen | Freiwillig | proof:countable
? Es gibt keine injektive Abbildung $\mathbb{R} \to \mathbb{Z}$.
L Sonst wäre $\mathbb{R}$ abzählbar – Widerspruch zum Diagonalargument.
S Skript S. 14, Bsp. 1.24

A F10 | Injektionen in beide Richtungen ergeben eine Bijektion | beweis | mengen | Freiwillig | proof:countable
? Gibt es Injektionen $M \to N$ und $N \to M$, so gibt es eine Bijektion $M \to N$.
L Ketten der Elemente unter abwechselnder Anwendung beider Injektionen betrachten.
S Skript S. 13, Def. 1.19

# la 4
A S1 | Induktion: $3^n \gt n + 6$ | induktion | logik | Basis | induktion
? Per Induktion $3^n \gt n + 6$ für alle $n \ge 2$.
L $9 \gt 8$; Schritt $3^{n+1} \gt 3(n + 6) \ge n + 7$.
S Skript S. 5, Lemma 1.1

A S2 | Homo- und Isomorphismen | tf,axiome | gruppen | Basis | homomorphism
? Vier Abbildungen auf $(\mathbb{R}, 0, +)$ bzw. $(\mathbb{R} \setminus \{0\}, 1, \cdot)$ als Homo-/Isomorphismus beurteilen.
L $a \mapsto a - 1$: nein; $a \mapsto 2026a$ (additiv): Isomorphismus; $a \mapsto 2026a$ (multiplikativ): nein; $a \mapsto a^{2026}$: Homomorphismus, aber nicht injektiv.
S Skript S. 22, Def. 1.34

A S3 | Untergruppen von $(\mathbb{R} \setminus \{0\}, \cdot)$ | axiome | gruppen | Basis | subgroup
? Vier Teilmengen auf die Untergruppen-Eigenschaft prüfen.
L $\{2^a3^b\}$: ja; $(-\infty, 0)$: nein; $\mathbb{Z} \setminus \{0\}$: nein; $\mathbb{Q} \setminus \{0\}$: ja.
S Skript S. 24, Def. 1.40

A S4 | Axiome an einer Verknüpfungstafel | axiome | gruppen | Basis | table-mod
? Für die Tafel der Addition modulo 4 auf $\{0, 1, 2, 3\}$ die Axiome (N), (I), (K), (A) prüfen.
L Alle gelten: neutral $0$, Inverse $0, 3, 2, 1$, Tafel symmetrisch, (A) über Rechnen modulo 4.
S Skript S. 16, Def. 1.26

A E1 | Verschobene Addition | beweis,axiome | gruppen | Ergänzung | group-shift
? $(\mathbb{R}, x, \star)$ mit $a \star b = a + b - x$ ist eine abelsche Gruppe.
L Neutral $x$, Inverses $2x - a$.
S Skript S. 16, Def. 1.26

A E2 | $a^2 = e$ erzwingt Kommutativität | beweis | gruppen | Ergänzung | proof:groups
? Gilt $aa = e$ für alle $a$, so ist die Gruppe abelsch.
L $ab = (ab)^{-1} = b^{-1}a^{-1} = ba$.
S Skript S. 21, Def. 1.31

A E3 | Inverses eines Produkts | beweis | gruppen | Ergänzung | proof:groups
? $(ab)^{-1} = b^{-1}a^{-1}$; Inversion ist genau dann ein Homomorphismus, wenn $G$ abelsch ist.
L Nachrechnen; Homomorphismus heisst $b^{-1}a^{-1} = a^{-1}b^{-1}$ für alle $a, b$.
S Skript S. 21–22, Def. 1.31, 1.34

A E4 | Der Ring $\mathbb{Z}[\sqrt2]$ | beweis,axiome | ringe | Ergänzung | proof:rings
? $\{a + b\sqrt2 : a, b \in \mathbb{Z}\}$ enthält 0 und 1, ist abgeschlossen und ein kommutativer Ring.
L $(a + b\sqrt2)(c + d\sqrt2) = (ac + 2bd) + (ad + bc)\sqrt2$; die Axiome erbt man von $\mathbb{R}$.
S Skript S. 27, Def. 1.44

A F1 | Bijektion $\mathbb{R} \to \mathcal{P}(\mathbb{N})$ | beweis | mengen | Freiwillig | proof:countable
? Eine Bijektion zwischen $\mathbb{R}$ und der Potenzmenge von $\mathbb{N}$.
L Binärdarstellungen liefern Injektionen in beide Richtungen; dann Serie 3, F10.
S Skript S. 14, Bsp. 1.24

A F2 | Gruppe auf $\mathbb{R}$ mit $a \bullet a = 0$ | beweis,gegenbsp | gruppen | Freiwillig | proof:groups
? Auf $\mathbb{R}$ eine abelsche Gruppenstruktur mit $a \bullet a = 0$ finden.
L Die Gruppe $(\mathcal{P}(\mathbb{N}), \triangle)$ über die Bijektion aus F1 übertragen.
S Skript S. 16, Def. 1.26

A F3 | Nicht isomorph zu $(\mathbb{R}, +)$ | beweis | gruppen | Freiwillig | proof:groups
? Diese Gruppe ist nicht isomorph zu $(\mathbb{R}, 0, +)$.
L In $(\mathbb{R}, +)$ gilt $a + a = 0$ nur für $a = 0$; Isomorphismen erhalten diese Eigenschaft.
S Skript S. 22, Def. 1.34

# la 5
A S1 | Produkt zweier Gruppen | beweis,axiome | gruppen | Basis | proof:groups
? $G \times G'$ mit komponentenweiser Verknüpfung ist eine Gruppe; abelsch genau dann, wenn beide Faktoren es sind.
L Axiome komponentenweise; für „⇒" Paare der Form $(a, e')$ vergleichen.
S Skript S. 16, Def. 1.26

A S2 | Polynome multiplizieren | rechnen | ringe | Basis | poly
? Zwei Produkte in $\mathbb{Q}[X]$ in Normalform bringen.
L $X^3 - 8X^2 + 19X - 12$ und $X^6 - 1$.
S Skript S. 28, Bsp. 1.47(iii)

A S3 | Ringe und Körper | tf,gegenbsp | ringe | Basis | bank:ringe
? Vier Aussagen über Körper und kommutative Ringe, u.a. „nullteilerfrei ⇒ Körper".
L wahr, wahr, falsch ($\mathbb{Z}$), falsch ($\mathbb{Z}$).
S Skript S. 30, Def. 1.49

A S4 | Distributivgesetz im Polynomring | beweis,axiome | ringe | Basis | proof:rings
? $A(B + C) = AB + AC$ in $R[X]$ koeffizientenweise nachweisen.
L Koeffizient von $X^k$: $\sum_{i+j=k} a_i(b_j + c_j) = \sum a_ib_j + \sum a_ic_j$.
S Skript S. 28, Bsp. 1.47(iii)

A E1 | Paare mit komplexer Multiplikation | beweis,axiome,rechnen | ringe | Ergänzung | complex-pairs
? Auf $R \times R$ mit $(a,b)(c,d) = (ac - bd, ad + bc)$ alle Ringaxiome prüfen; $i = (0, 1)$ erfüllt $i^2 = (-1, 0)$.
L Assoziativität und Distributivität ausrechnen; $(0,1)(0,1) = (-1, 0)$.
S Skript S. 27, Def. 1.44

A E2 | Körper mit drei Elementen | rechnen,beweis | ringe | Ergänzung | field-p
? Tafeln für $+$ und $\cdot$ in $\{0, 1, \alpha\}$ begründen; $(x+y)^3 = x^3 + y^3$ und $x^3 = x$.
L $1 + 1 = \alpha$, $1 + \alpha = 0$, $\alpha + \alpha = 1$, $\alpha^2 = 1$; Charakteristik 3.
S Skript S. 31, Bsp. 1.52; S. 34, Def. 1.57

A F1 | Existenz eines Körpers mit drei Elementen | beweis,axiome | ringe | Freiwillig | field-p
? Zeigen, dass die Tafeln aus E2 wirklich einen Körper definieren.
L Es ist das Rechnen modulo 3.
S Skript S. 30, Def. 1.49

A F2 | Kommutativität der Addition folgt | beweis | ringe | Freiwillig | proof:rings
? Verlangt man alle Ringaxiome ausser der Kommutativität der Addition, so folgt diese trotzdem.
L $(1 + 1)(a + b)$ auf zwei Arten ausmultiplizieren und kürzen.
S Skript S. 27, Def. 1.44

A F3 | Von einem Element erzeugt, $b^5 = 1$ | beweis | gruppen | Freiwillig | proof:groups
? Wird $G$ von einem Element erzeugt und gilt $b^5 = 1$ für alle $b$, so ist $G$ endlich.
L Jedes Element ist $a^k$ mit $0 \le k \le 4$.
S Skript S. 21, Lemma 1.33

A F4 | Zwei Erzeuger, $c^5 = 1$ – endlich? | beweis | gruppen | Freiwillig | proof:groups
? Ist eine von zwei Elementen erzeugte Gruppe mit $c^5 = 1$ für alle $c$ notwendig endlich?
L Das ist eine bekannte offene Frage der Gruppentheorie (die Gruppe $B(2,5)$) – die Antwort ist nicht bekannt.
S Skript S. 26, Ausblick nach Bem. 1.43

# la 6
A S1 | Matrixprodukte und -summen | rechnen | matrizen | Basis | matmul
? Vier Matrizen ($2\times3$, $3\times3$, $2\times2$, $2\times1$): alle definierten Produkte und Summen finden und berechnen.
L Produkte $AB$, $BB$, $CA$, $CC$, $CD$; Summen nur $X + X$. Z.B. $CD = (-6, -42)^T$, $CC = \begin{pmatrix}15&21\\6&30\end{pmatrix}$.
S Skript S. 39, Def. 2.6; S. 43, Def. 2.14

A S2 | Anzahl Multiplikationen | beweis,kombinatorik | matrizen | Basis | mnp
? Für $AB$ mit $A \in \mathrm{Mat}_{m,n}$, $B \in \mathrm{Mat}_{n,p}$ genügen $mnp$ Multiplikationen.
L $mp$ Einträge mit je $n$ Produkten.
S Skript S. 43, Def. 2.14

A S3 | Untergruppe von $2\times2$-Matrizen | axiome | matrizen | Basis | subgroup-mat
? $\{a + b + c + d = 0\}$ ist eine Untergruppe von $(\mathrm{Mat}_2(\mathbb{Q}), +)$.
L Nullmatrix enthalten; Summen und Negative erfüllen die Bedingung.
S Skript S. 24, Def. 1.40; S. 41, Lemma 2.11

A E1 | $\mathbb{R}^2$ als Körper | beweis,axiome | ringe | Ergänzung | complex-pairs
? $(ac, -bc)$ mit $c(a^2 + b^2) = 1$ ist invers zu $(a, b)$; damit ist $\mathbb{R}^2$ mit der Struktur aus Serie 5 ein Körper.
L $(a, b)(ac, -bc) = (c(a^2 + b^2), 0) = (1, 0)$.
S Skript S. 30, Def. 1.49

A E2 | Binomische Formel für Matrizen | tf,gegenbsp | matrizen | Ergänzung | mat-binom
? Wahr oder falsch: Für <i>alle</i> $A, B \in \mathrm{Mat}_2(\mathbb{Q})$ gilt $(A + B)^2 \ne A^2 + 2AB + B^2$.
L Falsch: Für $A = B = 0$ (allgemein für kommutierende $A, B$) gilt Gleichheit. Stets ist $(A+B)^2 = A^2 + AB + BA + B^2$.
S Skript S. 44, Bsp. 2.16

A E3 | Matrixpotenzen | induktion,rechnen | matrizen | Ergänzung | matpow
? $\begin{pmatrix}1&0\\-1&1\end{pmatrix}^n$ per Induktion; $\begin{pmatrix}0&1\\1&0\end{pmatrix}^n$ berechnen.
L $\begin{pmatrix}1&0\\-n&1\end{pmatrix}$; $E_2$ für gerades, die Matrix selbst für ungerades $n$.
S Skript S. 43, Def. 2.14

A F1 | Paar-Konstruktion zweimal | beweis,gegenbsp | ringe | Freiwillig | proof:rings
? Die Konstruktion aus Serie 5, E1 auf $\mathbb{R}^2$ anwenden: Ist der entstehende Ring auf $\mathbb{R}^4$ ein Körper?
L Nein: $(1, i)(1, -i) = (0, 0)$ – Nullteiler.
S Skript S. 30, Lemma 1.50

A F2 | Sieben statt acht Produkte | rechnen,beweis | matrizen | Freiwillig | mnp
? Die Formeln mit sieben Produkten $m_1, \dots, m_7$ für ein $2\times2$-Matrixprodukt verifizieren.
L Alle vier Einträge ausmultiplizieren und vergleichen.
S Skript S. 43, Def. 2.14

A F3 | Rekursive Multiplikation | rechnen,beweis | matrizen | Freiwillig | mnp
? Für $n = 2^k$ reichen $7^k = n^{\log 7/\log 2}$ Multiplikationen; für $1024 \times 1024$ also $7^{10}$.
L Blockweise rekursiv: $M(2^k) = 7\,M(2^{k-1})$.
S Skript S. 43, Def. 2.14

# la 7
A S1 | Diagonalmatrizen | beweis,rechnen | matrizen | Basis | diag
? $\mathrm{diag}(x, \dots, x)$ kommutiert mit allen Matrizen; Produkte von Diagonalmatrizen sind eintragsweise.
L $\mathrm{diag}(x, \dots, x) = xE_m$.
S Skript S. 43, Def. 2.14

A S2 | Lösbarkeit mit Parameter | lgs | matrizen | Basis | param-system
? Für eine $2\times2$-Matrix $B_t$ mit Einträgen linear in $t$ bestimmen, für welche $t$ das System $B_tx = (4, 1)^T$ lösbar ist.
L $\det B_t = -(2t - 1)(t - 1)$; bei $t = 1$ lösbar, bei $t = \frac12$ nicht: $t \in \mathbb{R} \setminus \{\frac12\}$.
S Skript S. 52, Lemma 2.27; S. 67, Prop. 2.43

A S3 | Nilpotente Matrizen | gegenbsp,beweis | matrizen | Basis | nilpotent
? Eine nilpotente Matrix $\ne 0$ angeben; nilpotente Matrizen sind nicht invertierbar.
L $\begin{pmatrix}0&1\\0&0\end{pmatrix}$; aus $N^k = 0$ folgte sonst, dass $0$ invertierbar ist.
S Skript S. 50, Def. 2.22

A S4 | Determinante ist multiplikativ | beweis,rechnen | matrizen | Basis | det
? $\det(AB) = \det A \det B$ für $2\times2$-Matrizen nachrechnen.
L Ausmultiplizieren; die gemischten Terme heben sich auf.
S Skript S. 52, Lemma 2.27

A E1 | Obere Dreiecksmatrizen | beweis | matrizen | Ergänzung | proof:matrices
? Summe, Differenz und Produkt oberer Dreiecksmatrizen sind obere Dreiecksmatrizen.
L Für $i \gt j$ verschwindet jeder Summand $a_{ik}b_{kj}$.
S Skript S. 43, Def. 2.14

A E2 | Nilpotente Diagonalmatrix | beweis | matrizen | Ergänzung | proof:matrices
? Eine Diagonalmatrix ist genau dann nilpotent, wenn sie die Nullmatrix ist.
L $\mathrm{diag}(x_i)^k = \mathrm{diag}(x_i^k)$, und Körper sind nullteilerfrei.
S Skript S. 30, Lemma 1.50

A E3 | Mit allem kommutierende Diagonalmatrix | beweis | matrizen | Ergänzung | proof:matrices
? Kommutiert $\mathrm{diag}(x_1, \dots, x_m)$ mit allen Matrizen, so sind alle $x_i$ gleich.
L Mit der Matrix vergleichen, die nur an der Stelle $(i, j)$ eine Eins hat: $x_i = x_j$.
S Skript S. 43, Def. 2.14

A E4 | Ganzzahlige Matrizen mit $\det = \pm 1$ | beweis,axiome | matrizen | Ergänzung | proof:matrices
? $\mathrm{Mat}_2(\mathbb{Z})$ ist multiplikativ abgeschlossen; $\{\det A = \pm 1\}$ ist eine Gruppe.
L Inverse $\pm\begin{pmatrix}d&-b\\-c&a\end{pmatrix}$ ist ganzzahlig; $\det$ ist multiplikativ.
S Skript S. 52, Def. 2.26, Lemma 2.27

A F1 | Fünf invertierbare $A + kB$ | beweis | matrizen | Freiwillig | proof:matrices
? Sind $A + kB$ für $k = 0, \dots, 4$ ganzzahlig invertierbar, so für alle $k \in \mathbb{Z}$.
L $\det(A + kB)$ ist ein Polynom vom Grad $\le 2$, das an fünf Stellen $\pm 1$ ist – ein Wert wird dreimal angenommen, also ist es konstant.
S Skript S. 52, Lemma 2.27

A F2 | $A + B = AB$ ⇒ $AB = BA$ | beweis | matrizen | Freiwillig | proof:matrices
? Aus $A + B = AB$ folgt $AB = BA$.
L $(E - A)(E - B) = E$, also auch $(E - B)(E - A) = E$; ausmultiplizieren.
S Skript S. 51, Lemma 2.24

A F3 | Invertierbare Matrizen über $\mathbb{F}_2$ zählen | kombinatorik | matrizen | Freiwillig | glcount
? Anzahl der invertierbaren $2\times2$-Matrizen über $\mathbb{F}_2$.
L $3 \cdot 2 = 6$.
S Skript S. 52, Def. 2.26

A F4 | Matrizen der Form $\begin{pmatrix}a&-b\\b&a\end{pmatrix}$ | beweis,axiome | matrizen | Freiwillig | complex-pairs
? Diese Matrizen bilden mit Matrixaddition und -multiplikation einen Körper.
L Sie rechnen wie $a + bi$; Inverses $\frac{1}{a^2+b^2}\begin{pmatrix}a&b\\-b&a\end{pmatrix}$.
S Skript S. 30, Def. 1.49

# la 8
A S1 | Gauss-Verfahren mit Lösungsmengen | lgs | gauss | Basis | gauss
? Eine $3\times4$-Matrix und die erweiterte Matrix in Zeilenstufenform bringen; homogene und inhomogene Lösungsmenge angeben.
L Zeilenstufenform mit Pivots in Spalten 1–3, freie Variable $x_4$; $\{Ax = 0\} = \{t(-4, -21, 31, 8)^T\}$, $\{Ax = b\} = (-\frac12, -\frac{27}{8}, \frac{41}{8}, 0)^T + \{Ax = 0\}$.
S Skript S. 62, Def. 2.38; S. 67, Prop. 2.43

A S2 | Inverse per Zeilenumformungen | lgs,rechnen | gauss | Basis | inverse
? Eine $4\times4$-Matrix als invertierbar nachweisen und die Inverse mit Gauss berechnen.
L Inverse mit den Zeilen $(0, 0, -1, 0)$, $(1, 0, 2, 0)$, $(3, 1, 13, 0)$, $(-5, 0, -8, 1)$.
S Skript S. 65, Lemma 2.41

A S3 | Determinante: Skalierung und Summen | beweis,gegenbsp | matrizen | Basis | det
? $\det(\lambda A) = \lambda^2 \det A$; Matrizen mit $\det(A + B) \ne \det A + \det B$ angeben.
L $A = B = E_2$: $\det(2E_2) = 4 \ne 2$.
S Skript S. 52, Lemma 2.27

A E1 | $\det A = 0$ ⇔ Spalten linear abhängig | beweis | matrizen | Ergänzung | proof:matrices
? $\det A = 0$ genau dann, wenn eine nichttriviale Linearkombination der Spalten null ist.
L „⇒": $(\lambda, \mu) = (b, -a)$ bzw. $(d, -c)$ wählen; „⇐": sonst wäre $A$ invertierbar und nur die triviale Lösung möglich.
S Skript S. 52, Lemma 2.27

A E2 | Matrix durch ihre Wirkung bestimmt | beweis | matrizen | Ergänzung | proof:matrices
? Aus $Av = Bv$ für alle Spaltenvektoren $v$ folgt $A = B$.
L Standardbasisvektoren einsetzen: $Ae_j$ ist die $j$-te Spalte.
S Skript S. 49, Bem. 2.21

A E3 | Produkte von Elementarmatrizen | beweis,rechnen | gauss | Ergänzung | elementary
? $E_I(i, j, \lambda)E_I(i, j, \mu) = E_I(i, j, \lambda + \mu)$ und $E_{III}(i, \lambda)E_{III}(i, \mu) = E_{III}(i, \lambda\mu)$.
L Als Folge von Zeilenumformungen lesen.
S Skript S. 57–60, Def. 2.32, Lemma 2.33

A E4 | $\#\mathrm{GL}_2(\mathbb{F}_2) = 6$ | kombinatorik | matrizen | Ergänzung | glcount
? Die Anzahl der invertierbaren $2\times2$-Matrizen über $\mathbb{F}_2$ bestimmen.
L Erste Spalte: 3 Möglichkeiten $\ne 0$, zweite kein Vielfaches: 2.
S Skript S. 52, Def. 2.26

A F1 | Eindeutigkeit der Zeilenstufenform | beweis | gauss | Freiwillig | proof:matrices
? Sind $LA$ und $L'A$ (mit invertierbaren $L, L'$) beide in Zeilenstufenform, so sind sie gleich.
L Gleicher Zeilenraum; Pivotspalten und Einträge werden davon eindeutig festgelegt.
S Skript S. 62, Def. 2.38

A F2 | $\mathrm{GL}_2(\mathbb{F}_2)$ und Permutationen | beweis | matrizen | Freiwillig | glcount
? $\mathrm{GL}_2(\mathbb{F}_2)$ ist isomorph zur symmetrischen Gruppe $S_3$.
L Jede Matrix permutiert die drei Vektoren $\ne 0$ von $\mathbb{F}_2^2$; das gibt einen injektiven Homomorphismus in $S_3$, beide haben 6 Elemente.
S Skript S. 18, Bsp. 1.29(iii)

# an 1
A 1.1 | Induktion: drei Identitäten | induktion | an-induktion | Basis | induktion
? Per Induktion: Summe der ersten $n$ ungeraden Zahlen, $\sum k \cdot k!$ und das Produkt $\prod_{k=2}^n (1 - \frac1k)$.
L $n^2$, $(n+1)! - 1$, $\frac1n$.
S Skript S. 7, Vollständige Induktion

A 1.2 | Induktion: Quadrat- und Kubensumme, Produktformel | induktion | an-induktion | Basis | induktion
? $\sum k^2$, $\sum k^3$ und $\prod_{k=0}^n (1 + x^{2^k})$ für $x \ne 1$ per Induktion bestimmen.
L $\frac{n(n+1)(2n+1)}{6}$, $\left(\frac{n(n+1)}{2}\right)^2$, $\frac{1 - x^{2^{n+1}}}{1 - x}$.
S Skript S. 7, Vollständige Induktion

A 1.3 | Fehler in einem Induktions-„Beweis" | logik,beweis | an-induktion | Basis | bank:an-induktion
? Einen falschen Beweis, dass alle Katzen gleichfarbig sind, analysieren.
L Der Schritt $n = 1 \to 2$ scheitert: Die beiden Teilgruppen haben keine gemeinsame Katze.
S Skript S. 7, Vollständige Induktion

A 1.4 | Gleiche Bälle verteilen | kombinatorik | an-induktion | Ergänzung | stars
? Auf wie viele Arten lassen sich $n$ gleiche Bälle auf $k$ Empfänger verteilen (leer und mehrfach erlaubt)?
L $\binom{n + k - 1}{k - 1}$ (Sterne und Striche).
S Skript S. 10, Binomialkoeffizient

A 1.5 | Anzahl der Teilmengen | kombinatorik,induktion | an-induktion | Ergänzung | subsets
? Eine $n$-elementige Menge hat $2^n$ Teilmengen.
L Induktion: Teilmengen mit bzw. ohne das neue Element; oder $\sum_k \binom nk = 2^n$.
S Skript S. 10–11, Binomialkoeffizient, Binomischer Lehrsatz

# an 2
A 2.1 | Eine Betragsidentität | beweis | an-reell | Basis | proof:abs
? $|x| + |y| + \big||x| - |y|\big| = |x - y| + |x + y|$ für alle reellen $x, y$.
L Beide Seiten sind $2\max(|x|, |y|)$.
S Skript S. 17, Absolutbetrag

A 2.2 | Intervallschachtelungen | beweis,schranken | an-reell | Basis | nested
? Zeigen, dass eine Folge von Lösungsmengen von $|x^2 - 2| \le \frac1n$ eine Intervallschachtelung ist (Punkt bestimmen), und dass eine andere Intervallfolge keine ist.
L Gemeinsamer Punkt $\sqrt2$; im zweiten Fall geht die Länge gegen $1$ statt $0$.
S Skript S. 18, Intervallschachtelung

A 2.3 | Supremum und Infimum dreier Mengen | schranken | an-reell | Basis | supinf
? Drei durch rationale Ungleichungen definierte Teilmengen von $\mathbb{Q}$: Sup, Inf, Max, Min.
L $A$: inf $-\infty$, sup $2$, weder Max noch Min. $B$: min $-2$, sup $\infty$. $C = B \setminus \{-2\}$: inf $-1$, sup $\infty$.
S Skript S. 22–24, Beschränktheit, Supremum, Maximum

A 2.4 | Genau eine Aussage ist wahr | logik | an-reell | Ergänzung | exactly-one
? Vier Aussagen über eine Anzahl, von denen genau eine wahr ist: Anzahl bestimmen.
L $3$.
S Skript S. 1, Aussagen

A 2.5 | $\sqrt[n]{a} \to 1$ mit Bernoulli | beweis,grenzwert | an-reell | Ergänzung | root-eps
? Für $a \gt 0$ zu jedem $\varepsilon \gt 0$ ein $N$ mit $|\sqrt[n]{a} - 1| \lt \varepsilon$ für $n \ge N$ finden.
L Bernoulli: $a \ge 1 + n(\sqrt[n]a - 1)$, also $0 \le \sqrt[n]a - 1 \le \frac{a - 1}{n}$ (für $a \ge 1$; sonst Kehrwert).
S Skript S. 16, Bernoullische Ungleichung; S. 43

# an 3
A 3.1 | Abzählbar und überabzählbar | beweis,abbildung | an-reell | Ergänzung | proof:countable
? Die endlichen Teilmengen von $\mathbb{N}$ bilden eine abzählbare Menge, alle Teilmengen eine überabzählbare.
L Abzählbare Vereinigung endlicher Mengen; Diagonalargument.
S Skript S. 26–27, Mächtigkeit

A 3.2 | Komplexe Zahlen in Normalform | rechnen | an-komplex | Basis | complex
? Vier Ausdrücke (Kehrwert, Quotient, Potenz eines Quotienten, Wurzel aus $i$) in der Form $x + iy$.
L $\frac{1 - i}{2}$, $\frac{2 + 11i}{5}$, $i^k$, $\pm\frac{1 + i}{\sqrt2}$.
S Skript S. 31–35, Rechnen in $\mathbb{C}$

A 3.3 | Ungleichungen und Parallelogrammidentität | beweis | an-komplex | Basis | proof:complex
? $\big||z| - |w|\big| \le |z - w|$ und $|z + w|^2 + |z - w|^2 = 2(|z|^2 + |w|^2)$.
L Dreiecksungleichung; $|u|^2 = u\bar u$ ausmultiplizieren.
S Skript S. 35, Eigenschaften des Betrags

A 3.4 | Mengen in der komplexen Ebene | mengen | an-komplex | Basis | cset
? Vier Mengen skizzieren: gleicher Abstand zu zwei Punkten, Halbebene, Kreisscheibe, Schnitt zweier Bedingungen.
L Reelle Achse; Halbebene $y \le -x$; Kreisscheibe um $2 - i$ mit Radius 2; $\{0\}$.
S Skript S. 35–36, Betrag und Geometrie

A 3.5 | Vertauschte Quantoren | logik,grenzwert | an-folgen | Ergänzung | quantor
? Für welche Folgen gilt die Konvergenzbedingung, wenn „$\exists N$" vor „$\forall \varepsilon$" steht?
L Genau für Folgen, die ab einem Index konstant $a$ sind.
S Skript S. 40, Konvergenz, Bemerkung (vi)

# an 4
A 4.1 | Irrationale Zahl zwischen zwei rationalen | beweis | an-reell | Ergänzung | irr-between
? Zwischen zwei rationalen Zahlen $x \lt y$ liegt eine irrationale.
L $x + \frac{y - x}{\sqrt2}$.
S Skript S. 26, Satz

A 4.2 | Grenzwerte: sechs Folgen | grenzwert | an-folgen | Basis | limit
? Grenzwerte bzw. Divergenz von sechs Folgen (Wurzeln, Quotienten, Potenzen komplexer Zahlen).
L $0$, $1$, divergent, $-\frac13$, divergent, $0$.
S Skript S. 43–49, Grenzwerte und Rechenregeln

A 4.3 | Grenzwerte: fünf Folgen | grenzwert | an-folgen | Basis | limit
? Binomialkoeffizient durch $2^n$, Quotient von Exponentialtermen, $n$-te Wurzel eines Polynoms, Gausssche Summe durch $n^2$, Wurzeldifferenz.
L $0$, $+\infty$, $1$ (für $P \ne 0$), $\frac12$, $\frac12$.
S Skript S. 43–49, Grenzwerte und Rechenregeln

A 4.4 | Konvergenz in Abhängigkeit von $x$ | grenzwert | an-folgen | Basis | param-limit
? Für welche $x$ konvergiert $\left(\frac{1 + 2x}{1 + x^2}\right)^{2n}$?
L Für $x \le 0$ oder $x \ge 2$.
S Skript S. 16, Satz über Potenzen

A 4.5 | Teilfolgen-Beispiele | gegenbsp | an-folgen | Ergänzung | subseq
? Eine unbeschränkte Folge mit konvergenter Teilfolge; eine Folge mit Teilfolgen gegen jedes $m \in \mathbb{N}$.
L $(1, 2, 1, 4, 1, 6, \dots)$; $(1, 1, 2, 1, 2, 3, \dots)$.
S Skript S. 50, Teilfolge

# an 5
A 5.1 | Mittelwerte konvergenter Folgen | beweis,gegenbsp | an-folgen | Basis | proof:sequences
? Aus $a_n \to a$ folgt $\frac{a_1 + \dots + a_n}{n} \to a$; gilt die Umkehrung?
L Summe aufteilen; Umkehrung falsch ($(-1)^n$).
S Skript S. 40, Konvergenz

A 5.2 | Rekursive Mittelung | grenzwert,beweis | an-folgen | Ergänzung | recursion
? $a_n = \frac12(a_{n-1} + a_{n-2})$ mit Startwerten $a, b$: Konvergenz und Grenzwert.
L $\frac{a + 2b}{3}$ (Invariante $a_n + \frac12 a_{n-1}$).
S Skript S. 50, monotone Folgen; S. 56, geometrische Reihe

A 5.3 | Monotone und konvergente Teilfolgen | beweis | an-folgen | Ergänzung | proof:sequences
? Jede reelle Folge hat eine monotone Teilfolge; jede beschränkte divergente Folge hat zwei konvergente Teilfolgen mit verschiedenen Grenzwerten.
L Gipfelstellen; zweimal Bolzano-Weierstrass.
S Skript S. 51, Satz von Bolzano-Weierstrass

A 5.4 | Cauchy durch geometrische Schranke | beweis | an-folgen | Basis | cauchy-geo
? Aus $|a_{n+1} - a_n| \lt 2^{-n}$ folgt, dass $(a_n)$ eine Cauchy-Folge ist.
L $|a_m - a_n| \lt 2^{1-n}$ für $m \gt n$.
S Skript S. 52, Cauchy-Folge

A 5.5 | Teleskopsummen | reihen,rechnen | an-reihen | Basis | telescope
? $\sum \frac{1}{4k^2 - 1}$ und $\sum \frac{1}{k(k+1)(k+2)}$ berechnen.
L $\frac12$ und $\frac14$.
S Skript S. 56–57, teleskopische Reihe

# an 6
A 6.1 | Konvergenz: sechs Reihen | reihen | an-reihen | Basis | series
? Sechs Reihen (alternierend, geometrisch, $\frac{1}{\sqrt n}$-artig, rational) auf Konvergenz untersuchen.
L Divergent, konvergent, divergent, divergent, divergent, konvergent (Leibniz).
S Skript S. 57–63, Konvergenzkriterien

A 6.2 | Konvergenz: fünf Reihen | reihen | an-reihen | Basis | series
? Fünf Reihen mit Parameter, rationalen Termen, Fakultäten und Potenzen untersuchen.
L Nur für $0 \lt k \lt 1$; divergent; konvergent; konvergent; konvergent (Leibniz).
S Skript S. 59–66, Konvergenzkriterien

A 6.3 | Limes superior charakterisieren | beweis | an-reihen | Ergänzung | proof:sequences
? $\limsup = +\infty$, $-\infty$ bzw. $L \in \mathbb{R}$ über Teilfolgen und Schranken charakterisieren; analog für $\liminf$.
L Über die Definition als grösster Häufungswert.
S Skript S. 64, Limes superior

A 6.4 | Quotienten- versus Wurzelkriterium | beweis,gegenbsp | an-reihen | Ergänzung | bank:an-reihen
? Quotientenkriterium ⇒ Wurzelkriterium; nicht umgekehrt; das Quotientenkriterium mit $\limsup$ ist falsch.
L Gegenbeispiel $a_n = 2^{-n}$ (gerade), $3^{-n}$ (ungerade).
S Skript S. 66, Satz und Beispiel

A 6.5 | Umordnung endlich vieler Glieder | beweis | an-reihen | Basis | proof:series
? Vertauscht eine Permutation nur endlich viele Indizes, so ändern sich Konvergenz und Summe nicht.
L Ab einem Index stimmen die Partialsummen überein.
S Skript S. 67, Rechenregeln für Reihen

# an 7
A 7.1 | Konvergenzradien | potenzreihe | an-reihen | Basis | radius
? Konvergenzradius für $a_n = \sqrt n$, $a_n = q^{n^2}$ und für abwechselnd $b^n$, $c^n$.
L $1$; $\infty$, $1$ bzw. $0$ je nach $|q|$; $\frac{1}{\max(|b|, |c|)}$.
S Skript S. 70–71, Konvergenzradius

A 7.2 | Verhalten auf dem Rand | potenzreihe | an-reihen | Basis | boundary
? $\sum z^n$, $\sum \frac{z^n}{n}$, $\sum \frac{z^n}{n^2}$: Radius und Konvergenz auf $|z| = 1$.
L Alle $R = 1$; nirgends / überall ausser $z = 1$ / überall.
S Skript S. 70–71, Konvergenzradius

A 7.3 | Bild, Umkehrfunktion, Verkettung | stetigkeit,abbildung,rechnen | an-stetig | Basis | func-inverse
? Für $1 + \frac1x$ auf $(0, \infty)$ Bild, Umkehrung und $f \circ f$; für eine stückweise Funktion die $n$-fache Verkettung.
L Bild $(1, \infty)$, $f^{-1}(y) = \frac{1}{y - 1}$, $f \circ f = \frac{2x + 1}{x + 1}$; stückweise: abwechselnd $f$ und $f \circ f$.
S Skript S. 74–75, Funktionen, Komposition

A 7.4 | Stetigkeit eines verschachtelten Betrags | stetigkeit,beweis | an-stetig | Basis | proof:continuity
? $f(x) = |1 - |x||$ ist stetig; Graph skizzieren.
L Verkettung stetiger Funktionen (Betrag ist Lipschitz-stetig); W-förmiger Graph.
S Skript S. 77–81, Lipschitz, Rechenregeln

A 7.5 | Stetig genau in den irrationalen Punkten | stetigkeit,beweis | an-stetig | Ergänzung | proof:continuity
? Die Funktion mit $\frac1q$ in $\frac pq$ und $0$ in irrationalen Punkten ist in irrationalen Punkten stetig, in rationalen unstetig.
L Nahe einem Punkt haben Brüche nur grosse Nenner; in $\frac pq$ approximieren irrationale Punkte mit Wert $0$.
S Skript S. 76–79, Stetigkeit, Folgenkriterium

# an 8
A 8.1 | Stetig und injektiv ⇒ streng monoton | stetigkeit,beweis | an-stetig | Basis | proof:continuity
? Eine stetige, injektive Funktion auf $[a, b]$ ist streng monoton.
L Sonst liefert der Zwischenwertsatz zwei Stellen mit gleichem Wert.
S Skript S. 82, Zwischenwertsatz

A 8.2 | Punktweiser Grenzwert stetiger Funktionen | stetigkeit,grenzwert | an-stetig | Basis | pointwise
? $f_n(x) = \frac{nx}{1 + |nx|}$: Grenzfunktion bestimmen und ihre Stetigkeit untersuchen.
L Vorzeichenfunktion ($0$ in $0$); stetig ausser in $0$.
S Skript S. 76–79, Stetigkeit

A 8.3 | Nullstelle über Grenzwerte | stetigkeit,beweis | an-stetig | Basis | ivt
? Eine stetige Funktion mit negativem Grenzwert bei $-\infty$ und positivem bei $+\infty$ hat eine Nullstelle.
L Punkte mit $f \lt 0$ und $f \gt 0$ finden, dann Zwischenwertsatz.
S Skript S. 82–83, Zwischenwertsatz

A 8.4 | Additive Funktion, stetig in 0 | stetigkeit,beweis | an-stetig | Ergänzung | proof:continuity
? Ist $f(x + y) = f(x) + f(y)$ und $f$ stetig in $0$, so ist $f$ überall stetig.
L $f(x + h) - f(x) = f(h) - f(0) \to 0$.
S Skript S. 76, Stetigkeit

A 8.5 | Summe abgeschlossener Mengen | gegenbsp,beweis | an-stetig | Ergänzung | proof:closed
? $A + B$ ist für abgeschlossene $A, B$ nicht immer abgeschlossen; für kompaktes $A$ schon.
L $\mathbb{N} + \{-n + \frac1n\}$ enthält $\frac1n$, aber nicht $0$; kompakt: konvergente Teilfolge in $A$.
S Skript S. 84–87, Abgeschlossenheit, Kompaktheit

# eis 1
A 1 | Wahr oder falsch: Mengen und Wahrscheinlichkeiten | tf | eis-wraum | Level A | bank:eis-wraum
? Fünf Aussagen über Teilmengen, Mengenoperationen, eine $\sigma$-Algebra und die Additivität von $P$.
L Falsch, falsch, falsch, wahr, falsch.
S Skript S. 12–16, Lemma 1.5, Def. 1.7, Satz 1.12

A 2 | Gleiche Mengen finden | mengen | eis-wraum | Level A | setid
? Aus zwölf Mengenausdrücken in $A, B, C$ sechs gleiche Paare bilden.
L Z.B. $(A \cap B)^c = A^c \cup B^c$, $A \cup A^c = \Omega$, $(A^c \cup C) \cap (B \cup C) = (A^c \cap B) \cup C$.
S Skript S. 12, Lemma 1.5

A 3 | Ereignisse in Mengenschreibweise | mengen | eis-wraum | Level B | events
? Verbal beschriebene Ereignisse („mindestens eines", „höchstens eines", „genau eines" …) und Beziehungen als Mengen schreiben.
L Z.B. „höchstens eines" $= (A \cap B)^c \cap (A \cap C)^c \cap (B \cap C)^c$; „aus $A^c$ folgt $B^c$" $\Leftrightarrow B \subset A$.
S Skript S. 10, Rechnen mit Ereignissen

A 4 | W-Raum für Münze und Würfel | modell | eis-wraum | Level B | pspace
? Einen geeigneten Wahrscheinlichkeitsraum für einen Münz- und einen Würfelwurf angeben.
L $\Omega = \{K, Z\} \times \{1, \dots, 6\}$, Potenzmenge, Laplace-Mass.
S Skript S. 18, Def. 1.17

A 5 | Widersprüchliche Umfrage | wkeit | eis-wraum | Level A | survey
? Prozentangaben für zwei Merkmale und beide zusammen auf Plausibilität prüfen.
L $0.8 + 0.7 - 0.4 = 1.1 \gt 1$: unmöglich.
S Skript S. 16, Satz 1.12(d)

A 6 | Potenzmenge als $\sigma$-Algebra | mengen,kombinatorik | eis-wraum | Level A | powerset
? Potenzmenge einer 3-elementigen Menge aufschreiben; $\Omega \in \mathcal{A}$ oder $\Omega \subset \mathcal{A}$?; Anzahl bei $n$ Elementen.
L 8 Elemente; $\Omega \in \mathcal{A}$; $2^n$.
S Skript S. 13, Def. 1.7

A 7 | Wahrscheinlichkeitsmass aus Teilinformationen | wkeit | eis-wraum | Level A | measure
? Aus drei gegebenen Wahrscheinlichkeiten auf $\{1, 2, 3, 4\}$ alle $P(A)$ bestimmen.
L $P(\{1\}) = 0.2$, $P(\{2\}) = 0.4$, $P(\{3\}) = 0.1$, $P(\{4\}) = 0.3$; dann additiv.
S Skript S. 16, Satz 1.12

A 8 | Subadditivität | beweis | eis-wraum | Level B–C | proof:prob
? $P(A \cup B) \le P(A) + P(B)$, für drei, für $n$ und für abzählbar viele Ereignisse.
L Disjunkt machen: $B_i = A_i \setminus \bigcup_{j \lt i} A_j$, dann $\sigma$-Additivität und Monotonie.
S Skript S. 15–16, Def. 1.11, Satz 1.12

A 9 | Längenmass auf $(0, 1]$ | wkeit | eis-wraum | Level B–C | interval
? Aus $P((a, 1]) = 1 - a$ die Wahrscheinlichkeiten von Intervallen, Vereinigungen und einer unendlichen Vereinigung bestimmen.
L $P((a, b]) = b - a$; die unendliche Vereinigung hat Wahrscheinlichkeit $\frac12$.
S Skript S. 15, $\sigma$-Additivität

# eis 2
A 10 | Wahr oder falsch: diskrete Modelle | tf | eis-diskret | Level A | bank:eis-diskret
? Fünf Aussagen zu Elementarwahrscheinlichkeiten, Würfelsummen, Urnenmodellen und Laplace-Modellen.
L Falsch, falsch, wahr, falsch, falsch.
S Skript S. 20–27, Satz 2.1, Laplace, Urnen

A 11 | Einfache Kombinatorik | kombinatorik | eis-diskret | Level A | comb
? Türme auf dem Schachbrett, Zugkompositionen, Ziffernzahlen, gerade Ziffern, Dreiecke, Dominosteine.
L $8!$, $\frac{22!}{5!7!10!}$, $504$, $100$, $20$, $28$.
S Skript S. 23, Grundformeln der Kombinatorik

A 12 | Gemischtes Kartenspiel | modell,wkeit | eis-diskret | Level B | cards
? W-Raum für das Aufdecken aller Karten; Wahrscheinlichkeiten für Positionen bestimmter Karten.
L $\frac19$, $\frac{1}{36 \cdot 35}$, $1/\binom{36}{9}$.
S Skript S. 21, Laplace-Modelle

A 13 | Socken im Dunkeln | modell,wkeit | eis-diskret | Level A | socks
? Zwei Socken aus 6 roten und 8 blauen: zwei rote, zwei blaue, verschieden, passend.
L $\frac{15}{91}$, $\frac{28}{91}$, $\frac{48}{91}$, $\frac{43}{91}$.
S Skript S. 27, Ziehen ohne Zurücklegen

A 14 | Geburtstagsproblem | wkeit | eis-diskret | Level A | birthday
? Wahrscheinlichkeit für einen gemeinsamen Geburtstag unter 90 Personen.
L $\approx 0.999994$.
S Skript S. 21, Laplace-Modelle

A 15 | Stichprobenprüfung | wkeit | eis-diskret | Level A | accept
? Annahme einer Lieferung bei höchstens 3 Fehlern in einer Stichprobe von 100 aus 1000, für verschiedene Fehleranzahlen.
L Hypergeometrisch; etwa $0.988$, $0.869$, $0.006$.
S Skript S. 27, Ziehen ohne Zurücklegen

A 16 | Überbuchung | wkeit | eis-diskret | Level A | overbook
? 105 Tickets für 100 Plätze, Erscheinen mit Wahrscheinlichkeit 0.9: Wahrscheinlichkeit für Überbuchung.
L $P(\mathrm{Bin}(105, 0.9) \ge 101) \approx 0.017$.
S Skript S. 26, Ziehen mit Zurücklegen

A 17 | Identitäten für Binomialkoeffizienten | kombinatorik,beweis | eis-diskret | Level B | proof:binom
? Drei Identitäten kombinatorisch begründen (Vandermonde, Summe über das grösste Element, Komitee mit Präsident).
L Doppeltes Abzählen derselben Menge.
S Skript S. 23, Grundformeln der Kombinatorik

# eis 3
A 18 | Wahr oder falsch: bedingte Wahrscheinlichkeit | tf | eis-bedingt | Level A | bank:eis-bedingt
? Fünf Aussagen zu bedingten Wahrscheinlichkeiten und zur Multiplikationsregel.
L Wahr, falsch, falsch, falsch, wahr.
S Skript S. 30–33, Def. 3.1, Kor. 3.7, Satz 3.10

A 19 | Übertragungsfehler | modell,bedingt | eis-bedingt | Level A | bits
? Bitfolgen der Länge 3 mit Fehlerwahrscheinlichkeit 0.001: Modell, genau zwei Fehler, mindestens ein Fehler, bedingte Wahrscheinlichkeit.
L $3p^2(1-p)$, $1 - (1-p)^3$, Quotient $\approx 0.001$.
S Skript S. 26 und S. 30, Binomialverteilung, Def. 3.1

A 20 | Zweifarbige Karten | bedingt | eis-bedingt | Level A | cardflip
? Karten mit roten/schwarzen Seiten: Wahrscheinlichkeit für schwarze Unterseite, ohne und mit Information über die Oberseite.
L $\frac{4}{15}$ und $\frac{1}{11}$.
S Skript S. 30, Def. 3.1

A 21 | Qualitätsstufen | bedingt | eis-bedingt | Level A | bulbs
? Drei Qualitäten mit Anteilen und Lebensdauer-Wahrscheinlichkeiten: Ausfallwahrscheinlichkeit und Rückschluss auf die Qualität.
L $0.26$ und $\frac{11}{13}$.
S Skript S. 35–37, Satz 3.12, Satz 3.15

A 22 | Verlorener Koffer | bedingt,modell | eis-bedingt | Level B | luggage
? An drei Umsteigeorten wird ein Koffer mit Wahrscheinlichkeit $p$ fehlgeleitet: Wo ging er wahrscheinlich verloren?
L $\frac{(1-p)^{i-1}p}{1 - (1-p)^3}$ für den $i$-ten Ort.
S Skript S. 37, Satz 3.15

A 23 | Medizinischer Test | bedingt | eis-bedingt | Level B | bayes
? Sensitivität, Spezifität und Prävalenz gegeben: falsch negative/positive, Wahrscheinlichkeit gesund trotz positivem Test, mit zweitem Test.
L Etwa 1 bzw. 2 von 1000; $\approx 0.80$; nach zweitem Test $\approx 0.008$.
S Skript S. 37, Satz 3.15

A 24 | Würfelanzahlen | verteilung,kombinatorik | eis-bedingt | Level B | dice-dist
? Anzahl Sechsen bei $N$ Würfeln, Auswahl aus den Würfeln, Häufigkeiten aller Augenzahlen.
L Binomial-, hypergeometrische und Multinomialverteilung.
S Skript S. 26–29, Urnenmodelle

A 25 | Stetigkeit von oben | beweis | eis-bedingt | Level B–C | proof:prob
? Für fallende Ereignisse gilt $P(\bigcap A_i) = \lim P(A_n)$.
L Komplemente bilden; Stetigkeit von unten anwenden.
S Skript S. 44, Satz 4.14

# eis 4
A 26 | Wahr oder falsch: Verteilungsfunktionen | tf | eis-zv | Level A | bank:eis-zv
? Fünf Aussagen zu Dichten, Intervallwahrscheinlichkeiten, Punktmassen und Ordnung von Verteilungsfunktionen.
L Falsch, falsch, wahr, falsch, wahr.
S Skript S. 43–49, Def. 4.9, Satz 4.15, Satz 4.23

A 27 | Maximum zweier Würfel | verteilung | eis-zv | Level A | maxdice
? Verteilung des Maximums zweier Würfel bestimmen und darstellen.
L $P(M = k) = \frac{2k - 1}{36}$.
S Skript S. 48, Def. 4.20

A 28 | Fläche einer zufälligen Kreisscheibe | verteilung | eis-zv | Level A–B | transform
? Exponentialverteilter Radius: Verteilungsfunktion und Dichte der Fläche.
L $F_A(a) = 1 - e^{-\sqrt{a/\pi}}$, $f_A(a) = \frac{e^{-\sqrt{a/\pi}}}{2\sqrt{\pi a}}$.
S Skript S. 43, Def. 4.9; S. 49, Def. 4.21

A 29 | Welche Funktionen sind Verteilungsfunktionen? | axiome,verteilung | eis-zv | Level A | cdfcheck
? Vier stückweise definierte Funktionen prüfen und Intervall- sowie Punktwahrscheinlichkeiten angeben.
L (a) ja, (b) nein (nicht rechtsstetig), (c) nein (fällt), (d) ja mit Sprung $\frac12$ in $\frac12$.
S Skript S. 43–46, Satz 4.12, Bem. 4.13, Satz 4.15

A 30 | Normierungskonstanten | verteilung | eis-zv | Level A–B | density-const
? Konstanten bestimmen, so dass $c\,x^{-\alpha}$ bzw. $1 - 2\alpha x$ auf $[0, c]$ Dichten sind.
L $c = \alpha - 1$ für $\alpha \gt 1$; im zweiten Fall nur für $\alpha \le \frac14$.
S Skript S. 49, Satz 4.23

A 31 | Dichte aus Verteilungsfunktion | verteilung | eis-zv | Level A | cdf-density
? Für drei Verteilungsfunktionen entscheiden, ob eine Dichte existiert, und sie berechnen.
L $3x^2$; keine (Sprung); logistische Dichte $\frac{e^{-x}}{(1 + e^{-x})^2}$.
S Skript S. 49, Satz 4.23(d)

A 32 | Zufallsvariable zu gegebener Verteilungsfunktion | verteilung,beweis | eis-zv | Level A–C | quantile
? Verteilungsfunktionen von Transformationen einer Gleichverteilung; Zusammenhang zwischen $X$ und $F_X$; Existenzsatz.
L $F_X$ ist die (verallgemeinerte) Umkehrfunktion einer monotonen $X$.
S Skript S. 44, Bem. 4.13

# eis 5
A 33 | Wahr oder falsch: Unabhängigkeit | tf | eis-unabh | Level A | bank:eis-unabh
? Fünf Aussagen zu Dichten, unabhängigen Ereignissen und einem Punkt im Dreieck.
L Falsch, wahr, wahr, falsch, falsch.
S Skript S. 49–57, Satz 4.23, Def. 5.1, Satz 5.3

A 34 | Drei Kugeln ohne Zurücklegen | wkeit | eis-unabh | Level A–B | urn3
? Gemeinsame Verteilung dreier Ziehungen aus 12 nummerierten Kugeln; zwei Ereignisse über die Nummern.
L $\frac{1}{1320}$; $\frac{1}{132}$; $\frac12$.
S Skript S. 21, Laplace-Modelle

A 35 | Potenzdichte und Transformationen | verteilung | eis-unabh | Level A–B | pareto
? Für $C t^{-\alpha}$ auf $[1, \infty)$: Konstante, Verteilungsfunktion, Maximum mit einer Konstante, Logarithmus.
L $C = \alpha - 1$; $1 - t^{1-\alpha}$; Sprung bei 100 (nicht stetig); $\alpha \ln X \sim \mathrm{Exp}(\frac{\alpha - 1}{\alpha})$.
S Skript S. 49, Satz 4.23; S. 67, Def. 6.14

A 36 | Unabhängige Würfelereignisse | unabh | eis-unabh | Level A | indep-dice
? Fünf Kollektionen von Ereignissen beim Wurf zweier Würfel auf Unabhängigkeit prüfen.
L Unabhängig: (a), (c), (d), (e); abhängig: (b).
S Skript S. 52–53, Def. 5.1, Def. 5.5

A 37 | Zuverlässigkeit von Schaltungen | unabh,wkeit | eis-unabh | Level A | reliability
? Funktionswahrscheinlichkeit für eine Serien-, eine Parallel- und eine gemischte Schaltung aus 3 bzw. 5 Bauteilen.
L $p_1p_2p_3$; $1 - \prod(1 - p_i)$; $1 - (1 - u)(1 - p_4p_5)$ mit $u = (1 - (1-p_1)(1-p_2))p_3$.
S Skript S. 55, Bsp. 5.9

A 38 | Unabhängigkeit über die gemeinsame W-Funktion | beweis,unabh | eis-unabh | Level B–C | proof:prob
? Diskrete $X, Y$ sind genau dann unabhängig, wenn die gemeinsame Wahrscheinlichkeitsfunktion faktorisiert.
L „⇐": über die Werte in den Intervallen summieren.
S Skript S. 57, Def. 5.14

# eis 6
A 39 | Wahr oder falsch: Verteilungen | tf | eis-vert | Level A | bank:eis-vert
? Fünf Aussagen zu Bernoulli-, Poisson-, geometrischer und Gleichverteilung.
L Wahr, wahr, falsch, falsch, falsch.
S Skript S. 60–68, Def. 6.1–6.20

A 40 | Seltene Nebenwirkungen | verteilung | eis-vert | Level A | poisson
? Wahrscheinlichkeit für Nebenwirkungen bei 500 Impfungen mit Rate 0.5 % und die erwartete Anzahl.
L $\approx 1 - e^{-2.5} \approx 0.92$; Erwartung $2.5$.
S Skript S. 65, Satz 6.11

A 41 | Wer würfelt zuerst eine Sechs? | wkeit | eis-vert | Level A–B | game
? Gewinnwahrscheinlichkeit des beginnenden Spielers bei abwechselndem Würfeln (zwei Reihenfolgen).
L $\frac{6}{11}$ bzw. $\frac{191}{396}$.
S Skript S. 62, Def. 6.4

A 42 | Reichweite eines Elektroautos | verteilung | eis-vert | Level A | exp
? Exponentialverteilte Reichweite: Wahrscheinlichkeit, eine Distanz ohne Laden zu schaffen.
L $e^{-5.5} \approx 0.004$.
S Skript S. 67, Def. 6.14

A 43 | Fang-Wiederfang-Schätzung | verteilung,modell | eis-vert | Level B | capture
? Verteilung der markierten Tiere im zweiten Fang; Maximum-Likelihood-Schätzung der Population.
L Hypergeometrisch; $\hat N = \lfloor Mn/k \rfloor$.
S Skript S. 27, Ziehen ohne Zurücklegen

A 44 | Summen von Bernoulli-Variablen | verteilung,beweis | eis-vert | Level B | proof:prob
? Verteilung von Teilsummen, ihre Unabhängigkeit, Summenstabilität der Binomialverteilung, Vandermonde-Identität.
L $\mathrm{Bin}(n, p)$ bzw. $\mathrm{Bin}(m, p)$; unabhängig; $Y_1 + Y_2 \sim \mathrm{Bin}(n_1 + n_2, p)$.
S Skript S. 61, Def. 6.2

# eis 7
A 45 | Wahr oder falsch: Erwartungswert | tf | eis-erw | Level A | bank:eis-erw
? Fünf Aussagen zu Erwartungswerten diskreter Zufallsvariablen.
L Wahr, falsch, wahr, falsch, wahr.
S Skript S. 70–74, Def. 7.1, Satz 7.9, Satz 7.12

A 46 | Erwartungswert und Varianz | kennzahl | eis-erw | Level A | ev
? Für eine Zufallsvariable auf $\{1, 2, 3\}$ mit gegebenen Gewichten $EX$ und $\mathrm{Var}\,X$ berechnen.
L $EX = \frac{10}{3}$, $\mathrm{Var}\,X = \frac{74}{9}$.
S Skript S. 70 und S. 76, Def. 7.1, Satz 7.19

A 47 | Kennzahlen der Binomialverteilung | kennzahl | eis-erw | Level A–B | moments
? $EX$ und $\mathrm{Var}\,X$ für $X \sim \mathrm{Bin}(n, p)$, direkt und über Bernoulli-Summen.
L $np$ und $np(1 - p)$.
S Skript S. 77, Satz 7.23(f)

A 48 | Kennzahlen der Poisson-Verteilung | kennzahl | eis-erw | Level B | moments
? $EX$ und $\mathrm{Var}\,X$ für $X \sim \mathrm{Pois}(\lambda)$.
L Beide gleich $\lambda$.
S Skript S. 70 und S. 76, Def. 7.1, Def. 7.15

A 49 | Geometrische Wartezeiten | kennzahl,verteilung | eis-erw | Level B | moments
? Varianz der geometrischen Verteilung über eine Reihenformel; Erwartung und Varianz einer Summe von Wartezeiten.
L $\frac{1-p}{p^2}$; Summe von $n$: $\frac np$ und $\frac{n(1-p)}{p^2}$ (negative Binomialverteilung).
S Skript S. 75, Satz 7.13; S. 77, Satz 7.23

A 50 | Gleitende Summen | kennzahl | eis-erw | Level A–B | sliding
? Varianz und Kovarianz von Summen über überlappende Fenster unabhängiger Variablen.
L $\mathrm{Var}\,Y_i = 10$, $\mathrm{Cov}(Y_i, Y_j) = \max(0, 10 - |i - j|)$.
S Skript S. 77, Satz 7.23

A 51 | Schiefe | kennzahl,beweis | eis-erw | Level A–B | proof:prob
? Eine Formel für die Schiefe über die ersten drei Momente herleiten.
L $(X - \mu)^3$ ausmultiplizieren, Linearität.
S Skript S. 76, Bem. 7.17

A 52 | Gedächtnislosigkeit charakterisiert Verteilungen | beweis,verteilung | eis-erw | Level B | proof:prob
? Gedächtnislose Verteilungen auf $\mathbb{N}$ sind geometrisch, stetige auf $[0, \infty)$ exponentiell.
L $P(X \gt m)$ bzw. $P(X \ge t)$ erfüllt eine multiplikative Funktionalgleichung.
S Skript S. 63, Lemma 6.7; S. 68, Lemma 6.17

# eis 8
A 53 | Wahr oder falsch: Ungleichungen und Grenzwerte | tf | eis-allg | Level A | bank:eis-allg
? Fünf Aussagen zu Erwartungswerten mit Dichte, Markov, Chebyshev und dem Gesetz der grossen Zahlen.
L Wahr, falsch, falsch ($X \ge 0$ fehlt), wahr, wahr.
S Skript S. 83–86, Satz 8.5, 8.8, 8.11, 8.13

A 54 | Gleichverteilung | kennzahl,wkeit | eis-allg | Level A | uniform
? Erwartungswert und Varianz der Gleichverteilung; zwei Wahrscheinlichkeiten auf $[-1, 2]$.
L $\frac{a+b}{2}$, $\frac{(b-a)^2}{12}$; $\frac19$ und $\approx 0.211$.
S Skript S. 68, Def. 6.20; S. 83, Satz 8.5

A 55 | Polynomdichte | verteilung,kennzahl | eis-allg | Level A | density-poly
? Für $ax + bx^2$ auf $[0, 1]$: Bedingung an $a, b$, Erwartungswert und Varianz.
L $b = 3 - \frac{3a}{2}$ für $0 \le a \le 2$; $EX = \frac34 - \frac{a}{24}$.
S Skript S. 49, Satz 4.23; S. 83, Satz 8.5

A 56 | Markov gegen Chebyshev | ungleichung | eis-allg | Level A | markov
? Für eine Summe von Poisson-Variablen eine Tail-Wahrscheinlichkeit mit beiden Ungleichungen abschätzen.
L Markov $\frac12$, Chebyshev $\frac{1}{16}$ – Chebyshev ist besser.
S Skript S. 85, Satz 8.8, Satz 8.11

A 57 | Stichprobengrösse mit Chebyshev | ungleichung | eis-allg | Level B | cheb
? Wie viele unabhängige Beobachtungen braucht es, damit der Mittelwert mit hoher Wahrscheinlichkeit nahe am Erwartungswert liegt? Preisfrage.
L (a) $n \ge 2500$.
S Skript S. 85–86, Satz 8.11, Satz 8.13

A 58 | Eine Dichte ohne Erwartungswert | verteilung,kennzahl | eis-allg | Level B | cauchy
? Normierungskonstante einer glockenförmigen Dichte mit $\frac{C}{1 + a(x - m)^2}$; existiert der Erwartungswert?
L $C = \frac{\sqrt a}{\pi}$; kein Erwartungswert.
S Skript S. 49, Satz 4.23; S. 82, Def. 8.3

A 59 | Unkorreliert, aber abhängig | gegenbsp,unabh | eis-allg | Level B | cov0
? Zwei Zufallsvariablen mit Kovarianz 0 finden, die nicht unabhängig sind.
L Auf $\{-1, 0, 1\}^2$ ein symmetrisches Mass wählen, z.B. $Y = X^2$-artig.
S Skript S. 77, Satz 7.23(e)
`;
