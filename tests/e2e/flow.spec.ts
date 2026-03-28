import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Real Life Fitting flow', async ({ page }) => {
    // Verify presence of elements (cannot actually upload files and run AI easily without mocks in e2e unless setup specifically)
    await expect(page.getByText('Upload User Photo')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();

    const continueBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(continueBtn).toBeVisible();
  });
});
