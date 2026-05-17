import Link from 'next/link'

import { appConfig } from '@/config/app'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-secondary">
      <div className="mx-auto max-w-page px-5 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <div className="text-base font-bold tracking-wide text-text">
              {appConfig.name}
            </div>
            {appConfig.contact.phone ? (
              <div className="text-sm text-text/70">{appConfig.contact.phone}</div>
            ) : null}
            {appConfig.contact.email ? (
              <div className="text-sm text-text/70">{appConfig.contact.email}</div>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            {appConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-text/80 hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/admin"
              className="pt-2 text-caption font-medium uppercase tracking-[0.18em] text-text/55 hover:text-text/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight"
            >
              {appConfig.copy.footer.adminLinkLabel}
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-accent/15 pt-6 text-xs text-text/60">
          © {year} {appConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
