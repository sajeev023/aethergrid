const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sharp = require('sharp');

const srcDir = 'C:\\Users\\LFDC\\Downloads\\all pic';
const previewDir = path.join(__dirname, '..', 'scratch', 'previews');

if (!fs.existsSync(previewDir)) {
  fs.mkdirSync(previewDir, { recursive: true });
}

function getMd5(filePath) {
  const buffer = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(buffer).digest('hex');
}

async function analyze() {
  const files = fs.readdirSync(srcDir);
  console.log(`Analyzing ${files.length} files...`);

  const hashes = {};
  const items = [];

  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    const fullPath = path.join(srcDir, filename);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) continue;

    const md5 = getMd5(fullPath);
    const isDuplicate = !!hashes[md5];
    if (!isDuplicate) {
      hashes[md5] = filename;
    }

    let meta = {};
    try {
      meta = await sharp(fullPath).metadata();
    } catch (e) {
      meta.error = e.message;
    }

    // Generate preview thumbnail (max width/height 800px)
    const previewPath = path.join(previewDir, filename.replace(/[\(\) ]/g, '_') + '.jpg');
    if (!isDuplicate && meta.width) {
      try {
        await sharp(fullPath)
          .resize({ width: 800, height: 800, fit: 'inside', autoOrient: true })
          .jpeg({ quality: 80 })
          .toFile(previewPath);
      } catch (err) {
        console.error(`Error resizing ${filename}:`, err.message);
      }
    }

    items.push({
      index: i + 1,
      filename,
      fullPath,
      sizeBytes: stat.size,
      sizeMB: (stat.size / 1024 / 1024).toFixed(2),
      width: meta.width || 0,
      height: meta.height || 0,
      aspectRatio: meta.width && meta.height ? (meta.width / meta.height).toFixed(2) : 0,
      format: meta.format || 'unknown',
      orientation: meta.orientation || 1,
      md5,
      isDuplicate,
      duplicateOf: isDuplicate ? hashes[md5] : null,
      previewPath: isDuplicate ? null : previewPath
    });
  }

  const summary = {
    totalFiles: items.length,
    uniqueFiles: items.filter(x => !x.isDuplicate).length,
    duplicatesCount: items.filter(x => x.isDuplicate).length,
    items
  };

  fs.writeFileSync(
    path.join(__dirname, '..', 'scratch', 'pic_analysis.json'),
    JSON.stringify(summary, null, 2)
  );

  console.log(`Analysis complete! Total: ${summary.totalFiles}, Unique: ${summary.uniqueFiles}, Duplicates: ${summary.duplicatesCount}`);
}

analyze();
