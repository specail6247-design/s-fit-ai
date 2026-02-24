import { test, expect } from '@playwright/test';

test.describe('User Flow - Luxury Line', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to Luxury Line and Fitting Room', async ({ page }) => {
    // 1. Navigate to Luxury Line from Home
    await page.getByRole('link', { name: /Luxury Line/i }).click();

    // Verify Luxury Detail Page loaded
    await expect(page).toHaveURL(/\/luxury/);
    await expect(page.getByRole('heading', { name: /Metallic Silk/i })).toBeVisible();
    await expect(page.getByText('Authentic Render')).toBeVisible();

    // 2. Navigate to Photo Fitting (Try on Mannequin)
    // The button might be hidden on mobile if bottom sheet behavior is complex, but it looks like a fixed bottom bar.
    const tryOnLink = page.getByRole('link', { name: /Try on Mannequin/i });
    await expect(tryOnLink).toBeVisible();
    await tryOnLink.click();

    // Verify Photo Fitting Page loaded
    await expect(page).toHaveURL(/\/luxury\/fitting/);

    // Check key elements of Photo Fitting
    await expect(page.getByRole('heading', { name: 'S_FIT AI' })).toBeVisible();
    await expect(page.getByText('Photo Fitting v1.0')).toBeVisible();

    // Verify controls exist (Fit Heatmap, etc)
    await expect(page.getByText('Fit Heatmap')).toBeVisible();
    await expect(page.getByText('Fabric Physics')).toBeVisible();

    // Verify back button functionality (optional but good)
    const backBtn = page.getByRole('button', { name: /Go back/i }); // Using the aria-label added in previous step
    await expect(backBtn).toBeVisible();
    await backBtn.click();

    // Should return to Luxury Detail
    await expect(page).toHaveURL(/\/luxury/); // Note: might need exact check or regex depending on query params
  });
});
