import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Real Life Fitting flow', async ({ page }) => {
    // Intercept API call to prevent real execution and network timeouts during testing
    await page.route('/api/try-on', async (route) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, imageUrl: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/mock-result-sfit.png' })
      });
    });

    // We use a small 1x1 base64 transparent png for mock file uploads
    const dummyImage = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');

    // Upload User Image
    await page.locator('input#user-upload').setInputFiles({
      name: 'user.png',
      mimeType: 'image/png',
      buffer: dummyImage,
    });

    // Upload Garment Image
    await page.locator('input#garment-upload').setInputFiles({
      name: 'garment.png',
      mimeType: 'image/png',
      buffer: dummyImage,
    });

    // Click Try It On
    await page.getByRole('button', { name: /TRY IT ON/i }).click();

    // Verify processing state
    await expect(page.getByText('PROCESSING DATA...')).toBeVisible();

    // Wait for the AI GENERATED_ badge to appear indicating the mock result loaded
    await page.getByText('AI GENERATED_').waitFor({ state: 'visible', timeout: 15000 });

    // Ensure the result image has been rendered
    await expect(page.getByAltText('Result')).toHaveAttribute('src', /mock-result/);
  });
});
