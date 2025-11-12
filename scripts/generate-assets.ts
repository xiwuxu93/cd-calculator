// @ts-nocheck
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import toIco from 'to-ico';

const OUT = path.join(process.cwd(), 'public');

// Brand config (can tweak later)
const BRAND = {
  bg: '#ffffff',
  fg: '#0F172A', // slate-900
  primary: '#2563EB', // blue-600
  secondary: '#1D4ED8', // blue-700
};

function logoSVG(size: number) {
  const r = size / 2;
  const font = size * 0.44;
  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${BRAND.primary}"/>
        <stop offset="100%" stop-color="${BRAND.secondary}"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="${size}" height="${size}" rx="${Math.round(size*0.18)}" fill="url(#g)"/>
    <text x="50%" y="50%" font-family="-apple-system, Inter, Arial, sans-serif" font-weight="800" font-size="${font}" fill="#fff" text-anchor="middle" dominant-baseline="central">CD</text>
  </svg>`;
}

function ogSVG(w: number, h: number) {
  const title = 'CD Calculator';
  const subtitle = 'Free CD Interest Calculator';
  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#EFF6FF"/>
        <stop offset="100%" stop-color="#FFFFFF"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#bg)"/>
    <g transform="translate(80, 120)">
      <rect width="160" height="160" rx="28" fill="${BRAND.primary}"/>
      <text x="80" y="86" font-family="-apple-system, Inter, Arial, sans-serif" font-weight="800" font-size="72" fill="#fff" text-anchor="middle" dominant-baseline="central">CD</text>
    </g>
    <text x="280" y="170" font-family="-apple-system, Inter, Arial, sans-serif" font-weight="800" font-size="72" fill="${BRAND.fg}">${title}</text>
    <text x="280" y="240" font-family="-apple-system, Inter, Arial, sans-serif" font-weight="500" font-size="36" fill="#334155">${subtitle}</text>
    <text x="280" y="310" font-family="-apple-system, Inter, Arial, sans-serif" font-weight="400" font-size="28" fill="#475569">Calculate certificate of deposit (CD) interest and maturity value.</text>
  </svg>`;
}

async function main() {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

  // Icons from logo SVG
  const logoSvg = Buffer.from(logoSVG(512));
  await sharp(logoSvg).png().toFile(path.join(OUT, 'icon-512.png'));
  await sharp(logoSvg).resize(192, 192).png().toFile(path.join(OUT, 'icon-192.png'));
  await sharp(logoSvg).resize(32, 32).png().toFile(path.join(OUT, 'favicon-32.png'));

  // ICO (16, 32, 48)
  const icoBuffers = await Promise.all([
    sharp(logoSvg).resize(16,16).png().toBuffer(),
    sharp(logoSvg).resize(32,32).png().toBuffer(),
    sharp(logoSvg).resize(48,48).png().toBuffer(),
  ]);
  const ico = await toIco(icoBuffers);
  fs.writeFileSync(path.join(OUT, 'favicon.ico'), ico);

  // OG image
  const ogSvg = Buffer.from(ogSVG(1200, 630));
  await sharp(ogSvg).png().toFile(path.join(OUT, 'og-image.png'));

  console.log('Generated branding assets in public/.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
