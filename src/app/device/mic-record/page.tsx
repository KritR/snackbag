'use client';

import { useState, useRef } from 'react';
import Card from '../../components/card';

export default function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioRef = useRef(null);

  const startRecording = async () => {
    if (isRecording) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = handleDataAvailable;

      // Ensure we cleanup streams and release audio capture.
      mediaRecorder.current.onstop = () => {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing the microphone', error);
      alert("This utility will not work without microphone access.")
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
      setAudioURL(URL.createObjectURL(event.data));
    }
  };

  const clearRecording = () => {
    setAudioURL('');
    setIsPlaying(false);
  };

  return (
    <>
      <Card>
        <h1 className='text-xl my-1'>Audio Recorder</h1>
        <p className='font-medium'>Record audio using your microphone.</p>
      </Card>
      <Card>
        <button className='block accent disabled:opacity-75' onClick={startRecording} disabled={isRecording}>Start Recording</button>
        <button className='block disabled:opacity-75' onClick={stopRecording} disabled={!isRecording}>Stop Recording</button>
      </Card>
      {isRecording &&
        <Card>
          <h2>Recording in progress...</h2>
        </Card>
      }
      {(audioURL && !isRecording) && 
      <>
        <Card>
          <audio controls={true} ref={audioRef} src={audioURL} onEnded={() => setIsPlaying(false)} />
          <button className='block' onClick={clearRecording} disabled={!audioURL}>Clear</button>
        </Card>
        <a href={audioURL} download={`recording-${new Date().toISOString()}.mp3`}>
          <button className='block'>Download</button>
        </a>
      </>

      }
      
    </>
  );
}
