import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

const adminEmail = process.env.ADMIN_EMAIL ?? 'owner@example.com'
const adminPassword = process.env.ADMIN_PASSWORD ?? 'password123!'

async function signIn(page: Page) {
  await page.goto('/admin/login')

  await page.getByLabel('Email').fill(adminEmail)
  await page.getByLabel('Password').fill(adminPassword)
  await page.getByRole('button', { name: 'Sign In' }).click()
}

test.describe('admin auth', () => {
  test('signed-out users are redirected to login', async ({ page }) => {
    await page.goto('/admin')

    await expect(page).toHaveURL(/\/admin\/login$/)
    await expect(page.getByRole('heading', { name: 'Admin Login' })).toBeVisible()
  })

  test('admin can log in and sign out', async ({ page }) => {
    await signIn(page)

    await expect(page).toHaveURL(/\/admin$/)
    await expect(page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible()

    await page.getByRole('button', { name: 'Sign Out' }).click()

    await expect(page).toHaveURL(/\/admin\/login$/)
  })

  test('admin can view the services management page', async ({ page }) => {
    await signIn(page)

    await page.goto('/admin/services')

    await expect(page.getByRole('heading', { name: 'Services' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'New Service' })).toHaveAttribute(
      'href',
      '/admin/services/new'
    )
    await expect(page.getByRole('heading', { name: 'Exterior Wash' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Interior Cleaning' })).toBeVisible()
  })
})
