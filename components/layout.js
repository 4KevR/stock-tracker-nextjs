import OwnNavbar from "./navbar"
import Footer from "./footer"

export default function Layout({ children }) {
    return (
      <>
        <OwnNavbar />
            <main>{children}</main>
        <Footer />
      </>
    )
}