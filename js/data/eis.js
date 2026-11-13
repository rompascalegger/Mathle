/*
 * EiS – Einführung in die Wahrscheinlichkeitstheorie und Statistik
 * Grundlage: Skript vom 4. September 2026 und Übungsblätter 1–8 (Aufgaben 1–59).
 * Seitenangaben = gedruckte Seitenzahlen im Skript (PDF-Seite minus 4).
 * Format wie in la.js. Neue Fragen bitte am Ende eines Kapitels einfügen.
 */
window.MATHLE = window.MATHLE || {};
MATHLE.raw = MATHLE.raw || {};
MATHLE.similar = MATHLE.similar || {};

MATHLE.raw.eis = String.raw`
# eis-wraum | Wahrscheinlichkeitsräume | Skript Kap. 1

Q tf
? Für $A = \{1, 2, 3\}$ gilt $1 \subset A$.
A falsch
E $1$ ist ein Element: $1 \in A$. Richtig wäre $\{1\} \subset A$.
S Skript S. 7, Ereignisse als Mengen · Blatt 1, Aufgabe 1(a)

Q tf
? $\{2n : n \in \{0, 1, 2\}\} = \{2, 4, 6\}$.
A falsch
E Für $n = 0, 1, 2$ erhält man $\{0, 2, 4\}$.
S Skript S. 2, Benutzte Notation · Blatt 1, Aufgabe 1(b)

Q tf
? Für beliebige Mengen gilt $(A \cap B) \supset (A \cup B)$.
A falsch
E Im Allgemeinen gilt die umgekehrte Inklusion; Gleichheit nur für $A = B$.
S Skript S. 12, Lemma 1.5 · Blatt 1, Aufgabe 1(c)

Q tf
? $\{\emptyset, \{1\}, \{2,3,4\}, \{1,2,3,4\}\}$ ist eine $\sigma$-Algebra auf $\{1, 2, 3, 4\}$.
A wahr
E $\Omega$ ist enthalten, $\{1\}^c = \{2,3,4\}$, und alle Vereinigungen bleiben in der Menge.
S Skript S. 13, Definition 1.7 · Blatt 1, Aufgabe 1(d)

Q tf
? Für beliebige Ereignisse gilt $P(A \cup B) = P(A) + P(B)$.
A falsch
E Nur für disjunkte Ereignisse. Allgemein $P(A \cup B) = P(A) + P(B) - P(A \cap B)$.
S Skript S. 16, Satz 1.12(d) · Blatt 1, Aufgabe 1(e)

Q mc
? Welche Menge ist gleich $(A^c \cup C) \cap (B \cup C)$?
+ $(A^c \cap B) \cup C$
- $A^c \cup B \cup C$
- $(A \cap B^c) \cup C$
- $A^c \cap B \cap C$
E Distributivgesetz: $(X \cup C) \cap (Y \cup C) = (X \cap Y) \cup C$.
S Skript S. 12, Lemma 1.5 · Blatt 1, Aufgabe 2

Q mc
? Welche Menge ist gleich $(A \cap B)^c$?
+ $A^c \cup B^c$
- $A^c \cap B^c$
- $A \setminus B$
- $\Omega$
E Regel von De Morgan.
S Skript S. 12, Lemma 1.5 · Blatt 1, Aufgabe 2

Q mc
? Welche Menge ist gleich $(A \cap B) \cap (C \cap B^c)$?
+ $\emptyset$
- $A \cap C$
- $A \setminus B$
- $\Omega$
E Sie enthält $B \cap B^c = \emptyset$.
S Skript S. 12, Lemma 1.5 · Blatt 1, Aufgabe 2

Q mc
? Wie schreibt man „Höchstens eines der Ereignisse $A, B, C$ tritt ein"?
+ $(A \cap B)^c \cap (A \cap C)^c \cap (B \cap C)^c$
- $A^c \cap B^c \cap C^c$
- $A \cup B \cup C$
- $A^c \cup B^c \cup C^c$
E Kein Paar tritt gemeinsam ein. Die zweite Option ist „keines", die vierte „mindestens eines tritt nicht ein".
S Skript S. 10, Rechnen mit Ereignissen · Blatt 1, Aufgabe 3

Q mc
? Wie schreibt man „Falls $A$ nicht eintritt, tritt auch $B$ nicht ein"?
+ $B \subset A$
- $A \subset B$
- $A \cap B = \emptyset$
- $A^c \cap B^c = \emptyset$
E $A^c \subset B^c$ ist äquivalent zu $B \subset A$.
S Skript S. 10, Rechnen mit Ereignissen · Blatt 1, Aufgabe 3(b)

Q tf
? Bei 80 % Computerbesitz, 70 % DVD-Player-Besitz und 40 % mit beidem sind die Daten widerspruchsfrei.
A falsch
E $P(A \cup B) = 0.8 + 0.7 - 0.4 = 1.1 \gt 1$ – unmöglich. Rechnung nicht bezahlen!
S Skript S. 16, Satz 1.12(d) · Blatt 1, Aufgabe 5

Q multi
? Sei $\Omega = \{1, 2, 3\}$ und $\mathcal{A} = \mathcal{P}(\Omega)$. Was ist wahr?
+ $\Omega \in \mathcal{A}$
- $\Omega \subset \mathcal{A}$
+ $\{1\} \in \mathcal{A}$
+ $\#\mathcal{P}(\Omega) = 8$
E $\Omega$ ist ein Element der Potenzmenge, aber keine Teilmenge (die Elemente von $\Omega$ sind Zahlen, keine Mengen).
S Skript S. 13, $\sigma$-Algebra · Blatt 1, Aufgabe 6

Q input
? $\Omega = \{1,2,3,4\}$, $P(\{1,2\}) = 0.6$, $P(\{2,3\}) = 0.5$, $P(\{2\}) = 0.4$. Was ist $P(\{4\})$?
A 0.3
E $P(\{1\}) = 0.2$, $P(\{3\}) = 0.1$, also $P(\{4\}) = 1 - 0.2 - 0.4 - 0.1 = 0.3$.
S Skript S. 16, Satz 1.12 · Blatt 1, Aufgabe 7

Q tf
? Für beliebige Ereignisse gilt $P\left(\bigcup_{i=1}^\infty A_i\right) \le \sum_{i=1}^\infty P(A_i)$.
A wahr
E Subadditivität: Mit $B_i = A_i \setminus \bigcup_{j \lt i} A_j$ disjunkt machen und $\sigma$-Additivität + Monotonie nutzen.
S Skript S. 15–16, Definition 1.11 und Satz 1.12 · Blatt 1, Aufgabe 8

Q mc
? Auf $((0,1], \mathcal{A}, P)$ gelte $P((a, 1]) = 1 - a$. Was ist $P((a, b])$ für $a \le b$?
+ $b - a$
- $1 - b + a$
- $a - b$
- $b$
E $(a, 1] = (a, b] \cup (b, 1]$ disjunkt: $1 - a = P((a,b]) + 1 - b$.
S Skript S. 16, Satz 1.12(b) · Blatt 1, Aufgabe 9

Q input
? Mit $P((a, b]) = b - a$ auf $(0,1]$: Was ist $P\left(\bigcup_{k=1}^\infty (2 \cdot 3^{-k}, 3^{-k+1}]\right)$?
A 1/2; 0.5
E Die Intervalle sind disjunkt mit Längen $3^{-k+1} - 2 \cdot 3^{-k} = 3^{-k}$, und $\sum_{k \ge 1} 3^{-k} = \frac12$.
S Skript S. 15, $\sigma$-Additivität · Blatt 1, Aufgabe 9(d)

Q mc
? Welche drei Bedingungen definieren eine $\sigma$-Algebra $\mathcal{A}$?
+ $\Omega \in \mathcal{A}$; abgeschlossen unter Komplement; abgeschlossen unter abzählbaren Vereinigungen
- $\emptyset \in \mathcal{A}$; abgeschlossen unter Schnitt; endlich
- $\Omega \in \mathcal{A}$; abgeschlossen unter beliebigen Vereinigungen; $P(\Omega) = 1$
- abgeschlossen unter Komplement und endlichen Vereinigungen
E Daraus folgen $\emptyset \in \mathcal{A}$ und Abgeschlossenheit unter abzählbaren Schnitten (Lemma 1.8).
S Skript S. 13, Definition 1.7

Q mc
? Welche Bedingungen muss ein Wahrscheinlichkeitsmass erfüllen?
+ $P(A) \ge 0$, $P(\Omega) = 1$ und $\sigma$-Additivität
- $P(A) \le 1$ und endliche Additivität
- $P(\emptyset) = 0$ und Monotonie
- $P(A \cup B) = P(A) + P(B)$ für alle $A, B$
E (P0) Positivität, (P1) Normierung, (P2) $\sigma$-Additivität. Alles andere (z.B. $P(\emptyset) = 0$) folgt daraus.
S Skript S. 15, Definition 1.11

Q tf
? Aus den Axiomen folgt $P(A^c) = 1 - P(A)$.
A wahr
E $\Omega = A \cup A^c$ disjunkt, also $1 = P(A) + P(A^c)$.
S Skript S. 16, Satz 1.12(a)

Q tf
? Aus $A \subset B$ folgt $P(A) \le P(B)$.
A wahr
E Monotonie: $P(B) = P(A) + P(B \setminus A) \ge P(A)$.
S Skript S. 16, Satz 1.12(c)

Q mc
? Ein Wahrscheinlichkeitsraum ist …
+ ein Tripel $(\Omega, \mathcal{A}, P)$ aus Grundraum, $\sigma$-Algebra und Wahrscheinlichkeitsmass.
- ein Paar $(\Omega, P)$.
- eine Menge mit einer Verteilungsfunktion.
- eine Zufallsvariable mit Dichte.
E Definition 1.17.
S Skript S. 18, Definition 1.17

Q tf
? Für jede $\sigma$-Algebra gilt: Mit $A, B \in \mathcal{A}$ liegen auch $A \cap B$ und $A \setminus B$ in $\mathcal{A}$.
A wahr
E Über Komplemente und Vereinigungen (De Morgan).
S Skript S. 14, Lemma 1.8(d)

Q mc
? Geeigneter Grundraum für „eine Münze und einen Würfel werfen":
+ $\Omega = \{K, Z\} \times \{1, \dots, 6\}$ mit Laplace-Mass ($\#\Omega = 12$)
- $\Omega = \{1, \dots, 6\}$
- $\Omega = \{K, Z\} \cup \{1, \dots, 6\}$ ($\#\Omega = 8$)
- $\Omega = \{K, Z\}$
E Jedes Ergebnis ist ein Paar; bei fairer Münze und fairem Würfel ist jedes der 12 Paare gleich wahrscheinlich.
S Skript S. 6, Grundraum · Blatt 1, Aufgabe 4

# eis-diskret | Diskrete Räume & Kombinatorik | Skript Kap. 2

Q tf
? $p(1) = p(2) = p(3) = 0.3$ bestimmt ein Wahrscheinlichkeitsmass auf $\{1, 2, 3\}$.
A falsch
E Die Summe ist $0.9 \ne 1$.
S Skript S. 20, Satz 2.1 · Blatt 2, Aufgabe 10(a)

Q tf
? Beim Wurf zweier Würfel sind „Summe 2" und „Summe 3" gleich wahrscheinlich.
A falsch
E Summe 2: nur $(1,1)$, also $\frac{1}{36}$. Summe 3: $(1,2), (2,1)$, also $\frac{2}{36}$.
S Skript S. 21, Laplace-Modelle · Blatt 2, Aufgabe 10(b)

Q tf
? Urne mit 2 blauen und 3 roten Kugeln, zwei Züge mit Zurücklegen: $P(\text{beide rot}) = \frac{9}{25}$.
A wahr
E $\left(\frac35\right)^2 = \frac{9}{25}$.
S Skript S. 26, Ziehen mit Zurücklegen · Blatt 2, Aufgabe 10(c)

Q tf
? Zieht man $k$ Kugeln mit Zurücklegen, so ist die Anzahl roter Kugeln hypergeometrisch verteilt.
A falsch
E Mit Zurücklegen: binomialverteilt. Hypergeometrisch ist sie ohne Zurücklegen.
S Skript S. 26–27, Urnenmodelle · Blatt 2, Aufgabe 10(d)

Q tf
? Die Binomialverteilung auf $\{0, \dots, n\}$ ist ein Laplace-Modell.
A falsch
E Laplace heisst: alle Elementarereignisse gleich wahrscheinlich. $\binom{n}{k}p^k(1-p)^{n-k}$ ist nicht konstant in $k$ (für $n \ge 1$).
S Skript S. 21, Laplace-Modelle · Blatt 2, Aufgabe 10(e)

Q input
? Auf wie viele Arten kann man 8 Türme auf ein Schachbrett stellen, ohne dass sie sich bedrohen?
A 40320; 8!
E Pro Zeile genau ein Turm, die Spalten bilden eine Permutation: $8! = 40320$.
S Skript S. 23, Grundformeln der Kombinatorik · Blatt 2, Aufgabe 11(a)

Q mc
? 5 Tankwagen, 7 Holzwagen, 10 Kieswagen (gleiche Typen ununterscheidbar). Wie viele Zugkompositionen?
+ $\frac{22!}{5!\,7!\,10!}$
- $22!$
- $5! \cdot 7! \cdot 10!$
- $\binom{22}{3}$
E Multinomialkoeffizient $\binom{22}{5, 7, 10} = 512\,143\,632$.
S Skript S. 29, Multinomialverteilung · Blatt 2, Aufgabe 11(b)

Q input
? Wie viele 3-stellige Zahlen aus den Ziffern 1–9 gibt es, wenn jede Ziffer höchstens einmal vorkommt?
A 504
E Geordnete Auswahl ohne Wiederholung: $9 \cdot 8 \cdot 7 = 504$.
S Skript S. 23, Grundformeln der Kombinatorik · Blatt 2, Aufgabe 11(c)

Q input
? Wie viele dreistellige Zahlen haben lauter gerade Ziffern?
A 100
E Erste Ziffer $\in \{2,4,6,8\}$ (nicht 0), die anderen $\in \{0,2,4,6,8\}$: $4 \cdot 5 \cdot 5 = 100$.
S Skript S. 23, Grundformeln der Kombinatorik · Blatt 2, Aufgabe 11(d)

Q input
? Wie viele Dreiecke lassen sich aus 6 Punkten (keine drei auf einer Geraden) bilden?
A 20
E $\binom{6}{3} = 20$.
S Skript S. 23, Grundformeln der Kombinatorik · Blatt 2, Aufgabe 11(e)

Q input
? Wie viele verschiedene Dominosteine gibt es (Zahlen 0 bis 6, Doppel erlaubt)?
A 28
E Ungeordnete Auswahl mit Wiederholung: $\binom{7 + 2 - 1}{2} = 28$ (21 verschiedene Paare + 7 Doppel).
S Skript S. 23, Grundformeln der Kombinatorik · Blatt 2, Aufgabe 11(f)

Q mc
? 36 Karten (4 Farben zu 9), gut gemischt. Wahrscheinlichkeit, dass die zweitoberste Karte ein As ist?
+ $\frac19$
- $\frac{4}{35}$
- $\frac{3}{35}$
- $\frac{1}{36}$
E Aus Symmetrie ist jede Position gleich verteilt wie die oberste: $\frac{4}{36}$.
S Skript S. 21, Laplace-Modelle · Blatt 2, Aufgabe 12(a)

Q mc
? Oberste Karte Herz As, unterste Kreuz As?
+ $\frac{1}{36 \cdot 35}$
- $\frac{1}{36^2}$
- $\frac{2}{36 \cdot 35}$
- $\frac{1}{36}$
E $\frac{34!}{36!} = \frac{1}{1260}$.
S Skript S. 21, Laplace-Modelle · Blatt 2, Aufgabe 12(b)

Q mc
? 6 rote und 8 blaue Socken, zwei zufällig gezogen. Wahrscheinlichkeit für zwei rote?
+ $\frac{15}{91}$
- $\frac{36}{196}$
- $\frac{6}{14}$
- $\frac{30}{91}$
E $\binom62 / \binom{14}{2} = 15 / 91$.
S Skript S. 27, Ziehen ohne Zurücklegen · Blatt 2, Aufgabe 13(a)

Q mc
? Gleiche Schublade: Wahrscheinlichkeit für zwei zueinander passende Socken?
+ $\frac{43}{91}$
- $\frac{48}{91}$
- $\frac12$
- $\frac{28}{91}$
E Zwei rote $\frac{15}{91}$ plus zwei blaue $\frac{28}{91}$.
S Skript S. 27, Ziehen ohne Zurücklegen · Blatt 2, Aufgabe 13(d)

Q mc
? Wie gross ist die Wahrscheinlichkeit, dass unter 90 Personen mindestens zwei am selben Tag Geburtstag haben?
+ mehr als 99.99 %
- etwa 50 %
- etwa 25 %
- genau $\frac{90}{365}$
E $1 - \frac{365 \cdot 364 \cdots 276}{365^{90}} \approx 0.999994$.
S Skript S. 21, Laplace-Modelle · Blatt 2, Aufgabe 14

Q mc
? Stichprobe von 100 aus 1000 Teilen ohne Zurücklegen. Welche Verteilung hat die Anzahl fehlerhafter Teile in der Stichprobe?
+ Hypergeometrisch
- Binomial
- Poisson
- Geometrisch
E Ziehen ohne Zurücklegen. Bei 10 fehlerhaften Teilen ist die Annahmewahrscheinlichkeit (höchstens 3 Fehler) etwa $0.988$.
S Skript S. 27, Ziehen ohne Zurücklegen · Blatt 2, Aufgabe 15

Q mc
? 105 Tickets für 100 Plätze, jede Person erscheint unabhängig mit Wahrscheinlichkeit $0.9$. Wahrscheinlichkeit für Überbuchung?
+ etwa $1.7\,\%$
- etwa $5\,\%$
- etwa $50\,\%$
- $0$
E $X \sim \mathrm{Bin}(105, 0.9)$, gesucht $P(X \ge 101) \approx 0.0167$.
S Skript S. 26, Ziehen mit Zurücklegen (Binomialverteilung) · Blatt 2, Aufgabe 16

Q mc
? Welche Identität zeigt man mit „$r$ Kugeln aus $m$ schwarzen und $n$ weissen ziehen"?
+ $\binom{m+n}{r} = \sum_{j=0}^{r} \binom{n}{j}\binom{m}{r-j}$
- $\binom{m+n}{r} = \binom{m}{r} + \binom{n}{r}$
- $\binom{m+n}{r} = \binom{m}{r}\binom{n}{r}$
- $\sum_j j\binom{n}{j} = n 2^{n-1}$
E Vandermonde: Sortiere nach der Anzahl $j$ der weissen Kugeln.
S Skript S. 23, Grundformeln der Kombinatorik · Blatt 2, Aufgabe 17(a)

Q mc
? $\sum_{j=1}^{n} j\binom{n}{j} = \;$ …
+ $n \cdot 2^{n-1}$
- $2^n$
- $n^2$
- $n!$
E Komitee mit Präsident: Erst Präsident wählen ($n$), dann beliebige Teilmenge der übrigen ($2^{n-1}$).
S Skript S. 23, Grundformeln der Kombinatorik · Blatt 2, Aufgabe 17(c)

Q mc
? Ein Laplace-Modell ist ein endlicher Wahrscheinlichkeitsraum, in dem …
+ alle Elementarereignisse dieselbe Wahrscheinlichkeit haben: $P(A) = \frac{\#A}{\#\Omega}$.
- $P(A) = \frac12$ für alle $A$.
- es nur zwei Ergebnisse gibt.
- die Ergebnisse unabhängig sind.
E „Günstige durch mögliche Fälle".
S Skript S. 21, Laplace-Modelle

Q mc
? Wie viele Möglichkeiten gibt es, $k$ aus $n$ Objekten geordnet und ohne Wiederholung zu wählen?
+ $\frac{n!}{(n-k)!}$
- $\binom{n}{k}$
- $n^k$
- $\binom{n+k-1}{k}$
E Mit Wiederholung wäre es $n^k$, ungeordnet ohne Wiederholung $\binom nk$.
S Skript S. 23, Grundformeln der Kombinatorik

Q tf
? Auf einem höchstens abzählbaren $\Omega$ ist jedes Wahrscheinlichkeitsmass durch die Werte $p(\omega) = P(\{\omega\})$ bestimmt.
A wahr
E $P(A) = \sum_{\omega \in A} p(\omega)$ wegen $\sigma$-Additivität.
S Skript S. 20–21, Satz 2.1 und Bemerkung 2.2

Q mc
? $N$ faire Würfel. Welche Verteilung hat die Anzahl der Sechsen?
+ $\mathrm{Bin}(N, \frac16)$
- Hypergeometrisch
- $\mathrm{Pois}(\frac N6)$
- Gleichverteilung auf $\{0, \dots, N\}$
E Unabhängige Wiederholungen mit Erfolgswahrscheinlichkeit $\frac16$.
S Skript S. 26, Ziehen mit Zurücklegen · Blatt 3, Aufgabe 24(a)

Q mc
? $N$ Würfel; Wahrscheinlichkeit, dass genau $n_i$ Würfel die Zahl $i$ zeigen ($i = 1, \dots, 6$)?
+ $\frac{N!}{n_1! \cdots n_6!}\,6^{-N}$
- $\binom{N}{n_1} 6^{-N}$
- $\frac{1}{6^N}$
- $\prod_i \binom{N}{n_i}6^{-n_i}$
E Multinomialverteilung.
S Skript S. 29, Multinomialverteilung · Blatt 3, Aufgabe 24(c)

# eis-bedingt | Bedingte Wahrscheinlichkeit | Skript Kap. 3

Q mc
? Die bedingte Wahrscheinlichkeit von $A$ gegeben $B$ (mit $P(B) \gt 0$) ist …
+ $P(A \mid B) = \frac{P(A \cap B)}{P(B)}$
- $\frac{P(A \cap B)}{P(A)}$
- $P(A)P(B)$
- $\frac{P(A)}{P(B)}$
E Definition 3.1.
S Skript S. 30, Definition 3.1

Q tf
? Für $P(B) \gt 0$ und disjunkte $A_1, A_2$ gilt $P(A_1 \cup A_2 \mid B) = P(A_1 \mid B) + P(A_2 \mid B)$.
A wahr
E $A \mapsto P(A \mid B)$ ist selbst ein Wahrscheinlichkeitsmass (Satz 3.6).
S Skript S. 32, Satz 3.6 und Korollar 3.7 · Blatt 3, Aufgabe 18(a)

Q tf
? 10 Kugeln ohne Zurücklegen aus 5 roten und 7 weissen: $P(\text{6 rote}) = 0.134$.
A falsch
E Es gibt nur 5 rote Kugeln – die Wahrscheinlichkeit ist $0$.
S Skript S. 27, Ziehen ohne Zurücklegen · Blatt 3, Aufgabe 18(b)

Q tf
? Aus $B \subset C$ und $P(B) \gt 0$ folgt $P(A \mid B) \le P(A \mid C)$.
A falsch
E Gegenbeispiel: $A = B \subsetneq C$ mit $P(C) \gt P(B)$: links $1$, rechts $\frac{P(B)}{P(C)} \lt 1$.
S Skript S. 30, Definition 3.1 · Blatt 3, Aufgabe 18(c)

Q tf
? $P(A_1 \cup A_2 \cup A_3) = P(A_1)P(A_2 \mid A_1)P(A_3 \mid A_1 \cap A_2)$.
A falsch
E Das ist die Multiplikationsregel für den Schnitt $A_1 \cap A_2 \cap A_3$, nicht für die Vereinigung.
S Skript S. 33, Satz 3.10 · Blatt 3, Aufgabe 18(d)

Q tf
? Für $P(B) \gt 0$ gilt $P(A \cap B) \le P(A \mid B)$.
A wahr
E $P(A \cap B) = P(A \mid B)P(B)$ und $P(B) \le 1$.
S Skript S. 30, Definition 3.1 · Blatt 3, Aufgabe 18(e)

Q mc
? Bitfolge der Länge 3, jedes Bit unabhängig mit $p = 0.001$ falsch. Wahrscheinlichkeit für genau 2 Bitfehler?
+ $3p^2(1-p) \approx 3 \cdot 10^{-6}$
- $p^2$
- $\binom32 p(1-p)^2$
- $1 - (1-p)^3$
E Binomial: $\binom{3}{2}p^2(1-p)$.
S Skript S. 26, Binomialverteilung · Blatt 3, Aufgabe 19(b)

Q mc
? Gleicher Kanal: Wahrscheinlichkeit für genau 2 Fehler, gegeben mindestens ein Fehler?
+ etwa $0.001$
- etwa $0.5$
- etwa $3 \cdot 10^{-6}$
- etwa $0.33$
E $\frac{3p^2(1-p)}{1 - (1-p)^3} \approx \frac{3 \cdot 10^{-6}}{3 \cdot 10^{-3}} = 10^{-3}$.
S Skript S. 30, Definition 3.1 · Blatt 3, Aufgabe 19(d)

Q mc
? 15 Karten: 10 rot/rot, 3 schwarz/schwarz, 2 rot/schwarz. Die obere Seite ist rot. Wahrscheinlichkeit, dass die untere schwarz ist?
+ $\frac{1}{11}$
- $\frac{2}{15}$
- $\frac{1}{2}$
- $\frac{4}{15}$
E $P(\text{oben rot}) = \frac{10 + 1}{15}$, $P(\text{oben rot, unten schwarz}) = \frac{1}{15}$.
S Skript S. 30, Definition 3.1 · Blatt 3, Aufgabe 20(b)

Q input
? Glühbirnen-Qualitäten im Verhältnis 17 : 2 : 1 halten mit Wahrscheinlichkeit 0.8 / 0.5 / 0.2 über 5000 h. Wahrscheinlichkeit, dass eine zufällige Birne weniger als 5000 h hält?
A 0.26
E Totale Wahrscheinlichkeit: $0.85 \cdot 0.2 + 0.1 \cdot 0.5 + 0.05 \cdot 0.8 = 0.26$.
S Skript S. 35, Satz 3.12 · Blatt 3, Aufgabe 21(a)

Q mc
? Gleiche Glühbirnen: Eine Birne hielt weniger als 5000 h. Wahrscheinlichkeit, dass sie nicht die niedrigste Qualität hat?
+ $\frac{11}{13}$
- $\frac{2}{13}$
- $0.95$
- $0.26$
E Bayes: $P(\text{niedrigste} \mid \lt 5000) = \frac{0.05 \cdot 0.8}{0.26} = \frac{2}{13}$, also Gegenwahrscheinlichkeit $\frac{11}{13}$.
S Skript S. 37, Satz 3.15 · Blatt 3, Aufgabe 21(b)

Q mc
? Koffer wird an jedem der 3 Flughäfen mit Wahrscheinlichkeit $p$ fehlgeleitet. Er fehlt in LA. Wahrscheinlichkeit, dass es in München (erster Flughafen) passierte?
+ $\frac{p}{1 - (1-p)^3}$
- $\frac13$
- $p$
- $\frac{(1-p)^2 p}{1 - (1-p)^3}$
E München $p$, London $(1-p)p$, New York $(1-p)^2p$; geteilt durch $P(\text{fehlt}) = 1 - (1-p)^3$.
S Skript S. 37, Satz 3.15 · Blatt 3, Aufgabe 22

Q mc
? HIV-Test: Sensitivität 99.9 %, Spezifität 99.8 %, Prävalenz 0.05 %. Positiv getestet – Wahrscheinlichkeit, trotzdem nicht infiziert zu sein?
+ etwa $80\,\%$
- etwa $0.2\,\%$
- etwa $0.1\,\%$
- etwa $50\,\%$
E Bayes: $\frac{0.9995 \cdot 0.002}{0.9995 \cdot 0.002 + 0.0005 \cdot 0.999} \approx 0.80$ – die Krankheit ist selten.
S Skript S. 37, Satz 3.15 · Blatt 3, Aufgabe 23(c)

Q mc
? Ein zweiter, unabhängiger Test ist auch positiv. Wahrscheinlichkeit, nicht infiziert zu sein?
+ etwa $0.8\,\%$
- etwa $80\,\%$
- etwa $64\,\%$
- $0$
E $\frac{0.9995 \cdot 0.002^2}{0.9995 \cdot 0.002^2 + 0.0005 \cdot 0.999^2} \approx 0.008$.
S Skript S. 37, Satz 3.15 · Blatt 3, Aufgabe 23(d)

Q mc
? Satz der totalen Wahrscheinlichkeit: Für eine Zerlegung $B_1, B_2, \dots$ von $\Omega$ gilt $P(A) = \;$ …
+ $\sum_i P(A \mid B_i) P(B_i)$
- $\sum_i P(B_i \mid A)$
- $\prod_i P(A \mid B_i)$
- $\sum_i P(A) P(B_i)$
E Summiert wird über die $i$ mit $P(B_i) \gt 0$.
S Skript S. 35, Satz 3.12

Q mc
? Bayessche Regel: $P(B \mid A) = \;$ …
+ $\frac{P(A \mid B)P(B)}{P(A \mid B)P(B) + P(A \mid B^c)P(B^c)}$
- $\frac{P(A \mid B)}{P(B)}$
- $P(A \mid B)$
- $\frac{P(A)P(B)}{P(A \cap B)}$
E Zähler: Definition + Multiplikationsregel. Nenner: totale Wahrscheinlichkeit.
S Skript S. 37, Satz 3.15

Q tf
? Im Allgemeinen gilt $P(A \mid B^c) = 1 - P(A \mid B)$.
A falsch
E Die Rechenregeln gelten nur im ersten Argument: $P(A^c \mid B) = 1 - P(A \mid B)$.
S Skript S. 33, Bemerkung 3.8

Q mc
? Erweiterte Multiplikationsregel: $P(A_1 \cap \dots \cap A_n) = \;$ …
+ $P(A_1)P(A_2 \mid A_1) \cdots P(A_n \mid A_1 \cap \dots \cap A_{n-1})$
- $P(A_1) \cdots P(A_n)$
- $\sum_i P(A_i)$
- $P(A_n \mid A_1)$
E Gilt immer (falls $P(A_1 \cap \dots \cap A_{n-1}) \gt 0$), ganz ohne Unabhängigkeit.
S Skript S. 33, Satz 3.10

Q tf
? Für fallende Ereignisse $A_1 \supset A_2 \supset \dots$ gilt $P\left(\bigcap_i A_i\right) = \lim_n P(A_n)$.
A wahr
E Komplemente bilden eine wachsende Folge; dann Stetigkeit von unten anwenden.
S Skript S. 44, Satz 4.14 · Blatt 3, Aufgabe 25

# eis-zv | Zufallsvariablen & Verteilungsfunktionen | Skript Kap. 4

Q tf
? $f(x) = \sin x$ auf $[0, 2\pi]$ (und $0$ sonst) ist eine Dichte.
A falsch
E Auf $(\pi, 2\pi)$ ist $\sin x \lt 0$, und $\int_0^{2\pi} \sin = 0 \ne 1$.
S Skript S. 49, Satz 4.23 · Blatt 4, Aufgabe 26(a)

Q tf
? Für $F(x) = x^2$ auf $[0,1]$ (0 links, 1 rechts) gilt $P(X \in [\frac34, 2]) = \frac{5}{16}$.
A falsch
E $F(2) - F(\frac34) = 1 - \frac{9}{16} = \frac{7}{16}$.
S Skript S. 46, Satz 4.15(b) · Blatt 4, Aufgabe 26(b)

Q tf
? Ist $F_X$ stetig, so gilt $P(X = x) = 0$ für alle $x$.
A wahr
E $P(X = x) = F_X(x) - F_X(x-)$ ist die Sprunghöhe.
S Skript S. 47, Bemerkung 4.18 · Blatt 4, Aufgabe 26(c)

Q tf
? Jede diskrete Zufallsvariable besitzt eine Dichtefunktion.
A falsch
E Ihre Verteilungsfunktion springt; eine Dichte würde eine stetige Verteilungsfunktion liefern.
S Skript S. 47–49, Definitionen 4.19 und 4.21 · Blatt 4, Aufgabe 26(d)

Q tf
? Aus $X \le Y$ folgt $F_X \ge F_Y$.
A wahr
E $\{Y \le x\} \subset \{X \le x\}$, also $F_Y(x) \le F_X(x)$.
S Skript S. 43, Definition 4.9 · Blatt 4, Aufgabe 26(e)

Q mc
? $M$ = Maximum zweier fairer Würfel. $P(M = k) = \;$ …
+ $\frac{2k - 1}{36}$
- $\frac{k}{36}$
- $\frac16$
- $\frac{k^2}{36}$
E $P(M \le k) = \frac{k^2}{36}$, also $P(M = k) = \frac{k^2 - (k-1)^2}{36}$.
S Skript S. 48, Definition 4.20 · Blatt 4, Aufgabe 27

Q mc
? $P(R \le a) = 1 - e^{-a}$. Verteilungsfunktion der Fläche $A = \pi R^2$ für $a \ge 0$?
+ $F_A(a) = 1 - e^{-\sqrt{a/\pi}}$
- $1 - e^{-\pi a^2}$
- $1 - e^{-a/\pi}$
- $\pi(1 - e^{-a})^2$
E $P(\pi R^2 \le a) = P(R \le \sqrt{a/\pi})$.
S Skript S. 43, Definition 4.9 · Blatt 4, Aufgabe 28

Q multi
? Welche Funktionen sind Verteilungsfunktionen?
+ $F = 0$ für $x \lt 0$, $x$ auf $[0,1]$, $1$ für $x \gt 1$
- $F = 0$ für $x \lt 0$, $\frac12$ auf $[0,1]$, $1$ für $x \gt 1$
- $F = x^2$ auf $[0, \frac12)$, $2x - 1$ auf $[\frac12, 1)$, sonst $0$ bzw. $1$
+ $F = x^2$ auf $[0, \frac12)$, $\frac{x+1}{2}$ auf $[\frac12, 1)$, sonst $0$ bzw. $1$
E Zweite: nicht rechtsstetig in $1$ ($F(1) = \frac12$). Dritte: fällt in $\frac12$ von $\frac14$ auf $0$, nicht monoton.
S Skript S. 43–44, Satz 4.12 und Bemerkung 4.13 · Blatt 4, Aufgabe 29

Q input
? Für $F = x^2$ auf $[0, \frac12)$, $\frac{x+1}{2}$ auf $[\frac12, 1)$: Was ist $P(X = \frac12)$?
A 1/2; 0.5
E Sprunghöhe: $F(\frac12) - F(\frac12 -) = \frac34 - \frac14 = \frac12$.
S Skript S. 46, Satz 4.15(c) · Blatt 4, Aufgabe 29(e)

Q mc
? $f(x) = c\, x^{-\alpha}$ für $x \ge 1$ (sonst 0). Wann ist $f$ eine Dichte und was ist $c$?
+ Für $\alpha \gt 1$ mit $c = \alpha - 1$
- Für alle $\alpha \ge 0$ mit $c = \alpha$
- Für $\alpha \gt 0$ mit $c = \frac{1}{\alpha}$
- Für $\alpha \lt 1$ mit $c = 1 - \alpha$
E $\int_1^\infty x^{-\alpha}dx = \frac{1}{\alpha - 1}$ nur für $\alpha \gt 1$ endlich.
S Skript S. 49, Satz 4.23(b) · Blatt 4, Aufgabe 30(a)

Q mc
? $f(x) = 1 - 2\alpha x$ auf $[0, c]$, sonst 0. Für welche $\alpha \ge 0$ gibt es ein passendes $c$?
+ Genau für $0 \le \alpha \le \frac14$
- Für alle $\alpha \ge 0$
- Nur für $\alpha = 0$
- Für $\alpha \ge \frac14$
E $\int_0^c f = c - \alpha c^2 = 1$ hat nur für $1 - 4\alpha \ge 0$ eine Lösung; zudem muss $f \ge 0$ auf $[0, c]$ bleiben.
S Skript S. 49, Satz 4.23 · Blatt 4, Aufgabe 30(b)

Q mc
? Welche Verteilungsfunktion hat keine Dichte?
+ $x^4$ auf $[0, \frac12)$, $x^2$ auf $[\frac12, 1]$
- $x^3$ auf $[0, 1]$
- $\frac{1}{1 + e^{-x}}$
- $x$ auf $[0, 1]$
E Sie springt in $\frac12$ von $\frac{1}{16}$ auf $\frac14$ – mit Dichte wäre $F$ stetig.
S Skript S. 49, Satz 4.23(c) · Blatt 4, Aufgabe 31

Q mc
? Dichte der logistischen Verteilungsfunktion $F(x) = \frac{1}{1 + e^{-x}}$?
+ $\frac{e^{-x}}{(1 + e^{-x})^2}$
- $\frac{1}{(1 + e^{-x})^2}$
- $e^{-x}$
- $\frac{-e^{-x}}{1 + e^{-x}}$
E Ableiten: $f = F'$ (Satz 4.23(d)).
S Skript S. 49, Satz 4.23(d) · Blatt 4, Aufgabe 31(c)

Q mc
? $\omega$ gleichverteilt auf $[0,1]$, $X(\omega) = \omega^2$. Was ist $F_X(x)$ für $x \in [0, 1]$?
+ $\sqrt{x}$
- $x^2$
- $x$
- $2x$
E $P(\omega^2 \le x) = P(\omega \le \sqrt x) = \sqrt x$.
S Skript S. 43, Definition 4.9 · Blatt 4, Aufgabe 32(a)

Q mc
? Welche Eigenschaften hat jede Verteilungsfunktion?
+ nicht-fallend, rechtsstetig, $F(-\infty) = 0$, $F(+\infty) = 1$
- stetig und streng wachsend
- differenzierbar
- linksstetig mit $F(0) = 0$
E Umgekehrt ist jede solche Funktion Verteilungsfunktion einer Zufallsvariable (Bemerkung 4.13).
S Skript S. 43–44, Satz 4.12 und Bemerkung 4.13

Q mc
? Für die Verteilungsfunktion gilt $P(X \in (a, b]) = \;$ …
+ $F(b) - F(a)$
- $F(b) - F(a-)$
- $F(b-) - F(a)$
- $F(a) - F(b)$
E $(a, b]$: rechts eingeschlossen, links nicht – genau passend zu $F(x) = P(X \le x)$.
S Skript S. 46, Satz 4.15(b)

Q mc
? Die Verteilungsfunktion einer Zufallsvariable $X$ ist definiert als …
+ $F_X(x) = P(X \le x)$
- $F_X(x) = P(X \lt x)$
- $F_X(x) = P(X = x)$
- $F_X(x) = P(X \ge x)$
E Definition 4.9.
S Skript S. 43, Definition 4.9

Q tf
? Für eine stetige Zufallsvariable mit Dichte gilt $P(X \in [a, b]) = P(X \in (a, b)) = \int_a^b f_X$.
A wahr
E Einzelne Punkte haben Wahrscheinlichkeit $0$.
S Skript S. 49, Satz 4.23(c)

Q tf
? Eine Dichtefunktion erfüllt immer $f(x) \le 1$.
A falsch
E Die Gleichverteilung auf $[0, \frac12]$ hat die Dichte $2$. Nur das Integral muss $1$ sein.
S Skript S. 49, Satz 4.23 · Blatt 5, Aufgabe 33(a)

# eis-unabh | Unabhängigkeit | Skript Kap. 5

Q mc
? Zwei Ereignisse $A, B$ heissen unabhängig, wenn …
+ $P(A \cap B) = P(A)P(B)$
- $A \cap B = \emptyset$
- $P(A \mid B) = P(B \mid A)$
- $P(A \cup B) = P(A) + P(B)$
E Disjunkt und unabhängig ist fast das Gegenteil: Disjunkte Ereignisse mit positiver Wahrscheinlichkeit sind abhängig.
S Skript S. 52, Definition 5.1

Q tf
? Sind $A, B$ unabhängig, so gilt $P(A^c \cap B) = (1 - P(A))P(B)$.
A wahr
E Mit $A, B$ sind auch $A^c, B$ unabhängig.
S Skript S. 52, Satz 5.3 · Blatt 5, Aufgabe 33(b)

Q tf
? $\Omega$ und jedes Ereignis $A$ sind unabhängig.
A wahr
E $P(\Omega \cap A) = P(A) = P(\Omega)P(A)$.
S Skript S. 52, Definition 5.1 · Blatt 5, Aufgabe 33(c)

Q tf
? Sind $A, B$ unabhängig, so gilt $P(A \cup B) = P(A) + P(B)$.
A falsch
E $P(A \cup B) = P(A) + P(B) - P(A)P(B)$.
S Skript S. 16 und S. 52, Satz 1.12(d), Definition 5.1 · Blatt 5, Aufgabe 33(d)

Q tf
? Die Koordinaten $X, Y$ eines zufälligen Punktes im Dreieck $(0,0), (1,0), (0,1)$ sind unabhängig.
A falsch
E $P(X \gt \frac12, Y \gt \frac12) = 0$, aber beide Einzelwahrscheinlichkeiten sind positiv.
S Skript S. 57, Definition 5.14 · Blatt 5, Aufgabe 33(e)

Q mc
? Drei Kugeln ohne Zurücklegen aus 12 nummerierten. $P(X_3 \ge 3(X_1 + X_2))$?
+ $\frac{1}{132}$
- $\frac{1}{1320}$
- $\frac{1}{12}$
- $\frac{1}{66}$
E Nur $\{X_1, X_2\} = \{1,2\}$ mit $X_3 \in \{9, \dots, 12\}$ (8 Fälle) oder $\{1,3\}$ mit $X_3 = 12$ (2 Fälle): $\frac{10}{1320}$.
S Skript S. 21, Laplace-Modelle · Blatt 5, Aufgabe 34(b)

Q input
? Gleiche Urne: Wahrscheinlichkeit, dass $X_1 + X_2 + X_3$ gerade ist?
A 1/2; 0.5
E Gerade Summe: 0 oder 2 ungerade Zahlen. $\frac{6\cdot5\cdot4 + 3 \cdot 6 \cdot 5 \cdot 6}{1320} = \frac{660}{1320}$.
S Skript S. 21, Laplace-Modelle · Blatt 5, Aufgabe 34(c)

Q mc
? $f_X(t) = C_\alpha t^{-\alpha}$ für $t \ge 1$. Was ist $F_X(t)$ für $t \ge 1$?
+ $1 - t^{1-\alpha}$
- $t^{1-\alpha}$
- $1 - t^{-\alpha}$
- $(\alpha - 1)t^{-\alpha}$
E Mit $C_\alpha = \alpha - 1$: $\int_1^t (\alpha-1)s^{-\alpha}ds = 1 - t^{1-\alpha}$.
S Skript S. 49, Satz 4.23 · Blatt 5, Aufgabe 35(b)

Q tf
? Für $X$ wie oben ist $Y = \max(100, X)$ eine stetige Zufallsvariable.
A falsch
E $P(Y = 100) = P(X \le 100) \gt 0$ – $F_Y$ springt in $100$.
S Skript S. 47, Bemerkung 4.18 · Blatt 5, Aufgabe 35(c)

Q mc
? Für $X$ mit $F_X(t) = 1 - t^{1-\alpha}$: Wie ist $Z = \alpha \ln X$ verteilt?
+ $\mathrm{Exp}\left(\frac{\alpha - 1}{\alpha}\right)$
- $\mathrm{Exp}(\alpha)$
- $\mathrm{Exp}(\alpha - 1)$
- gleichverteilt
E $P(Z \le z) = P(X \le e^{z/\alpha}) = 1 - e^{-z(\alpha-1)/\alpha}$.
S Skript S. 67, Definition 6.14 · Blatt 5, Aufgabe 35(d)

Q multi
? Zwei faire Würfel, $X_1, X_2$ die Augenzahlen, $S = X_1 + X_2$. Welche Ereignis-Kollektionen sind unabhängig?
+ „$X_1$ gerade" und „$X_2 \ge 5$"
- „$X_1$ gerade" und „$X_1 \ge 2$"
+ „$X_1$ gerade" und „$X_1 \ge 3$"
+ „$S$ gerade" und „$X_1$ gerade"
+ „$S$ gerade", „$X_1$ gerade" und „$X_2 \ge 5$"
E Zweite: $P = \frac12 \ne \frac12 \cdot \frac56$. Dritte: $P(\{4, 6\}) = \frac13 = \frac12 \cdot \frac23$. Letzte: Alle vier Produktgleichungen gelten (z.B. $P(\text{alle drei}) = \frac{1}{12}$).
S Skript S. 53, Definition 5.5 · Blatt 5, Aufgabe 36

Q mc
? Ereignisse $A_1, \dots, A_n$ heissen (vollständig) unabhängig, wenn …
+ $P\left(\bigcap_{i \in J} A_i\right) = \prod_{i \in J} P(A_i)$ für jede Teilmenge $J$ mit mindestens zwei Elementen
- sie paarweise unabhängig sind
- $P(A_1 \cap \dots \cap A_n) = P(A_1) \cdots P(A_n)$
- sie paarweise disjunkt sind
E Für drei Ereignisse sind vier Gleichungen zu prüfen.
S Skript S. 53, Definition 5.5

Q tf
? Paarweise Unabhängigkeit impliziert vollständige Unabhängigkeit.
A falsch
E Standardbeispiel: zwei Münzwürfe, $A$ = 1. Kopf, $B$ = 2. Kopf, $C$ = gleiche Ergebnisse.
S Skript S. 53 und S. 58, Definition 5.5, Bemerkung 5.18

Q mc
? Serienschaltung zweier unabhängiger Bauteile ($p_1, p_2$). Wahrscheinlichkeit, dass das Gerät funktioniert?
+ $p_1 p_2$
- $1 - (1 - p_1)(1 - p_2)$
- $p_1 + p_2$
- $\max(p_1, p_2)$
E Beide müssen funktionieren. Parallel wäre es $1 - (1-p_1)(1-p_2)$.
S Skript S. 55, Beispiel 5.9 · Blatt 5, Aufgabe 37

Q mc
? Parallelschaltung zweier unabhängiger Bauteile. Wahrscheinlichkeit, dass das Gerät funktioniert?
+ $1 - (1 - p_1)(1 - p_2)$
- $p_1 p_2$
- $p_1 + p_2$
- $\frac{p_1 + p_2}{2}$
E Es fällt nur aus, wenn beide ausfallen.
S Skript S. 55, Beispiel 5.9 · Blatt 5, Aufgabe 37

Q mc
? Für unabhängige $A_1, \dots, A_n$ gilt $P(A_1 \cup \dots \cup A_n) = \;$ …
+ $1 - P(A_1^c) \cdots P(A_n^c)$
- $P(A_1) + \dots + P(A_n)$
- $P(A_1) \cdots P(A_n)$
- $1 - P(A_1) \cdots P(A_n)$
E Gegenereignis „keines tritt ein" und Unabhängigkeit der Komplemente.
S Skript S. 54, Korollar 5.8

Q tf
? Diskrete $X, Y$ sind genau dann unabhängig, wenn $p_{X,Y}(x, y) = p_X(x)p_Y(y)$ für alle $x, y$.
A wahr
E Für Intervalle summiert man die Produktformel auf.
S Skript S. 57 und S. 99, Definition 5.14, Satz 10.11 · Blatt 5, Aufgabe 38

Q mc
? Zufallsvariablen $X, Y$ heissen unabhängig, wenn …
+ $P(X \in I, Y \in J) = P(X \in I)P(Y \in J)$ für alle Intervalle $I, J$
- $E(XY) = EX \cdot EY$
- $\mathrm{Cov}(X, Y) = 0$
- $X + Y$ normalverteilt ist
E Unkorreliertheit ist schwächer (Blatt 8, Aufgabe 59).
S Skript S. 57, Definition 5.14

# eis-vert | Wichtige Verteilungen | Skript Kap. 6

Q tf
? Sind $X, Y \sim \mathrm{Ber}(p)$ unabhängig, so ist $X + Y \sim \mathrm{Bin}(2, p)$.
A wahr
E Summe unabhängiger Bernoulli-Variablen.
S Skript S. 61, Definition 6.2 · Blatt 6, Aufgabe 39(a)

Q tf
? Für $X \sim \mathrm{Pois}(\lambda)$ gilt $P(X = 0) = e^{-\lambda}$.
A wahr
E $\frac{\lambda^0}{0!}e^{-\lambda}$.
S Skript S. 64, Definition 6.9 · Blatt 6, Aufgabe 39(b)

Q tf
? Der Wertebereich der geometrischen Verteilung ist $\{0, 1, 2, \dots\}$.
A falsch
E Im Skript: $\mathbb{N} = \{1, 2, \dots\}$, $P(T = k) = (1-p)^{k-1}p$ – Zeitpunkt des ersten Erfolgs.
S Skript S. 62, Definition 6.4 · Blatt 6, Aufgabe 39(c)

Q tf
? Für geometrisches $T$ gilt $P(T = m + k \mid T \ge m) = P(T = k)$.
A falsch
E Richtig ist die Bedingung $T \gt m$ (Lemma 6.6). Mit $T \ge m$ erhält man $P(T = k+1)$.
S Skript S. 63, Lemma 6.6 · Blatt 6, Aufgabe 39(d)

Q tf
? Für die Gleichverteilung auf $[a, b]$ gilt $F\left(\frac{a+b}{2}\right) = \frac13$.
A falsch
E Der Mittelpunkt hat $F = \frac12$.
S Skript S. 68, Definition 6.20 · Blatt 6, Aufgabe 39(e)

Q mc
? Nebenwirkung in 0.5 % der Fälle, 500 Impfungen. Wahrscheinlichkeit für mindestens eine Nebenwirkung?
+ etwa $0.92$
- etwa $0.5$
- etwa $0.08$
- $2.5$
E Poisson-Näherung mit $\lambda = 500 \cdot 0.005 = 2.5$: $1 - e^{-2.5} \approx 0.918$. Im Mittel $2.5$ Fälle.
S Skript S. 65, Satz 6.11 · Blatt 6, Aufgabe 40

Q mc
? A und B würfeln abwechselnd ABAB…, wer zuerst eine Sechs wirft, gewinnt. Wahrscheinlichkeit, dass A gewinnt?
+ $\frac{6}{11}$
- $\frac12$
- $\frac16$
- $\frac{5}{11}$
E $P = \frac16 + \left(\frac56\right)^2 P$, also $P = \frac{1/6}{1 - 25/36} = \frac{6}{11}$.
S Skript S. 62, Definition 6.4 · Blatt 6, Aufgabe 41

Q mc
? Reihenfolge ABBABABA…. Wahrscheinlichkeit, dass A gewinnt?
+ $\frac{191}{396} \approx 0.48$
- $\frac{6}{11}$
- $\frac13$
- $\frac12$
E Nach den ersten drei Würfen beginnt wieder ABAB… mit A: $\frac16 + \left(\frac56\right)^3 \cdot \frac{6}{11}$.
S Skript S. 62, Definition 6.4 · Blatt 6, Aufgabe 41

Q mc
? Reichweite $\sim \mathrm{Exp}(0.0011)$ km. Wahrscheinlichkeit, 5000 km ohne Laden zu schaffen?
+ $e^{-5.5} \approx 0.004$
- $1 - e^{-5.5}$
- $0.0011 \cdot 5000$
- $e^{-0.0011}$
E $P(T \ge t) = e^{-\lambda t}$.
S Skript S. 67, Definition 6.14 · Blatt 6, Aufgabe 42

Q mc
? Capture-recapture: Wie ist die Anzahl markierter Fische unter $n$ gefangenen verteilt?
+ Hypergeometrisch: $P(X = k) = \frac{\binom{M}{k}\binom{N - M}{n - k}}{\binom{N}{n}}$
- $\mathrm{Bin}(n, M/N)$
- $\mathrm{Pois}(nM/N)$
- geometrisch
E Ziehen ohne Zurücklegen aus $N$ Fischen, davon $M$ markiert. Der ML-Schätzer ist $\hat N \approx \frac{Mn}{k}$.
S Skript S. 27, Ziehen ohne Zurücklegen · Blatt 6, Aufgabe 43

Q tf
? Sind $Y_1 \sim \mathrm{Bin}(n_1, p)$ und $Y_2 \sim \mathrm{Bin}(n_2, p)$ unabhängig, so ist $Y_1 + Y_2 \sim \mathrm{Bin}(n_1 + n_2, p)$.
A wahr
E Summenstabilität: Beide sind Summen unabhängiger Bernoulli-Variablen.
S Skript S. 61, Definition 6.2 · Blatt 6, Aufgabe 44(c)

Q mc
? $P(T = k) = (1-p)^{k-1}p$ für $k \in \mathbb{N}$ ist die …
+ geometrische Verteilung
- Binomialverteilung
- Poisson-Verteilung
- Exponentialverteilung
E Wartezeit bis zum ersten Erfolg in unabhängigen Bernoulli-Versuchen.
S Skript S. 62, Definition 6.4

Q mc
? Gedächtnislosigkeit der geometrischen Verteilung:
+ $P(T = m + k \mid T \gt m) = P(T = k)$
- $P(T \gt m + k) = P(T \gt m) + P(T \gt k)$
- $P(T = k) = P(T = k + 1)$
- $E(T) = E(T \mid T \gt m)$
E „Kein Altersphänomen". Umgekehrt ist jede gedächtnislose $\mathbb{N}$-wertige Verteilung geometrisch (Lemma 6.7).
S Skript S. 63, Lemma 6.6 und 6.7

Q mc
? Poisson-Approximation: Ist $X_n \sim \mathrm{Bin}(n, p_n)$ mit $n p_n \to \lambda$, so …
+ $P(X_n = k) \to \frac{\lambda^k}{k!}e^{-\lambda}$
- $X_n \to \lambda$
- $P(X_n = k) \to \binom{n}{k}\lambda^k$
- $P(X_n = 0) \to 1$
E „Gesetz der seltenen Ereignisse".
S Skript S. 65, Satz 6.11

Q mc
? Dichte der Exponentialverteilung $\mathrm{Exp}(\lambda)$:
+ $\lambda e^{-\lambda t}$ für $t \ge 0$
- $e^{-\lambda t}$ für $t \ge 0$
- $\frac{\lambda^t}{t!}e^{-\lambda}$
- $1 - e^{-\lambda t}$
E Die letzte Option ist die Verteilungsfunktion.
S Skript S. 67, Definition 6.14

Q mc
? Gedächtnislosigkeit der Exponentialverteilung:
+ $P(T \ge t + s \mid T \ge t) = P(T \ge s)$
- $P(T \ge t + s) = P(T \ge t) + P(T \ge s)$
- $f(t + s) = f(t)f(s)$
- $E(T \mid T \ge t) = E(T)$
E $\frac{e^{-\lambda(t+s)}}{e^{-\lambda t}} = e^{-\lambda s}$. Darum modelliert man damit Lebensdauern ohne Alterung.
S Skript S. 68, Lemma 6.16 und 6.17

Q mc
? Dichte der Gleichverteilung auf $[a, b]$:
+ $\frac{1}{b - a}$ auf $[a, b]$, sonst $0$
- $b - a$ auf $[a, b]$
- $\frac{x - a}{b - a}$
- $1$ auf $[a, b]$
E Die dritte Option ist die Verteilungsfunktion auf $[a, b]$.
S Skript S. 68, Definition 6.20

Q mc
? Wahrscheinlichkeitsfunktion der Poisson-Verteilung:
+ $P(X = k) = \frac{\lambda^k}{k!}e^{-\lambda}$, $k \in \mathbb{N}_0$
- $\binom{n}{k}\lambda^k(1-\lambda)^{n-k}$
- $\lambda e^{-\lambda k}$
- $(1 - \lambda)^{k-1}\lambda$
E Normierung über $e^\lambda = \sum \frac{\lambda^k}{k!}$.
S Skript S. 64, Definition 6.9

# eis-erw | Erwartungswert & Varianz | Skript Kap. 7

Q tf
? Für diskretes $X$ gilt $\sum_{\omega} p(\omega)X(\omega) = \sum_{x \in \Omega_X} x\, p_X(x)$.
A wahr
E Man fasst die $\omega$ mit gleichem Wert $X(\omega) = x$ zusammen.
S Skript S. 71, Lemma 7.5 · Blatt 7, Aufgabe 45(a)

Q tf
? Für jede Zufallsvariable gilt $E(2X) \ge E(X)$.
A falsch
E $E(2X) = 2EX$ – für $EX \lt 0$ ist das kleiner.
S Skript S. 72, Satz 7.9(b) · Blatt 7, Aufgabe 45(b)

Q tf
? Für beliebige $X, Y$ (mit Erwartungswert) gilt $E(X + Y) = EX + EY$.
A wahr
E Linearität – ohne Unabhängigkeit.
S Skript S. 72, Satz 7.9(b) · Blatt 7, Aufgabe 45(c)

Q tf
? Für $Y \gt 0$ gilt $E(X / Y) = EX / EY$.
A falsch
E Schon für $X = 1$ ist $E(1/Y) \ne 1/EY$ im Allgemeinen (Jensen).
S Skript S. 74, Satz 7.12 · Blatt 7, Aufgabe 45(d)

Q tf
? Mit $M = \max\{|x| : x \in \Omega_X\}$ gilt $|EX| \le M$.
A wahr
E $|EX| \le E|X| \le M$ (Monotonie).
S Skript S. 72, Satz 7.9(c) · Blatt 7, Aufgabe 45(e)

Q mc
? $\Omega = \{1,2,3\}$, $p = (\frac12, \frac13, \frac16)$, $X(\omega) = \omega^2$. Was ist $EX$?
+ $\frac{10}{3}$
- $\frac{14}{3}$
- $2$
- $\frac{5}{3}$
E $\frac12 \cdot 1 + \frac13 \cdot 4 + \frac16 \cdot 9 = \frac{3 + 8 + 9}{6}$.
S Skript S. 70, Definition 7.1 · Blatt 7, Aufgabe 46

Q mc
? Gleiche Situation: Was ist $\mathrm{Var}\, X$?
+ $\frac{74}{9}$
- $\frac{58}{3}$
- $\frac{10}{3}$
- $\frac{100}{9}$
E $E(X^2) = \frac12 + \frac{16}{3} + \frac{81}{6} = \frac{58}{3}$, dann $\frac{58}{3} - \frac{100}{9} = \frac{74}{9}$.
S Skript S. 76, Satz 7.19(a) · Blatt 7, Aufgabe 46

Q mc
? Erwartungswert und Varianz von $X \sim \mathrm{Bin}(n, p)$:
+ $EX = np$, $\mathrm{Var}\, X = np(1-p)$
- $EX = np$, $\mathrm{Var}\, X = np$
- $EX = p$, $\mathrm{Var}\, X = p(1-p)$
- $EX = n$, $\mathrm{Var}\, X = np^2$
E Summe von $n$ unabhängigen $\mathrm{Ber}(p)$; Varianzen addieren sich.
S Skript S. 77, Satz 7.23(f) · Blatt 7, Aufgabe 47

Q mc
? Erwartungswert und Varianz von $X \sim \mathrm{Pois}(\lambda)$:
+ $EX = \lambda$, $\mathrm{Var}\, X = \lambda$
- $EX = \lambda$, $\mathrm{Var}\, X = \lambda^2$
- $EX = \frac1\lambda$, $\mathrm{Var}\, X = \frac{1}{\lambda^2}$
- $EX = e^{-\lambda}$, $\mathrm{Var}\, X = \lambda$
E Mit $\sum_k k\frac{\lambda^k}{k!} = \lambda e^\lambda$ und $E(X(X-1)) = \lambda^2$.
S Skript S. 70 und S. 76, Definitionen 7.1 und 7.15 · Blatt 7, Aufgabe 48

Q mc
? Erwartungswert und Varianz von $T \sim \mathrm{Geom}(p)$:
+ $ET = \frac1p$, $\mathrm{Var}\, T = \frac{1-p}{p^2}$
- $ET = \frac{1-p}{p}$, $\mathrm{Var}\, T = \frac{1}{p^2}$
- $ET = p$, $\mathrm{Var}\, T = p(1-p)$
- $ET = \frac1p$, $\mathrm{Var}\, T = \frac1p$
E Über $\sum i(i-1)x^{i-2} = \frac{2}{(1-x)^3}$.
S Skript S. 75, Satz 7.13 · Blatt 7, Aufgabe 49

Q mc
? $T_n = I_1 + \dots + I_n$ mit unabhängigen $I_i \sim \mathrm{Geom}(p)$. Erwartungswert und Varianz?
+ $ET_n = \frac np$, $\mathrm{Var}\, T_n = \frac{n(1-p)}{p^2}$
- $ET_n = \frac{1}{np}$, $\mathrm{Var}\, T_n = \frac{1-p}{np^2}$
- $ET_n = \frac np$, $\mathrm{Var}\, T_n = \frac{n^2(1-p)}{p^2}$
- $ET_n = np$, $\mathrm{Var}\, T_n = np(1-p)$
E Linearität und Additivität der Varianz für unabhängige Summanden. ($T_n$ ist negativ-binomialverteilt.)
S Skript S. 77, Satz 7.23(f) · Blatt 7, Aufgabe 49(c)

Q mc
? $X_1, \dots, X_{100}$ unabhängig mit $EX_i = 0$, $\mathrm{Var}\,X_i = 1$, $Y_i = X_i + \dots + X_{i+9}$. Was ist $\mathrm{Cov}(Y_i, Y_j)$?
+ $\max(0,\ 10 - |i - j|)$
- $0$ für $i \ne j$
- $10$
- $|i - j|$
E Gemeinsame Summanden zählen: Jeder trägt $\mathrm{Var}\,X = 1$ bei. Insbesondere $\mathrm{Var}\, Y_i = 10$.
S Skript S. 77, Satz 7.23 · Blatt 7, Aufgabe 50

Q mc
? Varianzformel:
+ $\mathrm{Var}\, X = E(X^2) - (EX)^2$
- $\mathrm{Var}\, X = (EX)^2 - E(X^2)$
- $\mathrm{Var}\, X = E(X)^2$
- $\mathrm{Var}\, X = E|X - EX|$
E Folgt aus der Linearität.
S Skript S. 76, Satz 7.19(a)

Q mc
? $\mathrm{Var}(aX + b) = \;$ …
+ $a^2\, \mathrm{Var}\, X$
- $a\, \mathrm{Var}\, X + b$
- $a^2\, \mathrm{Var}\, X + b^2$
- $|a|\, \mathrm{Var}\, X$
E Verschiebung ändert die Streuung nicht, Skalierung geht quadratisch ein.
S Skript S. 76, Satz 7.19(b)

Q mc
? $\mathrm{Var}(X + Y) = \;$ …
+ $\mathrm{Var}\, X + \mathrm{Var}\, Y + 2\,\mathrm{Cov}(X, Y)$
- $\mathrm{Var}\, X + \mathrm{Var}\, Y$ (immer)
- $\mathrm{Var}\, X \cdot \mathrm{Var}\, Y$
- $(\mathrm{Var}\, X + \mathrm{Var}\, Y)^2$
E Ohne Kovarianzterm nur bei unkorrelierten (z.B. unabhängigen) Variablen.
S Skript S. 77, Satz 7.23(d)

Q mc
? $\mathrm{Cov}(X, Y) = \;$ …
+ $E(XY) - EX \cdot EY$
- $E(XY)$
- $EX \cdot EY$
- $\mathrm{Var}(X + Y)$
E Satz 7.23(b).
S Skript S. 77, Definition 7.21 und Satz 7.23(b)

Q tf
? Sind $X, Y$ unabhängig, so gilt $E(XY) = EX \cdot EY$.
A wahr
E Daraus folgt $\mathrm{Cov}(X, Y) = 0$.
S Skript S. 72, Satz 7.9(d)

Q mc
? Die Korrelation $\mathrm{Cor}(X, Y)$ ist …
+ $\frac{\mathrm{Cov}(X, Y)}{\sqrt{\mathrm{Var}\, X\ \mathrm{Var}\, Y}}$ und liegt in $[-1, 1]$
- $\mathrm{Cov}(X, Y)$ und liegt in $[0, 1]$
- $\frac{E(XY)}{EX\, EY}$
- $\mathrm{Var}(X - Y)$
E $|\mathrm{Cor}| = 1$ genau bei linearem Zusammenhang $Y = aX + b$.
S Skript S. 78, Definition 7.26 und Bemerkung 7.28

Q tf
? Für $X$ mit Werten in $\mathbb{N}_0$ gilt $EX = \sum_{k \ge 1} P(X \ge k)$.
A wahr
E Satz 7.13 – oft schneller als die Definition.
S Skript S. 75, Satz 7.13

# eis-allg | Allgemeiner Erwartungswert & Ungleichungen | Skript Kap. 8

Q tf
? Für $X$ mit Dichte $f_X$ gilt $E(X^2) = \int x^2 f_X(x)\,dx$ (falls existent).
A wahr
E Satz 8.5 mit $g(x) = x^2$.
S Skript S. 83, Satz 8.5 · Blatt 8, Aufgabe 53(a)

Q tf
? Jede absolut stetige Zufallsvariable hat einen Erwartungswert.
A falsch
E Die Cauchy-Verteilung (Aufgabe 58) hat keinen.
S Skript S. 82–83, Definition 8.3 und Satz 8.5 · Blatt 8, Aufgabe 53(b)

Q tf
? Aus $EX = 1$ folgt $P(X \gt 10) \le \frac{1}{10}$.
A falsch
E Markov braucht $X \ge 0$. Ohne diese Annahme kann $X$ grosse positive und negative Werte haben.
S Skript S. 85, Satz 8.8 · Blatt 8, Aufgabe 53(c)

Q tf
? Aus $EX = 1$ und $\mathrm{Var}\, X = 2$ folgt $P(X \ge 3) \le \frac12$.
A wahr
E $\{X \ge 3\} \subset \{|X - 1| \ge 2\}$, Chebyshev: $\le \frac{2}{4}$.
S Skript S. 85, Satz 8.11 · Blatt 8, Aufgabe 53(d)

Q mc
? Erwartungswert und Varianz der Gleichverteilung auf $[a, b]$:
+ $EX = \frac{a+b}{2}$, $\mathrm{Var}\, X = \frac{(b-a)^2}{12}$
- $EX = \frac{a+b}{2}$, $\mathrm{Var}\, X = \frac{(b-a)^2}{4}$
- $EX = b - a$, $\mathrm{Var}\, X = \frac{b - a}{12}$
- $EX = \frac{b-a}{2}$, $\mathrm{Var}\, X = \frac{(b-a)^2}{12}$
E Mit Satz 8.5 integrieren.
S Skript S. 83, Satz 8.5 · Blatt 8, Aufgabe 54(a)

Q mc
? $X$ gleichverteilt auf $[-1, 2]$. Was ist $P(X \in [\frac13, \frac23))$?
+ $\frac19$
- $\frac13$
- $\frac16$
- $\frac{1}{12}$
E Länge $\frac13$ geteilt durch Gesamtlänge $3$.
S Skript S. 68, Definition 6.20 · Blatt 8, Aufgabe 54(b)

Q mc
? $f(x) = ax + bx^2$ auf $[0, 1]$ mit $a, b \ge 0$ ist eine Dichte genau dann, wenn …
+ $b = 3 - \frac{3a}{2}$ und $0 \le a \le 2$
- $a + b = 1$
- $b = 2 - a$ für alle $a \ge 0$
- $a = b = 1$
E $\int_0^1 (ax + bx^2) = \frac a2 + \frac b3 = 1$, und $b \ge 0$ verlangt $a \le 2$.
S Skript S. 49, Satz 4.23(b) · Blatt 8, Aufgabe 55(a)

Q mc
? $S_8$ = Summe von 8 unabhängigen $\mathrm{Pois}(2)$. Was liefert Markov für $P(S_8 \ge 32)$?
+ $\le \frac12$
- $\le \frac{1}{16}$
- $\le \frac14$
- $= 0$
E $ES_8 = 16$, also $P(S_8 \ge 32) \le \frac{16}{32}$.
S Skript S. 85, Satz 8.8 · Blatt 8, Aufgabe 56(a)

Q mc
? Gleiche Situation: Was liefert Chebyshev?
+ $\le \frac{1}{16}$ – besser als Markov
- $\le \frac12$ – gleich gut wie Markov
- $\le 1$ – nutzlos
- $\le \frac14$
E $\mathrm{Var}\, S_8 = 16$: $P(|S_8 - 16| \ge 16) \le \frac{16}{256}$.
S Skript S. 85, Satz 8.11 · Blatt 8, Aufgabe 56(b)

Q input
? $X_i$ unabhängig, $EX_i = 100$, Standardabweichung $50$. Wie viele Kunden braucht es mindestens, damit Chebyshev $P(|\bar X_n - 100| \ge 10) \le 1\,\%$ garantiert?
A 2500
E $\mathrm{Var}\, \bar X_n = \frac{2500}{n}$, Chebyshev: $\frac{2500}{100n} \le 0.01 \Leftrightarrow n \ge 2500$.
S Skript S. 85–86, Satz 8.11 und Satz 8.13 · Blatt 8, Aufgabe 57(a)

Q mc
? Normierungskonstante der Cauchy-Dichte $f(x) = \frac{C}{1 + a(x - m)^2}$:
+ $C = \frac{\sqrt a}{\pi}$
- $C = \frac{1}{\pi}$
- $C = \frac{a}{\pi}$
- $C = \sqrt{a}$
E Substitution $u = \sqrt a(x - m)$: $\int \frac{dx}{1 + a(x-m)^2} = \frac{\pi}{\sqrt a}$.
S Skript S. 49, Satz 4.23(b) · Blatt 8, Aufgabe 58(a)

Q tf
? Aus $\mathrm{Cov}(X, Y) = 0$ folgt, dass $X$ und $Y$ unabhängig sind.
A falsch
E Gegenbeispiel z.B. $X$ symmetrisch um $0$ und $Y = X^2$: unkorreliert, aber abhängig.
S Skript S. 77, Satz 7.23(e) · Blatt 8, Aufgabe 59

Q mc
? Markov-Ungleichung: Für $X \ge 0$ und $a \gt 0$ gilt …
+ $P(X \ge a) \le \frac{EX}{a}$
- $P(X \ge a) \le \frac{\mathrm{Var}\, X}{a^2}$
- $P(X \ge a) \ge \frac{EX}{a}$
- $P(X \ge a) = \frac{EX}{a}$
E Nur nützlich für $a \gt EX$.
S Skript S. 85, Satz 8.8 und Bemerkung 8.9

Q mc
? Chebyshev-Ungleichung: Für $E X^2 \lt \infty$ gilt …
+ $P(|X - EX| \ge a) \le \frac{\mathrm{Var}\, X}{a^2}$
- $P(|X - EX| \ge a) \le \frac{EX}{a}$
- $P(|X - EX| \le a) \le \frac{\mathrm{Var}\, X}{a^2}$
- $P(X \ge a) \le \frac{\mathrm{Var}\, X}{a}$
E Markov angewendet auf $(X - EX)^2$.
S Skript S. 85, Satz 8.11

Q mc
? Schwaches Gesetz der grossen Zahlen: Für unabhängige $X_i$ mit $EX_i = m$, $\mathrm{Var}\, X_i = \sigma^2 \lt \infty$ gilt …
+ $P\left(\left|\frac{S_n}{n} - m\right| \ge \varepsilon\right) \to 0$ für jedes $\varepsilon \gt 0$
- $\frac{S_n}{n} = m$ für grosse $n$
- $S_n \to m$
- $P(S_n = nm) \to 1$
E Beweis mit Chebyshev: $\mathrm{Var}\, \frac{S_n}{n} = \frac{\sigma^2}{n}$. Rechtfertigt die frequentistische Interpretation.
S Skript S. 86, Satz 8.13 und Bemerkung 8.14

Q tf
? Für unabhängige, identisch verteilte $X_i$ mit $E(X_1^2) \lt \infty$ und $\varepsilon \gt 0$ gilt $P(S_n \ge n(EX_1 + \varepsilon)) \to 0$.
A wahr
E Folgt aus dem Gesetz der grossen Zahlen.
S Skript S. 86, Satz 8.13 · Blatt 8, Aufgabe 53(e)
`;

