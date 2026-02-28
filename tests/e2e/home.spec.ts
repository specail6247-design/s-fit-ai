import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title', async ({ page }) => {
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('S_FIT NEO');
  });

  test('should display fitting UI controls', async ({ page }) => {
    // Check for presence of identification upload
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('Upload User Photo')).toBeVisible();

    // Check for target garment upload
    await expect(page.getByText('02. Target Garment')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();

    // Check action button
    const tryItOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryItOnBtn).toBeVisible();
  });

  test('should match visual snapshot', async ({ page }) => {
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
});
