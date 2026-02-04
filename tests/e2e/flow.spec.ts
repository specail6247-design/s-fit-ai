import { test, expect } from '@playwright/test';

test.describe('Navigation Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to Luxury Line', async ({ page }) => {
    // 1. Click Luxury Line link
    const luxuryLink = page.getByRole('link', { name: /Luxury Line/i });
    await expect(luxuryLink).toBeVisible();
    await luxuryLink.click();

    // 2. Verify URL
    await expect(page).toHaveURL(/.*\/luxury/);

    // 3. Verify Luxury Page Content
    // Check for "S_FIT AI" header in the top nav
    await expect(page.getByRole('heading', { name: 'S_FIT AI' })).toBeVisible();

    // Check for the main product title "Metallic Silk"
    await expect(page.getByText('Metallic Silk')).toBeVisible();

    // Check for the "Try on Mannequin" button
    const tryOnBtn = page.getByRole('link', { name: /Try on Mannequin/i });
    await expect(tryOnBtn).toBeVisible();
  });
});
