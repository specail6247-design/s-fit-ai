import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Easy Fit flow', async ({ page }) => {
    // 1. Select Easy Fit Mode
    // Force click to ensure it hits even if covered or slightly off-screen in mobile
    await page.getByText('EASY FIT').click({ force: true });

    // Verify selection (border color change or checkmark)
    const continueToModeBtn = page.getByRole('button', { name: /Continue →/i });
    await expect(continueToModeBtn).toBeEnabled();
    await continueToModeBtn.click();

    // 2. Input Stats
    // Wait for "Easy Fit" header
    await expect(page.getByRole('heading', { name: 'Easy Fit' })).toBeVisible();

    // Just click "Continue to Fitting Room" as defaults are valid.
    await page.getByRole('button', { name: /Continue to Fitting Room/i }).click();

    // 3. Brand Selection
    // Wait for "Select Brand" header
    await expect(page.getByText('Select Brand')).toBeVisible();

    // Easy Fit defaults to Uniqlo auto-selected.
    // Check if Uniqlo button has class indicating selection (border-pure-white) or just check if "Enter Fitting Room" is enabled.
    const enterFittingRoomBtn = page.getByRole('button', { name: /Enter Fitting Room/i });
    await expect(enterFittingRoomBtn).toBeEnabled();

    // We can also switch brand manually.
    // Note: buttons in BrandSelector might have text "ZARA" and role "button"
    await page.getByRole('button', { name: 'ZARA' }).click();

    await enterFittingRoomBtn.click();

    // 4. Fitting Room
    // Should see "Fitting Room" component.
    // Home.tsx: "Back to brands" button visible.
    await expect(page.getByRole('button', { name: /Back to brands/i })).toBeVisible();

    // Should see 3D canvas (maybe check for canvas element)
    // Note: WebGL might not be available in all headless environments
    // We check if the container exists at least.
    await expect(page.locator('.glass-card').first()).toBeVisible();
  });
});
