import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should trigger Masterpiece Try On alert when files are missing', async ({ page }) => {
    // Check for Masterpiece UI elements
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('02. Target Garment')).toBeVisible();

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Click "TRY IT ON" button
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();

    // Set up dialog handler to catch the alert
    let dialogMessage = '';
    page.on('dialog', async dialog => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });

    await tryOnBtn.click();

    // Wait a brief moment for the alert to trigger
    await page.waitForTimeout(500);

    // Verify the alert was triggered with the correct message
    expect(dialogMessage).toContain('Please upload both User Photo and Garment');
  });

  test('should navigate to SPA Line and Luxury Line', async ({ page }) => {
    // Check SPA Line link
    const spaLink = page.getByRole('link', { name: /SPA Line/i });
    await expect(spaLink).toBeVisible();
    await expect(spaLink).toHaveAttribute('href', '/spa');

    // Check Luxury Line link
    const luxuryLink = page.getByRole('link', { name: /Luxury Line/i });
    await expect(luxuryLink).toBeVisible();
    await expect(luxuryLink).toHaveAttribute('href', '/luxury');
  });
});
