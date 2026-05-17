import { compare } from 'bcryptjs'

import { prisma } from '@/lib/prisma'

type CredentialsInput = Partial<Record<'email' | 'password', unknown>> | undefined

export async function authorizeAdminCredentials(credentials: CredentialsInput) {
  const email = typeof credentials?.email === 'string' ? credentials.email.trim().toLowerCase() : ''
  const password = typeof credentials?.password === 'string' ? credentials.password : ''

  if (!email || !password) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user || user.role !== 'ADMIN') {
    return null
  }

  const passwordMatches = await compare(password, user.passwordHash)

  if (!passwordMatches) {
    return null
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  }
}
