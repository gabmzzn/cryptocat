import '../styles/globals.css'
import Layout from '../components/layout/Layout'
import '../pages/test/index.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>)
}

export default MyApp
