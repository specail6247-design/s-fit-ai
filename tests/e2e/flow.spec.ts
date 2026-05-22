import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display main app', async ({ page }) => {
    await expect(page.getByText('Professional Virtual Fitting')).toBeVisible();
    await expect(page.getByRole('button', { name: /TRY IT ON/i })).toBeVisible();
  });
});
