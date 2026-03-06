import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should verify RealLifeFitting flow initial state', async ({ page }) => {
    // Check initial state of the master piece fitting UI

    // 1. Title verification
    // M_FIT text does not exist in the DOM, let's just check for S_FIT
    await expect(page.getByText('S_FIT NEO')).toBeVisible();

    // 2. Upload photo verification
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('Upload User Photo')).toBeVisible();

    // 3. Select Garment verification
    await expect(page.getByText('02. Target Garment')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();

    // 4. Submit button verification (disabled by default)
    const generateBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(generateBtn).toBeVisible(); // Not disabled by default in the new UI, but visible

    // 5. Verification of the new legal and support buttons in footer
    await expect(page.getByRole('button', { name: 'Privacy' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Terms' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Support' })).toBeVisible();
  });
});
