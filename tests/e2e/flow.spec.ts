import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should verify main fitting flow elements', async ({ page }) => {
    // Verify page loads
    await expect(page).toHaveURL('/');

    // Verify "Upload User Photo" input exists
    const userPhotoInput = page.locator('input[type="file"]').first();
    await expect(userPhotoInput).toBeAttached();

    // Verify "Select Garment" input exists
    const garmentInput = page.locator('input[type="file"]').nth(1);
    await expect(garmentInput).toBeAttached();

    // Verify "TRY IT ON" button exists
    const tryOnButton = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnButton).toBeVisible();

    // Verify navigation links
    await expect(page.getByRole('link', { name: /SPA Line/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Luxury Line/i })).toBeVisible();
  });
});
