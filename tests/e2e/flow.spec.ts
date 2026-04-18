import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Easy Fit flow', async ({ page }) => {
    // 1. Select SPA Line
    // Force click to ensure it hits even if covered or slightly off-screen in mobile
    await page.getByText('SPA Line').click({ force: true });

    // 2. SPA Page
    // Wait for "S_FIT SPA" header
    await expect(page.getByRole('heading', { name: 'S_FIT SPA' })).toBeVisible();

    // Check if "START AR FITTING" button is visible.
    const startARFittingBtn = page.getByRole('link', { name: /START AR FITTING/i });
    await expect(startARFittingBtn).toBeVisible();

    // Click "START AR FITTING"
    await startARFittingBtn.click();

    // 3. Fitting Room
    // Wait for AR Live Fitting or some indication of fitting UI
    await expect(page.getByText('MediaPipe Locked')).toBeVisible();
  });
});
