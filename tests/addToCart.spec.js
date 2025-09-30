// @ts-check
import { test, chromium, expect } from "@playwright/test";

test("Login and add item to cart", async () => {
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

  const title = page.locator('[data-test="title"]');
  await expect(title).toHaveText(/Products/);


  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();


  const badge = page.locator('[data-test="shopping-cart-badge"]');
  await expect(badge).toHaveText(/1/);

  browser.close();
});