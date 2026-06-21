import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete SPA line flow', async ({ page }) => {
    // 1. Select SPA Line Mode
    // Force click to ensure it hits even if covered or slightly off-screen in mobile
    await page.getByText('SPA Line').click({ force: true });

    // Wait for SPA page header
    await expect(page.getByRole('heading', { name: 'S_FIT SPA' })).toBeVisible();

    // Click "START AR FITTING"
    await page.getByRole('link', { name: /START AR FITTING/i }).click();
  });
});
