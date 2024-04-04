import { Link } from 'react-router-dom'

function Nav() {
    return (
        <nav className= 'navbar'>
            <div className= 'topLevelLink'>
                <Link className= 'createLink' to= '/create-podcast'>Create Podcast</Link>
            </div>
        </nav>
    )

}

export default Nav