import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should verify Real Life Fitting presence', async ({ page }) => {
    // 1. Verify Real Life Fitting is the default
    await expect(page.getByText('Identification')).toBeVisible();
    await expect(page.getByText('Target Garment')).toBeVisible();

    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();
  });
});
