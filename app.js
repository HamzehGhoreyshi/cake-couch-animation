/* ---------- data: the only place content lives ---------- */
/* hero items: [symbol, x, y, w, h, rotate, blur(0|3|5), depth k, delay s] in 710x482 card units */
const THEMES = [
  { name: ["Sofa", "cake"], c1: "#b862f8", c2: "#6a30f0", icon: "i-sofa",    rows: [["Worktop", "s-stool"], ["Couch capsule", "s-pillow"], ["Couch cake", "s-sofa"]],
    hero: [["s-stool", 128, 192, 108, 120, -4, 3, 1.25, .1], ["s-sofa", 176, 128, 212, 125, 0, 0, 1, 0], ["s-pillow", 210, -38, 88, 88, 18, 5, 1.4, .16]] },
  { name: ["Blob", "sofa"], c1: "#ffd65e", c2: "#f5a03a", icon: "i-pod",    rows: [["Blob chair", "s-knot"], ["Side table", "s-table"], ["Table lamp", "s-lamp2"]],
    hero: [["s-knot", 176, 106, 216, 181, -9, 0, 1, 0], ["s-table", 108, 212, 104, 104, 0, 3, 1.3, .1], ["s-lamp2", 200, -8, 80, 88, 8, 5, 1.45, .18]] },
  { name: ["Herbs", "pods"], c1: "#4cefd6", c2: "#18d4b6", icon: "i-box",    rows: [["Herbs pods", "s-plant"], ["Garden pack", "t-pack"], ["Outdoor light", "t-lamp"]],
    hero: [["s-plant", 184, 66, 90, 264, 0, 0, 1, 0], ["s-cloud", 50, 252, 146, 84, 0, 5, 1.3, .12]] }
];

/* centre of the hidden circle the hero objects orbit, in card units */
const ORBIT = [104, 128];

const $ = id => document.getElementById(id);
const card = $("card"), head = $("head"), hero = $("hero"), rows = $("rows"), steps = $("steps");
const reduce = matchMedia("(prefers-reduced-motion: reduce)");
const u = n => `calc(var(--u)*${n})`;
const sym = (id, blur, rot) => {
  const use = `<use href="#${id}" width="100%" height="100%"${rot ? ` style="transform:rotate(${rot}deg);transform-origin:50% 50%;transform-box:view-box"` : ""}/>`;
  return `<svg>${blur ? `<g filter="url(#b${blur})">${use}</g>` : use}</svg>`;
};

/* ---------- build every theme once ---------- */
const layers = THEMES.map((t, ti) => {
  const h = document.createElement("p");
  h.className = "ht"; h.innerHTML = t.name.join("<br>");
  head.append(h);
  const objs = t.hero.map(([id, x, y, w, ht, r, b, k, d], n) => {
    const o = document.createElement("div");
    o.className = "o";
    o.style.cssText = `left:${u(x)};top:${u(y)};width:${u(w)};height:${u(ht)};--px:${ORBIT[0] - x};--py:${ORBIT[1] - y};--k:${k};--dl:${d}s;--fd:${-(ti * 2 + n * 1.3)}s;--fr:${n % 2 ? -1.5 : 1}deg`;
    o.innerHTML = `<div>${sym(id, b, r)}</div>`;
    hero.append(o);
    return o;
  });
  return { h, objs };
});
THEMES[0].rows.forEach((_, r) => {
  const li = document.createElement("li");
  li.innerHTML = `<div class="win">${THEMES.map(t => `<div class="seg"><b>${t.rows[r][0]}</b><em>110 x 110</em><svg viewBox="0 0 44 52" aria-hidden="true"><use href="#${t.rows[r][1]}"/></svg></div>`).join("")}</div><span class="plus" aria-hidden="true">+</span>`;
  rows.append(li);
});
const segs = [...rows.children].map(li => [...li.querySelectorAll(".seg")]);
THEMES.forEach((t, i) => {
  if (i) steps.append(document.createElement("i"));
  const b = document.createElement("button");
  b.setAttribute("aria-label", `Show ${t.name.join(" ")}`);
  b.innerHTML = `<svg viewBox="0 0 20 20" aria-hidden="true"><use href="#${t.icon}"/></svg>`;
  b.onclick = () => { go(i); schedule(); };
  steps.append(b);
});
const stepBtns = [...steps.querySelectorAll("button")];

