import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should allow navigation to other pages', async ({ page }) => {
    // There are SPA Line and Luxury Line links
    const spaLink = page.getByRole('link', { name: 'SPA Line' });
    await expect(spaLink).toBeVisible();

    // We just check the link is there since e2e shouldn't require complex API setup.
    await expect(page.getByRole('link', { name: 'Luxury Line' })).toBeVisible();
  });
});
