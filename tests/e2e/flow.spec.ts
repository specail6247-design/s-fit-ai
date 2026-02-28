import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete flow by navigating to SPA Line', async ({ page }) => {
    // Navigate to SPA Line
    await page.getByText('SPA Line').click({ force: true });

    // We can just verify the page path has changed, indicating successful navigation.
    await expect(page).toHaveURL(/.*spa.*/);
  });
});
