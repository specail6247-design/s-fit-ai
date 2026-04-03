import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete RealLifeFitting flow', async ({ page }) => {
    // Wait for the container to render. Since it's a SPA and there may be transitions, wait for it.
    await page.waitForSelector('text=Upload User Photo', { state: 'attached' });
    await expect(page.getByText('Upload User Photo').first()).toBeAttached();

    // Select the SPA Line
    await page.getByText('SPA Line').click({ force: true });

    // Wait for navigation or check if the URL contains /spa
    await page.waitForURL('**/spa');
    await expect(page.url()).toContain('/spa');
  });
});
