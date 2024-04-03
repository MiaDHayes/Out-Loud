import Home from './Home'
import { Route, Routes } from 'react-router-dom'

function Main() {
    return (
        <main>
            <Routes>
                <Route exact path= '/' element= {<Home />} />
            </Routes>
        </main>
    )
}

export default Main