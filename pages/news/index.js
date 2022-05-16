import LoadingScreen from '../../components/Layout/LoadingScreen/LoadingScreen'
import { useState, useEffect } from 'react'
import News from '../../components/Pages/News/News'

export default function NewsIndex() {

    const [news, setNews] = useState()
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        (async () => {
            const news = await fetch('api/news/ALL_NEWS_CATEGORIES=0=49').then(r => r.json())
            setNews(news)
            setIsReady(true)
        })()
    }, [])

    if (isReady) return <News news={news} />

    return <LoadingScreen />
}