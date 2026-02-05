import { test, expect } from '@playwright/test';

test.describe('User Flow (RealLifeFitting)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should allow navigation to Luxury Line', async ({ page }) => {
    const luxuryLink = page.getByRole('link', { name: /Luxury Line/i });
    await expect(luxuryLink).toBeVisible();
    await luxuryLink.click();

    // Verify navigation to /luxury
    await expect(page).toHaveURL(/.*\/luxury/);

    // Check for element on Luxury page (e.g., "S_FIT AI" header or specific content)
    await expect(page.getByText('S_FIT AI').first()).toBeVisible();
  });

  test('should validate empty inputs on Try On', async ({ page }) => {
    // Handling alert dialog
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Please upload both User Photo and Garment');
      await dialog.accept();
    });

    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await tryOnBtn.click();
  });
});
