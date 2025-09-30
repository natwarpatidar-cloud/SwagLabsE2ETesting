// @ts-check
import { test, chromium, expect } from "@playwright/test";

test("Sort Items and verify", async () => {
  const browser = await chromium.launch({
    headless: true,
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

  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  const firstItem = page.locator('[data-test="inventory-item"]').first();

  await expect(firstItem).toContainText('$7.99');

  await page.waitForTimeout(4000);

  browser.close();
});