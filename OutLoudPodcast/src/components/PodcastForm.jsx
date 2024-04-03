import React, { useState, useRef } from 'react'
import PodcastDetail from '../helpers/PodcastDetails';
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
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
      setRecording(false)
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      setRecordedChunks(prev => [...prev, event.data])
    }
  };

  const handlePlayback = () => {
    if (recordedChunks.length === 0) return

    const blob = new Blob(recordedChunks, { type: 'audio/webm' })
    const url = URL.createObjectURL(blob)
    setRecordedURL(url)
  };

  return (
    <div>
      <div>
        <audio ref={audioRef} controls />
      </div>
      <div>
        {!recording ? (
          <button onClick={startRecording}>Start Recording</button>
        ) : (
          <button onClick={stopRecording}>Stop Recording</button>
        )}
        {recordedChunks.length > 0 && (
          <button onClick={handlePlayback}>Playback Recorded</button>
        )}
      </div>
      {recordedURL && (
        <div>
          <audio src={recordedURL} controls />
          <Link to= '/podcast-details'>Podcast Details</Link>
        </div>
      )}
    </div>
  )
}

export default PodcastForm

