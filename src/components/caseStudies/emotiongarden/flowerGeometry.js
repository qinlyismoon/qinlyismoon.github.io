/**
 * Emotion Garden — a pocket version of the garden's organ generator,
 * for the case-study widgets. One outline function draws every petal
 * and every leaf from a handful of numbers (the real prototype uses ~20).
 */

export const FEELINGS = ["joy", "trust", "fear", "surprise", "sadness", "disgust", "anger", "anticipation"];
export const PLEASANT = ["joy", "trust", "anticipation"];
export const PAINFUL = ["fear", "sadness", "disgust", "anger"];

// Muted watercolour hues, one per Plutchik feeling.
export const HUE = {
  joy: "#E3BE5C",
  trust: "#A9C47F",
  fear: "#6E9F7C",
  surprise: "#7DB2C4",
  sadness: "#7E93C2",
  disgust: "#A98DB6",
  anger: "#D27A69",
  anticipation: "#E6A15D",
};

export const SCENES = ["work", "social", "daily", "body", "own", "world"];
export const ACTIONS = ["breathing", "meditation", "music", "movement", "rest", "reframing", "problem", "reaching", "nothing"];
export const OUTCOMES = ["helped", "same", "harder"];

export const STEM = { helped: "#6C9A55", same: "#9A9C8E", harder: "#B08F57", none: "#7F9473" };
const LEAF_BASE = { helped: "#6F9C58", same: "#9AA58C", harder: "#B5925A" };

// Petal presets (the "genome" of each feeling).
const PETAL = {
  joy: { w: 0.42, p: 0.62, n: 2.6, k: 3, amp: 0.1, sharp: 0, tz: 0.72 },
  trust: { w: 0.5, p: 0.58, n: 2.3, k: 4, amp: 0.045, sharp: 0, tz: 0.8, cup: true },
  fear: { w: 0.26, p: 0.55, n: 1.6, k: 1, amp: 0, sharp: 0, irr: 0.16, lean: -0.12 },
  surprise: { w: 0.46, p: 0.84, n: 3, k: 5, amp: 0.13, sharp: 0.85, tz: 0.82 },
  sadness: { w: 0.34, p: 0.5, n: 1.9, k: 1, amp: 0, sharp: 0, bites: 2, lean: 0.1, spots: 3 },
  disgust: { w: 0.3, p: 0.42, n: 1.7, k: 2, amp: 0.16, sharp: 0.2, tz: 0.78, folds: true, cav: true },
  anger: { w: 0.4, p: 0.6, n: 1.3, k: 3, amp: 0.16, sharp: 1, tz: 0.72 },
  anticipation: { w: 0.2, p: 0.32, n: 1, k: 1, amp: 0, sharp: 0, vein: 0.85 },
};

// Leaf presets: one botanical form per coping action.
const LEAF = {
  breathing: { w: 0.4, p: 0.52, n: 1.5 }, // orbicular
  meditation: { w: 0.44, p: 0.3, n: 1.2, notch: 0.12 }, // cordate
  music: { w: 0.3, p: 0.45, n: 1.3, sk: 5, samp: 0.12, ssharp: 0 }, // undulate
  movement: { w: 0.2, p: 0.38, n: 1 }, // lanceolate
  rest: { w: 0.1, p: 0.4, n: 1, droop: 0.25 }, // willow
  reframing: { w: 0.42, p: 0.5, n: 1.4, sk: 3, samp: 0.38, ssharp: 0 }, // lobed
  problem: { w: 0.28, p: 0.45, n: 1.1, sk: 9, samp: 0.12, ssharp: 1 }, // serrate
  reaching: { pair: true }, // paired leaflets
};

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const fmt = (v) => (Math.round(v * 10) / 10).toString();

// deterministic pseudo-noise so the same settings draw the same flower
function rng(seed) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Half-width profile along the length (s: 0 base → 1 tip). */
function profile(s, p, n) {
  if (s <= p) return Math.pow(Math.sin((Math.PI / 2) * (s / p)), 0.85);
  const u = (s - p) / (1 - p);
  return Math.pow(Math.max(0, 1 - Math.pow(u, n)), 1 / n);
}

