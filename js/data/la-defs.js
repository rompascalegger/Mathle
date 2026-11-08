/*
 * Karteikarten Lineare Algebra I: Definitionen (D) und Formeln/Sätze (F).
 * Format:  D Begriff :: Definition @ Quelle
 *          F Name :: Formel/Aussage @ Quelle
 * Die Definition darf den Begriff selbst nicht verraten (wird auch als Quiz "Welcher Begriff?" genutzt).
 * Neue Karten am Ende eines Kapitels einfügen.
 */
window.MATHLE = window.MATHLE || {};
MATHLE.raw = MATHLE.raw || {};

/* Karten, die sich inhaltlich (fast) decken: werden nie als Falsch-Option füreinander verwendet. */
MATHLE.similarCards = [
  ['Bildbereich', 'Bild $\\mathrm{Bild}(f)$'],
  ['Inverses eines Produkts', 'Inverses eines Matrixprodukts'],
  ['Endliche Menge', 'Kardinalität $\\#M$'],
  ['Determinante $2 \\times 2$', 'Invertierbarkeit $2 \\times 2$', 'Inverse einer $2\\times 2$-Matrix'],
  ['Gruppe', 'Abelsche Gruppe', 'Triviale Gruppe'],
  ['Ring', 'Kommutativer Ring', 'Körper'],
  ['Kern $\\mathrm{Ker}(f)$', 'Injektivitätskriterium', 'Normalteiler'],
  ['Pivoteintrag', 'Zeilenstufenform'],
  ['Rechtsinverses von $A$', 'Linksinverses von $A$', 'Invertierbare Matrix'],
  ['Kontraposition von $P \\Rightarrow Q$', 'Implikation $P \\Rightarrow Q$', 'Negation der Implikation'],
  ['De Morgan (und)', 'De Morgan (oder)', 'Komplement der Vereinigung'],
  ['Gausssche Summenformel', 'Summe der Kuben'],
  ['Inverse per Gauss', 'Inverse der Elementarmatrizen'],
  ['Nullteilerfreiheit im Körper', 'Körper'],
  ['Gruppenhomomorphismus', 'Gruppenisomorphismus', 'Homomorphismus erhält $e$ und Inverse'],
  ['Lösbarkeitskriterium', 'Freie Variablen']
];

