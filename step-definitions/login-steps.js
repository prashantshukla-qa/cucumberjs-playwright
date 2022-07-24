const { Given, When, Then } = require('@cucumber/cucumber');
// const { LoginPage } = require('../page-objects/login-page');
const { PagesInit } = require('../page-objects/pages-init');
const { page } = require('@playwright/test');
const pageObjs = new PagesInit(page);

Given('I am on the landing page', async function () {
  await pageObjs.loginPage.launchTheApplication();
  await pageObjs.loginPage.verifyLoginPageIsDisplayed();
  await pageObjs.loginPage.headerSearchContainer.verifySearchContainerIsDisplayed();
});


 