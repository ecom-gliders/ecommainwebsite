import sharp from "sharp";
import fs from "fs";

const SIZE = 512;
const RX = 112;

/** Letterforms only — no tile; we trim + center onto the rounded square. */
const lettersSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <path d="M88 350 C 150 200, 300 145, 420 200" fill="none" stroke="#C6F135" stroke-width="18" stroke-linecap="round" opacity="0.28"/>
  <text x="218" y="338" fill="#C6F135" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="286" font-weight="900" letter-spacing="-14">G</text>
  <text x="72" y="338" fill="#FFFFFF" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="286" font-weight="900" letter-spacing="-14">e</text>
</svg>`);

const lettersPng = await sharp(lettersSvg)
  .png()
  .ensureAlpha()
  .toBuffer();

const trimmed = await sharp(lettersPng).trim().png().toBuffer();
const trimMeta = await sharp(trimmed).metadata();

// Fit mark inside tile with even padding (~14% each side)
const padRatio = 0.14;
const maxMark = Math.round(SIZE * (1 - padRatio * 2));
const scale = Math.min(
  maxMark / (trimMeta.width || 1),
  maxMark / (trimMeta.height || 1),
);
const markW = Math.round((trimMeta.width || 1) * scale);
const markH = Math.round((trimMeta.height || 1) * scale);
// Optical nudge left: G mass reads heavier on the right
const left = Math.round((SIZE - markW) / 2) - 22;
const top = Math.round((SIZE - markH) / 2) - 4;

const markScaled = await sharp(trimmed)
  .resize(markW, markH, { fit: "fill", kernel: sharp.kernel.lanczos3 })
  .png()
  .toBuffer();

const tileSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}">
  <rect width="${SIZE}" height="${SIZE}" rx="${RX}" ry="${RX}" fill="#131311"/>
</svg>`);

const master = await sharp(tileSvg)
  .composite([{ input: markScaled, left, top }])
  .png()
  .ensureAlpha()
  .toBuffer();

const outs = [
  ["public/favicon.png", 512],
  ["public/images/brand/favicon.png", 512],
  ["assets/approved/eg-favicon-rounded.png", 512],
  ["public/favicon-32.png", 32],
  ["src/app/icon.png", 32],
  ["public/apple-touch-icon.png", 180],
];

for (const [file, size] of outs) {
  await sharp(master)
    .resize(size, size, { kernel: sharp.kernel.lanczos3 })
    .png()
    .ensureAlpha()
    .toFile(file);
  console.log("wrote", file, `(mark ${markW}x${markH} at ${left},${top})`);
}

const png32 = await sharp(master).resize(32, 32).png().ensureAlpha().toBuffer();
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
const entry = Buffer.alloc(16);
entry[0] = 32;
entry[1] = 32;
entry[2] = 0;
entry[3] = 0;
entry.writeUInt16LE(1, 4);
entry.writeUInt16LE(32, 6);
entry.writeUInt32LE(png32.length, 8);
entry.writeUInt32LE(22, 12);
fs.writeFileSync("public/favicon.ico", Buffer.concat([header, entry, png32]));
console.log("wrote public/favicon.ico");
