import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title and branding', async ({ page }) => {
    // Check for "S_FIT NEO"
    const brandHeading = page.locator('h1');
    await expect(brandHeading).toBeVisible();
    await expect(brandHeading).toContainText('S_FIT');
    await expect(brandHeading).toContainText('NEO');
  });

  test('should display main interaction elements', async ({ page }) => {
    // Check for "Professional Virtual Fitting"
    await expect(page.getByText('Professional Virtual Fitting')).toBeVisible();

    // Check for inputs
    await expect(page.getByText('Upload User Photo')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();

    // Check for action button (initially disabled or visible)
    // The button text is "TRY IT ON"
    await expect(page.getByText('TRY IT ON')).toBeVisible();
  });

  // Skipped: UI has completely changed, existing snapshots are invalid.
  // Re-enable when new baselines can be generated and committed.
  test.skip('should match visual snapshot', async ({ page }) => {
    await expect(page).toHaveScreenshot({ fullPage: true, maxDiffPixelRatio: 0.2 });
  });
});
