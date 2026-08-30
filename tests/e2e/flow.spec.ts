import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display initial state', async ({ page }) => {
    // Initial state should prompt user to upload photos
    await expect(page.getByText('Upload User Photo').first()).toBeVisible();
  });
});
