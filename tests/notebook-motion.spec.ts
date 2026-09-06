import { expect, test } from '@playwright/test';

declare global {
  interface Window { animationFrames: number }
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.animationFrames = 0;
    const requestFrame = window.requestAnimationFrame;
    window.requestAnimationFrame = (callback) => requestFrame.call(window, (time) => {
      window.animationFrames += 1;
      callback(time);
    });
  });
});

test('animates quietly and supports keyboard pause and resume', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  const canvas = page.locator('.notebook-motion canvas');
  await expect(canvas).toBeVisible();
  const first = await canvas.screenshot();
  await page.waitForTimeout(1200);
  expect(await canvas.screenshot()).not.toEqual(first);

  await page.getByRole('button', { name: 'Pause animation' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: 'Play animation' })).toBeFocused();
  const paused = await canvas.screenshot();
  await page.waitForTimeout(400);
  expect(await canvas.screenshot()).toEqual(paused);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(800);
  expect(await canvas.screenshot()).not.toEqual(paused);
  expect(errors).toEqual([]);
});

test('pauses off-screen and in hidden tabs, and cleans up on navigation', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.notebook-motion canvas')).toBeVisible();
  await page.evaluate(() => { document.body.style.minHeight = '2500px'; });
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(300);
  const offscreen = await page.evaluate(() => window.animationFrames);
  await page.waitForTimeout(300);
  expect(await page.evaluate(() => window.animationFrames)).toBe(offscreen);

  await page.evaluate(() => window.scrollTo(0, 0));
  await expect.poll(() => page.evaluate(() => window.animationFrames)).toBeGreaterThan(offscreen);
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await page.waitForTimeout(200);
  const hidden = await page.evaluate(() => window.animationFrames);
  await page.waitForTimeout(300);
  expect(await page.evaluate(() => window.animationFrames)).toBe(hidden);
  await page.evaluate(() => {
    Reflect.deleteProperty(document, 'hidden');
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await expect.poll(() => page.evaluate(() => window.animationFrames)).toBeGreaterThan(hidden);

  await page.getByRole('navigation', { name: 'Main navigation' }).getByText('Articles').click();
  await expect(page).toHaveURL(/\/articles\/$/);
  await expect(page.locator('.notebook-motion')).toHaveCount(0);
  await page.waitForTimeout(300);
  const unmounted = await page.evaluate(() => window.animationFrames);
  await page.waitForTimeout(300);
  expect(await page.evaluate(() => window.animationFrames)).toBe(unmounted);
  await page.getByRole('link', { name: 'Sunny Bharne', exact: true }).click();
  await expect(page.locator('.notebook-motion canvas')).toHaveCount(1);
});

test('uses the static drawing for reduced motion, including live changes', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('.notebook-motion-fallback')).toBeVisible();
  await expect(page.locator('.notebook-motion canvas')).toHaveCount(0);
  await expect(page.getByRole('button', { name: /animation/ })).toHaveCount(0);

  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.locator('.notebook-motion canvas')).toBeVisible();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.notebook-motion canvas')).toHaveCount(0);
  await expect(page.locator('.notebook-motion-fallback')).toBeVisible();
});

test('falls back cleanly when the WebGL context is lost', async ({ page }) => {
  await page.goto('/');
  const canvas = page.locator('.notebook-motion canvas');
  await expect(canvas).toBeVisible();
  await canvas.evaluate((element) => {
    const gl = (element as HTMLCanvasElement).getContext('webgl2');
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
  });
  await expect(canvas).toHaveCount(0);
  await expect(page.locator('.notebook-motion-fallback')).toBeVisible();
  await expect(page.getByRole('button', { name: /animation/ })).toHaveCount(0);
  await expect(page.locator('.article-list-item').first()).toBeVisible();
});

test('keeps the content usable when WebGL is unavailable', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.addInitScript(() => { HTMLCanvasElement.prototype.getContext = () => null; });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('.notebook-motion canvas')).toHaveCount(0);
  await expect(page.locator('.notebook-motion-fallback')).toBeVisible();
  await expect(page.locator('.article-list-item').first()).toBeVisible();
  expect(errors).toEqual([]);
});

for (const width of [320, 390, 768, 1280]) {
  test(`keeps text clear and the layout compact at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('/');
    await expect(page.locator('.notebook-motion canvas')).toBeVisible();
    const text = await page.locator('.home-intro p').boundingBox();
    const drawing = await page.locator('.notebook-motion').boundingBox();
    expect(text!.x + text!.width).toBeLessThan(drawing!.x);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    const list = await page.locator('.article-list').boundingBox();
    const padding = width <= 600 ? 20.8 : 32;
    expect(list!.x).toBeCloseTo(padding, 0);
    expect(list!.width).toBeCloseTo(width - 2 * padding, 0);
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  });
}
