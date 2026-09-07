import { expect, test } from '@playwright/test';

test('DSC article renders without JavaScript and respects reduced motion on mobile', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/articles/dsc/');
  await expect(page.getByRole('heading', { name: 'DSC, simply', exact: true })).toBeVisible();
  const image = page.getByRole('img', { name: /Azure Policy deploys a configuration assignment/ });
  await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
  expect(await image.evaluate((el: HTMLImageElement) => el.currentSrc)).toContain('diagram-static.svg');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  const region = page.getByRole('region', { name: /DSC diagram/ });
  await region.scrollIntoViewIfNeeded();
  expect(await region.evaluate(el => el.scrollWidth > el.clientWidth)).toBe(true);
  await page.bringToFront();
  await region.focus();
  await expect(region).toBeFocused();
  await page.keyboard.press('ArrowRight', { delay: 150 });
  await expect.poll(() => region.evaluate(el => el.scrollLeft)).toBeGreaterThan(0);
  await context.close();
});

test('DSC connectors animate and the diagram has readable content', async ({ page }) => {
  await page.goto('/learning-assets/dsc/diagram.svg');
  const connector = page.locator('.flow').first();
  const first = await connector.evaluate(el => getComputedStyle(el).strokeDashoffset);
  await expect.poll(() => connector.evaluate(el => getComputedStyle(el).strokeDashoffset)).not.toBe(first);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await connector.evaluate(el => getComputedStyle(el).animationName)).toBe('none');
  await page.goto('/articles/dsc/');
  await page.screenshot({ path: '/tmp/dsc-desktop.png', fullPage: true });
});