function wave(x, sharp) {
  // x in [0,1) one period → 0 at ends, 1 at middle
  const round = (1 - Math.cos(2 * Math.PI * x)) / 2;
  const tri = 1 - Math.abs(2 * x - 1);
  return round * (1 - sharp) + tri * sharp;
}

/**
 * The organ outline: points of a closed shape pointing up (−y), base at 0,0.
 * Returns an array of [x, y].
 */
export function organ(g, L, seed = 1) {
  const N = 90;
  const r = rng(seed);
  const noise = Array.from({ length: 6 }, () => r() * 2 - 1);
  const W = (g.w ?? 0.3) * L;
  const pts = [];
  for (let i = 0; i <= 2 * N; i++) {
    const t = i / N - 1; // −1 left base … 0 tip … +1 right base
    const side = t < 0 ? -1 : 1;
    const s = 1 - Math.abs(t);
    let hw = W * profile(s, g.p ?? 0.5, g.n ?? 2);
    // base notch (cordate leaves)
    let y = -L * s;
    if (g.notch && s < 0.12) y -= g.notch * L * (1 - s / 0.12) * (hw / W);
    // side waves along the edge (lobed / serrate / undulate leaves)
    if (g.sk && s > 0.08 && s < 0.92) {
      const ph = ((s - 0.08) / 0.84) * g.sk;
      hw *= 1 - g.samp * (1 - wave(ph % 1, g.ssharp ?? 0));
    }
    // irregular, wavering edge (fear)
    if (g.irr) {
      const wob = noise[0] * Math.sin(s * 9 + noise[1] * 3) + noise[2] * Math.sin(s * 17 + side * 2);
      hw *= 1 + g.irr * wob * 0.6;
    }
    // bites: missing pieces (sadness)
    if (g.bites) {
      for (let b = 0; b < g.bites; b++) {
        const bs = 0.45 + b * 0.22;
        const bside = b % 2 === 0 ? 1 : -1;
        if (side === bside) hw *= 1 - 0.55 * Math.exp(-Math.pow((s - bs) / 0.05, 2));
      }
    }
    let x = side * hw;
    // rim waves at the tip (joy lobes, anger points, surprise split, trust scallops)
    if (g.amp && g.k > 1 && Math.abs(t) < 1 - (g.tz ?? 0.75)) {
      const u = (t / (1 - (g.tz ?? 0.75)) + 1) / 2; // 0..1 across the tip zone
      const win = Math.pow(Math.sin(Math.PI * u), 0.6);
      const lobe = wave((u * g.k) % 1, g.sharp ?? 0);
      y += g.amp * L * (1 - lobe) * win;
    }
    // lean: the whole organ bends sideways toward the tip
    if (g.lean) x += g.lean * L * s * s;
    pts.push([x, y]);
  }
  return pts;
}

export function toPath(pts, ox = 0, oy = 0, rot = 0, scale = 1) {
  const c = Math.cos(rot);
  const s = Math.sin(rot);
  return (
    pts
      .map(([x, y], i) => {
        const X = ox + (x * c - y * s) * scale;
        const Y = oy + (x * s + y * c) * scale;
        return `${i ? "L" : "M"}${fmt(X)} ${fmt(Y)}`;
      })
      .join("") + "Z"
  );
}

// Posture of the whole plant per first feeling (v6 rationale).
const POSTURE = {
  joy: { height: 1.08, tilt: 0, bow: 0 },
  trust: { height: 1, tilt: 0, bow: 0 },
  fear: { height: 0.84, tilt: -8, bow: 0.05, scale: 0.88 },
  surprise: { height: 1.14, tilt: 0, bow: -0.04 },
  sadness: { height: 0.94, tilt: 58, bow: 0.28 },
  disgust: { height: 0.96, tilt: -26, bow: -0.12 },
  anger: { height: 1, tilt: 0, bow: 0 },
  anticipation: { height: 1.02, tilt: 22, bow: 0.12 },
};

