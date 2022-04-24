import '../styles/globals.css'
import Layout from '../components/layout/Layout'
import '../pages/test/index.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>CRYPTO~CAT</title>
        <link rel="prefetch" as="image" href="/logo.svg"></link>
        <link rel="prefetch" as="image" href="/icon.svg"></link>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Layout>)
}

export default MyApp
