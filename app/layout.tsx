import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { appConfig } from '@/config/app'

import '../styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: appConfig.name,
    template: `%s | ${appConfig.name}`,
  },
  description: appConfig.tagline,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-primary text-text font-sans">
        {children}
      </body>
    </html>
  )
}
