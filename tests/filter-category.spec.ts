import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test("Filter tools by category", async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goToHomePage();
  await homePage.filterByCategory("Hammer");


  await expect(homePage.productNames.first()).toContainText(/Hammer/i);

  const count = await homePage.productNames.count();
  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {
    await expect(homePage.productNames.nth(i)).toContainText(/Hammer/i);
  }
});