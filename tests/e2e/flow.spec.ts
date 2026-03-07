import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Masterpiece fitting flow (mocked)', async ({ page }) => {
    // 1. Verify TRY IT ON button is disabled initially
    const tryItOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryItOnBtn).toBeDisabled();

    // 2. Upload User Photo
    // In Playwright, we upload files to the input type="file" element directly
    // Wait for the user photo upload input to be ready
    const userUploadInput = page.locator('input#user-upload');
    // Using a mock small image data URI as buffer or creating a tiny transparent PNG
    const buffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');
    await userUploadInput.setInputFiles({
      name: 'user.png',
      mimeType: 'image/png',
      buffer: buffer
    });

    // 3. Upload Target Garment
    const garmentUploadInput = page.locator('input#garment-upload');
    await garmentUploadInput.setInputFiles({
      name: 'garment.png',
      mimeType: 'image/png',
      buffer: buffer
    });

    // 4. Verify TRY IT ON is now enabled and click it
    await expect(tryItOnBtn).toBeEnabled();

    // 5. Mock the API response to avoid actual Replicate calls during tests
    await page.route('/api/try-on', async route => {
      const json = { success: true, imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==' };
      await route.fulfill({ json });
    });

    await tryItOnBtn.click();

    // 6. Verify processing state or result
    // Should eventually show the result overlay (a button with '✕' text should appear)
    const closeResultBtn = page.getByRole('button', { name: '✕' });
    await expect(closeResultBtn).toBeVisible({ timeout: 15000 });
  });
});
