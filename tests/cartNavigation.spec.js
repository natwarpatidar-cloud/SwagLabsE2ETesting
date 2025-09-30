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
  const item1 = page.getByText(/Sauce Labs Onesie/);
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  const item2 = page.getByText(/Sauce Labs Bike Light/);

  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(item1).toBeVisible();
  await expect(item2).toBeVisible();

  await page.locator('[data-test="shopping-cart-link"]').click();
  
  await page.waitForTimeout(2000);

  browser.close();
});