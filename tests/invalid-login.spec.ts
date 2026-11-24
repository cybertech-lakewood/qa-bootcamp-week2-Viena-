import { test, expect } from "@playwright/test";

test("invalid login shows Invalid email or password message", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/auth/login");

  await page.getByRole("textbox", { name: /email/i }).fill("invalid@example.com");
  await page.getByLabel(/password/i).fill("WrongPassword123!");
  await page.getByRole("button", { name: /login/i }).click();

  await expect(page.getByText(/invalid email or password/i)).toBeVisible();
});