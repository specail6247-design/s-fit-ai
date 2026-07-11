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

  test('should display main elements', async ({ page }) => {
    // Check for presence of main UI elements since ModeSelector is removed
    const tryOnBtn = page.locator('button', { hasText: 'TRY IT ON' });
    await expect(tryOnBtn).toBeVisible();

    // Check for inputs
    await expect(page.locator('#user-upload')).toBeAttached();
    await expect(page.locator('#garment-upload')).toBeAttached();
  });

  test('should match visual snapshot', async ({ page }) => {
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
});
