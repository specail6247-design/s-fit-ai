import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display S_FIT NEO interface', async ({ page }) => {
    // Check for new header
    await expect(page.getByRole('heading', { name: /S_FIT NEO/i })).toBeVisible();
    await expect(page.getByText('Professional Virtual Fitting')).toBeVisible();
  });

  test('should show upload inputs', async ({ page }) => {
    // Check for upload sections
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('02. Target Garment')).toBeVisible();

    // Check for "Try It On" button (initially present)
    await expect(page.getByRole('button', { name: /TRY IT ON/i })).toBeVisible();
  });

  test('should have navigation links to other lines', async ({ page }) => {
    await expect(page.getByRole('link', { name: /SPA Line/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Luxury Line/i })).toBeVisible();
  });
});
