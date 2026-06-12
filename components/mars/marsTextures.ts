// Procedural Mars textures ported 1:1 from reference/scene.js
// All canvas-helper functions kept verbatim; only module system adapted.

export type CraterDef = {
  x: number; y: number; r: number;
  e: number; rot: number;
  h: [number, number, number, number, number, number];
};

function makeNoiseCanvas(w: number, h: number): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d')!;
  const img = ctx.createImageData(w, h);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const v = (Math.random() * 255) | 0;
    d[i] = v; d[i + 1] = v; d[i + 2] = v; d[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

function rgbaStr(p: number[], a: number): string {
  return 'rgba(' + p[0] + ',' + p[1] + ',' + p[2] + ',' + a + ')';
}

function softBlob(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, r: number,
  p: number[], a: number, op: GlobalCompositeOperation
): void {
  ctx.globalCompositeOperation = op;
  ctx.globalAlpha = 1;
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, rgbaStr(p, a));
  g.addColorStop(0.55, rgbaStr(p, a * 0.45));
  g.addColorStop(1, rgbaStr(p, 0));
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

function craterShape(): CraterDef {
  return {
    x: 0, y: 0, r: 0,
    e: 0.62 + Math.random() * 0.36,
    rot: Math.random() * Math.PI,
    h: [
      0.10 + Math.random() * 0.16, Math.random() * 6.28,
      0.06 + Math.random() * 0.11, Math.random() * 6.28,
      0.04 + Math.random() * 0.08, Math.random() * 6.28,
    ],
  };
}

export function genCraters(W: number, H: number): CraterDef[] {
  const list: CraterDef[] = [];
  for (let i = 0; i < 24; i++) {
    const c = craterShape();
    c.x = Math.random() * W;
    c.y = (0.18 + Math.random() * 0.64) * H;
    c.r = 24 + Math.pow(Math.random(), 1.9) * 84;
    list.push(c);
  }
  for (let j = 0; j < 3; j++) {
    const b = craterShape();
    b.x = Math.random() * W;
    b.y = (0.28 + Math.random() * 0.44) * H;
    b.r = 150 + Math.random() * 90;
    list.push(b);
  }
  return list;
}

function craterPath(ctx: CanvasRenderingContext2D, cx: number, cy: number, cc: CraterDef): void {
  const steps = 56;
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const rad = cc.r * (
      1
      + cc.h[0] * Math.sin(3 * a + cc.h[1])
      + cc.h[2] * Math.sin(5 * a + cc.h[3])
      + cc.h[4] * Math.sin(7 * a + cc.h[5])
    );
    const px = Math.cos(a) * rad;
    const py = Math.sin(a) * rad * cc.e;
    const rx = px * Math.cos(cc.rot) - py * Math.sin(cc.rot);
    const ry = px * Math.sin(cc.rot) + py * Math.cos(cc.rot);
    if (i === 0) ctx.moveTo(cx + rx, cy + ry);
    else ctx.lineTo(cx + rx, cy + ry);
  }
  ctx.closePath();
}

function drawDeepCrater(
  ctx: CanvasRenderingContext2D,
  cc: CraterDef,
  dx: number,
  isBump: boolean
): void {
  const cx = cc.x + dx, cy = cc.y, r = cc.r;
  ctx.save();
  ctx.beginPath();
  craterPath(ctx, cx, cy, cc);
  ctx.clip();
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  if (isBump) {
    g.addColorStop(0.0,  'rgba(8,8,8,0.92)');
    g.addColorStop(0.55, 'rgba(28,28,28,0.58)');
    g.addColorStop(0.82, 'rgba(6,6,6,0.82)');
    g.addColorStop(0.95, 'rgba(255,255,255,0.90)');
    g.addColorStop(1.0,  'rgba(128,128,128,0)');
  } else {
    g.addColorStop(0.0,  'rgba(18,9,4,0.30)');
    g.addColorStop(0.6,  'rgba(26,14,7,0.15)');
    g.addColorStop(0.85, 'rgba(7,3,1,0.30)');
    g.addColorStop(0.94, 'rgba(232,182,138,0.12)');
    g.addColorStop(1.0,  'rgba(0,0,0,0)');
  }
  ctx.fillStyle = g;
  ctx.fillRect(cx - r * 1.6, cy - r * 1.6, r * 3.2, r * 3.2);
  ctx.restore();

  // ejecta blanket: raised bump ring outside the crater rim (bump map only)
  if (isBump) {
    const eg = ctx.createRadialGradient(cx, cy, r * 0.88, cx, cy, r * 1.8);
    eg.addColorStop(0.0,  'rgba(210,210,210,0.55)');
    eg.addColorStop(0.25, 'rgba(190,190,190,0.30)');
    eg.addColorStop(0.65, 'rgba(160,160,160,0.12)');
    eg.addColorStop(1.0,  'rgba(128,128,128,0)');
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = eg;
    ctx.fillRect(cx - r * 2.0, cy - r * 2.0, r * 4.0, r * 4.0);
  }
}

