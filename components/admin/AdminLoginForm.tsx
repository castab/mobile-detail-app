'use client'

import { useActionState } from 'react'

import type { LoginFormState } from '@/app/(admin-public)/admin/login/actions'
import { loginAction } from '@/app/(admin-public)/admin/login/actions'
import { Button } from '@/components/ui/Button'

const initialLoginFormState: LoginFormState = {
  message: null,
}

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialLoginFormState)

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="email" className="text-label font-medium text-text">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="min-h-12 w-full rounded-md border border-accent/25 bg-primary px-4 py-3 text-body text-text shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-label font-medium text-text">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="min-h-12 w-full rounded-md border border-accent/25 bg-primary px-4 py-3 text-body text-text shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight"
        />
      </div>

      {state.message ? (
        <p className="rounded-md border border-[color:var(--color-danger)]/25 bg-[color:var(--color-danger)]/10 px-4 py-3 text-label text-[color:var(--color-danger)]">
          {state.message}
        </p>
      ) : null}

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  )
}
