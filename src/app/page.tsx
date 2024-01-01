import Card from './components/card'
import Link from 'next/link';
import Image from 'next/image'

export default function Home() {

  interface LinkItemProps
  {
    href: string;
    title: string;
  };

  const LinkItem = (props: LinkItemProps) => {
    return (
      <div className='flex'>
      <Link href={props.href} className='font-medium cursor-pointer hover:underline block'>{props.title}</Link>
      </div>
    );
  };

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
          <li><LinkItem href='/image/convert' title='Image Converter'/></li>
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
          <li><LinkItem href='/math/base-converter' title='Base Converter'/></li>
        </ul>
        <h3 className='text-lg my-1'>Crypto</h3>
        <ul>
          <li><LinkItem href='/crypto/uuid-generator' title='UUID Generator' /></li>
          <li><LinkItem href='/crypto/data-hasher' title='Data Hasher' /></li>
        </ul>
        <h3 className='text-lg my-1'>Device</h3>
        <ul>
          <li><LinkItem href='/device/camera-record' title='Record Camera'/></li>
          <li><LinkItem href='/device/mic-record' title='Record Microphone'/></li>
          <li><LinkItem href='/device/screen-record' title='Record Screen'/></li>
        </ul>
      </Card>
      <div className='flex flex-row'>
        <div className='block'>
          <a href='https://github.com/kritr/snackbag'>
            <div className='flex flex-row p-1 items-center'>
              <Image src='/github-mark.svg' alt='Github Logo' width='20' height='10'/>
              <span className='mx-2'>GitHub</span>
            </div>
          </a>
        </div>
        <div className='block align-middle'>
          <a href='mailto:sleeves.era_0r@icloud.com?subject=Snackbag Issue'>
            <div className='flex p-1 items-center'>
              <span className=''>Report an Issue</span>
            </div>
          </a>
        </div>
      </div>
    </>
  )
}
