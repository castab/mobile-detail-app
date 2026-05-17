import Link from 'next/link'

import { appConfig } from '@/config/app'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[color:var(--color-navy-footer)]">
      <div className="mx-auto max-w-page px-5 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <div className="text-base font-bold tracking-wide text-light">
              {appConfig.name}
            </div>
            {appConfig.contact.phone ? (
              <div className="text-sm text-taupe">{appConfig.contact.phone}</div>
            ) : null}
            {appConfig.contact.email ? (
              <div className="text-sm text-taupe">{appConfig.contact.email}</div>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            {appConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-light/90 hover:text-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blush"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-taupe/20 pt-6 text-xs text-taupe">
          © {year} {appConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
