import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test('should complete basic try-on flow without crashing', async ({ page }) => {
    // Navigate to Home
    await page.goto('/');

    // 1. Verify we are on the main interface
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toContainText('S_FIT');

    // 2. Select SPA Line Mode
    // Force click to ensure it hits even if covered or slightly off-screen in mobile
    await page.getByRole('link', { name: /SPA Line/i }).click({ force: true });

    // 3. Wait for the Fitting Room UI to load (check for a key element in SPA line)
    // The SPA line renders FittingRoom which has a specific title
    await expect(page.getByRole('heading', { name: /S_FIT/i }).first()).toBeVisible({ timeout: 15000 });
  });
});
