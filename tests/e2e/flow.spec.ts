import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Real Life Fitting flow', async ({ page }) => {
    // 1. Verify Home UI elements
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('02. Target Garment')).toBeVisible();

    // 2. We mock the API call in playwright so it doesn't really call the backend
    await page.route('/api/try-on', async (route) => {
      await route.fulfill({
        status: 200,
        json: {
          imageUrl: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/mock-result-sfit.png',
        },
      });
    });

    // 3. We can't easily click standard file inputs and expect success without buffer,
    // so we will bypass it by injecting a mock image directly or just relying on the try on button alerting first.
    page.on('dialog', dialog => dialog.accept()); // Accept the alert("Please upload both User Photo and Garment.")

    const tryItOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryItOnBtn).toBeVisible();

    // We set dummy values to the input using Playwright's setInputFiles for actual tests,
    // but here we just test that the button exists and triggers an alert if empty.
    await tryItOnBtn.click();

    // If we want to fully test the success flow, we can manually trigger the state change
    // or upload a small dummy file.

    // For now, let's inject a dummy base64 string into the file inputs to trigger the success state
    const dummyImage = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');

    await page.locator('input#user-upload').setInputFiles({
      name: 'user.png',
      mimeType: 'image/png',
      buffer: dummyImage,
    });

    await page.locator('input#garment-upload').setInputFiles({
      name: 'garment.png',
      mimeType: 'image/png',
      buffer: dummyImage,
    });

    // Now click the button again, it should pass the alert check and trigger the loading state
    await tryItOnBtn.click();

    // Wait for the result overlay to appear
    await expect(page.getByText('AI GENERATED_')).waitFor({ state: 'visible' });

    // Check if the result image is visible
    const resultImage = page.locator('img[alt="Result"]');
    await expect(resultImage).toBeVisible();

    // Close the overlay
    await page.getByRole('button', { name: /Close/i }).click();

    // Verify it's closed
    await expect(page.getByText('AI GENERATED_')).not.toBeVisible();
  });
});
