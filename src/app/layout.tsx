import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import Link from 'next/link';
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
        <Script src="https://kritr-umami.fly.dev/script.js" strategy='lazyOnload' data-website-id="5740d187-6a84-4c20-944c-d0fce9aa73c3"/>
      </head>
      <body className={inter.className}>
        <div className='flex flex-col items-center p-8 md:p-12 lg:p-24'>
          <div className='w-full max-w-screen-md flex flex-col lg:flex-row'>
            <Link href='/'><button className='block'>Home</button></Link>
            <main className="min-h-screen ">
              <div className=" w-full">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
