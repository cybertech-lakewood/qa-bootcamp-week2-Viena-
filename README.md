# QA Bootcamp Week 2 Starter

This is the starting point for Week 2 of the QA bootcamp. During the week you will use it to practise:

- TypeScript
- Playwright (UI testing)
- Postman (API testing)
- The Toolshop REST API

## Prerequisites

Install these before you start:

- [Node.js](https://nodejs.org/) (the current LTS version)
- [Git](https://git-scm.com/)
- [VS Code](https://code.visualstudio.com/)

## Setup and Running Tests

Follow these three steps to set up the project and run the Playwright test suite:

1. **Install dependencies and Playwright Chromium:**

       npm install
       npx playwright install chromium

2. **Configure environment variables:**

   Copy the example environment file to create your local `.env` file:

   - Windows PowerShell:
         Copy-Item .env.example .env
   - Mac / Linux / Git Bash:
         cp .env.example .env

3. **Run the tests:**

       npm test

   To view the HTML test report after a run:

       npx playwright show-report

> **Note:** Do not commit your `.env` file or expose sensitive environment variables. Keep your actual credentials private.

## Folders

| Folder     | What it is for |
|------------|----------------|
| `tests/`   | Playwright UI and API tests. |
| `scripts/` | Helper scripts. `check.ts` checks your setup and is run by `npm run check`. |

## Scripts

- `npm run check`: checks your `.env` and that you can reach the Toolshop API.
- `npm test`: runs the Playwright tests in `tests/`.

## Week 2 Day 6 – TypeScript Basics & Profile Validator

- **`src/ts-basics/`**: Practice scripts covering core TypeScript concepts (`hello-world.ts`, `tuples.ts`, and `functions.ts`).
- **`src/profile-validator.ts`**: Defines a `UserProfile` type with optional nested `settings.notifications` and an `isNotified` helper that safely returns `false` when optional fields are missing.

### How to Run

    npx tsx src/profile-validator.ts
    npx tsc --noEmit

