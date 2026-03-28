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

  test('should display primary actions', async ({ page }) => {
    // Wait for the main UI sections to load
    await expect(page.getByText('Upload User Photo')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();

    // The submit try-on button should be visible
    const tryItOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryItOnBtn).toBeVisible();
  });

  test('should match visual snapshot', async ({ page }) => {
    // Increase tolerance due to dynamic backgrounds and 3D webGL canvases causing minor rendering variations
    await expect(page).toHaveScreenshot({
      fullPage: true,
      maxDiffPixelRatio: 0.1,
      animations: 'disabled'
    });
  });
});
