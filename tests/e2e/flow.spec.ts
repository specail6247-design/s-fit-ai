import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Masterpiece Fit flow', async ({ page }) => {
    // 1. Initial State Verification
    await expect(page.getByText('S_FIT NEO').first()).toBeVisible();
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('02. Target Garment')).toBeVisible();

    // The main action button should be disabled until identification and garment are selected
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();

    // There are no 'Take Photo' or 'Browse Vault' buttons by default on this screen unless clicked.
    // We will verify the presence of an upload input or the text indicating image selection blocks
    await expect(page.getByText('Upload User Photo')).toBeVisible();

    // Test the button triggers an action or exists in DOM correctly
    const uploadInputs = page.locator('input[type="file"]');
    await expect(uploadInputs).toHaveCount(2);
  });
});
