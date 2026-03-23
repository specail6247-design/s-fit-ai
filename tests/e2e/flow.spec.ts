import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Real Life Fitting flow', async ({ page }) => {
    // 1. Upload User Photo
    const userPhotoBuffer = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      'base64'
    );
    await page.locator('input#user-upload[type="file"]').setInputFiles({
      name: 'user.png',
      mimeType: 'image/png',
      buffer: userPhotoBuffer,
    });

    // Check if the preview image is rendered
    await expect(page.locator('label[for="user-upload"] img')).toBeVisible();

    // 2. Upload Target Garment
    const garmentPhotoBuffer = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      'base64'
    );
    await page.locator('input#garment-upload[type="file"]').setInputFiles({
      name: 'garment.png',
      mimeType: 'image/png',
      buffer: garmentPhotoBuffer,
    });

    // Check if the garment preview image is rendered
    await expect(page.locator('label[for="garment-upload"] img')).toBeVisible();

    // 3. Initiate Try On
    // The "TRY IT ON" button should be available and clickable
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();
    await tryOnBtn.click();

    // Verify it moves to processing state
    // Give it a tiny bit more time on mobile devices by checking presence first, then visibility, or just extending timeout.
    await expect(page.getByText('PROCESSING DATA...')).toBeVisible({ timeout: 10000 });
  });
});
