import { type Locator, type Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly checkout: Locator
  readonly checkoutComplete: Locator
  readonly continue: Locator
  readonly continueShopping: Locator
  readonly errorMessage: Locator
  readonly finishBtb: Locator
  readonly firstName: Locator
  readonly item: Locator
  readonly lastName: Locator
  readonly removeButton: Locator;
  readonly zipCode: Locator

  constructor(page: Page) {
    this.page = page;
    this.checkout = page.locator("#checkout");
    this.checkoutComplete = page.locator("[data-test='complete-header']");
    this.continue = page.locator("#continue");
    this.continueShopping = page.locator("#continue-shopping");
    this.errorMessage = page.locator("[data-test='error']");
    this.finishBtb = page.locator("#finish");
    this.firstName = page.locator("#first-name");
    this.item = page.locator("[data-test='inventory-item-name']");
    this.lastName = page.locator("#last-name");
    this.removeButton = page.getByRole('button', { name: 'Remove' });
    this.zipCode = page.locator("#postal-code");
  }

  async completeDataInCheckoutFirstStep(firstName: string, lastName: string, zipCode: string): Promise<void> {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.zipCode.fill(zipCode);
  }

  async getTextFromElement() {
    let completeOrderText = await this.checkoutComplete.innerText();
    return completeOrderText;
  }
}