import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should initialize RealLifeFitting flow', async ({ page }) => {
    // Verify upload elements exist
    await expect(page.locator('#user-upload')).toBeAttached();
    await expect(page.locator('#garment-upload')).toBeAttached();

    // Verify the Generate button is present
    const generateBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(generateBtn).toBeVisible();
  });
});
