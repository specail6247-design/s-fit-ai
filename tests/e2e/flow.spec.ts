import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete RealLifeFitting flow', async ({ page }) => {
    // 1. Initial view verification
    await expect(page.getByText('Professional Virtual Fitting')).toBeVisible();

    // 2. Test interaction
    // The page uses a try-on button
    const tryOnBtn = page.getByRole('button', { name: 'TRY IT ON' });
    await expect(tryOnBtn).toBeVisible();

    // Should open the support hub
    const supportHubButton = page.getByLabel("Open Support Hub");
    await supportHubButton.click();

    // Wait for Support Hub to open
    const howToFitTab = page.getByText("How to Fit");
    await expect(howToFitTab).toBeVisible();

    // Close the Support Hub (Click outside or X)
    const closeHubBtn = page.getByRole('button', { name: 'Close Support Hub' });
    await expect(closeHubBtn).toBeVisible();
  });
});
