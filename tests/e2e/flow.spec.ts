import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should simulate uploading and try-on flow', async ({ page }) => {
    // 1. We start on the Masterpiece UI (RealLifeFitting)
    await expect(page.getByRole('heading', { name: /S_FIT NEO/i })).toBeVisible();

    // 2. Identify the inputs
    const tryItOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryItOnBtn).toBeVisible();

    // The user photo upload
    // We can simulate attaching a file
    const userPhotoInput = page.locator('input[type="file"]').first();
    const garmentPhotoInput = page.locator('input[type="file"]').nth(1);

    // Provide dummy base64 data to pass the "Please upload both" check
    // RealLifeFitting reads files via FileReader.
    // So we can mock small 1x1 pngs.
    const mockImageBuffer = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
      'base64'
    );

    // Let's intercept the `/api/try-on` call *before* clicking to mock success and prevent real backend hit.
    await page.route('/api/try-on', async route => {
      const json = { imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=' };
      await route.fulfill({ json });
    });

    await userPhotoInput.setInputFiles({
      name: 'user.png',
      mimeType: 'image/png',
      buffer: mockImageBuffer,
    });

    await garmentPhotoInput.setInputFiles({
      name: 'garment.png',
      mimeType: 'image/png',
      buffer: mockImageBuffer,
    });

    page.on('dialog', dialog => dialog.dismiss());

    // Wait slightly to ensure react state is updated with the file reader result
    await page.waitForTimeout(500);

    // 3. Click TRY IT ON
    await tryItOnBtn.click();

    // The component might jump extremely fast so "PROCESSING DATA..." might not even be observable in fast browsers.
    // Let's directly wait for the result overlay to appear.
    // We also consider that sometimes it takes a couple of ticks or API calls.
    // The result overlay uses the AI GENERATED_ text
    await expect(page.getByText(/AI GENERATED_/i)).toBeVisible({ timeout: 10000 });

    // The result image close button
    const closeBtn = page.getByRole('button', { name: /Close/i });
    await expect(closeBtn).toBeVisible();

    // 4. Close the result
    await closeBtn.click();

    // The result should disappear
    await expect(page.getByText(/AI GENERATED_/i)).toBeHidden();
  });
});
