import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Card } from '@/components/ui/Card'

describe('Card', () => {
  it('renders its children', () => {
    render(
      <Card>
        <div>Child</div>
      </Card>
    )
    expect(screen.getByText('Child')).toBeInTheDocument()
  })

  it('accepts and applies a custom className', () => {
    render(<Card className="test-class">Child</Card>)
    const el = screen.getByText('Child').closest('div')
    expect(el?.className).toContain('test-class')
  })
})
