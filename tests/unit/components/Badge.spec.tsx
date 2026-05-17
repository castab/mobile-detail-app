import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Badge } from '@/components/ui/Badge'

describe('Badge', () => {
  it('renders with correct text content', () => {
    render(<Badge>Exterior</Badge>)
    expect(screen.getByText('Exterior')).toBeInTheDocument()
  })

  it('applies correct classes for each variant', () => {
    const { rerender } = render(<Badge variant="default">A</Badge>)
    expect(screen.getByText('A').className).toContain('text-accent')

    rerender(<Badge variant="success">A</Badge>)
    expect(screen.getByText('A').className).toContain('text-highlight')

    rerender(<Badge variant="warning">A</Badge>)
    expect(screen.getByText('A').className).toContain('text-text')

    rerender(<Badge variant="danger">A</Badge>)
    expect(screen.getByText('A').className).toContain('var(--color-danger)')
  })
})
