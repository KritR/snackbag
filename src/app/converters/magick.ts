// @ts-ignore
import * as bytes from '@imagemagick/magick-wasm/magick.wasm';

import {
    initializeImageMagick,
    ImageMagick,
    Magick,
    MagickFormat,
    Quantum,
    IMagickImage
} from '@imagemagick/magick-wasm';

const testMagick = () => {
  initializeImageMagick(bytes.buffer).then(() => {
    console.log(Magick.imageMagickVersion);
    console.log('Delegates:', Magick.delegates);
    console.log('Features:', Magick.features);
    console.log('Quantum:', Quantum.depth);

    console.log('');
  });
}


const convertImageFormat = async (imageData: Blob, type: MagickFormat, quality: number) => {
  await initializeImageMagick(bytes.buffer);
  const arrayBuffer = await imageData.arrayBuffer();
  const uintArr = new Uint8Array(arrayBuffer);

  return new Promise<Blob>((resolve, _reject) => {
    ImageMagick.read(uintArr, (image: IMagickImage) => {
      image.quality = quality
      image.write(type, data => {
        resolve(new Blob([data]));
      });
    });
  });
}

export {testMagick, convertImageFormat};
