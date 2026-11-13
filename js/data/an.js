/*
 * Analysis I
 * Grundlage: Vorlesungsskript Analysis I & II und Übungsserien 1–8 (inkl. Lösungen).
 * Seitenangaben = gedruckte Seitenzahlen im Skript (wie im Inhaltsverzeichnis).
 * Format wie in la.js. Neue Fragen bitte am Ende eines Kapitels einfügen.
 */
window.MATHLE = window.MATHLE || {};
MATHLE.raw = MATHLE.raw || {};
MATHLE.similar = MATHLE.similar || {};

MATHLE.raw.an = String.raw`
# an-induktion | Induktion & Kombinatorik | Skript Kap. 1

Q tf
? Für alle $n \in \mathbb{N}$ gilt $\sum_{k=1}^{n} (2k-1) = n^2$.
A wahr
E Verankerung $n=1$: $1 = 1^2$. Schritt: $n^2 + (2(n+1)-1) = n^2 + 2n + 1 = (n+1)^2$.
S Skript S. 7, Vollständige Induktion · Serie 1, Aufgabe 1.1

Q mc
? Was ergibt $\sum_{k=1}^{n} k \cdot k!$?
+ $(n+1)! - 1$
- $n \cdot n!$
- $(n+1)!$
- $n! - 1$
E Schritt: $(n+1)! - 1 + (n+1)(n+1)! = (n+1)!(1 + n + 1) - 1 = (n+2)! - 1$.
S Skript S. 9, Fakultät · Serie 1, Aufgabe 1.1

Q mc
? Was ergibt $\prod_{k=2}^{n} \left(1 - \frac{1}{k}\right)$?
+ $\frac{1}{n}$
- $\frac{1}{n+1}$
- $\frac{n-1}{n}$
- $0$
E $1 - \frac1k = \frac{k-1}{k}$, das Produkt teleskopiert: $\frac12 \cdot \frac23 \cdots \frac{n-1}{n} = \frac1n$.
S Skript S. 7, Vollständige Induktion · Serie 1, Aufgabe 1.1

Q mc
? Was ergibt $\sum_{k=1}^{n} k^2$?
+ $\frac{1}{6}n(n+1)(2n+1)$
- $\frac{1}{2}n(n+1)$
- $\left(\frac{1}{2}n(n+1)\right)^2$
- $\frac{1}{3}n^3$
E Klassischer Induktionsbeweis. Die dritte Option ist die Summe der Kuben.
S Skript S. 7, Vollständige Induktion · Serie 1, Aufgabe 1.2

Q mc
? Was ergibt $\sum_{k=1}^{n} k^3$?
+ $\left(\frac{1}{2}n(n+1)\right)^2$
- $\frac{1}{6}n(n+1)(2n+1)$
- $\frac{1}{4}n^4$
- $\frac{1}{2}n^2(n+1)$
E Die Summe der Kuben ist das Quadrat der Gaussschen Summe.
S Skript S. 7, Vollständige Induktion · Serie 1, Aufgabe 1.2

Q mc
? Für $x \ne 1$ gilt $\prod_{k=0}^{n} \left(1 + x^{2^k}\right) = \;$ …
+ $\frac{1 - x^{2^{n+1}}}{1-x}$
- $\frac{1 - x^{2n+1}}{1-x}$
- $\frac{1 - x^{n+1}}{1-x}$
- $(1+x)^{2^n}$
E Probe $n = 1$: $(1+x)(1+x^2) = 1 + x + x^2 + x^3 = \frac{1-x^4}{1-x}$. Schritt: multipliziere mit $1 + x^{2^{n+1}}$ (dritte binomische Formel).
S Skript S. 7, Vollständige Induktion · Serie 1, Aufgabe 1.2

Q mc
? „Alle Katzen haben dieselbe Farbe" – wo liegt der Fehler im Induktions-„Beweis"?
+ Der Schritt von $n = 1$ auf $n = 2$: Die beiden Gruppen aus $n$ Katzen haben keine gemeinsame Katze.
- Die Verankerung $P(1)$ ist falsch.
- Induktion darf man nicht für Aussagen über Tiere benutzen.
- Man hätte bei $n = 0$ beginnen müssen.
E Das Argument braucht eine Katze, die in beiden Gruppen vorkommt. Für $n+1 = 2$ gibt es sie nicht – damit bricht die ganze Kette.
S Skript S. 7, Vollständige Induktion · Serie 1, Aufgabe 1.3

Q mc
? Auf wie viele Arten kann man $n$ gleiche Bälle an $k$ Katzen verteilen (leer ausgehen und mehrere Bälle erlaubt)?
+ $\binom{n+k-1}{k-1}$
- $k^n$
- $\binom{n}{k}$
- $n^k$
E „Sterne und Striche": $n$ Bälle und $k-1$ Trennstriche in eine Reihe, wähle die Positionen der Striche.
S Skript S. 10, Binomialkoeffizient · Serie 1, Aufgabe 1.4

Q input
? Auf wie viele Arten kann man 3 gleiche Bälle an 2 Katzen verteilen?
A 4
E $(3,0), (2,1), (1,2), (0,3)$ – oder mit der Formel $\binom{3+1}{1} = 4$.
S Skript S. 10, Binomialkoeffizient · Serie 1, Aufgabe 1.4

Q mc
? Wie viele Teilmengen hat eine $n$-elementige Menge?
+ $2^n$
- $n^2$
- $n!$
- $2n$
E Jedes Element ist drin oder nicht – oder: $\sum_k \binom{n}{k} = (1+1)^n$ nach dem binomischen Lehrsatz.
S Skript S. 11, Binomischer Lehrsatz · Serie 1, Aufgabe 1.5

Q tf
? Nach Konvention gilt $0! = 1$.
A wahr
E Das leere Produkt ist $1$. Damit stimmt z.B. $\binom{n}{0} = \frac{n!}{0!\,n!} = 1$.
S Skript S. 9, Bemerkung zur Fakultät

Q mc
? Wie viele Anordnungen (Permutationen) einer $n$-elementigen Menge gibt es?
+ $n!$
- $2^n$
- $n^n$
- $\binom{n}{2}$
E Für den ersten Platz $n$ Möglichkeiten, für den zweiten $n-1$, …
S Skript S. 9, Satz über Anordnungen

Q mc
? Die Anzahl der $k$-elementigen Teilmengen einer $n$-elementigen Menge ist …
+ $\binom{n}{k} = \frac{n!}{k!(n-k)!}$
- $\frac{n!}{(n-k)!}$
- $n^k$
- $k^n$
E $\frac{n!}{(n-k)!}$ zählt geordnete Auswahlen; durch $k!$ teilen ergibt ungeordnete.
S Skript S. 10, Satz über $k$-elementige Teilmengen

Q mc
? Binomischer Lehrsatz: $(x+y)^n = \;$ …
+ $\sum_{k=0}^{n} \binom{n}{k} x^k y^{n-k}$
- $\sum_{k=0}^{n} x^k y^{n-k}$
- $x^n + y^n$
- $\sum_{k=1}^{n} \binom{n}{k} x^k y^{k}$
E Für $n \in \mathbb{N}$ und $x, y \in \mathbb{R}$.
S Skript S. 11, Binomischer Lehrsatz

Q tf
? Für einen Induktionsbeweis genügt der Induktionsschritt $A(n) \Rightarrow A(n+1)$ allein.
A falsch
E Ohne Verankerung beweist man nichts: $A(n)$: „$n = n+1$" erfüllt den Schritt, ist aber nie wahr.
S Skript S. 7, Vollständige Induktion

Q input
? Berechne $\binom{5}{2}$.
A 10
E $\frac{5!}{2!\,3!} = \frac{120}{12} = 10$.
S Skript S. 10, Binomialkoeffizient

Q mc
? Wie viele $k$-elementige Teilmengen von $\{1, \dots, n\}$ haben das grösste Element $j$?
+ $\binom{j-1}{k-1}$
- $\binom{j}{k}$
- $\binom{n-j}{k-1}$
- $\binom{n}{j}$
E Die übrigen $k-1$ Elemente wählt man aus $\{1, \dots, j-1\}$. Summiert über $j$ ergibt das eine Identität für $\binom{n}{k}$.
S Skript S. 10, Satz über $k$-elementige Teilmengen

# an-reell | Reelle Zahlen | Skript Kap. 2

Q tf
? Für alle $x, y \in \mathbb{R}$ gilt $|x| + |y| + \big||x| - |y|\big| = |x - y| + |x + y|$.
A wahr
E Beide Seiten sind gleich $2\max(|x|, |y|)$. Fallunterscheidung nach den Vorzeichen.
S Skript S. 17, Absolutbetrag · Serie 2, Aufgabe 2.1

Q mc
? Beide Seiten von $|x| + |y| + \big||x| - |y|\big| = |x - y| + |x + y|$ sind gleich …
+ $2\max(|x|, |y|)$
- $2\min(|x|, |y|)$
- $|x| + |y|$
- $2|x + y|$
E $|a| + |b| + ||a| - |b|| = 2\max$, und $|x-y| + |x+y| = 2\max(|x|, |y|)$.
S Skript S. 17, Absolutbetrag · Serie 2, Aufgabe 2.1

Q mc
? Was ist eine Intervallschachtelung?
+ Eine Folge kompakter Intervalle $I_n = [a_n, b_n]$ mit $I_{n+1} \subset I_n$ und Länge $b_n - a_n \to 0$.
- Eine Folge offener Intervalle mit $I_{n+1} \subset I_n$.
- Eine Folge kompakter Intervalle mit $I_n \subset I_{n+1}$.
- Eine Folge kompakter Intervalle mit gemeinsamem Mittelpunkt.
E Die Längen müssen beliebig klein werden. Dann gibt es nach dem Vollständigkeitsaxiom genau einen gemeinsamen Punkt.
S Skript S. 18, Intervallschachtelung

Q tf
? Zu jeder Intervallschachtelung in $\mathbb{R}$ gibt es genau eine reelle Zahl, die in allen Intervallen liegt.
A wahr
E Existenz: Vollständigkeitsaxiom. Eindeutigkeit: Lägen $\alpha \lt \beta$ in allen $I_n$, so wäre die Länge immer $\ge \beta - \alpha \gt 0$.
S Skript S. 20, Vollständigkeitsaxiom und Bemerkung

Q mc
? $I_n = \{x \in \mathbb{R} : |x^2 - 2| \le \frac1n,\ x \gt 0\}$ ist eine Intervallschachtelung. Welche Zahl liegt in allen $I_n$?
+ $\sqrt{2}$
- $2$
- $1$
- $\sqrt{2} + \frac{1}{n}$
E $I_n = \left[\sqrt{2 - \tfrac1n}, \sqrt{2 + \tfrac1n}\right]$ schrumpft auf $\sqrt2$.
S Skript S. 18, Intervallschachtelung · Serie 2, Aufgabe 2.2(1)

Q mc
? Warum ist $I_n = \left[-\frac1n,\ \sqrt[n]{2} + \frac{1}{\sqrt n}\right]$ keine Intervallschachtelung?
+ Die Längen konvergieren gegen $1$, nicht gegen $0$.
- Die Intervalle sind nicht kompakt.
- Die Intervalle sind leer.
- $I_{n+1} \not\subset I_n$, weil $\sqrt[n]{2}$ wächst.
E $\sqrt[n]{2} \to 1$ (Aufgabe 2.5), also Länge $\to 0 + 1 + 0 = 1$. Alle $I_n$ enthalten $[0, 1]$.
S Skript S. 18, Intervallschachtelung · Serie 2, Aufgabe 2.2(2)

Q mc
? $A = \left\{x \in \mathbb{Q} \setminus \{\pm 2\} : \frac{x-3}{x-2} \gt \frac{x+3}{x+2}\right\}$. Was gilt?
+ $\inf A = -\infty$, $\sup A = 2$, weder Maximum noch Minimum.
- $\inf A = -2$, $\sup A = 2$, Minimum $-2$.
- $\inf A = 0$, $\sup A = 2$, weder Maximum noch Minimum.
- $A = \emptyset$
E Die Ungleichung ist äquivalent zu $\frac{-2x}{(x-2)(x+2)} \gt 0$, also $A = \mathbb{Q} \cap ((-\infty, -2) \cup (0, 2))$.
S Skript S. 23, Supremum und Infimum · Serie 2, Aufgabe 2.3

Q mc
? $B = \left\{x \in \mathbb{Q} \setminus \{-1, 0, 1\} : \frac{-2x^3 + x^2 + 6x + 4}{x^3 - x} \ge -2\right\}$. Was gilt?
+ $\min B = -2$, $\sup B = +\infty$, kein Maximum.
- $\inf B = -1$, $\sup B = +\infty$, kein Minimum.
- $\min B = -2$, $\max B = 1$.
- $\inf B = -\infty$, $\sup B = 0$.
E Umformen ergibt $\frac{(x+2)^2}{x(x-1)(x+1)} \ge 0$, also $B = \mathbb{Q} \cap (\{-2\} \cup (-1, 0) \cup (1, \infty))$.
S Skript S. 23, Maximum und Minimum · Serie 2, Aufgabe 2.3

Q mc
? $C$ ist wie $B$, aber mit strikter Ungleichung $\gt -2$. Was gilt?
+ $\inf C = -1$, $\sup C = +\infty$, weder Minimum noch Maximum.
- $\min C = -2$, $\sup C = +\infty$.
- $\inf C = -2$, $\sup C = 1$.
- $C = B$
E Nur $x = -2$ liefert Gleichheit, also $C = B \setminus \{-2\} = \mathbb{Q} \cap ((-1,0) \cup (1, \infty))$.
S Skript S. 23, Maximum und Minimum · Serie 2, Aufgabe 2.3

Q input
? Über eine Person sind vier Aussagen bekannt: „hat mehr als 3 Katzen", „weniger als 3", „mindestens eine", „keine". Genau eine ist wahr. Wie viele Katzen hat die Person?
A 3; drei
E Bei $0$ wären „weniger als 3" und „keine" wahr, bei $1, 2$ „weniger als 3" und „mindestens eine", bei $\gt 3$ „mehr als 3" und „mindestens eine". Nur bei $3$ ist genau eine wahr.
S Skript S. 1, Aussagen · Serie 2, Aufgabe 2.4

Q tf
? Für jedes $a \gt 0$ gilt $\sqrt[n]{a} \to 1$ für $n \to \infty$.
A wahr
E Für $a \gt 1$ setze $x_n = \sqrt[n]{a} - 1$; Bernoulli liefert $a \ge 1 + n x_n$, also $0 \le x_n \le \frac{a-1}{n}$.
S Skript S. 43, Beispiele zu Grenzwerten · Serie 2, Aufgabe 2.5

Q mc
? Bernoullische Ungleichung (Skript): Für $x \gt -1$, $x \ne 0$ und $n \ge 2$ gilt …
+ $(1+x)^n \gt 1 + nx$
- $(1+x)^n \lt 1 + nx$
- $(1+x)^n \gt 1 + x^n$
- $(1+x)^n = 1 + nx + x^n$
E Beweis per Induktion; Hauptwerkzeug z.B. für $q^n \to \infty$ bei $q \gt 1$.
S Skript S. 16, Bernoullische Ungleichung

Q mc
? Das Archimedische Axiom besagt …
+ Zu jedem $a \in \mathbb{R}$ gibt es ein $n \in \mathbb{N}$ mit $n \gt a$.
- Jede beschränkte Menge hat ein Supremum.
- Zwischen zwei reellen Zahlen liegt eine rationale.
- $\mathbb{N}$ ist nach oben beschränkt.
E Folgerung: $\frac1n \to 0$, und $q^n \to \infty$ für $q \gt 1$.
S Skript S. 14, Archimedisches Axiom

Q mc
? Das Supremum einer Menge $M \subset \mathbb{R}$ ist …
+ die kleinste obere Schranke von $M$.
- das grösste Element von $M$.
- die grösste untere Schranke von $M$.
- irgendeine obere Schranke von $M$.
E Es muss nicht in $M$ liegen. Liegt es in $M$, heisst es Maximum.
S Skript S. 23, Supremum und Infimum

Q tf
? Jede nichtleere, nach oben beschränkte Teilmenge von $\mathbb{R}$ besitzt ein Supremum in $\mathbb{R}$.
A wahr
E Das ist äquivalent zum Vollständigkeitsaxiom.
S Skript S. 23–25, Supremum und Vollständigkeit

Q tf
? Jede nichtleere, nach oben beschränkte Teilmenge von $\mathbb{Q}$ besitzt ein Supremum in $\mathbb{Q}$.
A falsch
E $\{x \in \mathbb{Q} : x^2 \lt 2\}$ hat das Supremum $\sqrt2 \notin \mathbb{Q}$. Genau das unterscheidet $\mathbb{R}$ von $\mathbb{Q}$.
S Skript S. 23, Supremum und Infimum

Q tf
? Jede nach oben beschränkte Menge $M \subset \mathbb{R}$ besitzt ein Maximum.
A falsch
E $[0, 1)$ hat das Supremum $1$, aber kein Maximum, da $1 \notin [0,1)$.
S Skript S. 22–23, Beschränktheit und Maximum

Q mc
? Welche Konvention gilt im Skript für die leere Menge?
+ $\sup \emptyset = -\infty$ und $\inf \emptyset = +\infty$
- $\sup \emptyset = 0$ und $\inf \emptyset = 0$
- $\sup \emptyset = +\infty$ und $\inf \emptyset = -\infty$
- $\sup \emptyset$ und $\inf \emptyset$ sind nicht definiert.
E Jede Zahl ist obere Schranke von $\emptyset$, die kleinste „ist" also $-\infty$.
S Skript S. 24, Supremum der leeren Menge

Q tf
? Zwischen zwei reellen Zahlen $x \lt y$ liegt immer eine rationale Zahl.
A wahr
E Wähle $n$ mit $\frac1n \lt y - x$ (Archimedes) und $m$ minimal mit $m \gt nx$; dann $x \lt \frac{m}{n} \lt y$.
S Skript S. 25, Dichtheit von $\mathbb{Q}$

Q mc
? Seien $x \lt y$ rational. Welche Zahl ist irrational und liegt zwischen $x$ und $y$?
+ $x + \frac{y-x}{\sqrt2}$
- $\frac{x+y}{2}$
- $x + \frac{y-x}{2}$
- $\sqrt{xy}$
E Wäre $x + \frac{y-x}{\sqrt2}$ rational, so auch $\sqrt2 = \frac{y-x}{z - x}$. Die anderen Kandidaten sind rational bzw. nicht immer definiert.
S Skript S. 26, Dichtheit der irrationalen Zahlen · Serie 4, Aufgabe 4.1

Q mc
? Wann heissen zwei Mengen gleichmächtig?
+ Wenn es eine bijektive Abbildung $A \to B$ gibt.
- Wenn $A \subset B$ oder $B \subset A$.
- Wenn beide unendlich sind.
- Wenn es eine surjektive Abbildung $\mathbb{N} \to A$ gibt.
E Definition der Mächtigkeit. „Abzählbar" heisst: gleichmächtig wie $\mathbb{N}$.
S Skript S. 26, Mächtigkeit

Q tf
? Die Menge aller endlichen Teilmengen von $\mathbb{N}$ ist abzählbar.
A wahr
E Sie ist die Vereinigung der abzählbar vielen endlichen bzw. abzählbaren Mengen „Teilmengen mit Maximum $\le n$".
S Skript S. 27, Abzählbare Vereinigungen · Serie 3, Aufgabe 3.1(1)

Q tf
? Die Potenzmenge $\mathcal{P}(\mathbb{N})$ ist abzählbar.
A falsch
E Diagonalargument: Zu jeder Folge $A_1, A_2, \dots$ von Teilmengen ist $\{n : n \notin A_n\}$ nicht in der Liste.
S Skript S. 27, überabzählbar · Serie 3, Aufgabe 3.1(2)

Q multi
? Welche Mengen sind abzählbar?
+ $\mathbb{Z}$
+ $\mathbb{Q}$
- $\mathbb{R}$
- $\mathbb{R} \setminus \mathbb{Q}$
- $[0, 1]$
E $\mathbb{R}$, jedes nicht-triviale Intervall und die irrationalen Zahlen sind überabzählbar.
S Skript S. 27–29, Mächtigkeit von $\mathbb{Z}$, $\mathbb{Q}$, $\mathbb{R}$

Q mc
? Dreiecksungleichung nach unten: Für $a, b \in \mathbb{R}$ gilt …
+ $\big||a| - |b|\big| \le |a - b|$
- $|a| - |b| \ge |a - b|$
- $|a - b| \le |a| - |b|$
- $|a + b| \ge |a| + |b|$
E Folgt aus der Dreiecksungleichung $|a + b| \le |a| + |b|$.
S Skript S. 17, Eigenschaften des Betrags

Q tf
? Für $0 \lt q \lt 1$ gibt es zu jedem $\varepsilon \gt 0$ ein $n$ mit $q^n \lt \varepsilon$.
A wahr
E Folgt aus dem Fall $q' = \frac1q \gt 1$: $q'^n$ wird beliebig gross (Bernoulli + Archimedes).
S Skript S. 16, Satz über Potenzen

# an-komplex | Komplexe Zahlen | Skript Kap. 3

Q mc
? Schreibe $\frac{1}{1+i}$ in der Form $x + iy$.
+ $\frac12 - \frac12 i$
- $1 - i$
- $\frac12 + \frac12 i$
- $-\frac12 i$
E Mit dem Konjugierten erweitern: $\frac{1 - i}{(1+i)(1-i)} = \frac{1-i}{2}$.
S Skript S. 34, Konjugation · Serie 3, Aufgabe 3.2

Q mc
? Schreibe $\frac{3 + 4i}{2 - i}$ in der Form $x + iy$.
+ $\frac25 + \frac{11}{5} i$
- $2 + 11i$
- $\frac{10}{5} + \frac{5}{5}i$
- $\frac{3}{2} - 4i$
E $\frac{(3+4i)(2+i)}{5} = \frac{6 + 3i + 8i - 4}{5} = \frac{2 + 11i}{5}$.
S Skript S. 34, Konjugation · Serie 3, Aufgabe 3.2

Q mc
? Was ist $\left(\frac{1+i}{1-i}\right)^k$ für $k \in \mathbb{Z}$?
+ $i^k$
- $1$
- $(-1)^k$
- $2^k$
E $\frac{1+i}{1-i} = \frac{(1+i)^2}{2} = \frac{2i}{2} = i$.
S Skript S. 31, Multiplikation komplexer Zahlen · Serie 3, Aufgabe 3.2

Q mc
? Welche Zahlen $w$ erfüllen $w^2 = i$?
+ $\pm\frac{1}{\sqrt2}(1 + i)$
- $\pm(1 + i)$
- $\pm\frac12(1 + i)$
- $\pm i$
E $\left(\frac{1+i}{\sqrt2}\right)^2 = \frac{1 + 2i - 1}{2} = i$.
S Skript S. 31, Multiplikation komplexer Zahlen · Serie 3, Aufgabe 3.2

Q input
? Berechne $i^{2026}$.
A -1
E $i^4 = 1$ und $2026 = 4 \cdot 506 + 2$, also $i^{2026} = i^2 = -1$.
S Skript S. 33, imaginäre Einheit

Q tf
? Für alle $z, w \in \mathbb{C}$ gilt $\big||z| - |w|\big| \le |z - w|$.
A wahr
E Umgekehrte Dreiecksungleichung, folgt aus $|z| = |(z - w) + w| \le |z - w| + |w|$.
S Skript S. 35, Eigenschaften des Betrags (vi) · Serie 3, Aufgabe 3.3(1)

Q mc
? Parallelogrammidentität: $|z + w|^2 + |z - w|^2 = \;$ …
+ $2\left(|z|^2 + |w|^2\right)$
- $|z|^2 + |w|^2$
- $4|z||w|$
- $(|z| + |w|)^2$
E Mit $|u|^2 = u\bar u$ ausmultiplizieren: die gemischten Terme heben sich weg.
S Skript S. 35, Eigenschaften des Betrags (vii) · Serie 3, Aufgabe 3.3(2)

Q mc
? Beschreibe $M_1 = \{z \in \mathbb{C} : |z - i| = |z + i|\}$.
+ Die reelle Achse $\{\mathrm{Im}\, z = 0\}$
- Die imaginäre Achse
- Der Einheitskreis
- $\{i, -i\}$
E Punkte mit gleichem Abstand zu $i$ und $-i$: die Mittelsenkrechte, also die reelle Achse.
S Skript S. 36, Geometrie in $\mathbb{C}$ · Serie 3, Aufgabe 3.4

Q mc
? Beschreibe $M_2 = \{z = x + iy : |z + 1| \le |i - z|\}$.
+ Die Halbebene $y \le -x$ (Punkte näher an $-1$ als an $i$)
- Die Halbebene $y \ge x$
- Die Kreisscheibe um $-1$ mit Radius $1$
- Die Gerade $y = -x$
E $(x+1)^2 + y^2 \le x^2 + (y - 1)^2 \Leftrightarrow 2x + 1 \le -2y + 1 \Leftrightarrow y \le -x$.
S Skript S. 36, Geometrie in $\mathbb{C}$ · Serie 3, Aufgabe 3.4

Q mc
? Beschreibe $M_3 = \{z \in \mathbb{C} : |z - 2 + i| \le 2\}$.
+ Abgeschlossene Kreisscheibe um $2 - i$ mit Radius $2$
- Abgeschlossene Kreisscheibe um $-2 + i$ mit Radius $2$
- Kreislinie um $2 - i$ mit Radius $2$
- Kreisscheibe um $2 + i$ mit Radius $4$
E $|z - (2 - i)| \le 2$: Abstand zu $2 - i$ höchstens $2$.
S Skript S. 36, Geometrie in $\mathbb{C}$ · Serie 3, Aufgabe 3.4

Q mc
? Was ist $M_4 = \{z \in \mathbb{C} : |z + 1| = |z - 1| = 1\}$?
+ $\{0\}$
- Die imaginäre Achse
- $\{i, -i\}$
- $\emptyset$
E $|z+1| = |z-1|$ heisst $\mathrm{Re}\, z = 0$. Mit $|iy + 1| = 1$ folgt $y = 0$.
S Skript S. 36, Geometrie in $\mathbb{C}$ · Serie 3, Aufgabe 3.4

Q tf
? $\mathbb{C}$ bildet mit der komplexen Addition und Multiplikation einen Körper.
A wahr
E Satz im Skript (ohne Beweis); das multiplikative Inverse ist $z^{-1} = \frac{\bar z}{|z|^2}$.
S Skript S. 33, Satz: $\mathbb{C}$ ist ein Körper

Q mc
? Wie wird $i$ im Skript definiert?
+ Als das Paar $(0, 1) \in \mathbb{R} \times \mathbb{R}$
- Als $i = \sqrt{-1}$
- Als Lösung von $x^2 = 1$
- Als $(1, 0)$
E Das Skript warnt ausdrücklich vor $i = \sqrt{-1}$ – die Wurzel ist in $\mathbb{C}$ nicht eindeutig.
S Skript S. 33, imaginäre Einheit und Bemerkung

Q mc
? Für $z = x + iy$ gilt $z \cdot \bar z = \;$ …
+ $|z|^2 = x^2 + y^2$
- $x^2 - y^2$
- $2xy\, i$
- $|z|$
E $(x + iy)(x - iy) = x^2 + y^2$, reell und $\ge 0$.
S Skript S. 34–35, Konjugation und Betrag

Q mc
? Für $z = x + iy$ und $w = u + iv$ ist $zw = \;$ …
+ $(xu - yv) + i(xv + yu)$
- $(xu + yv) + i(xv - yu)$
- $xu + i\, yv$
- $(x + u) + i(y + v)$
E Ausmultiplizieren mit $i^2 = -1$.
S Skript S. 31, Summe und Multiplikation komplexer Zahlen

Q tf
? Für alle $z, w \in \mathbb{C}$ gilt $|zw| = |z| \cdot |w|$.
A wahr
E $|zw|^2 = zw\overline{zw} = z\bar z\, w\bar w = |z|^2|w|^2$.
S Skript S. 35, Eigenschaften des Betrags (iv)

Q mc
? $\mathrm{Re}(z) = \;$ …
+ $\frac{z + \bar z}{2}$
- $\frac{z - \bar z}{2}$
- $\frac{z - \bar z}{2i}$
- $z \bar z$
E Analog $\mathrm{Im}(z) = \frac{z - \bar z}{2i}$.
S Skript S. 34, Real- und Imaginärteil

# an-folgen | Folgen & Konvergenz | Skript Kap. 4

Q mc
? Wann konvergiert $(a_n)$ gegen $a$?
+ $\forall \varepsilon \gt 0\ \exists N \in \mathbb{N}\ \forall n \gt N: |a_n - a| \lt \varepsilon$
- $\exists N \in \mathbb{N}\ \forall \varepsilon \gt 0\ \forall n \gt N: |a_n - a| \lt \varepsilon$
- $\forall \varepsilon \gt 0\ \forall n: |a_n - a| \lt \varepsilon$
- $\exists \varepsilon \gt 0\ \exists N\ \forall n \gt N: |a_n - a| \lt \varepsilon$
E Die Reihenfolge der Quantoren ist entscheidend: $N$ darf von $\varepsilon$ abhängen.
S Skript S. 40, Konvergenz

Q mc
? Für welche Folgen gilt: $\exists N\ \forall \varepsilon \gt 0: |a_n - a| \lt \varepsilon\ \forall n \gt N$?
+ Genau für Folgen, die ab einem Index konstant gleich $a$ sind.
- Für alle konvergenten Folgen.
- Für alle beschränkten Folgen.
- Für keine Folge.
E $|a_n - a|$ ist kleiner als jedes $\varepsilon \gt 0$, also $a_n = a$ für alle $n \gt N$.
S Skript S. 40, Bemerkung (vi) zur Quantorenreihenfolge · Serie 3, Aufgabe 3.5

Q tf
? Der Grenzwert einer konvergenten Folge ist eindeutig.
A wahr
E Wären $a \ne b$ Grenzwerte, wähle $\varepsilon = |a - b|/2$ – Widerspruch.
S Skript S. 41, Eindeutigkeit des Grenzwertes

Q tf
? Jede konvergente Folge ist beschränkt.
A wahr
E Ab $N$ gilt $|a_n| \lt |a| + 1$, die endlich vielen Glieder davor sind sowieso beschränkt.
S Skript S. 49, Satz

Q tf
? Jede beschränkte Folge konvergiert.
A falsch
E $a_n = (-1)^n$ ist beschränkt, aber divergent. Es gibt aber eine konvergente Teilfolge (Bolzano-Weierstrass).
S Skript S. 49–51, Beschränktheit

Q tf
? Jede beschränkte, monotone Folge reeller Zahlen konvergiert.
A wahr
E Bei monoton wachsender Folge ist der Grenzwert $\sup\{a_n\}$.
S Skript S. 50, Satz über monotone Folgen

Q mc
? Satz von Bolzano-Weierstrass:
+ Jede beschränkte Folge besitzt eine konvergente Teilfolge.
- Jede beschränkte Folge konvergiert.
- Jede monotone Folge konvergiert.
- Jede Cauchy-Folge ist beschränkt.
E Einer der zentralen Sätze der Konvergenztheorie.
S Skript S. 51, Satz von Bolzano-Weierstrass

Q mc
? $(a_n)$ heisst Cauchy-Folge, falls …
+ $\forall \varepsilon \gt 0\ \exists N\ \forall n, m \gt N: |a_n - a_m| \lt \varepsilon$
- $|a_{n+1} - a_n| \to 0$
- $\forall \varepsilon \gt 0\ \exists N\ \forall n \gt N: |a_{n+1} - a_n| \lt \varepsilon$
- $(a_n)$ beschränkt ist.
E Wichtig: alle Paare $n, m$, nicht nur benachbarte Glieder.
S Skript S. 52, Cauchy-Folge

Q tf
? In $\mathbb{R}$ (und $\mathbb{C}$) konvergiert jede Cauchy-Folge.
A wahr
E Cauchy-Kriterium. Beweis über Beschränktheit + Bolzano-Weierstrass.
S Skript S. 52–53, Konvergenzkriterium von Cauchy

Q tf
? Gilt $|a_{n+1} - a_n| \to 0$, so ist $(a_n)$ eine Cauchy-Folge.
A falsch
E $a_n = \sqrt n$: $\sqrt{n+1} - \sqrt n \to 0$, aber $a_n \to \infty$. Ebenso die Partialsummen der harmonischen Reihe.
S Skript S. 52, Cauchy-Folge

Q tf
? Gilt $|a_{n+1} - a_n| \lt 2^{-n}$ für alle $n$, so ist $(a_n)$ eine Cauchy-Folge.
A wahr
E Für $m \gt n$: $|a_m - a_n| \le \sum_{k=n}^{m-1} 2^{-k} \lt 2^{1-n} \to 0$.
S Skript S. 52, Cauchy-Folge · Serie 5, Aufgabe 5.4

Q mc
? $\lim_{n \to \infty} \frac{\sqrt[n]{n}}{\sqrt n} = \;$ …
+ $0$
- $1$
- $\infty$
- existiert nicht
E $\sqrt[n]{n} \to 1$ ist beschränkt, $\sqrt n \to \infty$.
S Skript S. 43, $\sqrt[n]{n} \to 1$ · Serie 4, Aufgabe 4.2(a)

Q mc
? $\lim_{n \to \infty} \frac{2^n - \sqrt[3]{n}}{2^n + \sqrt[3]{n}} = \;$ …
+ $1$
- $0$
- $-1$
- existiert nicht
E $2^n$ ausklammern; $\frac{\sqrt[3]{n}}{2^n} \to 0$, da $2^n$ schneller wächst als jede Potenz.
S Skript S. 44, Rechenregeln · Serie 4, Aufgabe 4.2(b)

Q tf
? Die Folge $(1 + i)^n$ konvergiert.
A falsch
E $|(1+i)^n| = \sqrt2^{\,n} \to \infty$; die Folge läuft spiralförmig nach aussen (Winkel $n\pi/4$).
S Skript S. 49, konvergent ⇒ beschränkt · Serie 4, Aufgabe 4.2(c)

Q mc
? $\lim_{n \to \infty} \frac{(3 - n)^3}{3n^3 - 1} = \;$ …
+ $-\frac13$
- $\frac13$
- $1$
- $-1$
E Höchste Potenz: $\frac{-n^3 + \dots}{3n^3 - 1} \to -\frac13$.
S Skript S. 44, Rechenregeln · Serie 4, Aufgabe 4.2(d)

Q tf
? Die Folge $\frac{1 + (-1)^n n^2}{2 + 3n + n^2}$ konvergiert.
A falsch
E Die Teilfolgen für gerade bzw. ungerade $n$ konvergieren gegen $1$ bzw. $-1$.
S Skript S. 50, Teilfolgen · Serie 4, Aufgabe 4.2(e)

Q mc
? $\lim_{n \to \infty} \frac{1}{2^n}\binom{n}{k}$ für festes $k$:
+ $0$
- $1$
- $\frac{1}{k!}$
- $\infty$
E $\binom{n}{k} \le n^k$ ist polynomiell, $2^n$ wächst schneller.
S Skript S. 44, Rechenregeln · Serie 4, Aufgabe 4.3(a)

Q mc
? $\lim_{n \to \infty} \sqrt[n]{|P(n)|}$ für ein Polynom $P \ne 0$:
+ $1$
- $0$
- $\deg P$
- hängt vom Leitkoeffizienten ab
E $c\, n^d \le |P(n)| \le C n^d$ für grosse $n$, und $\sqrt[n]{n^d} = (\sqrt[n]{n})^d \to 1$, $\sqrt[n]{c} \to 1$.
S Skript S. 43, $\sqrt[n]{a} \to 1$, $\sqrt[n]{n} \to 1$ · Serie 4, Aufgabe 4.3(c)

Q input
? Berechne $\lim_{n \to \infty} \frac{1 + 2 + \dots + n}{n^2 + 1}$.
A 1/2; 0.5
E $\frac{n(n+1)/2}{n^2 + 1} \to \frac12$.
S Skript S. 44, Rechenregeln · Serie 4, Aufgabe 4.3(d)

Q input
? Berechne $\lim_{n \to \infty} \left(\sqrt{n^2 + n} - n\right)$.
A 1/2; 0.5
E Erweitern: $\frac{n}{\sqrt{n^2+n} + n} = \frac{1}{\sqrt{1 + 1/n} + 1} \to \frac12$.
S Skript S. 44, Rechenregeln · Serie 4, Aufgabe 4.3(e)

Q mc
? Für welche $x \in \mathbb{R}$ konvergiert $a_n = \left(\frac{1 + 2x}{1 + x^2}\right)^{2n}$?
+ für $x \le 0$ oder $x \ge 2$
- für alle $x \in \mathbb{R}$
- nur für $x = 0$
- für $0 \le x \le 2$
E $a_n = q^n$ mit $q = \left(\frac{1+2x}{1+x^2}\right)^2 \ge 0$; Konvergenz genau für $q \le 1$, und das heisst $x(2-x) \le 0$.
S Skript S. 16, Satz über Potenzen · Serie 4, Aufgabe 4.4

Q mc
? Welche Folge ist unbeschränkt, hat aber eine konvergente Teilfolge?
+ $(1, 2, 1, 4, 1, 6, \dots)$
- $(1, 2, 3, 4, \dots)$
- $\left(\frac1n\right)$
- $((-1)^n)$
E Die ungeraden Glieder sind konstant $1$, die geraden wachsen unbeschränkt.
S Skript S. 50, Teilfolge · Serie 4, Aufgabe 4.5

Q tf
? Es gibt eine Folge, die für jedes $m \in \mathbb{N}$ eine gegen $m$ konvergente Teilfolge besitzt.
A wahr
E $(1, 1, 2, 1, 2, 3, 1, 2, 3, 4, \dots)$: Jedes $m$ kommt unendlich oft vor.
S Skript S. 50, Teilfolge · Serie 4, Aufgabe 4.5(b)

Q tf
? Aus $a_n \to a$ folgt $\frac{a_1 + \dots + a_n}{n} \to a$.
A wahr
E Cesàro-Mittel: Aufteilen in die ersten $N$ Glieder (Beitrag $\to 0$) und den Rest (alle nahe bei $a$).
S Skript S. 40, Konvergenz · Serie 5, Aufgabe 5.1

Q tf
? Aus $\frac{a_1 + \dots + a_n}{n} \to a$ folgt $a_n \to a$.
A falsch
E $a_n = (-1)^n$: Die Mittel gehen gegen $0$, die Folge konvergiert nicht.
S Skript S. 40, Konvergenz · Serie 5, Aufgabe 5.1

Q mc
? $a_0 = a$, $a_1 = b$, $a_n = \frac12(a_{n-1} + a_{n-2})$. Wogegen konvergiert $(a_n)$?
+ $\frac{a + 2b}{3}$
- $\frac{a + b}{2}$
- $\frac{2a + b}{3}$
- $b$
E $a_n - a_{n-1} = -\frac12(a_{n-1} - a_{n-2})$, also geometrische Summe: $b + (b - a)\sum_{k \ge 1}(-\tfrac12)^k = b - \frac{b-a}{3}$.
S Skript S. 56, geometrische Reihe · Serie 5, Aufgabe 5.2

Q tf
? Jede Folge reeller Zahlen besitzt eine monotone Teilfolge.
A wahr
E „Gipfelpunkte"-Argument: Unendlich viele Gipfel ergeben eine fallende, sonst findet man eine wachsende Teilfolge.
S Skript S. 50, Teilfolge · Serie 5, Aufgabe 5.3(1)

Q tf
? Jede beschränkte, divergente reelle Folge hat zwei konvergente Teilfolgen mit verschiedenen Grenzwerten.
A wahr
E Bolzano-Weierstrass liefert eine konvergente Teilfolge; da die Folge nicht konvergiert, bleiben unendlich viele Glieder weg vom Grenzwert – wieder Bolzano-Weierstrass.
S Skript S. 51, Bolzano-Weierstrass · Serie 5, Aufgabe 5.3(2)

Q mc
? Sandwich-Satz: Gilt $A_n \le a_n \le B_n$ für fast alle $n$ und $A_n, B_n \to L$, dann …
+ $a_n \to L$
- $a_n$ ist beschränkt, konvergiert aber nicht unbedingt.
- $a_n \to 0$
- $A_n = B_n$ für fast alle $n$.
E Einschliessungsregel, Korollar 2 im Skript.
S Skript S. 48, Einschliessungsregel (Sandwich-Satz)

Q tf
? Gilt $a_n \in (0, 1)$ für alle $n$ und $a_n \to a$, so ist $a \in (0, 1)$.
A falsch
E $a_n = \frac{1}{n+1} \to 0 \notin (0,1)$. Mit abgeschlossenem Intervall $[A, B]$ stimmt die Aussage (Korollar 1).
S Skript S. 48, Korollar 1

Q mc
? $(a_n)$ konvergiert gegen $+\infty$, falls …
+ $\forall K \gt 0\ \exists N\ \forall n \gt N: a_n \gt K$
- $(a_n)$ unbeschränkt ist.
- $a_{n+1} \gt a_n$ für alle $n$.
- $\exists K\ \forall n: a_n \gt K$
E Unbeschränkt reicht nicht: $(1, 2, 1, 4, 1, 6, \dots)$ konvergiert nicht gegen $\infty$.
S Skript S. 54, Konvergenz gegen Unendlich

Q tf
? Konvergiert $(a_n)$ gegen $a$, so konvergiert jede Teilfolge gegen $a$.
A wahr
E Ist $n_k \ge k$, so gilt für $k \gt N$ auch $n_k \gt N$.
S Skript S. 50, Teilfolge

# an-reihen | Reihen & Potenzreihen | Skript Kap. 5

Q input
? Berechne $\sum_{k=1}^{\infty} \frac{1}{4k^2 - 1}$.
A 1/2; 0.5
E Partialbruch: $\frac{1}{4k^2-1} = \frac12\left(\frac{1}{2k-1} - \frac{1}{2k+1}\right)$, teleskopisch $\to \frac12$.
S Skript S. 56–57, teleskopische Reihe · Serie 5, Aufgabe 5.5

Q input
? Berechne $\sum_{k=1}^{\infty} \frac{1}{k(k+1)(k+2)}$.
A 1/4; 0.25
E $\frac{1}{k(k+1)(k+2)} = \frac12\left(\frac{1}{k(k+1)} - \frac{1}{(k+1)(k+2)}\right)$, teleskopisch $\to \frac12 \cdot \frac12$.
S Skript S. 56–57, teleskopische Reihe · Serie 5, Aufgabe 5.5

Q multi
? Welche Reihen konvergieren?
- $\sum (-1)^n \frac{n}{n+1}$
+ $\sum \frac{2^n + 3^n}{5^n}$
- $\sum \frac{1}{\sqrt n}$
- $\sum \frac{1}{\sqrt{n(n+1)}}$
- $\sum \frac{n}{n^2 + 1}$
+ $\sum (-1)^n \left(\sqrt[n]{3} - 1\right)$
E Erste: Glieder keine Nullfolge. Zweite: zwei geometrische Reihen. 3.–5.: asymptotisch $\ge \frac{c}{n}$. Letzte: Leibniz.
S Skript S. 57–63, Konvergenzkriterien · Serie 6, Aufgabe 6.1

Q input
? Berechne $\sum_{n=1}^{\infty} \frac{2^n + 3^n}{5^n}$.
A 13/6
E $\sum_{n \ge 1} (2/5)^n = \frac{2/5}{3/5} = \frac23$ und $\sum_{n \ge 1}(3/5)^n = \frac{3/5}{2/5} = \frac32$; zusammen $\frac{13}{6}$.
S Skript S. 56, geometrische Reihe · Serie 6, Aufgabe 6.1(b)

Q tf
? $\sum_{n=1}^{\infty} \frac{1}{\sqrt{n(n+1)}}$ konvergiert.
A falsch
E Asymptotisch äquivalent zu $\frac1n$; die harmonische Reihe divergiert.
S Skript S. 61–62, asymptotische Äquivalenz · Serie 6, Aufgabe 6.1(d)

Q tf
? $\sum_{n=1}^{\infty} (-1)^n\left(\sqrt[n]{3} - 1\right)$ konvergiert.
A wahr
E $\sqrt[n]{3} - 1$ ist eine monoton fallende Nullfolge – Leibniz.
S Skript S. 59, Leibniz-Kriterium · Serie 6, Aufgabe 6.1(f)

Q mc
? Für welche $k \gt 0$ konvergiert $\sum_{n=1}^{\infty} \frac{k^n}{1 + k^n}$?
+ für $0 \lt k \lt 1$
- für alle $k \gt 0$
- für $k \gt 1$
- für $k \le 1$
E Für $k \ge 1$ sind die Glieder keine Nullfolge ($\to \frac12$ bzw. $1$); für $k \lt 1$ ist $\sum k^n$ eine Majorante.
S Skript S. 57 und S. 60, Nullfolgenkriterium, Majorante · Serie 6, Aufgabe 6.2(a)

Q multi
? Welche Reihen konvergieren?
- $\sum \frac{n + 4}{n^2 - 3n + 1}$
+ $\sum \frac{n + 2^n}{n!}$
+ $\sum \frac{n^n}{(2n)!}$
+ $\sum \frac{(n+1)^{n-1}}{(-n)^n}$
E Erste: asymptotisch $\frac1n$. Zweite: Quotient $\to 0$. Dritte: Wurzelkriterium, $\sqrt[n]{\cdot} \le \sqrt2/\sqrt n \to 0$. Vierte: alternierend, Beträge monoton fallend $\to 0$ (Leibniz).
S Skript S. 59–66, Konvergenzkriterien · Serie 6, Aufgabe 6.2

Q tf
? Kann man die Konvergenz einer Reihe mit dem Quotientenkriterium zeigen, so auch mit dem Wurzelkriterium.
A wahr
E $\liminf \left|\frac{a_{n+1}}{a_n}\right| \le \liminf \sqrt[n]{|a_n|} \le \limsup \sqrt[n]{|a_n|} \le \limsup \left|\frac{a_{n+1}}{a_n}\right|$.
S Skript S. 66, Satz (s. Übung) · Serie 6, Aufgabe 6.4(a)

Q tf
? Kann man die Konvergenz einer Reihe mit dem Wurzelkriterium zeigen, so auch mit dem Quotientenkriterium.
A falsch
E $a_n = 2^{-n}$ ($n$ gerade), $3^{-n}$ ($n$ ungerade): $\limsup \sqrt[n]{a_n} = \frac12$, aber die Quotienten pendeln zwischen $0$ und $\infty$.
S Skript S. 66, Beispiel nach dem Satz · Serie 6, Aufgabe 6.4(b)

Q tf
? Lässt man in einer Reihe endlich viele Glieder die Plätze tauschen, so ändert sich weder Konvergenz noch Summe.
A wahr
E Ab einem Index stimmen die Partialsummen überein.
S Skript S. 67, Rechenregeln für Reihen · Serie 6, Aufgabe 6.5

Q tf
? Eine konvergente, aber nicht absolut konvergente Reihe lässt sich so umordnen, dass sie gegen jede vorgegebene Zahl $s$ konvergiert.
A wahr
E Riemannscher Umordnungssatz: Positive und negative Glieder bilden je divergente Reihen – man addiert abwechselnd „bis über $s$" bzw. „bis unter $s$".
S Skript S. 67–68, Umordnung

Q tf
? Jede absolut konvergente Reihe konvergiert.
A wahr
E $|s_n - s_m| \le \sum_{k=m+1}^n |a_k|$ – Cauchy-Kriterium.
S Skript S. 63, absolute Konvergenz

Q tf
? Jede konvergente Reihe konvergiert absolut.
A falsch
E Die alternierende harmonische Reihe konvergiert, die harmonische nicht.
S Skript S. 63, absolute Konvergenz

Q tf
? Ist $(a_k)$ eine Nullfolge, so konvergiert $\sum a_k$.
A falsch
E Notwendig, aber nicht hinreichend: Die harmonische Reihe $\sum \frac1k$ divergiert.
S Skript S. 57, Nullfolgenkriterium

Q mc
? Für welche $\alpha$ konvergiert $\sum_{k=1}^{\infty} \frac{1}{k^\alpha}$?
+ genau für $\alpha \gt 1$
- genau für $\alpha \ge 1$
- genau für $\alpha \gt 0$
- für kein $\alpha$
E $\alpha = 1$: harmonische Reihe (divergent); $\alpha \lt 1$: $\frac{1}{k^\alpha} \ge \frac1k$.
S Skript S. 58, Reihe $\sum 1/k^\alpha$

Q mc
? Für $|z| \lt 1$ ist $\sum_{k=0}^{\infty} z^k = \;$ …
+ $\frac{1}{1 - z}$
- $\frac{z}{1 - z}$
- $\frac{1}{1 + z}$
- $\frac{1 - z^{k+1}}{1 - z}$
E Partialsummen $s_n = \frac{1 - z^{n+1}}{1 - z}$ und $z^{n+1} \to 0$.
S Skript S. 56, geometrische Reihe

Q mc
? Quotientenkriterium: Sei $q = \lim \left|\frac{a_{k+1}}{a_k}\right|$. Dann …
+ $q \lt 1$: absolut konvergent; $q \gt 1$: divergent; $q = 1$: keine Aussage.
- $q \le 1$: konvergent; $q \gt 1$: divergent.
- $q \lt 1$: divergent; $q \gt 1$: konvergent.
- $q = 1$: konvergent.
E Bei $q = 1$ ist alles möglich: $\sum \frac1n$ divergiert, $\sum \frac{1}{n^2}$ konvergiert.
S Skript S. 63, Quotientenkriterium

Q mc
? Wurzelkriterium: Sei $L = \limsup \sqrt[n]{|a_n|}$. Dann …
+ $L \lt 1$: absolut konvergent; $L \gt 1$: divergent; $L = 1$: keine Aussage.
- $L \le 1$: konvergent.
- $L \lt 1$: divergent.
- Es braucht $\lim$ statt $\limsup$.
E Mit $\limsup$ – der Grenzwert muss nicht existieren.
S Skript S. 65, Wurzelkriterium

Q mc
? Leibniz-Kriterium: $\sum (-1)^k a_k$ konvergiert, falls $(a_k)$ …
+ eine monoton fallende Nullfolge ist.
- eine Nullfolge ist.
- monoton fallend ist.
- beschränkt ist.
E Monotonie ist nötig: Ohne sie kann eine alternierende Reihe mit Nullfolgen-Gliedern divergieren.
S Skript S. 59, Konvergenzkriterium von Leibniz

Q mc
? Majorantenkriterium: Gilt $|a_k| \le |b_k|$ für fast alle $k$ und konvergiert $\sum |b_k|$, so …
+ konvergiert $\sum a_k$ (absolut).
- divergiert $\sum a_k$.
- gilt $\sum a_k = \sum b_k$.
- folgt nichts.
E Umgekehrt: Divergiert $\sum a_k$, so divergiert $\sum |b_k|$ (Minorante).
S Skript S. 60, Majoranten- und Minorantenkriterium

Q mc
? Zwei positive Folgen heissen asymptotisch äquivalent, wenn …
+ $\lim \frac{a_n}{b_n} = 1$
- $a_n - b_n \to 0$
- $a_n \le b_n$ für alle $n$
- beide gegen $0$ gehen
E Dann konvergieren $\sum a_n$ und $\sum b_n$ entweder beide oder keine.
S Skript S. 61, asymptotisch äquivalent

Q tf
? $\limsup a_n = -\infty$ gilt genau dann, wenn $a_n \to -\infty$.
A wahr
E Ist das „grösste Häufungsverhalten" $-\infty$, so werden alle Glieder beliebig klein.
S Skript S. 64, Limes superior · Serie 6, Aufgabe 6.3(b)

Q tf
? $\limsup a_n = +\infty$ gilt genau dann, wenn eine Teilfolge gegen $+\infty$ konvergiert.
A wahr
E $\limsup = +\infty$ heisst: $(a_n)$ ist nach oben unbeschränkt.
S Skript S. 64, Limes superior · Serie 6, Aufgabe 6.3(a)

Q mc
? Konvergenzradius von $\sum_{n \ge 1} \sqrt{n}\, z^n$:
+ $R = 1$
- $R = 0$
- $R = \infty$
- $R = \frac12$
E Euler: $\frac{\sqrt{n+1}}{\sqrt n} \to 1$, also $R = 1$.
S Skript S. 71, Berechnung des Konvergenzradius · Serie 7, Aufgabe 7.1(a)

Q mc
? Konvergenzradius von $\sum_{n \ge 1} q^{n^2} z^n$ ($q \in \mathbb{C}$):
+ $R = \infty$ für $|q| \lt 1$, $R = 1$ für $|q| = 1$, $R = 0$ für $|q| \gt 1$
- $R = \frac{1}{|q|}$
- $R = |q|$
- immer $R = 1$
E Cauchy-Hadamard: $\sqrt[n]{|q^{n^2}|} = |q|^n \to 0, 1$ bzw. $\infty$.
S Skript S. 71, Cauchy-Hadamard · Serie 7, Aufgabe 7.1(b)

Q mc
? $a_n = b^n$ für gerade $n$, $a_n = c^n$ für ungerade $n$. Konvergenzradius von $\sum a_n z^n$?
+ $R = \frac{1}{\max(|b|, |c|)}$
- $R = \frac{1}{\min(|b|, |c|)}$
- $R = \frac{2}{|b| + |c|}$
- Er existiert nicht.
E $\sqrt[n]{|a_n|}$ nimmt die Werte $|b|, |c|$ je unendlich oft an, $\limsup = \max$.
S Skript S. 71, Cauchy-Hadamard · Serie 7, Aufgabe 7.1(c)

Q mc
? $P_1(z) = \sum z^n$ hat $R = 1$. Wo auf $|z| = 1$ konvergiert sie?
+ Nirgends
- Überall
- Überall ausser in $z = 1$
- Nur in $z = -1$
E Für $|z| = 1$ gilt $|z^n| = 1$, die Glieder sind keine Nullfolge.
S Skript S. 70, Konvergenzradius · Serie 7, Aufgabe 7.2(a)

Q mc
? $P_2(z) = \sum \frac{z^n}{n}$ hat $R = 1$. Wo auf $|z| = 1$ konvergiert sie?
+ Überall ausser in $z = 1$
- Nirgends
- Überall
- Nur in $z = -1$
E $z = 1$: harmonische Reihe. Sonst Umschreiben mit $(1-z)$ gibt die Majorante $\sum \frac{1}{n(n-1)}$.
S Skript S. 70–71, Konvergenzradius · Serie 7, Aufgabe 7.2(b)

Q mc
? $P_3(z) = \sum \frac{z^n}{n^2}$ hat $R = 1$. Wo auf $|z| = 1$ konvergiert sie?
+ Überall (sogar absolut)
- Nirgends
- Überall ausser in $z = 1$
- Nur in $z = 1$
E $\left|\frac{z^n}{n^2}\right| = \frac{1}{n^2}$, und $\sum \frac{1}{n^2}$ konvergiert.
S Skript S. 58, $\sum 1/k^\alpha$ · Serie 7, Aufgabe 7.2(c)

Q mc
? Formel von Cauchy-Hadamard für den Konvergenzradius:
+ $R = \frac{1}{\limsup \sqrt[n]{|a_n|}}$
- $R = \limsup \sqrt[n]{|a_n|}$
- $R = \lim \left|\frac{a_{n+1}}{a_n}\right|$
- $R = \sup_n |a_n|$
E Konventionen: $\frac10 = \infty$, $\frac{1}{\infty} = 0$. Alternativ (Euler) $R = 1/q$ mit $q = \lim \left|\frac{a_{n+1}}{a_n}\right|$, falls existent.
S Skript S. 71, Berechnung des Konvergenzradius

Q mc
? Was gilt für eine Potenzreihe mit Konvergenzradius $R$?
+ Absolut konvergent für $|z| \lt R$, divergent für $|z| \gt R$; auf $|z| = R$ keine allgemeine Aussage.
- Konvergent für $|z| \le R$.
- Divergent für $|z| \lt R$.
- Konvergent genau auf $|z| = R$.
E Siehe die Beispiele $P_1, P_2, P_3$ aus Serie 7.
S Skript S. 70, Satz über den Konvergenzradius

Q tf
? Die Exponentialreihe $\sum \frac{z^n}{n!}$ konvergiert für alle $z \in \mathbb{C}$ absolut.
A wahr
E Quotientenkriterium: $\frac{|z|}{n+1} \to 0$. Also $R = \infty$.
S Skript S. 69, Beispiele für Potenzreihen

Q input
? Berechne $\sum_{k=1}^{\infty} \frac{1}{k(k+1)}$.
A 1
E $\frac{1}{k(k+1)} = \frac1k - \frac{1}{k+1}$, teleskopisch: $s_n = 1 - \frac{1}{n+1} \to 1$.
S Skript S. 56–57, teleskopische Reihe

Q tf
? Das Quotientenkriterium bleibt richtig, wenn man $\lim$ durch $\limsup$ ersetzt (Divergenz für $\limsup \gt 1$).
A falsch
E Im Beispiel $2^{-n}$/$3^{-n}$ ist $\limsup$ des Quotienten $\infty$, die Reihe konvergiert aber.
S Skript S. 66 · Serie 6, Aufgabe 6.4(c)

# an-stetig | Funktionen & Stetigkeit | Skript Kap. 6

Q mc
? $f: (0, \infty) \to \mathbb{R}$, $f(x) = 1 + \frac1x$. Was ist das Bild von $f$?
+ $(1, \infty)$
- $(0, \infty)$
- $[1, \infty)$
- $\mathbb{R}$
E $\frac1x$ nimmt jeden Wert in $(0, \infty)$ genau einmal an.
S Skript S. 74, Bild · Serie 7, Aufgabe 7.3(a)

Q mc
? $f(x) = 1 + \frac1x$ auf $(0, \infty)$. Was ist $f^{-1}: (1, \infty) \to (0, \infty)$?
+ $f^{-1}(y) = \frac{1}{y - 1}$
- $f^{-1}(y) = y - 1$
- $f^{-1}(y) = \frac{1}{y} - 1$
- $f^{-1}(y) = 1 - \frac1y$
E $y = 1 + \frac1x \Leftrightarrow x = \frac{1}{y-1}$.
S Skript S. 74, Bijektivität · Serie 7, Aufgabe 7.3(a)

Q mc
? $f(x) = 1 + \frac1x$ auf $(0, \infty)$. Was ist $(f \circ f)(x)$?
+ $\frac{2x + 1}{x + 1}$
- $1 + \frac{2}{x}$
- $\frac{x + 1}{x}$
- $\left(1 + \frac1x\right)^2$
E $1 + \frac{1}{1 + 1/x} = 1 + \frac{x}{x+1} = \frac{2x+1}{x+1}$.
S Skript S. 75, Komposition · Serie 7, Aufgabe 7.3(a)

Q mc
? $f(x) = -1$ für $x \le 0$ und $f(x) = \frac2x$ für $x \gt 0$. Was ist die $n$-fache Komposition $f^{\circ n}$?
+ Für ungerades $n$ gleich $f$; für gerades $n$: $-1$ für $x \le 0$ und $x$ für $x \gt 0$.
- Immer gleich $f$.
- Für gerades $n$ die Identität auf ganz $\mathbb{R}$.
- $\left(\frac2x\right)^n$ für $x \gt 0$.
E $f(f(x)) = f(-1) = -1$ für $x \le 0$ und $f(\frac2x) = x$ für $x \gt 0$.
S Skript S. 75, Komposition · Serie 7, Aufgabe 7.3(b)

Q tf
? $f(x) = \big|1 - |x|\big|$ ist stetig auf $\mathbb{R}$.
A wahr
E Komposition und Differenz stetiger Funktionen ($x \mapsto |x|$ ist Lipschitz-stetig mit $L = 1$).
S Skript S. 80–81, Rechenregeln für stetige Funktionen · Serie 7, Aufgabe 7.4

Q tf
? Die Funktion $f(x) = \frac1q$ für $x = \frac pq$ (gekürzt) und $f(x) = 0$ für irrationale $x$ ist in allen irrationalen Punkten stetig und in allen rationalen unstetig.
A wahr
E In der Nähe eines Punktes haben rationale Zahlen nur grosse Nenner (endlich viele Ausnahmen). In $\frac pq$ selbst ist $f = \frac1q \gt 0$, aber irrationale Punkte beliebig nah haben Wert $0$.
S Skript S. 76, Stetigkeit · Serie 7, Aufgabe 7.5

Q tf
? Ist $f: [a, b] \to \mathbb{R}$ stetig und injektiv, so ist $f$ streng monoton.
A wahr
E Sonst gäbe es $x \lt y \lt z$ mit $f(y)$ nicht zwischen $f(x)$ und $f(z)$ – der Zwischenwertsatz liefert dann einen zweiten Punkt mit gleichem Wert.
S Skript S. 82, Zwischenwertsatz · Serie 8, Aufgabe 8.1

Q mc
? $f_n(x) = \frac{nx}{1 + |nx|}$. Was ist $f(x) = \lim_{n \to \infty} f_n(x)$?
+ $1$ für $x \gt 0$, $0$ für $x = 0$, $-1$ für $x \lt 0$
- $x$ für alle $x$
- $\frac{x}{|x|}$, in $0$ nicht definiert
- $0$ für alle $x$
E Für $x \ne 0$: $\frac{nx}{1 + n|x|} \to \frac{x}{|x|}$. Für $x = 0$ ist $f_n(0) = 0$.
S Skript S. 76, Stetigkeit · Serie 8, Aufgabe 8.2

Q tf
? Der punktweise Grenzwert stetiger Funktionen ist stetig.
A falsch
E Gegenbeispiel Serie 8, 8.2: Alle $f_n$ sind stetig, der Grenzwert springt in $0$.
S Skript S. 79, Folgenkriterium · Serie 8, Aufgabe 8.2

Q tf
? Ist $f: \mathbb{R} \to \mathbb{R}$ stetig mit $\lim_{x \to -\infty} f(x) \lt 0 \lt \lim_{x \to +\infty} f(x)$, so hat $f$ eine Nullstelle.
A wahr
E Es gibt $x_1$ mit $f(x_1) \lt 0$ und $x_2$ mit $f(x_2) \gt 0$; dann Zwischenwertsatz auf $[x_1, x_2]$.
S Skript S. 82–83, Zwischenwertsatz und Bemerkung · Serie 8, Aufgabe 8.3

Q tf
? Ist $f$ additiv ($f(x+y) = f(x) + f(y)$) und stetig in $0$, so ist $f$ auf ganz $\mathbb{R}$ stetig.
A wahr
E $f(x + h) - f(x) = f(h) = f(h) - f(0) \to 0$ für $h \to 0$ (beachte $f(0) = 0$).
S Skript S. 76, Stetigkeit · Serie 8, Aufgabe 8.4

Q tf
? Sind $A, B \subset \mathbb{R}$ abgeschlossen, so ist $A + B = \{a + b\}$ abgeschlossen.
A falsch
E $A = \mathbb{N}$, $B = \{-n + \frac1n : n \ge 2\}$: $\frac1n \in A + B$, aber $0 \notin A + B$.
S Skript S. 84, Abgeschlossenheit · Serie 8, Aufgabe 8.5(1)

Q tf
? Ist $A$ kompakt und $B$ abgeschlossen, so ist $A + B$ abgeschlossen.
A wahr
E Aus $a_n + b_n \to x$ wähle eine in $A$ konvergente Teilfolge $a_{n_k} \to a$; dann $b_{n_k} \to x - a \in B$.
S Skript S. 87, Bolzano-Weierstrass-Charakterisierung · Serie 8, Aufgabe 8.5(2)

Q mc
? $f$ ist stetig in $x_0$, falls …
+ $\forall \varepsilon \gt 0\ \exists \delta \gt 0: |f(x) - f(x_0)| \lt \varepsilon$ für alle $x \in D$ mit $|x - x_0| \lt \delta$
- $\exists \delta \gt 0\ \forall \varepsilon \gt 0: |f(x) - f(x_0)| \lt \varepsilon$ für $|x - x_0| \lt \delta$
- $f$ in $x_0$ definiert ist
- $\forall \delta \gt 0\ \exists \varepsilon \gt 0: \dots$
E $\varepsilon$-$\delta$-Definition.
S Skript S. 76, Definition der Stetigkeit

Q mc
? Folgenkriterium der Stetigkeit: $f$ ist stetig in $x_0$ genau dann, wenn …
+ für jede Folge $x_n \to x_0$ in $D$ gilt $f(x_n) \to f(x_0)$.
- es eine Folge $x_n \to x_0$ mit $f(x_n) \to f(x_0)$ gibt.
- $f(x_n)$ für jede Folge konvergiert.
- $f$ beschränkt ist.
E „Für jede" ist entscheidend – eine einzelne Folge reicht nicht.
S Skript S. 79, Folgenkriterium

Q mc
? $f$ ist Lipschitz-stetig mit Konstante $L$. Welches $\delta$ funktioniert in der $\varepsilon$-$\delta$-Definition?
+ $\delta = \frac{\varepsilon}{L}$
- $\delta = L\varepsilon$
- $\delta = \varepsilon$
- $\delta = \varepsilon^2$
E $|f(x) - f(y)| \le L|x - y| \lt L \cdot \frac{\varepsilon}{L} = \varepsilon$.
S Skript S. 77, Lipschitz-stetig

Q mc
? Zwischenwertsatz: Ist $f: [a, b] \to \mathbb{R}$ stetig und $\gamma$ zwischen $f(a)$ und $f(b)$, so …
+ gibt es $c \in [a, b]$ mit $f(c) = \gamma$.
- ist $f$ monoton.
- gibt es genau ein $c$ mit $f(c) = \gamma$.
- nimmt $f$ in $\gamma$ ein Maximum an.
E Beweis per Intervallhalbierung – eine Version der Vollständigkeit.
S Skript S. 82, Zwischenwertsatz

Q tf
? Jede stetige Funktion $f: [a, b] \to [a, b]$ hat einen Fixpunkt.
A wahr
E Wende den Zwischenwertsatz auf $g(x) = f(x) - x$ an: $g(a) \ge 0 \ge g(b)$.
S Skript S. 83, Korollar 2

Q mc
? Eine Menge $K \subset \mathbb{R}$ heisst (im Skript) kompakt, wenn …
+ sie abgeschlossen und beschränkt ist.
- sie beschränkt ist.
- sie ein Intervall ist.
- sie endlich ist.
E Äquivalent: Jede Folge in $K$ hat eine in $K$ konvergente Teilfolge.
S Skript S. 86, Kompaktheit

Q tf
? Das Intervall $]0, 1[$ ist kompakt.
A falsch
E Es ist nicht abgeschlossen: $\frac1n \to 0 \notin\ ]0, 1[$.
S Skript S. 87, Bemerkung

Q tf
? Jede stetige Funktion auf $]0, 1[$ nimmt ein Maximum an.
A falsch
E $f(x) = x$ hat das Supremum $1$, aber kein Maximum. Der Satz verlangt kompakten Definitionsbereich.
S Skript S. 88, Satz vom Maximum und Minimum

Q mc
? Satz vom Maximum und Minimum:
+ Jede stetige Funktion auf einer kompakten Menge nimmt Maximum und Minimum an.
- Jede stetige Funktion ist beschränkt.
- Jede beschränkte Funktion nimmt ein Maximum an.
- Jede monotone Funktion nimmt ein Maximum an.
E Beweis über: $f(K)$ ist kompakt.
S Skript S. 88, Satz von Maximum und Minimum

Q tf
? Jede stetige Funktion auf einer kompakten Menge ist gleichmässig stetig.
A wahr
E Satz im Skript. Auf nicht kompakten Mengen falsch, z.B. $x^2$ auf $\mathbb{R}$.
S Skript S. 89, Satz

Q tf
? $f(x) = x^2$ ist auf $\mathbb{R}$ gleichmässig stetig.
A falsch
E $(x + \delta)^2 - x^2 = 2x\delta + \delta^2$ wird für grosse $x$ beliebig gross – kein $\delta$ passt für alle $x$.
S Skript S. 88, gleichmässig stetig

Q mc
? Was unterscheidet gleichmässige Stetigkeit von Stetigkeit?
+ $\delta$ darf nur von $\varepsilon$, nicht vom Punkt $x$ abhängen.
- $\varepsilon$ darf von $x$ abhängen.
- Gleichmässig stetige Funktionen sind konstant.
- Es gibt keinen Unterschied.
E $\forall \varepsilon\ \exists \delta\ \forall x, x'$ statt $\forall x\ \forall \varepsilon\ \exists \delta$.
S Skript S. 88, gleichmässig stetig

Q tf
? Die Vereinigung beliebig vieler abgeschlossener Mengen ist abgeschlossen.
A falsch
E $\bigcup_n \left[\frac1n, 1\right] = (0, 1]$ ist nicht abgeschlossen. Endliche Vereinigungen sind abgeschlossen.
S Skript S. 85, Lemma und Bemerkung

Q tf
? Für stetiges $f$ ist $\{x : f(x) \le a\}$ abgeschlossen, $\{x : f(x) \lt a\}$ aber im Allgemeinen nicht.
A wahr
E Das Lemma gilt mit $\le, \ge, =$, aber nicht mit $\lt$ oder $\gt$.
S Skript S. 85, Lemma und Bemerkung

Q tf
? Ist $K$ kompakt und $f$ stetig, so ist $f(K)$ kompakt.
A wahr
E Folgenargument: Zu $f(x_n)$ wähle eine in $K$ konvergente Teilfolge $x_{n_k} \to x$; dann $f(x_{n_k}) \to f(x)$.
S Skript S. 88, Lemma

Q mc
? $x_0$ ist ein Häufungspunkt von $D$, wenn …
+ jede Umgebung von $x_0$ unendlich viele Punkte aus $D$ enthält.
- $x_0 \in D$ gilt.
- $x_0$ der Grenzwert einer Folge in $D$ ist.
- $D$ beschränkt ist.
E Ein Häufungspunkt muss nicht in $D$ liegen, z.B. $0$ für $D = (0, 1)$.
S Skript S. 90, Häufungspunkt

Q tf
? Eine beschränkte, monotone Funktion $f: ]\alpha, \beta[ \to \mathbb{R}$ hat in jedem Punkt einseitige Grenzwerte.
A wahr
E Monotonie + Beschränktheit wie bei Folgen: Grenzwert ist ein Supremum bzw. Infimum.
S Skript S. 96, Satz über einseitige Grenzwerte

Q tf
? Für $f: A \to A$ und $g: A \to A$ gilt im Allgemeinen $f \circ g = g \circ f$.
A falsch
E Die Reihenfolge der Komposition ist relevant, z.B. $f(x) = x + 1$, $g(x) = 2x$.
S Skript S. 75, Bemerkung zur Komposition
`;

