import { test, expect } from "@playwright/test";

test("searching for pliers shows only products matching pliers", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com");

  await page.getByRole("textbox", { name: /search/i }).fill("pliers");
  await page.getByRole("button", { name: /search/i }).click();
// I have used the getByRole method to locate the search input field
//  and search button on the home page. 
// I filled in the search input field with the term "pliers" 
// and clicked the search button to perform a search for products matching "pliers".
  const matchingItems = page.getByRole("heading", { name: /pliers/i });
  await expect(matchingItems.first()).toBeVisible();

  const names = await matchingItems.allInnerTexts();
  expect(names.length).toBeGreaterThan(0);

  for (const name of names) {
    expect(name.toLowerCase()).toContain("pliers");
  }
});