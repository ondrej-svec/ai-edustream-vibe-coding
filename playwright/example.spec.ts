import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load and display the app title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('brewmatch-aroma-advisor');
    // Optionally check for a visible heading or main content
    // await expect(page.getByRole('heading')).toBeVisible();
  });
}); 