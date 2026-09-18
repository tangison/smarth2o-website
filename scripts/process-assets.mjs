/**
 * Smart H₂O — asset processing pipeline (exporting-to-png skill workflow).
 * Sources: real brand assets from the agent package (filebin).
 * Outputs: precision-trimmed WebP sizes, favicon set, OG image -> public/
 */
import sharp from "sharp";
import { mkdirSync, copyFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const SRC = "/home/z/my-project/assets/agent-package";
const OUT = "/home/z/my-project/public";
const OUT_IMG = join(OUT, "images");
const OUT_FAV = join(OUT, "favicon");
mkdirSync(OUT_IMG, { recursive: true });
mkdirSync(OUT_FAV, { recursive: true });

const log = (...a) => console.log(...a);
const kb = (p) => `${(statSync(p).size / 1024).toFixed(0)}KB`;

async function inspect(file) {
  const m = await sharp(file).metadata();
  log(`  ${file.split("/").pop()}  ${m.width}x${m.height} ${m.format}${m.hasAlpha ? " alpha" : ""}`);
  return m;
}

/** Precision-trim transparent padding, then emit responsive WebP widths. */
async function cutoutToWebP(src, baseName, widths, { maxH = null } = {}) {
  const meta = await inspect(src);
  // trim: threshold on alpha — removes near-transparent border rows/cols
  let img = sharp(src).trim({ threshold: 3, background: { r: 0, g: 0, b: 0, alpha: 0 } });
  const trimmed = await img.toBuffer();
  const tm = await sharp(trimmed).metadata();
  log(`  -> trimmed to ${tm.width}x${tm.height}`);
  const outs = [];
  for (const w of widths) {
    if (w > tm.width * 1.5) continue; // never upscale beyond reason
    let resized = sharp(trimmed).resize({ width: w, withoutEnlargement: true });
    const out = join(OUT_IMG, `${baseName}-${w}w.webp`);
    await resized.webp({ quality: 82, effort: 6 }).toFile(out);
    log(`  -> ${baseName}-${w}w.webp ${kb(out)}`);
    outs.push(out);
  }
  // full-size (capped) master
  let master = sharp(trimmed);
  if (maxH && tm.height > maxH) master = master.resize({ height: maxH, withoutEnlargement: true });
  const masterOut = join(OUT_IMG, `${baseName}.webp`);
  await master.webp({ quality: 84, effort: 6 }).toFile(masterOut);
  log(`  -> ${baseName}.webp ${kb(masterOut)}`);
  return outs;
}

/** Photographic (opaque) asset: resize + webp. */
async function photoToWebP(src, baseName, width) {
  await inspect(src);
  const out = join(OUT_IMG, `${baseName}.webp`);
  await sharp(src)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 })
    .toFile(out);
  log(`  -> ${baseName}.webp ${kb(out)}`);
}

/** Logo lockups: trim, cap height, keep aspect, high-fidelity webp. */
async function logoToWebP(src, baseName, capH) {
  const m = await inspect(src);
  const trimmed = await sharp(src).trim({ threshold: 4, background: { r: 255, g: 255, b: 255, alpha: 0 } }).toBuffer();
  const tm = await sharp(trimmed).metadata();
  log(`  -> trimmed to ${tm.width}x${tm.height}`);
  const w = Math.round(tm.width * (capH / tm.height));
  const out = join(OUT_IMG, `${baseName}.webp`);
  await sharp(trimmed)
    .resize({ width: w, height: capH, fit: "fill" })
    .webp({ quality: 92, effort: 6, smartSubsample: true })
    .toFile(out);
  const om = await sharp(out).metadata();
  log(`  -> ${baseName}.webp ${om.width}x${om.height} ${kb(out)}`);
  return { w: om.width, h: om.height };
}

