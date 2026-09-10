import { expect, test } from '@playwright/test';

const article = '/articles/asc-default-policy-guide/';

test('ASC article uses a React Flow diagram instead of a canvas', async ({ page }) => {
  await page.addInitScript(() => {
    HTMLCanvasElement.prototype.getContext = () => { throw new Error('Unexpected canvas'); };
  });
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(article);
  await expect(page.locator('.react-flow')).toBeVisible();
  await expect(page.getByRole('button', { name: /Inspect ASC Default/ })).toBeVisible();
  await expect(page.locator('.react-flow canvas')).toHaveCount(0);
  expect(errors.filter((error) => error !== 'Unexpected canvas')).toEqual([]);
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
