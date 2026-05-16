import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title', async ({ page }) => {
    // Check if the title text is rendered. We are looking for "S_FIT NEO"
    const heroHeading = page.getByRole('heading', { name: 'S_FIT NEO' });
    await expect(heroHeading).toBeVisible();
  });

  test('should display identification options', async ({ page }) => {
    // Check for presence of the file uploads in RealLifeFitting
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('02. Target Garment')).toBeVisible();
    await expect(page.getByRole('button', { name: /TRY IT ON/i })).toBeVisible();
  });
});
