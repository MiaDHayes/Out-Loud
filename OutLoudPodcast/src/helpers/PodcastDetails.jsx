import { useState } from "react"
import axios from 'axios'


function PodcastDetails({ onSubmit }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post('http://localhost:3005/podcast', {
                title, description
            })

            setTitle('')
            setDescription('')

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
            <button type="submit">Submit</button>
        </form>
    )
}


export default PodcastDetails