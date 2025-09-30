// @ts-check
import { test, chromium, expect } from "@playwright/test";

test("Checkout flow", async () => {
  const browser = await chromium.launch({
    headless: false,
    chromiumSandbox: false,
    args: ["--disable-extensions", "--disable-file-system"],
  });

  const context = await browser.newContext();

  let page = await context.newPage();

  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();

  await page.waitForTimeout(2000);

  await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

  await page.locator('[data-test="shopping-cart-link"]').click();

  await page.locator('[data-test="checkout"]').click();

  await page.locator('[data-test="firstName"]').fill('Natwar');
  await page.locator('[data-test="lastName"]').fill('Patidar');
  await page.locator('[data-test="postalCode"]').fill('452001');

  await page.locator('[data-test="continue"]').click();

  const title = page.locator('[data-test="title"]');
  await expect(title).toHaveText(/Checkout: Overview/);

  await page.locator('[data-test="finish"]').click();

  const thankyouMessage = page.locator('[data-test="complete-header"]');
  await expect(thankyouMessage).toHaveText(/Thank you for your order!/);

  await page.waitForTimeout(2000);

  browser.close();
});