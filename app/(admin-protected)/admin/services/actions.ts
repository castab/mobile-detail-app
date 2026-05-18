'use server'

import type { ServiceCategory } from '@prisma/client'
import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { requireAdmin } from '@/lib/auth/require-admin'
import { prisma } from '@/lib/prisma'
import { serviceCategories } from '@/lib/services'

export type ServiceFormState = {
  message?: string
}

function slugifyName(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function parsePriceToCents(value: string) {
  if (!/^\d+(?:\.\d{1,2})?$/.test(value)) {
    return null
  }

  const [dollars, cents = ''] = value.split('.')
  return Number(dollars) * 100 + Number((cents + '00').slice(0, 2))
}

function isServiceCategory(value: string): value is ServiceCategory {
  return serviceCategories.includes(value as ServiceCategory)
}

async function ensureUniqueSlug(slug: string, serviceId?: string) {
  const existing = await prisma.service.findUnique({
    where: { slug },
    select: { id: true },
  })

  return !existing || existing.id === serviceId
}

function revalidateServiceViews() {
  revalidatePath('/')
  revalidatePath('/services')
  revalidatePath('/book')
  revalidatePath('/admin')
  revalidatePath('/admin/services')
}

function parseServiceFormData(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim()
  const description = String(formData.get('description') ?? '').trim()
  const durationValue = String(formData.get('durationMinutes') ?? '').trim()
  const priceValue = String(formData.get('price') ?? '').trim()
  const categoryValue = String(formData.get('category') ?? '').trim()
  const isActive = formData.get('isActive') === 'on'

  if (name.length < 2) {
    return { error: 'Service name must be at least 2 characters long.' }
  }

  if (description.length < 10) {
    return { error: 'Service description must be at least 10 characters long.' }
  }

  const slug = slugifyName(name)

  if (!slug) {
    return { error: 'Service name must contain letters or numbers.' }
  }

  const durationMinutes = Number.parseInt(durationValue, 10)

  if (!Number.isInteger(durationMinutes) || durationMinutes <= 0) {
    return { error: 'Duration must be a whole number of minutes.' }
  }

  const priceCents = parsePriceToCents(priceValue)

  if (priceCents === null || priceCents < 0) {
    return { error: 'Price must be a valid amount with up to two decimals.' }
  }

  if (!isServiceCategory(categoryValue)) {
    return { error: 'Please choose a valid category.' }
  }

  return {
    data: {
      name,
      description,
      durationMinutes,
      priceCents,
      category: categoryValue,
      isActive,
    },
    slug,
  }
}

export async function createServiceAction(_state: ServiceFormState, formData: FormData) {
  await requireAdmin()

  const parsed = parseServiceFormData(formData)

  if ('error' in parsed) {
    return { message: parsed.error }
  }

  const slugIsUnique = await ensureUniqueSlug(parsed.slug)

  if (!slugIsUnique) {
    return { message: 'A service with that name already exists.' }
  }

  try {
    await prisma.service.create({
      data: {
        ...parsed.data,
        slug: parsed.slug,
      },
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { message: 'Unable to create the service right now.' }
    }

    throw error
  }

  revalidateServiceViews()
  redirect('/admin/services')
}

export async function updateServiceAction(_state: ServiceFormState, formData: FormData) {
  await requireAdmin()

  const serviceId = String(formData.get('serviceId') ?? '').trim()

  if (!serviceId) {
    return { message: 'Missing service identifier.' }
  }

  const parsed = parseServiceFormData(formData)

  if ('error' in parsed) {
    return { message: parsed.error }
  }

  const existingService = await prisma.service.findUnique({
    where: { id: serviceId },
    select: { slug: true },
  })

  if (!existingService) {
    return { message: 'Unable to find that service.' }
  }

  try {
    await prisma.service.update({
      where: { id: serviceId },
      data: {
        ...parsed.data,
        slug: existingService.slug,
      },
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { message: 'Unable to update the service right now.' }
    }

    throw error
  }

  revalidateServiceViews()
  redirect('/admin/services')
}
