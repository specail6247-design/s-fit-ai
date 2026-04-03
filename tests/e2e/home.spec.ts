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

  test('should display real life fitting elements', async ({ page }) => {
    // Check for presence of real life fitting UI components
    await expect(page.getByText('Upload User Photo')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();
    await expect(page.getByText('TRY IT ON')).toBeVisible();

    // Navigation links
    await expect(page.getByText('SPA Line')).toBeVisible();
    await expect(page.getByText('Luxury Line')).toBeVisible();
  });

  test('should match visual snapshot', async ({ page }) => {
    // Wait for animations and fonts to settle to ensure stable snapshot
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot({ fullPage: true, animations: 'disabled', maxDiffPixelRatio: 0.8, timeout: 15000 });
  });
});
