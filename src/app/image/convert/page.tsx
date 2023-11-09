'use client';
import { MagickFormat } from '@imagemagick/magick-wasm';
import {
  fileOpen,
  fileSave,
} from 'browser-fs-access';

import Card from '../../components/card'

import {useState} from 'react';

export default function Home() {

  const [quality, setQuality] = useState(100);
  const [format, setFormat] = useState<MagickFormat>(MagickFormat.Png);
  const [fileList, setFileList] = useState<File[]>([]);


  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Card>
        <h1 className='text-xl my-1'>Image Converter</h1>
        <p className='font-medium'>Quickly convert between image formats such as jpeg, png, etc.</p>
      </Card>
      <Card>
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
      </Card>
      <Card>
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
      </Card>
      <button className="block" onClick={async () => {
        const {convertImageFormat} = await import('../../converters/magick');
        fileList.forEach((f) => {
          const output = convertImageFormat(f, format, quality);
          fileSave(output, {
            fileName: f.name.replace(/\.[^/.]+$/, ".") + format,
            extensions: ['.' + format]
          });
        })
      }}>
        Convert and Download
      </button>
    </main>
  )
}
