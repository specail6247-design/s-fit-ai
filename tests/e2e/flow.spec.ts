import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should verify core elements of Masterpiece Fit load', async ({ page }) => {
    // Check for M_FIT presence on home page
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();

    // Check that we have the left panel controls
    await expect(page.getByText('Professional Virtual Fitting')).toBeVisible();
  });
});
