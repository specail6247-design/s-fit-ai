import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Masterpiece try on flow', async ({ page }) => {
    // Wait for the intro animation to complete
    await page.waitForTimeout(2000);

    // 1. Click "TRY IT ON" button
    const tryItOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryItOnBtn).toBeVisible();
    await tryItOnBtn.click();

    // 2. We should see the Masterpiece Fitting Room interface
    // Look for typical Masterpiece elements. The original flow went to a Brand Selector,
    // but the new RealLifeFitting handles the full experience directly.

    // We check for the 3D canvas container or some control buttons that appear
    // The Masterpiece UI (FittingRoom.tsx) has buttons for Masterpiece Mode, Macro, Heatmap
    await expect(page.getByRole('button', { name: 'Macro' })).toBeVisible();

    // Check if the auto-cycle or settings are present
    await expect(page.getByText('Masterpiece')).toBeVisible();
  });
});
