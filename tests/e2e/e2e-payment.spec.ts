import { test } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage.ts';
import { LoginPage } from '../page-objects/LoginPage.ts';
import { PaymentPage } from '../page-objects/PaymentPage.ts';
import { Navbar } from '../page-objects/components/Navbar.ts';

test.describe('New Payment', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let paymentPage: PaymentPage;
  let navbar: Navbar;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    paymentPage = new PaymentPage(page);
    navbar = new Navbar(page);
    await homePage.visit();
    await homePage.clickSignInButton();
    await loginPage.login('username', 'password');
    await page.goto('http://zero.webappsecurity.com/online-banking.html');
  });

  test('Should send new payment', async ({ page }) => {
    navbar.clickOnTab('Pay Bills');
    await paymentPage.createPayment();
    await paymentPage.assertSuccessMessage();
  });
});
