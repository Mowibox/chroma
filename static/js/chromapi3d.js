// Chromapi in 3D on the site, on every <div data-chromapi3d="mode">:
//   cartoon the cartoon robot: breathes, leans toward the pointer (feet kept on
//           the ground by IK), plays an emote of the chromapi repo when clicked
//   cad     the robot turning (drag to turn it yourself)
//   explode its parts taken apart as the view scrolls to the middle, labelled
//   pcb     the motherboard turning, all the way round
// Models: static/models (scripts/export-chromapi-glb.mjs), meshopt-compressed.
// The cartoon look, the greeting wave and the callouts come from
// chromapi-presentation-video; the emotes from chromapi (locomotion/emotes.py,
// examples/dance.py).
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const MODELS = new URL('../models/', import.meta.url);
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
const dark = () => document.documentElement.dataset.bsTheme === 'dark';
const fr = document.documentElement.lang.startsWith('fr');
const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const ease = k => 0.5 - 0.5 * Math.cos(Math.PI * clamp(k, 0, 1));
const _v = new THREE.Vector3(), _w = new THREE.Vector3(), _a = new THREE.Vector3(), _q = new THREE.Quaternion();

// Normals creased at 30° (the case's edges sharp, its curves smooth) from the
// welded mesh the GLB holds (it has no normals: they would quadruple it). Each
// corner gets the sum of its vertex's faces within 30° of its own; the corners
// of a vertex with the same normal share one. Run in a worker (a few hundred
// ms for the robot): the model is drawn flat meanwhile.
function crease(P, idx, cos = Math.cos(Math.PI / 6)) {
  const nv = P.length / 3, nf = idx.length / 3, nc = idx.length;
  // Each face's normal, area-weighted (F) and unit (U).
  const F = new Float32Array(nf * 3), U = new Float32Array(nf * 3);
  for (let f = 0; f < nf; f++) {
    const a = 3 * idx[3 * f], b = 3 * idx[3 * f + 1], c = 3 * idx[3 * f + 2];
    const ux = P[b] - P[a], uy = P[b + 1] - P[a + 1], uz = P[b + 2] - P[a + 2];
    const vx = P[c] - P[a], vy = P[c + 1] - P[a + 1], vz = P[c + 2] - P[a + 2];
    const x = uy * vz - uz * vy, y = uz * vx - ux * vz, z = ux * vy - uy * vx, l = Math.hypot(x, y, z) || 1;
    (F[3 * f] = x), (F[3 * f + 1] = y), (F[3 * f + 2] = z);
    (U[3 * f] = x / l), (U[3 * f + 1] = y / l), (U[3 * f + 2] = z / l);
  }
  // The corners around each vertex.
  const start = new Uint32Array(nv + 1);
  for (let i = 0; i < nc; i++) start[idx[i] + 1]++;
  for (let v = 0; v < nv; v++) start[v + 1] += start[v];
  const fill = start.slice(0, nv), around = new Uint32Array(nc);
  for (let i = 0; i < nc; i++) around[fill[idx[i]]++] = i;
  // The new vertices; those of an old vertex chained from head[v] through next.
  const outP = new Float32Array(nc * 3), outN = new Float32Array(nc * 3), outI = new Uint32Array(nc);
  const head = new Int32Array(nv).fill(-1), next = new Int32Array(nc);
  let n = 0;
  for (let v = 0; v < nv; v++)
    for (let k = start[v]; k < start[v + 1]; k++) {
      const i = around[k], f = 3 * ((i / 3) | 0);
      // A corner of this vertex on a parallel face (a flat fan's): its vertex.
      let q = start[v];
      for (; q < k; q++) {
        const h = 3 * ((around[q] / 3) | 0);
        if (U[f] * U[h] + U[f + 1] * U[h + 1] + U[f + 2] * U[h + 2] > 0.9999) break;
      }
      if (q < k) {
        outI[i] = outI[around[q]];
        continue;
      }
      let x = 0, y = 0, z = 0;
      for (let m = start[v]; m < start[v + 1]; m++) {
        const h = 3 * ((around[m] / 3) | 0);
        if (U[f] * U[h] + U[f + 1] * U[h + 1] + U[f + 2] * U[h + 2] >= cos) (x += F[h]), (y += F[h + 1]), (z += F[h + 2]);
      }
      const l = Math.hypot(x, y, z) || 1;
      (x /= l), (y /= l), (z /= l);
      let j = head[v];
      while (j >= 0 && outN[3 * j] * x + outN[3 * j + 1] * y + outN[3 * j + 2] * z <= 0.9999) j = next[j];
      if (j < 0) {
        j = n++;
        (next[j] = head[v]), (head[v] = j);
        (outP[3 * j] = P[3 * v]), (outP[3 * j + 1] = P[3 * v + 1]), (outP[3 * j + 2] = P[3 * v + 2]);
        (outN[3 * j] = x), (outN[3 * j + 1] = y), (outN[3 * j + 2] = z);
      }
      outI[i] = j;
    }
  return { P: outP.slice(0, 3 * n), N: outN.slice(0, 3 * n), I: outI };
}

