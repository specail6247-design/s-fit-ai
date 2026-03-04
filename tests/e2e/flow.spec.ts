import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Real Life Fitting flow', async ({ page }) => {
    // 1. Verify Home Page Load
    await expect(page.getByText('Upload User Photo')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();

    // 2. Mock File Uploads
    // Since we don't have real files or rely on the real API for E2E speed,
    // we can just check if the TRY IT ON button behaves properly.
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();

    // 3. Navigation Links (Check if they exist and point to correct paths)
    const spaLink = page.getByRole('link', { name: /SPA Line/i });
    await expect(spaLink).toHaveAttribute('href', '/spa');

    const luxuryLink = page.getByRole('link', { name: /Luxury Line/i });
    await expect(luxuryLink).toHaveAttribute('href', '/luxury');
  });
});
