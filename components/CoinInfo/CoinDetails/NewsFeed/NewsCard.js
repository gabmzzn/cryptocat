/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import style from './NewsCard.module.css'
export default function NewsCard(props) {

    const news = props.data

    return (
        <div className={style.card}>
            <div className={style.title}>
                <h1>{news.title}</h1>
                <img src={news.imageurl} width={60} height={60} />
            </div>
            <div className={style.subtitle}>
                <span>{news.body}</span>
            </div>
        </div>
    )
}