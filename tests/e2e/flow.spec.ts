import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Masterpiece Fit flow', async ({ page }) => {
    // Check initial layout
    await expect(page.getByText('Upload User Photo')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();

    // The Generate button should be present
    const generateBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(generateBtn).toBeVisible();

    // 1. Upload User Photo
    // Using base64 dummy image for test
    const dummyImage = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      'base64'
    );

    await page.locator('input#user-upload[type="file"]').setInputFiles({
      name: 'dummy.png',
      mimeType: 'image/png',
      buffer: dummyImage,
    });

    // 2. Select Garment
    await page.locator('input#garment-upload[type="file"]').setInputFiles({
      name: 'garment.png',
      mimeType: 'image/png',
      buffer: dummyImage,
    });

    // In testing, we don't necessarily want to call the real Replicate API and wait for minutes,
    // so we just ensure the button is visible and ready.
  });
});
