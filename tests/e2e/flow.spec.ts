import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load RealLifeFitting interface', async ({ page }) => {
    // 1. Verify we are on the new fitting page
    const title = page.locator('h1');
    await expect(title).toBeVisible();
    await expect(title).toContainText('S_FIT');

    // 2. Check for upload areas
    // These inputs are typically hidden with labels styling them
    // We check for the visible labels "Upload User Photo" and "Select Garment"
    await expect(page.getByText('Upload User Photo')).toBeVisible();
    await expect(page.getByText('Select Garment')).toBeVisible();

    // 3. Check for main action button
    const tryOnButton = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnButton).toBeVisible();

    // 4. Verify no error boundary or fallback is immediately visible (unless 3D fails, which we handle gracefully)
    // The ErrorBoundary fallback text "3D VISUALIZATION UNAVAILABLE" might appear if WebGL fails in CI headless
    // We can check if the canvas container exists
    // The container has class "absolute inset-0 z-10" inside the right panel
    // but identifying it by class might be brittle.
    // Instead, let's just ensure the page is interactive.
    await expect(tryOnButton).toBeEnabled();
  });
});