const worker = new Worker(URL.createObjectURL(new Blob([`${crease}\nonmessage = ({ data: [id, P, I] }) => { const r = crease(P, I); postMessage([id, r], [r.P.buffer, r.N.buffer, r.I.buffer]); };`], { type: 'text/javascript' })));
const pending = new Map();
worker.onmessage = ({ data: [id, r] }) => (pending.get(id)(r), pending.delete(id));
function creased(g) {
  const pos = g.attributes.position, P = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count; i++) (P[3 * i] = pos.getX(i)), (P[3 * i + 1] = pos.getY(i)), (P[3 * i + 2] = pos.getZ(i));
  const id = pending.size + Math.random();
  worker.postMessage([id, P, Uint32Array.from(g.index.array)], [P.buffer]);
  return new Promise(resolve => pending.set(id, resolve)).then(({ P, N, I }) => {
    const r = new THREE.BufferGeometry();
    r.setAttribute('position', new THREE.BufferAttribute(P, 3));
    r.setAttribute('normal', new THREE.BufferAttribute(N, 3));
    r.setIndex(new THREE.BufferAttribute(I, 1));
    return Object.assign(r, { welded: g });
  });
}

// A model: drawn at once (flat), smooth once its normals are made (the welded
// mesh kept for the cartoon outline); the robot standing (POSES.stand), not in
// the URDF's zero pose (legs flat out).
const loads = {};
const load = file => (loads[file] ??= loader.loadAsync(new URL(file, MODELS).href).then(({ scene: model }) => {
  const users = new Map();
  model.traverse(o => {
    if (o.userData.axis) o.quaternion.setFromAxisAngle(new THREE.Vector3(...o.userData.axis), o.userData.stand);
    if (o.isMesh && !o.geometry.attributes.normal) users.set(o.geometry, [...(users.get(o.geometry) ?? []), o]);
  });
  // All at once: one change of look, not a flicker part by part.
  Promise.all([...users.keys()].map(creased)).then(gs => {
    const mats = new Set();
    [...users.values()].forEach((ms, i) => (roundOf(gs[i]), ms.forEach(o => ((o.geometry = gs[i]), mats.add(o.material)))));
    for (const m of mats) (m.flatShading = false), (m.needsUpdate = true);
  });
  return model;
}));

// ---- stage: renderer, light, camera, a loop running only while on screen ----

function stage(el, { realistic }) {
  const canvas = document.createElement('canvas');
  el.append(canvas);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, stencil: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = THREE.NeutralToneMapping;
  const scene = new THREE.Scene();
  scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = realistic ? 0.9 : 0.6;
  const key = new THREE.DirectionalLight(0xffffff, realistic ? 1.6 : 2.2);
  scene.add(key, key.target);
  const camera = new THREE.PerspectiveCamera(28, canvas.clientWidth / canvas.clientHeight || 1.6, 0.005, 20);
  const s = { el, canvas, renderer, scene, camera, key, tick: () => {}, visible: false };
  if (realistic) {
    // Reachy Mini's look: studio light and a soft contact shadow on an unseen floor.
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.radius = 6;
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10).rotateX(-Math.PI / 2), new THREE.ShadowMaterial({ opacity: 0.22 }));
    floor.receiveShadow = true;
    scene.add(floor);
  }
  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(([e]) => (s.visible = e.isIntersecting)).observe(canvas);
  let last = 0;
  renderer.setAnimationLoop(t => {
    if (!s.visible) return (last = 0);
    const dt = last ? Math.min((t - last) / 1000, 0.1) : 0;
    last = t;
    s.tick(t / 1000, dt);
    renderer.render(scene, camera);
  });
  return s;
}

// The model on the floor (y = 0), centred; the camera looking at it from
// `dir`, as close as `box` (default: the model's) allows inside padX, padY of
// the frame (NDC); light and shadow sized to it.
function frame(s, model, dir, { box = new THREE.Box3().setFromObject(model), padX = 0.9, padY = 0.85 } = {}) {
  const c = box.getCenter(new THREE.Vector3());
  model.position.x -= c.x;
  model.position.z -= c.z;
  model.position.y -= box.min.y;
  box.translate(_v.set(-c.x, -box.min.y, -c.z));
  const target = box.getCenter(new THREE.Vector3());
  const radius = box.getSize(_v).length() / 2;
  const corners = [0, 1, 2, 3, 4, 5, 6, 7].map(i => new THREE.Vector3(i & 1 ? box.max.x : box.min.x, i & 2 ? box.max.y : box.min.y, i & 4 ? box.max.z : box.min.z));
  dir = dir.clone().normalize();
  let d = radius * 3;
  // Perspective: the extent on screen goes about as 1 / distance.
  for (let i = 0; i < 6; i++) {
    s.camera.position.copy(target).addScaledVector(dir, d);
    s.camera.lookAt(target);
    s.camera.updateMatrixWorld();
    let r = 0;
    for (const p of corners) {
      _v.copy(p).project(s.camera);
      r = Math.max(r, Math.abs(_v.x) / padX, Math.abs(_v.y) / padY);
    }
    d *= r;
  }
  s.key.position.set(0.6, 1.6, 0.9).multiplyScalar(radius * 3);
  s.key.target.position.copy(target);
  const sc = s.key.shadow.camera;
  Object.assign(sc, { left: -radius * 2, right: radius * 2, top: radius * 2, bottom: -radius * 2, near: 0.001, far: radius * 8 });
  sc.updateProjectionMatrix();
  model.traverse(o => o.isMesh && (o.castShadow = true));
  return target;
}

