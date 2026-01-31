import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Real Life Fitting flow', async ({ page }) => {
    // 1. Verify we are on the main interface
    await expect(page.getByText('Professional Virtual Fitting')).toBeVisible();

    // 2. Simulate Uploads (Optional: Mock this if actual file upload is complex in headless)
    // For now, we verify that the inputs exist
    const userUploadInput = page.locator('input[id="user-upload"]');
    await expect(userUploadInput).toBeAttached();

    const garmentUploadInput = page.locator('input[id="garment-upload"]');
    await expect(garmentUploadInput).toBeAttached();

    // 3. Check for Footer Links to other lines
    await expect(page.locator('a[href="/spa"]')).toBeVisible();
    await expect(page.locator('a[href="/luxury"]')).toBeVisible();

    // 4. Check Legal Modal Trigger
    const legalBtn = page.getByRole('button', { name: /Privacy & Terms/i });
    await expect(legalBtn).toBeVisible();
    await legalBtn.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Privacy Policy')).toBeVisible();

    // Close modal
    await page.getByRole('button', { name: /I Understand/i }).click();
  });
});
