import { test } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage.ts';
import { LoginPage } from '../page-objects/LoginPage.ts';

test.describe('Login - visual tests', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    await homePage.visit();
    await homePage.clickSignInButton();
  });

  test('Login form', async ({ page }) => {
    await loginPage.snapshotLoginForm();
  });

  test('Login error message', async ({ page }) => {
    await loginPage.login('test', 'test');
    await loginPage.snapshotErrorMessage();
  });
});
