import { redirect } from 'next/navigation'

import { auth } from '@/auth'

function isInvalidSessionSecretError(error: unknown) {
  return error instanceof Error && error.message.includes('no matching decryption secret')
}

export async function getSessionOrReset() {
  try {
    return await auth()
  } catch (error) {
    if (isInvalidSessionSecretError(error)) {
      redirect('/admin/login/reset-session')
    }

    throw error
  }
}
