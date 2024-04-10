import { type Locator, type Page } from "@playwright/test";

export class SideBarMenu {
  readonly page: Page;
  readonly allItmems: Locator;
  readonly burgerMenu: Locator;
  readonly logout: Locator;
  readonly resetApp: Locator;

  constructor(page: Page) {
    this.page = page;
    this.allItmems = page.locator("[data-test='inventory-sidebar-link']");
    this.burgerMenu = page.locator("#react-burger-menu-btn");
    this.logout = page.locator("[data-test='logout-sidebar-link']");
    this.resetApp = page.locator("[data-test='reset-sidebar-link']");
  }

  async logoutFromTheApp() {
    await this.burgerMenu.click();
    await this.logout.click();
  }
}