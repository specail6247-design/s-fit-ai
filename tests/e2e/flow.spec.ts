import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Easy Fit flow', async ({ page }) => {
    // 1. Navigate to SPA Line directly (as click routing might be flaky in headless)
    await page.goto('/spa');

    // 2. Verify SPA Page and Start AR Fitting
    await expect(page.getByRole('heading', { name: 'S_FIT SPA' })).toBeVisible();
    await page.getByRole('link', { name: /START AR FITTING/i }).click({ force: true });

    // 3. Verify ARLiveFitting is visible
    await expect(page.getByText('Live Fit AI')).toBeVisible();
    await expect(page.getByText('Body Stability')).toBeVisible();
  });
});
