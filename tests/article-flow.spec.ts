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

for (const reducedMotion of ['no-preference', 'reduce'] as const) {
  test(`article diagrams stay still with motion preference ${reducedMotion}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion });
    await page.goto('/articles/logic-apps-pricing/');
    await expect(page.locator('.react-flow')).toBeVisible();
    await expect(page.locator('[data-edge-pulse], canvas')).toHaveCount(0);
    expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
    await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto');
    await page.getByRole('button', { name: /Inspect Standard WS1/ }).focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('heading', { name: 'Standard WS1', exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
  });
}

test('downloadable diagram SVGs contain no animation', async ({ request }) => {
  for (const folder of ['asc-default', 'windows-baseline', 'dsc']) {
    for (const name of ['diagram.svg', 'diagram-static.svg']) {
      const response = await request.get(`/learning-assets/${folder}/${name}`);
      expect(response.ok()).toBe(true);
      expect(await response.text()).not.toMatch(/@keyframes|\banimation\s*:|<animate|<set\b/i);
    }
  }
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
