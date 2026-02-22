import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title', async ({ page }) => {
    // The title in layout or metadata might be different, but let's check for visual text first
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('S_FIT');
    await expect(heroHeading).toContainText('NEO');
  });

  test('should display main interaction elements', async ({ page }) => {
    // Check for upload sections
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('02. Target Garment')).toBeVisible();

    // Check for "TRY IT ON" button
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();

    // Check for navigation links
    await expect(page.getByText('SPA Line')).toBeVisible();
    await expect(page.getByText('Luxury Line')).toBeVisible();
  });
});
