import { test, expect } from '@playwright/test';
import { FeedbackPage } from '../page-objects/FeedbackPage.ts';
import { HomePage } from '../page-objects/HomePage.ts';

test.describe('Feedback form', () => {
  let feedbackPage: FeedbackPage;
  let homePage: HomePage;
  test.beforeEach(async ({ page }) => {
    feedbackPage = new FeedbackPage(page);
    homePage = new HomePage(page);
    await homePage.visit();
    await homePage.clickFeedbackButton();
  });

  test('reset feedback form', async ({ page }) => {
    await feedbackPage.fillFeedbackForm('test', 'email', 'subject', 'comment');
    await feedbackPage.clearFeedbackForm();
    await feedbackPage.assertReset();
  });

  test('submit feedback form', async ({ page }) => {
    await feedbackPage.fillFeedbackForm('test', 'email', 'subject', 'comment');
    await feedbackPage.submitFeedbackForm();
    await feedbackPage.assertSuccessMessage();
  });
});
