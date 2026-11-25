import { Page, Locator } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly productNames: Locator;

    constructor(page: Page) {
        this.page = page; 
        this.productNames = page.locator('[data-test="product-name"]');
    }

    async goToHomePage() {
        await this.page.goto("https://practicesoftwaretesting.com/");
    }

    async filterByCategory(categoryName: string) {
        await this.page.getByRole("checkbox", { name: categoryName }).check();
    }
}