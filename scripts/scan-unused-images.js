/**
 * Scan for unused public images.
 * Compares every /images/... reference in source files against files in public/images.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const IMAGE_DIR = path.join(ROOT, "public", "images");

function findReferencedImages(dir) {
  const referenced = new Set();
  const patterns = [
    /src=\{?["'](\/images\/[^"']+)["']\}?/g,
    /["'](\/images\/[^"']+\.(?:jpg|jpeg|png|webp|avif|gif|svg))["']/gi,
    /url\(["']?(\/images\/[^"')]+)["']?\)/g,
  ];

  function walk(current) {
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "node_modules" || entry.name === ".next" || entry.name === ".git") continue;
        walk(full);
      } else if (/\.(tsx|ts|jsx|js|css|mdx|json|md)$/.test(entry.name)) {
        const content = fs.readFileSync(full, "utf-8");
        for (const regex of patterns) {
          let m;
          while ((m = regex.exec(content)) !== null) referenced.add(m[1].split("?")[0].split("#")[0]);
        }
      }
    }
  }

  walk(dir);
  return Array.from(referenced);
}

function findExistingImages(dir) {
  const existing = new Set();
  function walk(current) {
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (/\.(jpg|jpeg|png|webp|avif|gif|svg)$/i.test(entry.name)) {
        existing.add("/images/" + path.relative(dir, full).replace(/\\/g, "/"));
      }
    }
  }
  walk(dir);
  return existing;
}

const referenced = findReferencedImages(ROOT);
const existing = findExistingImages(IMAGE_DIR);
const missing = referenced.filter((img) => !existing.has(img));
const unused = Array.from(existing).filter((img) => !referenced.includes(img));

console.log(`Referenced images: ${referenced.length}`);
console.log(`Existing images:   ${existing.size}`);
console.log(`Missing referenced images: ${missing.length}`);
for (const img of missing) console.log(`  MISSING ${img}`);
console.log(`\nUnused public images: ${unused.length}`);
for (const img of unused.sort()) console.log(`  ${img}`);
