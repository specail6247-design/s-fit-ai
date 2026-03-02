import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title and branding', async ({ page }) => {
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('S_FIT');
    await expect(heroHeading).toContainText('NEO');
  });

  test('should display main interaction controls', async ({ page }) => {
    // Check for user photo input
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('Upload User Photo')).toBeVisible();

    // Check for garment input
    await expect(page.getByText('02. Target Garment')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();

    // Check try-on button
    const tryBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryBtn).toBeVisible();

    // Check footer links
    await expect(page.getByText('Privacy', { exact: true })).toBeVisible();
    await expect(page.getByText('Terms', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: /Support/i })).toBeVisible();
  });
});
