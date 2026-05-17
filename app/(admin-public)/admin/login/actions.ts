'use server'

import { AuthError } from 'next-auth'

import { signIn } from '@/auth'

export type LoginFormState = {
  message: string | null
}

export async function loginAction(_state: LoginFormState, formData: FormData) {
  const email = formData.get('email')
  const password = formData.get('password')

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/admin',
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        message: 'Invalid email or password.',
      }
    }

    throw error
  }

  return { message: null }
}
