import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load without errors', async ({ page }) => {
    // Just verify the page loads and has a basic element.
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
