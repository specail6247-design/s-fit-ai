import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title', async ({ page }) => {
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('Masterpiece Fit');
    await expect(heroHeading).toContainText('M_FIT');
  });

  test('should display M_FIT setup options', async ({ page }) => {
    await expect(page.getByText('Global Brand Tier')).toBeVisible();
    await expect(page.getByText('Accessory Layer')).toBeVisible();

    // Check main generate button
    const generateBtn = page.getByRole('button', { name: /Generate Masterpiece/i });
    await expect(generateBtn).toBeVisible();
  });

  test('should match visual snapshot', async ({ page }) => {
    await expect(page).toHaveScreenshot({ fullPage: false });
  });
});
