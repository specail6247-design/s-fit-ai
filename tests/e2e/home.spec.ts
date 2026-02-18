import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title and branding', async ({ page }) => {
    // New Header: S_FIT NEO
    const header = page.getByRole('heading', { name: /S_FIT/i });
    await expect(header).toBeVisible();
    await expect(header).toContainText('NEO');

    // Tagline
    await expect(page.getByText('Professional Virtual Fitting')).toBeVisible();
  });

  test('should display main interaction areas', async ({ page }) => {
    // 1. Identification (User Photo)
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('Upload User Photo')).toBeVisible();

    // 2. Target Garment
    await expect(page.getByText('02. Target Garment')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();

    // 3. Try On Button (initially visible)
    await expect(page.getByRole('button', { name: /TRY IT ON/i })).toBeVisible();
  });

  test('should display navigation links', async ({ page }) => {
    // SPA Line & Luxury Line links
    await expect(page.getByRole('link', { name: /SPA Line/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Luxury Line/i })).toBeVisible();
  });
});
