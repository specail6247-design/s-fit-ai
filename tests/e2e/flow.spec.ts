import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display interactive fitting ui elements', async ({ page }) => {
    // Verify upload elements are present
    const userUploadInput = page.locator('#user-upload');
    const garmentUploadInput = page.locator('#garment-upload');
    await expect(userUploadInput).toBeAttached();
    await expect(garmentUploadInput).toBeAttached();

    // Verify the Try It On button exists
    const tryOnBtn = page.getByRole('button', { name: /Try It On/i });
    await expect(tryOnBtn).toBeVisible();

    // Attempt to click without uploading (should alert or not proceed if we handle it)
    // To keep the test simple without handling dialogs, we just verify it exists and is clickable
    await expect(tryOnBtn).toBeEnabled();
  });
});
