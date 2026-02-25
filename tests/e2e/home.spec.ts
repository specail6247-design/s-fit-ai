import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title', async ({ page }) => {
    // The RealLifeFitting component renders "S_FIT NEO" in the header
    const header = page.getByRole('heading', { level: 1 });
    await expect(header).toBeVisible();
    await expect(header).toContainText('S_FIT');
    await expect(header).toContainText('NEO');
  });

  test('should display fitting controls', async ({ page }) => {
    // Check for presence of key elements in RealLifeFitting
    await expect(page.getByText('Upload User Photo')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();

    // Check for the main action button
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();
  });

  test('should match visual snapshot', async ({ page }) => {
    // Wait for the 3D engine text or canvas to be ready/stable before snapshot
    // The "LOADING 3D ENGINE..." text might appear, or the canvas itself.
    // Let's wait a bit to ensure stability.
    await page.waitForTimeout(2000);
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
});
