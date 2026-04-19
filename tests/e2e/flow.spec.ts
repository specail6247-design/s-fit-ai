import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete SPA Line flow', async ({ page }) => {
    // Navigate to SPA Line
    await page.getByText('SPA Line').click({ force: true });

    // Wait for SPA landing page to load by checking for its header
    await expect(page.getByRole('heading', { name: /S_FIT SPA/i })).toBeVisible();

    // Click 'START AR FITTING' to go to the actual fitting page
    await page.getByRole('link', { name: /START AR FITTING/i }).click();

    // Wait for fitting page to load
    await expect(page.getByText('Live Fit AI')).toBeVisible();

    // Verify selection form is present
    await expect(page.getByText('Body Stability')).toBeVisible();
  });
});
