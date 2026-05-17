import { signOut } from '@/auth'
import { Button } from '@/components/ui/Button'

export function AdminSignOutButton() {
  return (
    <form
      action={async () => {
        'use server'

        await signOut({ redirectTo: '/admin/login' })
      }}
    >
      <Button type="submit" variant="ghost" size="sm">
        Sign Out
      </Button>
    </form>
  )
}
