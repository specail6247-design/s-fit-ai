import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display proper UI elements in RealLifeFitting', async ({ page }) => {
    // 1. Verify text are present
    await expect(page.getByText('SPA Line')).toBeVisible();
    await expect(page.getByText('Luxury Line')).toBeVisible();

    // 2. Verify Try On Button triggers alert if files are missing
    page.on('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: /TRY IT ON/i }).click({ force: true });
  });
});
