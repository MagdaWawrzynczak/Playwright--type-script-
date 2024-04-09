import { test, expect } from "@playwright/test";
import { EndpointMaps } from "../helper/endpointMaps";
import { LoginPage } from "../page-objects/loginPage";
import { SideBarMenu } from "../page-objects/components/sideBarMenu";

test.describe("Testing Side Menu", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(process.env.USER_EMAIL!, process.env.PASSWORD!);
  });

  test("Check side menu tabs", async ({ page }) => {
    const sideBarMenu = new SideBarMenu(page);
    await sideBarMenu.burgerMenu.click();
    await expect(sideBarMenu.allItmems).toBeVisible();
    await expect(sideBarMenu.logout).toBeVisible();
    await expect(sideBarMenu.resetApp).toBeVisible();
  });

  test("Logout", async ({ page }) => {
    const sideBarMenu = new SideBarMenu(page);
    await sideBarMenu.logoutFromTheApp();
    await expect(page).toHaveURL(EndpointMaps.LOGIN_PAGE);
  });

});