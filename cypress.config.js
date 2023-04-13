const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://allo.ua/",
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: "cypress/reports/",
      reportPageTitle: 'Allo Tests Report',
      charts: true,
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
      timestamp: 'mm_dd_yyyy_HH-MM-ss',
      reportFilename: 'Allo_Report'
    },
    screenshotsFolder: "cypress/reports/assets",
    videosFolder: "cypress/reports/assets"
  },
});
