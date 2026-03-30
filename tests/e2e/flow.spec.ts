import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete SPA Line flow', async ({ page }) => {
    // 1. Verify we are on RealLifeFitting component
    // We should see "Upload User Photo" and "Select Garment"
    await expect(page.getByText('Upload User Photo')).toBeVisible();

    // Ensure SPA Line is selected by default or select it
    // The button might have text "SPA Line"
    const spaLineBtn = page.getByText('SPA Line');
    await expect(spaLineBtn).toBeVisible();
    await spaLineBtn.click({ force: true });

    // Once we click SPA Line, it might navigate. Let's verify we are on the new page
    // by checking for a known element, such as "START AR FITTING"

    // Check if START AR FITTING link/button exists on the SPA page
    const startArFittingBtn = page.getByRole('link', { name: /START AR FITTING/i });
    await expect(startArFittingBtn).toBeVisible();

    // We can navigate to the fitting view
    await startArFittingBtn.click();

    // We can't easily test webcam in E2E headless without mocks,
    // but we can check if the basic UI for the SPA Fitting page is there.
    await expect(page.locator('text=Live Fit AI')).toBeVisible();
  });
});
