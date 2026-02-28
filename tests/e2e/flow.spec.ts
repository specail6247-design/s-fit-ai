import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should interact with the main fitting view', async ({ page }) => {
    // Verify Try It On button exists
    const tryItOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryItOnBtn).toBeVisible();

    // Click it without uploading files, should trigger an alert (handled automatically or safely ignored by playwright)
    // We just verify we can click it and it's interactive

    // Instead of clicking and handling alert, let's verify navigation links
    const spaLink = page.getByRole('link', { name: /SPA Line/i });
    const luxuryLink = page.getByRole('link', { name: /Luxury Line/i });

    await expect(spaLink).toBeVisible();
    await expect(luxuryLink).toBeVisible();

    // Click Privacy Policy to open modal
    await page.getByRole('button', { name: 'Privacy Policy' }).click();
    await expect(page.getByText('Data Collection & Usage')).toBeVisible();

    // Close the modal
    await page.getByRole('button', { name: 'I Understand' }).click();
    // Use locator with longer timeout or check for main page element
    await expect(tryItOnBtn).toBeVisible();
  });
});
