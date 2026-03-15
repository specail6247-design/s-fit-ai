import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the correct title', async ({ page }) => {
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('S_FIT NEO');
  });

  test('should display essential UI elements', async ({ page }) => {
    // Check for presence of essential elements on the new RealLifeFitting screen
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('02. Target Garment')).toBeVisible();

    // Check TRY IT ON button
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();

    // Check Login button
    const loginBtn = page.getByRole('button', { name: 'LOGIN' });
    await expect(loginBtn).toBeVisible();
  });

  test('should match visual snapshot', async ({ page }) => {
    // Disable animations and wait for any loaders to settle before snapshot
    await expect(page).toHaveScreenshot({ fullPage: true, animations: "disabled", maxDiffPixelRatio: 0.1 });
  });
});