function smoothPoles(ctx: CanvasRenderingContext2D, W: number, H: number, isBump: boolean): void {
  const band = H * 0.17;
  const col = isBump ? '128,128,128' : '150,89,54';
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1;
  const gt = ctx.createLinearGradient(0, 0, 0, band);
  gt.addColorStop(0,   'rgba(' + col + ',1)');
  gt.addColorStop(0.5, 'rgba(' + col + ',0.55)');
  gt.addColorStop(1,   'rgba(' + col + ',0)');
  ctx.fillStyle = gt;
  ctx.fillRect(0, 0, W, band);
  const gb = ctx.createLinearGradient(0, H, 0, H - band);
  gb.addColorStop(0,   'rgba(' + col + ',1)');
  gb.addColorStop(0.5, 'rgba(' + col + ',0.55)');
  gb.addColorStop(1,   'rgba(' + col + ',0)');
  ctx.fillStyle = gb;
  ctx.fillRect(0, H - band, W, band);
}

export function starSprite(): HTMLCanvasElement {
  const s = 64;
  const c = document.createElement('canvas');
  c.width = s; c.height = s;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0,    'rgba(255,255,255,1)');
  g.addColorStop(0.16, 'rgba(255,255,255,0.85)');
  g.addColorStop(0.32, 'rgba(255,255,255,0.18)');
  g.addColorStop(0.55, 'rgba(255,255,255,0.04)');
  g.addColorStop(1,    'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  return c;
}

