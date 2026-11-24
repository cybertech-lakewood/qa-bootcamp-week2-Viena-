import { test, expect } from "@playwright/test";

test("searching for pliers shows only products matching pliers", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com");

  const searchInput = page.getByRole("textbox", { name: /search/i });
  await searchInput.fill("pliers");
  await page.getByRole("button", { name: /search/i }).click();

  const productCards = page.locator("a.card");
  await expect(productCards.first()).toBeVisible();

  const titles = await productCards.locator(".card-title").allInnerTexts();
  expect(titles.length).toBeGreaterThan(0);

  for (const title of titles) {
    expect(title.toLowerCase()).toContain("pliers");
  }
});