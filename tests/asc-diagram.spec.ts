import { expect, test } from '@playwright/test';

const article = '/articles/asc-default-policy-guide/';

test('displays native draw.io animation without a canvas', async ({ page }) => {
  await page.addInitScript(() => {
    HTMLCanvasElement.prototype.getContext = () => { throw new Error('Unexpected canvas'); };
  });
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(article);
  const image = page.locator('.asc-diagram-image');
  await image.scrollIntoViewIfNeeded();
  await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
  const first = await image.screenshot();
  await page.waitForTimeout(400);
  expect(await image.screenshot()).not.toEqual(first);
  await expect(page.locator('.asc-diagram canvas')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('export contains native flowing connectors and embedded official icons', async ({ page }) => {
  await page.goto('/learning-assets/asc-default/diagram.svg');
  await expect(page.locator('svg image')).toHaveCount(4);
  const animated = page.locator('path[style*="animation:"]');
  await expect(animated).toHaveCount(2);
  const first = await animated.first().evaluate((el) => getComputedStyle(el).strokeDashoffset);
  await page.waitForTimeout(350);
  expect(await animated.first().evaluate((el) => getComputedStyle(el).strokeDashoffset)).not.toBe(first);
});

test('reduced motion keeps the exported diagram still', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(article);
  const image = page.locator('.asc-diagram-image');
  await image.scrollIntoViewIfNeeded();
  await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
  expect(await image.evaluate((el: HTMLImageElement) => el.currentSrc)).toContain('diagram-static.svg');
  const first = await image.screenshot();
  await page.waitForTimeout(400);
  expect(first.equals(await image.screenshot())).toBe(true);
  await page.goto('/learning-assets/asc-default/diagram.svg');
  expect(await page.locator('path[style*="animation:"]').first().evaluate((el) => getComputedStyle(el).animationName)).toBe('none');
});

test('mobile keeps labels readable with keyboard scrolling and no page overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(article);
  const region = page.getByRole('region', { name: /Subscription diagram/ });
  await region.scrollIntoViewIfNeeded();
  await expect(page.getByText('Scroll sideways to see the full diagram.')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  expect(await region.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true);
  await region.focus();
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => region.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
});

test('diagram works without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto(`http://127.0.0.1:4321${article}`);
    const image = page.getByRole('img', { name: /ASC Default Azure Policy/ });
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
    await expect(image).toBeVisible();
  } finally { await context.close(); }
});


test('shows all saved policies in accessible groups with pinned JSON links', async ({ page }) => {
  await page.goto(article);
  await expect(page.getByRole('heading', { name: 'What it does', exact: true })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Saved policy reference', exact: true })).toBeVisible();
  const groups = page.locator('details.policy-group').filter({ has: page.locator('table') });
  await expect(groups).toHaveCount(11);
  await expect(groups.locator('tbody tr')).toHaveCount(224);
  await expect(groups.getByRole('link', { name: 'JSON', exact: true, includeHidden: true })).toHaveCount(224);
  const effects = await groups.locator('tbody tr td:last-child').allTextContents();
  expect(effects.filter(value => value === 'Audit')).toHaveLength(99);
  expect(effects.filter(value => value === 'AuditIfNotExists')).toHaveLength(109);
  expect(effects.filter(value => value === 'Disabled')).toHaveLength(16);
  const summary = groups.first().locator('summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(groups.first()).toHaveAttribute('open', '');
  await expect(groups.first().getByRole('link', { name: 'JSON', exact: true }).first()).toHaveAttribute('href', /Azure\/azure-policy\/blob\/9780ba642/);
  await page.setViewportSize({ width: 390, height: 844 });
  await groups.first().scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  const table = groups.first().getByRole('region', { name: 'Scrollable reference table' });
  expect(await table.evaluate(el => el.scrollWidth > el.clientWidth)).toBe(true);
});
