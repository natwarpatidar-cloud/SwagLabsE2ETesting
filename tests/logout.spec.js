// @ts-check
import { test, chromium, expect } from "@playwright/test";

test("Login and logout", async () => {
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
  await page.locator('[data-test="login-button"]').click({timeout: 1000});

  await page.waitForTimeout(2000);

  await page.getByRole('button', { name: 'Open Menu' }).click({timeout: 1000});
  await page.locator('[data-test="logout-sidebar-link"]').click({timeout: 1000});

  browser.close();
});