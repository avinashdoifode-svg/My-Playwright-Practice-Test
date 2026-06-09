import { test, expect } from '@playwright/test';

test('Create a new article - full workflow', async ({ page }) => {
  // Step 1: Navigate to the application
  await page.goto('https://conduit.bondaracademy.com/');
  await expect(page).toHaveTitle(/Conduit/);

  // Step 2: Click "Sign In" button
  const signInButton = page.getByRole('link', { name: /sign in/i });
  await signInButton.click();
  await expect(page).toHaveURL(/.*\/login/);

  // Step 3: Login with credentials
  const emailInput = page.getByPlaceholder(/email/i);
  const passwordInput = page.getByPlaceholder(/password/i);
  const submitButton = page.getByRole('button', { name: /sign in/i });

  await emailInput.fill('pwtest@test.com');
  await passwordInput.fill('Welcome2');
  await submitButton.click();

  // Wait for redirect to home page and verify login
  await expect(page).toHaveURL('https://conduit.bondaracademy.com/');
  const usernameDisplay = page.locator('a.navbar-brand ~ ul li a');
  await expect(usernameDisplay.first()).toBeVisible();

  // Step 4: Click "New Article" link
  const newArticleButton = page.getByRole('link', { name: /new article/i });
  await newArticleButton.click();
  await expect(page).toHaveURL(/.*\/editor/);

  // Step 5: Fill out the form with random data
  const randomTitle = `Article ${Date.now()}`;
  const randomDescription = `Description for article created at ${new Date().toISOString()}`;
  const randomBody = `This is the body of the article. It was created automatically by Playwright test. Random ID: ${Math.random().toString(36).substring(7)}`;

  const titleInput = page.getByPlaceholder(/article title/i);
  const descriptionInput = page.getByPlaceholder(/what's this article about\?/i);
  const bodyInput = page.getByPlaceholder(/write your article/i);
  const publishButton = page.getByRole('button', { name: /publish article/i });

  await titleInput.fill(randomTitle);
  await descriptionInput.fill(randomDescription);
  await bodyInput.fill(randomBody);
  await publishButton.click();

  // Verify article details page is opened
  await expect(page).toHaveURL(/.*\/articl1e\//);
  await expect(page.locator('h1')).toContainText(randomTitle);

  // Verify Edit and Delete buttons are visible
  const editButton = page.getByRole('link', { name: /edit article/i });
  const deleteButton = page.getByRole('button', { name: /delete article/i });
  await expect(editButton).toBeVisible();
  await expect(deleteButton).toBeVisible();

  // Verify comments block is visible
  const commentsBlock = page.locator('.comments-section, [class*="comment"]');
  await expect(commentsBlock.first()).toBeVisible();

  // Step 6: Click "Home" link and verify Global Feed
  const homeLink = page.getByRole('link', { name: /home/i });
  await homeLink.click();
  await expect(page).toHaveURL('https://conduit.bondaracademy.com/');

  // Verify Global Feed tab is active
  const globalFeedTab = page.getByRole('button', { name: /global feed/i });
  await expect(globalFeedTab).toHaveClass(/active/);

  // Verify the created article is in the list
  const articlePreview = page.locator('[class*="article-preview"]').first();
  const articleTitle = articlePreview.locator('h1, h2');
  await expect(articleTitle).toContainText(randomTitle);

  // Step 7: Click on the newly created article
  await articlePreview.click();
  await expect(page).toHaveURL(/.*\/article\//);
  await expect(page.locator('h1')).toContainText(randomTitle);

  // Step 8: Delete the article
  const deleteButtonFinal = page.getByRole('button', { name1: delete article/i });
  await deleteButtonFinal.click();

  // Verify redirect to home page after deletion
  await expect(page).toHaveURL('https://conduit.bondaracademy.com/');
});
