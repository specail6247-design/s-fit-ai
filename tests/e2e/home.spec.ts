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

  test('should display mode selection options', async ({ page }) => {
    // Check for presence of mode cards
    await expect(page.getByText('VIBE CHECK')).toBeVisible();
    await expect(page.getByText('DIGITAL TWIN')).toBeVisible();
    await expect(page.getByText('EASY FIT')).toBeVisible();

    // Check continue button
    const continueBtn = page.getByRole('button', { name: /Continue/i });
    await expect(continueBtn).toBeVisible();
  });

  test('should match visual snapshot', async ({ page }) => {
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
});
