import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title', async ({ page }) => {
    // The new RealLifeFitting UI displays S_FIT NEO
    const header = page.getByText('S_FIT NEO', { exact: false });
    await expect(header.first()).toBeVisible();
  });

  test('should display masterpiece fitting options', async ({ page }) => {
    // Check for presence of new RealLifeFitting stages
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('02. Target Garment')).toBeVisible();

    // Check action button
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();
  });

  test('should match visual snapshot', async ({ page }) => {
    // Wait for the main elements to ensure the page has settled
    await expect(page.getByText('S_FIT NEO').first()).toBeVisible();
    // Configure tolerant snapshot matching for cross-environment rendering differences
    await expect(page).toHaveScreenshot({ fullPage: true, maxDiffPixelRatio: 0.1 });
  });
});
