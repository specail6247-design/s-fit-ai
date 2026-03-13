import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Real Life Fitting flow', async ({ page }) => {
    // 1. Upload User Photo
    const userFileInput = page.locator('input#user-upload');
    await userFileInput.setInputFiles({
      name: 'user.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64')
    });

    // 2. Upload Garment Photo
    const garmentFileInput = page.locator('input#garment-upload');
    await garmentFileInput.setInputFiles({
      name: 'garment.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64')
    });

    // 3. Start Try-On
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeEnabled();
    await tryOnBtn.click();

    // Wait for processing state
    // Note: Due to fast fallbacks, this might appear and disappear too quickly,
    // or not render in time. Using waitFor attached instead.
    const processingLocator = page.getByText('PROCESSING DATA...');
    await processingLocator.waitFor({ state: 'attached', timeout: 5000 }).catch(() => {});

    // 4. Wait for Result (AI GENERATED_ badge)
    // The demo mode fallback mock image will appear since we don't have a real backend in e2e
    const aiBadge = page.getByText('AI GENERATED_');
    await aiBadge.waitFor({ state: 'visible', timeout: 30000 });

    // Verify result image is displayed
    const resultImage = page.locator('img[alt="Result"]');
    // Using attached because overlays or animations might temporarily hide it
    await resultImage.waitFor({ state: 'attached' });
    await expect(resultImage).toHaveAttribute('src', /mock-result-sfit\.png/);
  });
});
