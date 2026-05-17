import { expect, test } from '@playwright/test'

test('homepage: loads and renders key sections', async ({ page }) => {
  const res = await page.goto('/')
  expect(res?.status()).toBe(200)

  await expect(
    page.getByRole('heading', { level: 1, name: /Premium Mobile Detailing, At Your Door\./ })
  ).toBeVisible()

  const main = page.getByRole('main')
  await expect(main.getByRole('link', { name: 'Book Now' }).first()).toHaveAttribute(
    'href',
    '/book'
  )
  await expect(main.getByRole('link', { name: 'Our Services' }).first()).toHaveAttribute(
    'href',
    '/services'
  )

  // Services Preview renders exactly two service cards.
  const serviceHeadings = page.getByRole('heading', { name: /Exterior Wash|Interior Cleaning/ })
  await expect(serviceHeadings).toHaveCount(2)

  await expect(page.getByRole('heading', { name: 'How It Works' })).toBeVisible()
  await expect(page.getByText('Fully Insured')).toBeVisible()

  // Footer contains app name.
  await expect(page.getByRole('contentinfo').getByText(/^Fresh Finish$/)).toBeVisible()
})
