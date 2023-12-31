'use client';

import { MagickFormat } from '@imagemagick/magick-wasm';
import {
  fileOpen,
  fileSave,
} from 'browser-fs-access';

import {useState} from 'react';

export default function Home() {

  const [quality, setQuality] = useState(100);
  const [format, setFormat] = useState<MagickFormat>(MagickFormat.Png);
  const [fileList, setFileList] = useState<File[]>([]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className='block w-full fixed wrapper block lg'>
        <div className='p-4'>
        <h1 className='text-xl my-1'>Image Converter</h1>
        <p className='font-medium'>Quickly convert between image formats such as jpeg, png, etc.</p>
        </div>
      </div>
      <div className="flex w-full fixed wrapper block lg">
        <div className="p-4 flex flex-col">
          <div className="flex flex-row">
            <button className="block accent" onClick={async () => {
              const fileList = await fileOpen({
                mimeTypes: ['image/*'],
                multiple: true
              });

              // Append to existing file list.
              setFileList(prev => [...prev, ...fileList])
            }}>Select Files</button>
            <button className="block" onClick={() => {setFileList([])}}>Clear Files</button>
          </div>

          <div className="p-4">
            {
              fileList.length == 0 ?
                <p>No files uploaded.</p> 
              :
                fileList.map((f:File) => {
                  return (<h1 key={f.name}>{f.name}</h1>)
                })
            }
          </div>
        </div>
      </div>
      <div className="flex w-full fixed wrapper block lg">
        <div className="p-4 flex flex-col">
          <h3>Output Format</h3>
          <select className="block fixed" name="format" defaultValue={format} onChange={(e) => {setFormat(e.target.value as MagickFormat)}}>
            <option value={MagickFormat.Png}>PNG</option>
            <option value={MagickFormat.Jpg}>JPG</option>
            <option value={MagickFormat.Tiff}>TIFF</option>
            <option value={MagickFormat.Webp}>WEBP</option>
          </select>
          <h3>Output Quality %</h3>
          <input className="block fixed" name="quality" type='number' min='1' max='100' defaultValue='100' onChange={
            (e) => {
              setQuality(Number(e.target.value));
            }}
          />
        </div>
      </div>
      <button className="block" onClick={async () => {
        const blob = await fileOpen({
          mimeTypes: ['video/*'],
        });
      }}>
        Convert and Download
      </button>
    </main>
  )
}

// const {convertVideoFormat} = await import('../../converters/ffmpeg');
// const output = await convertVideoFormat(blob, 'video/avi');
//
// await fileSave(output, {
//   fileName: 'output.avi',
//   extensions: ['.avi']
// });
