import { NextResponse } from 'next/server'

const authCookieNames = [
  'authjs.session-token',
  '__Secure-authjs.session-token',
  'authjs.callback-url',
  '__Secure-authjs.callback-url',
  'authjs.csrf-token',
  '__Host-authjs.csrf-token',
]

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL('/admin/login', request.url))

  for (const cookieName of authCookieNames) {
    response.cookies.delete(cookieName)
  }

  return response
}
