import { defineConfig, devices } from "@playwright/test";

require("dotenv").config();

export default defineConfig({
  timeout: 30000,
  expect: {
    timeout: 20000,
  },
  testDir: "src/tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["line"], ['html'], ['allure-playwright']],
  use: {
    baseURL: "https://www.saucedemo.com/",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    launchOptions: {
      browser: "chromium",
      slowMo: 250,
    },
    headless: true
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
