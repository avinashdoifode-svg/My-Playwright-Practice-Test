import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.flipkart.com/');
  await page.getByRole('button', { name: '✕' }).click();
  await page.getByRole('link', { name: 'Home' }).click();
  await page.getByRole('link', { name: 'Cleaning' }).click();
  await expect(page.locator('#container')).toContainText('ANKZWEE Plastic Wet and Dry Brush');
  await expect(page.getByRole('link', { name: 'UNETRI-PRO Clear Plastic' }).first()).toBeVisible();
  await expect(page.locator('#container')).toMatchAriaSnapshot(`
    - link "DM SPECIALLY FOR SPECIALIST HDPE Disposable Poly Gloves...":
      - /url: /dm-specially-specialist-hdpe-disposable-poly-gloves-100-pcs-food-grade-transparent-wet-dry-glove-set/p/itmaab98003dda84?pid=CLGHH2GPDYKWN7DA&lid=LSTCLGHH2GPDYKWN7DAAMQHRB&marketplace=FLIPKART&store=rja%2Fz2d&srno=b_1_3&otracker=browse&fm=neo%2Fmerchandising&iid=en_QsCiZZFQkLgYgqwCU3fVTy72C0ck2q0KLP5Evaa02yppXdgDaA2PlZCNZxfuOJ8cg9_yx5takpS7NlTOAQN_PA%3D%3D&ppt=browse&ppn=browse&ssid=78tl6eyyj40000001780900278158&ov_redirect=true&ov_redirect=true
    `);
});