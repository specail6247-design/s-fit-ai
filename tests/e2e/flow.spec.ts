import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete RealLifeFitting flow', async ({ page }) => {
    // 1. Ensure page is loaded
    await expect(page.getByText('Upload User Photo')).toBeVisible();

    // We can't actually upload files via file chooser easily without a mock file,
    // so we will pass a Buffer object directly to the hidden inputs.

    // Create a 1x1 transparent png buffer as mock image
    const mockImageBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==', 'base64');

    // 2. Upload User Photo
    const userInput = page.locator('input#user-upload[type="file"]');
    await userInput.setInputFiles({
      name: 'user.png',
      mimeType: 'image/png',
      buffer: mockImageBuffer
    });

    // 3. Upload Garment Photo
    const garmentInput = page.locator('input#garment-upload[type="file"]');
    await garmentInput.setInputFiles({
      name: 'garment.png',
      mimeType: 'image/png',
      buffer: mockImageBuffer
    });

    // 4. Click 'TRY IT ON'
    const tryItOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryItOnBtn).toBeEnabled();
    await tryItOnBtn.click({ force: true });

    // 5. Verify the Result overlay appears
    // The UI transitions to a progress state, then shows the result overlay
    const resultOverlayText = page.getByText('AI GENERATED_');
    await resultOverlayText.waitFor({ state: 'attached', timeout: 15000 }).catch(() => {});

    // We expect the image inside the result overlay to appear, or the "Close" button.
    const closeBtn = page.getByText('✕ Close');
    // If backend isn't real, the test will fallback to demo mode which also shows the result overlay.
    await expect(closeBtn).toBeAttached({ timeout: 15000 });
  });
});
