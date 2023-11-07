'use client';

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
        const {testMagick} = await import('./magick');
        testMagick();
      }}>My name is bob</div>
    </main>
  )
}
