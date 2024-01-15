import { test } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage.ts';
import { LoginPage } from '../page-objects/LoginPage.ts';
import { Navbar } from '../page-objects/components/Navbar.ts';
import { TransferFundsPage } from '../page-objects/TransferFundsPage.ts';

test.describe('Transfer funds', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let navbar: Navbar;
  let transferFundsPage: TransferFundsPage;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    navbar = new Navbar(page);
    transferFundsPage = new TransferFundsPage(page);
    await homePage.visit();
    await homePage.clickSignInButton();
    await loginPage.login('username', 'password');
    await page.goto('http://zero.webappsecurity.com/online-banking.html');
  });

  test('should submit transaction', async ({ page }) => {
    await navbar.clickOnTab('Transfer Funds');
    await transferFundsPage.submitTransaction();
    await transferFundsPage.assertSuccessMessage();
  });
});
