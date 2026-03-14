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

  test('should display file upload options', async ({ page }) => {
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();

    const generateBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(generateBtn).toBeVisible();
  });

  test('should match visual snapshot', async ({ page }) => {
    await expect(page).toHaveScreenshot({ fullPage: false, maxDiffPixelRatio: 0.1, animations: 'disabled' });
  });
});
