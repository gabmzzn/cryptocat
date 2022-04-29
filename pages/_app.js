import '../styles/globals.css'
import Layout from '../components/Layout/Layout'
import '../pages/test/index.css'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>CryptoCat</title>
        <meta name="viewport" content="initial-scale=0.8, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Layout>)
}