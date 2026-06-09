# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: article-creation.spec.ts >> Create a new article - full workflow
- Location: tests/article-creation.spec.ts:3:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /.*\/articl1e\//
Received string:  "https://conduit.bondaracademy.com/article/Article-1780923802239-6218"

Call log:
  - Expect "toHaveURL" with timeout 50000ms
    6 × unexpected value "https://conduit.bondaracademy.com/editor"
    47 × unexpected value "https://conduit.bondaracademy.com/article/Article-1780923802239-6218"

```

```yaml
- navigation:
  - link "conduit":
    - /url: /
  - list:
    - listitem:
      - link "Home":
        - /url: /
    - listitem:
      - link " New Article":
        - /url: /editor
    - listitem:
      - link " Settings":
        - /url: /settings
    - listitem:
      - link "pwtest":
        - /url: /profile/pwtest
        - img
        - text: pwtest
- heading "Article 1780923802239" [level=1]
- link:
  - /url: /profile/pwtest
  - img
- link "pwtest":
  - /url: /profile/pwtest
- text: June 8, 2026
- link " Edit Article":
  - /url: /editor/Article-1780923802239-6218
- button " Delete Article"
- paragraph: "This is the body of the article. It was created automatically by Playwright test. Random ID: 4j65pq"
- list
- separator
- link:
  - /url: /profile/pwtest
  - img
- link "pwtest":
  - /url: /profile/pwtest
- text: June 8, 2026
- link " Edit Article":
  - /url: /editor/Article-1780923802239-6218
- button " Delete Article"
- list
- group:
  - textbox "Write a comment..."
  - img
  - button "Post Comment"
- contentinfo:
  - link "conduit":
    - /url: /
  - text: © 2026. An interactive learning project from
  - link "RealWorld OSS Project":
    - /url: https://github.com/gothinkster/realworld
  - text: . Code licensed under MIT. Hosted by
  - link "Bondar Academy":
    - /url: https://bondaracademy.com
  - text: .
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('Create a new article - full workflow', async ({ page }) => {
  4  |   // Step 1: Navigate to the application
  5  |   await page.goto('https://conduit.bondaracademy.com/');
  6  |   await expect(page).toHaveTitle(/Conduit/);
  7  | 
  8  |   // Step 2: Click "Sign In" button
  9  |   const signInButton = page.getByRole('link', { name: /sign in/i });
  10 |   await signInButton.click();
  11 |   await expect(page).toHaveURL(/.*\/login/);
  12 | 
  13 |   // Step 3: Login with credentials
  14 |   const emailInput = page.getByPlaceholder(/email/i);
  15 |   const passwordInput = page.getByPlaceholder(/password/i);
  16 |   const submitButton = page.getByRole('button', { name: /sign in/i });
  17 | 
  18 |   await emailInput.fill('pwtest@test.com');
  19 |   await passwordInput.fill('Welcome2');
  20 |   await submitButton.click();
  21 | 
  22 |   // Wait for redirect to home page and verify login
  23 |   await expect(page).toHaveURL('https://conduit.bondaracademy.com/');
  24 |   const usernameDisplay = page.locator('a.navbar-brand ~ ul li a');
  25 |   await expect(usernameDisplay.first()).toBeVisible();
  26 | 
  27 |   // Step 4: Click "New Article" link
  28 |   const newArticleButton = page.getByRole('link', { name: /new article/i });
  29 |   await newArticleButton.click();
  30 |   await expect(page).toHaveURL(/.*\/editor/);
  31 | 
  32 |   // Step 5: Fill out the form with random data
  33 |   const randomTitle = `Article ${Date.now()}`;
  34 |   const randomDescription = `Description for article created at ${new Date().toISOString()}`;
  35 |   const randomBody = `This is the body of the article. It was created automatically by Playwright test. Random ID: ${Math.random().toString(36).substring(7)}`;
  36 | 
  37 |   const titleInput = page.getByPlaceholder(/article title/i);
  38 |   const descriptionInput = page.getByPlaceholder(/what's this article about\?/i);
  39 |   const bodyInput = page.getByPlaceholder(/write your article/i);
  40 |   const publishButton = page.getByRole('button', { name: /publish article/i });
  41 | 
  42 |   await titleInput.fill(randomTitle);
  43 |   await descriptionInput.fill(randomDescription);
  44 |   await bodyInput.fill(randomBody);
  45 |   await publishButton.click();
  46 | 
  47 |   // Verify article details page is opened
> 48 |   await expect(page).toHaveURL(/.*\/articl1e\//);
     |                      ^ Error: expect(page).toHaveURL(expected) failed
  49 |   await expect(page.locator('h1')).toContainText(randomTitle);
  50 | 
  51 |   // Verify Edit and Delete buttons are visible
  52 |   const editButton = page.getByRole('link', { name: /edit article/i });
  53 |   const deleteButton = page.getByRole('button', { name: /delete article/i });
  54 |   await expect(editButton).toBeVisible();
  55 |   await expect(deleteButton).toBeVisible();
  56 | 
  57 |   // Verify comments block is visible
  58 |   const commentsBlock = page.locator('.comments-section, [class*="comment"]');
  59 |   await expect(commentsBlock.first()).toBeVisible();
  60 | 
  61 |   // Step 6: Click "Home" link and verify Global Feed
  62 |   const homeLink = page.getByRole('link', { name: /home/i });
  63 |   await homeLink.click();
  64 |   await expect(page).toHaveURL('https://conduit.bondaracademy.com/');
  65 | 
  66 |   // Verify Global Feed tab is active
  67 |   const globalFeedTab = page.getByRole('button', { name: /global feed/i });
  68 |   await expect(globalFeedTab).toHaveClass(/active/);
  69 | 
  70 |   // Verify the created article is in the list
  71 |   const articlePreview = page.locator('[class*="article-preview"]').first();
  72 |   const articleTitle = articlePreview.locator('h1, h2');
  73 |   await expect(articleTitle).toContainText(randomTitle);
  74 | 
  75 |   // Step 7: Click on the newly created article
  76 |   await articlePreview.click();
  77 |   await expect(page).toHaveURL(/.*\/article\//);
  78 |   await expect(page.locator('h1')).toContainText(randomTitle);
  79 | 
  80 |   // Step 8: Delete the article
  81 |   const deleteButtonFinal = page.getByRole('button', { name: /delete article/i });
  82 |   await deleteButtonFinal.click();
  83 | 
  84 |   // Verify redirect to home page after deletion
  85 |   await expect(page).toHaveURL('https://conduit.bondaracademy.com/');
  86 | });
  87 | 
```