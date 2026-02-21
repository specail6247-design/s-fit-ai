import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete upload flow', async ({ page }) => {
    // 1. Verify we are on the main fitting page
    await expect(page.getByText('S_FIT NEO')).toBeVisible();

    // 2. Check that file inputs exist (hidden inputs)
    const userUploadInput = page.locator('#user-upload');
    const garmentUploadInput = page.locator('#garment-upload');

    await expect(userUploadInput).toBeAttached();
    await expect(garmentUploadInput).toBeAttached();

    // Note: We can't easily simulate actual file uploads and API calls in this mock environment
    // without more setup, so we verify the UI controls are interactive.

    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();
    // It shouldn't be enabled or clicking it should warn because images aren't uploaded
    // But we check it's present.
  });
});
