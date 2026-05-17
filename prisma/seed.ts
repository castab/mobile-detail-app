import { hash } from 'bcryptjs'

import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

function getRequiredEnv(name: 'ADMIN_EMAIL' | 'ADMIN_PASSWORD') {
  const value = process.env[name]?.trim()

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

async function main() {
  const email = getRequiredEnv('ADMIN_EMAIL').toLowerCase()
  const password = getRequiredEnv('ADMIN_PASSWORD')
  const passwordHash = await hash(password, 12)

  await prisma.user.upsert({
    where: { email },
    update: {
      passwordHash,
      role: Role.ADMIN,
    },
    create: {
      email,
      passwordHash,
      role: Role.ADMIN,
    },
  })
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
