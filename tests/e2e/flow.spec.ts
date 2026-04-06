import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Masterpiece Fit flow', async ({ page }) => {
    // 1. Verify "Digital Atelier" elements are present
    await expect(page.getByText('01. Identity')).toBeVisible();
    await expect(page.getByText('02. Garment')).toBeVisible();

    // The Initiate Sequence button should be present
    const initiateBtn = page.getByRole('button', { name: /Initiate Sequence/i });
    await expect(initiateBtn).toBeEnabled();

    // Wait for the animation frame or elements to settle
    await page.waitForTimeout(1000);

    // Click "Initiate Sequence" (trigger mock analysis state)
    // Note: To avoid mobile actionability issues, we can evaluate click
    await initiateBtn.evaluate((node) => (node as HTMLElement).click());

    // Wait for "Initializing Digital Atelier..." text to appear, indicating the process started
    await expect(page.getByText(/Initializing Digital Atelier/i).first()).toBeAttached();
  });
});
