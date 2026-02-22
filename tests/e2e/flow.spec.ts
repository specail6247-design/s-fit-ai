import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should allow navigating to Luxury Line', async ({ page }) => {
    // Check if the Luxury Line link is visible
    const luxuryLink = page.getByText('Luxury Line');
    await expect(luxuryLink).toBeVisible();

    // Click on Luxury Line
    await luxuryLink.click();

    // Verify navigation (should probably go to /luxury)
    await expect(page).toHaveURL(/.*luxury/);

    // Verify Luxury page content
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  });

  test('should allow navigating to SPA Line', async ({ page }) => {
    // Check if the SPA Line link is visible
    const spaLink = page.getByText('SPA Line');
    await expect(spaLink).toBeVisible();

    // Click on SPA Line
    await spaLink.click();

    // Verify navigation
    await expect(page).toHaveURL(/.*spa/);

    // Verify SPA page content
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  });

  test('should show upload inputs', async ({ page }) => {
    // Check if file inputs exist (even if hidden)
    const userUpload = page.locator('#user-upload');
    await expect(userUpload).toBeAttached();

    const garmentUpload = page.locator('#garment-upload');
    await expect(garmentUpload).toBeAttached();
  });
});
