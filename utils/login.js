import { expect } from "@playwright/test";

export async function login(page, username = "standard_user", password = "secret_sauce") {
  await page.goto("https://www.saucedemo.com/");

  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="title"]')).toHaveText(/Products/);
}
