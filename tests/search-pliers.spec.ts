
import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test("C1 Search by name", async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goToHomePage();
    await homePage.searchForProduct("pliers");

    const names = await homePage.productNames.allInnerTexts();

    console.log("Product count:", names.length);
    console.log("Product names:", names);

    expect(names.length).toBeGreaterThan(0);

    for (const name of names) {
        expect(name.toLowerCase()).toContain("pliers");
    }
});
