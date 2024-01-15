import { test } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage.ts';
import { LoginPage } from '../page-objects/LoginPage.ts';
import { Navbar } from '../page-objects/components/Navbar.ts';
import { PayBillsNavbar } from '../page-objects/components/PayBillsNavbar.ts';
import { CurrencyExchangePage } from '../page-objects/CurrencyExchangePage.ts';

test.describe('Currency exchange', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let navbar: Navbar;
  let payBillsNavbar: PayBillsNavbar;
  let currencyExchangePage: CurrencyExchangePage;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    payBillsNavbar = new PayBillsNavbar(page);
    navbar = new Navbar(page);
    currencyExchangePage = new CurrencyExchangePage(page);
    await homePage.visit();
    await homePage.clickSignInButton();
    await loginPage.login('username', 'password');
    await page.goto('http://zero.webappsecurity.com/online-banking.html');
  });

  test('Should exchange currency', async ({ page }) => {
    await navbar.clickOnTab('Pay Bills');
    await payBillsNavbar.clickOnTab('Purchase Foreign Currency');
    await currencyExchangePage.selectCurrency('Canada (dollar)');
    await currencyExchangePage.fillAmount('100');
    await currencyExchangePage.selectUsd();
    await currencyExchangePage.clickCalculateCosts();
    await currencyExchangePage.assertConversionAmount(
      '94.19 dollar (CAD) = 100.00 U.S. dollar (USD)',
    );
    await currencyExchangePage.clickPurchase();
    await currencyExchangePage.assertAlertMessage(
      'Foreign currency cash was successfully purchased.',
    );
  });
});
