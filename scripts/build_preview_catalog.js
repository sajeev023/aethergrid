const fs = require('fs');
const path = require('path');

const analysisPath = path.join(__dirname, '..', 'scratch', 'pic_analysis.json');
const analysis = JSON.parse(fs.readFileSync(analysisPath, 'utf8'));

let html = `<!DOCTYPE html>
<html>
<head>
<title>All Pics Catalog</title>
<style>
  body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; padding: 20px; }
  h1 { text-align: center; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
  .card { background: #1e293b; border-radius: 8px; overflow: hidden; border: 1px solid #334155; padding: 12px; }
  .card img { width: 100%; height: 200px; object-fit: cover; border-radius: 6px; }
  .title { font-weight: bold; margin: 8px 0 4px 0; font-size: 14px; color: #38bdf8; word-break: break-all; }
  .meta { font-size: 12px; color: #94a3b8; }
  .badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: bold; background: #0284c7; color: white; margin-top: 5px; }
  .dup { background: #ef4444; }
</style>
</head>
<body>
  <h1>All Pics Inspection Catalog (${analysis.totalFiles} files total, ${analysis.uniqueFiles} unique)</h1>
  <div class="grid">
`;

analysis.items.forEach(item => {
  if (item.isDuplicate) {
    html += `
      <div class="card" style="opacity:0.5">
        <div class="title">#${item.index} ${item.filename}</div>
        <div class="meta">DUPLICATE OF ${item.duplicateOf}</div>
        <span class="badge dup">DUPLICATE</span>
      </div>
    `;
    return;
  }

  const relPreview = 'previews/' + path.basename(item.previewPath);
  html += `
    <div class="card">
      <img src="${relPreview}" alt="${item.filename}">
      <div class="title">#${item.index} ${item.filename}</div>
      <div class="meta">${item.width}x${item.height} (${item.aspectRatio}) | ${item.sizeMB} MB</div>
      <span class="badge">#${item.index}</span>
    </div>
  `;
});

html += `
  </div>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, '..', 'scratch', 'catalog.html'), html);
console.log('Catalog generated at scratch/catalog.html');
