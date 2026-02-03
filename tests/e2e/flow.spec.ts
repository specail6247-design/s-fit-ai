import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to Luxury Line', async ({ page }) => {
    // 1. Click Luxury Line link
    await page.getByText('Luxury Line').click();

    // 2. Verify navigation to luxury page
    await expect(page).toHaveURL(/\/luxury/);

    // 3. Check for Luxury Mode specific elements
    // Based on LuxuryLiveFitting.tsx implementation
    await expect(page.locator('text=S_FIT LUXE')).toBeVisible({ timeout: 10000 });
  });
});