function turntable(s, target, { below = false } = {}) {
  const c = new OrbitControls(s.camera, s.canvas);
  Object.assign(c, { enableDamping: true, enablePan: false, enableZoom: false, autoRotate: !still, autoRotateSpeed: 1.2 });
  if (!below) c.maxPolarAngle = Math.PI / 2 - 0.05;
  c.target.copy(target);
  s.canvas.style.cursor = 'grab';
  return c;
}

// ---- cad, pcb: a turntable ----

async function cad(el) {
  const s = stage(el, { realistic: true });
  const model = await load('chromapi.glb');
  s.scene.add(model);
  const c = turntable(s, frame(s, model, new THREE.Vector3(0.7, 0.5, 1), { padY: 0.92 }));
  s.tick = () => c.update();
}

async function pcb(el) {
  const s = stage(el, { realistic: true });
  const model = await load('chromapi_motherboard.glb');
  // KiCad's board (chromapi-presentation-video's stage.js): its translucent
  // layers made opaque (the copper showed yellow through the mask, the mask hid
  // the silkscreen): the silkscreen white, the solder mask a glossy dark green.
  model.traverse(o => {
    const m = o.material;
    if (!o.isMesh) return;
    // No metallic factor in KiCad's GLB (glTF's default: 1) but on its copper finishes.
    if (m.roughness === 1) Object.assign(m, { metalness: 0, roughness: 0.5 });
    if (!m.transparent) return;
    Object.assign(m, { transparent: false, opacity: 1, depthWrite: true, side: THREE.DoubleSide });
    if (m.color.r > 0.9 && m.color.g > 0.9) m.color.set(0xffffff);
    else if (m.color.g > m.color.r) Object.assign(m, { roughness: 0.3 }).color.set(0x1f2d1d);
  });
  s.scene.add(model);
  // All the way round, the bottom side too.
  const c = turntable(s, frame(s, model, new THREE.Vector3(0.4, 1, 0.9), { padX: 0.77, padY: 0.88 }), { below: true });
  s.tick = () => c.update();
}

// ---- explode: parts apart with their callouts ----

// Offsets in the chassis frame (URDF metres, x the front, y left, z up): the stack
// rises top first, each layer clear of the one under it; the legs slide out
// from the chassis centre along their hip's direction.
const PARTS = {
  top: { files: ['robot_case_top', 'chromapi_logo_outer', 'chromapi_logo_circle', 'chromapi_logo_inner'], off: [0, 0, 0.34], en: 'Top shell', fr: 'Coque supérieure' },
  speaker: { files: ['speaker'], off: [0, 0, 0.27], en: 'Speaker', fr: 'Haut-parleur' },
  board: { files: ['chromapi_motherboard'], off: [0, 0, 0.215], en: 'Custom motherboard', fr: 'Carte mère' },
  pi: { files: ['raspberry_pi_4_model_b'], off: [0, 0, 0.165], en: 'Raspberry Pi 4', fr: 'Raspberry Pi 4' },
  battery: { files: ['battery_holder', '18650_li_ion_battery'], off: [0, 0, 0.115], en: '2 × 18650 batteries', fr: '2 batteries 18650' },
  fan: { files: ['fan_nf_a4x10'], off: [0, 0.07, 0], en: 'Cooling fan', fr: 'Ventilateur' },
  camera: { files: ['camera_imx219_d160'], off: [0.05, 0, 0], en: 'Wide-angle camera', fr: 'Caméra grand angle' },
  ring: { files: ['ws2812b_cob_pixel_ring_27mm'], off: [0.09, 0, 0], en: 'RGB LED ring', fr: 'Anneau de LED RGB' },
  case: { files: ['robot_case_bottom'], off: [0, 0, 0], en: '3D-printed chassis', fr: 'Châssis imprimé en 3D' },
  servo: { files: ['corps14'], link: 'left_femur_assembly', off: [0, 0, 0], en: '12 serial bus servos', fr: '12 servomoteurs (bus série)' },
};
const CHASSIS_C = [0, 0];
const LEG_OUT = 0.06;
const SVG = 'http://www.w3.org/2000/svg';
// The callouts' open ring (px radius).
const DOT = 2;

