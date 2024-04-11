import { useContext } from 'react';
import Nav from './Nav';
import PodcastList from './PodcastList';
import { Link } from 'react-router-dom';
import circle1 from '../assets/circle1.png'
import circle2 from '../assets/circle2.png'
import circle3 from '../assets/circle3.png'


function Home() {

    return (
        <div className= 'home'>
            {/* <Nav /> */}
            {/* <PodcastList /> */}
            <Link to= '/login' className='login'>Login</Link>
            <Link to= '/create-account' className='create-acc'>Create Account</Link>
            <div className='logo'>
                <div className="circle blue"></div>
                <div className="circle orange"></div>
                <div className="circle darkblue"></div>
                <div className="circle darkbluee"></div>
                <div className="circle darkblueee"></div>
            </div>
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