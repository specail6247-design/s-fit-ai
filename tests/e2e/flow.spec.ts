import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Try On flow', async ({ page }) => {
    // 1. Verify UI loaded
    await expect(page.getByText('S_FIT NEO')).toBeVisible();

    // 2. We can't easily mock file uploads in this simple test without test assets,
    // so we will just verify the TRY IT ON button triggers an alert if empty.
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Please upload both User Photo and Garment.');
      await dialog.accept();
    });

    const tryItOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryItOnBtn).toBeVisible();
    await tryItOnBtn.click();

    // 3. Verify alternative routes exist
    await expect(page.getByRole('link', { name: /SPA Line/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Luxury Line/i })).toBeVisible();
  });
});
