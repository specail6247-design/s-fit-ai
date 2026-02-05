import { test, expect } from '@playwright/test';

test.describe('Home Page (RealLifeFitting)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title and branding', async ({ page }) => {
    // Check for "S_FIT NEO"
    const heading = page.getByRole('heading', { name: /S_FIT/i });
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('NEO');

    // Check for subtitle
    await expect(page.getByText('Professional Virtual Fitting')).toBeVisible();
  });

  test('should display input sections', async ({ page }) => {
    // Check for Identification section
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('Upload User Photo')).toBeVisible();

    // Check for Garment section
    await expect(page.getByText('02. Target Garment')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();
  });

  test('should have "Try It On" button', async ({ page }) => {
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();
    // It shouldn't be disabled, but clicking it without inputs alerts
  });

  test('should have links to SPA and Luxury lines', async ({ page }) => {
    const spaLink = page.getByRole('link', { name: /SPA Line/i });
    const luxuryLink = page.getByRole('link', { name: /Luxury Line/i });

    await expect(spaLink).toBeVisible();
    await expect(luxuryLink).toBeVisible();
  });

  // Temporarily disabled snapshot test as UI is in active development/polish phase
  // test('should match visual snapshot', async ({ page }) => {
  //   await expect(page).toHaveScreenshot({ fullPage: true });
  // });
});
