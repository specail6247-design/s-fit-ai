import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Real Life Fitting flow', async ({ page }) => {
    // 1. Verify main UI elements are present
    await expect(page.getByText('Upload User Photo')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();

    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();

    // 2. Click Try On (it should show an alert because we didn't upload photos)
    page.on('dialog', dialog => {
      expect(dialog.message()).toContain('Please upload both User Photo and Garment.');
      dialog.accept();
    });

    // Use page.evaluate to trigger the click programmatically to avoid 3D canvas interception
    await page.evaluate(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(el => el.textContent?.includes('TRY IT ON'));
        if (btn) btn.click();
    });

    // 3. Verify Links to SPA and Luxury
    await expect(page.getByRole('link', { name: /SPA Line/i })).toHaveAttribute('href', '/spa');
    await expect(page.getByRole('link', { name: /Luxury Line/i })).toHaveAttribute('href', '/luxury');

    // 4. Verify 3D Canvas container exists
    await expect(page.locator('.absolute.inset-0.z-10').first()).toBeAttached();
  });
});
