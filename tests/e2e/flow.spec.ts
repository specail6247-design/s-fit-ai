import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Real Life Fitting flow', async ({ page }) => {
    // 1. Check for Real Life Fitting UI
    await expect(page.getByText('S_FIT NEO')).toBeVisible();
    await expect(page.getByText('Upload User Photo')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();

    // 2. Upload dummy images (using base64 inline buffers)
    const dummyImageBuffer = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      'base64'
    );

    // Upload User Photo
    await page.locator('input#user-upload').setInputFiles({
      name: 'user.png',
      mimeType: 'image/png',
      buffer: dummyImageBuffer,
    });

    // Upload Garment Photo
    await page.locator('input#garment-upload').setInputFiles({
      name: 'garment.png',
      mimeType: 'image/png',
      buffer: dummyImageBuffer,
    });

    // 3. Click TRY IT ON
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await tryOnBtn.click();

    // 4. Wait for result (AI GENERATED_ text should appear)
    await page.getByText('AI GENERATED_').waitFor({ state: 'visible', timeout: 25000 });

    // 5. Verify result image is displayed
    // It might be briefly invisible due to framer motion. Wait for attached/visible.
    const resultImg = page.locator('img[alt="Result"]');
    await resultImg.waitFor({ state: 'attached', timeout: 10000 });
    await expect(resultImg).toHaveAttribute('src', /.*/);

    // 6. Verify Share to Story button exists
    await expect(page.getByRole('button', { name: /Share to Story/i })).toBeVisible();
  });
});
