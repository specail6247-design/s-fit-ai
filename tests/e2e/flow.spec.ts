import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Real Life Fitting UI interactions', async ({ page }) => {
    // 1. Verify page has loaded by checking for primary elements
    await expect(page.getByText('Upload User Photo')).toBeVisible();

    // 2. We skip testing actual file uploads to avoid headless browser quirks
    // and verify the interaction states (e.g. modes).
    await expect(page.getByText('Luxury Line')).toBeVisible();
    await expect(page.getByText('SPA Line')).toBeVisible();

    // Verify the Try It On button exists
    const tryItOnBtn = page.getByRole('button', { name: /Try It On/i });
    await expect(tryItOnBtn).toBeVisible();

    // We do not click Try It On in this simple flow test since it requires image processing via backend
  });
});
