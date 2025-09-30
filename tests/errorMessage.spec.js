// @ts-check
import { test, chromium, expect } from "@playwright/test";

test("Verify proper error message is displayed.", async () => {
  const browser = await chromium.launch({
    headless: false,
    chromiumSandbox: false,
    args: ["--disable-extensions", "--disable-file-system"],
  });

  const context = await browser.newContext();

  let page = await context.newPage();

  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').fill("natndgkdj");
  await page.locator('[data-test="password"]').fill("dfjs");
  await page.locator('[data-test="login-button"]').click();

  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');

  await page.waitForTimeout(2000);

  browser.close();
});