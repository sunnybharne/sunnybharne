import { expect, test } from '@playwright/test';

test('DSC article renders a React Flow diagram with inspectable cards', async ({ page }) => {
  await page.goto('/articles/dsc/');
  await expect(page.getByRole('heading', { name: 'DSC, simply', exact: true })).toBeVisible();
  await expect(page.locator('.react-flow')).toBeVisible();
  await expect(page.getByRole('button', { name: /Inspect Azure Policy/ })).toBeVisible();
});
