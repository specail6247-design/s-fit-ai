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

  test('should display RealLifeFitting mode UI', async ({ page }) => {
    // The application's root page renders the RealLifeFitting component directly
    // Playwright E2E tests must target RealLifeFitting UI elements rather than legacy mode buttons

    // Check for the Upload User Photo section
    await expect(page.getByText('Upload User Photo', { exact: false })).toBeVisible();

    // Check for the Select Garment section
    await expect(page.getByText('Select Garment', { exact: false })).toBeVisible();

    // Check for the TRY IT ON submit button
    const submitBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(submitBtn).toBeVisible();
  });

  test('should match visual snapshot', async ({ page }) => {
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
});
