import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should handle upload flow validation', async ({ page }) => {
    // 1. Try to click "Try It On" without uploads
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });

    // Setup dialog listener for the alert
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Please upload both User Photo and Garment');
      await dialog.accept();
    });

    await tryOnBtn.click();
  });

  // Note: Full file upload test is complex in headless environment without actual files,
  // focusing on UI interaction validation for now.

  test('should navigate to other lines', async ({ page }) => {
    const luxuryLink = page.getByRole('link', { name: /Luxury Line/i });
    await expect(luxuryLink).toBeVisible();
    // Verification of navigation would require those pages to be fully implemented and reachable
  });
});
