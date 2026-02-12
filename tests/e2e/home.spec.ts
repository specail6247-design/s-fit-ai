import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title and branding', async ({ page }) => {
    // New UI Branding: S_FIT NEO
    const branding = page.getByText('S_FIT');
    await expect(branding).toBeVisible();
    await expect(page.getByText('NEO')).toBeVisible();

    // Tagline
    await expect(page.getByText('Professional Virtual Fitting')).toBeVisible();
  });

  test('should display upload options', async ({ page }) => {
    // Check for upload sections
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('Upload User Photo')).toBeVisible();

    await expect(page.getByText('02. Target Garment')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();
  });

  test('should display action buttons', async ({ page }) => {
    // Try It On button
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();

    // Navigation links
    await expect(page.getByRole('link', { name: /SPA Line/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Luxury Line/i })).toBeVisible();
  });

  test('should display trust signals', async ({ page }) => {
    // Data Safety Badge
    await expect(page.getByText('Secure Processing')).toBeVisible();

    // Footer links
    await expect(page.getByRole('button', { name: 'Legal' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Support' })).toBeVisible();
  });
});
