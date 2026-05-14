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

  test('should display main elements', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Upload User Photo/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Upload Garment/i })).toBeVisible();
  });
});
