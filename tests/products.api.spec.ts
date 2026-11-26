import { test, expect } from "@playwright/test";

test("GET products returns 200 and a product name", async ({ request }) => {
  // 1. Send a GET request to the full Toolshop API address
  const response = await request.get("https://api.practicesoftwaretesting.com/products");

  // 2. Checks that the HTTP status code is 200 (OK)
  expect(response.status()).toBe(200);

  // 3. Converts response into a JavaScript object (JSON)
  const body = await response.json();

  // 4. Check to ensure products list is not empty and the first item has a string name
  expect(body.data.length).toBeGreaterThan(0);
  expect(typeof body.data[0].name).toBe("string");
});