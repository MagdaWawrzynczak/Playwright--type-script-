import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import { ProductsPage } from "../page-objects/productsPage";
import { generateFakeData } from "../helper/fakeData";

const oneProduct = 1;

test.describe("Testing Products page", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);
  });

  test("Add one product to the cart", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.addProductsToTheCart();
    await expect(productsPage.shoppingCartBadge).toHaveText(oneProduct.toString());
  });

  test("Add products to the cart", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const fakeData = generateFakeData();
    const numberOfProducts = fakeData.randomNumber.toString();
    await productsPage.addProductsToTheCart(fakeData.randomNumber);
    await expect(productsPage.shoppingCartBadge).toHaveText(numberOfProducts);
  });

  test("Remove product from the cart", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.addProductsToTheCart();
    await productsPage.removeButton.first().click();
    await expect(productsPage.shoppingCartBadge).toBeHidden();
  });

});