'use client';
import {useState} from 'react';

export default function Home() {

  const [value, setValue] = useState(32);
  const [customBase, setCustomBase] = useState(3);

  const updateNumber = (number: string, base: number) => {
    if (number.length == 0)
    {     
      number = '0';
    }
    setValue(parseInt(number, base));
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="max-w-screen-md w-full">
        <div className='block w-full fixed wrapper block lg'>
          <div className='p-4'>
          <h1 className='text-xl my-1'>Numeric Base Converter</h1>
          <p className='font-medium'>Convert between different number base values.</p>
          </div>
        </div>
        <div className="flex w-full fixed wrapper block lg">
          <div className="p-4 flex flex-col">
            <h3>Decimal (Base 10)</h3>
            <input className="block fixed" name="decimal-val" type='string' value={value} onChange={(e) => updateNumber(e.target.value, 10)} />
            <h3>Hexadecimal (Base 16)</h3>
            <input className="block fixed" name="hex-val" type='string' value={value.toString(16)} onChange={(e) => updateNumber(e.target.value, 16)} />
            <h3>Octal (Base 8)</h3>
            <input className="block fixed" name="octal-val" type='string' value={value.toString(8)} onChange={(e) => updateNumber(e.target.value, 8)} />
            <h3>Binary (Base 2)</h3>
            <input className="block fixed" name="binary-val" type='string' value={value.toString(2)} onChange={(e) => updateNumber(e.target.value, 2)} />
            <h3>Custom Base</h3>
            <input className='block fixed' name='customBase' type='number' value={customBase} onChange={(e) => setCustomBase(Number(e.target.value))} />
            <input className="block fixed" name="binary-val" type='string' value={value.toString(customBase)} onChange={(e) => updateNumber(e.target.value, customBase)} />
          </div>
        </div>
      </div>
    </main>
  )
}
