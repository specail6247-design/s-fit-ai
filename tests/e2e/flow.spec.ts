import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete RealLifeFitting try-on flow', async ({ page }) => {
    // Navigate to RealLifeFitting mode UI
    await expect(page.getByText('01. Identification')).toBeVisible();

    // In Playwright tests for file inputs, use setInputFiles
    // Mock user image buffer
    const userImageBuffer = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      'base64'
    );
    await page.locator('#user-upload').setInputFiles({
      name: 'user.png',
      mimeType: 'image/png',
      buffer: userImageBuffer
    });

    // Mock garment image buffer
    const garmentImageBuffer = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
      'base64'
    );
    await page.locator('#garment-upload').setInputFiles({
      name: 'garment.png',
      mimeType: 'image/png',
      buffer: garmentImageBuffer
    });

    // 2. Execute Try On
    // Intercept the API call to avoid using real backend credits during tests
    await page.route('/api/try-on', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
        }),
      });
    });

    // Click Try It On
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();

    // In test environment, the simulated 10-second processing bar might take a while or fail visual asserts,
    // but we can just click and expect the result overlay to eventually appear.
    await tryOnBtn.click();

    // Verify Result Overlay
    await expect(page.getByText('AI GENERATED_')).toBeVisible({ timeout: 15000 });

    // Check close button
    const closeBtn = page.getByRole('button', { name: /✕ Close/i });
    await expect(closeBtn).toBeVisible();
    await closeBtn.click();

    // Ensure it's closed
    await expect(page.getByText('AI GENERATED_')).not.toBeVisible();
  });
});
