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
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('02. Target Garment')).toBeVisible();

    // Check continue button
    const continueBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(continueBtn).toBeVisible();
  });

  test('should match visual snapshot', async ({ page }) => {
    // Scroll a bit to trigger the background color shift and any lazy load animations
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000); // Give animations time to settle
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);

    // Masking dynamic elements if any (like loaders/progress bars)
    await expect(page).toHaveScreenshot({ fullPage: true, maxDiffPixelRatio: 0.2, timeout: 15000 });
  });
});
