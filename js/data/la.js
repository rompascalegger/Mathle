/*
 * Fragenkatalog Lineare Algebra I (HS 2026)
 * Grundlage: Skript "Lineare Algebra I" (Version vom 2. November 2026) und Serien 1–8.
 *
 * Format (eine Angabe pro Zeile):
 *   # kapitel-id | Titel | Skript-Abschnitt
 *   Q tf | mc | multi | input      neue Frage
 *   ? Fragetext                    (mehrere ?-Zeilen werden mit Zeilenumbruch verbunden)
 *   + richtige Option              (mc / multi)
 *   - falsche Option               (mc / multi)
 *   A Antwort                      (tf: wahr/falsch; input: Alternativen mit ; trennen)
 *   E Erklärung
 *   S Quelle
 * Mathe in $...$ (KaTeX). Für "<" in Formeln \lt verwenden.
 * Neue Fragen bitte am ENDE eines Kapitels einfügen, damit der Lernfortschritt erhalten bleibt.
 */
window.MATHLE = window.MATHLE || {};
MATHLE.raw = MATHLE.raw || {};

MATHLE.raw.la = String.raw`
# logik | Logik & Beweise | Skript 1.1

Q tf
? Eine falsche Aussage impliziert jede beliebige Aussage.
A wahr
E $P \Rightarrow Q$ bedeutet „$P$ ist falsch oder $Q$ ist wahr". Ist $P$ falsch, so ist $P \Rightarrow Q$ also immer wahr – darum sind Widersprüche so gefährlich.
S Skript 1.1

Q tf
? Die Aussage „Die Erde ist flach $\Rightarrow$ Feuer ist kalt" ist wahr.
A wahr
E Die Prämisse ist falsch, also ist die Implikation wahr – unabhängig von der rechten Seite.
S Skript 1.1

Q mc
? $P \Rightarrow Q$ ist gleichbedeutend mit …
+ $(\neg P) \lor Q$
- $P \lor (\neg Q)$
- $(\neg P) \land Q$
- $Q \Rightarrow P$
E Per Definition: „$P$ ist falsch oder $Q$ ist wahr".
S Skript 1.1

Q mc
? Wie lautet die Kontraposition von $P \Rightarrow Q$?
+ $(\neg Q) \Rightarrow (\neg P)$
- $Q \Rightarrow P$
- $(\neg P) \Rightarrow (\neg Q)$
- $P \land (\neg Q)$
E $(\neg Q) \Rightarrow (\neg P)$ ist äquivalent zu $Q \lor (\neg P)$, also zu $P \Rightarrow Q$. Die Umkehrung $Q \Rightarrow P$ ist dagegen eine andere Aussage!
S Skript 1.1

Q mc
? Die Negation von $P \Rightarrow Q$ ist gleichbedeutend mit …
+ $P \land (\neg Q)$
- $(\neg P) \Rightarrow (\neg Q)$
- $(\neg P) \lor Q$
- $(\neg P) \land (\neg Q)$
E $\neg((\neg P) \lor Q) \Leftrightarrow P \land (\neg Q)$ nach De Morgan.
S Skript 1.1

Q mc
? $\neg(P \land Q)$ ist äquivalent zu …
+ $(\neg P) \lor (\neg Q)$
- $(\neg P) \land (\neg Q)$
- $P \lor Q$
- $(\neg P) \Rightarrow Q$
E Regel von De Morgan. Analog: $\neg(P \lor Q) \Leftrightarrow (\neg P) \land (\neg Q)$.
S Skript 1.1, Serie 1 S4

Q tf
? Das mathematische „oder" ist exklusiv: $P \lor Q$ ist falsch, wenn $P$ und $Q$ beide wahr sind.
A falsch
E Das Oder ist nicht exklusiv. Sind $P$ und $Q$ beide wahr, so ist auch $P \lor Q$ wahr.
S Skript 1.1

Q tf
? $P \Rightarrow Q$ bedeutet, dass $Q$ durch $P$ begründet wird (kausaler Zusammenhang).
A falsch
E Der Implikationspfeil sagt nichts über Kausalität. „Menschen sind sterblich $\Rightarrow$ Feuer ist heiss" ist wahr, obwohl kein Zusammenhang besteht.
S Skript 1.1

Q tf
? Für alle $a, b \in \mathbb{Z}$ gilt $(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$.
A wahr
E Ausmultiplizieren: $(a+b)^2(a+b) = (a^2+2ab+b^2)(a+b)$ ergibt genau diesen Ausdruck.
S Serie 1, S1(i)

Q tf
? Es gibt $a, b \in \mathbb{Z}$ mit $(a+b)^2 = a^2 + b^2$.
A wahr
E Das gilt genau dann, wenn $2ab = 0$, z.B. für $a = 0$. Für eine Existenzaussage reicht ein Beispiel.
S Serie 1, S1(ii)

Q tf
? Es gilt $0! = 0$.
A falsch
E $0! = 1$ – das leere Produkt ist das neutrale Element der Multiplikation.
S Serie 1, S1(iii)

Q tf
? Die Aussage „$1/2$ ist eine ganze Zahl $\Rightarrow$ $\sqrt{2}$ ist irrational" ist wahr.
A wahr
E Die Prämisse ist falsch, also ist die Implikation wahr. (Zudem ist auch die Konklusion wahr.)
S Serie 1, S1(v)

Q mc
? Wie lautet die Negation von „Jede rationale Zahl ist eine reelle Zahl"?
+ Es gibt eine rationale Zahl, die keine reelle Zahl ist.
- Keine rationale Zahl ist eine reelle Zahl.
- Jede reelle Zahl ist eine rationale Zahl.
- Es gibt eine reelle Zahl, die keine rationale Zahl ist.
E Die Negation von „für alle $x$ gilt $P(x)$" ist „es gibt ein $x$ mit $\neg P(x)$".
S Serie 2, S1(i)

Q mc
? Negation von „Es gibt eine Vorlesung mit höchstens vier Kreditpunkten oder alle Bäume tragen Blätter":
+ Jede Vorlesung hat mehr als vier Kreditpunkte und es gibt einen Baum, der keine Blätter trägt.
- Jede Vorlesung hat mindestens vier Kreditpunkte und es gibt einen Baum, der keine Blätter trägt.
- Es gibt eine Vorlesung mit mehr als vier Kreditpunkten oder kein Baum trägt Blätter.
- Keine Vorlesung hat höchstens vier Kreditpunkte oder ein Baum trägt keine Blätter.
E De Morgan: $\neg(P \lor Q) = \neg P \land \neg Q$. Die Negation von „höchstens vier" ist „mehr als vier" (nicht „mindestens vier").
S Serie 2, S1(ii)

Q mc
? Negation von „Es gibt ein Binnenland, dessen Nachbarländer alle Binnenländer sind":
+ Jedes Binnenland hat mindestens ein Nachbarland, das kein Binnenland ist.
- Es gibt ein Binnenland, dessen Nachbarländer keine Binnenländer sind.
- Jedes Binnenland hat nur Nachbarländer, die keine Binnenländer sind.
- Kein Land ist ein Binnenland.
E $\neg(\exists x\, \forall y\, P) = \forall x\, \exists y\, \neg P$: Quantoren tauschen, innere Aussage negieren.
S Serie 2, S1(iii)

Q mc
? Negation von „Jede bijektive Abbildung besitzt eine Umkehrabbildung":
+ Es gibt eine bijektive Abbildung, die keine Umkehrabbildung besitzt.
- Keine bijektive Abbildung besitzt eine Umkehrabbildung.
- Jede nicht bijektive Abbildung besitzt keine Umkehrabbildung.
- Es gibt eine Abbildung mit Umkehrabbildung, die nicht bijektiv ist.
E Aus „für alle" wird „es gibt", die Eigenschaft wird negiert.
S Serie 2, S1(iv)

Q mc
? Was ist bei einem Induktionsbeweis die Induktionsverankerung?
+ Der Nachweis der Aussage für den kleinsten Wert, z.B. $n = 1$ oder $n = 0$.
- Die Annahme, dass die Aussage für $n-1$ gilt.
- Der Schluss von $n-1$ auf $n$.
- Die Annahme der Negation der Behauptung.
E Erst die Verankerung (Induktionsanfang), dann der Induktionsschritt mit Induktionsvoraussetzung.
S Skript 1.1, Lemma 1.1

Q mc
? „Alle Hosen haben die gleiche Farbe" – wo steckt der Fehler im Induktions-„Beweis"?
+ Der Schritt von $n = 1$ auf $n = 2$ scheitert: Die beiden Teilmengen mit $n-1$ Hosen überlappen nicht.
- Die Verankerung $n = 1$ ist falsch.
- Es gibt unendlich viele Hosen.
- Induktion darf man nur auf Zahlen anwenden.
E Das Argument benutzt, dass zwei Teilansammlungen eine gemeinsame Hose haben. Für $n = 2$ ist das nicht der Fall.
S Skript, Achtung 1.2

Q mc
? Wie heisst die Beweistechnik, bei der man die Negation der Behauptung annimmt und einen Widerspruch herleitet?
+ Widerspruchsbeweis
- Induktionsbeweis
- Schubfachprinzip
- Direkter Beweis
E Beispiel aus dem Skript: Die Irrationalität von $\sqrt{2}$ (Lemma 1.5).
S Skript 1.1, Lemma 1.5

Q input
? Berechne $1 + 2 + 3 + \dots + 100$.
A 5050
E Nach Lemma 1.1 gilt $1 + \dots + n = \frac{n(n+1)}{2}$, also $\frac{100 \cdot 101}{2} = 5050$.
S Skript, Lemma 1.1

Q mc
? Welchen Wert hat per Konvention die leere Summe?
+ $0$
- $1$
- Sie ist nicht definiert.
- $\infty$
E Die leere Summe ist gleich dem neutralen Element der Addition. Damit gilt Lemma 1.1 auch für $n = 0$.
S Skript 1.1

Q tf
? $\sqrt{2}$ ist eine rationale Zahl.
A falsch
E Lemma 1.5: Aus $\sqrt2 = p/q$ mit $p, q$ nicht beide gerade folgt $p^2 = 2q^2$, also $p$ gerade, dann $q$ gerade – Widerspruch.
S Skript, Lemma 1.5

Q input
? Die Uni Basel hat 13263 Studierende. Wie viele feiern nach dem Schubfachprinzip mindestens am gleichen Tag Geburtstag?
A 37
E Mit 366 möglichen Tagen: $366 \cdot 36 = 13176 \lt 13263$. Also muss ein Tag mindestens 37 Studierende haben.
S Serie 1, S3

Q tf
? Unter je fünf paarweise verschiedenen Zahlen aus $\{1, \dots, 8\}$ gibt es immer zwei mit Summe 9.
A wahr
E Schubfachprinzip mit den 4 „Schubfächern" $\{1,8\}, \{2,7\}, \{3,6\}, \{4,5\}$: Fünf Zahlen, vier Fächer.
S Serie 1, E2

Q mc
? Was ist $1^3 + 2^3 + \dots + n^3$?
+ $(1 + 2 + \dots + n)^2 = \frac{n^2(n+1)^2}{4}$
- $\frac{n(n+1)(2n+1)}{6}$
- $\frac{n^4}{4}$
- $\left(\frac{n(n+1)}{2}\right)^3$
E Beweis per Induktion. $\frac{n(n+1)(2n+1)}{6}$ ist die Summe der Quadrate.
S Serie 1, E4

Q tf
? $0$ ist eine gerade Zahl.
A wahr
E Gerade heisst: von der Form $2n$ mit $n \in \mathbb{Z}$. Es gilt $0 = 2 \cdot 0$.
S Skript, Definition 1.3

Q tf
? Es gibt ein $n \in \mathbb{N}$, so dass $n^2 + 5n + 1$ gerade ist.
A falsch
E $n^2 + 5n = n(n+5)$ ist immer gerade (einer der Faktoren ist gerade), also ist $n^2 + 5n + 1$ immer ungerade. Achtung: $P(n) \Leftrightarrow P(n+1)$ gilt zwar, aber es fehlt die Verankerung!
S Serie 2, E1

Q tf
? Es gilt $3^n > n + 6$ für alle ganzen Zahlen $n \ge 2$.
A wahr
E Verankerung: $9 > 8$. Schritt: $3^{n+1} = 3 \cdot 3^n > 3(n+6) \ge (n+1) + 6$.
S Serie 4, S1

Q mc
? Welche Notation verwendet das Skript für die natürlichen Zahlen?
+ $\mathbb{N} = \{1, 2, 3, \dots\}$ und $\mathbb{N}_0 = \{0, 1, 2, \dots\}$
- $\mathbb{N} = \{0, 1, 2, \dots\}$
- $\mathbb{N} = \mathbb{Z}$
- $\mathbb{N} = \{2, 3, 5, 7, \dots\}$
E In der Vorlesung beginnt $\mathbb{N}$ bei 1, mit 0 schreibt man $\mathbb{N}_0$.
S Serie 2, Serie 1 E4

Q tf
? Bei einer Implikation $P \Rightarrow Q$ mit wahrer Konklusion $Q$ ist die Implikation immer wahr.
A wahr
E $(\neg P) \lor Q$ ist wahr, sobald $Q$ wahr ist.
S Skript 1.1

# mengen | Mengen & Abbildungen | Skript 1.2

Q input
? Wie viele Teilmengen hat $\{a, b, c, d\}$?
A 16
E Eine $n$-elementige Menge hat $2^n$ Teilmengen, hier $2^4 = 16$ (inkl. $\emptyset$ und der ganzen Menge).
S Serie 1, S2(i)

Q input
? Wie viele Elemente hat $\{\emptyset\}$?
A 1
E Die Menge enthält genau ein Element, nämlich die leere Menge.
S Serie 1, S2(ii)

Q input
? Wie viele Elemente hat $\{\emptyset, \emptyset\}$?
A 1
E Bei Mengen tritt ein Element höchstens einmal auf: $\{\emptyset, \emptyset\} = \{\emptyset\}$.
S Serie 1, S2(ii)

Q input
? Wie viele Elemente hat $\{\emptyset, \{\emptyset\}\}$?
A 2
E $\emptyset$ und $\{\emptyset\}$ sind verschiedene Mengen ($\{\emptyset\}$ ist nicht leer).
S Serie 1, S2(ii)

Q input
? Wie viele Elemente hat $\{\{\emptyset\}, \mathbb{R}\}$?
A 2
E Die Elemente sind $\{\emptyset\}$ und $\mathbb{R}$ – egal, wie gross $\mathbb{R}$ selbst ist.
S Serie 1, S2(ii)

Q tf
? Es gilt $\{1, 1, 1, 2, 2, 3\} = \{3, 1, 2\}$.
A wahr
E Bei Mengen spielen Reihenfolge und Wiederholungen keine Rolle.
S Skript, Beispiel 1.10

Q mc
? Was ist das kartesische Produkt $M \times N$?
+ Die Menge aller Paare $(m, n)$ mit $m \in M$ und $n \in N$.
- Die Menge aller $x$ mit $x \in M$ oder $x \in N$.
- Die Menge aller Abbildungen $M \to N$.
- Die Menge aller $x$ mit $x \in M$ und $x \in N$.
E Definition 1.11. Z.B. ist $\mathbb{R} \times \mathbb{R}$ die Ebene.
S Skript, Definition 1.11

Q input
? Sei $M = \{a, b, c, d, e, f\}$ und $N = \{1, 2, 3, 4, 5, 6\}$. Wie viele Elemente hat $M \times N$?
A 36
E $\#(M \times N) = \#M \cdot \#N = 6 \cdot 6$.
S Serie 2, S2(i)

Q input
? Wie viele injektive Abbildungen gibt es von $\{a, b, c, d, e, f\}$ nach $\{1, 2, 3, 4, 5, 6\}$?
A 720
E $6 \cdot 5 \cdot 4 \cdot 3 \cdot 2 \cdot 1 = 6! = 720$. Jede davon ist sogar bijektiv.
S Serie 2, S2(ii)

Q mc
? Wie viele Abbildungen gibt es von einer $m$-elementigen Menge $M$ in eine $n$-elementige Menge $N$?
+ $n^m$
- $m^n$
- $n!$
- $m \cdot n$
E Jedes der $m$ Elemente hat $n$ mögliche Bilder. Daher die Notation $N^M = \mathrm{Abb}(M, N)$.
S Serie 2, E3

Q tf
? Es gibt eine Abbildung $\emptyset \to \mathbb{R}$.
A wahr
E Eine Abbildung ist eine Teilmenge von $\emptyset \times \mathbb{R} = \emptyset$ – die leere Menge erfüllt die Bedingung trivialerweise.
S Skript, Beispiel 1.18

Q tf
? Es gibt eine Abbildung $\mathbb{R} \to \emptyset$.
A falsch
E Jedem $x \in \mathbb{R}$ müsste genau ein Element von $\emptyset$ zugeordnet werden – es gibt aber keines.
S Skript 1.2

Q mc
? Formal ist eine Abbildung $f: M \to N$ eine Teilmenge $\Gamma \subset M \times N$, so dass …
+ es zu jedem $m \in M$ genau ein $n \in N$ mit $(m, n) \in \Gamma$ gibt.
- es zu jedem $m \in M$ mindestens ein $n \in N$ mit $(m, n) \in \Gamma$ gibt.
- es zu jedem $n \in N$ genau ein $m \in M$ mit $(m, n) \in \Gamma$ gibt.
- es zu jedem $m \in M$ höchstens ein $n \in N$ mit $(m, n) \in \Gamma$ gibt.
E Definition 1.14 (Graph der Abbildung).
S Skript, Definition 1.14

Q mc
? $f: M \to N$ heisst injektiv, falls …
+ $f(m) = f(m') \Rightarrow m = m'$ für alle $m, m' \in M$.
- $m = m' \Rightarrow f(m) = f(m')$ für alle $m, m' \in M$.
- es zu jedem $n \in N$ ein $m \in M$ mit $f(m) = n$ gibt.
- $f(M) = N$ gilt.
E Die zweite Option gilt für jede Abbildung. Die letzten beiden beschreiben Surjektivität.
S Skript, Definition 1.19

Q tf
? Eine Abbildung ist genau dann surjektiv, wenn Bildbereich und Wertebereich übereinstimmen.
A wahr
E Bildbereich $f(M) = \{f(m) : m \in M\}$, Wertebereich $N$.
S Skript, Bemerkung 1.20

Q mc
? Bei der Verkettung $g \circ f$ wird zuerst … angewendet.
+ $f$
- $g$
- Das hängt von $M$ ab.
- beides gleichzeitig
E $(g \circ f)(m) = g(f(m))$. Verkettungen liest man von rechts nach links.
S Skript, Achtung 1.21

Q tf
? Sind $f: M \to N$ und $g: N \to P$ injektiv, so ist $g \circ f$ injektiv.
A wahr
E Aus $g(f(m)) = g(f(m'))$ folgt $f(m) = f(m')$ ($g$ injektiv), also $m = m'$ ($f$ injektiv).
S Serie 3, E1(i)

Q tf
? Sind $f: M \to N$ und $g: N \to P$ surjektiv, so ist $g \circ f$ surjektiv.
A wahr
E Zu $p \in P$ gibt es $n$ mit $g(n) = p$ und dazu $m$ mit $f(m) = n$.
S Serie 3, E1(ii)

Q tf
? Ist $M$ eine endliche Menge und $f: M \to M$ surjektiv, so ist $f$ injektiv.
A wahr
E Gilt nur für endliche Mengen. Für $\mathbb{N}$ ist $f(1) = 1$, $f(n) = n - 1$ ($n \ge 2$) surjektiv, aber nicht injektiv.
S Serie 3, S3

Q tf
? Jede surjektive Abbildung $f: \mathbb{N} \to \mathbb{N}$ ist injektiv.
A falsch
E Gegenbeispiel: $f(1) = 1$ und $f(n) = n - 1$ für $n \ge 2$. Es gilt $f(1) = f(2)$.
S Serie 3, S3 (Vergleich)

Q tf
? Die Abbildung $f: \mathbb{N} \to \{2, 4, 6, \dots\}$, $f(n) = 2n$ ist bijektiv.
A wahr
E Obwohl $\mathbb{N}$ „doppelt so viele" Elemente zu haben scheint. Es gibt sogar eine Bijektion $\mathbb{N} \to \mathbb{N}^2$.
S Skript, Beispiel 1.24(iv)

Q tf
? Für jede Abbildung $f: M \to N$ und $A, B \subset M$ gilt $f(A \cap B) = f(A) \cap f(B)$.
A falsch
E Es gilt nur $\subset$. Gegenbeispiel: $f$ konstant, $A = \{1\}$, $B = \{2\}$: links $\emptyset$, rechts nicht leer.
S Serie 2, E2(ii),(iv)

Q tf
? Für jede Abbildung $f: M \to N$ und $A, B \subset M$ gilt $f(A \cup B) = f(A) \cup f(B)$.
A wahr
E Beide Inklusionen $\subset$ und $\supset$ folgen direkt aus der Definition des Bildes.
S Serie 2, E2(i)

Q mc
? Unter welcher Voraussetzung gilt $f(A \cap B) = f(A) \cap f(B)$ für alle $A, B \subset M$?
+ $f$ ist injektiv.
- $f$ ist surjektiv.
- $f$ ist konstant.
- $M$ ist endlich.
E Ist $f(a) = f(b)$ mit $a \in A$, $b \in B$, so folgt $a = b \in A \cap B$.
S Serie 2, E2(iii)

Q mc
? Für Teilmengen $A, B \subset M$ gilt $M \setminus (A \cup B) = \;$ …
+ $(M \setminus A) \cap (M \setminus B)$
- $(M \setminus A) \cup (M \setminus B)$
- $(M \setminus A) \cap B$
- $M \setminus (A \cap B)$
E Das Mengen-Analogon zu De Morgan: $\neg(P \lor Q) = (\neg P) \land (\neg Q)$.
S Serie 1, E1

Q mc
? Die symmetrische Differenz $A \triangle B$ ist …
+ $(A \cup B) \setminus (A \cap B)$
- $(A \cap B) \setminus (A \cup B)$
- $A \cup B$
- $A \setminus B$
E Die Elemente, die in genau einer der beiden Mengen liegen.
S Serie 3, E2

Q mc
? Was ist $A \triangle A$?
+ $\emptyset$
- $A$
- $M$
- $\{A\}$
E $(A \cup A) \setminus (A \cap A) = A \setminus A = \emptyset$. Also ist $A$ zu sich selbst invers.
S Serie 3, E2(iii)

Q tf
? Die Potenzmenge $\mathcal{P}(M)$ mit $\emptyset$ als neutralem Element und $(A, B) \mapsto A \triangle B$ ist eine kommutative Gruppe.
A wahr
E Assoziativ, $A \triangle \emptyset = A$, und jedes $A$ ist sein eigenes Inverses.
S Serie 3, E2(iv)

Q tf
? Die Identitätsabbildung $\mathrm{id}_M$ ist für jede Menge $M$ bijektiv.
A wahr
E Sie ist stets injektiv und surjektiv (auch für $M = \emptyset$).
S Skript, Definition 1.23

Q tf
? Es gibt eine injektive Abbildung $\mathcal{P}(M) \to M$.
A falsch
E Satz von Cantor: Die Potenzmenge ist immer „echt grösser" als $M$.
S Serie 3, freiwillige Aufgabe (viii)

Q tf
? $f: [0, \infty) \to [0, \infty)$, $f(x) = x^2$ ist bijektiv.
A wahr
E Surjektiv: jede Zahl $y \ge 0$ hat eine Wurzel. Injektiv: $x^2 = y^2 \Rightarrow (x-y)(x+y) = 0 \Rightarrow x = y$ wegen $x, y \ge 0$.
S Skript, Beispiel 1.24(v)

Q tf
? $f: \mathbb{R} \to \mathbb{R}$, $f(x) = x^2$ ist injektiv.
A falsch
E $f(-1) = f(1) = 1$. Erst die Einschränkung auf $[0, \infty)$ macht $f$ injektiv.
S Skript, Beispiel 1.24(v)

Q tf
? Eine Abbildung von einer 4-elementigen in eine 5-elementige Menge kann surjektiv sein.
A falsch
E Das Bild hat höchstens 4 Elemente.
S Serie 3, S1

Q tf
? Gilt $\#M = \#N \lt \infty$, so ist jede injektive Abbildung $M \to N$ surjektiv.
A wahr
E Das Bild hat $\#M = \#N$ Elemente, ist also ganz $N$.
S Serie 2, S2(iii)

Q mc
? Wann heisst eine Menge $M$ endlich (Definition 1.25)?
+ Es gibt ein $n \ge 0$ und eine Bijektion $M \to \{1, \dots, n\}$.
- Es gibt eine Injektion $\mathbb{N} \to M$.
- $M$ ist eine Teilmenge von $\mathbb{N}$.
- $M$ besitzt ein grösstes Element.
E Das $n$ ist eindeutig und heisst Kardinalität $\#M$.
S Skript, Definition 1.25

# gruppen | Gruppen | Skript 1.3

Q mc
? Welche Axiome fordert das Skript für eine Gruppe $(G, e, m)$?
+ (A) Assoziativität, (N) neutrales Element, (I) inverses Element
- (A), (N), (I) und (K) Kommutativität
- (N), (I) und (K)
- nur (A) und (N)
E (K) ist kein Gruppenaxiom – es schliesst zu viele interessante Beispiele aus. Gilt (K), heisst $G$ abelsch.
S Skript, Definition 1.26

Q mc
? Wie lautet das Axiom (N) im Skript?
+ Für alle $a \in G$ gilt $m(e, a) = a$.
- Für alle $a \in G$ gilt $m(a, a) = e$.
- Es gibt ein $a \in G$ mit $m(e, a) = a$.
- Für alle $a, b \in G$ gilt $m(a, b) = m(b, a)$.
E Im Skript wird nur gefordert, dass $e$ von links neutral ist. Dass $ae = a$ gilt, ist Lemma 1.30(i).
S Skript, Definition 1.26

Q mc
? Wie lautet das Axiom (I) im Skript?
+ Für jedes $a \in G$ gibt es ein $a' \in G$ mit $m(a', a) = e$.
- Es gibt ein $a' \in G$ mit $m(a', a) = e$ für alle $a \in G$.
- Für jedes $a \in G$ gilt $m(a, a) = e$.
- Für jedes $a \in G$ gibt es $a'$ mit $m(a', a) = a$.
E Linksinverse; dass sie auch rechtsinvers und eindeutig sind, zeigt Lemma 1.30.
S Skript, Definition 1.26

Q tf
? Kommutativität gehört zu den Gruppenaxiomen.
A falsch
E Es gibt nicht-abelsche Gruppen, z.B. die symmetrische Gruppe $S_M$ mit $\#M \ge 3$ oder $\mathrm{GL}_2(K)$.
S Skript, Bemerkung 1.28

Q mc
? Welches Wort ist synonym zu „kommutative Gruppe"?
+ abelsche Gruppe
- einfache Gruppe
- triviale Gruppe
- symmetrische Gruppe
E Nach Niels Henrik Abel.
S Skript, Definition 1.26

Q tf
? In einer Gruppe gibt es genau ein neutrales Element.
A wahr
E Lemma 1.30(iii): Aus $e'a = a = ea$ folgt durch Kürzen $e' = e$.
S Skript, Lemma 1.30(iii)

Q tf
? In einer Gruppe kann ein Element zwei verschiedene Inverse besitzen.
A falsch
E Lemma 1.30(iv): Das Inverse ist eindeutig, daher die Schreibweise $a^{-1}$ bzw. $-a$.
S Skript, Lemma 1.30(iv)

Q tf
? In einer Gruppe folgt aus $ab = ac$ stets $b = c$.
A wahr
E Man darf links (und rechts) kürzen: Multipliziere von links mit $a^{-1}$.
S Skript, Lemma 1.30(ii)

Q mc
? In einer Gruppe gilt $(ab)^{-1} = \;$ …
+ $b^{-1} a^{-1}$
- $a^{-1} b^{-1}$
- $a b^{-1}$
- $b a$
E $(b^{-1}a^{-1})(ab) = b^{-1}(a^{-1}a)b = b^{-1}b = e$. Die Reihenfolge dreht sich um (wie Socken und Schuhe).
S Serie 4, E3(i)

Q tf
? Die Abbildung $a \mapsto a^{-1}$ ist genau dann ein Gruppenhomomorphismus $G \to G$, wenn $G$ abelsch ist.
A wahr
E Homomorphismus heisst $(ab)^{-1} = a^{-1}b^{-1}$, also $b^{-1}a^{-1} = a^{-1}b^{-1}$ für alle $a, b$.
S Serie 4, E3(ii)

Q tf
? Gilt $a \cdot a = e$ für jedes Element einer Gruppe $G$, so ist $G$ abelsch.
A wahr
E Jedes Element ist sein eigenes Inverses: $ab = (ab)^{-1} = b^{-1}a^{-1} = ba$.
S Serie 4, E2

Q multi
? Auf $G = \mathbb{Q}$ sei $d(a, b) = b - a$. Welche Gruppenaxiome erfüllt $(G, 0, d)$?
+ (N): $d(0, a) = a$
+ (I): zu jedem $a$ gibt es $a'$ mit $d(a', a) = 0$
- (A): $d(d(a, b), c) = d(a, d(b, c))$
E $d(0, a) = a - 0 = a$ und $d(a, a) = 0$. Aber $d(d(a,b),c) = c - b + a$ und $d(a, d(b,c)) = c - b - a$.
S Serie 3, S2

Q tf
? $(\mathbb{Z} \setminus \{0\}, 1, \cdot)$ ist eine Gruppe.
A falsch
E $2$ hat kein multiplikatives Inverses in $\mathbb{Z}$, da $1/2 \notin \mathbb{Z}$.
S Skript 1.3

Q tf
? $(\mathbb{Q} \setminus \{0\}, 1, \cdot)$ ist eine abelsche Gruppe.
A wahr
E Das Inverse von $a$ ist $1/a$. Die $0$ muss man herausnehmen: man darf nicht durch Null dividieren.
S Skript, Beispiel 1.27(iii)

Q tf
? $(\mathbb{Q}, 1, \cdot)$ ist eine Gruppe.
A falsch
E $0$ hat kein Inverses: aus $a \cdot 0 = 1$ folgte $0 = 1$.
S Skript, Beispiel 1.27(iii)

Q input
? Wie viele Elemente hat die kleinste Gruppe?
A 1
E Die triviale Gruppe $\{e\}$ mit $m(e, e) = e$. Die leere Menge ist keine Gruppe, da $e \in G$ verlangt ist.
S Skript, Beispiel 1.27(iv)

Q mc
? Die symmetrische Gruppe $S_M$ besteht aus …
+ allen bijektiven Abbildungen $M \to M$, mit der Verkettung als Verknüpfung.
- allen Abbildungen $M \to M$, mit der Verkettung als Verknüpfung.
- allen Teilmengen von $M$, mit der Vereinigung als Verknüpfung.
- allen injektiven Abbildungen $M \to \mathbb{N}$.
E Neutrales Element ist $\mathrm{id}_M$, Inverses die Umkehrabbildung $f^{-1}$.
S Skript, Beispiel 1.29(iii)

Q tf
? Die symmetrische Gruppe $S_M$ ist genau dann abelsch, wenn $\#M \le 2$.
A wahr
E Ab drei Elementen gibt es Permutationen, die nicht kommutieren.
S Skript, Beispiel 1.29(iii)

Q input
? Wie viele Gruppen mit 4 Elementen gibt es bis auf Isomorphie?
A 2
E Die Tabelle im Skript: $n = 1, 2, 3$: je eine, $n = 4$: zwei, $n = 5$: eine, $n = 6$: zwei.
S Skript, Bemerkung 1.43

Q input
? Wie viele Elemente hat die kleinste nicht-abelsche Gruppe?
A 6
E Bei $n = 6$ gibt es zwei Gruppen, eine davon ist nicht abelsch ($\cong S_3$).
S Skript, Bemerkung 1.43

Q tf
? Jede Gruppe mit höchstens fünf Elementen ist abelsch.
A wahr
E Die erste nicht-abelsche Gruppe hat 6 Elemente.
S Serie 3, freiwillige Aufgabe (iv)

Q tf
? In jeder Zeile der Verknüpfungstabelle einer endlichen Gruppe kommt jedes Element genau einmal vor.
A wahr
E Wegen der Kürzungsregel: Aus $ab = ac$ folgt $b = c$. Dasselbe gilt für Spalten.
S Skript, Bemerkung 1.43

Q mc
? $f: G \to H$ heisst Gruppenhomomorphismus, falls …
+ $f(g_1 \cdot_G g_2) = f(g_1) \cdot_H f(g_2)$ für alle $g_1, g_2 \in G$.
- $f(e_G) = e_H$ gilt.
- $f$ bijektiv ist.
- $f(g^{-1}) = f(g)$ für alle $g \in G$.
E $f(e_G) = e_H$ folgt daraus (Lemma 1.36). Bijektive Homomorphismen heissen Isomorphismen.
S Skript, Definition 1.34

Q tf
? Für jeden Gruppenhomomorphismus $f: G \to H$ gilt $f(e_G) = e_H$ und $f(a^{-1}) = f(a)^{-1}$.
A wahr
E $f(e_G) = f(e_G e_G) = f(e_G) f(e_G)$, dann kürzen.
S Skript, Lemma 1.36(i)

Q mc
? Der Kern eines Gruppenhomomorphismus $f: G \to H$ ist …
+ $\{a \in G : f(a) = e_H\}$
- $\{f(a) : a \in G\}$
- $\{a \in G : f(a) = a\}$
- $H \setminus f(G)$
E $\mathrm{Ker}(f) = f^{-1}(e_H)$. Die zweite Option ist das Bild.
S Skript, Definition 1.37

Q tf
? Ein Gruppenhomomorphismus $f$ ist genau dann injektiv, wenn $\mathrm{Ker}(f) = \{e_G\}$.
A wahr
E „$\Leftarrow$": Aus $f(a) = f(b)$ folgt $f(b^{-1}a) = e_H$, also $b^{-1}a = e_G$.
S Skript, Lemma 1.39

Q mc
? Was ist der Kern von $f: (\mathbb{R}\setminus\{0\}, 1, \cdot) \to (\mathbb{R}\setminus\{0\}, 1, \cdot)$, $f(a) = a^2$?
+ $\{-1, 1\}$
- $\{1\}$
- $\{0\}$
- $\emptyset$
E $a^2 = 1 \Leftrightarrow a = \pm 1$. Insbesondere ist $f$ nicht injektiv.
S Skript, Beispiel 1.38

Q tf
? $f: (\mathbb{R}, 0, +) \to (\mathbb{R}, 0, +)$, $f(a) = a - 1$ ist ein Gruppenhomomorphismus.
A falsch
E $f(0) = -1 \ne 0$. Ein Homomorphismus muss das neutrale Element erhalten.
S Serie 4, S2(i)

Q tf
? $g: (\mathbb{R}, 0, +) \to (\mathbb{R}, 0, +)$, $g(a) = 2026a$ ist ein Gruppenisomorphismus.
A wahr
E $g(a + b) = g(a) + g(b)$ und $g$ ist bijektiv mit Umkehrung $a \mapsto a/2026$.
S Serie 4, S2(ii)

Q tf
? $h: (\mathbb{R}\setminus\{0\}, 1, \cdot) \to (\mathbb{R}\setminus\{0\}, 1, \cdot)$, $h(a) = 2026a$ ist ein Gruppenisomorphismus.
A falsch
E $h(1) = 2026 \ne 1$. Bezüglich der Multiplikation ist $h$ kein Homomorphismus.
S Serie 4, S2(iii)

Q tf
? $k: (\mathbb{R}\setminus\{0\}, 1, \cdot) \to (\mathbb{R}\setminus\{0\}, 1, \cdot)$, $k(a) = a^{2026}$ ist ein Gruppenisomorphismus.
A falsch
E $k$ ist ein Homomorphismus, aber nicht injektiv: $k(-1) = k(1) = 1$.
S Serie 4, S2(iv)

Q mc
? Eine Teilmenge $H \subset G$ ist eine Untergruppe, falls …
+ $e \in H$, für alle $a, b \in H$ gilt $ab \in H$, und für alle $a \in H$ gilt $a^{-1} \in H$.
- $H$ nicht leer ist.
- für alle $a, b \in H$ gilt $ab \in H$.
- $e \in H$ und $H$ endlich ist.
E Definition 1.40. Dann ist $H$ mit der eingeschränkten Verknüpfung selbst eine Gruppe.
S Skript, Definition 1.40

Q multi
? Welche Teilmengen sind Untergruppen von $(\mathbb{R}\setminus\{0\}, 1, \cdot)$?
+ $\{2^a 3^b : a, b \in \mathbb{Z}\}$
- $(-\infty, 0)$
- $\mathbb{Z} \setminus \{0\}$
+ $\mathbb{Q} \setminus \{0\}$
E $(-\infty, 0)$: $1 \notin H$ und $(-1)(-1) = 1$. $\mathbb{Z}\setminus\{0\}$: $2^{-1} = 1/2 \notin H$.
S Serie 4, S3

Q tf
? Das Intervall $(0, \infty)$ ist eine Untergruppe von $(\mathbb{R}\setminus\{0\}, 1, \cdot)$.
A wahr
E $1 > 0$, Produkte und Kehrwerte positiver Zahlen sind positiv.
S Skript, Beispiel 1.41(iv)

Q tf
? $[0, \infty)$ ist eine Untergruppe von $(\mathbb{R}, 0, +)$.
A falsch
E Das additive Inverse $-1$ von $1$ fehlt.
S Skript, Beispiel 1.41(iv)

Q tf
? Die ungeraden ganzen Zahlen bilden eine Untergruppe von $(\mathbb{Z}, 0, +)$.
A falsch
E $0$ ist nicht ungerade, und die Summe zweier ungerader Zahlen ist gerade. Die geraden Zahlen bilden dagegen eine Untergruppe.
S Skript, Beispiel 1.41(i)

Q tf
? Der Kern eines Gruppenhomomorphismus ist stets eine Untergruppe.
A wahr
E Folgt aus Lemma 1.36. Untergruppen, die Kern eines Homomorphismus sind, heissen Normalteiler.
S Skript, Beispiel 1.41(iii)

Q tf
? $f: (\mathbb{Z}, 0, +) \to (\mathbb{Q}\setminus\{0\}, 1, \cdot)$, $f(a) = 2^a$ ist ein Gruppenhomomorphismus.
A wahr
E $f(a + b) = 2^{a+b} = 2^a 2^b = f(a) f(b)$. Er verbindet additive und multiplikative Schreibweise.
S Skript, Beispiel 1.35(ii)

Q input
? Auf $G = \{0, 1, 2, 3\}$ ist $+$ die „Addition modulo 4" (Serie 4, S4). Welches Element ist invers zu $1$?
A 3
E $3 + 1 = 0$ in dieser Tabelle. Die Gruppe ist abelsch, da die Tabelle symmetrisch ist.
S Serie 4, S4

Q mc
? Für $x \in \mathbb{R}$ sei $a \oplus b = a + b - x$. Was ist das Inverse von $a$ in der Gruppe $(\mathbb{R}, x, \oplus)$?
+ $2x - a$
- $-a$
- $x - a$
- $a - 2x$
E $(2x - a) \oplus a = 2x - a + a - x = x$, und $x$ ist das neutrale Element.
S Serie 4, E1

Q tf
? Das Produkt $G \times G'$ zweier Gruppen (komponentenweise Verknüpfung) ist genau dann abelsch, wenn $G$ und $G'$ abelsch sind.
A wahr
E $(a,a')(b,b') = (ab, a'b')$ – Kommutativität komponentenweise.
S Serie 5, S1

Q mc
? Wie viele Gleichungen muss man für die Assoziativität einer Verknüpfung auf einer $n$-elementigen Menge prüfen?
+ $n^3$
- $n^2$
- $3n$
- $n!$
E Für jedes Tripel $(a, b, c)$ eine. Im Skript für $n = 2$: $2^3 = 8$ Gleichungen.
S Skript, Beispiel 1.29(i)

Q mc
? Wie viele gültige Klammersetzungen gibt es für ein Produkt aus zehn Faktoren?
+ 4862
- 1024
- 362880
- 90
E Die Anzahl wächst exponentiell – dank Assoziativität (Lemma 1.33) ist das Ergebnis aber immer gleich.
S Skript, Lemma 1.33

Q mc
? Wie heisst die grösste sporadische einfache Gruppe?
+ Monstergruppe
- Riesengruppe
- Gigagruppe
- Leviathangruppe
E Ihre Existenz wurde 1983 von Griess bewiesen; sie hat mehr als $8 \cdot 10^{53}$ Elemente.
S Skript, Satz 1

# ringe | Ringe & Körper | Skript 1.4

Q mc
? Das erste Ringaxiom fordert: $(R, 0, +)$ ist …
+ eine abelsche Gruppe.
- eine Gruppe (nicht notwendig abelsch).
- ein Körper.
- eine Menge mit assoziativer Verknüpfung.
E Die additive Gruppe von $R$. Dazu kommen Assoziativität der Multiplikation, Einselement und Distributivgesetze.
S Skript, Definition 1.44

Q tf
? Im Skript ist die Kommutativität der Multiplikation Teil der Definition eines Rings.
A falsch
E Sie ist ein Zusatz (v): Dann heisst der Ring kommutativ. Beispiel eines nicht-kommutativen Rings: $\mathrm{Mat}_2(K)$.
S Skript, Definition 1.44, Achtung 1.46

Q tf
? Im Nullring gilt $1 = 0$.
A wahr
E $R = \{0\}$. Das ist kein Widerspruch, weil die Ringdefinition $0 \ne 1$ nicht verlangt.
S Skript, Beispiel 1.47(ii)

Q tf
? Der Nullring ist ein Körper.
A falsch
E Ein Körper verlangt $0 \ne 1$, hat also mindestens zwei Elemente.
S Skript, Bemerkung 1.51(ii)

Q tf
? In jedem Ring gilt $0 \cdot a = a \cdot 0 = 0$.
A wahr
E $0 \cdot a = (0 + 0) \cdot a = 0 \cdot a + 0 \cdot a$, dann in der additiven Gruppe kürzen.
S Skript, Lemma 1.48(i)

Q tf
? In jedem Ring gilt $(-1) \cdot (-1) = 1$.
A wahr
E Lemma 1.48(ii): $-a = (-1) \cdot a$, also $(-1)(-1) = -(-1) = 1$.
S Skript, Lemma 1.48(ii)

Q tf
? Jeder Körper ist ein kommutativer Ring.
A wahr
E Per Definition ist ein Körper ein kommutativer Ring mit $0 \ne 1$, in dem jedes $a \ne 0$ invertierbar ist.
S Serie 5, S3(ii)

Q tf
? Jeder kommutative Ring ist ein Körper.
A falsch
E Gegenbeispiel: $\mathbb{Z}$ – dort hat $2$ kein multiplikatives Inverses.
S Serie 5, S3(iii)

Q tf
? Ist $R$ kommutativ mit $0 \ne 1$ und folgt aus $ab = 0$ stets $a = 0$ oder $b = 0$, so ist $R$ ein Körper.
A falsch
E $\mathbb{Z}$ hat diese Eigenschaften (nullteilerfrei), ist aber kein Körper.
S Serie 5, S3(iv)

Q mc
? Was muss ein kommutativer Ring $K$ zusätzlich erfüllen, um ein Körper zu sein?
+ $0 \ne 1$, und zu jedem $a \ne 0$ gibt es $a'$ mit $a'a = 1$.
- $ab = 0 \Rightarrow a = 0$ oder $b = 0$.
- $K$ ist unendlich.
- $1 + 1 \ne 0$.
E Definition 1.49. Nullteilerfreiheit folgt daraus (Lemma 1.50), reicht aber nicht.
S Skript, Definition 1.49

Q tf
? In einem Körper folgt aus $ab = 0$, dass $a = 0$ oder $b = 0$.
A wahr
E Ist $a \ne 0$, so ist $b = (a^{-1}a)b = a^{-1}(ab) = a^{-1} \cdot 0 = 0$.
S Skript, Lemma 1.50(i)

Q mc
? Die multiplikative Gruppe eines Körpers $K$ ist …
+ $K^\times = K \setminus \{0\}$ mit $1$ und der Multiplikation.
- $K$ mit $1$ und der Multiplikation.
- $K$ mit $0$ und der Addition.
- $\{-1, 1\}$
E Lemma 1.50(ii). Die $0$ muss weg, da sie kein Inverses hat.
S Skript, Lemma 1.50(ii)

Q tf
? Der Polynomring $K[X]$ über einem Körper $K$ ist ein Körper.
A falsch
E $X$ hat kein Inverses: aus $XA = 1$ folgte $\deg(XA) = 1 + \deg A \ge 1$, aber $\deg 1 = 0$.
S Skript, Lemma 1.53(ii)

Q mc
? Für $A, B \in K[X] \setminus \{0\}$ ($K$ Körper) gilt $\deg(AB) = \;$ …
+ $\deg A + \deg B$
- $\max(\deg A, \deg B)$
- $\deg A \cdot \deg B$
- höchstens $\deg A + \deg B$, eventuell weniger
E Der Leitkoeffizient $a_n b_m$ ist $\ne 0$, weil Körper nullteilerfrei sind.
S Skript, Lemma 1.53(i)

Q tf
? Der Grad des Nullpolynoms ist $0$.
A falsch
E Der Grad des Nullpolynoms ist nicht definiert. Konstante Polynome $\ne 0$ haben Grad 0.
S Skript, Beispiel 1.47(iii)

Q mc
? Berechne $(X^5 + X^4 + X^3 + X^2 + X + 1)(X - 1)$ in $\mathbb{Q}[X]$.
+ $X^6 - 1$
- $X^6 + 1$
- $X^5 - 1$
- $X^6 - X$
E Teleskopsumme: Alle mittleren Terme heben sich weg.
S Serie 5, S2(ii)

Q mc
? Berechne $(X - 3)(X - 4)(X - 1)$ in $\mathbb{Q}[X]$.
+ $X^3 - 8X^2 + 19X - 12$
- $X^3 - 8X^2 + 19X + 12$
- $X^3 - 7X^2 + 19X - 12$
- $X^3 - 8X^2 + 12X - 12$
E $(X^2 - 7X + 12)(X - 1) = X^3 - 8X^2 + 19X - 12$.
S Serie 5, S2(i)

Q tf
? Im Körper $\mathbb{F}_2$ gilt $1 + 1 = 0$, also $-1 = 1$.
A wahr
E „Es können keine Vorzeichenfehler passieren!"
S Skript, Beispiel 1.52(iv)

Q input
? Wie viele Elemente hat der kleinste Körper?
A 2
E $\mathbb{F}_2 = \{0, 1\}$. Ein Körper braucht $0 \ne 1$.
S Skript, Beispiel 1.52(iv)

Q mc
? Welche Charakteristik hat $\mathbb{Q}$?
+ $0$
- $1$
- $2$
- $\infty$
E $n \cdot 1 \ne 0$ für alle $n \in \mathbb{N}$, daher Charakteristik 0. Gleiches gilt für $\mathbb{R}$ und $\mathbb{C}$.
S Skript, Beispiel 1.58(i)

Q tf
? Die Charakteristik eines Körpers ist entweder $0$ oder eine Primzahl.
A wahr
E Ist $n = ab$ minimal mit $n \cdot 1 = 0$, so folgt $a \cdot 1 = 0$ oder $b \cdot 1 = 0$ (nullteilerfrei).
S Skript, Lemma 1.56

Q tf
? Es gibt einen Körper mit genau 6 Elementen.
A falsch
E Endliche Körper haben genau $p^n$ Elemente ($p$ Primzahl, $n \in \mathbb{N}$). $6$ ist keine Primzahlpotenz.
S Skript, Bemerkung 1.55(ii)

Q tf
? Es gibt einen Körper mit genau 4 Elementen.
A wahr
E $4 = 2^2$, es gibt also den Körper $\mathbb{F}_4$ (nicht zu verwechseln mit $\mathbb{Z}$ modulo 4!).
S Skript, Bemerkung 1.55(ii)

Q tf
? In einem Körper der Charakteristik 2 gilt $(x + y)^2 = x^2 + y^2$.
A wahr
E $(x+y)^2 = x^2 + xy(1 + 1) + y^2$ und $1 + 1 = 0$.
S Skript, Beispiel 1.58(iii)

Q mc
? Sei $K = \{0, 1, \alpha\}$ ein Körper mit drei Elementen. Was ist $1 + 1$?
+ $\alpha$
- $0$
- $1$
- Das ist nicht eindeutig bestimmt.
E $1 + 1 = 1$ hiesse $1 = 0$. Wäre $1 + 1 = 0$, so bliebe für $1 + \alpha$ kein gültiger Wert (Zeile der Additionstabelle).
S Serie 5, E2(i)

Q mc
? Sei $K = \{0, 1, \alpha\}$ ein Körper mit drei Elementen. Was ist $\alpha \cdot \alpha$?
+ $1$
- $\alpha$
- $0$
- $1 + 1$
E $\alpha \alpha \ne 0$ (nullteilerfrei). Aus $\alpha \alpha = \alpha$ folgte $\alpha = 1$ (kürzen). Also $\alpha^2 = 1$.
S Serie 5, E2(i)

Q tf
? In einem Körper mit drei Elementen gilt $x^3 = x$ für alle $x$.
A wahr
E Für $0, 1$ klar. Für $\alpha$: $\alpha^3 = \alpha^2 \cdot \alpha = 1 \cdot \alpha$.
S Serie 5, E2(iii)

Q mc
? Auf $\mathbb{R}^2$ sei $(a,b)(c,d) = (ac - bd, ad + bc)$ und $i = (0, 1)$. Was ist $i^2$?
+ $(-1, 0)$
- $(0, -1)$
- $(1, 0)$
- $(0, 0)$
E $(0,1)(0,1) = (0 - 1, 0 + 0)$. Das ist die Konstruktion der komplexen Zahlen.
S Serie 5, E1(ii)

Q tf
? $\mathbb{R}^2$ mit $(a,b) + (c,d) = (a+c, b+d)$ und $(a,b)(c,d) = (ac - bd, ad + bc)$ ist ein Körper.
A wahr
E Das Inverse von $(a, b) \ne (0, 0)$ ist $(ac, -bc)$ mit $c = 1/(a^2 + b^2)$. Das ist $\mathbb{C}$.
S Serie 6, E1

Q tf
? $\{a + b\sqrt{2} : a, b \in \mathbb{Z}\}$ ist ein Körper.
A falsch
E Es ist ein kommutativer Ring, aber $2$ hat kein Inverses: $1/2 = a + b\sqrt2$ erzwingt $a = 1/2 \notin \mathbb{Z}$.
S Serie 4, E4

Q tf
? Die Kommutativität der Addition in einem Ring folgt bereits aus den übrigen Ringaxiomen.
A wahr
E Expandiere $(1 + 1)(a + b)$ auf zwei Arten: $a + a + b + b = a + b + a + b$, dann kürzen.
S Serie 5, freiwillige Aufgabe (ii)

# matrizen | Matrizenkalkül | Skript 2.1–2.3

Q mc
? Seien $A \in \mathrm{Mat}_{m,n}(K)$ und $B \in \mathrm{Mat}_{p,q}(K)$. Wann ist $AB$ definiert?
+ wenn $n = p$
- wenn $m = q$
- wenn $m = p$
- wenn $n = q$
E Spaltenzahl des ersten Faktors = Zeilenzahl des zweiten Faktors.
S Skript, Definition 2.14, Bemerkung 2.15

Q mc
? Ist $A \in \mathrm{Mat}_{m,n}(K)$ und $B \in \mathrm{Mat}_{n,p}(K)$, so liegt $AB$ in …
+ $\mathrm{Mat}_{m,p}(K)$
- $\mathrm{Mat}_{n,n}(K)$
- $\mathrm{Mat}_{p,m}(K)$
- $\mathrm{Mat}_{m,n}(K)$
E Zeilen von $A$, Spalten von $B$.
S Skript, Definition 2.14

Q mc
? Wie viele Multiplikationen in $K$ braucht man höchstens für $AB$ mit $A \in \mathrm{Mat}_{m,n}(K)$, $B \in \mathrm{Mat}_{n,p}(K)$?
+ $mnp$
- $mn + np$
- $m^2 n$
- $(mnp)^2$
E $mp$ Einträge, jeder ist eine Summe aus $n$ Produkten.
S Serie 6, S2

Q mc
? Wie viele Multiplikationen braucht der Strassen-Algorithmus für das Produkt zweier $2 \times 2$-Matrizen?
+ 7
- 8
- 6
- 4
E Statt 8. Rekursiv angewendet ergibt das $n^{\log 7 / \log 2} \approx n^{2.81}$ Multiplikationen.
S Serie 6, freiwillige Aufgabe (ii)

Q tf
? Die Matrixmultiplikation auf $\mathrm{Mat}_m(K)$ ist für $m \ge 2$ nicht kommutativ.
A wahr
E Z.B. Drehung $D$ und Spiegelung $S$: $DS \ne SD$.
S Skript, Beispiel 2.16

Q tf
? Für alle $A, B \in \mathrm{Mat}_2(\mathbb{Q})$ gilt $(A + B)^2 = A^2 + 2AB + B^2$.
A falsch
E $(A+B)^2 = A^2 + AB + BA + B^2$. Das stimmt nur, wenn $AB = BA$.
S Serie 6, E2

Q tf
? Das Produkt zweier Matrizen, die beide nicht die Nullmatrix sind, kann die Nullmatrix sein.
A wahr
E Z.B. $\begin{pmatrix}0&1\\0&0\end{pmatrix}^2 = 0$. Darum ist $\mathrm{Mat}_m(K) \setminus \{0\}$ keine Gruppe.
S Skript, Beispiel 2.16, Bemerkung 2.21(ii)

Q tf
? $(\mathrm{Mat}_{m,n}(K), 0_{m,n}, +)$ ist eine abelsche Gruppe.
A wahr
E Die Addition ist eintragsweise, also erbt sie die Eigenschaften von $(K, 0, +)$.
S Skript, Lemma 2.11

Q tf
? Die Matrixmultiplikation ist assoziativ: $(AB)C = A(BC)$.
A wahr
E Lemma 2.20(i). Konzeptionell: Matrixmultiplikation entspricht der Verkettung $f_A \circ f_B = f_{AB}$.
S Skript, Lemma 2.20(i)

Q mc
? Matrixmultiplikation entspricht …
+ der Verkettung der zugehörigen Abbildungen: $f_A \circ f_B = f_{AB}$.
- der Addition der Abbildungen: $f_A + f_B = f_{AB}$.
- dem kartesischen Produkt der Abbildungen.
- der Umkehrabbildung: $f_A^{-1} = f_{AB}$.
E Dabei ist $f_A(v) = Av$ für Spaltenvektoren $v$.
S Skript, Bemerkung 2.21(i)

Q tf
? Für $A \in \mathrm{Mat}_{m,n}(K)$ gilt $E_m A = A = A E_n$.
A wahr
E Die Einheitsmatrix ist neutral bezüglich der Multiplikation.
S Skript, Lemma 2.19(i)

Q mc
? $B$ heisst Rechtsinverses von $A \in \mathrm{Mat}_{m,n}(K)$, falls …
+ $AB = E_m$
- $BA = E_n$
- $AB = BA$
- $A + B = 0$
E Linksinverses: $BA = E_n$. Inverses: beides.
S Skript, Definition 2.22

Q tf
? Eine Matrix kann ein Linksinverses besitzen, ohne ein Rechtsinverses zu besitzen.
A wahr
E $A = \begin{pmatrix}1\\0\end{pmatrix}$: $B = (1\;0)$ erfüllt $BA = (1)$, aber $AB \ne E_2$ für jedes $B$.
S Skript, Beispiel 2.23

Q tf
? Die Nullmatrix $0_m$ ist invertierbar.
A falsch
E $0_m A = 0_m \ne E_m$ für jedes $A$.
S Skript, Beispiel 2.23(ii)

Q tf
? Sind $A, B \in \mathrm{Mat}_m(K)$ invertierbar, so ist $AB$ invertierbar mit $(AB)^{-1} = B^{-1}A^{-1}$.
A wahr
E $(AB)(B^{-1}A^{-1}) = A E_m A^{-1} = E_m$ und analog von links.
S Skript, Lemma 2.24(i)

Q mc
? Was bezeichnet $\mathrm{GL}_m(K)$?
+ Die Gruppe der invertierbaren $m \times m$-Matrizen mit der Matrixmultiplikation.
- Die Gruppe aller $m \times m$-Matrizen mit der Addition.
- Die Menge der Matrizen mit Determinante $1$.
- Die Menge der Diagonalmatrizen.
E „Allgemeine lineare Gruppe", neutrales Element $E_m$.
S Skript, Definition 2.26

Q mc
? Wann ist $A = \begin{pmatrix}a&b\\c&d\end{pmatrix} \in \mathrm{Mat}_2(K)$ invertierbar?
+ genau dann, wenn $ad - bc \ne 0$
- genau dann, wenn $a \ne 0$ und $d \ne 0$
- genau dann, wenn $A \ne 0$
- genau dann, wenn $ab - cd \ne 0$
E Lemma 2.27. Später: $\det A = ad - bc$.
S Skript, Lemma 2.27

Q mc
? Für $A = \begin{pmatrix}a&b\\c&d\end{pmatrix} \in \mathrm{GL}_2(K)$ ist $A^{-1} = \;$ …
+ $\frac{1}{ad - bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}$
- $\frac{1}{ad - bc}\begin{pmatrix}a&-b\\-c&d\end{pmatrix}$
- $\frac{1}{ad - bc}\begin{pmatrix}d&b\\c&a\end{pmatrix}$
- $\begin{pmatrix}1/a&1/b\\1/c&1/d\end{pmatrix}$
E Diagonale tauschen, Nebendiagonale negieren, durch $ad - bc$ teilen.
S Skript, Lemma 2.27

Q input
? Berechne $\det \begin{pmatrix}3&5\\1&2\end{pmatrix}$.
A 1
E $3 \cdot 2 - 5 \cdot 1 = 1$. Die Matrix ist also invertierbar.
S Serie 7, S4

Q tf
? Für alle $A, B \in \mathrm{Mat}_2(K)$ gilt $\det(AB) = \det(A)\det(B)$.
A wahr
E Nachrechnen mit $\det\begin{pmatrix}a&b\\c&d\end{pmatrix} = ad - bc$.
S Serie 7, S4

Q tf
? Für alle $A, B \in \mathrm{Mat}_2(\mathbb{Q})$ gilt $\det(A + B) = \det(A) + \det(B)$.
A falsch
E $A = B = E_2$: $\det(2E_2) = 4$, aber $\det E_2 + \det E_2 = 2$.
S Serie 8, S3(ii)

Q mc
? Für $A \in \mathrm{Mat}_2(K)$ und $\lambda \in K$ gilt $\det(\lambda A) = \;$ …
+ $\lambda^2 \det(A)$
- $\lambda \det(A)$
- $2\lambda \det(A)$
- $\det(A)$
E $(\lambda a)(\lambda d) - (\lambda b)(\lambda c) = \lambda^2(ad - bc)$.
S Serie 8, S3(i)

Q input
? Wie viele Elemente hat $\mathrm{GL}_2(\mathbb{F}_2)$?
A 6
E Von 16 Matrizen über $\mathbb{F}_2$ haben genau 6 die Determinante $ad - bc = 1$. Es gilt sogar $\mathrm{GL}_2(\mathbb{F}_2) \cong S_3$.
S Serie 8, E4

Q mc
? Welche Matrix ist nilpotent und ungleich der Nullmatrix?
+ $\begin{pmatrix}0&1\\0&0\end{pmatrix}$
- $\begin{pmatrix}1&0\\0&0\end{pmatrix}$
- $\begin{pmatrix}0&1\\1&0\end{pmatrix}$
- $\begin{pmatrix}1&1\\0&1\end{pmatrix}$
E $N$ heisst nilpotent, falls $N^k = 0$ für ein $k \in \mathbb{N}$. Hier ist schon $N^2 = 0$.
S Serie 7, S3(i)

Q tf
? Eine nilpotente Matrix ist niemals invertierbar.
A wahr
E Wäre $N$ invertierbar, so auch $N^k = 0$ – aber die Nullmatrix ist nicht invertierbar.
S Serie 7, S3(ii)

Q tf
? Eine Diagonalmatrix ist genau dann nilpotent, wenn sie die Nullmatrix ist.
A wahr
E $\mathrm{diag}(x_1, \dots, x_m)^k = \mathrm{diag}(x_1^k, \dots, x_m^k)$, und in einem Körper ist $x^k = 0 \Rightarrow x = 0$.
S Serie 7, E2

Q mc
? $\mathrm{diag}(x_1, \dots, x_m) \cdot \mathrm{diag}(y_1, \dots, y_m) = \;$ …
+ $\mathrm{diag}(x_1 y_1, \dots, x_m y_m)$
- $\mathrm{diag}(x_1 + y_1, \dots, x_m + y_m)$
- $(x_1 y_1 + \dots + x_m y_m) E_m$
- $\mathrm{diag}(x_1 y_m, \dots, x_m y_1)$
E Diagonalmatrizen multipliziert man eintragsweise. Insbesondere kommutieren sie miteinander.
S Serie 7, S1(ii)

Q tf
? Kommutiert $\mathrm{diag}(x_1, \dots, x_m)$ mit allen Matrizen in $\mathrm{Mat}_m(K)$, so gilt $x_1 = \dots = x_m$.
A wahr
E Umgekehrt kommutiert $\mathrm{diag}(x, \dots, x) = xE_m$ mit allen Matrizen.
S Serie 7, S1(i), E3

Q tf
? Das Produkt zweier oberer Dreiecksmatrizen ist eine obere Dreiecksmatrix.
A wahr
E Für $i > j$ ist $(AB)_{i,j} = \sum_k a_{i,k} b_{k,j}$ und jeder Summand ist $0$ (entweder $i > k$ oder $k \ge i > j$).
S Serie 7, E1(ii)

Q mc
? $\begin{pmatrix}1&0\\-1&1\end{pmatrix}^n = \;$ … (für $n \in \mathbb{N}$)
+ $\begin{pmatrix}1&0\\-n&1\end{pmatrix}$
- $\begin{pmatrix}1&0\\(-1)^n&1\end{pmatrix}$
- $\begin{pmatrix}1&0\\-1&1\end{pmatrix}$
- $\begin{pmatrix}n&0\\-n&n\end{pmatrix}$
E Beweis per Induktion auf $n$.
S Serie 6, E3(i)

Q mc
? $\begin{pmatrix}0&1\\1&0\end{pmatrix}^n = \;$ … (für $n \in \mathbb{N}$)
+ $E_2$ für gerade $n$, sonst $\begin{pmatrix}0&1\\1&0\end{pmatrix}$
- immer $\begin{pmatrix}0&1\\1&0\end{pmatrix}$
- $\begin{pmatrix}0&n\\n&0\end{pmatrix}$
- die Nullmatrix für $n \ge 2$
E Die Matrix vertauscht zwei Koordinaten; zweimal vertauschen ergibt die Identität.
S Serie 6, E3(ii)

Q tf
? Gilt $Av = Bv$ für alle Spaltenvektoren $v \in K^n$, so ist $A = B$.
A wahr
E Setze die Standardbasisvektoren ein: $Ae_j$ ist die $j$-te Spalte von $A$.
S Serie 8, E2

Q tf
? $\{A \in \mathrm{Mat}_2(\mathbb{Z}) : \det A = \pm 1\}$ bildet mit der Matrixmultiplikation eine Gruppe.
A wahr
E Abgeschlossen wegen $\det(AB) = \det A \det B$, und $A^{-1} = \pm\begin{pmatrix}d&-b\\-c&a\end{pmatrix}$ ist ganzzahlig.
S Serie 7, E4(ii)

Q tf
? $H = \left\{\begin{pmatrix}a&b\\c&d\end{pmatrix} : a + b + c + d = 0\right\}$ ist eine Untergruppe von $(\mathrm{Mat}_2(\mathbb{Q}), 0, +)$.
A wahr
E $0 \in H$, die Bedingung ist mit Summen und Negation verträglich.
S Serie 6, S3

Q mc
? Ein Spaltenvektor der Länge $m$ ist ein Element von …
+ $\mathrm{Mat}_{m,1}(K)$
- $\mathrm{Mat}_{1,m}(K)$
- $\mathrm{Mat}_{m,m}(K)$
- $K \times K$
E Zeilenvektoren liegen in $\mathrm{Mat}_{1,m}(K)$.
S Skript, Definition 2.17

Q mc
? Sei $B_t = \begin{pmatrix}6-2t&1+3t\\1&t\end{pmatrix}$. Für welche $t \in \mathbb{R}$ hat $B_t x = \begin{pmatrix}4\\1\end{pmatrix}$ eine Lösung?
+ $t \in \mathbb{R} \setminus \{1/2\}$
- $t \in \mathbb{R} \setminus \{1/2, 1\}$
- $t \in \mathbb{R} \setminus \{1\}$
- für alle $t \in \mathbb{R}$
E $\det B_t = -(2t-1)(t-1)$. Für $t = 1$ ist die erste Zeile $4\times$ die zweite, und auch $4 = 4 \cdot 1$: lösbar. Für $t = 1/2$ wäre $4 = 5 \cdot 1$ nötig: unlösbar.
S Serie 7, S2

Q tf
? Jede invertierbare Matrix ist quadratisch.
A wahr
E Wird im Skript angekündigt. Nicht-quadratische Matrizen haben höchstens ein einseitiges Inverses.
S Skript, nach Definition 2.22

# gauss | Gauss-Verfahren | Skript 2.4

Q mc
? Welche elementare Zeilenumformung ist vom Typ II?
+ Vertauschen zweier Zeilen
- Addition eines Vielfachen einer Zeile zu einer anderen
- Multiplikation einer Zeile mit $\lambda \ne 0$
- Streichen einer Nullzeile
E Typ I: $a_i \to a_i + \lambda a_j$ ($i \ne j$). Typ II: Zeilen tauschen. Typ III: $a_i \to \lambda a_i$.
S Skript, Definition 2.31

Q mc
? Welche elementare Zeilenumformung ist vom Typ I?
+ Ersetze Zeile $a_i$ durch $a_i + \lambda a_j$ mit $i \ne j$.
- Vertausche die Zeilen $i$ und $j$.
- Ersetze Zeile $a_i$ durch $\lambda a_i$.
- Ersetze Zeile $a_i$ durch $a_i + \lambda a_i$.
E Wichtig: $i \ne j$. Mit $i = j$ wäre das eine Skalierung (und für $\lambda = -1$ verheerend).
S Skript, Definition 2.31

Q tf
? Bei einer elementaren Zeilenumformung vom Typ III darf man eine Zeile mit $\lambda = 0$ multiplizieren.
A falsch
E Das würde Information zerstören und die Lösungsmenge ändern. $E_{III}(i, \lambda)$ ist nur für $\lambda \ne 0$ invertierbar.
S Skript, Definition 2.31, Lemma 2.35

Q mc
? $E_I(i, j, \lambda) A$ entsteht aus $A$, indem man …
+ das $\lambda$-fache der $j$-ten Zeile zur $i$-ten Zeile addiert.
- das $\lambda$-fache der $i$-ten Zeile zur $j$-ten Zeile addiert.
- die $i$-te und $j$-te Spalte vertauscht.
- das $\lambda$-fache der $j$-ten Spalte zur $i$-ten Spalte addiert.
E Multiplikation von links mit Elementarmatrizen = Zeilenumformungen.
S Skript, Lemma 2.33

Q mc
? Was ist das Inverse von $E_I(i, j, \lambda)$?
+ $E_I(i, j, -\lambda)$
- $E_I(j, i, \lambda)$
- $E_I(i, j, \lambda^{-1})$
- $E_I(i, j, \lambda)$
E Addiert man erst $\lambda$-mal und dann $-\lambda$-mal Zeile $j$ zu Zeile $i$, ändert sich nichts.
S Skript, Lemma 2.35(i)

Q mc
? Was ist das Inverse von $E_{II}(i, j)$?
+ $E_{II}(i, j)$ selbst
- $E_{III}(i, -1)$
- $-E_{II}(i, j)$
- $E_m$
E Zweimal dieselben Zeilen zu vertauschen ergibt die ursprüngliche Matrix.
S Skript, Lemma 2.35(ii)

Q mc
? Was ist das Inverse von $E_{III}(i, \lambda)$ für $\lambda \ne 0$?
+ $E_{III}(i, \lambda^{-1})$
- $E_{III}(i, -\lambda)$
- $E_{III}(i, \lambda)$
- $E_I(i, i, -\lambda)$
E Erst mit $\lambda$, dann mit $\lambda^{-1}$ multiplizieren.
S Skript, Lemma 2.35(iii)

Q tf
? Für $\lambda, \mu \in K$ gilt $E_I(i, j, \lambda) E_I(i, j, \mu) = E_I(i, j, \lambda + \mu)$.
A wahr
E Erst $\mu$-mal, dann $\lambda$-mal Zeile $j$ zu Zeile $i$ addieren ergibt $(\lambda + \mu)$-mal.
S Serie 8, E3(i)

Q tf
? Für $\lambda, \mu \in K \setminus \{0\}$ gilt $E_{III}(i, \lambda) E_{III}(i, \mu) = E_{III}(i, \lambda\mu)$.
A wahr
E Die $i$-te Zeile wird erst mit $\mu$, dann mit $\lambda$ multipliziert.
S Serie 8, E3(ii)

Q tf
? Alle Elementarmatrizen liegen in $\mathrm{GL}_m(K)$.
A wahr
E Folgt aus Lemma 2.35: Jede hat ein (zweiseitiges) Inverses.
S Skript, Lemma 2.35

Q tf
? Elementare Zeilenumformungen der erweiterten Matrix $(A, b)$ ändern die Lösungsmenge von $Ax = b$ nicht.
A wahr
E $A' = LA$, $b' = Lb$ mit $L$ invertierbar: $Ax = b \Leftrightarrow LAx = Lb$.
S Skript, Lemma 2.36

Q mc
? Sei $\tilde{x}$ eine Lösung von $Ax = b$. Dann ist die Lösungsmenge $\{x : Ax = b\} = \;$ …
+ $\{\tilde{x} + h : Ah = 0\}$
- $\{\tilde{x}\}$
- $\{h : Ah = 0\}$
- $\{\tilde{x} \cdot h : Ah = 0\}$
E „Eine spezielle Lösung plus alle Lösungen des homogenen Systems."
S Skript, Lemma 2.37

Q tf
? Ein homogenes lineares Gleichungssystem $Ax = 0$ hat immer mindestens eine Lösung.
A wahr
E Die triviale Lösung $x = 0$.
S Skript, Definition 2.28

Q tf
? Jedes inhomogene lineare Gleichungssystem $Ax = b$ besitzt eine Lösung.
A falsch
E Z.B. $\begin{pmatrix}0\end{pmatrix} x = \begin{pmatrix}1\end{pmatrix}$ hat keine Lösung.
S Skript, Proposition 2.43

Q mc
? Welche Bedingung gehört NICHT zur Zeilenstufenform im Skript?
+ Jede Zeile enthält einen Pivoteintrag.
- Der erste Eintrag ungleich Null jeder Zeile ist $1$.
- Die Einträge oberhalb eines Pivoteintrags sind $0$.
- Ist eine Zeile null, so auch alle folgenden Zeilen.
E Nullzeilen sind erlaubt (Bemerkung 2.39), aber es gibt höchstens einen Pivot pro Zeile.
S Skript, Definition 2.38

Q tf
? Die Matrix $\begin{pmatrix}1&2&0\\0&0&1\end{pmatrix}$ ist in Zeilenstufenform.
A wahr
E Pivots in Spalte 1 und 3, beide sind 1, darüber stehen Nullen.
S Skript, Definition 2.38

Q tf
? Die Matrix $\begin{pmatrix}1&2&3\\0&1&4\end{pmatrix}$ ist in Zeilenstufenform (im Sinne des Skripts).
A falsch
E Über dem Pivot in Spalte 2 steht eine $2 \ne 0$. Bedingung (iv) des Skripts verlangt Nullen oberhalb der Pivots.
S Skript, Definition 2.38(iv)

Q tf
? Die Matrix $\begin{pmatrix}0&1\\1&0\end{pmatrix}$ ist in Zeilenstufenform.
A falsch
E Der Pivot der zweiten Zeile steht links vom Pivot der ersten. Eine Zeilenvertauschung (Typ II) hilft.
S Skript, Definition 2.38(ii)

Q tf
? Jede Matrix lässt sich durch endlich viele elementare Zeilenumformungen in Zeilenstufenform bringen.
A wahr
E Lemma 2.41, Beweis per Induktion auf $m + n$. Äquivalent: Es gibt ein Produkt $L$ von Elementarmatrizen mit $LA$ in Zeilenstufenform.
S Skript, Lemma 2.41

Q mc
? Sei $A$ in Zeilenstufenform mit $r$ Nicht-Nullzeilen. Wann ist $Ax = b$ lösbar?
+ genau dann, wenn $b_{r+1} = \dots = b_m = 0$
- genau dann, wenn $b_1 = \dots = b_r = 0$
- genau dann, wenn $r = m$
- immer
E Die Zeilen $r+1, \dots, m$ lauten $0 = b_i$.
S Skript, Proposition 2.43

Q tf
? Ist $Ax = b$ ($A$ in Zeilenstufenform) lösbar, so gibt es zu jeder Wahl der Variablen in den Nicht-Pivot-Spalten genau eine Lösung.
A wahr
E Die Pivot-Variablen werden dann eindeutig „rückwärts-aufwärts" bestimmt.
S Skript, Proposition 2.43

Q input
? $A \in \mathrm{Mat}_{3,5}(K)$ ist in Zeilenstufenform mit 2 Pivoteinträgen und $Ax = b$ ist lösbar. Wie viele Variablen sind frei wählbar?
A 3
E Freie Variablen = Spalten ohne Pivot $= 5 - 2 = 3$.
S Skript, Proposition 2.43

Q tf
? Die Zeilenstufenform ist eindeutig: Sind $LA$ und $L'A$ mit $L, L' \in \mathrm{GL}_m(K)$ beide in Zeilenstufenform, so ist $LA = L'A$.
A wahr
E Darum spricht man von „der" Zeilenstufenform (im Sinne des Skripts, also mit Nullen über den Pivots).
S Serie 8, freiwillige Aufgabe (i)

Q mc
? Wie berechnet man $A^{-1}$ mit dem Gauss-Verfahren?
+ $(A \mid E_m)$ durch Zeilenumformungen in $(E_m \mid B)$ überführen; dann ist $B = A^{-1}$.
- $(E_m \mid A)$ durch Spaltenumformungen in $(A \mid E_m)$ überführen.
- Alle Einträge von $A$ invertieren.
- $A$ in Zeilenstufenform bringen und transponieren.
E Ist $LA = E_m$ mit $L$ Produkt von Elementarmatrizen, so ist $L = A^{-1}$, und $L E_m = L$ steht rechts.
S Serie 8, S2

Q tf
? Hat die Zeilenstufenform einer quadratischen Matrix eine Nullzeile, so ist die Matrix nicht invertierbar.
A wahr
E Dann ist $LA$ nicht invertierbar (Nullzeile), also auch $A = L^{-1}(LA)$ nicht.
S Skript 2.4

Q mc
? Ein lineares Gleichungssystem $Ax = b$ heisst homogen, falls …
+ $b = 0$
- $A$ quadratisch ist
- $A$ invertierbar ist
- es genau eine Lösung hat
E Sonst inhomogen.
S Skript, Definition 2.28

Q tf
? Es gibt höchstens einen Pivoteintrag pro Zeile.
A wahr
E Der Pivot ist der erste Eintrag ungleich Null der Zeile.
S Skript, Bemerkung 2.39
`;

