'use client';

import Link from 'next/link';

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className='block w-full fixed wrapper block lg'>
        <div className='p-4'>
          <h1 className='text-xl my-1'>Snackbag</h1>
          <p className='font-medium'>A set of browser native tools to manipulate files and data.</p>
        </div>
      </div>
      <div className='block w-full fixed wrapper block lg'>
        <div className='p-4'>
          <h2 className='text-xl my-2'>Tool List</h2>
          <h3 className='text-lg my-1'>Images</h3>
          <ul>
            <li><Link href='/image/convert' className='font-medium cursor-pointer blue-sky hover:underline'>Image Converter</Link></li>
          </ul>
          <h3 className='text-lg my-1'>Videos</h3>
          <ul>
            <li><Link href='/video/convert' className='font-medium cursor-pointer hover:underline'>Video Converter</Link></li>
          </ul>
          <h3 className='text-lg my-1'>Math</h3>
          <ul>
            <li><Link href='/math/base-converter' className='font-medium cursor-pointer hover:underline'>Base Converter</Link></li>
          </ul>
        </div>
      </div>
    </main>
  )
}
