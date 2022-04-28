import { useState, useEffect } from 'react'
import scss from './news.module.scss'
import NewsCard from '../../components/News/NewsCard'
import LoadingScreen from '../../components/Layout/LoadingScreen/LoadingScreen'

export default function News() {

    const [newsFeed, setNewsFeed] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        async function getNewsFeed() {
            const URL = `https://min-api.cryptocompare.com/data/v2/news/?lang=EN`
            const news = await fetch(URL).then(res => res.json())
            setNewsFeed(news)
            setIsLoading(false)
        }
        getNewsFeed()
    }, [])

    if (isLoading) return <LoadingScreen />

    return (<div className={scss.content}>
        {newsFeed.Data.filter(news => {
            return news.body.length > 600
        }).map(news => {
            return <NewsCard key={news.id} data={news} />
        })}
    </div>)

}