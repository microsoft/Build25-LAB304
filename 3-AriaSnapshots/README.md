# 3. Aria Snapshots and Helper Functions

## Goal

This section focuses on using Playwright's Codegen to generate a search test, and add various assertions like **toMatchAriaSnapshot**, **toHaveURL**, and **toHaveAttribute** to verify application state, and refactoring the generated code into reusable helper functions for cleaner, more maintainable tests.

## Step 1: Record the Search Interaction

1. [] Start a new recording by pressing **Record new** in the testing sidebar. In the browser window opened by Codegen
2. [] Navigate to the home page (e.g., `http://localhost:3000`).
3. [] Click the search icon or field.
4. [] Type your search term (e.g., "Twisters").
5. [] Press Enter or click the search button.

As you interact with the browser, Playwright's Codegen will automatically generate the corresponding test code in the Playwright Inspector window.

```ts
import { test, expect } from '@playwright/test';

test('search for "Twisters" movie', async ({ page }) => {
  await page.goto('');
  await page.getByRole('banner').getByRole('search').click();
  await page.getByPlaceholder('Search for a movie...').click();
  await page.getByPlaceholder('Search for a movie...').fill('twisters');
  await page.getByPlaceholder('Search for a movie...').press('Enter');
});
```

## Step 2: Generate Assertions
Use the Codegen toolbar to add assertions.
1. [] click on the assert text icon and click on the main page heading. This assertion checks the text of the element within the specified locator.
2. [] click on the assert snapshot and click on the movie poster. This assertion checks the accessible name and role of elements within the specified locator.

```ts
await expect(page.getByRole('heading', { level: 1 })).toHaveText('Twisters');

await expect(page.getByRole('main')).toMatchAriaSnapshot(`
  - heading "Twisters" [level=1]
`);
```


### Differences between **toHaveText** and **toMatchAriaSnapshot**

The **toHaveText** assertion targets a specific element, like the **"<h1>"** heading, and verifies that its exact visible text content matches the provided string ("Twisters").

In contrast, **toMatchAriaSnapshot** examines a larger region, such as the **"<main>"** content area, and checks its overall accessible structure—including element roles, names, and levels—against a stored snapshot. While **toHaveText** focuses on the precise visual text of one element, **toMatchAriaSnapshot** validates the semantic structure and accessibility of potentially multiple elements within a section.

### Step 3: Manually add assertions to verify the application's state after the search:

Before you click the link to the movie detail page, you can add assertions to check the state of the application. Here are some examples:

1. [] **toHaveURL**: Use this to check if the page URL is correct or contains expected parameters. You can use a string for an exact match or a Regular Expression (/ /) for partial matches (useful for query parameters).
2. [] **toHaveAttribute**: Use this to check if a specific element (found using a locator) has a particular attribute with the expected value. Again, the value can be a string or a Regular Expression.

```ts
await expect(page).toHaveURL(/searchTerm=twisters/);

await expect(page.getByRole('list').getByLabel('movie').filter({ hasText: 'Twisters' }).locator('img')).toHaveAttribute('alt', 'poster of Twisters');
```
 
### Step 4: Run the Test

1. [] Save your test as **search.spec.ts** file.
2. [] Run the test using the VS Code Test Explorer (click the play button next to the test) or the command line: `npx playwright test search.spec.ts`
   
### Modify the Test Name (Optional but Recommended)

It's good practice to give your tests descriptive names that clearly state what they are verifying.

To change the test name, simply edit the first argument (the string) passed to the **test** function.

**Example:**

Change this:
```ts
test('test', async ({ page }) => {
  // ... test code ...
});
```

To this:
```ts
test('search for "Twisters" movie and navigate to details page', async ({ page }) => {
  // ... test code ...
});
```

### Step 5: Create another test for a movie that does not exist
1. [] Use Codegen to record the search interaction for a movie that does not exist (e.g., "NonExistentMovie").
2. [] Add assertions to check the state of the application when no results are found. For example:
  * use **toHaveURL** to check the search term.
  * Use **toMatchAriaSnapshot** to verify the message displayed when no results are found.
3. [] Check that you can navigate back to the home page.

```ts
import { test, expect } from '@playwright/test';

test('search for "NonExistentMovie" movie', async ({ page }) => {
  await page.goto('');
  await page.getByRole('banner').getByRole('search').click();
  await page.getByPlaceholder('Search for a movie...').click();
  await page.getByPlaceholder('Search for a movie...').fill('twisters');
  await page.getByPlaceholder('Search for a movie...').press('Enter');
  await page.getByRole('link', { name: "non existent movie" }).click();

  await expect(page).toHaveURL(/searchTerm=non-existent-movie/);

  await expect(page.getByRole('main')).toMatchAriaSnapshot(`
    - heading "Sorry!"
    - heading /There were no results for/
    - img "Not found!"
    - link "Home":
      - button "Home":
        - img
    `);

  await page.getByRole('button', { name: 'Home' }).click();

  await expect(page).toHaveURL('/?category=Popular&page=1');
});
```

### Step 6: Create a Reusable Search Function

1. [] Create a helper function in your test file to encapsulate the search logic. This function should take the movie name as an argument and perform the search.
2. [] Create a reusable locator for the search input field **const searchInput = **. This will help in maintaining the code and making it easier to update if the locator changes in the future.
3. [] Use **test.step** to create a step for the search action. This will help in organizing your test and making it more readable.

```ts
import { test, expect, Page } from '@playwright/test';

async function searchForMovie(page: Page, movie: string) {
  const searchInput = page.getByPlaceholder('Search for a movie...');
  await test.step(`Search for "${movie}" movie`, async () => {
    await page.getByRole('banner').getByRole('search').click();
    await searchInput.click();
    await searchInput.fill(movie);
    await searchInput.press('Enter');
  });
}

// ...both tests previously created
```

### Step 7: Refactor the Test

- [] Call your **searchForMovie** helper function in both your tests passing in the **page** and the movie name.

```ts
test('search for "Twisters" movie', async ({ page }) => {
  await page.goto('');

  await searchForMovie(page, 'twisters');
// ...rest of the test
});

test('search for "NonExistentMovie" movie', async ({ page }) => {
  await page.goto('');

  await searchForMovie(page, 'non existent movie');
// ...rest of the test
});
```

### Step 9: Run your test to ensure it works correctly.

- [] Run your test in VS Code or by using the command line: `npx playwright test search.spec.ts`

Helper functions are a great way to keep your tests DRY (Don't Repeat Yourself) and make them easier to maintain. By encapsulating the search logic in a function, you can easily reuse it across multiple tests without duplicating code.

## Check-in

Ensure your **search.spec.ts** file contains two tests (successful and no results search) using the **searchForMovie** helper function and assertions like **toHaveURL**, **toHaveAttribute**, and **toMatchAriaSnapshot**. Compare your work against the solution in **3-AriaSnapshots/solution/search.spec.ts**.