MATHLE.raw.eisDefs = String.raw`
# eis-wraum
D Grundraum $\Omega$ :: Menge aller möglichen Ergebnisse eines Zufallsvorgangs @ Skript S. 6
D $\sigma$-Algebra :: $\Omega \in \mathcal{A}$, abgeschlossen unter Komplement und abzählbaren Vereinigungen @ Skript S. 13, Def. 1.7
D Wahrscheinlichkeitsmass :: $P \ge 0$, $P(\Omega) = 1$ und $\sigma$-additiv @ Skript S. 15, Def. 1.11
D $\sigma$-Additivität :: $P(\bigcup A_i) = \sum P(A_i)$ für paarweise disjunkte $A_i$ @ Skript S. 15, Def. 1.11
F Gegenereignis :: $P(A^c) = 1 - P(A)$ @ Skript S. 16, Satz 1.12(a)
F Additionssatz :: $P(A \cup B) = P(A) + P(B) - P(A \cap B)$ @ Skript S. 16, Satz 1.12(d)
F Monotonie von $P$ :: $A \subset B \Rightarrow P(A) \le P(B)$ @ Skript S. 16, Satz 1.12(c)
D Wahrscheinlichkeitsraum :: Tripel $(\Omega, \mathcal{A}, P)$ @ Skript S. 18, Def. 1.17
F De Morgan für Ereignisse :: $(A \cup B)^c = A^c \cap B^c$ und $(A \cap B)^c = A^c \cup B^c$ @ Skript S. 12, Lemma 1.5

# eis-diskret
D Laplace-Modell :: endliches $\Omega$, alle Elementarereignisse gleich wahrscheinlich: $P(A) = \#A / \#\Omega$ @ Skript S. 21
F Geordnet ohne Wiederholung :: $\frac{n!}{(n-k)!}$ Möglichkeiten @ Skript S. 23
F Geordnet mit Wiederholung :: $n^k$ Möglichkeiten @ Skript S. 23
F Ungeordnet ohne Wiederholung :: $\binom{n}{k}$ Möglichkeiten @ Skript S. 23
F Ungeordnet mit Wiederholung :: $\binom{n+k-1}{k}$ Möglichkeiten @ Skript S. 23
D Hypergeometrische Verteilung :: $\frac{\binom{M}{k}\binom{N-M}{n-k}}{\binom{N}{n}}$ – Ziehen ohne Zurücklegen @ Skript S. 27
D Multinomialkoeffizient :: $\binom{n}{k_1, \dots, k_m} = \frac{n!}{k_1! \cdots k_m!}$ @ Skript S. 29
F Vandermonde-Identität :: $\binom{m+n}{r} = \sum_j \binom{n}{j}\binom{m}{r-j}$ @ Blatt 2, Aufgabe 17

# eis-bedingt
D Bedingte Wahrscheinlichkeit :: $P(A \mid B) = \frac{P(A \cap B)}{P(B)}$ für $P(B) \gt 0$ @ Skript S. 30, Def. 3.1
F Multiplikationsregel :: $P(A_1 \cap \dots \cap A_n) = P(A_1)P(A_2 \mid A_1) \cdots P(A_n \mid A_1 \cap \dots \cap A_{n-1})$ @ Skript S. 33, Satz 3.10
F Totale Wahrscheinlichkeit :: $P(A) = \sum_i P(A \mid B_i)P(B_i)$ für eine Zerlegung $(B_i)$ @ Skript S. 35, Satz 3.12
F Bayessche Regel :: $P(B_i \mid A) = \frac{P(A \mid B_i)P(B_i)}{\sum_j P(A \mid B_j)P(B_j)}$ @ Skript S. 37, Satz 3.15
D Zerlegung von $\Omega$ :: paarweise disjunkte $B_i$ mit $\bigcup B_i = \Omega$ @ Skript S. 35

# eis-zv
D Zufallsvariable :: (messbare) Abbildung $X: \Omega \to \mathbb{R}$ @ Skript S. 39, Def. 4.1
D Verteilung $P_X$ :: $P_X(A) = P(X \in A)$ @ Skript S. 41, Def. 4.4
D Verteilungsfunktion :: $F_X(x) = P(X \le x)$ @ Skript S. 43, Def. 4.9
F Eigenschaften von $F_X$ :: nicht-fallend, rechtsstetig, $F(-\infty) = 0$, $F(\infty) = 1$ @ Skript S. 43, Satz 4.12
F Punktwahrscheinlichkeit :: $P(X = a) = F_X(a) - F_X(a-)$ (Sprunghöhe) @ Skript S. 46, Satz 4.15(c)
F Intervallwahrscheinlichkeit :: $P(a \lt X \le b) = F_X(b) - F_X(a)$ @ Skript S. 46, Satz 4.15(b)
D Diskrete Zufallsvariable :: nimmt höchstens abzählbar viele Werte an @ Skript S. 47, Def. 4.19
D Wahrscheinlichkeitsfunktion :: $p_X(x) = P(X = x)$ @ Skript S. 48, Def. 4.20
D Stetige Zufallsvariable :: $F_X(x) = \int_{-\infty}^x f_X(y)\,dy$ mit einer Dichte $f_X$ @ Skript S. 49, Def. 4.21
F Eigenschaften der Dichte :: $f \ge 0$, $\int f = 1$, $P(X = a) = 0$, $f = F'$ wo stetig @ Skript S. 49, Satz 4.23
F Stetigkeit von $P$ :: $A_1 \subset A_2 \subset \dots \Rightarrow P(\bigcup A_i) = \lim P(A_n)$ @ Skript S. 44, Satz 4.14

# eis-unabh
D Unabhängige Ereignisse :: $P(A \cap B) = P(A)P(B)$ @ Skript S. 52, Def. 5.1
D Vollständige Unabhängigkeit :: $P(\bigcap_{i \in J} A_i) = \prod_{i \in J} P(A_i)$ für alle $J$ mit $\#J \ge 2$ @ Skript S. 53, Def. 5.5
F Komplemente bleiben unabhängig :: Mit $A, B$ sind auch $A, B^c$ und $A^c, B^c$ unabhängig @ Skript S. 52, Satz 5.3
F Vereinigung unabhängiger Ereignisse :: $P(\bigcup A_i) = 1 - \prod P(A_i^c)$ @ Skript S. 54, Kor. 5.8
F Serienschaltung :: funktioniert mit Wahrscheinlichkeit $p_1 p_2$ @ Skript S. 55, Bsp. 5.9
F Parallelschaltung :: funktioniert mit Wahrscheinlichkeit $1 - (1-p_1)(1-p_2)$ @ Skript S. 55, Bsp. 5.9
D Unabhängige Zufallsvariablen :: $P(X \in I, Y \in J) = P(X \in I)P(Y \in J)$ für alle Intervalle @ Skript S. 57, Def. 5.14

# eis-vert
D Bernoulli-Verteilung $\mathrm{Ber}(p)$ :: Werte $\{0,1\}$ mit $P(X = 1) = p$ @ Skript S. 60, Def. 6.1
D Binomialverteilung $\mathrm{Bin}(n,p)$ :: $P(S = k) = \binom{n}{k}p^k(1-p)^{n-k}$, $k = 0, \dots, n$ @ Skript S. 61, Def. 6.2
D Geometrische Verteilung $\mathrm{Geom}(p)$ :: $P(T = k) = (1-p)^{k-1}p$, $k \in \mathbb{N}$ @ Skript S. 62, Def. 6.4
D Poisson-Verteilung $\mathrm{Pois}(\lambda)$ :: $P(X = k) = \frac{\lambda^k}{k!}e^{-\lambda}$, $k \in \mathbb{N}_0$ @ Skript S. 64, Def. 6.9
F Poisson-Approximation :: $\mathrm{Bin}(n, p_n)$ mit $np_n \to \lambda$ nähert $\mathrm{Pois}(\lambda)$ an @ Skript S. 65, Satz 6.11
D Exponentialverteilung $\mathrm{Exp}(\lambda)$ :: Dichte $\lambda e^{-\lambda t}$, Verteilungsfunktion $1 - e^{-\lambda t}$ für $t \ge 0$ @ Skript S. 67, Def. 6.14
F Gedächtnislosigkeit (geometrisch) :: $P(T = m + k \mid T \gt m) = P(T = k)$ @ Skript S. 63, Lemma 6.6
F Gedächtnislosigkeit (exponential) :: $P(T \ge t + s \mid T \ge t) = P(T \ge s)$ @ Skript S. 68, Lemma 6.16
D Gleichverteilung $\mathrm{Unif}(a,b)$ :: Dichte $\frac{1}{b-a}$ auf $[a, b]$ @ Skript S. 68, Def. 6.20

# eis-erw
D Erwartungswert (diskret) :: $EX = \sum_\omega X(\omega)p(\omega)$, falls $\sum |X(\omega)|p(\omega) \lt \infty$ @ Skript S. 70, Def. 7.1
F Linearität :: $E(aX + bY) = aEX + bEY$ @ Skript S. 72, Satz 7.9(b)
F Produkt unabhängiger ZV :: $E(XY) = EX \cdot EY$ @ Skript S. 72, Satz 7.9(d)
F Erwartungswert einer Funktion :: $E(g(X)) = \sum_x g(x)p_X(x)$ @ Skript S. 74, Satz 7.12
D Varianz :: $\mathrm{Var}\,X = E((X - EX)^2)$ @ Skript S. 76, Def. 7.15
F Verschiebungssatz :: $\mathrm{Var}\, X = E(X^2) - (EX)^2$ @ Skript S. 76, Satz 7.19(a)
F Lineare Transformation :: $\mathrm{Var}(aX + b) = a^2\,\mathrm{Var}\, X$ @ Skript S. 76, Satz 7.19(b)
D Kovarianz :: $\mathrm{Cov}(X, Y) = E((X - EX)(Y - EY))$ @ Skript S. 77, Def. 7.21
F Varianz der Summe :: $\mathrm{Var}(X + Y) = \mathrm{Var}\,X + \mathrm{Var}\,Y + 2\,\mathrm{Cov}(X, Y)$ @ Skript S. 77, Satz 7.23(d)
D Korrelation :: $\mathrm{Cor}(X, Y) = \frac{\mathrm{Cov}(X, Y)}{\sqrt{\mathrm{Var}\,X\,\mathrm{Var}\,Y}} \in [-1, 1]$ @ Skript S. 78, Def. 7.26
F Kennzahlen Binomial :: $EX = np$, $\mathrm{Var}\,X = np(1-p)$ @ Blatt 7, Aufgabe 47
F Kennzahlen Poisson :: $EX = \mathrm{Var}\,X = \lambda$ @ Blatt 7, Aufgabe 48
F Kennzahlen geometrisch :: $ET = \frac1p$, $\mathrm{Var}\,T = \frac{1-p}{p^2}$ @ Blatt 7, Aufgabe 49

# eis-allg
F Erwartungswert mit Dichte :: $E(g(X)) = \int g(x)f_X(x)\,dx$, falls absolut integrierbar @ Skript S. 83, Satz 8.5
F Markov-Ungleichung :: $P(X \ge a) \le \frac{EX}{a}$ für $X \ge 0$, $a \gt 0$ @ Skript S. 85, Satz 8.8
F Chebyshev-Ungleichung :: $P(|X - EX| \ge a) \le \frac{\mathrm{Var}\,X}{a^2}$ @ Skript S. 85, Satz 8.11
F Gesetz der grossen Zahlen :: $P(|\frac{S_n}{n} - m| \ge \varepsilon) \to 0$ @ Skript S. 86, Satz 8.13
F Kennzahlen Gleichverteilung :: $EX = \frac{a+b}{2}$, $\mathrm{Var}\,X = \frac{(b-a)^2}{12}$ @ Blatt 8, Aufgabe 54
F Kennzahlen Exponentialverteilung :: $ET = \frac1\lambda$, $\mathrm{Var}\,T = \frac{1}{\lambda^2}$ @ Skript S. 83–84, Satz 8.5
`;

