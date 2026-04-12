import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete RealLifeFitting to SPA flow', async ({ page }) => {
    // 1. Home page checks
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('02. Target Garment')).toBeVisible();

    // 2. Navigate to SPA Line
    // Find the SPA Line link and click it
    const spaLink = page.getByRole('link', { name: /SPA Line/i });
    await expect(spaLink).toBeVisible();
    await spaLink.click();

    // Wait for URL change
    await page.waitForURL('**/spa');

    // 3. Verify SPA Line page is displayed
    const startARBtn = page.getByRole('link', { name: /START AR FITTING/i });
    await expect(startARBtn).toBeAttached({ timeout: 10000 });
    await expect(startARBtn).toBeVisible();
  });
});
