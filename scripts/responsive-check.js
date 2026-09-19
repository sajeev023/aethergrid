// Responsive visual audit: capture full-page JPEGs at common breakpoints
// and record horizontal overflow / console error counts per page.
const { chromium } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const OUT_DIR = path.join(process.cwd(), "responsive-screenshots");

const ROUTES = [
  "/",
  "/login",
  "/signup",
  "/dashboard",
  "/giver",
  "/giver/setup",
  "/mobile-simulator",
];

const BREAKPOINTS = [
  { width: 320, height: 568, label: "mobile-320" },
  { width: 360, height: 640, label: "mobile-360" },
  { width: 375, height: 667, label: "mobile-375" },
  { width: 390, height: 844, label: "mobile-390" },
  { width: 414, height: 896, label: "mobile-414" },
  { width: 430, height: 932, label: "mobile-430" },
  { width: 768, height: 1024, label: "tablet-768" },
  { width: 1280, height: 800, label: "desktop-1280" },
];

function slug(route) {
  return route.replace(/\//g, "_").replace(/^_$/, "home") || "home";
}

async function run() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const route of ROUTES) {
    const routeResults = [];
    for (const bp of BREAKPOINTS) {
      const context = await browser.newContext({
        viewport: { width: bp.width, height: bp.height },
        deviceScaleFactor: 1,
      });
      const page = await context.newPage();
      const consoleErrors = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") {
          consoleErrors.push(msg.text().substring(0, 200));
        }
      });
      page.on("pageerror", (err) => {
        consoleErrors.push(err.message.substring(0, 200));
      });

      const url = `${BASE_URL}${route}`;
      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 20000 });
        // Wait for any lazy / animated hero content to settle
        await page.waitForTimeout(1200);

        const { scrollWidth, clientWidth, innerWidth } = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          innerWidth: window.innerWidth,
        }));
        const overflow = scrollWidth - clientWidth;

        const routeDir = path.join(OUT_DIR, slug(route));
        if (!fs.existsSync(routeDir)) fs.mkdirSync(routeDir, { recursive: true });
        const fileName = `${bp.label}-${bp.width}.jpg`;
        const filePath = path.join(routeDir, fileName);
        await page.screenshot({ path: filePath, fullPage: true, type: "jpeg", quality: 75 });
        const sizeKB = Math.round(fs.statSync(filePath).size / 1024);

        routeResults.push({
          route,
          breakpoint: bp,
          url,
          overflow,
          consoleErrors: consoleErrors.length,
          screenshot: filePath,
          sizeKB,
        });
      } catch (err) {
        routeResults.push({
          route,
          breakpoint: bp,
          url,
          error: err.message,
          consoleErrors: consoleErrors.length,
        });
      } finally {
        await context.close();
      }
    }
    results.push(...routeResults);
  }

  await browser.close();

  const summary = {
    total: results.length,
    errors: results.filter((r) => r.error).length,
    overflows: results.filter((r) => r.overflow > 0).map((r) => ({
      route: r.route,
      width: r.breakpoint.width,
      overflow: r.overflow,
    })),
    consoleErrors: results.filter((r) => r.consoleErrors > 0).map((r) => ({
      route: r.route,
      width: r.breakpoint.width,
      count: r.consoleErrors,
    })),
  };

  const reportPath = path.join(OUT_DIR, "responsive-report.json");
  fs.writeFileSync(reportPath, JSON.stringify({ summary, results }, null, 2), "utf-8");

  console.log("Responsive audit complete.");
  console.log(`Total captures: ${summary.total}`);
  console.log(`Navigation errors: ${summary.errors}`);
  console.log(`Pages with horizontal overflow: ${summary.overflows.length}`);
  console.log(`Pages with console errors: ${summary.consoleErrors.length}`);
  console.log(`Report: ${reportPath}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
