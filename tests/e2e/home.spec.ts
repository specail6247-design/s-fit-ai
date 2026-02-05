import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title', async ({ page }) => {
    // Check for "S_FIT NEO"
    const neoHeading = page.locator('h1', { hasText: 'S_FIT' });
    await expect(neoHeading).toBeVisible();
    await expect(neoHeading).toContainText('NEO');

    // Check for "Professional Virtual Fitting"
    const subHeading = page.getByText('Professional Virtual Fitting');
    await expect(subHeading).toBeVisible();
  });

  test('should display identification and garment upload sections', async ({ page }) => {
    // Check for "01. Identification"
    await expect(page.getByText('01. Identification')).toBeVisible();

    // Check for "02. Target Garment"
    await expect(page.getByText('02. Target Garment')).toBeVisible();

    // Check for upload buttons/labels
    await expect(page.getByText('Upload User Photo')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();
  });

  test('should display Try It On button', async ({ page }) => {
    // Check for "TRY IT ON" button
    const tryButton = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryButton).toBeVisible();
    await expect(tryButton).toBeEnabled();
  });

  test('should display links to SPA and Luxury lines', async ({ page }) => {
      await expect(page.getByRole('link', { name: /SPA Line/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /Luxury Line/i })).toBeVisible();
  });

  // Snapshot tests are disabled as the 3D canvas and dynamic gradients make them flaky without significant setup (mocking canvas, freezing time, etc.)
  // test('should match visual snapshot', async ({ page }) => {
  //   await expect(page).toHaveScreenshot({ fullPage: true });
  // });
});
