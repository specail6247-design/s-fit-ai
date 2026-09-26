const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Wait a bit to ensure the server is ready
  await new Promise(r => setTimeout(r, 2000));

  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');

  // Verify SupportHub drawer
  const supportButton = page.locator('button[aria-label="Support Hub"]');
  if (await supportButton.count() > 0) {
    console.log("Support Hub button found.");
    await supportButton.click();
    await page.waitForTimeout(1000); // Wait for animation

    // Check if the drawer content is visible
    const drawerTitle = page.locator('h3:has-text("Support Hub")');
    if (await drawerTitle.count() > 0 && await drawerTitle.isVisible()) {
      console.log("Support Hub drawer opened and is visible.");
      await page.screenshot({ path: 'frontend_verify_support.png' });
    } else {
      console.log("Support Hub drawer title not found or not visible.");
    }
  } else {
    console.log("Support Hub button NOT found.");
  }

  await browser.close();
})();
