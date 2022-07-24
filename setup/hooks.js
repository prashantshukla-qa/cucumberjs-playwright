const playwright = require('playwright');
const { BeforeAll, Before, After, AfterAll, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const playwright_options = require('../cucumber').default.playwright;

setDefaultTimeout(playwright_options.timeout);
global.expect = expect;

BeforeAll(async () => {
  console.log('before all ...');
  global.BASE_URL = playwright_options.baseURL;
  global.browser = await playwright[playwright_options.browserName].launch(playwright_options);
});

Before(async () => {
  console.log('before ...');
  global.context = await global.browser.newContext();
  global.page = await global.context.newPage();
  global.page.setDefaultNavigationTimeout(playwright_options.timeout);
});

After(async () => {
  console.log('after ...');
  await global.page.close();
  await global.context.close();
});


After(async function (scenario) {
  if (scenario.result.status === Status.FAILED) {
    var buffer = await global.page.screenshot({ path: `reports/${scenario.pickle.name}.png`, fullPage: true })
    this.attach(buffer, 'image/png');
  }
});

AfterAll(async () => {
  console.log('after all ...');
  await global.browser.close();
});

