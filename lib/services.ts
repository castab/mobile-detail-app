import type { ServiceCategory } from '@prisma/client'

import { prisma } from '@/lib/prisma'

export const serviceCategories = ['EXTERIOR_WASH', 'INTERIOR_CLEANING'] as const satisfies readonly ServiceCategory[]

export type ServiceRecord = {
  id: string
  slug: string
  name: string
  description: string
  durationMinutes: number
  priceCents: number
  category: ServiceCategory
  isActive: boolean
}

const serviceSelect = {
  id: true,
  slug: true,
  name: true,
  description: true,
  durationMinutes: true,
  priceCents: true,
  category: true,
  isActive: true,
} as const

export async function getPublicServices() {
  return prisma.service.findMany({
    where: { isActive: true },
    orderBy: [{ category: 'asc' }, { name: 'asc' }],
    select: serviceSelect,
  })
}

export async function getAdminServices() {
  return prisma.service.findMany({
    orderBy: [{ isActive: 'desc' }, { category: 'asc' }, { name: 'asc' }],
    select: serviceSelect,
  })
}

export async function getAdminServiceById(id: string) {
  return prisma.service.findUnique({
    where: { id },
    select: serviceSelect,
  })
}

export function formatPriceFromCents(priceCents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(priceCents / 100)
}

export function formatPriceForInput(priceCents: number) {
  return (priceCents / 100).toFixed(2)
}
