import { test } from "@playwright/test";
import fs from "fs";
import path from "path";

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

function slug(route: string) {
  return route.replace(/\//g, "_").replace(/^_$/, "home") || "home";
}

const results: {
  route: string;
  breakpoint: (typeof BREAKPOINTS)[number];
  overflow: number;
  consoleErrors: string[];
  screenshot: string;
  screenshotSizeKB: number;
}[] = [];

for (const route of ROUTES) {
  for (const bp of BREAKPOINTS) {
    test(`${route || "/"} @ ${bp.label} (${bp.width}px)`, async ({ page }) => {
      if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
      await page.setViewportSize({ width: bp.width, height: bp.height });

      const consoleErrors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text().slice(0, 240));
      });
      page.on("pageerror", (err) => consoleErrors.push(err.message.slice(0, 240)));

      await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle", timeout: 20000 });
      await page.waitForTimeout(1200);

      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      const overflow = scrollWidth - clientWidth;

      const routeDir = path.join(OUT_DIR, slug(route));
      if (!fs.existsSync(routeDir)) fs.mkdirSync(routeDir, { recursive: true });
      const screenshotPath = path.join(routeDir, `${bp.label}-${bp.width}.jpg`);
      await page.screenshot({ path: screenshotPath, fullPage: true, type: "jpeg", quality: 75 });
      const screenshotSizeKB = Math.round(fs.statSync(screenshotPath).size / 1024);

      results.push({ route, breakpoint: bp, overflow, consoleErrors, screenshot: screenshotPath, screenshotSizeKB });

      if (overflow > 0) {
        test.info().annotations.push({
          type: "responsive_overflow",
          description: `${route} @ ${bp.width}px: ${overflow}px`,
        });
      }
      if (consoleErrors.length > 0) {
        test.info().annotations.push({
          type: "console_errors",
          description: `${route} @ ${bp.width}px: ${consoleErrors.length} errors`,
        });
      }
    });
  }
}

test.afterAll(async () => {
  const overflows = results.filter((r) => r.overflow > 0);
  const withConsoleErrors = results.filter((r) => r.consoleErrors.length > 0);
  const summary = {
    total: results.length,
    overflows: overflows.length,
    consoleErrorInstances: withConsoleErrors.length,
    overflowDetails: overflows.map((r) => ({
      route: r.route,
      width: r.breakpoint.width,
      overflow: r.overflow,
    })),
    consoleErrorDetails: withConsoleErrors.map((r) => ({
      route: r.route,
      width: r.breakpoint.width,
      count: r.consoleErrors.length,
      sample: r.consoleErrors.slice(0, 3),
    })),
  };
  fs.writeFileSync(path.join(OUT_DIR, "responsive-report.json"), JSON.stringify({ summary, results }, null, 2), "utf-8");
  console.log("\n=== Responsive audit summary ===");
  console.log(JSON.stringify(summary, null, 2));
});
