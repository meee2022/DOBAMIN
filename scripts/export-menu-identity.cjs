const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');

// Image editing is performed with Imagegen. This script only copies originals
// and compresses/resizes the reviewed results, without cropping or retouching.
async function main() {
  const root = path.resolve(__dirname, '..');
  const job = JSON.parse(await fs.readFile(path.join(root, 'output/menu-identity-photo-job.json'), 'utf8'));
  if (job.items.length !== 24 || job.items.some(p => !p.generatedSource || !p.review)) {
    throw new Error('Expected all 24 reviewed menu photos before exporting');
  }
  const originalDir = path.join(job.folder, '01 - الأصلية PNG - Originals');
  const uploadDir = path.join(job.folder, '02 - للموقع WebP - Website');
  const assetDir = path.join(root, 'assets/menu/identity-2026-11-06');
  for (const dir of [originalDir, uploadDir, assetDir]) await fs.mkdir(dir, { recursive: true });
  const items = [];
  for (const p of job.items) {
    const name = `${String(p.number).padStart(2, '0')} - ${p.ar} - ${p.en}`.replace(/[<>:"/\\|?*]/g, '-');
    const original = path.join(originalDir, name + '.png');
    const upload = path.join(uploadDir, name + '.webp');
    const asset = path.join(assetDir, p.id + ' - ' + p.ar + '.webp');
    await fs.copyFile(p.generatedSource, original);
    const image = await sharp(p.generatedSource).rotate().resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true }).webp({ quality: 88 }).toBuffer();
    await fs.writeFile(upload, image);
    await fs.writeFile(asset, image);
    const meta = await sharp(image).metadata();
    items.push({ id: p.id, ar: p.ar, en: p.en, file: path.relative(root, asset).replaceAll('\\', '/'), original: path.relative(root, original).replaceAll('\\', '/'), width: meta.width, height: meta.height, bytes: image.length, review: p.review });
  }
  let catalog = await fs.readFile(path.join(root, 'src/catalog.ts'), 'utf8');
  let index = 0;
  catalog = catalog.replace(/image: require\('[^']+'\)/g, () => `image: require('../${items[index++].file}')`);
  if (index !== items.length) throw new Error('Catalog image count mismatch');
  await fs.writeFile(path.join(root, 'src/catalog.ts'), catalog);
  const manifest = { date: job.date, tool: job.tool, scope: job.scope, style: 'Sunlit ivory/sage boutique, pale Nardo limestone, powder-blue linen, sage and blue ceramic plates; authentic food colors.', cupReference: 'branding/approved-cups.json', export: '1200px WebP quality 88; resize/compression only; no cropping', items };
  await fs.writeFile(path.join(root, 'branding/menu-photography.json'), JSON.stringify(manifest, null, 2) + '\n');
  await fs.writeFile(path.join(job.folder, 'manifest.json'), JSON.stringify({ ...manifest, prompts: job.items.map(p => ({ id: p.id, prompt: p.prompt, correctionPrompt: p.correctionPrompt })) }, null, 2) + '\n');
  console.log(JSON.stringify({ count: items.length, totalBytes: items.reduce((n, p) => n + p.bytes, 0), folder: job.folder, assets: path.relative(root, assetDir) }));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
