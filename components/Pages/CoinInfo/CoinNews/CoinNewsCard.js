/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import scss from './CoinNewsCard.module.scss'
export default function CoinNewsCard(props) {

    const { news } = props
    const body = news.body.replaceAll(/\. /g, '.<br><br>')

    return (
        <div className={scss.card}>
            <div className={scss.title}>
                <h1>{news.title}</h1>
                <img src={news.imageurl} width={60} height={60} />
            </div>
            <div className={scss.body}>
                <span dangerouslySetInnerHTML={{ __html: body }} />
            </div>
        </div>
    )
}