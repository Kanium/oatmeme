import React from 'react'
import { Container } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import Header from '../../components/Header'
import VirtScroll from '../../components/VirtScroll/index';

interface ExploreProps {}

// eslint-disable-next-line no-empty-pattern
const Explore: React.FC<ExploreProps> = ({}: ExploreProps) => {
    return (
        <div>
            <Helmet>
                <title>OatMeme - Explore</title>
            </Helmet>
            <div>
                <Header name={'test'} />
                <Container>
                    { /* data goes here */ }
                    <VirtScroll mason={false}/>
                </Container>
            </div>
        </div>
    )
}

export default Explore
