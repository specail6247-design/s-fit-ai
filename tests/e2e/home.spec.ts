import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title', async ({ page }) => {
    // The title in layout or metadata might be different, but let's check for visual text first
    // or just check that page loads.
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('S_FIT');
    await expect(heroHeading).toContainText('NEO');
  });

  test('should match visual snapshot', async ({ page }) => {
    // Await for animation load to be done
    await page.waitForTimeout(1000);
    // Disable animations specifically for the snapshot
    await expect(page).toHaveScreenshot({ fullPage: true, maxDiffPixelRatio: 0.2, threshold: 0.3, animations: "disabled" });
  });
});
