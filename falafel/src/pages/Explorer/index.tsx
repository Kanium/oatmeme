import React from 'react'
import { Helmet } from 'react-helmet'

interface ExploreProps {}

const Explore: React.FC = (props: ExploreProps) => {
    return (
        <div>
            <Helmet>
                <title>OatMeme - Explore</title>
            </Helmet>
            <div>Explore</div>
        </div>
    )
}

export default Explore
