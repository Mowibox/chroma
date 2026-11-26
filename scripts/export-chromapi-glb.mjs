// Chromapi's URDF baked into one GLB for the site (static/models/chromapi.glb),
// with the URDF loader of chromapi-presentation-video, run in headless Chromium.
//
//   node scripts/export-chromapi-glb.mjs ../chromapi-presentation-video
//
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const REPO = resolve(process.argv[2] ?? '../chromapi-presentation-video');
const OUT = resolve('static/models/chromapi.glb');
const BOARD = resolve('static/models/chromapi_motherboard.glb');
const RAW = join(tmpdir(), 'chromapi-raw.glb'), SIMP = join(tmpdir(), 'chromapi-simp.glb'), BAKED = join(tmpdir(), 'chromapi-baked.glb');
// prune/flatten/join off: they would drop the empty foot nodes and merge the parts.
const KEEP = ['--texture-compress', 'false', '--prune', 'false', '--flatten', 'false', '--join', 'false', '--instance', 'false', '--palette', 'false'];
const gltf = (...a) => execFileSync('npx', ['-y', '@gltf-transform/cli@4.2.1', ...a], { stdio: 'inherit' });
const { serve } = await import(`${REPO}/scripts/serve.mjs`);
const { chromium } = await import(`${REPO}/node_modules/playwright/index.mjs`);
const server = await serve(5199);
const browser = await chromium.launch();
const page = await browser.newPage();
page.on('pageerror', e => console.error(e.stack));
const IMPORTS = `<script type="importmap">{ "imports": { "three": "./vendor/three/build/three.module.js", "three/addons/": "./node_modules/three/examples/jsm/" } }</script>`;
// A page's module, run: what it leaves in window.done (base64 GLB), saved to `out`.
async function run(out, module) {
  await page.route('http://localhost:5199/__export.html', r => r.fulfill({ contentType: 'text/html', body: `${IMPORTS}<script type="module">
import * as THREE from 'three';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
const glb = async o => btoa(new Uint8Array(await new GLTFExporter().parseAsync(o, { binary: true })).reduce((s, b) => s + String.fromCharCode(b), ''));
${module}</script>` }));
  await page.goto('http://localhost:5199/__export.html');
  writeFileSync(out, Buffer.from(await page.waitForFunction(() => window.done, null, { timeout: 300000 }).then(h => h.jsonValue()), 'base64'));
  await page.unroute('http://localhost:5199/__export.html');
}

// 1. The robot from its URDF, positions only.
await run(RAW, `
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { loadChromapi, POSES } from './src/chromapi.js';
const vec = s => (s ?? '0 0 0').trim().split(/\\s+/).map(Number);
const place = (o, origin) => { o.position.fromArray(vec(origin?.getAttribute('xyz'))); const [r, p, y] = vec(origin?.getAttribute('rpy')); o.rotation.set(r, p, y, 'ZYX'); };
const mats = new Map();
const mat = rgba => { if (!mats.has(rgba)) { const [r, g, b] = vec(rgba); mats.set(rgba, new THREE.MeshStandardMaterial({ color: new THREE.Color().setRGB(r, g, b, THREE.SRGBColorSpace), roughness: 0.55, metalness: 0.05 })); } return mats.get(rgba); };
// Plain, indexed copy, positions only (GLB parts come interleaved; STLs are triangle soups).
const geoms = new Map();
const plain = g => {
  if (geoms.has(g)) return geoms.get(g);
  const flat = g.index ? g.toNonIndexed() : g, out = new THREE.BufferGeometry();
  const at = flat.attributes.position, f = new Float32Array(at.count * 3);
  for (let i = 0; i < at.count; i++) f.set([at.getX(i), at.getY(i), at.getZ(i)], i * 3);
  out.setAttribute('position', new THREE.BufferAttribute(f, 3));
  const m = mergeVertices(out, 1e-6);
  geoms.set(g, m);
  return m;
};
const doc = new DOMParser().parseFromString(await fetch('./assets/chromapi/robot.urdf').then(r => r.text()), 'text/xml');
const limits = Object.fromEntries([...doc.querySelectorAll('robot > joint')].map(j => [j.getAttribute('name'), j.querySelector('limit')]));
const src = await loadChromapi('./assets/chromapi/robot.urdf');
// Onshape writes its appearances' sRGB bytes as glTF's linear factors (as loadChromapi fixes).
const board = (await new GLTFLoader().loadAsync('./out/onshape/chromapi_motherboard.glb')).scene;
const boardMats = new Set();
board.traverse(o => o.isMesh && boardMats.add(o.material));
for (const m of boardMats) {
  // The 2x20 header onto the Pi (ESQ-120-33-T-D): black, not the export's pure yellow.
  if (m.color.r > 0.9 && m.color.g > 0.9 && m.color.b < 0.05) m.color.setRGB(0.1, 0.1, 0.1);
  m.color.convertSRGBToLinear();
}
const links = {};
for (const [name, vis] of src.links) {
  const g = new THREE.Group(); g.name = name;
  for (const v of vis) {
    // Screws: tiny on screen, a tenth of the triangles.
    if (!v.geom || /^vis/.test(v.file)) continue;
    const m = v.file === 'chromapi_motherboard' ? board.clone() : v.geom.isBufferGeometry ? new THREE.Mesh(v.geom, mat(v.rgba)) : v.geom.clone();
    m.traverse(o => o.isMesh && (o.geometry = plain(o.geometry)));
    m.name = v.file; place(m, v.origin); g.add(m);
  }
  links[name] = g;
}
// URDF z up -> three y up; and the chassis frame (x front, y left, origin on the IMU since 7 Nov. 2026) turned
// and moved back to where the site's views were framed (front = three +z, the old off-centre origin).
const root = new THREE.Group(); root.name = 'chromapi';
root.quaternion.setFromEuler(new THREE.Euler(-Math.PI / 2, 0, -Math.PI / 2, 'XYZ'));
root.position.set(0.02853, -0.0642, -0.04577).applyAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
root.add(links[src.root]);
for (const j of src.joints) {
  const o = new THREE.Group(); o.name = j.name + '_origin'; place(o, j.origin);
  const turn = new THREE.Group(); turn.name = j.name; o.add(turn); turn.add(links[j.child]);
  if (j.type === 'revolute') {
    const l = limits[j.name];
    turn.userData = { axis: j.axis.toArray(), stand: POSES.stand[j.name], lower: +l.getAttribute('lower'), upper: +l.getAttribute('upper') };
  }
  links[j.parent].add(o);
}
window.done = await glb(root);`);
gltf('optimize', RAW, SIMP, '--compress', 'false', '--simplify-ratio', '0.3', '--simplify-error', '0.001', ...KEEP);

