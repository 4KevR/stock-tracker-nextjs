import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useRouter } from 'next/router';
import Link from "next/link"

export default function OwnNavbar() {
    const router = useRouter()
    return (
        <Navbar variant="dark" expand="lg">
            <Container>
                <Link href="/" legacyBehavior passHref><Navbar.Brand>Stock Tracker</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav activeKey={router.pathname}>
                        <Link href="/" legacyBehavior passHref><Nav.Link>Home</Nav.Link></Link>
                        <Link href="/blog" legacyBehavior passHref><Nav.Link>Blog</Nav.Link></Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Nav activeKey={router.pathname}>
                        <Link href="/account" legacyBehavior passHref><Nav.Link>User account</Nav.Link></Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}