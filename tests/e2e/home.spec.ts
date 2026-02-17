import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title and branding', async ({ page }) => {
    // S_FIT NEO branding in RealLifeFitting
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('S_FIT');
    await expect(heroHeading).toContainText('NEO');
  });

  test('should display upload controls', async ({ page }) => {
    // Check for upload sections
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('02. Target Garment')).toBeVisible();

    // Check for "Try It On" button (initially present)
    const tryBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryBtn).toBeVisible();
  });

  test('should match visual snapshot', async ({ page }) => {
    // Wait for critical elements to stabilize
    await expect(page.locator('h1')).toBeVisible();
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
});
