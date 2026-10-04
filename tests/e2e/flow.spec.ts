import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should verify main elements are present on landing', async ({ page }) => {
    await expect(page.getByRole('button', { name: '?' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'MEMBER ACCESS' })).toBeVisible();
    await expect(page.getByRole('button', { name: /TRY IT ON/i })).toBeVisible();
  });
});
