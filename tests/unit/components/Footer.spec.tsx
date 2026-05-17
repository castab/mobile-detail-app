import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Footer } from '@/components/layout/Footer'

describe('Footer', () => {
  it('renders a discreet admin console link', () => {
    render(<Footer />)

    expect(screen.getByRole('link', { name: 'Admin Console' })).toHaveAttribute('href', '/admin')
  })
})
