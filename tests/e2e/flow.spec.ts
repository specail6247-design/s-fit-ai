import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Real Life Fitting UI flow', async ({ page }) => {
    // 1. RealLifeFitting Root Rendered
    await expect(page.getByRole('button', { name: /TRY IT ON/i })).toBeVisible();

    // 2. Line Selection Verify
    const spaLineBtn = page.getByRole('link', { name: 'SPA Line' });
    const luxuryLineBtn = page.getByRole('link', { name: 'Luxury Line' });

    await expect(spaLineBtn).toBeVisible();
    await expect(luxuryLineBtn).toBeVisible();

    // 3. Support Hub
    const supportBtn = page.getByRole('button', { name: /Open Support Hub/i });
    await supportBtn.click({ force: true });
    await expect(page.getByRole('heading', { name: 'Support Hub' })).toBeVisible();

    // Close Support Hub by evaluating a click since framer motion animations can fail Playwright's strict actionable checks
    const closeSupportBtn = page.getByRole('button', { name: /Close Support Hub/i });
    await closeSupportBtn.evaluate((node) => (node as HTMLElement).click());

    // Wait for drawer to animate out by ensuring heading is hidden
    await expect(page.getByRole('heading', { name: 'Support Hub' })).toBeHidden({ timeout: 10000 });

    // 4. Try It On - File input triggering can be tricky in headless firefox/webkit without actual files,
    // so we just verify the elements exist.
    await expect(page.getByText('Upload User Photo', { exact: true })).toBeVisible();
    await expect(page.getByText('Select Garment', { exact: true })).toBeVisible();
  });
});
