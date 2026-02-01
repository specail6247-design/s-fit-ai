import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Easy Fit flow', async ({ page }) => {
    // 1. Select Easy Fit Mode
    // The entire card is clickable. Clicking 'EASY FIT' text triggers navigation.
    await page.getByText('EASY FIT').click({ force: true });

    // Note: We do NOT click the "Continue" button separately because the card click
    // already initiates the mode selection. We just verify the transition happens.

    // 2. Input Stats
    // Wait for "Easy Fit" header to appear, confirming navigation
    await expect(page.getByRole('heading', { name: 'Easy Fit' })).toBeVisible({ timeout: 10000 });

    // Just click "Continue to Fitting Room" as defaults are valid.
    await page.getByRole('button', { name: /Continue to Fitting Room/i }).click();

    // 3. Brand Selection
    // Wait for "Select Brand" header
    await expect(page.getByText('Select Brand')).toBeVisible();

    // Easy Fit defaults to Uniqlo auto-selected.
    const enterFittingRoomBtn = page.getByRole('button', { name: /Enter Fitting Room/i });
    await expect(enterFittingRoomBtn).toBeEnabled();

    // We can also switch brand manually.
    await page.getByRole('button', { name: 'ZARA' }).click();

    await enterFittingRoomBtn.click();

    // 4. Fitting Room
    // Should see "Fitting Room" component.
    await expect(page.getByRole('button', { name: /Back to brands/i })).toBeVisible();

    // Should see 3D canvas container
    await expect(page.locator('.glass-card').first()).toBeVisible();
  });
});
