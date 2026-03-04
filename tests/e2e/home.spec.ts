import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct headers', async ({ page }) => {
    const heroHeading = page.locator('h1').first();
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('S_FIT NEO');
  });

  test('should display identification and fitting steps', async ({ page }) => {
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('02. Target Garment')).toBeVisible();
    await expect(page.getByText('Upload User Photo')).toBeVisible();
    // Use locator for Upload Target instead of text if text is broken up
    const fileInputs = page.locator('input[type="file"]');
    await expect(fileInputs).toHaveCount(2);
  });

  test('should match visual snapshot', async ({ page }) => {
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
});