MATHLE.raw.anDefs = String.raw`
# an-induktion
D Vollständige Induktion :: Gilt $A(1)$ und $A(n) \Rightarrow A(n+1)$ für alle $n$, so gilt $A(n)$ für alle $n \in \mathbb{N}$ @ Skript S. 7
D Fakultät $n!$ :: $1 \cdot 2 \cdots n$, mit der Konvention $0! = 1$ @ Skript S. 9
D Binomialkoeffizient $\binom{n}{k}$ :: $\frac{n!}{k!(n-k)!}$ für $0 \le k \le n$ @ Skript S. 10
F Anzahl Anordnungen :: Eine $n$-elementige Menge hat $n!$ Anordnungen (Permutationen) @ Skript S. 9
F Anzahl $k$-Teilmengen :: Eine $n$-elementige Menge hat $\binom{n}{k}$ Teilmengen mit $k$ Elementen @ Skript S. 10
F Binomischer Lehrsatz :: $(x+y)^n = \sum_{k=0}^{n} \binom{n}{k} x^k y^{n-k}$ @ Skript S. 11
F Summe der ungeraden Zahlen :: $\sum_{k=1}^{n}(2k-1) = n^2$ @ Serie 1, Aufgabe 1.1
F Summe der Quadrate :: $\sum_{k=1}^{n} k^2 = \frac16 n(n+1)(2n+1)$ @ Serie 1, Aufgabe 1.2
F Summe der Kuben :: $\sum_{k=1}^{n} k^3 = \left(\frac12 n(n+1)\right)^2$ @ Serie 1, Aufgabe 1.2
F Sterne und Striche :: $n$ gleiche Objekte auf $k$ Fächer: $\binom{n+k-1}{k-1}$ Möglichkeiten @ Serie 1, Aufgabe 1.4

# an-reell
D Archimedisches Axiom :: Zu jedem $a \in \mathbb{R}$ gibt es $n \in \mathbb{N}$ mit $n \gt a$ @ Skript S. 14
F Bernoullische Ungleichung :: $(1+x)^n \gt 1 + nx$ für $x \gt -1$, $x \ne 0$, $n \ge 2$ @ Skript S. 16
D Absolutbetrag :: $|a| = a$ für $a \ge 0$ und $|a| = -a$ für $a \lt 0$ @ Skript S. 17
F Dreiecksungleichung :: $|a + b| \le |a| + |b|$ und $\big||a| - |b|\big| \le |a - b|$ @ Skript S. 17
D Intervallschachtelung :: Folge kompakter Intervalle $I_n$ mit $I_{n+1} \subset I_n$ und Länge $\to 0$ @ Skript S. 18
D Vollständigkeitsaxiom :: Zu jeder Intervallschachtelung gibt es ein $\xi \in \mathbb{R}$, das in allen Intervallen liegt @ Skript S. 20
D Obere Schranke :: $s$ mit $x \le s$ für alle $x \in M$ @ Skript S. 22
D Supremum :: die kleinste obere Schranke einer Menge @ Skript S. 23
D Infimum :: die grösste untere Schranke einer Menge @ Skript S. 23
D Maximum :: ein Supremum, das zur Menge gehört @ Skript S. 23
F Dichtheit von $\mathbb{Q}$ :: Zwischen je zwei reellen Zahlen liegt eine rationale (und eine irrationale) @ Skript S. 25–26
D Gleichmächtig :: Es gibt eine bijektive Abbildung $A \to B$ @ Skript S. 26
D Abzählbar :: gleichmächtig wie $\mathbb{N}$ @ Skript S. 26
D Überabzählbar :: nicht leer, nicht endlich und nicht abzählbar @ Skript S. 27
F Mächtigkeiten :: $\mathbb{Z}$, $\mathbb{Q}$ abzählbar; $\mathbb{R}$, $\mathbb{R} \setminus \mathbb{Q}$ überabzählbar @ Skript S. 27–29

# an-komplex
D Komplexe Zahl :: Paar $(x, y) \in \mathbb{R}^2$ mit $(x,y)(u,v) = (xu - yv, xv + yu)$ @ Skript S. 32
D Imaginäre Einheit $i$ :: das Paar $(0, 1)$, es gilt $i^2 = -1$ @ Skript S. 33
D Konjugierte $\bar z$ :: $x - iy$ für $z = x + iy$ @ Skript S. 34
D Betrag $|z|$ :: $\sqrt{x^2 + y^2} = \sqrt{z \bar z}$ @ Skript S. 35
F Inverses in $\mathbb{C}$ :: $z^{-1} = \frac{\bar z}{|z|^2}$ für $z \ne 0$ @ Skript S. 33–35
F Parallelogrammidentität :: $|z + w|^2 + |z - w|^2 = 2(|z|^2 + |w|^2)$ @ Skript S. 35
F Real- und Imaginärteil :: $\mathrm{Re}\, z = \frac{z + \bar z}{2}$, $\mathrm{Im}\, z = \frac{z - \bar z}{2i}$ @ Skript S. 34

# an-folgen
D Folge :: Funktion $\mathbb{N} \to \mathbb{C}$ (bzw. $\mathbb{R}$), $n \mapsto a_n$ @ Skript S. 39
D Konvergenz $a_n \to a$ :: $\forall \varepsilon \gt 0\ \exists N\ \forall n \gt N: |a_n - a| \lt \varepsilon$ @ Skript S. 40
D Nullfolge :: eine gegen $0$ konvergente Folge @ Skript S. 40
D Umgebung von $a$ :: Menge $U$, die eine Kreisscheibe $K_\varepsilon(a)$ enthält @ Skript S. 42
F Standardgrenzwerte :: $\sqrt[n]{a} \to 1$ ($a \gt 0$) und $\sqrt[n]{n} \to 1$ @ Skript S. 43
F Sandwich-Satz :: $A_n \le a_n \le B_n$ und $A_n, B_n \to L$ $\Rightarrow$ $a_n \to L$ @ Skript S. 48
D Beschränkte Folge :: es gibt $M$ mit $|a_n| \le M$ für alle $n$ @ Skript S. 49
F Konvergent ⇒ beschränkt :: Jede konvergente Folge ist beschränkt @ Skript S. 49
F Monotonieprinzip :: Jede beschränkte monotone reelle Folge konvergiert @ Skript S. 50
D Teilfolge :: $(a_{n_k})_k$ mit streng monoton wachsenden Indizes $n_k$ @ Skript S. 50
F Satz von Bolzano-Weierstrass :: Jede beschränkte Folge hat eine konvergente Teilfolge @ Skript S. 51
D Cauchy-Folge :: $\forall \varepsilon \gt 0\ \exists N\ \forall n, m \gt N: |a_n - a_m| \lt \varepsilon$ @ Skript S. 52
F Cauchy-Kriterium :: Eine Folge in $\mathbb{R}$ bzw. $\mathbb{C}$ konvergiert genau dann, wenn sie Cauchy ist @ Skript S. 52–53
D Konvergenz gegen $+\infty$ :: $\forall K \gt 0\ \exists N\ \forall n \gt N: a_n \gt K$ @ Skript S. 54

# an-reihen
D Konvergenz einer Reihe :: Die Folge der Partialsummen $s_n = \sum_{k=1}^n a_k$ konvergiert @ Skript S. 55
F Geometrische Reihe :: $\sum_{k=0}^\infty z^k = \frac{1}{1-z}$ für $|z| \lt 1$ @ Skript S. 56
F Harmonische Reihe :: $\sum \frac1k$ divergiert @ Skript S. 56
F Nullfolgenkriterium :: Konvergiert $\sum a_k$, so ist $(a_k)$ eine Nullfolge (nicht umgekehrt) @ Skript S. 57
F Reihe $\sum 1/k^\alpha$ :: konvergiert genau für $\alpha \gt 1$ @ Skript S. 58
F Leibniz-Kriterium :: $(a_k)$ monoton fallende Nullfolge $\Rightarrow$ $\sum (-1)^k a_k$ konvergiert @ Skript S. 59
F Majorantenkriterium :: $|a_k| \le |b_k|$ und $\sum |b_k|$ konvergent $\Rightarrow$ $\sum a_k$ konvergent @ Skript S. 60
D Asymptotisch äquivalent :: $\lim \frac{a_n}{b_n} = 1$ @ Skript S. 61
D Absolut konvergent :: $\sum |a_k|$ konvergiert @ Skript S. 63
F Quotientenkriterium :: $q = \lim |a_{k+1}/a_k| \lt 1$: absolut konvergent; $q \gt 1$: divergent @ Skript S. 63
D Limes superior :: der grösste Häufungswert einer Folge, $\limsup a_n$ @ Skript S. 64
F Wurzelkriterium :: $L = \limsup \sqrt[n]{|a_n|} \lt 1$: absolut konvergent; $L \gt 1$: divergent @ Skript S. 65
F Riemannscher Umordnungssatz :: Bedingt konvergente Reihen lassen sich auf jede Summe umordnen @ Skript S. 67–68
D Potenzreihe :: Reihe der Form $\sum a_n z^n$ @ Skript S. 69
D Konvergenzradius :: $R = \sup\{r : P(r) \text{ konvergiert}\}$ @ Skript S. 70
F Cauchy-Hadamard :: $R = 1 / \limsup \sqrt[n]{|a_n|}$ @ Skript S. 71
F Formel von Euler :: $R = 1/q$ mit $q = \lim |a_{n+1}/a_n|$, falls existent @ Skript S. 71

# an-stetig
D Injektiv :: $f(x_1) = f(x_2) \Rightarrow x_1 = x_2$ @ Skript S. 74
D Surjektiv :: zu jedem $y \in B$ gibt es $x \in A$ mit $f(x) = y$ @ Skript S. 74
D Monoton wachsend :: $x \le x' \Rightarrow f(x) \le f(x')$ @ Skript S. 76
D Stetigkeit in $x_0$ :: $\forall \varepsilon \gt 0\ \exists \delta \gt 0: |x - x_0| \lt \delta \Rightarrow |f(x) - f(x_0)| \lt \varepsilon$ @ Skript S. 76
D Lipschitz-stetig :: es gibt $L \gt 0$ mit $|f(x) - f(y)| \le L|x - y|$ @ Skript S. 77
F Folgenkriterium :: $f$ stetig in $x_0$ $\Leftrightarrow$ für alle $x_n \to x_0$ gilt $f(x_n) \to f(x_0)$ @ Skript S. 79
F Zwischenwertsatz :: $f: [a,b] \to \mathbb{R}$ stetig, $\gamma$ zwischen $f(a), f(b)$ $\Rightarrow$ $\exists c: f(c) = \gamma$ @ Skript S. 82
F Fixpunktsatz :: Jedes stetige $f: [a, b] \to [a, b]$ hat einen Fixpunkt @ Skript S. 83
D Abgeschlossen :: Grenzwerte konvergenter Folgen aus $A$ liegen wieder in $A$ @ Skript S. 84
D Kompakt :: abgeschlossen und beschränkt @ Skript S. 86
F Bolzano-Weierstrass-Charakterisierung :: $K$ kompakt $\Leftrightarrow$ jede Folge in $K$ hat eine in $K$ konvergente Teilfolge @ Skript S. 87
F Satz vom Maximum :: Stetige Funktionen auf kompakten Mengen nehmen Maximum und Minimum an @ Skript S. 88
D Gleichmässig stetig :: $\forall \varepsilon\ \exists \delta\ \forall x, x': |x - x'| \lt \delta \Rightarrow |f(x) - f(x')| \lt \varepsilon$ @ Skript S. 88
F Stetig auf kompakt :: Stetige Funktionen auf kompakten Mengen sind gleichmässig stetig @ Skript S. 89
D Häufungspunkt :: jede Umgebung enthält unendlich viele Punkte aus $D$ @ Skript S. 90
`;

