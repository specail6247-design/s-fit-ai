import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Real Life Fitting flow', async ({ page }) => {
    // Bypass hidden file choosers by directly passing a base64 encoded buffer to the inputs

    // 1. Upload Identification
    const userPhotoInput = page.locator('input[id="user-upload"]');
    // Using a simple 1x1 transparent PNG base64
    const png1x1 = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');
    await userPhotoInput.setInputFiles({
      name: 'user.png',
      mimeType: 'image/png',
      buffer: png1x1
    });

    // 2. Upload Garment
    const garmentPhotoInput = page.locator('input[id="garment-upload"]'); // update if needed based on component
    await garmentPhotoInput.setInputFiles({
      name: 'garment.png',
      mimeType: 'image/png',
      buffer: png1x1
    });

    // 3. Initiate Sequence
    const generateBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(generateBtn).toBeEnabled();

    // Set a route to mock the Replicate API response
    await page.route('/api/try-on', async route => {
      const json = { success: true, imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' };
      await route.fulfill({ json });
    });

    await generateBtn.click();

    // 4. Verify Fitting Result
    // Wait for the AI GENERATED badge
    const badge = page.getByText('AI GENERATED_');
    await badge.waitFor({ state: 'visible', timeout: 30000 });
    await expect(badge).toBeVisible();

    // Check that the main screen contains an image (the fitting result)
    const resultImage = page.locator('img').nth(2); // Since there are thumbnails, the 3rd one is the result image or we just look for attached img
    await expect(resultImage).toBeAttached();
  });
});
