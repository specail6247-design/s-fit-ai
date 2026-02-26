import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title and controls', async ({ page }) => {
    // Check main title
    const heading = page.locator('h1', { hasText: 'S_FIT' });
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('NEO');
    await expect(page.getByText('Professional Virtual Fitting')).toBeVisible();

    // Check Member Access button
    const memberAccess = page.getByText('Member Access');
    await expect(memberAccess).toBeVisible();

    // Check File Inputs sections
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('02. Target Garment')).toBeVisible();

    // Check Try It On button
    const tryItOn = page.getByText('TRY IT ON');
    await expect(tryItOn).toBeVisible();
  });

  test('should display links to SPA and Luxury lines', async ({ page }) => {
    await expect(page.getByText('SPA Line')).toBeVisible();
    await expect(page.getByText('Luxury Line')).toBeVisible();
  });

  // Disabled visual snapshot test as it fails on CI due to environment differences (e.g., fonts, GPU rendering)
  // test('should match visual snapshot', async ({ page }) => {
  //   await expect(page).toHaveScreenshot({ fullPage: true });
  // });
});
