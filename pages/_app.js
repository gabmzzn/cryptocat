import '../styles/globals.css'
import Layout from '../components/Layout/Layout'
import '../pages/test/index.css'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>CryptoCat</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,viewport-fit=cover" />
      </Head>
      <Component {...pageProps} />
    </Layout>)
}