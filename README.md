# allo

This project is a test automation suite for aloo.ua, a popular online marketplace in Ukraine. It uses the Cypress testing framework to automate various user scenarios and ensure the website's functionality and user experience meet the expected standards.

How to Run the Tests
To run the tests, follow these steps:

Clone this repository to your local machine.
Install dependencies by running npm install.
Run the tests using the command npm run cypress.
This will launch the Cypress Test Runner, allowing you to select and run individual tests or run the entire suite.

Test Descriptions
The test suite includes the following tests:

Verify if the price filter working correctly for the following marketplaces
This test verifies if the price filter is working correctly for different marketplaces on aloo.ua. It ensures that the filter applies correctly and displays the expected results.

Add items to the basket
This test adds items to the shopping cart on aloo.ua and verifies that the correct items and quantities are added.

Search for an item
This test searches for a specific item on aloo.ua and verifies that the search results page displays the correct items.

Should successfully sign in to Allo
This test logs in to the aloo.ua website using valid credentials and verifies that the user is successfully signed in.

Useful Information
Test files are located in the cypress/e2e/allo.cy.js.
Test data is stored in the cypress/fixtures directory.
Test configuration settings can be found in the cypress.config.json file.
Additional Cypress commands and usage information can be found in the official documentation.
