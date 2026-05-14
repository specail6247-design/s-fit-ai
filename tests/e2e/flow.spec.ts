import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should see generate button after photo upload', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /S_FIT NEO/i })).toBeVisible();
    const tryOnBtn = page.getByRole('button', { name: /GENERATE TRY-ON/i });
    await expect(tryOnBtn).toBeVisible();
  });
});