MATHLE.raw.anWords = String.raw`
FOLGE | Funktion $\mathbb{N} \to \mathbb{C}$ | an-folgen
REIHE | Folge der Partialsummen $\sum a_k$ | an-reihen
GRENZWERT | Das $a$ in $a_n \to a$ | an-folgen
SUPREMUM | Kleinste obere Schranke | an-reell
INFIMUM | Grösste untere Schranke | an-reell
NULLFOLGE | Folge mit Grenzwert $0$ | an-folgen
CAUCHY | $|a_n - a_m| \lt \varepsilon$ für alle $n, m \gt N$: …-Folge | an-folgen
STETIG | $\varepsilon$-$\delta$-Eigenschaft einer Funktion | an-stetig
KOMPAKT | Abgeschlossen und beschränkt | an-stetig
LEIBNIZ | Kriterium für alternierende Reihen | an-reihen
MAJORANTE | Konvergente Reihe, die eine andere betragsmässig dominiert | an-reihen
TEILFOLGE | $(a_{n_k})$ mit wachsenden Indizes | an-folgen
DIVERGENT | Nicht konvergent | an-folgen
INDUKTION | Verankerung und Schritt | an-induktion
BERNOULLI | $(1+x)^n \gt 1 + nx$ – Ungleichung von … | an-reell
BETRAG | $|z| = \sqrt{x^2 + y^2}$ | an-komplex
MONOTON | $a_n \le a_{n+1}$ für alle $n$ | an-folgen
LIPSCHITZ | $|f(x) - f(y)| \le L|x - y|$ | an-stetig
ABZÄHLBAR | Gleichmächtig wie $\mathbb{N}$ | an-reell
HARMONISCH | $\sum \frac1k$ ist die … Reihe | an-reihen
RADIUS | $R$ einer Potenzreihe: Konvergenz… | an-reihen
FIXPUNKT | $f(\xi) = \xi$ | an-stetig
NULLSTELLE | $f(x_0) = 0$ | an-stetig
INTERVALL | $[a, b] = \{x : a \le x \le b\}$ | an-reell
EPSILON | Die griechische Fehlerschranke $\varepsilon$ | an-folgen
FAKULTÄT | $n! = 1 \cdot 2 \cdots n$ | an-induktion
KONJUGIERT | $\bar z = x - iy$ ist die … Zahl | an-komplex
POTENZREIHE | $\sum a_n z^n$ | an-reihen
SCHRANKE | $s$ mit $x \le s$ für alle $x \in M$: obere … | an-reell
TELESKOP | $\sum (b_k - b_{k+1})$: …-Summe | an-reihen
`;

