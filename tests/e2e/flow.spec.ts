import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should verify Real Life Fitting pipeline', async ({ page }) => {
    // Verify default RealLifeFitting state
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('Upload User Photo')).toBeVisible();

    // Verify brand filter buttons (e.g. ZARA) are present
    const zaraBtn = page.getByRole('button', { name: 'ZARA' });
    await expect(zaraBtn).toBeVisible();

    // Verify Masterpiece Generate button is visible but disabled (requires selection)
    const generateBtn = page.getByRole('button', { name: 'Generate Masterpiece' });
    await expect(generateBtn).toBeVisible();
    await expect(generateBtn).toBeDisabled();
  });
});
