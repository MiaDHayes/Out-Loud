import { useContext } from 'react';
import Nav from './Nav';
import PodcastList from './PodcastList';

function OutLoudHome() {

    return (
        <div className= 'home'>
            <Nav />
            <div className='logo'>
                <div className="circle blue"></div>
                <div className="circle orange"></div>
                <div className="circle darkblue"></div>
                <div className="circle darkbluee"></div>
                <div className="circle darkblueee"></div>
            </div>
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

export default OutLoudHome