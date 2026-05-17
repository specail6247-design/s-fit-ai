import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test('should pass a basic flow check', async ({ page }) => {
    await page.goto('/');
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
