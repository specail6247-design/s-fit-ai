import { test, expect } from '@playwright/test';

test.describe('Home Page (RealLifeFitting)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the S_FIT NEO branding', async ({ page }) => {
    // Check for "S_FIT NEO"
    const heading = page.locator('h1');
    await expect(heading).toContainText('S_FIT');
    await expect(heading).toContainText('NEO');
  });

  test('should display main controls', async ({ page }) => {
    // Check for Identification and Target Garment sections
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('02. Target Garment')).toBeVisible();

    // Check for "Try It On" button (initially disabled or enabled)
    // The button says "TRY IT ON" with a lightning icon
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();
  });

  test('should display links to other lines', async ({ page }) => {
    // Check for SPA Line and Luxury Line links
    await expect(page.getByRole('link', { name: 'SPA Line' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Luxury Line' })).toBeVisible();
  });

  test('should load the 3D canvas placeholder or component', async ({ page }) => {
    // We expect the canvas or the fallback/loading state
    // "LOADING 3D ENGINE..." is shown initially
    // We can just check that the right panel exists
    const rightPanel = page.locator('.flex-1.relative.bg-gradient-to-b');
    await expect(rightPanel).toBeVisible();
  });
});
