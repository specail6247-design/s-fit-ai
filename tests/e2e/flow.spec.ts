import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to SPA and Luxury flows', async ({ page }) => {
    // Go to SPA
    await page.locator("a[href='/spa']").click();
    await expect(page).toHaveURL(/\/spa/);

    // Go back home using a direct goto to avoid locator flakiness across layout changes
    await page.goto('/');
    await expect(page).toHaveURL(/\/$/);

    await page.locator("a[href='/luxury']").click();
    await expect(page).toHaveURL(/\/luxury/);
  });
});
