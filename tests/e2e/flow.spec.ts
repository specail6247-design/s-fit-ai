import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should verify Real Life Fitting flow is active', async ({ page }) => {
    // Home now redirects to Masterpiece / RealLifeFitting instead of Mode Selector
    await expect(page.getByText('S_FIT NEO')).toBeVisible();

    // Check that we are on RealLifeFitting interface
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();

    // Try clicking without photos
    await tryOnBtn.click();

    // Expect processing state not to show (since files aren't uploaded yet)
    await expect(page.getByText('M_FIT PIPELINE ACTIVE')).not.toBeVisible();
  });
});
