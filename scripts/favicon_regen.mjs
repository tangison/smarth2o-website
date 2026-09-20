/**
 * Rebuild the full favicon set from the official stacked SVG logo.
 * Original colours, transparent background, no recolouring.
 * Outputs: public/favicon/favicon.ico (16/32/48), icon-192.png, icon-512.png,
 * apple-touch-icon.png, and public/favicon.svg (the stacked SVG itself).
 * Usage: node scripts/favicon_regen.mjs  (from the repo root)
 */
import { createRequire } from "node:module";
import { copyFileSync } from "node:fs";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const SVG = join(process.cwd(), "public", "images", "svg", "smart-h2o-logo-stacked.svg");
const OUT_FAV = join(process.cwd(), "public", "favicon");

async function render(size) {
  return sharp(SVG, { density: 300 })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

// ICO with 16/32/48 embedded PNG entries
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map(render));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
const dir = Buffer.alloc(16 * sizes.length);
let offset = 6 + 16 * sizes.length;
const blobs = [];
sizes.forEach((s, i) => {
  const b = pngs[i];
  dir.writeUInt8(s, i * 16 + 0);
  dir.writeUInt8(s, i * 16 + 1);
  dir.writeUInt8(0, i * 16 + 2);
  dir.writeUInt8(0, i * 16 + 3);
  dir.writeUInt16LE(1, i * 16 + 4);
  dir.writeUInt16LE(32, i * 16 + 6);
  dir.writeUInt32LE(b.length, i * 16 + 8);
  dir.writeUInt32LE(offset, i * 16 + 12);
  blobs.push(b);
  offset += b.length;
});
const ico = Buffer.concat([header, dir, ...blobs]);
const { writeFileSync } = await import("node:fs");
writeFileSync(join(OUT_FAV, "favicon.ico"), ico);
console.log(`favicon.ico ${(ico.length / 1024).toFixed(1)}KB`);

for (const s of [192, 512]) {
  const buf = await render(s);
  writeFileSync(join(OUT_FAV, `icon-${s}.png`), buf);
  console.log(`icon-${s}.png ${s}x${s}`);
}
const apple = await render(180);
writeFileSync(join(OUT_FAV, "apple-touch-icon.png"), apple);
console.log("apple-touch-icon.png 180x180");

copyFileSync(SVG, join(process.cwd(), "public", "favicon.svg"));
console.log("favicon.svg = official stacked SVG");
