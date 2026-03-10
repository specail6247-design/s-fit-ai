import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Real Life Fitting Masterpiece flow', async ({ page }) => {
    // Ensure the RealLifeFitting component is rendered
    await expect(page.getByText('S_FIT NEO')).toBeVisible();

    // Mock API response to avoid actual external calls during test
    await page.route('/api/try-on', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, imageUrl: 'data:image/png;base64,mockedbase64' }),
      });
    });

    // We can bypass file choosers using setInputFiles by targeting the hidden inputs
    const userUploadInput = page.locator('input#user-upload');
    await userUploadInput.setInputFiles({
      name: 'user.png',
      mimeType: 'image/png',
      buffer: Buffer.from('mocked user image buffer', 'utf-8'),
    });

    const garmentUploadInput = page.locator('input#garment-upload');
    await garmentUploadInput.setInputFiles({
      name: 'garment.png',
      mimeType: 'image/png',
      buffer: Buffer.from('mocked garment image buffer', 'utf-8'),
    });

    // Click "TRY IT ON"
    const tryItOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryItOnBtn).toBeEnabled();
    await tryItOnBtn.click();

    // Verify loading state or result. The UI shows 'AI GENERATED_' text badge when processing is complete
    await page.getByText('AI GENERATED_').waitFor({ state: 'visible' });

    // Result image should be displayed. Wait with force if hidden behind overlay.
    // It is possible it's covered by a modal or has 0 opacity temporarily, just check it is attached
    const resultImg = page.getByAltText('Result');
    await resultImg.waitFor({ state: 'attached' });
    // Also verify it has the mocked source to ensure the flow succeeded
    await expect(resultImg).toHaveAttribute('src', 'data:image/png;base64,mockedbase64');
  });
});
