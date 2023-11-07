import {FFmpeg } from '@ffmpeg/ffmpeg';

const convertVideoFormat = async (videoBlob: Blob, type: string) => {
  const arrayBuffer = await videoBlob.arrayBuffer();
  const uintArr = new Uint8Array(arrayBuffer);

  const ffmpeg = new FFmpeg();
  try {
    await ffmpeg.load({
      coreURL: './ffmpeg-core.js',
      wasmURL: 'ffmpeg-core.wasm'
    });
  } catch (e)
  {
    console.log(e);
    throw e;
  }
  await ffmpeg.writeFile("video.mp4", uintArr);
  await ffmpeg.exec(["-i", "video.mp4", "video.avi"]);
  const data = await ffmpeg.readFile("video.avi");
  return new Blob([data],{type: 'video/avi'})
}

export {convertVideoFormat};
