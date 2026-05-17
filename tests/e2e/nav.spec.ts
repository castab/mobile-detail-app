import { expect, test } from '@playwright/test'

test.describe('header nav', () => {
  test('desktop: nav links are visible and navigate', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'desktop-only assertions')
    await page.setViewportSize({ width: 1280, height: 720 })

    await page.goto('/')
    await expect(page.getByRole('banner')).toBeVisible()

    const headerNav = page.getByRole('banner').getByLabel('Primary')
    const services = headerNav.getByRole('link', { name: 'Services', exact: true })
    const bookNow = headerNav.getByRole('link', { name: 'Book Now', exact: true })
    await expect(services).toBeVisible()
    await expect(bookNow).toBeVisible()

    await services.click()
    await expect(page).toHaveURL(/\/services$/)

    await bookNow.click()
    await expect(page).toHaveURL(/\/book$/)
  })

  test('mobile: drawer opens/closes and navigates', async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.startsWith('mobile-'), 'mobile-only assertions')

    await page.goto('/')

    // Desktop nav links should be hidden at mobile viewport.
    await expect(
      page.getByLabel('Primary').getByRole('link', { name: 'Services' })
    ).not.toBeVisible()
    await expect(
      page.getByLabel('Primary').getByRole('link', { name: 'Book Now' })
    ).not.toBeVisible()

    const menuButton = page.getByRole('button', { name: /Open menu|Close menu/ })
    await expect(menuButton).toBeVisible()

    await menuButton.click()

    const drawer = page.getByRole('dialog')
    const drawerServices = drawer.getByRole('link', { name: 'Services', exact: true })
    const drawerBook = drawer.getByRole('link', { name: 'Book Now', exact: true })
    await expect(drawerServices).toBeVisible()
    await expect(drawerBook).toBeVisible()

    await drawerServices.click()
    await expect(page).toHaveURL(/\/services$/)

    // Reopen and close via backdrop.
    await menuButton.click()
    await expect(drawerBook).toBeVisible()

    // Close via backdrop.
    await page
      .locator('button[aria-label="Close menu"].absolute.inset-0')
      .click({ position: { x: 10, y: 10 } })

    // Drawer links should no longer be visible.
    await expect(drawerBook).not.toBeVisible()

    // Escape closes.
    await menuButton.click()
    await expect(drawerBook).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(drawerBook).not.toBeVisible()

  })
})
