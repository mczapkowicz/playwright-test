import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage.ts';

test.describe('Search', () => {
  test('search results', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.visit();
    await homePage.searchTerm('bank');
    await expect(page.locator('text=Search Results')).toBeVisible();
    const results = await page.locator('ul > li > a');
    await expect(results).toHaveCount(2);
  });
});
