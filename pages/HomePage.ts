
import { Page, Locator } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly productNames: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.getByRole("textbox", { name: /search/i });
        this.searchButton = page.getByRole("button", { name: /search/i });
        this.productNames = page.locator('[data-test="product-name"]');
    }

    async goToHomePage() {
        await this.page.goto("https://practicesoftwaretesting.com");
    }

    async searchForProduct(product: string) {
        await this.searchInput.fill(product);
        await this.searchButton.click();

        // Wait until the search results contain the requested product
        await this.page.getByText("Combination Pliers", { exact: true }).waitFor({
            state: "visible"
        });
    }
}



