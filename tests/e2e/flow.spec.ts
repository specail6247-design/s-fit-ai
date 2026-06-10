import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should verify the basic flow on NEO homepage', async ({ page }) => {
    // 1. Initial State Checks
    await expect(page.getByText('Identification')).toBeVisible();
    await expect(page.getByText('Target Garment')).toBeVisible();

    // 2. Try-on button exists
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();

    // 3. Navigation to other apps
    const spaLink = page.locator('a[href="/spa"]');
    const luxuryLink = page.locator('a[href="/luxury"]');
    await expect(spaLink).toBeVisible();
    await expect(luxuryLink).toBeVisible();
  });
});
