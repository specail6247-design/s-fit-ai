import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title', async ({ page }) => {
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('S_FIT');
    await expect(heroHeading).toContainText('NEO');
  });

  test('should display the upload photo sections', async ({ page }) => {
    const userPhotoUpload = page.getByText('Upload User Photo');
    await expect(userPhotoUpload).toBeVisible();

    const garmentUpload = page.getByText('Select Garment');
    await expect(garmentUpload).toBeVisible();
  });

  test('should match visual snapshot', async ({ page }) => {
    test.skip();
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
});
