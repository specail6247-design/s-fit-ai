import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to Luxury Line', async ({ page }) => {
    // 1. Locate Luxury Line button (link)
    const luxuryBtn = page.getByRole('link', { name: /Luxury Line/i });
    await expect(luxuryBtn).toBeVisible();

    // 2. Click navigation
    await luxuryBtn.click();

    // 3. Verify Luxury Page loaded
    await expect(page).toHaveURL(/.*\/luxury/);

    // Check for Luxury specific elements
    await expect(page.getByText('Authentic Render')).toBeVisible();
    await expect(page.getByText('Metallic Silk')).toBeVisible();

    // 4. Check for Try On navigation in Luxury page
    const tryOnLink = page.getByRole('link', { name: /Try on Mannequin/i });
    await expect(tryOnLink).toBeVisible();
  });
});
