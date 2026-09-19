import { test } from "@playwright/test";
import fs from "fs";
import path from "path";

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
