/**
 * Regenerate public/images/og-image.png from the official horizontal SVG.
 * Navy field, teal accent rule, horizontal lockup rendered solid white
 * (the approved dark-background treatment), caption band with the tagline.
 * Usage: node scripts/og_regen.mjs  (from the repo root)
 */
import { createRequire } from "node:module";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const TAGLINE = "Water where people are.";
const SVG = join(process.cwd(), "public", "images", "svg", "smart-h2o-logo-horizontal.svg");
const OUT = join(process.cwd(), "public", "images", "og-image.png");

// Render the vector lockup at high resolution
const logoPng = await sharp(SVG, { density: 150 }).resize({ width: 880 }).png().toBuffer();
const meta = await sharp(logoPng).metadata();

// Solid white silhouette: white canvas masked by the logo alpha (dest-in)
const whiteLogo = await sharp({
  create: {
    width: meta.width,
    height: meta.height,
    channels: 4,
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  },
})
  .composite([{ input: logoPng, blend: "dest-in" }])
  .png()
  .toBuffer();

const outWidth = Math.min(1000, meta.width);
const outHeight = Math.round(meta.height * (outWidth / meta.width));
const whiteScaled = await sharp(whiteLogo).resize({ width: outWidth }).png().toBuffer();

await sharp({
  create: { width: 1200, height: 630, channels: 4, background: { r: 2, g: 23, b: 47, alpha: 1 } },
})
  .composite([
    // teal accent rule
    {
      input: Buffer.from(
        `<svg width="1200" height="630"><rect x="0" y="626" width="1200" height="4" fill="#0CA2AB"/></svg>`
      ),
      top: 0,
      left: 0,
    },
    // white lockup centred above the caption band
    {
      input: whiteScaled,
      top: Math.round(630 / 2 - outHeight / 2 - 30),
      left: Math.round((1200 - outWidth) / 2),
    },
    // caption
    {
      input: Buffer.from(
        `<svg width="1200" height="60"><text x="600" y="40" font-family="DejaVu Sans, sans-serif" font-size="26" fill="#F3F7F8" text-anchor="middle" letter-spacing="2">${TAGLINE}</text></svg>`
      ),
      top: 520,
      left: 0,
    },
  ])
  .png()
  .toFile(OUT);

const done = await sharp(OUT).metadata();
console.log(`og-image.png regenerated ${done.width}x${done.height}, white lockup from SVG, tagline: "${TAGLINE}"`);
