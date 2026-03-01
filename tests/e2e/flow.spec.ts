import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should interact with the try-on form and handle missing inputs', async ({ page }) => {
    // Check the TRY IT ON button
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();
    await expect(tryOnBtn).toBeEnabled();

    // Set up a dialog handler to catch the alert
    let alertMessage = '';
    page.on('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.accept();
    });

    // Attempting to try on without uploading images should trigger an alert
    await tryOnBtn.click();

    // Check the alert message
    expect(alertMessage).toBe('Please upload both User Photo and Garment.');
  });
});
