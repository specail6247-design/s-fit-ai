import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Real Life Fitting Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should simulate virtual try-on flow', async ({ page }) => {
    // 1. Verify Page Loaded
    await expect(page.getByRole('heading', { name: /S_FIT NEO/i })).toBeVisible();

    // 2. Upload Mock User Photo
    // Create a mock file
    const fileInputUser = page.locator('input[id="user-upload"]');
    await fileInputUser.setInputFiles({
      name: 'user.png',
      mimeType: 'image/png',
      buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64')
    });

    // 3. Upload Mock Garment Photo
    const fileInputGarment = page.locator('input[id="garment-upload"]');
    await fileInputGarment.setInputFiles({
      name: 'garment.png',
      mimeType: 'image/png',
      buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64')
    });

    // 4. Click Try It On
    const tryBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryBtn).toBeVisible();
    // Force click to ensure it works even if overlay/layout shifts on mobile
    await tryBtn.click({ force: true });

    // 5. Verify Processing State
    // Wait for the progress text to confirm state transition
    await expect(page.getByText('PROCESSING DATA...')).toBeVisible({ timeout: 10000 });

    // 6. Verify Result (Mock Result)
    // The component sets resultImage after processing.
    // Since we don't have a real backend in test, it might fail or use fallback if we mock network.
    // However, the component catches errors and sets a fallback image in "Using demo mode fallback".
    // So we expect an image with alt="Result" eventually.

    // Increase timeout for processing simulation and check for the badge first (text is reliable)
    await expect(page.getByText('AI GENERATED_')).toBeVisible({ timeout: 30000 });

    // Then check the image exists (it might be hidden by animation or off-screen, but should be attached)
    const resultImage = page.getByAltText('Result');
    await expect(resultImage).toBeAttached();
  });
});