MATHLE.raw.eisWords = String.raw`
EREIGNIS | Teilmenge $A \subset \Omega$ | eis-wraum
LAPLACE | Modell mit gleich wahrscheinlichen Ergebnissen | eis-diskret
BAYES | $P(B \mid A) = \frac{P(A \mid B)P(B)}{P(A)}$ – Regel von … | eis-bedingt
DICHTE | $f_X$ mit $F_X(x) = \int_{-\infty}^x f_X$ | eis-zv
VARIANZ | $E((X - EX)^2)$ | eis-erw
POISSON | Verteilung mit $\frac{\lambda^k}{k!}e^{-\lambda}$ | eis-vert
BINOMIAL | $\binom{n}{k}p^k(1-p)^{n-k}$: …verteilung | eis-vert
MARKOV | $P(X \ge a) \le EX/a$ – Ungleichung von … | eis-allg
URNE | Behälter mit Kugeln im Modell | eis-diskret
KOVARIANZ | $E(XY) - EX\,EY$ | eis-erw
BERNOULLI | Verteilung auf $\{0, 1\}$ | eis-vert
MULTINOMIAL | $\frac{n!}{k_1! \cdots k_m!}$: …koeffizient | eis-diskret
SIGMA | $\sigma$-Algebra: griechischer Buchstabe | eis-wraum
GRUNDRAUM | $\Omega$ | eis-wraum
ZERLEGUNG | Disjunkte $B_i$ mit $\bigcup B_i = \Omega$ | eis-bedingt
UNABHÄNGIG | $P(A \cap B) = P(A)P(B)$ | eis-unabh
GEOMETRISCH | Wartezeit bis zum ersten Erfolg: …e Verteilung | eis-vert
EXPONENTIAL | Gedächtnislose stetige Verteilung: …verteilung | eis-vert
CHEBYSHEV | $P(|X - EX| \ge a) \le \mathrm{Var}X / a^2$ | eis-allg
KORRELATION | Normierte Kovarianz | eis-erw
MASS | Wahrscheinlichkeits… $P$ | eis-wraum
ERWARTUNG | $EX$ ist der …swert | eis-erw
STICHPROBE | Ausgewählte Teile einer Lieferung | eis-diskret
`;

