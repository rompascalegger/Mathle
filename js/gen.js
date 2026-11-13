/*
 * Generatoren für "ähnliche Aufgaben" zu den Übungsblättern.
 * Jeder Generator liefert { q: Aufgabentext, a: Lösung } (HTML mit $...$-Mathe).
 * Rechenaufgaben werden mit zufälligen Parametern erzeugt und die Lösung wird exakt berechnet
 * (Brüche, Matrizen, Aufzählung). Beweis- und Wahr/Falsch-Aufgaben kommen aus geprüften Pools.
 */
(function () {
  'use strict';
  const M = (window.MATHLE = window.MATHLE || {});
  const T = String.raw;

  /* ---------- Hilfen ---------- */
  const rint = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const nz = (a, b) => { let x; do x = rint(a, b); while (x === 0); return x; };
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const sample = (a, n) => shuffle(a).slice(0, n);
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
  const fact = (n) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; };
  const binom = (n, k) => { if (k < 0 || k > n) return 0; let r = 1; for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i; return Math.round(r); };
  const lbinom = (n, k) => { let s = 0; for (let i = 1; i <= k; i++) s += Math.log(n - k + i) - Math.log(i); return s; };
  const fx = (x, d) => { const s = x.toFixed(d === undefined ? 4 : d); return s.includes('.') ? s.replace(/\.?0+$/, '') : s; };
  const sgn = (x) => { const v = Q.of(x); return v.n < 0 ? ' - ' + v.neg().tex() : ' + ' + v.tex(); }; // " + 3" bzw. " - 3"

  class Q {
    constructor(n, d) { d = d === undefined ? 1 : d; if (d < 0) { n = -n; d = -d; } const g = gcd(n, d); this.n = n / g; this.d = d / g; }
    static of(x) { return x instanceof Q ? x : new Q(x, 1); }
    add(o) { o = Q.of(o); return new Q(this.n * o.d + o.n * this.d, this.d * o.d); }
    sub(o) { o = Q.of(o); return new Q(this.n * o.d - o.n * this.d, this.d * o.d); }
    mul(o) { o = Q.of(o); return new Q(this.n * o.n, this.d * o.d); }
    div(o) { o = Q.of(o); return new Q(this.n * o.d, this.d * o.n); }
    neg() { return new Q(-this.n, this.d); }
    get zero() { return this.n === 0; }
    eq(o) { o = Q.of(o); return this.n === o.n && this.d === o.d; }
    val() { return this.n / this.d; }
    tex() { return this.d === 1 ? String(this.n) : (this.n < 0 ? '-' : '') + '\\frac{' + Math.abs(this.n) + '}{' + this.d + '}'; }
  }
  const q = (n, d) => new Q(n, d);
  const tx = (x) => Q.of(x).tex();
  const mtex = (A) => '\\begin{pmatrix}' + A.map((r) => r.map(tx).join('&')).join('\\\\') + '\\end{pmatrix}';
  const mmul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s.add(Q.of(x).mul(B[k][j])), q(0))));
  const madd = (A, B) => A.map((r, i) => r.map((x, j) => Q.of(x).add(B[i][j])));
  const msc = (c, A) => A.map((r) => r.map((x) => Q.of(x).mul(c)));
  const ident = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => q(i === j ? 1 : 0)));
  const meq = (A, B) => A.every((r, i) => r.every((x, j) => Q.of(x).eq(B[i][j])));
  const rmat = (m, n, a, b) => Array.from({ length: m }, () => Array.from({ length: n }, () => rint(a, b)));
  function rref(A) {
    const M2 = A.map((r) => r.map((x) => Q.of(x))); const piv = []; let r = 0;
    for (let c = 0; c < M2[0].length && r < M2.length; c++) {
      let p = -1; for (let i = r; i < M2.length; i++) if (!M2[i][c].zero) { p = i; break; }
      if (p < 0) continue;
      [M2[r], M2[p]] = [M2[p], M2[r]];
      const inv = q(1).div(M2[r][c]); M2[r] = M2[r].map((x) => x.mul(inv));
      for (let i = 0; i < M2.length; i++) if (i !== r && !M2[i][c].zero) { const f = M2[i][c]; M2[i] = M2[i].map((x, j) => x.sub(f.mul(M2[r][j]))); }
      piv.push(c); r++;
    }
    return { R: M2, piv };
  }
  const det2 = (A) => Q.of(A[0][0]).mul(A[1][1]).sub(Q.of(A[0][1]).mul(A[1][0]));
  function polyTex(c) { // c: Koeffizienten von hoch nach tief
    const n = c.length - 1; let s = '';
    c.forEach((a, i) => {
      const e = n - i; if (a === 0) return;
      const sign = a < 0 ? ' - ' : s ? ' + ' : ''; const ab = Math.abs(a);
      const coef = ab === 1 && e > 0 ? '' : String(ab);
      s += (s ? sign : a < 0 ? '-' : '') + coef + (e > 1 ? 'X^{' + e + '}' : e === 1 ? 'X' : '');
    });
    return s || '0';
  }
  const pmul = (a, b) => { const r = Array(a.length + b.length - 1).fill(0); a.forEach((x, i) => b.forEach((y, j) => { r[i + j] += x * y; })); return r; };
  const ctex = (re, im) => { // komplexe Zahl aus Q
    re = Q.of(re); im = Q.of(im);
    if (im.zero) return re.tex();
    const imAbs = im.n < 0 ? im.neg() : im; const it = imAbs.eq(1) ? 'i' : imAbs.tex() + 'i';
    if (re.zero) return (im.n < 0 ? '-' : '') + it;
    return re.tex() + (im.n < 0 ? ' - ' : ' + ') + it;
  };
  const ol = (items) => '<ol class="gen-list">' + items.map((x) => '<li>' + x + '</li>').join('') + '</ol>';

  /* ---------- Beweis-Pools (geprüfte Aussagen mit Beweisidee) ---------- */
  const PROOFS = {
    sets: [
      [T`Zeige $A \cap (B \cup C) = (A \cap B) \cup (A \cap C)$.`, T`Elementweise: beide Inklusionen per Fallunterscheidung $x \in B$ oder $x \in C$.`],
      [T`Zeige für $A, B \subseteq M$: $M \setminus (A \cup B) = (M \setminus A) \cap (M \setminus B)$.`, T`De Morgan für Mengen: $x \notin A \cup B \Leftrightarrow x \notin A$ und $x \notin B$.`],
      [T`Zeige $A \setminus (B \cap C) = (A \setminus B) \cup (A \setminus C)$.`, T`$x \notin B \cap C \Leftrightarrow x \notin B$ oder $x \notin C$.`],
      [T`Zeige $A \triangle B = (A \setminus B) \cup (B \setminus A)$.`, T`Elemente in $A \cup B$, aber nicht in beiden – genau die in genau einer Menge.`],
      [T`Zeige für $A \subseteq M$: $A \triangle M = M \setminus A$.`, T`$A \cup M = M$ und $A \cap M = A$.`],
      [T`Zeige $A \cap (B \triangle C) = (A \cap B) \triangle (A \cap C)$.`, T`Für $x \in A$ entscheidet nur, ob $x$ in genau einer von $B, C$ liegt; für $x \notin A$ liegen beide Seiten nicht vor.`],
      [T`Zeige $(A \triangle B) \triangle B = A$.`, T`Assoziativität von $\triangle$ und $B \triangle B = \emptyset$.`]
    ],
    images: [
      [T`Für $f: M \to N$ und $C, D \subseteq N$ zeige $f^{-1}(C \cap D) = f^{-1}(C) \cap f^{-1}(D)$.`, T`Urbilder vertragen sich mit Schnitt und Vereinigung – direkt aus der Definition.`],
      [T`Zeige $f^{-1}(C \cup D) = f^{-1}(C) \cup f^{-1}(D)$.`, T`$f(x) \in C \cup D \Leftrightarrow f(x) \in C$ oder $f(x) \in D$.`],
      [T`Zeige $A \subseteq f^{-1}(f(A))$ und finde ein Beispiel mit echter Inklusion.`, T`Gleichheit gilt für injektives $f$; Gegenbeispiel: konstante Abbildung.`],
      [T`Zeige $f(f^{-1}(C)) \subseteq C$, mit Gleichheit falls $f$ surjektiv ist.`, T`Jedes $y \in C$ hat bei surjektivem $f$ ein Urbild.`],
      [T`Zeige $f(A \cup B) = f(A) \cup f(B)$ (beide Inklusionen).`, T`Ein Bildpunkt stammt aus $A$ oder aus $B$.`],
      [T`Zeige $f(A) \setminus f(B) \subseteq f(A \setminus B)$.`, T`Ist $y = f(a)$ mit $a \in A$ und $y \notin f(B)$, so ist $a \notin B$.`]
    ],
    maps: [
      [T`Ist $g \circ f$ injektiv, so ist $f$ injektiv.`, T`Aus $f(x) = f(y)$ folgt $g(f(x)) = g(f(y))$, also $x = y$.`],
      [T`Ist $g \circ f$ surjektiv, so ist $g$ surjektiv.`, T`Jedes $z$ ist $g(f(x))$ für ein $x$, also ein Bild von $g$.`],
      [T`Sind $f$ und $g$ bijektiv, so ist $g \circ f$ bijektiv mit $(g \circ f)^{-1} = f^{-1} \circ g^{-1}$.`, T`Nachrechnen, dass $f^{-1} \circ g^{-1}$ beidseitig invers ist.`],
      [T`Ist $M$ endlich und $f: M \to M$ injektiv, so ist $f$ surjektiv.`, T`Das Bild hat $\#M$ Elemente und liegt in $M$.`],
      [T`Zeige: Eine Abbildung $f: \mathbb{N} \to \mathbb{N}$ kann injektiv sein, ohne surjektiv zu sein.`, T`Beispiel $f(n) = n + 1$.`],
      [T`Ist $f: M \to N$ bijektiv, so ist $f^{-1}$ bijektiv.`, T`$f$ ist Umkehrabbildung von $f^{-1}$.`]
    ],
    countable: [
      [T`Zeige: $\mathbb{N} \times \mathbb{N}$ ist abzählbar.`, T`Diagonal abzählen, z.B. $(m, n) \mapsto \frac{(m+n)(m+n+1)}{2} + n$ für $m, n \ge 0$.`],
      [T`Zeige: Eine abzählbare Vereinigung abzählbarer Mengen ist abzählbar.`, T`Elemente in einem Schema $a_{ij}$ anordnen und diagonal abzählen (Doppelte weglassen).`],
      [T`Zeige: Die Menge aller endlichen Folgen in $\{0, 1\}$ ist abzählbar.`, T`Nach Länge sortieren: für jede Länge nur endlich viele Folgen.`],
      [T`Zeige: Die Menge aller unendlichen 0-1-Folgen ist überabzählbar.`, T`Diagonalargument: Kippe die $n$-te Stelle der $n$-ten Folge.`],
      [T`Zeige: Es gibt keine surjektive Abbildung $M \to \mathcal{P}(M)$.`, T`Für $g: M \to \mathcal{P}(M)$ liegt $\{x : x \notin g(x)\}$ nicht im Bild.`],
      [T`Zeige: Die Menge der rationalen Zahlen in $[0, 1]$ ist abzählbar, die der irrationalen nicht.`, T`Teilmenge von $\mathbb{Q}$; wäre der Rest abzählbar, so wäre $[0, 1]$ abzählbar.`]
    ],
    groups: [
      [T`Zeige in jeder Gruppe $(a^{-1})^{-1} = a$.`, T`$a$ erfüllt die definierende Gleichung des Inversen von $a^{-1}$; Eindeutigkeit des Inversen.`],
      [T`Gilt $(ab)^2 = a^2b^2$ für alle $a, b$, so ist die Gruppe abelsch.`, T`$abab = aabb$; links mit $a^{-1}$, rechts mit $b^{-1}$ kürzen: $ba = ab$.`],
      [T`Der Kern eines Gruppenhomomorphismus ist eine Untergruppe.`, T`$f(e) = e$, $f(ab) = f(a)f(b) = e$, $f(a^{-1}) = f(a)^{-1} = e$.`],
      [T`Das Bild eines Gruppenhomomorphismus ist eine Untergruppe.`, T`$f(a)f(b) = f(ab)$ und $f(a)^{-1} = f(a^{-1})$.`],
      [T`Der Durchschnitt zweier Untergruppen ist eine Untergruppe.`, T`Alle drei Bedingungen gelten in beiden Untergruppen.`],
      [T`Die Verkettung zweier Gruppenhomomorphismen ist ein Gruppenhomomorphismus.`, T`$g(f(ab)) = g(f(a)f(b)) = g(f(a))g(f(b))$.`],
      [T`Ein Gruppenhomomorphismus ist genau dann injektiv, wenn sein Kern $\{e\}$ ist.`, T`„⇐": $f(a) = f(b) \Rightarrow f(b^{-1}a) = e$.`],
      [T`In einer Gruppe hat die Gleichung $ax = b$ genau eine Lösung $x$.`, T`$x = a^{-1}b$; Eindeutigkeit durch Kürzen.`],
      [T`In einer Gruppe mit gerader Elementanzahl gibt es ein $a \ne e$ mit $a^2 = e$.`, T`Paare $\{a, a^{-1}\}$ mit $a \ne a^{-1}$ bilden; es bleibt eine gerade Anzahl selbstinverser Elemente, darunter $e$.`]
    ],
    rings: [
      [T`Zeige in jedem Ring $(-a)(-b) = ab$.`, T`$(-a)(-b) = (-1)a(-1)b$ und $(-1)(-1) = 1$ (Lemma 1.48).`],
      [T`Zeige: In einem Körper hat $ax = b$ für $a \ne 0$ genau eine Lösung.`, T`$x = a^{-1}b$.`],
      [T`Zeige: $\mathbb{Z}[i] = \{a + bi : a, b \in \mathbb{Z}\}$ ist ein kommutativer Ring, aber kein Körper.`, T`Abgeschlossenheit nachrechnen; $2$ hat kein Inverses.`],
      [T`Zeige: Ein Körper hat keine Nullteiler.`, T`Aus $ab = 0$ und $a \ne 0$ folgt $b = a^{-1}ab = 0$.`],
      [T`Zeige: In einem Ring mit $1 = 0$ gilt $a = 0$ für alle $a$.`, T`$a = 1 \cdot a = 0 \cdot a = 0$.`],
      [T`Zeige: Im Polynomring $R[X]$ gilt das Assoziativgesetz der Multiplikation.`, T`Koeffizient von $X^k$ in $(AB)C$ und $A(BC)$ ist jeweils $\sum_{i+j+l=k} a_ib_jc_l$.`]
    ],
    matrices: [
      [T`Sind $A, B$ untere Dreiecksmatrizen, so auch $AB$.`, T`Für $i < j$ verschwindet jeder Summand $a_{ik}b_{kj}$.`],
      [T`Zeige $(AB)^{-1} = B^{-1}A^{-1}$ für invertierbare $A, B$.`, T`Beidseitig nachrechnen.`],
      [T`Ist $N$ nilpotent, so ist $E - N$ invertierbar.`, T`$(E - N)(E + N + \dots + N^{k-1}) = E - N^k = E$.`],
      [T`Kommutiert $A \in \mathrm{Mat}_2(K)$ mit allen $2 \times 2$-Matrizen, so ist $A = aE_2$.`, T`Mit den Matrizen $E_{11}, E_{12}$ (eine Eins, sonst Null) vergleichen.`],
      [T`Die invertierbaren oberen Dreiecksmatrizen bilden eine Untergruppe von $\mathrm{GL}_m(K)$.`, T`Produkt bleibt obere Dreiecksmatrix; Inverse per Rückwärtseinsetzen ebenfalls.`],
      [T`Ist $A^2 = A$ und $A$ invertierbar, so ist $A = E$.`, T`Mit $A^{-1}$ multiplizieren.`],
      [T`Zeige: Hat $A$ eine Nullzeile, so ist $A$ nicht invertierbar.`, T`$AB$ hätte für jedes $B$ eine Nullzeile.`]
    ],
    abs: [
      [T`Zeige $\max(x, y) = \frac{x + y + |x - y|}{2}$ für $x, y \in \mathbb{R}$.`, T`Fallunterscheidung $x \ge y$ und $x \lt y$.`],
      [T`Zeige $\min(x, y) = \frac{x + y - |x - y|}{2}$.`, T`Fallunterscheidung wie beim Maximum.`],
      [T`Zeige $|x + y| + |x - y| = 2\max(|x|, |y|)$.`, T`O.B.d.A. $|x| \ge |y|$; dann $x \pm y$ haben das Vorzeichen von $x$.`],
      [T`Zeige $\big||x| - |y|\big| \le |x - y|$.`, T`Dreiecksungleichung auf $x = (x - y) + y$ und $y = (y - x) + x$.`],
      [T`Zeige $|x + y + z| \le |x| + |y| + |z|$.`, T`Zweimal die Dreiecksungleichung.`]
    ],
    complex: [
      [T`Zeige $|z + w|^2 = |z|^2 + |w|^2 + 2\,\mathrm{Re}(z\bar w)$.`, T`$|u|^2 = u\bar u$ ausmultiplizieren.`],
      [T`Zeige $\overline{zw} = \bar z\, \bar w$ und $\overline{z + w} = \bar z + \bar w$.`, T`Mit $z = x + iy$, $w = u + iv$ ausrechnen.`],
      [T`Zeige $|\mathrm{Re}\, z| \le |z|$ und $|\mathrm{Im}\, z| \le |z|$.`, T`$x^2 \le x^2 + y^2$.`],
      [T`Zeige $|z - w|^2 + |z + w|^2 = 2|z|^2 + 2|w|^2$.`, T`Die Terme $\pm 2\mathrm{Re}(z\bar w)$ heben sich auf.`],
      [T`Zeige: $|z| = 1 \Rightarrow z^{-1} = \bar z$.`, T`$z\bar z = |z|^2 = 1$.`]
    ],
    sequences: [
      [T`Zeige: Aus $a_n \to a$ folgt $|a_n| \to |a|$. Gilt die Umkehrung?`, T`$\big||a_n| - |a|\big| \le |a_n - a|$. Umkehrung falsch: $a_n = (-1)^n$.`],
      [T`Zeige: Aus $a_n \to a$ und $b_n \to b$ folgt $a_nb_n \to ab$.`, T`$a_nb_n - ab = a_n(b_n - b) + b(a_n - a)$, konvergente Folgen sind beschränkt.`],
      [T`Zeige: Jede Cauchy-Folge ist beschränkt.`, T`Mit $\varepsilon = 1$: ab $N$ gilt $|a_n| \le |a_{N+1}| + 1$.`],
      [T`Zeige: Aus $a_n \to a$ folgt $\frac{a_1 + \dots + a_n}{n} \to a$; die Umkehrung gilt nicht.`, T`Summe aufteilen in die ersten $N$ Glieder und den Rest; Gegenbeispiel $(-1)^n$.`],
      [T`Zeige: Konvergiert $(a_{2n})$ und $(a_{2n+1})$ gegen denselben Grenzwert, so konvergiert $(a_n)$.`, T`Zu $\varepsilon$ ein gemeinsames $N$ für beide Teilfolgen wählen.`],
      [T`Zeige: $\limsup a_n = L \in \mathbb{R}$ genau dann, wenn für jedes $\varepsilon \gt 0$ fast alle $a_n \lt L + \varepsilon$ sind und eine Teilfolge gegen $L$ konvergiert.`, T`Über die Definition als grösster Häufungswert.`],
      [T`Zeige: Jede reelle Folge besitzt eine monotone Teilfolge.`, T`Gipfelstellen betrachten: unendlich viele ⇒ fallende Teilfolge, sonst wachsende.`]
    ],
    series: [
      [T`Zeige: Konvergiert $\sum |a_k|$, so konvergiert $\sum a_k$.`, T`Cauchy-Kriterium mit der Dreiecksungleichung.`],
      [T`Zeige: Konvergieren $\sum a_k$ und $\sum b_k$, so auch $\sum (a_k + b_k)$ mit Summe $\sum a_k + \sum b_k$.`, T`Partialsummen addieren.`],
      [T`Zeige: Ändert man endlich viele Glieder einer Reihe, ändert sich ihr Konvergenzverhalten nicht.`, T`Partialsummen unterscheiden sich ab einem Index um eine Konstante.`],
      [T`Zeige: $\sum_{k \ge 1} \frac{1}{k^2}$ konvergiert.`, T`Majorante $\frac{1}{k(k-1)}$ für $k \ge 2$ (teleskopisch).`],
      [T`Zeige: Ist $a_k \ge 0$ und $\sum a_k$ konvergent, so konvergiert auch $\sum a_k^2$.`, T`Fast alle $a_k \le 1$, also $a_k^2 \le a_k$.`]
    ],
    continuity: [
      [T`Zeige: $f(x) = \big|2 - |x|\big|$ ist stetig auf $\mathbb{R}$.`, T`Verkettung und Differenz stetiger Funktionen.`],
      [T`Zeige: Die Funktion $f(x) = 1$ für $x \in \mathbb{Q}$, $0$ sonst, ist nirgends stetig.`, T`In jeder Umgebung liegen rationale und irrationale Punkte.`],
      [T`Zeige: $f(x) = x$ für $x \in \mathbb{Q}$, $0$ sonst, ist genau in $x = 0$ stetig.`, T`In $0$: $|f(x)| \le |x|$. Sonst Folgen aus $\mathbb{Q}$ bzw. $\mathbb{R}\setminus\mathbb{Q}$.`],
      [T`Ist $f: \mathbb{R} \to \mathbb{R}$ additiv und stetig in $0$, so ist $f(x) = cx$ mit $c = f(1)$.`, T`Erst $f(n) = nc$, dann $f(p/q) = \frac pq c$, dann Stetigkeit.`],
      [T`Ist $f: [a, b] \to \mathbb{R}$ stetig und injektiv, so ist $f$ streng monoton.`, T`Sonst gibt es $x \lt y \lt z$ mit $f(y)$ ausserhalb von $[f(x), f(z)]$; Zwischenwertsatz liefert zwei gleiche Werte.`],
      [T`Zeige: Jedes Polynom ungeraden Grades hat eine reelle Nullstelle.`, T`Grenzwerte $\pm\infty$ für $x \to \pm\infty$, dann Zwischenwertsatz.`],
      [T`Zeige: $f(x) = \frac1x$ ist auf $(0, 1)$ stetig, aber nicht gleichmässig stetig.`, T`Punkte $\frac1n$ und $\frac{1}{n+1}$ liegen nah, ihre Bilder haben Abstand 1.`]
    ],
    closed: [
      [T`Finde abgeschlossene $A, B \subset \mathbb{R}$, so dass $A + B$ nicht abgeschlossen ist.`, T`$A = \mathbb{N}$, $B = \{-n + \frac1n : n \ge 2\}$: $\frac1n \in A + B$, aber $0 \notin A + B$.`],
      [T`Zeige: Ist $A$ kompakt und $B$ abgeschlossen, so ist $A + B$ abgeschlossen.`, T`Teilfolge in $A$ konvergiert (Bolzano-Weierstrass), Rest in $B$.`],
      [T`Zeige: Ist $A$ kompakt und $B$ kompakt, so ist $A + B$ kompakt.`, T`Beschränkt und – nach der vorigen Aussage – abgeschlossen.`],
      [T`Zeige: Der Schnitt beliebig vieler abgeschlossener Mengen ist abgeschlossen.`, T`Grenzwert einer Folge liegt in jeder der Mengen.`],
      [T`Zeige: $\{x \in \mathbb{R} : x^3 - x \le 1\}$ ist abgeschlossen.`, T`Urbild einer abgeschlossenen Menge unter einer stetigen Funktion (Lemma S. 85).`]
    ],
    prob: [
      [T`Zeige $P(A \cup B \cup C) \le P(A) + P(B) + P(C)$.`, T`Disjunkt machen: $A$, $B \setminus A$, $C \setminus (A \cup B)$, dann Monotonie.`],
      [T`Zeige für fallende Ereignisse $A_1 \supset A_2 \supset \dots$: $P(\bigcap A_i) = \lim P(A_n)$.`, T`Komplemente wachsen; Stetigkeit von unten (Satz 4.14).`],
      [T`Sind $A, B$ unabhängig, so auch $A^c$ und $B^c$.`, T`$P(A^c \cap B^c) = 1 - P(A) - P(B) + P(A)P(B) = (1 - P(A))(1 - P(B))$.`],
      [T`Zeige $P(A \cap B) \ge P(A) + P(B) - 1$.`, T`Aus $P(A \cup B) \le 1$ und dem Additionssatz.`],
      [T`Zeige: Ist $T$ geometrisch verteilt, so gilt $P(T \gt m + k \mid T \gt m) = P(T \gt k)$.`, T`$P(T \gt j) = (1-p)^j$.`],
      [T`Zeige $\mathrm{Var}(X) = E(X^2) - (EX)^2$.`, T`Linearität des Erwartungswerts auf $(X - EX)^2$ anwenden.`],
      [T`Zeige $\mathrm{Cov}(aX + b, cY + d) = ac\,\mathrm{Cov}(X, Y)$.`, T`Konstanten fallen beim Zentrieren weg.`],
      [T`Zeige: Diskrete $X, Y$ sind genau dann unabhängig, wenn $P(X = x, Y = y) = P(X = x)P(Y = y)$ für alle $x, y$.`, T`„⇐": Für Intervalle über die Werte summieren.`],
      [T`Zeige: Sind $X \sim \mathrm{Pois}(\lambda)$, $Y \sim \mathrm{Pois}(\mu)$ unabhängig, so ist $X + Y \sim \mathrm{Pois}(\lambda + \mu)$.`, T`Faltung und binomischer Lehrsatz.`],
      [T`Zeige für die Schiefe $E\left(\frac{X - \mu}{\sigma}\right)^3 = \frac{E(X^3) - 3\mu\sigma^2 - \mu^3}{\sigma^3}$.`, T`$(X - \mu)^3$ ausmultiplizieren und $E(X^2) = \sigma^2 + \mu^2$ verwenden.`]
    ],
    binom: [
      [T`Zeige kombinatorisch: $\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$.`, T`Enthält die Teilmenge das Element $n$ oder nicht?`],
      [T`Zeige kombinatorisch: $\sum_{k=0}^n \binom{n}{k}^2 = \binom{2n}{n}$.`, T`Aus $n$ roten und $n$ blauen Kugeln $n$ ziehen; $\binom nk = \binom{n}{n-k}$.`],
      [T`Zeige kombinatorisch: $\sum_{j=1}^n j\binom{n}{j} = n\,2^{n-1}$.`, T`Komitee mit Präsident: erst Präsident, dann beliebige Teilmenge der übrigen.`],
      [T`Zeige: $\sum_{k=0}^n \binom nk = 2^n$.`, T`Alle Teilmengen nach Grösse sortiert zählen.`],
      [T`Zeige: $\binom{n}{k} = \sum_{j=k}^n \binom{j-1}{k-1}$.`, T`Nach dem grössten Element $j$ der Teilmenge sortieren.`]
    ]
  };
  function proof(pool) {
    return () => { const [s, h] = pick(PROOFS[pool]); return { q: s, a: '<b>Beweisidee:</b> ' + h }; };
  }

  /* ---------- Fragenbank (Wahr/Falsch aus dem Spiel) ---------- */
  function bank(ch) {
    return (ctx) => {
      const chap = ctx.chapter(ch); const tfs = chap ? chap.questions.filter((x) => x.type === 'tf') : [];
      const items = sample(tfs, Math.min(5, tfs.length));
      return {
        q: 'Welche Aussagen sind wahr, welche falsch? Begründe jeweils kurz.' + ol(items.map((x) => x.q)),
        a: ol(items.map((x) => '<b>' + (x.answer === 'wahr' ? 'Wahr' : 'Falsch') + '.</b> ' + x.explain))
      };
    };
  }

  /* ---------- Induktion ---------- */
  const IND = [
    { s: T`\sum_{k=1}^n (2k - 1) = n^2`, n0: 1, c: (n) => { let s = 0; for (let k = 1; k <= n; k++) s += 2 * k - 1; return s === n * n; } },
    { s: T`\sum_{k=1}^n k = \frac{n(n+1)}{2}`, n0: 1, c: (n) => n * (n + 1) / 2 === n * (n + 1) / 2 && Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a + b, 0) === n * (n + 1) / 2 },
    { s: T`\sum_{k=1}^n k^2 = \frac{n(n+1)(2n+1)}{6}`, n0: 1, c: (n) => { let s = 0; for (let k = 1; k <= n; k++) s += k * k; return s * 6 === n * (n + 1) * (2 * n + 1); } },
    { s: T`\sum_{k=1}^n k^3 = \left(\frac{n(n+1)}{2}\right)^2`, n0: 0, c: (n) => { let s = 0; for (let k = 1; k <= n; k++) s += k ** 3; return s * 4 === (n * (n + 1)) ** 2; } },
    { s: T`\sum_{k=1}^n k(k+1) = \frac{n(n+1)(n+2)}{3}`, n0: 1, c: (n) => { let s = 0; for (let k = 1; k <= n; k++) s += k * (k + 1); return 3 * s === n * (n + 1) * (n + 2); } },
    { s: T`\sum_{k=1}^n \frac{1}{k(k+1)} = \frac{n}{n+1}`, n0: 1, c: (n) => { let s = q(0); for (let k = 1; k <= n; k++) s = s.add(q(1, k * (k + 1))); return s.eq(q(n, n + 1)); } },
    { s: T`\sum_{k=0}^{n-1} 2^k = 2^n - 1`, n0: 1, c: (n) => { let s = 0; for (let k = 0; k < n; k++) s += 2 ** k; return s === 2 ** n - 1; } },
    { s: T`\sum_{k=1}^n k \cdot k! = (n+1)! - 1`, n0: 1, c: (n) => { let s = 0; for (let k = 1; k <= n; k++) s += k * fact(k); return s === fact(n + 1) - 1; } },
    { s: T`\prod_{k=2}^n \left(1 - \frac{1}{k^2}\right) = \frac{n+1}{2n}`, n0: 2, c: (n) => { let p = q(1); for (let k = 2; k <= n; k++) p = p.mul(q(k * k - 1, k * k)); return p.eq(q(n + 1, 2 * n)); } },
    { s: T`\prod_{k=2}^n \left(1 - \frac{1}{k}\right) = \frac{1}{n}`, n0: 2, c: (n) => { let p = q(1); for (let k = 2; k <= n; k++) p = p.mul(q(k - 1, k)); return p.eq(q(1, n)); } },
    { s: T`\sum_{k=1}^n k\, 2^k = (n-1)\,2^{n+1} + 2`, n0: 1, c: (n) => { let s = 0; for (let k = 1; k <= n; k++) s += k * 2 ** k; return s === (n - 1) * 2 ** (n + 1) + 2; } },
    { s: T`\sum_{k=1}^n (3k - 2) = \frac{n(3n-1)}{2}`, n0: 1, c: (n) => { let s = 0; for (let k = 1; k <= n; k++) s += 3 * k - 2; return 2 * s === n * (3 * n - 1); } },
    { s: T`3^n \gt n + 6`, n0: 2, c: (n) => 3 ** n > n + 6 },
    { s: T`2^n \gt n^2`, n0: 5, c: (n) => 2 ** n > n * n },
    { s: T`n! \gt 2^n`, n0: 4, c: (n) => fact(n) > 2 ** n },
    { s: T`6 \text{ teilt } n^3 - n`, n0: 1, c: (n) => (n ** 3 - n) % 6 === 0 },
    { s: T`5 \text{ teilt } 7^n - 2^n`, n0: 1, c: (n) => (7 ** n - 2 ** n) % 5 === 0 },
    { s: T`4 \text{ teilt } 5^n - 1`, n0: 1, c: (n) => (5 ** n - 1) % 4 === 0 },
    { s: T`\sum_{k=1}^n \frac{1}{k^2} \le 2 - \frac1n`, n0: 1, c: (n) => { let s = q(0); for (let k = 1; k <= n; k++) s = s.add(q(1, k * k)); return s.val() <= 2 - 1 / n + 1e-12; } }
  ];
  M.indPool = IND;
  function induktion() {
    const t = pick(IND);
    return {
      q: 'Beweise per vollständiger Induktion: Für alle ganzen $n \\ge ' + t.n0 + '$ gilt $' + t.s + '$.',
      a: '<b>Verankerung</b> $n = ' + t.n0 + '$ nachrechnen. <b>Schritt:</b> Annahme für $n$ einsetzen und den Term für $n+1$ umformen ' +
        '(bei Summen: neuen Summanden addieren; bei Ungleichungen: geeignet abschätzen; bei Teilbarkeit: Differenz $a_{n+1} - c\\,a_n$ betrachten). Probe: Die Aussage stimmt für $n = ' + t.n0 + ', \\dots, ' + (t.n0 + 7) + '$.'
    };
  }

  /* ---------- Lineare Algebra ---------- */
  const G = {};
  G.induktion = induktion;
  G.pigeon = () => pick([
    () => { const N = rint(2000, 40000), k = Math.ceil(N / 366); return { q: 'Unter $' + N + '$ Personen: Zeige mit dem Schubfachprinzip, dass mindestens $' + k + '$ am selben Tag Geburtstag haben (366 mögliche Tage).', a: '$366 \\cdot ' + (k - 1) + ' = ' + 366 * (k - 1) + ' \\lt ' + N + '$, also hat ein Tag mindestens $' + k + '$ Personen.' }; },
    () => { const n = rint(4, 12); return { q: 'Aus $\\{1, \\dots, ' + 2 * n + '\\}$ werden $' + (n + 1) + '$ verschiedene Zahlen gewählt. Zeige: Zwei davon haben die Summe $' + (2 * n + 1) + '$.', a: 'Schubfächer $\\{1, ' + 2 * n + '\\}, \\{2, ' + (2 * n - 1) + '\\}, \\dots, \\{' + n + ', ' + (n + 1) + '\\}$: $' + n + '$ Fächer, $' + (n + 1) + '$ Zahlen.' }; },
    () => { const n = rint(4, 12); return { q: 'Aus $\\{1, \\dots, ' + 2 * n + '\\}$ werden $' + (n + 1) + '$ verschiedene Zahlen gewählt. Zeige: Zwei davon sind aufeinanderfolgend.', a: 'Fächer $\\{1,2\\}, \\{3,4\\}, \\dots, \\{' + (2 * n - 1) + ', ' + 2 * n + '\\}$.' }; },
    () => { const c = rint(3, 9); return { q: 'In einer Schublade liegen Socken in $' + c + '$ Farben. Wie viele muss man im Dunkeln mindestens ziehen, um sicher zwei gleichfarbige zu haben?', a: '$' + (c + 1) + '$ (Schubfachprinzip; mit $' + c + '$ könnten alle verschieden sein).' }; },
    () => ({ q: 'Zeige: Unter sechs Personen gibt es drei, die sich paarweise kennen, oder drei, die sich paarweise nicht kennen. Gilt das auch für fünf Personen?', a: 'Eine Person hat zu mindestens drei anderen dieselbe Beziehung (Schubfach mit 5 Personen, 2 Fächer); unter diesen drei Fallunterscheidung. Für fünf Personen falsch (Fünfeck: Nachbarn kennen sich).' })
  ])();
  G.negation = () => {
    const P = [
      ['Jede Primzahl ist ungerade.', 'Es gibt eine gerade Primzahl.'],
      ['Es gibt eine reelle Zahl $x$ mit $x^2 = -1$.', 'Für alle reellen $x$ gilt $x^2 \\ne -1$.'],
      ['Zu jedem $\\varepsilon \\gt 0$ gibt es $N$ mit $|a_n| \\lt \\varepsilon$ für alle $n \\gt N$.', 'Es gibt ein $\\varepsilon \\gt 0$, so dass es zu jedem $N$ ein $n \\gt N$ mit $|a_n| \\ge \\varepsilon$ gibt.'],
      ['Alle Studierenden haben einen Laptop oder ein Tablet.', 'Es gibt eine studierende Person, die weder Laptop noch Tablet hat.'],
      ['Wenn es regnet, ist die Strasse nass.', 'Es regnet und die Strasse ist nicht nass.'],
      ['Jede stetige Funktion auf $[0,1]$ ist beschränkt.', 'Es gibt eine stetige Funktion auf $[0,1]$, die nicht beschränkt ist.'],
      ['Es gibt einen Hörsaal, in dem alle Plätze besetzt sind.', 'In jedem Hörsaal ist mindestens ein Platz frei.'],
      ['Jede injektive Abbildung $M \\to M$ ist surjektiv.', 'Es gibt eine injektive Abbildung $M \\to M$, die nicht surjektiv ist.'],
      ['Es gibt eine Zahl, die durch alle natürlichen Zahlen teilbar ist.', 'Für jede Zahl gibt es eine natürliche Zahl, durch die sie nicht teilbar ist.']
    ];
    const s = sample(P, 3);
    return { q: 'Formuliere die Negation:' + ol(s.map((x) => x[0])), a: ol(s.map((x) => x[1])) + 'Regel: $\\forall \\leftrightarrow \\exists$ tauschen, „oder" wird „und", $P \\Rightarrow Q$ wird $P \\land \\neg Q$.' };
  };
  G['sets-count'] = () => {
    const E = [['\\emptyset', 'E'], ['\\{\\emptyset\\}', '{E}'], ['\\{\\{\\emptyset\\}\\}', '{{E}}'], ['\\{\\emptyset, \\{\\emptyset\\}\\}', '{E,{E}}'], ['\\mathbb{R}', 'R'], ['\\mathbb{N}', 'N'], ['\\{\\emptyset, \\emptyset\\}', '{E}']];
    const sets = Array.from({ length: 4 }, () => { const k = rint(1, 3); const els = Array.from({ length: k }, () => pick(E)); return { tex: '\\{' + els.map((e) => e[0]).join(', ') + '\\}', n: new Set(els.map((e) => e[1])).size }; });
    const n = rint(3, 6);
    return { q: 'Wie viele Elemente haben die folgenden Mengen? ' + ol(sets.map((s) => '$' + s.tex + '$')) + 'Wie viele Teilmengen hat eine Menge mit $' + n + '$ Elementen?', a: ol(sets.map((s) => '$' + s.n + '$')) + 'Teilmengen: $2^{' + n + '} = ' + 2 ** n + '$. Achtung: $\\{\\emptyset, \\emptyset\\} = \\{\\emptyset\\}$, aber $\\emptyset \\ne \\{\\emptyset\\}$.' };
  };
  G['maps-count'] = () => {
    const m = rint(2, 6), n = rint(m - 1, 7);
    const inj = m > n ? 0 : fact(n) / fact(n - m);
    return {
      q: 'Sei $\\#M = ' + m + '$ und $\\#N = ' + n + '$. Bestimme $\\#(M \\times N)$, die Anzahl aller Abbildungen $M \\to N$ und die Anzahl der injektiven Abbildungen $M \\to N$.' + (m === n ? ' Warum ist jede injektive Abbildung hier bijektiv?' : ''),
      a: '$\\#(M \\times N) = ' + m * n + '$, Abbildungen: $' + n + '^{' + m + '} = ' + n ** m + '$, injektiv: ' + (m > n ? '$0$ (Schubfach: ' + m + ' > ' + n + ')' : '$\\frac{' + n + '!}{' + (n - m) + '!} = ' + inj + '$') + (m === n ? '. Das Bild hat $' + n + '$ Elemente, ist also ganz $N$.' : '.')
    };
  };
  G['maps-table'] = () => {
    const m = rint(3, 4), k = rint(3, 5);
    const dom = Array.from({ length: m }, (_, i) => i + 1), cod = ['a', 'b', 'c', 'd', 'e'].slice(0, k);
    const f = dom.map(() => pick(cod)), h = cod.map(() => pick(dom));
    const inj = (vals) => new Set(vals).size === vals.length, surj = (vals, target) => target.every((t) => vals.includes(t));
    const hf = f.map((y) => h[cod.indexOf(y)]);
    const prop = (vals, target) => (inj(vals) ? 'injektiv' : 'nicht injektiv') + ', ' + (surj(vals, target) ? 'surjektiv' : 'nicht surjektiv');
    const table = (from, vals) => from.map((x, i) => x + ' \\mapsto ' + vals[i]).join(',\\ ');
    return {
      q: 'Sei $f: \\{1, \\dots, ' + m + '\\} \\to \\{' + cod.join(', ') + '\\}$ mit $' + table(dom, f) + '$ und $h$ in die Gegenrichtung mit $' + table(cod, h) + '$. Untersuche $f$, $h$ und $h \\circ f$ auf Injektivität und Surjektivität.',
      a: '$f$: ' + prop(f, cod) + '. $h$: ' + prop(h, dom) + '. $h \\circ f$ ($' + table(dom, hf) + '$): ' + prop(hf, dom) + '.'
    };
  };
  const GROUPOPS = [
    { op: 'a \\circ b = b - a', set: '\\mathbb{Q}', e: '0', r: [false, true, true, false], why: 'Inverses $a$ selbst; $(a \\circ b) \\circ c = c - b + a \\ne c - b - a$.' },
    { op: 'a \\circ b = a - b', set: '\\mathbb{Q}', e: '0', r: [false, false, true, false], why: '$0 \\circ a = -a$; $a \\circ a = 0$.' },
    { op: 'a \\circ b = a + b + 1', set: '\\mathbb{Q}', e: '-1', r: [true, true, true, true], why: 'Inverses $-a - 2$.' },
    { op: 'a \\circ b = \\frac{a + b}{2}', set: '\\mathbb{Q}', e: '0', r: [false, false, true, true], why: '$0 \\circ a = \\frac a2$; Inverses $-a$; nicht assoziativ.' },
    { op: 'a \\circ b = ab', set: '\\mathbb{Q}', e: '1', r: [true, true, false, true], why: '$0$ hat kein Inverses.' },
    { op: 'a \\circ b = a + b - ab', set: '\\mathbb{R}', e: '0', r: [true, true, false, true], why: '$a = 1$ hat kein Inverses ($a\'(1 - a) = -a$ unlösbar).' },
    { op: 'a \\circ b = a', set: '\\mathbb{R}', e: '0', r: [true, false, true, false], why: '$0 \\circ a = 0$; mit $a\' = 0$ gilt $a\' \\circ a = 0$.' },
    { op: 'a \\circ b = a + b + ab', set: '\\mathbb{R} \\setminus \\{-1\\}', e: '0', r: [true, true, true, true], why: 'Inverses $-\\frac{a}{1+a}$; $(1 + a)(1 + b) - 1$ zeigt Abgeschlossenheit.' }
  ];
  G['group-axioms'] = () => {
    const g = pick(GROUPOPS), names = ['(A)', '(N)', '(I)', '(K)'];
    return { q: 'Auf $G = ' + g.set + '$ sei $' + g.op + '$ und $e = ' + g.e + '$. Welche der Axiome (A), (N) [$e \\circ a = a$], (I) [es gibt $a\'$ mit $a\' \\circ a = e$] und (K) gelten?', a: names.map((n, i) => n + ' ' + (g.r[i] ? '✓' : '✗')).join(', ') + '. ' + g.why };
  };
  G['group-shift'] = () => {
    const c = nz(-9, 9);
    return { q: 'Zeige: $(\\mathbb{R}, e, \\star)$ mit $a \\star b = a + b ' + (c > 0 ? '+ ' + c : '- ' + -c) + '$ ist eine abelsche Gruppe. Bestimme $e$ und das Inverse von $a$.', a: '$e = ' + -c + '$, Inverses $a\' = ' + (-2 * c === 0 ? '' : -2 * c) + ' - a$ (Probe: $a\' \\star a = ' + -2 * c + ' - a + a ' + (c > 0 ? '+ ' + c : '- ' + -c) + ' = ' + -c + '$). Assoziativ und kommutativ wie die Addition.' };
  };
  G.homomorphism = () => {
    const items = [];
    const c = nz(-5, 9), d = pick([0, 0, rint(1, 5)]);
    items.push(['$a \\mapsto ' + c + 'a' + (d ? ' + ' + d : '') + '$ ist ein Isomorphismus von $(\\mathbb{R}, 0, +)$ auf sich.', d === 0, d ? 'Falsch: $f(0) = ' + d + ' \\ne 0$.' : 'Wahr: additiv und bijektiv (Inverse $a \\mapsto a/' + c + '$).']);
    const k = pick([2, 3, 4, 5, -1, -2, 7]);
    items.push(['$a \\mapsto a^{' + k + '}$ ist ein Isomorphismus von $(\\mathbb{R} \\setminus \\{0\\}, 1, \\cdot)$ auf sich.', Math.abs(k) % 2 === 1, Math.abs(k) % 2 === 1 ? 'Wahr: multiplikativ, bijektiv (ungerader Exponent).' : 'Falsch: Homomorphismus, aber $(-1)^{' + k + '} = 1^{' + k + '}$, nicht injektiv.']);
    const e = rint(2, 9);
    items.push(['$a \\mapsto ' + e + 'a$ ist ein Homomorphismus von $(\\mathbb{R} \\setminus \\{0\\}, 1, \\cdot)$ auf sich.', false, 'Falsch: $1 \\mapsto ' + e + ' \\ne 1$.']);
    items.push(['$a \\mapsto |a|$ ist ein Homomorphismus von $(\\mathbb{R} \\setminus \\{0\\}, 1, \\cdot)$ auf sich.', true, 'Wahr: $|ab| = |a||b|$ (aber kein Isomorphismus).']);
    items.push(['$a \\mapsto 2^a$ ist ein Isomorphismus von $(\\mathbb{R}, 0, +)$ nach $(\\mathbb{R} \\setminus \\{0\\}, 1, \\cdot)$.', false, 'Falsch: Homomorphismus, aber nicht surjektiv (nur positive Werte).']);
    const s = sample(items, 4);
    return { q: 'Wahr oder falsch?' + ol(s.map((x) => x[0])), a: ol(s.map((x) => x[2])) };
  };
  G.subgroup = () => {
    const P = [
      ['$3\\mathbb{Z}$ in $(\\mathbb{Z}, 0, +)$', true, 'abgeschlossen, $0$ und Negative enthalten'], ['$\\mathbb{N}$ in $(\\mathbb{Z}, 0, +)$', false, 'keine Inversen, $0 \\notin \\mathbb{N}$'],
      ['ungerade Zahlen in $(\\mathbb{Z}, 0, +)$', false, '$0$ fehlt'], ['$\\{-1, 0, 1\\}$ in $(\\mathbb{Z}, 0, +)$', false, '$1 + 1 = 2$ fehlt'],
      ['$\\{2^k : k \\in \\mathbb{Z}\\}$ in $(\\mathbb{R}\\setminus\\{0\\}, 1, \\cdot)$', true, 'Produkte und Kehrwerte von Zweierpotenzen'], ['$\\{2^k : k \\in \\mathbb{N}\\}$ in $(\\mathbb{R}\\setminus\\{0\\}, 1, \\cdot)$', false, '$1$ und Kehrwerte fehlen'],
      ['$(0, \\infty)$ in $(\\mathbb{R}\\setminus\\{0\\}, 1, \\cdot)$', true, 'positiv bleibt positiv'], ['$\\{\\pm 1\\}$ in $(\\mathbb{R}\\setminus\\{0\\}, 1, \\cdot)$', true, 'abgeschlossen, selbstinvers'],
      ['$\\{x : |x| \\ge 1\\}$ in $(\\mathbb{R}\\setminus\\{0\\}, 1, \\cdot)$', false, 'Kehrwert von $2$ fehlt'], ['$\\mathbb{Q}_{\\gt 0}$ in $(\\mathbb{R}\\setminus\\{0\\}, 1, \\cdot)$', true, 'Produkte und Kehrwerte positiver Brüche'],
      ['$(-\\infty, 0)$ in $(\\mathbb{R}\\setminus\\{0\\}, 1, \\cdot)$', false, '$1$ fehlt, $(-1)(-1) = 1$'], ['$\\{0\\}$ in $(\\mathbb{Z}, 0, +)$', true, 'triviale Untergruppe']
    ];
    const s = sample(P, 4);
    return { q: 'Welche Teilmengen sind Untergruppen?' + ol(s.map((x) => x[0])), a: ol(s.map((x) => (x[1] ? 'Ja' : 'Nein') + ': ' + x[2] + '.')) };
  };
  G['table-mod'] = () => pick([
    () => { const n = rint(3, 7), k = rint(1, n - 1); return { q: 'Auf $\\{0, \\dots, ' + (n - 1) + '\\}$ sei $+$ die Addition modulo $' + n + '$. Stelle die Verknüpfungstafel auf, prüfe (N), (I), (K), (A) und bestimme das Inverse von $' + k + '$.', a: 'Alle Axiome gelten; neutral ist $0$; Inverses von $' + k + '$ ist $' + (n - k) + '$. Die Tafel ist symmetrisch, jede Zeile eine zyklische Verschiebung.' }; },
    () => { const p = pick([5, 7, 11]), k = rint(2, p - 1); let inv = 1; while ((inv * k) % p !== 1) inv++; return { q: 'Auf $\\{1, \\dots, ' + (p - 1) + '\\}$ sei $\\cdot$ die Multiplikation modulo $' + p + '$. Ist das eine Gruppe? Bestimme das Inverse von $' + k + '$.', a: 'Ja ($' + p + '$ ist prim, kein Produkt wird $0$); Inverses von $' + k + '$ ist $' + inv + '$, denn $' + k + ' \\cdot ' + inv + ' = ' + k * inv + ' \\equiv 1$.' }; }
  ])();
  G.group3 = () => {
    const L = shuffle(['x', 'y', 'z']); const [e, a, b] = L; const w = pick([a, b]);
    const prod = (u, v) => { if (u === e) return v; if (v === e) return u; if (u === a && v === a) return b; if (u === b && v === b) return a; return e; };
    const rows = ['x', 'y', 'z'].map((u) => u + ': ' + ['x', 'y', 'z'].map((v) => prod(u, v)).join(', ')).join('; ');
    return { q: '$\\{x, y, z\\}$ sei eine Gruppe mit unbekanntem neutralem Element. Bekannt ist $m(' + e + ', ' + w + ') = ' + w + '$. Welches Element ist neutral? Vervollständige die Tafel.', a: 'Kürzen von $' + w + '$: $' + e + '$ ist neutral. Tafel (Zeile: Produkte mit $x, y, z$) – ' + rows + '. (Isomorph zur Addition modulo 3.)' };
  };
  G.poly = () => {
    const A = [1, nz(-5, 5), rint(-6, 6)].slice(0, rint(2, 3)), B = [1, nz(-4, 4)];
    if (Math.random() < 0.3) { const n = rint(3, 6); const Ar = Array(n + 1).fill(1); return { q: 'Berechne $(' + polyTex(Ar) + ')(X - 1)$.', a: '$X^{' + (n + 1) + '} - 1$ (Teleskop).' }; }
    return { q: 'Berechne in $\\mathbb{Q}[X]$: $(' + polyTex(A) + ')(' + polyTex(B) + ')$.', a: '$' + polyTex(pmul(A, B)) + '$' };
  };
  G['complex-pairs'] = () => {
    const a = nz(-5, 5), b = nz(-5, 5), c = rint(-5, 5), d = rint(-5, 5); const n2 = a * a + b * b;
    return { q: 'Im Ring $\\mathbb{R}^2$ mit $(a,b)(c,d) = (ac - bd, ad + bc)$: Berechne $(' + a + ', ' + b + ')(' + c + ', ' + d + ')$ und das Inverse von $(' + a + ', ' + b + ')$.', a: 'Produkt $(' + (a * c - b * d) + ', ' + (a * d + b * c) + ')$. Inverses $(' + tx(q(a, n2)) + ', ' + tx(q(-b, n2)) + ')$, da $a^2 + b^2 = ' + n2 + '$.' };
  };
  G['field-p'] = () => {
    const p = pick([3, 5, 7]), k = rint(2, p - 1); let inv = 1; while ((inv * k) % p !== 1) inv++; const x = rint(0, p - 1);
    return { q: 'Im Körper $\\mathbb{F}_{' + p + '} = \\{0, \\dots, ' + (p - 1) + '\\}$ (Rechnen modulo $' + p + '$): Was ist $1 + 1 + \\dots + 1$ ($' + p + '$ Summanden), das Inverse von $' + k + '$ und $' + x + '^{' + p + '}$?', a: '$' + p + ' \\cdot 1 = 0$ (Charakteristik $' + p + '$), $' + k + '^{-1} = ' + inv + '$, $' + x + '^{' + p + '} = ' + x + '$ (es gilt $x^p = x$ für alle $x$).' };
  };
  G.matmul = () => {
    const dims = shuffle([[2, 3], [3, 3], [2, 2], [2, 1], [3, 2], [1, 3]]).slice(0, 4);
    const names = ['A', 'B', 'C', 'D']; const Ms = dims.map((d) => rmat(d[0], d[1], -4, 6));
    const pairs = []; names.forEach((x, i) => names.forEach((y, j) => { if (dims[i][1] === dims[j][0]) pairs.push([i, j]); }));
    const show = pairs.length ? pick(pairs) : null;
    return {
      q: 'Gegeben ' + names.map((n, i) => '$' + n + ' = ' + mtex(Ms[i]) + '$').join(', ') + '. Welche Produkte $XY$ sind definiert? Berechne eines davon.',
      a: 'Definiert: ' + (pairs.length ? pairs.map((p) => '$' + names[p[0]] + names[p[1]] + '$').join(', ') : 'keines') + '. ' + (show ? '$' + names[show[0]] + names[show[1]] + ' = ' + mtex(mmul(Ms[show[0]], Ms[show[1]])) + '$' : '') + ' (Spaltenzahl links = Zeilenzahl rechts.)'
    };
  };
  G.mnp = () => {
    const m = rint(2, 9), n = rint(2, 9), p = rint(2, 9);
    return { q: 'Wie viele Multiplikationen und Additionen braucht das Standardverfahren für $AB$ mit $A \\in \\mathrm{Mat}_{' + m + ',' + n + '}$, $B \\in \\mathrm{Mat}_{' + n + ',' + p + '}$?', a: 'Multiplikationen $mnp = ' + m * n * p + '$, Additionen $mp(n-1) = ' + m * p * (n - 1) + '$. (Rekursiv mit 7 statt 8 Blockprodukten: $7^k$ für $n = 2^k$.)' };
  };
  G['subgroup-mat'] = () => {
    const P = [['$\\{a = d\\}$', true, 'linear: Summen und Negative erfüllen $a = d$'], ['$\\{a + d = 0\\}$', true, 'Spur null bleibt erhalten'], ['$\\{ad = 0\\}$', false, '$\\mathrm{diag}(1,0) + \\mathrm{diag}(0,1) = E_2$ verletzt die Bedingung'], ['$\\{a = 1\\}$', false, 'Nullmatrix fehlt'], ['$\\{b = c = 0\\}$', true, 'Diagonalmatrizen'], ['$\\{a, b, c, d \\in \\mathbb{Z}\\}$', true, 'ganzzahlige Matrizen'], ['$\\{a \\ge 0\\}$', false, 'Negatives fehlt']];
    const s = sample(P, 4);
    return { q: 'Welche Teilmengen von $\\left\\{\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}\\right\\} = \\mathrm{Mat}_2(\\mathbb{Q})$ sind Untergruppen von $(\\mathrm{Mat}_2(\\mathbb{Q}), 0, +)$?' + ol(s.map((x) => x[0])), a: ol(s.map((x) => (x[1] ? 'Ja' : 'Nein') + ': ' + x[2] + '.')) };
  };
  G['mat-binom'] = () => {
    let A, B; do { A = rmat(2, 2, -3, 3); B = rmat(2, 2, -3, 3); } while (meq(mmul(A, B), mmul(B, A)));
    const L = mmul(madd(A, B), madd(A, B)); const R2 = madd(madd(mmul(A, A), msc(2, mmul(A, B))), mmul(B, B));
    return { q: 'Für $A = ' + mtex(A) + '$ und $B = ' + mtex(B) + '$: Berechne $(A + B)^2$ und $A^2 + 2AB + B^2$. Warum unterscheiden sie sich? Gilt die Ungleichheit für <i>alle</i> $A, B$?', a: '$(A+B)^2 = ' + mtex(L) + '$, $A^2 + 2AB + B^2 = ' + mtex(R2) + '$. Differenz $= BA - AB \\ne 0$. Nein: Für kommutierende $A, B$ (z.B. $A = B$) gilt Gleichheit.' };
  };
  G.matpow = () => {
    const n = rint(3, 12), a = nz(-4, 4);
    return pick([
      { q: 'Berechne $' + mtex([[1, 0], [a, 1]]) + '^{' + n + '}$ und beweise die allgemeine Formel per Induktion.', a: '$' + mtex([[1, 0], [n * a, 1]]) + '$, allgemein $\\begin{pmatrix}1&0\\\\' + a + 'n&1\\end{pmatrix}$ für die $n$-te Potenz.' },
      { q: 'Berechne $' + mtex([[1, a], [0, 1]]) + '^{' + n + '}$.', a: '$' + mtex([[1, n * a], [0, 1]]) + '$ (Induktion: die rechte obere Ecke addiert sich).' },
      { q: 'Berechne $' + mtex([[0, 1], [1, 0]]) + '^{' + n + '}$.', a: n % 2 ? '$' + mtex([[0, 1], [1, 0]]) + '$ (ungerade Potenz)' : '$E_2$ (gerade Potenz)' },
      { q: 'Berechne $' + mtex([[0, -1], [1, 0]]) + '^{' + n + '}$.', a: '$' + mtex([[[1, 0], [0, 1]], [[0, -1], [1, 0]], [[-1, 0], [0, -1]], [[0, 1], [-1, 0]]][n % 4]) + '$ (Periode 4, Drehung um $90°$).' }
    ]);
  };
  G.diag = () => {
    const x = [nz(-5, 5), nz(-5, 5), nz(-5, 5)], y = [nz(-5, 5), nz(-5, 5), nz(-5, 5)], A = rmat(3, 3, -3, 3);
    const D = x.map((v, i) => x.map((_, j) => (i === j ? v : 0)));
    return { q: 'Berechne $\\mathrm{diag}(' + x.join(', ') + ')\\,\\mathrm{diag}(' + y.join(', ') + ')$. Kommutiert $D = \\mathrm{diag}(' + x.join(', ') + ')$ mit $A = ' + mtex(A) + '$?', a: '$\\mathrm{diag}(' + x.map((v, i) => v * y[i]).join(', ') + ')$. $DA = ' + mtex(mmul(D, A)) + '$, $AD = ' + mtex(mmul(A, D)) + '$ – ' + (meq(mmul(D, A), mmul(A, D)) ? 'gleich.' : 'verschieden (nur Vielfache von $E$ kommutieren mit allem).') };
  };
  G['param-system'] = () => {
    const k = nz(-3, 3), e = rint(-4, 8), r1 = q(rint(-4, 4), pick([1, 2])), r2 = q(rint(-4, 4), 1);
    // Zeile 1 = (k t + e, (e + k(r1+r2)) t - k r1 r2), Zeile 2 = (1, t); det = -k (t - r1)(t - r2)
    const c1 = q(e).add(q(k).mul(r1.add(r2))), c0 = q(k).mul(r1).mul(r2).neg();
    const b1 = rint(-5, 6), b2 = rint(-3, 4);
    const lin = (a, b) => { const A = Q.of(a), B = Q.of(b); if (A.zero) return B.tex(); const at = A.eq(1) ? '' : A.eq(-1) ? '-' : A.tex(); return at + 't' + (B.zero ? '' : (B.n < 0 ? ' - ' + B.neg().tex() : ' + ' + B.tex())); };
    const roots = r1.eq(r2) ? [r1] : [r1, r2];
    const bad = roots.filter((r) => { const p = q(k).mul(r).add(e); return !q(b1).eq(p.mul(b2)); });
    const set = bad.length ? '\\mathbb{R} \\setminus \\{' + bad.map((r) => r.tex()).join(', ') + '\\}' : '\\mathbb{R}';
    return {
      q: 'Für welche $t \\in \\mathbb{R}$ ist $\\begin{pmatrix}' + lin(k, e) + ' & ' + lin(c1, c0) + '\\\\ 1 & t\\end{pmatrix} x = \\begin{pmatrix}' + b1 + '\\\\' + b2 + '\\end{pmatrix}$ lösbar?',
      a: '$\\det = ' + tx(k) + '(t' + sgn(r1.neg()) + ')(t' + sgn(r2.neg()) + ')$; ausserhalb der Nullstellen eindeutig lösbar. In einer Nullstelle $r$ ist Zeile 1 das $(' + k + 'r' + sgn(e) + ')$-fache von Zeile 2; lösbar genau dann, wenn die rechte Seite dasselbe Verhältnis hat. Ergebnis: $t \\in ' + set + '$.'
    };
  };
  G.nilpotent = () => {
    const a = rint(-4, 4), b = rint(-4, 4), c = nz(-4, 4); const N = [[0, a, b], [0, 0, c], [0, 0, 0]]; const N2 = mmul(N, N);
    const idx = N2.every((r) => r.every((x) => x.zero)) ? 2 : 3;
    return { q: 'Sei $N = ' + mtex(N) + '$. Berechne $N^2$ und $N^3$. Welches ist das kleinste $k$ mit $N^k = 0$? Ist $N$ invertierbar?', a: '$N^2 = ' + mtex(N2) + '$, $N^3 = 0$. Kleinstes $k = ' + idx + '$. Nicht invertierbar (sonst wäre $0 = N^k$ invertierbar).' };
  };
  G.det = () => {
    const A = rmat(2, 2, -4, 5), B = rmat(2, 2, -4, 5), l = nz(-4, 4);
    return { q: 'Für $A = ' + mtex(A) + '$, $B = ' + mtex(B) + '$, $\\lambda = ' + l + '$: Berechne $\\det A$, $\\det B$, $\\det(AB)$, $\\det(\\lambda A)$ und $\\det(A + B)$.', a: '$\\det A = ' + det2(A).tex() + '$, $\\det B = ' + det2(B).tex() + '$, $\\det(AB) = ' + det2(mmul(A, B)).tex() + '$ ($= \\det A \\det B$), $\\det(\\lambda A) = ' + det2(msc(l, A)).tex() + '$ ($= \\lambda^2 \\det A$), $\\det(A + B) = ' + det2(madd(A, B)).tex() + '$ vs. $\\det A + \\det B = ' + det2(A).add(det2(B)).tex() + '$.' };
  };
  function solveText(A, b) {
    const n = A[0].length; const { R, piv } = rref(A.map((r, i) => r.concat([b[i]])));
    if (piv.includes(n)) return { R, txt: 'Die letzte Pivotspalte ist die rechte Seite: <b>keine Lösung</b>.' };
    const free = [...Array(n).keys()].filter((j) => !piv.includes(j));
    const part = Array(n).fill(q(0)); piv.forEach((c, i) => { part[c] = R[i][n]; });
    const basis = free.map((f) => { const v = Array(n).fill(q(0)); v[f] = q(1); piv.forEach((c, i) => { v[c] = R[i][f].neg(); }); return v; });
    const vt = (v) => '(' + v.map(tx).join(', ') + ')^T';
    return { R, txt: 'Spezielle Lösung $' + vt(part) + '$' + (basis.length ? ', homogene Lösungen $\\left\\{' + basis.map((v, i) => 't_' + (i + 1) + vt(v)).join(' + ') + '\\right\\}$.' : ', eindeutig.') };
  }
  G.gauss = () => {
    let A; do { A = rmat(3, 4, -3, 6); } while (rref(A).piv.length < 2);
    const b = [rint(-3, 4), rint(-3, 4), rint(-3, 4)]; const s = solveText(A, b);
    return { q: 'Bringe $(A \\mid b)$ mit $A = ' + mtex(A) + '$, $b = (' + b.join(', ') + ')^T$ in Zeilenstufenform und bestimme die Lösungsmengen von $Ax = 0$ und $Ax = b$.', a: 'Zeilenstufenform: $' + mtex(s.R) + '$. ' + s.txt };
  };
  G.inverse = () => {
    let A = ident(3);
    for (let s = 0; s < 4; s++) { const i = rint(0, 2); let j; do j = rint(0, 2); while (j === i); const l = nz(-2, 2); A = A.map((r, k) => (k === i ? r.map((x, c) => x.add(A[j][c].mul(l))) : r)); }
    A = shuffle(A);
    const { R } = rref(A.map((r, i) => r.concat(ident(3)[i])));
    return { q: 'Zeige, dass $A = ' + mtex(A) + '$ invertierbar ist, und berechne $A^{-1}$ mit Zeilenumformungen.', a: '$(A \\mid E_3) \\rightsquigarrow (E_3 \\mid A^{-1})$ mit $A^{-1} = ' + mtex(R.map((r) => r.slice(3))) + '$.' };
  };
  G.elementary = () => {
    const m = 3, i = rint(1, 3); let j; do j = rint(1, 3); while (j === i); const l = nz(-4, 4), u = nz(-4, 4);
    const E = (lam) => ident(m).map((r, a) => r.map((x, c) => (a === i - 1 && c === j - 1 ? q(lam) : x)));
    return { q: 'Schreibe $E_I(' + i + ', ' + j + ', ' + l + ')$ und $E_I(' + i + ', ' + j + ', ' + u + ')$ in $\\mathrm{Mat}_3$ explizit hin und berechne ihr Produkt. Welche Elementarmatrix entsteht? Was ist $E_I(' + i + ', ' + j + ', ' + l + ')^{-1}$?', a: '$' + mtex(E(l)) + mtex(E(u)) + ' = ' + mtex(mmul(E(l), E(u))) + ' = E_I(' + i + ', ' + j + ', ' + (l + u) + ')$. Inverse: $E_I(' + i + ', ' + j + ', ' + -l + ')$.' };
  };
  G.glcount = () => {
    const p = pick([2, 3, 5]);
    return { q: 'Wie viele invertierbare $2 \\times 2$-Matrizen gibt es über $\\mathbb{F}_{' + p + '}$?', a: 'Erste Spalte $\\ne 0$: $' + p + '^2 - 1$ Möglichkeiten; zweite kein Vielfaches: $' + p + '^2 - ' + p + '$. Zusammen $' + (p * p - 1) * (p * p - p) + '$.' + (p === 2 ? ' Diese 6 Matrizen permutieren die 3 Vektoren $\\ne 0$ – daher $\\mathrm{GL}_2(\\mathbb{F}_2) \\cong S_3$.' : '') };
  };

  /* ---------- Analysis ---------- */
  G.stars = () => {
    const n = rint(3, 12), k = rint(2, 5);
    return { q: 'Auf wie viele Arten kann man $' + n + '$ gleiche Bälle auf $' + k + '$ Kinder verteilen (a) beliebig, (b) so, dass jedes mindestens einen bekommt?', a: '(a) $\\binom{' + (n + k - 1) + '}{' + (k - 1) + '} = ' + binom(n + k - 1, k - 1) + '$ (Sterne und Striche). (b) $\\binom{' + (n - 1) + '}{' + (k - 1) + '} = ' + binom(n - 1, k - 1) + '$ (erst jedem einen geben).' };
  };
  G.subsets = () => {
    const n = rint(3, 10), k = rint(1, n - 1);
    return { q: 'Wie viele Teilmengen hat $\\{1, \\dots, ' + n + '\\}$, und wie viele davon haben genau $' + k + '$ Elemente? Beweise die Formel $2^n$ per Induktion.', a: '$2^{' + n + '} = ' + 2 ** n + '$; mit $' + k + '$ Elementen $\\binom{' + n + '}{' + k + '} = ' + binom(n, k) + '$. Induktion: Teilmengen von $\\{1, \\dots, n+1\\}$ enthalten $n+1$ oder nicht – Verdopplung.' };
  };
  G.nested = () => {
    const c = pick([2, 3, 5, 6, 7, 10]);
    return { q: 'Zeige: $I_n = \\{x \\gt 0 : |x^2 - ' + c + '| \\le \\frac1n\\}$ ist eine Intervallschachtelung, und bestimme den gemeinsamen Punkt. Ist $J_n = \\left[-\\frac1n,\\ \\sqrt[n]{' + c + '}\\right]$ eine Intervallschachtelung?', a: '$I_n = \\left[\\sqrt{' + c + ' - \\frac1n}, \\sqrt{' + c + ' + \\frac1n}\\right]$, verschachtelt, Länge $\\to 0$; gemeinsamer Punkt $\\sqrt{' + c + '}$. $J_n$: nein, die Länge geht gegen $1$ (da $\\sqrt[n]{' + c + '} \\to 1$).' };
  };
  const SUPINF = [
    ['\\{\\frac1n : n \\in \\mathbb{N}\\}', 'sup = max = $1$; inf = $0$, kein Minimum'],
    ['\\{(-1)^n + \\frac1n : n \\in \\mathbb{N}\\}', 'sup = max = $\\frac32$ ($n = 2$); inf = $-1$, kein Minimum'],
    ['\\{\\frac{n}{n+1} : n \\in \\mathbb{N}\\}', 'inf = min = $\\frac12$; sup = $1$, kein Maximum'],
    ['\\{x \\in \\mathbb{Q} : x^2 \\lt 2\\}', 'sup = $\\sqrt2$, inf = $-\\sqrt2$; weder Max noch Min'],
    ['\\{x \\in \\mathbb{R} : x^2 - 3x + 2 \\lt 0\\}', '$= (1, 2)$: sup $2$, inf $1$, weder Max noch Min'],
    ['\\{x \\in \\mathbb{R} : |x - 1| \\le 3\\}', '$= [-2, 4]$: max $4$, min $-2$'],
    ['\\{\\frac1n - \\frac1m : n, m \\in \\mathbb{N}\\}', 'sup $1$, inf $-1$, beide nicht angenommen'],
    ['\\{x \\in \\mathbb{R}\\setminus\\{0\\} : \\frac1x \\gt 1\\}', '$= (0, 1)$: sup $1$, inf $0$, weder Max noch Min'],
    ['\\{2^{-n} + 3^{-m} : n, m \\in \\mathbb{N}\\}', 'sup = max = $\\frac12 + \\frac13 = \\frac56$; inf $0$, kein Minimum'],
    ['\\{x \\in \\mathbb{R} : \\frac{x - 1}{x + 1} \\gt 0\\}', '$= (-\\infty, -1) \\cup (1, \\infty)$: unbeschränkt, inf $-\\infty$, sup $+\\infty$']
  ];
  G.supinf = () => { const s = sample(SUPINF, 3); return { q: 'Bestimme Supremum und Infimum und entscheide, ob Maximum/Minimum existieren:' + ol(s.map((x) => '$' + x[0] + '$')), a: ol(s.map((x) => x[1] + '.')) }; };
  G['exactly-one'] = () => {
    const m = rint(2, 9);
    return { q: 'Genau eine der Aussagen ist wahr: (1) $n \\gt ' + m + '$, (2) $n \\lt ' + m + '$, (3) $n \\ge 1$, (4) $n = 0$. Bestimme $n \\in \\mathbb{N}_0$.', a: '$n = ' + m + '$: Für $n = 0$ gelten (2) und (4), für $1 \\le n \\lt ' + m + '$ (2) und (3), für $n \\gt ' + m + '$ (1) und (3).' };
  };
  G['root-eps'] = () => {
    const a = rint(2, 20), e = pick([0.1, 0.05, 0.01]), N = Math.floor((a - 1) / e) + 1;
    return { q: 'Finde mit der Bernoulli-Ungleichung ein $N$, so dass $|\\sqrt[n]{' + a + '} - 1| \\lt ' + e + '$ für alle $n \\ge N$.', a: 'Mit $x_n = \\sqrt[n]{' + a + '} - 1 \\ge 0$: $' + a + ' = (1 + x_n)^n \\ge 1 + nx_n$, also $x_n \\le \\frac{' + (a - 1) + '}{n}$. Für $n \\ge N = ' + N + '$ ist das $\\lt ' + e + '$.' };
  };
  G.complex = () => {
    const a = nz(-5, 5), b = nz(-5, 5), c = nz(-5, 5), d = nz(-5, 5), n2 = c * c + d * d;
    return { q: 'Für $z = ' + ctex(a, b) + '$ und $w = ' + ctex(c, d) + '$: Berechne $zw$, $\\frac{z}{w}$, $\\frac1z$ und $|z|$ in der Form $x + iy$.', a: '$zw = ' + ctex(a * c - b * d, a * d + b * c) + '$; $\\frac zw = \\frac{z\\bar w}{|w|^2} = ' + ctex(q(a * c + b * d, n2), q(b * c - a * d, n2)) + '$; $\\frac1z = ' + ctex(q(a, a * a + b * b), q(-b, a * a + b * b)) + '$; $|z| = \\sqrt{' + (a * a + b * b) + '}$.' };
  };
  G.cset = () => pick([
    () => { const a = [rint(-3, 3), rint(-3, 3)]; let b; do b = [rint(-3, 3), rint(-3, 3)]; while (b[0] === a[0] && b[1] === a[1]); const A = 2 * (b[0] - a[0]), B = 2 * (b[1] - a[1]), C = b[0] ** 2 + b[1] ** 2 - a[0] ** 2 - a[1] ** 2; return { q: 'Beschreibe $\\{z \\in \\mathbb{C} : |z - (' + ctex(a[0], a[1]) + ')| = |z - (' + ctex(b[0], b[1]) + ')|\\}$.', a: 'Mittelsenkrechte der beiden Punkte: mit $z = x + iy$ die Gerade $' + A + 'x + ' + B + 'y = ' + C + '$.' }; },
    () => { const c = [rint(-3, 3), rint(-3, 3)], r = rint(1, 4); return { q: 'Beschreibe $\\{z \\in \\mathbb{C} : |z - (' + ctex(c[0], c[1]) + ')| \\le ' + r + '\\}$.', a: 'Abgeschlossene Kreisscheibe um $' + ctex(c[0], c[1]) + '$ mit Radius $' + r + '$.' }; },
    () => { const a = [rint(-3, 3), rint(-3, 3)]; let b; do b = [rint(-3, 3), rint(-3, 3)]; while (b[0] === a[0] && b[1] === a[1]); const A = 2 * (b[0] - a[0]), B = 2 * (b[1] - a[1]), C = b[0] ** 2 + b[1] ** 2 - a[0] ** 2 - a[1] ** 2; return { q: 'Beschreibe $\\{z \\in \\mathbb{C} : |z - (' + ctex(a[0], a[1]) + ')| \\le |z - (' + ctex(b[0], b[1]) + ')|\\}$.', a: 'Halbebene der Punkte näher an $' + ctex(a[0], a[1]) + '$: $' + A + 'x + ' + B + 'y \\le ' + C + '$.' }; },
    () => { const r = rint(1, 3); return { q: 'Beschreibe $\\{z : |z + ' + r + '| = |z - ' + r + '| = ' + r + '\\}$.', a: 'Erste Gleichung: $\\mathrm{Re}\\, z = 0$. Mit $|iy + ' + r + '| = ' + r + '$ folgt $y = 0$: die Menge ist $\\{0\\}$.' }; }
  ])();
  G.quantor = () => {
    const P = [
      ['\\forall \\varepsilon \\gt 0\\ \\exists N\\ \\forall n \\gt N: |a_n - a| \\lt \\varepsilon', 'genau die gegen $a$ konvergenten Folgen'],
      ['\\exists N\\ \\forall \\varepsilon \\gt 0\\ \\forall n \\gt N: |a_n - a| \\lt \\varepsilon', 'Folgen mit $a_n = a$ für alle $n \\gt N$ (schliesslich konstant)'],
      ['\\forall \\varepsilon \\gt 0\\ \\forall n: |a_n - a| \\lt \\varepsilon', 'nur die konstante Folge $a_n = a$'],
      ['\\exists \\varepsilon \\gt 0\\ \\exists N\\ \\forall n \\gt N: |a_n - a| \\lt \\varepsilon', 'genau die beschränkten Folgen'],
      ['\\forall \\varepsilon \\gt 0\\ \\forall N\\ \\exists n \\gt N: |a_n - a| \\lt \\varepsilon', 'Folgen mit einer gegen $a$ konvergenten Teilfolge ($a$ ist Häufungswert)']
    ];
    const s = sample(P, 3);
    return { q: 'Für welche Folgen $(a_n)$ (mit festem $a$) gilt:' + ol(s.map((x) => '$' + x[0] + '$')), a: ol(s.map((x) => x[1] + '.')) };
  };
  G['irr-between'] = () => {
    const x = q(rint(-9, 9), rint(1, 5)), y = x.add(q(rint(1, 5), rint(1, 6)));
    return { q: 'Gib eine irrationale Zahl zwischen $' + x.tex() + '$ und $' + y.tex() + '$ an und begründe.', a: '$z = ' + x.tex() + ' + \\frac{' + y.sub(x).tex() + '}{\\sqrt2}$. Wäre $z$ rational, so auch $\\sqrt2 = \\frac{y - x}{z - x}$.' };
  };
  G.limit = () => {
    const items = [];
    const d1 = rint(1, 3), d2 = rint(1, 3), a = nz(-5, 5), b = nz(1, 6);
    const num = a + 'n^{' + d1 + '} + ' + rint(1, 9), den = b + 'n^{' + d2 + '} - ' + rint(1, 9);
    items.push(['\\frac{' + num + '}{' + den + '}', d1 < d2 ? '$0$' : d1 > d2 ? (a > 0 ? '$+\\infty$ (divergent)' : '$-\\infty$ (divergent)') : '$' + q(a, b).tex() + '$ (Leitkoeffizienten)']);
    const c = nz(1, 9); items.push(['\\sqrt{n^2 + ' + c + 'n} - n', '$' + q(c, 2).tex() + '$ (erweitern)']);
    const u = rint(2, 6), v = rint(2, 6); items.push(['\\sqrt[n]{' + u + '^n + ' + v + '^n}', '$' + Math.max(u, v) + '$ (Sandwich: $\\max \\le \\cdot \\le 2^{1/n}\\max$)']);
    const k = rint(1, 4), qq = rint(2, 5); items.push(['\\frac{n^{' + k + '}}{' + qq + '^n}', '$0$ (Exponential schlägt Potenz)']);
    items.push(['(-1)^n \\frac{n^2}{n^2 + 1}', 'divergent (Teilfolgen gegen $\\pm 1$)']);
    items.push(['\\sqrt[n]{' + c + 'n^{' + k + '}}', '$1$ ($\\sqrt[n]{' + c + '} \\to 1$ und $\\sqrt[n]{n} \\to 1$)']);
    items.push(['\\frac{1 + 2 + \\dots + n}{n^2 + ' + c + '}', '$\\frac12$ (Gaussche Summe $\\frac{n(n+1)}{2}$)']);
    const s = sample(items, 4);
    return { q: 'Bestimme (falls existent) den Grenzwert:' + ol(s.map((x) => '$' + x[0] + '$')), a: ol(s.map((x) => x[1])) };
  };
  G['param-limit'] = () => pick([
    { q: 'Für welche $x \\in \\mathbb{R}$ konvergiert $a_n = \\left(\\frac{2x}{1 + x^2}\\right)^n$?', a: 'Stets $\\left|\\frac{2x}{1+x^2}\\right| \\le 1$ (da $(|x| - 1)^2 \\ge 0$), Gleichheit nur bei $x = \\pm1$. $x = 1$: konstant $1$; $x = -1$: $(-1)^n$ divergiert. Konvergent für alle $x \\ne -1$.' },
    { q: 'Für welche $x \\ne -1$ konvergiert $a_n = \\left(\\frac{x - 1}{x + 1}\\right)^n$?', a: '$|x - 1| \\lt |x + 1| \\Leftrightarrow x \\gt 0$: dann $a_n \\to 0$. $x = 0$: $(-1)^n$ divergiert; $x \\lt 0$: Betrag $\\gt 1$, divergent. Also genau für $x \\gt 0$.' },
    { q: 'Für welche $x \\in \\mathbb{R}$ konvergiert $a_n = \\left(\\frac{1 + 2x}{1 + x^2}\\right)^{2n}$?', a: '$q(x) = \\left(\\frac{1+2x}{1+x^2}\\right)^2 \\le 1 \\Leftrightarrow x(2 - x) \\le 0$: für $x \\le 0$ oder $x \\ge 2$.' },
    { q: 'Für welche $x \\in \\mathbb{R}$ konvergiert $a_n = \\frac{x^n}{1 + x^{2n}}$?', a: 'Für alle $x$: $|x| \\lt 1$ und $|x| \\gt 1$ geben $0$; $x = 1$: $\\frac12$; $x = -1$: $\\frac{(-1)^n}{2}$ divergiert. Also alle $x \\ne -1$.' }
  ]);
  G.subseq = () => pick([
    { q: 'Gib eine unbeschränkte Folge mit einer konvergenten Teilfolge an.', a: '$(1, 2, 1, 4, 1, 6, \\dots)$: ungerade Glieder $\\equiv 1$.' },
    { q: 'Gib eine Folge an, die für jedes $m \\in \\mathbb{N}$ eine gegen $m$ konvergente Teilfolge hat.', a: '$(1, 1, 2, 1, 2, 3, 1, 2, 3, 4, \\dots)$.' },
    { q: 'Gib eine Folge an, die zu jedem $x \\in [0, 1]$ eine gegen $x$ konvergente Teilfolge hat.', a: 'Eine Abzählung von $\\mathbb{Q} \\cap [0, 1]$ – jede Zahl in $[0,1]$ wird von unendlich vielen Gliedern beliebig genau approximiert.' },
    { q: 'Gib eine divergente Folge an, deren Teilfolgen $(a_{2n})$ und $(a_{3n})$ beide konvergieren.', a: '$a_n = 1$ falls $n$ prim und $n \\ge 5$, sonst $0$: $a_{2n} = 0$ ($2n$ ist nur für $n = 1$ prim, $a_2 = 0$), $a_{3n} = 0$ analog; divergent wegen unendlich vieler Primzahlen.' }
  ]);
  G.recursion = () => {
    const lam = pick([q(1, 2), q(1, 3), q(2, 3), q(1, 4), q(3, 4)]), a0 = rint(-6, 6), a1 = rint(-6, 6);
    const L = q(a1).add(q(1).sub(lam).mul(a0)).div(q(2).sub(lam));
    return { q: 'Sei $a_0 = ' + a0 + '$, $a_1 = ' + a1 + '$ und $a_n = ' + lam.tex() + ' a_{n-1} + ' + q(1).sub(lam).tex() + ' a_{n-2}$. Zeige, dass $(a_n)$ konvergiert, und bestimme den Grenzwert.', a: 'Invariante: $a_n + ' + q(1).sub(lam).tex() + ' a_{n-1}$ ist konstant $= ' + q(a1).add(q(1).sub(lam).mul(a0)).tex() + '$; die Differenzen schrumpfen mit Faktor $' + q(1).sub(lam).neg().tex() + '$. Grenzwert $L$ mit $L(1 + ' + q(1).sub(lam).tex() + ') = ' + q(a1).add(q(1).sub(lam).mul(a0)).tex() + '$: $L = ' + L.tex() + '$.' };
  };
  G['cauchy-geo'] = () => {
    const b = rint(2, 5);
    return { q: 'Sei $|a_{n+1} - a_n| \\lt ' + b + '^{-n}$ für alle $n$. Zeige, dass $(a_n)$ eine Cauchy-Folge ist, und schätze $|a_m - a_n|$ für $m \\gt n$ ab.', a: '$|a_m - a_n| \\le \\sum_{k=n}^{m-1} ' + b + '^{-k} \\lt \\frac{' + b + '^{-n}}{1 - 1/' + b + '} = ' + q(b, b - 1).tex() + '\\cdot ' + b + '^{-n} \\to 0$.' };
  };
  G.telescope = () => pick([
    () => { const m = rint(1, 4); let H = q(0); for (let i = 1; i <= m; i++) H = H.add(q(1, i)); return { q: 'Berechne $\\sum_{k=1}^{\\infty} \\frac{1}{k(k + ' + m + ')}$.', a: '$\\frac{1}{k(k+' + m + ')} = \\frac{1}{' + m + '}\\left(\\frac1k - \\frac{1}{k+' + m + '}\\right)$, teleskopisch: $\\frac{1}{' + m + '}\\left(1 + \\dots + \\frac{1}{' + m + '}\\right) = ' + H.div(m).tex() + '$.' }; },
    () => { const m = rint(1, 4); const prod = 'k' + Array.from({ length: m }, (_, i) => '(k + ' + (i + 1) + ')').join(''); return { q: 'Berechne $\\sum_{k=1}^{\\infty} \\frac{1}{' + prod + '}$.', a: 'Teleskop mit $\\frac{1}{' + m + '}\\left(\\frac{1}{k\\cdots(k+' + (m - 1) + ')} - \\frac{1}{(k+1)\\cdots(k+' + m + ')}\\right)$: Summe $\\frac{1}{' + m + ' \\cdot ' + m + '!} = ' + q(1, m * fact(m)).tex() + '$.' }; },
    () => { const a = rint(2, 4); return { q: 'Berechne $\\sum_{k=1}^{\\infty} \\frac{1}{(' + a + 'k - 1)(' + a + 'k + ' + (a - 1) + ')}$.', a: '$= \\frac{1}{' + a + '}\\left(\\frac{1}{' + a + 'k - 1} - \\frac{1}{' + a + '(k+1) - 1}\\right)$, Summe $\\frac{1}{' + a + '(' + a + ' - 1)} = ' + q(1, a * (a - 1)).tex() + '$.' }; }
  ])();
  const SERIES = [
    ['\\sum \\frac{1}{n^2 + 1}', true, 'Majorante $\\sum \\frac1{n^2}$'], ['\\sum \\frac{n}{n^2 + 1}', false, 'asymptotisch $\\frac1n$'],
    ['\\sum \\frac{(-1)^n}{\\sqrt n}', true, 'Leibniz'], ['\\sum \\frac{1}{\\sqrt n}', false, 'Minorante $\\frac1n$'],
    ['\\sum \\frac{n!}{n^n}', true, 'Quotient $\\to \\frac1e \\lt 1$'], ['\\sum \\frac{2^n}{n!}', true, 'Quotient $\\to 0$'],
    ['\\sum \\frac{n^2}{2^n}', true, 'Wurzel $\\to \\frac12$'], ['\\sum (-1)^n \\frac{n}{n + 1}', false, 'keine Nullfolge'],
    ['\\sum \\frac{3^n}{2^n + 5^n}', true, 'Majorante $(3/5)^n$'], ['\\sum \\frac{1}{n(n+1)}', true, 'Teleskop, Summe 1'],
    ['\\sum \\left(\\frac{n}{n+1}\\right)^{n^2}', true, 'Wurzel $\\to \\frac1e$'], ['\\sum \\frac{1}{\\sqrt{n(n+2)}}', false, 'asymptotisch $\\frac1n$'],
    ['\\sum \\frac{\\cos(n)}{n^2}', true, 'absolut: Majorante $\\frac1{n^2}$'], ['\\sum \\sqrt[n]{2} - 1 \\text{ (ohne Vorzeichenwechsel)}', false, '$\\sqrt[n]2 - 1 \\ge \\frac{\\ln 2}{n}$'],
    ['\\sum (-1)^n (\\sqrt[n]{2} - 1)', true, 'Leibniz: monoton fallende Nullfolge'], ['\\sum \\frac{n + 3}{n^3 - 2n + 5}', true, 'asymptotisch $\\frac{1}{n^2}$'],
    ['\\sum \\frac{n^5}{(1.1)^n}', true, 'Wurzel $\\to \\frac{1}{1.1}$'], ['\\sum \\frac{(n!)^2}{(2n)!}', true, 'Quotient $\\to \\frac14$'],
    ['\\sum \\frac{1}{1 + q^n} \\ (0 \\lt q \\lt 1)', false, 'Glieder $\\to 1$'], ['\\sum \\frac{n^n}{(2n)!}', true, 'Wurzel $\\to 0$']
  ];
  G.series = () => { const s = sample(SERIES, 5); return { q: 'Konvergent oder divergent? (Summation ab $n = 1$)' + ol(s.map((x) => '$' + x[0] + '$')), a: ol(s.map((x) => '<b>' + (x[1] ? 'konvergent' : 'divergent') + '</b>: ' + x[2])) }; };
  G.geomsum = () => { const c = rint(4, 9), a = rint(1, c - 1); let b; do b = rint(1, c - 1); while (b === a); return { q: 'Berechne $\\sum_{n=1}^\\infty \\frac{' + a + '^n + ' + b + '^n}{' + c + '^n}$.', a: '$\\frac{' + a + '}{' + (c - a) + '} + \\frac{' + b + '}{' + (c - b) + '} = ' + q(a, c - a).add(q(b, c - b)).tex() + '$ (zwei geometrische Reihen ab $n = 1$).' }; };
  G.radius = () => {
    const k = rint(1, 4), c = rint(2, 5), b = rint(1, 6), d = rint(1, 6);
    const P = [
      ['a_n = n^{' + k + '}', '$R = 1$'], ['a_n = ' + c + '^n', '$R = ' + q(1, c).tex() + '$'], ['a_n = \\frac{1}{n!}', '$R = \\infty$'], ['a_n = n!', '$R = 0$'],
      ['a_n = \\frac{' + c + '^n}{n^{' + k + '}}', '$R = ' + q(1, c).tex() + '$'], ['a_n = ' + b + '^n \\text{ (n gerade)},\\ ' + d + '^n \\text{ (n ungerade)}', '$R = ' + q(1, Math.max(b, d)).tex() + '$'],
      ['a_n = q^{n^2},\\ |q| \\lt 1', '$R = \\infty$'], ['a_n = \\frac{n^n}{n!}', '$R = \\frac1e$ (Euler: Quotient $\\to e$)']
    ];
    const s = sample(P, 4);
    return { q: 'Bestimme den Konvergenzradius von $\\sum a_n z^n$:' + ol(s.map((x) => '$' + x[0] + '$')), a: ol(s.map((x) => x[1])) + 'Cauchy-Hadamard $R = 1/\\limsup \\sqrt[n]{|a_n|}$ oder Euler $R = \\lim |a_n/a_{n+1}|$.' };
  };
  G.boundary = () => {
    const p = pick([0, q(1, 2), q(1), q(3, 2), q(2), q(3)]); const pv = Q.of(p).val(); const ptx = Q.of(p).tex();
    return { q: 'Bestimme den Konvergenzradius von $\\sum_{n \\ge 1} \\frac{z^n}{n^{' + ptx + '}}$ und untersuche die Konvergenz auf $|z| = R$.', a: '$R = 1$. ' + (pv === 0 ? 'Auf $|z| = 1$ keine Nullfolge: überall divergent.' : pv <= 1 ? 'In $z = 1$ divergent ($\\sum n^{-' + ptx + '}$), sonst auf $|z| = 1$ konvergent (Umschreiben mit $(1 - z)$ wie in Serie 7, Aufgabe 7.2).' : 'Absolut konvergent auf ganz $|z| = 1$ (Majorante $\\sum n^{-' + ptx + '}$).') };
  };
  G['func-inverse'] = () => pick([
    () => { const a = rint(0, 5), b = rint(1, 6); return { q: 'Sei $f: (0, \\infty) \\to \\mathbb{R}$, $f(x) = ' + a + ' + \\frac{' + b + '}{x}$. Bestimme Bild, Umkehrfunktion und $f \\circ f$.', a: 'Bild $(' + a + ', \\infty)$, $f^{-1}(y) = \\frac{' + b + '}{y - ' + a + '}$, $(f \\circ f)(x) = ' + a + ' + \\frac{' + b + 'x}{' + a + 'x + ' + b + '}$.' }; },
    () => { const c = rint(1, 5), k = rint(1, 6); return { q: 'Sei $f(x) = -' + c + '$ für $x \\le 0$ und $f(x) = \\frac{' + k + '}{x}$ für $x \\gt 0$. Bestimme $f \\circ f$ und die $n$-fache Verkettung.', a: '$(f \\circ f)(x) = -' + c + '$ für $x \\le 0$ und $= x$ für $x \\gt 0$. Für gerades $n$ ist $f^{\\circ n} = f \\circ f$, für ungerades $n$ gleich $f$.' }; }
  ])();
  G.pointwise = () => pick([
    { q: 'Bestimme $f(x) = \\lim f_n(x)$ für $f_n(x) = x^n$ auf $[0, 1]$. Ist $f$ stetig?', a: '$f = 0$ auf $[0, 1)$, $f(1) = 1$ – unstetig in $1$, obwohl alle $f_n$ stetig sind.' },
    { q: 'Bestimme $\\lim f_n(x)$ für $f_n(x) = \\frac{1}{1 + x^{2n}}$ auf $\\mathbb{R}$. Wo ist der Grenzwert stetig?', a: '$1$ für $|x| \\lt 1$, $\\frac12$ für $|x| = 1$, $0$ für $|x| \\gt 1$; unstetig genau in $x = \\pm 1$.' },
    { q: 'Bestimme $\\lim f_n(x)$ für $f_n(x) = \\frac{nx}{1 + |nx|}$. Wo ist der Grenzwert stetig?', a: '$\\mathrm{sign}(x)$ ($0$ in $0$); stetig auf $\\mathbb{R} \\setminus \\{0\\}$.' },
    { q: 'Bestimme $\\lim f_n(x)$ für $f_n(x) = \\frac{x^{2n}}{1 + x^{2n}}$. Wo ist der Grenzwert stetig?', a: '$0$ für $|x| \\lt 1$, $\\frac12$ für $|x| = 1$, $1$ für $|x| \\gt 1$; unstetig in $\\pm 1$.' }
  ]);
  G.ivt = () => {
    let a, b, c, f, iv;
    do { a = rint(-6, 6); b = rint(-6, 6); c = rint(-9, 9); f = (x) => x ** 3 + a * x * x + b * x + c; iv = null; for (let x = -5; x < 5; x++) if (f(x) * f(x + 1) < 0) { iv = x; break; } } while (iv === null);
    const pt = polyTex([1, a, b, c]).replace(/X/g, 'x');
    return { q: 'Zeige mit dem Zwischenwertsatz, dass $p(x) = ' + pt + '$ eine Nullstelle in einem Intervall $[k, k+1]$ mit ganzem $k$ hat, und gib ein solches an.', a: '$p(' + iv + ') = ' + f(iv) + '$ und $p(' + (iv + 1) + ') = ' + f(iv + 1) + '$ haben verschiedene Vorzeichen, $p$ ist stetig: Nullstelle in $[' + iv + ', ' + (iv + 1) + ']$.' };
  };

  /* ---------- EiS ---------- */
  G.setid = () => {
    const P = [['A \\cup (A \\cap B)', 'A'], ['A \\cap (A \\cup B)', 'A'], ['(A \\setminus B) \\cup (A \\cap B)', 'A'], ['A \\setminus (A \\setminus B)', 'A \\cap B'], ['(A \\cup B)^c', 'A^c \\cap B^c'], ['A \\cap (B \\setminus A)', '\\emptyset'], ['(A \\cap B) \\cup (A \\cap B^c)', 'A'], ['A \\cup A^c', '\\Omega'], ['(A^c \\cup C) \\cap (B \\cup C)', '(A^c \\cap B) \\cup C'], ['(A \\setminus B) \\cup (A \\cap B) \\cup (B \\setminus A)', 'A \\cup B']];
    const s = sample(P, 4); return { q: 'Vereinfache:' + ol(s.map((x) => '$' + x[0] + '$')), a: ol(s.map((x) => '$' + x[1] + '$')) };
  };
  G.events = () => {
    const P = [['Mindestens eines von $A, B, C$ tritt ein.', 'A \\cup B \\cup C'], ['Keines von $A, B, C$ tritt ein.', 'A^c \\cap B^c \\cap C^c'], ['Genau eines tritt ein.', '(A \\cap B^c \\cap C^c) \\cup (A^c \\cap B \\cap C^c) \\cup (A^c \\cap B^c \\cap C)'], ['Mindestens zwei treten ein.', '(A \\cap B) \\cup (A \\cap C) \\cup (B \\cap C)'], ['Höchstens eines tritt ein.', '(A \\cap B)^c \\cap (A \\cap C)^c \\cap (B \\cap C)^c'], ['Alle drei treten ein.', 'A \\cap B \\cap C'], ['$A$ tritt nur ein, wenn $B$ eintritt.', 'A \\subset B'], ['$A$ und $B$ treten nie gemeinsam ein.', 'A \\cap B = \\emptyset'], ['Mindestens eines tritt nicht ein.', 'A^c \\cup B^c \\cup C^c']];
    const s = sample(P, 4); return { q: 'Schreibe in Mengenschreibweise:' + ol(s.map((x) => x[0])), a: ol(s.map((x) => '$' + x[1] + '$')) };
  };
  G.pspace = () => pick([
    { q: 'Modelliere „zwei faire Würfel werfen" als Wahrscheinlichkeitsraum. Wie gross ist $P(\\text{Summe} = 7)$?', a: '$\\Omega = \\{1, \\dots, 6\\}^2$, $\\mathcal{A} = \\mathcal{P}(\\Omega)$, Laplace; $P = \\frac{6}{36} = \\frac16$.' },
    { q: 'Modelliere „dreimal eine faire Münze werfen". Wie gross ist $P(\\text{genau zweimal Kopf})$?', a: '$\\Omega = \\{K, Z\\}^3$ ($8$ Elemente), Laplace; $P = \\frac38$.' },
    { q: 'Modelliere „Münze werfen, dann so oft würfeln, wie die Münze Kopf zeigt (Kopf = 2, Zahl = 1)".', a: 'Zweistufig: $\\Omega = \\{Z\\} \\times \\{1..6\\} \\cup \\{K\\} \\times \\{1..6\\}^2$ mit $P(Z, i) = \\frac{1}{12}$, $P(K, i, j) = \\frac{1}{72}$.' },
    { q: 'Modelliere „aus einer Urne mit 3 roten und 2 blauen Kugeln zweimal ohne Zurücklegen ziehen".', a: '$\\Omega$ = geordnete Paare verschiedener Kugeln ($5 \\cdot 4 = 20$), Laplace; z.B. $P(\\text{rot, rot}) = \\frac{6}{20}$.' }
  ]);
  G.survey = () => {
    const a = rint(40, 90), b = rint(30, 90), c = rint(10, Math.min(a, b));
    const ok = a + b - c <= 100;
    return { q: 'Eine Umfrage meldet: $' + a + '\\,\\%$ besitzen A, $' + b + '\\,\\%$ besitzen B, $' + c + '\\,\\%$ beides. Sind die Daten widerspruchsfrei? Wie viel Prozent besitzen keines?', a: '$P(A \\cup B) = ' + a + ' + ' + b + ' - ' + c + ' = ' + (a + b - c) + '\\,\\%$' + (ok ? ': widerspruchsfrei, keines: $' + (100 - a - b + c) + '\\,\\%$.' : ' $\\gt 100\\,\\%$: Widerspruch!') };
  };
  G.powerset = () => { const n = rint(2, 6); return { q: 'Sei $\\Omega = \\{1, \\dots, ' + n + '\\}$ und $\\mathcal{A} = \\mathcal{P}(\\Omega)$. Wie viele Elemente hat $\\mathcal{A}$? Ist $\\Omega \\in \\mathcal{A}$ oder $\\Omega \\subset \\mathcal{A}$?', a: '$2^{' + n + '} = ' + 2 ** n + '$. $\\Omega \\in \\mathcal{A}$ (Element), aber nicht $\\Omega \\subset \\mathcal{A}$ (Zahlen sind keine Mengen von $\\mathcal{A}$).' }; };
  G.measure = () => {
    let p; do { p = [rint(1, 7), rint(1, 7), rint(1, 7)].map((x) => x * 5); } while (p[0] + p[1] + p[2] >= 100);
    p.push(100 - p[0] - p[1] - p[2]); const f = (x) => fx(x / 100, 2);
    return { q: '$\\Omega = \\{1, 2, 3, 4\\}$, $P(\\{1, 2\\}) = ' + f(p[0] + p[1]) + '$, $P(\\{2, 3\\}) = ' + f(p[1] + p[2]) + '$, $P(\\{2\\}) = ' + f(p[1]) + '$. Bestimme $P(\\{i\\})$ für alle $i$.', a: '$P(\\{1\\}) = ' + f(p[0]) + '$, $P(\\{2\\}) = ' + f(p[1]) + '$, $P(\\{3\\}) = ' + f(p[2]) + '$, $P(\\{4\\}) = ' + f(p[3]) + '$.' };
  };
  G.interval = () => {
    const r = rint(2, 5), c = rint(1, r - 1);
    return { q: 'Auf $(0, 1]$ gelte $P((a, b]) = b - a$. Berechne $P\\left(\\bigcup_{k \\ge 1} (' + c + ' \\cdot ' + r + '^{-k},\\ ' + r + '^{-k+1}]\\right)$.', a: 'Disjunkte Intervalle der Länge $' + r + '^{-k}(' + r + ' - ' + c + ')$; Summe $(' + r + ' - ' + c + ')\\sum_{k\\ge1}' + r + '^{-k} = \\frac{' + (r - c) + '}{' + (r - 1) + '} = ' + q(r - c, r - 1).tex() + '$.' };
  };
  G.comb = () => {
    const P = [
      () => { const n = rint(4, 10); return ['Wie viele Arten gibt es, $' + n + '$ Türme auf ein $' + n + '\\times' + n + '$-Brett zu stellen, ohne dass sie sich bedrohen?', '$' + n + '! = ' + fact(n) + '$']; },
      () => { const a = rint(2, 5), b = rint(2, 5), c = rint(2, 5); return ['Ein Zug aus $' + a + '$ Wagen Typ A, $' + b + '$ Typ B, $' + c + '$ Typ C (gleiche Typen ununterscheidbar). Wie viele Reihenfolgen?', '$\\frac{' + (a + b + c) + '!}{' + a + '!\\,' + b + '!\\,' + c + '!} = ' + fact(a + b + c) / (fact(a) * fact(b) * fact(c)) + '$']; },
      () => { const k = rint(2, 5); return ['Wie viele $' + k + '$-stellige Zahlen aus den Ziffern 1–9 ohne Wiederholung gibt es?', '$\\frac{9!}{' + (9 - k) + '!} = ' + fact(9) / fact(9 - k) + '$']; },
      () => { const k = rint(2, 5); return ['Wie viele $' + k + '$-stellige Zahlen haben nur gerade Ziffern?', '$4 \\cdot 5^{' + (k - 1) + '} = ' + 4 * 5 ** (k - 1) + '$ (erste Ziffer nicht 0)']; },
      () => { const n = rint(5, 12); return ['Wie viele Dreiecke bilden $' + n + '$ Punkte (keine drei auf einer Geraden)?', '$\\binom{' + n + '}{3} = ' + binom(n, 3) + '$']; },
      () => { const m = rint(4, 9); return ['Dominosteine mit Zahlen $0, \\dots, ' + m + '$ (Doppel erlaubt): wie viele?', '$\\binom{' + (m + 2) + '}{2} = ' + binom(m + 2, 2) + '$']; }
    ];
    const s = sample(P, 3).map((f) => f());
    return { q: ol(s.map((x) => x[0])), a: ol(s.map((x) => x[1])) };
  };
  G.cards = () => {
    const s = pick([4]), r = pick([8, 9, 13]), N = s * r;
    return { q: 'Ein Kartenspiel mit $' + N + '$ Karten ($' + s + '$ Farben zu $' + r + '$) wird gemischt. Wahrscheinlichkeit, dass (a) die dritte Karte ein As ist, (b) oben ein bestimmtes As und unten ein anderes bestimmtes As liegt, (c) die obersten $' + r + '$ Karten alle Herz sind?', a: '(a) $\\frac{4}{' + N + '} = ' + q(4, N).tex() + '$ (Symmetrie). (b) $\\frac{1}{' + N + '\\cdot' + (N - 1) + '} = ' + q(1, N * (N - 1)).tex() + '$. (c) $1/\\binom{' + N + '}{' + r + '}$.' };
  };
  G.socks = () => {
    const r = rint(3, 9), b = rint(3, 9), n = r + b, t = binom(n, 2);
    return { q: '$' + r + '$ rote und $' + b + '$ blaue Socken, zwei zufällig gezogen. Wahrscheinlichkeit für (a) zwei rote, (b) zwei verschiedene, (c) ein passendes Paar?', a: '(a) $' + q(binom(r, 2), t).tex() + '$, (b) $' + q(r * b, t).tex() + '$, (c) $' + q(binom(r, 2) + binom(b, 2), t).tex() + '$ (Nenner $\\binom{' + n + '}{2} = ' + t + '$).' };
  };
  G.birthday = () => { const n = rint(10, 70); let p = 1; for (let i = 0; i < n; i++) p *= (365 - i) / 365; return { q: 'Wahrscheinlichkeit, dass unter $' + n + '$ Personen mindestens zwei am selben Tag Geburtstag haben (365 Tage, gleichverteilt)?', a: '$1 - \\prod_{i=0}^{' + (n - 1) + '} \\frac{365 - i}{365} \\approx ' + fx(1 - p) + '$.' }; };
  G.accept = () => {
    const N = 1000, n = pick([50, 100]), d = pick([10, 20, 50, 100]), c = rint(1, 3);
    let s = 0; for (let k = 0; k <= c; k++) s += Math.exp(lbinom(d, k) + lbinom(N - d, n - k) - lbinom(N, n));
    return { q: 'Lieferung von $' + N + '$ Teilen mit $' + d + '$ fehlerhaften; Stichprobe von $' + n + '$ ohne Zurücklegen; angenommen bei höchstens $' + c + '$ Fehlern. Annahmewahrscheinlichkeit?', a: 'Hypergeometrisch: $\\sum_{k=0}^{' + c + '} \\frac{\\binom{' + d + '}{k}\\binom{' + (N - d) + '}{' + n + ' - k}}{\\binom{' + N + '}{' + n + '}} \\approx ' + fx(s) + '$.' };
  };
  G.overbook = () => {
    const seats = pick([50, 100, 200]), extra = rint(2, 8), n = seats + extra, p = pick([0.85, 0.9, 0.95]);
    let s = 0; for (let k = seats + 1; k <= n; k++) s += Math.exp(lbinom(n, k) + k * Math.log(p) + (n - k) * Math.log(1 - p));
    return { q: '$' + n + '$ Tickets für $' + seats + '$ Plätze, jede Person erscheint unabhängig mit Wahrscheinlichkeit $' + p + '$. Wahrscheinlichkeit für Überbuchung?', a: '$X \\sim \\mathrm{Bin}(' + n + ', ' + p + ')$, $P(X \\gt ' + seats + ') \\approx ' + fx(s) + '$.' };
  };
  G.bits = () => {
    const n = rint(3, 6), p = pick([0.001, 0.01, 0.05]), k = rint(1, 2);
    const pk = binom(n, k) * p ** k * (1 - p) ** (n - k), pa = 1 - (1 - p) ** n;
    return { q: 'Bitfolge der Länge $' + n + '$, jedes Bit unabhängig mit Wahrscheinlichkeit $' + p + '$ falsch. Wahrscheinlichkeit für genau $' + k + '$ Fehler, für mindestens einen Fehler, und für genau $' + k + '$ Fehler gegeben mindestens einen?', a: '$\\binom{' + n + '}{' + k + '}p^{' + k + '}(1-p)^{' + (n - k) + '} \\approx ' + pk.toExponential(3) + '$; $1 - (1-p)^{' + n + '} \\approx ' + fx(pa, 6) + '$; bedingt $\\approx ' + fx(pk / pa, 6) + '$.' };
  };
  G.cardflip = () => {
    const rr = rint(4, 12), ss = rint(1, 6), rs = rint(1, 5), N = rr + ss + rs;
    return { q: '$' + rr + '$ Karten rot/rot, $' + ss + '$ schwarz/schwarz, $' + rs + '$ rot/schwarz; eine zufällige Karte liegt mit zufälliger Seite oben. Wahrscheinlichkeit, dass unten schwarz ist, (a) allgemein, (b) wenn oben rot ist?', a: '(a) $\\frac{' + ss + ' + ' + rs + '/2}{' + N + '} = ' + q(2 * ss + rs, 2 * N).tex() + '$. (b) $\\frac{' + rs + '/2}{' + rr + ' + ' + rs + '/2} = ' + q(rs, 2 * rr + rs).tex() + '$.' };
  };
  G.bulbs = () => {
    const w = [rint(5, 17), rint(1, 5), rint(1, 3)], W = w[0] + w[1] + w[2], pr = [0.8, 0.5, 0.2].map((x) => pick([x, x + 0.1, x - 0.1]));
    const fail = w.reduce((s, x, i) => s + (x / W) * (1 - pr[i]), 0), lowFail = (w[2] / W) * (1 - pr[2]);
    return { q: 'Drei Qualitäten im Verhältnis $' + w.join(' : ') + '$ halten mit Wahrscheinlichkeit $' + pr.map((x) => fx(x, 1)).join(' / ') + '$ länger als 5000 h. (a) Wahrscheinlichkeit für einen Ausfall vor 5000 h? (b) Eine Birne fiel vorher aus – Wahrscheinlichkeit, dass sie nicht die schlechteste Qualität hat?', a: '(a) Totale Wahrscheinlichkeit: $\\approx ' + fx(fail) + '$. (b) Bayes: $1 - \\frac{' + fx(lowFail) + '}{' + fx(fail) + '} \\approx ' + fx(1 - lowFail / fail) + '$.' };
  };
  G.luggage = () => {
    const k = rint(2, 5), i = rint(1, k);
    return { q: 'Ein Koffer wird an jedem von $' + k + '$ Umsteigeflughäfen unabhängig mit Wahrscheinlichkeit $p$ fehlgeleitet. Er fehlt am Ziel. Wahrscheinlichkeit, dass es am $' + i + '$. Flughafen passierte?', a: '$\\frac{(1-p)^{' + (i - 1) + '}p}{1 - (1-p)^{' + k + '}}$ (Bayes; Nenner = Wahrscheinlichkeit, dass er fehlt).' };
  };
  G.bayes = () => {
    const sens = pick([0.99, 0.995, 0.999]), spec = pick([0.95, 0.99, 0.998]), prev = pick([0.0005, 0.001, 0.01, 0.05]);
    const fp = (1 - spec) * (1 - prev), tp = sens * prev, p1 = fp / (fp + tp);
    const fp2 = (1 - spec) ** 2 * (1 - prev), tp2 = sens ** 2 * prev;
    return { q: 'Test mit Sensitivität $' + sens + '$ und Spezifität $' + spec + '$, Prävalenz $' + prev + '$. Positiv getestet – Wahrscheinlichkeit, gesund zu sein? Und nach einem zweiten unabhängigen positiven Test?', a: 'Einmal: $\\frac{' + fx(1 - spec) + '\\cdot' + fx(1 - prev) + '}{' + fx(1 - spec) + '\\cdot' + fx(1 - prev) + ' + ' + sens + '\\cdot' + prev + '} \\approx ' + fx(p1) + '$. Zweimal: $\\approx ' + fx(fp2 / (fp2 + tp2)) + '$.' };
  };
  G['dice-dist'] = () => {
    const N = rint(4, 10), k = rint(1, 3);
    return { q: '$' + N + '$ faire Würfel. Wahrscheinlichkeit für genau $' + k + '$ Sechsen? Welche Verteilung? Wahrscheinlichkeit, dass jede Augenzahl gleich oft vorkommt (falls möglich)?', a: '$\\binom{' + N + '}{' + k + '}\\left(\\frac16\\right)^{' + k + '}\\left(\\frac56\\right)^{' + (N - k) + '} \\approx ' + fx(binom(N, k) * (1 / 6) ** k * (5 / 6) ** (N - k)) + '$, Binomialverteilung. ' + (N % 6 === 0 ? 'Gleich oft: Multinomial $\\frac{' + N + '!}{(' + N / 6 + '!)^6}6^{-' + N + '}$.' : 'Gleich oft: unmöglich, da $' + N + '$ nicht durch 6 teilbar.') };
  };
  G.maxdice = () => {
    const n = pick([4, 6, 8, 10, 12]), mx = Math.random() < 0.5;
    return { q: 'Zwei faire $' + n + '$-seitige Würfel. Bestimme die Verteilung des ' + (mx ? 'Maximums' : 'Minimums') + ' $M$.', a: mx ? '$P(M \\le k) = \\frac{k^2}{' + n * n + '}$, also $P(M = k) = \\frac{2k - 1}{' + n * n + '}$ für $k = 1, \\dots, ' + n + '$.' : '$P(M \\ge k) = \\frac{(' + n + ' - k + 1)^2}{' + n * n + '}$, also $P(M = k) = \\frac{2(' + n + ' - k) + 1}{' + n * n + '}$.' };
  };
  G.transform = () => {
    const l = rint(1, 4);
    return { q: 'Der Radius $R$ einer Kreisscheibe sei $\\mathrm{Exp}(' + l + ')$-verteilt. Bestimme Verteilungsfunktion und Dichte der Fläche $A = \\pi R^2$.', a: '$F_A(a) = P(R \\le \\sqrt{a/\\pi}) = 1 - e^{-' + l + '\\sqrt{a/\\pi}}$ für $a \\ge 0$; Dichte $f_A(a) = \\frac{' + l + '}{2\\sqrt{\\pi a}} e^{-' + l + '\\sqrt{a/\\pi}}$.' };
  };
  G.cdfcheck = () => {
    const P = [
      ['$F = 0$ ($x \\lt 0$), $x^2$ ($0 \\le x \\le 1$), $1$ ($x \\gt 1$)', true, 'stetig, monoton, Grenzwerte 0 und 1'],
      ['$F = 0$ ($x \\lt 0$), $\\frac12$ ($0 \\le x \\le 1$), $1$ ($x \\gt 1$)', false, 'nicht rechtsstetig in $1$'],
      ['$F = 0$ ($x \\lt 0$), $\\frac12$ ($0 \\le x \\lt 1$), $1$ ($x \\ge 1$)', true, 'Sprünge in $0$ und $1$, rechtsstetig'],
      ['$F(x) = \\frac{1}{1 + e^{-x}}$', true, 'logistisch'],
      ['$F = 0$ ($x \\lt 0$), $1 - x$ ($0 \\le x \\lt 1$), $1$ ($x \\ge 1$)', false, 'fallend auf $[0, 1)$'],
      ['$F(x) = \\frac{x}{1 + |x|}$', false, '$F \\to -1$ für $x \\to -\\infty$'],
      ['$F = 0$ ($x \\lt 1$), $1 - \\frac1x$ ($x \\ge 1$)', true, 'stetig, monoton, $\\to 1$']
    ];
    const s = sample(P, 4); return { q: 'Welche Funktionen sind Verteilungsfunktionen?' + ol(s.map((x) => x[0])), a: ol(s.map((x) => (x[1] ? 'Ja' : 'Nein') + ': ' + x[2] + '.')) };
  };
  G['density-const'] = () => pick([
    () => { const a = pick([q(3, 2), q(2), q(3), q(5, 2), q(4)]); return { q: 'Bestimme $c$, so dass $f(x) = c\\,x^{-' + a.tex() + '}$ für $x \\ge 1$ (sonst $0$) eine Dichte ist.', a: '$\\int_1^\\infty x^{-' + a.tex() + '}dx = \\frac{1}{' + a.sub(1).tex() + '}$, also $c = ' + a.sub(1).tex() + '$.' }; },
    () => { const k = rint(1, 5); return { q: 'Bestimme $c$, so dass $f(x) = c\\,x^{' + k + '}$ auf $[0, 1]$ (sonst $0$) eine Dichte ist, und berechne $P(X \\le \\frac12)$.', a: '$c = ' + (k + 1) + '$; $P(X \\le \\frac12) = 2^{-' + (k + 1) + '} = ' + q(1, 2 ** (k + 1)).tex() + '$.' }; },
    () => { const l = rint(1, 5); return { q: 'Bestimme $c$, so dass $f(x) = c\\,e^{-' + l + 'x}$ für $x \\ge 0$ eine Dichte ist.', a: '$c = ' + l + '$ (Exponentialverteilung).' }; }
  ])();
  G['cdf-density'] = () => {
    const k = rint(2, 5);
    return pick([
      { q: 'Hat $F(x) = x^{' + k + '}$ auf $[0, 1]$ (0 links, 1 rechts) eine Dichte? Bestimme sie.', a: 'Ja: $f(x) = ' + k + 'x^{' + (k - 1) + '}$ auf $[0, 1]$.' },
      { q: 'Hat $F(x) = x^{' + (k + 1) + '}$ auf $[0, \\frac12)$ und $x^{' + k + '}$ auf $[\\frac12, 1]$ eine Dichte?', a: 'Nein: Sprung in $\\frac12$ von $2^{-' + (k + 1) + '}$ auf $2^{-' + k + '}$.' },
      { q: 'Bestimme die Dichte von $F(x) = 1 - e^{-x^2}$ für $x \\ge 0$.', a: '$f(x) = 2x e^{-x^2}$ für $x \\ge 0$.' }
    ]);
  };
  G.quantile = () => {
    const k = rint(2, 4), c = rint(2, 5);
    return { q: '$\\omega$ sei gleichverteilt auf $[0, 1]$. Bestimme die Verteilungsfunktionen von $X = ' + c + '\\omega$, $Y = \\omega^{' + k + '}$ und $Z = e^\\omega$.', a: '$F_X(x) = \\frac{x}{' + c + '}$ auf $[0, ' + c + ']$; $F_Y(y) = y^{1/' + k + '}$ auf $[0, 1]$; $F_Z(z) = \\ln z$ auf $[1, e]$. Allgemein ist $F_X$ die Umkehrfunktion einer monotonen $X$.' };
  };
  G.urn3 = () => {
    const N = rint(8, 12), mode = pick(['sum', 'gt']);
    let good = 0, tot = 0;
    for (let a = 1; a <= N; a++) for (let b = 1; b <= N; b++) for (let c = 1; c <= N; c++) { if (a === b || b === c || a === c) continue; tot++; if (mode === 'sum' ? (a + b + c) % 2 === 0 : c >= 2 * (a + b)) good++; }
    return { q: 'Drei Kugeln ohne Zurücklegen aus $\\{1, \\dots, ' + N + '\\}$; $X_i$ die $i$-te Nummer. Bestimme ' + (mode === 'sum' ? '$P(X_1 + X_2 + X_3 \\text{ gerade})$.' : '$P(X_3 \\ge 2(X_1 + X_2))$.'), a: 'Abzählen der $' + tot + '$ gleich wahrscheinlichen Tripel: $' + q(good, tot).tex() + '$.' };
  };
  G.pareto = () => {
    const a = rint(2, 5);
    return { q: 'Dichte $f(t) = C t^{-' + a + '}$ für $t \\ge 1$. Bestimme $C$, $F_X$, und die Verteilung von $Z = ' + a + '\\ln X$.', a: '$C = ' + (a - 1) + '$, $F_X(t) = 1 - t^{-' + (a - 1) + '}$, $Z \\sim \\mathrm{Exp}\\left(' + q(a - 1, a).tex() + '\\right)$.' };
  };
  G['indep-dice'] = () => {
    const E = [['$X_1$ gerade', (o) => o[0] % 2 === 0], ['$X_2 \\ge 5$', (o) => o[1] >= 5], ['$X_1 \\ge 3$', (o) => o[0] >= 3], ['$S$ gerade', (o) => (o[0] + o[1]) % 2 === 0], ['$S = 7$', (o) => o[0] + o[1] === 7], ['$X_1 = X_2$', (o) => o[0] === o[1]], ['$X_1 = 6$', (o) => o[0] === 6], ['$S \\ge 10$', (o) => o[0] + o[1] >= 10], ['$X_1 \\ge 2$', (o) => o[0] >= 2]];
    const O = []; for (let i = 1; i <= 6; i++) for (let j = 1; j <= 6; j++) O.push([i, j]);
    const P = (f) => q(O.filter(f).length, 36);
    const [A, B] = sample(E, 2), pab = P((o) => A[1](o) && B[1](o)), pp = P(A[1]).mul(P(B[1]));
    return { q: 'Zwei faire Würfel, $S = X_1 + X_2$. Sind „' + A[0] + '" und „' + B[0] + '" unabhängig?', a: '$P(A \\cap B) = ' + pab.tex() + '$, $P(A)P(B) = ' + P(A[1]).tex() + '\\cdot' + P(B[1]).tex() + ' = ' + pp.tex() + '$: ' + (pab.eq(pp) ? '<b>unabhängig</b>.' : '<b>abhängig</b>.') };
  };
  G.reliability = () => {
    const p = [0, 0, 0, 0, 0].map(() => pick([0.8, 0.9, 0.95, 0.7]));
    const ser = p[0] * p[1] * p[2], par = 1 - (1 - p[0]) * (1 - p[1]) * (1 - p[2]), up = (1 - (1 - p[0]) * (1 - p[1])) * p[2], low = p[3] * p[4], mix = 1 - (1 - up) * (1 - low);
    return { q: 'Bauteile funktionieren unabhängig mit $p = (' + p.join(', ') + ')$. Wahrscheinlichkeit, dass (a) die Serienschaltung $T_1 T_2 T_3$, (b) die Parallelschaltung von $T_1, T_2, T_3$, (c) „($T_1 \\parallel T_2$) dann $T_3$" parallel zu „$T_4$ dann $T_5$" funktioniert?', a: '(a) $p_1p_2p_3 \\approx ' + fx(ser) + '$; (b) $1 - \\prod(1 - p_i) \\approx ' + fx(par) + '$; (c) $1 - (1 - u)(1 - p_4p_5)$ mit $u = (1 - (1-p_1)(1-p_2))p_3$: $\\approx ' + fx(mix) + '$.' };
  };
  G.poisson = () => {
    const n = pick([200, 500, 1000]), p = pick([0.002, 0.004, 0.005, 0.01]), l = n * p;
    return { q: 'Eine Nebenwirkung tritt bei $' + 100 * p + '\\,\\%$ der Impfungen auf. Wahrscheinlichkeit für mindestens eine Nebenwirkung bei $' + n + '$ Impfungen, und erwartete Anzahl?', a: 'Exakt $1 - (1 - ' + p + ')^{' + n + '} \\approx ' + fx(1 - (1 - p) ** n) + '$; Poisson-Näherung $1 - e^{-' + fx(l, 2) + '} \\approx ' + fx(1 - Math.exp(-l)) + '$. Erwartet $' + fx(l, 2) + '$.' };
  };
  G.game = () => {
    const s = pick([q(1, 6), q(1, 4), q(1, 3), q(1, 2)]), f = q(1).sub(s);
    const pA = s.div(q(1).sub(f.mul(f)));
    return { q: 'A und B werfen abwechselnd (A beginnt); jeder Wurf ist unabhängig mit Wahrscheinlichkeit $' + s.tex() + '$ ein Treffer, wer zuerst trifft, gewinnt. Wahrscheinlichkeit, dass A gewinnt? Und bei der Reihenfolge ABBA BA BA…?', a: 'ABAB: $P = \\frac{' + s.tex() + '}{1 - (' + f.tex() + ')^2} = ' + pA.tex() + '$. ABBABA…: $' + s.tex() + ' + (' + f.tex() + ')^3 \\cdot ' + pA.tex() + ' = ' + s.add(f.mul(f).mul(f).mul(pA)).tex() + '$.' };
  };
  G.exp = () => { const l = pick([0.001, 0.0011, 0.002, 0.0005]), t = pick([500, 1000, 2000, 5000]); return { q: 'Die Reichweite sei $\\mathrm{Exp}(' + l + ')$-verteilt (in km). Wahrscheinlichkeit, $' + t + '$ km zu schaffen? Erwartete Reichweite?', a: '$e^{-' + l + '\\cdot' + t + '} \\approx ' + fx(Math.exp(-l * t)) + '$; Erwartung $\\frac1\\lambda \\approx ' + fx(1 / l, 0) + '$ km.' }; };
  G.capture = () => { const M2 = rint(50, 200), n = rint(50, 200), k = rint(5, Math.min(M2, n) - 1); return { q: '$' + M2 + '$ Fische markiert; später $' + n + '$ gefangen, davon $' + k + '$ markiert. Welche Verteilung hat die Anzahl markierter? Schätze die Population $N$ (Maximum-Likelihood).', a: 'Hypergeometrisch. $\\hat N = \\lfloor \\frac{' + M2 + '\\cdot' + n + '}{' + k + '} \\rfloor = ' + Math.floor((M2 * n) / k) + '$.' }; };
  G.ev = () => {
    const w = [rint(1, 4), rint(1, 4), rint(1, 4)], W = w[0] + w[1] + w[2], ps = w.map((x) => q(x, W));
    const EX = ps.reduce((s, p, i) => s.add(p.mul((i + 1) ** 2)), q(0)), EX2 = ps.reduce((s, p, i) => s.add(p.mul((i + 1) ** 4)), q(0));
    return { q: '$\\Omega = \\{1, 2, 3\\}$ mit $p = (' + ps.map((p) => p.tex()).join(', ') + ')$, $X(\\omega) = \\omega^2$. Berechne $EX$ und $\\mathrm{Var}\\, X$.', a: '$EX = ' + EX.tex() + '$, $E(X^2) = ' + EX2.tex() + '$, $\\mathrm{Var}\\, X = ' + EX2.sub(EX.mul(EX)).tex() + '$.' };
  };
  G.moments = () => {
    const P = [
      () => { const n = rint(5, 30), p = pick([q(1, 2), q(1, 3), q(1, 4), q(1, 5)]); return ['$X \\sim \\mathrm{Bin}(' + n + ', ' + p.tex() + ')$', '$EX = ' + p.mul(n).tex() + '$, $\\mathrm{Var}\\,X = ' + p.mul(n).mul(q(1).sub(p)).tex() + '$']; },
      () => { const l = rint(1, 9); return ['$X \\sim \\mathrm{Pois}(' + l + ')$', '$EX = \\mathrm{Var}\\,X = ' + l + '$']; },
      () => { const p = pick([q(1, 2), q(1, 3), q(1, 6), q(1, 10)]); return ['$T \\sim \\mathrm{Geom}(' + p.tex() + ')$', '$ET = ' + q(1).div(p).tex() + '$, $\\mathrm{Var}\\,T = ' + q(1).sub(p).div(p.mul(p)).tex() + '$']; },
      () => { const n = rint(2, 10), p = pick([q(1, 2), q(1, 4), q(1, 5)]); return ['$T_' + n + '$ = Summe von $' + n + '$ unabhängigen $\\mathrm{Geom}(' + p.tex() + ')$', '$E = ' + q(n).div(p).tex() + '$, $\\mathrm{Var} = ' + q(n).mul(q(1).sub(p)).div(p.mul(p)).tex() + '$']; }
    ];
    const s = sample(P, 2).map((f) => f()); return { q: 'Bestimme Erwartungswert und Varianz:' + ol(s.map((x) => x[0])), a: ol(s.map((x) => x[1])) };
  };
  G.sliding = () => {
    const w = rint(3, 12), i = rint(1, 20), j = i + rint(0, w + 2);
    return { q: '$X_1, X_2, \\dots$ unabhängig mit $EX_k = 0$, $\\mathrm{Var}\\,X_k = 1$; $Y_i = X_i + \\dots + X_{i+' + (w - 1) + '}$. Berechne $\\mathrm{Var}\\,Y_i$ und $\\mathrm{Cov}(Y_{' + i + '}, Y_{' + j + '})$.', a: '$\\mathrm{Var}\\,Y_i = ' + w + '$; gemeinsame Summanden: $\\mathrm{Cov} = \\max(0, ' + w + ' - |i - j|) = ' + Math.max(0, w - (j - i)) + '$.' };
  };
  G.uniform = () => {
    const a = rint(-3, 1), b = a + rint(2, 5), s = q(rint(0, 2 * (b - a) - 1), 2).add(a), t = s.add(q(1, rint(2, 3)));
    return { q: '$X \\sim \\mathrm{Unif}[' + a + ', ' + b + ']$. Berechne $EX$, $\\mathrm{Var}\\,X$ und $P(X \\in [' + s.tex() + ', ' + t.tex() + '))$.', a: '$EX = ' + q(a + b, 2).tex() + '$, $\\mathrm{Var}\\,X = ' + q((b - a) ** 2, 12).tex() + '$, $P = \\frac{' + t.sub(s).tex() + '}{' + (b - a) + '} = ' + t.sub(s).div(b - a).tex() + '$.' };
  };
  G['density-poly'] = () => {
    const j = rint(1, 2), k = j + rint(1, 2), a = q(rint(0, 2 * (j + 1)), 2);
    const b = q(1).sub(a.div(j + 1)).mul(k + 1);
    const ok = b.n >= 0;
    return { q: '$f(x) = a x^{' + j + '} + b x^{' + k + '}$ auf $[0, 1]$ mit $a, b \\ge 0$. Drücke $b$ durch $a$ aus; für welche $a$ geht das? Berechne $EX$ für $a = ' + a.tex() + '$.', a: '$\\frac{a}{' + (j + 1) + '} + \\frac{b}{' + (k + 1) + '} = 1 \\Rightarrow b = ' + (k + 1) + '\\left(1 - \\frac{a}{' + (j + 1) + '}\\right)$, möglich für $0 \\le a \\le ' + (j + 1) + '$. ' + (ok ? 'Für $a = ' + a.tex() + '$: $b = ' + b.tex() + '$, $EX = \\frac{a}{' + (j + 2) + '} + \\frac{b}{' + (k + 2) + '} = ' + a.div(j + 2).add(b.div(k + 2)).tex() + '$.' : '') };
  };
  G.markov = () => {
    const n = rint(4, 12), l = rint(1, 4), m = n * l, t = m * pick([2, 3]);
    return { q: '$S = X_1 + \\dots + X_{' + n + '}$ mit unabhängigen $X_i \\sim \\mathrm{Pois}(' + l + ')$. Schätze $P(S \\ge ' + t + ')$ mit Markov und mit Chebyshev ab. Welche Schranke ist besser?', a: '$ES = \\mathrm{Var}\\,S = ' + m + '$. Markov: $\\le \\frac{' + m + '}{' + t + '} = ' + q(m, t).tex() + '$. Chebyshev: $P(|S - ' + m + '| \\ge ' + (t - m) + ') \\le \\frac{' + m + '}{' + (t - m) ** 2 + '} = ' + q(m, (t - m) ** 2).tex() + '$ – ' + (q(m, (t - m) ** 2).val() < q(m, t).val() ? 'Chebyshev ist besser.' : 'Markov ist besser.') };
  };
  G.cheb = () => {
    const s = pick([10, 20, 50]), e = pick([2, 5, 10]), d = pick([0.01, 0.05, 0.1]);
    return { q: 'Unabhängige $X_i$ mit Standardabweichung $' + s + '$. Wie gross muss $n$ sein, damit nach Chebyshev $P(|\\bar X_n - \\mu| \\ge ' + e + ') \\le ' + d + '$?', a: '$\\frac{' + s * s + '}{n \\cdot ' + e * e + '} \\le ' + d + ' \\Leftrightarrow n \\ge ' + Math.ceil((s * s) / (e * e * d) - 1e-9) + '$.' };
  };
  G.cauchy = () => { const a = pick([1, 4, 9, 2]); return { q: 'Bestimme $C$, so dass $f(x) = \\frac{C}{1 + ' + a + '(x - m)^2}$ eine Dichte ist. Existiert $EX$?', a: '$C = \\frac{\\sqrt{' + a + '}}{\\pi}$ (Substitution, $\\int \\frac{du}{1+u^2} = \\pi$). $EX$ existiert nicht: $\\int |x| f(x)\\,dx = \\infty$.' }; };
  G.cov0 = () => pick([
    { q: 'Finde $X, Y$ mit $\\mathrm{Cov}(X, Y) = 0$, die nicht unabhängig sind.', a: '$X$ gleichverteilt auf $\\{-1, 0, 1\\}$, $Y = X^2$: $E(XY) = E(X^3) = 0 = EX\\,EY$, aber $P(X = 0, Y = 1) = 0 \\ne P(X = 0)P(Y = 1)$.' },
    { q: 'Zeige: $X \\sim \\mathrm{Unif}[-1, 1]$ und $Y = X^2$ sind unkorreliert, aber abhängig.', a: '$E(X^3) = 0$, also $\\mathrm{Cov} = 0$; $P(|X| \\le \\frac12, Y \\gt \\frac14) = 0$.' }
  ]);

  /* ---------- Registrierung ---------- */
  M.gen = {
    run(id, ctx) {
      if (!id) return null;
      const [base, arg] = id.split(':');
      try {
        if (base === 'bank') return bank(arg)(ctx);
        if (base === 'proof') return proof(arg)();
        return G[base] ? G[base](ctx) : null;
      } catch (e) { console.error('Generator', id, e); return null; }
    },
    has(id) { if (!id) return false; const [b, a] = id.split(':'); return b === 'bank' || (b === 'proof' && !!PROOFS[a]) || !!G[b]; },
    ids: () => Object.keys(G).concat(Object.keys(PROOFS).map((p) => 'proof:' + p)),
    _Q: Q, _rref: rref
  };
})();
