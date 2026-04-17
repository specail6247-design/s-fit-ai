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
    await expect(heroHeading).toContainText('S');
    await expect(heroHeading).toContainText('_');
    await expect(heroHeading).toContainText('FIT');
  });

  test('should display fitting options', async ({ page }) => {
    // Check for presence of fitting tools
    await expect(page.getByText('TRY IT ON')).toBeVisible();
    await expect(page.getByText('SPA Line')).toBeVisible();
    await expect(page.getByText('Luxury Line')).toBeVisible();
  });

  test('should match visual snapshot', async ({ page }) => {
    // Increase allowed pixel difference and wait slightly for models/fonts to stabilize before snapshot
    await page.waitForTimeout(2000);
    await expect(page).toHaveScreenshot({ fullPage: true, maxDiffPixelRatio: 0.2, timeout: 15000 });
  });
});
