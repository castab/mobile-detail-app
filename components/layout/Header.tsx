import Link from 'next/link'

import { appConfig } from '@/config/app'
import { Nav } from '@/components/layout/Nav'

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-accent/15 bg-primary/95 backdrop-blur">
      <div className="mx-auto flex max-w-page items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="text-base font-bold tracking-wide text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight"
        >
          {appConfig.name}
        </Link>
        <Nav items={appConfig.nav} />
      </div>
    </header>
  )
}
