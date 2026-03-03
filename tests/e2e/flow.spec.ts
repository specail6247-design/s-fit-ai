import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should verify RealLifeFitting elements are present', async ({ page }) => {
    // Wait for "Identification" section header
    await expect(page.getByText('01. Identification')).toBeVisible();

    // Check for "Upload User Photo" button/area
    await expect(page.getByText('Upload User Photo')).toBeVisible();

    // Wait for "Garment Selection" section header
    await expect(page.getByText('02. Target Garment')).toBeVisible();

    // Try On button should exist but we won't click it to avoid API calls or complex mock setups for the file inputs
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();
  });
});
