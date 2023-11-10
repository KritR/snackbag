
'use client';

import { useState, useRef, useEffect } from 'react';
import Card from '../../components/card';

export default function CameraRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [videoURL, setVideoURL] = useState('');
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Used to ensure video spot gets set to blank.
  useEffect(() => {
    if (videoRef.current)
    {
      videoRef.current.load();
    }
  }, [videoURL]);

  const startRecording = async () => {
    if (isRecording) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current!.srcObject = stream;
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = handleDataAvailable;

      // Ensure we cleanup streams and release camera capture on stop.
      mediaRecorder.current.onstop = () => {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        if (videoRef.current) {
          videoRef.current.srcObject = null;
          videoRef.current.removeAttribute('src')
        }
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing the camera', error);
      alert("This utility will not work without camera access.");
    }
  };

  const stopRecording = () => {
    if (!isRecording) return;

    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
    }
    setIsRecording(false);
  };

  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data.size > 0) {
      setVideoURL(URL.createObjectURL(event.data));
    }
  };

  const clearRecording = () => {
    setVideoURL('');
  };

  return (
    <>
      <Card>
        <h1 className='text-xl my-1'>Camera Recorder</h1>
        <p className='font-medium'>Record video using your camera.</p>
      </Card>
      <Card>
        <button className='block accent disabled:opacity-75' onClick={startRecording} disabled={isRecording}>Start Recording</button>
        <button className='block disabled:opacity-75' onClick={stopRecording} disabled={!isRecording}>Stop Recording</button>
      </Card>
      <Card>
        {(isRecording || !videoURL) ? (
          <video id='moo' ref={videoRef} autoPlay muted className="w-full bg-red-100"></video>
        ) : (
          videoURL && <video src={videoURL} controls className="w-full"></video>
        )}
        <button className='block disabled:opacity-75' onClick={clearRecording} disabled={(!videoURL) || isRecording}>Clear</button>
      </Card>
      {videoURL && !isRecording && 
        <div className='flex'>
          <a className='inline' href={videoURL} download={`camera-recording-${new Date().toISOString()}.webm`}>
            <button className='block'>Download</button>
          </a>
        </div>
      }
    </>
  );
}
