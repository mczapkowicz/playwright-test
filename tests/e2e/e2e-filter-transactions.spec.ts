import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage.ts';
import { LoginPage } from '../page-objects/LoginPage.ts';
import { FilterTransactionsPage } from '../page-objects/FilterTransactionsPage.ts';

test.describe.only('Filter transactions', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let filterTransactionsPage: FilterTransactionsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    filterTransactionsPage = new FilterTransactionsPage(page);

    await homePage.visit();
    await homePage.clickSignInButton();
    await loginPage.login('username', 'password');
    await page.goto('http://zero.webappsecurity.com/online-banking.html');
  });

  test('Verify the results for each account', async ({ page }) => {
    filterTransactionsPage.clickAccountActivityTab();
    filterTransactionsPage.selectAccount('Checking');
    await filterTransactionsPage.assertTransfersNumber(3);

    filterTransactionsPage.selectAccount('Loan');
    await filterTransactionsPage.assertTransfersNumber(2);

    filterTransactionsPage.selectAccount('Brokerage');
    await filterTransactionsPage.assertTransfersNumber(0);
    await filterTransactionsPage.assertNoResultsMessage();
  });
});
