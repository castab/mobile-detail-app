import { beforeEach, describe, expect, it, vi } from 'vitest'

const findUnique = vi.fn()
const compare = vi.fn()

vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique,
    },
  },
}))

vi.mock('bcryptjs', () => ({
  compare,
}))

describe('authorizeAdminCredentials', () => {
  beforeEach(() => {
    findUnique.mockReset()
    compare.mockReset()
  })

  it('returns the admin user when credentials are valid', async () => {
    findUnique.mockResolvedValue({
      id: 'admin-1',
      email: 'owner@example.com',
      name: 'Owner',
      passwordHash: 'hashed',
      role: 'ADMIN',
    })
    compare.mockResolvedValue(true)

    const { authorizeAdminCredentials } = await import('@/lib/auth/authorize')

    await expect(
      authorizeAdminCredentials({
        email: 'Owner@Example.com',
        password: 'Password123!',
      })
    ).resolves.toEqual({
      id: 'admin-1',
      email: 'owner@example.com',
      name: 'Owner',
      role: 'ADMIN',
    })
  })

  it('rejects non-admin users', async () => {
    findUnique.mockResolvedValue({
      id: 'customer-1',
      email: 'customer@example.com',
      name: 'Customer',
      passwordHash: 'hashed',
      role: 'CUSTOMER',
    })

    const { authorizeAdminCredentials } = await import('@/lib/auth/authorize')

    await expect(
      authorizeAdminCredentials({
        email: 'customer@example.com',
        password: 'Password123!',
      })
    ).resolves.toBeNull()
  })

  it('rejects invalid passwords', async () => {
    findUnique.mockResolvedValue({
      id: 'admin-1',
      email: 'owner@example.com',
      name: 'Owner',
      passwordHash: 'hashed',
      role: 'ADMIN',
    })
    compare.mockResolvedValue(false)

    const { authorizeAdminCredentials } = await import('@/lib/auth/authorize')

    await expect(
      authorizeAdminCredentials({
        email: 'owner@example.com',
        password: 'wrong-password',
      })
    ).resolves.toBeNull()
  })
})
