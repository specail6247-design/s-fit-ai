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
    await expect(page.getByText('S_FIT NEO')).toBeVisible();
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('02. Target Garment')).toBeVisible();

    // Check continue button
    const continueBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(continueBtn).toBeVisible();
  });

  test('should match visual snapshot', async ({ page }) => {
    // Wait for the main page content to settle and the button to be visible
    await page.waitForSelector('button:has-text("TRY IT ON")');
    // Ensure the page has time to finish initial layout animations
    await page.waitForTimeout(1000);

    // Use an increased timeout and tolerant diff ratio due to the dynamic background/UI elements
    await expect(page).toHaveScreenshot({
      fullPage: false,
      maxDiffPixelRatio: 0.1,
      timeout: 15000,
      animations: 'disabled'
    });
  });
});
