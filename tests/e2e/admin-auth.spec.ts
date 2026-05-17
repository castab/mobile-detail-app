import { expect, test } from '@playwright/test'

const adminEmail = process.env.ADMIN_EMAIL ?? 'owner@example.com'
const adminPassword = process.env.ADMIN_PASSWORD ?? 'password123!'

test.describe('admin auth', () => {
  test('signed-out users are redirected to login', async ({ page }) => {
    await page.goto('/admin')

    await expect(page).toHaveURL(/\/admin\/login$/)
    await expect(page.getByRole('heading', { name: 'Admin Login' })).toBeVisible()
  })

  test('admin can log in and sign out', async ({ page }) => {
    await page.goto('/admin/login')

    await page.getByLabel('Email').fill(adminEmail)
    await page.getByLabel('Password').fill(adminPassword)
    await page.getByRole('button', { name: 'Sign In' }).click()

    await expect(page).toHaveURL(/\/admin$/)
    await expect(page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible()

    await page.getByRole('button', { name: 'Sign Out' }).click()

    await expect(page).toHaveURL(/\/admin\/login$/)
  })
})
