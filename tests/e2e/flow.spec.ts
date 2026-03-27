import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should verify RealLifeFitting flow renders', async ({ page }) => {
    // 1. Verify Real Life Fitting components
    await expect(page.getByText('Upload User Photo', { exact: false })).toBeVisible();
    await expect(page.getByText('Select Garment', { exact: false })).toBeVisible();

    // "TRY IT ON" button should be visible
    const tryItOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryItOnBtn).toBeVisible();

    // (Mocking the complete file upload and generation flow is complex in this basic E2E,
    // so we verify that the interface is mounted and responds correctly to the initial state.)
  });
});
