import { useState } from "react"
import axios from 'axios'



function CreatePodcastDetails({ onSubmit }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const[podcastFile, setPodcastFile] = useState(null)
    const [coverPhoto, setCoverPhoto] = useState(null)


    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const formData = new FormData()
            formData.append('title', title)
            formData.append('description', description)
            formData.append('podcastFile', podcastFile)
            formData.append('coverPhoto', coverPhoto)
            
            console.log('Selected file:', podcastFile)

            await axios.post('http://localhost:3005/podcast', formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            })
            setTitle('')
            setDescription('')
            setPodcastFile(null)
            setCoverPhoto(null)

            console.log('Response from server:', error.response.data)
            onSubmit()
        } catch (error) {
            console.error('Error submitting form:', error.response.data)
        }
    }

    const handlePodcastFileChange = (event) => {
        const file = event.target.files[0]
        setPodcastFile(file)
    }

    const handleCoverPhotoChange = (event) => {
        const file = event.target.files[0]
        setCoverPhoto(file)
    }

    return (
        <form onSubmit={handleSubmit} className="detail-container">
            <button id='back' onClick={() => navigate('/all-podcasts')}>Continue</button>
            <div className= "detail-container-details">
                <h1>Create Podcast</h1>
                <label htmlFor="title">Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <label htmlFor="description">Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
            </div>
            <div>
                <label htmlFor="podcastFile">
                    Podcast File:
                    <input type="file" id="podcastFile" accept=".mp3, .wav, .ogg, .webm" onChange={handlePodcastFileChange} required />
                </label>
                <label htmlFor="coverPhoto">Cover Photo:</label>
                <input type="file" id="coverPhoto" accept="image/*" onChange={handleCoverPhotoChange} required />
            </div>
            <button className= 'submit-button' type="submit">Submit</button>

        </form>
    )
}


export default CreatePodcastDetails