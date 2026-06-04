import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should open support hub and close it', async ({ page }) => {
    // Open Support Hub
    const supportButton = page.locator('button').filter({ hasText: /Support/i });
    await supportButton.click();
    await expect(page.getByText('SUPPORT HUB')).toBeVisible();

    // Close Support Hub by clicking the close button inside it, or backdrop
    // Using close button inside SupportHub
    const closeButton = page.locator('button').filter({ hasText: '✕' });
    await closeButton.click();

    // Wait for the animation to complete and the hub to be hidden
    await expect(page.getByText('SUPPORT HUB')).toBeHidden({ timeout: 10000 });

    // Verify Try-On button is visible
    const tryOnButton = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnButton).toBeVisible();
  });
});
