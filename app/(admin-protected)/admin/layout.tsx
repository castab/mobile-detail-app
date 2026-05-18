import Link from 'next/link'

import { requireAdmin } from '@/lib/auth/require-admin'
import { AdminSignOutButton } from '@/components/admin/AdminSignOutButton'

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await requireAdmin()

  return (
    <div className="min-h-screen bg-primary text-text">
      <header className="border-b border-accent/15 bg-secondary/15">
        <div className="mx-auto flex max-w-page items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="text-caption font-medium uppercase tracking-[0.2em] text-text/60">
              Admin Console
            </p>
            <h1 className="mt-1 text-h3 font-bold text-text">Operations Dashboard</h1>
            <nav className="mt-3 flex flex-wrap gap-4 text-label text-text/75">
              <Link
                href="/admin"
                className="transition hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/services"
                className="transition hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight"
              >
                Services
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <p className="hidden text-label text-text/70 md:block">{session.user.email}</p>
            <AdminSignOutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-page px-5 py-10 md:py-16">{children}</main>
    </div>
  )
}
