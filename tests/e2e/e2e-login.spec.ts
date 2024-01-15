import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage.ts';
import { HomePage } from '../page-objects/HomePage.ts';

test.describe('Login / Login flow', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await loginPage.visit();
  });

  test('Login error', async ({ page }) => {
    await homePage.clickSignInButton();
    await loginPage.login('test', 'test');
    const errorMessage = await page.getByText(
      'Login and/or password are wrong.',
    );
    await expect(errorMessage).toBeVisible();
  });

  test('Login success', async ({ page }) => {
    await homePage.clickSignInButton();
    await loginPage.login('username', 'password');
    await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html');
    const title = page.getByText('Transfer Money & Make Payments');
    await expect(title).toBeVisible();
  });

  test('Logout', async ({ page }) => {
    await homePage.clickSignInButton();
    await loginPage.login('username', 'password');
    await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html');
    await page.goto('http://zero.webappsecurity.com/logout.html');
    await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html');
  });
});
