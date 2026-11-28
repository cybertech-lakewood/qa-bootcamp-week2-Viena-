import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test("C1 Search by name", async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goToHomePage();
    await homePage.searchForProduct("pliers");

    await expect(homePage.productNames).not.toHaveCount(0);

    const names = await homePage.productNames.allInnerTexts();

    console.log("Product count:", names.length);
    console.log("Product names:", names);

    expect(names).toContain("Combination Pliers");
});