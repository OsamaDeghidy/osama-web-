import { test, expect } from '@playwright/test';

test.describe('Smoke Test', () => {
  test('should navigate to home page and verify body content', async ({ page }) => {
    // Navigate to the base URL
    await page.goto('/');

    // Check that body or main element is visible
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
