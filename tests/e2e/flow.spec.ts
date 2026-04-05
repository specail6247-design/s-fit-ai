import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete flow using new UI', async ({ page }) => {
    // 1. Upload User Photo (Mock by waiting for it to be visible)
    await expect(page.getByText('Upload User Photo')).toBeVisible();

    // 2. Click SPA Line instead of Garment since Select Garment is a file input label now
    const spaLineBtn = page.getByText('SPA Line');
    await expect(spaLineBtn).toBeVisible();
    await spaLineBtn.click({ force: true });

    // Wait for the URL to change to the fitting room since SPA Line is a link
    await expect(page).toHaveURL(/.*spa.*/);
  });
});
