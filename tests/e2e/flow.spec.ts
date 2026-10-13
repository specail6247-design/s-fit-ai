import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate fitting controls', async ({ page }) => {
    // 1. Verify Fitting Controls are present
    await expect(page.getByText('Upload User Photo')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();

    // 2. Try It On button should be visible
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();

    // 3. 3D Canvas wrapper should be present (note: may be hidden on small mobile viewports)
    const rightPanel = page.locator('.relative.bg-gradient-to-b').first();
    await expect(rightPanel).toBeAttached();
  });
});
