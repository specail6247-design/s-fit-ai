import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title', async ({ page }) => {
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('S_FIT NEO');
  });

  test('should display mode selection options', async ({ page }) => {
    // Check for presence of elements on RealLifeFitting
    await expect(page.getByText('Identification')).toBeVisible();
    await expect(page.getByText('Target Garment')).toBeVisible();

    // Check action buttons
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();
  });

  test('should match visual snapshot', async ({ page }) => {
    // Wait slightly for things to render correctly before attempting a snapshot
    // to give WebKit time to stabilize its view dimensions and render the canvas
    await page.waitForTimeout(2000);
    // The WebGL canvas in RealLifeFitting causes unstable screenshots and flakiness
    // Mask the 3D canvas out so it doesn't cause diff failures
    await expect(page).toHaveScreenshot({
      fullPage: true,
      maxDiffPixelRatio: 0.2,
      animations: 'disabled',
      timeout: 30000,
      mask: [page.locator('.absolute.inset-0.flex.items-center.justify-center.text-\\[\\#007AFF\\]')]
    });
  });
});
