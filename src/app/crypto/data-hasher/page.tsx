'use client';

import { useState } from 'react';
import Card from '../../components/card';

import md5 from 'md5';

const algorithms = [
  { name: 'SHA-1', slug: 'SHA-1' },
  { name: 'SHA-256', slug: 'SHA-256' },
  { name: 'SHA-384', slug: 'SHA-384' },
  { name: 'SHA-512', slug: 'SHA-512' },
  { name: 'MD5', slug: 'MD5'}
];

export default function HashingPage() {
  const [inputType, setInputType] = useState('text');
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [hashAlgorithm, setHashAlgorithm] = useState('SHA-256');
  const [hash, setHash] = useState('');

  const handleFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files)
    {
      setFile(event.target.files[0]);
    }
  };

  const handleTextChange = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleAlgorithmChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setHashAlgorithm(event.target.value);
  };

  const getHash = async (buffer: Uint8Array) => {
    if (hashAlgorithm == 'MD5')
    {
      setHash(md5(buffer));
    }
    else
    {    
      const hashBuffer = await crypto.subtle.digest(hashAlgorithm, buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((bytes) => bytes.toString(16).padStart(2, '0')).join('');
      setHash(hashHex);
    }
  };

  const handleHash = async () => {
    if (inputType === 'text') {
      const encoder = new TextEncoder();
      const encodedData = encoder.encode(text);
      getHash(encodedData);
    } else if (file) {
      getHash(new Uint8Array(await file.arrayBuffer()));
    }
  };

  const isContentAvailable = () => {
    return (inputType == 'text' && text != '') || (inputType == 'file' && file);
  }

  return (
    <>
      <Card>
        <h1 className='text-xl my-1'>Hash Generator</h1>
        <p className='font-medium'>Generate hashes from text or files using various algorithms.</p>
      </Card>
      <Card>
        <h2>Select Hashing Algorithm</h2>
        <select className='block fixed' onChange={handleAlgorithmChange} value={hashAlgorithm}>
          {algorithms.map((algo) => (
            <option key={algo.slug} value={algo.slug}>
              {algo.name}
            </option>
          ))}
        </select>
        <h2>Input Data</h2>
        <div className='wrapper block fixed'>
          <div className='p-2'>
          <label>
            <input
              type="radio"
              name="inputType"
              value="text"
              checked={inputType === 'text'}
              onChange={() => setInputType('text')}
            />
            Text
          </label>
          <label className='mx-3'>
            <input
              type="radio"
              name="inputType"
              value="file"
              checked={inputType === 'file'}
              onChange={() => setInputType('file')}
            />
            File
          </label>
          </div>
        </div>
        {inputType === 'text' ? (
          <textarea className='block fixed' onChange={handleTextChange} value={text} />
        ) : (
          <input type="file" className='block fixed' onChange={handleFileChange} />
        )}
        <button className='block disabled:opacity-75' disabled={!isContentAvailable()} onClick={handleHash}>Generate Hash</button>
      </Card>
      {hash && (
        <Card>
          <h3>Hash:</h3>
          <input className='block fixed' onChange={() => {}} value={hash} />
        </Card>
      )}
    </>
  );
}
