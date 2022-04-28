import style from './NewsCard.module.css'

export default function NewsCard(props) {

    const news = props.data
    const body = news.body.replaceAll(/\. /g, '.<br><br>')

    return (
        <div className={style.card}>
            <div>
                <div className={style.title}>
                    <h1>{news.title}</h1>
                </div>
                <div className={style.body}>
                    <span dangerouslySetInnerHTML={{ __html: body }} />
                </div>
                <div>{news.categories}</div>
                <div>{news.source_info.name}</div>
                <div>{news.published_on}</div>
                <div>{news.url}</div>
            </div>
            <div>
                <img src={news.imageurl} width={60} height={60} />
            </div>
        </div>
    )
}