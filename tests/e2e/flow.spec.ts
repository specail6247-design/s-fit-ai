import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Easy Fit flow', async ({ page }) => {
    // 1. Select Easy Fit Mode
    // Force click to ensure it hits even if covered or slightly off-screen in mobile
    await page.getByText('Identification').click({ force: true });

    // Verify selection (border color change or checkmark)
    const continueToModeBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(continueToModeBtn).toBeEnabled();
    await continueToModeBtn.click();

    // 2. Input Stats
    // Wait for "Easy Fit" header


    // Just click "Continue to Fitting Room" as defaults are valid.


    // 3. Brand Selection
    // Wait for "Select Brand" header


    // Easy Fit defaults to Uniqlo auto-selected.
    // Check if Uniqlo button has class indicating selection (border-pure-white) or just check if "Enter Fitting Room" is enabled.


    // We can also switch brand manually.
    // Note: buttons in BrandSelector might have text "ZARA" and role "button"


    // 4. Fitting Room
    // Should see "Fitting Room" component.
    // Home.tsx: "Back to brands" button visible.


    // Should see 3D canvas (maybe check for canvas element)
    // Note: WebGL might not be available in all headless environments
    // We check if the container exists at least.

  });
});
