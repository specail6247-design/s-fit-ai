import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should verify RealLifeFitting flow', async ({ page }) => {
    // Ensure the RealLifeFitting mode labels exist
    await expect(page.getByText('Upload User Photo')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();

    // The TRY IT ON button should be present
    const tryItOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryItOnBtn).toBeVisible();

    // Uploading a file programmatically triggers the handlers
    // However, since we mock files in tests or just verify the UI structure:
    await expect(page.locator('input#user-upload')).toBeAttached();
    await expect(page.locator('input#garment-upload')).toBeAttached();

    // 3D Canvas should exist
    // Add a reasonable timeout for WebGL instantiation in CI environments. In some environments,
    // canvas rendering might be slightly delayed.
    await expect(page.locator('canvas').first()).toBeAttached({ timeout: 30000 });
  });
});
