import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete RealLifeFitting flow', async ({ page }) => {
    // 1. We are on the RealLifeFitting page natively.
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();

    // 2. Simulate providing inputs (Upload User Photo, Select Garment)
    // Create dummy base64 images to bypass file chooser
    const dummyImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
    const buffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');

    // Set input files programmatically since we have input[type="file"] with IDs
    await page.locator('input#user-upload[type="file"]').setInputFiles({
        name: 'user.png',
        mimeType: 'image/png',
        buffer
    });

    await page.locator('input#garment-upload[type="file"]').setInputFiles({
        name: 'garment.png',
        mimeType: 'image/png',
        buffer
    });

    // 3. Try It On click triggers processing
    await tryOnBtn.click({ force: true });

    // 4. Check for result modal or fallback image
    // The component defaults to demo mode if no backend is provided, producing mock-result-sfit.png
    // Using string matching for AI GENERATED_ text
    await expect(page.getByText('AI GENERATED_')).toBeVisible({ timeout: 30000 });

    // Should see a close button in the result overlay
    const closeBtn = page.getByRole('button', { name: /Close/i });
    await expect(closeBtn).toBeVisible();

    // Close modal
    await page.evaluate(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Close'));
        if (btn) (btn as HTMLButtonElement).click();
    });

    // Ensure we return to base state
    await expect(page.getByRole('button', { name: /TRY IT ON/i })).toBeVisible();
  });
});
