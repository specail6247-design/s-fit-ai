import { test, expect } from '@playwright/test';

test.describe('RealLifeFitting Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display main components', async ({ page }) => {
    // Check main title
    await expect(page.getByRole('heading', { name: /S_FIT NEO/i })).toBeVisible();

    // Check upload labels
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('02. Target Garment')).toBeVisible();

    // Check try on button
    await expect(page.getByRole('button', { name: /TRY IT ON/i })).toBeVisible();

    // Check line links
    await expect(page.getByRole('link', { name: /SPA Line/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Luxury Line/i })).toBeVisible();

    // Check footer links
    await expect(page.getByRole('button', { name: /Privacy & Terms/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Report Issue/i })).toBeVisible();
  });

  test('should open support hub and legal modal', async ({ page }) => {
     await page.getByRole('button', { name: /Privacy & Terms/i }).click();
     await expect(page.getByRole('heading', { name: /Legal & Compliance/i })).toBeVisible();

     // Close it
     await page.mouse.click(10, 10);
     await page.waitForTimeout(500);

     await page.getByRole('button', { name: /Report Issue/i }).click();
     await expect(page.getByRole('heading', { name: /Support Hub/i })).toBeVisible();
  });
});
