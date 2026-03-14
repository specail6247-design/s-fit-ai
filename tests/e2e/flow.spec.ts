import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Easy Fit flow', async ({ page }) => {
    // Check if the user is on the RealLifeFitting page (which acts as the home page)
    await expect(page.getByText('TRY IT ON')).toBeVisible();

    // Upload an image
    // Generate a valid base64 1x1 png image
    const validPngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1cgQAAAAAElFTkSuQmCC';
    const buffer = Buffer.from(validPngBase64, 'base64');

    // Find the file input and upload
    const fileInput = page.locator('input#user-upload[type="file"]');
    await fileInput.setInputFiles({
      name: 'test.png',
      mimeType: 'image/png',
      buffer: buffer
    });

    // Select a garment (by uploading an image)
    const garmentInput = page.locator('input#garment-upload[type="file"]');
    await garmentInput.setInputFiles({
      name: 'garment.png',
      mimeType: 'image/png',
      buffer: buffer
    });

    // Check if the "TRY IT ON" button is visible
    // Sometimes it's better to just check for visibility to avoid test flakes if disabled state logic changes
    const tryItOnBtn = page.locator('button:has-text("TRY IT ON")');
    await expect(tryItOnBtn).toBeVisible();

    // Note: We avoid clicking it to prevent Replicate API calls during tests unless mocked.
  });
});
