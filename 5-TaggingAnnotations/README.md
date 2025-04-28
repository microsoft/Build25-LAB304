# 5. Organize and Manage Tests with Tags and Annotations

## Goal

This section will guide you through using Playwright's tagging and annotation features. You'll learn how to categorize tests using tags for selective runs and how to use annotations to control test execution (like skipping tests) or add metadata (like linking to bug reports).

## Understanding Tags

Tags (**@tag**) are labels you add to tests or whole **describe** blocks (e.g., **@smoke**, **@auth**). They allow you to categorize tests and run specific groups using the **-g** or **--grep** flag (e.g., **npx playwright test -g @smoke**).

**Common Tagging Strategies:**

* **Tag by Feature Area:** This is often the most useful approach.
  * Add tags like **@auth** to tests related to login/logout.
  * Add **@search** to tests involving search functionality.
* **Tag by Test Type/Level:**
  * Identify critical path tests covering core functionality (e.g., login, basic search) and tag them with **@smoke** for quick sanity checks.

## Step 1: Add a Tag to Movie List Tests

1. [] **Open:** **tests/logged-out/movie-list.spec.ts**.
2. [] **Add**: Add the **@movies** tag to the **test** functions in this file.

```ts
// Example: tests/logged-out/movie-list.spec.ts
test('Avengers: Infinity is the first top rated movie', {
  tag: '@movies',
}, async ({ page }) => {
  // ... test code ...
});

test('dynamic content for first upcoming movie', {
  tag: '@movies',
}, async ({ page }, testInfo) => {
  // ... test code ...
});
```

## Step 2: Run Tagged Tests

1. [] **Run only tests with the **@movies** tag:**
  *   Use the following command in your terminal: `npx playwright test --grep @movies`

**Bonus Tip:** To run all tests *except* those with the **@movies** tag, use **--grep-invert**: `npx playwright test --grep-invert @movies`

## Understanding Annotations

**Annotations** provide metadata or control test execution. For example:
*   **test.skip()**: Prevents a test from running.
*   **test.slow()**: Gives a test more time to complete (triples the default timeout).
*   Custom annotations: Link tests to bug tickets, requirements, or other relevant information.

## Step 3: Skip a Test

1. [] **Open:** **tests/logged-out/movie-list.spec.ts**.
2. [] **Modify:** Add **.skip** to the first test function to prevent it from running.

```ts
// Example: tests/logged-out/movie-list.spec.ts
test.skip('Avengers: Infinity is the first top rated movie', {
  tag: '@movies', // Note: The tag remains, but skip takes precedence
}, async ({ page }) => {
  // ... test code ...
});
```

## Step 4: Annotate a Test with an Issue Link

Annotations are useful for linking tests to external information, like bug reports.

1. [] **Open:** **tests/logged-out/movie-list.spec.ts**.
2. [] **Modify:** Add an annotation object to the second test, linking it to a hypothetical GitHub issue.

```ts
// Example: tests/logged-out/movie-list.spec.ts
test('dynamic content for first upcoming movie', {
  tag: '@movies',
  annotation: {
    type: 'issue',
    description: 'Link to relevant issue: https://github.com/microsoft/playwright/issues/23180',
  },
}, async ({ page }) => {
  // ... test code ...
});
```

## Step 5: Run Tests and View Report

Now, let's run the tagged tests again to see the effect of the skip and the annotation.

1. [] **Run Tests:**
    *   Use the command line to run tests tagged with **@movies**: `npx playwright test --grep @movies`
2. [] **View Report:**
    *   Open the HTML report: `npx playwright show-report`
    *   You should see one test passed and one test skipped.
    *   Click on the passed test (**dynamic content for first upcoming movie**) to view its details, including the 'issue' annotation you added.

## Check-in

By now, you should understand how to:
*   Use **tags** (**@tag**) within the test options object to categorize tests.
*   Run specific groups of tests using the **--grep** and **--grep-invert** command-line flags.
*   Use **annotations** like **test.skip()** to control test execution.
*   Add custom annotations to provide additional metadata, such as linking to issues.
*   View tags and annotations in the Playwright HTML report.

These techniques help you manage your test suite effectively as it grows.
