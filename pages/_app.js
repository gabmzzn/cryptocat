import '../styles/globals.css'
import Layout from '../components/Layout/Layout'
import '../pages/test/index.css'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>CryptoCat</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=0.8, minimum-scale=0.8, maximum-scale=1.0, user-scalable=no,viewport-fit=cover" />
      </Head>
      <Component {...pageProps} />
    </Layout>)
}