// 2. Normals, outline normals, merged parts.
await page.route('http://localhost:5199/__simp.glb', r => r.fulfill({ contentType: 'model/gltf-binary', body: readFileSync(SIMP) }));
await run(BAKED, `
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { mergeVertices, mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
const model = (await new GLTFLoader().loadAsync('./__simp.glb')).scene;
model.updateMatrixWorld(true);
// Positions only, welded: the site creases the normals itself (baked, they
// would quadruple the file: a sharp edge splits its vertices).
const bake = g => mergeVertices(g, 1e-6);
// One material per look (colour, metal, roughness).
const looks = new Map();
const look = m => { const k = m.color.getHexString() + m.metalness + m.roughness; if (!looks.has(k)) looks.set(k, m); return looks.get(k); };
// Each link's parts (its children but the joints' origins): their meshes,
// placed in the part's frame, merged by material. The same part again (12
// servos, 4 legs) shares the first one's meshes.
const made = new Map();
const links = [];
model.traverse(o => o.children.some(c => /_origin$/.test(c.name)) && links.push(o));
links.push(model.getObjectByName('chassis_assembly'));
for (const link of new Set(links))
  for (const part of [...link.children]) {
    if (/_origin$/.test(part.name) || part.children.length === 0 && !part.isMesh) continue;
    const inv = part.matrixWorld.clone().invert();
    const src = [];
    part.traverse(o => o.isMesh && src.push({ o, m: new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld) }));
    const id = src.map(({ o, m }) => o.geometry.uuid + m.elements.map(x => x.toFixed(6))).join();
    if (!made.has(id)) {
      const by = new Map();
      for (const { o, m } of src) {
        const g = o.geometry.clone().applyMatrix4(m);
        for (const k of Object.keys(g.attributes)) if (k !== 'position') g.deleteAttribute(k);
        const mat = look(o.material);
        by.set(mat, [...(by.get(mat) ?? []), bake(g)]);
      }
      made.set(id, [...by].map(([mat, gs]) => [mat, mergeGeometries(gs)]));
    }
    const merged = new THREE.Group();
    merged.name = part.name;
    merged.position.copy(part.position); merged.quaternion.copy(part.quaternion); merged.scale.copy(part.scale);
    for (const [m, g] of made.get(id)) merged.add(new THREE.Mesh(g, m));
    link.add(merged);
    link.remove(part);
  }
let meshes = 0; model.traverse(o => o.isMesh && meshes++);
console.log('meshes', meshes, 'materials', looks.size);
window.done = await glb(model.children[0]);`);
await browser.close();
server.close();
gltf('optimize', BAKED, OUT, '--compress', 'meshopt', '--simplify', 'false', ...KEEP);
console.log(OUT);
gltf('meshopt', `${REPO}/assets/pcb/chromapi_motherboard.glb`, BOARD);
console.log(BOARD);
