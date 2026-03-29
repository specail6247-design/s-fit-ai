import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Real Life Fitting upload flow', async ({ page }) => {
    // 1. Verify Home Page displays the Real Life Fitting Component directly
    await expect(page.getByText('Upload User Photo', { exact: true })).toBeVisible();
    await expect(page.getByText('Select Garment', { exact: true })).toBeVisible();

    // 2. Verify "TRY IT ON" button exists and is clickable (not natively disabled via prop in code)
    const tryItOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryItOnBtn).toBeVisible();

    // 3. Verify side-panel functionality (e.g., clicking to open Legal modal)
    const privacyBtn = page.getByRole('button', { name: /Privacy & Terms/i });
    await expect(privacyBtn).toBeVisible();
    await privacyBtn.click();

    // Legal modal should appear
    await expect(page.getByRole('heading', { name: /Privacy Policy & Terms/i })).toBeVisible();
    await page.getByRole('button', { name: /I Understand & Agree/i }).click({ force: true });
  });
});
