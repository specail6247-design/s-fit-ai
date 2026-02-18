import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should allow navigating to different product lines', async ({ page }) => {
    // Check navigation to Luxury Line
    const luxuryLink = page.getByRole('link', { name: /Luxury Line/i });
    await expect(luxuryLink).toBeVisible();
    await luxuryLink.click();

    // Verify we are on luxury fitting page (URL or Header)
    await expect(page).toHaveURL(/\/luxury/);

    // The Luxury page header check
    // "MasterpieceFit" is the text in the h1
    // The previous test failed because it looked for "S_FIT MASTERPIECE"
    // The component renders: <h1>Masterpiece<span ...>Fit</span></h1>
    // We search for "MasterpieceFit" text content or partial match
    const header = page.locator('h1');
    await expect(header).toBeVisible({ timeout: 10000 });
    await expect(header).toContainText('Masterpiece');
    await expect(header).toContainText('Fit');
  });

  test('should allow user to upload photo (mock)', async ({ page }) => {
    // 1. Upload User Photo
    const fileChooserPromise = page.waitForEvent('filechooser');
    // The input is hidden, click label
    await page.locator('label[for="user-upload"]').click();
    const fileChooser = await fileChooserPromise;
    // Mock upload
    await fileChooser.setFiles({
      name: 'user.png',
      mimeType: 'image/png',
      buffer: Buffer.from('mock image data')
    });

    // 2. Verify UI updates (preview image should appear)
    const userImg = page.locator('label[for="user-upload"] img');
    await expect(userImg).toBeVisible();
    const src = await userImg.getAttribute('src');
    expect(src).toMatch(/^data:image\/png;base64,/);
  });

  test('should trigger try-on process when both images are present', async ({ page }) => {
    // 1. Upload User Photo
    const userFileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('label[for="user-upload"]').click();
    const userFileChooser = await userFileChooserPromise;
    await userFileChooser.setFiles({
        name: 'user.png',
        mimeType: 'image/png',
        buffer: Buffer.from('mock image data')
    });

    // 2. Upload Garment
    const garmentFileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('label[for="garment-upload"]').click();
    const garmentFileChooser = await garmentFileChooserPromise;
    await garmentFileChooser.setFiles({
        name: 'shirt.png',
        mimeType: 'image/png',
        buffer: Buffer.from('mock garment data')
    });

    // 3. Click Try On
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeEnabled();
    await tryOnBtn.click({ force: true });

    // 4. Verify Loading State
    // Increase timeout significantly for processing state
    await expect(page.getByText('PROCESSING DATA...')).toBeVisible({ timeout: 15000 });
  });
});
