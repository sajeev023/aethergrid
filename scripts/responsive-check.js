// Responsive visual audit: capture full-page JPEGs at common breakpoints
// and record horizontal overflow / console error counts per page.
const { chromium } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const OUT_DIR = path.join(process.cwd(), "responsive-screenshots");

const ROUTES = [
  "/",
  "/about",
  "/academics",
  "/faculty",
  "/faculty/teaching",
  "/faculty/principals",
  "/faculty/retired",
  "/campus",
  "/campus/campus-life",
  "/campus/silver-jubilee",
  "/campus/golden-jubilee",
  "/admissions",
  "/alumni",
  "/contact",
  "/parent-login",
  "/legal/anti-ragging",
  "/legal/privacy",
  "/legal/terms",
  "/legal/disclosures",
  "/legal/refund-cancellation",
  "/gallery",
];

const BREAKPOINTS = [
  { width: 320, height: 568, label: "mobile-sm" },
  { width: 375, height: 667, label: "mobile" },
  { width: 768, height: 1024, label: "tablet" },
  { width: 1024, height: 768, label: "laptop" },
  { width: 1440, height: 900, label: "desktop" },
  { width: 1920, height: 1080, label: "desktop-xl" },
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
