import { describe, expect, it } from 'vitest'

import { formatPriceForInput, formatPriceFromCents, serviceCategories } from '@/lib/services'

describe('services helpers', () => {
  it('formats integer cents as currency', () => {
    expect(formatPriceFromCents(1250)).toBe('$12.50')
  })

  it('formats integer cents for editable form inputs', () => {
    expect(formatPriceForInput(1250)).toBe('12.50')
  })

  it('exposes the supported service categories', () => {
    expect(serviceCategories).toEqual(['EXTERIOR_WASH', 'INTERIOR_CLEANING'])
  })
})
