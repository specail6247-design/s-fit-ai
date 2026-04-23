import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should verify basic Neo interface', async ({ page }) => {
    // Wait for the Neo interface to load
    await expect(page.getByRole('heading', { name: /S_FIT NEO/i })).toBeVisible();

    // Verify file upload inputs exist
    await expect(page.getByText('Upload User Photo')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();

    // Verify navigation links
    const spaLink = page.getByRole('link', { name: /SPA Line/i });
    const luxuryLink = page.getByRole('link', { name: /Luxury Line/i });

    await expect(spaLink).toBeVisible();
    await expect(luxuryLink).toBeVisible();
  });
});
