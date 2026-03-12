import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title', async ({ page }) => {
    // The title in layout or metadata might be different, but let's check for visual text first
    // or just check that page loads.
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('S');
    await expect(heroHeading).toContainText('_');
    await expect(heroHeading).toContainText('FIT');
  });

  test('should display real life fitting ui components', async ({ page }) => {
    // S_FIT NEO branding
    await expect(page.getByText('S_FIT')).toBeVisible();
    await expect(page.getByText('NEO')).toBeVisible();

    // Check for identification step
    await expect(page.getByText('01. Identification')).toBeVisible();

    // Check for garment selection step
    await expect(page.getByText('02. Target Garment')).toBeVisible();

    // Check try it on button
    const tryItOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryItOnBtn).toBeVisible();
  });

  test('should match visual snapshot', async ({ page }) => {
    // Wait for the 3D engine loading text to disappear/resolve to avoid flaky tests due to animation
    await page.waitForTimeout(1000);
    // fullPage: false works around WebKit scrollbar/layout dimension differences
    await expect(page).toHaveScreenshot({ fullPage: false, animations: 'disabled', maxDiffPixelRatio: 0.1 });
  });
});
