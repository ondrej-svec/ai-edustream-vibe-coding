import { test, expect } from '@playwright/test';

test.describe('Coffee Match Flow', () => {
  test('user can complete the taste quiz and see results', async ({ page }) => {
    await page.goto('/');
    // Select at least one flavor
    await page.getByLabel('Fruity').click();
    // Select a milk preference
    await page.getByLabel('Black coffee only').click();
    // Optionally adjust budget (slider interaction is tricky, so we can skip or add later)
    // Submit the form
    await page.getByRole('button', { name: /submit|find|match/i }).click();
    // Expect navigation to /beans or a result page
    await expect(page).toHaveURL(/beans/);
    // Optionally check for a result element
    // await expect(page.getByText(/your matches|results/i)).toBeVisible();
  });
}); 