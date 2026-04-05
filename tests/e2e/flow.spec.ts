import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Real Life Fitting flow', async ({ page }) => {
    // Check initial state
    await expect(page.getByText('Upload User Photo')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();

    // Verify TRY IT ON button is present
    const tryItOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryItOnBtn).toBeVisible();

    // Note: Since file uploads and Replicate AI generation take a long time and require API keys,
    // we will mostly verify the UI elements are present in the flow and the user can navigate to sub-routes.

    // Navigate to SPA Line
    await page.getByText('SPA Line', { exact: true }).click();
    await expect(page).toHaveURL(/.*spa/);

    // Go back and try Luxury Line
    await page.goto('/');
    await page.getByText('Luxury Line', { exact: true }).click();
    await expect(page).toHaveURL(/.*luxury/);
  });
});
