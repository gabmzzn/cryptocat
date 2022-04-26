/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import style from './Card.module.css'

export default function Card(props) {

    const coin = props.data

    return (
        <div className={style.card}>
            <div className={style.title}>
                <h1>{coin.symbol}</h1>
                <img src={coin.logo} width={40} height={40} />
            </div>
            <div className={style.subtitle}>
                <span className={coin.updown == '▲' ? style.higherPrice : style.lowerPrice}>
                    <b className={coin.updown == '▲' ? style.arcoinUp : style.arcoinDown}>{coin.updown}
                    </b>
                    {coin.price}
                </span>
                <span className={coin.changepct > 0 ? style.higherpct : style.lowerpct}>
                    {coin.changepct}%
                </span>
            </div>
            <div className={style.chart}>
                <img src={coin.chart} />
            </div>
        </div>
    )
}