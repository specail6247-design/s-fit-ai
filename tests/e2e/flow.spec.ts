import { test, expect } from '@playwright/test';

test.describe('User Flow & Support Hub', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should open Support Hub and navigate tabs', async ({ page }) => {
    // 1. Open Support Hub
    const helpButton = page.getByRole('button', { name: 'Help & Support' });
    await expect(helpButton).toBeVisible();
    await helpButton.click();

    // Verify Drawer Opens
    const supportHubHeader = page.getByRole('heading', { name: 'Support Hub' });
    await expect(supportHubHeader).toBeVisible();

    // 2. Default Tab: Help & Guide
    await expect(page.getByText('Getting Started')).toBeVisible();
    await expect(page.getByText('Upload a clear, front-facing photo')).toBeVisible();

    // 3. Navigate to Legal Tab
    await page.getByRole('button', { name: 'Legal' }).click();
    await expect(page.getByText('Privacy Policy')).toBeVisible();
    await expect(page.getByText('Data Collection: We collect only the images')).toBeVisible();
    await expect(page.getByText('Terms of Service')).toBeVisible();

    // 4. Navigate to Report Tab
    await page.getByRole('button', { name: 'Report Issue' }).click();
    await expect(page.getByPlaceholder('e.g., Upload failed')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Send Report' })).toBeVisible();

    // 5. Close Support Hub
    const closeButton = page.locator('button > span.material-symbols-outlined:has-text("close")');
    await closeButton.click();
    await expect(supportHubHeader).not.toBeVisible();
  });

  test('should prevent Try On without images', async ({ page }) => {
    // Attempt to click Try On without uploading images
    // Note: The app uses `alert()` which stops execution unless handled.

    // Setup dialog handler
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Please upload both User Photo and Garment');
      await dialog.dismiss();
    });

    await page.getByRole('button', { name: /TRY IT ON/i }).click();
  });
});
