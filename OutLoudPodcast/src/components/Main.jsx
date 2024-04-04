import Home from './Home'
import { Route, Routes } from 'react-router-dom'
import PodcastForm from './PodcastForm'
import PodcastDetail from '../helpers/PodcastDetails'

function Main() {
    return (
        <main>
            <Routes>
                <Route exact path= '/' element= {<Home />} />
                <Route exact path= '/create-podcast' element= {<PodcastForm />} />
                <Route exact path='/podcast-details' element= {<PodcastDetail />} />
            </Routes>
        </main>
    )
}

export default Main