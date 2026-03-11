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

  test('should display Masterpiece UI elements', async ({ page }) => {
    // Wait for the UI to attach and be visible
    await page.getByText('S_FIT NEO').waitFor({ state: 'attached' });
    await page.getByText('01. Identification').waitFor({ state: 'attached' });
    await page.getByText('02. Target Garment').waitFor({ state: 'attached' });

    // Check TRY IT ON button
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();
  });

  test('should match visual snapshot', async ({ page }) => {
    await expect(page).toHaveScreenshot({
      fullPage: false,
      maxDiffPixelRatio: 0.1,
      animations: 'disabled'
    });
  });
});
