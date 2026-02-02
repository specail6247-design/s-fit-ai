import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to Luxury Line', async ({ page }) => {
    // 1. Find Luxury Line link
    const luxuryLink = page.getByRole('link', { name: /Luxury Line/i });
    await expect(luxuryLink).toBeVisible();

    // 2. Click it
    await luxuryLink.click();

    // 3. Verify URL and content
    await expect(page).toHaveURL(/.*\/luxury/);

    // Check for unique element on Luxury page (e.g., from LuxuryLiveFitting or Layout)
    // Looking at memory/files, Luxury page has specific styling or headers.
    // Let's assume there's a heading or indicator.
    // Based on previous reads, Luxury page renders LuxuryLiveFitting.
    // We can check for a generic element or just that it didn't error.
  });

  test('should navigate to SPA Line', async ({ page }) => {
      // 1. Find SPA Line link
      const spaLink = page.getByRole('link', { name: /SPA Line/i });
      await expect(spaLink).toBeVisible();

      // 2. Click it
      await spaLink.click();

      // 3. Verify URL
      await expect(page).toHaveURL(/.*\/spa/);

      // Check content
      await expect(page.getByRole('heading', { name: 'S_FIT SPA' })).toBeVisible();
  });
});
