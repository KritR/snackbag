'use client';
import {useState} from 'react';
import Card from '../../components/card'

export default function Home() {

  const [value, setValue] = useState(32);
  const [customBase, setCustomBase] = useState(3);

  const updateNumber = (number: string, base: number) => {
    if (number.length == 0)
    {     
      number = '0';
    }
    if (base < 2 || base > 36)
    {
      return;
    }
    setValue(parseInt(number, base));
  }

  const updateCustomBase = (base: string) => {
    
    let numberBase = 0;
    if (base.length != 0)
    {
      numberBase = Number(base);
    }

    if (numberBase > 36)
    {
      numberBase = 36;
    }
    
    console.log("setting custom base to " + numberBase);
    setCustomBase(numberBase);
  }

  return (
    <>
      <Card>
        <h1 className='text-xl my-1'>Numeric Base Converter</h1>
        <p className='font-medium'>Convert between different number base values.</p>
      </Card>
      <Card>
        <h3>Decimal (Base 10)</h3>
        <input className="block fixed" name="decimal-val" type='string' value={value} onChange={(e) => updateNumber(e.target.value, 10)} />
        <h3>Hexadecimal (Base 16)</h3>
        <input className="block fixed" name="hex-val" type='string' value={value.toString(16)} onChange={(e) => updateNumber(e.target.value, 16)} />
        <h3>Octal (Base 8)</h3>
        <input className="block fixed" name="octal-val" type='string' value={value.toString(8)} onChange={(e) => updateNumber(e.target.value, 8)} />
        <h3>Binary (Base 2)</h3>
        <input className="block fixed" name="binary-val" type='string' value={value.toString(2)} onChange={(e) => updateNumber(e.target.value, 2)} />
        <h3>Custom Base</h3>
        {customBase < 2 ? 
          <label htmlFor='customBase' className='text-sm font-light text-red-500'>Must be between 2 - 36</label> : null}
        <input className='block fixed' name='customBase' type='number' min='2' max='36' value={customBase} onChange={(e) => updateCustomBase(e.target.value)} />
        <input className="block fixed" name="binary-val" type='string' value={customBase >= 2 ? value.toString(customBase) : 0} onChange={(e) => updateNumber(e.target.value, customBase)} />
      </Card>
    </>
  )
}
