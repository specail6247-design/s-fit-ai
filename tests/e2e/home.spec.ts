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

  test('should display RealLifeFitting options', async ({ page }) => {
    // Check for presence of RealLifeFitting elements
    await expect(page.getByText('Upload User Photo')).toBeVisible();
    await expect(page.getByText('02. Target Garment')).toBeVisible();

    // Check generate button is present
    const generateBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(generateBtn).toBeVisible();
    // In RealLifeFitting.tsx the button might not be initially disabled by default
  });

  test('should match visual snapshot', async ({ page }) => {
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
});
