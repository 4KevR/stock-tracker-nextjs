import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css'
import Layout from '../components/layout'
import { SSRProvider } from 'react-bootstrap'

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SSRProvider>
  )
}

export default MyApp
