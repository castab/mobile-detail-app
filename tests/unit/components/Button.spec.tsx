import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('renders a <button> by default', () => {
    render(<Button>Click</Button>)
    expect(screen.getByRole('button', { name: 'Click' }).tagName).toBe('BUTTON')
  })

  it('renders an <a> when href is provided', () => {
    render(
      <Button href="/book" variant="ghost">
        Book
      </Button>
    )
    const link = screen.getByRole('link', { name: 'Book' })
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', '/book')
  })

  it('applies correct classes for each variant', () => {
    const { rerender } = render(<Button variant="primary">A</Button>)
    expect(screen.getByRole('button', { name: 'A' }).className).toContain('bg-highlight')

    rerender(<Button variant="ghost">A</Button>)
    expect(screen.getByRole('button', { name: 'A' }).className).toContain('border-accent')

    rerender(<Button variant="danger">A</Button>)
    expect(screen.getByRole('button', { name: 'A' }).className).toContain('var(--color-danger)')
  })

  it('applies correct classes for each size', () => {
    const { rerender } = render(<Button size="default">A</Button>)
    expect(screen.getByRole('button', { name: 'A' }).className).toContain('px-7')

    rerender(<Button size="sm">A</Button>)
    expect(screen.getByRole('button', { name: 'A' }).className).toContain('px-5')
  })

  it('is keyboard focusable', async () => {
    const user = userEvent.setup()
    render(
      <>
        <button type="button">Before</button>
        <Button>Target</Button>
      </>
    )

    await user.tab()
    await user.tab()
    expect(screen.getByRole('button', { name: 'Target' })).toHaveFocus()
  })

  it('does not fire onClick when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>
    )

    await user.click(screen.getByRole('button', { name: 'Disabled' }))
    expect(onClick).not.toHaveBeenCalled()
  })
})
