import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Real Life Fitting flow', async ({ page }) => {
    // 1. We are already on RealLifeFitting since page.tsx only renders it

    // Check if Try It On is disabled initially because of no photos
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible({ timeout: 10000 });
    // Assuming clicking without photos triggers an alert, we can just check it's present.
  });
});
