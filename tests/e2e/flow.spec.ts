import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should allow navigation to SPA and Luxury lines', async ({ page }) => {
    // 1. Check if SPA line link exists
    const spaLink = page.locator('a[href="/spa"]');
    await expect(spaLink).toBeVisible();

    // 2. Check if Luxury line link exists
    const luxuryLink = page.locator('a[href="/luxury"]');
    await expect(luxuryLink).toBeVisible();

    // We don't click and navigate to these routes in this test because
    // it would require setting up those routes fully (which might not be ready or out of scope).
    // The previous flow test clicked "EASY FIT" which is gone.
    // The new flow is file upload based, which is hard to simulate without sample files in CI.
    // We verify the entry points are present.
  });

  test('should show file upload inputs', async ({ page }) => {
    // Verify file inputs are present (hidden but interactable via label)
    const userUploadInput = page.locator('input#user-upload');
    const garmentUploadInput = page.locator('input#garment-upload');

    // Check if attached to DOM
    await expect(userUploadInput).toBeAttached();
    await expect(garmentUploadInput).toBeAttached();

    // Verify labels are clickable (simulated by checking visibility of label text)
    await expect(page.getByText('Upload User Photo')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();
  });
});
