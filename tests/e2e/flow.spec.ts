import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should allow user interaction with upload inputs', async ({ page }) => {
    // 1. Verify User Photo Upload Input exists
    const userUploadInput = page.locator('input[type="file"]').first();
    await expect(userUploadInput).toBeAttached();

    // 2. Verify Garment Upload Input exists
    const garmentUploadInput = page.locator('input[type="file"]').nth(1);
    await expect(garmentUploadInput).toBeAttached();

    // 3. Verify Try On button is initially enabled (or visible)
    // Note: In current implementation, it might alert if files are missing, but button is clickable.
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();
    await expect(tryOnBtn).toBeEnabled();

    // 4. Verify Navigation Links to other modes
    await expect(page.getByRole('link', { name: /SPA Line/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Luxury Line/i })).toBeVisible();
  });
});