export function mix(a, b, t) {
  const pa = a.match(/\w\w/g).map((h) => parseInt(h, 16));
  const pb = b.match(/\w\w/g).map((h) => parseInt(h, 16));
  return (
    "#" +
    pa
      .map((v, i) => Math.round(v + (pb[i] - v) * t).toString(16).padStart(2, "0"))
      .join("")
  );
}

/**
 * Build everything needed to draw one plant.
 * m = { first, second, body (0–100), scene, action, outcome }
 */
export function buildPlant(m, opts = {}) {
  const ground = opts.ground ?? 300;
  const cx = opts.cx ?? 160;
  const pose = POSTURE[m.first] ?? POSTURE.trust;
  const H = 168 * pose.height;
  const headScale = pose.scale ?? 1;
  const top = [cx + pose.bow * H, ground - H];
  const ctrl = [cx + pose.bow * H * 0.15, ground - H * 0.55];
  const stemPath = `M${cx} ${ground} Q${fmt(ctrl[0])} ${fmt(ctrl[1])} ${fmt(top[0])} ${fmt(top[1])}`;
  const stem = m.action === "nothing" && !m.outcome ? STEM.none : STEM[m.outcome] ?? STEM.none;

  // petals: arousal sets count and scatter
  const body = clamp(m.body ?? 40, 0, 100);
  const count = 5 + Math.round((body / 100) * 4);
  const jitter = (body / 100) * 0.32;
  const r = rng(count * 31 + FEELINGS.indexOf(m.first) * 7 + 3);
  const L = 58 * headScale;
  const g = PETAL[m.first];
  const hue = HUE[m.first];
  const petals = [];
  for (let i = 0; i < count; i++) {
    const back = i % 2 === 0;
    const a = (i / count) * Math.PI * 2 + (r() - 0.5) * jitter;
    petals.push({
      d: toPath(organ(g, L * (back ? 1 : 0.95) * (1 + (r() - 0.5) * jitter * 0.5), i + 1), 0, 0, a),
      back,
      fill: back ? mix(hue, "#ffffff", 0.08) : hue,
      angle: a,
    });
  }
  petals.sort((p1, p2) => (p1.back === p2.back ? 0 : p1.back ? -1 : 1));

  const inner = [];
  if (m.second && m.second !== m.first) {
    const g2 = PETAL[m.second];
    const n2 = Math.max(5, count - 1);
    for (let i = 0; i < n2; i++) {
      const a = ((i + 0.5) / n2) * Math.PI * 2;
      inner.push({ d: toPath(organ(g2, L * 0.56, 40 + i), 0, 0, a), fill: HUE[m.second] });
    }
  }

  // marks painted on the outer petals
  const marks = [];
  if (g.vein) {
    petals.forEach((p) => {
      const len = L * g.vein;
      marks.push({
        type: "line",
        x2: fmt(Math.sin(p.angle) * len),
        y2: fmt(-Math.cos(p.angle) * len),
      });
    });
  }
  if (g.spots) {
    petals.slice(0, 4).forEach((p, i) => {
      const dist = L * (0.42 + (i % 2) * 0.16);
      marks.push({ type: "dot", cx: fmt(Math.sin(p.angle + 0.08) * dist), cy: fmt(-Math.cos(p.angle + 0.08) * dist) });
    });
  }

  // leaves: two, one each side, shape from the action, colour + angle from the outcome
  const leaves = [];
  if (m.action && m.action !== "nothing") {
    const lg = LEAF[m.action];
    const base = LEAF_BASE[m.outcome] ?? "#8FA27C";
    const fill = mix(base, hue, 0.14);
    const lift = m.outcome === "helped" ? 0.95 : m.outcome === "harder" ? 2.05 : 1.45; // radians from vertical
    const spots = [0.3, 0.46];
    spots.forEach((tt, i) => {
      const side = i === 0 ? -1 : 1;
      const px = cx + (ctrl[0] - cx) * 2 * tt * (1 - tt) + (top[0] - cx) * tt * tt;
      const py = ground + (ctrl[1] - ground) * 2 * tt * (1 - tt) + (top[1] - ground) * tt * tt;
      const rot = side * lift;
      if (lg.pair) {
        [-0.35, 0.35].forEach((off, j) => {
          leaves.push({
            d: toPath(organ({ w: 0.42, p: 0.5, n: 1.8 }, 22, 9 + j), px, py, rot + off),
            fill,
            vein: null,
          });
        });
      } else {
        const len = m.action === "rest" ? 52 : 40;
        const pts = organ({ ...lg, lean: (lg.droop ?? 0) * side }, len, 11 + i);
        leaves.push({
          d: toPath(pts, px, py, rot),
          fill,
          vein: { x1: px, y1: py, x2: fmt(px + Math.sin(rot) * len * 0.85), y2: fmt(py - Math.cos(rot) * len * 0.85) },
        });
      }
    });
  }

  return {
    stemPath,
    stem,
    head: { x: top[0], y: top[1], tilt: pose.tilt },
    petals,
    inner,
    marks,
    cup: Boolean(g.cup),
    folds: Boolean(g.folds),
    leaves,
    coreR: 13 * headScale,
    sway: 0.6 + (body / 100) * 2.4,
    swaySpeed: 6 - (body / 100) * 3.6,
  };
}

