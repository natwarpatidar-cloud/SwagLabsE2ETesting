// @ts-check
import { test, chromium, expect } from "@playwright/test";

test("Product details", async () => {
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

  await page.locator('[data-test="inventory-item-name"]').first().click();

  const title = page.locator('[data-test="back-to-products"]');
  await expect(title).toHaveText(/Back to products/);

  const desc = page.locator('[data-test="inventory-item-desc"]').first();
  await expect(desc).toBeVisible();

  const price = page.locator('[data-test="inventory-item-price"]').first();
  await expect(price).toBeVisible();

  await page.waitForTimeout(2000);

  browser.close();
});