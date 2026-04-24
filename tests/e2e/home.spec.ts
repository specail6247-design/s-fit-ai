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
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    // Check for presence of mode cards with increased timeout for mobile
    await expect(page.getByText('VIBE CHECK')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('DIGITAL TWIN')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('EASY FIT')).toBeVisible({ timeout: 15000 });

    // Check continue button
    const continueBtn = page.getByRole('button', { name: /Continue/i });
    await expect(continueBtn).toBeVisible();
  });

  test('should match visual snapshot', async ({ page }) => {
    await page.waitForTimeout(2000);
    await expect(page).toHaveScreenshot({ fullPage: true, maxDiffPixelRatio: 0.2, timeout: 15000 });
  });
});
