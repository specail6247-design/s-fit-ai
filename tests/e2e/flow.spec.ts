import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete basic flow', async ({ page }) => {
    // Check for presence of RealLifeFitting inputs
    await expect(page.getByText('Upload User Photo')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();

    // In a real e2e test we would upload files, but for this basic flow check
    // we ensure the TRY IT ON button is disabled initially or verify it's present.
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();

    // Verify luxury and spa navigation links
    await expect(page.getByText('SPA Line')).toBeVisible();
    await expect(page.getByText('Luxury Line')).toBeVisible();
  });
});
