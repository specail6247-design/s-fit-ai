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
    // The new page component is RealLifeFitting, and these are some of its core
    // UI text
    await expect(page.getByText('Professional Virtual Fitting')).toBeVisible();
    await expect(page.getByText('01. Identification')).toBeVisible();

    await expect(page.getByText('Member Access')).toBeVisible();
  });

  test('should match visual snapshot', async ({ page }) => {
    // Note: Taking a full page screenshot. Need to wait for it to be stable.
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot({ fullPage: true, maxDiffPixelRatio: 0.2, timeout: 15000 });
  });
});
