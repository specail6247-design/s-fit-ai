import { test, expect } from '@playwright/test';

test.describe('RealLifeFitting Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the main S_FIT NEO header', async ({ page }) => {
    // Check for the main branding
    await expect(page.getByRole('heading', { name: /S_FIT NEO/i })).toBeVisible();
    await expect(page.getByText('Professional Virtual Fitting')).toBeVisible();
  });

  test('should display identification and garment inputs', async ({ page }) => {
    // Check for "01. Identification"
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('Upload User Photo')).toBeVisible();

    // Check for "02. Target Garment"
    await expect(page.getByText('02. Target Garment')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();
  });

  test('should display action buttons', async ({ page }) => {
    // Check for "TRY IT ON" button
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();

    // Check for navigation links
    await expect(page.getByRole('link', { name: /SPA Line/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Luxury Line/i })).toBeVisible();
  });
});
