const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDir = 'C:\\Users\\LFDC\\Downloads\\lfjc pics';
const outputDir = path.join(__dirname, '..', 'public', 'images', 'sports_preview');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
  if (!fs.existsSync(targetDir)) {
    console.error('Directory does not exist:', targetDir);
    return;
  }
  const files = fs.readdirSync(targetDir);
  console.log(`Found ${files.length} files in ${targetDir}`);

  const results = [];
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const fullPath = path.join(targetDir, f);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) continue;

    try {
      const meta = await sharp(fullPath).metadata();
      const previewName = `preview_${f.toLowerCase().replace(/[^a-z0-9_.]/g, '_')}.jpg`;
      const previewPath = path.join(outputDir, previewName);

      // Generate 1200px preview
      await sharp(fullPath)
        .rotate() // auto-orient based on EXIF
        .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 85, mozjpeg: true })
        .toFile(previewPath);

      results.push({
        filename: f,
        previewUrl: `/images/sports_preview/${previewName}`,
        sizeMB: (stat.size / (1024 * 1024)).toFixed(2),
        origWidth: meta.width,
        origHeight: meta.height,
        aspectRatio: (meta.width / meta.height).toFixed(2),
        orientation: meta.orientation
      });
      console.log(`Processed ${f} (${meta.width}x${meta.height}) -> ${previewName}`);
    } catch (e) {
      console.error(`Error processing ${f}:`, e.message);
    }
  }

  // Create an HTML gallery catalog to easily review all photos
  let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>LFJC Sports Meet Photos Preview</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; margin: 0; padding: 24px; }
    h1 { color: #f59e0b; margin-bottom: 8px; }
    p.sub { color: #94a3b8; margin-bottom: 24px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 20px; }
    .card { background: #1e293b; border-radius: 12px; overflow: hidden; border: 1px solid #334155; }
    .card img { width: 100%; height: 260px; object-fit: cover; display: block; }
    .card-content { padding: 14px; }
    .filename { font-weight: bold; font-size: 15px; color: #38bdf8; margin-bottom: 6px; }
    .meta { font-size: 12px; color: #94a3b8; }
  </style>
</head>
<body>
  <h1>LFJC Sports Meet Image Previews</h1>
  <p class="sub">Total images: ${results.length}</p>
  <div class="grid">
`;

  for (const r of results) {
    html += `    <div class="card">
      <a href="${r.previewUrl}" target="_blank">
        <img src="${r.previewUrl}" alt="${r.filename}" loading="lazy">
      </a>
      <div class="card-content">
        <div class="filename">${r.filename}</div>
        <div class="meta">${r.origWidth}x${r.origHeight} px | ${r.sizeMB} MB | Aspect: ${r.aspectRatio}</div>
      </div>
    </div>\n`;
  }

  html += `  </div>
</body>
</html>`;

  fs.writeFileSync(path.join(__dirname, '..', 'public', 'sports_preview.html'), html);
  console.log('Saved sports_preview.html');
}

run();
