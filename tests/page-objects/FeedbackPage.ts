import { expect, Locator, Page } from '@playwright/test';

export class FeedbackPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly commentInput: Locator;
  readonly submitButton: Locator;
  readonly clearButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('#name');
    this.emailInput = page.locator('#email');
    this.subjectInput = page.locator('#subject');
    this.commentInput = page.locator('#comment');
    this.submitButton = page.locator('input[name="submit"]');
    this.clearButton = page.locator('input[name="clear"]');
  }

  async fillFeedbackForm(
    name: string,
    email: string,
    subject: string,
    comment: string,
  ) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.commentInput.fill(comment);
  }

  async clearFeedbackForm() {
    await this.clearButton.click();
  }

  async submitFeedbackForm() {
    await this.submitButton.click();
  }

  async assertReset() {
    await expect(this.nameInput).toBeEmpty();
    await expect(this.emailInput).toBeEmpty();
    await expect(this.subjectInput).toBeEmpty();
    await expect(this.commentInput).toBeEmpty();
  }

  async assertSuccessMessage() {
    const successMessage = this.page.getByText(
      'Thank you for your comments, test',
    );
    await expect(successMessage).toBeVisible();
  }
}
