import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Real Life Fitting flow', async ({ page }) => {
    // 1. Identification
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('Upload User Photo')).toBeVisible();

    // 2. Target Garment
    await expect(page.getByText('02. Target Garment')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();

    // Try-On button should be present
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();
  });
});