export function buildMarsColor(craters: CraterDef[]): HTMLCanvasElement {
  const W = 4096, H = 2048;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d')!;
  ctx.imageSmoothingEnabled = true;

  ctx.fillStyle = '#9c5c38';
  ctx.fillRect(0, 0, W, H);

  const pal: number[][] = [
    [212, 158, 112], [203, 146, 100], [196, 134, 88],
    [176, 108, 64],  [160, 94, 54],   [144, 82, 48],
    [120, 68, 40],   [102, 56, 33],
    [92, 66, 50],    [80, 58, 46],
  ];
  for (let i = 0; i < 230; i++) {
    const x = Math.random() * W;
    const y = (0.05 + Math.random() * 0.9) * H;
    const r = 120 + Math.pow(Math.random(), 1.7) * 780;
    const p = pal[(Math.random() * pal.length) | 0];
    const a = 0.04 + Math.random() * 0.12;
    const dark = p[0] < 130;
    const op: GlobalCompositeOperation = dark
      ? 'multiply'
      : (p[0] > 195 && Math.random() < 0.55 ? 'screen' : 'source-over');
    softBlob(ctx, x, y, r, p, a, op);
    if (x < r)     softBlob(ctx, x + W, y, r, p, a, op);
    if (x > W - r) softBlob(ctx, x - W, y, r, p, a, op);
  }

  for (let m = 0; m < 9; m++) {
    const mx = Math.random() * W;
    const my = (0.16 + Math.random() * 0.64) * H;
    const mr = 320 + Math.random() * 560;
    softBlob(ctx, mx, my, mr, [76, 56, 44], 0.1 + Math.random() * 0.08, 'multiply');
    if (Math.random() < 0.5)
      softBlob(ctx, Math.random() * W, (0.2 + Math.random() * 0.6) * H, 260 + Math.random() * 380, [216, 168, 122], 0.07, 'screen');
  }

  const featCol = [[72, 52, 40], [84, 60, 46], [64, 46, 36]];
  for (let fe = 0; fe < 7; fe++) {
    const fx = Math.random() * W;
    const fy = (0.16 + Math.random() * 0.62) * H;
    const fr = 220 + Math.random() * 360;
    const lobes = 3 + (Math.random() * 4 | 0);
    for (let lo = 0; lo < lobes; lo++) {
      const ox = fx + (Math.random() - 0.5) * fr * 1.3;
      const oy = fy + (Math.random() - 0.5) * fr * 0.9;
      const orr = fr * (0.4 + Math.random() * 0.6);
      softBlob(ctx, ox, oy, orr, featCol[(Math.random() * featCol.length) | 0], 0.1 + Math.random() * 0.1, 'multiply');
    }
  }

  // dark volcanic plains (Syrtis Major style)
  for (let v = 0; v < 2; v++) {
    const vx = Math.random() * W;
    const vy = (0.25 + Math.random() * 0.50) * H;
    const vr = 500 + Math.random() * 300;
    const va = 0.22 + Math.random() * 0.06;
    softBlob(ctx, vx, vy, vr, [38, 24, 16], va, 'multiply');
    if (vx < vr)     softBlob(ctx, vx + W, vy, vr, [38, 24, 16], va, 'multiply');
    if (vx > W - vr) softBlob(ctx, vx - W, vy, vr, [38, 24, 16], va, 'multiply');
  }

  // rust-orange iron oxide deposits
  for (let ro = 0; ro < 3; ro++) {
    const rx = Math.random() * W;
    const ry = (0.20 + Math.random() * 0.60) * H;
    const rr = 280 + Math.random() * 200;
    const ra = 0.07 + Math.random() * 0.03;
    softBlob(ctx, rx, ry, rr, [214, 88, 32], ra, 'screen');
    if (rx < rr)     softBlob(ctx, rx + W, ry, rr, [214, 88, 32], ra, 'screen');
    if (rx > W - rr) softBlob(ctx, rx - W, ry, rr, [214, 88, 32], ra, 'screen');
  }

  // pale ochre highlands
  for (let oc = 0; oc < 2; oc++) {
    const ox = Math.random() * W;
    const oy = (0.15 + Math.random() * 0.70) * H;
    const orr = 600 + Math.random() * 300;
    const oa = 0.12 + Math.random() * 0.04;
    softBlob(ctx, ox, oy, orr, [208, 172, 118], oa, 'soft-light');
    if (ox < orr)     softBlob(ctx, ox + W, oy, orr, [208, 172, 118], oa, 'soft-light');
    if (ox > W - orr) softBlob(ctx, ox - W, oy, orr, [208, 172, 118], oa, 'soft-light');
  }

  const fine: [number, number, GlobalCompositeOperation][] = [
    [90,   0.20, 'soft-light'],
    [240,  0.16, 'soft-light'],
    [620,  0.12, 'soft-light'],
    [1400, 0.10, 'overlay'],
    [2600, 0.08, 'overlay'],
  ];
  for (const [size, alpha, op] of fine) {
    ctx.globalAlpha = alpha;
    ctx.globalCompositeOperation = op;
    ctx.drawImage(makeNoiseCanvas(size, Math.max(2, size / 2)), 0, 0, W, H);
  }

  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1;
  for (const cc of craters) {
    drawDeepCrater(ctx, cc, 0, false);
    if (cc.x < cc.r)     drawDeepCrater(ctx, cc, W,  false);
    if (cc.x > W - cc.r) drawDeepCrater(ctx, cc, -W, false);
  }

  ctx.globalAlpha = 0.07;
  ctx.globalCompositeOperation = 'overlay';
  ctx.drawImage(makeNoiseCanvas(1600, 800), 0, 0, W, H);
  ctx.globalAlpha = 0.05;
  ctx.drawImage(makeNoiseCanvas(3200, 1600), 0, 0, W, H);

  ctx.globalCompositeOperation = 'soft-light';
  ctx.globalAlpha = 0.16;
  ctx.fillStyle = '#b85a2c';
  ctx.fillRect(0, 0, W, H);

  smoothPoles(ctx, W, H, false);

  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'source-over';
  return c;
}

