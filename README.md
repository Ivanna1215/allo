# allo

This  test project is a test automation suite for allo.ua, a popular online marketplace in Ukraine. It uses the Cypress testing framework to automate various user scenarios and ensure the website's functionality and user experience meet the expected standards.
## Getting started
To get started with this project, follow these steps:
Install Node.js
Install Cypress via npm: npm install cypress
Clone this repository to your local machine
Install dependencies by running: npm install

## Execution
### Build and open Cypress Test Runner
1. Install dependencies within the project directory (allo folder on your local)
    `npm install`

2. Modify the cypress.config.js file to use 'https://allo.ua/' as the baseUrl
3. Execute cypress on your local: 

     `npm run cy:open`
     
4. After the Cypress Test Runner application loads, you can select some or all test specs to be executed.

### Running headless cypress that generates reports
1. Modify the cypress.config.js file to use 'https://allo.ua/' as the baseUrl
2. Execute cypress automated tests in headless mode: 

     `npm run cy:run`
     
3. After tests have finished, you can find the report generated in the cypress/reports folder e.g. cypress/reports/Allo_Report_04_12_2023_19-09-40.html

Test Descriptions
The test suite includes the following tests:

Verify if the price filter working correctly for the following marketplaces
This test verifies if the price filter is working correctly for different marketplaces on aloo.ua. It ensures that the filter applies correctly and displays the expected results.

Add items to the basket
This test adds items to the shopping cart on allo.ua and verifies that the correct items and quantities are added.

Search for an item
This test searches for a specific item on aloo.ua and verifies that the search results page displays the correct items.

Authorization with Invalid Credentials
This test verifies how the allo.ua website interacts with invalid login credentials during a login attempt.
According to the test task, the test should have a status of failed. 


### Useful Information:
Test files are located in the cypress/e2e/allo.cy.js.
Test data is stored in the cypress/fixtures directory.
Test configuration settings can be found in the cypress.config.json file.
Additional Cypress commands and usage information can be found in the official documentation.
