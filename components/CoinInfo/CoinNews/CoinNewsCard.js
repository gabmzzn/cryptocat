/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import style from './CoinNewsCard.module.css'
export default function CoinNewsCard(props) {

    const news = props.data
    const body = news.body.replaceAll(/\. /g, '.<br><br>')

    return (
        <div className={style.card}>
            <div className={style.title}>
                <h1>{news.title}</h1>
                <img src={news.imageurl} width={60} height={60} />
            </div>
            <div className={style.body}>
                <span dangerouslySetInnerHTML={{ __html: body }} />
            </div>
        </div>
    )
}