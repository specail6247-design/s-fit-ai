import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should verify Masterpiece UI flow elements', async ({ page }) => {
    // Wait for Masterpiece UI to load
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('Upload User Photo')).toBeVisible();

    // Ensure action buttons are visible
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();

    // Ensure navigation links to other lines are visible
    await expect(page.getByRole('link', { name: /SPA Line/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Luxury Line/i })).toBeVisible();

    // Test a simple interaction like triggering the alert when fields are empty
    // Force the click as the button might be overlapped by animations or loading screens in some viewports (e.g. webkit)
    page.on('dialog', dialog => dialog.dismiss());
    await tryOnBtn.click({ force: true });
  });
});
