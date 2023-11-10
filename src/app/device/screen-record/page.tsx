'use client';

import { useState, useRef } from 'react';
import Card from '../../components/card';

export default function ScreenRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [videoURL, setVideoURL] = useState('');
  const [includeAudio, setIncludeAudio] = useState(false);
  const [includeMic, setIncludeMic] = useState(false);


  const mediaRecorder = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    if (isRecording) return;

    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: includeAudio, // This will include the system audio if the checkbox is checked
      });

      // Now get the user microphone if needed
      let micStream : MediaStream | null = null;
      if (includeMic) {
        micStream = await navigator.mediaDevices.getUserMedia({
          audio: true
        });
      }

      // If we have a mic stream, we'll need to combine the tracks
      if (micStream) {
        screenStream.addTrack(micStream.getTracks()[0]);
      }

      mediaRecorder.current = new MediaRecorder(screenStream);
      mediaRecorder.current.ondataavailable = handleDataAvailable;

      // Ensure we cleanup streams and release display media capture.
      mediaRecorder.current.onstop = () => {
        screenStream.getTracks().forEach(track => track.stop());
        if (micStream) {
          micStream.getTracks().forEach((track) => track.stop());
        }
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing display media', error);
      alert("This utility will not work without screen capture access.");
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
    if (mediaRecorder.current) {
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <>
      <Card>
        <h1 className='text-xl my-1'>Screen Recorder</h1>
        <p className='font-medium'>Record your screen for tutorials, presentations, and more.</p>
      </Card>
      <Card>
        <label>
          <input
            className='mx-2'
            type="checkbox"
            checked={includeMic}
            onChange={(e) => setIncludeMic(e.target.checked)}
          />
          Include Microphone
        </label>

        <label>
          <input
            className='mx-2'
            type="checkbox"
            checked={includeAudio}
            onChange={(e) => setIncludeAudio(e.target.checked)}
          />
          Include System Audio <span className='text-sm font-light text-blue-400'>(only works on Chrome & Edge on Windows)</span>
        </label>
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
      {(videoURL && !isRecording) && 
      <>
        <Card>
          <video controls={true} src={videoURL} />
          <button className='block' onClick={clearRecording} disabled={!videoURL}>Clear</button>
        </Card>
        <div className='flex'>
          <a className='inline' href={videoURL} download={`screen-recording-${new Date().toISOString()}.webm`}>
            <div>
              <button className='block'>Download</button>
            </div>
          </a>
        </div>
      </>
      }
    </>
  );
}
