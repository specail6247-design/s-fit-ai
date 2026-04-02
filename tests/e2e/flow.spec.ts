import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should trigger Try It On flow', async ({ page }) => {
    // Check for "TRY IT ON" button
    const tryBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryBtn).toBeVisible();

    // The logic inside TRY IT ON might just trigger AI Fitting state in RealLifeFitting
    // We don't have actual file uploads in this simple test to avoid flakiness,
    // but we can verify it's intractable.
    await expect(tryBtn).toBeEnabled();
  });
});