async function explode(el) {
  const s = stage(el, { realistic: true });
  const model = await load('chromapi.glb');
  // Turned (yaw only) about its centre: the pivot, where frame() centres it.
  const spin = new THREE.Group().add(model);
  s.scene.add(spin);
  const chassis = model.getObjectByName('chassis_assembly');
  // GLTFLoader makes node names unique (corps14_5): matched without that suffix.
  const parts = Object.values(PARTS).map(p => {
    const objs = (p.link ? model.getObjectByName(p.link) : chassis).children.filter(o => p.files.includes(o.name.replace(/_\d+$/, ''))).slice(0, p.link ? 1 : undefined);
    return { p, objs: objs.map(o => ({ o, rest: o.position.clone() })), off: new THREE.Vector3(...p.off) };
  });
  const hips = ['tl', 'tr', 'bl', 'br'].map(l => model.getObjectByName(`${l}_1_origin`)).map(o => ({ o, rest: o.position.clone(), out: new THREE.Vector3(o.position.x - CHASSIS_C[0], o.position.y - CHASSIS_C[1], 0).normalize() }));
  const apart = k => {
    for (const { objs, off } of parts) for (const { o, rest } of objs) o.position.copy(rest).addScaledVector(off, k);
    for (const { o, rest, out } of hips) o.position.copy(rest).addScaledVector(out, LEG_OUT * k);
    model.updateMatrixWorld(true);
  };
  // Framed taken apart (it must fit then, between the label columns), shown assembled.
  apart(1);
  // padY > 1: frame() fits the bounding box's corners, wider than the parts themselves.
  frame(s, model, new THREE.Vector3(1, 0.55, 1.25), { padX: 0.62, padY: 1.3 });
  // The parts sit low in that box: raise the picture (fraction of the height) to centre them.
  // setViewOffset() sets the aspect to fullWidth / fullHeight (1 here): the canvas's own is put back, or the
  // picture stays stretched sideways until the next resize.
  const aspect = s.camera.aspect;
  s.camera.setViewOffset(1, 1, 0, 0.12, 1, 1);
  s.camera.aspect = aspect;
  s.camera.updateProjectionMatrix();
  model.updateMatrixWorld(true);
  // Dragged sideways, it turns about the vertical (and coasts a little); the
  // labels keep their side (the one their part is on from the start).
  let grab = null, vel = 0;
  s.canvas.style.cursor = 'grab';
  s.canvas.addEventListener('pointerdown', e => ((grab = e.clientX), s.canvas.setPointerCapture(e.pointerId), (s.canvas.style.cursor = 'grabbing')));
  s.canvas.addEventListener('pointermove', e => {
    if (grab === null) return;
    vel = (e.clientX - grab) * 0.01;
    spin.rotation.y += vel;
    grab = e.clientX;
  });
  const drop = () => ((grab = null), (s.canvas.style.cursor = 'grab'));
  s.canvas.addEventListener('pointerup', drop);
  s.canvas.addEventListener('pointercancel', drop);
  // Each callout's anchor: its part's centre, held in the part's own frame (a
  // world box's centre would slide over the part as it turns).
  const anchors = parts.map(({ objs }) => {
    const b = new THREE.Box3();
    for (const { o } of objs) b.expandByObject(o);
    return objs[0].o.worldToLocal(b.getCenter(new THREE.Vector3()));
  });
  const sides = parts.map(({ objs }, i) => (objs[0].o.localToWorld(_v.copy(anchors[i])).project(s.camera).x > 0 ? 1 : 0));
  apart(0);

  // Callouts (chromapi-presentation-video's): a label in a side column, an
  // elbow line from its edge to an open ring on the part, drawn as it comes apart.
  const svg = document.createElementNS(SVG, 'svg');
  svg.classList.add('c3d-lines');
  el.append(svg);
  const labels = parts.map(({ p }) => {
    const d = Object.assign(document.createElement('div'), { className: 'c3d-label', textContent: fr ? p.fr : p.en });
    const line = document.createElementNS(SVG, 'polyline');
    const dot = document.createElementNS(SVG, 'circle');
    dot.setAttribute('r', DOT);
    el.append(d);
    svg.append(line, dot);
    return { d, line, dot };
  });
  let k = 0;
  s.tick = (t, dt) => {
    if (grab === null && vel) (spin.rotation.y += vel), (vel = Math.abs(vel) < 1e-4 ? 0 : vel * 0.92);
    // Taken apart as the view nears the middle of the window.
    const r = el.getBoundingClientRect();
    const goal = clamp(1.6 - (Math.abs(r.top + r.height / 2 - innerHeight / 2) / (innerHeight / 2)) * 1.6, 0, 1);
    k = still ? goal : k + (goal - k) * (1 - Math.exp(-dt * 6));
    apart(k * k * (3 - 2 * k));
    const W = s.canvas.clientWidth, H = s.canvas.clientHeight;
    const draw = clamp((k - 0.5) / 0.3, 0, 1), show = clamp((k - 0.7) / 0.25, 0, 1);
    const at = parts.map(({ objs }, i) => {
      objs[0].o.localToWorld(_v.copy(anchors[i])).project(s.camera);
      return { i, x: (_v.x + 1) / 2 * W, y: (1 - _v.y) / 2 * H };
    });
    for (const side of [0, 1]) {
      const col = at.filter(a => sides[a.i] === side).sort((a, b) => a.y - b.y);
      // 28 px apart at least, pushed back up if the column ran off the bottom.
      let y = 14;
      for (const a of col) (a.ly = Math.max(a.y, y)), (y = a.ly + 28);
      let lim = H - 14;
      for (const a of [...col].reverse()) (a.ly = Math.min(a.ly, lim)), (lim = a.ly - 28);
      for (const a of col) {
        const { d, line, dot } = labels[a.i];
        d.style.cssText = `top:${a.ly}px;${side ? 'right' : 'left'}:6px;opacity:${show}`;
        const ex = side ? W - d.offsetWidth - 16 : d.offsetWidth + 16;
        const kx = ex + (side ? -24 : 24);
        // From the ring's edge, not its centre.
        const d0 = Math.hypot(kx - a.x, a.ly - a.y) || 1;
        const sx = a.x + ((kx - a.x) / d0) * DOT, sy = a.y + ((a.ly - a.y) / d0) * DOT;
        line.setAttribute('points', `${sx},${sy} ${kx},${a.ly} ${ex},${a.ly}`);
        const len = d0 - DOT + 24;
        line.style.strokeDasharray = len;
        line.style.strokeDashoffset = len * (1 - draw);
        dot.setAttribute('cx', a.x);
        dot.setAttribute('cy', a.y);
        dot.style.opacity = draw > 0 ? 1 : 0;
      }
    }
  };
}

