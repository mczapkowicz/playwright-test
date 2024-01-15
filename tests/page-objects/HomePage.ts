import { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly signInButton: Locator;
  readonly searchInput: Locator;
  readonly feedbackButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.getByRole('button', { name: 'Signin' });
    this.searchInput = page.locator('#searchTerm');
    this.feedbackButton = page.locator('#feedback');
  }

  async visit() {
    await this.page.goto('http://zero.webappsecurity.com/');
  }

  async clickSignInButton() {
    await this.signInButton.click();
  }

  async clickFeedbackButton() {
    await this.feedbackButton.click();
  }

  async searchTerm(searchTerm: string) {
    await this.searchInput.fill(searchTerm);
    await this.searchInput.press('Enter');
  }
}
