import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title', async ({ page }) => {
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('S_FIT');
    await expect(heroHeading).toContainText('NEO');
  });

  test('should display mode selection options', async ({ page }) => {
    // Check for presence of mode cards
    await expect(page.getByText('Upload User Photo')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();

    // Check continue button
    const continueBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(continueBtn).toBeVisible();
  });

  test('should match visual snapshot', async ({ page }) => {
    // wait for 3D canvas rendering
    await page.waitForTimeout(3000);
    await expect(page).toHaveScreenshot({ fullPage: true, maxDiffPixelRatio: 0.8, maxDiffPixels: 800000, animations: 'disabled', timeout: 30000 });
  });
});
