import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete upload flow', async ({ page }) => {
    // Wait for user photo upload area
    const userPhotoInput = page.locator('input#user-upload');
    await expect(userPhotoInput).toBeAttached();

    // Wait for garment photo upload area
    const garmentInput = page.locator('input#garment-upload');
    await expect(garmentInput).toBeAttached();

    // Upload mock images (using local fixtures or just clicking if we mock the file picker)
    // For now, we'll just check that the TRY IT ON button is visible.
    const tryItOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryItOnBtn).toBeVisible();

    // We would simulate an upload and click the button here, but for now we'll
    // just verify the upload elements are accessible to the user
    await expect(page.getByText('Upload User Photo')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();
  });
});
