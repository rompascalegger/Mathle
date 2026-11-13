/* Mathle – Höhere Mathematik spielerisch lernen */
(function () {
  'use strict';
  const M = window.MATHLE || {};

  /* ============================== Utils ============================== */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const app = $('#app');
  const pad = (n) => String(n).padStart(2, '0');
  const amp = (s) => String(s).replace(/&/g, '&amp;');
  function shuffle(a, r = Math.random) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  function rng(seed) { // mulberry32
    let s = seed >>> 0;
    return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function today() { const d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function dayNum(str) { const [y, m, d] = str.split('-').map(Number); return Math.round(Date.UTC(y, m - 1, d) / 86400000); }
  function dateStr(n) { const d = new Date(n * 86400000); return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()); }
  function renderMath(el) {
    if (window.renderMathInElement) {
      try { window.renderMathInElement(el, { delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }], throwOnError: false }); } catch (e) { /* ignore */ }
    }
  }
  function norm(s) { return String(s).toLowerCase().replace(/\s+/g, '').replace(',', '.').replace(/\.$/, ''); }

  /* ============================== Daten ============================== */
  function parseQuestions(raw) {
    const chapters = []; let ch = null, q = null;
    String(raw || '').split(/\r?\n/).forEach((line) => {
      const t = line.trim(); if (!t) return;
      if (t.startsWith('# ')) {
        const p = t.slice(2).split('|').map((s) => s.trim());
        ch = { id: p[0], title: p[1] || p[0], ref: p[2] || '', questions: [], cards: [] }; chapters.push(ch); q = null; return;
      }
      if (t.startsWith('Q ') && ch) {
        q = { id: ch.id + '-q' + (ch.questions.length + 1), ch: ch.id, type: t.slice(2).trim(), q: '', opts: [], answer: '', explain: '', src: '' };
        ch.questions.push(q); return;
      }
      const m = t.match(/^([?+\-AES]) (.*)$/); if (!m || !q) return;
      const k = m[1], v = m[2];
      if (k === '?') q.q = q.q ? q.q + '<br>' + v : v;
      else if (k === '+') q.opts.push({ t: v, ok: true });
      else if (k === '-') q.opts.push({ t: v, ok: false });
      else if (k === 'A') q.answer = v;
      else if (k === 'E') q.explain = q.explain ? q.explain + ' ' + v : v;
      else if (k === 'S') q.src = v;
    });
    return chapters;
  }
  function parseCards(raw, chapters) {
    let ch = null;
    String(raw || '').split(/\r?\n/).forEach((line) => {
      const t = line.trim(); if (!t) return;
      if (t.startsWith('# ')) { const id = t.slice(2).trim(); ch = chapters.find((c) => c.id === id) || null; return; }
      const m = t.match(/^([DF]) (.+?) :: (.+)$/); if (!m || !ch) return;
      let back = m[3], src = '';
      const at = back.lastIndexOf(' @ '); if (at >= 0) { src = back.slice(at + 3); back = back.slice(0, at); }
      ch.cards.push({ id: ch.id + '-c' + (ch.cards.length + 1), ch: ch.id, kind: m[1], front: m[2], back, src });
    });
  }
  function parseWords(raw) {
    // WORT | Hinweis | Kapitel  – der Hinweis darf selbst "|" enthalten (z.B. Beträge)
    return String(raw || '').split(/\r?\n/).map((l) => l.trim()).filter(Boolean).map((l) => {
      const m = l.match(/^(\S+)\s*\|\s*(.*?)\s*\|\s*([\w-]+)$/) || l.match(/^(\S+)\s*\|\s*(.*)$/);
      return m ? { w: m[1].toUpperCase(), hint: m[2] || '', ch: m[3] || '' } : { w: l.toUpperCase(), hint: '', ch: '' };
    });
  }

  /* ---------- Fächer ---------- */
  const SUBJECTS = (M.subjects || []).map((s) => {
    const chapters = parseQuestions(M.raw[s.raw]);
    parseCards(M.raw[s.defs], chapters);
    return Object.assign({}, s, {
      chapters, words: parseWords(M.raw[s.words]), similarList: (M.similar || {})[s.id] || [],
      allQ: chapters.flatMap((c) => c.questions), allC: chapters.flatMap((c) => c.cards), bosses: s.bosses || {}
    });
  }).filter((s) => s.chapters.length);
  const ALL_CHAPTERS = SUBJECTS.flatMap((s) => s.chapters);
  let SUBJ, CHAPTERS, WORDS, ALLQ, ALLC, BOSSES, SIMILAR;
  function setSubject(id) {
    SUBJ = SUBJECTS.find((s) => s.id === id) || SUBJECTS[0];
    CHAPTERS = SUBJ.chapters; WORDS = SUBJ.words; ALLQ = SUBJ.allQ; ALLC = SUBJ.allC; BOSSES = SUBJ.bosses; SIMILAR = SUBJ.similarList;
  }
  const chById = (id) => ALL_CHAPTERS.find((c) => c.id === id);
  const dkey = () => SUBJ.id + ':' + today(); // Tageskey pro Fach

  /* ============================== Speicher ============================== */
  const KEY = 'mathle:v1';
  const DEF = { xp: 0, q: {}, c: {}, days: {}, daily: {}, ach: {}, boss: {}, challenge: {}, mathle: {}, blitzBest: 0, blitz: {}, bestCombo: 0, totalCorrect: 0, cardsSeen: 0, flags: {}, sound: true, theme: null, subj: 'la' };
  let S;
  try { S = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { S = {}; }
  S = Object.assign(JSON.parse(JSON.stringify(DEF)), S);
  (function prune() { const lim = dayNum(today()) - 30; Object.keys(S.daily).forEach((k) => { if (dayNum(k) < lim) delete S.daily[k]; }); })();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } }
  function D() {
    const t = today();
    if (!S.daily[t]) S.daily[t] = { correct: 0, maxCombo: 0, cards: 0, blitz: 0, boss: 0, mathle: 0, challenge: 0, xp: 0, quests: {} };
    return S.daily[t];
  }

  /* ============================== Fortschritt ============================== */
  const box = (rec) => (rec ? rec.b : -1);
  function progress(ch) {
    const items = ch.questions.map((q) => S.q[q.id]).concat(ch.cards.map((c) => S.c[c.id]));
    if (!items.length) return 0;
    return items.reduce((s, r) => s + Math.min(3, Math.max(0, box(r))), 0) / (3 * items.length);
  }
  function recordQ(id, ok) {
    const r = S.q[id] || { b: 0, c: 0, w: 0, t: 0 };
    if (ok) { r.c++; r.b = Math.min(5, r.b + 1); } else { r.w++; r.b = 0; r.bad = true; }
    if (ok && r.b >= 2) r.bad = false;
    r.t = Date.now(); S.q[id] = r;
  }
  function recordC(id, grade) { // grade: 0 nochmal, 1 schwer, 2 gewusst
    const r = S.c[id] || { b: 0, n: 0, t: 0 };
    r.n++;
    if (grade === 0) r.b = 0; else if (grade === 1) r.b = Math.max(1, r.b); else r.b = Math.min(5, r.b + 1);
    r.t = Date.now(); S.c[id] = r;
  }
  function pickByPriority(items, store, n) {
    const now = Date.now();
    return items.map((it) => {
      const r = store[it.id];
      let p = r ? r.b * 2 : -2;
      if (r && now - r.t < 4 * 60 * 1000) p += 4;
      return { it, p: p + Math.random() * 3 };
    }).sort((a, b) => a.p - b.p).slice(0, n).map((x) => x.it);
  }
  function mistakes() { return ALLQ.filter((q) => S.q[q.id] && S.q[q.id].bad); }

  /* ============================== XP & Level ============================== */
  function levelInfo(xp) {
    let L = 1, need = 100, rest = xp;
    while (rest >= need) { rest -= need; L++; need = 100 + 50 * (L - 1); }
    return { L, cur: rest, need };
  }
  const TITLES = [[1, 'Erstsemester'], [3, 'Übungsgruppen-Held'], [5, 'Lemma-Jäger'], [8, 'Beweis-Ninja'], [12, 'Axiom-Meister'], [16, 'Körper-König'], [20, 'Monstergruppe']];
  const title = (L) => TITLES.filter((t) => L >= t[0]).pop()[1];
  const mult = (c) => (c >= 10 ? 3 : c >= 6 ? 2 : c >= 3 ? 1.5 : 1);
  function streak() {
    let d = dayNum(today()); if (!S.days[dateStr(d)]) d--;
    let n = 0; while (S.days[dateStr(d)]) { n++; d--; }
    return n;
  }
  function addXP(n, anchor) {
    if (n <= 0) return;
    const before = levelInfo(S.xp).L;
    S.xp += n; D().xp += n; S.days[today()] = (S.days[today()] || 0) + n;
    if (new Date().getHours() >= 23) S.flags.night = true;
    if (anchor !== false) floatText('+' + n + ' XP', anchor, 'xp');
    const after = levelInfo(S.xp).L;
    save(); renderHud();
    if (after > before) setTimeout(() => levelUp(after), 400);
    checkQuests(); checkAch();
  }

  /* ============================== Quests & Erfolge ============================== */
  const QUESTS = [
    { id: 'correct20', t: 'Beantworte 20 Fragen richtig', goal: 20, v: (d) => d.correct },
    { id: 'combo10', t: 'Erreiche eine 10er-Combo', goal: 10, v: (d) => d.maxCombo },
    { id: 'cards15', t: 'Lerne 15 Karteikarten', goal: 15, v: (d) => d.cards },
    { id: 'blitz10', t: 'Erziele 10 Punkte in der Blitzrunde', goal: 10, v: (d) => d.blitz },
    { id: 'boss1', t: 'Besiege einen Boss', goal: 1, v: (d) => d.boss },
    { id: 'mathle', t: 'Löse das Mathle des Tages', goal: 1, v: (d) => d.mathle },
    { id: 'challenge', t: 'Schliesse die Tages-Challenge ab', goal: 1, v: (d) => d.challenge },
    { id: 'xp300', t: 'Sammle heute 300 XP', goal: 300, v: (d) => d.xp }
  ];
  const QUEST_XP = 50;
  function todaysQuests() { return shuffle(QUESTS, rng(hashStr('quests' + today()))).slice(0, 3); }
  function checkQuests() {
    const d = D();
    todaysQuests().forEach((q) => {
      if (!d.quests[q.id] && q.v(d) >= q.goal) {
        d.quests[q.id] = true;
        toast('🎯', 'Quest erfüllt!', q.t + ' · +' + QUEST_XP + ' XP');
        SFX.quest();
        addXP(QUEST_XP, false);
        if (todaysQuests().every((x) => d.quests[x.id]) && !d.quests.all) {
          d.quests.all = true; toast('🏆', 'Alle Tagesquests!', 'Bonus +100 XP'); confetti(160); addXP(100, false);
        }
      }
    });
  }
  const ACH = [
    { id: 'first', icon: '✨', t: 'Erster Treffer', d: 'Beantworte eine Frage richtig', ok: () => S.totalCorrect >= 1 },
    { id: 'c100', icon: '💯', t: 'Hundert', d: '100 richtige Antworten', ok: () => S.totalCorrect >= 100 },
    { id: 'c500', icon: '🏛️', t: 'Säule der Algebra', d: '500 richtige Antworten', ok: () => S.totalCorrect >= 500 },
    { id: 'combo10', icon: '🔥', t: 'Heiss gelaufen', d: 'Erreiche eine 10er-Combo', ok: () => S.bestCombo >= 10 },
    { id: 'combo25', icon: '☄️', t: 'Unaufhaltsam', d: 'Erreiche eine 25er-Combo', ok: () => S.bestCombo >= 25 },
    { id: 'perfect', icon: '💎', t: 'Lupenrein', d: 'Eine Runde mit 10+ Fragen ohne Fehler', ok: () => !!S.flags.perfect },
    { id: 'boss1', icon: '⚔️', t: 'Bossbezwinger', d: 'Besiege deinen ersten Boss', ok: () => Object.values(S.boss).some((b) => b.won) },
    { id: 'bossall', icon: '👑', t: 'Fachherrscher', d: 'Besiege alle Bosse eines Fachs', ok: () => SUBJECTS.some((s) => s.chapters.every((c) => S.boss[c.id] && S.boss[c.id].won)) },
    { id: 'polymath', icon: '🧭', t: 'Allrounder', d: 'Beantworte in allen drei Fächern Fragen richtig', ok: () => SUBJECTS.every((s) => s.allQ.some((q) => S.q[q.id] && S.q[q.id].c > 0)) },
    { id: 'flawless', icon: '🛡️', t: 'Unberührbar', d: 'Besiege einen Boss ohne Herz zu verlieren', ok: () => !!S.flags.flawless },
    { id: 'blitz15', icon: '⚡', t: 'Blitzmerker', d: '15 Punkte in der Blitzrunde', ok: () => S.blitzBest >= 15 },
    { id: 'blitz30', icon: '🌩️', t: 'Gewitter im Kopf', d: '30 Punkte in der Blitzrunde', ok: () => S.blitzBest >= 30 },
    { id: 'cards50', icon: '🗂️', t: 'Kartenhai', d: 'Lerne 50 Karteikarten', ok: () => S.cardsSeen >= 50 },
    { id: 'cards300', icon: '🧠', t: 'Elefantengedächtnis', d: 'Lerne 300 Karteikarten', ok: () => S.cardsSeen >= 300 },
    { id: 'master', icon: '🎓', t: 'Kapitelmeister', d: 'Meistere ein Kapitel zu 100 %', ok: () => ALL_CHAPTERS.some((c) => progress(c) >= 0.999) },
    { id: 'streak3', icon: '📅', t: 'Dranbleiber', d: '3 Tage in Folge gelernt', ok: () => streak() >= 3 },
    { id: 'streak7', icon: '🗓️', t: 'Wochenserie', d: '7 Tage in Folge gelernt', ok: () => streak() >= 7 },
    { id: 'lvl5', icon: '⭐', t: 'Aufsteiger', d: 'Erreiche Level 5', ok: () => levelInfo(S.xp).L >= 5 },
    { id: 'lvl10', icon: '🌟', t: 'Überflieger', d: 'Erreiche Level 10', ok: () => levelInfo(S.xp).L >= 10 },
    { id: 'mathle', icon: '🔤', t: 'Wortakrobat', d: 'Löse ein Mathle', ok: () => !!S.flags.mathleWin },
    { id: 'mathle2', icon: '🎯', t: 'Volltreffer', d: 'Mathle in höchstens 2 Versuchen', ok: () => !!S.flags.mathle2 },
    { id: 'crit', icon: '🎰', t: 'Glückspilz', d: 'Lande einen kritischen Treffer', ok: () => !!S.flags.crit },
    { id: 'night', icon: '🦉', t: 'Nachteule', d: 'Lerne nach 23 Uhr', ok: () => !!S.flags.night }
  ];
  function checkAch() {
    ACH.forEach((a) => {
      if (!S.ach[a.id] && a.ok()) { S.ach[a.id] = today(); save(); setTimeout(() => { toast(a.icon, 'Erfolg freigeschaltet!', a.t); SFX.ach(); }, 250); }
    });
  }

  /* ============================== Sound ============================== */
  let AC = null;
  function tone(freq, dur, type, vol, delay) {
    if (!S.sound) return;
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      const t = AC.currentTime + (delay || 0);
      const o = AC.createOscillator(), g = AC.createGain();
      o.type = type || 'sine'; o.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.06, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + dur + 0.03);
    } catch (e) { /* ignore */ }
  }
  const arp = (base, steps, type, vol, gap, dur) => steps.forEach((s, i) => tone(base * Math.pow(2, s / 12), dur || 0.16, type, vol, i * (gap || 0.07)));
  const SFX = {
    good(c) { const b = 523 * Math.pow(2, Math.min(c || 0, 14) / 12); tone(b, 0.12, 'triangle', 0.08); tone(b * 1.5, 0.18, 'triangle', 0.06, 0.07); },
    bad() { tone(196, 0.12, 'sawtooth', 0.04); tone(147, 0.25, 'sawtooth', 0.04, 0.1); },
    combo() { arp(659, [0, 4, 7, 12], 'square', 0.035, 0.05); },
    crit() { arp(784, [0, 7, 12, 19, 24], 'triangle', 0.06, 0.04, 0.12); },
    level() { arp(392, [0, 4, 7, 12, 16, 19, 24], 'triangle', 0.08, 0.09, 0.25); },
    ach() { arp(880, [0, 5, 9, 12], 'sine', 0.07, 0.08, 0.2); },
    quest() { arp(523, [0, 7, 12], 'triangle', 0.07, 0.08, 0.2); },
    flip() { tone(700, 0.05, 'sine', 0.035); },
    tick() { tone(1200, 0.03, 'square', 0.015); },
    hit() { tone(110, 0.15, 'square', 0.06); tone(220, 0.1, 'triangle', 0.05, 0.03); },
    win() { arp(523, [0, 4, 7, 12, 7, 12, 16, 24], 'triangle', 0.08, 0.1, 0.3); },
    lose() { arp(330, [0, -2, -5, -9], 'sawtooth', 0.04, 0.16, 0.3); }
  };

  /* ============================== Effekte ============================== */
  const fx = document.createElement('canvas'); fx.className = 'fx'; document.body.appendChild(fx);
  const ctx = fx.getContext('2d'); let parts = [], raf = null;
  function confetti(n, x, y) {
    fx.width = innerWidth; fx.height = innerHeight;
    const cols = ['#7c5cff', '#22d3a6', '#ffb020', '#ff5d8f', '#4cc9ff', '#ffe066'];
    for (let i = 0; i < (n || 120); i++) {
      parts.push({ x: x != null ? x : innerWidth / 2, y: y != null ? y : innerHeight * 0.35, vx: (Math.random() - 0.5) * 14, vy: -Math.random() * 13 - 3, g: 0.32 + Math.random() * 0.15, s: 4 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, c: cols[i % cols.length], life: 110 + Math.random() * 60 });
    }
    if (!raf) raf = requestAnimationFrame(stepFx);
  }
  function stepFx() {
    ctx.clearRect(0, 0, fx.width, fx.height);
    parts = parts.filter((p) => p.life > 0 && p.y < fx.height + 20);
    parts.forEach((p) => {
      p.vy += p.g; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life--;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.globalAlpha = Math.min(1, p.life / 40); ctx.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * 0.6); ctx.restore();
    });
    raf = parts.length ? requestAnimationFrame(stepFx) : null;
    if (!raf) ctx.clearRect(0, 0, fx.width, fx.height);
  }
  function floatText(text, anchor, cls) {
    const el = document.createElement('div'); el.className = 'float ' + (cls || ''); el.textContent = text;
    let x = innerWidth / 2, y = innerHeight / 2;
    if (anchor && anchor.getBoundingClientRect) { const r = anchor.getBoundingClientRect(); x = r.left + r.width / 2; y = r.top + r.height / 2; }
    el.style.left = x + 'px'; el.style.top = y + 'px';
    document.body.appendChild(el); setTimeout(() => el.remove(), 1200);
  }
  const toasts = document.createElement('div'); toasts.className = 'toasts'; document.body.appendChild(toasts);
  function toast(icon, head, body) {
    const el = document.createElement('div'); el.className = 'toast';
    el.innerHTML = '<span class="ticon">' + icon + '</span><div><b>' + head + '</b><small>' + amp(body || '') + '</small></div>';
    toasts.appendChild(el); setTimeout(() => el.classList.add('out'), 3200); setTimeout(() => el.remove(), 3700);
  }
  function levelUp(L) {
    SFX.level(); confetti(220);
    const el = document.createElement('div'); el.className = 'modal';
    el.innerHTML = '<div class="modal-card levelup"><div class="lvl-burst">' + L + '</div><h2>Level ' + L + '!</h2><p>Neuer Rang: <b>' + title(L) + '</b></p><button class="btn primary" data-close>Weiter</button></div>';
    document.body.appendChild(el);
    el.addEventListener('click', (e) => { if (e.target === el || e.target.hasAttribute('data-close')) el.remove(); });
  }

  /* ============================== HUD ============================== */
  const hud = $('#hud');
  function renderHud() {
    const li = levelInfo(S.xp), st = streak();
    hud.innerHTML =
      '<button class="brand" data-go="home" aria-label="Startseite"><span class="logo">M</span><span>Mathle</span></button>' +
      '<div class="hud-right">' +
      '<span class="pill streak' + (S.days[today()] ? ' lit' : '') + '" title="Tage in Folge">🔥 ' + st + '</span>' +
      '<span class="pill level" title="' + title(li.L) + '"><b>Lv ' + li.L + '</b><span class="xpbar"><i style="width:' + (100 * li.cur / li.need).toFixed(1) + '%"></i></span></span>' +
      '<button class="icon-btn" data-sound title="Ton an/aus">' + (S.sound ? '🔊' : '🔇') + '</button>' +
      '<button class="icon-btn" data-theme title="Hell/Dunkel">◐</button>' +
      '</div>';
  }
  hud.addEventListener('click', (e) => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.hasAttribute('data-go')) go('home');
    if (t.hasAttribute('data-sound')) { S.sound = !S.sound; save(); renderHud(); SFX.tick(); }
    if (t.hasAttribute('data-theme')) {
      const cur = document.documentElement.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
      S.theme = cur === 'dark' ? 'light' : 'dark'; applyTheme(); save();
    }
  });
  function applyTheme() { if (S.theme) document.documentElement.setAttribute('data-theme', S.theme); else document.documentElement.removeAttribute('data-theme'); }

  /* ============================== Router ============================== */
  let screen = null; // { onKey, cleanup }
  function go(name, arg) {
    if (screen && screen.cleanup) screen.cleanup();
    screen = null; window.scrollTo(0, 0);
    (SCREENS[name] || SCREENS.home)(arg);
    app.classList.remove('enter'); void app.offsetWidth; app.classList.add('enter');
  }
  document.addEventListener('keydown', (e) => {
    if (e.target && (e.target.tagName === 'INPUT') && e.key !== 'Enter' && e.key !== 'Escape') return;
    if (screen && screen.onKey) screen.onKey(e);
  });
  function view(html) { app.innerHTML = html; renderMath(app); }

  /* ============================== Screens ============================== */
  const SCREENS = {};

  SCREENS.home = function () {
    const li = levelInfo(S.xp), d = D(), qs = todaysQuests();
    const quests = qs.map((q) => {
      const v = Math.min(q.goal, q.v(d)), done = !!d.quests[q.id];
      return '<div class="quest' + (done ? ' done' : '') + '"><div class="qrow"><span>' + (done ? '✅' : '🎯') + ' ' + q.t + '</span><small>' + v + '/' + q.goal + '</small></div><div class="bar"><i style="width:' + (100 * v / q.goal) + '%"></i></div></div>';
    }).join('');
    const subj = SUBJECTS.map((s) => '<button class="subject" data-subj="' + s.id + '">' +
      '<span class="subj-icon">' + s.icon + '</span><span class="subj-text"><b>' + s.title + '</b><small>' + s.sub + ' · ' + s.allQ.length + ' Fragen, ' + s.allC.length + ' Karten</small></span>' +
      '<span class="subj-prog">' + Math.round(100 * s.chapters.reduce((a, c) => a + progress(c), 0) / s.chapters.length) + '%</span></button>').join('');
    view(
      '<section class="hero"><div><p class="eyebrow">' + greet() + '</p><h1>Höhere Mathematik,<br><span class="grad">Level für Level.</span></h1>' +
      '<p class="muted">Definitionen pauken, Formeln festigen, Bosse besiegen. Rang: <b>' + title(li.L) + '</b> · ' + S.xp + ' XP gesamt</p></div></section>' +
      '<section class="panel"><div class="panel-head"><h2>Tagesquests</h2><small>+' + QUEST_XP + ' XP je Quest · alle drei: +100</small></div>' + quests + '</section>' +
      '<section><h2 class="sec">Fächer</h2><div class="subjects">' + subj + '</div></section>' +
      '<section class="row2"><button class="tile small" data-ach><span class="ticon">🏅</span><b>Erfolge</b><small>' + Object.keys(S.ach).length + '/' + ACH.length + ' freigeschaltet</small></button>' +
      '<button class="tile small" data-stats><span class="ticon">📈</span><b>Statistik</b><small>' + S.totalCorrect + ' richtige Antworten</small></button></section>'
    );
    app.onclick = (e) => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.subj) go('hub', b.dataset.subj);
      if (b.hasAttribute('data-ach')) go('achievements');
      if (b.hasAttribute('data-stats')) go('stats');
    };
  };
  function greet() {
    const h = new Date().getHours(), st = streak();
    const g = h < 5 ? 'Nachtschicht? Respekt.' : h < 11 ? 'Guten Morgen!' : h < 17 ? 'Hallo!' : h < 22 ? 'Guten Abend!' : 'Späte Lernrunde!';
    return g + (st > 1 ? ' 🔥 ' + st + ' Tage in Folge' : S.days[today()] ? '' : ' Starte heute deine Serie.');
  }

  SCREENS.hub = function (sid) {
    if (sid) { setSubject(sid); S.subj = SUBJ.id; save(); }
    const ch = S.challenge[dkey()];
    const ml = S.mathle[dkey()];
    const best = S.blitz[SUBJ.id] || 0;
    const mis = mistakes().length;
    const chapters = CHAPTERS.map((c) => {
      const p = progress(c), b = S.boss[c.id], boss = BOSSES[c.id] || { icon: '👹' };
      return '<div class="chapter"><div class="ring" style="--p:' + (p * 100).toFixed(0) + '"><span>' + Math.round(p * 100) + '%</span></div>' +
        '<div class="ch-text"><b>' + c.title + '</b><small>' + c.ref + ' · ' + c.questions.length + ' Fragen · ' + c.cards.length + ' Karten</small></div>' +
        '<div class="ch-actions"><button class="chip" data-train="' + c.id + '" title="Fragen üben">Üben</button><button class="chip" data-cards="' + c.id + '" title="Karteikarten">Karten</button>' +
        '<button class="chip boss' + (b && b.won ? ' won' : '') + '" data-boss="' + c.id + '" title="Boss-Kampf">' + boss.icon + (b && b.won ? ' ' + '★'.repeat(b.stars || 1) : ' Boss') + '</button></div></div>';
    }).join('');
    view(
      '<div class="crumbs"><button class="link" data-home>← Fächer</button></div>' +
      '<h1 class="page">' + SUBJ.icon + ' ' + SUBJ.title + '</h1><p class="muted">' + amp(SUBJ.basis || '') + '</p>' +
      '<h2 class="sec">Auswendig lernen</h2><div class="tiles">' +
      tile('cards', '🗂️', 'Karteikarten', ALLC.length + ' Definitionen & Formeln · aufdecken & bewerten', 'learn') +
      tile('drill', '🧠', 'Definitions-Drill', 'Begriff ↔ Definition zuordnen · Combo jagen', 'learn') +
      '</div>' +
      '<h2 class="sec">Challenges</h2><div class="tiles">' +
      tile('daily', '📆', 'Tages-Challenge', ch ? 'Erledigt: ' + ch.score + '/10 · morgen neu' : '10 Fragen · einmal pro Tag · Bonus-XP', 'chal' + (ch ? ' done' : '')) +
      tile('blitz', '⚡', 'Blitzrunde', '60 Sekunden · +1/−1 pro Antwort · Rekord: ' + best, 'chal') +
      tile('mathle', '🔤', 'Mathle', ml && ml.done ? (ml.won ? 'Gelöst in ' + ml.guesses.length + ' Versuchen' : 'Heute nicht gelöst') + ' · Übungswort spielen' : 'Fachbegriff des Tages erraten', 'chal' + (ml && ml.done ? ' done' : '')) +
      tile('mix', '🎲', 'Alles gemischt', '10 Fragen aus allen Kapiteln', 'chal') +
      (mis ? tile('mistakes', '🩹', 'Fehler ausbügeln', mis + ' Fragen warten auf Revanche', 'warn') : '') +
      '</div>' +
      '<h2 class="sec">Kapitel</h2><div class="chapters">' + chapters + '</div>' +
      '<div class="soon-box">📖 Jede Frage und Karte nennt die Skriptseite und die passende Serienaufgabe.</div>'
    );
    app.onclick = (e) => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.hasAttribute('data-home')) return go('home');
      const m = b.dataset.mode;
      if (m === 'cards') go('cardsSetup');
      if (m === 'drill') go('quiz', { mode: 'drill', items: buildDrill(ALLC, 12) });
      if (m === 'daily') go('quiz', { mode: 'daily', items: buildDaily(), replay: !!ch });
      if (m === 'blitz') go('blitz');
      if (m === 'mathle') go('mathle', { daily: !(ml && ml.done) });
      if (m === 'mix') go('quiz', { mode: 'train', items: pickByPriority(ALLQ, S.q, 10), label: 'Alles gemischt' });
      if (m === 'mistakes') go('quiz', { mode: 'mistakes', items: shuffle(mistakes()).slice(0, 10), label: 'Fehler ausbügeln' });
      if (b.dataset.train) { const c = chById(b.dataset.train); go('quiz', { mode: 'train', items: shuffle(pickByPriority(c.questions, S.q, 10)), label: c.title }); }
      if (b.dataset.cards) go('cards', { ch: b.dataset.cards, kind: 'all' });
      if (b.dataset.boss) go('bossIntro', b.dataset.boss);
    };
  };
  function tile(mode, icon, t, sub, cls) {
    return '<button class="tile ' + (cls || '') + '" data-mode="' + mode + '"><span class="ticon">' + icon + '</span><b>' + t + '</b><small>' + sub + '</small></button>';
  }

  /* ---------- Generierte Fragen aus Karteikarten ---------- */
  function similar(a, b) { return a.back === b.back || SIMILAR.some((g) => g.includes(a.front) && g.includes(b.front)); }
  function distractors(card, n) {
    const ok = (c) => c.id !== card.id && !similar(card, c);
    const same = ALLC.filter((c) => ok(c) && c.kind === card.kind);
    const pool = shuffle(same.filter((c) => c.ch === card.ch)).concat(shuffle(same.filter((c) => c.ch !== card.ch)));
    const other = ALLC.filter((c) => ok(c) && c.kind !== card.kind);
    return pool.concat(shuffle(other)).slice(0, n);
  }
  function drillItem(card, dir) {
    const ds = distractors(card, 3), isD = card.kind === 'D';
    const base = { id: card.id, cardId: card.id, kind: card.kind, ch: card.ch, type: 'mc', explain: '<b>' + card.front + '</b>: ' + card.back, src: card.src, drill: true };
    if (dir === 0) {
      return Object.assign(base, {
        q: '<span class="qlabel">' + (isD ? 'Welcher Begriff passt zur Definition?' : 'Welche Formel / welcher Satz ist das?') + '</span><div class="defbox">' + card.back + '</div>',
        opts: [{ t: card.front, ok: true }].concat(ds.map((c) => ({ t: c.front, ok: false })))
      });
    }
    return Object.assign(base, {
      q: '<span class="qlabel">' + (isD ? 'Was ist die Definition?' : 'Wie lautet es?') + '</span><div class="termbox">' + card.front + '</div>',
      opts: [{ t: card.back, ok: true }].concat(ds.map((c) => ({ t: c.back, ok: false }))), long: true
    });
  }
  function cardTF(card) {
    const right = Math.random() < 0.5;
    const shown = right ? card : distractors(card, 1)[0];
    return { id: card.id, cardId: card.id, ch: card.ch, type: 'tf', labels: ['Passt', 'Passt nicht'], answer: right ? 'wahr' : 'falsch', drill: true,
      q: '<div class="termbox sm">' + card.front + '</div><div class="defbox sm">' + shown.back + '</div>',
      explain: '<b>' + card.front + '</b>: ' + card.back, src: card.src };
  }
  function buildDrill(cards, n) {
    return pickByPriority(cards, S.c, n).map((c) => drillItem(c, Math.random() < 0.5 ? 0 : 1));
  }
  function buildDaily() {
    const r = rng(hashStr('daily' + today()));
    const qs = shuffle(ALLQ, r).slice(0, 7);
    const cs = shuffle(ALLC, r).slice(0, 3).map((c, i) => drillItem(c, i % 2));
    return shuffle(qs.concat(cs), r);
  }

  /* ---------- Quiz-Engine (Training, Drill, Tages-Challenge, Boss) ---------- */
  SCREENS.quiz = function (cfg) {
    const ses = { mode: cfg.mode, items: cfg.items || [], i: 0, ok: 0, bad: 0, combo: 0, maxCombo: 0, xp: 0, wrong: [], label: cfg.label, replay: cfg.replay,
      boss: cfg.boss || null, hp: 100, hearts: 3, pool: cfg.pool || null, answered: false, crits: 0 };
    if (!ses.items.length) { view('<div class="empty"><p>Hier gibt es gerade nichts zu tun. 🎉</p><button class="btn primary" data-back>Zurück</button></div>'); app.onclick = (e) => { if (e.target.closest('[data-back]')) go('hub'); }; return; }
    let cur = null, sel = new Set();

    function header() {
      const total = ses.items.length;
      const pct = ses.boss ? 100 - ses.hp : (100 * ses.i / total);
      const m = mult(ses.combo);
      return '<div class="qtop"><button class="icon-btn" data-quit title="Beenden">✕</button>' +
        '<div class="progress' + (ses.boss ? ' bossbar' : '') + '"><i style="width:' + pct + '%"></i></div>' +
        '<span class="combo' + (ses.combo >= 3 ? ' hot' : '') + '" id="combo">🔥 ' + ses.combo + (m > 1 ? ' <em>×' + m + '</em>' : '') + '</span></div>';
    }
    function bossPanel() {
      if (!ses.boss) return '';
      const B = BOSSES[ses.boss] || { name: 'Boss', icon: '👹' };
      return '<div class="boss-panel"><div class="boss-icon" id="bossIcon">' + B.icon + '</div><div class="boss-info"><b>' + B.name + '</b>' +
        '<div class="hp"><i style="width:' + Math.max(0, ses.hp) + '%"></i><span>' + Math.max(0, ses.hp) + ' HP</span></div></div>' +
        '<div class="hearts">' + '❤️'.repeat(ses.hearts) + '<span class="lost">' + '🖤'.repeat(3 - ses.hearts) + '</span></div></div>';
    }
    function render() {
      cur = ses.items[ses.i]; sel = new Set(); ses.answered = false;
      const ch = chById(cur.ch);
      let opts = '';
      if (cur.type === 'tf') {
        const L = cur.labels || ['Wahr', 'Falsch'];
        opts = '<div class="answers tf"><button class="ans" data-tf="wahr"><kbd>1</kbd>' + L[0] + '</button><button class="ans" data-tf="falsch"><kbd>2</kbd>' + L[1] + '</button></div>';
      } else if (cur.type === 'mc' || cur.type === 'multi') {
        if (!cur._sh) cur._sh = shuffle(cur.opts);
        opts = '<div class="answers' + (cur.long ? ' long' : '') + '">' + cur._sh.map((o, k) => '<button class="ans" data-k="' + k + '"><kbd>' + (k + 1) + '</kbd><span>' + amp(o.t) + '</span></button>').join('') + '</div>' +
          (cur.type === 'multi' ? '<p class="hint">Mehrere Antworten möglich.</p><button class="btn primary wide" data-check>Prüfen</button>' : '');
      } else if (cur.type === 'input') {
        opts = '<form class="inputrow" data-form><input id="ans" autocomplete="off" inputmode="text" placeholder="Antwort eingeben …"><button class="btn primary">Prüfen</button></form>';
      }
      view(header() + bossPanel() +
        '<div class="card qcard"><div class="qmeta"><span class="tag">' + (ch ? ch.title : '') + '</span>' +
        (ses.boss ? '' : '<span>' + (ses.i + 1) + ' / ' + ses.items.length + '</span>') + (cur.drill ? '<span class="tag alt">' + (cur.kind === 'F' ? 'Formel / Satz' : 'Definition') + '</span>' : '') + '</div>' +
        '<div class="qtext">' + amp(cur.q) + '</div>' + opts + '</div><div id="fb"></div>');
      const inp = $('#ans'); if (inp) setTimeout(() => inp.focus(), 50);
    }
    function decide(ok, chosenEl) {
      if (ses.answered) return; ses.answered = true;
      const d = D();
      if (cur.cardId) recordC(cur.cardId, ok ? 2 : 0); else recordQ(cur.id, ok);
      let gained = 0, crit = false;
      if (ok) {
        ses.ok++; ses.combo++; ses.maxCombo = Math.max(ses.maxCombo, ses.combo);
        S.totalCorrect++; d.correct++; d.maxCombo = Math.max(d.maxCombo, ses.combo); S.bestCombo = Math.max(S.bestCombo, ses.combo);
        gained = Math.round(10 * mult(ses.combo));
        if (Math.random() < 0.1) { crit = true; gained *= 2; ses.crits++; S.flags.crit = true; }
        ses.xp += gained;
        SFX.good(ses.combo);
        if (crit) { SFX.crit(); floatText('KRITISCH! ×2', $('.qcard'), 'crit'); }
        if ([3, 6, 10, 15, 20, 25, 30].includes(ses.combo)) { setTimeout(SFX.combo, 120); floatText(ses.combo + 'er-Combo!', $('#combo'), 'combo'); confetti(40 + ses.combo * 3, innerWidth - 60, 70); }
        if (ses.boss) {
          const dmg = Math.round(12 * mult(ses.combo)) * (crit ? 2 : 1);
          ses.hp -= dmg; SFX.hit();
          const bp0 = $('.boss-panel'); if (bp0) bp0.outerHTML = bossPanel();
          const bi = $('#bossIcon'); if (bi) { bi.classList.remove('hit'); void bi.offsetWidth; bi.classList.add('hit'); floatText('−' + dmg, bi, 'dmg'); }
        }
      } else {
        ses.bad++; ses.combo = 0; ses.wrong.push(cur);
        SFX.bad();
        $('.qcard').classList.add('shake');
        if (ses.boss) ses.hearts--;
      }
      addXP(gained, chosenEl || $('.qcard')); save();
      // Markierungen
      $$('.ans').forEach((b) => {
        b.disabled = true;
        if (b.dataset.tf) { if (b.dataset.tf === cur.answer) b.classList.add('right'); else if (b === chosenEl) b.classList.add('wrongpick'); }
        if (b.dataset.k != null) { const o = cur._sh[+b.dataset.k]; if (o.ok) b.classList.add('right'); else if (b.classList.contains('picked') || b === chosenEl) b.classList.add('wrongpick'); }
      });
      const inp = $('#ans'); if (inp) { inp.disabled = true; inp.classList.add(ok ? 'right' : 'wrongpick'); }
      // Kopf aktualisieren
      const top = $('.qtop'); if (top) top.outerHTML = header();
      if (!ok && ses.boss) { const bp = $('.boss-panel'); if (bp) { bp.outerHTML = bossPanel(); const h = $('.hearts'); if (h) h.classList.add('shake'); } }
      const bossOver = ses.boss && (ses.hp <= 0 || ses.hearts <= 0);
      const last = !ses.boss && ses.i >= ses.items.length - 1;
      const praise = ok ? pick(['Richtig!', 'Stark!', 'Sauber!', 'Genau so!', 'Treffer!', 'Bingo!', 'Lehrbuchreif!']) : pick(['Knapp daneben.', 'Nicht ganz.', 'Leider falsch.', 'Fast!']);
      let sol = '';
      if (!ok && cur.type === 'input') sol = '<p class="sol">Richtige Antwort: <b>' + cur.answer.split(';')[0].trim() + '</b></p>';
      if (!ok && cur.type === 'tf') sol = '<p class="sol">Die Aussage ist <b>' + cur.answer + '</b>.</p>';
      $('#fb').innerHTML = '<div class="feedback ' + (ok ? 'ok' : 'no') + '"><div class="fb-head"><b>' + (ok ? '✔ ' : '✘ ') + praise + '</b>' + (gained ? '<span class="xpgain">+' + gained + ' XP</span>' : '') + '</div>' + sol +
        (cur.explain ? '<p>' + amp(cur.explain) + '</p>' : '') + (cur.src ? '<p class="src">📖 ' + amp(cur.src) + '</p>' : '') +
        '<button class="btn primary wide" data-next>' + (bossOver || last ? 'Ergebnis' : 'Weiter') + ' <kbd>Enter</kbd></button></div>';
      renderMath($('#fb'));
      setTimeout(() => { const n = $('[data-next]'); if (n) n.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }, 50);
    }
    function next() {
      if (ses.boss) {
        if (ses.hp <= 0 || ses.hearts <= 0) return finish();
        ses.i++;
        if (ses.i >= ses.items.length) { ses.items = ses.items.concat(shuffle(ses.pool)); }
        return render();
      }
      if (ses.i >= ses.items.length - 1) return finish();
      ses.i++; render();
    }
    function finish() { go('result', ses); }
    function checkInput() {
      const v = norm($('#ans').value); if (!v) return;
      const ok = cur.answer.split(';').some((a) => norm(a) === v);
      decide(ok, $('#ans'));
    }
    app.onclick = (e) => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.hasAttribute('data-quit')) { if (ses.i === 0 && !ses.answered) return go('hub'); return confirmQuit(); }
      if (b.hasAttribute('data-next')) return next();
      if (ses.answered) return;
      if (b.dataset.tf) return decide(b.dataset.tf === cur.answer, b);
      if (b.dataset.k != null) {
        const o = cur._sh[+b.dataset.k];
        if (cur.type === 'mc') return decide(o.ok, b);
        if (sel.has(+b.dataset.k)) { sel.delete(+b.dataset.k); b.classList.remove('picked'); } else { sel.add(+b.dataset.k); b.classList.add('picked'); }
        SFX.tick(); return;
      }
      if (b.hasAttribute('data-check')) {
        const ok = cur._sh.every((o, k) => o.ok === sel.has(k));
        return decide(ok, b);
      }
    };
    app.onsubmit = (e) => { e.preventDefault(); if (!ses.answered) checkInput(); };
    function confirmQuit() {
      if (ses.boss) return go('hub');
      ses.items = ses.items.slice(0, ses.i + (ses.answered ? 1 : 0));
      if (!ses.items.length) return go('hub');
      finish();
    }
    screen = {
      onKey(e) {
        if (e.key === 'Escape') return confirmQuit();
        if (e.key === 'Enter') { if (ses.answered) { e.preventDefault(); next(); } else if (cur.type === 'multi') { const c = $('[data-check]'); if (c) c.click(); } return; }
        if (ses.answered) return;
        const n = parseInt(e.key, 10);
        if (cur.type === 'tf' && (n === 1 || n === 2)) { const b = $$('.ans')[n - 1]; if (b) b.click(); }
        else if ((cur.type === 'mc' || cur.type === 'multi') && n >= 1 && n <= cur.opts.length) { const b = $$('.ans')[n - 1]; if (b) b.click(); }
      }
    };
    render();
  };
  const pick = (a) => a[Math.floor(Math.random() * a.length)];

  /* ---------- Ergebnis ---------- */
  SCREENS.result = function (ses) {
    const total = ses.ok + ses.bad, pct = total ? ses.ok / total : 0, d = D();
    let headline, stars, bonus = 0, sub = '';
    if (ses.boss) {
      const won = ses.hp <= 0, B = BOSSES[ses.boss] || { name: 'Boss', icon: '👹' };
      stars = won ? ses.hearts : 0;
      headline = won ? B.name + ' besiegt!' : 'Niederlage …';
      sub = won ? 'Mit ' + ses.hearts + ' von 3 Herzen.' : 'Der Boss hatte noch ' + ses.hp + ' HP. Übe das Kapitel und versuch es nochmal!';
      if (won) {
        const prev = S.boss[ses.boss] || {};
        S.boss[ses.boss] = { won: true, stars: Math.max(prev.stars || 0, stars) };
        d.boss++; bonus = 50 + 25 * stars;
        if (ses.hearts === 3) S.flags.flawless = true;
        SFX.win(); setTimeout(() => confetti(260), 100); setTimeout(() => confetti(160, innerWidth * 0.2, innerHeight * 0.5), 500); setTimeout(() => confetti(160, innerWidth * 0.8, innerHeight * 0.5), 800);
      } else SFX.lose();
    } else {
      stars = pct >= 0.95 ? 3 : pct >= 0.75 ? 2 : pct >= 0.5 ? 1 : 0;
      headline = pct >= 0.95 ? 'Perfekt! 💎' : pct >= 0.75 ? 'Stark gemacht!' : pct >= 0.5 ? 'Gut dabei!' : 'Weiter üben – das wird!';
      if (pct === 1 && total >= 10) S.flags.perfect = true;
      if (ses.mode === 'daily' && !ses.replay) {
        S.challenge[dkey()] = { score: ses.ok }; d.challenge++; bonus = 30 + 10 * ses.ok;
      } else if (total >= 5) bonus = stars * 10;
      if (stars >= 2) { SFX.win(); setTimeout(() => confetti(stars * 80), 100); }
    }
    save();
    if (bonus) setTimeout(() => addXP(bonus, $('.bigxp')), 700);
    const wrong = ses.wrong.filter((v, i, a) => a.indexOf(v) === i).map((q) =>
      '<div class="review"><div class="qtext sm">' + amp(q.q) + '</div><p class="ans-line">' + answerText(q) + '</p>' + (q.explain ? '<p class="muted">' + amp(q.explain) + '</p>' : '') + '</div>').join('');
    view('<div class="result"><div class="stars">' + [0, 1, 2].map((k) => '<span class="star' + (k < stars ? ' on' : '') + '" style="animation-delay:' + (0.2 + k * 0.25) + 's">★</span>').join('') + '</div>' +
      '<h1>' + headline + '</h1>' + (sub ? '<p class="muted">' + sub + '</p>' : '') +
      '<div class="stats"><div><b>' + ses.ok + '/' + total + '</b><small>richtig</small></div><div><b>' + ses.maxCombo + '</b><small>beste Combo</small></div>' +
      '<div class="bigxp"><b data-count="' + (ses.xp + bonus) + '">0</b><small>XP' + (bonus ? ' (inkl. ' + bonus + ' Bonus)' : '') + '</small></div></div>' +
      '<div class="actions"><button class="btn primary" data-again>Nochmal</button><button class="btn" data-hub>Zur Übersicht</button></div>' +
      (wrong ? '<h2 class="sec">Zum Nachlesen</h2>' + wrong : '') + '</div>');
    countUp($('[data-count]'));
    app.onclick = (e) => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.hasAttribute('data-hub')) go('hub');
      if (b.hasAttribute('data-again')) {
        if (ses.boss) return go('bossIntro', ses.boss);
        if (ses.mode === 'drill') return go('quiz', { mode: 'drill', items: buildDrill(ALLC, 12) });
        if (ses.mode === 'daily') return go('quiz', { mode: 'daily', items: buildDaily(), replay: true });
        if (ses.mode === 'mistakes') return go('quiz', { mode: 'mistakes', items: shuffle(mistakes()).slice(0, 10), label: ses.label });
        const chs = [...new Set(ses.items.map((q) => q.ch))];
        const pool = chs.length === 1 ? chById(chs[0]).questions : ALLQ;
        go('quiz', { mode: 'train', items: shuffle(pickByPriority(pool, S.q, 10)), label: ses.label });
      }
    };
    screen = { onKey(e) { if (e.key === 'Enter') { const b = $('[data-again]'); if (b) b.click(); } if (e.key === 'Escape') go('hub'); } };
  };
  function answerText(q) {
    if (q.type === 'tf') return 'Antwort: <b>' + (q.labels ? (q.answer === 'wahr' ? q.labels[0] : q.labels[1]) : q.answer) + '</b>';
    if (q.type === 'input') return 'Antwort: <b>' + amp(q.answer.split(';')[0]) + '</b>';
    return 'Richtig: ' + q.opts.filter((o) => o.ok).map((o) => '<b>' + amp(o.t) + '</b>').join(', ');
  }
  function countUp(el) {
    if (!el) return;
    const target = +el.dataset.count, t0 = performance.now(), dur = 900;
    (function step(t) { const k = Math.min(1, (t - t0) / dur); el.textContent = '+' + Math.round(target * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); })(t0);
  }

  /* ---------- Boss ---------- */
  SCREENS.bossIntro = function (chId) {
    const c = chById(chId), B = BOSSES[chId] || { name: 'Boss', icon: '👹', taunt: '' }, b = S.boss[chId], p = progress(c);
    view('<div class="boss-intro"><div class="boss-big">' + B.icon + '</div><p class="eyebrow">Boss-Kampf · ' + c.title + '</p><h1>' + B.name + '</h1><p class="taunt">„' + amp(B.taunt) + '"</p>' +
      '<ul class="rules"><li>❤️ Du hast 3 Herzen – jede falsche Antwort kostet eins.</li><li>⚔️ Jede richtige Antwort richtet Schaden an. Combos verstärken ihn.</li><li>🎰 Kritische Treffer machen doppelten Schaden.</li><li>★ Sterne = übrige Herzen. Sieg: +50 XP und +25 pro Stern.</li></ul>' +
      (p < 0.3 ? '<p class="warnline">Tipp: Dein Fortschritt im Kapitel liegt bei ' + Math.round(p * 100) + ' %. Übe vorher ein bisschen!</p>' : '') +
      (b && b.won ? '<p class="muted">Bestleistung: ' + '★'.repeat(b.stars) + '☆'.repeat(3 - b.stars) + '</p>' : '') +
      '<div class="actions"><button class="btn primary big" data-fight>Kampf beginnen</button><button class="btn" data-hub>Zurück</button></div></div>');
    app.onclick = (e) => {
      const t = e.target.closest('button'); if (!t) return;
      if (t.hasAttribute('data-hub')) go('hub');
      if (t.hasAttribute('data-fight')) {
        const pool = c.questions.concat(c.cards.map((k, i) => drillItem(k, i % 2)));
        go('quiz', { mode: 'boss', boss: chId, items: shuffle(pool), pool: pool });
      }
    };
    screen = { onKey(e) { if (e.key === 'Enter') $('[data-fight]').click(); if (e.key === 'Escape') go('hub'); } };
  };

  /* ---------- Blitzrunde ---------- */
  SCREENS.blitz = function () {
    const tfq = ALLQ.filter((q) => q.type === 'tf');
    let deck = [], score = 0, combo = 0, maxCombo = 0, wrong = [], cur = null, timeLeft = 60, timer = null, running = false, ended = false, lastTick = 0, n = 0;
    function draw() {
      if (!deck.length) deck = shuffle(tfq.concat(ALLC.map(cardTF)));
      return deck.pop();
    }
    function intro() {
      view('<div class="boss-intro"><div class="boss-big">⚡</div><h1>Blitzrunde</h1><p class="muted">60 Sekunden. Wahr oder falsch? Passt die Definition?<br>Wie in LA-Serie 1: <b>+1</b> für richtig, <b>−1</b> für falsch.<br>Alle 5 Treffer in Folge: <b>+3 Sekunden</b>.</p>' +
        '<p class="muted">Tasten: <kbd>1</kbd> / <kbd>←</kbd> wahr · <kbd>2</kbd> / <kbd>→</kbd> falsch</p><p>Rekord in ' + SUBJ.title + ': <b>' + (S.blitz[SUBJ.id] || 0) + '</b></p>' +
        '<div class="actions"><button class="btn primary big" data-start>Los geht\'s!</button><button class="btn" data-hub>Zurück</button></div></div>');
    }
    function start() {
      running = true; score = 0; combo = 0; timeLeft = 60; lastTick = performance.now();
      view('<div class="blitz"><div class="qtop"><button class="icon-btn" data-quit>✕</button><div class="progress timer"><i id="tbar" style="width:100%"></i></div><span class="combo" id="combo">🔥 0</span></div>' +
        '<div class="blitz-score"><span id="score">0</span><small id="tleft">60 s</small></div><div class="card qcard blitz-card" id="bcard"></div>' +
        '<div class="answers tf"><button class="ans" data-a="wahr"><kbd>1</kbd><span id="l1">Wahr</span></button><button class="ans" data-a="falsch"><kbd>2</kbd><span id="l2">Falsch</span></button></div></div>');
      nextQ();
      timer = setInterval(() => {
        const now = performance.now(); timeLeft -= (now - lastTick) / 1000; lastTick = now;
        if (timeLeft <= 0) return end();
        const tb = $('#tbar'); if (tb) tb.style.width = (100 * Math.min(60, timeLeft) / 60) + '%';
        const tl = $('#tleft'); if (tl) tl.textContent = Math.ceil(timeLeft) + ' s';
        if (timeLeft < 10 && Math.ceil(timeLeft) !== n) { n = Math.ceil(timeLeft); SFX.tick(); $('.blitz').classList.add('urgent'); }
      }, 100);
    }
    function nextQ() {
      cur = draw();
      const L = cur.labels || ['Wahr', 'Falsch'];
      const card = $('#bcard'); card.innerHTML = '<div class="qtext">' + amp(cur.q) + '</div>'; renderMath(card);
      $('#l1').textContent = L[0]; $('#l2').textContent = L[1];
      card.classList.remove('pop'); void card.offsetWidth; card.classList.add('pop');
    }
    function answer(a) {
      if (!running) return;
      const ok = a === cur.answer, card = $('#bcard');
      if (cur.cardId) recordC(cur.cardId, ok ? 2 : 0); else recordQ(cur.id, ok);
      if (ok) {
        score++; combo++; maxCombo = Math.max(maxCombo, combo); S.totalCorrect++; D().correct++; S.bestCombo = Math.max(S.bestCombo, combo); D().maxCombo = Math.max(D().maxCombo, combo);
        SFX.good(combo);
        if (combo % 5 === 0) { timeLeft += 3; floatText('+3 s', $('#tleft'), 'combo'); SFX.combo(); confetti(30, innerWidth / 2, 120); }
      } else { score--; combo = 0; wrong.push(cur); SFX.bad(); }
      card.classList.remove('flash-ok', 'flash-no'); void card.offsetWidth; card.classList.add(ok ? 'flash-ok' : 'flash-no');
      $('#score').textContent = score;
      $('#combo').textContent = '🔥 ' + combo; $('#combo').classList.toggle('hot', combo >= 3);
      floatText(ok ? '+1' : '−1', $('#score'), ok ? 'xp' : 'dmg');
      nextQ();
    }
    function end() {
      if (ended) return; ended = true;
      running = false; clearInterval(timer);
      const record = score > (S.blitz[SUBJ.id] || 0);
      if (record) S.blitz[SUBJ.id] = score;
      S.blitzBest = Math.max(S.blitzBest, score);
      D().blitz = Math.max(D().blitz, score);
      save();
      const xp = Math.max(0, score * 3) + (record ? 30 : 0);
      if (record && score > 0) { SFX.win(); confetti(220); } else SFX.quest();
      const rev = wrong.slice(-8).map((q) => '<div class="review"><div class="qtext sm">' + amp(q.q) + '</div><p class="ans-line">' + answerText(q) + '</p>' + (q.explain ? '<p class="muted">' + amp(q.explain) + '</p>' : '') + '</div>').join('');
      view('<div class="result"><div class="blitz-final">' + score + '</div><h1>' + (record && score > 0 ? 'Neuer Rekord! 🏆' : 'Zeit abgelaufen!') + '</h1>' +
        '<div class="stats"><div><b>' + (S.blitz[SUBJ.id] || 0) + '</b><small>Rekord</small></div><div><b>' + maxCombo + '</b><small>beste Combo</small></div><div class="bigxp"><b data-count="' + xp + '">0</b><small>XP</small></div></div>' +
        '<div class="actions"><button class="btn primary" data-again>Nochmal</button><button class="btn" data-hub>Zur Übersicht</button></div>' + (rev ? '<h2 class="sec">Das ging daneben</h2>' + rev : '') + '</div>');
      countUp($('[data-count]'));
      setTimeout(() => addXP(xp, $('.bigxp')), 600);
    }
    app.onclick = (e) => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.hasAttribute('data-hub')) go('hub');
      if (b.hasAttribute('data-start')) start();
      if (b.hasAttribute('data-again')) go('blitz');
      if (b.hasAttribute('data-quit')) { running = false; clearInterval(timer); go('hub'); }
      if (b.dataset.a) answer(b.dataset.a);
    };
    screen = {
      cleanup() { clearInterval(timer); running = false; },
      onKey(e) {
        if (!running) { if (e.key === 'Enter') { const s = $('[data-start]') || $('[data-again]'); if (s) s.click(); } if (e.key === 'Escape') go('hub'); return; }
        if (e.key === '1' || e.key === 'ArrowLeft') answer('wahr');
        if (e.key === '2' || e.key === 'ArrowRight') answer('falsch');
        if (e.key === 'Escape') { clearInterval(timer); go('hub'); }
      }
    };
    intro();
  };

  /* ---------- Karteikarten ---------- */
  SCREENS.cardsSetup = function () {
    let chs = new Set(CHAPTERS.map((c) => c.id)), kind = 'all';
    function render() {
      const due = ALLC.filter((c) => chs.has(c.ch) && (kind === 'all' || c.kind === kind));
      const fresh = due.filter((c) => !S.c[c.id]).length;
      view('<div class="crumbs"><button class="link" data-hub>← ' + SUBJ.title + '</button></div><h1 class="page">Karteikarten</h1>' +
        '<p class="muted">Begriff ansehen, Definition im Kopf aufsagen, Karte umdrehen und ehrlich bewerten. Was du nicht wusstest, kommt öfter dran.</p>' +
        '<h2 class="sec">Kapitel</h2><div class="chips">' + CHAPTERS.map((c) => '<button class="chip toggle' + (chs.has(c.id) ? ' on' : '') + '" data-ch="' + c.id + '">' + c.title + ' <small>' + c.cards.length + '</small></button>').join('') + '</div>' +
        '<h2 class="sec">Art</h2><div class="chips">' + [['all', 'Alles'], ['D', 'Definitionen'], ['F', 'Formeln & Sätze']].map((k) => '<button class="chip toggle' + (kind === k[0] ? ' on' : '') + '" data-kind="' + k[0] + '">' + k[1] + '</button>').join('') + '</div>' +
        '<div class="panel"><b>' + due.length + '</b> Karten ausgewählt · <b>' + fresh + '</b> davon neu</div>' +
        '<div class="actions"><button class="btn primary big" data-go' + (due.length ? '' : ' disabled') + '>15 Karten lernen</button></div>');
    }
    app.onclick = (e) => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.hasAttribute('data-hub')) return go('hub');
      if (b.dataset.ch) { if (chs.has(b.dataset.ch)) { if (chs.size > 1) chs.delete(b.dataset.ch); } else chs.add(b.dataset.ch); SFX.tick(); render(); }
      if (b.dataset.kind) { kind = b.dataset.kind; SFX.tick(); render(); }
      if (b.hasAttribute('data-go')) go('cards', { chs: [...chs], kind });
    };
    screen = { onKey(e) { if (e.key === 'Enter') { const g = $('[data-go]'); if (g && !g.disabled) g.click(); } if (e.key === 'Escape') go('hub'); } };
    render();
  };

  SCREENS.cards = function (cfg) {
    const chs = cfg.chs || [cfg.ch];
    const pool = ALLC.filter((c) => chs.includes(c.ch) && (cfg.kind === 'all' || c.kind === cfg.kind));
    let queue = pickByPriority(pool, S.c, 15), idx = 0, flipped = false, stats = [0, 0, 0], xp = 0, streakK = 0;
    const total = queue.length;
    function render() {
      const c = queue[idx];
      if (!c) return done();
      flipped = false;
      const r = S.c[c.id];
      view('<div class="qtop"><button class="icon-btn" data-quit>✕</button><div class="progress"><i style="width:' + (100 * Math.min(idx, total) / total) + '%"></i></div><span class="combo' + (streakK >= 3 ? ' hot' : '') + '">🧠 ' + streakK + '</span></div>' +
        '<div class="flip" id="flip" tabindex="0"><div class="flip-inner">' +
        '<div class="face front"><span class="tag ' + (c.kind === 'D' ? '' : 'alt') + '">' + (c.kind === 'D' ? 'Definition' : 'Formel / Satz') + ' · ' + chById(c.ch).title + '</span><div class="term">' + amp(c.front) + '</div><small class="muted">' + (r ? 'Stufe ' + r.b + ' von 5' : 'Neu ✨') + ' · Tippen zum Umdrehen</small></div>' +
        '<div class="face back"><span class="tag">' + amp(c.front) + '</span><div class="def">' + amp(c.back) + '</div><small class="src">📖 ' + amp(c.src) + '</small></div>' +
        '</div></div>' +
        '<div class="grade" id="grade"><button class="btn" data-flip>Umdrehen <kbd>Leertaste</kbd></button></div>');
    }
    function flip() {
      if (flipped) return; flipped = true; SFX.flip();
      $('#flip').classList.add('flipped');
      $('#grade').innerHTML = '<button class="btn g0" data-g="0"><kbd>1</kbd>Nochmal</button><button class="btn g1" data-g="1"><kbd>2</kbd>Schwer</button><button class="btn g2" data-g="2"><kbd>3</kbd>Gewusst!</button>';
    }
    function grade(g) {
      const c = queue[idx]; recordC(c.id, g); stats[g]++; save();
      S.cardsSeen++; D().cards++;
      const gain = g === 2 ? 5 : g === 1 ? 2 : 0;
      if (g === 2) { streakK++; SFX.good(streakK); if (streakK % 5 === 0) { SFX.combo(); confetti(50, innerWidth / 2, 160); } } else { streakK = 0; if (g === 0) SFX.bad(); else SFX.tick(); }
      xp += gain; addXP(gain, $('#grade'));
      if (g === 0) queue.push(c); // nochmal am Ende
      idx++;
      if (idx >= queue.length || idx >= total + 10) return done();
      render();
    }
    function done() {
      save();
      const bonus = stats[2] >= 10 ? 20 : 0;
      if (bonus) addXP(bonus, false);
      if (stats[2] >= stats[0] + stats[1]) { SFX.win(); confetti(150); }
      view('<div class="result"><div class="blitz-final">🗂️</div><h1>Stapel geschafft!</h1><div class="stats"><div><b>' + stats[2] + '</b><small>gewusst</small></div><div><b>' + stats[1] + '</b><small>schwer</small></div><div><b>' + stats[0] + '</b><small>nochmal</small></div></div>' +
        '<p class="muted">+' + (xp + bonus) + ' XP. Karten, die du nicht wusstest, kommen beim nächsten Mal zuerst dran.</p>' +
        '<div class="actions"><button class="btn primary" data-again>Nächster Stapel</button><button class="btn" data-drill>Als Drill üben</button><button class="btn" data-hub>Zur Übersicht</button></div></div>');
      screen = { onKey(e) { if (e.key === 'Enter') $('[data-again]').click(); if (e.key === 'Escape') go('hub'); } };
    }
    app.onclick = (e) => {
      if (e.target.closest('#flip')) return flip();
      const b = e.target.closest('button'); if (!b) return;
      if (b.hasAttribute('data-quit') || b.hasAttribute('data-hub')) return go('hub');
      if (b.hasAttribute('data-flip')) return flip();
      if (b.dataset.g) return grade(+b.dataset.g);
      if (b.hasAttribute('data-again')) return go('cards', cfg);
      if (b.hasAttribute('data-drill')) return go('quiz', { mode: 'drill', items: buildDrill(pool, 12) });
    };
    screen = {
      onKey(e) {
        if (e.key === 'Escape') return go('hub');
        if (!flipped && (e.key === ' ' || e.key === 'Enter')) { e.preventDefault(); return flip(); }
        if (flipped && ['1', '2', '3'].includes(e.key)) grade(+e.key - 1);
      }
    };
    if (!total) { view('<div class="empty"><p>Keine Karten ausgewählt.</p><button class="btn" data-hub>Zurück</button></div>'); return; }
    render();
  };

  /* ---------- Mathle (Begriff raten) ---------- */
  SCREENS.mathle = function (cfg) {
    const daily = cfg && cfg.daily;
    const list = shuffle(WORDS, rng(20261108 + hashStr(SUBJ.id)));
    const target = daily ? list[dayNum(today()) % list.length] : pick(WORDS);
    const W = target.w, LEN = [...W].length, TRIES = 6;
    const saved = daily ? S.mathle[dkey()] : null;
    let guesses = saved ? saved.guesses.slice() : [], curG = '', done = saved ? saved.done : false, hint = guesses.length >= 3;
    const KB = ['QWERTZUIOPÜ', 'ASDFGHJKLÖÄ', 'YXCVBNM'];
    function evalG(g) {
      const w = [...W], a = [...g], res = Array(LEN).fill('absent'), cnt = {};
      a.forEach((ch, i) => { if (ch === w[i]) res[i] = 'correct'; else cnt[w[i]] = (cnt[w[i]] || 0) + 1; });
      a.forEach((ch, i) => { if (res[i] !== 'correct' && cnt[ch] > 0) { res[i] = 'present'; cnt[ch]--; } });
      return res;
    }
    function keyStates() {
      const st = {}, rank = { absent: 1, present: 2, correct: 3 };
      guesses.forEach((g) => { const r = evalG(g); [...g].forEach((ch, i) => { if (!st[ch] || rank[r[i]] > rank[st[ch]]) st[ch] = r[i]; }); });
      return st;
    }
    function render(animRow) {
      const rows = [];
      for (let r = 0; r < TRIES; r++) {
        const g = guesses[r], isCur = r === guesses.length && !done;
        const letters = g ? [...g] : isCur ? [...curG] : [];
        const res = g ? evalG(g) : null;
        let cells = '';
        for (let i = 0; i < LEN; i++) cells += '<span class="tile-l' + (res ? ' ' + res[i] : letters[i] ? ' filled' : '') + (r === animRow ? ' reveal' : '') + '" style="animation-delay:' + (i * 0.12) + 's">' + (letters[i] || '') + '</span>';
        rows.push('<div class="wrow' + (isCur ? ' cur' : '') + '">' + cells + '</div>');
      }
      const ks = keyStates();
      const kb = KB.map((row, ri) => '<div class="krow">' + (ri === 2 ? '<button class="key wide" data-key="ENTER">⏎</button>' : '') + [...row].map((k) => '<button class="key ' + (ks[k] || '') + '" data-key="' + k + '">' + k + '</button>').join('') + (ri === 2 ? '<button class="key wide" data-key="BACK">⌫</button>' : '') + '</div>').join('');
      const ch = chById(target.ch);
      let status = '';
      if (done) {
        const won = guesses[guesses.length - 1] === W;
        status = '<div class="feedback ' + (won ? 'ok' : 'no') + '"><b>' + (won ? 'Gelöst in ' + guesses.length + '! 🎉' : 'Das Wort war: ' + W) + '</b><p>' + amp(target.hint) + '</p>' +
          '<div class="actions"><button class="btn primary" data-new>Übungswort</button><button class="btn" data-hub>Zur Übersicht</button></div></div>';
      }
      view('<div class="crumbs"><button class="link" data-hub>← ' + SUBJ.title + '</button></div><div class="mathle-head"><h1 class="page">Mathle' + (daily ? ' des Tages' : '') + '</h1>' +
        '<p class="muted">Errate den Fachbegriff (' + LEN + ' Buchstaben) in 6 Versuchen. Thema: <b>' + (ch ? ch.title : '') + '</b></p>' +
        (hint || done ? '<div class="defbox sm">💡 ' + amp(target.hint) + '</div>' : '<button class="chip" data-hint>💡 Tipp zeigen (−15 XP)</button>') + '</div>' +
        '<div class="wgrid" style="--n:' + LEN + '">' + rows.join('') + '</div>' + status + (done ? '' : '<div class="kb">' + kb + '</div>'));
    }
    function submit() {
      if ([...curG].length !== LEN) { const row = $('.wrow.cur'); if (row) { row.classList.remove('shake'); void row.offsetWidth; row.classList.add('shake'); } SFX.bad(); return; }
      guesses.push(curG); curG = '';
      const won = guesses[guesses.length - 1] === W;
      if (won || guesses.length >= TRIES) done = true;
      if (guesses.length >= 3) hint = true;
      if (daily) { S.mathle[dkey()] = { guesses: guesses.slice(), done, won }; }
      render(guesses.length - 1);
      const delay = LEN * 120 + 300;
      if (won) {
        setTimeout(() => {
          SFX.win(); confetti(200);
          S.flags.mathleWin = true; if (guesses.length <= 2) S.flags.mathle2 = true;
          if (daily) D().mathle++;
          const xp = Math.max(10, (7 - guesses.length) * (daily ? 15 : 8) - (hintPaid ? 15 : 0));
          addXP(xp, $('.wgrid'));
        }, delay);
      } else if (done) setTimeout(SFX.lose, delay); else setTimeout(() => SFX.tick(), delay);
      save();
    }
    let hintPaid = false;
    function key(k) {
      if (done) return;
      if (k === 'ENTER') return submit();
      if (k === 'BACK') { curG = [...curG].slice(0, -1).join(''); return render(); }
      if ([...curG].length < LEN && /^[A-ZÄÖÜ]$/.test(k)) { curG += k; SFX.tick(); render(); }
    }
    app.onclick = (e) => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.key) return key(b.dataset.key);
      if (b.hasAttribute('data-hub')) return go('hub');
      if (b.hasAttribute('data-new')) return go('mathle', { daily: false });
      if (b.hasAttribute('data-hint')) { hint = true; hintPaid = true; render(); }
    };
    screen = {
      onKey(e) {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        if (e.key === 'Escape') return go('hub');
        if (done) { if (e.key === 'Enter') go('mathle', { daily: false }); return; }
        if (e.key === 'Enter') { e.preventDefault(); key('ENTER'); }
        else if (e.key === 'Backspace') key('BACK');
        else if (e.key.length === 1) key(e.key.toUpperCase());
      }
    };
    render();
  };

  /* ---------- Erfolge & Statistik ---------- */
  SCREENS.achievements = function () {
    view('<div class="crumbs"><button class="link" data-home>← Start</button></div><h1 class="page">Erfolge</h1><p class="muted">' + Object.keys(S.ach).length + ' von ' + ACH.length + ' freigeschaltet</p>' +
      '<div class="achs">' + ACH.map((a) => '<div class="ach' + (S.ach[a.id] ? ' on' : '') + '"><span class="ticon">' + (S.ach[a.id] ? a.icon : '🔒') + '</span><b>' + a.t + '</b><small>' + a.d + '</small>' + (S.ach[a.id] ? '<small class="date">' + S.ach[a.id] + '</small>' : '') + '</div>').join('') + '</div>');
    app.onclick = (e) => { if (e.target.closest('[data-home]')) go('home'); };
    screen = { onKey(e) { if (e.key === 'Escape') go('home'); } };
  };
  SCREENS.stats = function () {
    const li = levelInfo(S.xp);
    const days = []; const t = dayNum(today());
    for (let i = 13; i >= 0; i--) days.push({ d: dateStr(t - i), xp: S.days[dateStr(t - i)] || 0 });
    const max = Math.max(50, ...days.map((x) => x.xp));
    const qSeen = Object.keys(S.q).length, cSeen = Object.keys(S.c).length;
    view('<div class="crumbs"><button class="link" data-home>← Start</button></div><h1 class="page">Statistik</h1>' +
      '<div class="stats"><div><b>' + li.L + '</b><small>Level</small></div><div><b>' + S.xp + '</b><small>XP gesamt</small></div><div><b>' + streak() + '</b><small>Tage-Serie</small></div><div><b>' + S.bestCombo + '</b><small>beste Combo</small></div></div>' +
      '<div class="panel"><div class="panel-head"><h2>XP der letzten 14 Tage</h2></div><div class="chart">' + days.map((x) => '<div class="col" title="' + x.d + ': ' + x.xp + ' XP"><i style="height:' + (100 * x.xp / max) + '%"></i><small>' + x.d.slice(8) + '</small></div>').join('') + '</div></div>' +
      '<div class="panel"><p>Fragen gesehen: <b>' + qSeen + '/' + SUBJECTS.reduce((a, s) => a + s.allQ.length, 0) + '</b> · Karten gesehen: <b>' + cSeen + '/' + SUBJECTS.reduce((a, s) => a + s.allC.length, 0) + '</b> · Bester Blitz: <b>' + S.blitzBest + '</b></p></div>' +
      SUBJECTS.map((s) => '<div class="panel"><div class="panel-head"><h2>' + s.icon + ' ' + s.title + '</h2><small>Blitz-Rekord ' + (S.blitz[s.id] || 0) + '</small></div>' +
        s.chapters.map((c) => '<div class="qrow"><span>' + c.title + '</span><small>' + Math.round(100 * progress(c)) + '%</small></div><div class="bar"><i style="width:' + (100 * progress(c)) + '%"></i></div>').join('') + '</div>').join('') +
      '<div class="actions"><button class="btn danger" data-reset>Fortschritt zurücksetzen</button></div>');
    app.onclick = (e) => {
      if (e.target.closest('[data-home]')) go('home');
      if (e.target.closest('[data-reset]') && confirm('Wirklich den gesamten Fortschritt löschen? Das kann nicht rückgängig gemacht werden.')) {
        const keep = { sound: S.sound, theme: S.theme }; S = Object.assign(JSON.parse(JSON.stringify(DEF)), keep); save(); renderHud(); go('home');
      }
    };
    screen = { onKey(e) { if (e.key === 'Escape') go('home'); } };
  };

  /* ============================== Start ============================== */
  setSubject(S.subj);
  applyTheme();
  renderHud();
  if (!window.renderMathInElement) {
    // KaTeX noch nicht da (z.B. langsames Netz): nach dem Laden neu zeichnen.
    window.addEventListener('load', () => renderMath(app));
  }
  go('home');
  setTimeout(checkAch, 500);
})();
