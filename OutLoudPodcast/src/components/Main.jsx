import Home from './Home'
import { Route, Routes } from 'react-router-dom'
import PodcastForm from './PodcastForm'
import SinglePodcastDetail from './SinglePodcastDetail'
import PodcastList from './PodcastList'
import PodcastDetails from '../helpers/PodcastDetails'
import Login from './Login'

function Main() {
    return (
        <main>
            <Routes>
                <Route exact path= '/' element= {<Home />} />
                <Route exact path= '/create-podcast' element= {<PodcastForm />} />
                <Route exact path='/podcast-details' element= {<PodcastDetails />} />
                <Route exact path= '/all-podcasts' element= {<PodcastList />} />
                <Route exact path= '/podcast/:id' element= {<SinglePodcastDetail />} /> 
                <Route exact path= '/login' element= {<Login />} />
            </Routes>
        </main>
    )
}

export default Main