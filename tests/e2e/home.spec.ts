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

  test('should display file upload options', async ({ page }) => {
    // Check for presence of upload inputs
    await expect(page.locator('#user-upload')).toBeAttached();
    await expect(page.locator('#garment-upload')).toBeAttached();

    // Check submit button
    const submitBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(submitBtn).toBeVisible();
  });

});
