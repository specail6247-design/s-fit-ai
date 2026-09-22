import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title', async ({ page }) => {
    // Check for visual text
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('M_FIT');
  });

  test('should display main components', async ({ page }) => {
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('02. Target Garment')).toBeVisible();

    // Check continue button
    const continueBtn = page.getByRole('button', { name: /MASTERPIECE FIT/i });
    await expect(continueBtn).toBeVisible();
  });
});
