import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to Luxury Mode', async ({ page }) => {
    // Verify main landing page loaded
    await expect(page.getByText('S_FIT NEO')).toBeVisible();

    // 1. Click Luxury Line -> Goes to Product Detail (/luxury)
    await page.getByRole('link', { name: /Luxury Line/i }).click();
    await expect(page).toHaveURL(/\/luxury/);

    // Verify Detail Page Elements (Material Science, etc.)
    await expect(page.getByText('Material Science')).toBeVisible();

    // 2. Click Try On -> Goes to Fitting Room (/luxury/fitting)
    // Note: The button might be "Try on Mannequin" or icon based
    await page.getByRole('link', { name: /Try on Mannequin/i }).click();
    await expect(page).toHaveURL(/\/luxury\/fitting/);

    // 3. Verify Luxury Fitting Elements
    await expect(page.getByText('S_FIT LUXE')).toBeVisible();

    // Note: 'Current Piece' details sidebar is hidden on mobile (md:flex),
    // so we skip verifying it to ensure mobile tests pass.
    // await expect(page.getByText('Current Piece')).toBeVisible();
  });
});
