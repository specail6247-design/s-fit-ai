import { test, expect } from '@playwright/test';

test.describe('Fitting Room Accessibility', () => {
  test('should have accessible controls in Fitting Room', async ({ page }) => {
    // Navigate to the simple test page which renders the FittingRoom directly
    await page.goto('/simple-test');

    // Wait for the canvas to load (indicating 3D engine is ready)
    // We increase timeout as 3D loading can be slow in CI/headless
    await page.waitForSelector('canvas', { timeout: 30000 });

    // Verify Masterpiece Toggle
    const masterpieceBtn = page.locator('button[aria-label="Toggle Masterpiece Mode"]');
    await expect(masterpieceBtn).toBeVisible({ timeout: 10000 });
    await expect(masterpieceBtn).toHaveAttribute('aria-pressed');

    // Verify Macro View Toggle
    const macroBtn = page.locator('button[aria-label="Toggle Macro View"]');
    await expect(macroBtn).toBeVisible();
    await expect(macroBtn).toHaveAttribute('aria-pressed');

    // Verify Heatmap Toggle
    const heatmapBtn = page.locator('button[aria-label="Toggle Fit Heatmap"]');
    await expect(heatmapBtn).toBeVisible();

    // Verify Share Button
    const shareBtn = page.locator('button[aria-label="Share this look"]');
    await expect(shareBtn).toBeVisible();
  });
});
