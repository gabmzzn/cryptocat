/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import scss from './CoinNewsCard.module.scss'
export default function CoinNewsCard(props) {

    const { title, imageurl, body } = props.news
    const text = body.replaceAll(/\. /g, '.<br><br>')

    return (
        <div className={scss.card}>
            <div className={scss.title}>
                <h1>{title}</h1>
                <img src={imageurl} width={60} height={60} />
            </div>
            <div className={scss.body}>
                <span dangerouslySetInnerHTML={{ __html: text }} />
            </div>
        </div>
    )
}