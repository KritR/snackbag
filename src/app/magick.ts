// @ts-ignore
import * as bytes from '@imagemagick/magick-wasm/magick.wasm';

import {
    initializeImageMagick,
    ImageMagick,
    Magick,
    MagickFormat,
    Quantum,
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

export {testMagick};
