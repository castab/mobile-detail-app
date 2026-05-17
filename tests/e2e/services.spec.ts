import { expect, test } from '@playwright/test'

test('services: page loads and renders two service detail cards', async ({ page }) => {
  const res = await page.goto('/services')
  expect(res?.status()).toBe(200)

  await expect(page.getByRole('heading', { level: 1, name: 'Our Services' })).toBeVisible()

  // Two services.
  await expect(page.getByRole('heading', { name: 'Exterior Wash' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Interior Cleaning' })).toBeVisible()

  const bookLinks = page.getByRole('link', { name: 'Book This Service' })
  await expect(bookLinks).toHaveCount(2)
  await expect(bookLinks.first()).toHaveAttribute('href', '/book')

  await expect(page.getByRole('heading', { name: 'Ready to book?' })).toBeVisible()
})
