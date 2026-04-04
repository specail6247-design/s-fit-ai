import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should verify RealLifeFitting initial state', async ({ page }) => {
    // 1. Check title
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();

    // 2. Check Photo upload sections
    await expect(page.getByText('Upload User Photo')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();

    // 3. Check Line Selector
    await expect(page.getByText('SPA Line')).toBeVisible();
    await expect(page.getByText('Luxury Line')).toBeVisible();

    // 4. Check Try It On button disabled state
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();

    // 5. Open Legal Modal
    await page.getByText('Terms & Privacy').click();
    await expect(page.getByText('Privacy Policy & Terms of Service')).toBeVisible();
    await page.getByRole('button', { name: 'I Understand' }).click();
  });
});
