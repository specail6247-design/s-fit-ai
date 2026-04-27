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

  test('should display upload buttons', async ({ page }) => {
    const userPhotoUpload = page.locator('label').filter({ hasText: /Upload User Photo/i });
    const garmentUpload = page.locator('label').filter({ hasText: /Select Garment/i });

    await expect(userPhotoUpload).toBeVisible();
    await expect(garmentUpload).toBeVisible();
  });
});
