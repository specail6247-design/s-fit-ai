import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render RealLifeFitting container', async ({ page }) => {
    await expect(page.locator('.min-h-screen')).toBeVisible();
    await expect(page.getByText(/User Photo/i)).toBeVisible();
    await expect(page.getByText(/Garment/i)).toBeVisible();
  });
});
