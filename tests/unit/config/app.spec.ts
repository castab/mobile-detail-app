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

  it('appConfig.services contains exactly two entries', async () => {
    const { appConfig } = await import('@/config/app')
    expect(appConfig.services).toHaveLength(2)
  })

  it('each service has required fields', async () => {
    const { appConfig } = await import('@/config/app')
    for (const service of appConfig.services) {
      expect(service.id).toBeTruthy()
      expect(service.name).toBeTruthy()
      expect(service.category).toBeTruthy()
      expect(service.description).toBeTruthy()
      expect(service.duration).toBeTypeOf('number')
    }
  })

  it('appConfig.nav contains entries for /services and /book', async () => {
    const { appConfig } = await import('@/config/app')
    const hrefs = appConfig.nav.map((n) => n.href)
    expect(hrefs).toContain('/services')
    expect(hrefs).toContain('/book')
  })
})
