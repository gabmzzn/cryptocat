import LoadingScreen from '../../components/Layout/LoadingScreen/LoadingScreen'
import { useState, useEffect } from 'react'
import News from '../../components/Pages/News/News'

export default function NewsIndex() {

    const [news, setNews] = useState()
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        (async () => {
            const URL = 'https://min-api.cryptocompare.com/data/v2/news/?lang=EN&excludeCategories=Sponsored'
            const json = await fetch(URL).then(r => r.json())

            const news = json.Data
                .filter(n =>
                    n.source !== "cointelegraph" &&
                    n.source !== "dailyhodl")
                .slice(0, 20)

            const thumbnails = await fetch('/api/news/thumbs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(news),
            }).then(r => r.json())

            const newsWithThumbnails = news.map((n, i) =>
                Object.assign(n, { image: thumbnails[i] })
            )
            setNews(newsWithThumbnails)
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