import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Easy Fit flow', async ({ page }) => {
    // 1. Select Easy Fit Mode
    // Wait for the element to be attached to the DOM first
    const easyFitCard = page.getByText('EASY FIT');
    await easyFitCard.waitFor({ state: 'attached' });

    // Scroll into view to ensure visibility on mobile
    await easyFitCard.scrollIntoViewIfNeeded();

    // Force click to ensure it hits even if covered or slightly off-screen in mobile
    // And increase timeout just in case animations are slow
    await easyFitCard.click({ force: true, timeout: 10000 });

    // Verify selection (border color change or checkmark)
    // Note: The UI might have changed, check if "Continue" button appears or is enabled
    // We try to find the button by accessible name or text
    const continueToModeBtn = page.getByRole('button', { name: /Continue|Start/i }).first();

    // Sometimes the button is only visible after selection
    await expect(continueToModeBtn).toBeVisible({ timeout: 10000 });
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
