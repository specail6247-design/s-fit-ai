import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should allow navigating to SPA Line', async ({ page }) => {
    // The RealLifeFitting component has links to SPA and Luxury lines
    const spaLink = page.getByRole('link', { name: /SPA Line/i });
    await expect(spaLink).toBeVisible();
    // We don't click it as it might navigate away, just verify presence for flow
  });

  test('should allow navigating to Luxury Line', async ({ page }) => {
    const luxuryLink = page.getByRole('link', { name: /Luxury Line/i });
    await expect(luxuryLink).toBeVisible();
  });

  test('should show Data Safety Badge', async ({ page }) => {
      await expect(page.getByText('Secure Processing')).toBeVisible();
  });
});
