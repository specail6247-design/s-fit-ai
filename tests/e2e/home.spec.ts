import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the Masterpiece UI elements', async ({ page }) => {
    // Wait for the loader to clear and the main layout to settle
    await page.waitForTimeout(2000); // Masterpiece mode has a heavy tracing box animation

    // The title in the new UI
    await expect(page.getByText('S_FIT NEO')).toBeVisible();

    // Check for presence of identification and target steps
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('02. Target Garment')).toBeVisible();

    // Check Try It On button
    const tryItOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryItOnBtn).toBeVisible();
  });

  test('should match visual snapshot', async ({ page }) => {
    // Wait for the Masterpiece loader (tracing box) to finish before snapshotting
    await page.waitForTimeout(3000);
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page).toHaveScreenshot({ fullPage: true, maxDiffPixelRatio: 0.1 });
  });
});
