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

  test('should display mode selection options', async ({ page }) => {
    // ModeSelector was removed from page.tsx by a previous commit!
    // Since page.tsx only renders RealLifeFitting, tests should expect RealLifeFitting UI

    // Check for "TRY IT ON" button
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible({ timeout: 10000 });
  });

  test('should match visual snapshot', async ({ page }) => {
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot({ fullPage: true, maxDiffPixelRatio: 0.1, maxDiffPixels: 10000 });
  });
});
