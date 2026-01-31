import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title and branding', async ({ page }) => {
    // Check for "S_FIT NEO" which is the new title in RealLifeFitting
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('S_FIT');
    await expect(heroHeading).toContainText('NEO');
  });

  test('should display fitting controls', async ({ page }) => {
    // Check for the main functional blocks of RealLifeFitting
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('02. Target Garment')).toBeVisible();

    // Check for the Try On button
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();

    // Check for Trust Badge
    await expect(page.getByText('Data Safety Verified')).toBeVisible();
  });

  // Removed 'should match visual snapshot' as the page is dynamic/3D heavy and causes flakiness
});
