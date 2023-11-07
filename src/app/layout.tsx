import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Snackbag',
  description: 'Browser native utilities for files and data.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/blocks.css/dist/blocks.min.css" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
