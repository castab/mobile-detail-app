import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { AdminLoginForm } from '@/components/admin/AdminLoginForm'
import { Card } from '@/components/ui/Card'

export default async function AdminLoginPage() {
  const session = await auth()

  if (session?.user?.role === 'ADMIN') {
    redirect('/admin')
  }

  return (
    <main className="min-h-screen bg-primary px-5 py-10 md:py-16">
      <div className="mx-auto max-w-xl">
        <Card className="bg-secondary/10">
          <p className="text-caption font-medium uppercase tracking-[0.2em] text-text/60">
            Admin Console
          </p>
          <h1 className="mt-3 text-h2 font-bold text-text md:text-h1">Admin Login</h1>
          <p className="mt-3 text-body text-text/70">
            Sign in with your admin credentials to manage schedules, customers, and services.
          </p>

          <div className="mt-8">
            <AdminLoginForm />
          </div>
        </Card>
      </div>
    </main>
  )
}
