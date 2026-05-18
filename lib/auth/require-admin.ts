import { redirect } from 'next/navigation'

import { getSessionOrReset } from '@/lib/auth/get-session'

export async function requireAdmin() {
  const session = await getSessionOrReset()

  if (!session?.user?.id || session.user.role !== 'ADMIN') {
    redirect('/admin/login')
  }

  return session
}
