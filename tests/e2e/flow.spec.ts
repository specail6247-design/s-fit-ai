import { test, expect } from '@playwright/test';

test.describe('Real Life Fitting Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should handle missing uploads gracefully', async ({ page }) => {
    const tryBtn = page.getByRole('button', { name: /TRY IT ON/i });

    // We mock the alert function to ensure it gets called and doesn't block the test
    page.on('dialog', dialog => dialog.accept());

    await tryBtn.click();

    // Test that we remain on the same page and no result is shown yet
    await expect(page.getByText('PROCESSING DATA...')).not.toBeVisible();
  });

  test('should open global modals from footer links', async ({ page }) => {
    // 1. Support Hub
    await page.getByRole('button', { name: /Support/i }).click();
    await expect(page.getByRole('heading', { name: 'Support Hub' })).toBeVisible();
    await page.getByLabel('Close modal', { exact: false }).or(page.locator('button:has(svg)')).nth(1).click();

    // Give it time to close
    await page.waitForTimeout(500);

    // 2. Privacy Modal
    await page.getByRole('button', { name: /Privacy/i }).click();
    await expect(page.getByRole('heading', { name: 'Information We Collect' })).toBeVisible();
    await page.getByLabel('Close modal').click();
  });
});
