import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Masterpiece upload flow', async ({ page }) => {
    // Check Masterpiece UI loads
    await page.getByText('S_FIT NEO').waitFor({ state: 'attached' });

    // Setup input file buffers directly to skip the file chooser popups
    const dummyImageBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');

    // The Masterpiece UI handles User and Garment photo uploads.
    // Use locator by input type file and sequence or id if provided.
    // Since IDs might change or not exist, let's target the hidden input tags by their IDs as seen in the code.
    const userUploadInput = page.locator('input#user-upload');
    const garmentUploadInput = page.locator('input#garment-upload');

    // Attach user image
    await userUploadInput.setInputFiles({
      name: 'user.png',
      mimeType: 'image/png',
      buffer: dummyImageBuffer,
    });

    // Attach garment image
    await garmentUploadInput.setInputFiles({
      name: 'garment.png',
      mimeType: 'image/png',
      buffer: dummyImageBuffer,
    });

    // Both should now be set, TRY IT ON button should be enabled.
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeEnabled();

    // Wait until result loads after clicking
    // To prevent the test from timing out on the fake or actual API request,
    // we can intercept the route and mock the response.
    await page.route('**/api/try-on', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==' })
      });
    });

    await tryOnBtn.click();

    // Assuming we use 'AI GENERATED_' as mentioned in the memory
    await page.getByText('AI GENERATED_').waitFor({ state: 'visible', timeout: 15000 });
  });
});
