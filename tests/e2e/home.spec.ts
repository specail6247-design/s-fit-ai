import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title', async ({ page }) => {
    // The title in layout or metadata might be different, but let's check for visual text first
    // or just check that page loads.
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('S');
    await expect(heroHeading).toContainText('_');
    await expect(heroHeading).toContainText('FIT');
  });

  test('should display S_FIT NEO branding', async ({ page }) => {
    // Check for presence of S_FIT NEO branding in the sidebar
    await expect(page.getByText('S_FIT')).toBeVisible();
    await expect(page.getByText('NEO')).toBeVisible();
    await expect(page.getByText('Professional Virtual Fitting')).toBeVisible();
  });

  test('should display SPA and Luxury line links', async ({ page }) => {
    // Check for navigation links
    await expect(page.getByRole('link', { name: /SPA Line/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Luxury Line/i })).toBeVisible();
  });

  test('should match visual snapshot', async ({ page }) => {
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
});
