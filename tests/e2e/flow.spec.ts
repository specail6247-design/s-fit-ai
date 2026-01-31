import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to Luxury Line and enter fitting room', async ({ page }) => {
    // 1. Select Luxury Line from Home
    await page.getByText('Luxury Line').click({ force: true });

    // 2. Verify navigation to Luxury Detail Page
    await expect(page).toHaveURL(/\/luxury$/);

    // Check for "Try on Mannequin" button on the detail page
    const tryOnBtn = page.getByRole('link', { name: /Try on Mannequin/i });
    await expect(tryOnBtn).toBeVisible();

    // 3. Click to enter Fitting Room
    await tryOnBtn.click({ force: true });

    // 4. Verify navigation to Fitting Room
    await expect(page).toHaveURL(/\/luxury\/fitting$/);

    // FittingRoom.tsx has "Masterpiece ON" button
    // Use regex to match "Masterpiece ON" regardless of emoji
    await expect(page.getByRole('button', { name: /Masterpiece ON/i })).toBeVisible({ timeout: 20000 });
  });
});