MATHLE.raw.laDefs = String.raw`
# logik
D Implikation $P \Rightarrow Q$ :: gleichbedeutend mit „$P$ ist falsch oder $Q$ ist wahr", also $(\neg P) \lor Q$ @ Skript 1.1
D Kontraposition von $P \Rightarrow Q$ :: die Aussage $(\neg Q) \Rightarrow (\neg P)$ – äquivalent zur ursprünglichen Implikation @ Skript 1.1
F Negation der Implikation :: $\neg(P \Rightarrow Q) \Leftrightarrow P \land (\neg Q)$ @ Skript 1.1
F De Morgan (und) :: $\neg(P \land Q) \Leftrightarrow (\neg P) \lor (\neg Q)$ @ Skript 1.1
F De Morgan (oder) :: $\neg(P \lor Q) \Leftrightarrow (\neg P) \land (\neg Q)$ @ Skript 1.1
F Doppelte Negation :: $\neg(\neg P) \Leftrightarrow P$ @ Skript 1.1
D Induktionsverankerung :: Nachweis der Aussage für den kleinsten Wert (z.B. $n = 1$ oder $n = 0$) @ Skript 1.1
D Induktionsschritt :: Unter der Annahme, dass die Aussage für $n-1$ gilt, zeigt man sie für $n$ @ Skript 1.1
D Widerspruchsbeweis :: Man nimmt die Negation der Behauptung an und leitet einen Widerspruch her @ Lemma 1.5
F Gausssche Summenformel :: $1 + 2 + \dots + n = \frac{n(n+1)}{2}$ @ Lemma 1.1
F Summe der Kuben :: $1^3 + \dots + n^3 = (1 + \dots + n)^2 = \frac{n^2(n+1)^2}{4}$ @ Serie 1, E4
D Gerade Zahl :: ganze Zahl der Form $2n$ mit $n \in \mathbb{Z}$ @ Def. 1.3
D Leere Summe :: per Konvention gleich $0$, dem neutralen Element der Addition @ Skript 1.1

# mengen
D Vereinigung $M \cup N$ :: $\{m : m \in M \text{ oder } m \in N\}$ @ Def. 1.9
D Schnittmenge $M \cap N$ :: $\{m : m \in M \text{ und } m \in N\}$ @ Def. 1.9
D Disjunkt :: zwei Mengen mit $M \cap N = \emptyset$ @ Def. 1.9
D Kartesisches Produkt $M \times N$ :: $\{(m, n) : m \in M \text{ und } n \in N\}$ @ Def. 1.11
D Abbildung $f: M \to N$ :: Teilmenge $\Gamma \subset M \times N$, so dass es zu jedem $m \in M$ genau ein $n \in N$ mit $(m,n) \in \Gamma$ gibt @ Def. 1.14
D Bildbereich :: $f(M) = \{f(m) : m \in M\}$ @ Def. 1.16
D Surjektiv :: zu jedem $n \in N$ gibt es (mindestens) ein $m \in M$ mit $f(m) = n$ @ Def. 1.19
D Injektiv :: $f(m) = f(m') \Rightarrow m = m'$ für alle $m, m' \in M$ @ Def. 1.19
D Bijektiv :: injektiv und surjektiv zugleich @ Def. 1.19
D Umkehrabbildung $f^{-1}$ :: für bijektives $f$: ordnet jedem $n \in N$ das eindeutige $m$ mit $f(m) = n$ zu @ Bem. 1.20(iii)
D Verkettung $g \circ f$ :: $(g \circ f)(m) = g(f(m))$ – zuerst $f$, dann $g$ @ Achtung 1.21
D Identitätsabbildung :: $\mathrm{id}_M: M \to M$, $m \mapsto m$ @ Def. 1.23
D Endliche Menge :: es gibt $n \ge 0$ und eine Bijektion $M \to \{1, \dots, n\}$ @ Def. 1.25
D Kardinalität $\#M$ :: die eindeutige Zahl $n$ mit einer Bijektion $M \to \{1, \dots, n\}$ @ Def. 1.25
F Anzahl Abbildungen :: $\#\mathrm{Abb}(M, N) = \#N^{\#M}$, daher $N^M$ @ Serie 2, E3
F Anzahl Teilmengen :: $\#\mathcal{P}(M) = 2^{\#M}$ @ Serie 1, S2
F Komplement der Vereinigung :: $M \setminus (A \cup B) = (M \setminus A) \cap (M \setminus B)$ @ Serie 1, E1
D Symmetrische Differenz $A \triangle B$ :: $(A \cup B) \setminus (A \cap B)$ @ Serie 3, E2

# gruppen
D Gruppe :: Tupel $(G, e, m)$ mit $m: G \times G \to G$, das (A), (N) und (I) erfüllt @ Def. 1.26
D Axiom (A) :: $m(m(a,b),c) = m(a, m(b,c))$ für alle $a, b, c \in G$ @ Def. 1.26
D Axiom (N) :: $m(e, a) = a$ für alle $a \in G$ @ Def. 1.26
D Axiom (I) :: zu jedem $a \in G$ gibt es $a'$ mit $m(a', a) = e$ @ Def. 1.26
D Abelsche Gruppe :: Gruppe mit $m(a,b) = m(b,a)$ für alle $a, b$ @ Def. 1.26
D Triviale Gruppe :: die Gruppe $\{e\}$ mit nur einem Element @ Bsp. 1.27(iv)
D Symmetrische Gruppe $S_M$ :: alle bijektiven Abbildungen $M \to M$ mit der Verkettung, neutral: $\mathrm{id}_M$ @ Bsp. 1.29(iii)
F Kürzungsregel :: $ab = ac \Rightarrow b = c$ und $ba = ca \Rightarrow b = c$ @ Lemma 1.30(ii)
F Inverses eines Produkts :: $(ab)^{-1} = b^{-1}a^{-1}$ @ Serie 4, E3
D Gruppenhomomorphismus :: $f: G \to H$ mit $f(g_1 g_2) = f(g_1) f(g_2)$ für alle $g_1, g_2 \in G$ @ Def. 1.34
D Gruppenisomorphismus :: bijektiver Gruppenhomomorphismus @ Def. 1.34
F Homomorphismus erhält $e$ und Inverse :: $f(e_G) = e_H$ und $f(a^{-1}) = f(a)^{-1}$ @ Lemma 1.36
D Kern $\mathrm{Ker}(f)$ :: $f^{-1}(e_H) = \{a \in G : f(a) = e_H\}$ @ Def. 1.37
D Bild $\mathrm{Bild}(f)$ :: $\{f(g) : g \in G\}$ @ Def. 1.37
F Injektivitätskriterium :: $f$ injektiv $\Leftrightarrow \mathrm{Ker}(f) = \{e_G\}$ @ Lemma 1.39
D Untergruppe :: $H \subset G$ mit $e \in H$, $ab \in H$ und $a^{-1} \in H$ für alle $a, b \in H$ @ Def. 1.40
D Normalteiler :: Untergruppe, die Kern eines Gruppenhomomorphismus ist @ Skript 1.3

# ringe
D Ring :: $(R, 0, +, 1, \cdot)$: $(R,0,+)$ abelsche Gruppe, $\cdot$ assoziativ, $1a = a1 = a$, Distributivgesetze @ Def. 1.44
D Kommutativer Ring :: Ring mit $ab = ba$ für alle $a, b$ @ Def. 1.44(v)
D Distributivgesetz :: $a(b+c) = ab + ac$ und $(b+c)a = ba + ca$ @ Def. 1.44(iv)
D Nullring :: der Ring $\{0\}$, in dem $1 = 0$ gilt @ Bsp. 1.47(ii)
D Körper :: kommutativer Ring mit $0 \ne 1$, in dem jedes $a \ne 0$ ein multiplikatives Inverses hat @ Def. 1.49
F Null mal irgendwas :: $0 \cdot a = a \cdot 0 = 0$ in jedem Ring @ Lemma 1.48(i)
F Vorzeichenregel :: $-a = (-1)a$ und $(-1)(-1) = 1$ @ Lemma 1.48(ii)
F Nullteilerfreiheit im Körper :: $ab = 0 \Rightarrow a = 0$ oder $b = 0$ @ Lemma 1.50(i)
D Multiplikative Gruppe $K^\times$ :: $K \setminus \{0\}$ mit $1$ und der Multiplikation @ Lemma 1.50(ii)
D Polynomring $R[X]$ :: alle Ausdrücke $a_n X^n + \dots + a_1 X + a_0$ mit $a_i \in R$ @ Bsp. 1.47(iii)
D Grad $\deg(A)$ :: für $A = a_n X^n + \dots + a_0$ mit $a_n \ne 0$ die Zahl $n$ (für $0$ nicht definiert) @ Bsp. 1.47(iii)
F Gradformel :: $\deg(AB) = \deg A + \deg B$ für $A, B \ne 0$ über einem Körper @ Lemma 1.53
D Primzahl :: $p \in \mathbb{N}$ mit $p \ge 2$, das nur die Teiler $1$ und $p$ hat @ Def. 1.54
D Charakteristik :: kleinstes $n \in \mathbb{N}$ mit $n \cdot 1_K = 0$, bzw. $0$, falls es keines gibt @ Def. 1.57
F Endliche Körper :: haben genau $p^n$ Elemente ($p$ Primzahl, $n \in \mathbb{N}$) @ Bem. 1.55(ii)
F Freshman's Dream in Char. 2 :: $(x + y)^2 = x^2 + y^2$ @ Bsp. 1.58(iii)
D $\mathbb{F}_2$ :: Körper $\{0, 1\}$ mit $1 + 1 = 0$ @ Bsp. 1.52(iv)

# matrizen
D Matrix in $\mathrm{Mat}_{m,n}(K)$ :: rechteckiges Schema $(a_{i,j})$ mit $m$ Zeilen, $n$ Spalten und Einträgen in $K$ @ Def. 2.2
D Nullmatrix $0_{m,n}$ :: Matrix, deren Einträge alle $0$ sind @ Def. 2.5
D Einheitsmatrix $E_m$ :: $m \times m$-Matrix mit Einsen auf der Diagonale und Nullen sonst @ Def. 2.13
F Matrixprodukt :: $(AB)_{i,k} = \sum_{j=1}^{n} a_{i,j} b_{j,k}$ für $A \in \mathrm{Mat}_{m,n}$, $B \in \mathrm{Mat}_{n,p}$ @ Def. 2.14
F Format des Produkts :: $\mathrm{Mat}_{m,n} \cdot \mathrm{Mat}_{n,p} \subset \mathrm{Mat}_{m,p}$ @ Def. 2.14
D Zeilenvektor :: Element von $\mathrm{Mat}_{1,m}(K)$ @ Def. 2.17
D Spaltenvektor :: Element von $\mathrm{Mat}_{m,1}(K)$ @ Def. 2.17
F Verkettung = Produkt :: $f_A \circ f_B = f_{AB}$ mit $f_A(v) = Av$ @ Bem. 2.21
D Rechtsinverses von $A$ :: Matrix $B$ mit $AB = E_m$ @ Def. 2.22
D Linksinverses von $A$ :: Matrix $B$ mit $BA = E_n$ @ Def. 2.22
D Invertierbare Matrix :: es gibt $B$ mit $AB = E_m$ und $BA = E_n$ @ Def. 2.22
D Allgemeine lineare Gruppe $\mathrm{GL}_m(K)$ :: Gruppe der invertierbaren $m \times m$-Matrizen mit der Matrixmultiplikation @ Def. 2.26
F Inverses eines Matrixprodukts :: $(AB)^{-1} = B^{-1}A^{-1}$ @ Lemma 2.24
F Inverse einer $2\times 2$-Matrix :: $\begin{pmatrix}a&b\\c&d\end{pmatrix}^{-1} = \frac{1}{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}$ @ Lemma 2.27
F Invertierbarkeit $2 \times 2$ :: $A \in \mathrm{GL}_2(K) \Leftrightarrow ad - bc \ne 0$ @ Lemma 2.27
F Determinante $2 \times 2$ :: $\det\begin{pmatrix}a&b\\c&d\end{pmatrix} = ad - bc$ @ Serie 7, S4
F Multiplikativität von det :: $\det(AB) = \det(A)\det(B)$ @ Serie 7, S4
F Skalierung von det ($2\times2$) :: $\det(\lambda A) = \lambda^2 \det(A)$ @ Serie 8, S3
D Nilpotente Matrix :: $N$ mit $N^k = 0$ für ein $k \in \mathbb{N}$ @ Serie 7, S3
D Diagonalmatrix :: $\mathrm{diag}(x_1, \dots, x_m)$: Einträge ausserhalb der Diagonale sind $0$ @ Serie 7, S1
D Obere Dreiecksmatrix :: $a_{i,j} = 0$ für alle $i > j$ @ Serie 7, E1
F Binomische Formel für Matrizen :: $(A+B)^2 = A^2 + AB + BA + B^2$ @ Serie 6, E2
F $\#\mathrm{GL}_2(\mathbb{F}_2)$ :: $= 6$, und $\mathrm{GL}_2(\mathbb{F}_2) \cong S_3$ @ Serie 8, E4

# gauss
D Homogenes LGS :: $Ax = b$ mit $b = 0$ @ Def. 2.28
D Zeilenumformung Typ I :: ersetze Zeile $a_i$ durch $a_i + \lambda a_j$ mit $i \ne j$ @ Def. 2.31
D Zeilenumformung Typ II :: vertausche Zeilen $i$ und $j$ @ Def. 2.31
D Zeilenumformung Typ III :: ersetze Zeile $a_i$ durch $\lambda a_i$ mit $\lambda \ne 0$ @ Def. 2.31
F Inverse der Elementarmatrizen :: $E_I(i,j,\lambda)^{-1} = E_I(i,j,-\lambda)$, $E_{II}(i,j)^{-1} = E_{II}(i,j)$, $E_{III}(i,\lambda)^{-1} = E_{III}(i,\lambda^{-1})$ @ Lemma 2.35
F Produkt von $E_I$ :: $E_I(i,j,\lambda)E_I(i,j,\mu) = E_I(i,j,\lambda+\mu)$ @ Serie 8, E3
F Struktur der Lösungsmenge :: $\{x : Ax = b\} = \{\tilde x + h : Ah = 0\}$ für eine Lösung $\tilde x$ @ Lemma 2.37
D Pivoteintrag :: der erste Eintrag ungleich Null einer Zeile (in Zeilenstufenform gleich $1$) @ Def. 2.38
D Zeilenstufenform :: Pivots sind $1$, rücken nach rechts, Nullzeilen unten, über Pivots nur Nullen @ Def. 2.38
F Lösbarkeitskriterium :: $Ax = b$ ($A$ in ZSF, $r$ Nicht-Nullzeilen) lösbar $\Leftrightarrow b_{r+1} = \dots = b_m = 0$ @ Prop. 2.43
F Freie Variablen :: Anzahl Spalten ohne Pivot $= n - r$ @ Prop. 2.43
F Inverse per Gauss :: $(A \mid E_m) \rightsquigarrow (E_m \mid A^{-1})$ @ Serie 8, S2
`;
