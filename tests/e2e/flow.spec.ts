import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should verify Masterpiece UI presence', async ({ page }) => {
    // 1. Verify main sections are visible
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('02. Target Garment')).toBeVisible();

    // 2. Verify links to SPA and Luxury lines are available
    await expect(page.getByRole('link', { name: /SPA Line/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Luxury Line/i })).toBeVisible();

    // 3. Verify action button
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();

    // We test simple click interaction without full end-to-end file uploads
    // since file uploads would require mock files on the CI
    page.on('dialog', dialog => dialog.accept());
    await tryOnBtn.click();
  });
});
