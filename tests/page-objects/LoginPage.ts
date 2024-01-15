import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#user_login');
    this.passwordInput = page.locator('#user_password');
    this.submitButton = page.locator('input[type="submit"]');
    this.errorMessage = page.locator('text=Login and/or password are wrong.');
  }

  async visit() {
    await this.page.goto('http://zero.webappsecurity.com/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