// ---- cartoon: the robot that looks at you ----

// The cartoon look (chromapi-presentation-video's LOOK): the silhouette ringed
// in a dark shade of each part's colour (a light one on the dark theme), and
// halftone dots in the shade. A shaded face takes its dots over a section
// only, as a ball's shade would (Kirby's), growing to a solid shade: each part
// is lit, for the dots, as if rounded about its middle (`round`: 0 its true
// normals .. 1 a ball's) from keyDir (towards the light, view space); they
// start where that light falls under `key` and grow over `falloff`. `ink`
// tints the dots (violet on the greys; a coloured part keeps its hue, darker);
// `face` spares the faces turned to the camera.
const LOOK = {
  width: { value: 7 }, light: { value: 0 }, halftone: { value: 1 }, cell: { value: 8 }, lit: { value: 0.9 },
  ink: { value: new THREE.Color(0.72, 0.58, 0.88) }, face: { value: 1 },
  round: { value: 0.8 }, keyDir: { value: new THREE.Vector3(-0.5, 0.75, 0.45).normalize() }, key: { value: 0.6 }, falloff: { value: 0.5 },
};
const STENCIL = { stencilWrite: true, stencilRef: 1, stencilZPass: THREE.ReplaceStencilOp };
const HULL_VS = `uniform float uWidth;
  void main() {
    vec4 p = modelViewMatrix * vec4(position, 1.0);
    p.xyz += normalize(normalMatrix * normal) * uWidth / 540.0 * -p.z / projectionMatrix[1][1];
    gl_Position = projectionMatrix * p;
  }`;
const HULL_FS = `uniform vec3 uDark; uniform vec3 uLite; uniform float uLight;
  void main() { gl_FragColor = vec4(mix(uDark, uLite, uLight), 0.88);
  #include <colorspace_fragment>
  }`;