MATHLE.similar.eis = [
  ['Gegenereignis', 'Additionssatz', 'Monotonie von $P$'],
  ['Wahrscheinlichkeitsmass', '$\\sigma$-Additivität', 'Wahrscheinlichkeitsraum'],
  ['Totale Wahrscheinlichkeit', 'Bayessche Regel', 'Bedingte Wahrscheinlichkeit'],
  ['Verteilungsfunktion', 'Eigenschaften von $F_X$', 'Intervallwahrscheinlichkeit', 'Punktwahrscheinlichkeit'],
  ['Stetige Zufallsvariable', 'Eigenschaften der Dichte'],
  ['Unabhängige Ereignisse', 'Vollständige Unabhängigkeit', 'Komplemente bleiben unabhängig'],
  ['Serienschaltung', 'Parallelschaltung', 'Vereinigung unabhängiger Ereignisse'],
  ['Gedächtnislosigkeit (geometrisch)', 'Geometrische Verteilung $\\mathrm{Geom}(p)$', 'Kennzahlen geometrisch'],
  ['Gedächtnislosigkeit (exponential)', 'Exponentialverteilung $\\mathrm{Exp}(\\lambda)$', 'Kennzahlen Exponentialverteilung'],
  ['Poisson-Approximation', 'Poisson-Verteilung $\\mathrm{Pois}(\\lambda)$', 'Kennzahlen Poisson'],
  ['Binomialverteilung $\\mathrm{Bin}(n,p)$', 'Kennzahlen Binomial', 'Bernoulli-Verteilung $\\mathrm{Ber}(p)$'],
  ['Varianz', 'Verschiebungssatz', 'Lineare Transformation', 'Varianz der Summe'],
  ['Kovarianz', 'Korrelation', 'Varianz der Summe'],
  ['Markov-Ungleichung', 'Chebyshev-Ungleichung'],
  ['Erwartungswert (diskret)', 'Erwartungswert einer Funktion', 'Erwartungswert mit Dichte'],
  ['Geordnet ohne Wiederholung', 'Geordnet mit Wiederholung', 'Ungeordnet ohne Wiederholung', 'Ungeordnet mit Wiederholung'],
  ['Hypergeometrische Verteilung', 'Ungeordnet ohne Wiederholung'],
  ['Gleichverteilung $\\mathrm{Unif}(a,b)$', 'Kennzahlen Gleichverteilung']
];
