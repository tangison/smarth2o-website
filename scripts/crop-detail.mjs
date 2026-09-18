/** Precision detail crop from the real factory photo (screen/panel region). */
import sharp from "sharp";

const src = "/home/z/my-project/assets/agent-package/02-MACHINES/originals/smart-h2o-machine-branded-original.jpg";
// Screen area per VLM: top 18%, left 24%, w 34%, h 16% of 1152x1536
// -> x 276, y 276, w 392, h 245. Crop inside the panel so no lettering is sliced.
const left = 262, top = 240, width = 420, height = 300;

await sharp(src)
  .extract({ left, top, width, height })
  .resize({ width: 800 })
  .webp({ quality: 80, effort: 6 })
  .toFile("/home/z/my-project/public/images/machine-detail.webp");

const m = await sharp("/home/z/my-project/public/images/machine-detail.webp").metadata();
console.log("machine-detail.webp", m.width + "x" + m.height);
