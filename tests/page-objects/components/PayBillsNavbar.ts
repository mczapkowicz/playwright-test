import { Locator, Page, expect } from '@playwright/test';

export class PayBillsNavbar {
  readonly page: Page;
  readonly paySavedPayee: Locator;
  readonly addNewPayee: Locator;
  readonly purchaseForeignCurrency: Locator;

  constructor(page: Page) {
    this.page = page;
    this.paySavedPayee = page.locator('text=Pay Saved Payee');
    this.addNewPayee = page.locator('text=Add New Payee');
    this.purchaseForeignCurrency = page.locator(
      'text=Purchase Foreign Currency',
    );
  }

  async clickOnTab(tabName: string) {
    switch (tabName) {
      case 'Pay Saved Payee':
        await this.paySavedPayee.click();
        break;
      case 'Add New Payee':
        await this.addNewPayee.click();
        break;
      case 'Purchase Foreign Currency':
        await this.purchaseForeignCurrency.click();
        break;
      default:
        throw new Error('Invalid tab name');
    }
  }
}
