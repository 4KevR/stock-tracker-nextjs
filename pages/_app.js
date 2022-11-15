import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css'

import { SSRProvider } from 'react-bootstrap'
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react"

import Layout from '../components/layout'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <SessionProvider session={session}>
      <SSRProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SSRProvider>
    </SessionProvider>
  )
}

export default MyApp
