/**
 * LFJC Website Production Audit Verification Script
 * Checks that all public routes return HTTP 200 and that no referenced images are missing.
 * Run against a local production server (default http://localhost:3000).
 */

const fs = require("fs");
const path = require("path");

const BASE_URL = process.env.AUDIT_BASE_URL || "http://localhost:3000";

const ROUTES = [
  "/",
  "/about",
  "/academics",
  "/faculty",
  "/faculty/teaching",
  "/faculty/principals",
  "/faculty/retired",
  "/campus/silver-jubilee",
  "/campus/golden-jubilee",
  "/campus/campus-life",
  "/admissions",
  "/alumni",
  "/gallery",
  "/contact",
  "/parent-login",
  "/legal/anti-ragging",
  "/legal/privacy",
  "/legal/terms",
  "/legal/disclosures",
  "/legal/refund-cancellation",
  "/robots.txt",
  "/sitemap.xml",
];

async function fetchWithStatus(url) {
  try {
    const res = await fetch(url, { redirect: "manual" });
    return { url, status: res.status, ok: res.status === 200 };
  } catch (err) {
    return { url, status: 0, ok: false, error: err.message };
  }
}

function findReferencedImages(dir, extensions = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".svg"]) {
  const referenced = new Set();
  const srcRegex = /src=\{?["'](\/images\/[^"']+)["']\}?/g;
  const urlRegex = /["'](\/images\/[^"']+\.(?:jpg|jpeg|png|webp|avif|gif|svg))["']/g;

  function walk(current) {
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (/\.(tsx|ts|jsx|js|css|mdx)$/.test(entry.name)) {
        const content = fs.readFileSync(full, "utf-8");
        let m;
        while ((m = srcRegex.exec(content)) !== null) referenced.add(m[1]);
        while ((m = urlRegex.exec(content)) !== null) referenced.add(m[1]);
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

async function main() {
  console.log(`LFJC Production Audit Verification`);
  console.log(`Base URL: ${BASE_URL}\n`);

  // Route check
  console.log(`Checking ${ROUTES.length} public routes...`);
  const routeResults = await Promise.all(ROUTES.map((r) => fetchWithStatus(`${BASE_URL}${r}`)));
  let routePassed = 0;
  let routeFailed = 0;
  for (const r of routeResults) {
    if (r.ok) {
      routePassed++;
      console.log(`  [PASS 200] ${r.url}`);
    } else {
      routeFailed++;
      console.log(`  [FAIL ${r.status}] ${r.url}${r.error ? ` — ${r.error}` : ""}`);
    }
  }

  // Image reference check
  const referenced = findReferencedImages(path.join(__dirname, ".."));
  const existing = findExistingImages(path.join(__dirname, "../public/images"));
  const missing = referenced.filter((img) => !existing.has(img));
  const unused = Array.from(existing).filter((img) => !referenced.includes(img));

  console.log(`\nReferenced images: ${referenced.length}`);
  console.log(`Existing images:   ${existing.size}`);
  if (missing.length) {
    console.log(`Missing referenced images: ${missing.length}`);
    for (const img of missing) console.log(`  MISSING ${img}`);
  } else {
    console.log(`Missing referenced images: 0`);
  }

  console.log(`\nUnused public images: ${unused.length}`);
  if (unused.length <= 20) {
    for (const img of unused) console.log(`  UNUSED ${img}`);
  } else {
    console.log(`  (first 20)`);
    for (const img of unused.slice(0, 20)) console.log(`  UNUSED ${img}`);
  }

  console.log(`\nSummary: ${routePassed}/${ROUTES.length} routes OK, ${missing.length} missing images, ${unused.length} unused images.`);
  process.exit(routeFailed > 0 || missing.length > 0 ? 1 : 0);
}

main();
