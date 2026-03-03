import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should verify Masterpiece Fit buttons are present', async ({ page }) => {
    // 1. Verify we are on the Masterpiece Fit UI
    await expect(page.getByText('01. Identification')).toBeVisible();

    // 2. The Masterpiece Fit button should be visible
    const fitBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(fitBtn).toBeVisible();

    // We can't fully mock an E2E file upload to external API in standard checks without a stub,
    // so we verify the key structural flow of the new UI instead of the old brand selector logic.
  });
});
