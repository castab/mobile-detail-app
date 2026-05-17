import '@testing-library/jest-dom'

import React from 'react'
import { vi } from 'vitest'

// Keep unit tests simple and framework-agnostic: treat Next's <Link> as <a>.
vi.mock('next/link', () => {
  return {
    default: ({
      href,
      children,
      ...props
    }: {
      href: string
      children: React.ReactNode
    }) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
  }
})
