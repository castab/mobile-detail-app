import { expect, test } from '@playwright/test'

test('booking: page renders all steps and form elements', async ({ page }) => {
  const res = await page.goto('/book')
  expect(res?.status()).toBe(200)

  await expect(page.getByText('Step 1')).toBeVisible()
  await expect(page.getByText('Step 2')).toBeVisible()
  await expect(page.getByText('Step 3')).toBeVisible()

  // Step 1: first service card selected state (blush border).
  const exteriorButton = page.getByRole('button', { name: /Exterior Wash/ })
  await expect(exteriorButton).toBeVisible()
  await expect(exteriorButton).toHaveClass(/border-highlight/)

  // Step 2: calendar and slots.
  await expect(page.getByText(/\w+ \d{4}/)).toBeVisible()
  await expect(page.getByRole('button', { name: '8:00 AM' })).toBeVisible()
  await expect(page.getByRole('button', { name: '2:00 PM', exact: true })).toBeDisabled()

  // Step 3: form fields.
  await expect(page.getByLabel('Full Name')).toBeVisible()
  await expect(page.getByLabel('Email')).toBeVisible()
  await expect(page.getByLabel('Phone')).toBeVisible()
  await expect(page.getByLabel('Service Address')).toBeVisible()
  await expect(page.getByLabel('Vehicle Type')).toBeVisible()
  await expect(page.getByLabel('Additional Notes')).toBeVisible()

  const confirm = page.getByRole('button', { name: 'Confirm Booking' })
  await expect(confirm).toBeVisible()

  const beforeUrl = page.url()
  await confirm.click()
  await expect(page).toHaveURL(beforeUrl)
})
