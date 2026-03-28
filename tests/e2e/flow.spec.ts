import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load Real Life Fitting flow correctly', async ({ page }) => {
    // 1. Wait for RealLifeFitting component to load
    await expect(page.getByText('Upload User Photo')).toBeVisible();

    // 2. Try-on button should be present
    const tryItOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryItOnBtn).toBeVisible();

    // 3. Top navigation features should be available
    const infoButton = page.getByRole('button', { name: /INFO/i });
    await expect(infoButton).toBeVisible();

    // Check Member Access
    const memberAccessBtn = page.getByRole('button', { name: /MEMBER ACCESS/i });
    await expect(memberAccessBtn).toBeVisible();

    // 4. Verify SupportHub Drawer Integration
    // Mitigate Next.js dev overlay intercepting clicks
    await page.evaluate("() => { const overlay = document.querySelector('nextjs-portal'); if (overlay) overlay.remove(); }");

    // Click INFO to open Support Hub
    await infoButton.click();

    // Support hub contents should be visible (allow time for framer-motion slide-out)
    await expect(page.getByText('Step 01: Identification')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Avoid Backlighting')).toBeVisible({ timeout: 10000 });

    // Close the drawer by clicking the backdrop
    await page.mouse.click(10, 10);
  });
});