const hullMats = new Map();
function hullMat(mat) {
  if (!hullMats.has(mat)) {
    const hsl = (mat.color ?? new THREE.Color(0.5, 0.5, 0.5)).getHSL({});
    hullMats.set(mat, new THREE.ShaderMaterial({
      uniforms: {
        uWidth: LOOK.width,
        uLight: LOOK.light,
        uDark: { value: new THREE.Color().setHSL(hsl.h, Math.min(1, hsl.s * 1.3), 0.06 + hsl.l * 0.12) },
        uLite: { value: new THREE.Color().setHSL(hsl.h, hsl.s * 0.5, 0.82) },
      },
      vertexShader: HULL_VS,
      fragmentShader: HULL_FS,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
      toneMapped: false,
      ...STENCIL,
      stencilFunc: THREE.NotEqualStencilFunc,
    }));
  }
  return hullMats.get(mat);
}
// The welded mesh with smoothed normals: the hull stays closed at the corners.
const smooth = new Map();
function smoothOf(g) {
  if (!smooth.has(g)) {
    const m = new THREE.BufferGeometry().setAttribute('position', g.attributes.position).setIndex(g.index);
    m.computeVertexNormals();
    smooth.set(g, m);
  }
  return smooth.get(g);
}
// A geometry's aRound attribute: each vertex's direction from the middle of its box.
function roundOf(g) {
  if (g.hasAttribute('aRound')) return;
  const pos = g.getAttribute('position');
  const c = new THREE.Box3().setFromBufferAttribute(pos).getCenter(new THREE.Vector3());
  const a = new THREE.BufferAttribute(new Float32Array(pos.count * 3), 3);
  for (let i = 0; i < pos.count; i++) a.setXYZ(i, ..._v.fromBufferAttribute(pos, i).sub(c).normalize().toArray());
  g.setAttribute('aRound', a);
}
// Which faces are in the shade: the real light. Where on them, and how big the
// dots: the rounded part's. One pixel of anti-aliasing on the pattern.
const HALFTONE = `
  vec3 hw = vec3(0.299, 0.587, 0.114);
  float light = dot(reflectedLight.directDiffuse + reflectedLight.indirectDiffuse, hw) / max(dot(diffuseColor.rgb, hw), 1e-3);
  vec3 rn = dot(vRound, vRound) > 0.25 ? normalize(mix(normal, normalize(vRound), uRound)) : normal;
  float sh = smoothstep(0.0, 0.35, 1.0 - light / uLit) * clamp((uKey - (dot(rn, uKeyDir) * 0.5 + 0.5)) / uFalloff, 0.0, 1.0);
  sh *= 1.0 - uFace * smoothstep(0.25, 0.7, dot(normal, normalize(vViewPosition)));
  vec2 hg = mat2(0.7071, -0.7071, 0.7071, 0.7071) * gl_FragCoord.xy / uCell;
  float aa = 0.7 / uCell;
  vec3 chroma = outgoingLight / max(dot(outgoingLight, hw), 1e-4);
  float grey = smoothstep(0.15, 0.4, 1.0 - min(chroma.r, min(chroma.g, chroma.b)) / max(chroma.r, max(chroma.g, chroma.b)));
  outgoingLight *= mix(vec3(1.0), mix(uInk, vec3(dot(uInk, hw)), grey), uHalftone * (1.0 - smoothstep(-aa, aa, length(fract(hg) - 0.5) - 0.85 * sqrt(sh) + aa)));
  #include <opaque_fragment>`;
const toned = new WeakSet();
function halftone(mat) {
  if (toned.has(mat)) return;
  toned.add(mat);
  Object.assign(mat, STENCIL, { stencilFunc: THREE.AlwaysStencilFunc });
  mat.onBeforeCompile = sh => {
    Object.assign(sh.uniforms, { uHalftone: LOOK.halftone, uCell: LOOK.cell, uLit: LOOK.lit, uInk: LOOK.ink, uFace: LOOK.face, uRound: LOOK.round, uKeyDir: LOOK.keyDir, uKey: LOOK.key, uFalloff: LOOK.falloff });
    sh.fragmentShader = 'varying vec3 vRound; uniform float uHalftone; uniform float uCell; uniform float uLit; uniform vec3 uInk; uniform float uFace; uniform float uRound; uniform vec3 uKeyDir; uniform float uKey; uniform float uFalloff;\n' + sh.fragmentShader.replace('#include <opaque_fragment>', HALFTONE);
    sh.vertexShader = 'attribute vec3 aRound; varying vec3 vRound;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\n vRound = normalMatrix * aRound;');
  };
  mat.customProgramCacheKey = () => 'halftone';
}
function toon(model) {
  const meshes = [];
  model.traverse(o => o.isMesh && meshes.push(o));
  for (const o of meshes) {
    halftone(o.material);
    roundOf(o.geometry);
    const h = new THREE.Mesh(smoothOf(o.geometry.welded ?? o.geometry), hullMat(o.material));
    h.raycast = () => {};
    h.renderOrder = 1;
    o.add(h);
  }
}

