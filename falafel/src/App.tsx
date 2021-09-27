import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Explore from './pages/Explorer'

const App: React.FC = () => {
    return (
        <div id="app">
            <Helmet>
                <title>OatMeme</title>
            </Helmet>
            <Router>
                <Route path="/" exact component={Explore} />
            </Router>
        </div>
    )
}

export default App
