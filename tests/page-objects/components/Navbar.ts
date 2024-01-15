import { Locator, Page, expect } from '@playwright/test';

export class Navbar {
  readonly page: Page;
  readonly payBillsTab: Locator;
  readonly transferFundsTab: Locator;
  readonly accountActivityTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.payBillsTab = page.locator('#pay_bills_link');
    this.transferFundsTab = page.locator('#transfer_funds_link');
    this.accountActivityTab = page.locator('#account_activity_link');
  }

  async clickOnTab(tabName: string) {
    switch (tabName) {
      case 'Pay Bills':
        await this.payBillsTab.click();
        break;
      case 'Transfer Funds':
        await this.transferFundsTab.click();
        break;
      case 'Account Activity':
        await this.accountActivityTab.click();
        break;
      default:
        throw new Error('Invalid tab name');
    }
  }
}