/* ---------- state ---------- */
let cur = -1, timer = 0, paused = false, held = false, cleanup = 0;
function go(i) {
  if (i === cur) return;
  const prev = cur; cur = i;
  const t = THEMES[i], L = layers[i];
  clearTimeout(cleanup);
  layers.forEach((l, k) => { if (k !== prev && k !== i) { l.h.className = "ht"; l.objs.forEach(o => o.className = "o"); segs.forEach(s => s[k].className = "seg"); } });
  if (prev >= 0) {
    const P = layers[prev];
    head.style.setProperty("--d", P.h.offsetWidth + card.offsetWidth * .05 + "px");
    void head.offsetWidth;
    P.h.className = "ht old";
    P.objs.forEach(o => o.className = "o old");
    segs.forEach(s => s[prev].className = "seg old");
    cleanup = setTimeout(() => { P.h.className = "ht"; P.objs.forEach(o => o.className = "o"); segs.forEach(s => s[prev].className = "seg"); }, 2000);
  }
  L.h.className = "ht cur";
  L.objs.forEach(o => o.className = "o cur");
  segs.forEach(s => s[i].className = "seg cur");
  if (prev >= 0) { turns++; spin(); }
  card.style.setProperty("--c1", t.c1);
  card.style.setProperty("--c2", t.c2);
  stepBtns.forEach((b, k) => b.setAttribute("aria-pressed", k === i));
}

/* ---------- autoplay: pauses on hover/focus, hidden tab, button, reduced motion ---------- */
function schedule() {
  clearTimeout(timer);
  if (!paused && !held && !reduce.matches && !document.hidden) timer = setTimeout(() => { go((cur + 1) % THEMES.length); schedule(); }, 2600);
}
$("next").onclick = () => { go((cur + 1) % THEMES.length); schedule(); };
$("play").onclick = e => {
  paused = !paused;
  const b = e.currentTarget;
  b.setAttribute("aria-pressed", paused);
  b.setAttribute("aria-label", paused ? "Resume autoplay" : "Pause autoplay");
  $("pi").setAttribute("d", paused ? "M7 5l8 5-8 5z" : "M7 5v10M13 5v10");
  schedule();
};
card.addEventListener("pointerenter", () => { held = true; schedule(); });
card.addEventListener("pointerleave", () => { held = false; schedule(); });
card.addEventListener("focusin", () => { held = true; schedule(); });
card.addEventListener("focusout", () => { held = false; schedule(); });
document.addEventListener("visibilitychange", schedule);
reduce.addEventListener("change", schedule);
/* ---------- background pentagon: rotates 144deg (= 2 sides) per theme, always clockwise ----------
   a regular pentagon looks identical every 72deg, so every theme rests on the same silhouette.
   Rounded corners = a thick stroke with round joins around a smaller pentagon. */
const bsq = $("bsq"), bsvg = $("blob"), mobile = matchMedia("(max-width: 640px)");
const TILT = 10, STEP = 144;
let turns = 0;
const spin = () => { bsq.style.transform = `rotate(${TILT + turns * STEP}deg)`; };
function layoutBlob() {                      // desktop: 710x482 card, phone: 343x300 blob panel
  const m = mobile.matches, o = m ? [150, 100] : [104, 128], a = m ? 170 : 190, r = 70 * (m ? .86 : 1);
  const R = (a - r) / Math.cos(Math.PI / 5);          // inner pentagon radius (flat side faces right)
  const pts = [-36, 36, 108, 180, 252].map(d => [o[0] + R * Math.cos(d * Math.PI / 180), o[1] + R * Math.sin(d * Math.PI / 180)]);
  bsvg.setAttribute("viewBox", m ? "0 0 343 300" : "0 0 710 482");
  bsq.setAttribute("points", pts.map(q => q.map(n => n.toFixed(1)).join(",")).join(" "));
  bsq.setAttribute("stroke-width", r * 2);
  for (const el of [bsq, bsq.parentNode]) el.style.transformOrigin = `${o[0]}px ${o[1]}px`;
  bsq.style.transition = "none"; spin(); void bsq.getBoundingClientRect(); bsq.style.transition = "";
}
mobile.addEventListener("change", layoutBlob);
layoutBlob();
go(0);
schedule();
