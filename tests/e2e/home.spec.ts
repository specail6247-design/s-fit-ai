import { test, expect } from '@playwright/test';

test.describe('Home Page - S_FIT NEO', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct branding', async ({ page }) => {
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('S_FIT');
    await expect(heroHeading).toContainText('NEO');
    await expect(page.getByText('Professional Virtual Fitting')).toBeVisible();
  });

  test('should display file upload sections', async ({ page }) => {
    // Check for upload section headers or labels
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('Upload User Photo')).toBeVisible();

    await expect(page.getByText('02. Target Garment')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();
  });

  test('should display main action button', async ({ page }) => {
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();
    // It might be enabled or disabled depending on logic, but visibility is key
  });

  test('should display navigation links', async ({ page }) => {
    const spaLink = page.getByRole('link', { name: /SPA Line/i });
    await expect(spaLink).toBeVisible();

    const luxuryLink = page.getByRole('link', { name: /Luxury Line/i });
    await expect(luxuryLink).toBeVisible();
  });

  test('should match visual snapshot', async ({ page }) => {
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
});
