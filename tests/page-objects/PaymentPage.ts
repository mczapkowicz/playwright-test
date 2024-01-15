import { expect, Locator, Page } from '@playwright/test';

export class PaymentPage {
  readonly page: Page;
  readonly payeeSelectBox: Locator;
  readonly payeeDetailButton: Locator;
  readonly payeeDetail: Locator;
  readonly accountSelectBox: Locator;
  readonly amountInput: Locator;
  readonly dateInput: Locator;
  readonly descriptionInput: Locator;
  readonly submitPaymentButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.payeeSelectBox = page.locator('#sp_payee');
    this.payeeDetailButton = page.locator('#sp_get_payee_details');
    this.payeeDetail = page.locator('#sp_payee_details');
    this.accountSelectBox = page.locator('#sp_account');
    this.amountInput = page.locator('#sp_amount');
    this.dateInput = page.locator('#sp_date');
    this.descriptionInput = page.locator('#sp_description');
    this.submitPaymentButton = page.locator('#pay_saved_payees');
    this.successMessage = page.locator('#alert_content > span');
  }

  async createPayment() {
    await this.payeeSelectBox.selectOption('apple');
    await this.payeeDetailButton.click();
    await expect(this.payeeDetail).toBeVisible();
    await this.accountSelectBox.selectOption('6');
    await this.amountInput.fill('5000');
    await this.dateInput.fill('2021-11-09');
    await this.descriptionInput.fill('some message');
    await this.submitPaymentButton.click();
  }

  async assertSuccessMessage() {
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage).toContainText(
      'The payment was successfully submitted',
    );
  }
}
