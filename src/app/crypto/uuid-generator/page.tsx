'use client';
import {useState} from 'react';
import Card from '../../components/card'

const useRandomUUID = () => {
  const [uuid, setUUID] =  useState(self.crypto.randomUUID());
  const refreshUUID = () => setUUID(self.crypto.randomUUID());
  return {uuid, refreshUUID};
}

const formatAsWin32 = (uuid: string) => {
  const guid = uuid.replaceAll('-', '');

  return `{0x${guid.substring(0, 8)}, 0x${guid.substring(8,12)}, 0x${guid.substring(12,16)}, {0x${guid.substring(16,18)}, 0x${guid.substring(18,20)}, 0x${guid.substring(20,22)}, 0x${guid.substring(22,24)}, 0x${guid.substring(24,26)}, 0x${guid.substring(26,28)}, 0x${guid.substring(28,30)}, 0x${guid.substring(30,32)}}}`
}

export default function Index() {

  const {uuid, refreshUUID} = useRandomUUID();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="max-w-screen-md w-full">
        <Card>
          <h1 className='text-xl my-1'>Random UUID Generator</h1>
          <p className='font-medium'>Securely generate random UUID for your applications.</p>
        </Card>
        <Card>
          <h3>Plaintext</h3>
          <input className='block fixed' value={uuid}/>
          <h3>Win32 GUID</h3>
          <input className='block fixed' value={formatAsWin32(uuid)}/>
        </Card>
        <button className='block' onClick={() => refreshUUID()}>Generate New</button>
      </div>
    </main>
  )
}