/* Mathle-Wörter: WORT | Hinweis (Definition) | Kapitel-ID */
MATHLE.raw.laWords = String.raw`
GRUPPE | Tupel $(G, e, m)$ mit Assoziativität, neutralem und inversem Element | gruppen
RING | Abelsche Gruppe $(R, 0, +)$ mit assoziativer Multiplikation, Einselement und Distributivgesetz | ringe
KÖRPER | Kommutativer Ring mit $0 \ne 1$, in dem jedes $a \ne 0$ invertierbar ist | ringe
KERN | $f^{-1}(e_H) = \{a \in G : f(a) = e_H\}$ | gruppen
BILD | $\{f(g) : g \in G\}$ | gruppen
MATRIX | Element von $\mathrm{Mat}_{m,n}(K)$ | matrizen
PIVOT | Erster Eintrag $\ne 0$ einer Zeile in Zeilenstufenform – er ist $1$ | gauss
INJEKTIV | $f(m) = f(m') \Rightarrow m = m'$ | mengen
BIJEKTIV | Injektiv und surjektiv zugleich | mengen
ABELSCH | Eine Gruppe, in der $ab = ba$ für alle $a, b$ gilt | gruppen
INVERSES | Das eindeutige $a'$ mit $a'a = e$ | gruppen
NEUTRAL | Das Element $e$ mit $ea = a$ für alle $a$ heisst … Element | gruppen
MENGE | Naive „Ansammlung" von Objekten – jedes mathematische Objekt ist eine | mengen
NEGATION | „nicht $P$", geschrieben $\neg P$ | logik
INDUKTION | Beweisprinzip mit Verankerung und Schritt | logik
AXIOM | Grundforderung, z.B. (A), (N), (I) | gruppen
POLYNOM | Element von $R[X]$, z.B. $X^2 + 1$ | ringe
GRAD | $\deg(A)$ – für das Nullpolynom nicht definiert | ringe
DISJUNKT | $M \cap N = \emptyset$ | mengen
TUPEL | Geordnete Zusammenfassung wie $(G, e, m)$ | gruppen
NULLRING | Der Ring $\{0\}$, in dem $1 = 0$ gilt | ringe
PRIMZAHL | Die Charakteristik eines Körpers ist $0$ oder eine … | ringe
NILPOTENT | $N^k = 0$ für ein $k \in \mathbb{N}$ | matrizen
SPALTE | Der zweite Index $j$ von $a_{i,j}$ zählt die … | matrizen
ZEILE | Elementare Umformungen wirken auf diese | gauss
ISOMORPH | Zwei Gruppen mit einem bijektiven Homomorphismus zwischen ihnen sind … | gruppen
ABBILDUNG | Ordnet jedem $m \in M$ genau ein $f(m) \in N$ zu | mengen
GAUSS | Namensgeber des Eliminationsverfahrens | gauss
MONSTER | Grösste sporadische einfache Gruppe | gruppen
SKALAR | Element $\lambda \in K$, mit dem man Matrizen multipliziert | matrizen
DIAGONAL | $\mathrm{diag}(x_1, \dots, x_m)$ ist eine …matrix | matrizen
LEMMA | Hilfssatz – im Skript nummeriert wie 1.30 | logik
KÜRZEN | Aus $ab = ac$ folgt $b = c$ – man darf … | gruppen
INVERTIERBAR | $A$ mit $AB = BA = E_m$ heisst … | matrizen
HOMOGEN | Ein LGS $Ax = b$ mit $b = 0$ heisst … | gauss
LÖSUNG | $x$ mit $Ax = b$ | gauss
EINHEIT | $E_m$ heisst …smatrix | matrizen
SURJEKTIV | Jedes $n \in N$ ist Bildpunkt | mengen
TEILMENGE | $A \subset M$ | mengen
ASSOZIATIV | $(ab)c = a(bc)$ | gruppen
`;
