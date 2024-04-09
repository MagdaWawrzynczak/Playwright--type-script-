import { test, expect } from "@playwright/test";
import { CartPage } from "../page-objects/cartPage";
import { EndpointMaps } from "../helper/endpointMaps";
import { LoginPage } from "../page-objects/loginPage";
import { ProductsPage } from "../page-objects/productsPage";
import { generateFakeData } from "../helper/fakeData"
import errorLabels from "../test-data/errorLabels.json";
import commons from "../test-data/commons.json";

const fakeData = generateFakeData();

test.describe("Testing Cart Page", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);
    const productsPage = new ProductsPage(page);
    await productsPage.goToCart();
  });

  test("Remove product", async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.removeButton.click();
    await expect(cartPage.item).toBeHidden();
  });

  test("Check Continue Shopping button", async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.continueShopping.click();
    await expect(page).toHaveURL(EndpointMaps.MAIN_PAGE);
  });

  test("Go to checkout step one", async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.checkout.click();
    await expect(page).toHaveURL(EndpointMaps.CHECKOUT_PAGE_STEP_ONE);
  });

  test("Field validation in checkout step one - empty fields", async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.checkout.click();
    await cartPage.continue.click();
    await expect(cartPage.errorMessage).toHaveText(errorLabels.ERROR_LABEL_NAME_REQUIRED);
  });

  test("Go to checkout step two", async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.checkout.click();
    await cartPage.completeDataInCheckoutFirstStep(fakeData.firstName, fakeData.lastName, fakeData.zipCode);
    await cartPage.continue.click();
    await expect(page).toHaveURL(EndpointMaps.CHECKOUT_PAGE_STEP_TWO);
  });

  test("Complete order", async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.checkout.click();
    await cartPage.completeDataInCheckoutFirstStep(fakeData.firstName, fakeData.lastName, fakeData.zipCode);
    await cartPage.continue.click();
    await cartPage.finishBtb.click();
    let completeOrderText = await cartPage.getTextFromElement();
    await expect(completeOrderText).toContain(commons.COMPLETE_ORDER);
  })

});