# 1 Overview of Playwright, Project Structure, and Config

## Goal

This section introduces the Playwright framework, explains the project’s folder structure and configuration, and demonstrates how to start the sample application and run an initial Playwright test. The aim is to build familiarity with the tools and setup needed for effective end-to-end testing.

## What is Playwright?

Playwright is a powerful open-source framework developed by Microsoft for reliable end-to-end testing and automation of modern web applications. It allows you to write tests that run across all major browsers (Chromium, Firefox, WebKit) using a single API, simulating real user interactions like clicking, typing, and navigating.

This project serves as a hands-on guide for learning Playwright. It involves testing a sample Next.js application (movies-app) using Playwright's features for end-to-end testing. You'll explore the project structure, understand configuration, write and run tests, and learn how to run Playwright tests at scale.

In this section, you'll get familiar with the project setup and run your first Playwright test.

---

## 🗂 Project Structure Overview

Here's a quick look at the folder layout:

- **movies-app/**  
  The [Next.js](https://nextjs.org/) application you'll be testing.  
- **tests/**  
  Where the Playwright test files live. You'll see folders like:
  - logged-in/
  - logged-out/
  - helpers/ (utility functions)
  - mocks/ (API mocking utilities)
- **playwright.config.ts**  
  The main config file for Playwright tests.

---

## ⚙️ Understanding the Config

Open the file `playwright.config.ts`. Let’s look at a few important parts:

- **baseURL: 'http://localhost:3000'**  
  This tells Playwright where your app will be running. Make sure the app is running before you run tests!

- **workers**  
  This controls how many tests run in parallel. We’ll modify this later in the workshop.

- **trace: 'on-first-retry'**  
  This enables trace recording *only if* a test fails and retries.

---

## ▶️ Start the App

Let’s run the application so you can test it.

1. [] **Open a terminal**:

   ```bash
   npm install
   npm run dev
   ```

   This starts the app on `http://localhost:3000`.

2. [] **Open a second terminal** at the project root (same level as tests/ and playwright.config.ts).

---

## ✅ Run Your First Test

1. [] Now let’s run the movie-list test.

```bash
npx playwright test movie-list.spec.ts
```

You’ll see Playwright launch a browser, run the test, and print the result in the terminal.

---

## 💬 What’s Happening?

Take a moment to skim the test file: tests/logged-out/movie-list.spec.ts

- What is it trying to verify?
- Is it checking elements, navigation, or content?

We'll go deeper into test structure soon!

---

## Check-in

At the end of this section, you should be able to:
- Understand the project structure.
- Run the application locally.
- Run a Playwright test.
- Understand the Playwright config file.
- Know where to find test files.
