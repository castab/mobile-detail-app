import { hash } from 'bcryptjs'

import { PrismaClient, Role, ServiceCategory } from '@prisma/client'

const prisma = new PrismaClient()

const seededServices = [
  {
    slug: 'exterior-wash',
    name: 'Exterior Wash',
    category: ServiceCategory.EXTERIOR_WASH,
    description:
      "A thorough exterior clean that restores your vehicle's shine. Includes hand wash, wheel cleaning, and a streak-free rinse.",
    durationMinutes: 60,
    priceCents: 0,
    isActive: true,
  },
  {
    slug: 'interior-cleaning',
    name: 'Interior Cleaning',
    category: ServiceCategory.INTERIOR_CLEANING,
    description:
      'A deep interior refresh covering vacuuming, surface wipe-down, window cleaning, and odor elimination.',
    durationMinutes: 90,
    priceCents: 0,
    isActive: true,
  },
] as const

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

  for (const service of seededServices) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {
        name: service.name,
        description: service.description,
        durationMinutes: service.durationMinutes,
        priceCents: service.priceCents,
        category: service.category,
        isActive: service.isActive,
      },
      create: service,
    })
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
