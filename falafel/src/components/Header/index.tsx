import React from 'react'
import { Navbar, Container, Button } from 'react-bootstrap'
import styles from './styles.module.css'

interface HeaderProps {
    name?: string
}

// eslint-disable-next-line no-empty-pattern
const Header = ({name}: HeaderProps) => {
    return (
        <Navbar className={styles.navbar} bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Oatmeme</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <Button variant="outline-light">Light</Button>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
