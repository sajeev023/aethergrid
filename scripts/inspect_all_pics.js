const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDir = 'C:\\Users\\LFDC\\Downloads\\all pic';

async function inspectPics() {
  if (!fs.existsSync(targetDir)) {
    console.error('Target dir does not exist:', targetDir);
    return;
  }
  const files = fs.readdirSync(targetDir);
  console.log(`Found ${files.length} files in ${targetDir}\n`);

  const results = [];

  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const fullPath = path.join(targetDir, f);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) continue;

    try {
      const metadata = await sharp(fullPath).metadata();
      results.push({
        filename: f,
        fullPath: fullPath,
        sizeMB: (stat.size / 1024 / 1024).toFixed(2),
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
        aspectRatio: (metadata.width / metadata.height).toFixed(2),
        orientation: metadata.orientation || 1
      });
    } catch (e) {
      results.push({
        filename: f,
        fullPath: fullPath,
        sizeMB: (stat.size / 1024 / 1024).toFixed(2),
        error: e.message
      });
    }
  }

  console.log(JSON.stringify(results, null, 2));
}

inspectPics();
