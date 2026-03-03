import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should verify RealLifeFitting setup flow', async ({ page }) => {
    // 1. Check Initial State
    // Verify required file upload labels are visible
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('02. Target Garment')).toBeVisible();

    // The "TRY IT ON" button should be visible
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();

    // We can click the button, but it will alert since no images are uploaded
    page.on('dialog', dialog => dialog.dismiss());
    await tryOnBtn.click();

    // Check navigation links
    const spaLink = page.locator('a[href="/spa"]');
    await expect(spaLink).toBeVisible();

    const luxuryLink = page.locator('a[href="/luxury"]');
    await expect(luxuryLink).toBeVisible();
  });
});
