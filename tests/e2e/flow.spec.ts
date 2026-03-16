import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Real Life Fitting flow', async ({ page }) => {
    // We can't actually upload files via typical means in some headless modes without explicit input targeting.
    // Fortunately, playwright supports setInputFiles on file inputs.

    // Create a dummy image buffer to upload
    const dummyImageBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');

    // Upload User Photo
    const userUploadInput = page.locator('input#user-upload[type="file"]');
    await userUploadInput.setInputFiles({
      name: 'user.png',
      mimeType: 'image/png',
      buffer: dummyImageBuffer
    });

    // Upload Target Garment
    const garmentUploadInput = page.locator('input#garment-upload[type="file"]');
    await garmentUploadInput.setInputFiles({
      name: 'garment.png',
      mimeType: 'image/png',
      buffer: dummyImageBuffer
    });

    // Click Try It On
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeEnabled();

    // Need to handle the alert if we didn't upload properly (though we just did)
    page.on('dialog', dialog => dialog.dismiss());

    await tryOnBtn.click();

    // Verify processing state
    await expect(page.getByText('PROCESSING DATA...')).toBeVisible();

    // The API is mocked or will fail in test if no backend.
    // We just check that processing starts and UI updates.
  });
});
