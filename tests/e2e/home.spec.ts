import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title', async ({ page }) => {
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('S_FIT');
    await expect(heroHeading).toContainText('NEO');
  });

  test('should display interface elements', async ({ page }) => {
    await expect(page.getByText('Upload User Photo')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();
    // Check for "SPA Line" and "Luxury Line" links
    await expect(page.getByRole('link', { name: 'SPA Line' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Luxury Line' })).toBeVisible();
  });
});
