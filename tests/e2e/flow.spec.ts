import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should verify RealLifeFitting elements presence', async ({ page }) => {
    // Root page is now RealLifeFitting instead of ModeSelector
    await expect(page.getByText('Upload User Photo')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();

    // The TRY IT ON button should be visible and initially disabled (opacity-50)
    const tryBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryBtn).toBeVisible();
    await expect(tryBtn).toBeDisabled();

    // Check if the placeholder illustrations/text are visible
    await expect(page.getByText('👤').first()).toBeVisible();
    await expect(page.getByText('👕').first()).toBeVisible();
  });
});
