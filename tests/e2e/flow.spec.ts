import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display try it on button', async ({ page }) => {
    const tryBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryBtn).toBeVisible();

    const fileInputs = page.locator('input[type="file"]');
    await expect(fileInputs).toHaveCount(2);
  });
});
