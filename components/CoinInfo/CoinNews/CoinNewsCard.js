/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import css from './CoinNewsCard.module.css'
export default function CoinNewsCard(props) {

    const news = props.data
    const body = news.body.replaceAll(/\. /g, '.<br><br>')

    return (
        <div className={css.card}>
            <div className={css.title}>
                <h1>{news.title}</h1>
                <img src={news.imageurl} width={60} height={60} />
            </div>
            <div className={css.body}>
                <span dangerouslySetInnerHTML={{ __html: body }} />
            </div>
        </div>
    )
}