import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should allow file upload interactions', async ({ page }) => {
    // Verify file inputs exist (but hidden usually)
    const userInput = page.locator('input[type="file"]').first();
    const garmentInput = page.locator('input[type="file"]').nth(1);

    await expect(userInput).toBeAttached();
    await expect(garmentInput).toBeAttached();

    // Verify "TRY IT ON" button exists
    await expect(page.getByRole('button', { name: 'TRY IT ON' })).toBeVisible();
  });
});