// Emotes (chromapi: locomotion/emotes.py, examples/dance.py): a duration (s)
// and, at t, the chassis pose over the planted feet [xyz m, roll pitch yaw rad]
// in the feet frame (+X forward, +Y left, +Z up; roll > 0 right, pitch > 0 nose
// down, yaw > 0 left); hello also lifts and waves a front leg.
const bump = s => Math.sin(Math.PI * clamp(s, 0, 1));
const ZERO = [[0, 0, 0], [0, 0, 0]];
// BodyGesture: the GESTURES pose over its duration, then GESTURE_SETTLE_S still.
const gesture = (dur, pose) => ({ dur: dur + 0.4, at: t => (t < dur ? pose(t / dur) : ZERO) });
// The greeting (BalancedLegEmote + GreetingWaveMove): the weight shifted onto
// the 3 other feet, the leg lifted, waved and put down, the weight shifted back.
const WAVE = { coxa: [0.25, 1.0], tibia: [-0.4, -0.3], lift: 0.95, freq: 1.2, dur: 2, shift: 0.5, land: 0.3 };
WAVE.wave = 1 / WAVE.freq;
WAVE.ramp = (WAVE.dur - WAVE.wave) / 2;
function waveLeg(t, from) {
  const { ramp, coxa, tibia, lift } = WAVE;
  const mid = r => (r[0] + r[1]) / 2, amp = r => (r[1] - r[0]) / 2;
  const up = [mid(coxa), lift, mid(tibia)];
  if (t < ramp || t >= ramp + WAVE.wave) {
    const k = ease(t < ramp ? t / ramp : 1 - (t - ramp - WAVE.wave) / ramp);
    return from.map((q, i) => q + (up[i] - q) * k);
  }
  const s = Math.sin((t - ramp) * WAVE.freq * 2 * Math.PI);
  return [mid(coxa) + amp(coxa) * s, lift, mid(tibia) + amp(tibia) * s];
}
const EMOTES = {
  hello: shift => {
    const { shift: sh, dur, land } = WAVE;
    const k = t => (t < sh ? ease(t / sh) : t < sh + dur + land ? 1 : 1 - ease((t - sh - dur - land) / sh));
    // The leg's time in its wave, while it is up.
    return { dur: 2 * sh + dur + land, leg: 'tl', at: t => [shift.clone().multiplyScalar(k(t)).toArray(), [0, 0, 0]], up: t => (t > sh && t < sh + dur ? t - sh : null) };
  },
  // Three little hops, swaying side to side.
  happy: () => gesture(1.5, s => [[0, 0, 0.012 * Math.abs(Math.sin(3 * Math.PI * s))], [-0.07 * Math.sin(3 * Math.PI * s) * bump(s), 0, 0]]),
  // dance.py: roll and pitch trace a circle (8°, 2 s a turn), eased in over the
  // first turn (and out over the last second).
  dance: () => ({
    dur: 6,
    at: t => {
      const a = THREE.MathUtils.degToRad(8) * Math.min(1, t / 2) * ease(6 - t);
      return [[0, 0, 0], [-a * Math.sin(Math.PI * t), a * Math.cos(Math.PI * t), 0]];
    },
  }),
};

