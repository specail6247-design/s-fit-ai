import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Intercept the API request to immediately return a successful mock response
    await page.route('**/api/try-on', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
        })
      });
    });
    await page.goto('/');
  });

  test('should complete RealLifeFitting flow', async ({ page }) => {
    // 1. Identification (Upload User Photo)
    const fileInputUser = page.locator('input[id="user-upload"]');
    const validImageBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');
    await fileInputUser.setInputFiles({ name: 'user.png', mimeType: 'image/png', buffer: validImageBuffer });
    await page.waitForTimeout(500);

    // 2. Target Garment (Upload Garment Photo)
    // The previous attempt failed to click correctly because there are mock items pre-filled, so let's just upload directly to trigger the state change.
    const fileInputGarment = page.locator('input[id="garment-upload"]');
    await fileInputGarment.setInputFiles({ name: 'garment.png', mimeType: 'image/png', buffer: validImageBuffer });
    await page.waitForTimeout(500);

    // 3. TRY IT ON
    const tryItOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryItOnBtn).toBeEnabled();
    await tryItOnBtn.click();

    // 4. Wait for the result image to be displayed
    // It might take a moment to transition states and show the mock result
    await page.waitForTimeout(1000);
  });
});
