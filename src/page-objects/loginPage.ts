import { type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly errorAlert: Locator;
  readonly loginButton: Locator;
  readonly userName: Locator;
  readonly password: Locator;

  constructor(page: Page) {
    this.page = page;
    this.errorAlert = page.locator(".error-message-container.error");
    this.loginButton = page.locator("#login-button")
    this.userName = page.locator("#user-name")
    this.password = page.locator("#password")
  }

  async login(email: string, password: string): Promise<void> {
    await this.userName.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
