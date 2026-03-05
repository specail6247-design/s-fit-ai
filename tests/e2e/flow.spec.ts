import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Masterpiece Fit flow', async ({ page }) => {
    // 1. Verify Masterpiece Fit UI is loaded
    await expect(page.getByText('S_FIT NEO')).toBeVisible();
    await expect(page.getByText('01. Identification')).toBeVisible();

    // 2. Upload mocks
    // The test runner doesn't have actual files, but the button handles missing files gracefully and falls back to demo mode in components/RealLifeFitting.tsx

    // 3. Click TRY IT ON button
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeEnabled();

    // During tests, since API mocking in playwright might be necessary if backend is not fully reliable in CI,
    // intercept the API call and return the fallback URL
    await page.route('/api/try-on/masterpiece', async route => {
      const json = { videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' };
      await route.fulfill({ json });
    });

    await tryOnBtn.click();

    // 4. Verify output or UI change
    // Wait for the processing to complete and the video container to appear
    // The video has a close button and M_FIT AI MOTION badge
    // Setting timeout to 25s as the fake loader animation runs for 20s
    const videoBadge = page.getByText('M_FIT AI MOTION_');
    await expect(videoBadge).toBeVisible({ timeout: 25000 });
  });
});
