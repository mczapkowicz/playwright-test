import { test, expect } from '@playwright/test';

test.describe('Visual regression test', () => {
  test('full page snapshot', async ({ page }) => {
    await page.goto('https://www.example.com');
    expect(await page.screenshot()).toMatchSnapshot('page.png');
  });

  test('element snapshot', async ({ page }) => {
    await page.goto('https://www.example.com');
    const headerElement = await page.locator('h1');
    expect(await headerElement?.screenshot()).toMatchSnapshot(
      'page-header.png',
    );
  });
});
