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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Hello</div>
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
