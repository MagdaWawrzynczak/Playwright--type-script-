## Playwright Test Runner with TypeScript

Design Page Objects and run Tests with TypeScript

## Installation

Install Node modules: npm install

Install default browsers: npx playwright install

IMPORTANT: To log in to the test site `https://www.saucedemo.com/`, you need to create an .env file in which you need to add variables for the `USERNAME`, `PASSWORD`.

## Tests

You can run several commands:

`npx playwright test` - runs the end-to-end tests

Run tests only on specific browser: 
`npx playwright test --project chromium` - run tests only on Chrome
`npx playwright test --project firefox` - run tests only on Firefox 
`npx playwright test --project webkit` - run tests only on Webkit

`npx playwright test --headed` - run tests in headed mode

`npx playwright test login.spec.ts` - run tests in specific file

## Report

`npx playwright test `- Run test

`allure generate allure-results -o allure-report --clean` - generate allure report

`allure open allure-report` - open allure report

## Locators:

You can use codygen to generate locators:

`npx playwright codegen playwright.dev`
