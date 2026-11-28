# QA Bootcamp Week 2 Capstone

## Project Overview

This repository contains my QA Bootcamp Week 2 capstone work. The project focuses on UI automation, API testing, test failure investigation, and improving test reliability using Playwright with TypeScript.

The capstone uses the Practice Software Testing Toolshop application to demonstrate how to automate user workflows, validate API responses, investigate failures, and document testing results.

## Tools and Technologies

- **Language:** TypeScript
- **Automation framework:** Playwright
- **Test environment:** Chromium
- **Development environment:** Visual Studio Code
- **Version control:** Git and GitHub
- **Debugging:** Playwright Trace Viewer
- **Application:** Practice Software Testing Toolshop

## Project Structure

```text
qa-bootcamp-week2-starter/
│
├── pages/
│   └── HomePage.ts
│
├── tests/
│   ├── search-pliers.spec.ts
│   ├── carts.api.spec.ts
│   │
│   └── drill/
│       ├── index.html
│       └── flakiness.spec.ts
│
├── playwright.config.ts
├── package.json
└── README.md
```

## Selected Capstone Test Cases

I selected two main test cases: C1 for UI testing and C4 for API testing.

### C1 – Search by Name (UI)

**Objective:** Verify that searching for "pliers" returns relevant products.

**Implementation:**
- Navigate to the Toolshop homepage.
- Enter "pliers" into the search field.
- Click the search button.
- Verify that search results are displayed.
- Verify that "Combination Pliers" appears in the returned products.

**Technical implementation:**
- Used the Page Object Model.
- Defined search locators in `pages/HomePage.ts`.
- Kept page interactions separate from test assertions.
- Used Playwright assertions to validate the search results.

**Files:**
- `tests/search-pliers.spec.ts`
- `pages/HomePage.ts`

**Note:** The final automated assertion verifies that Combination Pliers appears in the results. It does not verify that every returned product contains "pliers" in its name. Full search-filter accuracy remains an area I want to improve.

### C4 – Add to a Cart (API)

**Objective:** Verify that a product can be added to a newly created cart and that the cart contains the expected product and quantity.

**Implementation:**
- Create a cart and verify the `201` response.
- Select an available product.
- Add the product to the cart with a quantity of two.
- Verify the successful add-to-cart response (`200`).
- Retrieve the cart and verify its contents.
- Confirm the product ID and quantity.
- Clean up the created cart after the test.

**Technical implementation:**
- Used Playwright's API request functionality.
- Validated response status codes and response data.
- Used test cleanup to avoid leaving unnecessary test data behind.

**File:** `tests/carts.api.spec.ts`

### Additional Negative API Test – C5 Unknown Cart

Although C4 was my selected API case, I also implemented C5 as an additional negative test.

**Objective:** Verify that requesting a cart using a nonexistent cart ID returns `404`.

**File:** `tests/carts.api.spec.ts`

This test checks how the API handles a request for a resource that does not exist.

## Flakiness Drill

The flakiness drill demonstrated the difference between fixed waits and condition-based waits.

**Test scenario:** Click the Save button and verify that the message "Saved" appears.

The supplied HTML page displays the message after a random delay between zero and one second.

### Initial implementation

The initial test used a fixed 500 ms wait before reading the message.

```ts
await page.locator("#save").click();

await page.waitForTimeout(500);

const message = await page.locator("#status").textContent();

expect(message).toBe("Saved");
```

### Initial execution results

| Result | Count |
|---|---:|
| Passed | 12 |
| Failed | 8 |
| Total runs | 20 |
| Pass rate | 60% |

The failures occurred because the message sometimes appeared after the fixed 500 ms wait had already finished.

The observed failure was:

```text
Expected: "Saved"
Received: ""
```

### Improved implementation

I replaced the fixed wait with a condition-based assertion.

```ts
await page.locator("#save").click();

await expect(page.locator("#status")).toHaveText("Saved");
```

Playwright automatically retries the assertion until the expected text appears or the assertion times out.

### Final execution results

| Result | Count |
|---|---:|
| Passed | 20 |
| Failed | 0 |
| Total runs | 20 |
| Pass rate | 100% |

**Conclusion:** Condition-based waits made the test more reliable because it waited for the expected application state instead of relying on an arbitrary delay.

**Files:**
- `tests/drill/index.html`
- `tests/drill/flakiness.spec.ts`

## Failure Investigation and Debugging

I used Playwright Trace Viewer to investigate a deliberately introduced failure in C1.

For the diagnostic run, I temporarily changed the expected product count to 900.

The test failed because the application returned four products during that particular diagnostic run.

The trace helped me inspect:
- Homepage navigation.
- Search input interaction.
- Search button click.
- Returned products.
- The failed assertion.
- Network activity during execution.

The evidence showed that the search interaction had taken place, but the assertion failed because the expected value was incorrect.

I also observed some `401` network responses, which were unrelated to this assertion failure.

After investigating, I restored the original assertion.

## Test Configuration

The project uses Playwright with Chromium.

The configuration includes:

- Test directory: `tests`
- Reporter: `list`
- Base URL: `https://practicesoftwaretesting.com`
- Browser project: Chromium
- Trace recording: `retain-on-failure`

## How to Run the Tests

### 1. Install dependencies

```bash
npm install
```

### 2. Install the Chromium browser

```bash
npx playwright install chromium
```

### 3. Run the C1 UI test

```bash
npx playwright test tests/search-pliers.spec.ts
```

### 4. Run the C4 and C5 API tests

```bash
npx playwright test tests/carts.api.spec.ts
```

### 5. Run both selected capstone test files

```bash
npx playwright test tests/search-pliers.spec.ts tests/carts.api.spec.ts
```

### 6. Run the flakiness drill

```bash
npx playwright test tests/drill/flakiness.spec.ts
```

### 7. Open a recorded trace

```bash
npx playwright show-trace "path/to/trace.zip"
```


## Execution Summary

The combined capstone test execution previously produced:

| Test | Result |
|---|---|
| C1 – Search by name | Passed |
| C4 – Add to cart | Passed |
| C5 – Unknown cart | Passed |
| **Total** | **3 passed** |

The flakiness drill improved from 12/20 passing runs to 20/20 passing runs after replacing the fixed wait.

These results describe the recorded executions, not a guarantee that every future execution will pass.

## Feedback Applied and Improvements

During the capstone, I applied feedback and made improvements in the following areas:

- Improved the use of Page Object Model structure by separating page locators and interactions from test logic.
- Used actual test output and Trace Viewer evidence to investigate failures.
- Corrected an unrealistic expected-value assertion introduced during failure diagnosis.
- Replaced fixed waiting with a condition-based assertion in the flakiness drill.
- Added an additional negative API test for a nonexistent cart.
- Improved test data management through cart cleanup.
- Documented test execution results and known limitations.

## Reflection

This capstone strengthened my practical understanding of UI automation and API testing using Playwright and TypeScript.

I learned how to structure tests using the Page Object Model, validate API responses, investigate failures through execution traces, and improve reliability by replacing fixed waits with condition-based assertions.

I also learned the importance of distinguishing between a test failure and an application defect, using evidence to support conclusions, and being transparent about what a test actually verifies.
