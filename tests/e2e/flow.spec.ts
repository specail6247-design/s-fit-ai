import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should allow interacting with RealLifeFitting flow', async ({ page }) => {
    // The root page renders RealLifeFitting directly.
    // We can check if the initial UI elements are present.
    await expect(page.locator('text=S_FIT')).toBeVisible();
    await expect(page.getByRole('button', { name: /Upload/i }).first()).toBeVisible();
  });
});
