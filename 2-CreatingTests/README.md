# 2. Generating Tests with Playwright's Codegen

In this section, you'll learn how to automatically generate Playwright test code by simply interacting with your web application. We'll explore two methods for using Playwright's Codegen feature: the integrated VS Code extension and the command-line tool. We will also cover the essential practice of securely managing credentials using environment variables instead of hardcoding them in your tests.

## Overview of Codegen

Playwright Codegen is a tool that helps you automatically generate test code. It works by recording your interactions (like clicks, typing, navigation) as you use your web application in a browser window controlled by Playwright.

As you interact, Codegen translates these actions into Playwright test script code. This generated code can then be saved into a test file, providing a quick starting point for writing your end-to-end tests. You can use Codegen either through the integrated Playwright VS Code extension or via a command-line interface (npx playwright's Codegen).

## Method 1: Using the VS Code Extension (Recommended)

The Playwright VS Code extension provides an integrated way to record tests directly within your editor.

1. [] **Open the Testing Sidebar:** Click on the Testing icon (looks like a beaker) in the VS Code Activity Bar on the left.
2. [] **Start Recording:** Find the "Record new" button (often near the top of the Testing sidebar) and click it.
    *   This will open a new browser window controlled by Playwright.
3. [] **Interact with your application:** Perform the actions you want to test in the browser window. For example:
    *   Navigate to the application URL (e.g., `http://localhost:3000`).
    *   Click the "Log In" button.
    *   Fill in the email and password fields.
    *   Click the login button.
    *   Click the user profile button.
    *   Click the logout button.
4. [] **Add Assertions (Optional but Recommended):** While recording, you can use the "Pick Locator" button in the floating recorder toolbar to select elements and choose assertions (like **toBeVisible**, **toHaveText**, etc.) from the VS Code status bar at the bottom. This adds verification steps to your test.
5. [] **Stop Recording:** Once you've recorded the desired steps, click the "Cancel" or "Record" button again in the Testing sidebar or close the browser window.
6. [] **Review and Save the Code:** VS Code will automatically generate the test code in a new editor window.
    *   Review the generated code.
    *   Add or refine assertions (**expect()**) if needed.
    *   Save the file in your **tests/logged-out** directory with a descriptive name (e.g., **auth.spec.ts**).
7. [] **Run your new test:** Use the Playwright command (`npx playwright test`) or the Run button next to the test in the Testing sidebar to ensure it works correctly.

## Storing Credentials Securely with a .env File

It's important not to hardcode sensitive information like usernames and passwords directly into your tests. A common practice is to use environment variables stored in a **.env** file. We have safely stored the credentials for you so now you just need to update the test to use them.

    ```typescript
    // Example usage in a test file
    const username = process.env.MOVIES_USERNAME!;
    const password = process.env.MOVIES_PASSWORD!;

    // Use username and password variables in your test steps
    await page.getByLabel('Email').fill(username);
    await page.getByLabel('Password').fill(password);
    ```
    The **!** tells TypeScript that you are sure these variables will be defined (because they are loaded from **.env**).

1. [] **Run your new test:**
    Save the file and run your tests using the Playwright command (e.g., `npx playwright test auth.spec.ts`) to ensure the generated test works correctly or run the test using the VS Code extension by clicking the play button next to the test.

## Check-in

Compare your generated **auth.spec.ts** file with the one provided in the **solution** folder for this section. Verify that your test correctly performs the login and logout steps and utilizes environment variables for the username and password, rather than hardcoding them.
