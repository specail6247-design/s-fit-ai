import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to Luxury Line', async ({ page }) => {
    // 1. Navigate to Luxury Line
    await page.getByText('Luxury Line').click();

    // 2. Verify Luxury Fitting Page Load
    await expect(page).toHaveURL(/\/luxury/);

    // Check for Luxury Mode specific UI elements
    await expect(page.getByText('COLLECTION')).toBeVisible();

    // Check if product list is visible
    const productList = page.locator('.col-span-3').last(); // Assuming right sidebar
    await expect(productList).toBeVisible();
  });
});
