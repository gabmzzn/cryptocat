import scss from './news.module.scss'
import NewsCard from './NewsCard/NewsCard'

export default function News(props) {

    const { news } = props

    return (
        <div className={scss.content}>
            {news.filter(news => {
                return news.body.length > 600
            }).map(news => {
                return <NewsCard key={news.id} data={news} />
            })}
        </div>)
}
