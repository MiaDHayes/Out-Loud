import React, { useState, useRef } from 'react'
import axios from 'axios';
import CreatePodcastDetails from '../helpers/CreatePodcastDetails';
import { Link } from 'react-router-dom'

const PodcastForm = () => {
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [recordedURL, setRecordedURL] = useState(null);
  const audioRef = useRef();
  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);


  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioRef.current.srcObject = stream
      mediaStreamRef.current = stream

      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = handleDataAvailable
      mediaRecorderRef.current.start()
      setRecording(true)
    } catch (error) {
      console.error('Error accessing media devices:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
      setRecording(false)
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
    }
  }

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      setRecordedChunks(prev => [...prev, event.data])
    }
  }

  const uploadAudio = async () => {
    try {
      const blob = new Blob(recordedChunks, { type: 'audio/webm' });
      const formData = new FormData();
      formData.append('audioFile', blob);

      await axios.post('http://localhost:3005/upload-audio', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      console.log('Audio uploaded successfully');
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
  }

  const handlePlayback = () => {
    if (recordedChunks.length === 0) return

    const blob = new Blob(recordedChunks, { type: 'audio/webm' })
    const url = URL.createObjectURL(blob)
    setRecordedURL(url)
  }

  const handleDownload = () => {
    const blob = new Blob(recordedChunks, { type: 'audio/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recorded_audio.webm';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div>
      <div>
        <audio ref={audioRef} controls />
      </div>
      <div>
      <Link to= '/all-podcasts'>All Podcasts</Link>
        {!recording ? (
          <button onClick={startRecording}>Start Recording</button>
        ) : (
          <button onClick={stopRecording}>Stop Recording</button>
        )}
        {recordedChunks.length > 0 && (
          <>
            <Link to= '/podcast-details'>Continue</Link>
            <button onClick={handlePlayback}>Playback Recorded</button>
            <button onClick={handleDownload}>Download Audio</button>
            
          </>
        )}
      </div>
      {recordedURL && (
        <div>
          <audio src={recordedURL} controls />
        </div>
      )}
    </div>
  )
}

export default PodcastForm