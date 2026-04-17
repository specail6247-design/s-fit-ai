import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Easy Fit flow', async ({ page }) => {
    // 1. Enter SPA Line (previously Easy Fit Mode)
    // The root page uses RealLifeFitting, which has a link "SPA Line"
    await page.getByRole('link', { name: /SPA Line/i }).click();

    // Verify URL change
    await page.waitForURL('**/spa');
    await expect(page.getByRole('heading', { name: 'S_FIT SPA' })).toBeVisible();
  });
});
