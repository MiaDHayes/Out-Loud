import Home from './Home'
import { Route, Routes } from 'react-router-dom'
import PodcastForm2 from './PodcastForm2'
import SinglePodcastDetail from './SinglePodcastDetail'
import PodcastList from './PodcastList'
import CreatePodcastDetails from '../helpers/CreatePodcastDetails'
import Login from './Login'
import CreateAccount from './CreateAccount'
import OutLoudHome from './OutLoudHome'
import UserProfile from './UserProfile'

function Main() {
    return (
        <main>
            <Routes>
                <Route exact path= '/' element= {<Home />} />
                <Route exact path= '/home' element= {<OutLoudHome />} />
                <Route exact path= '/create-podcast' element= {<PodcastForm2 />} />
                <Route exact path='/podcast-details' element= {<CreatePodcastDetails />} />
                <Route exact path= '/all-podcasts' element= {<PodcastList />} />
                <Route exact path= '/podcast/:id' element= {<SinglePodcastDetail />} /> 
                <Route exact path= '/login' element= {<Login />} />
                <Route exact path= '/create-account' element= {<CreateAccount />} />
                <Route exact path= '/profile' element= {<UserProfile />} />
                <Route exact path= '/profile/:id' element= {<UserProfile />} />
            </Routes>
        </main>
    )
}

export default Main