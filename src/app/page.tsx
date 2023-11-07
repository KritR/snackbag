'use client';

import { MagickFormat } from '@imagemagick/magick-wasm';
import {
  fileOpen,
  directoryOpen,
  fileSave,
  supported,
} from 'browser-fs-access';

export default function Home() {


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
            <button className="block accent">Select Files</button>
            <button className="block">Clear Files</button>
          </div>

          <div className="p-4">
            <p>No files uploaded.</p>
          </div>
        </div>
      </div>
      <div className="flex w-full fixed wrapper block lg">
        <div className="p-4 flex flex-col">
          <h3>Output Format</h3>
          <select className="block fixed" name="cars" id="cars">
            <option value="volvo">PNG</option>
            <option value="saab">JPG</option>
            <option value="mercedes">TIFF</option>
            <option value="audi">WEBP</option>
          </select>
          <h3>Output Quality %</h3>
          <input type='number' min='1' max='100' className="block fixed" />
        </div>
      </div>
      <div className="block">
        Convert and Download
      </div>
      <div onClick={async () => {
        const blob = await fileOpen({
          mimeTypes: ['image/*'],
        });
        const {convertImageFormat} = await import('./magick');
        const output = await convertImageFormat(blob, MagickFormat.Jpeg);

        await fileSave(output, {
          fileName: 'output.jpg',
          extensions: ['.jpg']
        });
        
      }}>My name is bob</div>
      <div onClick={async () => {

        const blob = await fileOpen({
          mimeTypes: ['video/*'],
        });

        const {convertVideoFormat} = await import('./ffmpeg');
        const output = await convertVideoFormat(blob, 'video/avi');

        await fileSave(output, {
          fileName: 'output.avi',
          extensions: ['.avi']
        });
        
      }}>My name is bob video</div>
    </main>
  )
}
