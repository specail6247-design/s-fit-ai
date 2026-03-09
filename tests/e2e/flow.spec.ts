import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Real Life Fitting flow', async ({ page }) => {
    // Check for presence of S_FIT NEO heading
    await expect(page.getByText('S_FIT NEO')).toBeVisible();

    // Create a dummy 1x1 png image buffer for file uploads
    const dummyImageBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');

    // 1. Upload User Photo
    // In RealLifeFitting, we have an input file with id 'user-upload'
    const userUploadLocator = page.locator('input#user-upload');
    await userUploadLocator.setInputFiles({
      name: 'user.png',
      mimeType: 'image/png',
      buffer: dummyImageBuffer
    });

    // 2. Select Garment
    // In RealLifeFitting, we have an input file with id 'garment-upload'
    const garmentUploadLocator = page.locator('input#garment-upload');
    await garmentUploadLocator.setInputFiles({
      name: 'garment.png',
      mimeType: 'image/png',
      buffer: dummyImageBuffer
    });

    // 3. Click Try It On
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeEnabled();
    await tryOnBtn.click();

    // 4. Verify Try On Result
    // Wait for the AI GENERATED_ badge to verify the result overlay is completely rendered
    const badge = page.getByText('AI GENERATED_');
    await badge.waitFor({ state: 'visible', timeout: 20000 });
    await expect(badge).toBeVisible();
  });
});
