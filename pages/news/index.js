import LoadingScreen from '../../components/Layout/LoadingScreen/LoadingScreen'
import { useState, useEffect } from 'react'
import News from '../../components/Pages/News/News'

export default function NewsPage() {

    const [newsFeed, setNewsFeed] = useState(false)
    const [isReady, setIsReady] = useState(false)
    useEffect(() => {
        async function getNewsFeed() {
            const KEY1 = 'a4ae55aea24b480daa657d710a33af45'
            const KEY2 = '1c64d44b98df4423851859bd17271168'
            const KEY3 = 'd710ef1b9b3f4b199e2c0422cac334bc'
            const URL = `https://newsapi.org/v2/everything?q=crypto&apiKey=${KEY2}`
            const news = await fetch(URL).then(res => res.json())
            console.log(news)
            setNewsFeed(news.articles)

            setIsReady(true)
        }
        getNewsFeed()
    }, [])

    if (isReady) return <News news={newsFeed} />

    return <LoadingScreen />
}