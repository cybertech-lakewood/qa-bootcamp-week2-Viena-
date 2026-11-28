

import { test, expect } from "@playwright/test";

const API_BASE = "https://api.practicesoftwaretesting.com";

test.describe("Carts API", () => {

  let cartId: string | undefined;

  test.beforeEach(() => {
    cartId = undefined;
  });

  // Clean up created cart after each test
  test.afterEach(async ({ request }) => {
    if (cartId) {
      const deleteRes = await request.delete(
        `${API_BASE}/carts/${cartId}`,
        { timeout: 15000 }
      );

      expect([200, 204]).toContain(deleteRes.status());

      console.log("Cart cleanup status:", deleteRes.status());
    }
  });

  // C4: Add a product to a cart
  test("creates a cart, adds a product, and verifies persistence", async ({ request }) => {

    // Get an available product
    const productsRes = await request.get(`${API_BASE}/products`);
    expect(productsRes.status()).toBe(200);

    const products = await productsRes.json();

    const availableProduct = products.data.find(
      (product: any) => product.in_stock === true
    );

    expect(availableProduct).toBeTruthy();

    const productId = availableProduct.id;

    console.log("Selected product:", availableProduct.name);

    // Create a cart
    const cartRes = await request.post(`${API_BASE}/carts`);
    expect(cartRes.status()).toBe(201);

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

    expect(addRes.status()).toBe(200);

    // Retrieve cart
    const getRes = await request.get(`${API_BASE}/carts/${cartId}`);
    expect(getRes.status()).toBe(200);

    const cartData = await getRes.json();

    // Verify cart and product persistence
    expect(cartData.id).toBe(cartId);
    expect(Array.isArray(cartData.cart_items)).toBe(true);

    const addedItem = cartData.cart_items.find(
      (item: any) => item.product_id === productId
    );

    expect(addedItem).toBeTruthy();
    expect(addedItem.quantity).toBe(2);

    console.log("Product successfully verified in cart.");
  });

});

// Negative test: Nonexistent cart
test("requests a cart ID that does not exist and checks for 404", async ({ request }) => {

  const res = await request.get(
    `${API_BASE}/carts/xxxxxx-1111-xxxx-0000`
  );

  expect(res.status()).toBe(404);

});