async function main() {
  log("== BRAND: logo lockups ==");
  // Header lockup (colour) — cap 120px height (enough for 60px header @2x)
  await logoToWebP(join(SRC, "01-BRAND/logo/png/smart-h2o-logo-horizontal.png"), "logo-horizontal", 120);
  // Footer lockup (white) — VERY HUGE: cap 360px height master + a 180h variant
  await logoToWebP(join(SRC, "01-BRAND/logo/png/smart-h2o-logo-horizontal-white.png"), "logo-horizontal-white", 360);
  await logoToWebP(join(SRC, "01-BRAND/logo/png/smart-h2o-logo-horizontal-white.png"), "logo-horizontal-white-180", 180);
  // Stacked primary (square contexts)
  await logoToWebP(join(SRC, "01-BRAND/logo/png/smart-h2o-logo-primary.png"), "logo-primary", 320);
  await logoToWebP(join(SRC, "01-BRAND/logo/png/smart-h2o-logo-primary-white.png"), "logo-primary-white", 320);
  // Marks
  await logoToWebP(join(SRC, "01-BRAND/logo/png/smart-h2o-logo-mark.png"), "logo-mark", 240);
  await logoToWebP(join(SRC, "01-BRAND/logo/png/smart-h2o-logo-mark-white.png"), "logo-mark-white", 240);

  log("== MACHINES: precision cutouts ==");
  await cutoutToWebP(join(SRC, "02-MACHINES/png/smart-h2o-machine-branded-transparent.png"), "machine-branded", [480, 768, 1024]);
  await cutoutToWebP(join(SRC, "02-MACHINES/png/smart-h2o-machine-plain-transparent.png"), "machine-plain", [480, 768]);

  log("== MACHINES: real factory photos (contextual) ==");
  await photoToWebP(join(SRC, "02-MACHINES/originals/smart-h2o-machine-branded-original.jpg"), "machine-factory", 1280);
  await photoToWebP(join(SRC, "02-MACHINES/originals/smart-h2o-machine-plain-original.jpg"), "machine-factory-plain", 1280);

  log("== FAVICON set from flat mark SVG ==");
  // flat SVG (navy) — rasterize at each size
  const svgNavy = join(SRC, "01-BRAND/logo/svg/smart-h2o-logo-mark-flat.svg");
  const svgWhite = join(SRC, "01-BRAND/logo/svg/smart-h2o-logo-mark-flat-white.svg");
  copyFileSync(svgNavy, join(OUT, "favicon.svg"));
  const svgBuf = await sharp(svgNavy).resize(512, 512).png().toBuffer();
  const sm = await sharp(svgBuf).metadata();
  log(`  svg raster ${sm.width}x${sm.height}`);
  // ICO: 16/32/48 embedded-PNG entries
  const sizes = [16, 32, 48];
  const pngs = await Promise.all(sizes.map((s) => sharp(svgBuf).resize(s, s).png().toBuffer()));
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
  const dir = Buffer.alloc(16 * sizes.length);
  let offset = 6 + 16 * sizes.length;
  const blobs = [];
  sizes.forEach((s, i) => {
    const b = pngs[i];
    dir.writeUInt8(s === 256 ? 0 : s, i * 16 + 0);
    dir.writeUInt8(s === 256 ? 0 : s, i * 16 + 1);
    dir.writeUInt8(0, i * 16 + 2); dir.writeUInt8(0, i * 16 + 3);
    dir.writeUInt16LE(1, i * 16 + 4); dir.writeUInt16LE(32, i * 16 + 6);
    dir.writeUInt32LE(b.length, i * 16 + 8);
    dir.writeUInt32LE(offset, i * 16 + 12);
    blobs.push(b);
    offset += b.length;
  });
  const ico = Buffer.concat([header, dir, ...blobs]);
  writeFileSync(join(OUT_FAV, "favicon.ico"), ico);
  log(`  favicon.ico ${kb(join(OUT_FAV, "favicon.ico"))}`);
  // PNG icons
  for (const s of [192, 512]) {
    const out = join(OUT_FAV, `icon-${s}.png`);
    await sharp(svgBuf).resize(s, s).png().toFile(out);
    log(`  icon-${s}.png ${kb(out)}`);
  }
  await sharp(svgBuf).resize(180, 180).png().toFile(join(OUT_FAV, "apple-touch-icon.png"));
  log(`  apple-touch-icon.png ${kb(join(OUT_FAV, "apple-touch-icon.png"))}`);
  // white svg for dark contexts
  copyFileSync(svgWhite, join(OUT_FAV, "favicon-white.svg"));

  log("== OG image 1200x630 ==");
  const ogLogo = join(OUT_IMG, "logo-horizontal-white-180.webp");
  const logoMeta = await sharp(ogLogo).metadata();
  const og = await sharp({
    create: { width: 1200, height: 630, channels: 4, background: { r: 2, g: 23, b: 47, alpha: 1 } },
  })
    .composite([
      // teal accent rule
      {
        input: Buffer.from(`<svg width="1200" height="630"><rect x="0" y="626" width="1200" height="4" fill="#0CA2AB"/></svg>`),
        top: 0, left: 0,
      },
      // logo scaled to fit canvas with margins
      {
        input: await sharp(ogLogo).resize({ width: Math.min(1000, Math.round(logoMeta.width * 1.4)) }).png().toBuffer(),
        top: Math.round(630 / 2 - (logoMeta.height * Math.min(1000 / logoMeta.width, 1.4)) / 2 - 30),
        left: Math.round((1200 - Math.min(1000, Math.round(logoMeta.width * 1.4))) / 2),
      },
      // caption
      {
        input: Buffer.from(`<svg width="1200" height="60"><text x="600" y="40" font-family="DejaVu Sans, sans-serif" font-size="26" fill="#F3F7F8" text-anchor="middle" letter-spacing="2">Purified water. Smart machines. Namibia.</text></svg>`),
        top: 520, left: 0,
      },
    ])
    .png()
    .toFile(join(OUT_IMG, "og-image.png"));
  log(`  og-image.png ${og.width}x${og.height} ${kb(join(OUT_IMG, "og-image.png"))}`);

  log("DONE");
}

main().catch((e) => { console.error(e); process.exit(1); });
