import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 

export const NavbarView = () => {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand as={Link} to="/">Smmartin Art</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Nav.Link as={Link} className="page-link" to="/traditional">Traditional Art</Nav.Link>
                        <Nav.Link as={Link} className="page-link" to="/digital">Digital Art</Nav.Link>
                        <Nav.Link as={Link} className="page-link" to="/photography">Photography</Nav.Link>
                        <Nav.Link as={Link} className="page-link" to="/about">About the Artist</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
} 