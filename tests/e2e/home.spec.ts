import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title', async ({ page }) => {
    // Check for the main brand title in the header
    const heroHeading = page.locator('h1').first();
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('S_FIT');
  });

  test('should display mode selection options', async ({ page }) => {
    // Check for presence of RealLifeFitting inputs and buttons
    await expect(page.getByText('Upload User Photo')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();

    // Check action buttons
    const tryItOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryItOnBtn).toBeVisible();

    // Check external links for SPA and Luxury
    await expect(page.getByText('SPA Line', { exact: true })).toBeVisible();
    await expect(page.getByText('Luxury Line', { exact: true })).toBeVisible();
  });

  test('should match visual snapshot', async ({ page }) => {
    // Wait for the main button to be visible to ensure page is loaded
    await expect(page.getByRole('button', { name: /TRY IT ON/i })).toBeVisible();
    // Wait a moment for any initial entrance animations to settle
    await page.waitForTimeout(1000);
    // Use the specific class for fullPage to avoid issues with absolute/h-screen layouts
    await expect(page).toHaveScreenshot({ fullPage: true, maxDiffPixelRatio: 0.1, animations: 'disabled' });
  });
});
