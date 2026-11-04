import { expect, test } from '@playwright/test';

test('homepage is still and needs no WebGL', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.addInitScript(() => {
    HTMLCanvasElement.prototype.getContext = () => { throw new Error('Unexpected canvas'); };
  });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('canvas, .home-intro svg')).toHaveCount(0);
  await expect(page.locator('.article-list-item')).toHaveCount(6);
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto');
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
  await page.getByRole('navigation', { name: 'Main navigation' }).getByText('Articles').click();
  await expect(page).toHaveURL(/\/articles\/$/);
  await page.getByRole('link', { name: 'Sunny Bharne', exact: true }).click();
  await expect(page.locator('.article-list-item')).toHaveCount(6);
  await expect(page.locator('canvas')).toHaveCount(0);
  expect(errors).toEqual([]);
});

for (const width of [320, 390, 768, 1280]) {
  test(`keeps the plain homepage compact at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('/');
    await expect(page.locator('.home-intro p')).toBeVisible();
    await expect(page.locator('.home-intro')).toHaveCSS('padding-right', '0px');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    const list = await page.locator('.article-list').boundingBox();
    const padding = width <= 600 ? 20.8 : 32;
    expect(list!.x).toBeCloseTo(padding, 0);
    expect(list!.width).toBeCloseTo(width - 2 * padding, 0);
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  });
}