export function buildMarsBump(craters: CraterDef[]): HTMLCanvasElement {
  const W = 4096, H = 2048;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d')!;
  ctx.imageSmoothingEnabled = true;
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, W, H);

  const layers: [number, number][] = [
    [20, 0.62], [48, 0.52], [120, 0.44], [300, 0.36],
    [760, 0.28], [1700, 0.20], [3400, 0.14],
  ];
  for (const [size, alpha] of layers) {
    ctx.globalAlpha = alpha;
    ctx.globalCompositeOperation = 'overlay';
    ctx.drawImage(makeNoiseCanvas(size, Math.max(2, size / 2)), 0, 0, W, H);
  }

  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1;
  for (const cc of craters) {
    drawDeepCrater(ctx, cc, 0, true);
    if (cc.x < cc.r)     drawDeepCrater(ctx, cc, W,  true);
    if (cc.x > W - cc.r) drawDeepCrater(ctx, cc, -W, true);
  }

  smoothPoles(ctx, W, H, true);
  return c;
}

function drawCraterDisp(
  ctx: CanvasRenderingContext2D,
  cc: CraterDef,
  dx: number
): void {
  const cx = cc.x + dx, cy = cc.y, r = cc.r;

  // Ejecta blanket outside the crater rim (slightly raised, no clip)
  const eg = ctx.createRadialGradient(cx, cy, r * 0.9, cx, cy, r * 1.75);
  eg.addColorStop(0.0, 'rgba(152,152,152,0.70)');
  eg.addColorStop(0.5, 'rgba(142,142,142,0.35)');
  eg.addColorStop(1.0, 'rgba(128,128,128,0)');
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = eg;
  ctx.fillRect(cx - r * 2, cy - r * 2, r * 4, r * 4);

  // Crater interior: steep wall + flat floor (clipped to crater shape)
  ctx.save();
  ctx.beginPath();
  craterPath(ctx, cx, cy, cc);
  ctx.clip();
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  g.addColorStop(0.00, 'rgba(80,80,80,0.95)');    // floor (moderately depressed)
  g.addColorStop(0.60, 'rgba(45,45,45,0.98)');    // steep inner wall (deepest)
  g.addColorStop(0.88, 'rgba(225,225,225,0.95)'); // raised rim
  g.addColorStop(1.00, 'rgba(128,128,128,0)');
  ctx.fillStyle = g;
  ctx.fillRect(cx - r * 1.6, cy - r * 1.6, r * 3.2, r * 3.2);
  ctx.restore();
}

export function buildMarsDisplacement(craters: CraterDef[]): HTMLCanvasElement {
  const W = 4096, H = 2048;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d')!;

  ctx.fillStyle = '#808080'; // neutral gray = no displacement
  ctx.fillRect(0, 0, W, H);

  // Multi-scale terrain noise — creates hills, plains, rocky micro-surface
  const terrainLayers: [number, number][] = [
    [50,   0.40],
    [160,  0.34],
    [500,  0.28],
    [1600, 0.20],
    [4000, 0.13],
  ];
  for (const [size, alpha] of terrainLayers) {
    ctx.globalAlpha = alpha;
    ctx.globalCompositeOperation = 'overlay';
    ctx.drawImage(makeNoiseCanvas(size, Math.max(2, size / 2)), 0, 0, W, H);
  }
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'source-over';

  // Neutralise poles — terrain noise converges to a point at the poles of a
  // sphere, creating sharp spikes. Push displacement back to 128 (flat) over
  // the top and bottom 28% of the texture so the caps stay smooth.
  const poleBand = H * 0.28;
  const makePoleFade = (y0: number, y1: number) => {
    const g = ctx.createLinearGradient(0, y0, 0, y1);
    g.addColorStop(0,    'rgba(128,128,128,1)');
    g.addColorStop(0.40, 'rgba(128,128,128,0.80)');
    g.addColorStop(0.75, 'rgba(128,128,128,0.30)');
    g.addColorStop(1,    'rgba(128,128,128,0)');
    return g;
  };
  ctx.fillStyle = makePoleFade(0, poleBand);
  ctx.fillRect(0, 0, W, poleBand);
  ctx.fillStyle = makePoleFade(H, H - poleBand);
  ctx.fillRect(0, H - poleBand, W, poleBand);

  for (const cc of craters) {
    drawCraterDisp(ctx, cc, 0);
    if (cc.x < cc.r * 2)     drawCraterDisp(ctx, cc, W);
    if (cc.x > W - cc.r * 2) drawCraterDisp(ctx, cc, -W);
  }

  smoothPoles(ctx, W, H, true);
  return c;
}
