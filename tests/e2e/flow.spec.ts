import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to Simple Try-On page', async ({ page }) => {
    // 1. Wait for link to SPA mode
    const spaLink = page.getByRole('link', { name: /SPA Line/i });
    await expect(spaLink).toBeVisible();

    // 2. Navigate to SPA Mode
    await spaLink.click();

    // 3. Verify Navigation
    await expect(page.getByRole('heading', { name: 'S_FIT SPA' })).toBeVisible();
  });
});
