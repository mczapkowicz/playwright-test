import { expect, Locator, Page } from '@playwright/test';

export class CurrencyExchangePage {
  readonly page: Page;
  readonly currencySelect: Locator;
  readonly amountInput: Locator;
  readonly usdRadioButton: Locator;
  readonly calculateCostsButton: Locator;
  readonly purchaseButton: Locator;
  readonly alertMessage: Locator;
  readonly conversionAmount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.currencySelect = page.locator('#pc_currency');
    this.amountInput = page.locator('#pc_amount');
    this.usdRadioButton = page.locator('text=U.S. dollar (USD)');
    this.calculateCostsButton = page.locator('text=Calculate Costs');
    this.purchaseButton = page.locator('input[type="submit"]');
    this.alertMessage = page.locator('#alert_content');
    this.conversionAmount = page.locator('#pc_conversion_amount');
  }

  async selectCurrency(currency: string) {
    await this.currencySelect.selectOption({ label: currency });
  }

  async fillAmount(amount: string) {
    await this.amountInput.fill(amount);
  }

  async selectUsd() {
    await this.usdRadioButton.click();
  }

  async clickCalculateCosts() {
    await this.calculateCostsButton.click();
  }

  async clickPurchase() {
    await this.purchaseButton.click();
  }
  async assertConversionAmount(amount: string) {
    const conversionAmount = await this.conversionAmount;
    await expect(conversionAmount).toHaveText(amount);
  }
  async assertAlertMessage(message: string) {
    const alertMessage = await this.alertMessage;
    await expect(alertMessage).toHaveText(message);
  }
}