MATHLE.similar.an = [
  ['Supremum', 'Maximum', 'Obere Schranke'],
  ['Konvergenz $a_n \\to a$', 'Cauchy-Folge', 'Konvergenz gegen $+\\infty$', 'Nullfolge'],
  ['Konvergent ⇒ beschränkt', 'Beschränkte Folge'],
  ['Satz von Bolzano-Weierstrass', 'Bolzano-Weierstrass-Charakterisierung'],
  ['Quotientenkriterium', 'Formel von Euler'],
  ['Wurzelkriterium', 'Cauchy-Hadamard', 'Limes superior'],
  ['Stetigkeit in $x_0$', 'Gleichmässig stetig', 'Folgenkriterium'],
  ['Stetig auf kompakt', 'Satz vom Maximum'],
  ['Abzählbar', 'Gleichmächtig'],
  ['Anzahl $k$-Teilmengen', 'Binomialkoeffizient $\\binom{n}{k}$'],
  ['Fakultät $n!$', 'Anzahl Anordnungen'],
  ['Kompakt', 'Bolzano-Weierstrass-Charakterisierung'],
  ['Betrag $|z|$', 'Inverses in $\\mathbb{C}$'],
  ['Intervallschachtelung', 'Vollständigkeitsaxiom'],
  ['Konvergenz einer Reihe', 'Absolut konvergent']
];
