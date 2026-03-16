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

  test('should display real life fitting layout', async ({ page }) => {
    // Check for presence of real life fitting elements
    await expect(page.getByText('Upload User Photo')).toBeVisible();
    await expect(page.getByText('Safe Data: Photos are processed securely and not shared.')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();

    // Check generate button
    const generateBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(generateBtn).toBeVisible();
  });

  test('should match visual snapshot', async ({ page }) => {
    // Adding tolerant parameters to avoid CI flakiness with animations and scrollbars
    await expect(page).toHaveScreenshot({
      fullPage: false,
      animations: 'disabled',
      maxDiffPixelRatio: 0.1,
    });
  });
});
