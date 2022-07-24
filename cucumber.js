module.exports = {
  default: {
    parallel: 1,
    format: [
      "html:./reports/cucumber_report.html"
    ],
    require: [
      "setup/hooks.js",
      "step-definitions/**/*steps.js"
    ],
    paths: [
      "features/*.feature"
    ],
    playwright: {
      headless: process.env.HEADLESS || false,
      viewport: {
        "width": 1280,
        "height": 720
      },
      baseURL: process.env.baseURL || "https://parabank.parasoft.com",
      browserName: process.env.BROWSER || "firefox",
      ignoreHTTPSErrors: true,
      timeout: 60000
    }
  }
}