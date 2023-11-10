import Card from './components/card'
import Link from 'next/link';

export default function Home() {

  return (
    <>
      <Card>
          <h1 className='text-xl my-1'>Snackbag</h1>
          <p className='font-medium'>A set of browser native tools to manipulate files and data.</p>
      </Card>
      <Card>
        <h2 className='text-xl my-2'>Tool List</h2>
        <h3 className='text-lg my-1'>Images</h3>
        <ul>
          <li><Link href='/image/convert' className='font-medium cursor-pointer blue-sky hover:underline'>Image Converter</Link></li>
        </ul>
        {/*
          TODO: uncomment when video conversion is working
        <h3 className='text-lg my-1'>Videos</h3>
        <ul>
          <li><Link href='/video/convert' className='font-medium cursor-pointer hover:underline'>Video Converter</Link></li>
        </ul>
        */}
        <h3 className='text-lg my-1'>Math</h3>
        <ul>
          <li><Link href='/math/base-converter' className='font-medium cursor-pointer hover:underline'>Base Converter</Link></li>
        </ul>
        <h3 className='text-lg my-1'>Crypto</h3>
        <ul>
          <li><Link href='/crypto/uuid-generator' className='font-medium cursor-pointer hover:underline'>UUID Generator</Link></li>
          <li><Link href='/crypto/data-hasher' className='font-medium cursor-pointer hover:underline'>Data Hasher</Link></li>
        </ul>
        <h3 className='text-lg my-1'>Device</h3>
        <ul>
          <li><Link href='/device/camera-record' className='font-medium cursor-pointer hover:underline'>Record Camera</Link></li>
          <li><Link href='/device/mic-record' className='font-medium cursor-pointer hover:underline'>Record Microphone</Link></li>
          <li><Link href='/device/screen-record' className='font-medium cursor-pointer hover:underline'>Record Screen</Link></li>
        </ul>
      </Card>
    </>
  )
}
