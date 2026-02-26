import { test, expect } from '@playwright/test';

test.describe('Fitting Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display initial fitting controls', async ({ page }) => {
    // 1. Check for Initial State
    // The main flow now starts directly on the page, with file inputs.

    // Check for "Identification" input section
    await expect(page.locator('label', { hasText: 'Identification' })).toBeVisible();
    await expect(page.locator('label', { hasText: 'Upload User Photo' })).toBeVisible();

    // Check for "Target Garment" input section
    await expect(page.locator('label', { hasText: 'Target Garment' })).toBeVisible();
    await expect(page.locator('label', { hasText: 'Select Garment' })).toBeVisible();

    // 2. Check Action Button
    const tryItOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryItOnBtn).toBeVisible();
    await expect(tryItOnBtn).toBeEnabled();

    // 3. Verify Alert when clicking without files
    // Playwright handles alerts by setting up a listener.
    let alertMessage = '';
    page.on('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.dismiss();
    });

    await tryItOnBtn.click();
    await expect(page.waitForFunction(() => true)).resolves.toBeTruthy(); // Wait for loop tick

    // The alert message in RealLifeFitting.tsx is "Please upload both User Photo and Garment."
    expect(alertMessage).toBe('Please upload both User Photo and Garment.');
  });
});
