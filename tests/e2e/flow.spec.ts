import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // Skipped: "Easy Fit" mode is currently not accessible from the home page (RealLifeFitting is default).
  test.skip('should complete Easy Fit flow', async ({ page }) => {
    // 1. Select Easy Fit Mode
    // Force click to ensure it hits even if covered or slightly off-screen in mobile
    await page.getByText('EASY FIT').click({ force: true });

    // Verify selection (border color change or checkmark)
    const continueToModeBtn = page.getByRole('button', { name: /Continue →/i });

    // 2. Click Continue to enter mode
    await continueToModeBtn.click();

    // 3. Should be on /easy-fit or verify modal presence
    // For now, let's assume it opens a modal or navigates
    // await expect(page).toHaveURL(/.*easy-fit/);
  });
});
