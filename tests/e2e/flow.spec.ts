import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Try On upload flow', async ({ page }) => {
    // 1. Ensure page loaded
    const title = page.locator('h1').filter({ hasText: /S_FIT NEO/i });
    await expect(title).toBeVisible();

    // 2. Upload photo & garment (check upload containers exist)
    const userPhotoUpload = page.locator('label').filter({ hasText: /Upload User Photo/i });
    const garmentUpload = page.locator('label').filter({ hasText: /Select Garment/i });

    await expect(userPhotoUpload).toBeVisible();
    await expect(garmentUpload).toBeVisible();

    // 3. The Generate Button should be visible
    const generateBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(generateBtn).toBeVisible();
  });
});
