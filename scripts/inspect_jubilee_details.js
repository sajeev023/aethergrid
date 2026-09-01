const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const gjDir = path.join(__dirname, '..', 'public', 'images', 'golden-jubilee');
const sjDir = path.join(__dirname, '..', 'public', 'images', 'silver-jubilee');

async function inspectImages() {
  console.log('--- GOLDEN JUBILEE (33 IMAGES) ---');
  const gjFiles = fs.readdirSync(gjDir).sort((a, b) => {
    const numA = parseInt(a.replace(/[^0-9]/g, '')) || 0;
    const numB = parseInt(b.replace(/[^0-9]/g, '')) || 0;
    return numA - numB;
  });

  for (const f of gjFiles) {
    const p = path.join(gjDir, f);
    const meta = await sharp(p).metadata();
    const stat = fs.statSync(p);
    console.log(`${f}: ${meta.width}x${meta.height}, ${(stat.size/1024).toFixed(1)} KB`);
  }

  console.log('\n--- SILVER JUBILEE (19 IMAGES) ---');
  const sjFiles = fs.readdirSync(sjDir).sort();
  for (const f of sjFiles) {
    const p = path.join(sjDir, f);
    const meta = await sharp(p).metadata();
    const stat = fs.statSync(p);
    console.log(`${f}: ${meta.width}x${meta.height}, ${(stat.size/1024).toFixed(1)} KB`);
  }
}

inspectImages();
