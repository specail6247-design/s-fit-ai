import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Try On flow', async ({ page }) => {
    await expect(page.getByText('Identification')).toBeVisible();
    await expect(page.getByText('Target Garment')).toBeVisible();
    await expect(page.getByRole('button', { name: '⚡️ TRY IT ON' })).toBeVisible();
  });
});
