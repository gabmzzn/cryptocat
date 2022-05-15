import LoadingScreen from '../../components/Layout/LoadingScreen/LoadingScreen'
import { useState, useEffect } from 'react'
import News from '../../components/Pages/News/News'

export default function NewsIndex() {

    const [news, setNews] = useState()
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        (async () => {
            const news = await fetch('api/news/ALL_NEWS_CATEGORIES=20').then(r => r.json())
            setNews(news)
            setIsReady(true)
        })()
    }, [])

    if (isReady) return <News news={news} />

    return <LoadingScreen />
}

// export async function getStaticProps() {

//     const KEY1 = 'a4ae55aea24b480daa657d710a33af45'
//     const KEY2 = '1c64d44b98df4423851859bd17271168'
//     const KEY3 = 'd710ef1b9b3f4b199e2c0422cac334bc'
//     const URL = `https://newsapi.org/v2/everything?q=crypto&apiKey=${KEY2}`
//     const news = await fetch(URL).then(res => res.json())

//     return { props: { news }, revalidate: 3600 }
// }