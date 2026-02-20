import { test, expect } from '@playwright/test';

test.describe('Home Page (S_FIT NEO)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title and branding', async ({ page }) => {
    // Check for main title
    const mainTitle = page.getByRole('heading', { level: 1 });
    await expect(mainTitle).toBeVisible();
    await expect(mainTitle).toContainText('S_FIT');
    await expect(mainTitle).toContainText('NEO');

    // Check for subtitle
    await expect(page.getByText('Professional Virtual Fitting')).toBeVisible();
  });

  test('should display key UI elements', async ({ page }) => {
    // Check for Upload sections
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('Upload User Photo')).toBeVisible();

    await expect(page.getByText('02. Target Garment')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();

    // Check for Action Button
    const tryOnButton = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnButton).toBeVisible();
    await expect(tryOnButton).toBeEnabled();

    // Check for Navigation Links
    await expect(page.getByRole('link', { name: 'SPA Line' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Luxury Line' })).toBeVisible();
  });

  test('should display Trust & Safety badge', async ({ page }) => {
    // Check for Data Safety Badge
    await expect(page.getByText('Privacy Protected')).toBeVisible();
    await expect(page.getByText('Photos are processed securely and automatically deleted after use.')).toBeVisible();
  });

  // Visual snapshot temporarily disabled until baseline can be updated in CI
  // test('should match visual snapshot', async ({ page }) => {
  //   await expect(page).toHaveScreenshot({ fullPage: true });
  // });
});
