const sharp = require('sharp');

async function analyzeRows() {
  const img1 = await sharp('C:/Users/LFDC/.gemini/antigravity-ide/brain/03a8720b-c874-494a-b6da-6c3a4fc26473/media__1787026204094.jpg').raw().toBuffer({ resolveWithObject: true });
  const w = img1.info.width;
  const h = img1.info.height;

  console.log('--- Image 1 Vertical Sample (x=136) ---');
  for (let y = 190; y < 580; y += 5) {
    const idx = (y * w + 136) * 3;
    const r = img1.data[idx];
    const g = img1.data[idx+1];
    const b = img1.data[idx+2];
    // Print lines where non-white background appears
    if (r < 240 || g < 240 || b < 240) {
      console.log(`y=${y}: RGB(${r},${g},${b})`);
    }
  }

  const img2 = await sharp('C:/Users/LFDC/.gemini/antigravity-ide/brain/03a8720b-c874-494a-b6da-6c3a4fc26473/media__1787026217657.jpg').raw().toBuffer({ resolveWithObject: true });
  console.log('--- Image 2 Vertical Sample (x=108) ---');
  for (let y = 190; y < 580; y += 5) {
    const idx = (y * w + 108) * 3;
    const r = img2.data[idx];
    const g = img2.data[idx+1];
    const b = img2.data[idx+2];
    if (r < 240 || g < 240 || b < 240) {
      console.log(`y=${y}: RGB(${r},${g},${b})`);
    }
  }
}

analyzeRows().catch(err => console.error(err));
