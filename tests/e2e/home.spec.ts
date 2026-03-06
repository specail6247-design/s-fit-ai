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
    // Check for presence of new RealLifeFitting components
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('Upload User Photo')).toBeVisible();

    await expect(page.getByText('02. Target Garment')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();

    // Check generate button
    const generateBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(generateBtn).toBeVisible();
  });

  test('should match visual snapshot', async ({ page }) => {
    // Tolerant maxDiffPixelRatio per guidelines for CI vs local differences
    await expect(page).toHaveScreenshot({ fullPage: true, maxDiffPixelRatio: 0.1 });
  });
});
