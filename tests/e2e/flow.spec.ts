import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should interact with Masterpiece Fit flow', async ({ page }) => {
    // The main flow now uses RealLifeFitting (M_FIT) rather than the legacy Easy Fit.
    // We check for the primary try-on button.
    const tryItOnBtn = page.getByRole('button', { name: 'TRY IT ON' });
    await expect(tryItOnBtn).toBeVisible();

    // Set file inputs first so "TRY IT ON" actually triggers processing
    await page.locator('#user-upload').setInputFiles({
      name: 'user.png',
      mimeType: 'image/png',
      buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64'),
    });

    await page.locator('#garment-upload').setInputFiles({
      name: 'garment.png',
      mimeType: 'image/png',
      buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64'),
    });

    // Wait for file inputs to be processed. The DOM will update with an image instead of emoji.
    await expect(page.locator('label[for="user-upload"] img')).toBeVisible();
    await expect(page.locator('label[for="garment-upload"] img')).toBeVisible();

    // Setup an interceptor or check for fallback mode if API fails.
    // Check that we can see the "⚡️ TRY IT ON" text inside the button
    await expect(tryItOnBtn).toHaveText(/TRY IT ON/);

    // Click "TRY IT ON" (force it as mobile might obscure it)
    await tryItOnBtn.click({ force: true });

    // Wait for the processing/scanning animation to start
    // In demo mode or mock, it might just immediately show the result or start processing.
    // Check for either the PROCESSING text, or if it immediately finishes, check for the result image/fallback.
    const processingLocator = page.getByText('PROCESSING DATA...');
    const resultImageLocator = page.locator('img[alt="Result"]');

    await expect(processingLocator.or(resultImageLocator).first()).toBeVisible({ timeout: 15000 });
  });
});