/** Core pattern per scene, as small SVG primitives centred on 0,0. */
export function corePattern(scene, R) {
  const out = [];
  switch (scene) {
    case "work":
      out.push({ t: "c", r: R * 0.78 }, { t: "c", r: R * 0.45 });
      break;
    case "social":
      out.push({ t: "c", r: R * 0.42, cx: -R * 0.28 }, { t: "c", r: R * 0.42, cx: R * 0.28 }, { t: "c", r: R * 0.42, cy: -R * 0.3 });
      break;
    case "daily":
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        out.push({ t: "dot", cx: Math.cos(a) * R * 0.62, cy: Math.sin(a) * R * 0.62, r: 1.3 });
      }
      out.push({ t: "dot", cx: 0, cy: 0, r: 2 });
      break;
    case "body":
      out.push({ t: "c", r: R * 0.82, dash: "2 2" }, { t: "c", r: R * 0.55 }, { t: "c", r: R * 0.28, dash: "2 2" });
      break;
    case "own": {
      let d = "";
      for (let i = 0; i <= 40; i++) {
        const a = (i / 40) * Math.PI * 4.2;
        const rr = R * 0.8 * (1 - i / 44);
        d += `${i ? "L" : "M"}${fmt(Math.cos(a) * rr)} ${fmt(Math.sin(a) * rr)}`;
      }
      out.push({ t: "path", d });
      break;
    }
    case "world":
      for (let i = 0; i < 14; i++) {
        const a = (i / 14) * Math.PI * 2;
        out.push({ t: "dot", cx: Math.cos(a) * R * 0.78, cy: Math.sin(a) * R * 0.78, r: 1 });
        if (i % 2 === 0) out.push({ t: "dot", cx: Math.cos(a) * R * 0.5, cy: Math.sin(a) * R * 0.5, r: 0.8 });
      }
      out.push({ t: "dot", cx: 0, cy: 0, r: 1.6 });
      break;
    default:
      break;
  }
  return out;
}

/** v56–57: which "did it help?" question to ask, from the whole moment. */
export function helpQuestion(feelings) {
  const hasP = feelings.some((f) => PLEASANT.includes(f));
  const hasN = feelings.some((f) => PAINFUL.includes(f));
  if (hasP && hasN) return "neutral";
  if (hasP) return "hold";
  if (hasN) return "ease";
  return "neutral"; // surprise alone: falls back to the words, else neutral
}

/** Wilson 95% lower bound (Wilson 1927). */
export function wilsonLower(k, n, z = 1.96) {
  if (!n) return 0;
  const p = k / n;
  const z2 = z * z;
  return (p + z2 / (2 * n) - z * Math.sqrt((p * (1 - p)) / n + z2 / (4 * n * n))) / (1 + z2 / n);
}
