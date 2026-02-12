import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title', async ({ page }) => {
    // Check for "S_FIT NEO"
    const heading = page.getByRole('heading', { name: /S_FIT/i });
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('NEO');
  });

  test('should display navigation options', async ({ page }) => {
    // Check for SPA and Luxury links
    await expect(page.getByRole('link', { name: 'SPA Line' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Luxury Line' })).toBeVisible();

    // Check action button
    const tryItOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryItOnBtn).toBeVisible();
  });

  test('should match visual snapshot', async ({ page }) => {
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
});
