import { expect, test } from '@playwright/test';

test('Logic Apps pricing diagram uses React Flow in the light card style', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/articles/logic-apps-pricing/');
  await expect(page.getByRole('heading', { name: 'Logic Apps pricing, simply', exact: true })).toBeVisible();
  const diagram = page.getByRole('region', { name: 'Logic Apps hosting prices in Sweden Central' });
  await diagram.scrollIntoViewIfNeeded();
  await expect(page.locator('.react-flow')).toBeVisible();
  const ws1 = page.getByRole('button', { name: /Inspect Standard WS1/ });
  await expect(ws1).toBeVisible();
  await page.getByRole('button', { name: 'Fit view', exact: true }).click();
  await expect.poll(async () => (await ws1.boundingBox())?.width ?? 0).toBeGreaterThan(200);
  await page.getByLabel('Inspect diagram item').selectOption('node:consumption');
  await expect(page.getByRole('heading', { name: 'Consumption', exact: true })).toBeVisible();
  await expect(page.getByText('Drag to pan · Scroll to zoom')).toBeVisible();
  expect(errors).toEqual([]);
});

test('React Flow pulse pauses when reduced motion is requested', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/articles/logic-apps-pricing/');
  await expect(page.locator('.react-flow')).toBeVisible();
  const pulse = page.locator('[data-edge-pulse]').first();
  await expect(pulse).toHaveAttribute('data-animating', 'false');
});

test('DSC keeps a static fallback without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  try {
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4321/articles/dsc/');
    await expect(page.getByRole('heading', { name: 'DSC, simply', exact: true })).toBeVisible();
    const image = page.getByRole('img', { name: /Azure Policy deploys a configuration assignment/ });
    await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
    expect(await image.evaluate((el: HTMLImageElement) => el.currentSrc)).toContain('diagram-static.svg');
  } finally {
    await context.close();
  }
});
