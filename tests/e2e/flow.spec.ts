import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to SPA Line flow', async ({ page }) => {
    // 1. Click SPA Line Link
    await page.getByRole('link', { name: /SPA Line/i }).click({ force: true });

    // 2. Verify navigation to SPA Line
    await expect(page.getByRole('heading', { name: /S_FIT SPA/i }).first()).toBeAttached();
    await expect(page.getByRole('link', { name: /START AR FITTING/i })).toBeAttached();
  });

  test('should navigate to Luxury Line flow', async ({ page }) => {
    // 1. Click Luxury Line Link
    await page.getByRole('link', { name: /Luxury Line/i }).click({ force: true });

    // 2. Verify navigation to Luxury Line
    await expect(page.getByText('Authentic Render')).toBeVisible();
    await expect(page.getByRole('link', { name: /Try on Mannequin/i })).toBeVisible();
  });
});
