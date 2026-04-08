import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should verify RealLifeFitting workflow', async ({ page }) => {
    // 1. Ensure RealLifeFitting elements are present instead of legacy modes
    await expect(page.getByText('SPA Line')).toBeVisible();

    // 2. Interact with the root page components
    // Upload User Photo mock click (we can't easily handle native file dialogues in basic E2E without setup, but we check presence)
    await expect(page.getByText('Upload User Photo')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();

    // 3. Verify the primary action button is available
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();
  });
});
