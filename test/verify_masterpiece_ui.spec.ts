import { test, expect } from '@playwright/test';

test('verify masterpiece fit ui', async ({ page }) => {
  // Navigate to the luxury fitting page
  await page.goto('http://localhost:3000/luxury/fitting');

  // Verify Header
  await expect(page.getByRole('heading', { name: /M_FIT/i })).toBeVisible();
  await expect(page.getByText(/MASTERPIECE/i)).toBeVisible();

  // Verify Brand Library Toggle
  await page.getByRole('button', { name: /BRAND LIBRARY/i }).click();

  // Verify Brand Logos (Gentle Monster should be present)
  await expect(page.getByAltText(/Gentle Monster/i)).toBeVisible();
  await expect(page.getByAltText(/GUCCI/i)).toBeVisible();

  // Verify Categories
  await expect(page.getByRole('button', { name: /tops/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /accessories/i })).toBeVisible();

  // Verify Generate Button
  await expect(page.getByRole('button', { name: /GENERATE MASTERPIECE/i })).toBeVisible();

  // Take Screenshot
  await page.screenshot({ path: 'test/masterpiece_ui_verification.png', fullPage: true });
});
