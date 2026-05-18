import { describe, expect, it, vi } from 'vitest'

describe('appConfig', () => {
  it("appConfig.name falls back to 'Fresh Finish' when NEXT_PUBLIC_APP_NAME is not set", async () => {
    vi.resetModules()
    const original = process.env.NEXT_PUBLIC_APP_NAME
    // Ensure fallback path.
    delete process.env.NEXT_PUBLIC_APP_NAME

    const { appConfig } = await import('@/config/app')
    expect(appConfig.name).toBe('Fresh Finish')

    process.env.NEXT_PUBLIC_APP_NAME = original
  })

  it('appConfig.servicesPage exposes labels for both service categories', async () => {
    const { appConfig } = await import('@/config/app')
    expect(appConfig.copy.servicesPage.categoryLabels.EXTERIOR_WASH).toBe('Exterior')
    expect(appConfig.copy.servicesPage.categoryLabels.INTERIOR_CLEANING).toBe('Interior')
  })

  it('appConfig.nav contains entries for /services and /book', async () => {
    const { appConfig } = await import('@/config/app')
    const hrefs = appConfig.nav.map((n) => n.href)
    expect(hrefs).toContain('/services')
    expect(hrefs).toContain('/book')
  })
})
