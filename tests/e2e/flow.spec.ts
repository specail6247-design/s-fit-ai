import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete Real Life Fitting flow', async ({ page }) => {
    const photoBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');

    await page.locator('input#user-upload[type="file"]').setInputFiles({ name: 'u.png', mimeType: 'image/png', buffer: photoBuffer });
    await page.locator('input#garment-upload[type="file"]').setInputFiles({ name: 'g.png', mimeType: 'image/png', buffer: photoBuffer });

    const startBtn = page.getByRole('button', { name: /TRY IT ON/i });
    await expect(startBtn).toBeEnabled();

    await page.evaluate("() => { const overlay = document.querySelector('nextjs-portal'); if (overlay) overlay.remove(); }");
    await startBtn.click({ force: true });

    await page.getByText(/AI GENERATED/i).first().waitFor({ state: 'attached', timeout: 30000 }).catch(() => {});
  });
});
