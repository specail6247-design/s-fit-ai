import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Easy Fit flow', async ({ page }) => {
    // 1. Verify RealLifeFitting Page
    await expect(page.getByText('Upload User Photo')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();
    await expect(page.getByText('SPA Line')).toBeVisible();

    // Select the SPA Line mode by clicking on it
    await page.getByText('SPA Line').click({ force: true });

    // Wait a short moment for transitions
    await page.waitForTimeout(500);

    // Wait for elements to be fully rendered
    await page.waitForTimeout(500);

    // The "TRY IT ON" button requires userImage and garmentImage to process.
    // Wait for the URL to change to the SPA mode if that's what clicking the link does.
    // In RealLifeFitting, SPA Line is an <a href="/spa"> which navigates away.
    await page.waitForURL('**/spa');

    // Verify we landed on the SPA page.
    // Look for something that definitely exists on the SPA page.
    await expect(page.getByText('START AR FITTING').first()).toBeAttached({ timeout: 10000 });

    // As per instructions, "verify element visibility or state instead of triggering native file pickers if full file upload testing is not strictly required."
  });
});
