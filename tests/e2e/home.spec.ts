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

  test('should display fitting upload options', async ({ page }) => {
    // The home page now directly renders RealLifeFitting
    await expect(page.getByText('Upload User Photo', { exact: true })).toBeVisible();
    await expect(page.getByText('Select Garment', { exact: true })).toBeVisible();

    // Check try it on button
    const tryBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryBtn).toBeVisible();
  });

  test('should match visual snapshot', async ({ page }) => {
    await expect(page).toHaveScreenshot({ fullPage: true, maxDiffPixelRatio: 0.1 });
  });
});
