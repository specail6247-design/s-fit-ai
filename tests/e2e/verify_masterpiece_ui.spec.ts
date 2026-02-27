import { test, expect } from '@playwright/test';

test('verify masterpiece fit ui', async ({ page }) => {
  // Navigate to the ROOT page, as that's where RealLifeFitting is mounted
  await page.goto('/');

  await page.waitForTimeout(2000);

  // Take a screenshot to inspect current state
  await page.screenshot({ path: 'test/masterpiece_ui_verification.png', fullPage: true });

  // Verify Header - using more specific locator
  await expect(page.locator('h1')).toContainText('M_FIT');
  await expect(page.locator('h1')).toContainText('MASTERPIECE');

  // Verify Brand Library Toggle
  await page.getByRole('button', { name: 'BRAND LIBRARY' }).click();

  // Verify Categories
  await expect(page.getByRole('button', { name: 'tops' })).toBeVisible();

  // Verify Generate Button
  await expect(page.getByRole('button', { name: 'GENERATE MASTERPIECE' })).toBeVisible();

});
