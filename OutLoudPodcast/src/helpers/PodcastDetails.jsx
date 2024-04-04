import { useState } from "react"
import axios from 'axios'


function PodcastDetails({ onSubmit }) {
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
            
            await axios.post('http://localhost:3005/podcast', formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            })
            setTitle('')
            setDescription('')
            setPodcastFile(null)
            setCoverPhoto(null)

            console.log('Response from server:', error)
            onSubmit()
        } catch (error) {
            console.error('Error submitting form:', error)
        }
    }


    return (
        <form onSubmit={handleSubmit} className="detail-container">
            <div>
                <label htmlFor= "title">Title:</label>
                <input type= "text" value={title} onChange={(e) => setTitle(e.target.value)}
                required
                />
                <label htmlFor="description">Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                required></textarea>
            </div>
            <div>
                <label htmlFor= "podcastFile">
                    <input type= "file" id= "podcastFile" accept= ".mp3, .wav, .ogg" onChange={(e) => setPodcastFile(e.target.files[0])}
                    required />
                </label>
                <label htmlFor="coverPhoto">Cover Photo:</label>
                    <input type="file" id="coverPhoto" accept="image/*" onChange={(e) => setCoverPhoto(e.target.files[0])} required />
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}


export default PodcastDetails