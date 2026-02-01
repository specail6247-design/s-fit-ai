import { test, expect } from '@playwright/test';

test.describe('Real Life Fitting (Home Page)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render the main RealLifeFitting component', async ({ page }) => {
    // Verify the page loads and displays the main container
    // Based on RealLifeFitting.tsx source code

    // Check for the main heading "S_FIT NEO"
    const heading = page.locator('h1');
    await expect(heading).toContainText('S_FIT');
    await expect(heading).toContainText('NEO');

    // Check for the "TRY IT ON" button
    const tryOnButton = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnButton).toBeVisible();

    // Check for navigation links
    await expect(page.getByRole('link', { name: /SPA Line/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Luxury Line/i })).toBeVisible();
  });

  test('should have a clean initial state', async ({ page }) => {
     // Verify basic elements are present without errors

     // Check for the 01. Identification label
     await expect(page.getByText('01. Identification')).toBeVisible();

     // Check for the 02. Target Garment label
     await expect(page.getByText('02. Target Garment')).toBeVisible();
  });
});
