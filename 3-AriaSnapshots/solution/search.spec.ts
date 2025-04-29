import { test, expect } from '@playwright/test';

test('search for "Twisters" movie and navigate to details page', async ({ page }) => {
  await page.goto('http://localhost:3000/?category=Popular&page=1');
  await page.getByRole('search').click();
  await page.getByRole('textbox', { name: 'Search Input' }).fill('twisters');
  await page.getByRole('textbox', { name: 'Search Input' }).press('Enter');
  await page.getByRole('button', { name: 'Search for a movie' }).click();
  await expect(page.locator('h1')).toContainText('twisters');
  await expect(page.getByLabel('movies')).toMatchAriaSnapshot(`
    - list "movies":
      - listitem "movie":
        - link "poster of Twisters Twisters rating":
          - /url: /movie?id=tt12584954&page=1
          - img "poster of Twisters"
          - heading "Twisters" [level=2]
    `);
});

test('search for non-existent-movie', async ({ page }) => {
  await page.goto('http://localhost:3000/?category=Popular&page=1');
  await page.getByRole('search').click();
  await page.getByRole('textbox', { name: 'Search Input' }).fill('non-existent-movie');
  await page.getByRole('search').click();
  await page.getByRole('button', { name: 'Search for a movie' }).click();
  await expect(page.getByRole('main')).toMatchAriaSnapshot(`
    - main:
      - heading "Sorry!" [level=3]
      - heading "There were no results for non-existent-movie..." [level=4]
      - img "Not found!"
      - link "Home":
        - /url: /?category=Popular&page=1
        - button "Home":
          - img
    `);
  await page.getByRole('button', { name: 'Home' }).click();
});
