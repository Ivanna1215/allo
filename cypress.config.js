const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://allo.ua/",
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    reporter: "cypress-multi-reporters",
    reporterOptions: {
      reporterEnabled: "mochawesome",
          "mochawesomeReporterOptions": {
              "reportDir": "cypress/reports/mocha",
              "screenshotOnRunFailure": true,
              "quite": true,
              "overwrite": true,
              "html": true,
              "json": true,
              "embeddedScreenshots": true
           }
      },
    screenshotsFolder: "cypress/reports/mocha/assets",
    videosFolder: "cypress/reports/mocha/assets"
  },
});
