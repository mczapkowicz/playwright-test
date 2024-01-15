import { expect, Locator, Page } from '@playwright/test';

export class FilterTransactionsPage {
  readonly page: Page;
  readonly accountSelect: Locator;
  readonly transfers: Locator;
  readonly noResultsMessage: Locator;
  readonly accountActivityTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountSelect = page.locator('#aa_accountId');
    this.transfers = page.locator('#all_transactions_for_account tbody tr');
    this.noResultsMessage = page.locator('text=No results.');
    this.accountActivityTab = page.locator('#account_activity_link');
  }

  clickAccountActivityTab() {
    this.accountActivityTab.click();
  }

  selectAccount(account: string) {
    this.accountSelect.selectOption({ label: account });
  }

  async assertTransfersNumber(count: number) {
    await expect(this.transfers).toHaveCount(count);
  }

  async assertNoResultsMessage() {
    await expect(this.noResultsMessage).toBeVisible();
  }
}
