import { test, expect } from '@playwright/test';

test.describe('Real Life Fitting (New Landing)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title and action button', async ({ page }) => {
    // Check for S_FIT NEO heading
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('S_FIT');

    // Check for TRY IT ON button
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();
  });

  test('should allow file upload', async ({ page }) => {
    // Check if input exists (hidden)
    const fileInput = page.locator('input[type="file"]').first();
    await expect(fileInput).toBeAttached();
  });
});
