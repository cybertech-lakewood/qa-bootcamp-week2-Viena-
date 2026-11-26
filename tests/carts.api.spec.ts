
import { test, expect } from "@playwright/test";

const API_BASE = "https://api.practicesoftwaretesting.com";

test.describe("Carts API", () => {

  let cartId: string | undefined;

  // Reset before every test
  test.beforeEach(() => {
    cartId = undefined;
  });

  // Clean up after every test
  test.afterEach(async ({ request }) => {
    if (cartId) {
      const deleteRes = await request.delete(
        `${API_BASE}/carts/${cartId}`
      );

      expect([200, 204]).toContain(deleteRes.status());
    }
  });

  test("creates a cart, adds a product, and checks response fields", async ({ request }) => {

    // Get a product
    const productsRes = await request.get(`${API_BASE}/products`);
    expect(productsRes.status()).toBe(200);

    const products = await productsRes.json();
    const productId = products.data[0].id;

    expect(productId).toBeTruthy();

    // Create a cart
    const cartRes = await request.post(`${API_BASE}/carts`);
    expect([200, 201]).toContain(cartRes.status());

    const cart = await cartRes.json();
    cartId = cart.id;

    expect(cartId).toBeTruthy();

    // Add product to cart
    const addRes = await request.post(`${API_BASE}/carts/${cartId}`, {
      data: {
        product_id: productId,
        quantity: 2
      }
    });

    expect([200, 201]).toContain(addRes.status());

    // Retrieve cart
    const getRes = await request.get(`${API_BASE}/carts/${cartId}`);
    expect(getRes.status()).toBe(200);

    const cartData = await getRes.json();

    // Verify response fields
    expect(cartData.id).toBe(cartId);
    expect(Array.isArray(cartData.cart_items)).toBe(true);
    expect(cartData.cart_items.length).toBeGreaterThan(0);

  });

});
//TEST 2
test("requests a cart id that doesn't exist and checks for a 404", async ({ request }) => {

  const res = await request.get(
    `${API_BASE}/carts/xxxxxx-1111-xxxx-0000`
  );

  expect(res.status()).toBe(404);//was previously 404

});