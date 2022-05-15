/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import scss from './CoinNewsCard.module.scss'
export default function CoinNewsCard(props) {

    const { title, imageurl, image, body } = props.news
    const text = body.replaceAll(/\. /g, '.<br><br>')

    return (
        <div className={scss.card}>
            <div className={scss.title}>
                <h1>{title}</h1>
            </div>
            <div className={scss.body}>
                <img src={image} width={'100%'} />
                {/* <span dangerouslySetInnerHTML={{ __html: text }} /> */}
                {/* <img src={imageurl} width={20} height={20} /> */}
            </div>
        </div>
    )
}