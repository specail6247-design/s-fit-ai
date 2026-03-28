import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Real Life Fitting flow', async ({ page }) => {
    // Check initial state elements
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('02. Target Garment')).toBeVisible();

    const tryItOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryItOnBtn).toBeEnabled();

    // Click Try It On - wait for alert
    page.on('dialog', dialog => dialog.accept());
    await tryItOnBtn.click();

    // Simulate mock photo upload for user
    const buffer = Buffer.from('R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=', 'base64');
    await page.locator('input#user-upload').setInputFiles({
      name: 'dummy_user.gif',
      mimeType: 'image/gif',
      buffer: buffer
    });

    // Simulate mock photo upload for garment
    await page.locator('input#garment-upload').setInputFiles({
      name: 'dummy_garment.gif',
      mimeType: 'image/gif',
      buffer: buffer
    });

    // We verify the upload images appear
    const uploadedImages = page.locator('label[for="user-upload"] img, label[for="garment-upload"] img');
    await expect(uploadedImages).toHaveCount(2);

    // Try it on
    await tryItOnBtn.click();

    // In e2e CI environment with mocked or extremely fast responses,
    // the processing state may finish before Playwright asserts it.
    // We just wait for the Result overlay to be fully visible.

    // Result overlay should appear (Close button is present in the result overlay)
    const closeBtn = page.getByRole('button', { name: /Close/i });
    await expect(closeBtn).toBeVisible({ timeout: 5000 });

    // Should see the cinematic share button
    await expect(page.getByRole('button', { name: /Generate Cinematic Share/i })).toBeVisible();
  });
});
