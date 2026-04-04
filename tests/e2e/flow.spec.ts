import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Easy Fit flow', async ({ page }) => {
    // 1. RealLifeFitting Mode replaces EASY FIT
    // The application's root page (/) renders RealLifeFitting directly.
    // Wait for main elements
    await expect(page.getByText('Select Garment')).toBeVisible();

    // Wait for file input to exist
    const fileInput = page.locator('input[type="file"]').first();
    await expect(fileInput).toBeAttached();
  });
});
