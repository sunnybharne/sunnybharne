import { expect, test } from '@playwright/test';

const article = '/articles/asc-default-policy-guide/';

test('renders the subscription relationships and links to the Defender explainer', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(article);
  const figure = page.locator('.asc-diagram');
  await figure.scrollIntoViewIfNeeded();
  await expect(figure.locator('canvas')).toBeVisible();
  await expect(figure.getByText('Your subscription', { exact: true })).toBeVisible();
  await expect(figure.getByText('Azure Policy assignment', { exact: true })).toBeVisible();
  await expect(figure.getByText('Built-in initiative', { exact: true })).toBeVisible();
  await expect(figure.locator('.asc-diagram-edge')).toHaveText(['configures baseline', 'checks', 'findings', 'references']);
  await figure.getByRole('link', { name: 'Defender for Cloud', exact: true }).click();
  await expect(page).toHaveURL(/\/articles\/defender-for-cloud\/$/);
  await expect(page.locator('.asc-diagram')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('keeps the diagram readable on mobile without widening the page', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(article);
  const region = page.getByRole('region', { name: /Subscription diagram/ });
  await region.scrollIntoViewIfNeeded();
  await expect(page.locator('.asc-diagram canvas')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  expect(await region.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true);
  await region.focus();
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => region.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
});

test('signals move briefly and replay on keyboard interaction', async ({ page }) => {
  await page.goto(article);
  const canvas = page.locator('.asc-diagram canvas');
  await canvas.waitFor();
  const first = await canvas.screenshot();
  await page.waitForTimeout(600);
  expect(await canvas.screenshot()).not.toEqual(first);
  await page.waitForTimeout(4200);
  const settled = await canvas.screenshot();
  await page.waitForTimeout(300);
  expect(await canvas.screenshot()).toEqual(settled);
  await page.getByRole('button', { name: 'Show ASC Default connections', exact: true }).focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(700);
  expect(await canvas.screenshot()).not.toEqual(settled);
});

test('reduced motion keeps signals still even on interaction', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(article);
  const canvas = page.locator('.asc-diagram canvas');
  await canvas.waitFor();
  const first = await canvas.screenshot();
  await page.getByRole('button', { name: 'Show ASC Default connections', exact: true }).focus();
  await page.keyboard.press('Enter');
  await page.mouse.move(0, 0);
  await page.locator('.article-title').click();
  await page.waitForTimeout(600);
  expect(await canvas.screenshot()).toEqual(first);
});

test('retains the whole diagram without WebGL', async ({ page }) => {
  await page.addInitScript(() => { HTMLCanvasElement.prototype.getContext = () => null; });
  await page.goto(article);
  await page.locator('.asc-diagram').scrollIntoViewIfNeeded();
  await page.waitForLoadState('networkidle');
  await expect(page.locator('.asc-diagram canvas')).toHaveCount(0);
  await expect(page.locator('.asc-diagram-fallback')).toBeVisible();
  await expect(page.locator('.asc-diagram-node')).toHaveCount(4);
});

test('retains the diagram with JavaScript disabled', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto(`http://127.0.0.1:4321${article}`);
    await expect(page.locator('.asc-diagram-fallback')).toBeVisible();
    await expect(page.locator('.asc-diagram-node')).toHaveCount(4);
  } finally { await context.close(); }
});
