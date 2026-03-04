import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Masterpiece Fit flow', async ({ page }) => {
    // Since RealLifeFitting is now the root component, verify its initial state and flow

    // 1. Verify headers
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('02. Target Garment')).toBeVisible();

    // 2. Verify navigation links
    await expect(page.locator('a[href="/spa"]')).toBeVisible();
    await expect(page.locator('a[href="/luxury"]')).toBeVisible();

    // 3. Initiate Try On (will trigger alert since no files uploaded, but verifies button exists)
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();

    // We will hook dialog event to prevent test from hanging on alert
    page.on('dialog', dialog => dialog.dismiss());
    await tryOnBtn.click({ force: true });
  });
});
