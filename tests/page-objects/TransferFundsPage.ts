import { expect, Locator, Page } from '@playwright/test';

export class TransferFundsPage {
  readonly page: Page;
  readonly fromAccountSelect: Locator;
  readonly toAccountSelect: Locator;
  readonly amountInput: Locator;
  readonly descriptionInput: Locator;
  readonly continueButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fromAccountSelect = page.locator('#tf_fromAccountId');
    this.toAccountSelect = page.locator('#tf_toAccountId');
    this.amountInput = page.locator('#tf_amount');
    this.descriptionInput = page.locator('#tf_description');
    this.continueButton = page.locator('#btn_submit');
    this.successMessage = page.locator(
      'text=You successfully submitted your transaction.',
    );
  }

  async submitTransaction() {
    await this.fromAccountSelect.selectOption('3');
    await this.toAccountSelect.selectOption('2');
    await this.amountInput.fill('100');
    await this.descriptionInput.fill('test');
    await this.continueButton.click();
    await this.continueButton.click();
  }

  async assertSuccessMessage() {
    await expect(this.successMessage).toBeVisible();
  }
}
