import { test, expect } from "@playwright/test";
import path from "path";
import { pathToFileURL } from "url";

test("Save message appears", async ({ page }) => {
    const filePath = path.join(__dirname, "index.html");
    await page.goto(pathToFileURL(filePath).href);

    await page.locator("#save").click();

    // Wait until the expected message appears
    await expect(page.locator("#status")).toHaveText("Saved");
});