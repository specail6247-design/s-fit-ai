import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Real Life Fitting flow (No Upload)', async ({ page }) => {
    // Check for "TRY IT ON" button
    const tryItOnBtn = page.locator('button', { hasText: 'TRY IT ON' });
    await expect(tryItOnBtn).toBeVisible();

    // Handle the browser alert since we didn't upload files
    page.once('dialog', async dialog => {
      expect(dialog.message()).toBe('Please upload both User Photo and Garment.');
      await dialog.dismiss();
    });

    // Click "TRY IT ON" without uploading anything
    await tryItOnBtn.click({ force: true });

    // Check SPA/Luxury links
    const spaLink = page.getByRole('link', { name: /SPA Line/i });
    await expect(spaLink).toBeVisible();

    const luxuryLink = page.getByRole('link', { name: /Luxury Line/i });
    await expect(luxuryLink).toBeVisible();
  });
});
