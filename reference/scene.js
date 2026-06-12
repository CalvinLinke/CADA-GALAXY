/* CADA Galaxy — 3D Mars scene (Three.js r128)
   Procedural high-res Mars texture + bump map, atmosphere glow, starfield.
   Exposes window.CADAScene { init, setScrollProgress } */
(function () {
  'use strict';

  // ---------- small helpers ----------
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function easeInOut(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

  function makeNoiseCanvas(w, h) {
    var c = document.createElement('canvas');
    c.width = w; c.height = h;
    var ctx = c.getContext('2d');
    var img = ctx.createImageData(w, h);
    var d = img.data;
    for (var i = 0; i < d.length; i += 4) {
      var v = (Math.random() * 255) | 0;
      d[i] = v; d[i + 1] = v; d[i + 2] = v; d[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    return c;
  }

  // ---------- procedural Mars color texture ----------
  function rgbaStr(p, a) { return 'rgba(' + p[0] + ',' + p[1] + ',' + p[2] + ',' + a + ')'; }

  function softBlob(ctx, x, y, r, p, a, op) {
    ctx.globalCompositeOperation = op;
    ctx.globalAlpha = 1;
    var g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, rgbaStr(p, a));
    g.addColorStop(0.55, rgbaStr(p, a * 0.45));
    g.addColorStop(1, rgbaStr(p, 0));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  function buildMarsColor() {
    var W = 4096, H = 2048;
    var c = document.createElement('canvas');
    c.width = W; c.height = H;
    var ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = true;

    // base ochre ground
    ctx.fillStyle = '#9c5c38';
    ctx.fillRect(0, 0, W, H);

    // organic albedo regions — many overlapping soft colour clouds (the real Mars look)
    var pal = [
      [212, 158, 112], [203, 146, 100], [196, 134, 88],   // bright dust / highlands
      [176, 108, 64], [160, 94, 54], [144, 82, 48],        // mid ochre
      [120, 68, 40], [102, 56, 33],                        // dark terrain
      [92, 66, 50], [80, 58, 46]                           // desaturated maria
    ];
    for (var i = 0; i < 230; i++) {
      var x = Math.random() * W;
      var y = (0.05 + Math.random() * 0.9) * H;
      var r = 120 + Math.pow(Math.random(), 1.7) * 780;
      var p = pal[(Math.random() * pal.length) | 0];
      var a = 0.04 + Math.random() * 0.12;
      var dark = p[0] < 130;
      var op = dark ? 'multiply' : (p[0] > 195 && Math.random() < 0.55 ? 'screen' : 'source-over');
      softBlob(ctx, x, y, r, p, a, op);
      if (x < r) softBlob(ctx, x + W, y, r, p, a, op);
      if (x > W - r) softBlob(ctx, x - W, y, r, p, a, op);
    }

    // a few large dark maria (Syrtis-like) — desaturated, very soft
    for (var m = 0; m < 9; m++) {
      var mx = Math.random() * W;
      var my = (0.16 + Math.random() * 0.64) * H;
      var mr = 320 + Math.random() * 560;
      softBlob(ctx, mx, my, mr, [76, 56, 44], 0.1 + Math.random() * 0.08, 'multiply');
      // bright dust streaks
      if (Math.random() < 0.5)
        softBlob(ctx, Math.random() * W, (0.2 + Math.random() * 0.6) * H, 260 + Math.random() * 380, [216, 168, 122], 0.07, 'screen');
    }

    // defined irregular albedo features (clustered blobs => organic, non-blurry continents)
    var featCol = [[72, 52, 40], [84, 60, 46], [64, 46, 36]];
    for (var fe = 0; fe < 7; fe++) {
      var fx = Math.random() * W;
      var fy = (0.16 + Math.random() * 0.62) * H;
      var fr = 220 + Math.random() * 360;
      var lobes = 3 + (Math.random() * 4 | 0);
      for (var lo = 0; lo < lobes; lo++) {
        var ox = fx + (Math.random() - 0.5) * fr * 1.3;
        var oy = fy + (Math.random() - 0.5) * fr * 0.9;
        var orr = fr * (0.4 + Math.random() * 0.6);
        softBlob(ctx, ox, oy, orr, featCol[(Math.random() * featCol.length) | 0], 0.1 + Math.random() * 0.1, 'multiply');
      }
    }

    // multi-scale fractal micro-texture (keeps it from looking flat / plastic)
    var fine = [[90, 0.2, 'soft-light'], [240, 0.16, 'soft-light'], [620, 0.12, 'soft-light'], [1400, 0.1, 'overlay'], [2600, 0.08, 'overlay']];
    for (var f = 0; f < fine.length; f++) {
      ctx.globalAlpha = fine[f][1];
      ctx.globalCompositeOperation = fine[f][2];
      ctx.drawImage(makeNoiseCanvas(fine[f][0], Math.max(2, fine[f][0] / 2)), 0, 0, W, H);
    }

    // few but striking, deep craters (positions shared with the bump map)
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    marsCraters = genCraters(W, H);
    for (var k = 0; k < marsCraters.length; k++) {
      var cc = marsCraters[k];
      drawDeepCrater(ctx, cc, 0, false);
      if (cc.x < cc.r) drawDeepCrater(ctx, cc, W, false);
      if (cc.x > W - cc.r) drawDeepCrater(ctx, cc, -W, false);
    }

    // photographic grain (two scales)
    ctx.globalAlpha = 0.07;
    ctx.globalCompositeOperation = 'overlay';
    ctx.drawImage(makeNoiseCanvas(1600, 800), 0, 0, W, H);
    ctx.globalAlpha = 0.05;
    ctx.drawImage(makeNoiseCanvas(3200, 1600), 0, 0, W, H);

    // gentle warm unify
    ctx.globalCompositeOperation = 'soft-light';
    ctx.globalAlpha = 0.16;
    ctx.fillStyle = '#b85a2c';
    ctx.fillRect(0, 0, W, H);

    // homogenise poles LAST (hide equirect convergence) instead of ice caps
    smoothPoles(ctx, W, H, false);

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    return c;
  }

  function drawCrater(ctx, x, y, r, isBump) {
    var g = ctx.createRadialGradient(x, y, 0, x, y, r);
    if (isBump) {
      g.addColorStop(0.0, 'rgba(96,96,96,0.30)');
      g.addColorStop(0.66, 'rgba(112,112,112,0.16)');
      g.addColorStop(0.85, 'rgba(74,74,74,0.26)');
      g.addColorStop(0.95, 'rgba(176,176,176,0.26)');
      g.addColorStop(1.0, 'rgba(128,128,128,0)');
    } else {
      g.addColorStop(0.0, 'rgba(30,15,8,0.10)');
      g.addColorStop(0.7, 'rgba(20,10,5,0.08)');
      g.addColorStop(0.9, 'rgba(10,5,2,0.13)');
      g.addColorStop(1.0, 'rgba(0,0,0,0)');
    }
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawPolarCap(ctx, W, H, top) {
    var baseH = H * (0.018 + Math.random() * 0.012);
    ctx.save();
    ctx.beginPath();
    var step = W / 140;
    ctx.moveTo(0, top ? 0 : H);
    for (var x = 0; x <= W; x += step) {
      var edge = baseH * (0.55 + 0.45 * Math.abs(Math.sin(x * 0.018) + Math.sin(x * 0.005 + 1.3)) / 2)
        + (Math.random() - 0.5) * baseH * 0.4;
      var yy = top ? edge : H - edge;
      ctx.lineTo(x, yy);
    }
    ctx.lineTo(W, top ? 0 : H);
    ctx.closePath();
    var grad = ctx.createLinearGradient(0, top ? 0 : H, 0, top ? baseH * 1.4 : H - baseH * 1.4);
    grad.addColorStop(0, 'rgba(206,196,186,0.30)');
    grad.addColorStop(0.55, 'rgba(190,178,168,0.15)');
    grad.addColorStop(1, 'rgba(180,165,158,0)');
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();
  }

  // ---------- procedural Mars bump (height) texture ----------
  function buildMarsBump() {
    var W = 4096, H = 2048;
    var c = document.createElement('canvas');
    c.width = W; c.height = H;
    var ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, W, H);
    // gentle multi-scale relief
    var layers = [[20, 0.32], [48, 0.26], [120, 0.2], [300, 0.16], [760, 0.12], [1700, 0.09], [3400, 0.06]];
    for (var i = 0; i < layers.length; i++) {
      ctx.globalAlpha = layers[i][1];
      ctx.globalCompositeOperation = 'overlay';
      ctx.drawImage(makeNoiseCanvas(layers[i][0], Math.max(2, layers[i][0] / 2)), 0, 0, W, H);
    }
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    var cl = marsCraters || genCraters(W, H);
    for (var k = 0; k < cl.length; k++) {
      var cc = cl[k];
      drawDeepCrater(ctx, cc, 0, true);
      if (cc.x < cc.r) drawDeepCrater(ctx, cc, W, true);
      if (cc.x > W - cc.r) drawDeepCrater(ctx, cc, -W, true);
    }
    smoothPoles(ctx, W, H, true);
    return c;
  }

  function craterShape() {
    return {
      e: 0.62 + Math.random() * 0.36,
      rot: Math.random() * Math.PI,
      h: [0.10 + Math.random() * 0.16, Math.random() * 6.28,
          0.06 + Math.random() * 0.11, Math.random() * 6.28,
          0.04 + Math.random() * 0.08, Math.random() * 6.28]
    };
  }
  function genCraters(W, H) {
    var list = [];
    for (var i = 0; i < 24; i++) {
      var c = craterShape();
      c.x = Math.random() * W; c.y = (0.18 + Math.random() * 0.64) * H;
      c.r = 24 + Math.pow(Math.random(), 1.9) * 84;
      list.push(c);
    }
    // a few large, prominent impact basins
    for (var j = 0; j < 3; j++) {
      var b = craterShape();
      b.x = Math.random() * W; b.y = (0.28 + Math.random() * 0.44) * H;
      b.r = 150 + Math.random() * 90;
      list.push(b);
    }
    return list;
  }

  function craterPath(ctx, cx, cy, cc) {
    var steps = 56;
    for (var i = 0; i <= steps; i++) {
      var a = i / steps * Math.PI * 2;
      var rad = cc.r * (1 + cc.h[0] * Math.sin(3 * a + cc.h[1]) + cc.h[2] * Math.sin(5 * a + cc.h[3]) + cc.h[4] * Math.sin(7 * a + cc.h[5]));
      var px = Math.cos(a) * rad, py = Math.sin(a) * rad * cc.e;
      var rx = px * Math.cos(cc.rot) - py * Math.sin(cc.rot);
      var ry = px * Math.sin(cc.rot) + py * Math.cos(cc.rot);
      if (i === 0) ctx.moveTo(cx + rx, cy + ry); else ctx.lineTo(cx + rx, cy + ry);
    }
    ctx.closePath();
  }

  // irregular (non-round) crater, shape shared between colour & bump maps
  function drawDeepCrater(ctx, cc, dx, isBump) {
    var cx = cc.x + dx, cy = cc.y, r = cc.r;
    ctx.save();
    ctx.beginPath();
    craterPath(ctx, cx, cy, cc);
    ctx.clip();
    var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    if (isBump) {
      g.addColorStop(0.0, 'rgba(58,58,58,0.62)');
      g.addColorStop(0.55, 'rgba(82,82,82,0.34)');
      g.addColorStop(0.82, 'rgba(38,38,38,0.55)');
      g.addColorStop(0.95, 'rgba(214,214,214,0.55)');
      g.addColorStop(1.0, 'rgba(128,128,128,0)');
    } else {
      g.addColorStop(0.0, 'rgba(18,9,4,0.30)');
      g.addColorStop(0.6, 'rgba(26,14,7,0.15)');
      g.addColorStop(0.85, 'rgba(7,3,1,0.30)');
      g.addColorStop(0.94, 'rgba(232,182,138,0.12)');
      g.addColorStop(1.0, 'rgba(0,0,0,0)');
    }
    ctx.fillStyle = g;
    ctx.fillRect(cx - r * 1.6, cy - r * 1.6, r * 3.2, r * 3.2);
    ctx.restore();
  }

  // flatten texture + relief toward the poles to kill equirect convergence streaks
  function smoothPoles(ctx, W, H, isBump) {
    var band = H * 0.17;
    var col = isBump ? '128,128,128' : '150,89,54';
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    var gt = ctx.createLinearGradient(0, 0, 0, band);
    gt.addColorStop(0, 'rgba(' + col + ',1)');
    gt.addColorStop(0.5, 'rgba(' + col + ',0.55)');
    gt.addColorStop(1, 'rgba(' + col + ',0)');
    ctx.fillStyle = gt;
    ctx.fillRect(0, 0, W, band);
    var gb = ctx.createLinearGradient(0, H, 0, H - band);
    gb.addColorStop(0, 'rgba(' + col + ',1)');
    gb.addColorStop(0.5, 'rgba(' + col + ',0.55)');
    gb.addColorStop(1, 'rgba(' + col + ',0)');
    ctx.fillStyle = gb;
    ctx.fillRect(0, H - band, W, band);
  }

  function starSprite() {
    var s = 64, c = document.createElement('canvas');
    c.width = s; c.height = s;
    var ctx = c.getContext('2d');
    var g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.16, 'rgba(255,255,255,0.85)');
    g.addColorStop(0.32, 'rgba(255,255,255,0.18)');
    g.addColorStop(0.55, 'rgba(255,255,255,0.04)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
    return c;
  }

  function makeAtmo(freq, strength, exp, base) {
    return new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(0xff5a2f) },
        uCore: { value: new THREE.Color(0xffd0a8) },
        uTime: { value: 0 }, uFade: { value: 1 },
        uFreq: { value: freq }, uStrength: { value: strength },
        uExp: { value: exp }, uBase: { value: base }
      },
      vertexShader: [
        'varying vec3 vN; varying vec3 vV; varying vec3 vP;',
        'void main(){',
        '  vN = normalize(normalMatrix * normal);',
        '  vec4 mv = modelViewMatrix * vec4(position,1.0);',
        '  vV = normalize(-mv.xyz);',
        '  vP = position;',
        '  gl_Position = projectionMatrix * mv;',
        '}'
      ].join('\n'),
      fragmentShader: [
        'varying vec3 vN; varying vec3 vV; varying vec3 vP;',
        'uniform vec3 uColor; uniform vec3 uCore;',
        'uniform float uTime; uniform float uFade; uniform float uFreq; uniform float uStrength; uniform float uExp; uniform float uBase;',
        'float hash(vec3 p){ p=fract(p*0.3183099+0.1); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }',
        'float noise(vec3 x){ vec3 i=floor(x); vec3 f=fract(x); f=f*f*(3.0-2.0*f);',
        '  return mix(mix(mix(hash(i+vec3(0,0,0)),hash(i+vec3(1,0,0)),f.x),',
        '                 mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),',
        '             mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),',
        '                 mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z); }',
        'float fbm(vec3 p){ float v=0.0,a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p=p*2.02; a*=0.5; } return v; }',
        'void main(){',
        '  float fres = pow(clamp(1.0 - abs(dot(vN, vV)), 0.0, 1.0), uExp);',
        '  vec3 p = vP * uFreq;',
        '  float t = uTime * 0.25;',
        '  vec3 drift = vec3(t*0.6, t*0.35, -t*0.5);',
        '  vec3 q = vec3(fbm(p + drift), fbm(p + vec3(3.1,1.7,4.2) + drift), fbm(p + vec3(1.4,5.3,2.6) - drift));',
        '  vec3 r = vec3(fbm(p + 2.0*q + drift*1.3), fbm(p + 2.0*q + vec3(2.8,0.9,3.4)), fbm(p + 2.0*q + vec3(4.1,2.2,1.1)));',
        '  float n = fbm(p + 3.0*r);',
        '  float clouds = smoothstep(0.42, 0.95, n);',
        '  float w = uBase + (1.0 - uBase) * fres;',
        '  float a = clouds * w * uStrength * uFade;',
        '  vec3 col = mix(uColor, uCore, clamp(n*1.1, 0.0, 1.0));',
        '  gl_FragColor = vec4(col, a);',
        '}'
      ].join('\n'),
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    });
  }

  // ---------- scene ----------
  var THREE = window.THREE;
  var renderer, scene, camera, planet, glow, stars, starField;
  var atmoMats = [];
  var marsCraters = null;
  var clock = 0;
  var container, raf = null, visible = true;
  var autoSpin = 0;
  var lastT = 0;
  var prog = 0, progTarget = 0;
  var mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  var BASE = { x0: 1.28, x1: 0.02, y0: -0.04, y1: 0.02, s0: 1.12, s1: 1.72 };

  function init(id) {
    THREE = window.THREE;
    container = document.getElementById(id);
    if (!container || !THREE) return;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 200);
    camera.position.set(0, 0, 3.25);

    // textures
    var maxAniso = renderer.capabilities.getMaxAnisotropy();
    var colorTex = new THREE.CanvasTexture(buildMarsColor());
    colorTex.encoding = THREE.sRGBEncoding;
    colorTex.anisotropy = maxAniso;
    colorTex.wrapS = THREE.RepeatWrapping;
    var bumpTex = new THREE.CanvasTexture(buildMarsBump());
    bumpTex.anisotropy = maxAniso;
    bumpTex.wrapS = THREE.RepeatWrapping;

    // planet
    var geo = new THREE.SphereGeometry(1, 128, 128);
    var mat = new THREE.MeshStandardMaterial({
      map: colorTex,
      bumpMap: bumpTex,
      bumpScale: 0.03,
      roughness: 0.96,
      metalness: 0.0
    });
    planet = new THREE.Mesh(geo, mat);
    planet.rotation.z = 0.42; // axial tilt
    planet.rotation.x = 0.12;

    var pivot = new THREE.Group();
    pivot.add(planet);
    scene.add(pivot);
    window.__marsPivot = pivot;

    // (atmosphere glow removed — no coloured rim)

    // warm atmospheric haze: thin glowing rim (behind) + soft veil (front),
    // drifts slowly and fades out as you scroll in.
    // (atmospheric nebula removed)
    atmoMats = [];

    // lighting — key from right (matches reference), faint cool fill from left/back
    var key = new THREE.DirectionalLight(0xfff1e4, 2.5);
    key.position.set(4.5, 1.4, 3.2);
    scene.add(key);
    var fill = new THREE.DirectionalLight(0x5878a8, 0.32);
    fill.position.set(-4, -1.5, -2);
    scene.add(fill);
    scene.add(new THREE.AmbientLight(0x20242e, 0.3));

    // starfield
    buildStars();

    // events
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });

    // pause when hero not in view
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (e) {
        visible = e[0].isIntersecting;
        if (visible) start(); else stop();
      }, { threshold: 0 });
      io.observe(container);
    }

    applyProgress(0);
    start();
  }

  function buildStars() {
    var N = 3200;
    var pos = new Float32Array(N * 3);
    var col = new Float32Array(N * 3);
    var siz = new Float32Array(N);
    var palette = [
      [1, 1, 1], [0.78, 0.84, 1], [1, 0.93, 0.84], [0.88, 0.93, 1], [1, 0.86, 0.72], [0.95, 0.97, 1]
    ];
    for (var i = 0; i < N; i++) {
      var r = 30 + Math.random() * 70;
      var th = Math.random() * Math.PI * 2;
      var ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.cos(ph);
      pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
      var p = palette[(Math.random() * palette.length) | 0];
      // realistic night sky: mostly dim stars, very few bright ones
      var mag = Math.pow(Math.random(), 2.4);
      var b = 0.22 + mag * 0.78;
      col[i * 3] = p[0] * b; col[i * 3 + 1] = p[1] * b; col[i * 3 + 2] = p[2] * b;
      siz[i] = 0.32 + mag * (Math.random() < 0.04 ? 1.7 : 0.6);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    g.setAttribute('aSize', new THREE.BufferAttribute(siz, 1));
    var tex = new THREE.CanvasTexture(starSprite());
    var m = new THREE.PointsMaterial({
      size: 0.42, map: tex, vertexColors: true, transparent: true,
      depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true
    });
    starField = new THREE.Points(g, m);
    scene.add(starField);
  }

  function onPointer(e) {
    mouse.tx = (e.clientX / window.innerWidth - 0.5);
    mouse.ty = (e.clientY / window.innerHeight - 0.5);
  }

  function onResize() {
    if (!renderer || !container) return;
    var w = container.clientWidth, h = container.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    applyProgress(prog);
  }

  function setScrollProgress(p) { progTarget = clamp(p, 0, 1); }

  function applyProgress(p) {
    var e = easeInOut(p);
    var pivot = window.__marsPivot;
    if (!pivot) return;
    // narrow screens: pull planet a touch smaller / lower
    var aspect = container ? container.clientWidth / container.clientHeight : 1.6;
    var narrow = clamp((1.2 - aspect) , 0, 0.6);
    var s = lerp(BASE.s0, BASE.s1, e) * (1 - narrow * 0.32);
    pivot.position.x = lerp(BASE.x0, BASE.x1, e) + narrow * 0.15;
    pivot.position.y = lerp(BASE.y0, BASE.y1, e) - narrow * 0.55;
    pivot.scale.setScalar(s);
  }

  function render(now) {
    raf = requestAnimationFrame(render);
    // delta time in seconds, clamped so a tab-switch / hitch can't make it jump
    if (!lastT) lastT = now || performance.now();
    var t = now || performance.now();
    var dt = Math.min(0.05, Math.max(0, (t - lastT) / 1000));
    lastT = t;

    // frame-rate independent smoothing (exponential approach)
    prog += (progTarget - prog) * (1 - Math.exp(-6 * dt));
    applyProgress(prog);

    autoSpin += 0.1 * dt;                 // rad/sec — steady rotation
    planet.rotation.y = autoSpin + prog * Math.PI * 0.9;

    clock += 0.72 * dt;
    var ft = clamp(1 - prog / 0.6, 0, 1);
    ft = ft * ft * (3 - 2 * ft);
    for (var ai = 0; ai < atmoMats.length; ai++) {
      atmoMats[ai].uniforms.uTime.value = clock;
      atmoMats[ai].uniforms.uFade.value = ft;
    }
    if (starField) starField.rotation.y += 0.011 * dt;
    // subtle mouse parallax on camera
    var mk = 1 - Math.exp(-3 * dt);
    mouse.x += (mouse.tx - mouse.x) * mk;
    mouse.y += (mouse.ty - mouse.y) * mk;
    camera.position.x = mouse.x * 0.18;
    camera.position.y = -mouse.y * 0.12;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }

  function start() { if (!raf && renderer) { lastT = 0; raf = requestAnimationFrame(render); } }
  function stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } }

  window.CADAScene = {
    init: init, setScrollProgress: setScrollProgress,
    _debugRender: function (p, t) { prog = progTarget = p; if (t !== undefined) clock = t; applyProgress(p); planet.rotation.y = p * Math.PI * 0.9; var ft = clamp(1 - p / 0.6, 0, 1); ft = ft * ft * (3 - 2 * ft); for (var i = 0; i < atmoMats.length; i++) { atmoMats[i].uniforms.uTime.value = clock; atmoMats[i].uniforms.uFade.value = ft; } renderer.render(scene, camera); }
  };
})();
