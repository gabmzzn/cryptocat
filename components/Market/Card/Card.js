/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import css from './Card.module.css'
import Link from 'next/link'

export default function Card(props) {

    const coin = props.data

    return (
        <Link href={`/coins/${coin.symbol.toLowerCase()}`} passHref>
            <div className={css.card}>
                <div className={css.title}>
                    <h1>{coin.symbol}</h1>
                    <img src={coin.logo} width={40} height={40} />
                </div>
                <div className={css.subtitle}>
                    <span className={coin.updown == '▲' ? css.higherPrice : css.lowerPrice}>
                        <b className={coin.updown == '▲' ? css.arcoinUp : css.arcoinDown}>{coin.updown}
                        </b>
                        {coin.price}
                    </span>
                    <span className={coin.changepct > 0 ? css.higherpct : css.lowerpct}>
                        {coin.changepct}%
                    </span>
                </div>
                <div className={css.chart}>
                    <img src={coin.chart} />
                </div>
            </div>
        </Link>
    )
}