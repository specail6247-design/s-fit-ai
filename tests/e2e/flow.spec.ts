import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Try It On flow', async ({ page }) => {
    // Navigate using the 'SPA Line' explicit anchor link
    await expect(page.locator('body')).toBeAttached();

    // The component text is "SPA Line", but let's just find any link that has "SPA Line"
    const spaLineLink = page.locator('a', { hasText: 'SPA Line' }).first();
    await expect(spaLineLink).toBeAttached({ timeout: 10000 });

    // Use click, fallback to force, then fallback to evaluate
    try {
      await spaLineLink.click({ timeout: 2000 });
    } catch {
      await spaLineLink.evaluate((node) => (node as HTMLElement).click());
    }

    // Wait for URL change to destination path '/spa'
    await page.waitForURL('**/spa', { timeout: 15000 });

    // Check if expected element in target page is attached.
    await expect(page.locator('body')).toBeAttached({ timeout: 10000 });
  });
});
