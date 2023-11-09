'use client';
import {useState} from 'react';
import Card from '../../components/card'

const useRandomUUID = () => {
  const [uuid, setUUID] =  useState(crypto.randomUUID());
  const refreshUUID = () => setUUID(crypto.randomUUID());
  return {uuid, refreshUUID};
}

const formatAsWin32 = (uuid: string) => {
  const guid = uuid.replaceAll('-', '');

  return `{0x${guid.substring(0, 8)}, 0x${guid.substring(8,12)}, 0x${guid.substring(12,16)}, {0x${guid.substring(16,18)}, 0x${guid.substring(18,20)}, 0x${guid.substring(20,22)}, 0x${guid.substring(22,24)}, 0x${guid.substring(24,26)}, 0x${guid.substring(26,28)}, 0x${guid.substring(28,30)}, 0x${guid.substring(30,32)}}}`
}

export default function Index() {

  const {uuid, refreshUUID} = useRandomUUID();

  return (
    <>
      <Card>
        <h1 className='text-xl my-1'>Random UUID Generator</h1>
        <p className='font-medium'>Securely generate random UUID for your applications.</p>
      </Card>
      <Card>
        <h3>Plaintext</h3>
        <input className='block fixed' onChange={() => {}} value={uuid}/>
        <h3>Win32 GUID</h3>
        <input className='block fixed' onChange={() => {}} value={formatAsWin32(uuid)}/>
      </Card>
      <button className='block' onClick={() => refreshUUID()}>Generate New</button>
    </>
  )
}
