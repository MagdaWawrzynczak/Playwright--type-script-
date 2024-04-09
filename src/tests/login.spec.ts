import { test, expect } from "@playwright/test";
import { EndpointMaps } from "../helper/endpointMaps";
import { LoginPage } from "../page-objects/loginPage";
import { generateFakeData } from "../helper/fakeData"
import errorLabels from "../test-data/errorLabels.json";

test.describe("Testing Sign In", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
  });

  test("Succesfully log in", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(process.env.USER_NAME || '', process.env.PASSWORD || '');
    await expect(page).toHaveURL(EndpointMaps.MAIN_PAGE);
  });

  test("Empty fields", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login("", "");
    await expect(loginPage.errorAlert).toBeVisible();
    await expect(loginPage.errorAlert).toContainText(errorLabels.ERROR_EMPTY_FIELD);
  });

  test("Incorrect email", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const fakeData = generateFakeData();
    await loginPage.login(fakeData.username, fakeData.password);
    await expect(loginPage.errorAlert).toBeVisible();
    await expect(loginPage.errorAlert).toContainText(
      errorLabels.ERROR_LABEL_INCORRECT_CREDENTIALS
    );
  });

});