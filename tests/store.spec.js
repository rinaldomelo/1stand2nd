const { test, expect } = require('@playwright/test');

test.describe('1st and 2nd Store', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/1st.*2nd|Home/i);
  });

  test('navigation menu is visible', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('can view collections page', async ({ page }) => {
    await page.goto('/collections/all');
    await expect(page.locator('body')).toBeVisible();
  });

  test('cart page is accessible', async ({ page }) => {
    await page.goto('/cart');
    await expect(page.locator('body')).toBeVisible();
  });
});
