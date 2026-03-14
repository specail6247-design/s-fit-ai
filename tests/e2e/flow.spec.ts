import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Masterpiece Fit flow', async ({ page }) => {
    // Check for M_FIT specific header
    await expect(page.locator('h1')).toContainText('M_FIT');

    // Select 'K-Fashion' Tier
    await page.getByRole('button', { name: 'k fashion' }).click({ force: true });

    // Select 'dresses' Layer
    await page.getByRole('button', { name: 'dresses' }).click({ force: true });

    // Create a dummy image buffer for upload tests
    const dummyImageBuffer = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    );

    // 1. Identification (User Photo)
    const userPhotoInput = page.locator('input[id="user-upload"]');
    await userPhotoInput.setInputFiles({
      name: 'user.png',
      mimeType: 'image/png',
      buffer: dummyImageBuffer,
    });

    // 2. Target Garment
    const garmentPhotoInput = page.locator('input[id="garment-upload"]');
    await garmentPhotoInput.setInputFiles({
      name: 'garment.png',
      mimeType: 'image/png',
      buffer: dummyImageBuffer,
    });

    // 3. Generate Masterpiece
    const generateBtn = page.getByRole('button', { name: /Generate Masterpiece/i });
    await expect(generateBtn).toBeEnabled();
    await generateBtn.click({ force: true });

    // Wait for the AI GENERATED_ badge indicating the result overlay is attached
    const aiBadge = page.getByText('AI GENERATED_');
    await aiBadge.waitFor({ state: 'attached', timeout: 15000 }).catch(() => {});

    // Verify it's either attached or visible depending on animation state
    await expect(aiBadge).toBeAttached();

    // Close the result
    const closeBtn = page.getByRole('button', { name: 'Close' });
    if (await closeBtn.isVisible()) {
       await closeBtn.click({ force: true });
    }
  });
});
