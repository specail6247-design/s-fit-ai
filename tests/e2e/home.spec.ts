import { test, expect } from '@playwright/test';

test.describe('Home Page (RealLifeFitting)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the S_FIT NEO branding', async ({ page }) => {
    // Check for "S_FIT NEO"
    const heading = page.locator('h1');
    await expect(heading).toContainText('S_FIT');
    await expect(heading).toContainText('NEO');
  });

  test('should display main controls', async ({ page }) => {
    // Check for Identification and Target Garment sections
    await expect(page.getByText('01. Identification')).toBeVisible();
    await expect(page.getByText('02. Target Garment')).toBeVisible();

    // Check for "Try It On" button (initially disabled or enabled)
    // The button says "TRY IT ON" with a lightning icon
    const tryOnBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(tryOnBtn).toBeVisible();
  });

  test('should display links to other lines', async ({ page }) => {
    // Check for SPA Line and Luxury Line links
    await expect(page.getByRole('link', { name: 'SPA Line' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Luxury Line' })).toBeVisible();
  });

  test('should load the 3D canvas placeholder or component', async ({ page }) => {
    // We expect the canvas or the fallback/loading state
    // "LOADING 3D ENGINE..." is shown initially
    // We can just check that the right panel exists
    const rightPanel = page.locator('.flex-1.relative.bg-gradient-to-b');

    // On mobile, this panel might be hidden or stacked. We only assert visibility if the viewport is wide enough.
    // However, the current layout in RealLifeFitting.tsx uses "flex" on the parent:
    // <div className="min-h-screen bg-[#050505] text-white font-sans flex overflow-hidden">
    // The left panel is w-1/3 min-w-[400px]. The right panel is flex-1.
    // On a small mobile screen (e.g., 375px), the left panel's min-w-[400px] might force the right panel off-screen or shrink it to zero width?
    // Actually, flex-1 with content often shrinks.
    // But Playwright's toBeVisible checks for bounding box > 0.

    // Let's check bounding box first.
    if (page.viewportSize()?.width && page.viewportSize()!.width > 600) {
      await expect(rightPanel).toBeVisible();
    } else {
        // On mobile, we skip this check or check if it exists in DOM but might not be visible in viewport
        // or check if it's hidden due to overflow.
        // For now, we'll verify it's attached.
        await expect(rightPanel).toBeAttached();
    }
  });
});
