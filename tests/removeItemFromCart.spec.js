// @ts-check
import { test, chromium, expect } from "@playwright/test";

test("Remove Item and verify", async () => {
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
  await page.locator('[data-test="login-button"]').click({timeout: 1000});

  await page.waitForTimeout(2000);

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  await page.locator('[class="shopping_cart_link"]').click();

  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

  const badge = page.locator('[data-test="shopping-cart-badge"]');
  expect(badge).toBeHidden();

  await page.waitForTimeout(4000);

  browser.close();
});