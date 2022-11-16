import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useSession, signIn, signOut } from "next-auth/react"

import { useRouter } from 'next/router'
import Link from "next/link"

import { Cinzel } from '@next/font/google'

const cinzel = Cinzel({
    weight: '400',
    subsets: ['latin'],
})

export default function OwnNavbar() {
    const router = useRouter()
    const { data: session } = useSession()
    return (
        <Navbar variant="dark" expand="lg">
            <Container>
                <Link href="/" legacyBehavior passHref><Navbar.Brand><div className={cinzel.className}>Stock Tracker</div></Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav activeKey={router.pathname}>
                        <Link href="/" legacyBehavior passHref><Nav.Link>Home</Nav.Link></Link>
                        <Link href="/blog" legacyBehavior passHref><Nav.Link>Blog</Nav.Link></Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        {
                            session ?
                                (<><button type="button" className="btn btn-secondary" onClick={() => signOut()}>Sign out</button></>) :
                                (<><button type="button" className="btn btn-secondary" onClick={() => signIn()}>Sign in</button></>)
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}