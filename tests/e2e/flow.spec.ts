import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should see Masterpiece Fit upload section initially', async ({ page }) => {
    // 1. Initial State
    // Verify "Upload User Photo" is present indicating Masterpiece UI is active.
    await expect(page.getByText('01. Identification')).toBeVisible();

    // The start button should be visible but disabled until photo is uploaded
    const startFitBtn = page.getByRole('button', { name: /Start Masterpiece Fit/i });
    await expect(startFitBtn).toBeVisible();
    await expect(startFitBtn).toBeDisabled();
  });
});
