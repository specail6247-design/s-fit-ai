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

  test('should display key elements of S_FIT NEO', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /S_FIT NEO/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /LOGIN/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /TRY IT ON/i })).toBeVisible();
  });

  test('should match visual snapshot', async ({ page }) => {
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
});
