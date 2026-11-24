import { test, expect } from "@playwright/test";

test("invalid login shows error message", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/auth/login");

  await page.getByPlaceholder("Your email").fill("invalid@example.com");
  await page.getByPlaceholder("Your password").fill("WrongPassword123!");
  await page.getByRole("button", { name: "Login", exact: true }).click();

  await expect(page.getByText(/invalid email or password/i)).toBeVisible();
});