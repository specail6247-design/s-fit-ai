import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should verify main interaction elements', async ({ page }) => {
    // 1. Verify "Identification" section
    await expect(page.getByText('Identification')).toBeVisible();
    await expect(page.getByText('Upload User Photo')).toBeVisible();

    // 2. Verify "Target Garment" section
    await expect(page.getByText('Target Garment')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();

    // 3. Verify "TRY IT ON" button exists
    const tryItOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryItOnBtn).toBeVisible();

    // Note: We cannot fully test file upload and API interaction easily in this E2E without mocks,
    // so we verify the UI structure is correct for the new "S_FIT NEO" flow.
  });
});
