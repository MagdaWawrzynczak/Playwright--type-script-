import { type Locator, type Page } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;
  readonly addToCart: Locator;
  readonly shoppingCart: Locator;
  readonly shoppingCartBadge: Locator;
  readonly removeButton: Locator;
  readonly itemName: Locator

  constructor(page: Page) {
    this.page = page;
    this.addToCart = page.getByText("Add to cart");
    this.shoppingCart = page.locator("[data-test='shopping-cart-link']");
    this.shoppingCartBadge = page.locator("[data-test='shopping-cart-badge']")
    this.removeButton = page.getByRole('button', { name: 'Remove' });

    this.itemName = page.locator("[data-test='inventory-item-name']");
  }

  async addProductsToTheCart(quantity: number = 1): Promise<void> {
    for (let i = 0; i < quantity; i++) {
      await this.addToCart.first().click();
    }
  }

  async goToCart() {
    await this.addProductsToTheCart();
    await this.shoppingCart.click();
  }

  async getInvetoryItemName() {
    let itemName = await this.itemName.first().textContent();
    return itemName;
  }
}