async function cartoon(el) {
  const s = stage(el, { realistic: false });
  const model = await load('chromapi.glb');
  s.scene.add(model);
  s.scene.add(new THREE.HemisphereLight(0xffffff, 0x888888, 0.6));
  LOOK.cell.value = 8 * s.renderer.getPixelRatio();
  toon(model);

  const root = model.getObjectByName('chromapi');
  const body = model.getObjectByName('chassis_assembly');
  const rest = body.position.clone();
  const J = {};
  model.traverse(o => o.userData.axis && (J[o.name] = Object.assign(o.userData, { ax: new THREE.Vector3(...o.userData.axis), o, q: o.userData.stand })));
  const set = (name, q) => {
    const j = J[name];
    j.q = clamp(q, j.lower, j.upper);
    j.o.quaternion.setFromAxisAngle(j.ax, j.q);
  };
  model.updateMatrixWorld(true);
  const LEGS = ['tl', 'tr', 'bl', 'br'];
  // Each foot's mark on the floor, in the robot's (URDF) frame.
  const feet = Object.fromEntries(LEGS.map(l => {
    const f = model.getObjectByName(`${l}_foot`);
    return [l, { f, at: root.worldToLocal(f.getWorldPosition(new THREE.Vector3())) }];
  }));
  frame(s, model, new THREE.Vector3(0.55, 0.55, 1), { padX: 0.98, padY: 0.97 });

  // Feet back on their marks (cyclic coordinate descent, knee first).
  const _t = new THREE.Vector3(), _p = new THREE.Vector3(), _e = new THREE.Vector3(), _x = new THREE.Vector3();
  const reach = l => {
    root.localToWorld(_t.copy(feet[l].at));
    for (let it = 0; it < 6; it++)
      for (const n of [3, 2, 1]) {
        const j = J[`${l}_${n}`];
        j.o.getWorldPosition(_p);
        feet[l].f.getWorldPosition(_e);
        _a.copy(j.ax).transformDirection(j.o.matrixWorld);
        _e.sub(_p).addScaledVector(_a, -_e.dot(_a));
        _w.copy(_t).sub(_p).addScaledVector(_a, -_w.dot(_a));
        set(j.o.name, j.q + Math.atan2(_a.dot(_x.crossVectors(_e, _w)), _e.dot(_w)));
        j.o.updateMatrixWorld(true);
      }
  };

  // The pointer, from the robot's place on screen (-1..1 over the window),
  // followed only while it stays within about the view's height of the robot.
  const pointer = { x: 0, y: 0, on: false };
  addEventListener('pointermove', e => Object.assign(pointer, { x: e.clientX, y: e.clientY, on: true }), { passive: true });
  document.documentElement.addEventListener('pointerleave', () => (pointer.on = false));
  const aim = new THREE.Vector2(), lean = new THREE.Vector2();
  const look = () => {
    const r = s.canvas.getBoundingClientRect();
    const dx = pointer.x - r.left - r.width / 2, dy = pointer.y - r.top - r.height / 2;
    if (!pointer.on || Math.abs(dy) > r.height * 1.1) return aim.set(0, 0);
    aim.set(dx / (innerWidth / 2), dy / (innerHeight / 2)).clampLength(0, 1);
  };

  // A click on the robot: one of its emotes, at random (not the same twice).
  const ray = new THREE.Raycaster();
  const hit = e => {
    const r = s.canvas.getBoundingClientRect();
    ray.setFromCamera(_v.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1, 0), s.camera);
    return ray.intersectObject(model, true).length > 0;
  };
  // hello: the weight onto the 3 other feet, toward the diagonal one.
  const shift = feet.br.at.clone().sub(feet.tl.at).setZ(0).normalize().multiplyScalar(0.02);
  let emote = null, last = null;
  s.canvas.addEventListener('pointermove', e => (s.canvas.style.cursor = hit(e) ? 'pointer' : ''));
  s.canvas.addEventListener('click', e => {
    if (emote || !hit(e)) return;
    const names = Object.keys(EMOTES).filter(n => n !== last);
    last = names[Math.floor(Math.random() * names.length)];
    emote = { t: 0, ...EMOTES[last](shift) };
  });

  const right = new THREE.Vector3(), away = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0), lean3 = new THREE.Vector3();
  const rootQ = new THREE.Quaternion(), rootQi = new THREE.Quaternion(), tilt = new THREE.Quaternion(), yaw = new THREE.Quaternion(), mood = new THREE.Quaternion(), euler = new THREE.Euler();
  s.tick = (t, dt) => {
    LOOK.light.value = dark() ? 1 : 0;
    look();
    // During an emote, it looks straight ahead.
    if (emote) aim.set(0, 0);
    if (!still) lean.lerp(aim, 1 - Math.exp(-dt * 4));
    // Lean direction on the floor: the pointer's right is the camera's right,
    // its up is away from the camera.
    right.set(1, 0, 0).applyQuaternion(s.camera.quaternion).setY(0).normalize();
    away.set(0, 0, -1).applyQuaternion(s.camera.quaternion).setY(0).normalize();
    lean3.copy(right).multiplyScalar(lean.x).addScaledVector(away, -lean.y);
    // Tilt toward the pointer, turn a little to it, breathe (trunk up and down),
    // the emote's pose on top (in the robot's frame).
    _a.crossVectors(up, lean3);
    tilt.setFromAxisAngle(_a.lengthSq() > 1e-9 ? _a.normalize() : up, 0.16 * lean3.length());
    yaw.setFromAxisAngle(up, 0.3 * lean.x);
    root.getWorldQuaternion(rootQ);
    rootQi.copy(rootQ).invert();
    if (emote) emote.t += dt;
    const [xyz, rpy] = emote ? emote.at(Math.min(emote.t, emote.dur)) : ZERO;
    mood.setFromEuler(euler.set(rpy[0], rpy[1], rpy[2], 'XYZ'));
    _q.copy(yaw).premultiply(tilt).premultiply(rootQi).multiply(rootQ).multiply(mood);
    body.quaternion.copy(_q);
    const breath = still ? 0 : 0.005 * Math.sin(t * 1.7) + 0.002 * Math.sin(t * 0.9);
    _w.copy(lean3).multiplyScalar(0.008).applyQuaternion(rootQi);
    body.position.copy(rest).add(_w).add(_v.set(xyz[0], xyz[1], xyz[2] + breath));
    model.updateMatrixWorld(true);
    const lifted = emote?.up?.(emote.t) ?? null;
    for (const l of LEGS) if (lifted === null || l !== emote.leg) reach(l);
    // The wave starts from where the leg stood once the weight had shifted.
    if (lifted !== null) emote.from ??= [1, 2, 3].map(n => J[`${emote.leg}_${n}`].q);
    if (lifted !== null) waveLeg(lifted, emote.from).forEach((q, i) => set(`${emote.leg}_${i + 1}`, q));
    if (emote && emote.t >= emote.dur) emote = null;
  };
}

const MODES = { cartoon, cad, explode, pcb };
// Started at once (the GLB is already on its way: the page preloads it); each
// view draws only while on screen.
for (const el of document.querySelectorAll('[data-chromapi3d]')) MODES[el.dataset.chromapi3d]?.(el).catch(err => console.error('chromapi3d', err));
