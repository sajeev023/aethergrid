import { chromium } from "@playwright/test";

async function capture() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1200 } });

  await page.goto("http://localhost:3000/faculty/retired", { waitUntil: "networkidle" });

  // 1. Cards top
  await page.screenshot({
    path: "C:/Users/ADMIN/.gemini/antigravity-ide/brain/89a3151d-bf28-46f9-b85b-9a77503de5d7/retired_cards_top.png",
  });
  console.log("Saved retired_cards_top.png");

  // 2. Cards bottom (scroll to view S.No. 36-39)
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: "C:/Users/ADMIN/.gemini/antigravity-ide/brain/89a3151d-bf28-46f9-b85b-9a77503de5d7/retired_cards_bottom.png",
  });
  console.log("Saved retired_cards_bottom.png");

  // 3. Register table view
  await page.evaluate(() => window.scrollTo(0, 300));
  await page.click('button[aria-label="Register table view"]');
  await page.waitForTimeout(400);
  await page.screenshot({
    path: "C:/Users/ADMIN/.gemini/antigravity-ide/brain/89a3151d-bf28-46f9-b85b-9a77503de5d7/retired_register_table.png",
  });
  console.log("Saved retired_register_table.png");

  // 4. Lightbox modal
  await page.click('button[aria-label="Cards view"]');
  await page.waitForTimeout(300);
  const firstPhoto = await page.$('button[aria-label*="S.No. 1"]');
  if (firstPhoto) {
    await firstPhoto.click();
    await page.waitForTimeout(400);
    await page.screenshot({
      path: "C:/Users/ADMIN/.gemini/antigravity-ide/brain/89a3151d-bf28-46f9-b85b-9a77503de5d7/retired_lightbox_modal.png",
    });
    console.log("Saved retired_lightbox_modal.png");
  }

  await browser.close();
  console.log("ALL PLAYWRIGHT TESTS COMPLETE!");
}

capture().catch((err) => {
  console.error("Capture failed:", err);
  process.exit(1);
});
