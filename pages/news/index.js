import LoadingScreen from '../../components/Layout/LoadingScreen/LoadingScreen'
import { useState, useEffect } from 'react'
import News from '../../components/Pages/News/News'

export default function NewsPage() {

    const [newsFeed, setNewsFeed] = useState(false)
    const [isReady, setIsReady] = useState(false)
    useEffect(() => {
        async function getNewsFeed() {
            const URL = `https://min-api.cryptocompare.com/data/v2/news/?lang=EN`
            const news = await fetch(URL).then(res => res.json())
            setNewsFeed(news.Data)
            setIsReady(true)
        }
        getNewsFeed()
    }, [])

    if (isReady) return <News news={newsFeed} />

    return <LoadingScreen />
}