import Home from './Home'
import { Route, Routes } from 'react-router-dom'
import PodcastForm from './PodcastForm'
import PodcastDetail from '../helpers/PodcastDetails'
import PodcastList from './PodcastList'

function Main() {
    return (
        <main>
            <Routes>
                <Route exact path= '/' element= {<Home />} />
                <Route exact path= '/create-podcast' element= {<PodcastForm />} />
                <Route exact path='/podcast-details' element= {<PodcastDetail />} />
                <Route exact path= '/all-podcasts' element= {<PodcastList />} />
            </Routes>
        </main>
    )
}

export default Main