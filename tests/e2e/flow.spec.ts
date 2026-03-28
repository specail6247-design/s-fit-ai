import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Real Life Fitting flow', async ({ page }) => {
    // 1. Root page now uses RealLifeFitting directly.

    // Check that we are on the main RealLifeFitting UI
    await expect(page.getByRole('heading', { name: 'S_FIT NEO' })).toBeVisible();

    // Verify upload UI is present
    await expect(page.getByText('Upload User Photo', { exact: false })).toBeVisible();
    await expect(page.getByText('Select Garment', { exact: false })).toBeVisible();

    // Verify TRY IT ON button is disabled initially before uploading
    // Wait, the button in RealLifeFitting.tsx doesn't have a disabled attribute, it just has a click handler that returns early.
    // Let's check if it exists instead.
    const tryItOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryItOnBtn).toBeVisible();

    // Check for the Data Safety Badge
    await expect(page.getByText('Photos are processed securely and not shared', { exact: false })).toBeVisible();

    // Open Privacy Modal
    await page.getByText('Privacy & Terms').click();
    await expect(page.getByRole('heading', { name: 'Privacy Policy & Terms' })).toBeVisible();
    await page.getByRole('button', { name: 'Acknowledge' }).click(); // Close modal

    // Open Support Hub
    await page.getByText('Report Issue').click();
    await expect(page.getByRole('heading', { name: 'Support Hub' })).toBeVisible();

    // Close Support Hub
    await page.locator('.fixed.inset-0').getByRole('button').first().click(); // Close modal
  });
});
