import { useContext } from 'react';
import Nav from './Nav';
import PodcastList from './PodcastList';

function Home() {

    return (
        <div className= 'home'>
            <Nav />
            {/* <PodcastList /> */}
            <div className= 'title'>
                <h1>Out Loud</h1>
            </div>
            <div className='home-caption'>
                <h5>Say What's On Your Mind But... Make It Make Sense</h5>
            </div>
        </div>
    )
    
}

export default Home